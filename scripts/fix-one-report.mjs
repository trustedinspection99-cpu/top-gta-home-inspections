import puppeteer from 'puppeteer';
const sleep = ms => new Promise(r => setTimeout(r, ms));

const browser = await puppeteer.connect({ browserURL: 'http://localhost:9222', protocolTimeout: 60000 });
const pages = await browser.pages();
const pg = pages.find(p => p.url().includes('nachi.org')) || pages[0];

// Fast type using keyboard (delay:0 = as fast as possible, still triggers React events)
async function fastType(selector, text) {
  await pg.focus(selector);
  // Select all existing text
  await pg.keyboard.down('Control');
  await pg.keyboard.press('a');
  await pg.keyboard.up('Control');
  await sleep(50);
  await pg.keyboard.type(text, { delay: 0 });
  await sleep(100);
}

// Fill all textareas in current section using index-based approach (no stale handles)
async function fillTextareas(texts) {
  const count = await pg.evaluate(() => document.querySelectorAll('textarea').length);
  for (let i = 0; i < count; i++) {
    const txt = texts[Math.min(i, texts.length - 1)];
    await pg.evaluate((idx) => {
      const ta = document.querySelectorAll('textarea')[idx];
      if (ta) ta.focus();
    }, i);
    await sleep(50);
    await pg.keyboard.down('Control');
    await pg.keyboard.press('a');
    await pg.keyboard.up('Control');
    await sleep(30);
    await pg.keyboard.type(txt, { delay: 0 });
    await sleep(80);
  }
  // Click No Defect radios and Yes/No questions
  await pg.evaluate(() => {
    for (const item of document.querySelectorAll('div.rounded.border')) {
      const radios = Array.from(item.querySelectorAll('input[type=radio]'));
      if (radios.length && !radios.some(r => r.checked)) {
        const noDefect = Array.from(item.querySelectorAll('label')).find(l => l.innerText.toLowerCase().includes('no defect'));
        if (noDefect) noDefect.click();
      }
    }
    Array.from(document.querySelectorAll('label'))
      .filter(l => l.innerText.trim().toLowerCase().includes('no / not applicable'))
      .forEach(l => { const r = l.querySelector('input[type=radio]'); if (r && !r.checked) l.click(); });
  });
}

const sections = [
  { name: 'Inspection Details', isDetails: true },
  { name: 'Roof', texts: ['North slope shingles show crimping and curling. Damaged flashing at one penetration. Two damaged eavestrough corners. One loose bluestone on chimney.', 'Asphalt shingles approximately 10-15 years old. Gable style roof. Masonry chimney.', 'Roofing contractor to evaluate north slope and repair flashing. Mason to secure loose chimney stone immediately.'] },
  { name: 'Exterior', texts: ['One brick with visible cracking and spalling NW elevation, missing mortar. Downspouts discharge at foundation. Raised patio stones in side yard.', 'Brick veneer with vinyl trim. Concrete driveway normal wear. Grading slopes away from foundation.', 'Mason to repair cracked brick and repoint mortar. Install downspout extensions minimum 6 feet from foundation.'] },
  { name: 'Basement', texts: ['Sump pump present, not tested. Mold-like growth observed near sump pump. Basement fully finished, foundation walls not visible.', 'Poured concrete foundation, not visible. Basement dry at time of inspection.', 'Plumber to test sump pump. Environmental consultant to assess mold-like growth near sump pump.'] },
  { name: 'Heating', texts: ['Carrier gas furnace, older model. Blower motor dirty. Filter dirty, needs replacement. Ductwork heavily soiled throughout.', 'Natural gas. Forced air furnace. Thermostat on main floor hallway.', 'HVAC technician to service furnace and clean blower. Replace filter immediately. Professional duct cleaning recommended.'] },
  { name: 'Cooling', texts: ['Carrier central AC, newer model. Unit NOT operated, outdoor temperature below safe threshold.', 'Electric. Central split system Carrier brand. Outdoor condenser on concrete pad at rear.', 'Test AC unit when outdoor temperatures are appropriate above 15 degrees Celsius.'] },
  { name: 'Plumbing', texts: ['Main floor toilet not flushing properly. Reliance 50-gallon gas water heater, no leaks. No active leaks at supply or drain lines.', 'Municipal water supply. Copper supply lines. ABS drain lines. Main shut-off in basement.', 'Plumber to evaluate and repair main floor toilet. All other plumbing satisfactory.'] },
  { name: 'Electrical', texts: ['200-amp service. Circuits not labeled. No CO alarms, gas appliances present. Exterior light fixture damaged, wiring exposed. GFCI absent in all three bathrooms.', 'Copper wiring throughout. 200-amp overhead service.', 'IMMEDIATE: Install CO alarms on every level. Electrician to repair exposed wiring. Install GFCI in all bathrooms. Label all circuits.'] },
  { name: 'Fireplace', texts: ['Wood-burning masonry fireplace. Creosote buildup in firebox and visible flue. Firebox masonry intact. Clearances satisfactory.', 'Wood-burning masonry fireplace, living room main floor.', 'WETT-certified technician to inspect and clean fireplace and chimney flue prior to use.'] },
  { name: 'Attic', texts: ['Potential asbestos-containing material near attic access. Attic not entered for safety. Soffit and ridge vents adequate from exterior.', 'Attic not entered due to potential asbestos. Soffit and ridge vent system.', 'Environmental consultant to assess potential asbestos before any attic work.'] },
  { name: 'Doors', texts: ['Five bedrooms inspected, walls ceilings floors satisfactory. Stairway railings stable. Windows and doors operating properly. Bathroom mirror on second floor damaged.', 'Double-pane insulated windows. Solid wood interior doors. Vinyl exterior doors.', 'Replace damaged bathroom mirror. All other interior finishes satisfactory at time of inspection.'] },
];

// Open the report
await pg.goto('https://www.nachi.org/my/mock-inspections/355122/edit');
await sleep(2000);
console.log('Report 355122 open');

for (const section of sections) {
  console.log('\nSection:', section.name);

  if (section.isDetails) {
    // Fill address and owner by typing
    const inputs = await pg.$$('input[type=text]');
    if (inputs[0]) {
      await inputs[0].click({ clickCount: 3 });
      await pg.keyboard.type('45 Duckworth Rd, Cambridge ON N3H 0C1', { delay: 10 });
      await pg.keyboard.press('Escape'); // dismiss autocomplete
      await sleep(200);
    }
    if (inputs[1]) {
      await inputs[1].click({ clickCount: 3 });
      await pg.keyboard.type('Sarah Mitchell', { delay: 10 });
      await pg.keyboard.press('Escape');
      await sleep(200);
    }
    console.log('  Address and owner typed');
  } else {
    await fillTextareas(section.texts);
    // Verify textareas are filled
    const filled = await pg.evaluate(() =>
      Array.from(document.querySelectorAll('textarea')).filter(t => t.value.length > 0).length
    );
    console.log(`  Filled ${filled} textareas`);
  }

  // Click Continue to save
  await pg.evaluate(() => {
    const btn = Array.from(document.querySelectorAll('button')).find(b => b.innerText.includes('Continue'));
    if (btn) btn.click();
  });
  await sleep(2500);

  const next = await pg.evaluate(() => document.querySelector('h2')?.innerText?.split('\n')[0]?.trim());
  console.log('  Saved -> now on:', next);
}

// Check nav for Complete status
const nav = await pg.evaluate(() => {
  return document.body.innerText.match(/Inspection Details[\s\S]*?Menu/)?.[0] || '';
});
console.log('\nNav status:\n', nav.substring(0, 300));

// Click Complete Report
const clicked = await pg.evaluate(() => {
  const btn = Array.from(document.querySelectorAll('button, a')).find(b => b.innerText.trim() === 'Complete Report');
  if (btn) { btn.click(); return true; }
  return false;
});
await sleep(2000);
const result = await pg.evaluate(() => document.body.innerText.substring(0, 200));
console.log('\nComplete clicked:', clicked);
console.log('Result:', result.includes('marked this report') ? 'SUCCESS!' : result.replace(/\n/g,' ').substring(0,120));

browser.disconnect();
