import puppeteer from 'puppeteer';
const sleep = ms => new Promise(r => setTimeout(r, ms));

const browser = await puppeteer.connect({ browserURL: 'http://localhost:9222' });
const pages = await browser.pages();
const pg = pages.find(p => p.url().includes('nachi.org')) || pages[0];

const section = await pg.evaluate(() => {
  const h = document.querySelector('h2, h1');
  return h ? h.innerText : document.body.innerText.substring(0, 80);
});
console.log('Section:', section);

const count = await pg.evaluate(() => {
  const groups = {};
  for (const r of document.querySelectorAll('input[type=radio]')) {
    const name = r.name || r.id || Math.random();
    if (!groups[name]) groups[name] = [];
    groups[name].push(r);
  }
  let clicked = 0;
  for (const opts of Object.values(groups)) {
    const target = opts.find(o => {
      const l = document.querySelector('label[for="' + o.id + '"]') || o.parentElement;
      return (l ? l.innerText : o.value).toLowerCase().includes('no defect');
    }) || opts[0];
    if (target) { target.click(); clicked++; }
  }
  return clicked;
});

console.log('Clicked', count, 'items — you can now save and go to next section');
browser.disconnect();
