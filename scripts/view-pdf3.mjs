import puppeteer from 'puppeteer';
const sleep = ms => new Promise(r => setTimeout(r, ms));
const browser = await puppeteer.connect({ browserURL: 'http://localhost:9222', protocolTimeout: 30000 });
const pages = await browser.pages();
let pg = pages[0];
// Scroll down to see more pages
await pg.evaluate(() => window.scrollBy(0, 600));
await sleep(1000);
await pg.screenshot({ path: 'scripts/report-p2.png', fullPage: false });
await pg.evaluate(() => window.scrollBy(0, 600));
await sleep(1000);
await pg.screenshot({ path: 'scripts/report-p3.png', fullPage: false });
await pg.evaluate(() => window.scrollBy(0, 600));
await sleep(1000);
await pg.screenshot({ path: 'scripts/report-p4.png', fullPage: false });
await pg.evaluate(() => window.scrollBy(0, 600));
await sleep(1000);
await pg.screenshot({ path: 'scripts/report-p5.png', fullPage: false });
browser.disconnect();
