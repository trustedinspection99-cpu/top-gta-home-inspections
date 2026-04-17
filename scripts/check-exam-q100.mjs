import puppeteer from 'puppeteer';
const sleep = ms => new Promise(r => setTimeout(r, ms));
const browser = await puppeteer.connect({ browserURL: 'http://localhost:9222', protocolTimeout: 30000 });
const pages = await browser.pages();
let pg = pages.find(p => p.url().includes('nachi.org/my/exams'));
if (!pg) pg = pages[0];

// Navigate to the exam and check Q100
const examUrl = 'https://www.nachi.org/my/exams/how-to-perform-roof-inspections/ES1CK3-1KZ-53WO60/100';
await pg.goto(examUrl);
await sleep(2000);

const t = await pg.evaluate(() => {
  const body = document.body.innerText;
  const btns = Array.from(document.querySelectorAll('button, input[type=submit], a')).map(b => ({
    tag: b.tagName,
    text: (b.innerText || b.value || '').trim().substring(0, 60)
  })).filter(b => b.text);
  return { body: body.substring(0, 800), btns };
});
console.log('Q100 page:');
console.log(t.body);
console.log('\nButtons:', JSON.stringify(t.btns.slice(0, 10), null, 2));
browser.disconnect();
