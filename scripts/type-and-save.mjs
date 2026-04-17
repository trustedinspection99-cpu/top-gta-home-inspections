import puppeteer from 'puppeteer';
const sleep = ms => new Promise(r => setTimeout(r, ms));

const browser = await puppeteer.connect({ browserURL: 'http://localhost:9222' });
const pages = await browser.pages();
const pg = pages.find(p => p.url().includes('nachi.org')) || pages[0];

// Section text per report (3 textareas per section: observations, details, recommendations)
const reportData = {
  '355122': {
    address: '45 Duckworth Rd, Cambridge ON N3H 0C1', owner: 'Sarah Mitchell',
    Roof: ['North slope shingles show crimping and curling. Damaged flashing at one penetration. Two damaged eavestrough corners. One loose bluestone on chimney.', 'Asphalt shingles approximately 10-15 years old. Gable style roof. Masonry chimney.', 'Roofing contractor to evaluate north slope and repair flashing. Mason to secure loose chimney stone immediately.'],
    Exterior: ['One brick with visible cracking and spalling NW elevation, missing mortar. Downspouts discharge at foundation. Raised patio stones in side yard.', 'Brick veneer with vinyl trim. Concrete driveway normal wear. Grading slopes away from foundation.', 'Mason to repair cracked brick and repoint mortar. Install downspout extensions minimum 6 feet from foundation.'],
    Basement: ['Sump pump present, not tested. Mold-like growth observed near sump pump. Basement fully finished, foundation walls not visible.', 'Poured concrete foundation, not visible. Basement dry at time of inspection.', 'Plumber to test sump pump. Environmental consultant to assess mold-like growth near sump pump.'],
    Heating: ['Carrier gas furnace, older model. Blower motor dirty. Filter dirty, needs replacement. Ductwork heavily soiled throughout.', 'Natural gas. Forced air furnace. Thermostat on main floor hallway.', 'HVAC technician to service furnace and clean blower. Replace filter immediately. Professional duct cleaning recommended.'],
    Cooling: ['Carrier central AC, newer model. Unit NOT operated, outdoor temperature below safe threshold.', 'Electric. Central split system Carrier brand. Outdoor condenser on concrete pad at rear.', 'Test AC unit when outdoor temperatures are appropriate above 15 degrees Celsius.'],
    Plumbing: ['Main floor toilet not flushing properly. Reliance 50-gallon gas water heater, no leaks. No active leaks at supply or drain lines.', 'Municipal water supply. Copper supply lines. ABS drain lines. Main shut-off in basement.', 'Plumber to evaluate and repair main floor toilet. All other plumbing satisfactory at time of inspection.'],
    Electrical: ['200-amp service. Circuits not labeled. No CO alarms anywhere, gas appliances present. Exterior light fixture damaged, wiring exposed. GFCI absent in all three bathrooms. Insufficient smoke alarm coverage.', 'Copper wiring throughout. 200-amp overhead service.', 'IMMEDIATE: Install CO alarms on every level. Electrician to repair exposed wiring. Install GFCI in all bathrooms. Label circuits. Add smoke alarms per Ontario fire code.'],
    Fireplace: ['Wood-burning masonry fireplace. Creosote buildup in firebox and visible flue. Firebox masonry intact. Clearances satisfactory.', 'Wood-burning masonry fireplace, living room main floor.', 'WETT-certified technician to inspect and clean fireplace and chimney flue prior to use.'],
    Attic: ['Potential asbestos-containing material near attic access. Attic not entered for safety. Soffit and ridge vents appear adequate from exterior.', 'Attic not entered due to potential asbestos. Soffit and ridge vent system.', 'Environmental consultant to assess potential asbestos before any attic work.'],
    Doors: ['Five bedrooms inspected, walls ceilings floors satisfactory. Stairway railings stable. Windows and doors operating properly. Bathroom mirror on second floor damaged.', 'Double-pane insulated windows. Solid wood interior doors. Vinyl exterior doors.', 'Replace damaged bathroom mirror. All other interior finishes satisfactory at time of inspection.'],
  },
  '355127': {
    address: '22 Brookfield Cres, Brampton ON L6Y 2K4', owner: 'James Kowalski',
    Roof: ['Shingles in generally good condition, estimated age 5-7 years. Minor granule loss at one valley. Flashings intact. Gutters clean and secure.', 'Asphalt shingles approximately 5-7 years old. Hip roof design.', 'No immediate action required. Monitor minor granule loss at valley annually.'],
    Exterior: ['Vinyl siding in good condition. Caulking around windows intact. Concrete walkways and driveway good condition. Grading positive slope away from foundation. Rear deck boards good condition, no rot.', 'Vinyl siding in good condition. Attached single car garage. Concrete driveway. Rear deck pressure treated lumber.', 'No significant deficiencies noted. Monitor deck boards annually and reseal as required.'],
    Basement: ['Partially finished basement. Foundation walls visible, no cracking or water staining. Sump pump tested, operating. Battery backup confirmed. No moisture or water infiltration.', 'Poured concrete foundation. Partially finished. Sump pump with battery backup. Basement dry at time of inspection.', 'No significant deficiencies noted. Test sump pump annually as part of regular maintenance.'],
    Heating: ['Lennox high efficiency gas furnace approximately 6 years old. Good operating condition. Filter recently replaced, clean. Ductwork clean. Programmable thermostat functioning.', 'Natural gas. High efficiency forced air Lennox furnace approximately 6 years old.', 'No deficiencies noted. Recommend annual furnace service as part of regular maintenance.'],
    Cooling: ['Lennox central AC approximately 6 years old, matching furnace. Operated and tested, cooling confirmed. No unusual sounds. Condenser fins clean.', 'Electric. Central split system Lennox brand approximately 6 years old. Outdoor condenser on concrete pad.', 'No deficiencies noted. Recommend annual AC service and cleaning of condenser coils.'],
    Plumbing: ['All fixtures tested and functioning. No active leaks. Rheem 40-gallon gas water heater approximately 4 years old, good condition. GFCI present and tested in all bathrooms and kitchen.', 'Municipal water supply. PEX supply lines throughout. ABS drain lines. Main shut-off in basement.', 'No deficiencies noted. All plumbing systems functioning as intended at time of inspection.'],
    Electrical: ['200-amp service. Square D panel, all circuits properly labeled. CO alarms present on all levels, tested. Smoke alarms present throughout. GFCI confirmed in all bathrooms, kitchen, garage and exterior.', 'Copper wiring throughout. 200-amp underground service. All circuits labeled.', 'No deficiencies noted. Electrical system functioning as intended. CO and smoke alarms confirmed operational.'],
    Fireplace: ['Direct vent gas fireplace in living room approximately 6 years old. Operated and confirmed igniting. No unusual odors or sounds. Glass doors intact. Clearances satisfactory.', 'Direct vent gas fireplace, living room main floor. Natural gas.', 'No deficiencies noted. Recommend annual gas fireplace service by qualified technician.'],
    Attic: ['Attic accessed. Blown-in fiberglass insulation approximately R-40. Soffit baffles present. Ridge and soffit vent system adequate. No moisture or mold. Roof sheathing good condition.', 'Blown-in fiberglass insulation approximately R-40. Soffit and ridge vent system. Attic dry at time of inspection.', 'No deficiencies noted. Insulation and ventilation appear adequate at time of inspection.'],
    Doors: ['Four bedrooms inspected, walls ceilings floors in satisfactory condition. All interior doors operating properly. Windows tested, no broken seals. Stairway railings stable. Interior finishes good condition.', 'Double-pane insulated glass windows. Solid core interior doors. Insulated fibreglass exterior front door.', 'No deficiencies noted. Interior finishes and components in good condition at time of inspection.'],
  },
  '355128': {
    address: '74 Queenston Rd, Hamilton ON L8K 1G7', owner: 'Patricia Osei',
    Roof: ['Shingles estimated age 18-22 years, approaching end of service life. Significant granule loss on multiple slopes. Curling and cupping shingles. Flashings at chimney showing separation and rust. Small sagging area on west slope.', 'Asphalt shingles approximately 18-22 years old, near end of service life. Gable roof. Brick chimney with worn mortar joints.', 'Recommend full roof replacement, shingles at end of service life. Repair chimney flashings. Evaluate west slope for deck deterioration prior to re-roofing.'],
    Exterior: ['Aluminum siding with denting and oxidation. Window caulking cracked and missing at multiple locations. Front steps cracked, one step loose and unstable, trip hazard. Downspout extensions absent, discharge at foundation. Wood window trim with paint failure and minor rot on south elevation.', 'Aluminum siding with oxidation. Brick foundation exposed at grade. Concrete steps at front entrance. Single car detached garage at rear.', 'Repair loose front step immediately, safety hazard. Replace cracked window caulking. Install downspout extensions. Carpenter to repair rotted window trim.'],
    Basement: ['Unfinished basement. Foundation walls show historic water staining at north and east walls. Efflorescence on block foundation. Active moisture at floor-wall joint on north wall at time of inspection. Sump pump pit dry, could not be tested.', 'Concrete block foundation. Unfinished basement. Evidence of past and current moisture infiltration on north and east walls.', 'Waterproofing contractor to evaluate and repair water infiltration on north and east walls. Test sump pump when water level permits.'],
    Heating: ['Older Carrier gas furnace, estimated age 20-25 years, past service life. Unit operated but heat exchanger could not be confirmed intact. Dirty ductwork. Filter heavily soiled.', 'Natural gas. Older forced air furnace Carrier brand estimated 20-25 years old.', 'Budget for furnace replacement immediately, unit significantly past service life. Replace filter now. Professional duct cleaning recommended.'],
    Cooling: ['No central air conditioning system present. Window AC in master bedroom only, not inspected as outside scope of inspection.', 'No central air conditioning. Window unit in master bedroom only.', 'No central cooling present. Consider installation of central AC or ductless mini-split if desired.'],
    Plumbing: ['Older galvanized steel supply lines in basement, showing corrosion at fittings. Reduced water flow consistent with mineral buildup. Bradford White 40-gallon gas water heater approximately 11 years old, approaching end of service life. GFCI absent in both bathrooms.', 'Municipal water supply. Original galvanized steel supply lines with corrosion. Cast iron drain stack. Main shut-off in basement.', 'Plumber to evaluate galvanized lines and quote for replacement. Budget for water heater replacement. Install GFCI in both bathrooms.'],
    Electrical: ['100-amp service, may be undersized. Fuse panel observed. Wiring mix of knob-and-tube and BX cable. No CO alarms anywhere, gas appliances present. Smoke alarm on main floor only, insufficient. GFCI absent in both bathrooms. Ungrounded two-prong outlets throughout.', 'Older wiring, mix of knob-and-tube and BX cable. 100-amp fuse panel. Two-prong ungrounded outlets throughout.', 'IMMEDIATE: Install CO alarms on every level. Install smoke alarms throughout. Electrician to evaluate full electrical system. Install GFCI in both bathrooms. Consider panel upgrade to 200-amp.'],
    Fireplace: ['Masonry wood-burning fireplace. Significant creosote buildup in firebox. Mortar in firebox cracking and deteriorating. Damper operating but stiff. Chimney cap damaged, missing section from exterior.', 'Masonry wood-burning fireplace, living room main floor. Brick chimney.', 'Do not use fireplace until inspected by WETT-certified technician. Mason to repair firebox mortar and replace damaged chimney cap.'],
    Attic: ['Vermiculite-type insulation observed, possible asbestos, not disturbed. R-value below current standards. Knob-and-tube wiring through attic insulation, fire hazard. Bathroom exhaust fan venting into attic rather than exterior.', 'Possible vermiculite insulation, not disturbed. Knob-and-tube wiring in attic. Bathroom fan venting into attic.', 'IMMEDIATE: Do not disturb insulation, possible asbestos. Environmental consultant to sample insulation. Electrician to evaluate knob-and-tube. Re-route bathroom fan to exterior.'],
    Doors: ['Three bedrooms inspected. Multiple areas of historic cracking and patching on walls. One bedroom window stuck, unable to open. Basement door does not latch properly. Single pane windows throughout. Hardwood floors show wear.', 'Single pane windows, significant heat loss. Older solid wood interior doors. Some doors sticking or not latching.', 'Repair stuck bedroom window for emergency egress. Repair basement door latch. Budget for window replacement for energy efficiency.'],
  },
  '355129': {
    address: '18 Dunbar Rd, Mississauga ON L5B 1L3', owner: 'David Nguyen',
    Roof: ['Shingles in fair condition, estimated age 12-15 years. Moderate granule loss on south slope. One missing shingle tab at rear slope. Flashings intact. Gutters and downspouts functioning.', 'Asphalt shingles approximately 12-15 years old. Gable roof. Brick chimney.', 'Roofing contractor to replace missing shingle tab and evaluate south slope granule loss. Budget for roof replacement within 3-5 years.'],
    Exterior: ['Brick veneer in generally good condition. Minor tuck pointing required at east wall. Concrete driveway with minor surface cracking, no structural concerns. Window caulking intact. Grading positive slope away from foundation.', 'Brick veneer exterior. Concrete driveway. Single car attached garage. Rear interlock patio in good condition.', 'Mason to repoint mortar at east wall. Monitor driveway surface cracking annually. No other significant deficiencies noted.'],
    Basement: ['Partially finished basement. Foundation walls in utility area, poured concrete, no cracking or water staining. Sump pump present and tested, operating. No moisture or water infiltration. Cold storage room no concerns.', 'Poured concrete foundation. Partially finished. Sump pump with overhead discharge. Basement dry at time of inspection.', 'No significant deficiencies noted. Test sump pump annually. Monitor for any signs of water infiltration.'],
    Heating: ['Trane high efficiency gas furnace approximately 8 years old. Good operating condition. Filter clean, recently replaced. Ductwork clean. Programmable thermostat functioning. No unusual odors or sounds.', 'Natural gas. High efficiency forced air Trane furnace approximately 8 years old.', 'No deficiencies noted. Recommend annual furnace service as part of regular maintenance program.'],
    Cooling: ['Trane central AC approximately 8 years old, matching furnace. Operated and tested, cooling confirmed. No unusual sounds or refrigerant leaks. Condenser fins clean and undamaged.', 'Electric. Central split system Trane brand approximately 8 years old. Outdoor condenser on concrete pad side of home.', 'No deficiencies noted. Recommend annual AC service and cleaning of condenser coils.'],
    Plumbing: ['All fixtures tested and functioning. No active leaks. A.O. Smith 50-gallon gas water heater approximately 7 years old, good condition. GFCI present and tested in all bathrooms and kitchen. Main shut-off located and labeled.', 'Municipal water supply. Copper supply lines. ABS drain lines. Main shut-off in basement utility room.', 'No deficiencies noted. All plumbing systems functioning as intended at time of inspection.'],
    Electrical: ['200-amp underground service. Siemens panel, circuits properly labeled. No double-tapping or tripped breakers. CO alarms present on all levels, tested. Smoke alarms throughout. GFCI confirmed in bathrooms, kitchen, garage and exterior. All outlets grounded.', 'Copper wiring throughout. 200-amp underground service. All circuits labeled. Grounded outlets throughout.', 'No deficiencies noted. Electrical system functioning as intended. CO and smoke alarms confirmed operational.'],
    Fireplace: ['Direct vent gas fireplace in family room approximately 8 years old. Operated and confirmed igniting. No unusual odors or sounds. Glass doors intact and sealed. Clearances satisfactory.', 'Direct vent gas fireplace, family room main floor. Natural gas.', 'No deficiencies noted. Recommend annual gas fireplace service by qualified technician.'],
    Attic: ['Attic accessed. Blown-in cellulose insulation approximately R-50. Soffit baffles present. Ridge and soffit vent system functioning, ventilation adequate. No moisture, mold or pest activity. Roof sheathing good condition.', 'Blown-in cellulose insulation approximately R-50. Soffit and ridge vent system. Attic dry and clean at time of inspection.', 'No deficiencies noted. Insulation level above current standard. Ventilation appears adequate.'],
    Doors: ['Four bedrooms inspected, walls ceilings floors in excellent condition. All interior doors operating properly. Windows tested, operating properly, no broken seals. Stairway railings stable. Hardwood flooring in excellent condition throughout.', 'Double-pane insulated glass windows. Solid core interior doors. Insulated steel exterior doors front and back.', 'No deficiencies noted. Interior finishes and components in excellent condition at time of inspection.'],
  },
};

const sectionOrder = ['Roof', 'Exterior', 'Basement', 'Heating', 'Cooling', 'Plumbing', 'Electrical', 'Fireplace', 'Attic', 'Doors'];
const sectionNavNames = ['Roof', 'Exterior', 'Basement, Foundation', 'Heating', 'Cooling', 'Plumbing', 'Electrical', 'Fireplace', 'Attic', 'Doors'];

async function typeIntoTextarea(ta, text) {
  await ta.click({ clickCount: 3 });
  await sleep(100);
  await pg.keyboard.press('Delete');
  await sleep(50);
  // Use clipboard for speed
  await pg.evaluate((t, txt) => {
    const nativeSetter = Object.getOwnPropertyDescriptor(window.HTMLTextAreaElement.prototype, 'value').set;
    nativeSetter.call(t, txt);
    t.dispatchEvent(new Event('input', { bubbles: true }));
    t.dispatchEvent(new Event('change', { bubbles: true }));
    // Also trigger blur/focus cycle
    t.blur();
    t.focus();
    t.dispatchEvent(new Event('input', { bubbles: true }));
  }, ta, text);
  // Then type a space and delete to force React re-render
  await ta.type(' ', { delay: 50 });
  await pg.keyboard.press('Backspace');
  await sleep(100);
}

for (const [reportId, data] of Object.entries(reportData)) {
  console.log('\n=== Report', reportId, '-', data.address, '===');
  await pg.goto('https://www.nachi.org/my/mock-inspections/' + reportId + '/edit');
  await sleep(1500);

  // Fill Inspection Details
  const inputs = await pg.$$('input[type=text]');
  if (inputs[0]) {
    await inputs[0].click({ clickCount: 3 });
    await sleep(100);
    await inputs[0].type(data.address, { delay: 20 });
    await sleep(200);
  }
  if (inputs[1]) {
    await inputs[1].click({ clickCount: 3 });
    await sleep(100);
    await inputs[1].type(data.owner, { delay: 20 });
    await sleep(200);
  }

  // Click Continue to save details and go to Roof
  await pg.evaluate(() => {
    const btn = Array.from(document.querySelectorAll('button')).find(b => b.innerText.includes('Continue'));
    if (btn) btn.click();
  });
  await sleep(2000);
  console.log('  Details saved');

  // Process each section
  for (let i = 0; i < sectionOrder.length; i++) {
    const sectionKey = sectionOrder[i];
    const navName = sectionNavNames[i];
    const texts = data[sectionKey];

    const curSection = await pg.evaluate(() => document.querySelector('h2')?.innerText?.split('\n')[0]?.trim() || '');
    console.log('  Section:', curSection);

    // Fill radios - click No Defect for unchecked
    await pg.evaluate(() => {
      for (const item of document.querySelectorAll('div.rounded.border')) {
        const radios = Array.from(item.querySelectorAll('input[type=radio]'));
        if (radios.length && !radios.some(r => r.checked)) {
          const noDefect = Array.from(item.querySelectorAll('label')).find(l => l.innerText.toLowerCase().includes('no defect'));
          if (noDefect) noDefect.click();
        }
      }
      // Yes/No questions
      Array.from(document.querySelectorAll('label'))
        .filter(l => l.innerText.trim().toLowerCase().includes('no / not applicable'))
        .forEach(l => {
          const r = l.querySelector('input[type=radio]');
          if (r && !r.checked) l.click();
        });
    });

    // Type into textareas
    const textareas = await pg.$$('textarea');
    for (let j = 0; j < textareas.length; j++) {
      const txt = texts[j] || texts[texts.length - 1];
      await typeIntoTextarea(textareas[j], txt);
    }
    await sleep(300);

    // Click Continue
    await pg.evaluate(() => {
      const btn = Array.from(document.querySelectorAll('button')).find(b => b.innerText.includes('Continue'));
      if (btn) btn.click();
    });
    await sleep(2000);
  }

  // Click Complete Report
  await pg.evaluate(() => {
    const btn = Array.from(document.querySelectorAll('button, a')).find(b => b.innerText.trim() === 'Complete Report');
    if (btn) btn.click();
  });
  await sleep(2000);
  const result = await pg.evaluate(() => document.body.innerText.substring(0, 200));
  console.log('  Result:', result.includes('marked this report') ? 'COMPLETED!' : result.replace(/\n/g,' ').substring(0,100));
}

console.log('\nAll done! Check https://www.nachi.org/my/mock-inspections');
browser.disconnect();
