import { writeFileSync } from 'fs';
import { buildReportHtml, ReportData } from '../src/lib/reportTemplate.ts';

const data: ReportData = {
  summary: {
    p1Count: 3,
    p2Count: 11,
    p3Count: 8,
    okCount: 20,
    assessment:
      'This pre-purchase home inspection of 45 Duckworth Rd, Cambridge (1987) identified 3 unsafe/urgent conditions requiring immediate attention prior to occupancy: carbon monoxide alarms are completely absent throughout the home with multiple gas appliances present, a loose bluestone on the chimney presents a falling hazard, and an exterior light fixture has exposed unsecured wiring creating a shock risk. Eleven significant deficiencies were identified including missing GFCI protection in all three bathrooms, unlabeled electrical panel circuits, inadequate smoke alarm coverage, heavily soiled ductwork, improper downspout discharge near the foundation, brick veneer cracking, multiple roof deficiencies, a non-functioning main-floor toilet, and an untested sump pump with mold-like growth observed nearby. Eight maintenance and monitoring items were noted. Numerous systems throughout the home were found to be in satisfactory condition at the time of inspection. All Priority 1 items should be addressed immediately, and the client should budget for Priority 2 repairs in the near term.',
  },
  propertyDetails: {
    'Year Built': '1987',
    'Bedrooms': '5',
    'Basement': 'Fully Finished',
    'Electrical Service': '200 Amp Overhead',
    'Heating': 'Carrier Gas Furnace',
    'Cooling': 'Carrier Central AC',
    'Water Heater': 'Reliance 50 Gal Gas',
    'Roof': 'Asphalt Shingles',
    'Foundation': 'Concrete (Not Visible)',
  },
  sections: [
    {
      name: 'Section 3 — Structural System',
      findings: [],
      satisfactory: [
        'Visible structural framing inspected where accessible — no deficiencies noted at inspected areas',
        'Floor structure — no significant deflection or movement observed at time of inspection',
      ],
    },
    {
      name: 'Section 4 — Exterior',
      findings: [
        {
          priority: 'P2',
          location: 'Northwest elevation — brick veneer',
          observation:
            'Observed one brick with visible cracking and spalling on the northwest side of the exterior wall. Missing mortar noted around the affected brick.',
          implication:
            'Cracked and spalled brick with missing mortar allows water infiltration behind the brick veneer, leading to potential moisture damage to the underlying wall structure, insulation, and interior finishes over time.',
          recommendation:
            'Recommend qualified mason evaluate and repair affected brick and repoint missing mortar joints to prevent water infiltration.',
        },
        {
          priority: 'P2',
          location: 'Multiple downspout discharge points around perimeter',
          observation:
            'Observed downspouts discharging water at or immediately adjacent to the foundation wall. No visible waterproofing membrane observed at foundation grade level.',
          implication:
            'Discharge of roof drainage immediately adjacent to the foundation significantly increases the risk of water infiltration into the basement and potential deterioration of the foundation wall over time.',
          recommendation:
            'Recommend installation of downspout extensions to direct water a minimum of 6 feet from the foundation. Recommend qualified contractor evaluate drainage and waterproofing at foundation perimeter.',
        },
        {
          priority: 'P3',
          location: 'Side yard walkway near downspout',
          observation:
            'Observed raised and uneven patio stones in side yard walkway area near downspout discharge point.',
          implication:
            'Raised and uneven patio stones present a trip hazard and may indicate ground heave from improper water drainage below.',
          recommendation:
            'Recommend monitoring and resetting raised patio stones. Correcting downspout discharge (noted above) should also address contributing drainage.',
        },
      ],
      satisfactory: [
        'Driveway — inspected, normal wear observed, no significant cracking or heaving',
        'Front entrance door — opens and closes properly, hardware functioning, well sealed',
        'Front patio — no cracks or damage observed',
        'Brick veneer (general) — good condition at majority of inspected elevations',
        'Ground grading — positive slope away from foundation observed at inspected locations',
        'Front landscaping — well maintained, no concerns observed',
        'Fence — generally good condition, stable',
        'Trees and vegetation — no significant encroachment on structure observed',
        'Rear yard — inspected, no significant concerns observed',
        'Side walkway (general) — good condition except noted raised stones',
        'Soffits and fascia — inspected from ground level, no significant damage observed',
      ],
    },
    {
      name: 'Section 5 — Roof System',
      findings: [
        {
          priority: 'P1',
          location: 'Chimney',
          observation:
            'Observed one loose bluestone on the chimney structure. Stone is unsecured and at risk of displacement.',
          implication:
            'A loose stone on the chimney presents a significant risk of falling and causing personal injury to occupants or visitors below during normal day-to-day use.',
          recommendation:
            'Recommend immediate referral to qualified mason to secure or remove the loose bluestone and evaluate overall chimney cap and crown condition.',
        },
        {
          priority: 'P2',
          location: 'North slope — shingles',
          observation:
            'Observed shingles with visible crimping and curling on the north-facing slope of the roof.',
          implication:
            'Crimped and curling shingles are no longer lying flat and are no longer providing full weather protection, increasing the risk of water penetration under the shingles and into the roof deck.',
          recommendation:
            'Recommend qualified roofing contractor evaluate the extent of shingle deterioration on the north slope and repair or replace affected shingles.',
        },
        {
          priority: 'P2',
          location: 'Roof flashings and penetrations',
          observation:
            'Observed one damaged flashing. Exposed nail holes noted at roof deck and penetration locations, not sealed with roofing sealant.',
          implication:
            'Damaged flashing and unsealed nail holes are potential water entry points that can lead to roof deck damage, sheathing rot, and interior water infiltration over time.',
          recommendation:
            'Recommend qualified roofing contractor repair damaged flashing and seal all exposed nail holes at penetrations.',
        },
        {
          priority: 'P2',
          location: 'Southwest and Northwest gutter corners',
          observation:
            'Observed two damaged eavestrough corner sections — one at the southwest corner and one at the northwest corner of the roof drainage system.',
          implication:
            'Damaged gutter corners prevent proper water channeling, allowing roof drainage to discharge near the foundation and potentially into the soffit area.',
          recommendation:
            'Recommend repair or replacement of damaged gutter corner sections to restore proper roof drainage.',
        },
      ],
      satisfactory: [
        'Roof covering (general) — asphalt shingles inspected, condition generally adequate at inspected locations except noted deficiency area',
        'Chimney structure (general) — masonry generally intact at inspected areas except noted loose stone',
        'Roof penetrations (general) — inspected, no significant concerns beyond noted unsealed nail holes',
      ],
    },
    {
      name: 'Section 6 — Plumbing System',
      findings: [
        {
          priority: 'P2',
          location: 'Main floor bathroom — toilet',
          observation:
            'Observed toilet on the main floor not flushing properly at time of inspection.',
          implication:
            'Toilet is not functioning as intended. A non-functioning toilet is a significant deficiency affecting habitability.',
          recommendation:
            'Recommend qualified plumber evaluate and repair or replace main floor toilet flush mechanism.',
        },
        {
          priority: 'P2',
          location: 'Basement utility area — sump pump',
          observation:
            'Sump pump observed in basement. Sump pump was not tested at time of inspection. Mold-like growth observed in the vicinity of the sump pump area.',
          implication:
            'An untested sump pump cannot be confirmed to be functioning. Failure during a high water event could lead to basement flooding. Mold-like growth in the area may indicate chronic moisture. Note: identification of mold species is outside the scope of this inspection.',
          recommendation:
            'Recommend qualified plumber test and service sump pump to confirm proper operation. Recommend environmental consultant assess mold-like growth.',
        },
      ],
      satisfactory: [
        'Water heater — Reliance 50-gallon gas water heater observed, no visible leaks or corrosion noted at time of inspection',
        'Main water shut-off — located and observed',
        'Bathroom shut-off valves — observed and accessible',
        'Visible supply and drain/waste lines — inspected at accessible locations, no active leaks observed',
        'Plumbing fixtures and faucets — tested at inspected locations, functioning properly except noted main floor toilet',
      ],
    },
    {
      name: 'Section 7 — Electrical System',
      findings: [
        {
          priority: 'P1',
          location: 'Front entrance — exterior light fixture',
          observation:
            'Observed exterior light fixture at the front entrance with visible damaged housing. Wiring observed to be exposed and unsecured at the exterior fixture location.',
          implication:
            'Exposed electrical wiring at an exterior location presents a significant risk of electrical shock to occupants or visitors during normal day-to-day use and is a fire hazard.',
          recommendation:
            'Recommend immediate referral to licensed electrician for evaluation, repair or replacement of the exterior light fixture and proper securing of all wiring.',
        },
        {
          priority: 'P1',
          location: 'Throughout house — carbon monoxide alarms absent',
          observation:
            'No carbon monoxide alarm was observed on any level of the home at the time of inspection. Gas appliances present including gas furnace and gas water heater.',
          implication:
            'Absence of carbon monoxide alarms in a home with gas appliances presents a significant risk of undetected CO poisoning, which can be fatal. CO alarms are required in all homes with fuel-burning appliances under Ontario law.',
          recommendation:
            'Recommend immediate installation of carbon monoxide alarms on every level of the home, particularly in hallways near sleeping areas, prior to occupancy.',
        },
        {
          priority: 'P2',
          location: 'Main electrical panel — circuit labeling',
          observation:
            'Circuit breakers in the main electrical panel are not properly labeled throughout. Multiple circuits could not be identified during inspection.',
          implication:
            'Unlabeled circuits prevent safe and efficient identification of circuits for emergency shut-off or maintenance.',
          recommendation:
            'Recommend licensed electrician accurately label all circuit breakers in the electrical panel.',
        },
        {
          priority: 'P2',
          location: 'Throughout house — smoke alarms',
          observation:
            'Smoke alarm coverage was observed to be insufficient. Not all required locations had smoke alarms observed at time of inspection.',
          implication:
            'Insufficient smoke alarm coverage reduces the time available for occupants to safely evacuate in the event of a fire.',
          recommendation:
            'Recommend installation of smoke alarms on every level of the home and inside and outside of every sleeping area as required by Ontario fire code.',
        },
        {
          priority: 'P2',
          location: 'All three bathrooms — GFCI receptacles',
          observation:
            'GFCI (Ground Fault Circuit Interrupter) protected receptacles were not present in all three bathrooms. GFCI protection was confirmed functioning in the kitchen.',
          implication:
            'Absence of GFCI protection at bathroom receptacles presents a significant risk of electrical shock in wet locations during normal day-to-day use.',
          recommendation:
            'Recommend licensed electrician install GFCI protected receptacles in all three bathrooms immediately.',
        },
        {
          priority: 'P3',
          location: 'Main electrical panel — AFCI protection',
          observation:
            'Presence or absence of AFCI (Arc Fault Circuit Interrupter) breakers in the electrical panel was not confirmed at time of inspection. Property built in 1987 — AFCI protection may not be present.',
          implication:
            'AFCI protection reduces the risk of electrical fires caused by arc faults in branch circuits. Absence in an older home may represent an opportunity to improve fire safety.',
          recommendation:
            'Recommend licensed electrician evaluate panel and advise on AFCI protection status and any recommended upgrades.',
        },
      ],
      satisfactory: [
        'Electrical service — 200-amp overhead service observed, appropriate for the home',
        'Main electrical panel (general) — breakers observed functional, no tripped breakers or obvious double-tapping noted',
        'GFCI protection — kitchen receptacles tested and confirmed functioning',
        'Wiring (general) — no significant concerns noted at accessible locations',
        'Service drop — overhead service drop inspected, no obstructions noted',
      ],
    },
    {
      name: 'Section 8 — Heating System',
      findings: [
        {
          priority: 'P2',
          location: 'Duct system throughout house',
          observation:
            'Duct system observed to be heavily soiled throughout inspected areas.',
          implication:
            'Heavily soiled ductwork reduces heating and cooling efficiency and may affect indoor air quality by circulating accumulated dust and debris throughout the home.',
          recommendation:
            'Recommend professional duct cleaning by a qualified HVAC contractor prior to occupancy.',
        },
        {
          priority: 'P3',
          location: 'Basement utility room — Carrier furnace',
          observation:
            'Carrier furnace observed. Unit is an older model. Blower motor compartment observed to be dirty with accumulated dust.',
          implication:
            'An older furnace with a dirty blower motor operates less efficiently and may be approaching the end of its service life.',
          recommendation:
            'Recommend qualified HVAC technician service the furnace including cleaning the blower motor assembly. Recommend monitoring furnace operation and budgeting for eventual replacement.',
        },
        {
          priority: 'P3',
          location: 'Furnace — filter compartment',
          observation:
            'Furnace filter observed to be dirty and in need of replacement at time of inspection.',
          implication:
            'A dirty filter restricts airflow, reducing heating efficiency and placing additional strain on the blower motor.',
          recommendation:
            'Recommend immediate replacement of furnace filter with appropriately rated replacement.',
        },
      ],
      satisfactory: [
        'Gas supply to furnace — observed, no evidence of leaks at accessible connections',
        'Return vents — inspected at representative locations, no significant blockages noted',
        'Heat registers — observed throughout home',
      ],
    },
    {
      name: 'Section 9 — Air Conditioning',
      findings: [],
      satisfactory: [
        'Carrier central AC unit — newer model observed, good general condition at time of inspection. Unit NOT operated — outdoor temperature was below minimum operating threshold at time of inspection. Cold-weather operation risks compressor damage. Recommend testing when outdoor temperatures are appropriate.',
      ],
    },
    {
      name: 'Section 10 — Interior',
      findings: [
        {
          priority: 'P3',
          location: 'Bathroom — mirror',
          observation:
            'Bathroom mirror observed to be damaged.',
          implication:
            'Damaged mirror is a cosmetic deficiency and potential safety concern if breakage occurs.',
          recommendation:
            'Recommend replacement of damaged bathroom mirror.',
        },
      ],
      satisfactory: [
        'Bedrooms (5) — inspected, walls, ceilings, floors in satisfactory condition at time of inspection',
        'Stairway railings and guards — inspected, good condition, no damage or instability observed',
        'Representative windows and doors — tested, opening and closing properly, no significant deficiencies observed',
        'Interior walls, ceilings, floors (general) — inspected at representative locations, no significant deficiencies beyond noted items',
      ],
    },
    {
      name: 'Section 11 — Insulation and Ventilation',
      findings: [
        {
          priority: 'P2',
          location: 'Thermal imaging — moisture detection',
          observation:
            'Thermal imaging camera was used during inspection. Elevated moisture readings were detected at inspected wall and ceiling surfaces in certain areas of the home.',
          implication:
            'Elevated moisture readings detected via thermal imaging may indicate water infiltration, plumbing leak, or condensation issues within wall or ceiling cavities. The exact source cannot be determined without invasive investigation.',
          recommendation:
            'Recommend qualified contractor investigate source of elevated moisture readings identified via thermal imaging to prevent structural damage or mold growth.',
        },
        {
          priority: 'P3',
          location: 'Bathroom exhaust fan',
          observation:
            'Bathroom exhaust fan observed to be producing excessive noise during operation.',
          implication:
            'An excessively noisy exhaust fan may indicate a worn motor or bearing, and may discourage use, leading to inadequate moisture ventilation.',
          recommendation:
            'Recommend cleaning or replacing bathroom exhaust fan to ensure effective moisture ventilation.',
        },
        {
          priority: 'P3',
          location: 'Dryer exhaust duct',
          observation:
            'Dryer exhaust vent duct observed to be in need of cleaning based on visual assessment.',
          implication:
            'A clogged dryer vent is a recognized fire hazard and reduces dryer efficiency.',
          recommendation:
            'Recommend professional dryer vent cleaning prior to occupancy.',
        },
      ],
      satisfactory: [
        'Mechanical ventilation — inspected at accessible locations, generally functional',
        'Insulation — observed in unfinished spaces where accessible',
        'Kitchen ventilation — observed, functional',
      ],
    },
    {
      name: 'Section 12 — Fireplaces and Solid Fuel Burning Appliances',
      findings: [
        {
          priority: 'P3',
          location: 'Main floor — wood-burning fireplace',
          observation:
            'Creosote buildup observed in the firebox and visible flue area of the wood-burning fireplace.',
          implication:
            'Creosote accumulation in a chimney/flue is a recognized fire hazard. The interior of the flue was not inspected as this is outside the scope of a home inspection.',
          recommendation:
            'Recommend inspection and cleaning of the fireplace and chimney flue by a WETT-certified technician prior to use.',
        },
      ],
      satisfactory: [
        'Firebox structure — inspected at accessible areas, masonry generally intact',
        'Clearances around fireplace — no significant deficiencies observed',
      ],
    },
    {
      name: 'Garage',
      icon: '🚗',
      findings: [],
      satisfactory: [
        'Garage fire separation door — present, opens and closes properly, no damage observed. Gas proofing between garage and habitable space satisfactory',
        'Garage vehicle door — inspected, functioning properly, no significant damage observed',
        'Garage interior — walls, floor, ceiling inspected, no significant deficiencies noted beyond items already reported',
      ],
    },
  ],
  notInspected: [
    {
      system: 'Foundation Walls (Section 3)',
      reason:
        'Basement is fully finished. Foundation walls were not visible or accessible at the time of inspection. Recommend monitoring for any future signs of water infiltration, cracking, or movement. If concerns arise, refer to qualified structural engineer.',
    },
    {
      system: 'Attic (Section 11)',
      reason:
        'Potential asbestos-containing material was observed near the attic access point. Attic was not entered for safety reasons. Recommend qualified environmental consultant assess prior to any attic work.',
    },
    {
      system: 'Backflow Preventer (Section 6)',
      reason: 'Backflow preventer was not observed during inspection.',
    },
    {
      system: 'Air Conditioning — Operation (Section 9)',
      reason:
        'AC unit was not operated at time of inspection. Outdoor temperature was below the minimum threshold for safe compressor operation. Visual inspection only was performed. Recommend testing when outdoor temperatures are appropriate.',
    },
  ],
};

const job = {
  address: '45 Duckworth Rd',
  city: 'Cambridge, ON  N3H 0C1',
  inspectionType: 'Pre-Purchase Home Inspection',
  inspectionDate: '2026-03-22',
  inspector: 'Haroon Chaudhry — ASADS Certified Inspector',
};

const html = buildReportHtml(data, job, []);

writeFileSync('public/report-45-duckworth.html', html, 'utf-8');
console.log('Report written to public/report-45-duckworth.html');
