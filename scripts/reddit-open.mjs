import puppeteer from 'puppeteer';
const sleep = ms => new Promise(r => setTimeout(r, ms));

async function main() {
  const browser = await puppeteer.connect({ browserURL: 'http://localhost:9222' });
  const pg = await browser.newPage();
  await pg.goto('https://www.reddit.com/login', { waitUntil: 'domcontentloaded', timeout: 30000 });
  await sleep(2000);
  await pg.bringToFront();
  console.log('Reddit login page opened in browser — please log in');
  browser.disconnect();
}
main().catch(e => console.error(e.message));
