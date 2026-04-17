import puppeteer from 'puppeteer';
const sleep = ms => new Promise(r => setTimeout(r, ms));

const browser = await puppeteer.connect({ browserURL: 'http://localhost:9222' });
const pages = await browser.pages();
const pg = pages.find(p => p.url().includes('nachi.org')) || pages[0];
await sleep(600);

// First, read current radio state
const radios = await pg.evaluate(() => {
  return Array.from(document.querySelectorAll('input[type=radio]')).map(r => {
    const l = document.querySelector('label[for="' + r.id + '"]') || r.closest('label') || r.parentElement;
    return { id: r.id, name: r.name, value: r.value, text: (l ? l.innerText : r.value).trim(), checked: r.checked };
  });
});
console.log('Current radio state:');
radios.forEach(r => console.log(`  ${r.name}: ${r.text} (${r.checked ? 'CHECKED' : 'unchecked'}) id=${r.id}`));

// Correct answers (from analysis of wrong answers):
// question10613 (Simply joining = certified?) -> False
// question10609 (Only accredited school?) -> True
// question10612 (Nationally accredited?) -> True
// question10610 (Free exam?) -> True
// question10611 (Every course from School?) -> True
// question10614 (CPI can reply?) -> Yes

const correctAnswers = {
  question10613: 'False',
  question10609: 'True',
  question10612: 'True',
  question10610: 'True',
  question10611: 'True',
  question10614: 'Yes.'
};

for (const [name, correctText] of Object.entries(correctAnswers)) {
  const radio = radios.find(r => r.name === name && r.text.toLowerCase() === correctText.toLowerCase());
  if (radio) {
    console.log(`Clicking ${name} -> "${radio.text}" (id=${radio.id})`);
    await pg.click('#' + radio.id);
    await sleep(300);
    // Verify
    const checked = await pg.evaluate((id) => { const el = document.getElementById(id); return el ? el.checked : false; }, radio.id);
    console.log(`  -> checked: ${checked}`);
  } else {
    console.log(`WARNING: No radio found for ${name} = "${correctText}"`);
  }
}

await sleep(500);

// Find and click the submit button
const submitBtns = await pg.evaluate(() => {
  return Array.from(document.querySelectorAll('input[type=submit]')).map(b => ({ value: b.value, id: b.id, name: b.name }));
});
console.log('Submit buttons:', JSON.stringify(submitBtns));

if (submitBtns.length > 0) {
  await pg.evaluate(() => {
    const btn = document.querySelector('input[type=submit]');
    if (btn) btn.click();
  });
} else {
  await pg.evaluate(() => {
    const btn = document.querySelector('button[type=submit]');
    if (btn) btn.click();
  });
}

await sleep(3000);
console.log('\nResult URL:', pg.url());
const result = await pg.evaluate(() => document.body.innerText.substring(0, 1500));
console.log(result);
await pg.screenshot({ path: 'scripts/coe-quiz-result.png' });
browser.disconnect();
