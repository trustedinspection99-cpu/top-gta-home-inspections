import puppeteer from 'puppeteer';
const sleep = ms => new Promise(r => setTimeout(r, ms));

async function main() {
  const browser = await puppeteer.connect({ browserURL: 'http://localhost:9222' });

  // === FYPLE forgot password — press Enter ===
  console.log('=== FYPLE - Forgot Password (Enter) ===');
  const fyple = await browser.newPage();
  fyple.setDefaultTimeout(30000);

  await fyple.goto('https://www.fyple.ca/forgot-password/', { waitUntil: 'networkidle2', timeout: 30000 });
  await sleep(2000);

  const emailIn = await fyple.$('input[name="email"]');
  if (emailIn) {
    await emailIn.click({ clickCount: 3 });
    await emailIn.type('info@asads.ca', { delay: 50 });
    await fyple.keyboard.press('Enter');
    await sleep(4000);
  }

  const fypleResult = await fyple.evaluate(() => ({ url: window.location.href, text: document.body.innerText.substring(0, 400) }));
  console.log('Fyple result:', fypleResult.text.substring(0, 300));

  if (fypleResult.text.toLowerCase().includes('sent') || fypleResult.text.toLowerCase().includes('check') || fypleResult.text.toLowerCase().includes('email')) {
    console.log('✅ Fyple password reset email sent to info@asads.ca → Hotmail');
  }
  await fyple.close();

  // === 411.CA business portal ===
  console.log('\n=== 411.CA - Business Portal ===');
  const yp = await browser.newPage();
  yp.setDefaultTimeout(30000);

  await yp.goto('https://business.411.ca/', { waitUntil: 'networkidle2', timeout: 30000 });
  await sleep(2000);

  const ypState = await yp.evaluate(() => ({
    url: window.location.href,
    text: document.body.innerText.substring(0, 600),
    links: Array.from(document.querySelectorAll('a[href]')).map(a => ({
      text: (a.innerText || '').trim().substring(0, 50),
      href: a.href
    })).filter(l => l.text && (l.href.includes('login') || l.href.includes('sign') || l.href.includes('account') || l.href.includes('register') || l.text.toLowerCase().includes('login') || l.text.toLowerCase().includes('sign'))).slice(0, 15)
  }));
  console.log('411 business URL:', ypState.url);
  console.log('Text:', ypState.text.substring(0, 400));
  console.log('Login links:', JSON.stringify(ypState.links, null, 2));
  await yp.screenshot({ path: 'C:/Users/Owner/Documents/top-gta-home-inspections/scripts/411-business.png' });

  // Try clicking login/sign in
  const loginLink = await yp.evaluate(() => {
    const link = Array.from(document.querySelectorAll('a, button')).find(el =>
      (el.innerText || '').toLowerCase().match(/^(login|log in|sign in)$/));
    if (link) { link.click(); return link.href || link.innerText; }
    return null;
  });
  console.log('Login link clicked:', loginLink);
  await sleep(3000);

  const afterLogin = await yp.evaluate(() => ({
    url: window.location.href,
    text: document.body.innerText.substring(0, 400),
    inputs: Array.from(document.querySelectorAll('input')).map(i => ({ type: i.type, name: i.name, id: i.id, placeholder: i.placeholder }))
  }));
  console.log('After click URL:', afterLogin.url);
  console.log('Text:', afterLogin.text.substring(0, 300));
  console.log('Inputs:', JSON.stringify(afterLogin.inputs));
  await yp.screenshot({ path: 'C:/Users/Owner/Documents/top-gta-home-inspections/scripts/411-login2.png' });

  await yp.close();
  browser.disconnect();
}
main().catch(e => console.error('Fatal:', e.message));
