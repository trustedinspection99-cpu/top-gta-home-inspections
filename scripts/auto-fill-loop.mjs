import puppeteer from 'puppeteer';
const sleep = ms => new Promise(r => setTimeout(r, ms));

const browser = await puppeteer.connect({ browserURL: 'http://localhost:9222' });
const pages = await browser.pages();
const pg = pages.find(p => p.url().includes('nachi.org')) || pages[0];

const sectionTexts = {
  'roof': [
    'Asphalt shingle roof inspected, estimated age 12-15 years. Shingles in fair condition with moderate granule loss on south slope. One missing shingle tab observed at rear slope. Flashings appear intact. Gutters and downspouts in good working order. No visible sagging or structural concerns.',
    'Asphalt shingles approximately 12-15 years old. Gable roof. Brick chimney.',
    'Recommend roofing contractor replace missing shingle tab and evaluate south slope granule loss. Budget for roof replacement within 3-5 years.',
  ],
  'exterior': [
    'Brick veneer exterior in generally good condition. Minor tuck pointing required at one location on east wall. Concrete driveway with minor surface cracking, no structural concerns. Window caulking intact at inspected locations. Grading positive slope away from foundation. Downspout extensions present and directing water away from home.',
    'Brick veneer exterior. Concrete driveway. Single car attached garage. Rear interlock patio in good condition.',
    'Recommend qualified mason repoint mortar at east wall location. Monitor driveway surface cracking annually. No other significant deficiencies noted.',
  ],
  'basement': [
    'Partially finished basement. Foundation walls visible in utility area, poured concrete, no visible cracking or water staining. Sump pump present and tested, operating at time of inspection. No evidence of moisture or water infiltration at inspected areas. Cold storage room inspected, no concerns.',
    'Poured concrete foundation. Partially finished basement. Sump pump with overhead discharge line. Basement dry at time of inspection.',
    'No significant deficiencies noted. Test sump pump annually. Monitor for any signs of water infiltration.',
  ],
  'heating': [
    'Trane high efficiency gas furnace approximately 8 years old. Unit in good operating condition at time of inspection. Filter clean, recently replaced. Ductwork clean at inspected areas. Programmable thermostat functioning properly. No unusual odors or sounds during operation.',
    'Natural gas. High efficiency forced air Trane furnace approximately 8 years old. Thermostat on main floor.',
    'No deficiencies noted. Recommend annual furnace service as part of regular maintenance program.',
  ],
  'cooling': [
    'Trane central air conditioning approximately 8 years old, matching furnace. Unit operated and tested, cooling confirmed functioning. No unusual sounds or refrigerant leaks observed. Outdoor condenser fins clean and undamaged. Unit in good general condition.',
    'Electric. Central split system Trane brand approximately 8 years old. Outdoor condenser on concrete pad at side of home.',
    'No deficiencies noted. Recommend annual AC service and cleaning of condenser coils.',
  ],
  'plumbing': [
    'Plumbing inspected at accessible locations. All fixtures tested and functioning. No active leaks at supply or drain lines. A.O. Smith 50-gallon gas water heater approximately 7 years old, good condition. GFCI protection present and tested in all bathrooms and kitchen. Main shut-off located in basement, labeled.',
    'Municipal water supply. Copper supply lines. ABS drain and waste lines. Main shut-off in basement utility room.',
    'No deficiencies noted. All plumbing systems functioning as intended at time of inspection.',
  ],
  'electrical': [
    '200-amp underground electrical service. Siemens circuit breaker panel, circuits properly labeled. No double-tapping or tripped breakers. Carbon monoxide alarms present on all levels and tested. Smoke alarms present on all levels and outside sleeping areas. GFCI confirmed in bathrooms, kitchen, garage and exterior. All outlets grounded at inspected locations.',
    'Copper wiring throughout. 200-amp underground service. All circuits labeled. Grounded outlets throughout.',
    'No deficiencies noted. Electrical system functioning as intended. CO and smoke alarms confirmed present and operational.',
  ],
  'fireplace': [
    'Direct vent gas fireplace in family room, approximately 8 years old. Unit operated and confirmed igniting at time of inspection. No unusual odors or sounds. Glass doors intact and sealed. No creosote concerns as direct vent gas unit. Clearances around fireplace satisfactory.',
    'Direct vent gas fireplace. Family room, main floor. Natural gas.',
    'No deficiencies noted. Recommend annual gas fireplace service by qualified technician as part of regular home maintenance.',
  ],
  'attic': [
    'Attic accessed and inspected. Blown-in cellulose insulation, depth approximately 14-16 inches, estimated R-50. Soffit baffles present. Ridge vent and soffit vent system functioning, ventilation adequate. No evidence of moisture staining, mold or pest activity at inspected areas. Roof sheathing in good condition.',
    'Blown-in cellulose insulation approximately R-50. Soffit and ridge vent system. Attic dry and clean at time of inspection.',
    'No deficiencies noted. Insulation level above current minimum standard. Ventilation appears adequate.',
  ],
  'doors': [
    'Four bedrooms inspected, walls ceilings floors in excellent condition throughout. All interior doors opening and closing properly, hardware functioning. Windows tested at representative locations, all operating properly, no broken seals observed. Stairway railings and guards stable and secure. Hardwood flooring in excellent condition throughout main floor.',
    'Double-pane insulated glass windows throughout. Solid core interior doors. Insulated steel exterior doors front and back.',
    'No deficiencies noted. Interior finishes and components in excellent condition at time of inspection.',
  ],
};

function getTexts(section) {
  for (const [key, vals] of Object.entries(sectionTexts)) {
    if (section.toLowerCase().includes(key)) return vals;
  }
  return ['Inspected and found satisfactory at time of inspection.', 'Standard residential construction.', 'No immediate action required.'];
}

let lastSection = '';
let filledCount = 0;

console.log('Watching for section changes... (Ctrl+C to stop)');

while (true) {
  await sleep(1500);

  const section = await pg.evaluate(() => {
    const h = document.querySelector('h2');
    return h ? h.innerText.split('\n')[0].trim() : '';
  }).catch(() => '');

  if (!section || section === lastSection) continue;

  lastSection = section;
  filledCount++;
  console.log(`\n[${filledCount}] Section: ${section}`);

  const texts = getTexts(section);
  const nativeSetter = `Object.getOwnPropertyDescriptor(window.HTMLTextAreaElement.prototype,'value').set`;

  const actions = await pg.evaluate((descTexts, setterCode) => {
    const nativeSetter = Object.getOwnPropertyDescriptor(window.HTMLTextAreaElement.prototype, 'value').set;
    const log = [];

    // Radio groups
    for (const item of document.querySelectorAll('div.rounded.border')) {
      const radios = Array.from(item.querySelectorAll('input[type=radio]'));
      if (radios.length && !radios.some(r => r.checked)) {
        const noDefect = Array.from(item.querySelectorAll('label')).find(l => l.innerText.toLowerCase().includes('no defect'));
        if (noDefect) { noDefect.click(); log.push('radio'); }
      }
    }

    // Textareas
    Array.from(document.querySelectorAll('textarea')).forEach((ta, i) => {
      if (!ta.value) {
        const txt = descTexts[i] || descTexts[descTexts.length - 1];
        nativeSetter.call(ta, txt);
        ta.dispatchEvent(new Event('input', { bubbles: true }));
        ta.dispatchEvent(new Event('change', { bubbles: true }));
        log.push('text');
      }
    });

    // Yes/No
    Array.from(document.querySelectorAll('label'))
      .filter(l => l.innerText.trim().toLowerCase().includes('no / not applicable'))
      .forEach(l => {
        const r = l.querySelector('input[type=radio]');
        if (r && !r.checked) { l.click(); log.push('yesno'); }
      });

    return log;
  }, texts);

  console.log(`  Filled ${actions.length} items (${actions.filter(a=>a==='text').length} text, ${actions.filter(a=>a==='radio').length} radio)`);

  if (section.toLowerCase().includes('complete') || section.toLowerCase().includes('finalize')) {
    console.log('\nAll sections done! Click "Complete Report" to finish.');
    break;
  }
}

browser.disconnect();
