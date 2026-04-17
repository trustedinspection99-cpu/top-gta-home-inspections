import puppeteer from 'puppeteer';
const sleep = ms => new Promise(r => setTimeout(r, ms));
const browser = await puppeteer.connect({ browserURL: 'http://localhost:9222', protocolTimeout: 30000 });
const pages = await browser.pages();
let pg = pages[0];
await pg.goto('http://education.nachi.org/show.php?course_id=13');
await sleep(2000);
// Click continue to get into the course
await pg.evaluate(() => {
  const btn = Array.from(document.querySelectorAll('a, button')).find(b => b.innerText?.trim().toLowerCase() === 'continue');
  if (btn) btn.click();
});
await sleep(2000);
// Get all sidebar nav links
const links = await pg.evaluate(() =>
  Array.from(document.querySelectorAll('#course-nav a, .course-nav a, nav a, aside a, .sidebar a'))
    .map(a => ({ text: a.innerText?.trim(), href: a.href, id: a.getAttribute('href') }))
    .filter(a => a.text && a.text.length > 1)
);
console.log('Nav links:');
links.forEach(l => console.log(l.text, '->', l.href));

// Also get all links on page
const allLinks = await pg.evaluate(() =>
  Array.from(document.querySelectorAll('a'))
    .map(a => ({ text: a.innerText?.trim(), href: a.href }))
    .filter(a => a.href.includes('element_id') || a.href.includes('quiz') || a.href.includes('exam'))
);
console.log('\nQuiz/exam links:');
allLinks.forEach(l => console.log(l.text?.substring(0,50), '->', l.href));
browser.disconnect();
