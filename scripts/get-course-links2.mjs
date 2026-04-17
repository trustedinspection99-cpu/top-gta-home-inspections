import puppeteer from 'puppeteer';
const sleep = ms => new Promise(r => setTimeout(r, ms));
const browser = await puppeteer.connect({ browserURL: 'http://localhost:9222', protocolTimeout: 30000 });
const pages = await browser.pages();
let pg = pages.find(p => p.url().includes('nachi.org')) || pages[0];
await pg.goto('https://www.nachi.org/my/certification/cpi');
await sleep(3000);
const links = await pg.evaluate(() =>
  Array.from(document.querySelectorAll('a')).map(a => ({ text: a.innerText?.trim().substring(0,80), href: a.href }))
  .filter(a => a.text && a.text.length > 3)
);
console.log('All links:');
links.forEach(l => console.log(`"${l.text}" -> ${l.href}`));
browser.disconnect();
