import puppeteer from 'puppeteer';
const sleep = ms => new Promise(r => setTimeout(r, ms));
const browser = await puppeteer.connect({ browserURL: 'http://localhost:9222', protocolTimeout: 30000 });
const pages = await browser.pages();
let pg = pages[0];
await pg.goto('https://education.nachi.org/show.php?course_id=13&element_id=200');
await sleep(2000);

const correctAnswers = [
  'the water pressure',
  'not exceed',
  'ungrounded conductor',
  'American Wire Gauge',
  'any of these conditions',
  '30',
  'none of these',
  '15',
  'electric service panelboard',
];

const result = await pg.evaluate((answers) => {
  const radios = Array.from(document.querySelectorAll('input[type=radio]'));
  const groups = {};
  radios.forEach(r => {
    if (!groups[r.name]) groups[r.name] = [];
    groups[r.name].push(r);
  });
  const names = Object.keys(groups);
  const log = [];
  names.forEach((name, i) => {
    const ans = answers[i];
    if (!ans) return;
    const match = groups[name].find(r => {
      const lbl = document.querySelector('label[for="' + r.id + '"]') || r.parentElement;
      const txt = (lbl?.innerText?.trim() || r.value).toLowerCase();
      return txt === ans.toLowerCase();
    });
    if (match) { match.click(); log.push('✓ Q' + (i+1) + ': ' + ans); }
    else log.push('✗ Q' + (i+1) + ': no match for "' + ans + '" in: ' + groups[name].map(r => {
      const lbl = document.querySelector('label[for="' + r.id + '"]') || r.parentElement;
      return lbl?.innerText?.trim() || r.value;
    }).join(' | '));
  });
  return log;
}, correctAnswers);

result.forEach(r => console.log(r));

await sleep(500);
const submitted = await pg.evaluate(() => {
  const btn = Array.from(document.querySelectorAll('input[type=submit], button')).find(b =>
    (b.value||b.innerText||'').toLowerCase().match(/submit|grade|next/));
  if (btn) { btn.click(); return btn.value || btn.innerText; }
  return null;
});
console.log('Submitted:', submitted);
await sleep(3000);
const final = await pg.evaluate(() => document.body.innerText.substring(0, 1000));
console.log('\nResult:', final);
browser.disconnect();
