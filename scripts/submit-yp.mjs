import puppeteer from 'puppeteer';
const sleep = ms => new Promise(r => setTimeout(r, ms));

async function setVal(pg, selector, value) {
  await pg.evaluate((sel, val) => {
    const el = document.querySelector(sel);
    if (!el) return;
    const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
    setter.call(el, val);
    el.dispatchEvent(new Event('input', { bubbles: true }));
    el.dispatchEvent(new Event('change', { bubbles: true }));
  }, selector, value);
}

async function main() {
  const browser = await puppeteer.connect({ browserURL: 'http://localhost:9222' });
  const yp = await browser.newPage();
  yp.setDefaultTimeout(30000);

  await yp.goto('https://solutions.yp.ca/free-online-listing', { waitUntil: 'networkidle2', timeout: 30000 });
  await sleep(2000);

  // Inspect full form
  const formDetails = await yp.evaluate(() => ({
    inputs: Array.from(document.querySelectorAll('input, select, textarea, button')).map(el => ({
      tag: el.tagName, type: el.type, name: el.name, id: el.id,
      placeholder: el.placeholder, checked: el.checked, value: el.value?.substring(0, 50),
      text: el.innerText?.substring(0, 50)
    })),
    text: document.body.innerText.substring(0, 800)
  }));
  console.log('Full form elements:');
  formDetails.inputs.forEach(i => console.log(' ', JSON.stringify(i)));

  // Fill fields
  await setVal(yp, '#businessName', 'ASADS Home Inspection');
  await setVal(yp, '#telephone', '6478019311');
  await setVal(yp, '#email', 'info@asads.ca');
  await setVal(yp, '#first_name', 'Haroon');
  await setVal(yp, '#last_name', 'Shafique');

  // Check any checkboxes (terms/consent)
  await yp.evaluate(() => {
    document.querySelectorAll('input[type=checkbox]').forEach(cb => { cb.checked = true; cb.dispatchEvent(new Event('change', { bubbles: true })); });
  });

  await sleep(500);
  await yp.screenshot({ path: 'C:/Users/Owner/Documents/top-gta-home-inspections/scripts/yp-ready.png' });

  // Find and click submit
  const btnInfo = await yp.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button, input[type=submit]'));
    return btns.map(b => ({ tag: b.tagName, type: b.type, text: b.innerText?.substring(0,50), value: b.value, disabled: b.disabled }));
  });
  console.log('\nButtons:', JSON.stringify(btnInfo));

  // Click the submit/request button
  await yp.evaluate(() => {
    const btn = Array.from(document.querySelectorAll('button, input[type=submit]')).find(b =>
      !b.disabled && (b.innerText || b.value || '').toLowerCase().match(/submit|request|send|get|list/));
    if (btn) btn.click();
  });
  await sleep(6000);
  await yp.screenshot({ path: 'C:/Users/Owner/Documents/top-gta-home-inspections/scripts/yp-submitted.png' });

  const result = await yp.evaluate(() => ({ url: window.location.href, text: document.body.innerText.substring(0, 600) }));
  console.log('\nResult URL:', result.url);
  console.log('Result text:', result.text.substring(0, 500));

  await yp.close();
  browser.disconnect();
}
main().catch(e => console.error('Fatal:', e.message));
