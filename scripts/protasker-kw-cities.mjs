/**
 * protasker-kw-cities.mjs
 * SEMrush Keyword Overview for Protasker's top services × all 109 cities
 * Focuses on highest-value services × all Ontario cities
 * Output: C:/Users/Owner/Documents/Protasker-KW-Cities.md
 */

import puppeteer from 'puppeteer';
import { writeFileSync } from 'fs';
const sleep = ms => new Promise(r => setTimeout(r, ms));
const OUT = 'C:/Users/Owner/Documents/Protasker-KW-Cities.md';
const DB  = 'ca';

// Top services to research (highest volume + commercial value)
const SERVICES = [
  'junk removal',
  'eavestrough cleaning',
  'lawn care',
  'snow removal',
  'handyman',
  'landscaping',
  'kitchen renovation',
  'furnace repair',
  'drain cleaning',
  'locksmith',
  'house cleaning',
  'pest control',
  'electrician',
  'plumber',
  'window replacement',
  'eavestrough repair',
  'interlocking',
  'roof repair',
  'painting service',
  'deep cleaning',
  'move out cleaning',
  'carpet cleaning',
  'drywall repair',
  'deck installation',
  'fence installation',
  'bathroom renovation',
  'basement renovation',
  'home renovation',
  'pressure washing',
  'tree trimming',
  'ac repair',
  'hvac repair',
  'sump pump installation',
  'window cleaning',
  'duct cleaning',
  'interior painting',
];

// Cities grouped by expected search volume
// Tier 1 — Major cities (high volume, worth individual lookups)
const TIER1_CITIES = [
  'toronto', 'mississauga', 'brampton', 'hamilton', 'ottawa',
  'london', 'markham', 'vaughan', 'kitchener', 'windsor',
  'richmond hill', 'oakville', 'burlington', 'oshawa', 'barrie',
  'guelph', 'waterloo', 'cambridge', 'whitby', 'ajax',
  'pickering', 'newmarket', 'brantford', 'st. catharines', 'sudbury',
  'scarborough', 'etobicoke', 'north york', 'thornhill', 'woodbridge',
];

// Tier 2 — Medium cities (moderate volume)
const TIER2_CITIES = [
  'niagara falls', 'kingston', 'peterborough', 'sault ste. marie',
  'north bay', 'aurora', 'milton', 'halton hills', 'georgina',
  'belleville', 'sarnia', 'chatham', 'stratford', 'woodstock',
  'ancaster', 'stoney creek', 'dundas', 'waterdown',
  'innisfil', 'bradford', 'alliston', 'collingwood', 'orillia',
  'cobourg', 'bowmanville', 'courtice', 'clarington',
  'keswick', 'stouffville', 'kanata', 'nepean', 'orleans',
  'thunder bay', 'welland', 'fort erie', 'grimsby',
];

// All cities combined
const CITIES = [...new Set([...TIER1_CITIES, ...TIER2_CITIES])];

// Remove duplicates
const UNIQUE_CITIES = [...new Set(CITIES)];

async function getKwData(pg, keyword) {
  const url = `https://www.semrush.com/analytics/keywordoverview/?q=${encodeURIComponent(keyword)}&db=${DB}`;
  try {
    await pg.goto(url, { waitUntil: 'domcontentloaded', timeout: 35000 });
    await sleep(6000);

    await pg.evaluate(() => {
      const btn = Array.from(document.querySelectorAll('button'))
        .find(b => /continue|terminate/i.test(b.innerText || ''));
      if (btn) btn.click();
    }).catch(() => {});
    await sleep(500);

    return await pg.evaluate((kw) => {
      const text  = document.body.innerText;
      const lines = text.split('\n').map(l => l.trim()).filter(Boolean);
      const r = { kw, vol: '', kd: '', cpc: '' };

      for (let i = 0; i < lines.length - 1; i++) {
        const l = lines[i].toLowerCase();
        const v = lines[i + 1];
        if (!v) continue;
        if ((l === 'volume' || l === 'search volume') && !r.vol) {
          if (/^[\d,\.]+[KkMm]?$/.test(v.replace(/,/g, ''))) r.vol = v;
        }
        if ((l === 'kd' || l === 'keyword difficulty') && !r.kd) {
          if (/^\d{1,3}$/.test(v) && +v <= 100) r.kd = v;
        }
        if (l === 'cpc' && !r.cpc) {
          if (/^\$?[\d\.]+$/.test(v.replace(/[$,]/g, ''))) r.cpc = v.replace('$', '');
        }
      }
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
    }, keyword).catch(() => ({ kw: keyword, vol: '', kd: '', cpc: '' }));

  } catch(e) {
    return { kw: keyword, vol: '', kd: '', cpc: '' };
  }
}

function parseVol(v) {
  if (!v) return 0;
  v = String(v).replace(/,/g, '').trim();
  if (/[Kk]$/.test(v)) return parseFloat(v) * 1000;
  if (/[Mm]$/.test(v)) return parseFloat(v) * 1000000;
  return parseFloat(v) || 0;
}

function buildReport(results, progress) {
  const date = new Date().toISOString().split('T')[0];
  const found = results.filter(r => r.vol && parseVol(r.vol) > 0);
  let md = `# Protasker — Service × City Keyword Research\n`;
  md += `*${date} · Canada · ${found.length} keywords with data · ${progress} searched*\n\n`;

  // Easy wins first — KD ≤ 25, vol ≥ 50
  const easy = found
    .filter(r => +r.kd > 0 && +r.kd <= 25 && parseVol(r.vol) >= 50)
    .sort((a, b) => parseVol(b.vol) - parseVol(a.vol));

  if (easy.length > 0) {
    md += `## Easy Wins (KD ≤ 25, Vol ≥ 50)\n\n`;
    md += `| Keyword | Volume | KD | CPC |\n|---------|--------|----|----- |\n`;
    easy.forEach(r => { md += `| ${r.kw} | ${r.vol} | ${r.kd} | ${r.cpc ? '$'+r.cpc : '—'} |\n`; });
    md += '\n';
  }

  // High CPC ($8+)
  const highCpc = found
    .filter(r => parseFloat(r.cpc) >= 8)
    .sort((a, b) => parseFloat(b.cpc) - parseFloat(a.cpc));

  if (highCpc.length > 0) {
    md += `## High CPC ($8+)\n\n`;
    md += `| Keyword | Volume | KD | CPC |\n|---------|--------|----|----- |\n`;
    highCpc.forEach(r => { md += `| ${r.kw} | ${r.vol} | ${r.kd || '—'} | $${r.cpc} |\n`; });
    md += '\n';
  }

  // All results by service group
  md += `---\n\n## All Results by Service\n\n`;
  const byService = {};
  results.forEach(r => {
    // Extract service from keyword (first 1-3 words before city)
    const parts = r.kw.split(' ');
    // service is everything except the last word (city)
    const svc = parts.slice(0, -1).join(' ');
    if (!byService[svc]) byService[svc] = [];
    byService[svc].push(r);
  });

  // Group by actual service
  for (const svc of SERVICES) {
    const rows = results.filter(r => r.kw.startsWith(svc + ' ')).filter(r => r.vol);
    if (rows.length === 0) continue;
    rows.sort((a, b) => parseVol(b.vol) - parseVol(a.vol));
    md += `### ${svc}\n\n| City Keyword | Volume | KD | CPC |\n|--------------|--------|----|----- |\n`;
    rows.forEach(r => { md += `| ${r.kw} | ${r.vol} | ${r.kd || '—'} | ${r.cpc ? '$'+r.cpc : '—'} |\n`; });
    md += '\n';
  }

  return md;
}

async function main() {
  const browser = await puppeteer.connect({ browserURL: 'http://localhost:9222', protocolTimeout: 60000 });
  const allPages = await browser.pages();
  for (let i = allPages.length - 1; i > 0; i--) { try { await allPages[i].close(); } catch(_) {} }
  const pg = allPages[0];
  pg.setDefaultTimeout(60000);

  await pg.goto('https://www.semrush.com/dashboard/', { waitUntil: 'domcontentloaded', timeout: 30000 }).catch(() => {});
  await sleep(3000);

  // Build keyword list: service + city for all combinations
  // Priority: focus on services with KD ≤ 25 first (highest ROI)
  const EASY_SERVICES = [
    'junk removal', 'eavestrough cleaning', 'landscaping', 'kitchen renovation',
    'furnace repair', 'drain cleaning', 'interlocking', 'sump pump installation',
    'move out cleaning', 'deep cleaning', 'drywall repair', 'interior painting',
    'fence installation', 'eavestrough repair', 'handyman services', 'handyman',
    'deck installation', 'floor refinishing', 'duct cleaning', 'ac repair',
  ];

  const ALL_SERVICES = [...new Set([...EASY_SERVICES, ...SERVICES])];

  const allKeywords = [];

  // Tier 1 cities × ALL services
  for (const svc of ALL_SERVICES) {
    for (const city of TIER1_CITIES) {
      allKeywords.push(`${svc} ${city}`);
    }
  }

  // Tier 2 cities × only top 15 easy-win services
  for (const svc of EASY_SERVICES.slice(0, 15)) {
    for (const city of TIER2_CITIES) {
      allKeywords.push(`${svc} ${city}`);
    }
  }

  // "near me" + "ontario" for every service
  for (const svc of ALL_SERVICES) {
    allKeywords.push(`${svc} near me`);
    allKeywords.push(`${svc} ontario`);
  }

  const total = allKeywords.length;
  console.log(`Starting: ${ALL_SERVICES.length} services`);
  console.log(`  Tier 1 (${TIER1_CITIES.length} cities) × ${ALL_SERVICES.length} services`);
  console.log(`  Tier 2 (${TIER2_CITIES.length} cities) × top 15 services`);
  console.log(`  Total: ${total} keywords`);
  console.log(`  Estimated time: ~${Math.round(total * 7 / 60)} minutes\n`);

  const results = [];
  let done = 0;

  for (const kw of allKeywords) {
    done++;
    process.stdout.write(`  [${String(done).padStart(4)}/${total}] ${kw.padEnd(50)} `);
    const d = await getKwData(pg, kw);
    results.push(d);

    if (d.vol && parseVol(d.vol) > 0) {
      console.log(`vol=${d.vol.padEnd(6)} KD=${(d.kd||'—').padEnd(4)} CPC=${d.cpc ? '$'+d.cpc : '—'}`);
    } else {
      console.log(`—`);
    }

    // Save checkpoint every 50 keywords
    if (done % 50 === 0) {
      writeFileSync(OUT, buildReport(results, `${done}/${total}`), 'utf8');
      const found = results.filter(r => r.vol && parseVol(r.vol) > 0).length;
      console.log(`\n  💾 checkpoint — ${found} keywords with data (${done}/${total} searched)\n`);
    }
  }

  writeFileSync(OUT, buildReport(results, `${done}/${total} complete`), 'utf8');
  const found = results.filter(r => r.vol && parseVol(r.vol) > 0).length;
  console.log(`\n✅ Done — ${found}/${total} keywords found → ${OUT}`);

  browser.disconnect();
}

main().catch(e => { console.error('Fatal:', e.message); process.exit(1); });
