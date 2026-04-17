import puppeteer from 'puppeteer';
const sleep = ms => new Promise(r => setTimeout(r, ms));

const browser = await puppeteer.connect({ browserURL: 'http://localhost:9222' });
const pages = await browser.pages();
const pg = pages.find(p => p.url().includes('nachi.org')) || pages[0];

// Scroll through entire page and click all unselected No Defect radios
const result = await pg.evaluate(() => {
  let clicked = 0;
  // Find all radio buttons on page
  const allRadios = Array.from(document.querySelectorAll('input[type=radio]'));

  // Group by name
  const groups = {};
  for (const r of allRadios) {
    const key = r.name || r.closest('[data-item]')?.dataset.item || r.id || 'g' + Math.random();
    if (!groups[key]) groups[key] = [];
    groups[key].push(r);
  }

  const log = [];
  for (const [key, opts] of Object.entries(groups)) {
    // Only click if none selected in this group
    const anyChecked = opts.some(o => o.checked);
    if (!anyChecked) {
      const target = opts.find(o => {
        const l = document.querySelector('label[for="' + o.id + '"]') || o.closest('label') || o.parentElement;
        return (l ? l.innerText : o.value).toLowerCase().includes('no defect');
      }) || opts[0];
      if (target) {
        target.click();
        const l = document.querySelector('label[for="' + target.id + '"]') || target.closest('label') || target.parentElement;
        log.push('Clicked: ' + (l ? l.innerText : target.value).trim().substring(0, 30));
        clicked++;
      }
    } else {
      log.push('Already set: ' + (opts.find(o => o.checked) ? opts.find(o => o.checked).value : '?'));
    }
  }
  return { clicked, log };
});

console.log('Clicked', result.clicked, 'unselected items');
result.log.forEach(l => console.log(' ', l));

await pg.screenshot({ path: 'scripts/fill-remaining.png', fullPage: false });
browser.disconnect();
