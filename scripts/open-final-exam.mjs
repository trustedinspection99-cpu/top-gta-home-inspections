import puppeteer from 'puppeteer';
const sleep = ms => new Promise(r => setTimeout(r, ms));
const browser = await puppeteer.connect({ browserURL: 'http://localhost:9222', protocolTimeout: 60000 });
const pages = await browser.pages();
const pg = pages.find(p => p.url().includes('education.nachi.org')) || pages[0];

// Get the exam link href
const examLink = await pg.evaluate(() => {
  const link = Array.from(document.querySelectorAll('a')).find(a =>
    (a.innerText || '').toLowerCase().includes('take the final examination'));
  return link ? { href: link.href, text: link.innerText } : null;
});
console.log('Exam link:', examLink);

if (examLink) {
  // Open in new tab
  const newPage = await browser.newPage();
  await newPage.goto(examLink.href);
  await sleep(3000);

  const url = newPage.url();
  const text = await newPage.evaluate(() => document.body.innerText.substring(0,800));
  console.log('Exam URL:', url);
  console.log('Exam page:', text);
}

browser.disconnect();
