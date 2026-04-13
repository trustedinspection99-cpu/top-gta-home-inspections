import puppeteer from 'puppeteer';
const sleep = ms => new Promise(r => setTimeout(r, ms));

async function main() {
  const browser = await puppeteer.connect({ browserURL: 'http://localhost:9222' });
  const pg = await browser.newPage();
  pg.setDefaultTimeout(30000);

  // Generate API key
  await pg.goto('https://app.improvmx.com/api', { waitUntil: 'networkidle2', timeout: 30000 });
  await sleep(2000);

  console.log('API keys page...');
  const pageText = await pg.evaluate(() => document.body.innerText.substring(0, 400));
  console.log('Text:', pageText.substring(0, 300));

  // Click "Generate API Key"
  await pg.evaluate(() => {
    const btn = Array.from(document.querySelectorAll('button, a')).find(b =>
      (b.innerText || '').toLowerCase().includes('generate') ||
      (b.innerText || '').toLowerCase().includes('create') ||
      (b.innerText || '').toLowerCase().includes('new key'));
    if (btn) btn.click();
  });
  await sleep(2000);
  await pg.screenshot({ path: 'C:/Users/Owner/Documents/top-gta-home-inspections/scripts/improvmx-apikey.png' });

  const afterGen = await pg.evaluate(() => ({
    text: document.body.innerText.substring(0, 600),
    inputs: Array.from(document.querySelectorAll('input[type="text"], input[readonly]')).map(i => i.value)
  }));
  console.log('After generate:', afterGen.text.substring(0, 400));
  console.log('Input values:', afterGen.inputs);

  // Look for the API key value
  const apiKey = await pg.evaluate(() => {
    // Check for any code/pre elements or readonly inputs with a long value
    const els = Array.from(document.querySelectorAll('code, pre, input[readonly], [class*="key"], [class*="token"], [class*="api"]'));
    return els.map(e => (e.value || e.innerText || '').trim()).filter(v => v.length > 10);
  });
  console.log('API key candidates:', apiKey);

  await pg.close();
  browser.disconnect();
}
main().catch(e => console.error('Fatal:', e.message));
