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
  const pg = await browser.newPage();
  pg.setDefaultTimeout(30000);

  await pg.goto('https://www.homestars.com/profile/new', { waitUntil: 'networkidle2', timeout: 30000 });
  await sleep(2000);

  // Find "Pro sign up" link
  const proSignupLink = await pg.evaluate(() => {
    const links = Array.from(document.querySelectorAll('a[href]'));
    return links.map(a => ({ text: (a.innerText || '').trim(), href: a.href }))
      .filter(l => l.text.toLowerCase().includes('pro') || l.text.toLowerCase().includes('sign up') || l.text.toLowerCase().includes('business'));
  });
  console.log('Pro links:', JSON.stringify(proSignupLink, null, 2));

  // Navigate to Pro sign up
  const proUrl = proSignupLink.find(l => l.text.toLowerCase().includes('pro sign up') || l.text.toLowerCase().includes('sign up'))?.href;
  if (proUrl) {
    console.log('Going to:', proUrl);
    await pg.goto(proUrl, { waitUntil: 'networkidle2', timeout: 30000 });
    await sleep(3000);
  } else {
    // Try direct URLs
    await pg.goto('https://pro.homestars.com/signup', { waitUntil: 'networkidle2', timeout: 30000 });
    await sleep(2000);
  }

  const state = await pg.evaluate(() => ({
    url: window.location.href,
    text: document.body.innerText.substring(0, 600),
    inputs: Array.from(document.querySelectorAll('input, textarea, select')).map(i => ({
      type: i.type, name: i.name, id: i.id, placeholder: i.placeholder
    })).slice(0, 15)
  }));
  console.log('URL:', state.url);
  console.log('Text:', state.text.substring(0, 400));
  console.log('Inputs:', JSON.stringify(state.inputs));
  await pg.screenshot({ path: 'C:/Users/Owner/Documents/top-gta-home-inspections/scripts/homestars-pro.png' });

  // If we have a signup form, fill it
  if (state.inputs.length > 2) {
    console.log('\nFilling Homestars pro signup...');
    const emailIn = await pg.$('input[type="email"], input[name*="email"], input[id*="email"]');
    const passIn = await pg.$('input[type="password"]');
    const nameIn = await pg.$('input[name*="name"], input[id*="name"], input[placeholder*="name" i]');

    if (emailIn) { await emailIn.click({ clickCount: 3 }); await emailIn.type('info@asads.ca', { delay: 40 }); console.log('Filled email'); }
    if (passIn) { await passIn.click({ clickCount: 3 }); await passIn.type('ASADS2026!', { delay: 40 }); console.log('Filled password'); }
    if (nameIn) { await nameIn.click({ clickCount: 3 }); await nameIn.type('ASADS Home Inspection', { delay: 40 }); console.log('Filled name'); }

    await sleep(500);
    await pg.screenshot({ path: 'C:/Users/Owner/Documents/top-gta-home-inspections/scripts/homestars-filled.png' });
  }

  await pg.close();
  browser.disconnect();
}
main().catch(e => console.error('Fatal:', e.message));
