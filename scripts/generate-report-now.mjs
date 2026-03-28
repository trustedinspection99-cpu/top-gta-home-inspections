// One-off script: generate the 23 Seed House Lane inspection report
// Run: node scripts/generate-report-now.mjs

import fs from 'fs';
import path from 'path';

// ─── Photo loader ─────────────────────────────────────────────────────────────
const PICS = 'C:/Users/Owner/Pictures';
function img(filename) {
  const fullPath = `${PICS}/${filename}`;
  if (!fs.existsSync(fullPath)) return null;
  // Use file:// URL — works in Chrome when report is opened locally, prints to PDF fine
  return `file:///${PICS.replace(/\\/g, '/')}/${filename}`;
}

// ─── Report Data ─────────────────────────────────────────────────────────────
const reportData = {
  summary: {
    p1Count: 1,
    p2Count: 7,
    p3Count: 12,
    okCount: 8,
    assessment: "This Pre-Purchase Home Inspection of 23 Seed House Lane, Georgetown identified one urgent safety hazard — a furnace safety interlock that has been taped in the open position, requiring immediate correction by a qualified HVAC technician. Seven significant deficiencies were documented, including moisture and rust damage inside the furnace cabinet, a heavily soiled filter drawn into the blower motor, a tripped breaker rendering all top-floor bedroom outlets non-operational, three locations lacking required GFCI protection, and carbon monoxide alarms not observed on a property with gas appliances. Twelve monitoring items were noted, including aging roof shingles, a deck requiring sealing, driveway cracking, popcorn ceilings with potential asbestos risk (pre-1990 construction), and a loose main-floor handrail. Eight systems were found satisfactory including the 200A electrical panel, main water supply, water heater, and all three bedrooms. Overall, the property is structurally sound with typical age-related wear; the urgent and significant items should be addressed prior to closing or negotiated in the offer."
  },
  sections: [
    {
      name: "Heating System",
      findings: [
        {
          priority: "P1",
          location: "Furnace — Safety Interlock",
          observation: "Observed the furnace door/access panel safety switch taped in the open position, bypassing the interlock designed to shut off the system when the panel is removed.",
          implication: "This is a serious safety hazard. The safety interlock is a critical protective device that prevents the furnace from operating with the door open — bypassing it exposes occupants to moving components, heat exchanger gases, and potential fire risk during normal day-to-day use.",
          recommendation: "Recommend immediate correction by a qualified HVAC technician. The tape must be removed and the safety switch tested for proper function prior to continued use of the system.",
          photoUrls: [img('1000044970.jpg'), img('1000044965.jpg')].filter(Boolean)
        },
        {
          priority: "P2",
          location: "Furnace Cabinet & Blower Compartment",
          observation: "Observed visible rust, water staining, and moisture-related damage inside the furnace cabinet and lower blower compartment. Damage appears consistent with leakage over an extended period. The air conditioning system was not operational at time of inspection; the exact source of the leakage could not be confirmed.",
          implication: "Moisture intrusion inside a furnace cabinet indicates a past or ongoing water event, likely from an A/C condensate issue or plumbing above. Rust and water damage can compromise electrical components, heat exchanger integrity, and blower motor life. The source must be identified to determine whether the issue is active.",
          recommendation: "Recommend evaluation by a qualified HVAC technician to identify the source of moisture intrusion, assess current condition of affected components, and confirm whether repairs have been completed. Reassess the system during summer operation when the air conditioner is active.",
          photoUrls: [img('1000044966.jpg'), img('1000044967.jpg')].filter(Boolean)
        },
        {
          priority: "P2",
          location: "Furnace — Filter & Blower",
          observation: "Noted furnace filter is heavily soiled and has been partially drawn into the blower motor. Dust accumulation observed inside the blower motor compartment.",
          implication: "A filter drawn into the blower motor restricts airflow and can cause motor damage, overheating, and premature failure. Restricted airflow also reduces heating efficiency and can cause the heat exchanger to overheat.",
          recommendation: "Recommend immediate filter replacement. Recommend inspection and cleaning of the blower compartment by a qualified HVAC technician to assess whether the motor or wheel has been damaged.",
          photoUrls: [img('1000044968.jpg'), img('1000044969.jpg')].filter(Boolean)
        },
        {
          priority: "P3",
          location: "Furnace — Overall Maintenance",
          observation: "Noted significant dust accumulation on the furnace exterior, inside the blower compartment, and at the return air and evaporator coil area. No access panel for coil cleaning is present. No service records were available at the time of inspection.",
          implication: "Lack of regular maintenance reduces system efficiency and service life. Without a coil access panel, proper cleaning and servicing cannot be performed.",
          recommendation: "Recommend full HVAC system tune-up and professional servicing by a qualified HVAC technician. Recommend installation of an access panel for the evaporator coil to permit future servicing.",
          photoUrls: [img('1000044971.jpg')].filter(Boolean)
        }
      ],
      satisfactory: [
        "Carrier brand furnace, approximately 90% AFUE efficiency rating — reputable manufacturer",
        "Condensate drain pipe appears clean and unobstructed",
        "Refrigerant lines from A-coil to exterior unit appear intact with no visible damage",
        "Ductwork appears to have been serviced"
      ]
    },
    {
      name: "Air Conditioning",
      findings: [
        {
          priority: "P3",
          location: "Central Air Conditioning — Exterior Unit",
          observation: "Noted air conditioning system was not operational at time of inspection. System was not tested. Condensate drain appears clear and unobstructed. Refrigerant lines running from the A-coil to the exterior unit appear to be in good condition with no visible damage.",
          implication: "The AC system could not be fully evaluated. A pre-existing leak from the AC system may be the source of moisture damage observed in the furnace cabinet.",
          recommendation: "Recommend evaluation by a qualified HVAC technician when the system is operational during warmer months to confirm proper function and to assess whether the AC condensate system was the source of the previously observed furnace cabinet moisture.",
          photoUrls: [img('1000044981.jpg'), img('1000044982.jpg')].filter(Boolean)
        }
      ],
      satisfactory: []
    },
    {
      name: "Electrical System",
      findings: [
        {
          priority: "P2",
          location: "Top Floor — Bedroom Outlets",
          observation: "Observed all receptacles in the top-floor bedrooms are non-operational. Inspection of the main electrical panel identified that the corresponding breaker has tripped and could not be reset at the time of inspection.",
          implication: "A breaker that cannot be reset indicates a persistent fault condition — either a wiring fault, short circuit, or overloaded circuit. This is a fire and safety concern requiring professional evaluation.",
          recommendation: "Recommend evaluation and repair by a licensed electrician to identify the cause of the tripped breaker and restore safe, functional power to all top-floor bedroom receptacles.",
          photoUrls: [img('1000044977.jpg'), img('1000044978.jpg')].filter(Boolean)
        },
        {
          priority: "P2",
          location: "Multiple Locations — GFCI Protection",
          observation: "Noted receptacles near water sources are not GFCI (Ground Fault Circuit Interrupter) protected at three locations: main floor bathroom, kitchen (near sink), and second bathroom on top floor.",
          implication: "GFCI protection is required at all receptacles near water sources. Without GFCI protection, a ground fault near water can result in serious electric shock or electrocution during normal use.",
          recommendation: "Recommend replacement of all three non-GFCI receptacles with GFCI-protected outlets by a licensed electrician. All bathroom and kitchen outlets near water sources must be GFCI protected.",
          photoUrls: [img('1000044976.jpg')].filter(Boolean)
        },
        {
          priority: "P2",
          location: "All Occupied Floors — Carbon Monoxide Alarms",
          observation: "Noted carbon monoxide alarms were not observed or confirmed present at the time of inspection. The property contains gas-fired appliances (furnace and water heater) which produce CO as a combustion byproduct.",
          implication: "Carbon monoxide alarms are required under the Ontario Fire Code on every storey of a dwelling containing a fuel-burning appliance. Absence of CO alarms presents a serious risk of undetected CO poisoning, which can be fatal.",
          recommendation: "Recommend verifying presence of CO alarms on all floors and installing where absent. Consult a qualified electrician or fire safety professional to ensure compliance with the Ontario Fire Code."
        },
        {
          priority: "OK",
          location: "Main Electrical Panel",
          observation: "Observed 200A main electrical panel. Panel clearly labeled, wiring neatly arranged and secured. No signs of burning, overheating, or corrosion on breakers. One tripped breaker identified and noted separately as P2 deficiency.",
          implication: "Panel is functioning as intended at time of inspection overall.",
          recommendation: "No further action required on the panel itself. Address the tripped breaker per the P2 finding above.",
          photoUrls: [img('1000044975.jpg'), img('1000044976.jpg')].filter(Boolean)
        },
        {
          priority: "P3",
          location: "Front Entrance — Exterior Light",
          observation: "Noted exterior light fixture at front entrance has a missing bulb. Fixture could not be tested at time of inspection.",
          implication: "Exterior lighting is a safety feature for nighttime access. Non-functional exterior lighting may also indicate a fixture or wiring issue.",
          recommendation: "Recommend replacing the bulb and retesting the fixture. If the fixture remains non-functional after bulb replacement, refer to a licensed electrician for further evaluation.",
          photoUrls: [img('1000044992.jpg')].filter(Boolean)
        }
      ],
      satisfactory: [
        "200A underground electrical service — adequate for modern household demands",
        "Main panel breakers all clearly and properly labeled",
        "Wiring inside panel neatly arranged and properly secured",
        "No signs of burning or overheating on breakers",
        "Grounding system appears properly installed",
        "Electrical outlets and pot lights on main floor functioning properly"
      ]
    },
    {
      name: "Plumbing System",
      findings: [
        {
          priority: "OK",
          location: "Water Heater",
          observation: "Observed Rheem/Reliance 50-gallon gas water heater. Unit appears relatively new and in good condition. No leaks or gas safety concerns detected.",
          implication: "Water heater is functioning as intended at time of inspection.",
          recommendation: "Recommend monitoring for leaks or changes in hot water supply. No action required at this time.",
          photoUrls: [img('1000044972.jpg'), img('1000044973.jpg')].filter(Boolean)
        },
        {
          priority: "OK",
          location: "Main Water Supply — Shut-off Valve",
          observation: "Observed main water supply line is copper. Main water shut-off valve inspected and functioning properly. No visible corrosion, damage, or deficiencies in accessible supply line.",
          implication: "Main water supply is functioning as intended at time of inspection.",
          recommendation: "No action required. Inspector recommends all occupants know the location of the main shut-off valve.",
          photoUrls: [img('1000044974.jpg')].filter(Boolean)
        }
      ],
      satisfactory: [
        "Main water supply line is copper — durable, reliable material",
        "Main water shut-off valve inspected and functioning properly",
        "No visible corrosion, damage, or deficiencies in accessible supply line",
        "Rheem/Reliance 50-gallon water heater — unit appears relatively new and in good condition",
        "No leaks or gas safety concerns detected at water heater",
        "All visible piping and connections at water heater in good condition",
        "Kitchen shut-off valves present and functional, no leaks observed",
        "Bathroom shut-off valves present and functional across all bathrooms"
      ]
    },
    {
      name: "Exterior",
      findings: [
        {
          priority: "P2",
          location: "Foundation — Downspout Discharge",
          observation: "Observed downspout discharging water very close to the foundation wall. Evidence of water pooling near the foundation wall was noted. A noticeable dip in the driveway surface is present at the gutter discharge point, consistent with water accumulation.",
          implication: "Water pooling at the foundation is one of the primary causes of basement water intrusion, foundation deterioration, and soil settlement over time. Redirecting discharge is a low-cost measure to prevent potentially costly foundation issues.",
          recommendation: "Recommend extending or redirecting the downspout discharge to direct water away from the foundation, a minimum of 6 feet where practical. Recommend driveway repair at the dip area to prevent continued erosion and water pooling.",
          photoUrls: [img('1000045003.jpg')].filter(Boolean)
        },
        {
          priority: "P3",
          location: "Backyard Deck",
          observation: "Noted backyard deck appears structurally sound. Sealant and/or paint finish shows age-related deterioration and wear. Deck requires resealing or repainting.",
          implication: "Without adequate sealant protection, exposed wood decking is susceptible to moisture penetration, rot, and accelerated deterioration. This will shorten the deck's service life if not addressed.",
          recommendation: "Recommend cleaning and resealing or repainting the deck surface within the near term to maintain wood integrity and longevity.",
          photoUrls: [img('20260324_115952.jpg'), img('1000044984.jpg'), img('1000044985.jpg')].filter(Boolean)
        },
        {
          priority: "P3",
          location: "Driveway",
          observation: "Observed normal age-related wear including visible cracks and areas of settling in the driveway surface. A noticeable dip is present near the gutter discharge area.",
          implication: "Cracks and settlement can allow water infiltration which accelerates deterioration, particularly during freeze-thaw cycles. The dip near the gutter discharge worsens pooling and erosion.",
          recommendation: "Recommend repair or resurfacing of cracked areas and the settling dip. Redirecting gutter discharge away from the driveway will help prevent further damage.",
          photoUrls: [img('1000045001.jpg'), img('1000045005.jpg')].filter(Boolean)
        },
        {
          priority: "P3",
          location: "Backyard — Privacy Fence",
          observation: "Noted privacy fence boards are not perfectly aligned. Some boards show minor misalignment.",
          implication: "Misaligned fence boards may allow gaps to develop over time and may require more extensive repair if left unaddressed.",
          recommendation: "Recommend adjustment and minor repairs to re-align fence boards."
        }
      ],
      satisfactory: [
        "Exterior siding in good condition — no visible damage observed",
        "Windows clean and intact — no visible cracks or damage",
        "Front entrance door opens and closes properly — see photo",
        "Sliding backyard door functional — minor mesh/roller adjustment recommended (see Interior section)",
        "Garden beds noted — cleaning and maintenance recommended (cosmetic)"
      ]
    },
    {
      name: "Roof System",
      findings: [
        {
          priority: "P3",
          location: "Roof Covering — Shingles",
          observation: "Noted asphalt shingles are in overall fair condition showing typical signs of aging. No missing shingles, curling, or active damage observed at time of inspection. Asphalt shingles have a typical service life of approximately 25 years.",
          implication: "While no immediate deficiencies were observed, aging shingles approaching the end of their service life will require increasing maintenance and eventual replacement. Granule loss and minor weathering reduce waterproofing capacity over time.",
          recommendation: "Recommend monitoring roof condition annually. Recommend periodic evaluation by a qualified roofing contractor to assess remaining service life and plan for replacement."
        }
      ],
      satisfactory: [
        "No missing shingles observed",
        "No visible curling or lifting at time of inspection",
        "Downspouts properly installed and discharging (drainage concern noted separately)"
      ]
    },
    {
      name: "Interior",
      findings: [
        {
          priority: "P2",
          location: "Main Floor Staircase — Handrail",
          observation: "Noted the side handrail on the main floor staircase is loose and not properly secured.",
          implication: "A loose handrail presents a fall hazard during normal day-to-day stair use. A person relying on the handrail for balance could cause it to fail, resulting in a fall.",
          recommendation: "Recommend securing the handrail properly by a qualified contractor to ensure it can withstand normal use forces. This is a safety item requiring attention prior to occupancy.",
          photoUrls: [img('1000044993.jpg'), img('1000044994.jpg')].filter(Boolean)
        },
        {
          priority: "P3",
          location: "Basement & Living Room — Ceiling",
          observation: "Noted popcorn texture ceiling present in the basement and main floor living room. The home is consistent with late 1980s to 1990s construction. Popcorn ceilings of this era may contain asbestos-containing materials (ACM).",
          implication: "Popcorn ceilings in homes built prior to approximately 1995 have a documented risk of containing asbestos. Asbestos is not a hazard when intact; however, any disturbance or renovation involving these surfaces without prior testing poses a health risk. This falls outside the standard scope of a visual home inspection.",
          recommendation: "Recommend asbestos testing of popcorn ceiling material by a qualified environmental specialist prior to any renovation, sanding, scraping, or disturbance of these surfaces. This applies specifically to the basement and living room ceilings."
        },
        {
          priority: "P3",
          location: "Dining Room & Kitchen/Main Floor — Flooring",
          observation: "Noted squeaking sounds in the floor in the dining room and kitchen/main floor areas.",
          implication: "Floor squeaking may indicate loose subfloor fasteners, subfloor separation, or settlement. While typically a maintenance issue, it can worsen over time if left unaddressed.",
          recommendation: "Recommend further evaluation and repair as needed by a qualified contractor."
        },
        {
          priority: "P3",
          location: "Backyard Sliding Door",
          observation: "Noted the sliding door to the backyard — wire mesh screen is catching on the rollers during operation, with minor damage observed on the mesh.",
          implication: "Continued use may worsen damage to the mesh and rollers.",
          recommendation: "Recommend adjustment of the door rollers and minor repair or replacement of the mesh screen."
        },
        {
          priority: "P3",
          location: "Second Bathroom (Top Floor) — Towel Bar",
          observation: "Noted towel bar in the second top-floor bathroom is loose.",
          implication: "A loose towel bar can become a safety issue if used for support.",
          recommendation: "Recommend securing the towel bar to wall studs or with appropriate wall anchors."
        },
        {
          priority: "OK",
          location: "Primary Bedroom",
          observation: "Observed primary bedroom — walls, ceiling, flooring, and windows in satisfactory condition at time of inspection.",
          implication: "No deficiencies noted.",
          recommendation: "No action required.",
          photoUrls: [img('1000044996.jpg')].filter(Boolean)
        },
        {
          priority: "OK",
          location: "Bathroom — Upper Floor",
          observation: "Observed upper floor bathroom — fixtures, tile, plumbing, and ventilation in satisfactory condition at time of inspection.",
          implication: "No deficiencies noted.",
          recommendation: "No action required.",
          photoUrls: [img('1000044997.jpg')].filter(Boolean)
        }
      ],
      satisfactory: [
        "Basement walls freshly painted — no visible damage",
        "Basement flooring (vinyl) intact and in good condition",
        "Basement carpeted stairs in good condition",
        "All interior doors throughout the home open, close, and latch properly",
        "All interior lighting functional throughout the home",
        "Bedroom windows intact with no visible cracks or damage across all three bedrooms",
        "First bedroom en-suite: all fixtures, exhaust fan, plumbing, and lighting functioning properly",
        "Second top-floor bathroom: fixtures, toilet, and shower functioning properly",
        "Main floor bathroom toilet, sink properly mounted and functioning",
        "Kitchen cabinets open and close properly — no loose components",
        "Kitchen countertops professionally installed with no visible damage",
        "Kitchen exhaust fan operational (filters require cleaning)",
        "Main floor dining and living areas — walls, ceilings, and electrical satisfactory"
      ]
    },
    {
      name: "Insulation & Ventilation",
      findings: [],
      satisfactory: [
        "Dryer vent: combination flexible and metal ducting, joints taped and connected, no disconnections at time of inspection — regular cleaning (every 6 months) recommended to prevent lint fire hazard",
        "Bathroom exhaust fans operational in all bathrooms inspected",
        "Kitchen exhaust fan mounted and functional (filter cleaning recommended)"
      ]
    },
    {
      name: "Structural System",
      findings: [],
      satisfactory: [
        "Inspection was limited — townhouse configuration with finished walls, deck obstruction at rear, garage stairs partially blocking front, and side walls not visible. No visible structural deficiencies in the accessible areas inspected. If concerns arise, refer to a qualified structural engineer."
      ]
    },
    {
      name: "Garage",
      findings: [
        {
          priority: "OK",
          location: "Garage — Interior",
          observation: "Observed garage interior. Vehicle door and interior access stairs noted with no major damage.",
          implication: "Garage is satisfactory at time of inspection.",
          recommendation: "Recommend confirming fire-rated door between garage and living space (see satisfactory notes).",
          photoUrls: [img('1000044979.jpg')].filter(Boolean)
        }
      ],
      satisfactory: [
        "Vehicle door and interior access stairs observed with no major damage noted",
        "Fire separation between garage and habitable space was not fully confirmed — recommend verifying a solid-core, self-closing fire-rated door is in place between the garage and living space per Ontario Building Code requirements"
      ]
    }
  ],
  notInspected: [
    {
      system: "Attic — Insulation & Ventilation",
      reason: "Attic was not accessed or assessed during this inspection. Recommend attic inspection by a qualified contractor to evaluate insulation levels, vapour barrier condition, and ventilation adequacy."
    },
    {
      system: "Roof Flashings & Chimneys",
      reason: "Roof flashings and chimney conditions were not visible or accessible for assessment during this inspection. Recommend evaluation by a qualified roofing contractor."
    },
    {
      system: "Fireplace & Solid Fuel Appliances",
      reason: "No fireplaces or solid fuel burning appliances were observed on the property. Section not applicable."
    }
  ]
};

const job = {
  address: "23 Seed House Lane",
  city: "Georgetown, ON  L7G 6K9",
  inspectionType: "Pre-Purchase Home Inspection",
  inspectionDate: new Date().toLocaleDateString('en-CA'),
  inspector: "Haroon Choudhry — ASADS Home Inspection"
};

// ─── Template (inline from reportTemplate.ts) ───────────────────────────────

const PRIORITY_BADGE = {
  P1: '🔴 Priority 1 — Unsafe / Urgent',
  P2: '🟠 Priority 2 — Significant Deficiency',
  P3: '🟡 Priority 3 — Monitor / Maintenance',
  OK: '✅ Satisfactory',
};

const PRIORITY_CLASS = { P1: 'p1', P2: 'p2', P3: 'p3', OK: 'ok' };

const PRIORITY_LABEL = {
  P1: 'Unsafe / Urgent',
  P2: 'Significant Deficiency',
  P3: 'Monitor / Maintenance',
  OK: 'Satisfactory',
};

const SECTION_ICONS = [
  ['structural', '🏗️'], ['foundation', '🏗️'], ['exterior', '🌿'], ['roof', '🏠'],
  ['plumbing', '🚿'], ['electrical', '⚡'], ['heating', '🔥'], ['air conditioning', '❄️'],
  ['hvac', '❄️'], ['interior', '🛋️'], ['insulation', '🌡️'], ['ventilation', '🌡️'],
  ['fireplace', '🔥'], ['garage', '🚗'], ['deck', '🌳'],
];

function getSectionIcon(name, override) {
  if (override) return override;
  const lower = name.toLowerCase();
  for (const [key, icon] of SECTION_ICONS) {
    if (lower.includes(key)) return icon;
  }
  return '📋';
}

function findingTitle(f) {
  if (f.location && f.location.trim()) return f.location.trim();
  const obs = f.observation.replace(/^(Observed|Noted|Inspector observed)[,.\s]*/i, '').trim();
  const words = obs.split(' ').slice(0, 8).join(' ');
  return words.length < obs.length ? words + '…' : words;
}

function getInspectorName(inspector) {
  return inspector.split(/[—–-]/)[0].trim();
}

function getInitials(inspector) {
  return getInspectorName(inspector)
    .split(' ').filter(w => w.length > 0).map(w => w[0].toUpperCase()).join('').slice(0, 2);
}

function getReportRef(date, city) {
  const d = date.replace(/-/g, '').slice(2);
  const abbr = city.replace(/[^a-zA-Z]/g, '').slice(0, 3).toUpperCase();
  return `ASADS-20${d}-${abbr || 'ONT'}`;
}

function photoGrid(realUrls) {
  if (realUrls.length === 0) {
    return `<div class="photo-grid mt16" data-max="10"></div>
      <button class="add-photo-btn no-print" onclick="addPhotoSlot(this.previousElementSibling)" title="Add photo to this finding">📷 Add Photo</button>`;
  }
  const photoItems = realUrls.map((url, i) => `
        <div class="photo-item">
          <img src="${url}" style="width:100%;height:auto;display:block;" alt="Inspection photo ${i + 1}">
          <div class="photo-caption">Photo ${i + 1}</div>
        </div>`).join('');
  return `<div class="photo-grid mt16" data-max="10">${photoItems}</div>
      <button class="add-photo-btn no-print" onclick="addPhotoSlot(this.previousElementSibling)" title="Add another photo to this finding">📷 Add Photo</button>`;
}

function findingCard(f) {
  const cls = PRIORITY_CLASS[f.priority] ?? 'ok';
  const badge = PRIORITY_BADGE[f.priority] ?? '';
  const title = findingTitle(f);
  const allPhotos = f.photoUrls ?? [];
  return `
      <div class="finding-card ${cls} avoid-break">
        <div class="finding-head">
          <span class="finding-title">${title}</span>
          <span class="badge badge-${cls}">${badge}</span>
        </div>
        <div class="finding-body">
          <p><strong>Observation:</strong> ${f.observation}</p>
          <p><strong>Implication:</strong> ${f.implication}</p>
          <div class="finding-rec"><strong>Recommendation:</strong> ${f.recommendation}</div>
          ${photoGrid(allPhotos)}
        </div>
      </div>`;
}

function sectionPage(section, fullAddress, inspectionDate, inspector) {
  const icon = getSectionIcon(section.name, section.icon);
  const findingsHtml = section.findings.map(f => findingCard(f)).join('');
  const okHtml = section.satisfactory.length > 0 ? `
      <div class="notice green mt16">
        <div class="notice-title">✅ Satisfactory Items</div>
        <ul class="report-list mt8">
          ${section.satisfactory.map(s => `<li>${s}</li>`).join('')}
        </ul>
      </div>` : '';
  const breakClass = section.findings.length > 0 ? 'page-break' : '';
  return `
<div class="page-wrap ${breakClass}">
  <div class="doc-header">
    <div class="doc-header-logo">🔍 ASADS Home Inspection</div>
    <div class="doc-header-info">${fullAddress} · ${inspectionDate}<br>Inspector: ${inspector}</div>
  </div>
  <div class="section-header">
    <span class="section-header-icon">${icon}</span>
    <h2>${section.name}</h2>
  </div>
  <div class="section-body">
    ${findingsHtml || ''}
    ${okHtml}
  </div>
</div>`;
}

function buildTOC(data) {
  return data.sections.map(s => {
    const icon = getSectionIcon(s.name, s.icon);
    const counts = [
      s.findings.filter(f => f.priority === 'P1').length,
      s.findings.filter(f => f.priority === 'P2').length,
      s.findings.filter(f => f.priority === 'P3').length,
    ];
    const tags = [];
    if (counts[0]) tags.push(`<span class="badge badge-p1">${counts[0]} P1</span>`);
    if (counts[1]) tags.push(`<span class="badge badge-p2">${counts[1]} P2</span>`);
    if (counts[2]) tags.push(`<span class="badge badge-p3">${counts[2]} P3</span>`);
    if (!counts[0] && !counts[1] && !counts[2]) tags.push(`<span class="badge badge-ok">✅ OK</span>`);
    return `
      <li>
        <span>${icon} ${s.name}</span>
        <span>${tags.join(' ')}</span>
      </li>`;
  }).join('');
}

function buildSummaryTable(data) {
  const allFindings = [];
  for (const s of data.sections) {
    for (const f of s.findings) {
      if (f.priority !== 'OK') allFindings.push({ section: s.name, f });
    }
  }
  if (allFindings.length === 0) return '';
  const order = { P1: 0, P2: 1, P3: 2 };
  allFindings.sort((a, b) => (order[a.f.priority] ?? 9) - (order[b.f.priority] ?? 9));
  const rows = allFindings.map(({ section, f }) => `
    <tr>
      <td><span class="badge badge-${PRIORITY_CLASS[f.priority]}">${f.priority} — ${PRIORITY_LABEL[f.priority]}</span></td>
      <td>${section}</td>
      <td>${findingTitle(f)}</td>
      <td style="font-size:12px;">${f.recommendation}</td>
    </tr>`).join('');
  return `
  <table class="summary-table">
    <thead><tr><th>Priority</th><th>Section</th><th>Item</th><th>Recommendation</th></tr></thead>
    <tbody>${rows}</tbody>
  </table>`;
}

function buildReportHtml(data, job, coverPhotoUrl) {
  const reportDate = new Date().toLocaleDateString('en-CA');
  const fullAddress = `${job.address}${job.city ? ', ' + job.city : ''}`;
  const sectionPages = data.sections.map(s => sectionPage(s, fullAddress, job.inspectionDate, job.inspector)).join('');
  const notInspectedHtml = data.notInspected.length > 0 ? `
<div class="page-wrap page-break">
  <div class="doc-header">
    <div class="doc-header-logo">🔍 ASADS Home Inspection</div>
    <div class="doc-header-info">${fullAddress} · ${job.inspectionDate}</div>
  </div>
  <div class="section-header"><span class="section-header-icon">🚫</span><h2>Systems Not Inspected</h2></div>
  <div class="section-body">
    ${data.notInspected.map(n => `
    <div class="finding-card avoid-break" style="border-left:4px solid #6b7280;">
      <div class="finding-head"><span class="finding-title">${n.system}</span><span class="badge badge-ni">⚪ Not Inspected</span></div>
      <div class="finding-body"><p>${n.reason}</p></div>
    </div>`).join('')}
  </div>
</div>` : '';

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>ASADS Home Inspection Report — ${fullAddress}</title>
<style>
  :root {
    --blue:#1d4ed8;--blue-lt:#3b82f6;--blue-bg:#eff6ff;
    --red:#dc2626;--red-bg:#fef2f2;--orange:#ea580c;--orange-bg:#fff7ed;
    --yellow:#ca8a04;--yellow-bg:#fefce8;--green:#16a34a;--green-bg:#f0fdf4;
    --gray:#6b7280;--gray-bg:#f9fafb;--border:#e5e7eb;--text:#111827;
  }
  *{box-sizing:border-box;margin:0;padding:0;}
  body{font-family:'Segoe UI',Arial,sans-serif;color:var(--text);font-size:13.5px;line-height:1.65;background:#fff;}
  @page{margin:0;}
  @media print{
    .no-print{display:none!important;}.page-break{page-break-before:always;}
    .avoid-break{page-break-inside:avoid;}body{font-size:12px;}
    a{color:inherit;text-decoration:none;}.page-wrap{padding:12mm 14mm;}
    .cover{padding:0;-webkit-print-color-adjust:exact;print-color-adjust:exact;}
    .cover-header{padding:20px 36px;}.cover-body{padding:28px 36px 20px;justify-content:center;}
    .cover-footer{padding:12px 36px;}.section-header{page-break-after:avoid;}
    .finding-card{page-break-inside:avoid;margin-bottom:10px;}
    .section-body{padding:14px 18px;margin-bottom:0;}.doc-header{margin-bottom:16px;}
  }
  .cover{min-height:100vh;display:flex;flex-direction:column;background:linear-gradient(160deg,#0f172a 0%,#1e3a8a 55%,#1d4ed8 100%);color:white;}
  .cover-header{display:flex;align-items:center;justify-content:space-between;padding:28px 48px;border-bottom:1px solid rgba(255,255,255,0.15);}
  .cover-logo{display:flex;align-items:center;gap:14px;}
  .cover-logo-icon{width:48px;height:48px;background:var(--blue-lt);border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:22px;}
  .cover-logo-text{font-size:20px;font-weight:800;}.cover-logo-sub{font-size:11px;color:#93c5fd;letter-spacing:0.5px;}
  .cover-cert{text-align:right;font-size:11px;color:#93c5fd;line-height:1.8;}
  .cover-cert strong{color:white;}
  .cover-body{flex:1;display:flex;flex-direction:column;padding:40px 48px 28px;}
  .cover-photo-wrap{width:3in;height:3in;max-width:100%;margin:0 auto 24px;border-radius:14px;overflow:hidden;box-shadow:0 20px 60px rgba(0,0,0,0.5);border:3px solid rgba(255,255,255,0.2);}
  .cover-photo-wrap img{width:100%;height:100%;object-fit:cover;display:block;}
  .cover-address-card{background:rgba(255,255,255,0.1);border:1px solid rgba(255,255,255,0.2);border-radius:14px;padding:26px 32px;max-width:760px;margin:0 auto;}
  .cover-report-type{font-size:11px;text-transform:uppercase;letter-spacing:2px;color:#93c5fd;font-weight:700;margin-bottom:6px;}
  .cover-address{font-size:26px;font-weight:800;line-height:1.25;margin-bottom:4px;}
  .cover-address-sub{font-size:14px;color:#bfdbfe;margin-bottom:22px;}
  .cover-meta-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:18px;padding-top:18px;border-top:1px solid rgba(255,255,255,0.15);}
  .cover-meta-item label{font-size:10px;text-transform:uppercase;letter-spacing:1.5px;color:#93c5fd;display:block;margin-bottom:3px;}
  .cover-meta-item span{font-size:13px;font-weight:600;}
  .cover-footer{padding:16px 48px;display:flex;align-items:center;justify-content:space-between;border-top:1px solid rgba(255,255,255,0.15);font-size:11px;color:#93c5fd;}
  .page-wrap{max-width:900px;margin:0 auto;padding:36px 48px;}
  .doc-header{display:flex;align-items:center;justify-content:space-between;padding:10px 0;border-bottom:2px solid var(--blue);margin-bottom:28px;}
  .doc-header-logo{font-size:14px;font-weight:800;color:var(--blue);}
  .doc-header-info{font-size:11px;color:var(--gray);text-align:right;line-height:1.6;}
  .section-header{display:flex;align-items:center;gap:12px;padding:13px 20px;background:var(--blue);color:white;border-radius:10px 10px 0 0;}
  .section-header-icon{font-size:20px;}.section-header h2{font-size:16px;font-weight:700;}
  .section-body{border:1.5px solid var(--border);border-top:none;border-radius:0 0 10px 10px;padding:22px;margin-bottom:32px;}
  .badge{display:inline-flex;align-items:center;gap:5px;padding:3px 10px;border-radius:20px;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.5px;white-space:nowrap;}
  .badge-p1{background:#fef2f2;color:var(--red);border:1.5px solid #fca5a5;}
  .badge-p2{background:#fff7ed;color:var(--orange);border:1.5px solid #fed7aa;}
  .badge-p3{background:#fefce8;color:var(--yellow);border:1.5px solid #fde68a;}
  .badge-ok{background:#f0fdf4;color:var(--green);border:1.5px solid #86efac;}
  .badge-ni{background:#f9fafb;color:var(--gray);border:1.5px solid #e5e7eb;}
  .brow{display:flex;flex-wrap:wrap;gap:14px;margin-bottom:22px;}
  .sbadge{border-radius:12px;padding:18px 22px;text-align:center;flex:1;min-width:110px;border:2px solid;}
  .sbadge .n{font-size:48px;font-weight:900;line-height:1;}.sbadge .l{font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:1.5px;margin-top:4px;}
  .sbadge.p1{background:#fef2f2;border-color:#ef4444;color:#ef4444;}
  .sbadge.p2{background:#fff7ed;border-color:#f97316;color:#f97316;}
  .sbadge.p3{background:#fefce8;border-color:#eab308;color:#ca8a04;}
  .sbadge.ok{background:#f0fdf4;border-color:#22c55e;color:#16a34a;}
  .finding-card{border:1.5px solid var(--border);border-radius:8px;margin-bottom:16px;overflow:hidden;}
  .finding-card.p1{border-left:4px solid var(--red);}.finding-card.p2{border-left:4px solid var(--orange);}
  .finding-card.p3{border-left:4px solid var(--yellow);}.finding-card.ok{border-left:4px solid var(--green);}
  .finding-head{display:flex;align-items:center;justify-content:space-between;padding:10px 16px;background:var(--gray-bg);flex-wrap:wrap;gap:8px;}
  .finding-title{font-weight:700;font-size:13.5px;}.finding-body{padding:14px 16px;}
  .finding-body p{margin-bottom:8px;}
  .finding-rec{background:var(--blue-bg);border-left:3px solid var(--blue);padding:10px 14px;border-radius:0 6px 6px 0;margin-top:10px;font-size:12.5px;}
  .finding-rec strong{color:var(--blue);}
  .photo-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;}
  .photo-item{border-radius:8px;overflow:hidden;border:1px solid var(--border);position:relative;}
  .photo-caption{padding:6px 10px;font-size:11px;color:var(--gray);background:var(--gray-bg);text-align:center;}
  .notice{border-left:4px solid var(--blue);background:var(--blue-bg);padding:14px 18px;border-radius:0 8px 8px 0;margin:16px 0;font-size:12.5px;}
  .notice.green{border-color:var(--green);background:var(--green-bg);}.notice.yellow{border-color:var(--yellow);background:var(--yellow-bg);}
  .notice-title{font-weight:700;font-size:13px;margin-bottom:4px;}
  .summary-table{width:100%;border-collapse:collapse;margin-top:12px;font-size:12.5px;}
  .summary-table th{background:#1e3a8a;color:white;padding:10px 14px;text-align:left;font-size:11.5px;text-transform:uppercase;letter-spacing:0.5px;}
  .summary-table td{padding:10px 14px;border-bottom:1px solid var(--border);vertical-align:top;}
  .summary-table tr:last-child td{border-bottom:none;}.summary-table tr:nth-child(even) td{background:#f8faff;}
  .toc{list-style:none;}.toc li{padding:8px 0;border-bottom:1px dotted var(--border);display:flex;justify-content:space-between;align-items:center;}
  .toc li:last-child{border-bottom:none;}.toc-section-name{font-weight:600;font-size:13px;}
  .sig-box{border:1.5px solid var(--border);border-radius:10px;padding:22px;display:flex;gap:22px;align-items:flex-start;}
  .sig-avatar{width:60px;height:60px;background:var(--blue);border-radius:50%;display:flex;align-items:center;justify-content:center;color:white;font-size:22px;font-weight:800;flex-shrink:0;}
  .sig-name{font-size:16px;font-weight:800;margin-bottom:4px;}.sig-creds{font-size:12px;color:var(--gray);line-height:1.8;}
  ul.report-list{padding-left:20px;margin:8px 0;}ul.report-list li{margin-bottom:5px;}
  strong{font-weight:700;}.mt8{margin-top:8px;}.mt16{margin-top:16px;}
  h1{font-size:20px;font-weight:800;color:var(--blue);margin-bottom:20px;}
  .print-btn{position:fixed;top:16px;right:16px;z-index:999;background:var(--blue);color:white;border:none;padding:10px 20px;border-radius:8px;font-size:14px;font-weight:600;cursor:pointer;box-shadow:0 4px 12px rgba(29,78,216,0.4);}
  .print-btn:hover{background:#1e40af;}
  .add-photo-btn{display:inline-flex;align-items:center;gap:6px;margin-top:8px;padding:5px 12px;background:var(--gray-bg);border:1.5px dashed #d1d5db;border-radius:6px;font-size:12px;font-weight:600;color:var(--gray);cursor:pointer;}
  .add-photo-btn:hover{background:var(--blue-bg);border-color:var(--blue-lt);color:var(--blue);}
  .remove-photo-btn{position:absolute;top:5px;right:5px;width:22px;height:22px;background:rgba(220,38,38,0.85);color:white;border:none;border-radius:50%;font-size:13px;font-weight:700;cursor:pointer;display:flex;align-items:center;justify-content:center;line-height:1;z-index:10;}
  .remove-photo-btn:hover{background:#b91c1c;}
  .photo-placeholder{display:flex;flex-direction:column;align-items:center;justify-content:center;color:rgba(0,0,0,0.35);gap:6px;font-size:11px;text-align:center;background:rgba(0,0,0,0.03);border:2px dashed #d1d5db;cursor:pointer;}
  .photo-placeholder.small{height:150px;}
</style>
<script>
  var _targetItem=null,_inp=null,_coverMode=false;
  function addRemoveBtn(item){if(item.querySelector('.remove-photo-btn'))return;var btn=document.createElement('button');btn.className='remove-photo-btn no-print';btn.title='Remove photo';btn.textContent='\u00d7';btn.addEventListener('click',function(e){e.stopPropagation();var grid=item.parentElement;grid.removeChild(item);Array.from(grid.children).forEach(function(child,i){var cap=child.querySelector('.photo-caption');if(cap&&!child.querySelector('.photo-placeholder'))cap.textContent='Photo '+(i+1);});});item.appendChild(btn);}
  function wireSlot(item){var ph=item.querySelector('.photo-placeholder');if(ph){ph.addEventListener('click',function(){_targetItem=item;_inp.value='';_inp.click();});}if(item.querySelector('img'))addRemoveBtn(item);}
  function addPhotoSlot(grid){var max=parseInt(grid.dataset.max||'10',10);if(grid.children.length>=max)return;var item=document.createElement('div');item.className='photo-item';var ph=document.createElement('div');ph.className='photo-placeholder small';ph.title='Click to add photo';ph.innerHTML='<span style="font-size:24px;opacity:0.45;">📷</span><span>Click to add photo</span>';var cap=document.createElement('div');cap.className='photo-caption';cap.textContent='Tap to add';item.appendChild(ph);item.appendChild(cap);grid.appendChild(item);wireSlot(item);}
  document.addEventListener('DOMContentLoaded',function(){_inp=document.createElement('input');_inp.type='file';_inp.accept='image/*';_inp.style.display='none';document.body.appendChild(_inp);_inp.addEventListener('change',function(){if(!_inp.files[0])return;if(_coverMode){_coverMode=false;var wrap=document.getElementById('cover-photo-wrap');var existing=wrap.querySelector('#cover-photo-placeholder,img');var img=document.createElement('img');img.src=URL.createObjectURL(_inp.files[0]);img.style.cssText='width:100%;height:100%;object-fit:cover;display:block;cursor:pointer;';img.addEventListener('click',function(){_coverMode=true;_inp.value='';_inp.click();});if(existing){if(existing.tagName==='IMG'&&existing.src.startsWith('blob:'))URL.revokeObjectURL(existing.src);wrap.replaceChild(img,existing);}else{wrap.appendChild(img);}_inp.value='';return;}if(!_targetItem)return;var objectUrl=URL.createObjectURL(_inp.files[0]);var img=document.createElement('img');img.src=objectUrl;img.style.cssText='width:100%;height:auto;display:block;';img.alt='Inspection photo';var ph=_targetItem.querySelector('.photo-placeholder');if(ph){_targetItem.replaceChild(img,ph);}else{var old=_targetItem.querySelector('img');if(old){if(old.src&&old.src.startsWith('blob:'))URL.revokeObjectURL(old.src);_targetItem.replaceChild(img,old);}}var grid=_targetItem.parentElement;var idx=Array.from(grid.children).indexOf(_targetItem)+1;var cap=_targetItem.querySelector('.photo-caption');if(cap)cap.textContent='Photo '+idx;addRemoveBtn(_targetItem);_inp.value='';_targetItem=null;});var coverPh=document.getElementById('cover-photo-placeholder');if(coverPh){coverPh.addEventListener('click',function(){_coverMode=true;_inp.value='';_inp.click();});}document.querySelectorAll('.photo-grid .photo-item').forEach(wireSlot);});
</script>
</head>
<body>
<button class="print-btn no-print" onclick="window.print()">Save as PDF</button>

<div class="cover">
  <div class="cover-header">
    <div class="cover-logo">
      <div class="cover-logo-icon">🔍</div>
      <div><div class="cover-logo-text">ASADS Home Inspection</div><div class="cover-logo-sub">Licensed · OAHI/CAHPI Standards · Intact Insurance</div></div>
    </div>
    <div class="cover-cert"><strong>Ontario Home Inspection Act, 2017</strong><br>OAHI/CAHPI 2023 National Standards<br>Insured by Intact Insurance<br>(647) 801-9311 · info@asads.ca</div>
  </div>
  <div class="cover-body">
    <div class="cover-photo-wrap" id="cover-photo-wrap">
      ${coverPhotoUrl
        ? `<img src="${coverPhotoUrl}" style="width:100%;height:100%;object-fit:cover;display:block;" alt="Property photo">`
        : `<div class="photo-placeholder" id="cover-photo-placeholder" style="height:100%;border-radius:0;border:none;background:rgba(255,255,255,0.08);border:2px dashed rgba(255,255,255,0.25);" title="Click to add property photo"><div style="font-size:28px;color:rgba(255,255,255,0.4);">🏠</div><span style="font-size:12px;color:rgba(255,255,255,0.5);">Click to add property photo</span></div>`
      }
    </div>
    <div class="cover-address-card">
      <div class="cover-report-type">${job.inspectionType}</div>
      <div class="cover-address">${job.address}</div>
      <div class="cover-address-sub">${job.city}</div>
      <div class="cover-meta-grid">
        <div class="cover-meta-item"><label>Inspection Date</label><span>${job.inspectionDate}</span></div>
        <div class="cover-meta-item"><label>Report Date</label><span>${reportDate}</span></div>
        <div class="cover-meta-item"><label>Inspector</label><span>${getInspectorName(job.inspector)}</span></div>
        <div class="cover-meta-item"><label>Urgent Items</label><span style="color:#fca5a5;">${data.summary.p1Count} P1 — Unsafe</span></div>
        <div class="cover-meta-item"><label>Significant</label><span style="color:#fed7aa;">${data.summary.p2Count} P2 — Deficiencies</span></div>
        <div class="cover-meta-item"><label>Monitor</label><span style="color:#fde68a;">${data.summary.p3Count} P3 — Items</span></div>
      </div>
    </div>
  </div>
  <div class="cover-footer"><span>Prepared per OAHI Standards of Practice &amp; CAHPI 2023 National Standards</span><span>asads.ca · Cambridge, ON</span></div>
</div>

<div class="page-wrap page-break">
  <div class="doc-header"><div class="doc-header-logo">🔍 ASADS Home Inspection</div><div class="doc-header-info">${fullAddress} · ${job.inspectionDate}<br>Inspector: ${job.inspector}</div></div>
  <h1>Important Notices &amp; Scope of Inspection</h1>
  <div class="notice" style="margin-bottom:20px;"><div class="notice-title">OAHI/CAHPI Standard Disclaimer</div>This report was prepared in accordance with the Standards of Practice of the Ontario Association of Home Inspectors (OAHI) and the Canadian Association of Home &amp; Property Inspectors (CAHPI) 2023 National Standards. This inspection is not technically exhaustive. It will not identify concealed conditions or latent defects. Systems and components are reported on as observed at the time of inspection only.</div>
  <div class="notice yellow" style="margin-bottom:20px;"><div class="notice-title">What This Inspection Does NOT Include</div><ul class="report-list mt8"><li>Determination of remaining service life of any component</li><li>Engineering opinion on structural adequacy or load capacity</li><li>Code compliance, regulatory, or bylaw compliance determination</li><li>Environmental hazard assessment (mold, asbestos, radon) unless separately contracted</li><li>Market value or advisability of purchase</li><li>Concealed or latent defects not visible at time of inspection</li></ul></div>
</div>

<div class="page-wrap page-break">
  <div class="doc-header"><div class="doc-header-logo">🔍 ASADS Home Inspection</div><div class="doc-header-info">${fullAddress} · ${job.inspectionDate}</div></div>
  <h1>Table of Contents</h1>
  <ul class="toc">
    <li><span class="toc-section-name">📋 Executive Summary</span><span></span></li>
    ${buildTOC(data)}
    ${data.notInspected.length > 0 ? '<li><span class="toc-section-name">🚫 Systems Not Inspected</span><span></span></li>' : ''}
    <li><span class="toc-section-name">📄 General Limitations &amp; Inspector Declaration</span><span></span></li>
  </ul>
</div>

<div class="page-wrap page-break">
  <div class="doc-header"><div class="doc-header-logo">🔍 ASADS Home Inspection</div><div class="doc-header-info">${fullAddress} · ${job.inspectionDate}</div></div>
  <div class="section-header"><span class="section-header-icon">📋</span><h2>Executive Summary</h2></div>
  <div class="section-body">
    <div class="brow">
      <div class="sbadge p1"><div class="n">${data.summary.p1Count}</div><div class="l">Unsafe / Urgent</div></div>
      <div class="sbadge p2"><div class="n">${data.summary.p2Count}</div><div class="l">Significant Deficiency</div></div>
      <div class="sbadge p3"><div class="n">${data.summary.p3Count}</div><div class="l">Monitor / Near EOL</div></div>
      <div class="sbadge ok"><div class="n">${data.summary.okCount}</div><div class="l">Satisfactory</div></div>
    </div>
    <p style="font-size:14px;line-height:1.8;color:#334155;margin-bottom:24px;">${data.summary.assessment}</p>
    ${buildSummaryTable(data)}
  </div>
</div>

${sectionPages}
${notInspectedHtml}

<div class="page-wrap page-break">
  <div class="doc-header"><div class="doc-header-logo">🔍 ASADS Home Inspection</div><div class="doc-header-info">${fullAddress} · ${job.inspectionDate}</div></div>
  <div class="section-header"><span class="section-header-icon">✅</span><h2>Inspector Information &amp; Declaration</h2></div>
  <div class="section-body">
    <div class="sig-box" style="margin-bottom:24px;">
      <div class="sig-avatar">${getInitials(job.inspector)}</div>
      <div style="flex:1;">
        <div class="sig-name">${getInspectorName(job.inspector)}</div>
        <div class="sig-creds">Home Inspector · ASADS Home Inspection<br>CMI® — Certified Master Inspector<br>Licensed under the <strong>Ontario Home Inspection Act, 2017</strong><br>OAHI · CAHPI National Standards Compliant<br>Insured by Intact Insurance (E&amp;O &amp; General Liability)<br>Criminal Background Verified</div>
        <div style="margin-top:10px;font-size:12px;color:var(--gray);">Phone: (647) 801-9311 &nbsp;|&nbsp; Email: info@asads.ca &nbsp;|&nbsp; Web: asads.ca</div>
      </div>
    </div>
    <h3 style="font-size:14px;font-weight:700;color:var(--blue);margin-bottom:10px;">Inspector Declaration</h3>
    <p style="font-size:13px;line-height:1.8;color:#334155;margin-bottom:12px;">I, <strong>${getInspectorName(job.inspector)}</strong>, declare that this report accurately reflects the observations made during the inspection of the property located at <strong>${fullAddress}</strong>, conducted on <strong>${job.inspectionDate}</strong>. The inspection was performed in accordance with the Standards of Practice of the Ontario Association of Home Inspectors (OAHI) and the requirements of the Ontario Home Inspection Act, 2017.</p>
    <p style="font-size:13px;line-height:1.8;color:#334155;margin-bottom:24px;">This report is the property of ASADS Home Inspection and the named client. It is not transferable and may not be relied upon by any party other than the named client without the express written consent of ASADS Home Inspection.</p>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-bottom:24px;">
      <div style="border:1.5px solid var(--border);border-radius:8px;padding:16px;"><div style="font-size:10px;text-transform:uppercase;letter-spacing:1.5px;color:var(--gray);margin-bottom:8px;">Inspector Signature</div><div style="font-size:15px;font-style:italic;font-weight:600;border-bottom:1px solid var(--border);padding-bottom:6px;margin-bottom:6px;">${getInspectorName(job.inspector)}</div><div style="font-size:11px;color:var(--gray);">${job.inspectionDate}</div></div>
      <div style="border:1.5px solid var(--border);border-radius:8px;padding:16px;"><div style="font-size:10px;text-transform:uppercase;letter-spacing:1.5px;color:var(--gray);margin-bottom:8px;">Company Stamp / Seal</div><div style="font-size:14px;font-weight:800;color:var(--blue);margin-bottom:4px;">ASADS Home Inspection</div><div style="font-size:11px;color:var(--gray);">asads.ca · (647) 801-9311</div></div>
    </div>
    <div class="notice yellow" style="margin-bottom:16px;"><div class="notice-title">Disclaimer</div>This report is not a warranty, guarantee, or insurance policy of any kind. The inspector is not a structural engineer, licensed contractor, specialist in any specific trade, or environmental consultant. Where specialist evaluation is recommended, such evaluation should be completed by appropriately licensed and qualified professionals. The inspector's liability is limited to the fee paid for this inspection. ASADS Home Inspection carries Errors &amp; Omissions insurance and General Liability insurance.</div>
    <div class="notice green"><div class="notice-title">90-Day Inspection Warranty</div>This inspection is backed by ASADS Home Inspection's 90-day warranty. If a covered defect is discovered following the inspection that was accessible and should have been reported, ASADS Home Inspection will work to make it right. Contact us at (647) 801-9311 or info@asads.ca.</div>
  </div>
  <div style="text-align:center;padding:20px 0 8px;font-size:11px;color:var(--gray);border-top:1px solid var(--border);margin-top:24px;line-height:1.9;">
    <strong style="color:var(--blue);font-size:13px;">ASADS Home Inspection</strong><br>
    (647) 801-9311 &nbsp;·&nbsp; info@asads.ca &nbsp;·&nbsp; asads.ca<br>
    CMI® Certified Master Inspector · Licensed · Insured by Intact Insurance<br>
    Report Reference: <strong>${getReportRef(job.inspectionDate, job.city)}</strong> &nbsp;·&nbsp; © ${new Date().getFullYear()} ASADS Home Inspection. All rights reserved.
  </div>
</div>

</body>
</html>`;
}

// ─── Generate ─────────────────────────────────────────────────────────────────
const html = buildReportHtml(reportData, job, img('1000045000.jpg'));
const outPath = path.join(process.cwd(), 'report-23-seed-house-lane.html');
fs.writeFileSync(outPath, html, 'utf8');
console.log(`✅ Report generated: ${outPath}`);
console.log(`   Open in Chrome → click "Save as PDF" or Ctrl+P`);
