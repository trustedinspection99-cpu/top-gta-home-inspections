import puppeteer from 'puppeteer';
const sleep = ms => new Promise(r => setTimeout(r, ms));
const browser = await puppeteer.connect({ browserURL: 'http://localhost:9222', protocolTimeout: 30000 });
const pages = await browser.pages();
let pg = pages.find(p => p.url().includes('nachi.org')) || pages[0];
// Try clicking "Course Progress" link
await pg.goto('https://www.nachi.org/my/education');
await sleep(2000);
// Find the Course Progress link
const links = await pg.evaluate(() =>
  Array.from(document.querySelectorAll('a')).map(a => ({ text: a.innerText?.trim(), href: a.href })).filter(a => a.text && a.href.includes('nachi.org'))
);
const cpLink = links.find(l => l.text.toLowerCase().includes('course progress') || l.text.toLowerCase().includes('certification progress'));
console.log('Links found:', links.filter(l => l.text.length > 3 && l.text.length < 50).slice(0, 20));
console.log('CPI link:', cpLink);
browser.disconnect();
