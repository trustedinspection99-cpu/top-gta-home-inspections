/**
 * protasker-ai-compile.mjs
 * Re-reads the raw AI questions file, filters noise, builds final clean report
 */
import { readFileSync, writeFileSync } from 'fs';

const IN  = 'C:/Users/Owner/Documents/Protasker-AI-Questions.md';
const OUT = 'C:/Users/Owner/Documents/Protasker-AI-Final.md';

// Parse all question rows out of the markdown
function parseAllQuestions(md) {
  const all = [];
  let currentService = '';

  for (const line of md.split('\n')) {
    // Detect service heading
    const h3 = line.match(/^### (.+?)\s*\((\d+) questions?\)/);
    if (h3) { currentService = h3[1]; continue; }

    // Table row: | question | vol | kd | cpc |  or  | question | vol | kd | cpc | service |
    if (!line.startsWith('|')) continue;
    const cells = line.split('|').map(c => c.trim()).filter(Boolean);
    if (cells[0] === 'Question' || cells[0].startsWith('-') || cells[0].startsWith('=')) continue;
    if (cells.length < 2) continue;

    const q   = cells[0];
    const vol = parseVol(cells[1]);
    const kd  = parseInt(cells[2]) || 0;
    // cells[3] is CPC if it looks numeric/price, else it's the service (4-col table)
    const col3 = cells[3] || '';
    const col3IsService = col3.length > 2 && !/^[\d\$—\-]/.test(col3) && !/^\d+\.\d+$/.test(col3);
    const cpc = col3IsService ? 0 : (parseFloat(col3.replace('$','')) || 0);
    // Service: col4 if present and looks like a name, else col3 if it's a name, else currentService
    const col4 = cells[4] || '';
    const col4IsService = col4.length > 2 && !/^[\d\$—\-]/.test(col4) && !/^\d+\.\d+$/.test(col4);
    const svc = col4IsService ? col4 : (col3IsService ? col3 : currentService);

    if (q.length < 8) continue;
    // Skip rows that are clearly header/summary content
    if (/^(Segment|Metric|Service|Question|Issue|Keyword|Category)$/i.test(q)) continue;
    if (/^\d+$/.test(q)) continue;
    all.push({ q, vol, kd, cpc, service: svc });
  }

  return all;
}

function parseVol(v) {
  if (!v || v === '—') return 0;
  v = String(v).replace(/,/g,'').trim();
  if (/[Kk]$/.test(v)) return parseFloat(v)*1000;
  if (/[Mm]$/.test(v)) return parseFloat(v)*1000000;
  return parseFloat(v)||0;
}

// Filter out non-booking-intent noise
const NOISE = [
  // Career / salary / school
  /\bhow (much|to) (become|be|get|train|study|qualify|apply|join|earn|make)\b/i,
  /\b(salary|wage|income|career|tuition|college|school|apprentice|license exam|red seal|journeyman|trade school|night school|apprenticeship)\b/i,
  /\bhow much (do|does|can) .{3,30} (make|earn|get paid)\b/i,
  // DIY how-to (doing it yourself, not hiring)
  /^how to (install|fix|repair|clean|build|make|use|cut|paint|remove|replace|connect|wire|run|lay|apply|seal|caulk|finish|sand|stain|strip|unclog|snake|solder|plumb|shingle|tile|grout|hang|mount|frame|drywall|insulate|reglaze|refinish|resurface|patch|pour|mix|prime|attach|calculate|figure|determine|measure|spot clean|clean a carpet|clean carpet|clean my carpet|clean house carpet|clean stain|clean drain|clean sink drain|clean kitchen|clean wash basin|clean shower|clean dryer duct|clean my duct)\b/i,
  /^how do (i|you) (install|fix|repair|clean|build|make|use|do|remove|replace|wire|run|lay|paint|stain|strip|hang|mount|shingle|tile|grout|frame|insulate|unclog|calculate|figure|determine|clean|use a)\b/i,
  /^how (can i|can you|do i|do you) (clean|install|fix|repair|build|make|remove|replace|wire|paint|do|tile|calculate|figure|determine)\b/i,
  // DIY product/rental signals
  /\b(diy|do it yourself|yourself at home|at home yourself|rent a carpet|rent carpet cleaner|where to rent|where to buy|buy a carpet|purchase a)\b/i,
  // Nonsense / pop culture / off-topic
  /\b(trump|tin roof|giphy|radio station|on a hot|rogers centre|roof of my mouth|roofie|square feet in a pack|square feet in a package|pitch of a roof|roof slope|roof pitch calculator|calculate roof|figure roof)\b/i,
  // Career path (not booking)
  /\b(become an electrician|become a plumber|become a carpenter|become a roofer|how can i become|how do i become|how do you become)\b/i,
  // Summary table rows that got parsed
  /^(total|easy wins|high volume|cost|how-to|best|near me|emergency|booking intent|raw questions|unique)\b/i,
  /^\d+ questions$/i,
  // Platform names parsed as questions
  /^(sait|bcit|georgebrown|seneca|mohawk|humber|conestoga|fanshawe|loyalist|homestars|bark|jiffy|taskrabbit)\b/i,
];

// Keep booking-intent questions
const KEEP_BOOST = [
  /\bhow much (does|do|is|are|cost|to)\b/i,
  /\b(cost|price|quote|estimate|fee|charge|rate|expensive|cheap|affordable)\b/i,
  /\b(near me|in my area|local|find a|hire a|get a|book a|call a)\b/i,
  /\b(how long|how often|when should|do i need|should i|is it worth|what to expect)\b/i,
  /\b(best|top rated|reliable|licensed|insured|certified|professional)\b/i,
  /\b(emergency|same day|24 hour|weekend|after hours)\b/i,
  /\bwhat (is included|does .+ include|happens during|to look for|questions to ask)\b/i,
];

function isNoise(q) {
  return NOISE.some(rx => rx.test(q));
}

function isBookingIntent(q) {
  return KEEP_BOOST.some(rx => rx.test(q));
}

function main() {
  const md = readFileSync(IN, 'utf8');
  const raw = parseAllQuestions(md);

  // Deduplicate
  const seen = new Set();
  const unique = raw.filter(r => {
    const k = r.q.toLowerCase();
    if (seen.has(k)) return false;
    seen.add(k); return true;
  });

  console.log(`Raw questions: ${raw.length} | Unique: ${unique.length}`);

  // Split into booking-intent vs noise
  const booking = unique.filter(r => !isNoise(r.q));
  const noise   = unique.filter(r => isNoise(r.q));
  console.log(`Booking intent: ${booking.length} | Filtered noise: ${noise.length}`);

  // Segments
  const highVol  = booking.filter(r => r.vol >= 200).sort((a,b) => b.vol-a.vol);
  const costQ    = booking.filter(r => /cost|how much|price|charge|expens/i.test(r.q)).sort((a,b) => b.vol-a.vol);
  const easyWins = booking.filter(r => r.kd <= 25 && r.vol >= 100).sort((a,b) => b.vol-a.vol);
  const nearMe   = booking.filter(r => /near me|in my area|local/i.test(r.q)).sort((a,b) => b.vol-a.vol);
  const howLong  = booking.filter(r => /how long|how often|when should/i.test(r.q)).sort((a,b) => b.vol-a.vol);
  const emergency = booking.filter(r => /emergency|24 hour|same.?day|urgent/i.test(r.q)).sort((a,b) => b.vol-a.vol);
  const bestQ    = booking.filter(r => /\bbest\b|top rated|reliable/i.test(r.q)).sort((a,b) => b.vol-a.vol);

  // Group by service
  const byService = {};
  for (const r of booking) {
    if (!byService[r.service]) byService[r.service] = [];
    byService[r.service].push(r);
  }
  const sortedServices = Object.entries(byService)
    .sort((a,b) => b[1].reduce((s,r)=>s+r.vol,0) - a[1].reduce((s,r)=>s+r.vol,0));

  const date = new Date().toISOString().split('T')[0];
  let out = `# Protasker — AI Question Keywords (Clean · All 36 Services)\n`;
  out += `*${date} · Canada · phrase_questions · Booking intent only*\n\n`;
  out += `> These are the exact questions people ask ChatGPT, Gemini & Perplexity about home services.\n`;
  out += `> Create FAQ content + blog posts answering these → AI models cite Protasker in answers.\n\n`;

  out += `## Summary\n\n`;
  out += `| Segment | Count |\n|---------|-------|\n`;
  out += `| Total booking-intent questions | ${booking.length} |\n`;
  out += `| High volume (200+/mo) | ${highVol.length} |\n`;
  out += `| Easy wins (KD≤25, vol≥100) | ${easyWins.length} |\n`;
  out += `| Cost & pricing questions | ${costQ.length} |\n`;
  out += `| "Near me" / find-a-pro questions | ${nearMe.length} |\n`;
  out += `| How long / how often questions | ${howLong.length} |\n`;
  out += `| Emergency / urgent questions | ${emergency.length} |\n`;
  out += `| Best / recommendation questions | ${bestQ.length} |\n\n---\n\n`;

  // High volume
  out += `## High Volume Questions (200+/mo)\n`;
  out += `*Biggest AI citation opportunities — these are searched constantly*\n\n`;
  out += `| Question | Vol | KD | Service |\n|---------|-----|----|---------|\n`;
  highVol.slice(0,100).forEach(r => {
    out += `| ${r.q} | ${r.vol.toLocaleString()} | ${r.kd||'—'} | ${r.service} |\n`;
  });
  out += '\n';

  // Easy wins
  out += `## Easy Win Questions (KD ≤ 25 · Vol ≥ 100)\n`;
  out += `*Low competition + real volume = fastest path to AI citations*\n\n`;
  out += `| Question | Vol | KD | CPC | Service |\n|---------|-----|----|-----|---------|\n`;
  easyWins.slice(0,100).forEach(r => {
    out += `| ${r.q} | ${r.vol.toLocaleString()} | ${r.kd||'—'} | ${r.cpc?'$'+r.cpc.toFixed(2):'—'} | ${r.service} |\n`;
  });
  out += '\n';

  // Cost questions
  out += `## Cost & Pricing Questions\n`;
  out += `*"How much does X cost?" = #1 AI-cited content type for home services*\n\n`;
  out += `| Question | Vol | KD | Service |\n|---------|-----|----|---------|\n`;
  costQ.slice(0,100).forEach(r => {
    out += `| ${r.q} | ${r.vol>0?r.vol.toLocaleString():'—'} | ${r.kd||'—'} | ${r.service} |\n`;
  });
  out += '\n';

  // Near me
  if (nearMe.length) {
    out += `## "Find a Pro" Questions\n`;
    out += `*High booking intent — users ready to hire*\n\n`;
    out += `| Question | Vol | KD | Service |\n|---------|-----|----|---------|\n`;
    nearMe.slice(0,60).forEach(r => {
      out += `| ${r.q} | ${r.vol>0?r.vol.toLocaleString():'—'} | ${r.kd||'—'} | ${r.service} |\n`;
    });
    out += '\n';
  }

  // Emergency
  if (emergency.length) {
    out += `## Emergency / Urgent Questions\n\n`;
    out += `| Question | Vol | KD | Service |\n|---------|-----|----|---------|\n`;
    emergency.forEach(r => {
      out += `| ${r.q} | ${r.vol>0?r.vol.toLocaleString():'—'} | ${r.kd||'—'} | ${r.service} |\n`;
    });
    out += '\n';
  }

  // How long / how often
  if (howLong.length) {
    out += `## How Long / How Often Questions\n`;
    out += `*Great for FAQ schema — AI models cite these in advisory answers*\n\n`;
    out += `| Question | Vol | KD | Service |\n|---------|-----|----|---------|\n`;
    howLong.slice(0,60).forEach(r => {
      out += `| ${r.q} | ${r.vol>0?r.vol.toLocaleString():'—'} | ${r.kd||'—'} | ${r.service} |\n`;
    });
    out += '\n';
  }

  // Best / recommendation
  if (bestQ.length) {
    out += `## Best & Recommendation Questions\n`;
    out += `*Users asking AI to recommend a provider — being cited here = direct leads*\n\n`;
    out += `| Question | Vol | KD | Service |\n|---------|-----|----|---------|\n`;
    bestQ.slice(0,60).forEach(r => {
      out += `| ${r.q} | ${r.vol>0?r.vol.toLocaleString():'—'} | ${r.kd||'—'} | ${r.service} |\n`;
    });
    out += '\n---\n\n';
  }

  // Per service breakdown
  out += `## By Service (sorted by total volume)\n\n`;
  out += `| Service | Questions | Cost Qs | Top Question | Top Vol |\n`;
  out += `|---------|----------|---------|-------------|--------|\n`;
  for (const [svc, rows] of sortedServices) {
    const costCount = rows.filter(r => /cost|how much|price|charge/i.test(r.q)).length;
    const topQ = rows.sort((a,b)=>b.vol-a.vol)[0];
    out += `| ${svc} | ${rows.length} | ${costCount} | ${topQ?.q||'—'} | ${topQ?.vol>0?topQ.vol.toLocaleString():'—'} |\n`;
  }
  out += '\n';

  for (const [svc, rows] of sortedServices) {
    const sorted = rows.sort((a,b)=>b.vol-a.vol);
    out += `### ${svc} (${rows.length} questions)\n\n`;
    out += `| Question | Vol | KD | CPC |\n|---------|-----|----|----|\n`;
    sorted.forEach(r => {
      out += `| ${r.q} | ${r.vol>0?r.vol.toLocaleString():'—'} | ${r.kd||'—'} | ${r.cpc?'$'+r.cpc.toFixed(2):'—'} |\n`;
    });
    out += '\n';
  }

  writeFileSync(OUT, out, 'utf8');
  console.log(`Saved → ${OUT}`);
  console.log(`\nTop 10 high-volume booking questions:`);
  highVol.slice(0,10).forEach((r,i) => console.log(`  ${i+1}. "${r.q}" — vol ${r.vol} [${r.service}]`));
}

main();
