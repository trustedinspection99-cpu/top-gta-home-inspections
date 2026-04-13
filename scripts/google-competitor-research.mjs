/**
 * google-competitor-research.mjs
 * Searches Bing for home inspection competitors across Ontario cities.
 * Uses Chrome via remote debug port — Bing is far less aggressive than Google.
 */

import puppeteer from 'puppeteer';
import { writeFileSync } from 'fs';
import { execSync } from 'child_process';
import http from 'http';

const CHROME_EXE = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const USER_DATA  = 'C:/Users/Owner/AppData/Local/Google/Chrome/User Data';
const DEBUG_PORT = 9222;
const OUT        = 'C:/Users/Owner/Documents/Competitor-Research-Google.md';
const sleep = ms => new Promise(r => setTimeout(r, ms));

const CITIES = [
  'Toronto', 'Mississauga', 'Brampton', 'Hamilton', 'Markham',
  'Vaughan', 'Richmond Hill', 'Oakville', 'Burlington', 'Kitchener',
  'Waterloo', 'Cambridge', 'Guelph', 'Barrie', 'Oshawa',
  'Ajax', 'Pickering', 'Whitby', 'Newmarket', 'Aurora',
  'Milton', 'North York', 'Scarborough', 'Etobicoke', 'Stouffville',
];

const QUERY_TEMPLATES = [
  '{city} home inspection',
  'home inspector {city} ontario',
];

const PROVINCE_QUERIES = [
  'home inspection ontario',
  'pre purchase home inspection ontario',
  'mold inspection ontario',
  'asbestos testing ontario',
  'wett inspection ontario',
  'radon testing ontario',
  'condo inspection ontario',
  'commercial building inspection ontario',
  'home inspector ontario canada',
];

const SKIP_DOMAINS = new Set([
  'bing.com', 'microsoft.com', 'google.com', 'youtube.com',
  'facebook.com', 'instagram.com', 'twitter.com', 'x.com',
  'reddit.com', 'wikipedia.org', 'yelp.com', 'yelp.ca',
  'homestars.com', 'yellowpages.ca', 'canada.ca', 'ontario.ca',
  'toronto.ca', 'linkedin.com', 'indeed.com', 'trustpilot.com',
  'bbb.org', 'angieslist.com', 'houzz.com', 'kijiji.ca',
  'craigslist.org', 'realtor.ca', 'zolo.ca', 'cmhc-schl.gc.ca',
  'tarion.com', 'reco.on.ca', 'oahi.com', 'cahpi.ca',
  'nachi.org', 'ashi.org', 'homeadvisor.com', 'angi.com',
  'thumbtack.com', 'bark.com', 'bark.ca', 'hipages.com.au',
  'checkatrade.com', 'groupon.com', 'amazon.com', 'ebay.com',
  'quora.com', 'answers.com', 'ehow.com', 'wikihow.com',
  'msn.com', 'yahoo.com', 'aol.com', 'ask.com',
  'asads.ca',
]);

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

async function bingSearch(pg, query) {
  const url = `https://www.bing.com/search?q=${encodeURIComponent(query)}&cc=CA&setlang=en&count=10`;
  await pg.goto(url, { waitUntil: 'domcontentloaded', timeout: 20000 });
  await sleep(800 + Math.random() * 600);

  return pg.evaluate((skipSet) => {
    const domains = new Set();

    // Bing organic results: li.b_algo contains the result items
    const results = document.querySelectorAll('li.b_algo');
    for (const r of results) {
      // The cite tag has the URL
      const cite = r.querySelector('cite');
      if (cite) {
        const txt = cite.innerText.trim().split(' ')[0].split('/')[0].toLowerCase().replace(/^www\./, '');
        if (txt && txt.includes('.') && !skipSet.includes(txt)) domains.add(txt);
      }
      // Also grab actual href
      const link = r.querySelector('h2 a[href^="http"]');
      if (link) {
        try {
          const host = new URL(link.href).hostname.replace(/^www\./, '').toLowerCase();
          if (host && !skipSet.includes(host)) domains.add(host);
        } catch (_) {}
      }
    }

    // Fallback: all cite tags on page
    if (domains.size < 3) {
      document.querySelectorAll('cite').forEach(c => {
        const txt = c.innerText.trim().split('/')[0].split(' ')[0].toLowerCase().replace(/^www\./, '');
        if (txt && txt.includes('.') && txt.length > 4 && !skipSet.includes(txt)) domains.add(txt);
      });
    }

    return [...domains];
  }, [...SKIP_DOMAINS]);
}

async function main() {
  await ensureChrome();

  const browser = await puppeteer.connect({ browserURL: `http://localhost:${DEBUG_PORT}` });
  const pages = await browser.pages();
  const pg = pages[0];
  pg.setDefaultTimeout(20000);

  // Block images/fonts for speed
  await pg.setRequestInterception(true).catch(() => {});
  pg.on('request', req => {
    try {
      if (['image', 'font', 'media'].includes(req.resourceType())) req.abort();
      else req.continue();
    } catch (_) {}
  });

  // Verify Bing loads
  await pg.goto('https://www.bing.com', { waitUntil: 'domcontentloaded', timeout: 15000 });
  await sleep(1500);
  console.log('✓ Bing accessible\n');

  const domainData = {};
  function recordDomain(domain, query, city) {
    if (!domainData[domain]) domainData[domain] = { count: 0, cities: new Set(), queries: [] };
    domainData[domain].count++;
    if (city) domainData[domain].cities.add(city);
    domainData[domain].queries.push(query);
  }

  const cityQueries = CITIES.flatMap(city =>
    QUERY_TEMPLATES.map(t => ({ query: t.replace('{city}', city), city }))
  );
  const provQueries = PROVINCE_QUERIES.map(q => ({ query: q, city: null }));
  const allQueries = [...cityQueries, ...provQueries];

  console.log(`Running ${allQueries.length} Bing searches (${cityQueries.length} city + ${provQueries.length} province-wide)...\n`);

  let blocked = 0;
  for (let i = 0; i < allQueries.length; i++) {
    const { query, city } = allQueries[i];
    process.stdout.write(`  [${(i+1).toString().padStart(2)}/${allQueries.length}] ${query.padEnd(52)} `);

    try {
      const domains = await bingSearch(pg, query);

      // Check if Bing blocked us
      const pageText = await pg.evaluate(() => document.body.innerText.substring(0, 200));
      if (pageText.includes('blocked') || pageText.includes('CAPTCHA') || pageText.includes('unusual')) {
        blocked++;
        console.log(`→ BLOCKED (${blocked})`);
        if (blocked >= 3) { console.log('\nBlocked too many times — stopping early.'); break; }
        await sleep(15000);
        continue;
      }

      for (const d of domains) recordDomain(d, query, city);
      console.log(`→ ${domains.length} domains${domains.length ? ': ' + domains.slice(0, 4).join(', ') : ''}`);
    } catch (e) {
      console.log(`→ ERR: ${e.message.substring(0, 50)}`);
    }

    // Delay between searches: 2-4 seconds
    await sleep(2000 + Math.random() * 2000);
  }

  browser.disconnect();

  // Sort results
  const sorted = Object.entries(domainData)
    .map(([domain, d]) => ({ domain, count: d.count, cityCount: d.cities.size, cities: [...d.cities] }))
    .sort((a, b) => b.count - a.count);

  console.log(`\n✅ Found ${sorted.length} unique competitor domains\n`);
  console.log('Top 25:');
  sorted.slice(0, 25).forEach((d, i) => {
    console.log(`  ${(i+1).toString().padStart(2)}. ${d.domain.padEnd(45)} ${d.count} appearances, ${d.cityCount} cities`);
  });

  // Build report
  let md = `# Bing SERP Competitor Research — Ontario Home Inspection\n`;
  md += `*Scraped: ${new Date().toISOString().split('T')[0]} | ${CITIES.length} cities × ${QUERY_TEMPLATES.length} templates + ${PROVINCE_QUERIES.length} province queries*\n\n`;
  md += `**Total unique competitor domains: ${sorted.length}**\n\n`;
  md += `---\n\n## All Competitors — Ranked by Frequency\n\n`;
  md += `| # | Domain | Appearances | Cities |\n|---|---|---|---|\n`;
  sorted.forEach((d, i) => {
    md += `| ${i + 1} | **${d.domain}** | ${d.count} | ${d.cityCount} |\n`;
  });

  md += `\n---\n\n## Strong Provincial Competitors (5+ cities)\n\n`;
  const strong = sorted.filter(d => d.cityCount >= 5);
  md += `These appear across many cities — highest priority for SEMrush keyword scraping:\n\n`;
  md += `| Domain | Appearances | Cities |\n|---|---|---|\n`;
  strong.forEach(d => {
    md += `| **${d.domain}** | ${d.count} | ${d.cityCount} |\n`;
  });

  md += `\n---\n\n## Mid-Tier Competitors (2-4 cities)\n\n`;
  const mid = sorted.filter(d => d.cityCount >= 2 && d.cityCount < 5);
  md += `| Domain | Appearances | Cities |\n|---|---|---|\n`;
  mid.forEach(d => {
    md += `| ${d.domain} | ${d.count} | ${d.cityCount} |\n`;
  });

  writeFileSync(OUT, md, 'utf8');
  console.log(`\n✅ Report saved to: ${OUT}`);
}

main().catch(e => { console.error('Fatal:', e.message); process.exit(1); });
