/**
 * semrush-scrape.mjs
 * Launches Chrome with remote debugging + Default profile, connects, scrapes SEMrush.
 */

import puppeteer from 'puppeteer';
import { writeFileSync, existsSync, rmSync } from 'fs';
import { execSync } from 'child_process';
import http from 'http';

const CHROME_EXE  = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const USER_DATA   = 'C:/Users/Owner/AppData/Local/Google/Chrome/User Data';
const DEBUG_PORT  = 9222;
const OUT         = 'C:/Users/Owner/Documents/ASADS-SEMrush-Extended.md';
const sleep = ms => new Promise(r => setTimeout(r, ms));

function checkDebugPort(port) {
  return new Promise(resolve => {
    const req = http.get(`http://localhost:${port}/json/version`, res => {
      resolve(res.statusCode === 200);
    });
    req.on('error', () => resolve(false));
    req.setTimeout(1000, () => { req.destroy(); resolve(false); });
  });
}

async function launchChromeWithDebugPort() {
  // Kill all chrome processes
  console.log('Killing existing Chrome...');
  try { execSync('taskkill /F /IM chrome.exe', { stdio: 'ignore' }); } catch (_) {}
  await sleep(4000);

  // Remove lockfile with PowerShell (handles Windows file locks better)
  const lockfile = USER_DATA.replace(/\//g, '\\') + '\\lockfile';
  try {
    execSync(`powershell -Command "if (Test-Path '${lockfile}') { Remove-Item -Force '${lockfile}'; Write-Host 'Removed lockfile' }"`, { stdio: 'pipe' });
  } catch (_) {}
  await sleep(1000);

  // Launch Chrome with PowerShell Start-Process (most reliable on Windows)
  const chromeArgs = [
    `--remote-debugging-port=${DEBUG_PORT}`,
    `--user-data-dir="${USER_DATA.replace(/\//g, '\\')}"`,
    '--profile-directory=Default',
    '--no-first-run',
    '--no-default-browser-check',
    '--window-size=1440,900',
  ].join(' ');

  console.log('Launching Chrome with remote debugging...');
  try {
    execSync(
      `powershell -Command "Start-Process '${CHROME_EXE.replace(/\//g, '\\')}' -ArgumentList '${chromeArgs}'"`,
      { stdio: 'ignore' }
    );
  } catch (e) {
    // fallback: use cmd start
    try {
      execSync(`cmd /c start "" "${CHROME_EXE.replace(/\//g, '\\')}" ${chromeArgs}`, { stdio: 'ignore' });
    } catch (_) {}
  }

  // Wait for debug port to be ready
  console.log('Waiting for Chrome debug port...');
  for (let i = 0; i < 20; i++) {
    await sleep(1500);
    if (await checkDebugPort(DEBUG_PORT)) {
      console.log('\n✓ Debug port ready');
      return;
    }
    process.stdout.write('.');
  }
  throw new Error('Chrome debug port never opened after 30s');
}

async function getSERP(page, keyword) {
  process.stdout.write(`  → ${keyword.padEnd(55)} `);
  await page.goto(
    `https://www.semrush.com/analytics/keywordoverview/?q=${encodeURIComponent(keyword)}&db=ca`,
    { waitUntil: 'networkidle2', timeout: 45000 }
  );
  await sleep(5000);

  const data = await page.evaluate((kw) => {
    const r = { keyword: kw, volume: '', kd: '', cpc: '', serp: [] };

    // Line-by-line label → value parsing
    const lines = document.body.innerText.split('\n').map(l => l.trim()).filter(Boolean);
    for (let i = 0; i < lines.length - 1; i++) {
      const label = lines[i];
      const value = lines[i + 1];
      if (value === 'n/a' || !value) continue;
      if (label === 'Volume' && /^[\d,]+$/.test(value) && !r.volume) r.volume = value;
      if (label === 'Keyword Difficulty' && /^\d+%?$/.test(value) && !r.kd) r.kd = value.replace('%', '');
      if (label === 'CPC' && /^[\d.$]+$/.test(value) && !r.cpc) r.cpc = value.startsWith('$') ? value : '$' + value;
    }

    // SERP domains from external links
    const seen = new Set();
    const skip = ['semrush.com','google.com','facebook.com','twitter.com','instagram.com',
                  'youtube.com','linkedin.com','wikipedia.org','captcha','apple.com'];
    document.querySelectorAll('a[href^="http"]').forEach(a => {
      try {
        const host = new URL(a.href).hostname.replace(/^www\./, '');
        if (!skip.some(s => host.includes(s)) && host.includes('.') && host.length > 4 && !seen.has(host)) {
          seen.add(host);
          r.serp.push(host);
        }
      } catch (_) {}
    });

    return r;
  }, keyword);

  console.log(`vol=${data.volume||'?'} kd=${data.kd||'?'} cpc=${data.cpc||'?'} serp=${data.serp.length}`);
  return data;
}

async function getDomainOrganic(page, domain) {
  process.stdout.write(`  → organic: ${domain} ... `);
  await page.goto(
    `https://www.semrush.com/analytics/organic/positions/?q=${domain}&db=ca&sortby=Po&order=asc`,
    { waitUntil: 'networkidle2', timeout: 45000 }
  );
  await sleep(7000);

  const rows = await page.evaluate(() => {
    const results = [];
    document.querySelectorAll('table tbody tr').forEach((tr, i) => {
      if (i >= 60) return;
      const tds = Array.from(tr.querySelectorAll('td'));
      if (tds.length < 3) return;
      const kw  = tds[0]?.innerText?.trim()?.split('\n')[0] || '';
      const pos = tds[1]?.innerText?.trim()?.split('\n')[0] || '';
      const vol = tds[2]?.innerText?.trim()?.split('\n')[0] || '';
      const kd  = tds[3]?.innerText?.trim()?.split('\n')[0] || '';
      if (kw && /^\d+$/.test(pos.replace(/,/g, ''))) results.push({ kw, pos, vol, kd });
    });
    if (results.length > 0) return results;

    // Fallback: line-by-line scan
    const lines = document.body.innerText.split('\n').map(l => l.trim()).filter(Boolean);
    for (let i = 0; i < lines.length - 3; i++) {
      const pos = lines[i + 1];
      const vol = lines[i + 2];
      if (/^\d+$/.test(pos) && parseInt(pos) <= 100 && /^[\d,]+$/.test(vol.replace(/,/g, ''))) {
        results.push({ kw: lines[i], pos, vol, kd: lines[i + 3] || '' });
        i += 3;
        if (results.length >= 60) break;
      }
    }
    return results;
  });

  console.log(`${rows.length} rows`);
  return rows;
}

async function getDomainOverview(page, domain) {
  process.stdout.write(`  → overview: ${domain.padEnd(35)} `);
  await page.goto(
    `https://www.semrush.com/analytics/overview/?q=${domain}&db=ca`,
    { waitUntil: 'networkidle2', timeout: 45000 }
  );
  await sleep(6000);

  const data = await page.evaluate((dom) => {
    const r = { domain: dom, traffic: '', keywords: '', backlinks: '', score: '' };
    const lines = document.body.innerText.split('\n').map(l => l.trim()).filter(Boolean);
    for (let i = 0; i < lines.length - 1; i++) {
      const label = lines[i].toLowerCase();
      const value = lines[i + 1];
      if (!value || value === 'n/a' || value === '—') continue;
      if (!/^[\d,\.KkMmBb]+$/.test(value.replace(/[,%$]/g, ''))) continue;
      if (label === 'organic traffic' && !r.traffic) r.traffic = value;
      if (label.includes('keyword') && !r.keywords) r.keywords = value;
      if ((label.includes('backlink') || label.includes('referring domain')) && !r.backlinks) r.backlinks = value;
      if ((label.includes('authority') || label === 'as' || label === 'authority score') && !r.score) r.score = value;
    }
    return r;
  }, domain);

  console.log(`traffic=${data.traffic||'?'} kw=${data.keywords||'?'} bl=${data.backlinks||'?'} as=${data.score||'?'}`);
  return data;
}

async function main() {
  await launchChromeWithDebugPort();

  console.log('Connecting Puppeteer...');
  const browser = await puppeteer.connect({ browserURL: `http://localhost:${DEBUG_PORT}` });

  // Check login using first existing page
  const existingPages = await browser.pages();
  const loginPage = existingPages[0] || await browser.newPage();
  console.log('Checking SEMrush login...');
  await loginPage.goto('https://www.semrush.com/dashboard/', { waitUntil: 'networkidle2', timeout: 30000 });
  await sleep(3000);
  const url = loginPage.url();
  console.log('URL:', url);

  if (url.includes('login') || url.includes('signin')) {
    console.log('⚠ Not logged in. Please log into SEMrush in the Chrome window that just opened.');
    console.log('Waiting up to 3 minutes...');
    for (let i = 0; i < 36; i++) {
      await sleep(5000);
      const u = loginPage.url();
      process.stdout.write(`\r  ${(i+1)*5}s — ${u.substring(0, 60)}   `);
      if (!u.includes('login') && !u.includes('signin')) { console.log('\n'); break; }
    }
  }
  console.log('✅ Logged in. Starting scrape...\n');
  const output = [];

  // Reuse the login page as our single working page
  const pg = loginPage;
  pg.setDefaultTimeout(45000);
  await pg.setRequestInterception(true).catch(() => {});
  pg.on('request', req => {
    try {
      if (['image', 'font', 'media'].includes(req.resourceType())) req.abort();
      else req.continue();
    } catch (_) {}
  });

  console.log('── 1. ASADS organic positions');
  const asadsRows = await getDomainOrganic(pg, 'asads.ca');
  output.push({ type: 'table', section: 'ASADS ORGANIC KEYWORD POSITIONS (sorted by rank, top 60)', rows: asadsRows });

  // Helper: run a batch of SERP keywords with error recovery
  async function serpBatch(keywords) {
    const items = [];
    for (const kw of keywords) {
      try {
        items.push(await getSERP(pg, kw));
      } catch (e) {
        console.log(`  ⚠ Error on "${kw}": ${e.message.substring(0,60)} — skipping`);
        items.push({ keyword: kw, volume: '', kd: '', cpc: '', serp: [] });
        await sleep(3000); // Brief pause before next keyword
      }
    }
    return items;
  }

  console.log('\n── 2. WETT SERP');
  output.push({ type: 'serp', section: 'WETT INSPECTION SERP', items: await serpBatch([
    'wett inspection ontario',
    'wett inspection toronto',
    'wett inspection barrie',
    'what is a wett inspection ontario',
  ])});

  console.log('\n── 3. Pre-purchase / pre-listing SERP');
  output.push({ type: 'serp', section: 'PRE-PURCHASE & PRE-LISTING SERP', items: await serpBatch([
    'pre purchase home inspection ontario',
    'pre purchase home inspection toronto',
    'pre listing home inspection ontario',
    'pre listing inspection toronto',
  ])});

  console.log('\n── 4. Commercial inspection SERP');
  output.push({ type: 'serp', section: 'COMMERCIAL INSPECTION SERP', items: await serpBatch([
    'commercial building inspection ontario',
    'commercial inspection kitchener',
    'commercial inspection cambridge ontario',
    'commercial inspection guelph',
  ])});

  console.log('\n── 5. Mold inspection SERP');
  output.push({ type: 'serp', section: 'MOLD INSPECTION SERP', items: await serpBatch([
    'mold inspection toronto',
    'mold inspection mississauga',
    'mold inspection hamilton',
    'mold inspection ontario',
  ])});

  console.log('\n── 6. Asbestos testing SERP');
  output.push({ type: 'serp', section: 'ASBESTOS TESTING SERP', items: await serpBatch([
    'asbestos testing toronto',
    'asbestos testing mississauga',
    'asbestos testing hamilton',
    'asbestos testing ontario',
  ])});

  console.log('\n── 7. Home inspection by city SERP');
  output.push({ type: 'serp', section: 'HOME INSPECTION BY CITY SERP', items: await serpBatch([
    'home inspection kitchener',
    'home inspection hamilton',
    'home inspection guelph',
    'home inspection cambridge ontario',
    'home inspector barrie',
    'home inspection mississauga',
  ])});

  console.log('\n── 8. Insurance inspection SERP');
  output.push({ type: 'serp', section: 'INSURANCE HOME INSPECTION SERP', items: await serpBatch([
    'insurance home inspection ontario',
    'home inspection for insurance purposes ontario',
  ])});

  console.log('\n── 9. Radon testing SERP');
  output.push({ type: 'serp', section: 'RADON TESTING SERP', items: await serpBatch([
    'radon testing ontario',
    'radon testing toronto',
  ])});

  console.log('\n── 10. Domain authority comparison');
  const overviews = [];
  for (const d of ['asads.ca','mikeholmesinspections.com','inchbyinchinspections.com','twinpeaksinspections.ca','amerispec.ca']) {
    try {
      overviews.push(await getDomainOverview(pg, d));
    } catch (e) {
      console.log(`  ⚠ Error on ${d}: ${e.message.substring(0,60)}`);
      overviews.push({ domain: d, traffic: '', keywords: '', backlinks: '', score: '' });
    }
    await sleep(1500);
  }
  output.push({ type: 'overview', section: 'DOMAIN AUTHORITY & BACKLINK COMPARISON', overviews });

  // Build markdown
  let md = `# ASADS — Extended SEMrush Intelligence\n*Chrome-scraped: ${new Date().toISOString().split('T')[0]}*\n\n`;

  for (const block of output) {
    md += `---\n\n## ${block.section}\n\n`;

    if (block.type === 'table') {
      if (!block.rows?.length) {
        md += `_(No rows extracted)_\n\n`;
      } else {
        md += `| # | Keyword | Pos | Volume | KD |\n|---|---|---|---|---|\n`;
        block.rows.forEach((r, i) => { md += `| ${i+1} | ${r.kw} | ${r.pos} | ${r.vol} | ${r.kd} |\n`; });
        md += '\n';
      }
    }

    if (block.type === 'serp') {
      block.items.forEach(s => {
        md += `### ${s.keyword}\n`;
        md += `**Volume:** ${s.volume||'—'} | **KD:** ${s.kd||'—'} | **CPC:** ${s.cpc||'—'}\n\n`;
        if (s.serp.length > 0) {
          s.serp.slice(0, 10).forEach((d, i) => { md += `${i+1}. ${d}\n`; });
        } else {
          md += `_(No SERP extracted)_\n`;
        }
        md += '\n';
      });
    }

    if (block.type === 'overview') {
      md += `| Domain | Organic Traffic | Keywords | Backlinks | Authority Score |\n|---|---|---|---|---|\n`;
      block.overviews.forEach(o => {
        md += `| ${o.domain} | ${o.traffic||'—'} | ${o.keywords||'—'} | ${o.backlinks||'—'} | ${o.score||'—'} |\n`;
      });
      md += '\n';
    }
  }

  writeFileSync(OUT, md, 'utf8');
  console.log(`\n✅ Saved to: ${OUT}`);
  try { browser.disconnect(); } catch (_) {}
}

main().catch(err => {
  console.error('Fatal:', err.message);
  process.exit(1);
});
