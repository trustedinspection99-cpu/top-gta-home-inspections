/**
 * semrush-backlinks.mjs
 * Scrapes Semrush Backlink Analytics (Backlinks tab) for all 19 competitors + ASADS.
 * Extracts referring domains from each backlink row (links[1] = source URL).
 * Finds domains linking to competitors but NOT to ASADS (gap opportunities).
 *
 * Run: node scripts/semrush-backlinks.mjs
 * Output: scripts/semrush-backlink-report-[date].md
 * Requires: Chrome open and logged into semrush.com
 */

import puppeteer from 'puppeteer';
import { writeFileSync } from 'fs';
import { execSync } from 'child_process';
import http from 'http';

const CHROME_EXE = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const USER_DATA  = 'C:/Users/Owner/AppData/Local/Google/Chrome/User Data';
const DEBUG_PORT = 9222;
const TODAY      = new Date().toISOString().split('T')[0];
const OUT        = `C:/Users/Owner/Documents/top-gta-home-inspections/scripts/semrush-backlink-report-${TODAY}.md`;
const sleep = ms => new Promise(r => setTimeout(r, ms));

// Noise domains to skip (search engines, social aggregators, shorteners, spam)
const SKIP_DOMAINS = new Set([
  'google.com', 'google.ca', 'bing.com', 'yahoo.com', 'duckduckgo.com',
  'bit.ly', 'tinyurl.com', 'linktr.ee', 't.co',
  'facebook.com', 'instagram.com', 'twitter.com', 'x.com', 'youtube.com',
  'linkedin.com', 'ca.linkedin.com', 'reddit.com',
  'semrush.com', 'ahrefs.com', 'moz.com',
  'archive.org', 'web.archive.org',
]);

function isNoisy(domain) {
  if (SKIP_DOMAINS.has(domain)) return true;
  // Yahoo country subdomains
  if (domain.endsWith('.yahoo.com')) return true;
  // Bing subdomains
  if (domain.match(/^\d+\.bing\.com$/)) return true;
  // Japanese/spam blog farms
  if (domain.endsWith('.goo.ne.jp') || domain.endsWith('.fc2.com')) return true;
  return false;
}

const COMPETITORS = [
  // National / Franchise
  { domain: 'mikeholmesinspections.com',  label: 'Mike Holmes Inspections' },
  { domain: 'amerispec.ca',               label: 'AmeriSpec Canada' },
  { domain: 'pillartopost.com',           label: 'Pillar To Post' },
  { domain: 'abuyerschoice.com',          label: "A Buyer's Choice" },
  { domain: 'carsondunlop.ca',            label: 'Carson Dunlop' },
  // GTA / Multi-City
  { domain: 'inchbyinchinspections.com',  label: 'Inch by Inch' },
  { domain: 'twinpeaksinspections.ca',    label: 'Twin Peaks' },
  { domain: 'solexgroup.ca',              label: 'Solex Group' },
  { domain: 'gpiweb.ca',                  label: 'GPI Home Inspections' },
  { domain: 'smartchoicehomeandmold.com', label: 'Smart Choice Home & Mold' },
  { domain: 'inspectionservicesgroup.com',label: 'Inspection Services Group' },
  // City-Specific
  { domain: 'housemastertoronto.com',     label: 'HouseMaster Toronto' },
  { domain: 'ehinspections.ca',           label: 'EH Inspections' },
  { domain: 'rankinhomeinspections.ca',   label: 'Rankin Home Inspections' },
  { domain: 'mdhi.ca',                    label: 'MDHI Hamilton' },
  { domain: 'robleshomeinspections.com',  label: 'Robles Home Inspections' },
  { domain: 'legacyhomeinspection.ca',    label: 'Legacy Home Inspection' },
  { domain: 'building-insights.com',      label: 'Building Insights' },
  { domain: '1stcallhomeinspections.com', label: '1st Call Home Inspections' },
];

// ── Chrome helpers ─────────────────────────────────────────────────────────────
function checkPort(port) {
  return new Promise(resolve => {
    const req = http.get(`http://localhost:${port}/json/version`, res => resolve(res.statusCode === 200));
    req.on('error', () => resolve(false));
    req.setTimeout(1000, () => { req.destroy(); resolve(false); });
  });
}

async function ensureChrome() {
  if (await checkPort(DEBUG_PORT)) { console.log('✓ Chrome running on port', DEBUG_PORT); return; }
  console.log('Launching Chrome...');
  try { execSync('taskkill /F /IM chrome.exe', { stdio: 'ignore' }); } catch (_) {}
  await sleep(3000);
  const lockfile = USER_DATA.replace(/\//g, '\\') + '\\lockfile';
  try { execSync(`powershell -Command "if (Test-Path '${lockfile}') { Remove-Item -Force '${lockfile}' }"`, { stdio: 'ignore' }); } catch (_) {}
  await sleep(1000);
  const args = [
    `--remote-debugging-port=${DEBUG_PORT}`,
    `--user-data-dir="${USER_DATA.replace(/\//g, '\\')}"`,
    '--profile-directory=Default', '--no-first-run', '--window-size=1440,900',
  ].join(' ');
  try {
    execSync(`powershell -Command "Start-Process '${CHROME_EXE.replace(/\//g, '\\')}' -ArgumentList '${args}'"`, { stdio: 'ignore' });
  } catch (_) {
    execSync(`cmd /c start "" "${CHROME_EXE.replace(/\//g, '\\')}" ${args}`, { stdio: 'ignore' });
  }
  for (let i = 0; i < 20; i++) {
    await sleep(1500);
    if (await checkPort(DEBUG_PORT)) { console.log('✓ Chrome ready'); return; }
    process.stdout.write('.');
  }
  throw new Error('Chrome debug port never opened');
}

// ── Extract referring domains from current page ────────────────────────────────
// Each full backlink row has 4 links: [semrush-src-analysis, actual-src, semrush-tgt-analysis, actual-tgt]
// We want the actual-src domain (links[1])
async function extractPageDomains(pg, targetDomain) {
  return pg.evaluate((targetDomain) => {
    const domains = new Set();
    const rows = Array.from(document.querySelectorAll('[role="row"]'));

    for (const row of rows) {
      const links = Array.from(row.querySelectorAll('a[href]'))
        .map(a => a.href)
        .filter(h => h && h.startsWith('http') && !h.includes('semrush.com'));

      if (links.length < 2) continue;

      // links[0] = actual source URL, links[1] = actual target URL (competitor page)
      // BUT Semrush rows have: semrush-src, actual-src, semrush-tgt, actual-tgt
      // So actual-src = links[0] if it's not a semrush URL (already filtered)
      // After filtering semrush URLs, links[0] is the source and links[1] is the target
      const sourceUrl = links[0];
      try {
        const url = new URL(sourceUrl);
        const host = url.hostname.replace(/^www\./, '');
        // Skip if it's the target domain itself (self-links)
        if (host === targetDomain || host.endsWith('.' + targetDomain)) continue;
        if (host && host.includes('.')) domains.add(host);
      } catch (_) {}
    }
    return Array.from(domains);
  }, targetDomain);
}

// ── Click next page ────────────────────────────────────────────────────────────
async function clickNext(pg) {
  return pg.evaluate(() => {
    // Look for pagination: "Next" button or ">" arrow
    const allBtns = Array.from(document.querySelectorAll('button, [role="button"], a'));
    const nextBtn = allBtns.find(el => {
      const text = (el.innerText || el.getAttribute('aria-label') || '').trim();
      return (text === 'Next' || text === '>' || text === '→' || text === 'next page') && !el.disabled;
    });
    if (nextBtn) { nextBtn.click(); return true; }

    // Also try: look for pagination numbers and find the currently active one, click next
    const pageNums = Array.from(document.querySelectorAll('[class*="pag"] a, [class*="pag"] button'))
      .filter(el => /^\d+$/.test((el.innerText || '').trim()));
    if (pageNums.length > 0) {
      const active = pageNums.find(el => el.getAttribute('aria-current') === 'page' || el.classList.contains('active'));
      if (active) {
        const idx = pageNums.indexOf(active);
        if (idx < pageNums.length - 1) { pageNums[idx + 1].click(); return true; }
      }
    }
    return false;
  });
}

// ── Scrape one competitor ──────────────────────────────────────────────────────
async function scrapeCompetitor(pg, domain, maxPages = 10) {
  process.stdout.write(`\n  Scraping ${domain} `);

  await pg.goto(
    `https://www.semrush.com/analytics/backlinks/backlinks/?q=${domain}&searchType=domain`,
    { waitUntil: 'networkidle2', timeout: 60000 }
  );
  await sleep(5000);

  const allDomains = new Set();

  for (let page = 1; page <= maxPages; page++) {
    const domains = await extractPageDomains(pg, domain);
    for (const d of domains) {
      if (!isNoisy(d)) allDomains.add(d);
    }
    process.stdout.write('.');

    const hasNext = await clickNext(pg);
    if (!hasNext) break;
    await sleep(4000);
  }

  const result = Array.from(allDomains);
  console.log(` → ${result.length} referring domains`);
  return result;
}

// ── Main ──────────────────────────────────────────────────────────────────────
async function main() {
  await ensureChrome();

  const browser = await puppeteer.connect({ browserURL: `http://localhost:${DEBUG_PORT}` });
  const pages   = await browser.pages();
  const pg      = pages[0];
  pg.setDefaultTimeout(60000);

  await pg.setRequestInterception(true).catch(() => {});
  pg.on('request', req => {
    try {
      if (['image', 'font', 'media'].includes(req.resourceType())) req.abort();
      else req.continue();
    } catch (_) {}
  });

  // Verify login
  await pg.goto('https://www.semrush.com/dashboard/', { waitUntil: 'networkidle2', timeout: 30000 });
  await sleep(2000);
  if (pg.url().includes('login')) {
    console.error('❌ Not logged in — open Chrome and log into semrush.com first');
    browser.disconnect(); return;
  }
  console.log('✅ Logged into Semrush\n');

  const allData = {};

  // ASADS first
  console.log('── ASADS (our backlinks)');
  allData['asads.ca'] = await scrapeCompetitor(pg, 'asads.ca', 10);
  const asadsDomains = new Set(allData['asads.ca'].map(d => d.toLowerCase()));
  await sleep(2000);

  // All competitors
  for (const { domain, label } of COMPETITORS) {
    console.log(`\n── ${label} (${domain})`);
    try {
      allData[domain] = await scrapeCompetitor(pg, domain, 10);
    } catch (e) {
      console.log(`  ⚠ Error: ${e.message.substring(0, 60)} — skipping`);
      allData[domain] = [];
    }
    await sleep(2000);
  }

  browser.disconnect();

  // ── Gap analysis ─────────────────────────────────────────────────────────────
  const gapMap = new Map();

  for (const { domain, label } of COMPETITORS) {
    for (const refDomain of (allData[domain] || [])) {
      const key = refDomain.toLowerCase();
      if (asadsDomains.has(key) || key === 'asads.ca') continue;
      if (!gapMap.has(key)) gapMap.set(key, { competitors: [], count: 0 });
      const entry = gapMap.get(key);
      if (!entry.competitors.includes(label)) {
        entry.competitors.push(label);
        entry.count++;
      }
    }
  }

  const gaps = Array.from(gapMap.entries())
    .map(([domain, data]) => ({ domain, ...data }))
    .sort((a, b) => b.count - a.count);

  // ── Markdown report ───────────────────────────────────────────────────────────
  let md = `# ASADS Semrush Backlink Gap Report\n`;
  md += `**Date:** ${TODAY} | **Competitors scraped:** ${COMPETITORS.length} | **Method:** Semrush Backlink Analytics\n\n`;

  md += `## Summary\n\n| Domain | Referring Domains Found |\n|---|---|\n`;
  md += `| asads.ca (us) | ${allData['asads.ca']?.length || 0} |\n`;
  for (const { domain, label } of COMPETITORS) {
    md += `| ${label} (${domain}) | ${allData[domain]?.length || 0} |\n`;
  }
  md += '\n';

  md += `---\n\n## Backlink Gap — Domains Linking to Competitors but NOT ASADS\n\n`;
  md += `**Total gap domains: ${gaps.length}** | Sorted by # of competitors linked to.\n\n`;

  const high   = gaps.filter(g => g.count >= 3);
  const medium = gaps.filter(g => g.count === 2);
  const low    = gaps.filter(g => g.count === 1);

  if (high.length) {
    md += `### 🔴 HIGH Priority — linked to 3+ competitors (likely directories/associations)\n\n`;
    md += `| Referring Domain | Competitors | Count |\n|---|---|---|\n`;
    high.forEach(g => {
      md += `| **${g.domain}** | ${g.competitors.join(', ')} | ${g.count} |\n`;
    });
    md += '\n';
  }

  if (medium.length) {
    md += `### 🟡 MEDIUM Priority — linked to 2 competitors\n\n`;
    md += `| Referring Domain | Competitors |\n|---|---|\n`;
    medium.forEach(g => {
      md += `| ${g.domain} | ${g.competitors.join(', ')} |\n`;
    });
    md += '\n';
  }

  if (low.length) {
    md += `### ⚪ LOW Priority — linked to 1 competitor\n\n`;
    md += `| Referring Domain | Competitor |\n|---|---|\n`;
    low.slice(0, 60).forEach(g => {
      md += `| ${g.domain} | ${g.competitors[0]} |\n`;
    });
    if (low.length > 60) md += `\n_...and ${low.length - 60} more_\n`;
    md += '\n';
  }

  md += `---\n\n## ASADS Current Referring Domains\n\n`;
  md += `| Domain |\n|---|\n`;
  (allData['asads.ca'] || []).forEach(d => { md += `| ${d} |\n`; });

  md += `\n---\n\n## Action Plan\n\n`;
  md += `1. **HIGH priority** — submit ASADS to every domain in the 🔴 list (directories/associations)\n`;
  md += `2. **OAHI, NACHI, CAHPI, Homestars** — if listed above, register immediately\n`;
  md += `3. **MEDIUM** — outreach for guest posts, mentions, or directory listings\n`;
  md += `4. Re-run monthly: \`npm run semrush-backlinks\`\n`;

  writeFileSync(OUT, md, 'utf8');
  console.log(`\n\n✅ Saved: ${OUT}`);
  console.log(`\nTop ${Math.min(15, gaps.length)} gap domains:`);
  gaps.slice(0, 15).forEach((g, i) => {
    console.log(`  ${(i+1).toString().padStart(2)}. ${g.domain} — ${g.count} competitor(s): ${g.competitors.slice(0,3).join(', ')}`);
  });
  console.log(`\nTotal gap domains: ${gaps.length} | HIGH: ${high.length} | MEDIUM: ${medium.length} | LOW: ${low.length}`);
}

main().catch(e => { console.error('Fatal:', e.message); process.exit(1); });
