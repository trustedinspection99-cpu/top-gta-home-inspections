import puppeteer from 'puppeteer';
const sleep = ms => new Promise(r => setTimeout(r, ms));
const browser = await puppeteer.connect({ browserURL: 'http://localhost:9222', protocolTimeout: 30000 });
const pages = await browser.pages();
let pg = pages[0];
await pg.goto('http://education.nachi.org/show.php?course_id=13');
await sleep(2000);
// Click Continue
await pg.evaluate(() => {
  const btn = Array.from(document.querySelectorAll('a, button')).find(b => b.innerText?.trim().toLowerCase() === 'continue');
  if (btn) btn.click();
});
await sleep(3000);
const url = pg.url();
const t = await pg.evaluate(() => document.body.innerText);
console.log('URL:', url);
console.log(t.substring(0, 6000));
await pg.screenshot({ path: 'scripts/electrical-start.png', fullPage: false });
browser.disconnect();
