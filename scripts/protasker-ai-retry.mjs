/**
 * protasker-ai-retry.mjs
 * Re-pulls phrase_questions for the 7 services that returned ERROR 50
 * Uses broader seeds (no city) — then merges into existing AI Questions file
 */
import { readFileSync, writeFileSync } from 'fs';

const API_KEY = '66c0e31a586e76570918c74c6655928f';
const DB      = 'ca';
const BASE    = 'https://api.semrush.com';
const sleep   = ms => new Promise(r => setTimeout(r, ms));
const OUT_AI  = 'C:/Users/Owner/Documents/Protasker-AI-Questions.md';

// Services that failed — broader seeds
const RETRY = [
  { label: 'Deep Cleaning',        seed: 'deep cleaning service' },
  { label: 'Sump Pump',            seed: 'sump pump repair ontario' },
  { label: 'Water Heater',         seed: 'water heater installation ontario' },
  { label: 'EV Charger',           seed: 'ev charger installation ontario' },
  { label: 'AC Repair',            seed: 'air conditioner repair ontario' },
  { label: 'Furnace Maintenance',  seed: 'furnace maintenance ontario' },
  { label: 'Eavestrough Cleaning', seed: 'eavestrough cleaning ontario' },
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
  console.log('Retrying 7 failed services with broader seeds');
  console.log(`Budget: 7 × 50 × 10 = 3,500 units\n`);

  const results = [];

  for (const svc of RETRY) {
    process.stdout.write(`[${svc.label}] `);
    const rows = await apiGet({
      type: 'phrase_questions',
      phrase: svc.seed,
      export_columns: 'Ph,Nq,KD,Cp',
      display_limit: 50,
      display_sort: 'nq_desc',
    });
    await sleep(400);

    if (!rows.length) { console.log('0 results'); results.push({ ...svc, questions: [] }); continue; }

    const questions = rows.map(r => ({
      q:   r['Keyword'] || r['Ph'] || '',
      vol: parseVol(r['Search Volume'] || r['Nq'] || '0'),
      kd:  parseInt(r['Keyword Difficulty Index'] || r['KD'] || '0') || 0,
      cpc: parseFloat(r['CPC'] || r['Cp'] || '0') || 0,
    })).filter(r => r.q.length > 5);

    console.log(`${questions.length} questions | top: "${questions[0]?.q}"`);
    results.push({ ...svc, questions });
    await sleep(300);
  }

  // Append to existing AI Questions file
  let existing = readFileSync(OUT_AI, 'utf8');

  let append = `\n---\n\n## Retry Results (Broader Seeds)\n\n`;
  for (const svc of results) {
    if (!svc.questions.length) continue;
    append += `### ${svc.label} — retry (${svc.questions.length} questions)\n\n`;
    append += `| Question | Vol | KD | CPC |\n|---------|-----|----|----|\n`;
    svc.questions.slice(0, 30).forEach(r => {
      append += `| ${r.q} | ${r.vol > 0 ? r.vol.toLocaleString() : '—'} | ${r.kd || '—'} | ${r.cpc ? '$'+r.cpc.toFixed(2) : '—'} |\n`;
    });
    append += '\n';
  }

  writeFileSync(OUT_AI, existing + append, 'utf8');

  const total = results.reduce((s, r) => s + r.questions.length, 0);
  console.log(`\n+${total} more questions appended → ${OUT_AI}`);
  console.log(`Units used: ~${RETRY.length * 50 * 10}`);
}

main().catch(e => { console.error('Fatal:', e.message); process.exit(1); });
