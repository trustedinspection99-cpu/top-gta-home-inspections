import puppeteer from 'puppeteer';
const sleep = ms => new Promise(r => setTimeout(r, ms));

const browser = await puppeteer.connect({ browserURL: 'http://localhost:9222' });
const pages = await browser.pages();
const pg = pages.find(p => p.url().includes('nachi.org')) || pages[0];

const reports = ['355122', '355127', '355128', '355129'];

async function clickContinue() {
  return await pg.evaluate(() => {
    const btn = Array.from(document.querySelectorAll('button')).find(b => b.innerText.includes('Continue'));
    if (btn) { btn.click(); return btn.innerText.trim(); }
    return null;
  });
}

async function getCurrentSection() {
  return await pg.evaluate(() => document.querySelector('h2')?.innerText?.split('\n')[0]?.trim() || '');
}

for (const id of reports) {
  console.log('\n=== Report', id, '===');
  await pg.goto('https://www.nachi.org/my/mock-inspections/' + id + '/edit');
  await sleep(1500);

  // Click Continue through all 10 sections
  for (let i = 0; i < 11; i++) {
    const section = await getCurrentSection();
    const btn = await clickContinue();
    if (!btn) { console.log('  No Continue button on:', section); break; }
    await sleep(1800);
    const next = await getCurrentSection();
    console.log('  Saved:', section, '->', next);
    if (next === section) { console.log('  Section did not change, stopping'); break; }
  }

  // Click Complete Report
  const completed = await pg.evaluate(() => {
    const btn = Array.from(document.querySelectorAll('button, a')).find(b => b.innerText.trim() === 'Complete Report');
    if (btn) { btn.click(); return true; }
    return false;
  });
  await sleep(2000);
  const result = await pg.evaluate(() => document.body.innerText.substring(0, 150));
  console.log('  Complete clicked:', completed, '|', result.includes('marked this report') ? 'SUCCESS!' : result.replace(/\n/g,' ').substring(0,80));
}

browser.disconnect();
