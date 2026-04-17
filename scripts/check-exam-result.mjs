import puppeteer from 'puppeteer';
const sleep = ms => new Promise(r => setTimeout(r, ms));
const browser = await puppeteer.connect({ browserURL: 'http://localhost:9222', protocolTimeout: 30000 });
const pages = await browser.pages();

console.log('All pages:');
for (const p of pages) {
  const url = p.url();
  console.log(' -', url.substring(0, 100));
}

// Find exam page
const examPage = pages.find(p => p.url().includes('nachi.org/my/exams')) || pages[pages.length - 1];
const url = examPage.url();
const t = await examPage.evaluate(() => document.body.innerText.substring(0, 1500));
console.log('\nExam page URL:', url);
console.log(t);
browser.disconnect();
