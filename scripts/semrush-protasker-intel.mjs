/**
 * semrush-protasker-intel.mjs
 * Gathers the 4 MISSING pieces for Protasker:
 *  1. Protasker.ca organic keyword positions (what does it rank for now?)
 *  2. Backlink analysis
 *  3. Keyword gap vs HomeStars + Bark (what they rank for that Protasker doesn't)
 *  4. AI intelligence — AI score, brand narrative, AI prompts for home services
 */

import puppeteer from 'puppeteer';
import { writeFileSync } from 'fs';
const sleep = ms => new Promise(r => setTimeout(r, ms));

const OUT = 'C:/Users/Owner/Documents/Protasker-SEMrush-Extended.md';
const DOMAIN = 'protasker.ca';
const DEBUG_PORT = 9222;

async function main() {
  console.log('Connecting to Chrome...');
  const browser = await puppeteer.connect({ browserURL: `http://localhost:${DEBUG_PORT}`, protocolTimeout: 60000 });
  const pg = await browser.newPage();
  pg.setDefaultTimeout(45000);

  // Block images/fonts for speed
  await pg.setRequestInterception(true);
  pg.on('request', req => {
    try {
      if (['image', 'font', 'media'].includes(req.resourceType())) req.abort();
      else req.continue();
    } catch (_) {}
  });

  // Verify login
  await pg.goto('https://www.semrush.com/dashboard/', { waitUntil: 'networkidle2', timeout: 30000 });
  await sleep(3000);
  if (pg.url().includes('login') || pg.url().includes('signin')) {
    console.log('⚠ Not logged in to SEMrush! Please log in in the Chrome window.');
    for (let i = 0; i < 36; i++) {
      await sleep(5000);
      if (!pg.url().includes('login')) break;
      process.stdout.write(`\r  Waiting for login... ${(i+1)*5}s`);
    }
  }
  console.log('✅ SEMrush logged in\n');

  const output = [];

  // ─────────────────────────────────────────────────────────────────
  // SECTION 1: Protasker.ca Organic Positions (top 100 keywords)
  // ─────────────────────────────────────────────────────────────────
  console.log('── 1. Protasker.ca organic keyword positions...');
  await pg.goto(
    `https://www.semrush.com/analytics/organic/positions/?q=${DOMAIN}&db=ca&sortby=Po&order=asc`,
    { waitUntil: 'networkidle2', timeout: 45000 }
  );
  await sleep(8000);

  const organicRows = await pg.evaluate(() => {
    const results = [];
    document.querySelectorAll('table tbody tr').forEach((tr, i) => {
      if (i >= 100) return;
      const tds = Array.from(tr.querySelectorAll('td'));
      if (tds.length < 4) return;
      const kw  = tds[0]?.innerText?.trim()?.split('\n')[0] || '';
      const pos = tds[1]?.innerText?.trim()?.split('\n')[0] || '';
      const vol = tds[2]?.innerText?.trim()?.split('\n')[0] || '';
      const kd  = tds[3]?.innerText?.trim()?.split('\n')[0] || '';
      const url = tds[4]?.innerText?.trim()?.split('\n')[0] || '';
      if (kw && /^\d+$/.test(pos.replace(/,/g, ''))) results.push({ kw, pos, vol, kd, url });
    });
    if (results.length > 0) return results;

    // Fallback: line scan
    const lines = document.body.innerText.split('\n').map(l => l.trim()).filter(Boolean);
    for (let i = 0; i < lines.length - 3; i++) {
      const pos = lines[i + 1];
      const vol = lines[i + 2];
      if (/^\d+$/.test(pos) && parseInt(pos) <= 100 && /^[\d,]+$/.test(vol.replace(/,/g, ''))) {
        results.push({ kw: lines[i], pos, vol, kd: lines[i+3] || '', url: '' });
        i += 3;
        if (results.length >= 100) break;
      }
    }
    return results;
  });
  console.log(`  → ${organicRows.length} keyword rows`);

  // Also grab domain overview stats
  const overviewStats = await pg.evaluate(() => {
    const lines = document.body.innerText.split('\n').map(l => l.trim()).filter(Boolean);
    const r = { keywords: '', traffic: '', score: '' };
    for (let i = 0; i < lines.length - 1; i++) {
      const label = lines[i].toLowerCase();
      const val = lines[i+1];
      if (!val || val === 'n/a') continue;
      if (label === 'organic keywords' && !r.keywords) r.keywords = val;
      if (label === 'organic traffic' && !r.traffic) r.traffic = val;
      if ((label === 'authority score' || label === 'as') && !r.score) r.score = val;
    }
    return r;
  });
  console.log(`  → Overview: keywords=${overviewStats.keywords} traffic=${overviewStats.traffic} AS=${overviewStats.score}`);
  output.push({ type: 'organic', organicRows, overviewStats });

  // ─────────────────────────────────────────────────────────────────
  // SECTION 2: Backlink Analysis
  // ─────────────────────────────────────────────────────────────────
  console.log('\n── 2. Backlink analysis...');
  await pg.goto(
    `https://www.semrush.com/analytics/backlinks/?q=${DOMAIN}&searchType=domain`,
    { waitUntil: 'networkidle2', timeout: 45000 }
  );
  await sleep(7000);

  const backlinkData = await pg.evaluate(() => {
    const r = { total: '', referring: '', ips: '', topDomains: [] };
    const lines = document.body.innerText.split('\n').map(l => l.trim()).filter(Boolean);
    for (let i = 0; i < lines.length - 1; i++) {
      const label = lines[i].toLowerCase();
      const val = lines[i+1];
      if (!val || val === 'n/a') continue;
      if ((label.includes('backlink') || label === 'total backlinks') && /^[\d,\.KkMm]+$/.test(val) && !r.total) r.total = val;
      if (label.includes('referring domain') && /^[\d,\.KkMm]+$/.test(val) && !r.referring) r.referring = val;
      if (label.includes('referring ip') && /^[\d,\.KkMm]+$/.test(val) && !r.ips) r.ips = val;
    }
    // Top referring domains from table
    document.querySelectorAll('table tbody tr').forEach((tr, i) => {
      if (i >= 15) return;
      const tds = Array.from(tr.querySelectorAll('td'));
      const domain = tds[0]?.innerText?.trim()?.split('\n')[0] || '';
      const score  = tds[1]?.innerText?.trim()?.split('\n')[0] || '';
      const links  = tds[2]?.innerText?.trim()?.split('\n')[0] || '';
      if (domain && domain.includes('.')) r.topDomains.push({ domain, score, links });
    });
    return r;
  });
  console.log(`  → Backlinks: ${backlinkData.total}, Referring domains: ${backlinkData.referring}, Top domains: ${backlinkData.topDomains.length}`);
  output.push({ type: 'backlinks', backlinkData });

  // ─────────────────────────────────────────────────────────────────
  // SECTION 3: Keyword Gap — Protasker vs HomeStars vs Bark
  // ─────────────────────────────────────────────────────────────────
  console.log('\n── 3. Keyword gap analysis...');
  const gapUrl = `https://www.semrush.com/gap/?db=ca&domain=${DOMAIN}&domains=homestars.com,bark.com,trustedpros.ca&type=organic&filter=missing`;
  await pg.goto(gapUrl, { waitUntil: 'networkidle2', timeout: 45000 });
  await sleep(9000);

  const gapRows = await pg.evaluate(() => {
    const results = [];
    document.querySelectorAll('table tbody tr').forEach((tr, i) => {
      if (i >= 60) return;
      const tds = Array.from(tr.querySelectorAll('td'));
      const kw  = tds[0]?.innerText?.trim()?.split('\n')[0] || '';
      const vol = tds[1]?.innerText?.trim()?.split('\n')[0] || '';
      const kd  = tds[2]?.innerText?.trim()?.split('\n')[0] || '';
      if (kw && vol) results.push({ kw, vol, kd });
    });
    if (results.length > 0) return results;

    // Fallback text scrape
    const lines = document.body.innerText.split('\n').map(l => l.trim()).filter(Boolean);
    for (let i = 0; i < lines.length - 2; i++) {
      if (/^[\d,]+$/.test(lines[i+1]) && /^\d+$/.test(lines[i+2]?.replace('%',''))) {
        results.push({ kw: lines[i], vol: lines[i+1], kd: lines[i+2] });
        i += 2;
        if (results.length >= 60) break;
      }
    }
    return results;
  });
  console.log(`  → Gap keywords: ${gapRows.length}`);
  output.push({ type: 'gap', gapRows });

  // Also try "weak" filter (Protasker ranks lower than competitors)
  const weakUrl = `https://www.semrush.com/gap/?db=ca&domain=${DOMAIN}&domains=homestars.com,bark.com&type=organic&filter=weak`;
  await pg.goto(weakUrl, { waitUntil: 'networkidle2', timeout: 45000 });
  await sleep(8000);

  const weakRows = await pg.evaluate(() => {
    const results = [];
    document.querySelectorAll('table tbody tr').forEach((tr, i) => {
      if (i >= 40) return;
      const tds = Array.from(tr.querySelectorAll('td'));
      const kw   = tds[0]?.innerText?.trim()?.split('\n')[0] || '';
      const vol  = tds[1]?.innerText?.trim()?.split('\n')[0] || '';
      const kd   = tds[2]?.innerText?.trim()?.split('\n')[0] || '';
      const pos1 = tds[3]?.innerText?.trim()?.split('\n')[0] || '';
      const pos2 = tds[4]?.innerText?.trim()?.split('\n')[0] || '';
      if (kw && vol) results.push({ kw, vol, kd, protaskerPos: pos1, competitor: pos2 });
    });
    return results;
  });
  console.log(`  → Weak keywords: ${weakRows.length}`);
  output.push({ type: 'weak', weakRows });

  // ─────────────────────────────────────────────────────────────────
  // SECTION 4: Competitor Domain Overview (updated numbers)
  // ─────────────────────────────────────────────────────────────────
  console.log('\n── 4. Domain overviews (fresh)...');
  const domains = [
    'protasker.ca', 'homestars.com', 'bark.com',
    'trustedpros.ca', 'jiffyondemand.com', 'taskrabbit.com'
  ];
  const overviews = [];
  for (const d of domains) {
    process.stdout.write(`  → ${d.padEnd(28)} `);
    await pg.goto(`https://www.semrush.com/analytics/overview/?q=${d}&db=ca`, { waitUntil: 'networkidle2', timeout: 40000 });
    await sleep(6000);
    const data = await pg.evaluate((dom) => {
      const r = { domain: dom, traffic: '', keywords: '', backlinks: '', score: '', trend: '' };
      const lines = document.body.innerText.split('\n').map(l => l.trim()).filter(Boolean);
      for (let i = 0; i < lines.length - 1; i++) {
        const label = lines[i].toLowerCase();
        const value = lines[i + 1];
        if (!value || value === 'n/a' || value === '—') continue;
        if (!/^[\d,\.KkMmBb%]+$/.test(value.replace(/[$+\-]/g, ''))) continue;
        if (label === 'organic traffic' && !r.traffic) r.traffic = value;
        if ((label.includes('organic keyword') || label === 'keywords') && !r.keywords) r.keywords = value;
        if ((label.includes('backlink') || label.includes('referring domain')) && !r.backlinks) r.backlinks = value;
        if ((label.includes('authority') || label === 'as') && !r.score) r.score = value;
      }
      return r;
    }, d);
    console.log(`traffic=${data.traffic||'?'} kw=${data.keywords||'?'} bl=${data.backlinks||'?'} AS=${data.score||'?'}`);
    overviews.push(data);
    await sleep(1500);
  }
  output.push({ type: 'overviews', overviews });

  // ─────────────────────────────────────────────────────────────────
  // SECTION 5: AI Intelligence — Brand Narrative for Protasker
  // ─────────────────────────────────────────────────────────────────
  console.log('\n── 5. AI Intelligence — SEMrush AI brand narrative...');

  // Try AI Narratives tool for home services keywords
  const aiKeywords = [
    'home services ontario',
    'handyman service toronto',
    'home cleaning service ontario',
    'plumber toronto',
    'electrician ontario',
    'home repair service ontario',
    'junk removal toronto',
    'duct cleaning ontario',
  ];

  const aiResults = [];
  for (const kw of aiKeywords) {
    process.stdout.write(`  → AI narrative: "${kw}" ... `);
    try {
      await pg.goto(
        `https://www.semrush.com/analytics/keywordoverview/?q=${encodeURIComponent(kw)}&db=ca`,
        { waitUntil: 'networkidle2', timeout: 40000 }
      );
      await sleep(5000);
      const kwData = await pg.evaluate((keyword) => {
        const r = { keyword, volume: '', kd: '', cpc: '', aiOverview: '' };
        const lines = document.body.innerText.split('\n').map(l => l.trim()).filter(Boolean);
        for (let i = 0; i < lines.length - 1; i++) {
          const label = lines[i];
          const value = lines[i + 1];
          if (!value || value === 'n/a') continue;
          if (label === 'Volume' && /^[\d,]+$/.test(value) && !r.volume) r.volume = value;
          if (label === 'Keyword Difficulty' && /^\d+%?$/.test(value) && !r.kd) r.kd = value.replace('%','');
          if (label === 'CPC' && /^[\d.$]+$/.test(value) && !r.cpc) r.cpc = value.startsWith('$') ? value : '$'+value;
        }
        // Check for AI overview section
        const bodyText = document.body.innerText;
        const aiIdx = bodyText.toLowerCase().indexOf('ai overview');
        if (aiIdx > -1) r.aiOverview = bodyText.substring(aiIdx, aiIdx + 400).replace(/\n/g, ' ');
        return r;
      }, kw);
      console.log(`vol=${kwData.volume||'?'} kd=${kwData.kd||'?'} cpc=${kwData.cpc||'?'} ai=${kwData.aiOverview ? 'YES' : 'no'}`);
      aiResults.push(kwData);
    } catch (e) {
      console.log(`⚠ Error: ${e.message.substring(0,50)}`);
      aiResults.push({ keyword: kw, volume: '', kd: '', cpc: '', aiOverview: '' });
    }
    await sleep(2000);
  }
  output.push({ type: 'ai_keywords', aiResults });

  // ─────────────────────────────────────────────────────────────────
  // SECTION 6: AI Visibility Tool (SEMrush AI Toolkit)
  // ─────────────────────────────────────────────────────────────────
  console.log('\n── 6. AI Visibility tool...');
  const aiToolUrls = [
    'https://www.semrush.com/ai-overview/',
    'https://www.semrush.com/trends/ai-overview/',
    'https://www.semrush.com/brand-monitoring/',
  ];

  const aiToolData = [];
  for (const url of aiToolUrls) {
    try {
      await pg.goto(url, { waitUntil: 'domcontentloaded', timeout: 20000 });
      await sleep(3000);
      const state = await pg.evaluate(() => ({
        url: window.location.href,
        title: document.title,
        text: document.body.innerText.substring(0, 500)
      }));
      if (!state.text.includes('got lost') && !state.text.includes("doesn't exist") && !state.text.includes('404')) {
        console.log(`  ✅ ${url} → ${state.title}`);
        aiToolData.push({ url, title: state.title, text: state.text });
      } else {
        console.log(`  ✗ ${url} → not found`);
      }
    } catch (e) {
      console.log(`  ✗ ${url} → ${e.message.substring(0,40)}`);
    }
  }

  // Try SEMrush AI Toolkit / AI Search Grader
  console.log('  → Checking SEMrush AI Search Grader...');
  try {
    await pg.goto('https://www.semrush.com/lp/ai-search-grader/en/', { waitUntil: 'networkidle2', timeout: 20000 });
    await sleep(3000);
    const graderState = await pg.evaluate(() => ({
      url: window.location.href,
      title: document.title,
      text: document.body.innerText.substring(0, 600)
    }));
    console.log(`  Grader: ${graderState.title} → ${graderState.text.substring(0, 200)}`);
    aiToolData.push({ url: graderState.url, title: graderState.title, text: graderState.text });
  } catch (e) {
    console.log(`  ✗ Grader: ${e.message.substring(0,50)}`);
  }

  output.push({ type: 'ai_tools', aiToolData });

  // ─────────────────────────────────────────────────────────────────
  // SECTION 7: Top Competitor Pages (HomeStars service×city, fresh)
  // ─────────────────────────────────────────────────────────────────
  console.log('\n── 7. HomeStars organic positions (service pages only)...');
  await pg.goto(
    `https://www.semrush.com/analytics/organic/positions/?q=homestars.com&db=ca&sortby=Po&order=asc`,
    { waitUntil: 'networkidle2', timeout: 45000 }
  );
  await sleep(8000);

  const homestarsRows = await pg.evaluate(() => {
    const results = [];
    document.querySelectorAll('table tbody tr').forEach((tr, i) => {
      if (i >= 80) return;
      const tds = Array.from(tr.querySelectorAll('td'));
      const kw  = tds[0]?.innerText?.trim()?.split('\n')[0] || '';
      const pos = tds[1]?.innerText?.trim()?.split('\n')[0] || '';
      const vol = tds[2]?.innerText?.trim()?.split('\n')[0] || '';
      const kd  = tds[3]?.innerText?.trim()?.split('\n')[0] || '';
      if (kw && /^\d+$/.test(pos.replace(/,/g, ''))) results.push({ kw, pos, vol, kd });
    });
    if (results.length > 0) return results;
    const lines = document.body.innerText.split('\n').map(l => l.trim()).filter(Boolean);
    for (let i = 0; i < lines.length - 3; i++) {
      const pos = lines[i + 1];
      const vol = lines[i + 2];
      if (/^\d+$/.test(pos) && parseInt(pos) <= 50 && /^[\d,]+$/.test(vol.replace(/,/g, ''))) {
        results.push({ kw: lines[i], pos, vol, kd: lines[i+3] || '' });
        i += 3;
        if (results.length >= 80) break;
      }
    }
    return results;
  });
  console.log(`  → ${homestarsRows.length} HomeStars rows`);

  // Filter to service-related only (exclude brand/company reviews)
  const serviceKeywords = ['handyman','plumb','electric','clean','junk','duct','snow','roof','paint','window','gutter','eavestrough','hvac','furnace','pest','locksmith','garage','fence','deck','foundation','mold','asbestos','drain'];
  const homestarsFiltered = homestarsRows.filter(r =>
    serviceKeywords.some(s => r.kw.toLowerCase().includes(s))
  );
  console.log(`  → ${homestarsFiltered.length} service-related rows`);
  output.push({ type: 'homestars', homestarsRows: homestarsFiltered });

  // ─────────────────────────────────────────────────────────────────
  // SECTION 8: SERP for Protasker's top quick-win opportunities
  // ─────────────────────────────────────────────────────────────────
  console.log('\n── 8. SERP analysis for top new opportunities...');

  const serpKeywords = [
    // New opportunities from GSC quick wins
    'smart home automation kitchener',
    'septic system inspection ontario',
    'siding contractor ontario',
    'home automation system toronto',
    // High-value service×city
    'deep cleaning mississauga',
    'plumbing repair mississauga',
    'roof repair ancaster',
    'fence installation pelham',
    'drain cleaning puslinch',
    'hvac repair flamborough',
    // Blog opportunities not yet covered
    'eavestrough cleaning cost ontario 2026',
    'garage door repair cost ontario',
    'furnace repair cost ontario 2026',
    'snow removal cost ontario 2026',
    'junk removal cost toronto 2026',
    // EV charger cluster (already working — expand)
    'ev charger installation cost ontario',
    'level 2 ev charger installation ontario',
    'ev charger rebate ontario 2026',
  ];

  const serpItems = [];
  for (const kw of serpKeywords) {
    process.stdout.write(`  → ${kw.padEnd(50)} `);
    try {
      await pg.goto(
        `https://www.semrush.com/analytics/keywordoverview/?q=${encodeURIComponent(kw)}&db=ca`,
        { waitUntil: 'networkidle2', timeout: 40000 }
      );
      await sleep(4500);
      const data = await pg.evaluate((keyword) => {
        const r = { keyword, volume: '', kd: '', cpc: '', serp: [] };
        const lines = document.body.innerText.split('\n').map(l => l.trim()).filter(Boolean);
        for (let i = 0; i < lines.length - 1; i++) {
          const label = lines[i];
          const value = lines[i + 1];
          if (!value || value === 'n/a') continue;
          if (label === 'Volume' && /^[\d,]+$/.test(value) && !r.volume) r.volume = value;
          if (label === 'Keyword Difficulty' && /^\d+%?$/.test(value) && !r.kd) r.kd = value.replace('%','');
          if (label === 'CPC' && /^[\d.$]+$/.test(value) && !r.cpc) r.cpc = value.startsWith('$') ? value : '$'+value;
        }
        const seen = new Set();
        const skip = ['semrush.com','google.com','facebook.com','twitter.com','instagram.com','youtube.com','linkedin.com','wikipedia.org','apple.com'];
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
      }, kw);
      console.log(`vol=${data.volume||'?'} kd=${data.kd||'?'} cpc=${data.cpc||'?'}`);
      serpItems.push(data);
    } catch (e) {
      console.log(`⚠ ${e.message.substring(0,50)}`);
      serpItems.push({ keyword: kw, volume: '', kd: '', cpc: '', serp: [] });
      await sleep(3000);
    }
    await sleep(1500);
  }
  output.push({ type: 'serp', serpItems });

  // ─────────────────────────────────────────────────────────────────
  // BUILD MARKDOWN REPORT
  // ─────────────────────────────────────────────────────────────────
  console.log('\n── Building markdown report...');
  const date = new Date().toISOString().split('T')[0];
  let md = `# Protasker.ca — Extended SEMrush Intelligence\n*Scraped: ${date} | Missing pieces vs April 12 research*\n\n`;

  for (const block of output) {

    if (block.type === 'organic') {
      md += `---\n\n## 1. PROTASKER ORGANIC KEYWORD POSITIONS\n\n`;
      md += `**Overview:** Keywords: ${block.overviewStats.keywords||'?'} | Est. Traffic: ${block.overviewStats.traffic||'?'} | Authority Score: ${block.overviewStats.score||'?'}\n\n`;
      if (block.organicRows.length) {
        md += `| # | Keyword | Pos | Volume | KD | URL |\n|---|---|---|---|---|---|\n`;
        block.organicRows.forEach((r, i) => {
          md += `| ${i+1} | ${r.kw} | ${r.pos} | ${r.vol} | ${r.kd} | ${r.url.substring(0,60)} |\n`;
        });
      } else {
        md += `_(No rows extracted — check SEMrush manually)_\n`;
      }
      md += '\n';
    }

    if (block.type === 'backlinks') {
      const b = block.backlinkData;
      md += `---\n\n## 2. BACKLINK ANALYSIS — protasker.ca\n\n`;
      md += `| Metric | Value |\n|---|---|\n`;
      md += `| Total Backlinks | ${b.total||'—'} |\n`;
      md += `| Referring Domains | ${b.referring||'—'} |\n`;
      md += `| Referring IPs | ${b.ips||'—'} |\n\n`;
      if (b.topDomains.length) {
        md += `### Top Referring Domains\n| Domain | Authority Score | Links |\n|---|---|---|\n`;
        b.topDomains.forEach(d => { md += `| ${d.domain} | ${d.score} | ${d.links} |\n`; });
      } else {
        md += `_(No referring domain data extracted)_\n`;
      }
      md += '\n';
    }

    if (block.type === 'gap') {
      md += `---\n\n## 3. KEYWORD GAP — Keywords Protasker is MISSING vs HomeStars + Bark\n\n`;
      if (block.gapRows.length) {
        md += `| # | Keyword | Volume | KD |\n|---|---|---|---|\n`;
        block.gapRows.forEach((r, i) => { md += `| ${i+1} | ${r.kw} | ${r.vol} | ${r.kd} |\n`; });
      } else {
        md += `_(No gap data extracted — try manually at SEMrush Keyword Gap tool)_\n`;
      }
      md += '\n';
    }

    if (block.type === 'weak') {
      md += `---\n\n## 3b. WEAK KEYWORDS — Protasker Ranks Lower Than Competitors\n\n`;
      if (block.weakRows.length) {
        md += `| Keyword | Volume | KD | Protasker Pos | Competitor Pos |\n|---|---|---|---|---|\n`;
        block.weakRows.forEach(r => { md += `| ${r.kw} | ${r.vol} | ${r.kd} | ${r.protaskerPos||'—'} | ${r.competitor||'—'} |\n`; });
      } else {
        md += `_(No weak keyword data extracted)_\n`;
      }
      md += '\n';
    }

    if (block.type === 'overviews') {
      md += `---\n\n## 4. DOMAIN AUTHORITY COMPARISON (Fresh ${date})\n\n`;
      md += `| Domain | Organic Traffic | Keywords | Backlinks | Authority Score |\n|---|---|---|---|---|\n`;
      block.overviews.forEach(o => {
        md += `| **${o.domain}** | ${o.traffic||'—'} | ${o.keywords||'—'} | ${o.backlinks||'—'} | ${o.score||'—'} |\n`;
      });
      md += '\n';
    }

    if (block.type === 'ai_keywords') {
      md += `---\n\n## 5. AI INTELLIGENCE — Home Services Keywords (AI Overview Data)\n\n`;
      block.aiResults.forEach(r => {
        md += `### ${r.keyword}\n`;
        md += `**Volume:** ${r.volume||'—'} | **KD:** ${r.kd||'—'} | **CPC:** ${r.cpc||'—'}\n`;
        if (r.aiOverview) md += `**AI Overview:** ${r.aiOverview.substring(0,300)}\n`;
        md += '\n';
      });
    }

    if (block.type === 'ai_tools') {
      md += `---\n\n## 6. AI TOOLS AVAILABLE IN SEMRUSH\n\n`;
      if (block.aiToolData.length) {
        block.aiToolData.forEach(t => {
          md += `### ${t.title}\n**URL:** ${t.url}\n\n${t.text.substring(0,400)}\n\n`;
        });
      } else {
        md += `_(No AI tool pages found — may need subscription upgrade)_\n\n`;
      }
    }

    if (block.type === 'homestars') {
      md += `---\n\n## 7. HOMESTARS — SERVICE KEYWORD RANKINGS (Fresh)\n\n`;
      if (block.homestarsRows.length) {
        md += `| Keyword | Pos | Volume | KD |\n|---|---|---|---|\n`;
        block.homestarsRows.forEach(r => { md += `| ${r.kw} | ${r.pos} | ${r.vol} | ${r.kd} |\n`; });
      } else {
        md += `_(No rows extracted)_\n`;
      }
      md += '\n';
    }

    if (block.type === 'serp') {
      md += `---\n\n## 8. SERP ANALYSIS — New Opportunities\n\n`;
      block.serpItems.forEach(s => {
        md += `### ${s.keyword}\n`;
        md += `**Volume:** ${s.volume||'—'} | **KD:** ${s.kd||'—'} | **CPC:** ${s.cpc||'—'}\n\n`;
        if (s.serp.length > 0) {
          s.serp.slice(0,10).forEach((d, i) => { md += `${i+1}. ${d}\n`; });
        } else {
          md += `_(No SERP data extracted)_\n`;
        }
        md += '\n';
      });
    }
  }

  // ── Final GSC Quick Wins Summary (from MCP data already pulled)
  md += `---\n\n## 9. GSC QUICK WINS (April 14, 2026)\n\n`;
  md += `*Data from Google Search Console MCP — 31 opportunities identified*\n\n`;
  md += `### TOP QUICK WINS (high impressions, pos 4-15, 0% CTR)\n\n`;
  md += `| Query | Page | Pos | Impressions | Potential Clicks |\n|---|---|---|---|---|\n`;
  const quickWins = [
    { q: 'smart home automation system kitchener', p: '/services/home-automation/kitchener', pos: '9.7', imp: '289', pot: '14' },
    { q: 'smart home automation kitchener', p: '/services/home-automation/kitchener', pos: '13.4', imp: '246', pot: '12' },
    { q: 'smart home automation services kitchener', p: '/services/home-automation/kitchener', pos: '14.4', imp: '244', pot: '12' },
    { q: 'ev charger installation alliston', p: '/blog/level-2-ev-charger-installation/alliston', pos: '6.7', imp: '217', pot: '11' },
    { q: 'septic system inspection oakville', p: '/services/septic-tank-inspection/oakville', pos: '6.3', imp: '162', pot: '8' },
    { q: 'siding contractor flamborough', p: '/services/siding-repair/flamborough', pos: '4.1', imp: '165', pot: '8' },
    { q: 'septic system inspection burlington', p: '/services/septic-tank-inspection/burlington', pos: '7.0', imp: '88', pot: '4' },
    { q: 'hvac flamborough', p: '/services/hvac-maintenance/flamborough', pos: '10.4', imp: '78', pot: '4' },
    { q: 'is foundation repair worth it mississauga', p: '/blog/basement-waterproofing-vs-foundation-repair/mississauga', pos: '7.9', imp: '59', pot: '3' },
    { q: 'deep cleaning', p: '/services/deep-cleaning/mississauga', pos: '13.1', imp: '59', pot: '3' },
    { q: 'plumbing repair', p: '/services/plumbing-repair/mississauga', pos: '14.7', imp: '52', pot: '3' },
    { q: 'ev chargers installation brantford', p: '/services/ev-charger-install/brantford', pos: '5.7', imp: '64', pot: '3' },
  ];
  quickWins.forEach(w => { md += `| ${w.q} | ${w.p} | ${w.pos} | ${w.imp} | ${w.pot} |\n`; });
  md += '\n### KEY INSIGHT: Home Automation Kitchener = Biggest Opportunity\n';
  md += '- 4 queries all pointing to `/services/home-automation/kitchener`\n';
  md += '- Total: 907 impressions, pos 9-14, ZERO clicks\n';
  md += '- Fix: Improve page title, add "Kitchener" + "Smart Home" to H1, add FAQ schema\n\n';

  md += `---\n\n## 10. TRAFFIC TREND (March 14 – April 12, 2026)\n\n`;
  md += `| Period | Avg Daily Clicks | Avg Position | Trend |\n|---|---|---|---|\n`;
  md += `| Mar 14–18 (launch week) | 9 | 34–41 | Indexing |\n`;
  md += `| Mar 19–25 (growth) | 37 | 22–28 | 📈 Surging |\n`;
  md += `| Mar 26–Apr 5 (settle) | 28 | 21–26 | → Stabilizing |\n`;
  md += `| Apr 6–12 (now) | 25 | **17–18** | 📈 Improving |\n\n`;
  md += `**Total clicks (31 days): ~827 (Canada) | Peak: 65 clicks on Mar 23**\n`;
  md += `**Avg position: improved from ~35 → ~17 in 4 weeks**\n`;
  md += `**Device split: Mobile 58% (483 clicks) | Desktop 39% (326 clicks)**\n\n`;

  writeFileSync(OUT, md, 'utf8');
  console.log(`\n✅ Saved to: ${OUT}`);

  try { await pg.close(); } catch (_) {}
  browser.disconnect();
}

main().catch(err => {
  console.error('Fatal:', err.message);
  process.exit(1);
});
