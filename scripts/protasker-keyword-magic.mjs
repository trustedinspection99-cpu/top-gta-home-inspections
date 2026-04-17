/**
 * protasker-keyword-magic.mjs
 * Uses SEMrush Keyword Magic Tool to find keyword variations for
 * all Protasker service categories. Saves vol/KD/CPC to markdown.
 *
 * Output: C:/Users/Owner/Documents/Protasker-Keyword-Magic.md
 */

import puppeteer from 'puppeteer';
import { writeFileSync } from 'fs';
const sleep = ms => new Promise(r => setTimeout(r, ms));
const OUT = 'C:/Users/Owner/Documents/Protasker-Keyword-Magic.md';
const DB  = 'ca';

// Main service seed keywords to research
const SEEDS = [
  // Cleaning
  'house cleaning toronto',
  'deep cleaning service',
  'move out cleaning',
  'carpet cleaning toronto',
  'window cleaning toronto',
  'eavestrough cleaning',
  'pressure washing toronto',
  'duct cleaning toronto',
  // Handyman & Repairs
  'handyman toronto',
  'furniture assembly toronto',
  'tv mounting toronto',
  'drywall repair toronto',
  'painting service toronto',
  'door installation toronto',
  'flooring installation toronto',
  // Plumbing
  'plumber toronto',
  'drain cleaning toronto',
  'faucet installation',
  'toilet repair toronto',
  'water heater installation',
  // Electrical
  'electrician toronto',
  'light fixture installation',
  'outlet installation toronto',
  'ev charger installation ontario',
  // HVAC
  'ac repair toronto',
  'furnace repair toronto',
  'hvac maintenance toronto',
  // Landscaping & Outdoor
  'lawn care toronto',
  'lawn mowing service toronto',
  'snow removal toronto',
  'junk removal toronto',
  'tree trimming toronto',
  'fence installation toronto',
  // Home Improvement
  'kitchen renovation toronto',
  'bathroom renovation toronto',
  'basement renovation toronto',
  'home renovation toronto',
  // Other
  'pest control toronto',
  'locksmith toronto',
  'pool cleaning toronto',
  'roofing toronto',
];

async function searchKeywordMagic(pg, seed) {
  const url = `https://www.semrush.com/analytics/keywordmagic/?q=${encodeURIComponent(seed)}&db=${DB}`;
  process.stdout.write(`  [${seed.substring(0,35).padEnd(35)}] `);

  try {
    await pg.goto(url, { waitUntil: 'domcontentloaded', timeout: 40000 });
    await sleep(10000);

    // Dismiss multi-login if present
    await pg.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button'));
      const act = btns.find(b => /continue|terminate/i.test(b.innerText || ''));
      if (act) act.click();
    }).catch(() => {});
    await sleep(2000);

    // Scroll to load more rows
    for (let s = 1; s <= 8; s++) {
      await pg.evaluate(s => window.scrollTo(0, s * 500), s).catch(() => {});
      await sleep(300);
    }

    const data = await pg.evaluate(() => {
      const rows = [];

      // Try table rows first
      document.querySelectorAll('table tbody tr').forEach(tr => {
        const cells = Array.from(tr.querySelectorAll('td'));
        if (cells.length < 3) return;
        const kw  = cells[0]?.innerText?.trim()?.split('\n')[0] || '';
        const vol = cells[1]?.innerText?.trim()?.split('\n')[0] || '';
        const kd  = cells[2]?.innerText?.trim()?.split('\n')[0] || '';
        const cpc = cells[3]?.innerText?.trim()?.split('\n')[0] || '';
        if (kw && kw.length > 2 && kw.length < 100 && !/^\d+$/.test(kw))
          rows.push({ kw, vol, kd, cpc });
      });

      if (rows.length >= 3) return rows;

      // Line-scan fallback: keyword magic layout is kw → vol → kd → cpc
      const lines = document.body.innerText.split('\n').map(l => l.trim()).filter(Boolean);
      for (let i = 0; i < lines.length - 3 && rows.length < 50; i++) {
        const kw = lines[i];
        const vol = lines[i+1];
        const kd  = lines[i+2];
        const cpc = lines[i+3];
        // vol looks like "1,000" or "1K" or "590"
        const volOk  = /^[\d,\.]+[KkMm]?$/.test(vol.replace(/,/g,'')) || /^[\d\.]+[KkMm]$/.test(vol);
        // kd looks like a number 0-100
        const kdOk   = /^\d{1,3}$/.test(kd) && +kd <= 100;
        // kw should be a phrase, not a number
        const kwOk   = kw.length > 3 && kw.length < 100 && !/^\d+[\.\,]?\d*$/.test(kw) &&
                       !kw.startsWith('$') && !kw.startsWith('https') &&
                       !/^(Keyword|Volume|KD|CPC|Intent|SERP|Features|Results|Updated)$/i.test(kw);
        if (kwOk && volOk && kdOk) {
          rows.push({ kw, vol, kd, cpc });
          i += 3;
        }
      }
      return rows;
    }).catch(() => []);

    console.log(`${data.length} keywords`);
    return data;
  } catch(e) {
    console.log(`ERR: ${e.message.substring(0, 50)}`);
    return [];
  }
}

async function main() {
  const browser = await puppeteer.connect({
    browserURL: 'http://localhost:9222',
    protocolTimeout: 60000
  });

  const pages = await browser.pages();
  for (let i = pages.length - 1; i > 0; i--) {
    try { await pages[i].close(); } catch(_) {}
  }
  const pg = pages[0];
  pg.setDefaultTimeout(60000);

  // Resolve session
  console.log('Checking session...');
  await pg.goto('https://www.semrush.com/dashboard/', { waitUntil: 'domcontentloaded', timeout: 30000 }).catch(() => {});
  await pg.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const act = btns.find(b => /continue|terminate/i.test(b.innerText || ''));
    if (act) act.click();
  }).catch(() => {});
  await sleep(3000);
  console.log('✅ Ready\n');

  const allResults = {};
  let total = 0;

  for (const seed of SEEDS) {
    const kws = await searchKeywordMagic(pg, seed);
    if (kws.length > 0) {
      allResults[seed] = kws;
      total += kws.length;
    }
    // Save checkpoint every 5 seeds
    if (Object.keys(allResults).length % 5 === 0) {
      writeFileSync(OUT, buildReport(allResults), 'utf8');
      console.log(`  💾 checkpoint (${total} kws so far)`);
    }
  }

  // Final save
  writeFileSync(OUT, buildReport(allResults), 'utf8');
  console.log(`\n✅ Done — ${total} total keywords → ${OUT}`);

  browser.disconnect();
}

function buildReport(results) {
  const date = new Date().toISOString().split('T')[0];
  let md = `# Protasker — Keyword Magic Research\n*${date} · Canada (db=ca)*\n\n`;

  // Summary table
  md += `## Summary\n\n`;
  md += `| Service Seed | Keywords Found | Top Volume | Avg KD |\n`;
  md += `|-------------|----------------|-----------|--------|\n`;

  for (const [seed, kws] of Object.entries(results)) {
    const topVol = Math.max(...kws.map(k => parseVol(k.vol)), 0);
    const avgKd  = kws.length > 0
      ? Math.round(kws.filter(k => +k.kd > 0).reduce((a, k) => a + +k.kd, 0) / kws.filter(k => +k.kd > 0).length)
      : 0;
    md += `| ${seed} | ${kws.length} | ${fmtNum(topVol)} | ${avgKd || '—'} |\n`;
  }

  md += `\n---\n\n`;

  // Per-seed keyword tables
  for (const [seed, kws] of Object.entries(results)) {
    // Sort by volume desc
    const sorted = [...kws].sort((a, b) => parseVol(b.vol) - parseVol(a.vol));
    md += `## ${seed}\n\n`;
    md += `| Keyword | Volume | KD | CPC |\n|---------|--------|----| ----|\n`;
    sorted.forEach(k => {
      md += `| ${k.kw} | ${k.vol || '—'} | ${k.kd || '—'} | ${k.cpc || '—'} |\n`;
    });
    md += '\n';
  }

  // Easy wins section
  const easyWins = [];
  for (const kws of Object.values(results)) {
    kws.forEach(k => {
      const vol = parseVol(k.vol);
      const kd  = +k.kd;
      if (vol >= 200 && kd > 0 && kd <= 25) {
        easyWins.push(k);
      }
    });
  }
  easyWins.sort((a, b) => parseVol(b.vol) - parseVol(a.vol));

  if (easyWins.length > 0) {
    md += `\n---\n\n## Easy Win Keywords (Vol ≥ 200, KD ≤ 25)\n\n`;
    md += `| Keyword | Volume | KD | CPC |\n|---------|--------|----| ----|\n`;
    const seen = new Set();
    easyWins.forEach(k => {
      if (!seen.has(k.kw.toLowerCase())) {
        seen.add(k.kw.toLowerCase());
        md += `| ${k.kw} | ${k.vol} | ${k.kd} | ${k.cpc || '—'} |\n`;
      }
    });
  }

  // High-CPC section
  const highCpc = [];
  for (const kws of Object.values(results)) {
    kws.forEach(k => {
      const cpc = parseCpc(k.cpc);
      if (cpc >= 8) highCpc.push(k);
    });
  }
  highCpc.sort((a, b) => parseCpc(b.cpc) - parseCpc(a.cpc));

  if (highCpc.length > 0) {
    md += `\n## High-CPC Keywords ($8+) — Commercial Intent\n\n`;
    md += `| Keyword | Volume | KD | CPC |\n|---------|--------|----| ----|\n`;
    const seen = new Set();
    highCpc.slice(0, 40).forEach(k => {
      if (!seen.has(k.kw.toLowerCase())) {
        seen.add(k.kw.toLowerCase());
        md += `| ${k.kw} | ${k.vol || '—'} | ${k.kd || '—'} | $${parseCpc(k.cpc).toFixed(2)} |\n`;
      }
    });
  }

  return md;
}

function parseVol(v) {
  if (!v) return 0;
  v = v.toString().replace(/,/g,'').trim();
  if (v.endsWith('K') || v.endsWith('k')) return parseFloat(v) * 1000;
  if (v.endsWith('M') || v.endsWith('m')) return parseFloat(v) * 1000000;
  return parseFloat(v) || 0;
}

function parseCpc(v) {
  if (!v) return 0;
  return parseFloat(v.toString().replace(/[$,]/g,'')) || 0;
}

function fmtNum(n) {
  if (n >= 1000000) return (n/1000000).toFixed(1) + 'M';
  if (n >= 1000) return (n/1000).toFixed(1) + 'K';
  return n.toString();
}

main().catch(e => { console.error('Fatal:', e.message); process.exit(1); });
