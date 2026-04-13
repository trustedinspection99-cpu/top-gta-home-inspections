/**
 * backlink-intel.mjs
 * Uses SerpAPI to gather backlink intelligence on competitors.
 * Searches Google for who links to each competitor domain, what anchor text
 * is used, and what types of sites are linking to them.
 *
 * Run: node scripts/backlink-intel.mjs
 * Output: scripts/backlink-report-[date].md
 */

import { readFileSync, writeFileSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const TODAY = new Date().toISOString().split('T')[0];

// Load API key
const envFile = resolve(__dirname, '..', '.env.local');
const envContent = readFileSync(envFile, 'utf8');
const keyMatch = envContent.match(/SERP_API_KEY=(.+)/);
if (!keyMatch) { console.error('No SERP_API_KEY in .env.local'); process.exit(1); }
const KEY = keyMatch[1].trim();

const competitors = [
  // National / Franchise
  { name: 'Mike Holmes Inspections',    domain: 'mikeholmesinspections.com' },
  { name: 'AmeriSpec Canada',           domain: 'amerispec.ca' },
  { name: 'Pillar To Post',             domain: 'pillartopost.com' },
  { name: "A Buyer's Choice",           domain: 'abuyerschoice.com' },
  { name: 'Carson Dunlop',              domain: 'carsondunlop.ca' },
  // GTA / Multi-City
  { name: 'Inch by Inch',               domain: 'inchbyinchinspections.com' },
  { name: 'Twin Peaks',                 domain: 'twinpeaksinspections.ca' },
  { name: 'Solex Group',                domain: 'solexgroup.ca' },
  { name: 'GPI Home Inspections',       domain: 'gpiweb.ca' },
  { name: 'Smart Choice Home & Mold',   domain: 'smartchoicehomeandmold.com' },
  { name: 'Inspection Services Group',  domain: 'inspectionservicesgroup.com' },
  // City-Specific
  { name: 'HouseMaster Toronto',        domain: 'housemastertoronto.com' },
  { name: 'EH Inspections',             domain: 'ehinspections.ca' },
  { name: 'Rankin Home Inspections',    domain: 'rankinhomeinspections.ca' },
  { name: 'MDHI Hamilton',              domain: 'mdhi.ca' },
  { name: 'Robles Home Inspections',    domain: 'robleshomeinspections.com' },
  { name: 'Legacy Home Inspection',     domain: 'legacyhomeinspection.ca' },
  { name: 'Building Insights',          domain: 'building-insights.com' },
  { name: '1st Call Home Inspections',  domain: '1stcallhomeinspections.com' },
  // Us
  { name: 'ASADS (us)',                 domain: 'asads.ca' },
];

async function serpFetch(params) {
  const qs = new URLSearchParams({ ...params, api_key: KEY }).toString();
  const res = await fetch(`https://serpapi.com/search.json?${qs}`, {
    signal: AbortSignal.timeout(15000),
  });
  if (!res.ok) return null;
  return res.json();
}

// Search Google for pages that mention/link to the domain
async function getMentions(domain) {
  const data = await serpFetch({
    engine: 'google',
    q: `"${domain}" -site:${domain}`,
    gl: 'ca',
    hl: 'en',
    num: 10,
  });
  return (data?.organic_results || []).map(r => ({
    title: r.title,
    url: r.link,
    domain: (() => { try { return new URL(r.link).hostname.replace('www.', ''); } catch { return r.link; } })(),
    snippet: r.snippet?.slice(0, 120),
  }));
}

// Search Google for directory/association listings of the domain
async function getDirectoryLinks(domain) {
  const data = await serpFetch({
    engine: 'google',
    q: `"${domain}" (directory OR listing OR "registered" OR "certified" OR "member") site:*.ca OR site:*.com`,
    gl: 'ca',
    hl: 'en',
    num: 10,
  });
  return (data?.organic_results || []).map(r => ({
    title: r.title,
    url: r.link,
    domain: (() => { try { return new URL(r.link).hostname.replace('www.', ''); } catch { return r.link; } })(),
  }));
}

// Get Google's knowledge about a domain (site: search)
async function getSitePages(domain) {
  const data = await serpFetch({
    engine: 'google',
    q: `site:${domain}`,
    gl: 'ca',
    hl: 'en',
    num: 10,
  });
  return {
    estimatedResults: data?.search_information?.total_results || 'unknown',
    topPages: (data?.organic_results || []).slice(0, 5).map(r => ({
      title: r.title,
      url: r.link,
    })),
  };
}

// Get news/press mentions
async function getPressMentions(name, domain) {
  const data = await serpFetch({
    engine: 'google',
    q: `"${name}" OR "${domain}" news press mention`,
    gl: 'ca',
    hl: 'en',
    num: 5,
    tbm: 'nws',
  });
  return (data?.news_results || []).map(r => ({
    title: r.title,
    source: r.source,
    date: r.date,
    url: r.link,
  }));
}

async function main() {
  console.log(`\n🔗 ASADS Backlink Intelligence — ${TODAY}\n`);

  const results = [];

  for (const comp of competitors) {
    console.log(`Analyzing: ${comp.name} (${comp.domain})`);

    const [mentions, directories, siteInfo, press] = await Promise.all([
      getMentions(comp.domain),
      getDirectoryLinks(comp.domain),
      getSitePages(comp.domain),
      getPressMentions(comp.name, comp.domain),
    ]);

    results.push({ ...comp, mentions, directories, siteInfo, press });
    console.log(`  ✓ ${mentions.length} mentions | ${directories.length} directory links | ${siteInfo.estimatedResults} indexed pages`);

    await new Promise(r => setTimeout(r, 1000));
  }

  // ─── Build Report ─────────────────────────────────────────────────────────

  let md = `# ASADS Backlink Intelligence Report\n`;
  md += `**Date:** ${TODAY}\n`;
  md += `**Method:** Google search-based backlink discovery via SerpAPI\n\n`;
  md += `---\n\n`;

  // Summary table
  md += `## Competitor Overview\n\n`;
  md += `| Competitor | Indexed Pages | Mention Sources | Key Linking Domains |\n`;
  md += `|---|---|---|---|\n`;
  for (const r of results) {
    const topDomains = [...new Set(r.mentions.map(m => m.domain))].slice(0, 3).join(', ');
    md += `| **${r.name}** | ${r.siteInfo.estimatedResults} | ${r.mentions.length} found | ${topDomains || '—'} |\n`;
  }
  md += `\n---\n\n`;

  // Per-competitor detail
  for (const r of results) {
    const isUs = r.domain === 'asads.ca';
    md += `## ${r.name}${isUs ? ' ← US' : ''}\n`;
    md += `**Domain:** ${r.domain}\n`;
    md += `**Google Indexed Pages:** ${r.siteInfo.estimatedResults}\n\n`;

    if (r.siteInfo.topPages.length) {
      md += `### Top Indexed Pages\n`;
      for (const p of r.siteInfo.topPages) md += `- [${p.title}](${p.url})\n`;
      md += `\n`;
    }

    if (r.mentions.length) {
      md += `### Sites Mentioning/Linking to ${r.domain}\n`;
      md += `| Linking Domain | Page Title | Context |\n`;
      md += `|---|---|---|\n`;
      for (const m of r.mentions) {
        md += `| ${m.domain} | ${m.title?.slice(0, 50)} | ${m.snippet?.slice(0, 80) || '—'} |\n`;
      }
      md += `\n`;
    }

    if (r.directories.length) {
      md += `### Directory / Association Listings\n`;
      for (const d of r.directories) md += `- **${d.domain}** — [${d.title?.slice(0, 60)}](${d.url})\n`;
      md += `\n`;
    }

    if (r.press.length) {
      md += `### Press Mentions\n`;
      for (const p of r.press) md += `- **${p.source}** (${p.date}) — ${p.title}\n`;
      md += `\n`;
    }

    md += `---\n\n`;
  }

  // Gap analysis
  md += `## Backlink Gap Analysis — What ASADS is Missing\n\n`;

  const allLinkingDomains = new Map();
  for (const r of results) {
    if (r.domain === 'asads.ca') continue;
    for (const m of [...r.mentions, ...r.directories]) {
      const d = m.domain;
      if (!allLinkingDomains.has(d)) allLinkingDomains.set(d, []);
      allLinkingDomains.get(d).push(r.name);
    }
  }

  const asadsMentions = new Set(results.find(r => r.domain === 'asads.ca')?.mentions.map(m => m.domain) || []);
  const gaps = [...allLinkingDomains.entries()]
    .filter(([domain]) => !asadsMentions.has(domain) && domain !== 'asads.ca')
    .sort((a, b) => b[1].length - a[1].length);

  md += `These domains link to competitors but NOT to ASADS — each is a link-building opportunity:\n\n`;
  md += `| Domain | Competitors It Links To | Priority |\n`;
  md += `|---|---|---|\n`;
  for (const [domain, comps] of gaps.slice(0, 30)) {
    const priority = comps.length >= 3 ? '🔴 HIGH' : comps.length === 2 ? '🟡 MEDIUM' : '⚪ LOW';
    md += `| **${domain}** | ${comps.join(', ')} | ${priority} |\n`;
  }

  md += `\n## Action Plan\n\n`;
  md += `1. **HIGH priority domains above** — reach out for listing or mention\n`;
  md += `2. Look for pattern: directories, associations, real estate blogs, local news\n`;
  md += `3. Any domain linking to 3+ competitors is a directory — get ASADS listed there\n`;
  md += `4. Press mentions = PR opportunity — pitch local real estate media\n`;
  md += `5. Run \`npm run backlink-intel\` monthly to track new gaps\n`;

  const outFile = resolve(__dirname, `backlink-report-${TODAY}.md`);
  writeFileSync(outFile, md);
  console.log(`\n✅ Report saved: ${outFile}\n`);
}

main().catch(console.error);
