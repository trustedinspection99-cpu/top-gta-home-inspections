import puppeteer from 'puppeteer';
const sleep = ms => new Promise(r => setTimeout(r, ms));

async function main() {
  const browser = await puppeteer.connect({ browserURL: 'http://localhost:9222' });

  // === BestProsInTown ===
  console.log('=== BestProsInTown ===');
  const bpt = await browser.newPage();
  bpt.setDefaultTimeout(30000);

  await bpt.goto('https://www.bestprosintown.com/addbusiness.php', { waitUntil: 'networkidle2', timeout: 30000 });
  await sleep(2000);

  const bptState = await bpt.evaluate(() => ({
    url: window.location.href,
    text: document.body.innerText.substring(0, 500),
    inputs: Array.from(document.querySelectorAll('input, textarea, select, button')).map(el => ({
      tag: el.tagName, type: el.type, name: el.name, id: el.id,
      placeholder: el.placeholder, text: el.innerText?.substring(0, 30)
    }))
  }));
  console.log('BestPros URL:', bptState.url);
  console.log('Text:', bptState.text.substring(0, 400));
  console.log('Inputs:', JSON.stringify(bptState.inputs.slice(0, 20)));
  await bpt.screenshot({ path: 'C:/Users/Owner/Documents/top-gta-home-inspections/scripts/bestpros2.png' });

  // Fill form fields from previous knowledge: bz_name, bz_adr, bz_tel, bz_web, yr_email
  const fields = [
    { sel: 'input[name="bz_name"]', val: 'ASADS Home Inspection' },
    { sel: 'input[name="bz_adr"]', val: '45 Duckworth Rd, Cambridge, ON' },
    { sel: 'input[name="bz_tel"]', val: '647-801-9311' },
    { sel: 'input[name="bz_web"]', val: 'https://www.asads.ca' },
    { sel: 'input[name="yr_email"]', val: 'info@asads.ca' },
    { sel: 'input[name="bz_cat"]', val: 'Home Inspection' },
    { sel: 'input[name="bz_city"]', val: 'Cambridge' },
    { sel: 'input[name="bz_state"]', val: 'ON' },
  ];

  for (const f of fields) {
    const el = await bpt.$(f.sel);
    if (el) {
      await el.click({ clickCount: 3 });
      await el.type(f.val, { delay: 30 });
      console.log('Filled:', f.sel);
    }
  }

  // Check textarea
  const ta = await bpt.$('textarea[name="bz_desc"], textarea');
  if (ta) {
    await ta.click();
    await ta.type('Professional home inspection services in Ontario. Serving the GTA and surrounding areas.', { delay: 20 });
    console.log('Filled textarea');
  }

  await sleep(500);
  await bpt.screenshot({ path: 'C:/Users/Owner/Documents/top-gta-home-inspections/scripts/bestpros-filled.png' });

  // Find submit button
  const btns = await bpt.evaluate(() =>
    Array.from(document.querySelectorAll('button, input[type=submit], input[type=button]')).map(b => ({
      tag: b.tagName, type: b.type, name: b.name, value: b.value, text: b.innerText?.substring(0,40)
    }))
  );
  console.log('Buttons:', JSON.stringify(btns));

  // Click submit
  const submitted = await bpt.evaluate(() => {
    const btn = Array.from(document.querySelectorAll('input[type=submit], button[type=submit], button')).find(b =>
      !b.disabled && ((b.value || b.innerText || '').toLowerCase().match(/submit|add|register|list|save|go/)));
    if (btn) { btn.click(); return 'clicked: ' + (btn.value || btn.innerText); }
    // Try any submit input
    const anySubmit = document.querySelector('input[type=submit]');
    if (anySubmit) { anySubmit.click(); return 'clicked any submit: ' + anySubmit.value; }
    return 'no button found';
  });
  console.log('Submit result:', submitted);
  await sleep(5000);

  await bpt.screenshot({ path: 'C:/Users/Owner/Documents/top-gta-home-inspections/scripts/bestpros-result.png' });
  const result = await bpt.evaluate(() => ({ url: window.location.href, text: document.body.innerText.substring(0, 500) }));
  console.log('\nResult URL:', result.url);
  console.log('Result text:', result.text.substring(0, 400));
  await bpt.close();

  // === Homestars ===
  console.log('\n=== Homestars ===');
  const hs = await browser.newPage();
  hs.setDefaultTimeout(30000);

  // Try different Homestars business URLs
  const hsUrls = [
    'https://homestars.com/companies/new',
    'https://pro.homestars.com',
    'https://homestars.com/pro',
    'https://homestars.com/business',
  ];
  for (const url of hsUrls) {
    await hs.goto(url, { waitUntil: 'domcontentloaded', timeout: 20000 }).catch(() => {});
    await sleep(1500);
    const s = await hs.evaluate(() => ({ url: window.location.href, text: document.body.innerText.substring(0, 150) }));
    console.log(url, '→', s.url.substring(0, 70));
    console.log('  Text:', s.text.substring(0, 100));
    if (!s.url.includes('404') && !s.text.toLowerCase().includes('not found')) {
      await hs.screenshot({ path: 'C:/Users/Owner/Documents/top-gta-home-inspections/scripts/homestars.png' });
      break;
    }
  }
  await hs.close();

  browser.disconnect();
}
main().catch(e => console.error('Fatal:', e.message));
