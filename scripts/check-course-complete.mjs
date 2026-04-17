import puppeteer from 'puppeteer';
const sleep = ms => new Promise(r => setTimeout(r, ms));
const browser = await puppeteer.connect({ browserURL: 'http://localhost:9222', protocolTimeout: 30000 });
const pages = await browser.pages();
const pg = pages.find(p => p.url().includes('education.nachi.org')) || pages[0];

// Reload the final exam page
await pg.goto('https://education.nachi.org/show.php?course_id=2&element_id=-1&skip_seat_time=1');
await sleep(2000);

const t = await pg.evaluate(() => document.body.innerText);
console.log('Course completion page:');
console.log(t.substring(0, 1000));

// Also check the course progress overview
await pg.goto('https://education.nachi.org/courses.php');
await sleep(1500);
const t2 = await pg.evaluate(() => document.body.innerText);
const idx = t2.toLowerCase().indexOf('roof');
console.log('\nCourses overview (around "roof"):');
if (idx > -1) console.log(t2.substring(Math.max(0, idx-50), idx+400));
else console.log(t2.substring(0, 1000));

browser.disconnect();
