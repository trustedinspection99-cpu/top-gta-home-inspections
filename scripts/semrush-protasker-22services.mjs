/**
 * semrush-protasker-22services.mjs
 * Fresh SEMrush research for Protasker's trimmed 22-service / 30-city focus
 * API key from semrush-api.mjs
 *
 * Pulls:
 *  1. Protasker.ca current organic positions (what it ranks for now)
 *  2. Keyword metrics for all 22 services (volume, KD, CPC)
 *  3. City×service priority keywords (22 services × top 8 cities)
 *  4. Competitor gap: HomeStars + Bark keywords Protasker doesn't have
 *
 * Output: C:/Users/Owner/Documents/Protasker-22Services-Research.md
 */

import { writeFileSync } from 'fs';

const API_KEY = 'bef044c1537dc0352b290ace72c9ee47';
const DB      = 'ca';
const BASE    = 'https://api.semrush.com';
const sleep   = ms => new Promise(r => setTimeout(r, ms));
const OUT     = 'C:/Users/Owner/Documents/Protasker-22Services-Research.md';

// ── 22 Core Services ─────────────────────────────────────────────────────────
const SERVICES = [
  { slug: 'handyman',          label: 'Handyman Services' },
  { slug: 'plumbing-repair',   label: 'Plumbing Repairs' },
  { slug: 'electrical-repair', label: 'Electrician' },
  { slug: 'hvac-maintenance',  label: 'Furnace & AC Repair' },
  { slug: 'duct-cleaning',     label: 'Duct Cleaning' },
  { slug: 'junk-removal',      label: 'Junk Removal' },
  { slug: 'garage-door-repair',label: 'Garage Door Repair' },
  { slug: 'roofing-repairs',   label: 'Roof Repair' },
  { slug: 'gutter-cleaning',   label: 'Eavestrough Cleaning' },
  { slug: 'window-cleaning',   label: 'Window Cleaning' },
  { slug: 'pressure-washing',  label: 'Pressure Washing' },
  { slug: 'deep-cleaning',     label: 'Deep Cleaning' },
  { slug: 'lawn-maintenance',  label: 'Lawn Care' },
  { slug: 'snow-removal',      label: 'Snow Removal' },
  { slug: 'interior-painting', label: 'Interior Painting' },
  { slug: 'exterior-painting', label: 'Exterior Painting' },
  { slug: 'bathroom-renovation',label:'Bathroom Renovation' },
  { slug: 'kitchen-renovation', label:'Kitchen Renovation' },
  { slug: 'basement-renovation',label:'Basement Renovation' },
  { slug: 'attic-insulation',  label: 'Attic Insulation' },
  { slug: 'foundation-repair', label: 'Foundation Repair' },
  { slug: 'ev-charger-install',label: 'EV Charger Install' },
];

// ── Priority keywords to pull metrics for ────────────────────────────────────
const PRIORITY_KWS = [
  // Handyman
  'handyman toronto','handyman near me','handyman mississauga','handyman brampton',
  // Plumbing
  'plumber toronto','plumber near me','plumber mississauga','emergency plumber toronto',
  'plumber brampton','drain cleaning toronto',
  // Electrical
  'electrician toronto','electrician near me','electrician mississauga',
  'electrical panel upgrade toronto','200 amp panel upgrade toronto',
  // HVAC
  'furnace repair toronto','ac repair toronto','hvac repair toronto',
  'furnace repair near me','ac repair near me','furnace repair mississauga',
  // Duct cleaning
  'duct cleaning toronto','duct cleaning near me','duct cleaning mississauga',
  'duct cleaning brampton','air duct cleaning toronto',
  // Junk removal
  'junk removal toronto','junk removal near me','junk removal mississauga',
  'junk removal brampton','furniture removal toronto',
  // Garage door
  'garage door repair toronto','garage door repair near me','garage door repair mississauga',
  // Roofing
  'roof repair toronto','roof repair near me','roofing contractor toronto',
  'roof repair mississauga','flat roof repair toronto',
  // Gutters
  'eavestrough cleaning toronto','gutter cleaning toronto','eavestrough cleaning near me',
  'eavestrough cleaning mississauga','eavestrough cleaning brampton',
  // Window cleaning
  'window cleaning toronto','window cleaning near me','window cleaning mississauga',
  // Pressure washing
  'pressure washing toronto','pressure washing near me','pressure washing mississauga',
  // Deep cleaning
  'deep cleaning toronto','house cleaning toronto','deep cleaning near me',
  'deep cleaning mississauga','move out cleaning toronto',
  // Lawn
  'lawn care toronto','lawn mowing toronto','lawn care near me',
  'lawn care mississauga','lawn care brampton',
  // Snow removal
  'snow removal toronto','snow removal near me','snow removal mississauga',
  'snow removal brampton','driveway snow removal toronto',
  // Interior painting
  'interior painting toronto','interior painters toronto','interior painting near me',
  'interior painting mississauga','painters toronto',
  // Exterior painting
  'exterior painting toronto','house painting toronto','exterior painting near me',
  'exterior painting mississauga',
  // Bathroom reno
  'bathroom renovation toronto','bathroom renovation near me','bathroom renovation cost toronto',
  'bathroom renovation mississauga','bathroom remodel toronto',
  // Kitchen reno
  'kitchen renovation toronto','kitchen renovation near me','kitchen renovation cost toronto',
  'kitchen renovation mississauga',
  // Basement reno
  'basement renovation toronto','basement finishing toronto','basement renovation near me',
  'basement renovation mississauga','basement finishing cost toronto',
  // Attic insulation
  'attic insulation toronto','attic insulation near me','attic insulation cost ontario',
  'blown in insulation toronto',
  // Foundation repair
  'foundation repair toronto','foundation repair near me','basement waterproofing toronto',
  'foundation waterproofing toronto','foundation repair mississauga',
  // EV charger
  'ev charger installation toronto','ev charger installation near me',
  'level 2 charger installation toronto','ev charger cost ontario',
  'ev charger rebate ontario','home ev charger installation toronto',
];

// ── Top 8 cities for city×service matrix ─────────────────────────────────────
const TOP_CITIES = [
  'toronto','mississauga','brampton','vaughan',
  'markham','hamilton','kitchener','oakville',
];

// ── Competitors ───────────────────────────────────────────────────────────────
const COMPETITORS = ['homestars.com','bark.com','trustedpros.ca'];

// ── API helpers ───────────────────────────────────────────────────────────────
async function api(params) {
  const url = new URL(BASE);
  Object.entries({ key: API_KEY, database: DB, export_format: 'json', ...params })
    .forEach(([k, v]) => url.searchParams.set(k, v));
  const r = await fetch(url.toString());
  if (!r.ok) return null;
  const text = await r.text();
  try { return JSON.parse(text); } catch { return text; }
}

async function phraseMetrics(kw) {
  await sleep(300);
  const d = await api({ type: 'phrase_this', phrase: kw, export_columns: 'Ph,Nq,Cp,Kd' });
  if (!d || !Array.isArray(d)) return null;
  const row = d[0];
  if (!row) return null;
  return { kw: row.Ph || kw, vol: parseInt(row.Nq) || 0, cpc: parseFloat(row.Cp) || 0, kd: parseInt(row.Kd) || 0 };
}

async function domainOrganic(domain, limit = 200) {
  await sleep(500);
  const d = await api({ type: 'domain_organic', domain, display_limit: limit, export_columns: 'Ph,Po,Nq,Cp,Kd,Ur' });
  if (!d || !Array.isArray(d)) return [];
  return d.map(r => ({ kw: r.Ph, pos: parseInt(r.Po), vol: parseInt(r.Nq)||0, cpc: parseFloat(r.Cp)||0, kd: parseInt(r.Kd)||0, url: r.Ur }));
}

// ── Main ──────────────────────────────────────────────────────────────────────
async function main() {
  const lines = [];
  const push = (...l) => lines.push(...l);
  const today = new Date().toISOString().split('T')[0];

  push(`# Protasker.ca — 22-Service SEMrush Research`, `*Generated: ${today} | Canada | Focused on 22 core services × 30 cities*`, '');

  // ── 1. Protasker current organic positions ──────────────────────────────────
  push('## 1. Current Protasker.ca Organic Rankings', '');
  console.log('Pulling Protasker.ca organic positions...');
  const ptRankings = await domainOrganic('protasker.ca', 500);
  if (ptRankings.length) {
    const top30 = ptRankings.filter(r => r.pos <= 30).sort((a, b) => a.pos - b.pos);
    const pos1_10 = top30.filter(r => r.pos <= 10);
    const pos11_20 = top30.filter(r => r.pos > 10 && r.pos <= 20);
    const pos21_30 = top30.filter(r => r.pos > 20 && r.pos <= 30);

    push(`**Total keywords tracked:** ${ptRankings.length}`, '');
    push('### Positions 1–10 (Page 1)');
    push('| Keyword | Pos | Vol | CPC | URL |');
    push('|---|---|---|---|---|');
    pos1_10.forEach(r => push(`| ${r.kw} | ${r.pos} | ${r.vol} | $${r.cpc.toFixed(2)} | ${r.url} |`));

    push('', '### Positions 11–20');
    push('| Keyword | Pos | Vol | CPC | URL |');
    push('|---|---|---|---|---|');
    pos11_20.forEach(r => push(`| ${r.kw} | ${r.pos} | ${r.vol} | $${r.cpc.toFixed(2)} | ${r.url} |`));

    push('', '### Positions 21–30');
    push('| Keyword | Pos | Vol | CPC | URL |');
    push('|---|---|---|---|---|');
    pos21_30.forEach(r => push(`| ${r.kw} | ${r.pos} | ${r.vol} | $${r.cpc.toFixed(2)} | ${r.url} |`));
  } else {
    push('*(No data returned)*');
  }
  push('');

  // ── 2. Priority keyword metrics ─────────────────────────────────────────────
  push('## 2. Priority Keyword Metrics (22 Services)', '');
  console.log(`Pulling metrics for ${PRIORITY_KWS.length} priority keywords...`);
  const kwData = {};
  for (const kw of PRIORITY_KWS) {
    process.stdout.write(`  ${kw}...\r`);
    const m = await phraseMetrics(kw);
    if (m) kwData[kw] = m;
    await sleep(200);
  }

  // Group by service
  push('| Keyword | Vol | KD | CPC | Difficulty |');
  push('|---|---|---|---|---|');
  for (const kw of PRIORITY_KWS) {
    const m = kwData[kw];
    if (!m) continue;
    const diff = m.kd <= 14 ? '🟢 EASY' : m.kd <= 24 ? '🟡 MEDIUM' : m.kd <= 39 ? '🟠 HARD' : '🔴 VERY HARD';
    push(`| ${m.kw} | ${m.vol.toLocaleString()} | ${m.kd} | $${m.cpc.toFixed(2)} | ${diff} |`);
  }
  push('');

  // ── 3. Service summary table ────────────────────────────────────────────────
  push('## 3. Service-Level Summary', '');
  push('*Best keyword for each service (highest vol with KD ≤ 35)*', '');
  push('| Service | Best Keyword | Vol | KD | CPC | Priority |');
  push('|---|---|---|---|---|---|');

  const serviceKeywords = {
    'handyman':           ['handyman near me','handyman toronto'],
    'plumbing-repair':    ['plumber near me','plumber toronto'],
    'electrical-repair':  ['electrician near me','electrician toronto'],
    'hvac-maintenance':   ['furnace repair near me','ac repair near me'],
    'duct-cleaning':      ['duct cleaning near me','duct cleaning toronto'],
    'junk-removal':       ['junk removal near me','junk removal toronto'],
    'garage-door-repair': ['garage door repair near me','garage door repair toronto'],
    'roofing-repairs':    ['roof repair near me','roof repair toronto'],
    'gutter-cleaning':    ['eavestrough cleaning near me','eavestrough cleaning toronto'],
    'window-cleaning':    ['window cleaning near me','window cleaning toronto'],
    'pressure-washing':   ['pressure washing near me','pressure washing toronto'],
    'deep-cleaning':      ['deep cleaning near me','house cleaning toronto'],
    'lawn-maintenance':   ['lawn care near me','lawn care toronto'],
    'snow-removal':       ['snow removal near me','snow removal toronto'],
    'interior-painting':  ['interior painting near me','interior painters toronto'],
    'exterior-painting':  ['exterior painting near me','house painting toronto'],
    'bathroom-renovation':['bathroom renovation near me','bathroom renovation toronto'],
    'kitchen-renovation': ['kitchen renovation near me','kitchen renovation toronto'],
    'basement-renovation':['basement renovation near me','basement finishing toronto'],
    'attic-insulation':   ['attic insulation near me','attic insulation toronto'],
    'foundation-repair':  ['foundation repair near me','basement waterproofing toronto'],
    'ev-charger-install': ['ev charger installation near me','ev charger installation toronto'],
  };

  for (const svc of SERVICES) {
    const candidates = (serviceKeywords[svc.slug] || []).map(k => kwData[k]).filter(Boolean);
    const best = candidates.sort((a, b) => b.vol - a.vol)[0];
    if (!best) { push(`| ${svc.label} | — | — | — | — | — |`); continue; }
    const priority = best.vol >= 5000 ? '🔥 TOP' : best.vol >= 1000 ? '⭐ HIGH' : best.vol >= 300 ? '📌 MED' : '⬜ LOW';
    const diff = best.kd <= 14 ? '🟢 EASY' : best.kd <= 24 ? '🟡 MED' : best.kd <= 39 ? '🟠 HARD' : '🔴 V.HARD';
    push(`| ${svc.label} | ${best.kw} | ${best.vol.toLocaleString()} | ${best.kd} (${diff}) | $${best.cpc.toFixed(2)} | ${priority} |`);
  }
  push('');

  // ── 4. Competitor organic positions ─────────────────────────────────────────
  push('## 4. Competitor Organic Rankings', '');
  for (const comp of COMPETITORS) {
    console.log(`Pulling ${comp} organic positions...`);
    const rows = await domainOrganic(comp, 500);
    // Filter to service keywords relevant to our 22
    const serviceTerms = ['handyman','plumber','electrician','furnace','ac repair','hvac','duct cleaning',
      'junk removal','garage door','roof repair','eavestrough','gutter cleaning','window cleaning',
      'pressure washing','deep cleaning','house cleaning','lawn care','lawn mowing','snow removal',
      'interior paint','exterior paint','bathroom renovation','kitchen renovation','basement',
      'attic insulation','foundation repair','waterproofing','ev charger'];
    const relevant = rows.filter(r => serviceTerms.some(t => r.kw.toLowerCase().includes(t)));
    const top50 = relevant.slice(0, 50);
    push(`### ${comp} — Top Service Keywords`);
    push(`*${rows.length} total keywords · ${relevant.length} service-relevant shown (top 50)*`, '');
    push('| Keyword | Pos | Vol | CPC |');
    push('|---|---|---|---|');
    top50.forEach(r => push(`| ${r.kw} | ${r.pos} | ${r.vol.toLocaleString()} | $${r.cpc.toFixed(2)} |`));
    push('');
    await sleep(1000);
  }

  // ── 5. Keyword gap analysis ─────────────────────────────────────────────────
  push('## 5. Keyword Gap — What Competitors Rank For That Protasker Doesn\'t', '');
  console.log('Computing keyword gap...');
  const ptKws = new Set(ptRankings.map(r => r.kw.toLowerCase()));

  for (const comp of ['homestars.com','bark.com']) {
    const compRows = await domainOrganic(comp, 1000);
    await sleep(500);
    const serviceTerms = ['handyman','plumber','electrician','furnace','duct cleaning','junk removal',
      'garage door','roofing','eavestrough','window cleaning','pressure washing','cleaning','lawn',
      'snow removal','painting','bathroom','kitchen','basement','insulation','foundation','ev charger'];
    const gaps = compRows
      .filter(r => !ptKws.has(r.kw.toLowerCase()) && r.vol >= 100 &&
        serviceTerms.some(t => r.kw.toLowerCase().includes(t)))
      .sort((a, b) => b.vol - a.vol)
      .slice(0, 40);
    push(`### Gaps vs ${comp} (top 40 by volume, vol ≥ 100)`);
    push('| Keyword | Comp Pos | Vol | CPC | KD |');
    push('|---|---|---|---|---|');
    gaps.forEach(r => push(`| ${r.kw} | ${r.pos} | ${r.vol.toLocaleString()} | $${r.cpc.toFixed(2)} | ${r.kd} |`));
    push('');
  }

  // ── 6. Easy wins summary ─────────────────────────────────────────────────────
  push('## 6. Easy Wins — KD ≤ 20, Vol ≥ 100', '');
  const easyWins = Object.values(kwData)
    .filter(m => m.kd <= 20 && m.vol >= 100)
    .sort((a, b) => (b.vol * (20 - b.kd)) - (a.vol * (20 - a.kd)));
  push('| Keyword | Vol | KD | CPC |');
  push('|---|---|---|---|');
  easyWins.forEach(m => push(`| ${m.kw} | ${m.vol.toLocaleString()} | ${m.kd} | $${m.cpc.toFixed(2)} |`));
  push('');

  // ── Write output ─────────────────────────────────────────────────────────────
  writeFileSync(OUT, lines.join('\n'), 'utf-8');
  console.log(`\n✅ Done → ${OUT}`);
  console.log(`   Total keywords pulled: ${Object.keys(kwData).length}`);
}

main().catch(e => { console.error(e); process.exit(1); });
