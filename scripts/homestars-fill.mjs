import puppeteer from 'puppeteer';
const sleep = ms => new Promise(r => setTimeout(r, ms));

async function main() {
  const browser = await puppeteer.connect({ browserURL: 'http://localhost:9222' });
  const pg = await browser.newPage();
  pg.setDefaultTimeout(30000);

  await pg.goto('https://www.homestars.com/pro/register', { waitUntil: 'networkidle2', timeout: 30000 });
  await sleep(2000);

  // Check profession options
  const options = await pg.evaluate(() => {
    const sel = document.getElementById('profession');
    if (!sel) return [];
    return Array.from(sel.options).map(o => ({ value: o.value, text: o.text }));
  });
  console.log('Profession options:', options.map(o => o.text).join(', '));

  // Find "Home Inspector" or closest match
  const homeInspector = options.find(o =>
    o.text.toLowerCase().includes('home inspector') ||
    o.text.toLowerCase().includes('inspection') ||
    o.text.toLowerCase().includes('inspector')
  );
  console.log('Best match:', homeInspector);

  if (homeInspector) {
    await pg.select('#profession', homeInspector.value);
    console.log('Selected profession:', homeInspector.text);
  }

  // Fill postal code
  const postalIn = await pg.$('#postalCode');
  if (postalIn) {
    await postalIn.click({ clickCount: 3 });
    await postalIn.type('N3H0C1', { delay: 40 });
    console.log('Filled postal code');
  }

  // Fill email
  const emailIn = await pg.$('#service-pro-email');
  if (emailIn) {
    await emailIn.click({ clickCount: 3 });
    await emailIn.type('info@asads.ca', { delay: 40 });
    console.log('Filled email');
  }

  await sleep(500);
  await pg.screenshot({ path: 'C:/Users/Owner/Documents/top-gta-home-inspections/scripts/homestars-filled2.png' });

  // Check form values
  const vals = await pg.evaluate(() => ({
    profession: document.getElementById('profession')?.value,
    postalCode: document.getElementById('postalCode')?.value,
    email: document.getElementById('service-pro-email')?.value,
  }));
  console.log('Values:', JSON.stringify(vals));

  // Submit
  const submitted = await pg.evaluate(() => {
    const btn = Array.from(document.querySelectorAll('button[type=submit], button')).find(b =>
      (b.innerText || '').toLowerCase().match(/get start|sign up|register|submit|next|continue|join/));
    if (btn) { btn.click(); return 'clicked: ' + btn.innerText; }
    // Try pressing Enter in email field
    return 'no button found';
  });
  console.log('Submit:', submitted);
  await sleep(6000);

  await pg.screenshot({ path: 'C:/Users/Owner/Documents/top-gta-home-inspections/scripts/homestars-result.png' });
  const result = await pg.evaluate(() => ({ url: window.location.href, text: document.body.innerText.substring(0, 600) }));
  console.log('URL:', result.url);
  console.log('Text:', result.text.substring(0, 500));

  await pg.close();
  browser.disconnect();
}
main().catch(e => console.error('Fatal:', e.message));
