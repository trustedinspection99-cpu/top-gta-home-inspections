import puppeteer from 'puppeteer';
const sleep = ms => new Promise(r => setTimeout(r, ms));

async function main() {
  const browser = await puppeteer.connect({ browserURL: 'http://localhost:9222' });
  const pg = await browser.newPage();
  pg.setDefaultTimeout(30000);

  console.log('Logging into ImprovMX (magic link)...');
  await pg.goto('https://app.improvmx.com/login', { waitUntil: 'networkidle2', timeout: 30000 });
  await sleep(1500);

  // ImprovMX uses magic link login - enter email, get link sent
  const emailIn = await pg.$('#login__domain, input[type="text"]');
  if (emailIn) {
    await emailIn.click();
    await emailIn.type('haroon4951@hotmail.com', { delay: 40 });
    console.log('Entered email');
  }

  await pg.evaluate(() => {
    const btn = Array.from(document.querySelectorAll('button')).find(b =>
      (b.innerText || '').toLowerCase().includes('continu') ||
      (b.innerText || '').toLowerCase().includes('send') ||
      (b.innerText || '').toLowerCase().includes('log'));
    if (btn) { console.log('Clicking:', btn.innerText); btn.click(); }
  });
  await sleep(3000);

  const after = await pg.evaluate(() => ({ url: window.location.href, text: document.body.innerText.substring(0, 400) }));
  console.log('After URL:', after.url);
  console.log('Text:', after.text.substring(0, 300));

  // Alternatively, try "Login via DNS entry verification" - verify ownership via TXT record
  // This lets us login without magic link
  console.log('\nTrying DNS verification login...');
  const dnsBtn = await pg.$('a[href*="dns"], button');
  await pg.evaluate(() => {
    const link = Array.from(document.querySelectorAll('a, button')).find(b =>
      (b.innerText || '').toLowerCase().includes('dns'));
    if (link) { console.log('Found DNS link:', link.innerText); link.click(); }
  });
  await sleep(2000);

  const dnsState = await pg.evaluate(() => ({ url: window.location.href, text: document.body.innerText.substring(0, 400) }));
  console.log('DNS login URL:', dnsState.url);
  console.log('Text:', dnsState.text.substring(0, 300));
  await pg.screenshot({ path: 'C:/Users/Owner/Documents/top-gta-home-inspections/scripts/improvmx-login-dns.png' });

  await pg.close();
  browser.disconnect();
}
main().catch(e => console.error('Fatal:', e.message));
