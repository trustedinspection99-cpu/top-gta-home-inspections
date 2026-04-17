/**
 * protasker-master-intel.mjs
 * Compiles ALL Protasker research into one master intelligence file
 * Output: C:/Users/Owner/Documents/Protasker-Master-Intel.md
 */
import { readFileSync, writeFileSync } from 'fs';

const OUT = 'C:/Users/Owner/Documents/Protasker-Master-Intel.md';
const date = new Date().toISOString().split('T')[0];

function read(path) {
  try { return readFileSync(path, 'utf8'); } catch { return ''; }
}

function section(title, content) {
  if (!content?.trim()) return '';
  return `\n\n---\n\n# ${title}\n\n${content.trim()}\n`;
}

// ── Read all source files
const organic    = read('C:/Users/Owner/Documents/Protasker-Competitor-Organic.md');
const gaps       = read('C:/Users/Owner/Documents/Protasker-Competitor-Gaps.md');
const aiQuestions= read('C:/Users/Owner/Documents/Protasker-AI-Final.md');
const aiIntel    = read('C:/Users/Owner/Documents/Protasker-AI-Intelligence.md');
const seoResearch= read('C:/Users/Owner/Documents/Protasker-SEO-Research.md');
const compIntel  = read('C:/Users/Owner/Documents/Protasker-Competitor-Intelligence.md');
const kwOverview = read('C:/Users/Owner/Documents/Protasker-KW-Overview.md');
const priorityKW = read('C:/Users/Owner/Documents/Protasker-Priority-KW.md');
const extended   = read('C:/Users/Owner/Documents/Protasker-SEMrush-Extended.md');
const serviceKW  = read('C:/Users/Owner/Documents/Protasker-Service-Keywords.md');

// ── Extract key snippets from each file (avoid raw dump of giant tables)

// Domain overview table from organic
function extractDomainOverview(md) {
  const start = md.indexOf('## Domain Overview');
  const end   = md.indexOf('\n---', start);
  return start > -1 ? md.slice(start, end > -1 ? end : start + 600) : '';
}

// Protasker's own rankings
function extractProtaskerRankings(md) {
  const start = md.indexOf("## Protasker (`protasker.ca`)");
  const end   = md.indexOf('\n## HomeStars', start);
  return start > -1 ? md.slice(start, end > -1 ? end : start + 1500) : '';
}

// Gap summary + easy wins (first 60 rows)
function extractGapSummary(md) {
  const summaryStart = md.indexOf('## Summary');
  const highVolEnd   = md.indexOf('\n## Competitor Page 1');
  const chunk = summaryStart > -1
    ? md.slice(summaryStart, highVolEnd > -1 ? highVolEnd : summaryStart + 4000)
    : '';
  // Also grab service category table
  const catStart = md.indexOf('## Gaps By Service Category');
  const catEnd   = md.indexOf('\n### ', catStart);
  const catTable = catStart > -1 ? md.slice(catStart, catEnd > -1 ? catEnd : catStart + 1500) : '';
  return chunk + '\n\n' + catTable;
}

// AI questions summary + high volume + easy wins
function extractAIQuestions(md) {
  const summaryStart = md.indexOf('## Summary');
  const perServiceStart = md.indexOf('## By Service');
  // Everything up to per-service breakdown (which is huge)
  return summaryStart > -1
    ? md.slice(summaryStart, perServiceStart > -1 ? perServiceStart : summaryStart + 8000)
    : '';
}

// AI intelligence — full file (it's concise)
function extractAIIntel(md) {
  // Remove raw content blocks to keep it clean
  return md.replace(/```[\s\S]*?```/g, '*[raw data omitted]*').trim();
}

// SEO research — summary sections
function extractSEOResearch(md) {
  return md.trim();
}

// KW overview — just the table
function extractKWOverview(md) {
  return md.trim();
}

// Priority KW — full
function extractPriorityKW(md) {
  return md.trim();
}

// ── Build master file
let master = `# Protasker.ca — Master Intelligence File
*Compiled: ${date} | All SEMrush + GSC + Competitor Research*

> This file consolidates all Protasker SEO, competitor, keyword gap, and AI visibility research.
> Use this as the single source of truth for all content and SEO decisions.

## Table of Contents

1. [Business Overview](#1-business-overview)
2. [Domain & Competitor Overview](#2-domain--competitor-overview)
3. [Protasker Current Rankings](#3-protasker-current-rankings)
4. [Keyword Gap Analysis](#4-keyword-gap-analysis)
5. [AI Question Keywords](#5-ai-question-keywords)
6. [AI Visibility & Strategy](#6-ai-visibility--strategy)
7. [Competitor Intelligence](#7-competitor-intelligence)
8. [Priority Keywords](#8-priority-keywords)
9. [Keyword Overview (Top Services)](#9-keyword-overview-top-services)
10. [SEO Research Notes](#10-seo-research-notes)
11. [Extended SEMrush Research](#11-extended-semrush-research)
12. [Service Keywords Detail](#12-service-keywords-detail)
13. [GSC Performance (Live Apr 2026)](#13-gsc-performance-live-apr-2026)
14. [Action Plan (Priority Order)](#14-action-plan-priority-order)

---

# 1. Business Overview

| Item | Detail |
|------|--------|
| Site | protasker.ca |
| Type | Home services marketplace (Ontario — 109 cities) |
| Services | 36 service categories |
| Stack | React + Vite + TypeScript |
| Forms | /api/notify → Resend → haroon4951@hotmail.com |
| Sitemap | 18,987 URLs |
| Prerendered pages | 20,684 |
| Blog×city | ARE indexed (unlike ASADS — do NOT noindex) |
| Homepage links | Static HTML <a href="/"> injected in prerender for all pages |

### Key SEO Numbers (April 14, 2026)
| Metric | Value |
|--------|-------|
| Organic Keywords | 597 (up from 558 Apr 12) |
| Est. Monthly Traffic | ~33 clicks (SEMrush) / ~25/day (GSC) |
| Authority Score | 0 |
| Backlinks | **0** — critical gap |
| SEMrush Rank | 11.2M |
| AI Visibility Score | 14/100 |
| AI Mentions | 1 (Google AI Mode) |
| AI Cited Pages | 12 (Gemini citing 8 pages) |
| GSC Avg Position | ~17–18 |
| GSC Clicks/Day | ~25/day avg |

### Key CPC Data (Ontario market — accurate Apr 2026)
| Service | CPC | Note |
|---------|-----|------|
| Junk Removal Toronto | $26.36 | Much higher than generic "junk removal" |
| Plumber Toronto | $10.51 | High commercial value |
| Toronto Trash Removal | $13.09 | Underserved term |
| EV Charger Installation | ~$8–12 | Growing fast |

### Competitive Positioning Insights
- **Bark page pattern:** \`/en/ca/{service}/\` — NO city-specific pages = Protasker city pages beat Bark every time
- **HomeStars doesn't rank for:** handyman, eavestrough cleaning, window cleaning, junk removal, duct cleaning — all Protasker targets
- **Easiest KD wins:** eavestrough (KD 12–13), junk removal (KD 10–18), duct cleaning (KD 9–20), window cleaning (KD 15), handyman (KD 14)
- **Duct cleaning cluster:** 22,300 total vol — Reddit at #4 for mississauga term = very beatable
- **Eavestrough cluster:** 10,390 total vol, KD 12–13 — easiest possible category win

`;

// 2. Domain overview
master += section('2. Domain & Competitor Overview', extractDomainOverview(organic));

// 3. Protasker rankings
master += section('3. Protasker Current Rankings', extractProtaskerRankings(organic));

// 4. Gap analysis
master += section('4. Keyword Gap Analysis', extractGapSummary(gaps));

// 5. AI questions
master += section('5. AI Question Keywords (All 36 Services)', extractAIQuestions(aiQuestions));

// 6. AI visibility
master += section('6. AI Visibility & Strategy', extractAIIntel(aiIntel));

// 7. Competitor intel
master += section('7. Competitor Intelligence', extractSEOResearch(compIntel));

// 8. Priority keywords
master += section('8. Priority Keywords', extractPriorityKW(priorityKW));

// 9. KW overview
master += section('9. Keyword Overview (Top Services)', extractKWOverview(kwOverview));

// 10. SEO research notes
master += section('10. SEO Research Notes', extractSEOResearch(seoResearch));

// 11. Extended SEMrush research
master += section('11. Extended SEMrush Research', extended.trim());

// 12. Service keywords detail
master += section('12. Service Keywords Detail', serviceKW.trim());

// 13. GSC Live Performance (Apr 2026)
master += `\n\n---\n\n# 13. GSC Performance (Live Apr 2026)\n\n`;

master += `## Top Pages by Clicks (Mar 15 – Apr 13, 2026)\n\n`;
master += `| Page | Clicks | Impressions | CTR | Pos |\n|------|--------|-------------|-----|-----|\n`;
master += `| / (homepage) | 19 | 62 | 30.6% | 5.2 |\n`;
master += `| /blog/ev-charger-rebates-ontario-2026/acton | 12 | 355 | 3.4% | 5.1 |\n`;
master += `| /blog/ev-charger-rebates-ontario-2026/mississauga | 9 | 182 | 4.9% | 5.8 |\n`;
master += `| /blog/ev-charger-rebates-ontario-2026/toronto | 9 | 283 | 3.2% | 5.2 |\n`;
master += `| /blog/lawn-care-toronto-seasonal-guide/toronto | 8 | 268 | 3.0% | 3.9 |\n`;
master += `| /blog/ev-charger-rebates-ontario-2026/kitchener | 6 | 75 | 8.0% | 9.0 |\n`;
master += `| /blog/ev-charger-rebates-ontario-2026/hamilton | 5 | 58 | 8.6% | 7.7 |\n`;
master += `| /blog/pest-control-cost-ontario-2026 | 4 | 757 | 0.5% | 11.7 |\n`;
master += `| /blog/lawn-care-cost-ontario-2026/toronto | 4 | 572 | 0.7% | 8.9 |\n`;
master += `| /blog/dishwasher-installation-cost-ontario-2026 | 3 | 858 | 0.35% | 20.7 |\n\n`;

master += `## High-Impression Zero/Low-CTR Pages (Fix These)\n\n`;
master += `| Page | Impressions | Pos | CTR | Action |\n|------|-------------|-----|-----|--------|\n`;
master += `| dishwasher-installation-cost-ontario-2026 | 858 | 20.7 | 0.35% | Move to pos <15, add price table, optimize title |\n`;
master += `| pest-control-cost-ontario-2026 | 757 | 11.7 | 0.53% | Add FAQ schema, city-specific prices |\n`;
master += `| lawn-care-cost-ontario-2026/toronto | 572 | 8.9 | 0.70% | Title tweak, add seasonal pricing table |\n`;
master += `| hardwood-floor-refinishing/toronto | 359 | 6.9 | 0.84% | Rich snippet + price table |\n`;
master += `| ev-charger-rebates/acton | 355 | 5.1 | 3.4% | Already converting — replicate to all cities |\n`;
master += `| furnace-maintenance-cost (query) | 182 | 39.8 | 0.55% | Build dedicated cost guide page |\n`;
master += `| furnace-tune-up-cost (query) | 110 | 34.1 | 0.91% | Same page as furnace maintenance |\n\n`;

master += `## #1 GSC Quick Win: Smart Home Automation / Kitchener\n\n`;
master += `> **Zero clicks on 1,000+ monthly impressions** — page exists but title/content not converting\n\n`;
master += `| Query | Impressions | Pos | Clicks |\n|-------|-------------|-----|--------|\n`;
master += `| smart home automation system kitchener | 289 | 9.7 | 0 |\n`;
master += `| smart home automation kitchener | 246 | 13.4 | 0 |\n`;
master += `| smart home automation services kitchener | 246 | 14.8 | 0 |\n`;
master += `| smart home automation solutions kitchener | 162 | 13.7 | 0 |\n`;
master += `| smart home automation hamilton | 28 | 6.8 | 0 |\n`;
master += `| smart home automation services hamilton | 27 | 24.3 | 0 |\n`;
master += `| smart home automation innisfil | 15 | 5.8 | 0 |\n`;
master += `| smart home automation springwater | 13 | 6.3 | 0 |\n\n`;
master += `**Fix:** Improve the Kitchener home automation service×city page — better title (include "Smart Home"), add FAQ schema, add pricing section. Potentially highest single-page ROI fix.\n\n`;

master += `## Top Queries by Clicks\n\n`;
master += `| Query | Clicks | Impressions | Pos |\n|-------|--------|-------------|-----|\n`;
master += `| dishwasher installation cost | 2 | 198 | 16.3 |\n`;
master += `| lawn mowing services toronto prices | 2 | 17 | 10.5 |\n`;
master += `| deep cleaning | 1 | 107 | 12.1 |\n`;
master += `| furnace maintenance cost | 1 | 182 | 39.8 |\n`;
master += `| furnace tune up cost | 1 | 110 | 34.1 |\n`;
master += `| fence installation cost | 1 | 41 | 72.4 |\n`;
master += `| plumbing service call cost | 1 | 39 | 28.4 |\n`;
master += `| hydro one ev charger rebate | 1 | 37 | 6.4 |\n`;
master += `| house cleaning services waterloo prices | 1 | 26 | 22.9 |\n`;
master += `| electrical panel upgrade cost ontario | 1 | 25 | 19.6 |\n\n`;

// ── Action Plan (synthesized)
master += `\n\n---\n\n# 14. Action Plan (Priority Order)\n\n`;
master += `## P0 — GSC Immediate Fixes (No new content needed)\n`;
master += `*Fix existing pages that are almost ranking — fastest path to clicks*\n\n`;
master += `| Priority | Page/Query | Impressions | Pos | Issue | Fix |\n|----------|------------|-------------|-----|-------|-----|\n`;
master += `| 🔴 P0-1 | smart home automation / kitchener | 1,000+ | 9–14 | 0 clicks | Improve service×city page: title, FAQ schema, pricing section |\n`;
master += `| 🔴 P0-2 | dishwasher-installation-cost | 858 | 20.7 | 0.35% CTR | Push to pos <15 — add price table, optimize title tag |\n`;
master += `| 🔴 P0-3 | pest-control-cost | 757 | 11.7 | 0.53% CTR | Add FAQ schema + city-specific pricing |\n`;
master += `| 🔴 P0-4 | lawn-care-cost/toronto | 572 | 8.9 | 0.70% CTR | Title tweak + add seasonal pricing table |\n`;
master += `| 🟡 P0-5 | furnace-maintenance-cost | 182 | 39.8 | 0.55% CTR | Build dedicated cost guide page |\n`;
master += `| 🟡 P0-6 | hardwood-floor-refinishing/toronto | 359 | 6.9 | 0.84% CTR | Add rich snippet + price table |\n\n`;

master += `## P1 — Backlinks (Zero Right Now — Critical)\n\n`;
master += `| Source | Type | Priority |\n|--------|------|----------|\n`;
master += `| Google Business Profile | Free | 🔴 P1 — do today |\n`;
master += `| Yelp.ca | Free | 🔴 P1 |\n`;
master += `| YellowPages.ca | Free | 🔴 P1 |\n`;
master += `| Houzz.ca | Free | 🟡 P2 |\n`;
master += `| BBB Ontario | Trust | 🟡 P2 |\n`;
master += `| LinkedIn Company Page | Social | 🟡 P2 |\n`;
master += `| BlogTO / Daily Hive pitch | Editorial | 🟢 P3 |\n\n`;

master += `## P2 — AI Visibility (Cost Guide Blog Posts)\n`;
master += `*Create these blog posts — they feed ChatGPT/Gemini/Perplexity citations*\n\n`;
master += `| Priority | Content | Target Question | Vol |\n|----------|---------|----------------|-----|\n`;
master += `| 1 | Moving Cost Guide Ontario 2026 | how much does it cost for a moving company | 720 |\n`;
master += `| 2 | Bathroom Renovation Cost Ontario | how much to renovate a bathroom | 480 |\n`;
master += `| 3 | Basement Finishing Cost Ontario | how much does it cost to finish a basement | 480 |\n`;
master += `| 4 | Is Duct Cleaning Worth It? | is duct cleaning necessary | 480 |\n`;
master += `| 5 | Kitchen Renovation Cost Ontario | how much does it cost to renovate a kitchen | 390 |\n`;
master += `| 6 | How Much Does Pest Control Cost | how much does pest control cost | 260 |\n`;
master += `| 7 | Electrical Panel Upgrade Cost Ontario | how much does it cost to upgrade electrical panel | 90 |\n`;
master += `| 8 | EV Charger Installation Cost Canada | how much to install ev charger at home canada | 90 |\n\n`;

master += `## P3 — Keyword Gap Pages (New Service×City Content)\n`;
master += `*Targeting gaps HomeStars owns — Protasker has zero presence here*\n\n`;
master += `| Keyword | Vol | KD | Competitor | Action |\n|---------|-----|----|------------|--------|\n`;
master += `| drain cleaning near me | 4,400 | 7 | HomeStars | New service×city pages |\n`;
master += `| emergency plumber near me | 4,400 | 18 | HomeStars | New service×city pages |\n`;
master += `| hvac contractor | 4,400 | 15 | HomeStars | New HVAC service page |\n`;
master += `| renovation companies near me | 1,900 | 14 | HomeStars | New renovation pages |\n`;
master += `| bathroom remodelling aurora | 1,600 | 7 | HomeStars | New service×city page |\n`;
master += `| home renov | 2,400 | 13 | HomeStars | Renovation landing page |\n`;
master += `| plumber north york | 1,300 | 11 | HomeStars | New service×city page |\n`;
master += `| plumber charges | 1,000 | 5 | HomeStars | Pricing/cost guide |\n`;
master += `| eavestrough cleaning [any city] | 10,390 cluster | 12–13 | None | Lowest KD category — own it |\n`;
master += `| junk removal toronto | 1,300 | 10 | None | $26.36 CPC — high value |\n\n`;

master += `## EV Charger Rebates — Replicate Winning Formula\n`;
master += `*This blog×city is Protasker's #1 traffic driver — expand to all cities aggressively*\n\n`;
master += `| City | Clicks | Impressions | CTR | Pos |\n|------|--------|-------------|-----|-----|\n`;
master += `| Acton | 12 | 355 | 3.4% | 5.1 |\n`;
master += `| Toronto | 9 | 283 | 3.2% | 5.2 |\n`;
master += `| Mississauga | 9 | 182 | 4.9% | 5.8 |\n`;
master += `| Kitchener | 6 | 75 | 8.0% | 9.0 |\n`;
master += `| Hamilton | 5 | 58 | 8.6% | 7.7 |\n`;
master += `| Cannington | 4 | 71 | 5.6% | 10.7 |\n`;
master += `| Vaughan | 4 | 28 | 14.3% | 5.6 |\n`;
master += `| Midland | 4 | 33 | 12.1% | 7.8 |\n`;

writeFileSync(OUT, master, 'utf8');

const lines = master.split('\n').length;
console.log(`Master intel file saved → ${OUT}`);
console.log(`Lines: ${lines} | Size: ${(master.length/1024).toFixed(1)}KB`);
console.log(`\nSections compiled:`);
console.log(`  ✓ 1.  Business overview + key metrics + CPC data + competitive insights`);
console.log(`  ✓ 2.  Domain & competitor overview (SEMrush)`);
console.log(`  ✓ 3.  Protasker current rankings`);
console.log(`  ✓ 4.  Keyword gap analysis (1,958 gaps, 1,013 easy wins)`);
console.log(`  ✓ 5.  AI question keywords (1,174 booking-intent questions, 36 services)`);
console.log(`  ✓ 6.  AI visibility & strategy`);
console.log(`  ✓ 7.  Competitor intelligence`);
console.log(`  ✓ 8.  Priority keywords`);
console.log(`  ✓ 9.  Keyword overview`);
console.log(`  ✓ 10. SEO research notes`);
console.log(`  ✓ 11. Extended SEMrush research`);
console.log(`  ✓ 12. Service keywords detail`);
console.log(`  ✓ 13. GSC live performance (Apr 2026) + home automation quick win`);
console.log(`  ✓ 14. Prioritized action plan (P0 fixes → P1 backlinks → P2 AI content → P3 gaps)`);
