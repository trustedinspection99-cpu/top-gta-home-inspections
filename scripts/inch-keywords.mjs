import puppeteer from 'puppeteer';
import { writeFileSync } from 'fs';
const sleep = ms => new Promise(r => setTimeout(r, ms));

const browser = await puppeteer.connect({ browserURL: 'http://localhost:9222' });
const pages = await browser.pages();
const pg = pages[0];
pg.setDefaultTimeout(60000);
await pg.setRequestInterception(true).catch(() => {});
pg.on('request', req => {
  try {
    if (['image','font','media'].includes(req.resourceType())) req.abort();
    else req.continue();
  } catch(_) {}
});

await pg.goto(
  'https://www.semrush.com/analytics/organic/positions/?q=inchbyinchinspections.com&db=ca&sortby=Po&order=asc',
  { waitUntil: 'networkidle2', timeout: 60000 }
);
await sleep(5000);

function extractRows() {
  return pg.evaluate(() => {
    const results = [];
    for (const row of document.querySelectorAll('[role="row"]')) {
      const cells = Array.from(row.querySelectorAll('[role="cell"],[role="gridcell"],td'))
        .map(c => c.innerText.trim().replace(/\n/g,' ').substring(0,80));
      if (cells.length < 7) continue;
      const kw = cells[1];
      if (!kw || kw.toLowerCase() === 'keyword') continue;
      let pos = '';
      for (let i = 3; i <= 6; i++) {
        const v = (cells[i]||'').trim();
        if (/^\d+$/.test(v) && +v >= 1 && +v <= 100) { pos = v; break; }
      }
      if (!pos) continue;
      let vol = '';
      for (let i = 6; i <= 10; i++) {
        const v = (cells[i]||'').replace(',','');
        if (/^\d+(\.\d+)?[KkMm]?$/.test(v)) {
          const n = parseFloat(v) * (v.match(/[Kk]/) ? 1000 : v.match(/[Mm]/) ? 1e6 : 1);
          if (n >= 10) { vol = cells[i]; break; }
        }
      }
      let kd = '';
      for (let i = 8; i <= 11; i++) {
        const v = (cells[i]||'').trim();
        if (/^\d+$/.test(v) && +v <= 100) { kd = v; break; }
      }
      results.push({ kw, pos: +pos, vol, kd });
    }
    return results;
  });
}

async function clickNext() {
  return pg.evaluate(() => {
    const btn = Array.from(document.querySelectorAll('button,[role="button"]'))
      .find(b => (b.innerText || '').trim() === 'Next');
    if (btn && !btn.disabled) { btn.click(); return true; }
    return false;
  });
}

const all = new Map();
for (let page = 1; page <= 15; page++) {
  const rows = await extractRows();
  for (const r of rows) all.set(r.kw, r);
  console.log(`Page ${page}/15 — ${rows.length} rows — total: ${all.size}`);
  const ok = await clickNext();
  if (!ok) { console.log('No next button, stopping'); break; }
  await sleep(4000);
}

const sorted = Array.from(all.values()).sort((a,b) => a.pos - b.pos);
console.log('\nTotal:', sorted.length, 'keywords');

const relevant = sorted.filter(r => {
  const k = r.kw.toLowerCase();
  return /inspect|mold|mould|asbestos|radon|wett|toronto|ontario|hamilton|mississauga|brampton|kitchener|guelph|waterloo|cambridge|oakville|burlington|barrie|air quality|home air|indoor air|remediat|abatement|removal|testing|friable|dss|vermiculite|pre.purchase|pre.list|thermal|infrared/.test(k);
});

let md = `# Inch by Inch — Complete Organic Keywords\n*${new Date().toISOString().split('T')[0]}, all pages*\n\n`;
md += `Total: ${sorted.length} | Relevant: ${relevant.length}\n\n`;
md += `## Relevant Keywords\n\n| # | Keyword | Pos | Vol | KD |\n|---|---|---|---|---|\n`;
relevant.forEach((r,i) => { md += `| ${i+1} | ${r.kw} | ${r.pos} | ${r.vol||'—'} | ${r.kd||'—'} |\n`; });
md += `\n## All Keywords\n\n| # | Keyword | Pos | Vol | KD |\n|---|---|---|---|---|\n`;
sorted.forEach((r,i) => { md += `| ${i+1} | ${r.kw} | ${r.pos} | ${r.vol||'—'} | ${r.kd||'—'} |\n`; });

writeFileSync('C:/Users/Owner/Documents/InchByInch-Keywords.md', md);
console.log('Saved: C:/Users/Owner/Documents/InchByInch-Keywords.md');
browser.disconnect();
