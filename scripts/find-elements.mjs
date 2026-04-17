import puppeteer from 'puppeteer';
const sleep = ms => new Promise(r => setTimeout(r, ms));
const browser = await puppeteer.connect({ browserURL: 'http://localhost:9222', protocolTimeout: 30000 });
const pages = await browser.pages();
const pg = pages.find(p => p.url().includes('education.nachi.org')) || pages[0];

// Navigate from Roof Ventilation (163)
await pg.goto('https://education.nachi.org/show.php?course_id=2&element_id=163');
await sleep(1000);
const links163 = await pg.evaluate(() => {
  return Array.from(document.querySelectorAll('a[href*="element_id"]'))
    .filter(a => { const t = a.innerText || a.textContent || ''; return !t.trim(); })
    .map(a => a.href);
});
console.log('From 163 (Roof Ventilation), nav links:', links163);

// Navigate from Chimneys (124)
await pg.goto('https://education.nachi.org/show.php?course_id=2&element_id=124');
await sleep(1000);
const links124 = await pg.evaluate(() => {
  return Array.from(document.querySelectorAll('a[href*="element_id"]'))
    .filter(a => { const t = a.innerText || a.textContent || ''; return !t.trim(); })
    .map(a => a.href);
});
console.log('From 124 (Masonry Chimneys), nav links:', links124);
browser.disconnect();
