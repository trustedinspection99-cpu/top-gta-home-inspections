import puppeteer from 'puppeteer';
const sleep = ms => new Promise(r => setTimeout(r, ms));

const browser = await puppeteer.connect({ browserURL: 'http://localhost:9222' });
const pages = await browser.pages();
const pg = pages.find(p => p.url().includes('nachi.org')) || pages[0];

// ── 3 real inspection scenarios ──────────────────────────────────────────────
const inspections = [
  {
    address: '45 Duckworth Rd, Cambridge ON N3H 0C1',
    owner: 'Sarah Mitchell',
    reportId: '355122', // already exists, just finish it
    data: {
      Roof: [
        'Asphalt shingles inspected from ground level. North slope shingles show crimping and curling. Damaged flashing at one penetration. Unsealed nail holes at roof deck. Two damaged eavestrough corners SW and NW. One loose bluestone on chimney.',
        'Asphalt shingles approximately 10-15 years old. Gable style roof. Masonry chimney.',
        'Roofing contractor to evaluate north slope, repair flashing and seal nail holes. Mason to secure loose chimney stone immediately.',
      ],
      Exterior: [
        'Brick veneer exterior. One brick with visible cracking and spalling NW elevation, missing mortar. Downspouts discharge immediately adjacent to foundation. Raised and uneven patio stones in side yard walkway.',
        'Brick veneer with vinyl trim. Concrete driveway, normal wear. Grading slopes away from foundation at inspected locations.',
        'Mason to repair cracked brick and repoint mortar. Install downspout extensions minimum 6 feet from foundation. Reset raised patio stones.',
      ],
      Basement: [
        'Basement fully finished, foundation walls not visible. Sump pump in basement utility area, not tested at time of inspection. Mold-like growth observed near sump pump. No visible active water infiltration at inspected floor areas.',
        'Poured concrete foundation, not visible due to finished basement. Basement dry at time of inspection.',
        'Plumber to test and service sump pump. Environmental consultant to assess mold-like growth. Monitor for signs of water infiltration.',
      ],
      Heating: [
        'Carrier gas furnace in basement utility room, older model. Blower motor compartment dirty with accumulated dust. Furnace filter dirty, needs replacement. Duct system heavily soiled throughout. Gas supply observed, no leaks at accessible connections.',
        'Natural gas. Forced air furnace. Thermostat on main floor hallway near staircase.',
        'HVAC technician to service furnace and clean blower motor. Replace furnace filter immediately. Professional duct cleaning prior to occupancy.',
      ],
      Cooling: [
        'Carrier central air conditioning unit, newer model, good general condition. Unit NOT operated, outdoor temperature below minimum safe operating threshold. Cold weather compressor damage risk prevents testing.',
        'Electric. Central split system, Carrier brand. Outdoor condenser unit on concrete pad at rear.',
        'Test AC unit when outdoor temperatures are appropriate above 15 degrees. Unit appeared in good condition visually.',
      ],
      Plumbing: [
        'Main floor toilet not flushing properly at time of inspection. Reliance 50-gallon gas water heater, no visible leaks or corrosion. Main water shut-off located in basement. Visible supply and drain lines inspected, no active leaks. Bathroom shut-off valves accessible.',
        'Municipal water supply. Copper supply lines. ABS drain and waste lines. Three quarter inch main shut-off valve in basement utility room.',
        'Plumber to evaluate and repair main floor toilet flush mechanism. All other plumbing satisfactory at time of inspection.',
      ],
      Electrical: [
        '200-amp overhead electrical service. Circuit breaker panel in basement, no tripped breakers or double-tapping. Circuits not properly labeled. No carbon monoxide alarms observed anywhere, gas appliances present. Exterior front light fixture damaged housing, wiring exposed and unsecured. GFCI absent in all three bathrooms. Kitchen GFCI confirmed functioning. Smoke alarm coverage insufficient.',
        'Copper wiring throughout. 200-amp overhead service appropriate for home size.',
        'IMMEDIATE: Install CO alarms on every level. IMMEDIATE: Electrician repair exposed exterior wiring. Install GFCI in all bathrooms. Label all circuit breakers. Add smoke alarms per Ontario fire code.',
      ],
      Fireplace: [
        'Wood-burning masonry fireplace on main floor. Creosote buildup observed in firebox and visible flue area. Firebox masonry generally intact at accessible areas. Clearances around fireplace appear satisfactory.',
        'Wood-burning masonry fireplace. Living room, main floor.',
        'WETT-certified technician to inspect and clean fireplace and chimney flue prior to use.',
      ],
      Attic: [
        'Potential asbestos-containing material observed near attic access point. Attic was not entered for safety reasons. Soffit and ridge vents observed from exterior, ventilation design appears adequate.',
        'Attic not entered due to potential asbestos near access hatch. Soffit and ridge vent system.',
        'Environmental consultant to assess potential asbestos near attic access prior to any attic work.',
      ],
      Doors: [
        'Five bedrooms inspected, walls ceilings floors in satisfactory condition. Stairway railings and guards stable, no damage. Representative windows and doors tested, opening and closing properly. Bathroom mirror on second floor damaged. Interior walls ceilings floors inspected, no significant deficiencies beyond noted items.',
        'Double-pane insulated glass windows throughout. Solid wood interior doors. Vinyl exterior doors with weatherstripping.',
        'Replace damaged bathroom mirror. All other interior finishes satisfactory at time of inspection.',
      ],
    }
  },
  {
    address: '22 Brookfield Cres, Brampton ON L6Y 2K4',
    owner: 'James Kowalski',
    reportId: null,
    data: {
      Roof: [
        'Asphalt shingle roof inspected from ground level and accessible areas. Shingles in generally good condition, estimated age 5-7 years. Minor granule loss observed at one valley. Flashings appear intact and properly sealed. Gutters clean and securely attached.',
        'Asphalt shingles, approximately 5-7 years old. Hip roof design. Gas fireplace flue pipe through roof, sealed.',
        'No immediate action required. Monitor minor granule loss at valley annually. Gutters and downspouts functioning properly.',
      ],
      Exterior: [
        'Vinyl siding exterior in good condition. No significant cracks, gaps or damage observed. Caulking around window and door frames intact. Concrete walkways and driveway in good condition. Grading positive slope away from foundation at all inspected locations. Deck at rear, boards in good condition, no rot observed.',
        'Vinyl siding in good condition. Attached single car garage. Concrete driveway and walkways. Rear deck with pressure treated lumber.',
        'No significant deficiencies noted at exterior. Recommend monitoring deck boards annually and resealing as required.',
      ],
      Basement: [
        'Partially finished basement. Foundation walls visible in utility room, no visible cracking or water staining observed. Sump pump present and tested, operating at time of inspection. No evidence of moisture or water infiltration at inspected areas. Floor drains clear.',
        'Poured concrete foundation. Partially finished. Sump pump with battery backup. Basement generally dry at time of inspection.',
        'No significant deficiencies noted. Recommend testing sump pump annually. Battery backup confirmed present.',
      ],
      Heating: [
        'Lennox high efficiency gas furnace, approximately 6 years old. Unit in good operating condition at time of inspection. Filter recently replaced, clean at time of inspection. Ductwork clean at inspected areas. Thermostat programmable, functioning properly. No unusual odors or sounds noted during operation.',
        'Natural gas. High efficiency forced air furnace, Lennox brand approximately 6 years old. Thermostat on main floor hallway.',
        'No deficiencies noted. Recommend annual furnace service as part of regular maintenance program.',
      ],
      Cooling: [
        'Lennox central air conditioning unit, approximately 6 years old, matching furnace. Unit operated and tested at time of inspection, cooling confirmed functioning. No unusual sounds or refrigerant leaks observed. Outdoor condenser fins clean and undamaged.',
        'Electric. Central split system, Lennox brand, approximately 6 years old. Outdoor condenser on concrete pad, side of home.',
        'No deficiencies noted. Recommend annual AC service and cleaning of condenser coils.',
      ],
      Plumbing: [
        'Plumbing inspected at accessible locations. All fixtures tested and functioning properly. No active leaks observed at supply or drain lines. Water heater Rheem 40-gallon gas, approximately 4 years old, good condition. GFCI protection present and tested in all bathrooms and kitchen. Main shut-off located and labeled.',
        'Municipal water supply. PEX supply lines throughout. ABS drain and waste lines. Main shut-off in basement utility room.',
        'No deficiencies noted. All plumbing systems functioning as intended at time of inspection.',
      ],
      Electrical: [
        '200-amp electrical service. Square D circuit breaker panel, all circuits properly labeled. No double-tapping or tripped breakers observed. Carbon monoxide alarms present on all levels, tested and functioning. Smoke alarms present on all levels and outside sleeping areas. GFCI confirmed in all bathrooms, kitchen, garage and exterior. Wiring copper throughout.',
        'Copper wiring throughout. 200-amp underground service. All circuits labeled in panel.',
        'No deficiencies noted. Electrical system functioning as intended. CO and smoke alarms confirmed present and operating.',
      ],
      Fireplace: [
        'Direct vent gas fireplace in living room, approximately 6 years old. Unit operated and confirmed igniting at time of inspection. No unusual odors or sounds during operation. Glass doors intact. No creosote concerns as direct vent gas unit. Clearances around unit appear satisfactory.',
        'Direct vent gas fireplace. Living room, main floor. Natural gas.',
        'No deficiencies noted. Recommend annual gas fireplace service by qualified technician.',
      ],
      Attic: [
        'Attic accessed and inspected. Blown-in fiberglass insulation, depth approximately 12 to 14 inches, estimated R-40 value. Soffit baffles present to maintain airflow. Ridge vent and soffit vent system observed, ventilation appears adequate. No evidence of moisture staining or mold at inspected areas. Roof sheathing in good condition.',
        'Blown-in fiberglass insulation approximately R-40. Soffit and ridge vent system. Attic dry at time of inspection.',
        'No deficiencies noted. Insulation and ventilation appear adequate at time of inspection.',
      ],
      Doors: [
        'Four bedrooms inspected, walls ceilings floors in satisfactory condition throughout. All interior doors opening and closing properly, hardware functioning. Windows tested at representative locations, all opening and closing properly, no broken seals observed. Stairway railings and guards stable and secure. Interior finishes in good condition throughout.',
        'Double-pane insulated glass windows throughout. Solid core interior doors. Insulated fibreglass exterior front door.',
        'No deficiencies noted. Interior finishes and components in good condition at time of inspection.',
      ],
    }
  },
  {
    address: '74 Queenston Rd, Hamilton ON L8K 1G7',
    owner: 'Patricia Osei',
    reportId: null,
    data: {
      Roof: [
        'Asphalt shingle roof, estimated age 18 to 22 years, approaching end of service life. Significant granule loss observed across multiple slopes. Multiple areas of curling and cupping shingles. Flashings at chimney showing separation and rust. One small area of visible sagging on west slope suggesting possible deck deterioration beneath.',
        'Asphalt shingles approximately 18-22 years old, near end of service life. Gable roof. Brick chimney, mortar joints showing wear.',
        'Recommend full roof replacement by qualified roofing contractor, shingles at end of service life. Repair chimney flashings. Evaluate west slope for possible deck deterioration prior to re-roofing.',
      ],
      Exterior: [
        'Aluminum siding with some areas of denting and oxidation. Window caulking cracked and missing at multiple locations allowing potential water infiltration. Concrete front steps cracked, one step loose and unstable presenting trip hazard. Downspout extensions absent, discharge at foundation. Wood window trim showing paint failure and minor rot at two locations on south elevation.',
        'Aluminum siding with some oxidation. Brick foundation exposed at grade. Concrete steps at front entrance. Single car detached garage at rear.',
        'Repair or replace cracked and missing window caulking throughout. Repair loose front step immediately, safety hazard. Install downspout extensions minimum 6 feet from foundation. Qualified carpenter to repair rotted window trim and repaint.',
      ],
      Basement: [
        'Unfinished basement. Foundation walls show historic water staining at base of north and east walls indicating past water infiltration. Efflorescence present on block foundation walls. Active moisture observed at floor-wall joint on north wall at time of inspection. Sump pump present but pit dry, could not be tested. Evidence of previous repairs to cracks in foundation wall.',
        'Concrete block foundation. Unfinished basement. Evidence of past and possibly current moisture infiltration on north and east walls.',
        'Recommend waterproofing contractor evaluate and repair source of water infiltration on north and east walls. Monitor sump pump pit and test pump when water level permits. Budget for waterproofing work.',
      ],
      Heating: [
        'Older Carrier gas furnace, estimated age 20 to 25 years, significantly past typical service life. Unit operated at time of inspection but heat exchanger could not be visually confirmed intact due to age and design. Dirty ductwork throughout. Filter heavily soiled. Thermostat non-programmable, older model. Recommend replacement budgeted urgently.',
        'Natural gas. Older forced air furnace, Carrier brand estimated 20-25 years old. Thermostat on main floor.',
        'Recommend immediate budgeting for furnace replacement by qualified HVAC contractor. Unit significantly past service life. Replace filter now. Professional duct cleaning recommended.',
      ],
      Cooling: [
        'No central air conditioning system present. Window air conditioning unit observed in master bedroom only, not inspected as outside scope. No whole-home cooling system at time of inspection.',
        'No central air conditioning. Window unit in master bedroom only, not inspected.',
        'No central cooling system present. Client to consider installation of central AC or ductless mini-split system if desired.',
      ],
      Plumbing: [
        'Older galvanized steel supply lines observed in basement, showing corrosion at fittings. Reduced water flow noted at some fixtures consistent with galvanized pipe mineral buildup. Cast iron drain stack in good condition visually. Water heater Bradford White 40-gallon gas, approximately 11 years old, approaching end of service life. No active leaks observed. GFCI absent in both bathrooms.',
        'Municipal water supply. Original galvanized steel supply lines showing age-related corrosion. Cast iron drain stack. Main shut-off in basement.',
        'Recommend plumber evaluate galvanized supply lines and provide quote for replacement with copper or PEX. Budget for water heater replacement, approaching end of service life. Install GFCI in both bathrooms.',
      ],
      Electrical: [
        '100-amp electrical service, may be undersized for modern loads. Fuse panel observed, fuses intact, no evidence of overfusing. Wiring mix of knob-and-tube in attic and BX cable in basement. No carbon monoxide alarms observed anywhere in home, gas appliances present. Smoke alarm on main floor only, insufficient coverage. GFCI absent in both bathrooms. Older ungrounded two-prong outlets throughout most of home.',
        'Older wiring, mix of knob-and-tube and BX cable. 100-amp fuse panel. Two-prong ungrounded outlets throughout most of home.',
        'IMMEDIATE: Install CO alarms on every level. Install smoke alarms on every level and outside sleeping areas. Recommend licensed electrician evaluate entire electrical system, fuse panel, knob-and-tube wiring, and advise on upgrade. Install GFCI in both bathrooms. Consider panel upgrade to 200-amp service.',
      ],
      Fireplace: [
        'Masonry wood-burning fireplace in living room. Significant creosote buildup observed in firebox. Mortar in firebox showing cracking and deterioration at multiple locations. Damper operating but stiff. Hearth extension intact. Chimney cap damaged, missing section observed from exterior.',
        'Masonry wood-burning fireplace. Living room, main floor. Brick chimney.',
        'Do not use fireplace until inspected by WETT-certified technician. Recommend mason repair firebox mortar and replace damaged chimney cap. Full chimney cleaning and inspection required.',
      ],
      Attic: [
        'Attic accessed. Original vermiculite-type insulation observed on attic floor, may contain asbestos, not disturbed. Estimated R-value well below current standards. Knob-and-tube wiring observed running through attic insulation, which is a fire hazard and insurance concern. One bathroom exhaust fan venting directly into attic space rather than to exterior.',
        'Possible vermiculite insulation in attic, not disturbed. Knob-and-tube wiring present in attic. Bathroom fan venting into attic, not to exterior.',
        'IMMEDIATE: Do not disturb attic insulation, possible asbestos content. Recommend environmental consultant sample insulation prior to any attic work. Licensed electrician to evaluate knob-and-tube in attic. Re-route bathroom exhaust fan to exterior.',
      ],
      Doors: [
        'Three bedrooms inspected. Walls and ceilings show multiple areas of historic cracking and patching, cosmetic in appearance. One bedroom window stuck, unable to open at time of inspection. Basement door from interior does not latch properly. Older single pane windows throughout, significant heat loss expected. Hardwood floors show wear and finish loss in high traffic areas.',
        'Single pane windows throughout, significant heat loss expected. Older solid wood interior doors. Some doors sticking or not latching properly.',
        'Repair or replace stuck bedroom window to ensure emergency egress. Repair interior basement door latch. Budget for window replacement to improve energy efficiency. Refinish or replace hardwood floors as desired.',
      ],
    }
  },
];

// ── Helper: fill one section ──────────────────────────────────────────────────
async function fillSection(texts) {
  const nativeSetter = Object.getOwnPropertyDescriptor(window.HTMLTextAreaElement.prototype, 'value').set;
  let filled = 0;

  // Radio groups - click No Defect for unchecked
  const items = Array.from(document.querySelectorAll('div.rounded.border'));
  for (const item of items) {
    const radios = Array.from(item.querySelectorAll('input[type=radio]'));
    if (radios.length && !radios.some(r => r.checked)) {
      const noDefect = Array.from(item.querySelectorAll('label')).find(l => l.innerText.toLowerCase().includes('no defect'));
      if (noDefect) { noDefect.click(); filled++; }
    }
  }

  // Textareas
  const tas = Array.from(document.querySelectorAll('textarea'));
  tas.forEach((ta, i) => {
    if (!ta.value) {
      const txt = texts[i] || texts[texts.length - 1];
      nativeSetter.call(ta, txt);
      ta.dispatchEvent(new Event('input', { bubbles: true }));
      ta.dispatchEvent(new Event('change', { bubbles: true }));
      filled++;
    }
  });

  // Yes/No questions
  Array.from(document.querySelectorAll('label'))
    .filter(l => l.innerText.trim().toLowerCase().includes('no / not applicable'))
    .forEach(l => {
      const r = l.querySelector('input[type=radio]');
      if (r && !r.checked) { l.click(); filled++; }
    });

  return filled;
}

// ── Helper: process one full report ──────────────────────────────────────────
async function processReport(inspection) {
  console.log(`\n===== Starting: ${inspection.address} =====`);

  let reportId = inspection.reportId;

  if (!reportId) {
    // Create new report
    await pg.goto('https://www.nachi.org/my/mock-inspections');
    await sleep(2000);
    await pg.evaluate(() => {
      const btn = Array.from(document.querySelectorAll('a, button')).find(b => b.innerText.includes('Create another report') || b.innerText.includes('New Report'));
      if (btn) btn.click();
    });
    await sleep(2000);
    const url = pg.url();
    reportId = url.match(/mock-inspections\/(\d+)/)?.[1];
    if (!reportId) {
      // Try to find new report link
      const links = await pg.evaluate(() =>
        Array.from(document.querySelectorAll('a')).map(a => a.href).filter(h => h.includes('mock-inspections'))
      );
      console.log('Links:', links);
      throw new Error('Could not get new report ID');
    }
    console.log(`Created report #${reportId}`);
  }

  await pg.goto(`https://www.nachi.org/my/mock-inspections/${reportId}/edit`);
  await sleep(2000);

  // ── Step 1: Inspection Details ────────────────────────────────────────────
  console.log('Filling Inspection Details...');
  // Navigate to details section
  await pg.evaluate(() => {
    const links = Array.from(document.querySelectorAll('a, button'));
    const det = links.find(l => l.innerText.includes('Inspection Details'));
    if (det) det.click();
  });
  await sleep(1500);

  await pg.evaluate((addr, owner) => {
    const nativeSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
    const inputs = document.querySelectorAll('input[type=text]');
    if (inputs[0]) {
      nativeSetter.call(inputs[0], addr);
      inputs[0].dispatchEvent(new Event('input', { bubbles: true }));
      inputs[0].dispatchEvent(new Event('change', { bubbles: true }));
    }
    if (inputs[1]) {
      nativeSetter.call(inputs[1], owner);
      inputs[1].dispatchEvent(new Event('input', { bubbles: true }));
      inputs[1].dispatchEvent(new Event('change', { bubbles: true }));
    }
  }, inspection.address, inspection.owner);
  await sleep(500);

  // Click Continue to save + move to next section
  let continued = await clickContinue();
  if (!continued) { console.log('No continue button on details, trying section nav...'); }
  await sleep(2000);

  // ── Step 2: Each inspection section ──────────────────────────────────────
  const sectionMap = {
    'roof': inspection.data.Roof,
    'exterior': inspection.data.Exterior,
    'basement': inspection.data.Basement,
    'heating': inspection.data.Heating,
    'cooling': inspection.data.Cooling,
    'plumbing': inspection.data.Plumbing,
    'electrical': inspection.data.Electrical,
    'fireplace': inspection.data.Fireplace,
    'attic': inspection.data.Attic,
    'doors': inspection.data.Doors,
  };

  const sectionOrder = ['Roof', 'Exterior', 'Basement, Foundation', 'Heating', 'Cooling', 'Plumbing', 'Electrical', 'Fireplace', 'Attic', 'Doors'];

  for (const sectionName of sectionOrder) {
    // Navigate to section
    const nav = await pg.evaluate((name) => {
      const links = Array.from(document.querySelectorAll('a, button'));
      const found = links.find(l => l.innerText.trim().startsWith(name));
      if (found) { found.click(); return true; }
      return false;
    }, sectionName);

    await sleep(1500);

    const currentSection = await pg.evaluate(() => {
      const h = document.querySelector('h2');
      return h ? h.innerText.split('\n')[0].trim() : '';
    });
    console.log(`  Section: ${currentSection}`);

    // Match texts
    let texts = ['Inspected and found satisfactory at time of inspection.', 'Standard residential construction.', 'No immediate action required.'];
    for (const [key, vals] of Object.entries(sectionMap)) {
      if (currentSection.toLowerCase().includes(key)) { texts = vals; break; }
    }

    const filled = await pg.evaluate(fillSection, texts);
    console.log(`    Filled ${filled} items`);
    await sleep(500);

    // Click Continue to save
    const saved = await clickContinue();
    console.log(`    Saved: ${saved}`);
    await sleep(2000);
  }

  // ── Step 3: Finalize ──────────────────────────────────────────────────────
  console.log('Finalizing report...');
  await pg.evaluate(() => {
    const links = Array.from(document.querySelectorAll('a, button'));
    const fin = links.find(l => l.innerText.includes('Finalize'));
    if (fin) fin.click();
  });
  await sleep(2000);

  // Click Complete Report
  await pg.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button, input[type=submit], a'));
    const complete = btns.find(b => b.innerText.includes('Complete Report') || b.value === 'Complete Report');
    if (complete) complete.click();
  });
  await sleep(2000);

  const result = await pg.evaluate(() => document.body.innerText.substring(0, 200));
  console.log('Result:', result.substring(0, 150));
  console.log(`===== Done: ${inspection.address} =====\n`);
}

// ── Helper: click Continue button ────────────────────────────────────────────
async function clickContinue() {
  return await pg.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button, input[type=submit]'));
    const cont = btns.find(b => b.innerText.includes('Continue') || b.value?.includes('Continue'));
    if (cont) { cont.click(); return true; }
    // Try save button
    const save = btns.find(b => b.innerText.toLowerCase().includes('save'));
    if (save) { save.click(); return true; }
    return false;
  });
}

// ── Run all 3 inspections ─────────────────────────────────────────────────────
for (const inspection of inspections) {
  try {
    await processReport(inspection);
  } catch (e) {
    console.error(`Error on ${inspection.address}:`, e.message);
  }
}

console.log('\nAll mock inspections complete! Check https://www.nachi.org/my/mock-inspections');
browser.disconnect();
