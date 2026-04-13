import puppeteer from 'puppeteer';
const sleep = ms => new Promise(r => setTimeout(r, ms));

async function main() {
  const browser = await puppeteer.connect({ browserURL: 'http://localhost:9222' });
  const pg = await browser.newPage();
  pg.setDefaultTimeout(30000);

  // Use the magic login link
  console.log('Logging in via magic link...');
  await pg.goto('https://app.improvmx.com/auth/32790ca7b45e42fb8dda6babcff06ac6', { waitUntil: 'networkidle2', timeout: 30000 });
  await sleep(3000);

  const loginState = await pg.evaluate(() => ({ url: window.location.href, text: document.body.innerText.substring(0, 300) }));
  console.log('URL after login:', loginState.url);
  console.log('Text:', loginState.text.substring(0, 200));

  if (loginState.url.includes('login') || loginState.url.includes('auth')) {
    console.log('❌ Login link may have expired or already used');
    await pg.close();
    browser.disconnect();
    return;
  }

  console.log('✅ Logged in!');

  // Navigate to domains page
  await pg.goto('https://app.improvmx.com/domains', { waitUntil: 'networkidle2', timeout: 25000 });
  await sleep(2000);

  const domainsText = await pg.evaluate(() => document.body.innerText.substring(0, 500));
  console.log('\nDomains page:', domainsText.substring(0, 300));

  // Check if asads.ca already added
  if (domainsText.includes('asads.ca')) {
    console.log('asads.ca already exists! Going to it...');
    await pg.goto('https://app.improvmx.com/domains/asads.ca', { waitUntil: 'networkidle2', timeout: 25000 });
  } else {
    // Add asads.ca
    console.log('\nAdding asads.ca...');
    // Click "Add domain" button
    await pg.evaluate(() => {
      const btn = Array.from(document.querySelectorAll('button, a')).find(b =>
        (b.innerText || '').match(/add|new|create/i));
      if (btn) btn.click();
    });
    await sleep(2000);
    await pg.screenshot({ path: 'C:/Users/Owner/Documents/top-gta-home-inspections/scripts/improvmx-add.png' });

    const addInputs = await pg.evaluate(() => ({
      text: document.body.innerText.substring(0, 300),
      inputs: Array.from(document.querySelectorAll('input')).map(i => ({ type: i.type, id: i.id, placeholder: i.placeholder }))
    }));
    console.log('Add form:', addInputs.text.substring(0, 200));
    console.log('Inputs:', JSON.stringify(addInputs.inputs));

    const domIn = await pg.$('input[placeholder*="domain"], input[type="text"]');
    if (domIn) {
      await domIn.click();
      await domIn.type('asads.ca', { delay: 40 });
      await pg.evaluate(() => {
        const btn = Array.from(document.querySelectorAll('button[type=submit], button')).find(b =>
          (b.innerText || '').match(/add|save|creat/i));
        if (btn) btn.click();
      });
      await sleep(3000);
    }
  }

  await pg.screenshot({ path: 'C:/Users/Owner/Documents/top-gta-home-inspections/scripts/improvmx-domain-page.png' });
  const domainPage = await pg.evaluate(() => ({ url: window.location.href, text: document.body.innerText.substring(0, 800) }));
  console.log('\nDomain page URL:', domainPage.url);
  console.log('Text:', domainPage.text.substring(0, 500));

  // Now set up forwarding alias: info → haroon4951@hotmail.com
  console.log('\nSetting up alias: info → haroon4951@hotmail.com');
  const aliasInputs = await pg.evaluate(() => ({
    inputs: Array.from(document.querySelectorAll('input')).map(i => ({ type: i.type, id: i.id, name: i.name, placeholder: i.placeholder }))
  }));
  console.log('Available inputs:', JSON.stringify(aliasInputs.inputs));

  // Look for alias/forward input fields
  // Usually ImprovMX has "alias" and "forward to" fields
  const aliasInput = await pg.$('input[placeholder*="alias"], input[placeholder*="catch"], input[id*="alias"], input[name*="alias"]');
  const forwardInput = await pg.$('input[placeholder*="forward"], input[placeholder*="email"], input[id*="forward"], input[name*="forward"]');

  if (aliasInput && forwardInput) {
    await aliasInput.click();
    await aliasInput.type('info', { delay: 40 });
    await forwardInput.click();
    await forwardInput.type('haroon4951@hotmail.com', { delay: 40 });
    console.log('Filled alias fields');

    await pg.evaluate(() => {
      const btn = Array.from(document.querySelectorAll('button')).find(b =>
        (b.innerText || '').match(/add|save|creat/i));
      if (btn) btn.click();
    });
    await sleep(3000);
    await pg.screenshot({ path: 'C:/Users/Owner/Documents/top-gta-home-inspections/scripts/improvmx-after-alias.png' });

    const final = await pg.evaluate(() => ({ url: window.location.href, text: document.body.innerText.substring(0, 600) }));
    console.log('\nFinal URL:', final.url);
    console.log('Final text:', final.text.substring(0, 400));
  } else {
    console.log('Could not find alias input fields - check screenshot');
    // Try looking for a form to add aliases
    const addAliasBtn = await pg.evaluate(() => {
      const btn = Array.from(document.querySelectorAll('button, a')).find(b =>
        (b.innerText || '').match(/alias|forward|add/i));
      return btn ? btn.innerText : 'not found';
    });
    console.log('Add alias button:', addAliasBtn);
  }

  await pg.close();
  browser.disconnect();
}
main().catch(e => console.error('Fatal:', e.message));
