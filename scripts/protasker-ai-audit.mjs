/**
 * protasker-ai-audit.mjs
 *
 * 1. phrase_questions for all 36 Protasker services → AI visibility content gaps
 * 2. Site audit via SEMrush API (site_audit_task_*)
 * 3. AI overview snapshot via browser (semrush.com/ai-seo/)
 *
 * Unit budget:
 *   phrase_questions: 36 seeds × 50 rows × 10 = 18,000 units
 *   site_audit API:   ~500 units
 *   Total: ~18,500 units (leaves 31,500 for future use)
 *
 * Output: C:/Users/Owner/Documents/Protasker-AI-Questions.md
 *         C:/Users/Owner/Documents/Protasker-Site-Audit.md
 */

import { writeFileSync } from 'fs';

const API_KEY = '66c0e31a586e76570918c74c6655928f';
const DB      = 'ca';
const BASE    = 'https://api.semrush.com';
const sleep   = ms => new Promise(r => setTimeout(r, ms));

const OUT_AI    = 'C:/Users/Owner/Documents/Protasker-AI-Questions.md';
const OUT_AUDIT = 'C:/Users/Owner/Documents/Protasker-Site-Audit.md';

// ── All Protasker services (36 seeds)
const SERVICES = [
  // Cleaning
  { slug: 'house-cleaning',       seed: 'house cleaning toronto',        label: 'House Cleaning' },
  { slug: 'deep-cleaning',        seed: 'deep cleaning toronto',         label: 'Deep Cleaning' },
  { slug: 'carpet-cleaning',      seed: 'carpet cleaning toronto',       label: 'Carpet Cleaning' },
  { slug: 'window-cleaning',      seed: 'window cleaning toronto',       label: 'Window Cleaning' },
  { slug: 'duct-cleaning',        seed: 'duct cleaning toronto',         label: 'Duct Cleaning' },
  { slug: 'pressure-washing',     seed: 'pressure washing toronto',      label: 'Pressure Washing' },
  // Plumbing
  { slug: 'plumbing',             seed: 'plumber toronto',               label: 'Plumbing' },
  { slug: 'drain-cleaning',       seed: 'drain cleaning toronto',        label: 'Drain Cleaning' },
  { slug: 'sump-pump',            seed: 'sump pump repair toronto',      label: 'Sump Pump' },
  { slug: 'water-heater',         seed: 'water heater installation toronto', label: 'Water Heater' },
  // Electrical
  { slug: 'electrician',          seed: 'electrician toronto',           label: 'Electrician' },
  { slug: 'ev-charger',           seed: 'ev charger installation toronto', label: 'EV Charger Installation' },
  { slug: 'panel-upgrade',        seed: 'electrical panel upgrade ontario', label: 'Panel Upgrade' },
  // HVAC
  { slug: 'hvac',                 seed: 'furnace repair toronto',        label: 'Furnace Repair' },
  { slug: 'ac-repair',            seed: 'air conditioner repair toronto', label: 'AC Repair' },
  { slug: 'furnace-maintenance',  seed: 'furnace maintenance toronto',   label: 'Furnace Maintenance' },
  // Outdoor
  { slug: 'lawn-care',            seed: 'lawn care toronto',             label: 'Lawn Care' },
  { slug: 'landscaping',          seed: 'landscaping toronto',           label: 'Landscaping' },
  { slug: 'snow-removal',         seed: 'snow removal toronto',          label: 'Snow Removal' },
  { slug: 'tree-service',         seed: 'tree removal toronto',          label: 'Tree Service' },
  { slug: 'junk-removal',         seed: 'junk removal toronto',          label: 'Junk Removal' },
  { slug: 'eavestrough-cleaning', seed: 'eavestrough cleaning toronto',  label: 'Eavestrough Cleaning' },
  // Home services
  { slug: 'pest-control',         seed: 'pest control toronto',          label: 'Pest Control' },
  { slug: 'locksmith',            seed: 'locksmith toronto',             label: 'Locksmith' },
  { slug: 'handyman',             seed: 'handyman toronto',              label: 'Handyman' },
  { slug: 'moving',               seed: 'moving company toronto',        label: 'Moving' },
  { slug: 'appliance-repair',     seed: 'appliance repair toronto',      label: 'Appliance Repair' },
  // Renovation
  { slug: 'painting',             seed: 'house painting toronto',        label: 'Painting' },
  { slug: 'flooring',             seed: 'flooring installation toronto', label: 'Flooring' },
  { slug: 'roofing',              seed: 'roofing toronto',               label: 'Roofing' },
  { slug: 'kitchen-renovation',   seed: 'kitchen renovation toronto',    label: 'Kitchen Renovation' },
  { slug: 'bathroom-renovation',  seed: 'bathroom renovation toronto',   label: 'Bathroom Renovation' },
  { slug: 'basement-finishing',   seed: 'basement finishing toronto',    label: 'Basement Finishing' },
  { slug: 'fence-deck',           seed: 'deck installation toronto',     label: 'Fence & Deck' },
  { slug: 'garage-door',          seed: 'garage door repair toronto',    label: 'Garage Door' },
  { slug: 'attic-insulation',     seed: 'attic insulation toronto',      label: 'Attic Insulation' },
];

// ── API call helper
async function apiGet(params) {
  const url = BASE + '/?' + new URLSearchParams({ key: API_KEY, database: DB, ...params });
  const res = await fetch(url);
  const text = await res.text();
  if (text.startsWith('ERROR')) {
    console.error('  API ERROR:', text.trim());
    return [];
  }
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

// ── 1. PHRASE QUESTIONS — AI content gaps
async function getAllQuestions() {
  console.log('\n=== PHASE 1: AI Question Keywords (phrase_questions) ===');
  console.log(`Pulling questions for ${SERVICES.length} services, 50 rows each`);
  console.log(`Budget: ${SERVICES.length} × 50 × 10 = ${SERVICES.length * 50 * 10} units\n`);

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
    await sleep(300);

    if (rows.length === 0) {
      console.log('0 results');
      allByService.push({ ...svc, questions: [] });
      continue;
    }

    const questions = rows.map(r => ({
      q:   r['Keyword'] || r['Ph'] || '',
      vol: parseVol(r['Search Volume'] || r['Nq'] || '0'),
      kd:  parseInt(r['Keyword Difficulty Index'] || r['KD'] || '0') || 0,
      cpc: parseFloat(r['CPC'] || r['Cp'] || '0') || 0,
    })).filter(r => r.q.length > 5);

    console.log(`${questions.length} questions (top: "${questions[0]?.q}")`);
    allByService.push({ ...svc, questions });
    await sleep(200);
  }

  return allByService;
}

// ── Build AI Questions report
function buildAIReport(allByService) {
  const date = new Date().toISOString().split('T')[0];
  let md = `# Protasker — AI Question Keywords (All Services)\n`;
  md += `*${date} · Canada (db=ca) · phrase_questions via SEMrush API*\n\n`;
  md += `> **Strategy:** Answer these questions with FAQ schema → AI models (ChatGPT, Gemini, Perplexity) cite your pages when users ask these questions.\n\n`;

  // Flatten all questions
  const allQ = [];
  for (const svc of allByService) {
    for (const q of svc.questions) {
      allQ.push({ ...q, service: svc.label });
    }
  }

  // Easy wins: KD ≤ 25, vol ≥ 50
  const easy = allQ.filter(r => r.kd <= 25 && r.vol >= 50).sort((a, b) => b.vol - a.vol);
  // High vol
  const highVol = allQ.filter(r => r.vol >= 100).sort((a, b) => b.vol - a.vol);
  // Cost questions (AI models answer these most)
  const costQ = allQ.filter(r => /\bcost|how much|price|charge|expensive\b/i.test(r.q)).sort((a, b) => b.vol - a.vol);
  // How-to questions
  const howTo = allQ.filter(r => /^how to\b/i.test(r.q)).sort((a, b) => b.vol - a.vol);
  // Best/recommendation questions
  const bestQ = allQ.filter(r => /\bbest|top|recommend|should i\b/i.test(r.q)).sort((a, b) => b.vol - a.vol);

  md += `## Summary\n\n`;
  md += `| Metric | Count |\n|--------|-------|\n`;
  md += `| Total AI questions | ${allQ.length} |\n`;
  md += `| Easy wins (KD≤25, vol≥50) | ${easy.length} |\n`;
  md += `| High volume (100+ searches/mo) | ${highVol.length} |\n`;
  md += `| Cost/pricing questions | ${costQ.length} |\n`;
  md += `| How-to questions | ${howTo.length} |\n`;
  md += `| Best/recommendation questions | ${bestQ.length} |\n\n---\n\n`;

  // Top easy wins
  if (easy.length) {
    md += `## Easy Win AI Questions (KD ≤ 25 · Vol ≥ 50)\n`;
    md += `*Create FAQ content or blog posts for these — AI models will cite them*\n\n`;
    md += `| Question | Vol | KD | CPC | Service |\n`;
    md += `|---------|-----|----|-----|---------|\n`;
    easy.slice(0, 100).forEach(r => {
      md += `| ${r.q} | ${r.vol.toLocaleString()} | ${r.kd || '—'} | ${r.cpc ? '$'+r.cpc.toFixed(2) : '—'} | ${r.service} |\n`;
    });
    md += `\n`;
  }

  // Cost questions — #1 priority for AI citations
  if (costQ.length) {
    md += `## Cost & Pricing Questions (AI Models Answer These Most)\n`;
    md += `*"How much does X cost?" is the #1 AI-cited content type*\n\n`;
    md += `| Question | Vol | KD | Service |\n`;
    md += `|---------|-----|----|---------|\n`;
    costQ.slice(0, 100).forEach(r => {
      md += `| ${r.q} | ${r.vol > 0 ? r.vol.toLocaleString() : '—'} | ${r.kd || '—'} | ${r.service} |\n`;
    });
    md += `\n`;
  }

  // How-to questions
  if (howTo.length) {
    md += `## How-To Questions\n\n`;
    md += `| Question | Vol | KD | Service |\n`;
    md += `|---------|-----|----|---------|\n`;
    howTo.slice(0, 80).forEach(r => {
      md += `| ${r.q} | ${r.vol > 0 ? r.vol.toLocaleString() : '—'} | ${r.kd || '—'} | ${r.service} |\n`;
    });
    md += `\n`;
  }

  // Best/recommendation
  if (bestQ.length) {
    md += `## Best / Recommendation Questions\n`;
    md += `*"Which is the best...?" — users asking AI to recommend a service provider*\n\n`;
    md += `| Question | Vol | KD | Service |\n`;
    md += `|---------|-----|----|---------|\n`;
    bestQ.slice(0, 80).forEach(r => {
      md += `| ${r.q} | ${r.vol > 0 ? r.vol.toLocaleString() : '—'} | ${r.kd || '—'} | ${r.service} |\n`;
    });
    md += `\n---\n\n`;
  }

  // Per-service breakdown
  md += `## Questions By Service\n\n`;
  for (const svc of allByService) {
    if (!svc.questions.length) continue;
    md += `### ${svc.label} (${svc.questions.length} questions)\n\n`;
    md += `| Question | Vol | KD | CPC |\n|---------|-----|----|----|\n`;
    svc.questions.slice(0, 30).forEach(r => {
      md += `| ${r.q} | ${r.vol > 0 ? r.vol.toLocaleString() : '—'} | ${r.kd || '—'} | ${r.cpc ? '$'+r.cpc.toFixed(2) : '—'} |\n`;
    });
    md += `\n`;
  }

  return md;
}

// ── 2. SITE AUDIT via SEMrush API
async function getSiteAudit() {
  console.log('\n=== PHASE 2: Site Audit ===');

  const PROJECT_ID = '29269558';

  // Get audit campaigns
  const campaigns = await apiGet({
    type: 'site_audit_campaigns',
    project_id: PROJECT_ID,
  });
  console.log(`Campaigns: ${campaigns.length}`);

  if (!campaigns.length) {
    console.log('No audit campaign found via API — will use browser scraper');
    return null;
  }

  const campaignId = campaigns[0]['Campaign ID'] || campaigns[0]['id'];
  console.log(`Campaign ID: ${campaignId}`);

  // Get errors
  const errors = await apiGet({
    type: 'site_audit_issues',
    campaign_id: campaignId,
    export_columns: 'issue_id,issue_type,issue_description,pages_count',
    display_limit: 100,
  });
  console.log(`Issues found: ${errors.length}`);
  await sleep(300);

  return { campaignId, issues: errors };
}

function buildAuditReport(auditData) {
  const date = new Date().toISOString().split('T')[0];
  let md = `# Protasker.ca — SEMrush Site Audit\n*${date}*\n\n`;

  if (!auditData || !auditData.issues.length) {
    md += `> Site audit API returned no data. Run browser-based audit scraper.\n`;
    return md;
  }

  const errors   = auditData.issues.filter(i => i['Issue Type'] === 'error' || i['issue_type'] === 'error');
  const warnings = auditData.issues.filter(i => i['Issue Type'] === 'warning' || i['issue_type'] === 'warning');
  const notices  = auditData.issues.filter(i => i['Issue Type'] === 'notice' || i['issue_type'] === 'notice');

  md += `## Errors (${errors.length})\n\n| Issue | Pages |\n|-------|-------|\n`;
  errors.forEach(i => {
    md += `| ${i['Issue Description'] || i['issue_description']} | ${i['Pages Count'] || i['pages_count']} |\n`;
  });

  md += `\n## Warnings (${warnings.length})\n\n| Issue | Pages |\n|-------|-------|\n`;
  warnings.forEach(i => {
    md += `| ${i['Issue Description'] || i['issue_description']} | ${i['Pages Count'] || i['pages_count']} |\n`;
  });

  md += `\n## Notices (${notices.length})\n\n| Issue | Pages |\n|-------|-------|\n`;
  notices.forEach(i => {
    md += `| ${i['Issue Description'] || i['issue_description']} | ${i['Pages Count'] || i['pages_count']} |\n`;
  });

  return md;
}

// ── MAIN
async function main() {
  console.log('Protasker AI Audit — SEMrush API');
  console.log(`Key: ${API_KEY.slice(0, 8)}...`);
  console.log('='.repeat(50));

  // Phase 1: AI Questions
  const allByService = await getAllQuestions();
  const aiMd = buildAIReport(allByService);
  writeFileSync(OUT_AI, aiMd, 'utf8');
  console.log(`\nAI Questions saved → ${OUT_AI}`);

  // Phase 2: Site Audit
  const auditData = await getSiteAudit();
  const auditMd = buildAuditReport(auditData);
  writeFileSync(OUT_AUDIT, auditMd, 'utf8');
  console.log(`Site Audit saved → ${OUT_AUDIT}`);

  // Summary
  const totalQ = allByService.reduce((s, svc) => s + svc.questions.length, 0);
  const servicesWithData = allByService.filter(s => s.questions.length > 0).length;
  console.log(`\n✓ ${totalQ} AI questions across ${servicesWithData}/${SERVICES.length} services`);
  console.log(`✓ Units used: ~${SERVICES.length * 50 * 10} (phrase_questions)`);
}

main().catch(e => { console.error('Fatal:', e.message); process.exit(1); });
