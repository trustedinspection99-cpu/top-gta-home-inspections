import puppeteer from 'puppeteer';
const sleep = ms => new Promise(r => setTimeout(r, ms));

const browser = await puppeteer.connect({ browserURL: 'http://localhost:9222' });
const pages = await browser.pages();
const pg = pages.find(p => p.url().includes('nachi.org')) || pages[0];

// Capture all non-GET requests to see save API
const requests = [];
pg.on('request', req => {
  if (req.method() !== 'GET') {
    requests.push({ method: req.method(), url: req.url(), body: req.postData()?.substring(0, 300) });
  }
});
pg.on('response', async resp => {
  if (resp.request().method() !== 'GET') {
    try {
      const body = await resp.text();
      console.log('RESPONSE', resp.status(), resp.url(), body.substring(0, 200));
    } catch(e) {}
  }
});

await pg.goto('https://www.nachi.org/my/mock-inspections/355122/edit');
await sleep(1500);

// Type address
const inputs = await pg.$$('input[type=text]');
await inputs[0].click({ clickCount: 3 });
await inputs[0].type('45 Duckworth Rd Cambridge ON', { delay: 30 });
await sleep(300);
await inputs[1].click({ clickCount: 3 });
await inputs[1].type('Sarah Mitchell', { delay: 30 });
await sleep(500);

// Click Continue
await pg.evaluate(() => {
  const btn = Array.from(document.querySelectorAll('button')).find(b => b.innerText.includes('Continue'));
  if (btn) btn.click();
});
await sleep(3000);

console.log('\nAll captured requests:');
requests.forEach(r => console.log(r.method, r.url, '\nBody:', r.body, '\n'));

browser.disconnect();
