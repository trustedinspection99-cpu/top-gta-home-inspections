import puppeteer from 'puppeteer';
const sleep = ms => new Promise(r => setTimeout(r, ms));

async function main() {
  const browser = await puppeteer.connect({ browserURL: 'http://localhost:9222' });
  const pg = await browser.newPage();
  pg.setDefaultTimeout(30000);

  await pg.goto('https://app.improvmx.com/domains/asads.ca/aliases', { waitUntil: 'networkidle2', timeout: 30000 });
  await sleep(2000);

  // Get all inputs to figure out which is which
  const inputCount = await pg.evaluate(() =>
    Array.from(document.querySelectorAll('input')).map((i, idx) => ({
      idx, type: i.type, placeholder: i.placeholder, formAction: i.form?.action || ''
    }))
  );
  console.log('All inputs:', JSON.stringify(inputCount, null, 2));

  // The correct form has action = /domains/asads.ca/aliases
  // Inputs in that form: new-alias, Email (HTTP...), submit
  // Use the alias input that belongs to the correct form

  // Click on the second "new-alias" input (the one in the real form)
  const aliasInputs = await pg.$$('input[placeholder="new-alias"]');
  console.log('Alias input count:', aliasInputs.length);

  // Second one is the form one
  const correctAliasInput = aliasInputs[1];
  await correctAliasInput.click({ clickCount: 3 });
  await sleep(200);
  await correctAliasInput.type('info', { delay: 60 });
  console.log('Typed alias');
  await sleep(300);

  // Tab to next field (forward email)
  await pg.keyboard.press('Tab');
  await sleep(300);
  await pg.keyboard.type('haroon4951@hotmail.com', { delay: 60 });
  console.log('Typed forward email');
  await sleep(300);

  // Check values
  const vals = await pg.evaluate(() => {
    const inputs = Array.from(document.querySelectorAll('input'));
    return inputs.map(i => ({ placeholder: i.placeholder.substring(0, 40), value: i.value }))
      .filter(i => i.value);
  });
  console.log('Values with content:', JSON.stringify(vals));

  await pg.screenshot({ path: 'C:/Users/Owner/Documents/top-gta-home-inspections/scripts/improvmx-before-enter.png' });

  // Press Enter to submit
  await pg.keyboard.press('Enter');
  await sleep(4000);

  await pg.screenshot({ path: 'C:/Users/Owner/Documents/top-gta-home-inspections/scripts/improvmx-after-enter.png' });
  const result = await pg.evaluate(() => document.body.innerText.substring(0, 800));
  console.log('\nResult:', result.substring(0, 500));

  if (result.includes('info') && result.includes('haroon')) {
    console.log('\n✅ Alias added: info@asads.ca → haroon4951@hotmail.com');
  } else if (result.includes('required') || result.includes('error') || result.includes('invalid')) {
    console.log('\n❌ Still failing - need different approach');
  }

  await pg.close();
  browser.disconnect();
}
main().catch(e => console.error('Fatal:', e.message));
