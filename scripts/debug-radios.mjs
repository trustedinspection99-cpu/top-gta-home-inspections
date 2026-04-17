import puppeteer from 'puppeteer';
const browser = await puppeteer.connect({ browserURL: 'http://localhost:9222' });
const pages = await browser.pages();
const pg = pages.find(p => p.url().includes('nachi.org')) || pages[0];

// Get raw radio data
const radios = await pg.evaluate(() => {
  return Array.from(document.querySelectorAll('input[type=radio]')).slice(0, 20).map(r => {
    const l = document.querySelector('label[for="' + r.id + '"]') || r.closest('label') || r.parentElement;
    return {
      id: r.id,
      name: r.name,
      value: r.value,
      checked: r.checked,
      label: (l ? l.innerText : '').trim().substring(0, 30)
    };
  });
});

console.log(JSON.stringify(radios, null, 2));
browser.disconnect();
