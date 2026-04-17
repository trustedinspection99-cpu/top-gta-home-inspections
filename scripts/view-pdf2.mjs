import puppeteer from 'puppeteer';
const sleep = ms => new Promise(r => setTimeout(r, ms));
const browser = await puppeteer.connect({ browserURL: 'http://localhost:9222', protocolTimeout: 30000 });
const pages = await browser.pages();
let pg = pages[0];
// Use file:// URL with forward slashes
const fileUrl = 'file:///C:/Users/Owner/Downloads/7261%20Castlederg%20Side%20Rd%20%20(1)%20(1).pdf';
await pg.goto(fileUrl, { waitUntil: 'networkidle0', timeout: 15000 });
await sleep(5000);
await pg.screenshot({ path: 'scripts/sample-report-p1.png', fullPage: false });
console.log('done');
browser.disconnect();
