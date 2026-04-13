import puppeteer from 'puppeteer';
const sleep = ms => new Promise(r => setTimeout(r, ms));

async function main() {
  const browser = await puppeteer.connect({ browserURL: 'http://localhost:9222' });
  const pg = await browser.newPage();
  pg.setDefaultTimeout(30000);

  await pg.goto('https://app.improvmx.com/', { waitUntil: 'networkidle2', timeout: 30000 });
  await sleep(2000);

  // Find the first "new-alias" input (for asads.ca row) and fill it
  const filled = await pg.evaluate(() => {
    const aliasInputs = Array.from(document.querySelectorAll('input[placeholder="new-alias"]'));
    const forwardInputs = Array.from(document.querySelectorAll('input[placeholder="Email address, HTTP endpoint or a comma separated list of either."]'));

    if (aliasInputs.length === 0 || forwardInputs.length === 0) {
      return 'inputs not found. alias:' + aliasInputs.length + ' forward:' + forwardInputs.length;
    }

    // Use the first pair (asads.ca row)
    const aliasIn = aliasInputs[0];
    const forwardIn = forwardInputs[0];

    // Fill via native input setter
    const nativeInputSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
    nativeInputSetter.call(aliasIn, 'info');
    aliasIn.dispatchEvent(new Event('input', { bubbles: true }));
    aliasIn.dispatchEvent(new Event('change', { bubbles: true }));

    nativeInputSetter.call(forwardIn, 'haroon4951@hotmail.com');
    forwardIn.dispatchEvent(new Event('input', { bubbles: true }));
    forwardIn.dispatchEvent(new Event('change', { bubbles: true }));

    return 'filled: alias=' + aliasIn.value + ' forward=' + forwardIn.value;
  });
  console.log('Fill result:', filled);
  await sleep(500);

  await pg.screenshot({ path: 'C:/Users/Owner/Documents/top-gta-home-inspections/scripts/improvmx-before-submit.png' });

  // Click the submit button
  const submitted = await pg.evaluate(() => {
    const submitBtn = document.querySelector('input[type="submit"][name="add"]');
    if (submitBtn) {
      submitBtn.click();
      return 'submitted';
    }
    // Try button near the alias form
    const btns = Array.from(document.querySelectorAll('button'));
    const addBtn = btns.find(b => (b.innerText || '').match(/add|save/i));
    if (addBtn) { addBtn.click(); return 'clicked: ' + addBtn.innerText; }
    return 'no submit found';
  });
  console.log('Submit result:', submitted);
  await sleep(3000);

  await pg.screenshot({ path: 'C:/Users/Owner/Documents/top-gta-home-inspections/scripts/improvmx-after-submit.png' });

  const final = await pg.evaluate(() => ({
    url: window.location.href,
    text: document.body.innerText.substring(0, 800)
  }));
  console.log('Final URL:', final.url);
  console.log('Final text:', final.text.substring(0, 500));

  await pg.close();
  browser.disconnect();
}
main().catch(e => console.error('Fatal:', e.message));
