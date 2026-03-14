/**
 * prerender-meta.mjs
 * Injects correct <title>, <meta name="description">, and <link rel="canonical">
 * into a static HTML copy of each page so Bing/non-JS crawlers see them.
 * Run after `vite build`.
 */

import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const DIST = resolve(ROOT, 'dist');
const BASE_URL = 'https://www.asads.ca';

// ─── Read source data ────────────────────────────────────────────────────────

const locationRaw      = readFileSync(resolve(ROOT, 'src/data/locationData.ts'), 'utf8');
const blogRaw          = readFileSync(resolve(ROOT, 'src/data/blogPosts.ts'), 'utf8');
const serviceCityRaw   = readFileSync(resolve(ROOT, 'src/data/serviceCityData.ts'), 'utf8');

function extractField(content, key) {
  // Match double-quoted strings first (handles apostrophes), then single-quoted
  const dq = new RegExp(`${key}:\\s*"([^"]+)"`, 'g');
  const sq = new RegExp(`${key}:\\s*'([^']+)'`, 'g');
  const dqMatches = [...content.matchAll(dq)].map(m => m[1]);
  if (dqMatches.length > 0) return dqMatches;
  return [...content.matchAll(sq)].map(m => m[1]);
}

function extractPairs(content, slugKey, titleKey, descKey) {
  const results = [];
  const slugs  = extractField(content, slugKey);
  const titles = extractField(content, titleKey);
  const descs  = extractField(content, descKey);
  for (let i = 0; i < slugs.length; i++) {
    if (slugs[i] && titles[i] && descs[i]) {
      results.push({ slug: slugs[i], title: titles[i], desc: descs[i] });
    }
  }
  return results;
}

const locations = extractPairs(locationRaw, 'slug', 'metaTitle', 'metaDescription');
const blogs     = extractPairs(blogRaw,     'slug', 'metaTitle', 'metaDescription');

// ─── Service pages ────────────────────────────────────────────────────────────

const servicePages = [
  { path: '/services/pre-purchase',    title: 'Pre-Purchase Home Inspection Ontario | From $399 | ASADS',            desc: 'Licensed home inspector from $399. 400-point checklist, thermal imaging option, same-day digital report. GTA & Ontario. Book online — results same day.' },
  { path: '/services/pre-listing',     title: 'Pre-Listing Home Inspection Ontario | Seller Inspection | ASADS',     desc: 'Pre-listing home inspection for Ontario sellers. Identify issues before buyers do. ASADS certified inspectors, same-day reports. Call (647) 801-9311.' },
  { path: '/services/condo',           title: 'Condo Inspection Toronto | Fan Coil & Status Certificate | ASADS',    desc: 'Certified condo inspection in Toronto & GTA. Fan coil units, parking, balcony membranes, status certificate review. Same-day digital report.' },
  { path: '/services/new-construction',title: 'New Construction Inspection Ontario | Tarion Warranty | ASADS',        desc: 'New home inspection before Tarion warranty deadlines. Detect builder deficiencies in Ontario new builds. Same-day report. Call (647) 801-9311.' },
  { path: '/services/commercial',      title: 'Commercial Building Inspection Ontario | ASADS',                       desc: 'Commercial property inspection across Ontario. Retail, office, industrial & multi-unit assessments by certified inspectors. Call (647) 801-9311.' },
  { path: '/services/thermal-imaging', title: 'Thermal Imaging Inspection Toronto | See What\'s Hidden | ASADS',     desc: 'FLIR infrared inspection finds hidden moisture, missing insulation, electrical hotspots & heat loss without opening walls. Same-day results. GTA & Ontario.' },
  { path: '/services/mold-inspection', title: 'Mold Inspection & Testing Toronto | AIHA Lab Results | ASADS',        desc: 'Certified mold testing in Toronto & GTA from $299. Air sampling, black mold ID, AIHA-accredited lab. Independent — we don\'t do remediation. Fast written results.' },
  { path: '/services/asbestos-testing',title: 'Asbestos Testing Toronto | Accredited Lab | ASADS',                   desc: 'Accredited asbestos testing across Ontario. Bulk sampling, O.Reg 278/05 compliance, lab-certified results. Residential & commercial. Call (647) 801-9311.' },
  { path: '/services/radon-testing',   title: 'Radon Testing Ontario | Health Canada Certified | ASADS',             desc: 'Long-term & short-term radon testing across Ontario. Health Canada guidelines, certified detectors, written report. From $149. Call (647) 801-9311.' },
  { path: '/services/sewer-scope',     title: 'Sewer Scope Inspection Toronto | $299 | CCTV Drain Camera | ASADS',   desc: 'HD sewer camera inspection from $299. Detects root intrusion, bellied pipes & cracks before you buy. GPS mapping, same-day video report.' },
  { path: '/services/well-water-testing',title:'Well Water Testing Ontario | E.coli, Bacteria & Arsenic | ASADS',   desc: 'MOH-certified well water test for E.coli, bacteria, nitrates & arsenic. Private wells, cottages & rural Ontario. Sterile kit, accredited lab results. From $199.' },
  { path: '/services/lead-paint-testing',title:'Lead Paint Testing Ontario | XRF Certified | ASADS',                desc: 'Certified lead paint testing across Ontario. XRF screening, lab analysis, written report. Pre-1980 homes & renovations. Call (647) 801-9311.' },
  { path: '/services/air-quality',     title: 'Air Quality Testing Toronto & GTA | ASADS',                           desc: 'Indoor air quality testing for VOCs, particulates, CO2 & allergens. GTA & Ontario. AIHA-accredited lab. Residential & commercial. From $299.' },
  { path: '/services/wett',            title: 'WETT Inspection Ontario | Wood Burning & Fireplace | ASADS',          desc: 'Certified WETT inspection for fireplaces, wood stoves & inserts in Ontario. Required for home sales & insurance. Same-day report. Call (647) 801-9311.' },
];

// ─── Static pages ─────────────────────────────────────────────────────────────

const staticPages = [
  { path: '/',              title: 'Home Inspection Ontario | Certified Home Inspector | ASADS',         desc: 'ASADS certified home inspectors serving Toronto, GTA & Ontario. Pre-purchase, thermal imaging, mold, asbestos & radon testing. Same-day reports. Call (647) 801-9311.' },
  { path: '/about',         title: 'About ASADS Home Inspection | Certified Ontario Inspectors',         desc: 'ASADS Home Inspection — certified, InterNACHI-trained inspectors serving Toronto & Ontario. Learn about our team, credentials, and commitment to buyers.' },
  { path: '/locations',     title: 'Home Inspection Service Areas | GTA & Ontario | ASADS',              desc: 'ASADS Home Inspection serves 106 cities across the GTA and Ontario. Find your city and book a certified home inspector near you.' },
  { path: '/services',      title: 'Home Inspection Services Ontario | ASADS',                           desc: 'Full range of home inspection services: pre-purchase, thermal imaging, mold, asbestos, radon, sewer scope & more. Serving GTA & Ontario. Call (647) 801-9311.' },
  { path: '/blog',          title: 'Home Inspection Blog | Ontario Homeowner Tips | ASADS',              desc: 'Expert home inspection tips, guides, and advice for Ontario homeowners and buyers. Read the latest from ASADS certified inspectors.' },
  { path: '/pricing',       title: 'Home Inspection Cost Ontario 2026 | Pricing | ASADS',                desc: 'Transparent home inspection pricing in Ontario. Pre-purchase from $399, thermal imaging from $199, mold from $299. No hidden fees. Call (647) 801-9311.' },
  { path: '/booking',       title: 'Book a Home Inspection Ontario | ASADS',                             desc: 'Book your certified home inspection online. Same-day availability across Toronto, GTA & Ontario. ASADS inspectors — call (647) 801-9311.' },
  { path: '/contact',       title: 'Contact ASADS Home Inspection | (647) 801-9311',                     desc: 'Contact ASADS Home Inspection for questions or to book your inspection. Call (647) 801-9311, email info@asads.ca, or use our online form.' },
  { path: '/faq',           title: 'Home Inspection FAQ Ontario | Common Questions | ASADS',             desc: 'Answers to the most common home inspection questions from Ontario buyers and sellers. What\'s included, how long it takes, and what to do with the report.' },
  { path: '/testimonials',  title: 'Home Inspection Reviews | ASADS Client Testimonials',                desc: 'Read reviews from ASADS home inspection clients across Toronto, GTA & Ontario. Verified testimonials from buyers and sellers we\'ve helped.' },
  { path: '/privacy-policy',title: 'Privacy Policy | ASADS Home Inspection',                            desc: 'ASADS Home Inspection privacy policy. Learn how we collect, use, and protect your personal information.' },
  { path: '/terms',         title: 'Terms of Service | ASADS Home Inspection',                          desc: 'ASADS Home Inspection terms of service and conditions for booking and using our inspection services.' },
  { path: '/sitemap',       title: 'Site Map | ASADS Home Inspection',                                  desc: 'Full site map for ASADS Home Inspection. Find all pages including service areas, inspection services, blog, and contact information.' },
];

// ─── Build page map ───────────────────────────────────────────────────────────

const pages = [];

staticPages.forEach(p => pages.push({ path: p.path, title: p.title, desc: p.desc }));
servicePages.forEach(p => pages.push({ path: p.path, title: p.title, desc: p.desc }));
locations.forEach(loc => pages.push({
  path: `/locations/${loc.slug}`,
  title: loc.title,
  desc: loc.desc,
}));
blogs.forEach(b => pages.push({
  path: `/blog/${b.slug}`,
  title: b.title,
  desc: b.desc,
}));

// ─── Service × City cross-pages ───────────────────────────────────────────────

// Extract service definitions from serviceCityData.ts
function extractServiceDefs(content) {
  const results = [];
  // Match each service block by slug, metaTitleTemplate, metaDescTemplate
  const slugMatches   = [...content.matchAll(/slug:\s*"([^"]+)"/g)].map(m => m[1]);
  const titleMatches  = [...content.matchAll(/metaTitleTemplate:\s*"([^"]+)"/g)].map(m => m[1]);
  const descMatches   = [...content.matchAll(/metaDescTemplate:\s*"([^"]+)"/g)].map(m => m[1]);
  for (let i = 0; i < slugMatches.length && i < titleMatches.length && i < descMatches.length; i++) {
    results.push({
      slug:  slugMatches[i],
      title: titleMatches[i],
      desc:  descMatches[i],
    });
  }
  return results;
}

const serviceDefs = extractServiceDefs(serviceCityRaw);

// Extract location slugs and city names from locationData.ts
function extractLocationSlugs(content) {
  const results = [];
  const slugs  = [...content.matchAll(/slug:\s*"(home-inspection-[^"]+)"/g)].map(m => m[1]);
  const cities = [...content.matchAll(/city:\s*"([^"]+)"/g)].map(m => m[1]);
  for (let i = 0; i < slugs.length; i++) {
    results.push({ slug: slugs[i], city: cities[i] || slugs[i] });
  }
  return results;
}

const locationSlugs = extractLocationSlugs(locationRaw);

serviceDefs.forEach(svc => {
  locationSlugs.forEach(loc => {
    const city = loc.city;
    const title = svc.title.replace(/\{city\}/g, city);
    const desc  = svc.desc.replace(/\{city\}/g, city);
    pages.push({
      path: `/services/${svc.slug}/${loc.slug}`,
      title,
      desc,
    });
  });
});

// ─── Blog × City cross-pages ──────────────────────────────────────────────────

blogs.forEach(b => {
  locationSlugs.forEach(loc => {
    const city = loc.city;
    // Title: append city to blog meta title (truncate to ~70 chars)
    const rawTitle = `${b.title} | ${city}, Ontario`;
    const title = rawTitle.length > 70 ? rawTitle.slice(0, 67) + '...' : rawTitle;
    // Desc: append city context (truncate to 160)
    const rawDesc = `${b.desc} Serving ${city} homeowners & buyers.`;
    const desc = rawDesc.length > 160 ? rawDesc.slice(0, 157) + '...' : rawDesc;
    pages.push({
      path: `/blog/${b.slug}/${loc.slug}`,
      title,
      desc,
    });
  });
});

// ─── Read base HTML ───────────────────────────────────────────────────────────

const baseHtml = readFileSync(resolve(DIST, 'index.html'), 'utf8');

// Inject a default meta description into the base index.html if missing
if (!baseHtml.includes('<meta name="description"')) {
  const withDesc = baseHtml.replace(
    '<meta name="robots"',
    '<meta name="description" content="ASADS certified home inspectors serving Toronto, GTA &amp; Ontario. Pre-purchase, thermal imaging, mold, asbestos &amp; radon testing. Same-day reports." />\n    <meta name="robots"'
  );
  writeFileSync(resolve(DIST, 'index.html'), withDesc, 'utf8');
  console.log('✓ Injected default meta description into index.html');
}

// ─── Generate per-page HTML files ─────────────────────────────────────────────

let count = 0;

for (const page of pages) {
  const canonical = `${BASE_URL}${page.path}`;
  const safeTitle = page.title.replace(/&/g, '&amp;').replace(/"/g, '&quot;');
  const safeDesc  = page.desc.replace(/&/g, '&amp;').replace(/"/g, '&quot;');

  let html = baseHtml;

  // Replace/inject <title>
  if (html.includes('<title>')) {
    html = html.replace(/<title>[^<]*<\/title>/, `<title>${safeTitle}</title>`);
  }

  // Replace/inject canonical
  html = html.replace(
    /<link rel="canonical"[^>]*>/,
    `<link rel="canonical" href="${canonical}" />`
  );

  // Inject meta description (remove any existing one first, then add)
  html = html.replace(/<meta name="description"[^>]*\/?>/, '');
  html = html.replace(
    '<meta name="robots"',
    `<meta name="description" content="${safeDesc}" />\n    <meta name="robots"`
  );

  // Write file
  const dir = resolve(DIST, ...page.path.split('/').filter(Boolean));
  mkdirSync(dir, { recursive: true });
  writeFileSync(resolve(dir, 'index.html'), html, 'utf8');
  count++;
}

console.log(`✓ Prerendered: ${count} pages → dist/`);
