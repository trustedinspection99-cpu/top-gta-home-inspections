/**
 * protasker-gather-all.mjs
 * Gathers ALL missing SEMrush data for Protasker:
 *  1. Keyword Magic Tool — service keyword variations (vol/KD/CPC)
 *  2. Competitor Organic Keywords — intercept SEMrush API response (bypasses virtual table)
 *  3. Top Pages per competitor
 *  4. Missing Domain Overviews (taskrabbit, yelp)
 *  5. Keyword Gap — derived from above
 *
 * Outputs:
 *   C:/Users/Owner/Documents/Protasker-Keyword-Magic.md
 *   C:/Users/Owner/Documents/Protasker-Competitor-Organic.md
 *   C:/Users/Owner/Documents/Protasker-Keyword-Gap.md
 */

import puppeteer from 'puppeteer';
import { writeFileSync } from 'fs';
const sleep = ms => new Promise(r => setTimeout(r, ms));
const DB = 'ca';

const OUT_MAGIC    = 'C:/Users/Owner/Documents/Protasker-Keyword-Magic.md';
const OUT_ORGANIC  = 'C:/Users/Owner/Documents/Protasker-Competitor-Organic.md';
const OUT_GAP      = 'C:/Users/Owner/Documents/Protasker-Keyword-Gap.md';

const COMPETITORS = [
  { domain: 'protasker.ca',      label: 'Protasker' },
  { domain: 'homestars.com',     label: 'HomeStars' },
  { domain: 'bark.com',          label: 'Bark.com' },
  { domain: 'jiffyondemand.com', label: 'Jiffy' },
  { domain: 'taskrabbit.com',    label: 'TaskRabbit' },
  { domain: 'urbantasker.com',   label: 'UrbanTasker' },
  { domain: 'yelp.ca',           label: 'Yelp.ca' },
];

const KM_SEEDS = [
  'house cleaning toronto', 'deep cleaning service toronto', 'move out cleaning toronto',
  'carpet cleaning toronto', 'window cleaning toronto', 'eavestrough cleaning toronto',
  'pressure washing toronto', 'duct cleaning toronto',
  'handyman toronto', 'furniture assembly toronto', 'tv mounting toronto',
  'drywall repair toronto', 'painting service toronto', 'flooring installation toronto',
  'plumber toronto', 'drain cleaning toronto', 'faucet installation toronto',
  'toilet repair toronto', 'water heater installation toronto',
  'electrician toronto', 'light fixture installation toronto', 'ev charger installation ontario',
  'ac repair toronto', 'furnace repair toronto', 'hvac maintenance toronto',
  'lawn care toronto', 'lawn mowing toronto', 'snow removal toronto',
  'junk removal toronto', 'tree trimming toronto', 'fence installation toronto',
  'kitchen renovation toronto', 'bathroom renovation toronto', 'basement renovation toronto',
  'pest control toronto', 'locksmith toronto', 'roofing toronto',
  'eavestrough repair toronto', 'gutter cleaning toronto', 'window replacement toronto',
];

// ── helpers ───────────────────────────────────────────────────────────────────
async function safeGoto(pg, url, timeout = 40000) {
  try {
    await pg.goto(url, { waitUntil: 'domcontentloaded', timeout });
  } catch(e) {
    // continue — page may still have content
  }
}

async function dismissSession(pg) {
  await pg.evaluate(() => {
    const btn = Array.from(document.querySelectorAll('button'))
      .find(b => /continue|terminate/i.test(b.innerText || ''));
    if (btn) btn.click();
  }).catch(() => {});
  await sleep(1500);
}

function parseVol(v) {
  if (!v) return 0;
  v = String(v).replace(/,/g, '').trim();
  if (/[Kk]$/.test(v)) return parseFloat(v) * 1000;
  if (/[Mm]$/.test(v)) return parseFloat(v) * 1000000;
  return parseFloat(v) || 0;
}

function parseCpc(v) {
  if (!v) return 0;
  return parseFloat(String(v).replace(/[$,]/g, '')) || 0;
}

// ── 1. Keyword Magic Tool ─────────────────────────────────────────────────────
async function runKeywordMagic(pg) {
  console.log('\n════ PART 1: KEYWORD MAGIC TOOL ════');
  const results = {};

  for (const seed of KM_SEEDS) {
    process.stdout.write(`  ${seed.padEnd(42)} `);
    await safeGoto(pg, `https://www.semrush.com/analytics/keywordmagic/?q=${encodeURIComponent(seed)}&db=${DB}`);
    await dismissSession(pg);
    await sleep(9000);

    // Scroll to trigger rendering
    for (let s = 1; s <= 6; s++) {
      await pg.evaluate(s => window.scrollTo(0, s * 600), s).catch(() => {});
      await sleep(250);
    }
    await sleep(1000);

    const kws = await pg.evaluate(() => {
      const rows = [];

      // Table parse
      document.querySelectorAll('table tbody tr').forEach(tr => {
        const cells = Array.from(tr.querySelectorAll('td'));
        if (cells.length < 3) return;
        const kw  = cells[0]?.innerText?.trim()?.split('\n')[0] || '';
        const vol = cells[1]?.innerText?.trim()?.split('\n')[0] || '';
        const kd  = cells[2]?.innerText?.trim()?.split('\n')[0] || '';
        const cpc = cells[3]?.innerText?.trim()?.split('\n')[0] || '';
        if (kw.length > 2 && !/^\d+[\.\,]?\d*$/.test(kw) && !kw.startsWith('$'))
          rows.push({ kw, vol, kd, cpc });
      });
      if (rows.length >= 3) return rows;

      // Generic row containers (SEMrush sometimes uses divs)
      const rowEls = document.querySelectorAll('[class*="row"], [class*="Row"], [data-row]');
      rowEls.forEach(el => {
        const cells = Array.from(el.querySelectorAll('[class*="cell"], [class*="Cell"], td'));
        if (cells.length < 3) return;
        const kw  = cells[0]?.innerText?.trim()?.split('\n')[0] || '';
        const vol = cells[1]?.innerText?.trim()?.split('\n')[0] || '';
        const kd  = cells[2]?.innerText?.trim()?.split('\n')[0] || '';
        const cpc = cells[3]?.innerText?.trim()?.split('\n')[0] || '';
        if (kw.length > 3 && kw.length < 100 && !/^\d+[\.\,]?\d*$/.test(kw) &&
            /^[\d,\.KkMm]+$/.test(vol.replace(/,/g,'')) && /^\d{1,3}$/.test(kd))
          rows.push({ kw, vol, kd, cpc });
      });
      if (rows.length >= 3) return rows;

      // Line scan — look for keyword|volume|KD pattern
      const lines = document.body.innerText.split('\n').map(l => l.trim()).filter(Boolean);
      for (let i = 0; i < lines.length - 3 && rows.length < 60; i++) {
        const kw  = lines[i];
        const vol = lines[i+1];
        const kd  = lines[i+2];
        const cpc = lines[i+3];
        const volOk = /^[\d,\.]+[KkMm]?$/.test(vol.replace(/,/g,''));
        const kdOk  = /^\d{1,3}$/.test(kd) && +kd <= 100;
        const kwOk  = kw.length > 3 && kw.length < 100 &&
                      !kw.startsWith('$') && !kw.startsWith('http') &&
                      !/^\d+[\.\,]?\d*$/.test(kw) &&
                      !/^(Keyword|Volume|KD|CPC|Intent|Updated|Results|SERP|Features)$/i.test(kw) &&
                      kw.split(' ').length >= 2; // must be a phrase
        if (kwOk && volOk && kdOk) {
          rows.push({ kw, vol, kd, cpc });
          i += 3;
        }
      }
      return rows;
    }).catch(() => []);

    console.log(`${kws.length} kws`);
    if (kws.length > 0) results[seed] = kws;

    // Checkpoint every 8 seeds
    if (Object.keys(results).length % 8 === 0) {
      writeFileSync(OUT_MAGIC, buildMagicReport(results), 'utf8');
      console.log(`  💾 checkpoint saved`);
    }
  }

  writeFileSync(OUT_MAGIC, buildMagicReport(results), 'utf8');
  const total = Object.values(results).reduce((s, v) => s + v.length, 0);
  console.log(`✅ Keyword Magic: ${total} keywords across ${Object.keys(results).length} seeds → ${OUT_MAGIC}`);
  return results;
}

// ── 2. Competitor Organic Keywords (API intercept + DOM) ──────────────────────
async function getCompetitorOrganic(pg, domain) {
  console.log(`\n  ▶ ${domain}`);
  const captured = [];

  // Set up response interception — catch SEMrush data API
  const responseHandler = async (resp) => {
    try {
      const url = resp.url();
      const ct  = resp.headers()['content-type'] || '';
      if (!url.includes('semrush.com')) return;
      if (!ct.includes('json') && !ct.includes('text')) return;
      // Look for keyword data endpoints
      if (!url.includes('organic') && !url.includes('keyword') &&
          !url.includes('position') && !url.includes('analytics')) return;

      const text = await resp.text().catch(() => '');
      if (!text || text.length < 50) return;

      // Try JSON parse
      try {
        const json = JSON.parse(text);
        // SEMrush returns arrays of arrays or objects with keyword data
        const extract = (obj) => {
          if (Array.isArray(obj)) {
            obj.forEach(item => {
              if (Array.isArray(item) && item.length >= 3) {
                // [keyword, position, volume, kd, ...]
                const kw  = String(item[0] || '');
                const pos = item[1];
                const vol = item[2];
                const kd  = item[3];
                if (kw.length > 2 && kw.length < 100 && !kw.startsWith('http') &&
                    /^\d+$/.test(String(pos)) && +pos >= 1 && +pos <= 200) {
                  captured.push({ kw, pos: +pos, vol: String(vol || ''), kd: String(kd || '') });
                }
              } else if (item && typeof item === 'object') {
                const kw  = item.Ph || item.keyword || item.kw || item.phrase || '';
                const pos = item.Po || item.position || item.pos || item.rank || '';
                const vol = item.Nq || item.volume || item.vol || item.sv || '';
                const kd  = item.Kd || item.difficulty || item.kd || '';
                if (kw && kw.length > 2 && +pos >= 1 && +pos <= 200) {
                  captured.push({ kw: String(kw), pos: +pos, vol: String(vol), kd: String(kd) });
                }
              }
            });
          } else if (obj && typeof obj === 'object') {
            Object.values(obj).forEach(v => { if (typeof v === 'object') extract(v); });
          }
        };
        extract(json);
      } catch(_) {
        // Not JSON — try CSV/TSV line scan
        const lines = text.split('\n').filter(Boolean);
        lines.forEach(line => {
          const parts = line.split('\t').length > 2 ? line.split('\t') : line.split(';');
          if (parts.length >= 3) {
            const kw  = parts[0]?.trim();
            const pos = parts[1]?.trim();
            const vol = parts[2]?.trim();
            const kd  = parts[3]?.trim() || '';
            if (kw && kw.length > 2 && /^\d+$/.test(pos) && +pos >= 1 && +pos <= 200) {
              captured.push({ kw, pos: +pos, vol, kd });
            }
          }
        });
      }
    } catch(_) {}
  };

  pg.on('response', responseHandler);

  await safeGoto(pg,
    `https://www.semrush.com/analytics/organic/positions/?q=${domain}&db=${DB}&sortby=Po&order=asc`
  );
  await dismissSession(pg);
  await sleep(12000);

  // Scroll slowly to trigger more API calls
  for (let s = 1; s <= 20; s++) {
    await pg.evaluate(s => window.scrollTo(0, s * 400), s).catch(() => {});
    await sleep(600);
  }
  await sleep(3000);

  // Try clicking next pages
  for (let p = 2; p <= 6; p++) {
    const clicked = await pg.evaluate(() => {
      const all = Array.from(document.querySelectorAll('button, a'));
      const next = all.find(b => {
        const t = (b.innerText || b.getAttribute('aria-label') || '').trim().toLowerCase();
        return t === 'next' || t === '>' || t === '→' || t === 'next page';
      });
      if (next && !next.disabled) { next.click(); return true; }
      return false;
    }).catch(() => false);
    if (!clicked) break;
    await sleep(8000);
    for (let s = 1; s <= 10; s++) {
      await pg.evaluate(s => window.scrollTo(0, s * 400), s).catch(() => {});
      await sleep(400);
    }
  }

  // Also try DOM extraction as backup
  const domRows = await pg.evaluate(() => {
    const rows = [];
    // Try all row-like structures
    const selectors = ['table tbody tr', '[role="row"]', '[class*="table"] [class*="row"]'];
    for (const sel of selectors) {
      document.querySelectorAll(sel).forEach(tr => {
        const cells = Array.from(tr.querySelectorAll('td, [role="cell"], [class*="cell"]'));
        if (cells.length < 3) return;
        const kw  = cells[0]?.innerText?.trim()?.split('\n')[0] || '';
        const pos = cells[1]?.innerText?.trim()?.split('\n')[0] || '';
        const vol = cells[2]?.innerText?.trim()?.split('\n')[0] || '';
        const kd  = cells[3]?.innerText?.trim()?.split('\n')[0] || '';
        if (kw.length > 2 && kw.length < 100 &&
            /^\d+$/.test(pos) && +pos >= 1 && +pos <= 200 &&
            !/^\d+[\.\,]\d+$/.test(kw)) // exclude decimals (CTR values)
          rows.push({ kw, pos: +pos, vol, kd });
      });
      if (rows.length > 0) break;
    }
    return rows;
  }).catch(() => []);

  pg.off('response', responseHandler);

  // Merge API-captured + DOM rows, deduplicate
  const all = new Map();
  [...captured, ...domRows].forEach(r => {
    if (!all.has(r.kw.toLowerCase())) all.set(r.kw.toLowerCase(), r);
  });

  const final = Array.from(all.values()).sort((a, b) => a.pos - b.pos);
  console.log(`    API: ${captured.length} | DOM: ${domRows.length} | Total unique: ${final.length}`);
  return final;
}

// ── 3. Top Pages ──────────────────────────────────────────────────────────────
async function getTopPages(pg, domain) {
  process.stdout.write(`  top pages: ${domain.padEnd(22)} `);
  await safeGoto(pg,
    `https://www.semrush.com/analytics/organic/pages/?q=${domain}&db=${DB}&sortby=Tr&order=desc`
  );
  await dismissSession(pg);
  await sleep(10000);

  // Slow scroll
  for (let s = 1; s <= 8; s++) {
    await pg.evaluate(s => window.scrollTo(0, s * 500), s).catch(() => {});
    await sleep(400);
  }

  const pages = await pg.evaluate(() => {
    const res = [];
    // Table
    document.querySelectorAll('table tbody tr').forEach((tr, i) => {
      if (i >= 30) return;
      const cells = Array.from(tr.querySelectorAll('td'));
      const url  = cells[0]?.innerText?.trim()?.split('\n')[0] || '';
      const tr2  = cells[1]?.innerText?.trim()?.split('\n')[0] || '';
      const kws  = cells[2]?.innerText?.trim()?.split('\n')[0] || '';
      if (url.length > 3 && (url.startsWith('/') || url.startsWith('http') || url.includes('.')))
        res.push({ url, traffic: tr2, keywords: kws });
    });
    if (res.length > 0) return res;

    // Link-based scan
    const links = Array.from(document.querySelectorAll('a[href]'));
    const seen = new Set();
    links.forEach(a => {
      const href = a.href || '';
      if (href.includes(window.location.hostname)) return; // skip nav links
      const text = a.innerText?.trim();
      if (text && text.length > 5 && !seen.has(href)) {
        seen.add(href);
        res.push({ url: href, traffic: '—', keywords: '—' });
      }
    });
    return res.slice(0, 25);
  }).catch(() => []);

  console.log(`${pages.length} pages`);
  return pages;
}

// ── 4. Missing Domain Overviews ───────────────────────────────────────────────
async function getMissingOverviews(pg) {
  console.log('\n════ PART 4: MISSING DOMAIN OVERVIEWS ════');
  const missing = ['taskrabbit.com', 'yelp.ca', 'protasker.ca'];
  const results = {};

  for (const domain of missing) {
    process.stdout.write(`  ${domain.padEnd(22)} `);
    await safeGoto(pg,
      `https://www.semrush.com/analytics/overview/?q=${domain}&searchType=domain&db=${DB}`
    );
    await dismissSession(pg);
    await sleep(10000);

    const d = await pg.evaluate(() => {
      const text = document.body.innerText;
      const lines = text.split('\n').map(l => l.trim()).filter(Boolean);
      const r = { keywords: '', traffic: '', as: '' };
      for (let i = 0; i < lines.length - 1; i++) {
        const l = lines[i].toLowerCase(), v = lines[i+1];
        if (!v || v === 'n/a') continue;
        if (l === 'organic keywords' && !r.keywords) r.keywords = v;
        if (l === 'organic traffic' && !r.traffic) r.traffic = v;
        if ((l === 'authority score' || l === 'as') && /^\d+$/.test(v) && !r.as) r.as = v;
      }
      if (!r.keywords) { const m = text.match(/Organic Keywords[\s\S]{1,60}?([\d,\.KkMm]+)/); if (m) r.keywords = m[1]; }
      if (!r.traffic)  { const m = text.match(/Organic Traffic[\s\S]{1,60}?([\d,\.KkMm]+)/);  if (m) r.traffic  = m[1]; }
      if (!r.as)       { const m = text.match(/Authority Score[\s\S]{1,40}?(\d{1,3})\b/);      if (m) r.as       = m[1]; }
      return r;
    }).catch(() => ({ keywords: '', traffic: '', as: '' }));

    console.log(`kw=${d.keywords || '?'} traffic=${d.traffic || '?'} AS=${d.as || '?'}`);
    results[domain] = d;
  }
  return results;
}

// ── Build Reports ─────────────────────────────────────────────────────────────
function buildMagicReport(results) {
  const date = new Date().toISOString().split('T')[0];
  const total = Object.values(results).reduce((s, v) => s + v.length, 0);
  let md = `# Protasker — Keyword Magic Research\n*${date} · Canada · ${total} keywords*\n\n`;

  md += `## Summary\n\n| Seed | Keywords | Top Volume | Avg KD |\n|------|----------|-----------|--------|\n`;
  for (const [seed, kws] of Object.entries(results)) {
    const topVol = Math.max(...kws.map(k => parseVol(k.vol)), 0);
    const kdNums = kws.map(k => +k.kd).filter(n => n > 0);
    const avgKd  = kdNums.length ? Math.round(kdNums.reduce((a, b) => a + b, 0) / kdNums.length) : 0;
    const topVolStr = topVol >= 1000 ? (topVol/1000).toFixed(1)+'K' : String(topVol);
    md += `| ${seed} | ${kws.length} | ${topVolStr} | ${avgKd || '—'} |\n`;
  }

  md += `\n---\n\n`;
  for (const [seed, kws] of Object.entries(results)) {
    const sorted = [...kws].sort((a, b) => parseVol(b.vol) - parseVol(a.vol));
    md += `## ${seed}\n\n| Keyword | Volume | KD | CPC |\n|---------|--------|----|----- |\n`;
    sorted.forEach(k => { md += `| ${k.kw} | ${k.vol || '—'} | ${k.kd || '—'} | ${k.cpc || '—'} |\n`; });
    md += '\n';
  }

  // Easy wins
  const easy = [];
  const seen = new Set();
  for (const kws of Object.values(results)) {
    kws.forEach(k => {
      if (parseVol(k.vol) >= 200 && +k.kd > 0 && +k.kd <= 25 && !seen.has(k.kw.toLowerCase())) {
        seen.add(k.kw.toLowerCase());
        easy.push(k);
      }
    });
  }
  if (easy.length > 0) {
    easy.sort((a, b) => parseVol(b.vol) - parseVol(a.vol));
    md += `\n---\n\n## Easy Wins (Vol ≥ 200, KD ≤ 25)\n\n| Keyword | Volume | KD | CPC |\n|---------|--------|----|----- |\n`;
    easy.forEach(k => { md += `| ${k.kw} | ${k.vol} | ${k.kd} | ${k.cpc || '—'} |\n`; });
  }

  // High CPC
  const highCpc = [];
  const seen2 = new Set();
  for (const kws of Object.values(results)) {
    kws.forEach(k => {
      if (parseCpc(k.cpc) >= 8 && !seen2.has(k.kw.toLowerCase())) {
        seen2.add(k.kw.toLowerCase());
        highCpc.push(k);
      }
    });
  }
  if (highCpc.length > 0) {
    highCpc.sort((a, b) => parseCpc(b.cpc) - parseCpc(a.cpc));
    md += `\n## High-CPC ($8+) — Commercial Intent\n\n| Keyword | Volume | KD | CPC |\n|---------|--------|----|----- |\n`;
    highCpc.slice(0, 50).forEach(k => { md += `| ${k.kw} | ${k.vol || '—'} | ${k.kd || '—'} | $${parseCpc(k.cpc).toFixed(2)} |\n`; });
  }

  return md;
}

function buildOrganicReport(allOrganic, topPages) {
  const date = new Date().toISOString().split('T')[0];
  let md = `# Protasker — Competitor Organic Keywords\n*${date} · Canada*\n\n`;

  md += `## Domain Summary\n\n| Domain | Keywords Captured | Top 10 Count |\n|--------|------------------|--------------|\n`;
  for (const { domain, label } of COMPETITORS) {
    const rows = allOrganic[domain] || [];
    const top10 = rows.filter(r => r.pos <= 10).length;
    md += `| **${label}** | ${rows.length} | ${top10} |\n`;
  }

  md += `\n---\n\n`;

  for (const { domain, label } of COMPETITORS) {
    const rows = allOrganic[domain] || [];
    if (rows.length === 0) { md += `## ${label} — no data captured\n\n`; continue; }

    const top20 = rows.filter(r => r.pos <= 20).sort((a, b) => a.pos - b.pos);
    const rest  = rows.filter(r => r.pos > 20).sort((a, b) => parseVol(b.vol) - parseVol(a.vol));

    md += `## ${label} (\`${domain}\`) — ${rows.length} keywords\n\n`;
    if (top20.length > 0) {
      md += `**Top 20 positions:**\n\n| Keyword | Pos | Volume | KD |\n|---------|-----|--------|----|\n`;
      top20.forEach(r => { md += `| ${r.kw} | ${r.pos} | ${r.vol || '—'} | ${r.kd || '—'} |\n`; });
    }
    if (rest.length > 0) {
      md += `\n**Positions 21–200 (top by volume):**\n\n| Keyword | Pos | Volume | KD |\n|---------|-----|--------|----|\n`;
      rest.slice(0, 50).forEach(r => { md += `| ${r.kw} | ${r.pos} | ${r.vol || '—'} | ${r.kd || '—'} |\n`; });
    }

    // Top pages
    const pages = topPages[domain] || [];
    if (pages.length > 0) {
      md += `\n**Top Traffic Pages:**\n\n| URL | Traffic | Keywords |\n|-----|---------|----------|\n`;
      pages.slice(0, 20).forEach(p => { md += `| \`${p.url}\` | ${p.traffic} | ${p.keywords} |\n`; });
    }
    md += '\n';
  }
  return md;
}

function buildGapReport(allOrganic) {
  const date = new Date().toISOString().split('T')[0];
  const protKws = new Set((allOrganic['protasker.ca'] || []).map(r => r.kw.toLowerCase()));

  const gaps = [];
  const seen = new Set();
  for (const { domain } of COMPETITORS) {
    if (domain === 'protasker.ca') continue;
    (allOrganic[domain] || []).forEach(r => {
      const kl = r.kw.toLowerCase();
      if (!protKws.has(kl) && r.pos <= 20 && !seen.has(kl)) {
        seen.add(kl);
        gaps.push({ ...r, source: domain });
      }
    });
  }
  gaps.sort((a, b) => parseVol(b.vol) - parseVol(a.vol));

  let md = `# Protasker — Keyword Gap Analysis\n*${date}*\n\n`;
  md += `*Keywords where competitors rank in top 20 but Protasker has no ranking.*\n\n`;
  md += `**Total gap keywords: ${gaps.length}**\n\n`;

  if (gaps.length === 0) {
    md += `> No gap keywords found — organic keyword data may be limited. Check Protasker-Competitor-Organic.md.\n`;
    return md;
  }

  md += `## All Gap Keywords\n\n| Keyword | Volume | KD | Competitor | Pos |\n|---------|--------|----|-----------|----- |\n`;
  gaps.slice(0, 150).forEach(r => { md += `| ${r.kw} | ${r.vol || '—'} | ${r.kd || '—'} | \`${r.source}\` | ${r.pos} |\n`; });

  // Easy wins (KD ≤ 20, vol ≥ 100)
  const easy = gaps.filter(r => +r.kd > 0 && +r.kd <= 20 && parseVol(r.vol) >= 100);
  if (easy.length > 0) {
    md += `\n## Easy Win Gaps (KD ≤ 20, Vol ≥ 100)\n\n| Keyword | Volume | KD | Competitor |\n|---------|--------|----|------------|\n`;
    easy.forEach(r => { md += `| ${r.kw} | ${r.vol} | ${r.kd} | \`${r.source}\` |\n`; });
  }

  return md;
}

// ── Main ──────────────────────────────────────────────────────────────────────
async function main() {
  const browser = await puppeteer.connect({ browserURL: 'http://localhost:9222', protocolTimeout: 60000 });
  const allPages = await browser.pages();
  for (let i = allPages.length - 1; i > 0; i--) { try { await allPages[i].close(); } catch(_) {} }
  const pg = allPages[0];
  pg.setDefaultTimeout(60000);

  // Warm up session
  console.log('Warming up session...');
  await safeGoto(pg, 'https://www.semrush.com/dashboard/');
  await dismissSession(pg);
  await sleep(3000);
  console.log('✅ Ready\n');

  // ── Part 1: Keyword Magic ────────────────────────────────────────────────────
  const magicResults = await runKeywordMagic(pg);

  // ── Part 2: Competitor Organic Keywords ─────────────────────────────────────
  console.log('\n════ PART 2: COMPETITOR ORGANIC KEYWORDS ════');
  const allOrganic = {};
  for (const { domain, label } of COMPETITORS) {
    process.stdout.write(`\n  ▶ ${label} (${domain})\n`);
    allOrganic[domain] = await getCompetitorOrganic(pg, domain);
    // Checkpoint
    writeFileSync(OUT_ORGANIC, buildOrganicReport(allOrganic, {}), 'utf8');
    writeFileSync(OUT_GAP, buildGapReport(allOrganic), 'utf8');
    console.log(`  💾 checkpoint`);
  }

  // ── Part 3: Top Pages ────────────────────────────────────────────────────────
  console.log('\n════ PART 3: TOP PAGES ════');
  const topPages = {};
  for (const { domain, self } of COMPETITORS) {
    if (self) continue;
    topPages[domain] = await getTopPages(pg, domain);
  }

  // ── Part 4: Missing Domain Overviews ─────────────────────────────────────────
  await getMissingOverviews(pg);

  // ── Final Reports ─────────────────────────────────────────────────────────────
  writeFileSync(OUT_ORGANIC, buildOrganicReport(allOrganic, topPages), 'utf8');
  writeFileSync(OUT_GAP,     buildGapReport(allOrganic), 'utf8');

  console.log(`\n✅ All done!`);
  console.log(`   ${OUT_MAGIC}`);
  console.log(`   ${OUT_ORGANIC}`);
  console.log(`   ${OUT_GAP}`);

  browser.disconnect();
}

main().catch(e => { console.error('Fatal:', e.message); process.exit(1); });
