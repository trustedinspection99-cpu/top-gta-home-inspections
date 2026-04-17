/**
 * protasker-broad-gap.mjs
 * Broad competitor keyword gap analysis — noise filter only, no service whitelist
 * Covers ALL services Protasker offers
 */
import { readFileSync, writeFileSync } from 'fs';

const OUT = 'C:/Users/Owner/Documents/Protasker-Competitor-Gaps.md';
const orgFile = 'C:/Users/Owner/Documents/Protasker-Competitor-Organic.md';

const content = readFileSync(orgFile, 'utf8');

// ── Extract Protasker's own keywords
const protaskerKws = new Set();
const protStart = content.indexOf("## Protasker (`protasker.ca`)");
const protEnd = content.indexOf('\n## HomeStars');
const protSection = content.slice(protStart, protEnd);
const protLines = protSection.split('\n');
for (const line of protLines) {
  if (!line.startsWith('|')) continue;
  const cells = line.split('|').map(c => c.trim()).filter(Boolean);
  if (!cells[0] || cells[0] === 'Keyword' || cells[0].startsWith('-') || cells[0].length < 3) continue;
  protaskerKws.add(cells[0].toLowerCase().trim());
}
console.log(`Protasker own keywords: ${protaskerKws.size}`);

// ── Broad noise EXCLUDE — non-home-service categories
const NOISE_RX = [
  // Food & drink
  /\b(restaurant|cafe|coffee shop|pizza|sushi|thai|chinese|indian|italian|mexican|burger|pho|ramen|brunch|food delivery|takeout|brewery|bakery|diner|bistro|nightclub|lounge)\b/i,
  // Health / medical / wellness
  /\b(dentist|dental|orthodont|doctor|clinic|hospital|physio|chiro|massage therapist|optom|pharmacist|pharmacy|urgent care|naturopath|psycholog|psychiatr|therapist|counsell|veterinar|animal hospital|pet groom|daycare|childcare|preschool|podiatrist|chiropractor)\b/i,
  // Fitness & lessons
  /\b(gym |yoga |pilates|crossfit|personal trainer|personal fitness|piano |guitar lesson|guitar teacher|guitar instructor|singing lesson|singing teacher|singing instructor|music lesson|music teacher|golf lesson|dance lesson|voice lesson|drum lesson|violin|swimming lesson|martial arts|karate|tutoring|language lesson)\b/i,
  // Entertainment / psychic / non-home
  /\b(psychic|psychics|astrologer|fortune teller|medium reading|tarot)\b/i,
  // Retail & shopping
  /\b(clothing store|fashion store|jewelry store|florist|cannabis dispensary|liquor store|wine store|auto parts|car dealership|used car|grocery|supermarket)\b/i,
  // Entertainment / beauty / hospitality
  /\b(hotel|motel|resort|hair salon|barber shop|tattoo|nail salon|bowling|laser tag|escape room|arcade|cinema|theatre|museum|art gallery|wedding venue|banquet hall|photographer near me|videographer|psychic|astrologer|fortune tell)\b/i,
  // Finance / legal / professional (non-home)
  /\b(accountant|tax prep|bookkeeping|lawyer|attorney|notary|realtor|real estate agent|mortgage broker|insurance broker|financial advisor|investment firm)\b/i,
  // Tech support / computer
  /\b(computer repair|it support|web design|app develop|software develop|data recover|phone repair|iphone repair)\b/i,
  // Non-home Bark categories
  /\b(engraving|childmind|nanny|dog walk|dog train|dog groomer|pet sit|pet train|equestrian|driving lesson|bookkeep)\b/i,
  // Platform / navigation noise
  /^(homestars|bark\.com|jiffy|taskrabbit|urbantasker|yelp)\s/i,
  /\b(near me reviews|login|sign up|sign in|careers at|jobs at|about us|university|college|school near)\b/i,
];

function isNoise(kw) {
  const k = kw.toLowerCase();
  return NOISE_RX.some(p => p.test(k));
}

function parseVol(v) {
  if (!v || v === '—' || v === '-') return 0;
  v = String(v).replace(/,/g, '').trim();
  if (/[Kk]$/.test(v)) return parseFloat(v) * 1000;
  if (/[Mm]$/.test(v)) return parseFloat(v) * 1000000;
  return parseFloat(v) || 0;
}

function parseCPC(v) {
  if (!v || v === '—' || v === '-') return 0;
  return parseFloat(String(v).replace(/[$,]/g, '')) || 0;
}

// ── Parse each competitor section
const COMPETITORS = ['HomeStars', 'Bark.com', 'Jiffy', 'TaskRabbit', 'UrbanTasker'];

function parseCompetitorKws(name) {
  const headerPattern = `## ${name}`;
  const start = content.indexOf(headerPattern);
  if (start === -1) { console.log(`Section not found: ${name}`); return []; }
  const nextSection = content.indexOf('\n## ', start + headerPattern.length);
  const section = nextSection === -1 ? content.slice(start) : content.slice(start, nextSection);

  const rows = [];
  const seen = new Set();
  const lines = section.split('\n');

  for (const line of lines) {
    if (!line.startsWith('|')) continue;
    const cells = line.split('|').map(c => c.trim()).filter(Boolean);
    if (!cells[0] || cells[0] === 'Keyword' || cells[0].startsWith('-') || cells[0].length < 3) continue;
    const kw = cells[0].toLowerCase().trim();
    if (kw.length > 120 || seen.has(kw)) continue;
    seen.add(kw);
    const pos = parseInt(cells[1]) || 999;
    const vol = parseVol(cells[2]);
    const kd = parseInt(cells[3]) || 0;
    const cpc = parseCPC(cells[4]);
    rows.push({ kw, pos, vol, kd, cpc, source: name });
  }
  return rows;
}

// ── Build gap list
const allGaps = new Map();

for (const name of COMPETITORS) {
  const rows = parseCompetitorKws(name);
  console.log(`${name}: ${rows.length} keywords parsed`);
  for (const row of rows) {
    if (protaskerKws.has(row.kw)) continue;
    if (isNoise(row.kw)) continue;
    if (!allGaps.has(row.kw) || row.vol > allGaps.get(row.kw).vol) {
      allGaps.set(row.kw, row);
    }
  }
}

const gaps = [...allGaps.values()];
console.log(`\nTotal gap keywords (after noise filter): ${gaps.length}`);

// ── Segments
const easyWins = gaps
  .filter(r => r.kd <= 30 && r.vol >= 100 && r.pos <= 20)
  .sort((a, b) => b.vol - a.vol);

const highVol = gaps
  .filter(r => r.vol >= 500)
  .sort((a, b) => b.vol - a.vol);

const competitorPage1 = gaps
  .filter(r => r.pos <= 10 && r.vol >= 200)
  .sort((a, b) => b.vol - a.vol);

const lowKD = gaps
  .filter(r => r.kd > 0 && r.kd <= 20 && r.vol >= 50)
  .sort((a, b) => b.vol - a.vol);

console.log(`Easy wins (KD<=30, vol>=100, pos<=20): ${easyWins.length}`);
console.log(`High volume (500+): ${highVol.length}`);
console.log(`Competitor page 1 (pos<=10, vol>=200): ${competitorPage1.length}`);
console.log(`Low KD gems (KD<=20, vol>=50): ${lowKD.length}`);

// ── Service clusters (broad)
const SERVICE_CLUSTERS = {
  'Cleaning': /\b(clean|maid|janitorial|sanitiz|disinfect|pressure wash|power wash|carpet clean|upholstery|duct clean|dryer vent|window clean|steam clean)\b/i,
  'Plumbing': /\b(plumb|plumber|drain|pipe|faucet|toilet|water heater|sump pump|backflow|sewer|clog|leak|waterproof)\b/i,
  'Electrical': /\b(electr|electrician|wiring|panel|outlet|circuit|ev charger|generator|lighting install|smart home)\b/i,
  'HVAC / Furnace': /\b(hvac|furnace|boiler|heat pump|ac repair|air condition|duct|ventilation|thermostat|central air|mini.?split)\b/i,
  'Landscaping / Lawn': /\b(lawn|landscape|garden|grass|mow|sod|mulch|aerat|fertil|weed control|shrub|hedge|flower bed|yard)\b/i,
  'Tree Service': /\b(tree |stump|arborist|branch trim|tree trim|tree removal|tree pruning)\b/i,
  'Snow Removal': /\b(snow |ice removal|salting|winter mainten)\b/i,
  'Junk / Hauling': /\b(junk|hauling|rubbish|trash removal|waste removal|disposal|dumpster|demolit|basement cleanout|garage cleanout|debris)\b/i,
  'Moving': /\b(mov(ing|ers?)|relocation|storage unit|packing service)\b/i,
  'Painting': /\b(paint|stain|caulking|popcorn ceiling)\b/i,
  'Drywall': /\b(drywall|plaster|stucco|drywall patch|drywall repair)\b/i,
  'Flooring': /\b(floor|hardwood|laminate|vinyl plank|tile install|carpet install|grout|refinish floor)\b/i,
  'Renovation': /\b(renovat|remodel|basement finish|room addition|home addition|gut renovat|reno)\b/i,
  'Kitchen': /\b(kitchen|cabinet|countertop|backsplash|kitchen island|kitchen sink)\b/i,
  'Bathroom': /\b(bathroom|shower install|tub install|vanity|bath tile|bath reno)\b/i,
  'Roofing': /\b(roof|shingle|flat roof|eavestroph|fascia|soffit|flashing|skylight|roofing)\b/i,
  'Eavestrough / Gutters': /\b(eavestrough|gutter|downspout|gutter clean|gutter guard)\b/i,
  'Windows / Doors': /\b(window replace|window install|door install|door replace|sliding door|patio door|entry door|window repair)\b/i,
  'Fencing / Decking': /\b(fence|deck build|patio build|gazebo|pergola|interlocking|paver|interlock)\b/i,
  'Handyman': /\b(handyman|odd jobs|repair service|furniture assembl|tv mount|picture hang|caulking)\b/i,
  'Pest Control': /\b(pest|exterminator|cockroach|rodent|ant control|bed bug|termite|wasp|wildlife removal|raccoon|squirrel|bird control)\b/i,
  'Locksmith': /\b(locksmith|lock change|key cutting|deadbolt|smart lock|security install|alarm install)\b/i,
  'Pool / Hot Tub': /\b(pool service|hot tub|spa service|pool clean|pool opening|pool closing|pool repair)\b/i,
  'Appliance Repair': /\b(appliance repair|washer repair|dryer repair|dishwasher repair|fridge repair|stove repair|oven repair|microwave repair|freezer repair)\b/i,
  'Masonry / Concrete': /\b(mason|brickwork|concrete|interlocking|sidewalk repair|foundation repair|crack repair|parging|retaining wall)\b/i,
  'Siding / Exterior': /\b(siding|exterior cladding|exterior paint|stucco repair|soffit repair)\b/i,
  'EV Charger': /\b(ev charger|electric vehicle charger|level 2 charger|tesla charger|home charger)\b/i,
  'Garage': /\b(garage door|garage floor|garage organiz|garage storage)\b/i,
  'Home Inspection': /\b(home inspect|house inspect|property inspect|pre.purchase inspect|mold test|mold inspect)\b/i,
  'Insulation': /\b(insulat|attic insul|spray foam|blown.in)\b/i,
  'Fireplace / Chimney': /\b(fireplace|chimney|wood stove|gas fireplace|chimney sweep|chimney repair)\b/i,
  'Solar': /\b(solar panel|solar install|solar energy|photovoltaic)\b/i,
};

function getCluster(kw) {
  for (const [cluster, pattern] of Object.entries(SERVICE_CLUSTERS)) {
    if (pattern.test(kw)) return cluster;
  }
  return 'Other Home Services';
}

// ── Build report
const date = new Date().toISOString().split('T')[0];
let md = `# Protasker — Keyword Gap Analysis (All Services)\n`;
md += `*${date} · Canada · HomeStars, Bark, Jiffy, TaskRabbit, UrbanTasker vs Protasker.ca*\n\n`;

md += `## Summary\n\n`;
md += `| Segment | Count |\n|---------|-------|\n`;
md += `| Total unique gap keywords | ${gaps.length} |\n`;
md += `| Easy wins (KD≤30, vol≥100, comp pos≤20) | ${easyWins.length} |\n`;
md += `| High volume (500+ searches/mo) | ${highVol.length} |\n`;
md += `| Competitor page 1 (vol≥200) | ${competitorPage1.length} |\n`;
md += `| Low KD gems (KD≤20, vol≥50) | ${lowKD.length} |\n\n---\n\n`;

// Easy wins
md += `## Easy Win Keywords (KD ≤ 30 · Vol ≥ 100 · Competitor Pos ≤ 20)\n\n`;
md += `| Keyword | Vol | KD | CPC | Competitor | Pos |\n`;
md += `|---------|-----|----|-----|------------|-----|\n`;
easyWins.slice(0, 200).forEach(r => {
  md += `| ${r.kw} | ${r.vol.toLocaleString()} | ${r.kd || '—'} | ${r.cpc ? '$' + r.cpc.toFixed(2) : '—'} | ${r.source} | ${r.pos} |\n`;
});
md += `\n`;

// High volume
md += `## High Volume Opportunities (500+ searches/mo)\n\n`;
md += `| Keyword | Vol | KD | Competitor | Pos |\n`;
md += `|---------|-----|----|------------|-----|\n`;
highVol.slice(0, 150).forEach(r => {
  md += `| ${r.kw} | ${r.vol.toLocaleString()} | ${r.kd || '—'} | ${r.source} | ${r.pos} |\n`;
});
md += `\n`;

// Competitor page 1
md += `## Competitor Page 1 Targets (vol ≥ 200)\n`;
md += `*Competitor ranks 1–10 for these. Protasker not in top results at all.*\n\n`;
md += `| Keyword | Vol | KD | Competitor | Pos |\n`;
md += `|---------|-----|----|------------|-----|\n`;
competitorPage1.slice(0, 150).forEach(r => {
  md += `| ${r.kw} | ${r.vol.toLocaleString()} | ${r.kd || '—'} | ${r.source} | ${r.pos} |\n`;
});
md += `\n`;

// Low KD gems
md += `## Low KD Gems (KD ≤ 20 · Vol ≥ 50)\n\n`;
md += `| Keyword | Vol | KD | CPC | Competitor | Pos |\n`;
md += `|---------|-----|----|-----|------------|-----|\n`;
lowKD.slice(0, 200).forEach(r => {
  md += `| ${r.kw} | ${r.vol.toLocaleString()} | ${r.kd || '—'} | ${r.cpc ? '$' + r.cpc.toFixed(2) : '—'} | ${r.source} | ${r.pos} |\n`;
});
md += `\n---\n\n`;

// By service cluster
md += `## Gaps By Service Category\n\n`;

const byCluster = {};
for (const r of gaps) {
  const c = getCluster(r.kw);
  if (!byCluster[c]) byCluster[c] = [];
  byCluster[c].push(r);
}

const sortedClusters = Object.entries(byCluster)
  .map(([name, rows]) => ({
    name,
    rows: rows.sort((a, b) => b.vol - a.vol),
    totalVol: rows.reduce((s, r) => s + r.vol, 0),
    easyCount: rows.filter(r => r.kd <= 30 && r.vol >= 100 && r.pos <= 20).length,
    count: rows.length,
  }))
  .sort((a, b) => b.totalVol - a.totalVol);

// Summary table
md += `| Service Category | Gap Keywords | Easy Wins | Total Volume |\n`;
md += `|-----------------|-------------|-----------|-------------|\n`;
for (const { name, count, totalVol, easyCount } of sortedClusters) {
  md += `| ${name} | ${count} | ${easyCount} | ${totalVol.toLocaleString()} |\n`;
}
md += `\n`;

// Per-cluster detail
for (const { name, rows } of sortedClusters) {
  if (rows.length === 0) continue;
  md += `### ${name} (${rows.length} gaps)\n\n`;
  md += `| Keyword | Vol | KD | CPC | Competitor | Pos |\n`;
  md += `|---------|-----|----|-----|------------|-----|\n`;
  rows.slice(0, 50).forEach(r => {
    md += `| ${r.kw} | ${r.vol > 0 ? r.vol.toLocaleString() : '—'} | ${r.kd || '—'} | ${r.cpc ? '$' + r.cpc.toFixed(2) : '—'} | ${r.source} | ${r.pos} |\n`;
  });
  md += `\n`;
}

writeFileSync(OUT, md, 'utf8');
console.log(`\nSaved → ${OUT}`);
