import puppeteer from 'puppeteer';
const sleep = ms => new Promise(r => setTimeout(r, ms));

async function main() {
  const browser = await puppeteer.connect({ browserURL: 'http://localhost:9222' });
  const pages = await browser.pages();
  const pg = pages[0]; // hPanel tab
  pg.setDefaultTimeout(30000);

  console.log('Current URL:', pg.url());

  // Take screenshot of current state
  await pg.screenshot({ path: 'C:/Users/Owner/Documents/top-gta-home-inspections/scripts/hpanel-state.png' });

  // Check full page text to understand what's available
  const state = await pg.evaluate(() => ({
    url: window.location.href,
    title: document.title,
    // Find any email-related links or sections
    links: Array.from(document.querySelectorAll('a[href]')).map(a => ({
      text: (a.innerText || '').substring(0, 50).trim(),
      href: a.href
    })).filter(l => l.text && l.href && !l.href.startsWith('javascript'))
      .slice(0, 30)
  }));

  console.log('URL:', state.url);
  console.log('Title:', state.title);
  console.log('Links:');
  state.links.forEach(l => console.log(' ', l.href.substring(0, 80), '|', l.text));

  // Try to navigate to hpanel email management
  console.log('\nNavigating to hPanel home...');
  await pg.goto('https://hpanel.hostinger.com', { waitUntil: 'networkidle2', timeout: 30000 });
  await sleep(2000);
  await pg.screenshot({ path: 'C:/Users/Owner/Documents/top-gta-home-inspections/scripts/hpanel-home.png' });

  const home = await pg.evaluate(() => ({
    url: window.location.href,
    text: document.body.innerText.substring(0, 800),
    links: Array.from(document.querySelectorAll('a[href]')).map(a => ({
      text: (a.innerText || '').substring(0, 60).trim(),
      href: a.href
    })).filter(l => l.text && l.href && !l.href.startsWith('javascript'))
      .filter(l => l.href.includes('hpanel') || l.href.includes('hostinger'))
      .slice(0, 30)
  }));

  console.log('\nHPanel home URL:', home.url);
  console.log('Text:', home.text.substring(0, 500));
  console.log('\nLinks:');
  home.links.forEach(l => console.log(' ', l.href.substring(0, 90), '|', l.text));

  browser.disconnect();
}
main().catch(e => console.error('Fatal:', e.message));
