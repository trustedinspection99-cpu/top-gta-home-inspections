import puppeteer from 'puppeteer';
const sleep = ms => new Promise(r => setTimeout(r, ms));

async function main() {
  const browser = await puppeteer.connect({ browserURL: 'http://localhost:9222' });
  const yp = await browser.newPage();
  yp.setDefaultTimeout(30000);

  await yp.goto('https://solutions.yp.ca/free-online-listing', { waitUntil: 'networkidle2', timeout: 30000 });
  await sleep(2000);

  // Click and type into each field directly
  const fields = [
    { sel: '#businessName', val: 'ASADS Home Inspection' },
    { sel: '#telephone', val: '6478019311' },
    { sel: '#email', val: 'info@asads.ca' },
    { sel: '#first_name', val: 'Haroon' },
    { sel: '#last_name', val: 'Shafique' },
  ];

  for (const f of fields) {
    const el = await yp.$(f.sel);
    if (el) {
      await el.click({ clickCount: 3 });
      await el.type(f.val, { delay: 40 });
      console.log('Filled:', f.sel, '=', f.val);
    }
  }
  await sleep(500);

  // Verify values
  const vals = await yp.evaluate(() =>
    ['businessName','telephone','email','first_name','last_name'].map(id => ({
      id, val: document.getElementById(id)?.value
    }))
  );
  console.log('Values:', JSON.stringify(vals));

  // Click specific Submit button
  const submitBtn = await yp.$('#fol-form-submit');
  if (submitBtn) {
    await submitBtn.click();
    console.log('Clicked #fol-form-submit');
  }
  await sleep(6000);

  await yp.screenshot({ path: 'C:/Users/Owner/Documents/top-gta-home-inspections/scripts/yp-result.png' });
  const result = await yp.evaluate(() => ({ url: window.location.href, text: document.body.innerText.substring(0, 600) }));
  console.log('\nURL:', result.url);
  console.log('Text:', result.text.substring(0, 400));

  await yp.close();

  // === BestProsInTown ===
  console.log('\n=== BestProsInTown.com ===');
  const bpt = await browser.newPage();
  bpt.setDefaultTimeout(30000);

  await bpt.goto('https://www.bestprosinttown.com/addbusiness.php', { waitUntil: 'networkidle2', timeout: 30000 });
  await sleep(2000);

  const bptState = await bpt.evaluate(() => ({
    url: window.location.href,
    text: document.body.innerText.substring(0, 500),
    inputs: Array.from(document.querySelectorAll('input, textarea, select, button')).map(el => ({
      tag: el.tagName, type: el.type, name: el.name, id: el.id,
      placeholder: el.placeholder, value: el.value?.substring(0,30), text: el.innerText?.substring(0,30)
    }))
  }));
  console.log('BestPros URL:', bptState.url);
  console.log('Text:', bptState.text.substring(0, 300));
  console.log('Inputs:', JSON.stringify(bptState.inputs.slice(0, 20)));
  await bpt.screenshot({ path: 'C:/Users/Owner/Documents/top-gta-home-inspections/scripts/bestpros-form.png' });

  await bpt.close();
  browser.disconnect();
}
main().catch(e => console.error('Fatal:', e.message));
