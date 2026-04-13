/**
 * coverage-analysis.mjs
 * Maps all 4,057 competitor keywords to existing ASADS pages.
 * Outputs covered/missing counts and saves full report.
 */

import { readFileSync, writeFileSync } from 'fs';

const KW_FILE  = 'C:/Users/Owner/Documents/Competitor-Keywords.md';
const SITE_URL = 'https://www.asads.ca';
const OUT      = 'C:/Users/Owner/Documents/ASADS-Coverage-Report.md';

// ── 1. Extract all keywords from Competitor-Keywords.md ─────────────────────
const md = readFileSync(KW_FILE, 'utf8');

const allKws = new Map(); // keyword → { vol, kd, competitors: Set }

// Parse gap table first
const gapSection = md.match(/## Keyword Gap Analysis[\s\S]*?(?=\n---)/);
if (gapSection) {
  const rows = gapSection[0].split('\n').filter(l => l.startsWith('|') && !l.includes('---') && !l.includes('Keyword'));
  for (const row of rows) {
    const cols = row.split('|').map(c => c.trim()).filter(Boolean);
    if (cols.length >= 5) {
      const kw = cols[0].toLowerCase();
      const vol = cols[4];
      const kd = cols[5] || '';
      if (!allKws.has(kw)) allKws.set(kw, { orig: cols[0], vol, kd, competitors: new Set() });
      allKws.get(kw).competitors.add(cols[1]);
    }
  }
}

// Parse per-competitor tables
const compSections = md.split(/\n---\n/).slice(2); // skip summary + gap
for (const section of compSections) {
  const domainMatch = section.match(/## .+ — (.+?) \(/);
  const domain = domainMatch ? domainMatch[1] : 'unknown';
  const rows = section.split('\n').filter(l => l.startsWith('|') && !l.includes('---') && !l.includes('Keyword') && !l.includes('#'));
  for (const row of rows) {
    const cols = row.split('|').map(c => c.trim()).filter(Boolean);
    // Format: # | Keyword | Pos | Volume | KD | ASADS Pos
    if (cols.length >= 4) {
      const kwRaw = cols[1] || cols[0];
      const kw = kwRaw.toLowerCase();
      const vol = cols[3] || '';
      const kd  = cols[4] || '';
      if (!allKws.has(kw)) allKws.set(kw, { orig: kwRaw, vol, kd, competitors: new Set() });
      allKws.get(kw).competitors.add(domain);
    }
  }
}

console.log(`Total unique keywords: ${allKws.size}`);

// ── 2. Define ASADS pages ────────────────────────────────────────────────────
const PAGES = [
  // Homepage
  { url: '/', patterns: ['home inspection', 'house inspection', 'property inspection', 'building inspection', 'residential inspection', 'home inspector', 'home inspectors', 'inspection company', 'inspection services'] },

  // Service pages
  { url: '/services/pre-purchase-inspection', patterns: ['pre.purchase', 'pre purchase', 'pre-purchase', 'buyer', "buyer's", 'before buying', 'when buying'] },
  { url: '/services/pre-listing-inspection', patterns: ['pre.listing', 'pre listing', 'pre-listing', 'seller', "seller's", 'before selling', 'when selling', 'listing inspection'] },
  { url: '/services/new-construction-inspection', patterns: ['new construct', 'new build', 'new home', 'newly built', 'construction inspect'] },
  { url: '/services/condo-inspection', patterns: ['condo inspect', 'condo home inspect', 'townhouse inspect', 'condominium inspect'] },
  { url: '/services/pdi-inspection', patterns: ['pdi', 'pre.delivery', 'pre delivery', 'pre-delivery', 'tarion', 'builder walk', 'new condo inspect'] },
  { url: '/services/mold-inspection', patterns: ['mold inspect', 'mould inspect', 'mold test', 'mould test', 'mold assess', 'mould assess', 'mold survey', 'black mold inspect'] },
  { url: '/services/asbestos-testing', patterns: ['asbestos', 'asbestos test', 'asbestos inspect', 'asbestos survey', 'asbestos assess', 'asbestos sampl'] },
  { url: '/services/wett-inspection', patterns: ['wett', 'fireplace inspect', 'wood stove inspect', 'chimney inspect', 'solid fuel', 'woodstove'] },
  { url: '/services/radon-testing', patterns: ['radon'] },
  { url: '/services/commercial-inspection', patterns: ['commercial inspect', 'commercial property inspect', 'commercial building inspect', 'office inspect', 'industrial inspect'] },
  { url: '/services/same-day-inspection', patterns: ['same day', 'same-day', 'rush inspect', 'emergency inspect', 'urgent inspect', 'quick inspect', 'fast inspect', 'immediate inspect'] },
  { url: '/services/infrared-inspection', patterns: ['infrared', 'thermal imaging', 'thermal inspect', 'ir inspect'] },

  // Pricing page
  { url: '/pricing', patterns: ['cost', 'price', 'pricing', 'how much', 'fee', 'rate', 'charge', 'affordable', 'cheap'] },

  // Blog posts
  { url: '/blog/home-inspection-checklist-ontario', patterns: ['checklist', 'what to expect', 'what does.*include', 'what is checked', 'what inspectors look'] },
  { url: '/blog/what-does-home-inspection-include', patterns: ['what does.*include', 'what.*inspection include', 'included in.*inspection'] },
  { url: '/blog/home-inspection-cost-ontario', patterns: ['cost.*ontario', 'price.*ontario', 'how much.*ontario'] },
  { url: '/blog/mold-inspection-vs-air-quality', patterns: ['air quality', 'air test', 'indoor air', 'iaq'] },
  { url: '/blog/mold-testing-vs-mold-inspection', patterns: ['mold test.*vs', 'mold inspect.*vs', 'difference.*mold test', 'difference.*mold inspect'] },
  { url: '/blog/mold-removal-after-inspection', patterns: ['mold remov', 'mould remov', 'mold remediat', 'mould remediat', 'remove mold', 'get rid of mold'] },
  { url: '/blog/knob-and-tube-wiring-ontario', patterns: ['knob.and.tube', 'knob & tube', 'knob.and.tooth', 'knob.*tube', 'knob tube', 'old wiring', 'outdated wiring'] },
  { url: '/blog/aluminum-wiring-toronto', patterns: ['aluminum wiring', 'aluminium wiring', 'aluminum wire', 'aluminium wire'] },
  { url: '/blog/asbestos-in-ontario-homes-materials', patterns: ['asbestos.*home', 'asbestos.*house', 'asbestos.*material', 'asbestos.*ceiling', 'asbestos.*tile', 'asbestos.*floor', 'asbestos.*insul', 'asbestos.*pipe', 'asbestos.*stucco', 'popcorn ceiling', 'stipple ceiling', 'vermiculite'] },
  { url: '/blog/wett-inspection-cost-ontario', patterns: ['wett.*cost', 'wett.*price', 'wett.*fee', 'cost.*wett', 'price.*wett'] },
  { url: '/blog/radon-gas-ontario-homes', patterns: ['radon.*home', 'radon.*ontario', 'radon.*house', 'radon.*risk', 'radon.*safe', 'radon.*level', 'radon.*test'] },
  { url: '/blog/commercial-property-inspection-ontario', patterns: ['commercial.*inspect.*ontario', 'commercial building.*inspect'] },
  { url: '/blog/how-long-does-home-inspection-take', patterns: ['how long.*inspect', 'how long does.*inspect', 'time.*inspect', 'inspect.*take', 'duration.*inspect', 'inspect.*long'] },
  { url: '/blog/condensation-on-windows-winter', patterns: ['condensat', 'window.*condensat', 'condensat.*window', 'foggy window', 'moisture.*window', 'window.*moisture'] },
  { url: '/blog/first-time-home-buyer-inspection', patterns: ['first.time.*buyer', 'first time buyer', 'first home buyer', 'first.time.*homebuyer'] },
  { url: '/blog/pre-listing-inspection-guide', patterns: ['pre.listing.*guide', 'listing.*guide', 'sell.*inspect.*guide'] },
  { url: '/blog/home-inspection-red-flags', patterns: ['red flag', 'warning sign', 'major issue', 'deal breaker', 'failed inspect'] },
  { url: '/blog/condo-inspection-what-to-know', patterns: ['condo.*what', 'condo.*guide', 'condo.*tip', 'condo.*important'] },
  { url: '/blog/new-construction-inspection-guide', patterns: ['new construct.*guide', 'new build.*guide', 'new home.*inspect.*guide'] },
  { url: '/blog/foundation-problems-ontario', patterns: ['foundation', 'foundation crack', 'foundation issue', 'basement crack', 'basement waterproof', 'structural.*crack'] },
  { url: '/blog/roof-inspection-ontario', patterns: ['roof inspect', 'roof.*issue', 'roof.*problem', 'roofing inspect', 'flat roof', 'shingle'] },
  { url: '/blog/electrical-inspection-ontario', patterns: ['electrical inspect', 'electrical issue', 'wiring inspect', 'panel inspect', 'electrical panel', 'fuse box', 'breaker'] },
  { url: '/blog/plumbing-inspection-ontario', patterns: ['plumbing inspect', 'plumbing issue', 'plumbing problem', 'pipe inspect', 'drain inspect', 'water heater inspect'] },
  { url: '/blog/hvac-inspection-ontario', patterns: ['hvac inspect', 'furnace inspect', 'ac inspect', 'heat pump inspect', 'heating inspect', 'cooling inspect', 'ductwork inspect'] },
  { url: '/blog/sewer-scope-inspection-ontario', patterns: ['sewer scope', 'sewer inspect', 'drain camera', 'drain scope', 'sewer line', 'sewer camera'] },
  { url: '/blog/water-quality-testing-ontario', patterns: ['water.*test', 'water.*quality', 'water.*sample', 'well water', 'water.*inspect', 'drinking water', 'well.*test', 'water well'] },
  { url: '/blog/home-inspection-before-offer', patterns: ['before.*offer', 'condition.*inspect', 'waiv.*inspect', 'inspect.*condition', 'waive.*inspect'] },
  { url: '/blog/mold-prevention-homeowners', patterns: ['mold.*prevent', 'mould.*prevent', 'prevent.*mold', 'prevent.*mould', 'stop.*mold', 'avoid.*mold'] },
  { url: '/blog/home-inspection-report-guide', patterns: ['inspect.*report', 'report.*inspect', 'understand.*report', 'reading.*report'] },
  { url: '/blog/older-homes-inspection-ontario', patterns: ['old.*home.*inspect', 'older.*home', 'older.*house', 'heritage.*home', 'vintage.*home', '1960', '1970', '1980', '1950', '1940'] },
  { url: '/blog/townhouse-inspection-guide', patterns: ['townhouse.*inspect', 'town.*house.*inspect'] },
  { url: '/blog/home-inspection-for-investors', patterns: ['investor.*inspect', 'invest.*property.*inspect', 'rental.*inspect', 'investment.*property.*inspect'] },
  { url: '/blog/home-inspection-myths', patterns: ['myth', 'misconception', 'mistake.*inspect', 'inspect.*mistake'] },

  // New blogs added Apr 2026
  { url: '/blog/mould-vs-mold-ontario', patterns: ['mould.*mold', 'mold.*mould', 'mould vs mold', 'mold vs mould', 'mold or mould', 'mould or mold', 'difference.*mold.*mildew', 'mold.*mildew.*differ', 'mildew.*mold', 'black mould', 'black mold', 'stachybotrys', 'mold species', 'mold symptoms', 'toxic mold', 'mold health', 'mold spore'] },
  { url: '/blog/ice-dams-roof-ontario', patterns: ['ice dam', 'ice dams', 'ice damming', 'icicle', 'icicles.*roof', 'icicles.*eave', 'ice.*eave', 'ice.*roof', 'roof.*ice', 'winter.*roof.*damage', 'attic.*insulation.*roof', 'ice.*shingle', 'ice.*water.*shield'] },
  { url: '/blog/polybutylene-pipes-ontario', patterns: ['polybutylene', 'poly.b pipe', 'poly.b plumbing', 'quest pipe', 'grey.*plastic.*pipe', 'pb pipe'] },
  { url: '/blog/cold-room-cold-cellar-ontario', patterns: ['cold room', 'cold cellar', 'root cellar', 'fruit cellar', 'basement.*cold.*room', 'cold.*room.*basement'] },

  // Location pages (major cities)
  { url: '/locations/home-inspection-toronto', patterns: ['.*toronto'] },
  { url: '/locations/home-inspection-mississauga', patterns: ['.*mississauga'] },
  { url: '/locations/home-inspection-brampton', patterns: ['.*brampton'] },
  { url: '/locations/home-inspection-hamilton', patterns: ['.*hamilton'] },
  { url: '/locations/home-inspection-markham', patterns: ['.*markham'] },
  { url: '/locations/home-inspection-vaughan', patterns: ['.*vaughan'] },
  { url: '/locations/home-inspection-oakville', patterns: ['.*oakville'] },
  { url: '/locations/home-inspection-richmond-hill', patterns: ['.*richmond hill'] },
  { url: '/locations/home-inspection-burlington', patterns: ['.*burlington'] },
  { url: '/locations/home-inspection-ajax', patterns: ['.*ajax.*inspect', '.*inspect.*ajax'] },
  { url: '/locations/home-inspection-whitby', patterns: ['.*whitby'] },
  { url: '/locations/home-inspection-pickering', patterns: ['.*pickering'] },
  { url: '/locations/home-inspection-oshawa', patterns: ['.*oshawa'] },
  { url: '/locations/home-inspection-kitchener', patterns: ['.*kitchener'] },
  { url: '/locations/home-inspection-waterloo', patterns: ['.*waterloo'] },
  { url: '/locations/home-inspection-cambridge', patterns: ['.*cambridge.*inspect', '.*inspect.*cambridge'] },
  { url: '/locations/home-inspection-guelph', patterns: ['.*guelph'] },
  { url: '/locations/home-inspection-barrie', patterns: ['.*barrie'] },
  { url: '/locations/home-inspection-newmarket', patterns: ['.*newmarket'] },
  { url: '/locations/home-inspection-aurora', patterns: ['.*aurora'] },
  { url: '/locations/home-inspection-innisfil', patterns: ['.*innisfil'] },
  { url: '/locations/home-inspection-london-ontario', patterns: ['.*london.*ontario', 'london on.*inspect'] },
  { url: '/locations/home-inspection-kingston', patterns: ['.*kingston.*inspect', '.*inspect.*kingston'] },
  { url: '/locations/home-inspection-brantford', patterns: ['.*brantford'] },
  { url: '/locations/home-inspection-st-catharines', patterns: ['.*st.*catharines', '.*saint.*catharines', '.*niagara'] },
  { url: '/locations/home-inspection-milton', patterns: ['.*milton.*inspect', '.*inspect.*milton'] },
  { url: '/locations/home-inspection-caledon', patterns: ['.*caledon'] },
  { url: '/locations/home-inspection-halton-hills', patterns: ['.*halton'] },

  // Service×city (spot check major combos)
  { url: '/services/pre-purchase-inspection/toronto', patterns: ['pre.purchase.*toronto', 'toronto.*pre.purchase', 'buyer.*inspect.*toronto', 'toronto.*buyer.*inspect'] },
  { url: '/services/mold-inspection/toronto', patterns: ['mold.*toronto', 'toronto.*mold', 'mould.*toronto', 'toronto.*mould'] },
  { url: '/services/wett-inspection/toronto', patterns: ['wett.*toronto', 'toronto.*wett', 'fireplace.*toronto', 'toronto.*fireplace'] },
  { url: '/services/asbestos-testing/toronto', patterns: ['asbestos.*toronto', 'toronto.*asbestos'] },
  { url: '/services/radon-testing/toronto', patterns: ['radon.*toronto', 'toronto.*radon'] },
];

// ── 3. Irrelevant keyword filter ─────────────────────────────────────────────
const IRRELEVANT = [
  // Out of province / US
  /\b(alberta|bc|british columbia|manitoba|saskatchewan|quebec|nova scotia|new brunswick|pei|newfoundland|yukon|northwest|nunavut)\b/i,
  /\b(calgary|edmonton|vancouver|winnipeg|montreal|ottawa|halifax|regina|saskatoon|victoria)\b/i,
  /\b(florida|texas|california|new york|arizona|georgia|nevada|washington|colorado|ohio)\b/i,
  // French
  /\b(inspection maison|inspecteur|maison|propriété|acheteur|vendeur)\b/i,
  // Vehicles
  /\b(car|truck|auto|vehicle|used car|carfax|lemon)\b/i,
  // Unrelated
  /\b(plumber|electrician|contractor|renovati|landscap|pest control|eaves|soffit|gutter|duct clean|chimney sweep|chimney clean)\b/i,
  // Other countries
  /\b(uk|england|australia|new zealand|ireland)\b/i,
  // Competitor brand names
  /^(mike holmes|amerispec|pillar to post|a buyer.s choice|carson dunlop|inch by inch|twin peaks|solex|gpi home|smart choice home|house master|housemaster|rankin home|mdhi|robles|legacy home|building insights|1st call)\b/i,
];

function isIrrelevant(kw) {
  return IRRELEVANT.some(p => p.test(kw));
}

// ── 4. Map each keyword to a page ────────────────────────────────────────────
function findPage(kw) {
  const lw = kw.toLowerCase();
  for (const page of PAGES) {
    if (page.patterns.some(p => new RegExp(p, 'i').test(lw))) {
      return page.url;
    }
  }
  return null;
}

// ── 5. Run analysis ──────────────────────────────────────────────────────────
const covered   = [];
const missing   = [];
const skipped   = [];

for (const [kw, data] of allKws) {
  if (isIrrelevant(kw)) { skipped.push({ kw, ...data }); continue; }
  const page = findPage(kw);
  if (page) {
    covered.push({ kw, page, ...data });
  } else {
    missing.push({ kw, ...data });
  }
}

console.log(`\nResults:`);
console.log(`  Covered:   ${covered.length}`);
console.log(`  Missing:   ${missing.length}`);
console.log(`  Skipped:   ${skipped.length}`);
console.log(`  Total:     ${covered.length + missing.length + skipped.length}`);

// ── 6. Group missing by topic ─────────────────────────────────────────────────
function categorize(kw) {
  const lw = kw.toLowerCase();
  if (/mold|mould/.test(lw)) return 'Mold / Air Quality';
  if (/asbestos/.test(lw)) return 'Asbestos';
  if (/radon/.test(lw)) return 'Radon';
  if (/wett|fireplace|chimney|wood.?stove/.test(lw)) return 'WETT / Fireplace';
  if (/condo|townhouse|condominium/.test(lw)) return 'Condo';
  if (/new construct|new build|new home/.test(lw)) return 'New Construction';
  if (/pre.?purchas|buyer|before buy/.test(lw)) return 'Pre-Purchase';
  if (/pre.?list|seller|before sell/.test(lw)) return 'Pre-Listing';
  if (/pdi|pre.?deliver/.test(lw)) return 'PDI';
  if (/commercial|industrial|office/.test(lw)) return 'Commercial';
  if (/infrared|thermal/.test(lw)) return 'Infrared';
  if (/same.?day|rush|urgent|quick/.test(lw)) return 'Same Day';
  if (/cost|price|how much|fee|rate|cheap|afford/.test(lw)) return 'Pricing';
  if (/foundation|basement|crack/.test(lw)) return 'Foundation / Basement';
  if (/roof|shingle|flat roof/.test(lw)) return 'Roof';
  if (/electrical|wiring|panel|knob|aluminum/.test(lw)) return 'Electrical / Wiring';
  if (/plumb|pipe|drain|sewer|water heater/.test(lw)) return 'Plumbing';
  if (/hvac|furnace|heat|cool|ac |air condition/.test(lw)) return 'HVAC';
  if (/water.*test|well water|water quality|drinking water/.test(lw)) return 'Water Testing';
  if (/report/.test(lw)) return 'Report';
  if (/checklist|what.*include|what.*check/.test(lw)) return 'Checklist / Process';
  if (/how long|duration|time/.test(lw)) return 'How Long';
  if (/red flag|warning|issue|problem|concern/.test(lw)) return 'Red Flags';
  if (/toronto|mississauga|brampton|hamilton|markham|vaughan|oakville|richmond|burlington|ajax|whitby|pickering|oshawa/.test(lw)) return 'Location - GTA';
  if (/kitchener|waterloo|cambridge|guelph|london|barrie|kingston|brantford|niagara|st\.? catharines/.test(lw)) return 'Location - Ontario';
  if (/ontario/.test(lw)) return 'Ontario General';
  if (/home inspection|house inspection|property inspect|building inspect/.test(lw)) return 'General Home Inspection';
  if (/home inspector|inspector/.test(lw)) return 'Home Inspector (profession)';
  return 'Other';
}

const missingByCategory = {};
for (const m of missing) {
  const cat = categorize(m.kw);
  if (!missingByCategory[cat]) missingByCategory[cat] = [];
  missingByCategory[cat].push(m);
}

// Sort categories by count desc
const sortedCats = Object.entries(missingByCategory).sort((a, b) => b[1].length - a[1].length);

// ── 7. Build report ───────────────────────────────────────────────────────────
let parseVol = v => {
  if (!v || v === '—') return 0;
  const s = String(v).replace(',', '');
  return parseFloat(s) * (s.match(/[Kk]/) ? 1000 : s.match(/[Mm]/) ? 1e6 : 1) || 0;
};

let report = `# ASADS Keyword Coverage Report\n`;
report += `*Generated: ${new Date().toISOString().split('T')[0]} | Total unique keywords analyzed: ${allKws.size}*\n\n`;

report += `## Summary\n\n`;
report += `| Status | Count | % |\n|---|---|---|\n`;
const total = covered.length + missing.length + skipped.length;
report += `| Covered by existing page | ${covered.length} | ${Math.round(covered.length/total*100)}% |\n`;
report += `| Missing — no coverage | ${missing.length} | ${Math.round(missing.length/total*100)}% |\n`;
report += `| Skipped (irrelevant/out-of-province) | ${skipped.length} | ${Math.round(skipped.length/total*100)}% |\n`;
report += `| **Total unique keywords** | **${total}** | 100% |\n\n`;

report += `## Missing Keywords by Category\n\n`;
report += `*These keywords have NO matching ASADS page — highest priority content gaps.*\n\n`;
report += `| Category | Count | Top keyword (vol) |\n|---|---|---|\n`;
for (const [cat, items] of sortedCats) {
  const top = items.sort((a, b) => parseVol(b.vol) - parseVol(a.vol))[0];
  report += `| ${cat} | ${items.length} | "${top.kw}" (${top.vol || '—'}) |\n`;
}
report += '\n';

report += `## Covered Keywords — Page Mapping\n\n`;
report += `| Keyword | Page | Volume |\n|---|---|---|\n`;
covered.sort((a, b) => parseVol(b.vol) - parseVol(a.vol)).slice(0, 200).forEach(c => {
  report += `| ${c.kw} | ${c.page} | ${c.vol || '—'} |\n`;
});
report += `\n*(showing top 200 by volume — ${covered.length} total covered)*\n\n`;

report += `## Missing Keywords — Full List\n\n`;
for (const [cat, items] of sortedCats) {
  report += `### ${cat} (${items.length})\n\n`;
  report += `| Keyword | Volume | KD | Competitors |\n|---|---|---|---|\n`;
  items.sort((a, b) => parseVol(b.vol) - parseVol(a.vol)).forEach(m => {
    const comps = m.competitors ? Array.from(m.competitors).join(', ') : '—';
    report += `| ${m.kw} | ${m.vol || '—'} | ${m.kd || '—'} | ${comps} |\n`;
  });
  report += '\n';
}

writeFileSync(OUT, report, 'utf8');
console.log(`\n✅ Report saved: ${OUT}`);

// Print top missing by volume
const topMissing = missing.sort((a, b) => parseVol(b.vol) - parseVol(a.vol)).slice(0, 30);
console.log(`\nTop 30 missing keywords by volume:`);
topMissing.forEach((m, i) => {
  console.log(`  ${String(i+1).padStart(2)}. "${m.kw}" — vol ${m.vol || '?'}, KD ${m.kd || '?'}`);
});
