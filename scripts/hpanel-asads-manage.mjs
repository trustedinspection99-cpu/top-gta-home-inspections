import puppeteer from 'puppeteer';
const sleep = ms => new Promise(r => setTimeout(r, ms));

async function main() {
  const browser = await puppeteer.connect({ browserURL: 'http://localhost:9222' });
  const pages = await browser.pages();
  const pg = pages[0];
  pg.setDefaultTimeout(30000);

  // Go to domains list and click Manage for asads.ca
  await pg.goto('https://hpanel.hostinger.com/domains', { waitUntil: 'networkidle2', timeout: 30000 });
  await sleep(2000);

  // Find all links on the page
  const allLinks = await pg.evaluate(() => {
    return Array.from(document.querySelectorAll('a[href], button')).map(el => ({
      tag: el.tagName,
      text: (el.innerText || el.textContent || '').trim().substring(0, 60),
      href: el.href || '',
      onclick: el.getAttribute('onclick') || ''
    })).filter(l => l.text);
  });

  // Find asads.ca related items
  const asadsItems = allLinks.filter(l =>
    l.href.includes('asads') ||
    l.text.toLowerCase().includes('asads') ||
    l.text.toLowerCase() === 'manage'
  );
  console.log('asads.ca related items:', JSON.stringify(asadsItems, null, 2));

  // Find and click the Manage button for asads.ca
  const clicked = await pg.evaluate(() => {
    const allEls = Array.from(document.querySelectorAll('*'));
    // Find the asads.ca domain row
    const asadsEl = allEls.find(el => el.innerText && el.innerText.trim() === 'asads.ca' && el.tagName !== 'SCRIPT');
    if (!asadsEl) return 'asads.ca not found';

    // Find the Manage link near it
    const parent = asadsEl.closest('[class*="row"], [class*="card"], [class*="item"], li, tr, div[class]') || asadsEl.parentElement;
    if (!parent) return 'parent not found';

    const manageLink = parent.querySelector('a[href*="manage"], a') ||
      Array.from(parent.querySelectorAll('a')).find(a => a.innerText.includes('Manage'));

    if (manageLink) {
      console.log('Found manage link:', manageLink.href, manageLink.innerText);
      manageLink.click();
      return 'clicked: ' + manageLink.href;
    }

    // Also try looking at the text content
    return 'parent HTML: ' + parent.outerHTML.substring(0, 300);
  });
  console.log('Click result:', clicked);
  await sleep(3000);

  const afterClick = await pg.evaluate(() => ({
    url: window.location.href,
    text: document.body.innerText.substring(0, 500)
  }));
  console.log('After click URL:', afterClick.url);
  console.log('After click text:', afterClick.text.substring(0, 400));
  await pg.screenshot({ path: 'C:/Users/Owner/Documents/top-gta-home-inspections/scripts/hpanel-after-manage.png' });

  browser.disconnect();
}
main().catch(e => console.error('Fatal:', e.message));
