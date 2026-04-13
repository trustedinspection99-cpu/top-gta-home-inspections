import puppeteer from 'puppeteer';
const sleep = ms => new Promise(r => setTimeout(r, ms));

async function main() {
  const browser = await puppeteer.connect({ browserURL: 'http://localhost:9222' });
  const pg = await browser.newPage();
  pg.setDefaultTimeout(30000);

  await pg.goto('https://app.improvmx.com/domains/asads.ca/aliases', { waitUntil: 'networkidle2', timeout: 30000 });
  await sleep(2000);

  // Fill the form-associated inputs (idx 3 = alias, idx 4 = forward, idx 5 = submit)
  const inputs = await pg.$$('input');
  console.log('Total inputs:', inputs.length);

  // Fill alias (index 3 in full list)
  await inputs[3].click({ clickCount: 3 });
  await inputs[3].type('info', { delay: 60 });
  console.log('Typed alias: info');

  // Fill forward email (index 4)
  await inputs[4].click({ clickCount: 3 });
  await inputs[4].type('haroon4951@hotmail.com', { delay: 60 });
  console.log('Typed forward: haroon4951@hotmail.com');

  await sleep(300);

  // Verify values
  const vals = await pg.evaluate(() => {
    const ins = Array.from(document.querySelectorAll('input'));
    return ins.map((i, idx) => ({ idx, val: i.value, placeholder: i.placeholder.substring(0,30) })).filter(i => i.val);
  });
  console.log('Values:', JSON.stringify(vals));

  // Click submit button (index 5)
  await inputs[5].click();
  console.log('Clicked submit (idx 5)');
  await sleep(4000);

  await pg.screenshot({ path: 'C:/Users/Owner/Documents/top-gta-home-inspections/scripts/improvmx-result.png' });
  const result = await pg.evaluate(() => document.body.innerText.substring(0, 800));
  console.log('\nResult:', result.substring(0, 500));

  if (result.toLowerCase().includes('info') && result.toLowerCase().includes('haroon')) {
    console.log('\n✅ Alias added successfully!');
  }

  await pg.close();
  browser.disconnect();
}
main().catch(e => console.error('Fatal:', e.message));
