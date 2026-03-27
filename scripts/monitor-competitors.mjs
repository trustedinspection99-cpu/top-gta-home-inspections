/**
 * monitor-competitors.mjs
 * Fetches metadata from competitor home inspection sites and compares to ASADS.
 * Run: node scripts/monitor-competitors.mjs
 * Output: scripts/competitor-report-[date].md
 *
 * Schedule: Run monthly to detect competitor changes.
 */

import { writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const TODAY = new Date().toISOString().split('T')[0];

// ─── Competitor config ─────────────────────────────────────────────────────────

const competitors = [
  {
    name: 'Mike Holmes Inspections',
    baseUrl: 'https://mikeholmesinspections.com',
    pages: [
      { label: 'Home', path: '/' },
      { label: 'Mold Inspection', path: '/mold-inspection/' },
      { label: 'Pre-Listing', path: '/pre-listing-home-inspection/' },
    ],
    notes: 'Elementor JS site — body content may be empty (rendered client-side)',
    priority: 'HIGH',
  },
  {
    name: 'EH Inspections',
    baseUrl: 'https://ehinspections.ca',
    pages: [
      { label: 'Home', path: '/' },
      { label: 'Toronto', path: '/home-inspection-toronto/' },
      { label: 'Mississauga', path: '/home-inspection-mississauga/' },
    ],
    notes: 'City pages at /home-inspection-[city]/',
    priority: 'MEDIUM',
  },
  {
    name: 'Peak Home Inspections',
    baseUrl: 'https://peakhomeinspections.ca',
    pages: [
      { label: 'Home', path: '/' },
      { label: 'Services', path: '/services/' },
    ],
    notes: '',
    priority: 'MEDIUM',
  },
  {
    name: 'Rankin Inspection',
    baseUrl: 'https://rankininspection.ca',
    pages: [
      { label: 'Home', path: '/' },
    ],
    notes: '',
    priority: 'MEDIUM',
  },
  {
    name: 'Scan Home Inspection',
    baseUrl: 'https://scanhomeinspection.ca',
    pages: [
      { label: 'Home', path: '/' },
    ],
    notes: 'Wix site — JS-rendered, meta only',
    priority: 'LOW',
  },
  {
    name: 'CVHI (Canadian Verified)',
    baseUrl: 'https://cvhi.ca',
    pages: [
      { label: 'Home', path: '/' },
      { label: 'Toronto', path: '/locations/home-inspection-companies-toronto/' },
    ],
    notes: 'Uses /locations/home-inspection-companies-[city]/ URL pattern',
    priority: 'MEDIUM',
  },
  {
    name: 'Inch by Inch Inspections',
    baseUrl: 'https://inchinch.ca',
    pages: [
      { label: 'Home', path: '/' },
      { label: 'Pre-Purchase', path: '/home-inspection/' },
      { label: 'Mold', path: '/mold-inspection/' },
    ],
    notes: 'Holds #2 for pre-purchase ontario — study this one carefully',
    priority: 'HIGH',
  },
];

// ─── Our key pages to compare ──────────────────────────────────────────────────

const ourPages = [
  { label: 'Home', url: 'https://www.asads.ca/', title: 'Home Inspection Ontario | Certified Home Inspector | ASADS' },
  { label: 'Pre-Purchase', url: 'https://www.asads.ca/services/pre-purchase', title: 'Pre-Purchase Home Inspection Ontario | From $399 | ASADS' },
  { label: 'Mold Inspection', url: 'https://www.asads.ca/services/mold-inspection', title: 'Mold Inspection & Testing Ontario | From $299 | ASADS' },
  { label: 'Sewer Scope', url: 'https://www.asads.ca/services/sewer-scope', title: 'Sewer Scope Inspection Ontario | From $299 | ASADS' },
  { label: 'Same-Day', url: 'https://www.asads.ca/services/same-day-home-inspection', title: 'Same-Day Home Inspection Ontario | Book Today' },
  { label: 'Pricing', url: 'https://www.asads.ca/pricing', title: 'Home Inspection Cost Ontario 2026 | Pricing | ASADS' },
];

// ─── Fetch helper ──────────────────────────────────────────────────────────────

async function fetchMeta(url) {
  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; ASADS-Monitor/1.0)',
        'Accept': 'text/html',
      },
      signal: AbortSignal.timeout(10000),
    });

    if (!res.ok) return { error: `HTTP ${res.status}`, title: null, description: null };

    const html = await res.text();

    const titleMatch = html.match(/<title[^>]*>([^<]*)<\/title>/i);
    const descMatch = html.match(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']*)/i)
                  || html.match(/<meta[^>]+content=["']([^"']*)[^>]+name=["']description["']/i);

    const h1Match = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
    const h1Text = h1Match ? h1Match[1].replace(/<[^>]+>/g, '').trim().slice(0, 120) : null;

    return {
      error: null,
      title: titleMatch ? titleMatch[1].trim() : null,
      description: descMatch ? descMatch[1].trim() : null,
      h1: h1Text,
      titleLength: titleMatch ? titleMatch[1].trim().length : null,
      descLength: descMatch ? descMatch[1].trim().length : null,
    };
  } catch (err) {
    return { error: err.message, title: null, description: null };
  }
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log(`\n🔍 ASADS Competitor Monitor — ${TODAY}\n`);

  const results = [];

  for (const competitor of competitors) {
    console.log(`Checking: ${competitor.name} [${competitor.priority}]`);
    const pageResults = [];

    for (const page of competitor.pages) {
      const url = `${competitor.baseUrl}${page.path}`;
      process.stdout.write(`  → ${page.label} (${url})... `);
      const meta = await fetchMeta(url);
      console.log(meta.error ? `ERROR: ${meta.error}` : `✓`);

      pageResults.push({
        label: page.label,
        url,
        ...meta,
      });

      // Small delay to be polite
      await new Promise(r => setTimeout(r, 800));
    }

    results.push({ competitor, pageResults });
  }

  // ─── Generate Markdown Report ────────────────────────────────────────────────

  let report = `# ASADS Competitor Monitor Report\n`;
  report += `**Date:** ${TODAY}\n`;
  report += `**Run:** \`node scripts/monitor-competitors.mjs\`\n\n`;
  report += `---\n\n`;

  report += `## Our Key Pages (Reference)\n\n`;
  report += `| Page | URL | Meta Title | Chars |\n`;
  report += `|---|---|---|---|\n`;
  for (const p of ourPages) {
    report += `| ${p.label} | ${p.url} | ${p.title} | ${p.title.length} |\n`;
  }
  report += `\n---\n\n`;

  for (const { competitor, pageResults } of results) {
    report += `## ${competitor.name} [Priority: ${competitor.priority}]\n`;
    report += `**Base URL:** ${competitor.baseUrl}\n`;
    if (competitor.notes) report += `**Notes:** ${competitor.notes}\n`;
    report += `\n`;

    for (const page of pageResults) {
      report += `### ${page.label} — ${page.url}\n`;
      if (page.error) {
        report += `- **ERROR:** ${page.error}\n\n`;
        continue;
      }
      report += `- **Title:** ${page.title || '(none)'} *(${page.titleLength} chars)*\n`;
      report += `- **Description:** ${page.description || '(none)'} *(${page.descLength} chars)*\n`;
      if (page.h1) report += `- **H1:** ${page.h1}\n`;
      report += `\n`;
    }
    report += `---\n\n`;
  }

  // ─── Action Items ─────────────────────────────────────────────────────────────

  report += `## Action Items from This Run\n\n`;
  report += `Review the data above and look for:\n`;
  report += `1. Any competitor adding new service pages (check if ASADS has equivalent)\n`;
  report += `2. Title length violations (>60 chars = SEO weakness for them)\n`;
  report += `3. Missing H1 on competitor pages\n`;
  report += `4. New city pages they've added to their URL structure\n`;
  report += `5. Any new services or pricing they've advertised\n\n`;
  report += `Update \`memory/competitor-intel.md\` after reviewing.\n`;

  // ─── Write report ─────────────────────────────────────────────────────────────

  const outFile = resolve(__dirname, `competitor-report-${TODAY}.md`);
  writeFileSync(outFile, report);
  console.log(`\n✅ Report saved: ${outFile}\n`);
}

main().catch(console.error);
