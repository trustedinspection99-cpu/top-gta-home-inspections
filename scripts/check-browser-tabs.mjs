import puppeteer from 'puppeteer';
import http from 'http';

function checkPort(port) {
  return new Promise(resolve => {
    const req = http.get(`http://localhost:${port}/json/version`, res => resolve(res.statusCode === 200));
    req.on('error', () => resolve(false));
    req.setTimeout(1000, () => { req.destroy(); resolve(false); });
  });
}

async function main() {
  if (!await checkPort(9222)) { console.error('Chrome not running'); return; }
  const browser = await puppeteer.connect({ browserURL: 'http://localhost:9222' });
  const pages = await browser.pages();

  console.log('Open tabs:', pages.length);
  for (const pg of pages) {
    console.log(' -', pg.url(), '|', await pg.evaluate(() => document.title).catch(() => '(error)'));
  }

  browser.disconnect();
}

main().catch(e => console.error(e.message));
