/**
 * protasker-kw-overview.mjs
 * Scrapes SEMrush Keyword Overview (browser) for all Protasker service keywords.
 * Same data as phrase_this API: vol / KD / CPC per keyword.
 * Output: C:/Users/Owner/Documents/Protasker-KW-Overview.md
 */

import puppeteer from 'puppeteer';
import { writeFileSync } from 'fs';
const sleep = ms => new Promise(r => setTimeout(r, ms));
const OUT = 'C:/Users/Owner/Documents/Protasker-KW-Overview.md';
const DB  = 'ca';

const KEYWORDS = [
  // Cleaning
  'house cleaning toronto', 'deep cleaning toronto', 'move out cleaning toronto',
  'carpet cleaning toronto', 'window cleaning toronto', 'eavestrough cleaning toronto',
  'eavestrough cleaning', 'pressure washing toronto', 'power washing toronto',
  'duct cleaning toronto', 'gutter cleaning toronto', 'post construction cleaning toronto',
  'airbnb cleaning toronto', 'office cleaning toronto', 'maid service toronto',
  'move in cleaning toronto',
  // Handyman
  'handyman toronto', 'handyman services toronto', 'handyman near me toronto',
  'furniture assembly toronto', 'tv mounting toronto', 'tv wall mount installation toronto',
  'drywall repair toronto', 'painting service toronto', 'interior painting toronto',
  'flooring installation toronto', 'hardwood floor installation toronto',
  'floor refinishing toronto', 'floor refinishing near me',
  'tile installation toronto', 'baseboard installation toronto',
  'door installation toronto', 'window installation toronto',
  // Plumbing
  'plumber toronto', 'emergency plumber toronto', 'drain cleaning toronto',
  'drain snaking toronto', 'clogged drain toronto', 'clogged drain near me',
  'faucet installation toronto', 'toilet repair toronto', 'toilet installation toronto',
  'water heater installation toronto', 'tankless water heater installation toronto',
  'sump pump installation toronto', 'sump pump installation near me',
  // Electrical
  'electrician toronto', 'licensed electrician toronto',
  'light fixture installation toronto', 'outlet installation toronto',
  'panel upgrade toronto', 'electrical panel upgrade toronto',
  'ev charger installation toronto', 'ev charger installation ontario',
  'ceiling fan installation toronto',
  // HVAC
  'ac repair toronto', 'air conditioner installation toronto',
  'furnace repair toronto', 'furnace installation toronto',
  'hvac maintenance toronto', 'hvac repair toronto',
  // Landscaping & Outdoor
  'lawn care toronto', 'lawn mowing toronto', 'lawn mowing service toronto',
  'landscaping toronto', 'snow removal toronto', 'snow plowing toronto',
  'junk removal toronto', 'toronto trash removal', 'garbage removal toronto',
  'junk removal near me toronto',
  'tree trimming toronto', 'tree removal toronto',
  'fence installation toronto', 'deck installation toronto',
  'interlocking toronto', 'mulch installation toronto',
  'eavestrough repair toronto', 'eavestrough cleaning near me',
  // Renovation
  'kitchen renovation toronto', 'bathroom renovation toronto',
  'basement renovation toronto', 'home renovation toronto',
  'basement finishing toronto', 'bathroom remodel toronto',
  // Other services
  'pest control toronto', 'bed bug treatment toronto',
  'locksmith toronto', 'emergency locksmith toronto',
  'roofing toronto', 'roof repair toronto',
  'window replacement toronto', 'siding installation toronto',
  'pool cleaning toronto', 'pool opening toronto',
  'home cleaning service toronto',
  // High-value modifiers
  'handyman near me', 'eavestrough cleaning near me',
  'junk removal near me', 'plumber near me toronto',
];

async function getKwData(pg, keyword) {
  const url = `https://www.semrush.com/analytics/keywordoverview/?q=${encodeURIComponent(keyword)}&db=${DB}`;
  try {
    await pg.goto(url, { waitUntil: 'domcontentloaded', timeout: 35000 });
    await sleep(7000);

    // Dismiss session popup if present
    await pg.evaluate(() => {
      const btn = Array.from(document.querySelectorAll('button'))
        .find(b => /continue|terminate/i.test(b.innerText || ''));
      if (btn) btn.click();
    }).catch(() => {});
    await sleep(1000);

    const data = await pg.evaluate((kw) => {
      const text  = document.body.innerText;
      const lines = text.split('\n').map(l => l.trim()).filter(Boolean);
      const r = { kw, vol: '', kd: '', cpc: '', intent: '' };

      // Line-scan: SEMrush Keyword Overview layout
      // Labels appear just before values
      for (let i = 0; i < lines.length - 1; i++) {
        const l = lines[i].toLowerCase();
        const v = lines[i + 1];
        if (!v) continue;

        // Volume — label is "Volume" or "Search Volume"
        if ((l === 'volume' || l === 'search volume') && !r.vol) {
          if (/^[\d,\.]+[KkMm]?$/.test(v.replace(/,/g, ''))) r.vol = v;
        }
        // KD — label is "KD" or "Keyword Difficulty"
        if ((l === 'kd' || l === 'keyword difficulty') && !r.kd) {
          if (/^\d{1,3}$/.test(v)) r.kd = v;
        }
        // CPC — label is "CPC" or "$"
        if (l === 'cpc' && !r.cpc) {
          if (/^\$?[\d\.]+$/.test(v.replace(/[$,]/g, ''))) r.cpc = v.replace('$', '');
        }
        // Intent
        if (l === 'intent' && !r.intent) {
          if (/commercial|informational|transactional|navigational/i.test(v)) r.intent = v;
        }
      }

      // Regex fallbacks
      if (!r.vol) {
        const m = text.match(/Volume[\s\S]{1,50}?([\d,\.]+[KkMm]?)\b/);
        if (m && /[\d]/.test(m[1])) r.vol = m[1];
      }
      if (!r.kd) {
        const m = text.match(/(?:KD|Keyword Difficulty)[^\d]{1,20}?(\d{1,3})\b/);
        if (m && +m[1] <= 100) r.kd = m[1];
      }
      if (!r.cpc) {
        const m = text.match(/CPC[^\d$]{1,10}?\$?([\d\.]+)/);
        if (m) r.cpc = m[1];
      }

      return r;
    }, keyword).catch(() => ({ kw: keyword, vol: '', kd: '', cpc: '', intent: '' }));

    return data;
  } catch(e) {
    return { kw: keyword, vol: '', kd: '', cpc: '', intent: '', err: e.message.substring(0, 40) };
  }
}

function parseVol(v) {
  if (!v) return 0;
  v = String(v).replace(/,/g, '').trim();
  if (/[Kk]$/.test(v)) return parseFloat(v) * 1000;
  if (/[Mm]$/.test(v)) return parseFloat(v) * 1000000;
  return parseFloat(v) || 0;
}

function buildReport(results) {
  const date = new Date().toISOString().split('T')[0];
  const found = results.filter(r => r.vol);
  let md = `# Protasker — Service Keyword Research\n*${date} · Canada · ${found.length}/${results.length} keywords found*\n\n`;

  // All keywords by volume
  const sorted = [...results].filter(r => r.vol).sort((a, b) => parseVol(b.vol) - parseVol(a.vol));
  md += `## All Keywords (by volume)\n\n| Keyword | Volume | KD | CPC |\n|---------|--------|----| ----|\n`;
  sorted.forEach(r => { md += `| ${r.kw} | ${r.vol} | ${r.kd || '—'} | ${r.cpc ? '$'+r.cpc : '—'} |\n`; });

  // Easy wins: KD ≤ 25, vol ≥ 100
  const easy = sorted.filter(r => +r.kd > 0 && +r.kd <= 25 && parseVol(r.vol) >= 100);
  if (easy.length > 0) {
    md += `\n---\n\n## Easy Wins (KD ≤ 25, Vol ≥ 100)\n\n| Keyword | Volume | KD | CPC |\n|---------|--------|----| ----|\n`;
    easy.forEach(r => { md += `| ${r.kw} | ${r.vol} | ${r.kd} | ${r.cpc ? '$'+r.cpc : '—'} |\n`; });
  }

  // High CPC ($8+)
  const highCpc = sorted.filter(r => parseFloat(r.cpc) >= 8);
  if (highCpc.length > 0) {
    highCpc.sort((a, b) => parseFloat(b.cpc) - parseFloat(a.cpc));
    md += `\n## High CPC ($8+) — Commercial Intent\n\n| Keyword | Volume | KD | CPC |\n|---------|--------|----| ----|\n`;
    highCpc.forEach(r => { md += `| ${r.kw} | ${r.vol} | ${r.kd || '—'} | $${r.cpc} |\n`; });
  }

  // No data
  const noData = results.filter(r => !r.vol);
  if (noData.length > 0) {
    md += `\n## No Data Found\n\n`;
    noData.forEach(r => { md += `- ${r.kw}${r.err ? ' *('+r.err+')*' : ''}\n`; });
  }

  return md;
}

async function main() {
  const browser = await puppeteer.connect({ browserURL: 'http://localhost:9222', protocolTimeout: 60000 });
  const allPages = await browser.pages();
  for (let i = allPages.length - 1; i > 0; i--) { try { await allPages[i].close(); } catch(_) {} }
  const pg = allPages[0];
  pg.setDefaultTimeout(60000);

  // Warm up session
  await pg.goto('https://www.semrush.com/dashboard/', { waitUntil: 'domcontentloaded', timeout: 30000 }).catch(() => {});
  await sleep(3000);
  console.log(`Starting keyword overview — ${KEYWORDS.length} keywords\n`);

  const results = [];

  for (let i = 0; i < KEYWORDS.length; i++) {
    const kw = KEYWORDS[i];
    process.stdout.write(`  [${String(i+1).padStart(2)}/${KEYWORDS.length}] ${kw.padEnd(45)} `);
    const d = await getKwData(pg, kw);
    results.push(d);

    if (d.vol) {
      console.log(`vol=${d.vol.padEnd(6)} KD=${(d.kd||'—').padEnd(4)} CPC=${d.cpc ? '$'+d.cpc : '—'}`);
    } else {
      console.log(`no data${d.err ? ' — '+d.err : ''}`);
    }

    // Save checkpoint every 10 keywords
    if ((i + 1) % 10 === 0) {
      writeFileSync(OUT, buildReport(results), 'utf8');
      console.log(`\n  💾 checkpoint saved (${results.filter(r=>r.vol).length} found so far)\n`);
    }
  }

  writeFileSync(OUT, buildReport(results), 'utf8');
  const found = results.filter(r => r.vol).length;
  console.log(`\n✅ Done — ${found}/${KEYWORDS.length} keywords → ${OUT}`);

  browser.disconnect();
}

main().catch(e => { console.error('Fatal:', e.message); process.exit(1); });
