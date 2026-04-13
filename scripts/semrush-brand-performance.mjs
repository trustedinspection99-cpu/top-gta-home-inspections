import puppeteer from 'puppeteer';
import fs from 'fs';
const sleep = ms => new Promise(r => setTimeout(r, ms));

async function scrapeSection(pg, url, label) {
  console.log(`\n━━━ ${label} ━━━`);
  await pg.goto(url, { waitUntil: 'networkidle2', timeout: 40000 });
  await sleep(5000);
  await pg.screenshot({ path: `C:/Users/Owner/Documents/top-gta-home-inspections/scripts/semrush-brand-${label}.png` });

  const text = await pg.evaluate(() => document.body.innerText.substring(0, 5000));
  console.log(text.substring(0, 2000));
  return text;
}

async function main() {
  const browser = await puppeteer.connect({ browserURL: 'http://localhost:9222' });
  const pages = await browser.pages();
  const pg = pages.find(p => p.url().includes('semrush')) || pages[0];
  pg.setDefaultTimeout(40000);

  const results = {};

  // 1. Brand Overview - asads.ca
  results.brandOverview = await scrapeSection(pg,
    'https://www.semrush.com/analytics/brandanalytics/overview/?query=asads.ca&searchType=domain',
    'brand-overview'
  );

  // 2. Brand Monitoring - mentions
  results.brandMonitoring = await scrapeSection(pg,
    'https://www.semrush.com/brand-monitoring/',
    'brand-monitoring'
  );

  // 3. Market Explorer - home inspection Ontario
  results.marketExplorer = await scrapeSection(pg,
    'https://www.semrush.com/trends/market-explorer/?category=home_inspection&country=ca',
    'market-explorer'
  );

  // 4. Competitor brand comparison - share of voice
  results.shareOfVoice = await scrapeSection(pg,
    'https://www.semrush.com/analytics/brandanalytics/overview/?query=home+inspection+ontario&searchType=query',
    'share-of-voice'
  );

  // 5. Try .Trends overview for competitors
  results.trends = await scrapeSection(pg,
    'https://www.semrush.com/trends/traffic-analytics/overview/?domains=asads.ca,mikeholmesinspections.com,inchbyinchinspections.com&country=ca',
    'traffic-trends'
  );

  fs.writeFileSync(
    'C:/Users/Owner/Documents/top-gta-home-inspections/scripts/semrush-brand-performance.json',
    JSON.stringify(results, null, 2)
  );

  console.log('\n✅ Done — results saved');
  browser.disconnect();
}
main().catch(e => console.error('Fatal:', e.message, e.stack));
