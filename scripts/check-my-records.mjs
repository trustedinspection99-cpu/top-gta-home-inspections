import puppeteer from 'puppeteer';
const sleep = ms => new Promise(r => setTimeout(r, ms));
const browser = await puppeteer.connect({ browserURL: 'http://localhost:9222', protocolTimeout: 30000 });
const pages = await browser.pages();
const pg = pages.find(p => p.url().includes('nachi.org')) || pages[0];

await pg.goto('https://www.nachi.org/my/records');
await sleep(2000);
const t = await pg.evaluate(() => document.body.innerText);
console.log('Records page:');

// Find roof inspections related content
const idx = t.toLowerCase().indexOf('roof');
if (idx > -1) {
  console.log(t.substring(Math.max(0, idx-100), idx+500));
} else {
  console.log(t.substring(0, 2000));
}

// Try exam scores specifically
await pg.evaluate(() => {
  const link = Array.from(document.querySelectorAll('a')).find(a =>
    (a.innerText || '').toLowerCase().includes('exam scores'));
  if (link) link.click();
});
await sleep(1500);
const t2 = await pg.evaluate(() => document.body.innerText);
console.log('\nExam scores:');
const idx2 = t2.toLowerCase().indexOf('roof');
if (idx2 > -1) {
  console.log(t2.substring(Math.max(0, idx2-50), idx2+300));
} else {
  console.log(t2.substring(0, 1000));
}

browser.disconnect();
