import puppeteer from 'puppeteer';
const sleep = ms => new Promise(r => setTimeout(r, ms));

async function main() {
  const browser = await puppeteer.connect({ browserURL: 'http://localhost:9222' });

  // === FYPLE - find add business URL ===
  console.log('=== FYPLE - Find Add Business ===');
  const fyple = await browser.newPage();
  fyple.setDefaultTimeout(30000);

  await fyple.goto('https://www.fyple.ca/', { waitUntil: 'networkidle2', timeout: 30000 });
  await sleep(2000);

  const fypleLinks = await fyple.evaluate(() =>
    Array.from(document.querySelectorAll('a[href]')).map(a => ({
      text: (a.innerText || '').trim().substring(0, 50),
      href: a.href
    })).filter(l => l.text && (l.text.toLowerCase().includes('add') || l.text.toLowerCase().includes('register') || l.text.toLowerCase().includes('list')))
  );
  console.log('Fyple add links:', JSON.stringify(fypleLinks, null, 2));
  await fyple.close();

  // === 411.CA - find add business URL ===
  console.log('\n=== 411.CA - Find Add Business ===');
  const yp = await browser.newPage();
  yp.setDefaultTimeout(30000);

  await yp.goto('https://www.411.ca/', { waitUntil: 'networkidle2', timeout: 30000 });
  await sleep(2000);

  const ypLinks = await yp.evaluate(() =>
    Array.from(document.querySelectorAll('a[href]')).map(a => ({
      text: (a.innerText || '').trim().substring(0, 60),
      href: a.href
    })).filter(l => l.text && (l.text.toLowerCase().includes('add') || l.text.toLowerCase().includes('business') || l.text.toLowerCase().includes('list') || l.text.toLowerCase().includes('register')))
  );
  console.log('411 add links:', JSON.stringify(ypLinks, null, 2));

  // Click "Add your business"
  await yp.evaluate(() => {
    const link = Array.from(document.querySelectorAll('a')).find(a =>
      (a.innerText || '').toLowerCase().includes('add your business'));
    if (link) link.click();
  });
  await sleep(3000);

  const ypAfter = await yp.evaluate(() => ({
    url: window.location.href,
    text: document.body.innerText.substring(0, 500),
    inputs: Array.from(document.querySelectorAll('input')).map(i => ({ type: i.type, name: i.name, id: i.id, placeholder: i.placeholder }))
  }));
  console.log('\nAfter click URL:', ypAfter.url);
  console.log('Text:', ypAfter.text.substring(0, 400));
  console.log('Inputs:', JSON.stringify(ypAfter.inputs.slice(0, 10)));
  await yp.screenshot({ path: 'C:/Users/Owner/Documents/top-gta-home-inspections/scripts/411-add2.png' });

  await yp.close();
  browser.disconnect();
}
main().catch(e => console.error('Fatal:', e.message));
