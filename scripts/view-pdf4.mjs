import puppeteer from 'puppeteer';
const sleep = ms => new Promise(r => setTimeout(r, ms));
const browser = await puppeteer.connect({ browserURL: 'http://localhost:9222', protocolTimeout: 60000 });
const pages = await browser.pages();
let pg = pages[0];
for (let i = 1; i <= 4; i++) {
  await pg.evaluate((n) => window.scrollTo(0, (n-1) * 900), i);
  await sleep(2000);
  await pg.screenshot({ path: `scripts/report-pg${i}.png` });
  console.log('page', i, 'done');
}
browser.disconnect();
