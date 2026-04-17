import puppeteer from 'puppeteer';
const sleep = ms => new Promise(r => setTimeout(r, ms));

const browser = await puppeteer.connect({ browserURL: 'http://localhost:9222' });
const pages = await browser.pages();
const pg = pages.find(p => p.url().includes('nachi.org')) || pages[0];

const textInputs = await pg.$$('input[type=text]');
console.log('Found', textInputs.length, 'text inputs');

if (textInputs[0]) {
  await textInputs[0].click({ clickCount: 3 });
  await sleep(200);
  await textInputs[0].type('142 Maple Avenue, Toronto, ON M4C 2K8');
  await pg.keyboard.press('Tab');
  await sleep(2000);
  console.log('Address typed');
}

if (textInputs[1]) {
  await textInputs[1].click({ clickCount: 3 });
  await sleep(200);
  await textInputs[1].type('John Smith');
  await pg.keyboard.press('Tab');
  await sleep(2000);
  console.log('Owner typed');
}

await pg.screenshot({ path: 'scripts/details-filled.png', fullPage: false });
const h = await pg.evaluate(() => document.querySelector('h2')?.innerText || '');
console.log('Section:', h);
browser.disconnect();
