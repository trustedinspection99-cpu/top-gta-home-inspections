/**
 * semrush-protasker-browser.mjs
 * Puppeteer scraper — connects to already-open Chrome on port 9222
 * Pulls SEMrush keyword data for Protasker's 22 core services
 *
 * Output: C:/Users/Owner/Documents/Protasker-22Services-Research.md
 */

import puppeteer from 'puppeteer';
import { writeFileSync } from 'fs';

const DEBUG_PORT = 9222;
const OUT = 'C:/Users/Owner/Documents/Protasker-22Services-Research.md';
const sleep = ms => new Promise(r => setTimeout(r, ms));

// ── Priority keywords (22 services) ─────────────────────────────────────────
const KEYWORDS = [
  // Handyman
  'handyman near me','handyman toronto','handyman mississauga',
  // Plumbing
  'plumber near me','plumber toronto','emergency plumber toronto','drain cleaning toronto',
  // Electrical
  'electrician near me','electrician toronto','electrical panel upgrade toronto','200 amp panel upgrade cost ontario',
  // HVAC
  'furnace repair near me','furnace repair toronto','ac repair near me','ac repair toronto',
  // Duct cleaning
  'duct cleaning near me','duct cleaning toronto','duct cleaning mississauga',
  // Junk removal
  'junk removal near me','junk removal toronto','junk removal mississauga',
  // Garage door
  'garage door repair near me','garage door repair toronto',
  // Roofing
  'roof repair near me','roof repair toronto','flat roof repair toronto',
  // Eavestrough/gutters
  'eavestrough cleaning near me','eavestrough cleaning toronto','gutter cleaning toronto',
  // Window cleaning
  'window cleaning near me','window cleaning toronto',
  // Pressure washing
  'pressure washing near me','pressure washing toronto',
  // Deep cleaning
  'house cleaning toronto','deep cleaning toronto','move out cleaning toronto',
  // Lawn
  'lawn care near me','lawn care toronto','lawn mowing toronto',
  // Snow removal
  'snow removal near me','snow removal toronto',
  // Interior painting
  'interior painting near me','interior painters toronto','painters toronto',
  // Exterior painting
  'exterior painting near me','exterior painting toronto','house painting toronto',
  // Bathroom reno
  'bathroom renovation toronto','bathroom renovation near me','bathroom renovation cost toronto',
  // Kitchen reno
  'kitchen renovation toronto','kitchen renovation near me','kitchen renovation cost toronto',
  // Basement reno
  'basement renovation toronto','basement finishing toronto','basement renovation near me',
  // Attic insulation
  'attic insulation near me','attic insulation toronto','attic insulation cost ontario',
  // Foundation / waterproofing
  'foundation repair near me','foundation repair toronto','basement waterproofing toronto',
  // EV charger
  'ev charger installation near me','ev charger installation toronto','ev charger rebate ontario','level 2 charger installation toronto',
];

async function scrapeKw(page, kw) {
  process.stdout.write(`  ${kw.padEnd(50)} `);
  try {
    await page.goto(
      `https://www.semrush.com/analytics/keywordoverview/?q=${encodeURIComponent(kw)}&db=ca`,
      { waitUntil: 'networkidle2', timeout: 40000 }
    );
    await sleep(4000);

    const data = await page.evaluate((keyword) => {
      const r = { kw: keyword, vol: '', kd: '', cpc: '' };
      const lines = document.body.innerText.split('\n').map(l => l.trim()).filter(Boolean);
      for (let i = 0; i < lines.length - 1; i++) {
        const lbl = lines[i];
        const val = lines[i + 1];
        if (!val || val === 'n/a' || val === '—') continue;
        if (lbl === 'Volume' && /^[\d,]+$/.test(val) && !r.vol) r.vol = val.replace(/,/g, '');
        if (lbl === 'Keyword Difficulty' && /^\d+%?$/.test(val) && !r.kd) r.kd = val.replace('%', '');
        if (lbl === 'CPC' && /^\$?[\d.]+$/.test(val) && !r.cpc) r.cpc = val.startsWith('$') ? val : '$' + val;
      }
      return r;
    }, kw);

    console.log(`vol=${data.vol||'?'} kd=${data.kd||'?'} cpc=${data.cpc||'?'}`);
    return data;
  } catch (e) {
    console.log(`ERROR: ${e.message.slice(0, 40)}`);
    return { kw, vol: '', kd: '', cpc: '' };
  }
}

async function scrapeOrganic(page, domain, label) {
  console.log(`\nPulling ${label} organic positions...`);
  try {
    await page.goto(
      `https://www.semrush.com/analytics/organic/positions/?q=${domain}&db=ca&sortby=Po&order=asc`,
      { waitUntil: 'networkidle2', timeout: 45000 }
    );
    await sleep(8000);

    const rows = await page.evaluate(() => {
      const results = [];
      document.querySelectorAll('table tbody tr').forEach((tr, i) => {
        if (i >= 100) return;
        const tds = Array.from(tr.querySelectorAll('td'));
        if (tds.length < 3) return;
        const kw  = tds[0]?.innerText?.trim()?.split('\n')[0] || '';
        const pos = tds[1]?.innerText?.trim()?.split('\n')[0] || '';
        const vol = tds[2]?.innerText?.trim()?.split('\n')[0] || '';
        const kd  = tds[3]?.innerText?.trim()?.split('\n')[0] || '';
        const url = tds[4]?.innerText?.trim()?.split('\n')[0] || tds[5]?.innerText?.trim()?.split('\n')[0] || '';
        if (kw && pos && /^\d+$/.test(pos.replace(/,/g, ''))) results.push({ kw, pos, vol, kd, url });
      });
      if (results.length > 0) return results;

      // Fallback: line scan
      const lines = document.body.innerText.split('\n').map(l => l.trim()).filter(Boolean);
      for (let i = 0; i < lines.length - 3; i++) {
        const pos = lines[i + 1];
        const vol = lines[i + 2];
        if (/^\d+$/.test(pos) && parseInt(pos) <= 100 && /^[\d,]+$/.test(vol.replace(/,/g, ''))) {
          results.push({ kw: lines[i], pos, vol, kd: lines[i + 3] || '', url: '' });
          i += 3;
          if (results.length >= 100) break;
        }
      }
      return results;
    });

    console.log(`  → ${rows.length} rows`);
    return rows;
  } catch (e) {
    console.log(`  ERROR: ${e.message.slice(0, 60)}`);
    return [];
  }
}

async function scrapeOverview(page, domain) {
  try {
    await page.goto(
      `https://www.semrush.com/analytics/overview/?q=${domain}&db=ca`,
      { waitUntil: 'networkidle2', timeout: 40000 }
    );
    await sleep(6000);
    return await page.evaluate((dom) => {
      const r = { domain: dom, traffic: '?', keywords: '?', as: '?' };
      const lines = document.body.innerText.split('\n').map(l => l.trim()).filter(Boolean);
      for (let i = 0; i < lines.length - 1; i++) {
        const lbl = lines[i].toLowerCase();
        const val = lines[i + 1];
        if (!val || val === 'n/a' || val === '—') continue;
        if (!(/^[\d,\.KkMmBb]+$/.test(val.replace(/[,%$<>]/g, '')))) continue;
        if (lbl === 'organic traffic' && !r._t) { r.traffic = val; r._t = 1; }
        if (lbl.includes('keyword') && !r._k) { r.keywords = val; r._k = 1; }
        if ((lbl.includes('authority') || lbl === 'as') && !r._a) { r.as = val; r._a = 1; }
      }
      return r;
    }, domain);
  } catch { return { domain, traffic: '?', keywords: '?', as: '?' }; }
}

async function main() {
  console.log('Connecting to Chrome on port 9222...');
  const browser = await puppeteer.connect({ browserURL: `http://localhost:${DEBUG_PORT}`, protocolTimeout: 60000 });
  const pages = await browser.pages();
  const page = pages[0] || await browser.newPage();
  page.setDefaultTimeout(45000);

  // Block images/fonts for speed
  await page.setRequestInterception(true);
  page.on('request', req => {
    try {
      if (['image','font','media'].includes(req.resourceType())) req.abort();
      else req.continue();
    } catch (_) {}
  });

  // Verify login
  console.log('Verifying SEMrush login...');
  await page.goto('https://www.semrush.com/dashboard/', { waitUntil: 'networkidle2', timeout: 30000 });
  await sleep(3000);
  if (page.url().includes('login') || page.url().includes('signin')) {
    console.error('❌ Not logged in. Please log in to SEMrush in the Chrome window and re-run.');
    process.exit(1);
  }
  console.log('✅ Logged in\n');

  const lines = [];
  const push = (...l) => lines.push(...l);
  const today = new Date().toISOString().split('T')[0];

  push(`# Protasker.ca — 22-Service SEMrush Research`, `*${today} | Canada database | Puppeteer scrape*`, '');

  // ── 1. Domain overviews ───────────────────────────────────────────────────
  push('## 1. Domain Authority Comparison', '');
  const domains = ['protasker.ca','homestars.com','bark.com','trustedpros.ca','jiffyondemand.com'];
  push('| Domain | Organic Traffic | Keywords | Auth Score |');
  push('|---|---|---|---|');
  for (const d of domains) {
    process.stdout.write(`  overview: ${d}... `);
    const ov = await scrapeOverview(page, d);
    console.log(`traffic=${ov.traffic} kw=${ov.keywords} as=${ov.as}`);
    push(`| **${d}** | ${ov.traffic} | ${ov.keywords} | ${ov.as} |`);
    await sleep(2000);
  }
  push('');

  // ── 2. Protasker current rankings ─────────────────────────────────────────
  const ptRows = await scrapeOrganic(page, 'protasker.ca', 'protasker.ca');
  push('## 2. Protasker.ca Current Organic Rankings', '');
  if (ptRows.length) {
    const p1 = ptRows.filter(r => parseInt(r.pos) <= 10);
    const p2 = ptRows.filter(r => parseInt(r.pos) > 10 && parseInt(r.pos) <= 20);
    const p3 = ptRows.filter(r => parseInt(r.pos) > 20 && parseInt(r.pos) <= 30);

    push(`**Total keywords:** ${ptRows.length}`, '');
    push('### Positions 1–10 (Page 1)');
    push('| Keyword | Pos | Vol | KD | URL |');
    push('|---|---|---|---|---|');
    p1.forEach(r => push(`| ${r.kw} | ${r.pos} | ${r.vol} | ${r.kd} | ${r.url} |`));

    push('', '### Positions 11–20');
    push('| Keyword | Pos | Vol | KD |');
    push('|---|---|---|---|');
    p2.forEach(r => push(`| ${r.kw} | ${r.pos} | ${r.vol} | ${r.kd} |`));

    push('', '### Positions 21–30');
    push('| Keyword | Pos | Vol | KD |');
    push('|---|---|---|---|');
    p3.forEach(r => push(`| ${r.kw} | ${r.pos} | ${r.vol} | ${r.kd} |`));
  } else {
    push('*(No data — try scrolling past any cookie banners in the Chrome window)*');
  }
  push('');

  // ── 3. Keyword metrics for 22 services ───────────────────────────────────
  push('## 3. Keyword Metrics — 22 Core Services', '');
  console.log(`\nScraping ${KEYWORDS.length} keywords...`);
  const kwResults = [];
  for (const kw of KEYWORDS) {
    const d = await scrapeKw(page, kw);
    kwResults.push(d);
    await sleep(1500);
  }

  push('| Keyword | Vol | KD | CPC | Priority |');
  push('|---|---|---|---|---|');
  for (const d of kwResults) {
    const vol = parseInt(d.vol) || 0;
    const kd  = parseInt(d.kd)  || 0;
    const diff = kd === 0 ? '—' : kd <= 14 ? '🟢 EASY' : kd <= 24 ? '🟡 MED' : kd <= 39 ? '🟠 HARD' : '🔴 V.HARD';
    const pri  = vol >= 5000 ? '🔥 TOP' : vol >= 1000 ? '⭐ HIGH' : vol >= 200 ? '📌 MED' : '⬜ LOW';
    push(`| ${d.kw} | ${d.vol||'—'} | ${d.kd||'—'} (${diff}) | ${d.cpc||'—'} | ${pri} |`);
  }
  push('');

  // ── 4. Easy wins (KD ≤ 20, vol ≥ 200) ───────────────────────────────────
  push('## 4. Easy Wins — KD ≤ 20, Vol ≥ 200', '');
  const easy = kwResults
    .filter(d => parseInt(d.kd) > 0 && parseInt(d.kd) <= 20 && parseInt(d.vol) >= 200)
    .sort((a, b) => parseInt(b.vol) - parseInt(a.vol));
  if (easy.length) {
    push('| Keyword | Vol | KD | CPC |');
    push('|---|---|---|---|');
    easy.forEach(d => push(`| ${d.kw} | ${d.vol} | ${d.kd} | ${d.cpc} |`));
  } else {
    push('*(Check individual keyword data above — some may have scraped without KD)*');
  }
  push('');

  // ── 5. Competitor rankings ────────────────────────────────────────────────
  push('## 5. Competitor Rankings', '');
  const serviceTerms = ['handyman','plumber','electrician','furnace','ac repair','hvac','duct clean',
    'junk removal','garage door','roof','eavestrough','gutter','window clean','pressure wash',
    'house clean','deep clean','lawn','snow removal','interior paint','exterior paint',
    'bathroom renov','kitchen renov','basement','insulation','foundation','waterproof','ev charger'];

  for (const comp of ['homestars.com','bark.com','trustedpros.ca']) {
    const rows = await scrapeOrganic(page, comp, comp);
    const relevant = rows.filter(r => serviceTerms.some(t => r.kw.toLowerCase().includes(t)));
    push(`### ${comp} — Service Keywords (top 40)`);
    push('| Keyword | Pos | Vol | KD |');
    push('|---|---|---|---|');
    relevant.slice(0, 40).forEach(r => push(`| ${r.kw} | ${r.pos} | ${r.vol} | ${r.kd} |`));
    push('');
    await sleep(2000);
  }

  // ── 6. Service summary ────────────────────────────────────────────────────
  push('## 6. Service Priority Matrix', '');
  push('*Based on best keyword per service*', '');
  const serviceMap = {
    'Handyman':           ['handyman near me','handyman toronto'],
    'Plumbing':           ['plumber near me','plumber toronto'],
    'Electrician':        ['electrician near me','electrician toronto'],
    'HVAC':               ['furnace repair near me','ac repair near me'],
    'Duct Cleaning':      ['duct cleaning near me','duct cleaning toronto'],
    'Junk Removal':       ['junk removal near me','junk removal toronto'],
    'Garage Door':        ['garage door repair near me','garage door repair toronto'],
    'Roof Repair':        ['roof repair near me','roof repair toronto'],
    'Eavestrough':        ['eavestrough cleaning near me','eavestrough cleaning toronto'],
    'Window Cleaning':    ['window cleaning near me','window cleaning toronto'],
    'Pressure Washing':   ['pressure washing near me','pressure washing toronto'],
    'Deep Cleaning':      ['house cleaning toronto','deep cleaning toronto'],
    'Lawn Care':          ['lawn care near me','lawn care toronto'],
    'Snow Removal':       ['snow removal near me','snow removal toronto'],
    'Interior Painting':  ['interior painting near me','interior painters toronto'],
    'Exterior Painting':  ['exterior painting near me','exterior painting toronto'],
    'Bathroom Reno':      ['bathroom renovation near me','bathroom renovation toronto'],
    'Kitchen Reno':       ['kitchen renovation near me','kitchen renovation toronto'],
    'Basement Reno':      ['basement renovation near me','basement finishing toronto'],
    'Attic Insulation':   ['attic insulation near me','attic insulation toronto'],
    'Foundation Repair':  ['foundation repair near me','basement waterproofing toronto'],
    'EV Charger':         ['ev charger installation near me','ev charger installation toronto'],
  };
  const kwMap = Object.fromEntries(kwResults.map(d => [d.kw, d]));
  push('| Service | Best Keyword | Vol | KD | CPC | Attack? |');
  push('|---|---|---|---|---|---|');
  for (const [svc, kws] of Object.entries(serviceMap)) {
    const candidates = kws.map(k => kwMap[k]).filter(Boolean).filter(d => d.vol);
    const best = candidates.sort((a, b) => parseInt(b.vol) - parseInt(a.vol))[0];
    if (!best) { push(`| ${svc} | — | — | — | — | — |`); continue; }
    const kd = parseInt(best.kd) || 0;
    const vol = parseInt(best.vol) || 0;
    const attack = (kd > 0 && kd <= 20) ? '✅ YES' : (kd <= 35 && vol >= 1000) ? '⚠️ MAYBE' : '❌ LATER';
    push(`| ${svc} | ${best.kw} | ${best.vol} | ${best.kd||'?'} | ${best.cpc||'?'} | ${attack} |`);
  }
  push('');

  writeFileSync(OUT, lines.join('\n'), 'utf-8');
  console.log(`\n✅ Done → ${OUT}`);
}

main().catch(e => { console.error('Fatal:', e.message); process.exit(1); });
