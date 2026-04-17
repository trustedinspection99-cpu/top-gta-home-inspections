import puppeteer from 'puppeteer';
const sleep = ms => new Promise(r => setTimeout(r, ms));
const browser = await puppeteer.connect({ browserURL: 'http://localhost:9222', protocolTimeout: 30000 });
const pages = await browser.pages();
const pg = pages.find(p => p.url().includes('education.nachi.org')) || pages[0];

// Visit Manufactured Chimneys (126)
await pg.goto('https://education.nachi.org/show.php?course_id=2&element_id=126');
await sleep(1000);
const t126 = await pg.evaluate(() => document.body.innerText.substring(50,200));
console.log('126:', t126);

// Get next element from 126
const next126 = await pg.evaluate(() => {
  return Array.from(document.querySelectorAll('a[href*="element_id"]'))
    .filter(a => {
      const t = a.innerText || a.textContent || '';
      return t.trim() === '';
    })
    .map(a => a.href);
});
console.log('Next links from 126:', next126);
browser.disconnect();
