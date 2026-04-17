import puppeteer from 'puppeteer';
const sleep = ms => new Promise(r => setTimeout(r, ms));

const browser = await puppeteer.connect({ browserURL: 'http://localhost:9222' });
const pages = await browser.pages();
const pg = pages.find(p => p.url().includes('nachi.org')) || pages[0];
await sleep(400);

// Click unlicensed state radio
await pg.click('#confirm-unlicensed');
await sleep(400);

const checked = await pg.evaluate(() => {
  const r = document.getElementById('confirm-unlicensed');
  return r ? r.checked : false;
});
console.log('Unlicensed radio checked:', checked);

// Find the visible Continue button and click it
await pg.evaluate(() => {
  const btns = Array.from(document.querySelectorAll('button'));
  for (const btn of btns) {
    if (btn.innerText.trim() === 'Continue' && btn.type === 'button') {
      btn.click();
      break;
    }
  }
});
await sleep(2000);

const text = await pg.evaluate(() => document.body.innerText.substring(0, 600));
console.log('Page text:', text);
await pg.screenshot({ path: 'scripts/coe-step3.png' });

// Look for Continue to Course submit button
const submitBtn = await pg.evaluate(() => {
  const btns = Array.from(document.querySelectorAll('button[type=submit]'));
  const b = btns.find(b => b.innerText.includes('Continue to Course'));
  return b ? b.innerText.trim() : null;
});
console.log('Submit button:', submitBtn);

if (submitBtn) {
  await Promise.all([
    pg.waitForNavigation({ waitUntil: 'networkidle2', timeout: 30000 }),
    pg.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button[type=submit]'));
      const b = btns.find(b => b.innerText.includes('Continue to Course'));
      if (b) b.click();
    })
  ]);
  await sleep(2000);
  console.log('Final URL:', pg.url());
  const finalText = await pg.evaluate(() => document.body.innerText.substring(0, 1000));
  console.log(finalText);
  await pg.screenshot({ path: 'scripts/coe-course-started.png' });
}

browser.disconnect();
