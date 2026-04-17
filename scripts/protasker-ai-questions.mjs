/**
 * protasker-ai-questions.mjs
 * phrase_questions for all 36 Protasker services — NO city in seed
 * Generic seeds = full national question volume
 *
 * Budget: 36 × 50 × 10 = 18,000 units
 * Output: C:/Users/Owner/Documents/Protasker-AI-Questions.md
 */
import { writeFileSync } from 'fs';

const API_KEY = '66c0e31a586e76570918c74c6655928f';
const DB      = 'ca';
const BASE    = 'https://api.semrush.com';
const sleep   = ms => new Promise(r => setTimeout(r, ms));
const OUT_AI  = 'C:/Users/Owner/Documents/Protasker-AI-Questions.md';

// ── 36 services — generic seeds, NO city
const SERVICES = [
  // Cleaning
  { label: 'House Cleaning',       seed: 'house cleaning service' },
  { label: 'Deep Cleaning',        seed: 'deep cleaning service' },
  { label: 'Carpet Cleaning',      seed: 'carpet cleaning' },
  { label: 'Window Cleaning',      seed: 'window cleaning service' },
  { label: 'Duct Cleaning',        seed: 'duct cleaning' },
  { label: 'Pressure Washing',     seed: 'pressure washing service' },
  // Plumbing
  { label: 'Plumbing',             seed: 'plumber' },
  { label: 'Drain Cleaning',       seed: 'drain cleaning' },
  { label: 'Sump Pump',            seed: 'sump pump repair' },
  { label: 'Water Heater',         seed: 'water heater installation' },
  // Electrical
  { label: 'Electrician',          seed: 'electrician' },
  { label: 'EV Charger',           seed: 'ev charger installation' },
  { label: 'Panel Upgrade',        seed: 'electrical panel upgrade' },
  // HVAC
  { label: 'Furnace Repair',       seed: 'furnace repair' },
  { label: 'AC Repair',            seed: 'air conditioner repair' },
  { label: 'Furnace Maintenance',  seed: 'furnace maintenance' },
  // Outdoor
  { label: 'Lawn Care',            seed: 'lawn care service' },
  { label: 'Landscaping',          seed: 'landscaping service' },
  { label: 'Snow Removal',         seed: 'snow removal service' },
  { label: 'Tree Service',         seed: 'tree removal service' },
  { label: 'Junk Removal',         seed: 'junk removal' },
  { label: 'Eavestrough Cleaning', seed: 'eavestrough cleaning' },
  // Home services
  { label: 'Pest Control',         seed: 'pest control' },
  { label: 'Locksmith',            seed: 'locksmith service' },
  { label: 'Handyman',             seed: 'handyman service' },
  { label: 'Moving',               seed: 'moving company' },
  { label: 'Appliance Repair',     seed: 'appliance repair' },
  // Renovation
  { label: 'Painting',             seed: 'house painting' },
  { label: 'Flooring',             seed: 'flooring installation' },
  { label: 'Roofing',              seed: 'roofing service' },
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
  console.log('Protasker — AI Question Keywords (generic seeds)');
  console.log(`36 services × 50 rows × 10 units = 18,000 units\n`);

  const allByService = [];

  for (const svc of SERVICES) {
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

  // ── Build report
  const date = new Date().toISOString().split('T')[0];
  const allQ = allByService.flatMap(s => s.questions.map(q => ({ ...q, service: s.label })));

  const easy    = allQ.filter(r => r.kd <= 25 && r.vol >= 100).sort((a,b) => b.vol - a.vol);
  const costQ   = allQ.filter(r => /cost|how much|price|charge|expens/i.test(r.q)).sort((a,b) => b.vol - a.vol);
  const howTo   = allQ.filter(r => /^how to\b/i.test(r.q)).sort((a,b) => b.vol - a.vol);
  const bestQ   = allQ.filter(r => /\bbest|top|recommend|should i\b/i.test(r.q)).sort((a,b) => b.vol - a.vol);
  const highVol = allQ.filter(r => r.vol >= 200).sort((a,b) => b.vol - a.vol);

  console.log(`\nTotal questions: ${allQ.length}`);
  console.log(`Easy wins (KD≤25, vol≥100): ${easy.length}`);
  console.log(`Cost questions: ${costQ.length}`);
  console.log(`High volume (200+): ${highVol.length}`);

  let md = `# Protasker — AI Question Keywords (All Services)\n`;
  md += `*${date} · Canada · Generic seeds (no city) · phrase_questions*\n\n`;
  md += `> **Strategy:** Create FAQ content, cost guides, and blog posts answering these questions with FAQ schema markup → AI models (ChatGPT, Gemini, Perplexity) cite your pages in answers.\n\n`;

  md += `## Summary\n\n`;
  md += `| Segment | Count |\n|---------|-------|\n`;
  md += `| Total AI questions | ${allQ.length} |\n`;
  md += `| Easy wins (KD≤25, vol≥100) | ${easy.length} |\n`;
  md += `| High volume (200+/mo) | ${highVol.length} |\n`;
  md += `| Cost/pricing questions | ${costQ.length} |\n`;
  md += `| How-to questions | ${howTo.length} |\n`;
  md += `| Best/recommendation questions | ${bestQ.length} |\n\n---\n\n`;

  // High volume — most important
  if (highVol.length) {
    md += `## High Volume Questions (200+ searches/mo)\n`;
    md += `*These get the most AI citations — create dedicated content for each*\n\n`;
    md += `| Question | Vol | KD | CPC | Service |\n`;
    md += `|---------|-----|----|-----|---------|\n`;
    highVol.slice(0, 100).forEach(r => {
      md += `| ${r.q} | ${r.vol.toLocaleString()} | ${r.kd||'—'} | ${r.cpc?'$'+r.cpc.toFixed(2):'—'} | ${r.service} |\n`;
    });
    md += `\n`;
  }

  // Easy wins
  if (easy.length) {
    md += `## Easy Win Questions (KD ≤ 25 · Vol ≥ 100)\n\n`;
    md += `| Question | Vol | KD | CPC | Service |\n`;
    md += `|---------|-----|----|-----|---------|\n`;
    easy.slice(0, 150).forEach(r => {
      md += `| ${r.q} | ${r.vol.toLocaleString()} | ${r.kd||'—'} | ${r.cpc?'$'+r.cpc.toFixed(2):'—'} | ${r.service} |\n`;
    });
    md += `\n`;
  }

  // Cost questions
  if (costQ.length) {
    md += `## Cost & Pricing Questions\n`;
    md += `*#1 AI-cited content type — "How much does X cost?" dominates AI answers*\n\n`;
    md += `| Question | Vol | KD | CPC | Service |\n`;
    md += `|---------|-----|----|-----|---------|\n`;
    costQ.slice(0, 150).forEach(r => {
      md += `| ${r.q} | ${r.vol.toLocaleString()} | ${r.kd||'—'} | ${r.cpc?'$'+r.cpc.toFixed(2):'—'} | ${r.service} |\n`;
    });
    md += `\n`;
  }

  // How-to
  if (howTo.length) {
    md += `## How-To Questions\n\n`;
    md += `| Question | Vol | KD | Service |\n|---------|-----|----|---------|\n`;
    howTo.slice(0, 100).forEach(r => {
      md += `| ${r.q} | ${r.vol>0?r.vol.toLocaleString():'—'} | ${r.kd||'—'} | ${r.service} |\n`;
    });
    md += `\n`;
  }

  // Best / recommendations
  if (bestQ.length) {
    md += `## Best / Recommendation Questions\n`;
    md += `*Users asking AI to recommend — being cited here = direct booking intent*\n\n`;
    md += `| Question | Vol | KD | Service |\n|---------|-----|----|---------|\n`;
    bestQ.slice(0, 100).forEach(r => {
      md += `| ${r.q} | ${r.vol>0?r.vol.toLocaleString():'—'} | ${r.kd||'—'} | ${r.service} |\n`;
    });
    md += `\n---\n\n`;
  }

  // Per-service breakdown
  md += `## Questions By Service\n\n`;
  for (const svc of allByService) {
    if (!svc.questions.length) { md += `### ${svc.label}\n*No questions found*\n\n`; continue; }
    md += `### ${svc.label} (${svc.questions.length} questions)\n\n`;
    md += `| Question | Vol | KD | CPC |\n|---------|-----|----|----|\n`;
    svc.questions.forEach(r => {
      md += `| ${r.q} | ${r.vol>0?r.vol.toLocaleString():'—'} | ${r.kd||'—'} | ${r.cpc?'$'+r.cpc.toFixed(2):'—'} |\n`;
    });
    md += `\n`;
  }

  writeFileSync(OUT_AI, md, 'utf8');
  console.log(`\nSaved → ${OUT_AI}`);
}

main().catch(e => { console.error('Fatal:', e.message); process.exit(1); });
