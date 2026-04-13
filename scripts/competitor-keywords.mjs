/**
 * competitor-keywords.mjs
 * Paginates through ALL pages of SEMrush Organic Rankings for every competitor.
 * Uses Next-button pagination (same as inch-keywords.mjs) — gets full keyword lists.
 */

import puppeteer from 'puppeteer';
import { writeFileSync } from 'fs';
import { execSync } from 'child_process';
import http from 'http';

const CHROME_EXE = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const USER_DATA  = 'C:/Users/Owner/AppData/Local/Google/Chrome/User Data';
const DEBUG_PORT = 9222;
const OUT        = 'C:/Users/Owner/Documents/Competitor-Keywords.md';
const sleep = ms => new Promise(r => setTimeout(r, ms));

// ── ALL competitors found in SERP data ───────────────────────────────────────
const COMPETITORS = [
  // National / franchise
  { domain: 'mikeholmesinspections.com',   label: 'Mike Holmes Inspections' },
  { domain: 'amerispec.ca',                label: 'AmeriSpec Canada' },
  { domain: 'pillartopost.com',            label: 'Pillar To Post' },
  { domain: 'abuyerschoice.com',           label: "A Buyer's Choice" },
  { domain: 'carsondunlop.ca',             label: 'Carson Dunlop' },

  // GTA / multi-city
  { domain: 'inchbyinchinspections.com',   label: 'Inch by Inch' },
  { domain: 'twinpeaksinspections.ca',     label: 'Twin Peaks' },
  { domain: 'solexgroup.ca',               label: 'Solex Group' },
  { domain: 'gpiweb.ca',                   label: 'GPI Home Inspections' },
  { domain: 'smartchoicehomeandmold.com',  label: 'Smart Choice Home & Mold' },
  { domain: 'inspectionservicesgroup.com', label: 'Inspection Services Group' },

  // City-specific strong competitors
  { domain: 'housemastertoronto.com',      label: 'HouseMaster Toronto' },
  { domain: 'ehinspections.ca',            label: 'EH Inspections (Mississauga)' },
  { domain: 'rankinhomeinspections.ca',    label: 'Rankin Home Inspections (Hamilton)' },
  { domain: 'mdhi.ca',                     label: 'MDHI (Hamilton)' },
  { domain: 'robleshomeinspections.com',   label: 'Robles Home Inspections (Kitchener)' },
  { domain: 'legacyhomeinspection.ca',     label: 'Legacy Home Inspection (Barrie)' },
  { domain: 'building-insights.com',       label: 'Building Insights (Guelph)' },
  { domain: '1stcallhomeinspections.com',  label: '1st Call Home Inspections (London)' },
];

// Branded/irrelevant keyword patterns to filter
const SKIP_PATTERNS = [
  /^mike holmes/i, /^holmes inspection/i,
  /^amerispec/i, /^pillar.to.post/i,
  /^inch.by.inch/i, /^twin.peaks/i,
  /^solex/i, /^carson.dunlop/i,
  /^a buyer.s choice/i,
];

function isRelevant(kw) {
  return !SKIP_PATTERNS.some(p => p.test(kw));
}

// ── Chrome helpers ────────────────────────────────────────────────────────────
function checkPort(port) {
  return new Promise(resolve => {
    const req = http.get(`http://localhost:${port}/json/version`, res => resolve(res.statusCode === 200));
    req.on('error', () => resolve(false));
    req.setTimeout(1000, () => { req.destroy(); resolve(false); });
  });
}

async function ensureChrome() {
  if (await checkPort(DEBUG_PORT)) { console.log('✓ Chrome running on port', DEBUG_PORT); return; }
  console.log('Launching Chrome...');
  try { execSync('taskkill /F /IM chrome.exe', { stdio: 'ignore' }); } catch (_) {}
  await sleep(3000);
  const lockfile = USER_DATA.replace(/\//g, '\\') + '\\lockfile';
  try { execSync(`powershell -Command "if (Test-Path '${lockfile}') { Remove-Item -Force '${lockfile}' }"`, { stdio: 'ignore' }); } catch (_) {}
  await sleep(1000);
  const args = [
    `--remote-debugging-port=${DEBUG_PORT}`,
    `--user-data-dir="${USER_DATA.replace(/\//g, '\\')}"`,
    '--profile-directory=Default', '--no-first-run', '--window-size=1440,900',
  ].join(' ');
  try {
    execSync(`powershell -Command "Start-Process '${CHROME_EXE.replace(/\//g, '\\')}' -ArgumentList '${args}'"`, { stdio: 'ignore' });
  } catch (_) {
    execSync(`cmd /c start "" "${CHROME_EXE.replace(/\//g, '\\')}" ${args}`, { stdio: 'ignore' });
  }
  for (let i = 0; i < 20; i++) {
    await sleep(1500);
    if (await checkPort(DEBUG_PORT)) { console.log('✓ Chrome ready'); return; }
    process.stdout.write('.');
  }
  throw new Error('Chrome debug port never opened');
}

// ── SEMrush scraping ──────────────────────────────────────────────────────────
function extractRows(pg) {
  return pg.evaluate(() => {
    const results = [];
    for (const row of document.querySelectorAll('[role="row"]')) {
      const cells = Array.from(row.querySelectorAll('[role="cell"],[role="gridcell"],td'))
        .map(c => c.innerText.trim().replace(/\n/g, ' ').substring(0, 80));
      if (cells.length < 7) continue;
      const kw = cells[1];
      if (!kw || kw.toLowerCase() === 'keyword') continue;

      let pos = '';
      for (let i = 3; i <= 6; i++) {
        const v = (cells[i] || '').trim();
        if (/^\d+$/.test(v) && +v >= 1 && +v <= 100) { pos = v; break; }
      }
      if (!pos) continue;

      let vol = '';
      for (let i = 6; i <= 10; i++) {
        const v = (cells[i] || '').replace(',', '');
        if (/^\d+(\.\d+)?[KkMm]?$/.test(v)) {
          const n = parseFloat(v) * (v.match(/[Kk]/) ? 1000 : v.match(/[Mm]/) ? 1e6 : 1);
          if (n >= 10) { vol = cells[i]; break; }
        }
      }

      let kd = '';
      for (let i = 8; i <= 11; i++) {
        const v = (cells[i] || '').replace('%', '').trim();
        if (/^\d+$/.test(v) && +v <= 100) { kd = v; break; }
      }

      results.push({ kw, pos: +pos, vol, kd });
    }
    return results;
  });
}

function clickNext(pg) {
  return pg.evaluate(() => {
    const btn = Array.from(document.querySelectorAll('button,[role="button"]'))
      .find(b => (b.innerText || '').trim() === 'Next');
    if (btn && !btn.disabled) { btn.click(); return true; }
    return false;
  });
}

async function scrapeCompetitor(pg, domain, maxPages = 20) {
  process.stdout.write(`\n  Scraping ${domain} `);
  await pg.goto(
    `https://www.semrush.com/analytics/organic/positions/?q=${domain}&db=ca&sortby=Po&order=asc`,
    { waitUntil: 'networkidle2', timeout: 60000 }
  );
  await sleep(5000);

  const all = new Map();
  for (let page = 1; page <= maxPages; page++) {
    const rows = await extractRows(pg);
    for (const r of rows) all.set(r.kw, r);
    process.stdout.write('.');

    const ok = await clickNext(pg);
    if (!ok) break;
    await sleep(3500);
  }

  const sorted = Array.from(all.values()).sort((a, b) => a.pos - b.pos);
  console.log(` → ${sorted.length} keywords`);
  return sorted;
}

// ── Main ─────────────────────────────────────────────────────────────────────
async function main() {
  await ensureChrome();

  const browser = await puppeteer.connect({ browserURL: `http://localhost:${DEBUG_PORT}` });
  const pages = await browser.pages();
  const pg = pages[0];
  pg.setDefaultTimeout(60000);
  await pg.setRequestInterception(true).catch(() => {});
  pg.on('request', req => {
    try {
      if (['image', 'font', 'media'].includes(req.resourceType())) req.abort();
      else req.continue();
    } catch (_) {}
  });

  // Check login
  await pg.goto('https://www.semrush.com/dashboard/', { waitUntil: 'networkidle2', timeout: 30000 });
  await sleep(2000);
  if (pg.url().includes('login')) {
    console.error('❌ Not logged in — open Chrome and log into SEMrush first');
    browser.disconnect(); return;
  }
  console.log('✅ Logged in\n');

  const allData = {};

  // Scrape ASADS own positions first (for gap analysis)
  console.log('── ASADS own positions');
  allData['asads.ca'] = await scrapeCompetitor(pg, 'asads.ca', 20);
  await sleep(2000);

  // Scrape all competitors
  for (const { domain, label } of COMPETITORS) {
    console.log(`\n── ${label} (${domain})`);
    try {
      allData[domain] = await scrapeCompetitor(pg, domain, 20);
    } catch (e) {
      console.log(`  ⚠ Error: ${e.message.substring(0, 60)} — skipping`);
      allData[domain] = [];
    }
    await sleep(2000);
  }

  browser.disconnect();

  // ── Build ASADS position lookup ───────────────────────────────────────────
  const asadsPos = {};
  for (const r of (allData['asads.ca'] || [])) asadsPos[r.kw.toLowerCase()] = r.pos;

  // ── Gap analysis ──────────────────────────────────────────────────────────
  // Keywords competitors rank 1-20 where ASADS ranks worse than 20 or not at all
  const gaps = [];
  for (const { domain } of COMPETITORS) {
    const rows = allData[domain] || [];
    for (const r of rows) {
      if (r.pos > 20) continue;
      if (!isRelevant(r.kw)) continue;
      const ap = asadsPos[r.kw.toLowerCase()];
      if (!ap || ap > 20) {
        gaps.push({ kw: r.kw, competitor: domain, compPos: r.pos, asadsPos: ap || '—', vol: r.vol, kd: r.kd });
      }
    }
  }
  // Sort by volume desc
  gaps.sort((a, b) => {
    const parse = v => parseFloat(String(v).replace(/[KkMm]/g, '')) * (String(v).includes('K') ? 1000 : 1) || 0;
    return parse(b.vol) - parse(a.vol);
  });

  // ── Build markdown ────────────────────────────────────────────────────────
  let md = `# Competitor Organic Keyword Analysis — Full Paginated\n`;
  md += `*Scraped: ${new Date().toISOString().split('T')[0]} | ${COMPETITORS.length} competitors, up to 20 pages each*\n\n`;

  // Summary
  md += `## Summary\n\n| Domain | Keywords Scraped |\n|---|---|\n`;
  md += `| asads.ca (us) | ${(allData['asads.ca'] || []).length} |\n`;
  for (const { domain } of COMPETITORS) {
    md += `| ${domain} | ${(allData[domain] || []).length} |\n`;
  }
  md += '\n';

  // Gap analysis
  md += `---\n\n## Keyword Gap Analysis\n\n`;
  md += `Keywords competitors rank 1-20 where ASADS ranks worse than 20 or not at all.\n`;
  md += `Sorted by search volume (highest first).\n\n`;
  if (gaps.length) {
    md += `| Keyword | Competitor | Their Pos | ASADS Pos | Volume | KD |\n|---|---|---|---|---|---|\n`;
    gaps.forEach(g => {
      md += `| ${g.kw} | ${g.competitor} | ${g.compPos} | ${g.asadsPos} | ${g.vol || '—'} | ${g.kd || '—'} |\n`;
    });
  } else {
    md += `_(No gaps found)_\n`;
  }
  md += '\n';

  // Full keyword lists per competitor
  for (const { domain, label } of COMPETITORS) {
    const rows = allData[domain] || [];
    const relevant = rows.filter(r => isRelevant(r.kw));
    const branded  = rows.filter(r => !isRelevant(r.kw));

    md += `---\n\n## ${label} — ${domain} (${rows.length} keywords)\n\n`;
    if (!rows.length) { md += `_(No data scraped)_\n\n`; continue; }

    md += `**Relevant:** ${relevant.length} | **Branded/filtered:** ${branded.length}\n\n`;
    md += `| # | Keyword | Pos | Volume | KD | ASADS Pos |\n|---|---|---|---|---|---|\n`;
    relevant.forEach((r, i) => {
      const ap = asadsPos[r.kw.toLowerCase()];
      md += `| ${i + 1} | ${r.kw} | ${r.pos} | ${r.vol || '—'} | ${r.kd || '—'} | ${ap || '—'} |\n`;
    });
    md += '\n';

    if (branded.length) {
      md += `<details><summary>Branded/filtered keywords (${branded.length})</summary>\n\n`;
      md += `| Keyword | Pos | Volume |\n|---|---|---|\n`;
      branded.forEach(r => { md += `| ${r.kw} | ${r.pos} | ${r.vol || '—'} |\n`; });
      md += `\n</details>\n\n`;
    }
  }

  writeFileSync(OUT, md, 'utf8');
  console.log(`\n✅ Saved to: ${OUT}`);

  // Print top gaps to console
  console.log(`\nTop keyword gaps (${gaps.length} total):`);
  gaps.slice(0, 20).forEach((g, i) => {
    console.log(`  ${(i+1).toString().padStart(2)}. "${g.kw}" — ${g.competitor} pos ${g.compPos}, ASADS pos ${g.asadsPos}, vol ${g.vol || '?'}, KD ${g.kd || '?'}`);
  });
}

main().catch(e => { console.error('Fatal:', e.message); process.exit(1); });
