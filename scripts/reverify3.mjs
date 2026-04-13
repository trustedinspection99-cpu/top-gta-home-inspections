import puppeteer from 'puppeteer';
const sleep = ms => new Promise(r => setTimeout(r, ms));

async function main() {
  const browser = await puppeteer.connect({ browserURL: 'http://localhost:9222' });

  // === FYPLE - Re-register to trigger new verification email ===
  console.log('=== FYPLE - Re-register listing ===');
  const fyple = await browser.newPage();
  fyple.setDefaultTimeout(30000);

  // Try to add business directly — may say "already exists" or resend verification
  await fyple.goto('https://www.fyple.ca/add-business/', { waitUntil: 'networkidle2', timeout: 30000 });
  await sleep(2000);

  const fypleState = await fyple.evaluate(() => ({
    url: window.location.href,
    text: document.body.innerText.substring(0, 500),
    inputs: Array.from(document.querySelectorAll('input, textarea')).map(i => ({ type: i.type || 'textarea', name: i.name, id: i.id, placeholder: i.placeholder }))
  }));
  console.log('URL:', fypleState.url);
  console.log('Text:', fypleState.text.substring(0, 400));
  console.log('Inputs:', JSON.stringify(fypleState.inputs.slice(0, 10)));
  await fyple.screenshot({ path: 'C:/Users/Owner/Documents/top-gta-home-inspections/scripts/fyple-add.png' });

  await fyple.close();

  // === 411.CA - Add Your Business ===
  console.log('\n=== 411.CA - Add Business ===');
  const yp = await browser.newPage();
  yp.setDefaultTimeout(30000);

  await yp.goto('https://www.411.ca/add-your-business', { waitUntil: 'networkidle2', timeout: 30000 });
  await sleep(2000);

  const ypState = await yp.evaluate(() => ({
    url: window.location.href,
    text: document.body.innerText.substring(0, 500),
    inputs: Array.from(document.querySelectorAll('input')).map(i => ({ type: i.type, name: i.name, id: i.id, placeholder: i.placeholder }))
  }));
  console.log('URL:', ypState.url);
  console.log('Text:', ypState.text.substring(0, 400));
  console.log('Inputs:', JSON.stringify(ypState.inputs.slice(0, 10)));
  await yp.screenshot({ path: 'C:/Users/Owner/Documents/top-gta-home-inspections/scripts/411-add.png' });

  // Look for email-based sign-in on 411
  const emailInputs = ypState.inputs.filter(i => i.type === 'email' || i.name?.includes('email') || i.id?.includes('email'));
  console.log('\nEmail inputs:', JSON.stringify(emailInputs));

  if (emailInputs.length > 0) {
    const emailIn = await yp.$('input[type="email"]');
    if (emailIn) {
      await emailIn.type('info@asads.ca', { delay: 50 });
      await yp.keyboard.press('Enter');
      await sleep(4000);
      const after = await yp.evaluate(() => ({ url: window.location.href, text: document.body.innerText.substring(0, 400) }));
      console.log('After email:', after.text.substring(0, 300));
    }
  }

  await yp.close();
  browser.disconnect();
}
main().catch(e => console.error('Fatal:', e.message));
