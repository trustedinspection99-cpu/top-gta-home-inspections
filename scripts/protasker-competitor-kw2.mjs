/**
 * protasker-competitor-kw2.mjs
 * Fixed version — uses line-by-line text parsing instead of DOM table query
 * because SEMrush uses virtual/lazy tables.
 */

import puppeteer from 'puppeteer';
import { writeFileSync } from 'fs';
const sleep = ms => new Promise(r => setTimeout(r, ms));

const OUT = 'C:/Users/Owner/Documents/Protasker-Competitor-KW.md';
const DB  = 'ca';

// ── SCRAPE ORGANIC POSITIONS (line scan method) ───────────────────────────────
async function getOrganic(pg, domain, pageNum = 1) {
  const offset = (pageNum - 1) * 100;
  const url = `https://www.semrush.com/analytics/organic/positions/?q=${domain}&db=${DB}&sortby=Po&order=asc&offset=${offset}`;
  process.stdout.write(`  ${domain} p${pageNum}: `);
  try {
    await pg.goto(url, { waitUntil: 'networkidle2', timeout: 40000 });
    await sleep(9000);
  } catch(e) {
    console.log(`timeout, using what loaded`);
    await sleep(3000);
  }

  const rows = await pg.evaluate(() => {
    const results = [];
    // Method 1: Try table rows first
    document.querySelectorAll('table tbody tr').forEach((tr, i) => {
      if (i >= 100) return;
      const cells = Array.from(tr.querySelectorAll('td'));
      const kw  = cells[0]?.innerText?.trim()?.split('\n')[0] || '';
      const pos = cells[1]?.innerText?.trim()?.split('\n')[0] || '';
      const vol = cells[2]?.innerText?.trim()?.split('\n')[0] || '';
      const kd  = cells[3]?.innerText?.trim()?.split('\n')[0] || '';
      if (kw && kw.length > 2 && /^\d+$/.test(pos.replace(/,/g,'')) && parseInt(pos) <= 150)
        results.push({ kw, pos: +pos, vol: vol.replace(/,/g,''), kd });
    });
    if (results.length >= 10) return results;

    // Method 2: Line scan — look for pattern: keyword line, then number (pos), then number (vol)
    const lines = document.body.innerText.split('\n').map(l => l.trim()).filter(l => l.length > 0);
    let i = 0;
    while (i < lines.length - 3 && results.length < 100) {
      const maybePOS = lines[i + 1];
      const maybeVOL = lines[i + 2];
      const maybeKD  = lines[i + 3];
      // Position: 1-150, Volume: digits+commas
      if (/^\d+$/.test(maybePOS) && +maybePOS >= 1 && +maybePOS <= 150 &&
          /^[\d,]+$/.test(maybeVOL.replace(/,/g,''))) {
        const kw = lines[i];
        // Skip non-keyword lines
        if (kw.length > 2 && kw.length < 100 &&
            !kw.startsWith('Skip') && !kw.startsWith('http') &&
            !kw.includes('©') && !/^\d+$/.test(kw)) {
          results.push({ kw, pos: +maybePOS, vol: maybeVOL.replace(/,/g,''), kd: maybeKD });
          i += 4;
          continue;
        }
      }
      i++;
    }
    return results;
  });

  console.log(`${rows.length} rows`);
  return rows;
}

// ── BRANDED FILTER ────────────────────────────────────────────────────────────
const BRAND_SKIP = [
  /^homestars\b/i, /^bark\b/i, /^jiffy\b/i, /^angi\b/i, /^kijiji\b/i,
  /^home stars/i,
];
const SHORT_SKIP = ['login','signup','sign up','account','careers','press','contact','about us','blog'];
function relevant(kw) {
  if (!kw || kw.length < 4) return false;
  if (BRAND_SKIP.some(p => p.test(kw))) return false;
  if (SHORT_SKIP.includes(kw.toLowerCase().trim())) return false;
  return true;
}

// ── MAIN ─────────────────────────────────────────────────────────────────────
async function main() {
  console.log('Connecting to Chrome...');
  const browser = await puppeteer.connect({ browserURL: 'http://localhost:9222', protocolTimeout: 60000 });
  const pg = await browser.newPage();
  pg.setDefaultTimeout(50000);
  await pg.setRequestInterception(true);
  pg.on('request', req => {
    try {
      if (['image','font','media'].includes(req.resourceType())) req.abort();
      else req.continue();
    } catch(_) {}
  });

  await pg.goto('https://www.semrush.com/dashboard/', { waitUntil: 'networkidle2', timeout: 30000 });
  await sleep(3000);
  console.log('✅ Connected\n');

  const overviews = {
    'protasker.ca': { label: 'Protasker', keywords: '597', traffic: '33', as: '<10' },
    'homestars.com': { label: 'HomeStars', keywords: '140.5K', traffic: '144.7K', as: '50' },
    'bark.com':      { label: 'Bark.com',  keywords: '28.4K',  traffic: '34.9K',  as: '60' },
    'jiffy.com':     { label: 'Jiffy',     keywords: '2K',     traffic: '4.5K',   as: '44' },
    'angi.com':      { label: 'Angi',      keywords: '86.3K',  traffic: '56.2K',  as: '68' },
    'kijiji.ca':     { label: 'Kijiji',    keywords: '1.4M',   traffic: '4.7M',   as: '74' },
  };

  const allData = {};

  // Competitors to scrape
  const toScrape = [
    { domain: 'homestars.com', label: 'HomeStars', pages: [1, 2, 3] },
    { domain: 'bark.com',      label: 'Bark.com',  pages: [1, 2, 3] },
    { domain: 'jiffy.com',     label: 'Jiffy',     pages: [1] },
    { domain: 'angi.com',      label: 'Angi',      pages: [1] },
  ];

  for (const comp of toScrape) {
    console.log(`\n▶ ${comp.label}`);
    let rows = [];
    for (const p of comp.pages) {
      const r = await getOrganic(pg, comp.domain, p);
      rows = rows.concat(r);
      if (r.length < 50) break; // no more pages
      await sleep(3000);
    }
    allData[comp.domain] = { label: comp.label, rows: rows.filter(r => relevant(r.kw)) };
    console.log(`  → ${allData[comp.domain].rows.length} relevant rows`);
    saveReport(overviews, allData, {});
  }

  // Protasker positions
  console.log('\n▶ Protasker current positions');
  let ptRows = [];
  for (const p of [1, 2, 3]) {
    const r = await getOrganic(pg, 'protasker.ca', p);
    if (r.length < 5) break;
    ptRows = ptRows.concat(r);
    await sleep(2000);
  }
  allData['protasker.ca'] = { label: 'Protasker', rows: ptRows };

  saveReport(overviews, allData, {});
  console.log(`\n✅ Done. Saved to ${OUT}`);
  try { await pg.close(); } catch(_) {}
  browser.disconnect();
}

// ── REPORT ────────────────────────────────────────────────────────────────────
function saveReport(overviews, allData) {
  const date = new Date().toISOString().split('T')[0];
  let md = `# Protasker — Competitor Keyword Intelligence\n`;
  md += `*Generated: ${date} | Canada (ca) database*\n\n`;

  // Domain overview
  md += `---\n\n## DOMAIN OVERVIEW\n\n`;
  md += `| Domain | Org. Keywords | Est. Traffic | Authority Score |\n|---|---|---|---|\n`;
  Object.values(overviews).forEach(o => {
    const star = o.label === 'Protasker' ? ' ⬅' : '';
    md += `| ${o.label}${star} | ${o.keywords} | ${o.traffic} | ${o.as} |\n`;
  });

  // Build protasker keyword set for gap analysis
  const ptSet = new Set((allData['protasker.ca']?.rows || []).map(r => r.kw.toLowerCase().trim()));

  // Gap analysis
  md += `\n---\n\n## KEYWORD GAP (competitors rank, Protasker doesn't)\n\n`;
  const gaps = [];
  Object.entries(allData)
    .filter(([d]) => d !== 'protasker.ca')
    .forEach(([, { label, rows }]) => {
      rows.forEach(r => {
        if (!ptSet.has(r.kw.toLowerCase().trim())) {
          const vol = parseInt(r.vol || '0');
          const kd  = parseInt(r.kd || '100');
          if (vol >= 50 || kd <= 25) {
            gaps.push({ kw: r.kw, vol, kd, pos: r.pos, competitor: label });
          }
        }
      });
    });

  const seen = new Set();
  const deduped = gaps
    .filter(g => { const k = g.kw.toLowerCase(); if (seen.has(k)) return false; seen.add(k); return true; })
    .sort((a, b) => (b.vol / (b.kd + 1)) - (a.vol / (a.kd + 1)));

  md += `| Keyword | Vol | KD | Top Competitor | Their Pos |\n|---|---|---|---|---|\n`;
  deduped.slice(0, 80).forEach(g => {
    md += `| ${g.kw} | ${g.vol||'—'} | ${g.kd||'—'} | ${g.competitor} | ${g.pos} |\n`;
  });

  // Per-competitor
  md += `\n---\n\n## PER-COMPETITOR TOP KEYWORDS\n\n`;
  Object.entries(allData).filter(([d]) => d !== 'protasker.ca').forEach(([, { label, rows }]) => {
    const top = [...rows].sort((a, b) => parseInt(b.vol||'0') - parseInt(a.vol||'0')).slice(0, 60);
    md += `### ${label}\n\n| Keyword | Vol | KD | Pos | Protasker? |\n|---|---|---|---|---|\n`;
    top.forEach(r => {
      const inPT = ptSet.has(r.kw.toLowerCase().trim()) ? '✓ ranking' : '—';
      md += `| ${r.kw} | ${r.vol||'—'} | ${r.kd||'—'} | ${r.pos} | ${inPT} |\n`;
    });
    md += '\n';
  });

  // Protasker rankings
  if (allData['protasker.ca']?.rows?.length) {
    const pts = [...allData['protasker.ca'].rows].sort((a, b) => a.pos - b.pos).slice(0, 80);
    md += `---\n\n## PROTASKER CURRENT RANKINGS\n\n| Keyword | Position | Vol | KD |\n|---|---|---|---|\n`;
    pts.forEach(r => {
      md += `| ${r.kw} | ${r.pos} | ${r.vol||'—'} | ${r.kd||'—'} |\n`;
    });
  }

  writeFileSync(OUT, md, 'utf8');
}

main().catch(e => { console.error('Fatal:', e.message); process.exit(1); });
