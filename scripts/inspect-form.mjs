import puppeteer from 'puppeteer';
const browser = await puppeteer.connect({ browserURL: 'http://localhost:9222' });
const pages = await browser.pages();
const pg = pages.find(p => p.url().includes('nachi.org')) || pages[0];

// Scroll to top first
await pg.evaluate(() => window.scrollTo(0, 0));
await new Promise(r => setTimeout(r, 500));
await pg.screenshot({ path: 'scripts/form-top.png', fullPage: false });

// Get the full form HTML structure
const html = await pg.evaluate(() => {
  const form = document.querySelector('form, main, [role=main], #main-content') || document.body;
  return form.innerHTML.substring(0, 3000);
});
console.log(html.substring(0, 2000));
browser.disconnect();
