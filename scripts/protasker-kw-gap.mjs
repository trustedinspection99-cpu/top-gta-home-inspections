/**
 * protasker-kw-gap.mjs
 * Uses SEMrush Keyword Gap tool to find keywords competitors rank for
 * that Protasker doesn't. Tries "Missing" and "Untapped" filters.
 *
 * URL: semrush.com/analytics/keywordgap/?db=ca&q=protasker.ca&domains=competitor
 *
 * Output: C:/Users/Owner/Documents/Protasker-Keyword-Gap.md
 */

import puppeteer from 'puppeteer';
import { writeFileSync } from 'fs';
const sleep = ms => new Promise(r => setTimeout(r, ms));
const OUT = 'C:/Users/Owner/Documents/Protasker-Keyword-Gap.md';
const DB  = 'ca';
const MY_DOMAIN = 'protasker.ca';

const COMPETITORS = [
  { name: 'HomeStars',   domain: 'homestars.com'     },
  { name: 'Bark',        domain: 'bark.com'           },
  { name: 'Jiffy',       domain: 'jiffyondemand.com'  },
  { name: 'TaskRabbit',  domain: 'taskrabbit.com'     },
  { name: 'UrbanTasker', domain: 'urbantasker.com'    },
  { name: 'Yelp CA',     domain: 'yelp.ca'            },
];

async function dismissPopup(pg) {
  await pg.evaluate(() => {
    const btn = Array.from(document.querySelectorAll('button'))
      .find(b => /continue|terminate/i.test(b.innerText || ''));
    if (btn) btn.click();
  }).catch(() => {});
}

async function clickTab(pg, tabLabel) {
  await pg.evaluate((label) => {
    // Try buttons, tabs, links
    const els = Array.from(document.querySelectorAll('button, [role="tab"], a, li'));
    const el = els.find(e => {
      const t = (e.innerText || e.textContent || '').trim();
      return t.toLowerCase() === label.toLowerCase() ||
             t.toLowerCase().startsWith(label.toLowerCase());
    });
    if (el) { el.click(); return true; }
    return false;
  }, tabLabel).catch(() => false);
}

async function extractTableRows(pg) {
  return await pg.evaluate(() => {
    const rows = [];
    const seen = new Set();

    // Attempt 1: standard table
    document.querySelectorAll('table tbody tr').forEach(tr => {
      const cells = Array.from(tr.querySelectorAll('td'));
      if (cells.length < 3) return;
      const kw  = cells[0]?.innerText?.trim()?.split('\n')[0] || '';
      if (!kw || kw.length < 3 || kw.length > 120 || seen.has(kw)) return;
      const vol = cells[1]?.innerText?.trim()?.split('\n')[0] || '';
      const kd  = cells[2]?.innerText?.trim()?.split('\n')[0] || '';
      const cpc = cells[3]?.innerText?.trim()?.split('\n')[0] || '';
      seen.add(kw);
      rows.push({ kw, vol, kd, cpc });
    });

    if (rows.length >= 5) return rows;

    // Attempt 2: data-row or list items with keyword data
    document.querySelectorAll('[data-keyword], [class*="keyword-row"], [class*="KeywordRow"]').forEach(el => {
      const kw = el.getAttribute('data-keyword') ||
                 el.querySelector('[class*="keyword"], [class*="Keyword"]')?.innerText?.trim();
      if (kw && !seen.has(kw) && kw.length > 2) {
        seen.add(kw);
        rows.push({ kw, vol: '', kd: '', cpc: '' });
      }
    });

    return rows;
  }).catch(() => []);
}

async function lineScanRows(pg) {
  return await pg.evaluate(() => {
    const rows = [];
    const seen = new Set();
    const lines = document.body.innerText.split('\n').map(l => l.trim()).filter(Boolean);

    for (let i = 0; i < lines.length - 2 && rows.length < 300; i++) {
      const kw  = lines[i];
      const vol = lines[i + 1];
      const kd  = lines[i + 2];
      const cpc = lines[i + 3] || '';

      const volOk = /^[\d,\.]+[KkMm]?$/.test(vol.replace(/,/g, '')) && vol !== '0';
      const kdOk  = /^\d{1,3}$/.test(kd) && +kd <= 100;
      const kwOk  = kw.length > 3 && kw.length < 100 &&
                    !/^\d+[\.,]?\d*$/.test(kw) &&
                    !kw.startsWith('$') && !kw.startsWith('http') &&
                    !/^(Keyword|Volume|KD|CPC|Intent|Traffic|Position|Missing|Untapped|Weak|Strong|Shared|URL|SERP|Updated|Features|All keywords|Filter)$/i.test(kw) &&
                    !seen.has(kw);

      if (kwOk && volOk && kdOk) {
        seen.add(kw);
        rows.push({ kw, vol, kd, cpc: cpc.replace('$', '') });
        i += 3;
      }
    }
    return rows;
  }).catch(() => []);
}

async function scrapeGap(pg, competitorDomain) {
  const url = `https://www.semrush.com/analytics/keywordgap/?db=${DB}&q=${MY_DOMAIN}&domains=${competitorDomain}`;
  const allRows = new Map();

  try {
    await pg.goto(url, { waitUntil: 'domcontentloaded', timeout: 45000 });
    await sleep(9000);
    await dismissPopup(pg);
    await sleep(2000);

    // Try clicking "Missing" tab — keywords competitor ranks for, we don't
    await clickTab(pg, 'Missing');
    await sleep(3000);

    // Scroll through the page to trigger rendering
    const height = await pg.evaluate(() => document.body.scrollHeight).catch(() => 6000);
    const steps = 25;
    for (let s = 0; s <= steps; s++) {
      await pg.evaluate((y) => window.scrollTo(0, y), Math.floor((s / steps) * height)).catch(() => {});
      await sleep(250);

      // Collect table rows at each scroll position
      const tableRows = await extractTableRows(pg);
      tableRows.forEach(r => { if (!allRows.has(r.kw)) allRows.set(r.kw, r); });
    }

    // If table gave nothing, try line scan
    if (allRows.size < 5) {
      await pg.evaluate(() => window.scrollTo(0, 0)).catch(() => {});
      await sleep(500);
      const lineRows = await lineScanRows(pg);
      lineRows.forEach(r => { if (!allRows.has(r.kw)) allRows.set(r.kw, r); });
    }

    // Also try "Untapped" tab (competitor ranks, we don't appear at all)
    if (allRows.size < 10) {
      await pg.evaluate(() => window.scrollTo(0, 0)).catch(() => {});
      await clickTab(pg, 'Untapped');
      await sleep(4000);

      const height2 = await pg.evaluate(() => document.body.scrollHeight).catch(() => 6000);
      for (let s = 0; s <= steps; s++) {
        await pg.evaluate((y) => window.scrollTo(0, y), Math.floor((s / steps) * height2)).catch(() => {});
        await sleep(200);
        const tableRows = await extractTableRows(pg);
        tableRows.forEach(r => { if (!allRows.has(r.kw)) allRows.set(r.kw, r); });
      }

      if (allRows.size < 5) {
        const lineRows = await lineScanRows(pg);
        lineRows.forEach(r => { if (!allRows.has(r.kw)) allRows.set(r.kw, r); });
      }
    }

  } catch(e) {
    console.log(`  ERR: ${e.message.substring(0, 60)}`);
  }

  return [...allRows.values()];
}

function parseVol(v) {
  if (!v) return 0;
  v = String(v).replace(/,/g, '').trim();
  if (/[Kk]$/.test(v)) return parseFloat(v) * 1000;
  if (/[Mm]$/.test(v)) return parseFloat(v) * 1000000;
  return parseFloat(v) || 0;
}

const SERVICE_TERMS = [
  'cleaning', 'handyman', 'plumber', 'plumbing', 'electrician', 'electrical',
  'hvac', 'furnace', 'ac repair', 'air condition', 'lawn', 'landscaping',
  'junk removal', 'trash', 'snow removal', 'pest control', 'locksmith',
  'renovation', 'remodel', 'painting', 'drywall', 'flooring', 'roofing',
  'eavestrough', 'gutter', 'window', 'fence', 'deck', 'interlocking',
  'pressure wash', 'tree', 'drain', 'sump pump', 'carpet', 'duct',
  'appliance', 'garage', 'moving', 'pool', 'basement', 'bathroom', 'kitchen',
  'contractor', 'repair', 'installation', 'service', 'near me',
];

function isServiceKw(kw) {
  const k = kw.toLowerCase();
  return SERVICE_TERMS.some(t => k.includes(t));
}

function buildReport(gapData) {
  const date = new Date().toISOString().split('T')[0];
  let md = `# Protasker — Keyword Gap (vs Competitors)\n`;
  md += `*${date} · Canada (db=ca) · SEMrush Keyword Gap Tool*\n\n`;

  // Summary
  md += `## Summary\n\n`;
  md += `| Competitor | Gap Keywords Found | Service Keywords |\n`;
  md += `|-----------|-------------------|------------------|\n`;
  for (const { name, rows } of gapData) {
    const svc = rows.filter(r => isServiceKw(r.kw)).length;
    md += `| ${name} | ${rows.length} | ${svc} |\n`;
  }
  md += '\n---\n\n';

  // Combined gap — all unique service keywords across all competitors
  const allServiceGaps = new Map();
  for (const { name, rows } of gapData) {
    for (const r of rows) {
      if (!isServiceKw(r.kw)) continue;
      if (!allServiceGaps.has(r.kw) || parseVol(r.vol) > parseVol(allServiceGaps.get(r.kw).vol)) {
        allServiceGaps.set(r.kw, { ...r, source: name });
      }
    }
  }

  const gapList = [...allServiceGaps.values()]
    .sort((a, b) => parseVol(b.vol) - parseVol(a.vol));

  // Easy wins
  const easy = gapList.filter(r => {
    const kd = parseInt(r.kd) || 999;
    return kd <= 25 && parseVol(r.vol) >= 50;
  });

  if (easy.length) {
    md += `## Easy Win Gaps (KD ≤ 25, Vol ≥ 50)\n\n`;
    md += `| Keyword | Vol | KD | CPC | Competitor |\n`;
    md += `|---------|-----|----|----|------------|\n`;
    easy.slice(0, 60).forEach(r => {
      md += `| ${r.kw} | ${r.vol || '—'} | ${r.kd || '—'} | ${r.cpc ? '$'+r.cpc : '—'} | ${r.source} |\n`;
    });
    md += '\n';
  }

  // High volume
  const highVol = gapList.filter(r => parseVol(r.vol) >= 500);
  if (highVol.length) {
    md += `## High Volume Gaps (500+ vol)\n\n`;
    md += `| Keyword | Vol | KD | Competitor |\n`;
    md += `|---------|-----|----|-----------|\n`;
    highVol.slice(0, 60).forEach(r => {
      md += `| ${r.kw} | ${r.vol} | ${r.kd || '—'} | ${r.source} |\n`;
    });
    md += '\n';
  }

  // All service gap keywords
  md += `## All Service Gap Keywords\n\n`;
  md += `| Keyword | Vol | KD | CPC | Competitor |\n`;
  md += `|---------|-----|----|----|------------|\n`;
  gapList.slice(0, 250).forEach(r => {
    md += `| ${r.kw} | ${r.vol || '—'} | ${r.kd || '—'} | ${r.cpc ? '$'+r.cpc : '—'} | ${r.source} |\n`;
  });
  md += '\n---\n\n';

  // Per-competitor breakdown
  for (const { name, domain, rows } of gapData) {
    md += `## ${name} (\`${domain}\`)\n\n`;
    if (!rows.length) {
      md += `*No data retrieved*\n\n`;
      continue;
    }

    const svcRows = rows.filter(r => isServiceKw(r.kw))
      .sort((a, b) => parseVol(b.vol) - parseVol(a.vol));
    const otherRows = rows.filter(r => !isServiceKw(r.kw))
      .sort((a, b) => parseVol(b.vol) - parseVol(a.vol));

    if (svcRows.length) {
      md += `### Service Keywords (${svcRows.length})\n\n`;
      md += `| Keyword | Vol | KD | CPC |\n|---------|-----|----|----||\n`;
      svcRows.slice(0, 80).forEach(r => {
        md += `| ${r.kw} | ${r.vol || '—'} | ${r.kd || '—'} | ${r.cpc ? '$'+r.cpc : '—'} |\n`;
      });
      md += '\n';
    }
    if (otherRows.length) {
      md += `### Other Keywords (${otherRows.length})\n\n`;
      md += `| Keyword | Vol | KD |\n|---------|-----|----|\n`;
      otherRows.slice(0, 30).forEach(r => {
        md += `| ${r.kw} | ${r.vol || '—'} | ${r.kd || '—'} |\n`;
      });
      md += '\n';
    }
  }

  return md;
}

async function main() {
  const browser = await puppeteer.connect({ browserURL: 'http://localhost:9222', protocolTimeout: 60000 });
  const pg = await browser.newPage();
  pg.setDefaultTimeout(60000);

  console.log('Warming up...');
  await pg.goto('https://www.semrush.com/dashboard/', { waitUntil: 'domcontentloaded', timeout: 30000 }).catch(() => {});
  await sleep(3000);
  await dismissPopup(pg);
  await sleep(2000);
  console.log('Ready\n');

  const gapData = [];

  for (const { name, domain } of COMPETITORS) {
    console.log(`[${name}] Keyword Gap: ${MY_DOMAIN} vs ${domain}`);
    const rows = await scrapeGap(pg, domain);
    console.log(`  → ${rows.length} gap keywords (${rows.filter(r => isServiceKw(r.kw)).length} service-related)`);

    if (rows.length > 0) {
      const sample = rows.slice(0, 3).map(r => `"${r.kw}"`).join(', ');
      console.log(`  Sample: ${sample}`);
    }

    gapData.push({ name, domain, rows });
    writeFileSync(OUT, buildReport(gapData), 'utf8');
    console.log(`  Saved → ${OUT}\n`);

    await sleep(4000);
  }

  const total = gapData.reduce((s, d) => s + d.rows.length, 0);
  const svcTotal = gapData.reduce((s, d) => s + d.rows.filter(r => isServiceKw(r.kw)).length, 0);
  console.log(`Done — ${total} gap keywords total, ${svcTotal} service-related → ${OUT}`);

  await pg.close();
  browser.disconnect();
}

main().catch(e => { console.error('Fatal:', e.message); process.exit(1); });
