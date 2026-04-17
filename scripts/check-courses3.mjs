import puppeteer from 'puppeteer';
const sleep = ms => new Promise(r => setTimeout(r, ms));
const browser = await puppeteer.connect({ browserURL: 'http://localhost:9222', protocolTimeout: 30000 });
const pages = await browser.pages();
let pg = pages.find(p => p.url().includes('nachi.org')) || pages[0];
console.log('Current pages:');
for (const p of pages) console.log(' ', p.url());
// Go to education dashboard
await pg.goto('https://education.nachi.org');
await sleep(3000);
const t = await pg.evaluate(() => document.body.innerText);
console.log(t.substring(0, 4000));
await pg.screenshot({ path: 'scripts/edu-home.png', fullPage: false });
browser.disconnect();
