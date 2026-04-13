import puppeteer from 'puppeteer';
const sleep = ms => new Promise(r => setTimeout(r, ms));

async function main() {
  const browser = await puppeteer.connect({ browserURL: 'http://localhost:9222' });
  const pages = await browser.pages();
  const pg = pages[0];
  pg.setDefaultTimeout(30000);

  // Go to hPanel home and find asads.ca email setup
  await pg.goto('https://hpanel.hostinger.com', { waitUntil: 'networkidle2', timeout: 30000 });
  await sleep(2000);

  // Look for asads.ca "Set up email" link
  const emailLink = await pg.evaluate(() => {
    const links = Array.from(document.querySelectorAll('a[href]'));
    return links.map(a => ({ text: (a.innerText || '').trim(), href: a.href }))
      .filter(l => l.href.includes('email') || l.text.toLowerCase().includes('email'))
      .slice(0, 20);
  });
  console.log('Email links:', JSON.stringify(emailLink, null, 2));

  // Navigate to domains page to find email access for asads.ca
  console.log('\nGoing to domains page...');
  await pg.goto('https://hpanel.hostinger.com/domains', { waitUntil: 'networkidle2', timeout: 30000 });
  await sleep(2000);
  await pg.screenshot({ path: 'C:/Users/Owner/Documents/top-gta-home-inspections/scripts/hpanel-domains.png' });

  const domainsState = await pg.evaluate(() => ({
    url: window.location.href,
    text: document.body.innerText.substring(0, 800),
    links: Array.from(document.querySelectorAll('a[href]')).map(a => ({
      text: (a.innerText || '').trim().substring(0, 60),
      href: a.href
    })).filter(l => l.text && l.href.includes('hpanel')).slice(0, 30)
  }));
  console.log('Domains page text:', domainsState.text.substring(0, 500));

  // Try clicking on asads.ca
  console.log('\nLooking for asads.ca management...');
  await pg.goto('https://hpanel.hostinger.com/domains/asads.ca/overview', { waitUntil: 'networkidle2', timeout: 30000 });
  await sleep(2000);
  await pg.screenshot({ path: 'C:/Users/Owner/Documents/top-gta-home-inspections/scripts/hpanel-asads-domain.png' });

  const domainState = await pg.evaluate(() => ({
    url: window.location.href,
    text: document.body.innerText.substring(0, 600),
    links: Array.from(document.querySelectorAll('a[href]')).map(a => ({
      text: (a.innerText || '').trim().substring(0, 60),
      href: a.href
    })).filter(l => l.text && l.href.includes('hpanel')).slice(0, 20)
  }));
  console.log('asads.ca domain URL:', domainState.url);
  console.log('Text:', domainState.text);

  browser.disconnect();
}
main().catch(e => console.error('Fatal:', e.message));
