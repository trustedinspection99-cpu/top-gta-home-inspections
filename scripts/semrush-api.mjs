/**
 * semrush-api.mjs — Protasker Full Research (50K units)
 *
 * Unit budget:
 *   domain_ranks:    7 × 10          =     70 units
 *   domain_organic:  6 × 500 × 10   = 30,000 units
 *   phrase_questions: 36 seeds × 10  =    360 units  (AI content gaps)
 *   phrase_this:     top 50 kws × 10 =    500 units  (priority keywords)
 *   ─────────────────────────────────────────────────
 *   Total:                           ~30,930 units  (leaves 19K buffer)
 *
 * Outputs:
 *   Protasker-Competitor-Organic.md  — what competitors rank for
 *   Protasker-Keyword-Gap.md         — keywords competitors have, Protasker doesn't
 *   Protasker-AI-Questions.md        — question keywords for AI content (ChatGPT/Gemini)
 *   Protasker-Priority-KW.md         — top service keyword metrics
 */

import { writeFileSync } from 'fs';

const API_KEY = 'bef044c1537dc0352b290ace72c9ee47';
const DB      = 'ca';
const BASE    = 'https://api.semrush.com';
const sleep   = ms => new Promise(r => setTimeout(r, ms));

const OUT_ORGANIC   = 'C:/Users/Owner/Documents/Protasker-Competitor-Organic.md';
const OUT_GAP       = 'C:/Users/Owner/Documents/Protasker-Keyword-Gap.md';
const OUT_AI        = 'C:/Users/Owner/Documents/Protasker-AI-Questions.md';
const OUT_PRIORITY  = 'C:/Users/Owner/Documents/Protasker-Priority-KW.md';

// Top priority service keywords to get exact metrics for
const PRIORITY_KWS = [
  'junk removal toronto', 'junk removal near me', 'junk removal ontario',
  'eavestrough cleaning toronto', 'eavestrough cleaning near me',
  'handyman toronto', 'handyman near me', 'handyman services toronto',
  'duct cleaning toronto', 'duct cleaning near me',
  'window cleaning toronto', 'window cleaning near me',
  'deep cleaning toronto', 'move out cleaning toronto',
  'lawn care toronto', 'lawn mowing toronto',
  'snow removal toronto', 'snow removal near me',
  'furnace repair toronto', 'furnace repair near me',
  'drain cleaning toronto', 'drain cleaning near me',
  'pest control toronto', 'pest control near me',
  'electrician toronto', 'plumber toronto',
  'ac repair toronto', 'hvac repair toronto',
  'kitchen renovation toronto', 'bathroom renovation toronto',
  'basement renovation toronto', 'home renovation toronto',
  'pressure washing toronto', 'pressure washing near me',
  'tree trimming toronto', 'fence installation toronto',
  'deck installation toronto', 'interlocking toronto',
  'roof repair toronto', 'carpet cleaning toronto',
  'interior painting toronto', 'drywall repair toronto',
  'locksmith toronto', 'locksmith near me',
  'house cleaning toronto', 'house cleaning near me',
  'floor refinishing toronto', 'window replacement toronto',
  'sump pump installation toronto', 'eavestrough repair toronto',
];

// Seeds for AI question research (phrase_questions)
const AI_QUESTION_SEEDS = [
  'junk removal', 'eavestrough cleaning', 'handyman', 'duct cleaning',
  'window cleaning', 'deep cleaning', 'lawn care', 'snow removal',
  'furnace repair', 'drain cleaning', 'pest control', 'electrician',
  'plumber', 'ac repair', 'hvac repair', 'kitchen renovation',
  'bathroom renovation', 'basement renovation', 'pressure washing',
  'tree trimming', 'fence installation', 'deck installation',
  'interlocking', 'roof repair', 'carpet cleaning', 'interior painting',
  'locksmith', 'house cleaning', 'floor refinishing', 'window replacement',
  'sump pump installation', 'move out cleaning', 'drywall repair',
  'home renovation', 'painting service', 'home inspection',
];

// ── Domains ───────────────────────────────────────────────────────────────────
const COMPETITORS = [
  { domain: 'protasker.ca',      label: 'Protasker'   },
  { domain: 'homestars.com',     label: 'HomeStars'   },
  { domain: 'bark.com',          label: 'Bark.com'    },
  { domain: 'jiffyondemand.com', label: 'Jiffy'       },
  { domain: 'taskrabbit.com',    label: 'TaskRabbit'  },
  { domain: 'urbantasker.com',   label: 'UrbanTasker' },
  { domain: 'yelp.ca',           label: 'Yelp CA'     },
];

// ── API helpers ───────────────────────────────────────────────────────────────
async function apiCall(params) {
  const qs = new URLSearchParams({ ...params, key: API_KEY }).toString();
  const resp = await fetch(`${BASE}/?${qs}`);
  const text = await resp.text();
  if (text.startsWith('ERROR')) throw new Error(text.trim());
  return text;
}

function parseCsv(text) {
  const lines = text.split('\r\n').filter(Boolean);
  if (lines.length < 2) return [];
  const headers = lines[0].split(';');
  return lines.slice(1).map(line => {
    const vals = line.split(';');
    const obj = {};
    headers.forEach((h, i) => { obj[h.trim()] = (vals[i] || '').trim(); });
    return obj;
  });
}

function parseVol(v) {
  return parseInt(String(v || '0').replace(/[,\s]/g, '')) || 0;
}

function fmt(n) {
  if (n >= 1000000) return (n/1000000).toFixed(1) + 'M';
  if (n >= 1000)    return (n/1000).toFixed(1) + 'K';
  return String(n);
}

// ── API calls ─────────────────────────────────────────────────────────────────
async function getDomainOverview(domain) {
  try {
    const text = await apiCall({
      type: 'domain_ranks', domain, database: DB,
      export_columns: 'Dn,Rk,Or,Ot,Oc,Ad,At,Ac'
    });
    const rows = parseCsv(text);
    if (!rows.length) return null;
    const r = rows[0];
    return {
      rank:           r['Rank']             || r['Rk'] || '—',
      organicKw:      r['Organic Keywords'] || r['Or'] || '—',
      organicTraffic: r['Organic Traffic']  || r['Ot'] || '—',
      organicCost:    r['Organic Cost']     || r['Oc'] || '—',
    };
  } catch(e) {
    console.log(`  ERR domain_ranks(${domain}): ${e.message.substring(0, 60)}`);
    return null;
  }
}

async function getOrganicKeywords(domain, limit = 700) {
  try {
    const text = await apiCall({
      type: 'domain_organic', domain, database: DB,
      display_limit: limit, display_sort: 'tr_desc',
      export_columns: 'Ph,Po,Nq,Kd,Co,Ur,Tr'
    });
    const rows = parseCsv(text);
    return rows.map(r => ({
      kw:      r['Keyword']          || r['Ph'] || '',
      pos:     parseInt(r['Position'] || r['Po']) || 999,
      vol:     r['Search Volume']    || r['Nq'] || '0',
      kd:      r['Keyword Difficulty'] || r['Kd'] || '—',
      cpc:     r['CPC']              || r['Co'] || '—',
      url:     r['URL']              || r['Ur'] || '',
      traffic: r['Traffic']          || r['Tr'] || '0',
    })).filter(r => r.kw && r.pos < 999);
  } catch(e) {
    console.log(`  ERR domain_organic(${domain}): ${e.message.substring(0, 60)}`);
    return [];
  }
}

async function getKwMetrics(phrase) {
  try {
    const text = await apiCall({
      type: 'phrase_this', phrase, database: DB,
      export_columns: 'Ph,Nq,Co,Kd'
    });
    const rows = parseCsv(text);
    if (!rows.length) return null;
    const r = rows[0];
    const vol = r['Search Volume'] || r['Nq'] || '0';
    if (parseVol(vol) === 0) return null;
    return {
      kw:  r['Keyword'] || r['Ph'] || phrase,
      vol, cpc: r['CPC'] || r['Co'] || '0',
      kd:  r['Keyword Difficulty Index'] || r['Kd'] || '—',
    };
  } catch(e) { return null; }
}

async function getQuestions(seed) {
  try {
    const text = await apiCall({
      type: 'phrase_questions', phrase: seed, database: DB,
      display_limit: 20,
      export_columns: 'Ph,Nq,Co,Kd'
    });
    const rows = parseCsv(text);
    return rows.map(r => ({
      kw:  r['Keyword'] || r['Ph'] || '',
      vol: r['Search Volume'] || r['Nq'] || '0',
      cpc: r['CPC'] || r['Co'] || '0',
      kd:  r['Keyword Difficulty Index'] || r['Kd'] || '—',
    })).filter(r => r.kw && parseVol(r.vol) > 0);
  } catch(e) {
    console.log(`  ERR phrase_questions(${seed}): ${e.message.substring(0, 50)}`);
    return [];
  }
}

// ── Reports ───────────────────────────────────────────────────────────────────
function buildOrganicReport(overviews, allOrganic) {
  const date = new Date().toISOString().split('T')[0];
  let md = `# Protasker — Competitor Organic Keywords\n*${date} · Canada (db=ca)*\n\n`;

  md += `## Domain Overview\n\n`;
  md += `| Domain | Org Keywords | Org Traffic | Org Cost | Rank |\n`;
  md += `|--------|-------------|------------|----------|------|\n`;
  for (const { domain, label } of COMPETITORS) {
    const d = overviews[domain] || {};
    md += `| **${label}** | ${d.organicKw||'—'} | ${d.organicTraffic||'—'} | ${d.organicCost||'—'} | ${d.rank||'—'} |\n`;
  }
  md += `\n---\n\n`;

  for (const { domain, label } of COMPETITORS) {
    const rows = allOrganic[domain] || [];
    if (!rows.length) { md += `## ${label} — no data\n\n`; continue; }

    const top10   = rows.filter(r => r.pos <= 10).sort((a, b) => a.pos - b.pos);
    const pos1120 = rows.filter(r => r.pos > 10 && r.pos <= 20).sort((a, b) => a.pos - b.pos);
    const rest    = rows.filter(r => r.pos > 20).sort((a, b) => parseVol(b.vol) - parseVol(a.vol));

    md += `## ${label} (\`${domain}\`) — ${rows.length} keywords\n\n`;

    if (top10.length) {
      md += `### Positions 1–10\n\n| Keyword | Pos | Volume | KD | CPC | Path |\n|---------|-----|--------|----|----|------|\n`;
      top10.forEach(r => {
        const path = r.url.replace(/^https?:\/\/[^/]+/, '').substring(0, 50) || '/';
        md += `| ${r.kw} | ${r.pos} | ${r.vol} | ${r.kd} | ${r.cpc} | \`${path}\` |\n`;
      });
      md += '\n';
    }
    if (pos1120.length) {
      md += `### Positions 11–20\n\n| Keyword | Pos | Volume | KD | CPC |\n|---------|-----|--------|----|----||\n`;
      pos1120.forEach(r => { md += `| ${r.kw} | ${r.pos} | ${r.vol} | ${r.kd} | ${r.cpc} |\n`; });
      md += '\n';
    }
    if (rest.length) {
      md += `### Positions 21+ (by volume)\n\n| Keyword | Pos | Volume | KD |\n|---------|-----|--------|----|\n`;
      rest.slice(0, 100).forEach(r => { md += `| ${r.kw} | ${r.pos} | ${r.vol} | ${r.kd} |\n`; });
      md += '\n';
    }
  }
  return md;
}

function buildGapReport(allOrganic) {
  const date  = new Date().toISOString().split('T')[0];
  const prot  = new Set((allOrganic['protasker.ca'] || []).map(r => r.kw.toLowerCase()));
  const gaps  = [];
  const seen  = new Set();

  for (const { domain } of COMPETITORS) {
    if (domain === 'protasker.ca') continue;
    (allOrganic[domain] || []).forEach(r => {
      const kl = r.kw.toLowerCase();
      if (!prot.has(kl) && !seen.has(kl)) {
        seen.add(kl);
        gaps.push({ ...r, source: domain });
      }
    });
  }
  gaps.sort((a, b) => parseVol(b.vol) - parseVol(a.vol));

  let md = `# Protasker — Keyword Gap Analysis\n*${date} · Canada*\n\n`;
  md += `Protasker tracked: **${(allOrganic['protasker.ca']||[]).length}** keywords\n`;
  md += `Gap keywords (competitor ranks, Protasker doesn't): **${gaps.length}**\n\n`;

  if (!gaps.length) { md += `> No gap data yet.\n`; return md; }

  // Easy wins
  const easy = gaps.filter(r => {
    const kd = parseInt(r.kd) || 999;
    return kd <= 25 && parseVol(r.vol) >= 100 && r.pos <= 20;
  }).sort((a, b) => parseVol(b.vol) - parseVol(a.vol));

  if (easy.length) {
    md += `## Easy Wins (KD ≤ 25, Vol ≥ 100, Competitor pos ≤ 20)\n\n`;
    md += `| Keyword | Vol | KD | CPC | Competitor | Pos |\n|---------|-----|----|----|-----------|-----|\n`;
    easy.slice(0, 60).forEach(r => {
      md += `| ${r.kw} | ${r.vol} | ${r.kd} | ${r.cpc} | \`${r.source}\` | ${r.pos} |\n`;
    });
    md += '\n';
  }

  // High volume
  const highVol = gaps.filter(r => parseVol(r.vol) >= 500);
  if (highVol.length) {
    md += `## High Volume Gaps (500+ searches/mo)\n\n`;
    md += `| Keyword | Vol | KD | Competitor | Pos |\n|---------|-----|----|-----------| ----|\n`;
    highVol.slice(0, 60).forEach(r => { md += `| ${r.kw} | ${r.vol} | ${r.kd} | \`${r.source}\` | ${r.pos} |\n`; });
    md += '\n';
  }

  // Full list
  md += `## All Gap Keywords (by volume)\n\n`;
  md += `| Keyword | Vol | KD | CPC | Competitor | Pos |\n|---------|-----|----|----|-----------|-----|\n`;
  gaps.slice(0, 300).forEach(r => {
    md += `| ${r.kw} | ${r.vol} | ${r.kd} | ${r.cpc} | \`${r.source}\` | ${r.pos} |\n`;
  });
  return md;
}


// ── Main ──────────────────────────────────────────────────────────────────────
async function main() {
  console.log('SEMrush API — Protasker Competitor Research');
  console.log(`  ${COMPETITORS.length} domains × 700 keywords each`);
  console.log(`  Estimated units: ~${(COMPETITORS.length * 700 * 10 + COMPETITORS.length * 10).toLocaleString()}`);
  console.log('');

  // ── 1. Domain overviews ────────────────────────────────────────────────────
  console.log('═══ 1/2: DOMAIN OVERVIEWS ═══');
  const overviews = {};
  for (const { domain, label } of COMPETITORS) {
    process.stdout.write(`  ${label.padEnd(14)} `);
    overviews[domain] = await getDomainOverview(domain);
    const d = overviews[domain];
    if (d) console.log(`kw=${d.organicKw} | traffic=${d.organicTraffic} | rank=${d.rank}`);
    else   console.log('no data');
    await sleep(300);
  }

  // ── 2. Competitor organic keywords ─────────────────────────────────────────
  console.log('\n═══ 2/2: COMPETITOR ORGANIC KEYWORDS (700/domain) ═══');
  const allOrganic = {};
  for (const { domain, label } of COMPETITORS) {
    process.stdout.write(`  ${label.padEnd(14)} `);
    const kws = await getOrganicKeywords(domain, 700);
    allOrganic[domain] = kws;
    const top20 = kws.filter(r => r.pos <= 20).length;
    console.log(`${kws.length} kws | ${top20} in top 20`);
    await sleep(400);
    writeFileSync(OUT_ORGANIC, buildOrganicReport(overviews, allOrganic), 'utf8');
    writeFileSync(OUT_GAP,     buildGapReport(allOrganic),                'utf8');
  }

  const orgTotal = Object.values(allOrganic).reduce((s, v) => s + v.length, 0);
  console.log(`  ✓ ${orgTotal} total competitor keywords`);

  // ── 3. AI Question Keywords ────────────────────────────────────────────────
  console.log('\n═══ 3/4: AI QUESTION KEYWORDS (phrase_questions) ═══');
  console.log('  These are the questions ChatGPT / Gemini / Perplexity answer\n');
  const aiData = {};
  for (const seed of AI_QUESTION_SEEDS) {
    process.stdout.write(`  ${seed.padEnd(30)} `);
    const questions = await getQuestions(seed);
    aiData[seed] = questions;
    if (questions.length) {
      console.log(`${questions.length} questions | top: "${questions[0].kw}" (${questions[0].vol} vol)`);
    } else {
      console.log('no data');
    }
    await sleep(200);
  }
  writeFileSync(OUT_AI, buildAIReport(aiData), 'utf8');
  console.log(`  ✓ Saved → ${OUT_AI}`);

  // ── 4. Priority Service Keywords ───────────────────────────────────────────
  console.log('\n═══ 4/4: PRIORITY SERVICE KEYWORDS (phrase_this) ═══');
  const priorityData = [];
  for (const kw of PRIORITY_KWS) {
    process.stdout.write(`  ${kw.padEnd(45)} `);
    const d = await getKwMetrics(kw);
    if (d) {
      priorityData.push(d);
      console.log(`vol=${String(d.vol).padEnd(6)} KD=${String(d.kd).padEnd(4)} CPC=$${d.cpc}`);
    } else {
      console.log('—');
    }
    await sleep(200);
  }
  writeFileSync(OUT_PRIORITY, buildPriorityReport(priorityData), 'utf8');
  console.log(`  ✓ Saved → ${OUT_PRIORITY}`);

  console.log(`\n✅ Complete!`);
  console.log(`   Competitor organic: ${orgTotal} keywords → ${OUT_ORGANIC}`);
  console.log(`   Keyword gap:        → ${OUT_GAP}`);
  console.log(`   AI questions:       → ${OUT_AI}`);
  console.log(`   Priority keywords:  ${priorityData.length} → ${OUT_PRIORITY}`);
}

function buildAIReport(aiData) {
  const date = new Date().toISOString().split('T')[0];
  let md = `# Protasker — AI Question Keywords\n`;
  md += `*${date} · Questions ChatGPT / Gemini / Perplexity answer about home services*\n\n`;
  md += `> **Strategy:** Create FAQ content or blog posts answering these questions with `;
  md += `schema markup → AI models cite your page when users ask these questions.\n\n`;

  // All questions sorted by volume
  const all = Object.values(aiData).flat().sort((a, b) => parseVol(b.vol) - parseVol(a.vol));
  const easy = all.filter(r => parseInt(r.kd) <= 25 && parseVol(r.vol) >= 50);

  if (easy.length) {
    md += `## Easy Win AI Questions (KD ≤ 25, Vol ≥ 50)\n\n`;
    md += `| Question | Vol | KD | CPC |\n|---------|-----|----|----||\n`;
    easy.slice(0, 60).forEach(r => {
      md += `| ${r.kw} | ${r.vol} | ${r.kd} | $${r.cpc} |\n`;
    });
    md += '\n';
  }

  md += `## All Questions by Volume\n\n`;
  md += `| Question | Vol | KD | CPC |\n|---------|-----|----|----||\n`;
  all.slice(0, 200).forEach(r => { md += `| ${r.kw} | ${r.vol} | ${r.kd} | $${r.cpc} |\n`; });
  md += '\n---\n\n';

  md += `## By Service Category\n\n`;
  for (const [seed, questions] of Object.entries(aiData)) {
    if (!questions.length) continue;
    const sorted = [...questions].sort((a, b) => parseVol(b.vol) - parseVol(a.vol));
    md += `### ${seed}\n\n| Question | Vol | KD | CPC |\n|---------|-----|----|----||\n`;
    sorted.forEach(r => { md += `| ${r.kw} | ${r.vol} | ${r.kd} | $${r.cpc} |\n`; });
    md += '\n';
  }
  return md;
}

function buildPriorityReport(kws) {
  const date = new Date().toISOString().split('T')[0];
  const sorted = [...kws].sort((a, b) => parseVol(b.vol) - parseVol(a.vol));
  let md = `# Protasker — Priority Service Keywords\n*${date} · Canada · ${kws.length} keywords*\n\n`;

  md += `## By Volume\n\n| Keyword | Vol | KD | CPC |\n|---------|-----|----|----||\n`;
  sorted.forEach(k => { md += `| ${k.kw} | ${k.vol} | ${k.kd} | $${k.cpc} |\n`; });

  const easy = sorted.filter(k => parseInt(k.kd) <= 25 && parseVol(k.vol) >= 100);
  if (easy.length) {
    md += `\n## Easy Wins (KD ≤ 25, Vol ≥ 100)\n\n| Keyword | Vol | KD | CPC |\n|---------|-----|----|----||\n`;
    easy.forEach(k => { md += `| ${k.kw} | ${k.vol} | ${k.kd} | $${k.cpc} |\n`; });
  }

  const highCpc = sorted.filter(k => parseFloat(k.cpc) >= 8);
  if (highCpc.length) {
    highCpc.sort((a, b) => parseFloat(b.cpc) - parseFloat(a.cpc));
    md += `\n## High CPC ($8+)\n\n| Keyword | Vol | KD | CPC |\n|---------|-----|----|----||\n`;
    highCpc.forEach(k => { md += `| ${k.kw} | ${k.vol} | ${k.kd} | $${k.cpc} |\n`; });
  }
  return md;
}

main().catch(e => { console.error('Fatal:', e.message); process.exit(1); });
