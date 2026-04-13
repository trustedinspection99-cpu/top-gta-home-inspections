import puppeteer from 'puppeteer';
const sleep = ms => new Promise(r => setTimeout(r, ms));

async function main() {
  const browser = await puppeteer.connect({ browserURL: 'http://localhost:9222' });
  const pg = await browser.newPage();
  pg.setDefaultTimeout(30000);

  // Go directly to ImprovMX signup/app
  console.log('Going to ImprovMX signup...');
  await pg.goto('https://app.improvmx.com/signup', { waitUntil: 'networkidle2', timeout: 30000 });
  await sleep(2000);
  await pg.screenshot({ path: 'C:/Users/Owner/Documents/top-gta-home-inspections/scripts/improvmx-signup.png' });

  const state = await pg.evaluate(() => ({
    url: window.location.href,
    text: document.body.innerText.substring(0, 500),
    inputs: Array.from(document.querySelectorAll('input')).map(i => ({
      type: i.type, name: i.name, id: i.id, placeholder: i.placeholder
    }))
  }));
  console.log('URL:', state.url);
  console.log('Text:', state.text.substring(0, 300));
  console.log('Inputs:', JSON.stringify(state.inputs));

  // Fill signup form — email + password
  const emailInput = await pg.$('input[type="email"], input[name*="email"], input[id*="email"]');
  const passInput = await pg.$('input[type="password"]');

  if (emailInput) {
    await emailInput.click();
    await emailInput.type('haroon4951@hotmail.com', { delay: 50 });
    console.log('Filled email');
  }
  if (passInput) {
    await passInput.click();
    await passInput.type('ASADS2026!', { delay: 50 });
    console.log('Filled password');
  }

  if (emailInput || passInput) {
    // Submit
    await pg.evaluate(() => {
      const btn = Array.from(document.querySelectorAll('button[type=submit], button'))
        .find(b => (b.innerText || '').toLowerCase().includes('sign') ||
                   (b.innerText || '').toLowerCase().includes('creat') ||
                   (b.innerText || '').toLowerCase().includes('register') ||
                   (b.innerText || '').toLowerCase().includes('get start'));
      if (btn) { console.log('Clicking:', btn.innerText); btn.click(); }
    });
    await sleep(4000);
    await pg.screenshot({ path: 'C:/Users/Owner/Documents/top-gta-home-inspections/scripts/improvmx-after-signup.png' });

    const after = await pg.evaluate(() => ({
      url: window.location.href,
      text: document.body.innerText.substring(0, 600)
    }));
    console.log('After signup URL:', after.url);
    console.log('After signup text:', after.text.substring(0, 400));

    if (!after.url.includes('signup')) {
      console.log('✅ Signed up! Now adding asads.ca domain...');

      // Navigate to add domain
      await pg.goto('https://app.improvmx.com/domains/add', { waitUntil: 'networkidle2', timeout: 25000 });
      await sleep(2000);
      const addState = await pg.evaluate(() => ({
        url: window.location.href,
        text: document.body.innerText.substring(0, 400),
        inputs: Array.from(document.querySelectorAll('input')).map(i => ({ type: i.type, name: i.name, id: i.id, placeholder: i.placeholder }))
      }));
      console.log('Add domain page:', addState.url);
      console.log('Inputs:', JSON.stringify(addState.inputs));
      await pg.screenshot({ path: 'C:/Users/Owner/Documents/top-gta-home-inspections/scripts/improvmx-add-domain.png' });
    }
  }

  await pg.close();
  browser.disconnect();
}
main().catch(e => console.error('Fatal:', e.message));
