import puppeteer from 'puppeteer';
const sleep = ms => new Promise(r => setTimeout(r, ms));

const browser = await puppeteer.connect({ browserURL: 'http://localhost:9222' });
const pages = await browser.pages();
const pg = pages.find(p => p.url().includes('nachi.org')) || pages[0];
pg.setDefaultTimeout(30000);

await pg.goto('https://www.nachi.org/my/exams/internachi-home-inspection-standards-of-practice/start', { waitUntil: 'networkidle2' });
await sleep(2000);

// Use puppeteer's built-in click
try {
  await pg.click('button::-p-text(Start the Exam)');
  console.log('Clicked via selector');
} catch(e) {
  console.log('Selector click failed:', e.message);
  // Try finding by text
  const buttons = await pg.$$('button');
  for (const btn of buttons) {
    const text = await btn.evaluate(el => el.innerText.trim());
    console.log('Button:', text);
    if (text === 'Start the Exam') {
      await btn.click();
      console.log('Clicked!');
      break;
    }
  }
}

await sleep(5000);
console.log('URL:', pg.url());
console.log('Text:', await pg.evaluate(() => document.body.innerText.substring(0, 400)));
browser.disconnect();
