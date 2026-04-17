import puppeteer from 'puppeteer';
const sleep = ms => new Promise(r => setTimeout(r, ms));

const browser = await puppeteer.connect({ browserURL: 'http://localhost:9222' });
const pages = await browser.pages();
const pg = pages.find(p => p.url().includes('nachi.org')) || pages[0];

await pg.evaluate(() => window.scrollTo(0, 0));
await sleep(300);

const section = await pg.evaluate(() => {
  const h = document.querySelector('h2');
  return h ? h.innerText.split('\n')[0].trim() : '';
});
console.log('Section:', section);

// Real observations from 45 Duckworth Rd inspection report
const sectionTexts = {
  'Roof': [
    'Asphalt shingles inspected from ground level and accessible locations. North slope shingles show crimping and curling. Damaged flashing at one penetration. Exposed unsealed nail holes at roof deck. Two damaged eavestrough corners at SW and NW corners. One loose bluestone observed on chimney, unsecured.',
    'Asphalt shingles approximately 10-15 years old. Gable style roof. Masonry chimney.',
    'Recommend roofing contractor evaluate north slope shingle deterioration and repair damaged flashing. Seal exposed nail holes. Repair damaged gutter corners. Immediate referral to mason to secure loose chimney stone.',
  ],
  'Exterior': [
    'Brick veneer exterior. One brick with visible cracking and spalling on NW elevation, missing mortar around affected brick. Downspouts discharge immediately adjacent to foundation. Raised and uneven patio stones in side yard walkway.',
    'Brick veneer with vinyl trim. Concrete driveway with normal wear. Ground grading slopes away from foundation at inspected locations.',
    'Recommend mason evaluate and repair cracked brick and repoint mortar. Install downspout extensions to direct water minimum 6 feet from foundation. Reset raised patio stones.',
  ],
  'Basement': [
    'Basement fully finished, foundation walls not visible. Sump pump observed in basement utility area, not tested at time of inspection. Mold-like growth observed near sump pump. No visible active water infiltration at inspected floor areas.',
    'Poured concrete foundation, not visible due to finished basement. Basement dry at time of inspection.',
    'Recommend plumber test and service sump pump. Environmental consultant to assess mold-like growth. Monitor for future signs of water infiltration.',
  ],
  'Heating': [
    'Carrier gas furnace in basement utility room, older model. Blower motor compartment dirty with accumulated dust. Furnace filter dirty, needs replacement. Duct system heavily soiled throughout. Gas supply observed, no leaks at accessible connections.',
    'Natural gas. Forced air furnace. Thermostat on main floor hallway near staircase.',
    'Recommend HVAC technician service furnace and clean blower motor. Replace furnace filter immediately. Professional duct cleaning prior to occupancy.',
  ],
  'Cooling': [
    'Carrier central air conditioning unit, newer model, good general condition. Unit NOT operated during inspection, outdoor temperature below minimum safe operating threshold. Cold weather compressor damage risk prevents testing.',
    'Electric. Central split system, Carrier brand. Outdoor condenser unit on concrete pad at rear of home.',
    'Recommend testing AC unit when outdoor temperatures are appropriate (above 15C). Unit appeared in good condition visually at time of inspection.',
  ],
  'Plumbing': [
    'Main floor toilet not flushing properly at time of inspection. Reliance 50-gallon gas water heater, no visible leaks or corrosion. Main water shut-off located in basement. Visible supply and drain lines inspected, no active leaks. Bathroom shut-off valves accessible. Kitchen faucet and fixtures functioning properly.',
    'Municipal water supply. Copper supply lines. ABS drain and waste lines. 3/4 inch main shut-off valve in basement utility room.',
    'Recommend plumber evaluate and repair main floor toilet flush mechanism. All other plumbing satisfactory at time of inspection.',
  ],
  'Electrical': [
    '200-amp overhead electrical service. Circuit breaker panel in basement, no tripped breakers or double-tapping. Circuits not properly labeled throughout. No carbon monoxide alarms observed anywhere in home, gas appliances present. Exterior front light fixture has damaged housing with exposed unsecured wiring. GFCI absent in all three bathrooms. Kitchen GFCI confirmed functioning. Smoke alarm coverage insufficient.',
    'Copper wiring throughout. 200-amp overhead service appropriate for home size.',
    'IMMEDIATE: Install CO alarms on every level. IMMEDIATE: Electrician repair exposed exterior wiring. Install GFCI in all bathrooms. Label all circuit breakers. Add smoke alarms per Ontario fire code.',
  ],
  'Fireplace': [
    'Wood-burning masonry fireplace on main floor. Creosote buildup observed in firebox and visible flue area. Firebox masonry generally intact at accessible areas. Clearances around fireplace appear satisfactory.',
    'Wood-burning masonry fireplace. Living room, main floor.',
    'Recommend WETT-certified technician inspect and clean fireplace and chimney flue prior to use. Do not use fireplace until inspected and cleaned.',
  ],
  'Attic': [
    'Potential asbestos-containing material observed near attic access point. Attic was not entered for safety reasons. Soffit and ridge vents observed from exterior, ventilation design appears adequate.',
    'Attic not entered due to potential asbestos. Blown-in insulation suspected, not confirmed. Soffit and ridge vent system.',
    'Recommend environmental consultant assess potential asbestos near attic access prior to any attic work. Once cleared, confirm insulation R-value and ventilation adequacy.',
  ],
  'Doors': [
    'Five bedrooms inspected, walls ceilings floors in satisfactory condition. Stairway railings and guards stable, no damage. Representative windows and doors tested, opening and closing properly. Bathroom mirror on second floor damaged. Interior walls ceilings floors inspected, no significant deficiencies beyond noted items.',
    'Double-pane insulated glass windows throughout. Solid wood interior doors. Vinyl exterior doors with weatherstripping.',
    'Replace damaged bathroom mirror. All other interior finishes satisfactory at time of inspection.',
  ],
};

// Match current section
let texts = [
  'Inspected and found in satisfactory condition at time of inspection. No significant deficiencies observed at inspected areas.',
  'Standard residential construction.',
  'No immediate action required. Monitor and maintain as part of regular home maintenance.',
];
for (const [key, vals] of Object.entries(sectionTexts)) {
  if (section.toLowerCase().includes(key.toLowerCase())) {
    texts = vals;
    break;
  }
}

const result = await pg.evaluate((descTexts) => {
  const log = [];

  // 1. Inspect radios - click No Defect for items with no selection
  const inspectItems = Array.from(document.querySelectorAll('div.rounded.border'));
  for (const item of inspectItems) {
    const radios = Array.from(item.querySelectorAll('input[type=radio]'));
    const anyChecked = radios.filter(r => r.checked).length > 0;
    if (!anyChecked) {
      const labels = Array.from(item.querySelectorAll('label'));
      const noDefect = labels.find(l => l.innerText.toLowerCase().includes('no defect'));
      if (noDefect) { noDefect.click(); log.push('Inspect: No Defect'); }
    }
  }

  // 2. Textareas - fill empty ones using React native setter
  const nativeSetter = Object.getOwnPropertyDescriptor(window.HTMLTextAreaElement.prototype, 'value').set;
  const tas = Array.from(document.querySelectorAll('textarea'));
  tas.forEach((ta, i) => {
    if (ta.value === '') {
      const txt = descTexts[i] || descTexts[descTexts.length - 1];
      nativeSetter.call(ta, txt);
      ta.dispatchEvent(new Event('input', { bubbles: true }));
      ta.dispatchEvent(new Event('change', { bubbles: true }));
      log.push('Text: ' + txt.substring(0, 70) + '...');
    }
  });

  // 3. Yes/No report questions - click No / Not applicable
  const allLabels = Array.from(document.querySelectorAll('label'));
  const noLabels = allLabels.filter(l => l.innerText.trim().toLowerCase().includes('no / not applicable'));
  noLabels.forEach(l => {
    const radio = l.querySelector('input[type=radio]');
    if (radio && !radio.checked) {
      l.click();
      log.push('Report: No/Not applicable');
    }
  });

  return log;
}, texts);

console.log('Actions:', result.length);
result.forEach(l => console.log(' ', l));
await pg.screenshot({ path: 'scripts/section-filled.png', fullPage: false });
browser.disconnect();
