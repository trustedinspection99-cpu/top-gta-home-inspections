import puppeteer from 'puppeteer-core';

async function getBrowserWs() {
  const r = await fetch('http://localhost:9222/json/version');
  const j = await r.json();
  return j.webSocketDebuggerUrl;
}

async function main() {
  const ws = await getBrowserWs();
  const browser = await puppeteer.connect({ browserWSEndpoint: ws, defaultViewport: null });
  const pages = await browser.pages();
  const page = pages[0];

  console.log('Checking InterNACHI join page...');
  await page.goto('https://www.nachi.org/join', { waitUntil: 'networkidle2', timeout: 30000 });
  await new Promise(r => setTimeout(r, 3000));
  const text = await page.evaluate(() => document.body.innerText);
  console.log('=== INTERNACHI JOIN PAGE ===');
  console.log(text.slice(0, 5000));
  console.log('URL:', page.url());
  
  await page.screenshot({ path: 'scripts/nachi-join.png', fullPage: false });
  
  await browser.disconnect();
}

main().catch(console.error);
