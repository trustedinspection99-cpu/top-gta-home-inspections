/**
 * city-intel.mjs
 * Gathers competitor intelligence and Google-first-page presence for all 106 Ontario cities.
 *
 * For each city it:
 *   1. Checks ASADS's own city page (meta title, desc, H1)
 *   2. Checks known competitor city-page URL patterns (EH, CVHI, Mike Holmes, Inch by Inch, Peak HI)
 *   3. Flags cities where a competitor has a live city page that ASADS should outrank
 *   4. (Optional) Queries SerpAPI for real Google first-page rankings — add SERP_API_KEY to .env
 *
 * Output: scripts/city-intel-report-[date].md
 *
 * Run:  node scripts/city-intel.mjs
 * Auto: add to package.json scripts → "city-intel": "node scripts/city-intel.mjs"
 * Cron: run monthly (add to Windows Task Scheduler or cron)
 *
 * ─── Google First-Page Intelligence (SERP) ────────────────────────────────────
 * To get actual Google rankings per city, add a SerpAPI key:
 *   1. Sign up at https://serpapi.com (free tier: 100 searches/month)
 *   2. Create a file: .env.local  →  SERP_API_KEY=your_key_here
 *   3. This script will automatically use it when present
 *
 * Without SERP_API_KEY, the script still checks competitor page existence (fast, free).
 * With SERP_API_KEY, it also pulls positions 1–10 for "home inspection [city] ontario".
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { readFileSync, writeFileSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const TODAY = new Date().toISOString().split('T')[0];
const BASE_URL = 'https://www.asads.ca';

// ─── Load SERP API key if present ────────────────────────────────────────────

let SERP_API_KEY = null;
const envFile = resolve(ROOT, '.env.local');
if (existsSync(envFile)) {
  const envContent = readFileSync(envFile, 'utf8');
  const match = envContent.match(/SERP_API_KEY=(.+)/);
  if (match) SERP_API_KEY = match[1].trim();
}

// ─── Extract city data from locationData.ts ───────────────────────────────────

const locationRaw = readFileSync(resolve(ROOT, 'src/data/locationData.ts'), 'utf8');
const cityEntries = [];

// Extract slug and city name pairs
const slugMatches = [...locationRaw.matchAll(/slug:\s*"(home-inspection-[^"]+)"/g)];
const cityMatches = [...locationRaw.matchAll(/city:\s*"([^"]+)"/g)];

for (let i = 0; i < slugMatches.length; i++) {
  const fullSlug = slugMatches[i][1];
  const citySlug = fullSlug.replace(/^home-inspection-/, '');
  const cityName = cityMatches[i] ? cityMatches[i][1] : citySlug;
  cityEntries.push({ citySlug, fullSlug, cityName });
}

// ─── Competitor URL patterns ──────────────────────────────────────────────────
// Each competitor has a function that takes citySlug → URL to check.
// If they use a different slug format, that's handled here.

const competitorPatterns = [
  {
    name: 'EH Inspections',
    shortName: 'EH',
    urlFn: (slug) => `https://ehinspections.ca/home-inspection-${slug}/`,
    priority: 'HIGH',
  },
  {
    name: 'CVHI (Canadian Verified)',
    shortName: 'CVHI',
    urlFn: (slug) => `https://cvhi.ca/locations/home-inspection-companies-${slug}/`,
    priority: 'MEDIUM',
  },
  {
    name: 'Inch by Inch',
    shortName: 'InchByInch',
    urlFn: (slug) => `https://inchinch.ca/home-inspection-${slug}/`,
    priority: 'HIGH',
  },
  {
    name: 'Mike Holmes Inspections',
    shortName: 'MikeHolmes',
    urlFn: (slug) => `https://mikeholmesinspections.com/${slug}-home-inspection/`,
    priority: 'HIGH',
  },
  {
    name: 'Peak Home Inspections',
    shortName: 'PeakHI',
    urlFn: (slug) => `https://peakhomeinspections.ca/home-inspections-${slug}/`,
    priority: 'MEDIUM',
  },
  {
    name: 'Rankin Inspection',
    shortName: 'Rankin',
    urlFn: (slug) => `https://rankininspection.ca/home-inspection-${slug}/`,
    priority: 'LOW',
  },
];

// ─── Fetch helper ─────────────────────────────────────────────────────────────

async function fetchMeta(url, timeoutMs = 8000) {
  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; ASADS-CityIntel/1.0)',
        'Accept': 'text/html',
      },
      signal: AbortSignal.timeout(timeoutMs),
      redirect: 'follow',
    });

    if (res.status === 404 || res.status === 410) return { exists: false, status: res.status };
    if (!res.ok) return { exists: false, status: res.status };

    const html = await res.text();

    const titleMatch = html.match(/<title[^>]*>([^<]*)<\/title>/i);
    const descMatch = html.match(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']{10,})/i)
                  || html.match(/<meta[^>]+content=["']([^"']{10,})[^>]+name=["']description["']/i);
    const h1Match = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);

    // Detect soft 404 (page exists but shows generic/404 content)
    const title = titleMatch ? titleMatch[1].trim() : '';
    const isSoft404 = title.toLowerCase().includes('404') ||
                      title.toLowerCase().includes('not found') ||
                      title.toLowerCase().includes('page not found');

    return {
      exists: !isSoft404,
      status: res.status,
      title,
      description: descMatch ? descMatch[1].trim() : null,
      h1: h1Match ? h1Match[1].replace(/<[^>]+>/g, '').trim().slice(0, 100) : null,
      titleLength: title.length,
    };
  } catch {
    return { exists: false, status: 'timeout/error' };
  }
}

// ─── SerpAPI query ────────────────────────────────────────────────────────────

async function getSerpResults(cityName) {
  if (!SERP_API_KEY) return null;
  const query = encodeURIComponent(`home inspection ${cityName} ontario`);
  const url = `https://serpapi.com/search.json?q=${query}&location=Ontario,Canada&hl=en&gl=ca&num=10&api_key=${SERP_API_KEY}`;
  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(10000) });
    if (!res.ok) return null;
    const data = await res.json();
    const results = (data.organic_results || []).slice(0, 10).map((r, i) => ({
      pos: i + 1,
      title: r.title,
      url: r.link,
      domain: new URL(r.link).hostname.replace('www.', ''),
    }));
    return results;
  } catch {
    return null;
  }
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log(`\n🏙️  ASADS City Intel — ${TODAY}`);
  console.log(`📍 Scanning ${cityEntries.length} cities × ${competitorPatterns.length} competitors`);
  if (SERP_API_KEY) console.log(`🔍 SerpAPI enabled — will pull Google rankings per city\n`);
  else console.log(`⚠️  No SERP_API_KEY — competitor page existence only (no Google rankings)\n`);

  const cityResults = [];
  let citiesWithCompetitors = 0;

  for (let i = 0; i < cityEntries.length; i++) {
    const { citySlug, fullSlug, cityName } = cityEntries[i];
    process.stdout.write(`[${String(i + 1).padStart(3)}/${cityEntries.length}] ${cityName}...`);

    const asadsUrl = `${BASE_URL}/locations/${fullSlug}`;
    const competitorFinds = [];

    // Check each competitor's city page
    for (const comp of competitorPatterns) {
      const url = comp.urlFn(citySlug);
      const result = await fetchMeta(url, 6000);
      if (result.exists) {
        competitorFinds.push({
          name: comp.shortName,
          fullName: comp.name,
          url,
          title: result.title,
          h1: result.h1,
          priority: comp.priority,
        });
      }
      await new Promise(r => setTimeout(r, 200)); // polite delay
    }

    // Optional: get Google SERP positions
    let serpResults = null;
    if (SERP_API_KEY) {
      serpResults = await getSerpResults(cityName);
      await new Promise(r => setTimeout(r, 500));
    }

    if (competitorFinds.length > 0) citiesWithCompetitors++;
    cityResults.push({ cityName, citySlug, fullSlug, asadsUrl, competitorFinds, serpResults });

    const competitorCount = competitorFinds.length;
    const serpInfo = serpResults ? ` | SERP: ${serpResults.slice(0, 3).map(r => r.domain).join(', ')}` : '';
    console.log(` ${competitorCount > 0 ? `⚠️  ${competitorCount} competitor(s)` : '✅ clear'}${serpInfo}`);
  }

  // ─── Generate Report ──────────────────────────────────────────────────────

  let report = `# ASADS City Intelligence Report\n`;
  report += `**Date:** ${TODAY}\n`;
  report += `**Cities scanned:** ${cityEntries.length}\n`;
  report += `**Cities with active competitor pages:** ${citiesWithCompetitors}\n`;
  report += `**SERP data:** ${SERP_API_KEY ? 'Yes — Google positions included' : 'No — add SERP_API_KEY to .env.local for Google rankings'}\n\n`;
  report += `---\n\n`;

  // Summary table
  report += `## Summary: Cities with Competitor Pages\n\n`;
  const threatened = cityResults.filter(c => c.competitorFinds.length > 0);
  if (threatened.length === 0) {
    report += `No competitor city pages found — ASADS has clear coverage across all 106 cities.\n\n`;
  } else {
    report += `| City | Competitors Found | Top Threat |\n`;
    report += `|---|---|---|\n`;
    for (const c of threatened) {
      const highPriority = c.competitorFinds.filter(f => f.priority === 'HIGH');
      const topThreat = highPriority[0] || c.competitorFinds[0];
      report += `| ${c.cityName} | ${c.competitorFinds.map(f => f.name).join(', ')} | **${topThreat.fullName}** |\n`;
    }
    report += `\n`;
  }

  // SERP summary (if available)
  if (SERP_API_KEY) {
    report += `## Google First Page — ASADS Ranking Summary\n\n`;
    const ranked = cityResults.filter(c => c.serpResults && c.serpResults.some(r => r.domain.includes('asads')));
    const notRanked = cityResults.filter(c => c.serpResults && !c.serpResults.some(r => r.domain.includes('asads')));
    report += `- **ASADS in top 10:** ${ranked.length} cities\n`;
    report += `- **ASADS not in top 10:** ${notRanked.length} cities (priority targets)\n\n`;

    if (notRanked.length > 0) {
      report += `### Cities Where ASADS is NOT in Google Top 10\n`;
      report += `| City | #1 Result | #2 Result | #3 Result |\n`;
      report += `|---|---|---|---|\n`;
      for (const c of notRanked.slice(0, 30)) {
        const top3 = (c.serpResults || []).slice(0, 3).map(r => `${r.domain} (#${r.pos})`);
        report += `| ${c.cityName} | ${top3[0] || '-'} | ${top3[1] || '-'} | ${top3[2] || '-'} |\n`;
      }
      report += `\n`;
    }
  }

  // Per-city detail (only cities with competitors or where ASADS not ranking)
  report += `## Per-City Detail\n\n`;
  for (const c of cityResults) {
    const hasIssues = c.competitorFinds.length > 0 ||
                      (c.serpResults && !c.serpResults.some(r => r.domain.includes('asads')));
    if (!hasIssues) continue;

    report += `### ${c.cityName}\n`;
    report += `**ASADS page:** ${c.asadsUrl}\n\n`;

    if (c.competitorFinds.length > 0) {
      report += `**Active competitor pages:**\n`;
      for (const f of c.competitorFinds) {
        report += `- **${f.fullName}** [${f.priority}]: ${f.url}\n`;
        if (f.title) report += `  - Title: *${f.title}* (${f.title.length} chars)\n`;
        if (f.h1) report += `  - H1: ${f.h1}\n`;
      }
      report += `\n`;
    }

    if (c.serpResults) {
      report += `**Google first page for "home inspection ${c.cityName} ontario":**\n`;
      for (const r of c.serpResults) {
        const isAsads = r.domain.includes('asads');
        report += `${isAsads ? '✅' : '  '} #${r.pos} — ${r.domain} — ${r.title.slice(0, 60)}\n`;
      }
      report += `\n`;
    }
    report += `---\n\n`;
  }

  // Action items
  report += `## Action Items\n\n`;
  report += `1. For each city with HIGH priority competitors, check if ASADS location page is indexed and if service×city pages are prerendered\n`;
  report += `2. Cities where ASADS is not in Google top 10 → build internal links from blog posts and service pages to those location pages\n`;
  report += `3. Consider expanding blog posts to cover cities with strong competitor presence\n`;
  report += `4. Re-run this report after each major content push to track progress\n`;
  if (!SERP_API_KEY) {
    report += `\n**To add Google ranking data:** Create \`.env.local\` with \`SERP_API_KEY=your_key\` from https://serpapi.com (free: 100 searches/month)\n`;
  }

  const outFile = resolve(__dirname, `city-intel-report-${TODAY}.md`);
  writeFileSync(outFile, report);
  console.log(`\n✅ Report saved: ${outFile}`);
  console.log(`   Cities with competitor pages: ${citiesWithCompetitors}/${cityEntries.length}`);
  if (SERP_API_KEY) {
    const ranked = cityResults.filter(c => c.serpResults && c.serpResults.some(r => r.domain.includes('asads'))).length;
    console.log(`   ASADS in Google top 10: ${ranked}/${cityEntries.length} cities`);
  }
  console.log(``);
}

main().catch(console.error);
