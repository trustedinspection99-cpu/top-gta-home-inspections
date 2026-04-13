import puppeteer from 'puppeteer-core';

const WS = 'http://localhost:9222/json/version';

async function getBrowserWs() {
  const r = await fetch(WS);
  const j = await r.json();
  return j.webSocketDebuggerUrl;
}

async function main() {
  const ws = await getBrowserWs();
  const browser = await puppeteer.connect({ browserWSEndpoint: ws, defaultViewport: null });
  const pages = await browser.pages();
  const page = pages[0];

  console.log('Navigating to OAHI become-a-member page...');
  await page.goto('https://www.oahi.com/become-a-member/', { waitUntil: 'networkidle2', timeout: 30000 });
  await new Promise(r => setTimeout(r, 2000));

  const text = await page.evaluate(() => document.body.innerText);
  console.log('=== OAHI BECOME A MEMBER PAGE ===');
  console.log(text.slice(0, 3000));
  
  // Also check the URL we ended up on
  console.log('\n=== CURRENT URL ===');
  console.log(page.url());

  await page.screenshot({ path: 'scripts/oahi-member.png', fullPage: false });
  console.log('Screenshot saved: scripts/oahi-member.png');
  
  await browser.disconnect();
}

main().catch(console.error);
