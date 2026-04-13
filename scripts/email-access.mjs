/**
 * email-access.mjs — Access info@asads.ca via Hostinger webmail
 * Click verification links from Fyple.ca and 411.ca
 */
import puppeteer from 'puppeteer';
import http from 'http';

const DEBUG_PORT = 9222;
const sleep = ms => new Promise(r => setTimeout(r, ms));

const EMAIL = 'info@asads.ca';
const EMAIL_PASS = 'ASADS2026!';

function checkPort(port) {
  return new Promise(resolve => {
    const req = http.get(`http://localhost:${port}/json/version`, res => resolve(res.statusCode === 200));
    req.on('error', () => resolve(false));
    req.setTimeout(1000, () => { req.destroy(); resolve(false); });
  });
}

async function main() {
  if (!await checkPort(DEBUG_PORT)) { console.error('Chrome not running'); return; }

  const browser = await puppeteer.connect({ browserURL: `http://localhost:${DEBUG_PORT}` });
  const pages = await browser.pages();
  const pg = pages[0];
  pg.setDefaultTimeout(30000);

  // Try Hostinger webmail
  console.log('Navigating to Hostinger webmail...');
  await pg.goto('https://webmail.hostinger.com', { waitUntil: 'networkidle2', timeout: 30000 });
  await sleep(3000);

  const state = await pg.evaluate(() => ({
    url: window.location.href,
    title: document.title,
    text: document.body.innerText.substring(0, 300),
    inputs: Array.from(document.querySelectorAll('input')).map(el => ({ type: el.type, name: el.name, id: el.id, placeholder: el.placeholder })),
  }));
  console.log('Webmail URL:', state.url);
  console.log('Webmail title:', state.title);
  console.log('Page text:', state.text.substring(0, 200));
  console.log('Inputs:', JSON.stringify(state.inputs));

  browser.disconnect();
}

main().catch(e => { console.error('Fatal:', e.message); process.exit(1); });
