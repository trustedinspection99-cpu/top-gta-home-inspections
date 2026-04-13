import puppeteer from 'puppeteer';
import fs from 'fs';
const sleep = ms => new Promise(r => setTimeout(r, ms));

async function main() {
  const browser = await puppeteer.connect({ browserURL: 'http://localhost:9222' });
  const pg = await browser.newPage();
  pg.setDefaultTimeout(30000);

  // Search Reddit for top home inspection threads in Canada
  const queries = [
    'site:reddit.com "home inspection" canada ontario',
    'site:reddit.com "home inspection cost" ontario toronto',
    'site:reddit.com "skip home inspection" ontario waive',
    'site:reddit.com "home inspector" ontario recommend',
    'site:reddit.com "inspection condition" ontario offer',
  ];

  const results = [];

  for (const q of queries) {
    await pg.goto(`https://www.google.com/search?q=${encodeURIComponent(q)}&num=10`, {
      waitUntil: 'networkidle2', timeout: 25000
    });
    await sleep(2000);

    const links = await pg.evaluate(() => {
      return Array.from(document.querySelectorAll('a[href*="reddit.com"]'))
        .map(a => ({ href: a.href, text: (a.innerText || '').trim().substring(0, 120) }))
        .filter(l => l.href.includes('/r/') && l.href.includes('/comments/') && l.text.length > 10)
        .slice(0, 5);
    });

    console.log(`\nQuery: ${q}`);
    links.forEach(l => console.log(`  ${l.text}\n  ${l.href}`));
    results.push({ query: q, links });
  }

  // Also check which subreddits discuss Ontario home inspection most
  const subreddits = ['r/TorontoRealEstate', 'r/PersonalFinanceCanada', 'r/CanadaHousing', 'r/ontario', 'r/FirstTimeHomeBuyer'];
  console.log('\n\n═══ Top subreddits for home inspection ═══');
  for (const sub of subreddits) {
    await pg.goto(`https://www.google.com/search?q=site:reddit.com/${sub}+"home+inspection"&num=5`, {
      waitUntil: 'networkidle2', timeout: 25000
    });
    await sleep(1500);
    const count = await pg.evaluate(() => {
      const resultDiv = document.querySelector('#result-stats');
      return resultDiv ? resultDiv.innerText : 'unknown';
    });
    console.log(`${sub}: ${count}`);
  }

  fs.writeFileSync('C:/Users/Owner/Documents/top-gta-home-inspections/scripts/reddit-threads.json',
    JSON.stringify(results, null, 2));

  await pg.close();
  browser.disconnect();
}
main().catch(e => console.error('Fatal:', e.message, e.stack));
