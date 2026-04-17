import puppeteer from 'puppeteer';
const sleep = ms => new Promise(r => setTimeout(r, ms));
const browser = await puppeteer.connect({ browserURL: 'http://localhost:9222', protocolTimeout: 60000 });
const pages = await browser.pages();
let pg = pages[0];
const url = 'file:///C:/Users/Owner/Downloads/7261%20Castlederg%20Side%20Rd%20%20(1)%20(1).pdf';
await pg.goto(url, { waitUntil: 'load', timeout: 20000 }).catch(()=>{});
await sleep(5000);
// Take full page screenshot at higher res
await pg.setViewport({ width: 1400, height: 900 });
await sleep(1000);
await pg.screenshot({ path: 'scripts/castlederg-full.png', clip: { x: 250, y: 60, width: 820, height: 820 } });
console.log('done');
browser.disconnect();
