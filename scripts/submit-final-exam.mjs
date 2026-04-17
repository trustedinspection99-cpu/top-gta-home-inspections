import puppeteer from 'puppeteer';
const sleep = ms => new Promise(r => setTimeout(r, ms));
const browser = await puppeteer.connect({ browserURL: 'http://localhost:9222', protocolTimeout: 60000 });
const pages = await browser.pages();
let pg = pages.find(p => p.url().includes('nachi.org/my/exams'));
if (!pg) pg = pages[0];

const baseUrl = 'https://www.nachi.org/my/exams/how-to-perform-roof-inspections/ES1CK3-1KZ-53WO60';

// First select Slope on Q100 and save
await pg.goto(baseUrl + '/100');
await sleep(1000);

// Select Slope
await pg.evaluate(() => {
  const radios = Array.from(document.querySelectorAll('input[type=radio]'));
  const match = radios.find(r => {
    const lbl = document.querySelector('label[for="' + r.id + '"]') || r.parentElement;
    return (lbl?.innerText?.trim() || r.value).toLowerCase() === 'slope';
  });
  if (match) match.click();
});
await sleep(800);

// Check what buttons are available
const btns = await pg.evaluate(() => {
  return Array.from(document.querySelectorAll('button, input[type=submit], a')).map(b => ({
    text: (b.innerText || b.value || '').trim().substring(0, 60),
    href: b.href || null
  })).filter(b => b.text.length > 0 && b.text.length < 60);
});
console.log('Buttons on Q100 after selection:');
btns.forEach(b => console.log(' -', b.text, b.href ? '→ ' + b.href.substring(0,60) : ''));

// Click "Back to Review" or "Finish Exam" or similar
const finishBtn = await pg.evaluate(() => {
  const btn = Array.from(document.querySelectorAll('button, a')).find(b => {
    const t = (b.innerText || '').toLowerCase();
    return t.includes('review') || t.includes('finish') || t.includes('submit exam') || t.includes('back to review');
  });
  if (btn) { btn.click(); return btn.innerText?.trim(); }
  return null;
});
console.log('\nClicked:', finishBtn);
await sleep(2000);

const page = await pg.evaluate(() => ({
  url: location.href,
  text: document.body.innerText.substring(0, 800),
  btns: Array.from(document.querySelectorAll('button, a')).filter(b => {
    const t = (b.innerText || '').trim();
    return t.length > 0 && t.length < 50;
  }).map(b => b.innerText?.trim()).slice(0, 15)
}));
console.log('\nAfter click URL:', page.url);
console.log('Text:', page.text.substring(0, 400));
console.log('Buttons:', page.btns);

browser.disconnect();
