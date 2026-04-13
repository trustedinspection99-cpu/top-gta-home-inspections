import puppeteer from 'puppeteer';
const sleep = ms => new Promise(r => setTimeout(r, ms));

async function main() {
  const browser = await puppeteer.connect({ browserURL: 'http://localhost:9222' });

  // === FYPLE ===
  console.log('=== FYPLE ===');
  const fyple = await browser.newPage();
  fyple.setDefaultTimeout(30000);

  // Try logging in to Fyple
  await fyple.goto('https://www.fyple.ca/login/', { waitUntil: 'networkidle2', timeout: 30000 });
  await sleep(2000);

  const fypleState = await fyple.evaluate(() => ({
    url: window.location.href,
    text: document.body.innerText.substring(0, 300),
    inputs: Array.from(document.querySelectorAll('input')).map(i => ({ type: i.type, name: i.name, id: i.id, placeholder: i.placeholder }))
  }));
  console.log('Fyple login URL:', fypleState.url);
  console.log('Inputs:', JSON.stringify(fypleState.inputs));

  // Fill login
  const fypleEmail = await fyple.$('input[type="email"], input[name*="email"], input[id*="email"]');
  const fyplePass = await fyple.$('input[type="password"]');
  if (fypleEmail) { await fypleEmail.click({ clickCount: 3 }); await fypleEmail.type('info@asads.ca', { delay: 40 }); }
  if (fyplePass) { await fyplePass.click({ clickCount: 3 }); await fyplePass.type('ASADS2026!', { delay: 40 }); }

  await fyple.evaluate(() => {
    const btn = Array.from(document.querySelectorAll('button, input[type=submit]')).find(b =>
      (b.innerText || b.value || '').toLowerCase().match(/login|sign in|log in/));
    if (btn) btn.click();
  });
  await sleep(4000);

  const fypleAfter = await fyple.evaluate(() => ({ url: window.location.href, text: document.body.innerText.substring(0, 400) }));
  console.log('After login URL:', fypleAfter.url);
  console.log('Text:', fypleAfter.text.substring(0, 300));

  // Look for resend verification or account settings
  if (!fypleAfter.url.includes('login')) {
    console.log('✅ Logged into Fyple');
    // Look for resend verification link
    const resendLink = await fyple.evaluate(() => {
      const link = Array.from(document.querySelectorAll('a, button')).find(el =>
        (el.innerText || '').toLowerCase().includes('resend') ||
        (el.innerText || '').toLowerCase().includes('verify') ||
        (el.innerText || '').toLowerCase().includes('confirm'));
      return link ? { text: link.innerText, href: link.href } : null;
    });
    if (resendLink) {
      console.log('Found resend link:', resendLink);
    }
  } else {
    console.log('Not logged in — trying resend verification page directly');
    await fyple.goto('https://www.fyple.ca/resend-confirmation/', { waitUntil: 'networkidle2', timeout: 25000 });
    await sleep(2000);
    const resendState = await fyple.evaluate(() => ({ url: window.location.href, text: document.body.innerText.substring(0, 400) }));
    console.log('Resend page:', resendState.url, resendState.text.substring(0, 200));
  }

  await fyple.screenshot({ path: 'C:/Users/Owner/Documents/top-gta-home-inspections/scripts/fyple-state.png' });
  await fyple.close();

  // === 411.CA ===
  console.log('\n=== 411.CA ===');
  const yp = await browser.newPage();
  yp.setDefaultTimeout(30000);

  await yp.goto('https://www.411.ca/login', { waitUntil: 'networkidle2', timeout: 30000 });
  await sleep(2000);

  const ypState = await yp.evaluate(() => ({
    url: window.location.href,
    text: document.body.innerText.substring(0, 300),
    inputs: Array.from(document.querySelectorAll('input')).map(i => ({ type: i.type, name: i.name, id: i.id }))
  }));
  console.log('411 URL:', ypState.url);
  console.log('Inputs:', JSON.stringify(ypState.inputs));

  const ypEmail = await yp.$('input[type="email"], input[name*="email"]');
  const ypPass = await yp.$('input[type="password"]');
  if (ypEmail) { await ypEmail.click({ clickCount: 3 }); await ypEmail.type('info@asads.ca', { delay: 40 }); }
  if (ypPass) { await ypPass.click({ clickCount: 3 }); await ypPass.type('ASADS2026!', { delay: 40 }); }

  await yp.evaluate(() => {
    const btn = Array.from(document.querySelectorAll('button, input[type=submit]')).find(b =>
      (b.innerText || b.value || '').toLowerCase().match(/login|sign in|log in/));
    if (btn) btn.click();
  });
  await sleep(4000);

  const ypAfter = await yp.evaluate(() => ({ url: window.location.href, text: document.body.innerText.substring(0, 400) }));
  console.log('After login URL:', ypAfter.url);
  console.log('Text:', ypAfter.text.substring(0, 300));
  await yp.screenshot({ path: 'C:/Users/Owner/Documents/top-gta-home-inspections/scripts/411-state.png' });
  await yp.close();

  browser.disconnect();
  console.log('\nDone.');
}
main().catch(e => console.error('Fatal:', e.message));
