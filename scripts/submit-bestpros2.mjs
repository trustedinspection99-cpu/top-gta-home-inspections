import puppeteer from 'puppeteer';
const sleep = ms => new Promise(r => setTimeout(r, ms));

async function main() {
  const browser = await puppeteer.connect({ browserURL: 'http://localhost:9222' });

  // === BestProsInTown — fix selectors ===
  console.log('=== BestProsInTown ===');
  const bpt = await browser.newPage();
  bpt.setDefaultTimeout(30000);

  await bpt.goto('https://www.bestprosintown.com/addbusiness.php', { waitUntil: 'networkidle2', timeout: 30000 });
  await sleep(2000);

  // Fill by ID
  const fields = [
    { id: 'bz_name', val: 'ASADS Home Inspection' },
    { id: 'bz_adr', val: '45 Duckworth Rd, Cambridge, ON N3H 0C1' },
    { id: 'bz_tel', val: '647-801-9311' },
    { id: 'bz_web', val: 'https://www.asads.ca' },
    { id: 'yr_email', val: 'info@asads.ca' },
  ];

  for (const f of fields) {
    const el = await bpt.$(`#${f.id}`);
    if (el) {
      await el.click({ clickCount: 3 });
      await el.type(f.val, { delay: 30 });
      console.log('Filled #' + f.id + ':', f.val);
    } else {
      console.log('NOT FOUND: #' + f.id);
    }
  }
  await sleep(500);
  await bpt.screenshot({ path: 'C:/Users/Owner/Documents/top-gta-home-inspections/scripts/bestpros-filled2.png' });

  // Click "Send" button
  const sendBtn = await bpt.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const send = btns.find(b => (b.innerText || '').trim() === 'Send');
    if (send) { send.click(); return 'clicked Send'; }
    return 'Send button not found, buttons: ' + btns.map(b => b.innerText).join(', ');
  });
  console.log('Send result:', sendBtn);
  await sleep(5000);

  await bpt.screenshot({ path: 'C:/Users/Owner/Documents/top-gta-home-inspections/scripts/bestpros-sent.png' });
  const result = await bpt.evaluate(() => ({ url: window.location.href, text: document.body.innerText.substring(0, 500) }));
  console.log('URL:', result.url);
  console.log('Text:', result.text.substring(0, 400));

  if (result.text.toLowerCase().includes('thank') || result.text.toLowerCase().includes('success') || result.text.toLowerCase().includes('sent') || result.url !== 'https://www.bestprosintown.com/addbusiness.php') {
    console.log('\n✅ BestProsInTown submitted!');
  }
  await bpt.close();

  // === Homestars profile/new ===
  console.log('\n=== Homestars - profile/new ===');
  const hs = await browser.newPage();
  hs.setDefaultTimeout(30000);

  await hs.goto('https://www.homestars.com/profile/new', { waitUntil: 'networkidle2', timeout: 30000 });
  await sleep(3000);

  const hsState = await hs.evaluate(() => ({
    url: window.location.href,
    text: document.body.innerText.substring(0, 600),
    inputs: Array.from(document.querySelectorAll('input, textarea, select')).map(i => ({
      type: i.type, name: i.name, id: i.id, placeholder: i.placeholder
    }))
  }));
  console.log('Homestars URL:', hsState.url);
  console.log('Text:', hsState.text.substring(0, 400));
  console.log('Inputs:', JSON.stringify(hsState.inputs.slice(0, 15)));
  await hs.screenshot({ path: 'C:/Users/Owner/Documents/top-gta-home-inspections/scripts/homestars-profile.png' });

  await hs.close();
  browser.disconnect();
}
main().catch(e => console.error('Fatal:', e.message));
