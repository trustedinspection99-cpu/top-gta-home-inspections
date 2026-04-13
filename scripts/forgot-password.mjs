import puppeteer from 'puppeteer';
const sleep = ms => new Promise(r => setTimeout(r, ms));

async function main() {
  const browser = await puppeteer.connect({ browserURL: 'http://localhost:9222' });

  // === FYPLE forgot password ===
  console.log('=== FYPLE - Forgot Password ===');
  const fyple = await browser.newPage();
  fyple.setDefaultTimeout(30000);

  await fyple.goto('https://www.fyple.ca/forgot-password/', { waitUntil: 'networkidle2', timeout: 30000 });
  await sleep(2000);

  const fpState = await fyple.evaluate(() => ({
    url: window.location.href,
    text: document.body.innerText.substring(0, 300),
    inputs: Array.from(document.querySelectorAll('input')).map(i => ({ type: i.type, name: i.name, id: i.id }))
  }));
  console.log('Forgot pwd URL:', fpState.url);
  console.log('Text:', fpState.text.substring(0, 200));
  console.log('Inputs:', JSON.stringify(fpState.inputs));

  // Enter email
  const emailIn = await fyple.$('input[name="email"], input[type="email"], input[type="text"]');
  if (emailIn) {
    await emailIn.click({ clickCount: 3 });
    await emailIn.type('info@asads.ca', { delay: 50 });
    await fyple.evaluate(() => {
      const btn = Array.from(document.querySelectorAll('button, input[type=submit]')).find(b =>
        (b.innerText || b.value || '').toLowerCase().match(/send|submit|reset|request/));
      if (btn) btn.click();
    });
    await sleep(4000);
    const after = await fyple.evaluate(() => ({ url: window.location.href, text: document.body.innerText.substring(0, 400) }));
    console.log('After submit:', after.text.substring(0, 300));
  }
  await fyple.close();

  // === 411.CA - find login/business portal ===
  console.log('\n=== 411.CA - Business Login ===');
  const yp = await browser.newPage();
  yp.setDefaultTimeout(30000);

  // Try different login URLs for 411
  const urls411 = [
    'https://www.411.ca/business/login',
    'https://www.411.ca/user/login',
    'https://www.411.ca/account/login',
    'https://business.411.ca/login',
  ];

  for (const url of urls411) {
    await yp.goto(url, { waitUntil: 'domcontentloaded', timeout: 20000 }).catch(() => {});
    await sleep(1500);
    const s = await yp.evaluate(() => ({ url: window.location.href, text: document.body.innerText.substring(0, 150) }));
    console.log(url, '→', s.url, '|', s.text.substring(0, 80));
    if (!s.url.includes('404') && !s.text.toLowerCase().includes('not found')) break;
  }

  await yp.screenshot({ path: 'C:/Users/Owner/Documents/top-gta-home-inspections/scripts/411-login.png' });
  await yp.close();

  browser.disconnect();
}
main().catch(e => console.error('Fatal:', e.message));
