import puppeteer from 'puppeteer';
const sleep = ms => new Promise(r => setTimeout(r, ms));

async function main() {
  const browser = await puppeteer.connect({ browserURL: 'http://localhost:9222' });
  const pg = await browser.newPage();
  pg.setDefaultTimeout(30000);

  await pg.goto('https://app.improvmx.com/', { waitUntil: 'networkidle2', timeout: 30000 });
  await sleep(2000);

  // Type asads.ca into the "Add new domain" input
  const domIn = await pg.$('#creation__domain');
  if (!domIn) { console.log('Domain input not found'); browser.disconnect(); return; }

  await domIn.click();
  await domIn.type('asads.ca', { delay: 40 });
  console.log('Typed asads.ca');

  // Press Enter or click Add
  await pg.keyboard.press('Enter');
  await sleep(4000);
  await pg.screenshot({ path: 'C:/Users/Owner/Documents/top-gta-home-inspections/scripts/improvmx-added.png' });

  const after = await pg.evaluate(() => ({ url: window.location.href, text: document.body.innerText.substring(0, 800) }));
  console.log('URL:', after.url);
  console.log('Text:', after.text.substring(0, 500));

  // Now look for the alias setup fields
  const inputs = await pg.evaluate(() =>
    Array.from(document.querySelectorAll('input')).map(i => ({ type: i.type, placeholder: i.placeholder, id: i.id, name: i.name }))
  );
  console.log('\nInputs on page:', JSON.stringify(inputs));

  // ImprovMX alias form usually has: "alias" (the local part) and "forward to" fields
  // Try common selectors
  const aliasIn = await pg.$('#alias__alias, input[placeholder*="alias"], input[name="alias"]');
  const forwardIn = await pg.$('#alias__forward, input[placeholder*="forward"], input[name="forward"]');

  if (aliasIn && forwardIn) {
    await aliasIn.click();
    await aliasIn.type('info', { delay: 40 });
    await forwardIn.click();
    await forwardIn.type('haroon4951@hotmail.com', { delay: 40 });
    console.log('\nFilled alias: info → haroon4951@hotmail.com');

    await pg.evaluate(() => {
      const btn = Array.from(document.querySelectorAll('button')).find(b =>
        (b.innerText || '').match(/add|save|creat/i));
      if (btn) btn.click();
    });
    await sleep(3000);
    await pg.screenshot({ path: 'C:/Users/Owner/Documents/top-gta-home-inspections/scripts/improvmx-alias-added.png' });

    const final = await pg.evaluate(() => document.body.innerText.substring(0, 600));
    console.log('\nFinal:', final.substring(0, 400));
    console.log('\n✅ Forwarding set up: info@asads.ca → haroon4951@hotmail.com');
  } else {
    console.log('\nAlias inputs not found yet - may need to navigate to domain page first');
    // Try going to the asads.ca domain page
    const domainLink = await pg.evaluate(() => {
      const link = Array.from(document.querySelectorAll('a')).find(a => a.href?.includes('asads.ca'));
      return link ? link.href : null;
    });
    if (domainLink) {
      console.log('Domain link:', domainLink);
      await pg.goto(domainLink, { waitUntil: 'networkidle2', timeout: 25000 });
      await sleep(2000);
      await pg.screenshot({ path: 'C:/Users/Owner/Documents/top-gta-home-inspections/scripts/improvmx-domain-detail.png' });
      const domDetail = await pg.evaluate(() => ({
        url: window.location.href,
        text: document.body.innerText.substring(0, 800),
        inputs: Array.from(document.querySelectorAll('input')).map(i => ({ type: i.type, placeholder: i.placeholder, id: i.id }))
      }));
      console.log('Domain detail URL:', domDetail.url);
      console.log('Text:', domDetail.text.substring(0, 400));
      console.log('Inputs:', JSON.stringify(domDetail.inputs));
    }
  }

  await pg.close();
  browser.disconnect();
}
main().catch(e => console.error('Fatal:', e.message));
