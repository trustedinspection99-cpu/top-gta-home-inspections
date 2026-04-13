import puppeteer from 'puppeteer';
const sleep = ms => new Promise(r => setTimeout(r, ms));

async function main() {
  const browser = await puppeteer.connect({ browserURL: 'http://localhost:9222' });
  const pg = await browser.newPage();
  pg.setDefaultTimeout(30000);

  // Try going to webmail directly — may have an active session
  console.log('Checking mail.hostinger.com session...');
  await pg.goto('https://mail.hostinger.com', { waitUntil: 'networkidle2', timeout: 30000 });
  await sleep(3000);

  await pg.screenshot({ path: 'C:/Users/Owner/Documents/top-gta-home-inspections/scripts/webmail-session.png' });

  const state = await pg.evaluate(() => ({
    url: window.location.href,
    title: document.title,
    text: document.body.innerText.substring(0, 500)
  }));
  console.log('URL:', state.url);
  console.log('Title:', state.title);
  console.log('Text:', state.text.substring(0, 400));

  if (state.url.includes('/auth/login')) {
    console.log('\nNot logged in. Trying to find email via hPanel "Set up email"...');
    await pg.goto('https://hpanel.hostinger.com/email/setup/asads.ca', { waitUntil: 'networkidle2', timeout: 30000 });
    await sleep(2000);
    const s2 = await pg.evaluate(() => ({ url: window.location.href, text: document.body.innerText.substring(0, 500) }));
    console.log('Setup URL:', s2.url);
    console.log('Setup text:', s2.text);
  } else {
    console.log('\n✅ Webmail session active!');
    // Get inbox emails
    const emailLinks = await pg.evaluate(() => ({
      links: Array.from(document.querySelectorAll('a[href]')).slice(0, 20).map(a => ({ text: a.innerText?.substring(0,40), href: a.href })),
      text: document.body.innerText.substring(0, 1000)
    }));
    console.log('Inbox content:', emailLinks.text.substring(0, 600));
  }

  await pg.close();
  browser.disconnect();
}
main().catch(e => console.error('Fatal:', e.message));
