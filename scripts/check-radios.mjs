import puppeteer from 'puppeteer';
const browser = await puppeteer.connect({ browserURL: 'http://localhost:9222' });
const pages = await browser.pages();
const pg = pages.find(p => p.url().includes('nachi.org')) || pages[0];

const state = await pg.evaluate(() => {
  const groups = {};
  for (const r of document.querySelectorAll('input[type=radio]')) {
    const name = r.name || r.id || 'unknown';
    if (!groups[name]) groups[name] = [];
    const l = document.querySelector('label[for="' + r.id + '"]') || r.parentElement;
    groups[name].push({ text: (l ? l.innerText : r.value).trim().substring(0, 30), checked: r.checked });
  }
  const result = [];
  for (const [name, opts] of Object.entries(groups)) {
    const checked = opts.find(o => o.checked);
    result.push({ checked: checked ? checked.text : 'NONE SELECTED' });
  }
  return result;
});

console.log('Total groups:', state.length);
state.forEach((s, i) => console.log(`[${i}] ${s.checked}`));
browser.disconnect();
