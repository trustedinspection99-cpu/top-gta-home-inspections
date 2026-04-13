import puppeteer from 'puppeteer';
const sleep = ms => new Promise(r => setTimeout(r, ms));

const EMAIL = 'info@asads.ca';
const PASSWORDS = ['ASADS2026', 'Asads2026!', 'asads2026!', 'ASADS@2026!', 'Hostinger1!', 'ASADS123!'];

async function tryLogin(browser, pass) {
  const pg = await browser.newPage();
  pg.setDefaultTimeout(25000);

  await pg.goto('https://mail.hostinger.com/auth/login', { waitUntil: 'networkidle2', timeout: 25000 });
  await sleep(1500);

  await pg.click('#email');
  await pg.evaluate(() => { document.querySelector('#email').value = ''; });
  await pg.type('#email', EMAIL, { delay: 30 });

  await pg.click('#password');
  await pg.evaluate(() => { document.querySelector('#password').value = ''; });
  await pg.type('#password', pass, { delay: 30 });
  await sleep(300);

  await pg.evaluate(() => {
    const btn = Array.from(document.querySelectorAll('button')).find(b =>
      (b.innerText || '').toLowerCase().includes('login') ||
      (b.innerText || '').toLowerCase().includes('sign in')
    );
    if (btn) btn.click();
  });
  await sleep(5000);

  const result = await pg.evaluate(() => ({
    url: window.location.href,
    text: document.body.innerText.substring(0, 300)
  }));

  const failed = result.url.includes('/auth/login') ||
    result.text.toLowerCase().includes('incorrect') ||
    result.text.toLowerCase().includes('invalid') ||
    result.text.toLowerCase().includes('wrong password');

  console.log('Pass:', pass, '→', failed ? 'FAILED' : '✅ SUCCESS', '| URL:', result.url.substring(0, 70));
  if (!failed) {
    console.log('TEXT:', result.text.substring(0, 300));
  }

  await pg.close();
  return !failed;
}

async function main() {
  const browser = await puppeteer.connect({ browserURL: 'http://localhost:9222' });

  for (const pass of PASSWORDS) {
    const ok = await tryLogin(browser, pass);
    if (ok) {
      console.log('\n✅ Found working password:', pass);
      break;
    }
    await sleep(2000);
  }

  browser.disconnect();
  console.log('Done.');
}
main().catch(e => console.error('Fatal:', e.message));
