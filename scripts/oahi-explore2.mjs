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

  // Check membership categories first
  console.log('Checking membership categories...');
  await page.goto('https://www.oahi.com/membership-categories/', { waitUntil: 'networkidle2', timeout: 30000 });
  await new Promise(r => setTimeout(r, 2000));
  const catText = await page.evaluate(() => document.body.innerText);
  console.log('=== MEMBERSHIP CATEGORIES ===');
  console.log(catText.slice(0, 4000));

  // Check the become-a-member application page
  console.log('\n\nChecking become-a-member application...');
  await page.goto('https://www.oahi.com/become-a-member-app/', { waitUntil: 'networkidle2', timeout: 30000 });
  await new Promise(r => setTimeout(r, 2000));
  const appText = await page.evaluate(() => document.body.innerText);
  console.log('=== APPLICATION PAGE ===');
  console.log(appText.slice(0, 2000));
  console.log('URL:', page.url());

  await browser.disconnect();
}

main().catch(console.error);
