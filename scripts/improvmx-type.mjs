import puppeteer from 'puppeteer';
const sleep = ms => new Promise(r => setTimeout(r, ms));

async function main() {
  const browser = await puppeteer.connect({ browserURL: 'http://localhost:9222' });
  const pg = await browser.newPage();
  pg.setDefaultTimeout(30000);

  await pg.goto('https://app.improvmx.com/', { waitUntil: 'networkidle2', timeout: 30000 });
  await sleep(2000);

  // Click the first "new-alias" input and type
  const aliasInputs = await pg.$$('input[placeholder="new-alias"]');
  const forwardInputs = await pg.$$('input[placeholder="Email address, HTTP endpoint or a comma separated list of either."]');

  console.log('Alias inputs found:', aliasInputs.length);
  console.log('Forward inputs found:', forwardInputs.length);

  if (aliasInputs.length > 0) {
    await aliasInputs[0].click({ clickCount: 3 });
    await aliasInputs[0].type('info', { delay: 50 });
    console.log('Typed alias: info');
  }

  if (forwardInputs.length > 0) {
    await forwardInputs[0].click({ clickCount: 3 });
    await forwardInputs[0].type('haroon4951@hotmail.com', { delay: 50 });
    console.log('Typed forward: haroon4951@hotmail.com');
  }

  await sleep(500);
  await pg.screenshot({ path: 'C:/Users/Owner/Documents/top-gta-home-inspections/scripts/improvmx-typed.png' });

  // Check values
  const vals = await pg.evaluate(() => {
    const a = document.querySelectorAll('input[placeholder="new-alias"]')[0];
    const f = document.querySelectorAll('input[placeholder="Email address, HTTP endpoint or a comma separated list of either."]')[0];
    return { alias: a ? a.value : 'N/A', forward: f ? f.value : 'N/A' };
  });
  console.log('Values:', vals);

  // Click submit
  const submitBtn = await pg.$('input[type="submit"][name="add"]');
  if (submitBtn) {
    await submitBtn.click();
    console.log('Clicked submit');
  }
  await sleep(3000);

  await pg.screenshot({ path: 'C:/Users/Owner/Documents/top-gta-home-inspections/scripts/improvmx-submitted.png' });
  const result = await pg.evaluate(() => document.body.innerText.substring(0, 600));
  console.log('Result:', result.substring(0, 400));

  // Check if alias shows up
  if (result.includes('info') && result.includes('haroon')) {
    console.log('\n✅ Alias added successfully!');
  } else if (result.includes('required') || result.includes('error')) {
    console.log('\n❌ Error:', result.match(/required|error|invalid/i)?.[0]);
  }

  await pg.close();
  browser.disconnect();
}
main().catch(e => console.error('Fatal:', e.message));
