import puppeteer from 'puppeteer';
const sleep = ms => new Promise(r => setTimeout(r, ms));

async function main() {
  const browser = await puppeteer.connect({ browserURL: 'http://localhost:9222' });
  const pg = await browser.newPage();
  pg.setDefaultTimeout(30000);

  console.log('Opening ImprovMX...');
  await pg.goto('https://improvmx.com', { waitUntil: 'networkidle2', timeout: 30000 });
  await sleep(2000);

  await pg.screenshot({ path: 'C:/Users/Owner/Documents/top-gta-home-inspections/scripts/improvmx-home.png' });

  // Look for domain input field
  const state = await pg.evaluate(() => ({
    url: window.location.href,
    text: document.body.innerText.substring(0, 400),
    inputs: Array.from(document.querySelectorAll('input')).map(i => ({
      type: i.type, name: i.name, id: i.id, placeholder: i.placeholder
    }))
  }));
  console.log('ImprovMX URL:', state.url);
  console.log('Text:', state.text.substring(0, 300));
  console.log('Inputs:', JSON.stringify(state.inputs));

  // Try to enter domain in the quick setup form
  const domainInput = await pg.$('input[placeholder*="domain"], input[name*="domain"], input[type="text"]');
  if (domainInput) {
    await domainInput.click();
    await domainInput.type('asads.ca', { delay: 50 });
    console.log('Typed domain: asads.ca');

    // Look for submit/get started button
    await pg.evaluate(() => {
      const btn = Array.from(document.querySelectorAll('button, input[type=submit]'))
        .find(b => (b.innerText || b.value || '').toLowerCase().includes('start') ||
                   (b.innerText || b.value || '').toLowerCase().includes('get') ||
                   (b.innerText || b.value || '').toLowerCase().includes('setup') ||
                   (b.innerText || b.value || '').toLowerCase().includes('add'));
      if (btn) btn.click();
    });
    await sleep(3000);
    await pg.screenshot({ path: 'C:/Users/Owner/Documents/top-gta-home-inspections/scripts/improvmx-after-domain.png' });
  }

  const state2 = await pg.evaluate(() => ({
    url: window.location.href,
    text: document.body.innerText.substring(0, 600)
  }));
  console.log('After:', state2.url);
  console.log('Text:', state2.text.substring(0, 400));

  await pg.close();
  browser.disconnect();
}
main().catch(e => console.error('Fatal:', e.message));
