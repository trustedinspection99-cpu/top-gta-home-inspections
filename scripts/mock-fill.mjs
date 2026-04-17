import puppeteer from 'puppeteer';
const sleep = ms => new Promise(r => setTimeout(r, ms));

const browser = await puppeteer.connect({ browserURL: 'http://localhost:9222' });
const pages = await browser.pages();
const pg = pages.find(p => p.url().includes('nachi.org')) || pages[0];

async function fillCurrentSection() {
  const radios = await pg.evaluate(() => {
    return Array.from(document.querySelectorAll('input[type=radio]')).map(r => {
      const l = document.querySelector('label[for="' + r.id + '"]') || r.parentElement;
      return { id: r.id, name: r.name, value: r.value, text: (l ? l.innerText : r.value).trim().substring(0, 50) };
    });
  });

  // Group by name
  const groups = {};
  for (const r of radios) {
    if (!groups[r.name]) groups[r.name] = [];
    groups[r.name].push(r);
  }

  console.log(`Found ${Object.keys(groups).length} items to fill`);

  for (const [name, opts] of Object.entries(groups)) {
    // Pick "No Defect(s) Observed" or first "Inspected" option
    const target = opts.find(o => o.text.toLowerCase().includes('no defect')) ||
                   opts.find(o => o.text.toLowerCase().includes('inspected')) ||
                   opts[0];
    if (target) {
      console.log(`  ${name}: "${target.text}"`);
      if (target.id) {
        await pg.click('#' + target.id);
      } else {
        // click by value/name
        await pg.evaluate((n, v) => {
          const el = document.querySelector('input[type=radio][name="' + n + '"][value="' + v + '"]') ||
                     Array.from(document.querySelectorAll('input[type=radio]')).find(r => r.name === n && r.value === v);
          if (el) el.click();
        }, name, target.value);
      }
      await sleep(150);
    }
  }
}

async function clickContinue() {
  const clicked = await pg.evaluate(() => {
    const btn = Array.from(document.querySelectorAll('a, button')).find(b =>
      (b.innerText || '').match(/Continue to|Save|Submit/i)
    );
    if (btn) { console.log('Clicking:', btn.innerText); btn.click(); return btn.innerText; }
    return null;
  });
  console.log('Clicked:', clicked);
  await sleep(2000);
}

async function getSection() {
  return await pg.evaluate(() => {
    const h = document.querySelector('h1, h2, h3');
    return h ? h.innerText.trim() : document.body.innerText.substring(0, 100);
  });
}

// First go back to fill inspection details
await pg.evaluate(() => {
  const link = Array.from(document.querySelectorAll('a')).find(a => a.innerText.includes('Inspection Details'));
  if (link) link.click();
});
await sleep(1500);

// Fill address and owner
await pg.evaluate(() => {
  const textInputs = Array.from(document.querySelectorAll('input[type=text]'));
  if (textInputs[0] && !textInputs[0].value) {
    textInputs[0].value = '142 Maple Avenue, Toronto, ON M4C 2K8';
    textInputs[0].dispatchEvent(new Event('input', {bubbles: true}));
    textInputs[0].dispatchEvent(new Event('change', {bubbles: true}));
  }
  if (textInputs[1] && !textInputs[1].value) {
    textInputs[1].value = 'John Smith';
    textInputs[1].dispatchEvent(new Event('input', {bubbles: true}));
    textInputs[1].dispatchEvent(new Event('change', {bubbles: true}));
  }
});
await sleep(500);
console.log('Filled inspection details');

// Click Continue to Roof
await pg.evaluate(() => {
  const btn = Array.from(document.querySelectorAll('a, button')).find(b => (b.innerText || '').includes('Continue to Roof'));
  if (btn) btn.click();
});
await sleep(2000);

// Loop through all sections
const maxSections = 15;
let sectionCount = 0;

while (sectionCount < maxSections) {
  const section = await getSection();
  console.log(`\n=== Section: ${section} ===`);

  const bodyText = await pg.evaluate(() => document.body.innerText.substring(0, 200));
  if (bodyText.toLowerCase().includes('congratul') || bodyText.toLowerCase().includes('submitted') || bodyText.toLowerCase().includes('complete')) {
    console.log('DONE!', bodyText);
    break;
  }

  await fillCurrentSection();
  await sleep(500);
  await clickContinue();
  sectionCount++;
}

await pg.screenshot({ path: 'scripts/mock-done.png', fullPage: false });
const finalText = await pg.evaluate(() => document.body.innerText.substring(0, 800));
console.log('\nFinal URL:', pg.url());
console.log(finalText);
browser.disconnect();
