import puppeteer from 'puppeteer';
const sleep = ms => new Promise(r => setTimeout(r, ms));
const browser = await puppeteer.connect({ browserURL: 'http://localhost:9222', protocolTimeout: 30000 });
const pages = await browser.pages();
let pg = pages.find(p => p.url().includes('nachi.org')) || pages[0];

const coursePages = [
  ['Electrical', 'https://www.nachi.org/electricalcoursereleased2006.htm'],
  ['Structural', 'https://www.nachi.org/structuralcoursereleased2007.htm'],
  ['SafePractices', 'https://www.nachi.org/safety_course.htm'],
  ['Plumbing', 'https://www.nachi.org/plumbingcoursereleased2008.htm'],
  ['25Standards', 'https://www.nachi.org/25standardscourse.htm'],
  ['Moisture', 'https://www.nachi.org/moisturecourse.htm'],
  ['Deck', 'https://www.nachi.org/deck-inspections-course.htm'],
  ['Exterior', 'https://www.nachi.org/exteriorcourse.htm'],
  ['HVAC', 'https://www.nachi.org/hvaccourse.htm'],
  ['Attic', 'https://www.nachi.org/interiorcourse.htm'],
  ['Fireplaces', 'https://www.nachi.org/inspect-fireplace-stove-chimney-course.htm'],
];

for (const [name, url] of coursePages) {
  await pg.goto(url);
  await sleep(1500);
  const links = await pg.evaluate(() =>
    Array.from(document.querySelectorAll('a')).map(a => ({ text: a.innerText?.trim().substring(0,50), href: a.href }))
    .filter(a => a.href.includes('education.nachi.org'))
  );
  console.log(name + ':', links.length ? links[0].href : 'NOT FOUND');
}
browser.disconnect();
