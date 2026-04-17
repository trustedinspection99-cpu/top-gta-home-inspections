import puppeteer from 'puppeteer';
const sleep = ms => new Promise(r => setTimeout(r, ms));

const browser = await puppeteer.connect({ browserURL: 'http://localhost:9222' });
const pages = await browser.pages();
const pg = pages.find(p => p.url().includes('nachi.org')) || pages[0];

// Step 1: Fill inspection details
console.log('Filling inspection details...');
await pg.evaluate(() => {
  const textInputs = Array.from(document.querySelectorAll('input[type=text]'));
  if (textInputs[0]) {
    textInputs[0].focus();
    textInputs[0].value = '142 Maple Avenue, Toronto, ON M4C 2K8';
    textInputs[0].dispatchEvent(new Event('input', {bubbles: true}));
    textInputs[0].dispatchEvent(new Event('change', {bubbles: true}));
    textInputs[0].blur();
  }
});
await sleep(2000);
await pg.evaluate(() => {
  const textInputs = Array.from(document.querySelectorAll('input[type=text]'));
  if (textInputs[1]) {
    textInputs[1].focus();
    textInputs[1].value = 'John Smith';
    textInputs[1].dispatchEvent(new Event('input', {bubbles: true}));
    textInputs[1].dispatchEvent(new Event('change', {bubbles: true}));
    textInputs[1].blur();
  }
});
await sleep(3000);

// Check for save error
let errCheck = await pg.evaluate(() => document.body.innerText.includes('error saving'));
console.log('Save error after details?', errCheck);

// Click Continue to Roof
console.log('Going to Roof...');
await pg.evaluate(() => {
  const btn = Array.from(document.querySelectorAll('a, button')).find(b => (b.innerText || '').includes('Continue to Roof'));
  if (btn) btn.click();
});
await sleep(3000);

// Function to fill one radio item and wait for save
async function selectOption(questionIndex, optionText) {
  const result = await pg.evaluate((qIdx, optText) => {
    const radios = Array.from(document.querySelectorAll('input[type=radio]'));
    // Group by name
    const groups = {};
    for (const r of radios) {
      if (!groups[r.name]) groups[r.name] = [];
      groups[r.name].push(r);
    }
    const names = Object.keys(groups);
    if (qIdx >= names.length) return { error: 'index out of range', total: names.length };
    const name = names[qIdx];
    const opts = groups[name];
    const target = opts.find(o => {
      const l = document.querySelector('label[for="' + o.id + '"]') || o.parentElement;
      const text = (l ? l.innerText : o.value).trim().toLowerCase();
      return text.includes(optText.toLowerCase());
    }) || opts[0];
    if (target) {
      target.click();
      const l = document.querySelector('label[for="' + target.id + '"]') || target.parentElement;
      return { clicked: (l ? l.innerText : target.value).trim(), name };
    }
    return { error: 'no target', name };
  }, questionIndex, optionText);
  return result;
}

// Function to fill all radios in current section with "No Defect(s) Observed"
async function fillSection(sectionName) {
  console.log(`\nFilling: ${sectionName}`);
  const count = await pg.evaluate(() => {
    const groups = {};
    for (const r of document.querySelectorAll('input[type=radio]')) {
      if (!groups[r.name]) groups[r.name] = [];
      groups[r.name].push(r);
    }
    return Object.keys(groups).length;
  });
  console.log(`  ${count} items`);

  for (let i = 0; i < count; i++) {
    const res = await selectOption(i, 'No Defect');
    console.log(`  [${i}] ${res.clicked || res.error}`);
    await sleep(2500); // Wait for autosave
    const hasError = await pg.evaluate(() => document.body.innerText.includes('error saving'));
    if (hasError) {
      console.log('  !! Save error, waiting 5s...');
      await sleep(5000);
    }
  }
}

// Navigate through sections
const sections = ['Roof', 'Exterior', 'Basement', 'Heating', 'Cooling', 'Plumbing', 'Electrical', 'Fireplace', 'Attic', 'Doors'];

for (const section of sections) {
  const currentText = await pg.evaluate(() => document.body.innerText.substring(0, 100));
  console.log('\nCurrent section:', currentText.split('\n')[0]);

  await fillSection(section);
  await sleep(1000);

  // Click Continue
  const btnText = await pg.evaluate(() => {
    const btn = Array.from(document.querySelectorAll('a, button')).find(b => (b.innerText || '').match(/Continue to|Submit/i));
    if (btn) { btn.click(); return btn.innerText.trim(); }
    return null;
  });
  console.log('Continue clicked:', btnText);
  await sleep(3000);
}

await pg.screenshot({ path: 'scripts/mock-final.png', fullPage: false });
const finalText = await pg.evaluate(() => document.body.innerText.substring(0, 800));
console.log('\nFinal URL:', pg.url());
console.log(finalText.substring(0, 400));
browser.disconnect();
