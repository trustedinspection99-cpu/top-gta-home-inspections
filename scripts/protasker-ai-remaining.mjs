/**
 * protasker-ai-remaining.mjs
 * Pulls phrase_questions for the 13 remaining services
 * Generic seeds only — no city
 * Budget: 13 × 50 × 10 = 6,500 units
 * Appends to existing Protasker-AI-Questions.md
 */
import { readFileSync, writeFileSync } from 'fs';

const API_KEY = 'f3c4996930dcdd384184df5c4ddfa3ee';
const DB      = 'ca';
const BASE    = 'https://api.semrush.com';
const sleep   = ms => new Promise(r => setTimeout(r, ms));
const OUT_AI  = 'C:/Users/Owner/Documents/Protasker-AI-Questions.md';

const REMAINING = [
  { label: 'Locksmith',            seed: 'locksmith' },
  { label: 'Handyman',             seed: 'handyman service' },
  { label: 'Moving',               seed: 'moving company' },
  { label: 'Appliance Repair',     seed: 'appliance repair' },
  { label: 'Painting',             seed: 'house painting' },
  { label: 'Flooring',             seed: 'flooring installation' },
  { label: 'Roofing',              seed: 'roofing' },
  { label: 'Kitchen Renovation',   seed: 'kitchen renovation' },
  { label: 'Bathroom Renovation',  seed: 'bathroom renovation' },
  { label: 'Basement Finishing',   seed: 'basement finishing' },
  { label: 'Fence & Deck',         seed: 'deck installation' },
  { label: 'Garage Door',          seed: 'garage door repair' },
  { label: 'Attic Insulation',     seed: 'attic insulation' },
];

async function apiGet(params) {
  const url = BASE + '/?' + new URLSearchParams({ key: API_KEY, database: DB, ...params });
  const res = await fetch(url);
  const text = await res.text();
  if (text.startsWith('ERROR')) { console.error('  API ERROR:', text.trim()); return []; }
  const lines = text.trim().split('\n');
  if (lines.length < 2) return [];
  const headers = lines[0].split(';');
  return lines.slice(1).map(line => {
    const vals = line.split(';');
    const obj = {};
    headers.forEach((h, i) => obj[h] = vals[i] || '');
    return obj;
  });
}

function parseVol(v) {
  if (!v) return 0;
  v = String(v).replace(/,/g, '').trim();
  if (/[Kk]$/.test(v)) return parseFloat(v) * 1000;
  if (/[Mm]$/.test(v)) return parseFloat(v) * 1_000_000;
  return parseFloat(v) || 0;
}

async function main() {
  console.log('13 remaining services — generic seeds\n');

  const allByService = [];

  for (const svc of REMAINING) {
    process.stdout.write(`[${svc.label}] `);
    const rows = await apiGet({
      type: 'phrase_questions',
      phrase: svc.seed,
      export_columns: 'Ph,Nq,KD,Cp',
      display_limit: 50,
      display_sort: 'nq_desc',
    });
    await sleep(350);

    if (!rows.length) {
      console.log('0 results');
      allByService.push({ ...svc, questions: [] });
      continue;
    }

    const questions = rows.map(r => ({
      q:   (r['Keyword'] || r['Ph'] || '').trim(),
      vol: parseVol(r['Search Volume'] || r['Nq'] || '0'),
      kd:  parseInt(r['Keyword Difficulty Index'] || r['KD'] || '0') || 0,
      cpc: parseFloat((r['CPC'] || r['Cp'] || '0').replace('$','')) || 0,
    })).filter(r => r.q.length > 5);

    const top = questions[0];
    console.log(`${questions.length} Qs | vol ${top?.vol?.toLocaleString()} | "${top?.q}"`);
    allByService.push({ ...svc, questions });
    await sleep(250);
  }

  // Append new sections to existing file
  const existing = readFileSync(OUT_AI, 'utf8');

  let append = `\n---\n\n## Remaining Services (13)\n\n`;

  // Collect all new questions for aggregate sections
  const allNewQ = allByService.flatMap(s => s.questions.map(q => ({ ...q, service: s.label })));
  const newCost = allNewQ.filter(r => /cost|how much|price|charge|expens/i.test(r.q)).sort((a,b) => b.vol - a.vol);
  const newHigh = allNewQ.filter(r => r.vol >= 200).sort((a,b) => b.vol - a.vol);

  if (newHigh.length) {
    append += `### High Volume (200+)\n\n| Question | Vol | KD | Service |\n|---------|-----|----|---------|\n`;
    newHigh.forEach(r => {
      append += `| ${r.q} | ${r.vol.toLocaleString()} | ${r.kd||'—'} | ${r.service} |\n`;
    });
    append += '\n';
  }

  if (newCost.length) {
    append += `### Cost & Pricing\n\n| Question | Vol | KD | Service |\n|---------|-----|----|---------|\n`;
    newCost.slice(0, 80).forEach(r => {
      append += `| ${r.q} | ${r.vol>0?r.vol.toLocaleString():'—'} | ${r.kd||'—'} | ${r.service} |\n`;
    });
    append += '\n';
  }

  // Per service
  for (const svc of allByService) {
    if (!svc.questions.length) { append += `### ${svc.label}\n*No questions found*\n\n`; continue; }
    append += `### ${svc.label} (${svc.questions.length} questions)\n\n`;
    append += `| Question | Vol | KD | CPC |\n|---------|-----|----|----|\n`;
    svc.questions.forEach(r => {
      append += `| ${r.q} | ${r.vol>0?r.vol.toLocaleString():'—'} | ${r.kd||'—'} | ${r.cpc?'$'+r.cpc.toFixed(2):'—'} |\n`;
    });
    append += '\n';
  }

  writeFileSync(OUT_AI, existing + append, 'utf8');

  const total = allByService.reduce((s, svc) => s + svc.questions.length, 0);
  console.log(`\n+${total} questions appended → ${OUT_AI}`);
  console.log(`Units used: ~${REMAINING.length * 50 * 10}`);
}

main().catch(e => { console.error('Fatal:', e.message); process.exit(1); });
