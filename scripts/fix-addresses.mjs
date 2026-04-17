import puppeteer from 'puppeteer';
const sleep = ms => new Promise(r => setTimeout(r, ms));

const browser = await puppeteer.connect({ browserURL: 'http://localhost:9222' });
const pages = await browser.pages();
const pg = pages.find(p => p.url().includes('nachi.org')) || pages[0];

const reports = [
  { id: '355122', address: '45 Duckworth Rd, Cambridge ON N3H 0C1', owner: 'Sarah Mitchell' },
  { id: '355127', address: '22 Brookfield Cres, Brampton ON L6Y 2K4', owner: 'James Kowalski' },
  { id: '355128', address: '74 Queenston Rd, Hamilton ON L8K 1G7', owner: 'Patricia Osei' },
  { id: '355129', address: '18 Dunbar Rd, Mississauga ON L5B 1L3', owner: 'David Nguyen' },
];

for (const r of reports) {
  console.log('Fixing', r.id, '-', r.address);
  await pg.goto('https://www.nachi.org/my/mock-inspections/' + r.id + '/edit');
  await sleep(1500);

  const inputs = await pg.$$('input[type=text]');
  if (inputs[0]) {
    await inputs[0].click({ clickCount: 3 });
    await sleep(150);
    await inputs[0].type(r.address, { delay: 25 });
    await sleep(300);
    console.log('  Address typed');
  }
  if (inputs[1]) {
    await inputs[1].click({ clickCount: 3 });
    await sleep(150);
    await inputs[1].type(r.owner, { delay: 25 });
    await sleep(300);
    console.log('  Owner typed');
  }

  // Click Continue to Roof to save
  await pg.evaluate(() => {
    const btn = Array.from(document.querySelectorAll('button')).find(b => b.innerText.includes('Continue'));
    if (btn) btn.click();
  });
  await sleep(2000);
  console.log('  Saved - now on:', await pg.evaluate(() => document.querySelector('h2')?.innerText?.split('\n')[0]?.trim()));
}

console.log('\nAll addresses saved! Now check mock-inspections list.');
browser.disconnect();
