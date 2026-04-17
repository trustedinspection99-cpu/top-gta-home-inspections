import puppeteer from 'puppeteer';
const browser = await puppeteer.connect({ browserURL: 'http://localhost:9222' });
const pages = await browser.pages();
const pg = pages.find(p => p.url().includes('nachi.org')) || pages[0];

// Get parent structure of first radio
const html = await pg.evaluate(() => {
  const firstRadio = document.querySelector('input[type=radio]');
  if (!firstRadio) return 'no radios found';
  // Walk up 5 levels
  let el = firstRadio;
  let result = '';
  for (let i = 0; i < 8; i++) {
    const classes = el.className ? ' class="' + el.className.substring(0, 50) + '"' : '';
    const id = el.id ? ' id="' + el.id + '"' : '';
    result = '<' + el.tagName + id + classes + '>\n' + result;
    if (!el.parentElement) break;
    el = el.parentElement;
  }
  return result;
});

console.log(html);

// Also check if there are any data attributes on container elements
const containers = await pg.evaluate(() => {
  return Array.from(document.querySelectorAll('[data-v-], [data-item], [data-id], .inspection-item, .sop-item')).slice(0, 5).map(el => ({
    tag: el.tagName,
    class: el.className.substring(0, 60),
    dataAttrs: Object.keys(el.dataset).join(', ')
  }));
});
console.log('\nContainers:', JSON.stringify(containers, null, 2));

browser.disconnect();
