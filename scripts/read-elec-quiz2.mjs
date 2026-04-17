import puppeteer from 'puppeteer';
const sleep = ms => new Promise(r => setTimeout(r, ms));
const browser = await puppeteer.connect({ browserURL: 'http://localhost:9222', protocolTimeout: 30000 });
const pages = await browser.pages();
let pg = pages[0];
// It already loaded the retake - just read current state
const questions = await pg.evaluate(() => {
  const radios = Array.from(document.querySelectorAll('input[type=radio]'));
  const groups = {};
  radios.forEach(r => {
    if (!groups[r.name]) groups[r.name] = { name: r.name, options: [] };
    const lbl = document.querySelector('label[for="' + r.id + '"]') || r.parentElement;
    groups[r.name].options.push(lbl?.innerText?.trim() || r.value);
  });
  return Object.values(groups).map(g => ({ name: g.name, options: g.options }));
});

// Also get body text to see questions
const bodyText = await pg.evaluate(() => document.body.innerText.substring(0, 4000));
console.log(bodyText);
console.log('\n--- GROUPS ---');
questions.forEach((q, i) => console.log(`[${q.name}]: ${q.options.join(' | ')}`));
browser.disconnect();
