import puppeteer from 'puppeteer';
const sleep = ms => new Promise(r => setTimeout(r, ms));

const browser = await puppeteer.connect({ browserURL: 'http://localhost:9222' });
const pages = await browser.pages();
const pg = pages.find(p => p.url().includes('nachi.org')) || pages[0];

const section = await pg.evaluate(() => {
  const h = document.querySelector('h2');
  return h ? h.innerText.trim() : '';
});
console.log('Section:', section);

// Each item is in a div.rounded.border container
// Click "No Defect(s) Observed" (first label in the left/inspected side) for each unfilled item
const result = await pg.evaluate(() => {
  const items = Array.from(document.querySelectorAll('div.rounded.border'));
  let clicked = 0;
  let skipped = 0;
  const log = [];

  for (const item of items) {
    // Check if any radio already checked in this item
    const radios = Array.from(item.querySelectorAll('input[type=radio]'));
    const anyChecked = radios.some(r => r.checked);

    if (anyChecked) {
      skipped++;
      continue;
    }

    // Find the "No Defect(s) Observed" label (first in Inspected column)
    const labels = Array.from(item.querySelectorAll('label'));
    const noDefect = labels.find(l => l.innerText.toLowerCase().includes('no defect'));
    if (noDefect) {
      noDefect.click();
      log.push('Clicked No Defect in: ' + (item.querySelector('span, strong, h3, h4')?.innerText || 'item').substring(0, 40));
      clicked++;
    }
  }

  return { clicked, skipped, total: items.length, log };
});

console.log(`Total items: ${result.total} | Filled: ${result.clicked} | Already set: ${result.skipped}`);
result.log.forEach(l => console.log(' ', l));

await pg.screenshot({ path: 'scripts/nodefect-result.png', fullPage: false });
browser.disconnect();
