import puppeteer from 'puppeteer';
const sleep = ms => new Promise(r => setTimeout(r, ms));

const browser = await puppeteer.connect({ browserURL: 'http://localhost:9222', protocolTimeout: 30000 });
const pages = await browser.pages();
const pg = pages.find(p => p.url().includes('education.nachi.org')) || pages[0];

// Correct answers in order of questions — UPDATE FOR EACH QUIZ
const correctAnswers = ['3', '2', 'spalling', 're-pointing', 'a chimney cap protects the structure, and a rain cap protects the inside of the flue', 'False', '2', 'rain cap', 'thimble', 'False'];

const result = await pg.evaluate((answers) => {
  const log = [];
  const allRadios = Array.from(document.querySelectorAll('input[type=radio]'));

  // Group by name
  const groups = {};
  allRadios.forEach(r => {
    if (!groups[r.name]) groups[r.name] = [];
    const lbl = document.querySelector('label[for="' + r.id + '"]') || r.parentElement;
    groups[r.name].push({ radio: r, label: lbl?.innerText?.trim() || r.value });
  });

  const groupNames = Object.keys(groups);
  groupNames.forEach((name, i) => {
    const answer = answers[i];
    const options = groups[name];
    const match = options.find(o => o.label?.toLowerCase().trim() === answer?.toLowerCase().trim());
    if (match) {
      match.radio.click();
      log.push('Q' + (i+1) + ': ' + answer + ' ✓');
    } else {
      log.push('Q' + (i+1) + ': No match for "' + answer + '" in [' + options.map(o=>o.label).join(', ') + ']');
    }
  });
  return log;
}, correctAnswers);

console.log(result.join('\n'));
await sleep(500);

// Find and click submit button
const submitted = await pg.evaluate(() => {
  const btn = Array.from(document.querySelectorAll('input[type=submit], button')).find(b =>
    b.value?.toLowerCase().includes('submit') || b.innerText?.toLowerCase().includes('submit') ||
    b.value?.toLowerCase().includes('grade') || b.innerText?.toLowerCase().includes('grade') ||
    b.value?.toLowerCase().includes('next') || b.innerText?.toLowerCase().includes('next')
  );
  if (btn) { btn.click(); return btn.value || btn.innerText; }
  return null;
});
console.log('Submit clicked:', submitted);
await sleep(3000);

await pg.screenshot({ path: 'scripts/screen.png', fullPage: false });
const text = await pg.evaluate(() => document.body.innerText.substring(0, 500));
console.log('\nResult:', text);

browser.disconnect();
