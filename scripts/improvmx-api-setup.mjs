import puppeteer from 'puppeteer';
const sleep = ms => new Promise(r => setTimeout(r, ms));

async function main() {
  const browser = await puppeteer.connect({ browserURL: 'http://localhost:9222' });
  const pg = await browser.newPage();
  pg.setDefaultTimeout(30000);

  // Already logged in — get API key first
  console.log('Getting ImprovMX API key...');
  await pg.goto('https://app.improvmx.com/api', { waitUntil: 'networkidle2', timeout: 30000 });
  await sleep(2000);

  const apiPage = await pg.evaluate(() => ({
    url: window.location.href,
    text: document.body.innerText.substring(0, 800)
  }));
  console.log('API page text:', apiPage.text.substring(0, 500));

  // Extract API key from page
  const apiKey = await pg.evaluate(() => {
    const inputs = Array.from(document.querySelectorAll('input[type="text"], input[readonly]'));
    const codeEls = Array.from(document.querySelectorAll('code, pre, [class*="key"], [class*="token"]'));
    return {
      inputs: inputs.map(i => i.value),
      codes: codeEls.map(c => c.innerText?.substring(0, 100))
    };
  });
  console.log('API key candidates:', JSON.stringify(apiKey));
  await pg.screenshot({ path: 'C:/Users/Owner/Documents/top-gta-home-inspections/scripts/improvmx-api.png' });

  // Navigate to domain list with detailed interaction
  console.log('\nNavigating to domains with fresh approach...');
  await pg.goto('https://app.improvmx.com/', { waitUntil: 'networkidle2', timeout: 30000 });
  await sleep(2000);
  await pg.screenshot({ path: 'C:/Users/Owner/Documents/top-gta-home-inspections/scripts/improvmx-home-loggedin.png' });

  const homeText = await pg.evaluate(() => document.body.innerText.substring(0, 1000));
  console.log('Home:', homeText.substring(0, 600));

  // Try clicking "Add domain" or look for + button
  const clicked = await pg.evaluate(() => {
    // Find any button or link with add/new/+
    const els = Array.from(document.querySelectorAll('button, a, [role="button"]'));
    const addEl = els.find(e => {
      const t = (e.innerText || e.getAttribute('aria-label') || e.title || '').toLowerCase();
      return t.includes('add') || t.includes('new') || t === '+';
    });
    if (addEl) { addEl.click(); return 'clicked: ' + (addEl.innerText || addEl.getAttribute('aria-label')); }
    return 'not found. buttons: ' + els.slice(0,10).map(e => e.innerText?.substring(0,20)).join(', ');
  });
  console.log('Click result:', clicked);
  await sleep(2000);
  await pg.screenshot({ path: 'C:/Users/Owner/Documents/top-gta-home-inspections/scripts/improvmx-after-add-click.png' });

  const afterClick = await pg.evaluate(() => ({
    url: window.location.href,
    text: document.body.innerText.substring(0, 500),
    inputs: Array.from(document.querySelectorAll('input')).map(i => ({ type: i.type, placeholder: i.placeholder, id: i.id }))
  }));
  console.log('After click text:', afterClick.text.substring(0, 400));
  console.log('Inputs:', JSON.stringify(afterClick.inputs));

  await pg.close();
  browser.disconnect();
}
main().catch(e => console.error('Fatal:', e.message));
