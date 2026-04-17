import puppeteer from 'puppeteer';
const sleep = ms => new Promise(r => setTimeout(r, ms));
const browser = await puppeteer.connect({ browserURL: 'http://localhost:9222', protocolTimeout: 30000 });
const pages = await browser.pages();
const pg = pages.find(p => p.url().includes('nachi.org')) || pages[0];

// Navigate to exam scores
await pg.goto('https://www.nachi.org/my/records/exam-scores');
await sleep(2000);
const t = await pg.evaluate(() => document.body.innerText);
console.log('Exam scores page:');
console.log(t.substring(0, 2000));

// Also try the specific exam page
await pg.goto('https://www.nachi.org/my/exams/how-to-perform-roof-inspections');
await sleep(2000);
const t2 = await pg.evaluate(() => document.body.innerText);
console.log('\nExam page:');
console.log(t2.substring(0, 1000));

browser.disconnect();
