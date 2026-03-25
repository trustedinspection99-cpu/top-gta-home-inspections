import { readFileSync, writeFileSync } from 'fs';

const filePath = 'src/data/locationData.ts';
const content = readFileSync(filePath, 'utf8');

function formatNeighborhoods(hoods) {
  if (hoods.length === 1) return hoods[0];
  return hoods.slice(0, -1).join(', ') + ' & ' + hoods[hoods.length - 1];
}

function buildDescription(city, neighborhoods) {
  const prefix = `Pre-purchase home inspection ${city} from $399. Infrared imaging, same-day booking & detailed PDF report. Serving `;
  const maxChars = 160;

  for (let count = Math.min(neighborhoods.length, 5); count >= 1; count--) {
    const desc = prefix + formatNeighborhoods(neighborhoods.slice(0, count)) + '.';
    if (desc.length <= maxChars) return desc;
  }

  // Fallback: no neighborhoods line
  return `Pre-purchase home inspection ${city} from $399. Infrared imaging, same-day booking & detailed PDF report.`;
}

// Find all location entry boundaries
const slugPattern = /slug:\s*"home-inspection-[^"]+"/g;
const slugMatches = [...content.matchAll(slugPattern)];

console.log(`Found ${slugMatches.length} location entries`);

// Collect replacements — process backwards to preserve indices
const replacements = [];

for (let i = 0; i < slugMatches.length; i++) {
  const start = slugMatches[i].index;
  const end = i + 1 < slugMatches.length ? slugMatches[i + 1].index : content.length;
  const block = content.slice(start, end);

  const cityMatch = block.match(/city:\s*"([^"]+)"/);
  if (!cityMatch) continue;
  const city = cityMatch[1];

  const neighborhoodsMatch = block.match(/neighborhoods:\s*\[([\s\S]*?)\]/);
  let neighborhoods = [];
  if (neighborhoodsMatch) {
    neighborhoods = (neighborhoodsMatch[1].match(/"([^"]+)"/g) || [])
      .map(s => s.replace(/"/g, ''));
  }

  const newDesc = buildDescription(city, neighborhoods);

  // Find exact position of metaDescription within block
  const metaPattern = /metaDescription:\s*"[^"]*"/;
  const metaMatch = block.match(metaPattern);
  if (!metaMatch) continue;

  const metaStart = start + metaMatch.index;
  const metaEnd = metaStart + metaMatch[0].length;
  const newMeta = `metaDescription: "${newDesc}"`;

  replacements.push({ start: metaStart, end: metaEnd, text: newMeta, city, desc: newDesc });
}

// Apply backwards so indices stay valid
replacements.sort((a, b) => b.start - a.start);

let newContent = content;
let updated = 0;
for (const { start, end, text, city, desc } of replacements) {
  if (desc.length > 160) {
    console.warn(`⚠ ${city}: description too long (${desc.length} chars) — ${desc}`);
  }
  newContent = newContent.slice(0, start) + text + newContent.slice(end);
  updated++;
}

writeFileSync(filePath, newContent, 'utf8');
console.log(`\n✅ Updated ${updated} metaDescriptions`);
