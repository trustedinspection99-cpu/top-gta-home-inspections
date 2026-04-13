import puppeteer from 'puppeteer';
import fs from 'fs';
const sleep = ms => new Promise(r => setTimeout(r, ms));

async function checkSite(pg, url, label) {
  console.log(`\n━━━ ${label} ━━━`);
  await pg.goto(url, { waitUntil: 'networkidle2', timeout: 35000 });
  await sleep(3000);
  await pg.screenshot({ path: `C:/Users/Owner/Documents/top-gta-home-inspections/scripts/dir-${label}.png` });
  const text = await pg.evaluate(() => document.body.innerText.substring(0, 4000));
  console.log(text);

  // Find registration/join/add listing links
  const links = await pg.evaluate(() => {
    return Array.from(document.querySelectorAll('a'))
      .map(a => ({ text: a.innerText?.trim().substring(0,60), href: a.href }))
      .filter(a => a.text && (
        a.text.toLowerCase().includes('join') ||
        a.text.toLowerCase().includes('register') ||
        a.text.toLowerCase().includes('add') ||
        a.text.toLowerCase().includes('list') ||
        a.text.toLowerCase().includes('sign up') ||
        a.text.toLowerCase().includes('member') ||
        a.text.toLowerCase().includes('inspector')
      ));
  });
  console.log('Relevant links:', JSON.stringify(links.slice(0, 15), null, 2));
  return { text, links };
}

async function main() {
  const browser = await puppeteer.connect({ browserURL: 'http://localhost:9222' });
  const pages = await browser.pages();
  const pg = pages[0];
  pg.setDefaultTimeout(35000);

  const results = {};
  results.findahomeinspector = await checkSite(pg, 'https://findahomeinspector.ca', 'findahomeinspector');
  results.nachi = await checkSite(pg, 'https://www.nachi.org/find-a-home-inspector.htm', 'nachi-find');
  results.nachiJoin = await checkSite(pg, 'https://www.nachi.org/join.htm', 'nachi-join');
  results.safeair = await checkSite(pg, 'https://safeair.ca', 'safeair');

  fs.writeFileSync('C:/Users/Owner/Documents/top-gta-home-inspections/scripts/directory-check.json', JSON.stringify(results, null, 2));
  console.log('\n✅ Saved to directory-check.json');
  browser.disconnect();
}
main().catch(e => console.error('Fatal:', e.message, e.stack));
