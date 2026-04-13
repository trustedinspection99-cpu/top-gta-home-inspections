import puppeteer from 'puppeteer';
const sleep = ms => new Promise(r => setTimeout(r, ms));

async function main() {
  const browser = await puppeteer.connect({ browserURL: 'http://localhost:9222' });
  const pg = await browser.newPage();
  pg.setDefaultTimeout(30000);

  // Log into ImprovMX
  console.log('Logging into ImprovMX...');
  await pg.goto('https://app.improvmx.com/login', { waitUntil: 'networkidle2', timeout: 30000 });
  await sleep(2000);

  const loginState = await pg.evaluate(() => ({
    url: window.location.href,
    inputs: Array.from(document.querySelectorAll('input')).map(i => ({ type: i.type, id: i.id, placeholder: i.placeholder }))
  }));
  console.log('Login URL:', loginState.url);
  console.log('Inputs:', JSON.stringify(loginState.inputs));

  // Fill login
  const emailIn = await pg.$('#login__email, input[type="email"], input[type="text"]');
  const passIn = await pg.$('#login__password, input[type="password"]');

  if (emailIn) { await emailIn.click(); await emailIn.type('haroon4951@hotmail.com', { delay: 40 }); }
  if (passIn) { await passIn.click(); await passIn.type('ASADS2026!', { delay: 40 }); }

  await pg.evaluate(() => {
    const btn = Array.from(document.querySelectorAll('button')).find(b =>
      (b.innerText || '').toLowerCase().includes('log') || (b.innerText || '').toLowerCase().includes('sign'));
    if (btn) btn.click();
  });
  await sleep(4000);

  const afterLogin = await pg.evaluate(() => ({ url: window.location.href, text: document.body.innerText.substring(0, 300) }));
  console.log('After login URL:', afterLogin.url);
  console.log('Text:', afterLogin.text.substring(0, 200));

  if (afterLogin.url.includes('login')) {
    console.log('❌ Login failed');
    await pg.close();
    browser.disconnect();
    return;
  }

  console.log('✅ Logged in!');

  // Add asads.ca domain
  console.log('\nAdding asads.ca domain...');
  await pg.goto('https://app.improvmx.com/domains', { waitUntil: 'networkidle2', timeout: 25000 });
  await sleep(2000);

  const domainPage = await pg.evaluate(() => ({ url: window.location.href, text: document.body.innerText.substring(0, 400) }));
  console.log('Domains page:', domainPage.text.substring(0, 300));

  // Look for "Add domain" button
  await pg.evaluate(() => {
    const btn = Array.from(document.querySelectorAll('button, a')).find(b =>
      (b.innerText || '').toLowerCase().includes('add') ||
      (b.innerText || '').toLowerCase().includes('new domain') ||
      (b.innerText || '').toLowerCase().includes('create'));
    if (btn) { console.log('Clicking add:', btn.innerText); btn.click(); }
  });
  await sleep(2000);
  await pg.screenshot({ path: 'C:/Users/Owner/Documents/top-gta-home-inspections/scripts/improvmx-domains.png' });

  // Fill domain name
  const domainInput = await pg.$('input[placeholder*="domain"], input[name*="domain"], input[type="text"]');
  if (domainInput) {
    await domainInput.click();
    await domainInput.type('asads.ca', { delay: 40 });
    console.log('Typed: asads.ca');

    // Submit
    await pg.evaluate(() => {
      const btn = Array.from(document.querySelectorAll('button[type=submit], button')).find(b =>
        (b.innerText || '').toLowerCase().includes('add') ||
        (b.innerText || '').toLowerCase().includes('creat') ||
        (b.innerText || '').toLowerCase().includes('save'));
      if (btn) btn.click();
    });
    await sleep(3000);
    await pg.screenshot({ path: 'C:/Users/Owner/Documents/top-gta-home-inspections/scripts/improvmx-after-add.png' });
  }

  const afterAdd = await pg.evaluate(() => ({ url: window.location.href, text: document.body.innerText.substring(0, 600) }));
  console.log('\nAfter add domain URL:', afterAdd.url);
  console.log('Text:', afterAdd.text.substring(0, 400));

  // Now add forwarding alias info → haroon4951@hotmail.com
  console.log('\nAdding forwarding alias...');
  // Look for alias/forwarding input fields
  const aliasState = await pg.evaluate(() => ({
    inputs: Array.from(document.querySelectorAll('input')).map(i => ({ type: i.type, id: i.id, name: i.name, placeholder: i.placeholder }))
  }));
  console.log('Alias inputs:', JSON.stringify(aliasState.inputs));

  await pg.screenshot({ path: 'C:/Users/Owner/Documents/top-gta-home-inspections/scripts/improvmx-aliases.png' });

  await pg.close();
  browser.disconnect();
}
main().catch(e => console.error('Fatal:', e.message));
