/**
 * protasker-competitor-gaps.mjs
 * Scrapes SEMrush Organic Research (positions tab) for each Protasker competitor.
 * Collects top ~200 ranking keywords per domain (Canada db).
 * Then cross-references against Protasker's own service keywords to find gaps.
 *
 * Output: C:/Users/Owner/Documents/Protasker-Competitor-Gaps.md
 */

import puppeteer from 'puppeteer';
import { writeFileSync } from 'fs';
const sleep = ms => new Promise(r => setTimeout(r, ms));
const OUT = 'C:/Users/Owner/Documents/Protasker-Competitor-Gaps.md';
const DB  = 'ca';

const COMPETITORS = [
  { name: 'HomeStars',    domain: 'homestars.com' },
  { name: 'Bark',         domain: 'bark.com' },
  { name: 'Jiffy',        domain: 'jiffyondemand.com' },
  { name: 'TaskRabbit',   domain: 'taskrabbit.com' },
  { name: 'UrbanTasker',  domain: 'urbantasker.com' },
  { name: 'Yelp CA',      domain: 'yelp.ca' },
];

// Protasker's own services — used for cross-reference gap analysis
const PROTASKER_SERVICES = [
  'junk removal', 'eavestrough cleaning', 'lawn care', 'snow removal',
  'handyman', 'landscaping', 'kitchen renovation', 'furnace repair',
  'drain cleaning', 'locksmith', 'house cleaning', 'pest control',
  'electrician', 'plumber', 'window replacement', 'eavestrough repair',
  'interlocking', 'roof repair', 'painting service', 'deep cleaning',
  'move out cleaning', 'carpet cleaning', 'drywall repair', 'deck installation',
  'fence installation', 'bathroom renovation', 'basement renovation',
  'home renovation', 'pressure washing', 'tree trimming', 'ac repair',
  'hvac repair', 'sump pump installation', 'window cleaning', 'duct cleaning',
  'interior painting', 'floor refinishing', 'handyman services',
];

async function dismissPopup(pg) {
  await pg.evaluate(() => {
    const btn = Array.from(document.querySelectorAll('button'))
      .find(b => /continue|terminate/i.test(b.innerText || ''));
    if (btn) btn.click();
  }).catch(() => {});
}

async function scrapeOrganicPositions(pg, domain) {
  const url = `https://www.semrush.com/analytics/organic/positions/?q=${encodeURIComponent(domain)}&db=${DB}`;
  console.log(`  → ${url}`);

  try {
    await pg.goto(url, { waitUntil: 'domcontentloaded', timeout: 40000 });
    await sleep(8000);
    await dismissPopup(pg);
    await sleep(1000);

    // Scroll to trigger virtual table rendering
    for (let s = 1; s <= 15; s++) {
      await pg.evaluate(s => window.scrollTo(0, s * 600), s).catch(() => {});
      await sleep(200);
    }
    await sleep(1000);

    const rows = await pg.evaluate(() => {
      const results = [];
      const seen = new Set();

      // Attempt 1: standard table rows
      document.querySelectorAll('table tbody tr').forEach(tr => {
        const cells = Array.from(tr.querySelectorAll('td'));
        if (cells.length < 4) return;
        const kw  = cells[0]?.innerText?.trim()?.split('\n')[0] || '';
        const pos = cells[1]?.innerText?.trim()?.split('\n')[0] || '';
        const vol = cells[3]?.innerText?.trim()?.split('\n')[0] || cells[2]?.innerText?.trim()?.split('\n')[0] || '';
        const kd  = cells[4]?.innerText?.trim()?.split('\n')[0] || '';
        const cpc = cells[5]?.innerText?.trim()?.split('\n')[0] || '';
        const pageUrl = cells[6]?.innerText?.trim()?.split('\n')[0] || cells[cells.length-1]?.innerText?.trim()?.split('\n')[0] || '';
        if (kw && kw.length > 2 && kw.length < 120 && !/^\d+$/.test(kw) && !seen.has(kw)) {
          seen.add(kw);
          results.push({ kw, pos, vol, kd, cpc, url: pageUrl });
        }
      });

      if (results.length >= 5) return results;

      // Attempt 2: data-* attribute rows (SEMrush sometimes uses these)
      document.querySelectorAll('[data-keyword]').forEach(el => {
        const kw = el.getAttribute('data-keyword') || el.innerText?.trim();
        if (kw && kw.length > 2 && !seen.has(kw)) {
          seen.add(kw);
          results.push({ kw, pos: '', vol: '', kd: '', cpc: '', url: '' });
        }
      });

      return results;
    }).catch(() => []);

    return rows;
  } catch(e) {
    console.log(`  ERR: ${e.message.substring(0, 60)}`);
    return [];
  }
}

async function scrapeWithScroll(pg, domain) {
  // Try scrolling through virtual table to get more rows
  const allRows = new Map(); // kw → row

  const url = `https://www.semrush.com/analytics/organic/positions/?q=${encodeURIComponent(domain)}&db=${DB}`;

  try {
    await pg.goto(url, { waitUntil: 'domcontentloaded', timeout: 40000 });
    await sleep(9000);
    await dismissPopup(pg);
    await sleep(1500);

    // Get page height
    const bodyHeight = await pg.evaluate(() => document.body.scrollHeight).catch(() => 5000);

    // Collect rows at different scroll positions
    const scrollSteps = 20;
    const stepSize = Math.max(300, Math.floor(bodyHeight / scrollSteps));

    for (let step = 0; step <= scrollSteps + 5; step++) {
      await pg.evaluate(y => window.scrollTo(0, y), step * stepSize).catch(() => {});
      await sleep(300);

      const newRows = await pg.evaluate(() => {
        const rows = [];
        document.querySelectorAll('table tbody tr').forEach(tr => {
          const cells = Array.from(tr.querySelectorAll('td'));
          if (cells.length < 3) return;
          const kw = cells[0]?.innerText?.trim()?.split('\n')[0] || '';
          if (!kw || kw.length < 3 || kw.length > 120 || /^\d+$/.test(kw)) return;
          // Position in col 1, vol varies by layout
          const pos = cells[1]?.innerText?.trim()?.split('\n')[0] || '';
          const vol = cells[2]?.innerText?.trim()?.split('\n')[0] || '';
          const kd  = cells[3]?.innerText?.trim()?.split('\n')[0] || '';
          const cpc = cells[4]?.innerText?.trim()?.split('\n')[0] || '';
          const pageUrl = cells[cells.length - 1]?.innerText?.trim()?.split('\n')[0] || '';
          rows.push({ kw, pos, vol, kd, cpc, url: pageUrl });
        });
        return rows;
      }).catch(() => []);

      newRows.forEach(r => {
        if (!allRows.has(r.kw)) allRows.set(r.kw, r);
      });
    }

    // Scroll back to top and try one more time
    await pg.evaluate(() => window.scrollTo(0, 0)).catch(() => {});
    await sleep(500);

    // Also try line-scan fallback if table scrape got nothing
    if (allRows.size < 3) {
      const lineScanRows = await pg.evaluate(() => {
        const rows = [];
        const seen = new Set();
        const text = document.body.innerText;
        const lines = text.split('\n').map(l => l.trim()).filter(Boolean);

        for (let i = 0; i < lines.length - 3 && rows.length < 200; i++) {
          const kw  = lines[i];
          const pos = lines[i+1];
          const vol = lines[i+2];
          const kd  = lines[i+3];

          // pos looks like a number 1-100
          const posOk = /^\d{1,3}$/.test(pos) && +pos >= 1 && +pos <= 100;
          // vol looks like "1,000" or "1K" or "590"
          const volOk = /^[\d,\.]+[KkMm]?$/.test(vol.replace(/,/g,''));
          // kd is a number 0-100
          const kdOk  = /^\d{1,3}$/.test(kd) && +kd <= 100;
          // kw should be a phrase
          const kwOk  = kw.length > 3 && kw.length < 100 &&
                        !/^\d+[\.,]?\d*$/.test(kw) && !kw.startsWith('$') &&
                        !kw.startsWith('http') && !/^https?:/.test(kw) &&
                        !/^(Keyword|Position|Volume|KD|CPC|Traffic|URL|Intent|Updated|SERP)$/i.test(kw);

          if (kwOk && posOk && volOk && !seen.has(kw)) {
            seen.add(kw);
            rows.push({ kw, pos, vol, kd, cpc: lines[i+4] || '', url: '' });
            i += 3;
          }
        }
        return rows;
      }).catch(() => []);

      lineScanRows.forEach(r => {
        if (!allRows.has(r.kw)) allRows.set(r.kw, r);
      });
    }

  } catch(e) {
    console.log(`  Scroll ERR: ${e.message.substring(0, 60)}`);
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

function parsePos(p) {
  const n = parseInt(p);
  return isNaN(n) ? 999 : n;
}

function isServiceKeyword(kw) {
  const k = kw.toLowerCase();
  return PROTASKER_SERVICES.some(svc => k.includes(svc));
}

function buildReport(competitorData) {
  const date = new Date().toISOString().split('T')[0];
  let md = `# Protasker — Competitor Keyword Gap Analysis\n`;
  md += `*${date} · Canada (SEMrush db=ca)*\n\n`;

  // Summary
  md += `## Summary\n\n`;
  md += `| Competitor | Domain | Keywords Scraped | Service Keywords | Top Position |\n`;
  md += `|-----------|--------|-----------------|-----------------|-------------|\n`;

  for (const { name, domain, rows } of competitorData) {
    const svcKws  = rows.filter(r => isServiceKeyword(r.kw));
    const topPos  = rows.reduce((best, r) => Math.min(best, parsePos(r.pos)), 999);
    md += `| ${name} | ${domain} | ${rows.length} | ${svcKws.length} | ${topPos < 999 ? topPos : '—'} |\n`;
  }
  md += '\n---\n\n';

  // Gap analysis — service keywords competitors rank for, grouped by service
  md += `## Keyword Gap: Service Keywords Competitors Rank For\n\n`;
  md += `*These are service-related keywords where competitors have rankings — potential targets for Protasker*\n\n`;

  const gapMap = new Map(); // kw → { kw, best competitor, pos, vol, kd }

  for (const { name, rows } of competitorData) {
    for (const r of rows) {
      if (!isServiceKeyword(r.kw)) continue;
      const existing = gapMap.get(r.kw);
      if (!existing || parsePos(r.pos) < parsePos(existing.pos)) {
        gapMap.set(r.kw, { kw: r.kw, competitor: name, pos: r.pos, vol: r.vol, kd: r.kd, cpc: r.cpc });
      }
    }
  }

  // Sort by volume desc
  const gapList = [...gapMap.values()]
    .sort((a, b) => parseVol(b.vol) - parseVol(a.vol));

  // Easy wins (top 11-30 positions, KD ≤ 30)
  const easyGaps = gapList.filter(r => {
    const p = parsePos(r.pos);
    const kd = parseInt(r.kd) || 999;
    return p >= 4 && p <= 30 && kd <= 30 && parseVol(r.vol) >= 50;
  });

  if (easyGaps.length > 0) {
    md += `### Easy Gap Wins (Competitor pos 4-30, KD ≤ 30, Vol ≥ 50)\n\n`;
    md += `| Keyword | Vol | KD | Best Competitor Pos | CPC |\n`;
    md += `|---------|-----|----|--------------------|-----|\n`;
    easyGaps.slice(0, 50).forEach(r => {
      md += `| ${r.kw} | ${r.vol || '—'} | ${r.kd || '—'} | ${r.competitor} #${r.pos} | ${r.cpc ? '$'+r.cpc : '—'} |\n`;
    });
    md += '\n';
  }

  // All gap keywords by volume
  md += `### All Service Keywords (Sorted by Volume)\n\n`;
  md += `| Keyword | Vol | KD | Best Competitor | Pos | CPC |\n`;
  md += `|---------|-----|----|-----------------|----|-----|\n`;
  gapList.slice(0, 200).forEach(r => {
    md += `| ${r.kw} | ${r.vol || '—'} | ${r.kd || '—'} | ${r.competitor} | ${r.pos || '—'} | ${r.cpc ? '$'+r.cpc : '—'} |\n`;
  });
  md += '\n---\n\n';

  // Per-competitor breakdown
  for (const { name, domain, rows } of competitorData) {
    md += `## ${name} (${domain})\n\n`;
    md += `*${rows.length} keywords scraped*\n\n`;

    if (rows.length === 0) {
      md += `*No data retrieved — virtual table may not have rendered*\n\n`;
      continue;
    }

    // Service keywords for this competitor
    const svcRows = rows
      .filter(r => isServiceKeyword(r.kw))
      .sort((a, b) => parseVol(b.vol) - parseVol(a.vol));

    if (svcRows.length > 0) {
      md += `### Service Keywords\n\n`;
      md += `| Keyword | Pos | Volume | KD | CPC |\n`;
      md += `|---------|-----|--------|----|-----|\n`;
      svcRows.slice(0, 60).forEach(r => {
        md += `| ${r.kw} | ${r.pos || '—'} | ${r.vol || '—'} | ${r.kd || '—'} | ${r.cpc ? '$'+r.cpc : '—'} |\n`;
      });
      md += '\n';
    }

    // All keywords
    const allSorted = [...rows].sort((a, b) => parsePos(a.pos) - parsePos(b.pos));
    md += `### All Keywords (by position)\n\n`;
    md += `| Keyword | Pos | Volume | KD | CPC |\n`;
    md += `|---------|-----|--------|----|-----|\n`;
    allSorted.slice(0, 100).forEach(r => {
      md += `| ${r.kw} | ${r.pos || '—'} | ${r.vol || '—'} | ${r.kd || '—'} | ${r.cpc ? '$'+r.cpc : '—'} |\n`;
    });
    md += '\n';
  }

  return md;
}

async function main() {
  const browser = await puppeteer.connect({ browserURL: 'http://localhost:9222', protocolTimeout: 60000 });
  const allPages = await browser.pages();
  // Keep only one tab — close extras (but not tab 0 which may be running cities script)
  // We'll use a NEW page to avoid interfering with the running script
  const pg = await browser.newPage();
  pg.setDefaultTimeout(60000);

  // Warm up session
  console.log('Warming up session...');
  await pg.goto('https://www.semrush.com/dashboard/', { waitUntil: 'domcontentloaded', timeout: 30000 }).catch(() => {});
  await sleep(3000);
  await dismissPopup(pg);
  await sleep(2000);
  console.log('Ready\n');

  const competitorData = [];

  for (const { name, domain } of COMPETITORS) {
    console.log(`\n[${name}] Scraping organic positions for ${domain}...`);
    const rows = await scrapeWithScroll(pg, domain);
    console.log(`  Got ${rows.length} keywords`);

    if (rows.length > 0) {
      const svcCount = rows.filter(r => isServiceKeyword(r.kw)).length;
      console.log(`  Service keywords: ${svcCount}`);
      const sample = rows.slice(0, 3).map(r => `"${r.kw}" pos=${r.pos} vol=${r.vol}`).join(', ');
      console.log(`  Sample: ${sample}`);
    }

    competitorData.push({ name, domain, rows });

    // Save checkpoint after each competitor
    writeFileSync(OUT, buildReport(competitorData), 'utf8');
    console.log(`  Saved checkpoint → ${OUT}`);

    await sleep(3000); // Pause between competitors
  }

  writeFileSync(OUT, buildReport(competitorData), 'utf8');

  const totalKws   = competitorData.reduce((sum, d) => sum + d.rows.length, 0);
  const totalGaps  = competitorData.reduce((sum, d) => sum + d.rows.filter(r => isServiceKeyword(r.kw)).length, 0);
  console.log(`\nDone — ${totalKws} total keywords, ${totalGaps} service keyword gaps → ${OUT}`);

  await pg.close();
  browser.disconnect();
}

main().catch(e => { console.error('Fatal:', e.message); process.exit(1); });
