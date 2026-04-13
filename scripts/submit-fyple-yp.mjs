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

  // === FYPLE - Add company ===
  console.log('=== FYPLE - Add Company ===');
  const fyple = await browser.newPage();
  fyple.setDefaultTimeout(30000);

  await fyple.goto('https://www.fyple.ca/addcompany/addcompany/', { waitUntil: 'networkidle2', timeout: 30000 });
  await sleep(2000);

  const fypleState = await fyple.evaluate(() => ({
    url: window.location.href,
    text: document.body.innerText.substring(0, 500),
    inputs: Array.from(document.querySelectorAll('input, textarea, select')).map(i => ({
      tag: i.tagName, type: i.type, name: i.name, id: i.id, placeholder: i.placeholder
    }))
  }));
  console.log('Fyple URL:', fypleState.url);
  console.log('Text:', fypleState.text.substring(0, 300));
  console.log('Inputs:', JSON.stringify(fypleState.inputs.slice(0, 15)));
  await fyple.screenshot({ path: 'C:/Users/Owner/Documents/top-gta-home-inspections/scripts/fyple-addcompany.png' });
  await fyple.close();

  // === YP.CA - Free listing form ===
  console.log('\n=== YP.CA - Free Listing ===');
  const yp = await browser.newPage();
  yp.setDefaultTimeout(30000);

  await yp.goto('https://solutions.yp.ca/free-online-listing', { waitUntil: 'networkidle2', timeout: 30000 });
  await sleep(2000);

  // Fill form
  await setVal(yp, '#businessName', 'ASADS Home Inspection');
  await setVal(yp, '#telephone', '6478019311');
  await setVal(yp, '#email', 'info@asads.ca');
  await setVal(yp, '#first_name', 'Haroon');
  await setVal(yp, '#last_name', 'Shafique');
  console.log('Filled YP form');

  await sleep(500);
  await yp.screenshot({ path: 'C:/Users/Owner/Documents/top-gta-home-inspections/scripts/yp-filled.png' });

  // Check values
  const vals = await yp.evaluate(() => {
    return ['businessName','telephone','email','first_name','last_name'].map(id => ({
      id, val: document.getElementById(id)?.value
    }));
  });
  console.log('Form values:', JSON.stringify(vals));

  // Submit
  await yp.evaluate(() => {
    const btn = Array.from(document.querySelectorAll('button[type=submit], input[type=submit], button')).find(b =>
      (b.innerText || b.value || '').toLowerCase().match(/submit|request|send|get/));
    if (btn) { console.log('Clicking:', btn.innerText || btn.value); btn.click(); }
  });
  await sleep(5000);
  await yp.screenshot({ path: 'C:/Users/Owner/Documents/top-gta-home-inspections/scripts/yp-after-submit.png' });

  const ypResult = await yp.evaluate(() => ({ url: window.location.href, text: document.body.innerText.substring(0, 500) }));
  console.log('\nYP result URL:', ypResult.url);
  console.log('YP result text:', ypResult.text.substring(0, 400));

  await yp.close();
  browser.disconnect();
}
main().catch(e => console.error('Fatal:', e.message));
