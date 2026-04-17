import puppeteer from 'puppeteer';
const sleep = ms => new Promise(r => setTimeout(r, ms));
const browser = await puppeteer.connect({ browserURL: 'http://localhost:9222', protocolTimeout: 30000 });
const pages = await browser.pages();
let pg = pages.find(p => p.url().includes('nachi.org')) || pages[0];
// Go to CPI requirements page
await pg.goto('https://www.nachi.org/become-certified-professional-inspector.htm');
await sleep(3000);
const t = await pg.evaluate(() => document.body.innerText);
console.log(t.substring(0, 6000));
browser.disconnect();
