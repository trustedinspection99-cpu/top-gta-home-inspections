import puppeteer from 'puppeteer';
const sleep = ms => new Promise(r => setTimeout(r, ms));
const browser = await puppeteer.connect({ browserURL: 'http://localhost:9222', protocolTimeout: 60000 });
const pages = await browser.pages();
let pg = pages.find(p => p.url().includes('nachi.org/my/exams') || p.url().includes('nachi.org'));
if (!pg) pg = pages[0];

const baseUrl = 'https://www.nachi.org/my/exams/how-to-perform-roof-inspections/ES1CK3-1KZ-53WO60';

// Check Q1 to see if answer is pre-stored
await pg.goto(baseUrl + '/1');
await sleep(1000);
const q1state = await pg.evaluate(() => {
  const checked = document.querySelector('input[type=radio]:checked');
  const lbl = checked ? (document.querySelector('label[for="' + checked.id + '"]') || checked.parentElement) : null;
  return checked ? (lbl?.innerText?.trim() || checked.value) : 'no answer selected';
});
console.log('Q1 stored answer:', q1state);

// Select Slope on Q100 and find Next/Finish button
await pg.goto(baseUrl + '/100');
await sleep(1000);

// Select Slope
const selected = await pg.evaluate(() => {
  const radios = Array.from(document.querySelectorAll('input[type=radio]'));
  const match = radios.find(r => {
    const lbl = document.querySelector('label[for="' + r.id + '"]') || r.parentElement;
    return (lbl?.innerText?.trim() || r.value).toLowerCase() === 'slope';
  });
  if (match) { match.click(); return 'selected slope'; }
  return 'no match';
});
console.log('Q100:', selected);
await sleep(800);

// Now look for any button that appeared
const btns = await pg.evaluate(() => {
  return Array.from(document.querySelectorAll('button, input[type=submit], a[class*="btn"], a[class*="button"]'))
    .map(b => ({ tag: b.tagName, text: (b.innerText || b.value || '').trim().substring(0, 60), cls: b.className }))
    .filter(b => b.text && b.text.length < 50);
});
console.log('Buttons after selection:', JSON.stringify(btns, null, 2));

// Take screenshot
await pg.screenshot({ path: 'scripts/exam-q100-after.png', fullPage: false });
console.log('Screenshot saved');

browser.disconnect();
