/**
 * protasker-competitor-kw.mjs
 * Pulls full organic keyword rankings for Protasker's top competitors:
 *   HomeStars, Bark, Jiffy, Angi, Kijiji (home services section)
 * Then finds keyword gaps — what they rank for that Protasker doesn't.
 *
 * Output: C:/Users/Owner/Documents/Protasker-Competitor-KW.md
 */

import puppeteer from 'puppeteer';
import { writeFileSync } from 'fs';
const sleep = ms => new Promise(r => setTimeout(r, ms));

const OUT    = 'C:/Users/Owner/Documents/Protasker-Competitor-KW.md';
const DB     = 'ca';
const ROWS   = 200; // rows per competitor

const COMPETITORS = [
  { domain: 'homestars.com',   label: 'HomeStars' },
  { domain: 'bark.com',        label: 'Bark.com' },
  { domain: 'jiffy.com',       label: 'Jiffy' },
  { domain: 'angi.com',        label: 'Angi' },
  { domain: 'kijiji.ca',       label: 'Kijiji' },
  { domain: 'homestars.com',   label: 'HomeStars (p2)', page: 2 },  // second page
];

// Skip branded / irrelevant patterns
const SKIP = [
  /^homestars/i, /^bark\b/i, /^jiffy\b/i, /^angi\b/i, /^kijiji\b/i,
  /login|sign.?up|account|review|rating|contact|about|press|career/i,
  /^www\./i,
];
function relevant(kw) { return !SKIP.some(p => p.test(kw)) && kw.length > 3; }

// ── SCRAPE ORGANIC POSITIONS ────────────────────────────────────────────────
async function getOrganic(pg, domain, page = 1) {
  const offset = (page - 1) * 100;
  const url = `https://www.semrush.com/analytics/organic/positions/?q=${domain}&db=${DB}&sortby=Po&order=asc&offset=${offset}`;
  process.stdout.write(`  Fetching ${domain} organic (page ${page})... `);
  await pg.goto(url, { waitUntil: 'networkidle2', timeout: 45000 });
  await sleep(8000);

  const rows = await pg.evaluate(() => {
    const results = [];
    document.querySelectorAll('table tbody tr').forEach((tr, i) => {
      if (i >= 100) return;
      const tds = Array.from(tr.querySelectorAll('td'));
      const kw  = tds[0]?.innerText?.trim()?.split('\n')[0] || '';
      const pos = tds[1]?.innerText?.trim()?.split('\n')[0] || '';
      const vol = tds[2]?.innerText?.trim()?.split('\n')[0] || '';
      const kd  = tds[3]?.innerText?.trim()?.split('\n')[0] || '';
      const pageUrl = tds[5]?.innerText?.trim() || tds[4]?.innerText?.trim() || '';
      if (kw && /^\d+$/.test(pos.replace(/,/g,''))) {
        results.push({ kw, pos: parseInt(pos), vol, kd, url: pageUrl });
      }
    });
    if (results.length > 0) return results;

    // Fallback line scan
    const lines = document.body.innerText.split('\n').map(l => l.trim()).filter(Boolean);
    for (let i = 0; i < lines.length - 3; i++) {
      const posStr = lines[i + 1];
      const vol    = lines[i + 2];
      if (/^\d+$/.test(posStr) && parseInt(posStr) <= 100 && /^[\d,]+$/.test(vol.replace(/,/g,''))) {
        results.push({ kw: lines[i], pos: parseInt(posStr), vol, kd: lines[i+3]||'', url: '' });
        i += 3;
        if (results.length >= 100) break;
      }
    }
    return results;
  });

  console.log(`${rows.length} rows`);
  return rows;
}

// ── DOMAIN OVERVIEW ─────────────────────────────────────────────────────────
async function getDomainOverview(pg, domain) {
  process.stdout.write(`  Overview: ${domain}... `);
  await pg.goto(
    `https://www.semrush.com/analytics/overview/?q=${domain}&searchType=domain&db=${DB}`,
    { waitUntil: 'networkidle2', timeout: 40000 }
  );
  await sleep(7000);
  const d = await pg.evaluate(() => {
    const lines = document.body.innerText.split('\n').map(l => l.trim()).filter(Boolean);
    const r = { keywords: '', traffic: '', as: '', rank: '' };
    for (let i = 0; i < lines.length - 1; i++) {
      const l = lines[i].toLowerCase(), v = lines[i+1];
      if (!v || v === 'n/a') continue;
      if (l === 'organic keywords' && !r.keywords) r.keywords = v;
      if (l === 'organic traffic' && !r.traffic) r.traffic = v;
      if ((l === 'authority score' || l === 'as') && /^\d+$/.test(v) && !r.as) r.as = v;
      if (l === 'semrush rank' && !r.rank) r.rank = v;
    }
    return r;
  });
  console.log(`kw=${d.keywords} traffic=${d.traffic} AS=${d.as}`);
  return d;
}

// ── MAIN ─────────────────────────────────────────────────────────────────────
async function main() {
  console.log('Connecting to Chrome...');
  const browser = await puppeteer.connect({ browserURL: 'http://localhost:9222', protocolTimeout: 60000 });

  // Use a SECOND tab so we don't interrupt the service keyword scraper
  const pages = await browser.pages();
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
  console.log('✅ SEMrush connected\n');

  const allData = {}; // domain → { label, overview, rows }

  // ── 1. Domain overviews for all competitors + Protasker
  console.log('── 1. Domain overviews...\n');
  const ALL_DOMAINS = [
    { domain: 'protasker.ca', label: 'Protasker' },
    { domain: 'homestars.com', label: 'HomeStars' },
    { domain: 'bark.com', label: 'Bark.com' },
    { domain: 'jiffy.com', label: 'Jiffy' },
    { domain: 'angi.com', label: 'Angi' },
    { domain: 'kijiji.ca', label: 'Kijiji' },
  ];
  const overviews = {};
  for (const c of ALL_DOMAINS) {
    overviews[c.domain] = { label: c.label, ...(await getDomainOverview(pg, c.domain)) };
    await sleep(2000);
  }

  // ── 2. Organic keywords for each competitor
  console.log('\n── 2. Competitor organic keywords...\n');
  for (const comp of [
    { domain: 'homestars.com', label: 'HomeStars', pages: [1, 2] },
    { domain: 'bark.com',      label: 'Bark.com',  pages: [1, 2] },
    { domain: 'jiffy.com',     label: 'Jiffy',     pages: [1] },
    { domain: 'angi.com',      label: 'Angi',      pages: [1] },
  ]) {
    console.log(`\n▶ ${comp.label} (${comp.domain})`);
    let rows = [];
    for (const p of comp.pages) {
      const r = await getOrganic(pg, comp.domain, p);
      rows = rows.concat(r);
      await sleep(3000);
    }
    allData[comp.domain] = { label: comp.label, rows: rows.filter(r => relevant(r.kw)) };
    saveReport(overviews, allData);
    console.log(`  ✓ Saved checkpoint (${rows.length} total rows for ${comp.label})`);
  }

  // ── 3. Also pull Protasker positions to cross-reference gap
  console.log('\n── 3. Protasker current positions...\n');
  const ptRows = [];
  for (const p of [1, 2, 3]) {
    const r = await getOrganic(pg, 'protasker.ca', p);
    if (r.length === 0) break;
    ptRows.push(...r);
  }
  allData['protasker.ca'] = { label: 'Protasker', rows: ptRows };

  saveReport(overviews, allData);
  console.log(`\n✅ Final report saved to ${OUT}`);
  try { await pg.close(); } catch(_) {}
  browser.disconnect();
}

// ── REPORT ────────────────────────────────────────────────────────────────────
function saveReport(overviews, allData) {
  const date = new Date().toISOString().split('T')[0];
  let md = `# Protasker — Competitor Keyword Intelligence\n`;
  md += `*Generated: ${date} | Canada (ca) database*\n\n`;

  // ── Domain overview comparison
  md += `---\n\n## DOMAIN OVERVIEW COMPARISON\n\n`;
  md += `| Domain | Organic Keywords | Est. Traffic | Authority Score | SEMrush Rank |\n`;
  md += `|---|---|---|---|---|\n`;
  Object.values(overviews).forEach(o => {
    const isSelf = o.label === 'Protasker';
    md += `| ${isSelf ? '**Protasker.ca**' : o.label} | ${o.keywords||'—'} | ${o.traffic||'—'} | ${o.as||'—'} | ${o.rank||'—'} |\n`;
  });

  // ── Gap analysis: keywords competitors have that Protasker doesn't
  md += `\n---\n\n## KEYWORD GAP — What Competitors Rank For (Protasker Doesn't)\n\n`;

  const protaskerKws = new Set(
    (allData['protasker.ca']?.rows || []).map(r => r.kw.toLowerCase().trim())
  );

  const allCompetitors = Object.entries(allData).filter(([d]) => d !== 'protasker.ca');
  const gaps = []; // { kw, vol, kd, pos, competitor }

  allCompetitors.forEach(([domain, { label, rows }]) => {
    rows.forEach(r => {
      if (!protaskerKws.has(r.kw.toLowerCase().trim()) && relevant(r.kw)) {
        const vol = parseInt(r.vol?.replace(/,/g,'') || '0');
        const kd  = parseInt(r.kd || '100');
        if (vol >= 50 || kd <= 20) {
          gaps.push({ kw: r.kw, vol, kd, pos: r.pos, competitor: label, url: r.url });
        }
      }
    });
  });

  // Sort by volume × (1/KD) — prioritize high vol, low KD
  gaps.sort((a, b) => (b.vol / (b.kd + 1)) - (a.vol / (a.kd + 1)));

  // Deduplicate (keep highest vol entry per keyword)
  const seen = new Set();
  const deduped = gaps.filter(g => {
    if (seen.has(g.kw.toLowerCase())) return false;
    seen.add(g.kw.toLowerCase());
    return true;
  });

  md += `| Keyword | Vol | KD | Competitor | Pos | Ranking URL |\n`;
  md += `|---|---|---|---|---|---|\n`;
  deduped.slice(0, 100).forEach(g => {
    md += `| ${g.kw} | ${g.vol||'—'} | ${g.kd||'—'} | ${g.competitor} | ${g.pos} | ${g.url?.substring(0,60)||'—'} |\n`;
  });

  // ── Per-competitor top keywords
  md += `\n---\n\n## PER-COMPETITOR TOP KEYWORDS\n\n`;

  allCompetitors.forEach(([domain, { label, rows }]) => {
    const topRows = rows
      .filter(r => relevant(r.kw))
      .sort((a, b) => parseInt(b.vol?.replace(/,/g,'') || '0') - parseInt(a.vol?.replace(/,/g,'') || '0'))
      .slice(0, 60);

    md += `### ${label} — Top 60 Keywords\n\n`;
    md += `| Keyword | Vol | KD | Position | URL |\n`;
    md += `|---|---|---|---|---|\n`;
    topRows.forEach(r => {
      const inProtasker = protaskerKws.has(r.kw.toLowerCase().trim());
      const mark = inProtasker ? ' ✓PT' : '';
      md += `| ${r.kw}${mark} | ${r.vol||'—'} | ${r.kd||'—'} | ${r.pos} | ${r.url?.substring(0,60)||'—'} |\n`;
    });
    md += '\n';
  });

  // ── Protasker current rankings
  if (allData['protasker.ca']) {
    const ptRows = allData['protasker.ca'].rows
      .sort((a, b) => a.pos - b.pos)
      .slice(0, 80);
    md += `---\n\n## PROTASKER CURRENT RANKINGS (top 80)\n\n`;
    md += `| Keyword | Position | Vol | KD |\n|---|---|---|---|\n`;
    ptRows.forEach(r => {
      md += `| ${r.kw} | ${r.pos} | ${r.vol||'—'} | ${r.kd||'—'} |\n`;
    });
  }

  writeFileSync(OUT, md, 'utf8');
}

main().catch(e => { console.error('Fatal:', e.message); process.exit(1); });
