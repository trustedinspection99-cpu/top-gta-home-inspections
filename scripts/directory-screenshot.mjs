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

  // Re-fill account form
  await pg.evaluate(() => {
    function set(sel, val) {
      const el = document.querySelector(sel);
      if (el) { el.value = val; el.dispatchEvent(new Event('input', {bubbles:true})); }
    }
    set('#fname', 'ASADS');
    set('#lname', 'Home Inspection');
    set('#login_city', 'Cambridge');
    set('#email', 'info@asads.ca');
    set('#userpwd', 'ASADS2026!');
    set('#userconfirmpwd', 'ASADS2026!');
  });

  await pg.screenshot({ path: 'C:/Users/Owner/Documents/top-gta-home-inspections/scripts/profilecanada-step3.png' });
  console.log('Screenshot saved: scripts/profilecanada-step3.png');

  browser.disconnect();
}

main().catch(e => console.error(e.message));
