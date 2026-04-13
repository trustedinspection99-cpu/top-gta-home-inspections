import puppeteer from 'puppeteer';
const sleep = ms => new Promise(r => setTimeout(r, ms));

async function main() {
  const browser = await puppeteer.connect({ browserURL: 'http://localhost:9222' });
  const pg = await browser.newPage();
  pg.setDefaultTimeout(30000);

  // Go directly to asads.ca domain aliases page
  await pg.goto('https://app.improvmx.com/domains/asads.ca/aliases', { waitUntil: 'networkidle2', timeout: 30000 });
  await sleep(2000);

  const state = await pg.evaluate(() => ({
    url: window.location.href,
    text: document.body.innerText.substring(0, 600),
    inputs: Array.from(document.querySelectorAll('input')).map(i => ({
      type: i.type, placeholder: i.placeholder, id: i.id, name: i.name,
      formId: i.form?.id || i.form?.action || ''
    }))
  }));
  console.log('URL:', state.url);
  console.log('Text:', state.text.substring(0, 400));
  console.log('Inputs:', JSON.stringify(state.inputs, null, 2));
  await pg.screenshot({ path: 'C:/Users/Owner/Documents/top-gta-home-inspections/scripts/improvmx-aliases-page.png' });

  // Find all forms on page
  const forms = await pg.evaluate(() => {
    return Array.from(document.querySelectorAll('form')).map(f => ({
      id: f.id,
      action: f.action,
      inputs: Array.from(f.querySelectorAll('input')).map(i => ({ type: i.type, placeholder: i.placeholder, name: i.name }))
    }));
  });
  console.log('\nForms:', JSON.stringify(forms, null, 2));

  // Try second alias input (index 1 = 0-based)
  const aliasInputs = await pg.$$('input[placeholder="new-alias"]');
  const forwardInputs = await pg.$$('input[placeholder="Email address, HTTP endpoint or a comma separated list of either."], input[placeholder*="Email"]');

  console.log('\nAlias inputs:', aliasInputs.length, 'Forward inputs:', forwardInputs.length);

  // Try each alias input with the forward input
  for (let i = 0; i < aliasInputs.length; i++) {
    // Clear and type
    await aliasInputs[i].click({ clickCount: 3 });
    await aliasInputs[i].type('info', { delay: 50 });
    console.log(`Set alias[${i}]: info`);

    if (forwardInputs[i]) {
      await forwardInputs[i].click({ clickCount: 3 });
      await forwardInputs[i].type('haroon4951@hotmail.com', { delay: 50 });
      console.log(`Set forward[${i}]: haroon4951@hotmail.com`);
    }

    await sleep(300);
    const vals = await pg.evaluate((idx) => {
      const a = document.querySelectorAll('input[placeholder="new-alias"]')[idx];
      return a ? a.value : 'N/A';
    }, i);
    console.log(`alias[${i}] value:`, vals);

    // Click submit button near this input
    const submitted = await pg.evaluate((idx) => {
      const submits = document.querySelectorAll('input[type="submit"][name="add"]');
      const btn = submits[idx] || submits[0];
      if (btn) { btn.click(); return 'clicked submit ' + idx; }
      return 'no submit';
    }, i);
    console.log(submitted);
    await sleep(3000);

    const after = await pg.evaluate(() => document.body.innerText.substring(0, 400));
    console.log('After submit:', after.substring(0, 300));

    if (after.includes('info') && (after.includes('haroon') || after.includes('@hotmail'))) {
      console.log('\n✅ Alias added!');
      break;
    }
    if (after.includes('required') || after.includes('error')) {
      console.log('Error on attempt', i, '- trying next...');
    }
  }

  await pg.screenshot({ path: 'C:/Users/Owner/Documents/top-gta-home-inspections/scripts/improvmx-final.png' });
  await pg.close();
  browser.disconnect();
}
main().catch(e => console.error('Fatal:', e.message));
