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
  const pg = pages[0];

  const state = await pg.evaluate(() => ({
    url: window.location.href,
    title: document.title,
    text: document.body.innerText.substring(0, 1200),
  }));

  console.log('URL:', state.url);
  console.log('Title:', state.title);
  console.log('Full text:');
  console.log(state.text);

  await pg.screenshot({ path: 'C:/Users/Owner/Documents/top-gta-home-inspections/scripts/profilecanada-current.png' });
  console.log('\nScreenshot saved: scripts/profilecanada-current.png');

  browser.disconnect();
}

main().catch(e => console.error(e.message));
