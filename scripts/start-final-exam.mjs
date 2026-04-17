import puppeteer from 'puppeteer';
const sleep = ms => new Promise(r => setTimeout(r, ms));
const browser = await puppeteer.connect({ browserURL: 'http://localhost:9222', protocolTimeout: 60000 });
const pages = await browser.pages();
// Find the exam page
let pg = pages.find(p => p.url().includes('nachi.org/my/exams') || p.url().includes('exams.nachi.org'));
if (!pg) pg = pages[pages.length - 1]; // Use last page (most recently opened)

console.log('Current URL:', pg.url());

const fullText = await pg.evaluate(() => document.body.innerText);
console.log(fullText.substring(0, 1500));

// Find start button
const btns = await pg.evaluate(() =>
  Array.from(document.querySelectorAll('a, button, input[type=submit]'))
    .filter(b => (b.innerText || b.value || '').trim().length > 0)
    .map(b => ({ tag: b.tagName, text: (b.innerText || b.value || '').trim().substring(0,50), href: b.href }))
    .filter(b => b.text.toLowerCase().includes('start') || b.text.toLowerCase().includes('begin') || b.text.toLowerCase().includes('exam'))
);
console.log('\nExam buttons:', JSON.stringify(btns, null, 2));
browser.disconnect();
