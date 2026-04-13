import puppeteer from 'puppeteer';
const sleep = ms => new Promise(r => setTimeout(r, ms));

async function main() {
  const browser = await puppeteer.connect({ browserURL: 'http://localhost:9222' });
  const pages = await browser.pages();
  const pg = pages[0]; // hPanel tab
  pg.setDefaultTimeout(30000);

  console.log('Current URL:', pg.url());

  // Navigate to email section in hPanel
  console.log('Going to hPanel emails...');
  await pg.goto('https://hpanel.hostinger.com/emails', { waitUntil: 'networkidle2', timeout: 30000 });
  await sleep(3000);

  const state = await pg.evaluate(() => ({
    url: window.location.href,
    title: document.title,
    text: document.body.innerText.substring(0, 500)
  }));
  console.log('URL:', state.url);
  console.log('Title:', state.title);
  console.log('Text:', state.text);

  await pg.screenshot({ path: 'C:/Users/Owner/Documents/top-gta-home-inspections/scripts/hpanel-emails.png' });
  console.log('Screenshot saved');

  browser.disconnect();
}
main().catch(e => console.error('Fatal:', e.message));
