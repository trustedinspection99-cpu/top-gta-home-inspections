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
  { path: '/services/pre-listing',     title: 'Pre-Listing Home Inspection Ontario | Seller Inspection',             desc: 'Pre-listing home inspection for Ontario sellers. Identify issues before buyers do. ASADS certified inspectors, same-day reports. Call (647) 801-9311.' },
  { path: '/services/condo',           title: 'Condo Inspection Ontario | Infrared Same-Day | ASADS',               desc: 'Certified condo inspection in Toronto & GTA. Fan coil units, parking, balcony membranes, status certificate review. Same-day digital report.' },
  { path: '/services/new-construction',title: 'New Construction/PDI Inspection Ontario | Tarion Warranty',           desc: 'New home inspection before Tarion warranty deadlines. Detect builder deficiencies in Ontario new builds. Same-day report. Call (647) 801-9311.' },
  { path: '/services/pdi-inspection',  title: 'PDI Inspection Ontario | Pre-Delivery Inspection | ASADS',            desc: 'Independent PDI inspection Ontario. Catch builder deficiencies before your Tarion closing. Certified inspector, same-day report. Toronto, GTA & Ontario. From $349.' },
  { path: '/services/commercial',      title: 'Commercial Building Inspection Ontario | ASADS',                       desc: 'Commercial property inspection across Ontario. Retail, office, industrial & multi-unit assessments by certified inspectors. Call (647) 801-9311.' },
  { path: '/services/thermal-imaging', title: 'Infrared Inspection Ontario | See What\'s Hidden | ASADS',           desc: 'FLIR infrared inspection finds hidden moisture, missing insulation, electrical hotspots & heat loss without opening walls. Same-day results. GTA & Ontario.' },
  { path: '/services/mold-inspection', title: 'Mold Inspection & Testing Ontario | From $299 | ASADS',              desc: 'Certified mold inspection Ontario from $299. Air sampling, black mold ID, AIHA lab results. Independent inspector — not remediation. Call (647) 801-9311.' },
  { path: '/services/asbestos-testing',title: 'Asbestos Testing Ontario | Certified Inspector | From $299',           desc: 'Certified asbestos testing Ontario from $299. O.Reg 278/05 compliant, bulk sampling & accredited lab. Pre-renovation & demolition. Call (647) 801-9311.' },
  { path: '/services/radon-testing',   title: 'Radon Testing Ontario | C-NRPP Certified | ASADS',                  desc: 'C-NRPP certified radon testing Ontario. Health Canada monitoring. Protect your family from Canada\'s #1 cause of lung cancer in non-smokers. From $199.' },
  { path: '/services/well-water-testing',title:'Well Water Testing Ontario | E.coli, Bacteria & Arsenic',           desc: 'MOH-certified well water test for E.coli, bacteria, nitrates & arsenic. Private wells, cottages & rural Ontario. Sterile kit, accredited lab results. From $199.' },
  { path: '/services/lead-paint-testing',title:'Lead Paint Testing Ontario | XRF Testing | From $349',              desc: 'Certified lead paint testing across Ontario. XRF non-destructive screening, lab analysis, Ontario Reg 278/05 compliant report. Call (647) 801-9311.' },
  { path: '/services/air-quality',     title: 'Air Quality Testing Ontario | VOC, Mold & Allergens | ASADS',         desc: 'Indoor air quality testing for VOCs, particulates, CO2 & allergens. GTA & Ontario. AIHA-accredited lab. Residential & commercial. From $299.' },
  { path: '/services/wett',            title: 'WETT Inspection Ontario | Required for Insurance | $249',               desc: 'WETT inspection Ontario — required by insurers for wood stoves & fireplaces. From $249. Thermal imaging included, same-day certificate. Call (647) 801-9311.' },
  { path: '/services/designated-substance-survey', title: 'Designated Substance Survey Ontario | O.Reg 278/05 | ASADS', desc: 'Certified Designated Substance Survey Ontario. Required before renovation or demolition. All 11 substances under OHSA. From $399. Same-day scheduling.' },
  { path: '/services/same-day-home-inspection', title: 'Same-Day Home Inspection Ontario | Book Today',             desc: 'Need a home inspection today in Ontario? ASADS offers same-day home inspections across the GTA — certified inspectors, thermal imaging, digital report in hours.' },
  { path: '/services/insurance-inspection',     title: 'Insurance Home Inspection Ontario | From $249 | ASADS',    desc: 'Insurance home inspection Ontario from $249. Certified condition report for insurer renewals, new policies & hard-to-insure homes. Same-day report. Call (647) 801-9311.' },
];

// ─── Static pages ─────────────────────────────────────────────────────────────

const staticPages = [
  { path: '/',              title: 'Home Inspection Ontario | Certified Home Inspector | ASADS',         desc: 'ASADS certified home inspectors serving Toronto, GTA & Ontario. Pre-purchase, thermal imaging, mold, asbestos & radon testing. Same-day reports. Call (647) 801-9311.' },
  { path: '/about',         title: 'About ASADS Home Inspection | Certified Ontario Inspectors',         desc: 'ASADS Home Inspection — certified, InterNACHI-trained inspectors serving Toronto & Ontario. Learn about our team, credentials, and commitment to buyers.' },
  { path: '/locations',     title: 'Home Inspection Service Areas | GTA & Ontario | ASADS',              desc: 'ASADS Home Inspection serves 106 cities across the GTA and Ontario. Find your city and book a certified home inspector near you.' },
  { path: '/services',      title: 'Home Inspection Services Ontario | ASADS',                           desc: 'Full range of home inspection services: pre-purchase, thermal imaging, mold, asbestos, radon, sewer scope & more. Serving GTA & Ontario. Call (647) 801-9311.' },
  { path: '/blog',          title: 'Home Inspection Blog | Ontario Homeowner Tips | ASADS',              desc: 'Expert home inspection tips, guides, and advice for Ontario homeowners and buyers. Read the latest from ASADS certified inspectors.' },
  { path: '/pricing',       title: 'Home Inspection Cost Ontario | Prices From $299 | ASADS',            desc: 'Transparent home inspection pricing in Ontario. Pre-purchase from $399, thermal imaging from $199, mold from $299. No hidden fees. Call (647) 801-9311.' },
  { path: '/booking',       title: 'Book a Home Inspection Ontario | Same Day | ASADS',                  desc: 'Book your certified home inspection online. Same-day availability infrared Included, GTA & Ontario. ASADS inspectors — call (647) 801-9311.' },
  { path: '/contact',       title: 'Contact ASADS Home Inspection | (647) 801-9311',                     desc: 'Contact ASADS Home Inspection for questions or to book your inspection. Call (647) 801-9311, email info@asads.ca, or use our online form.' },
  { path: '/faq',           title: 'Home Inspection FAQ Ontario | Common Questions | ASADS',             desc: 'Answers to the most common home inspection questions from Ontario buyers and sellers. What\'s included, how long it takes, and what to do with the report.' },
  { path: '/testimonials',  title: 'Home Inspection Reviews | ASADS Client Testimonials',                desc: 'Read reviews from ASADS home inspection clients across Toronto, GTA & Ontario. Verified testimonials from buyers and sellers we\'ve helped.' },
  { path: '/privacy-policy',title: 'Privacy Policy | ASADS Home Inspection',                            desc: 'ASADS Home Inspection privacy policy. Learn how we collect, use, store, and protect your personal information when booking an inspection.' },
  { path: '/terms',         title: 'Terms of Service | ASADS Home Inspection',                          desc: 'ASADS Home Inspection terms of service and booking conditions for Ontario homeowners and property buyers. Read before scheduling an inspection.' },
  { path: '/sitemap',       title: 'Site Map | ASADS Home Inspection',                                  desc: 'Full site map for ASADS Home Inspection. Find all pages including service areas, inspection services, blog, and contact information.' },
  { path: '/sample-report',          title: 'Sample Home Inspection Report | ASADS Ontario',               desc: 'See what an ASADS home inspection report looks like — photo documentation, thermal imaging, findings by severity. Same-day delivery across Ontario.' },
  { path: '/our-promise',            title: 'ASADS Independence Promise | Conflict-Free Inspection Ontario', desc: 'ASADS is 100% conflict-free. No remediation, no realtor referral fees, no financial stake in findings. Our only job is to tell you the truth.' },
  { path: '/for-condo-buyers',       title: 'Condo Home Inspection Ontario | ASADS Condo Specialists',     desc: 'Buying a condo in Ontario? ASADS condo inspections start at $299. Thermal imaging included, same-day report. We know what most inspectors miss.' },
  { path: '/for-investors',          title: 'Home Inspection for Investors Ontario | Multi-Unit & Portfolio', desc: 'Real estate investors trust ASADS for multi-unit, duplex, triplex, and portfolio inspections. Volume pricing, investor-focused reports. Call (647) 801-9311.' },
  { path: '/urgent-home-inspection',    title: 'Urgent Home Inspection Ontario | Same-Day & Next-Day Booking', desc: 'Need a home inspection fast in Ontario? ASADS offers same-day and next-day appointments across the GTA. Condition expiring? Call (647) 801-9311 now.' },
  { path: '/for-first-time-buyers',    title: 'First-Time Home Buyer Inspection Ontario | ASADS',            desc: 'First home in Ontario? ASADS walks first-time buyers through every step — what we check, what findings mean, and what to ask. Same-day GTA booking.' },
  { path: '/environmental-screening',  title: 'Environmental Home Inspection Ontario | Mold Asbestos Radon', desc: 'ASADS screens for mold, asbestos, radon, and air quality during Ontario home inspections. We test and refer to accredited labs — no conflict of interest.' },
  { path: '/bundled-inspection',       title: 'Bundled Home Inspection Ontario | Mold Radon Asbestos',       desc: 'Book your home inspection plus mold, radon, asbestos, or air quality testing in one visit. ASADS bundles specialty tests with every inspection across Ontario.' },
];

// ─── Build page map ───────────────────────────────────────────────────────────

const pages = [];

staticPages.forEach(p => pages.push({ path: p.path, title: p.title, desc: p.desc }));
servicePages.forEach(p => pages.push({ path: p.path, title: p.title, desc: p.desc }));
locations.forEach(loc => {
  const rawTitle = loc.title;
  const title = rawTitle.length > 60 ? rawTitle.slice(0, 57) + '...' : rawTitle;
  const rawDesc = loc.desc;
  const desc = rawDesc.length > 160 ? rawDesc.slice(0, 157) + '...' : rawDesc;
  pages.push({ path: `/locations/${loc.slug}`, title, desc });
});
blogs.forEach(b => {
  const rawTitle = b.title;
  const title = rawTitle.length > 60 ? rawTitle.slice(0, 57) + '...' : rawTitle;
  const rawDesc = b.desc;
  const desc = rawDesc.length > 160 ? rawDesc.slice(0, 157) + '...' : rawDesc;
  pages.push({ path: `/blog/${b.slug}`, title, desc });
});

// ─── Service × City cross-pages ───────────────────────────────────────────────

// Extract service definitions from serviceCityData.ts
// Anchors on metaTitleTemplate (only in top-level service defs, never in relatedServices)
// then backtracks to find the slug that owns that template.
function extractServiceDefs(content) {
  const results = [];
  const titleRe = /metaTitleTemplate:\s*"([^"]+)"/g;
  const descRe  = /metaDescTemplate:\s*"([^"]+)"/g;
  const titleMatches = [...content.matchAll(titleRe)];
  const descMatches  = [...content.matchAll(descRe)];
  for (let i = 0; i < titleMatches.length; i++) {
    // Find the slug: "..." that immediately precedes this metaTitleTemplate
    const before = content.substring(0, titleMatches[i].index);
    const slugMatch = before.match(/slug:\s*"([^"]+)"\s*,?[^{]*$/);
    if (slugMatch && descMatches[i]) {
      results.push({
        slug:  slugMatch[1],
        title: titleMatches[i][1],
        desc:  descMatches[i][1],
      });
    }
  }
  return results;
}

const serviceDefs = extractServiceDefs(serviceCityRaw);

// Extract FAQ arrays per service slug from serviceCityData.ts
function extractServiceFaqsMap(content) {
  const results = {};
  // Anchor on metaTitleTemplate — same strategy as extractServiceDefs
  const titleRe = /metaTitleTemplate:\s*"([^"]+)"/g;
  const titleMatches = [...content.matchAll(titleRe)];

  for (let i = 0; i < titleMatches.length; i++) {
    const before = content.substring(0, titleMatches[i].index);
    const slugMatch = before.match(/slug:\s*"([^"]+)"\s*,?[^{]*$/);
    if (!slugMatch) continue;
    const slug = slugMatch[1];

    const sectionStart = titleMatches[i].index;
    const sectionEnd = i + 1 < titleMatches.length ? titleMatches[i + 1].index : content.length;
    const section = content.substring(sectionStart, sectionEnd);

    // Match { q: "...", a: "..." } pairs — handles prices with $ correctly
    const faqRe = /\{\s*q:\s*"([^"]+)"\s*,\s*a:\s*"([^"]+)"\s*\}/g;
    const faqs = [];
    let m;
    while ((m = faqRe.exec(section)) !== null) {
      faqs.push({ q: m[1], a: m[2] });
    }
    if (faqs.length > 0) results[slug] = faqs;
  }
  return results;
}

const serviceFaqsMap = extractServiceFaqsMap(serviceCityRaw);

// Extract location slugs and city names from locationData.ts
function extractLocationSlugs(content) {
  const results = [];
  const fullSlugs = [...content.matchAll(/slug:\s*"(home-inspection-[^"]+)"/g)].map(m => m[1]);
  const cities    = [...content.matchAll(/city:\s*"([^"]+)"/g)].map(m => m[1]);
  for (let i = 0; i < fullSlugs.length; i++) {
    results.push({
      fullSlug: fullSlugs[i],
      citySlug: fullSlugs[i].replace(/^home-inspection-/, ''), // e.g. "brampton"
      city: cities[i] || fullSlugs[i],
    });
  }
  return results;
}

const locationSlugs = extractLocationSlugs(locationRaw);

serviceDefs.forEach(svc => {
  locationSlugs.forEach(loc => {
    const city = loc.city;
    const rawTitle = svc.title.replace(/\{city\}/g, city);
    const title = rawTitle.length > 60 ? rawTitle.slice(0, 57) + '...' : rawTitle;
    const rawDesc = svc.desc.replace(/\{city\}/g, city);
    const desc  = rawDesc.length > 160 ? rawDesc.slice(0, 157) + '...' : rawDesc;
    pages.push({
      path: `/services/${svc.slug}/${loc.citySlug}`,
      title,
      desc,
    });
  });
});

// Blog × City cross-pages are noindex — excluded from prerender to save build time
// Crawl budget should be focused on service×city pages instead

// ─── HTML helpers ─────────────────────────────────────────────────────────────

function esc(s) {
  return String(s)
    .replace(/&/g, '&amp;').replace(/"/g, '&quot;')
    .replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function nav(sections) {
  const inner = sections
    .map(([label, links]) => `<p style="margin-bottom:0.35rem"><strong>${label}:</strong> ${links}</p>`)
    .join('');
  return `<nav aria-label="Related pages" style="padding:0.75rem 1rem;font-size:0.8rem;color:#475569">${inner}</nav>`;
}

function aLinks(items) {
  return items.map(([href, text]) => `<a href="${href}">${esc(text)}</a>`).join(' · ');
}

// ─── Read base HTML ───────────────────────────────────────────────────────────

const baseHtml = readFileSync(resolve(DIST, 'index.html'), 'utf8');

// Inject a default meta description into the base index.html if missing
if (!baseHtml.includes('<meta name="description"')) {
  const withDesc = baseHtml.replace(
    '<meta name="robots"',
    '<meta data-rh="true" name="description" content="ASADS certified home inspectors serving Toronto, GTA &amp; Ontario. Pre-purchase, thermal imaging, mold, asbestos &amp; radon testing. Same-day reports." />\n    <meta name="robots"'
  );
  writeFileSync(resolve(DIST, 'index.html'), withDesc, 'utf8');
  console.log('✓ Injected default meta description into index.html');
}

// ─── Cross-link data ──────────────────────────────────────────────────────────

// All city slugs (strip "home-inspection-" prefix)
const allCitySlugs = locationSlugs.map(l => l.citySlug);
const allCityNames = Object.fromEntries(locationSlugs.map(l => [l.citySlug, l.city]));

// Service slugs + names
const allServiceSlugs = serviceDefs.map(s => s.slug);
const serviceNames = Object.fromEntries(serviceDefs.map(s => [s.slug, s.title.replace(/ \{city\}.*/i, '').replace(/ \|.*/,'').trim()]));

// Blog slugs + titles
const allBlogSlugs  = blogs.map(b => b.slug);
const blogTitles    = Object.fromEntries(blogs.map(b => [b.slug, b.title]));

// Links for static hub pages
const staticNavLinks = {
  '/': nav([
    ['Our services', aLinks(allServiceSlugs.map(s => [`/services/${s}`, serviceNames[s]]))],
    ['Service areas — GTA', aLinks(allCitySlugs.slice(0, 30).map(c => [`/locations/home-inspection-${c}`, allCityNames[c]]))],
    ['Service areas — Ontario', aLinks(allCitySlugs.slice(30).map(c => [`/locations/home-inspection-${c}`, allCityNames[c]]))],
    ['Pages', aLinks([['/services','Services'],['/locations','Locations'],['/blog','Blog'],['/pricing','Pricing'],['/booking','Book Now'],['/about','About'],['/contact','Contact'],['/faq','FAQ']])],
  ]),
  '/services': nav([
    ['All services', aLinks(allServiceSlugs.map(s => [`/services/${s}`, serviceNames[s]]))],
  ]),
  '/locations': nav([
    ['All service areas', aLinks(allCitySlugs.map(c => [`/locations/home-inspection-${c}`, allCityNames[c]]))],
  ]),
  '/blog': nav([
    ['Articles', aLinks(allBlogSlugs.map(s => [`/blog/${s}`, (blogTitles[s] || s).slice(0, 40) + '...']))],
  ]),
};

const defaultNav = nav([
  ['Pages', aLinks([['/', 'Home'],['/services','Services'],['/locations','Locations'],['/blog','Blog'],['/pricing','Pricing'],['/booking','Book Now'],['/about','About'],['/contact','Contact'],['/faq','FAQ']])],
]);

// ─── Breadcrumb schema builder ────────────────────────────────────────────────

function buildBreadcrumbSchema(pagePath, parts) {
  const items = [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": BASE_URL + "/" }
  ];

  if (parts[0] === 'locations') {
    items.push({ "@type": "ListItem", "position": 2, "name": "Service Areas", "item": BASE_URL + "/locations" });
    if (parts.length === 2) {
      const cSlug = parts[1].replace(/^home-inspection-/, '');
      const cName = allCityNames[cSlug] || cSlug;
      items.push({ "@type": "ListItem", "position": 3, "name": cName, "item": BASE_URL + pagePath });
    }
  } else if (parts[0] === 'services' && parts.length === 2) {
    items.push({ "@type": "ListItem", "position": 2, "name": "Services", "item": BASE_URL + "/services" });
    const sName = serviceNames[parts[1]] || parts[1];
    items.push({ "@type": "ListItem", "position": 3, "name": sName, "item": BASE_URL + pagePath });
  } else if (parts[0] === 'services' && parts.length === 3) {
    items.push({ "@type": "ListItem", "position": 2, "name": "Services", "item": BASE_URL + "/services" });
    const sName = serviceNames[parts[1]] || parts[1];
    items.push({ "@type": "ListItem", "position": 3, "name": sName, "item": `${BASE_URL}/services/${parts[1]}` });
    const cName = allCityNames[parts[2]] || parts[2];
    items.push({ "@type": "ListItem", "position": 4, "name": cName, "item": BASE_URL + pagePath });
  } else {
    return null;
  }

  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items
  };

  // Escape </script> inside JSON to prevent HTML parsing issues
  const json = JSON.stringify(schema).replace(/<\/script>/gi, '<\\/script>');
  return `<script type="application/ld+json">${json}</script>`;
}

// ─── FAQ schema builder ───────────────────────────────────────────────────────

// Standard FAQs for location pages — {city} placeholder replaced at runtime
const locationPageFaqs = [
  {
    q: "How much does a home inspection cost in {city}?",
    a: "Home inspections in {city} start from $399 for pre-purchase and $299 for condo inspections. Pricing depends on home size, age, and additional services like thermal imaging or mold testing. Call (647) 801-9311 for a quote."
  },
  {
    q: "How long does a home inspection take in {city}?",
    a: "A standard detached home inspection in {city} takes 2–3 hours. Condos typically take 1.5–2.5 hours. Larger or older properties may take longer. You are welcome and encouraged to attend."
  },
  {
    q: "Are ASADS home inspectors certified in {city}?",
    a: "Yes. ASADS inspectors are InterNACHI-certified and serve {city} and all surrounding areas across the GTA and Ontario. We carry full E&O insurance and deliver same-day digital reports."
  },
  {
    q: "Do you provide same-day inspection reports in {city}?",
    a: "Yes — every home inspection in {city} includes a photo-rich digital PDF report delivered the same day as the inspection, readable on any device."
  },
];

function buildFaqSchema(faqs, city) {
  if (!faqs || faqs.length === 0) return null;
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.slice(0, 5).map(faq => ({
      "@type": "Question",
      "name": city ? faq.q.replace(/\{city\}/g, city) : faq.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": city ? faq.a.replace(/\{city\}/g, city) : faq.a
      }
    }))
  };
  const json = JSON.stringify(schema).replace(/<\/script>/gi, '<\\/script>');
  return `<script type="application/ld+json">${json}</script>`;
}

// ─── Generate per-page HTML files ─────────────────────────────────────────────

let count = 0;

for (const page of pages) {
  const canonical = `${BASE_URL}${page.path}`;
  const t = esc(page.title);
  const d = esc(page.desc);

  // Build cross-links for this page
  let linksHtml = staticNavLinks[page.path] || defaultNav;

  const parts = page.path.split('/').filter(Boolean);

  if (parts[0] === 'services' && parts.length === 2) {
    // /services/:slug — link to ALL cities + related services
    const sSlug = parts[1];
    const related = allServiceSlugs.filter(s => s !== sSlug);
    linksHtml = nav([
      [`${serviceNames[sSlug] || sSlug} — GTA cities`, aLinks(allCitySlugs.slice(0, 30).map(c => [`/services/${sSlug}/${c}`, allCityNames[c]]))],
      [`${serviceNames[sSlug] || sSlug} — Ontario cities`, aLinks(allCitySlugs.slice(30).map(c => [`/services/${sSlug}/${c}`, allCityNames[c]]))],
      ['Related services', aLinks(related.map(s => [`/services/${s}`, serviceNames[s]]))],
      ['Home', aLinks([['/', 'Home'],['/services','All Services'],['/locations','All Cities']])],
    ]);

  } else if (parts[0] === 'services' && parts.length === 3) {
    // /services/:svc/:city — all cities for this service + all services for this city
    const sSlug = parts[1];
    const cSlug = parts[2];
    const ci = allCitySlugs.indexOf(cSlug);
    // 12 nearby cities (wrap around)
    const nearby = [];
    for (let d = 1; d <= 6; d++) {
      nearby.push(allCitySlugs[(ci - d + allCitySlugs.length) % allCitySlugs.length]);
      nearby.push(allCitySlugs[(ci + d) % allCitySlugs.length]);
    }
    linksHtml = nav([
      [`${serviceNames[sSlug] || sSlug} in nearby cities`, aLinks(nearby.map(c => [`/services/${sSlug}/${c}`, allCityNames[c]]))],
      ['All services in this city', aLinks(allServiceSlugs.map(s => [`/services/${s}/${cSlug}`, serviceNames[s]]))],
      [`All ${serviceNames[sSlug] || sSlug} locations`, aLinks(allCitySlugs.filter(c => c !== cSlug).map(c => [`/services/${sSlug}/${c}`, allCityNames[c]]))],
      ['Home', aLinks([['/', 'Home'],[`/services/${sSlug}`, serviceNames[sSlug] || sSlug],[`/locations/home-inspection-${cSlug}`, allCityNames[cSlug] || cSlug]])],
    ]);

  } else if (parts[0] === 'locations' && parts.length === 2) {
    // /locations/home-inspection-:city — services in this city + nearby
    const fullSlug = parts[1];
    const cSlug = fullSlug.replace(/^home-inspection-/, '');
    const ci = allCitySlugs.indexOf(cSlug);
    const nearby = [];
    for (let d = 1; d <= 3; d++) {
      nearby.push(allCitySlugs[(ci - d + allCitySlugs.length) % allCitySlugs.length]);
      nearby.push(allCitySlugs[(ci + d) % allCitySlugs.length]);
    }
    linksHtml = nav([
      [`Services in ${allCityNames[cSlug] || cSlug}`, aLinks(allServiceSlugs.map(s => [`/services/${s}/${cSlug}`, serviceNames[s]]))],
      ['Inspection guides', aLinks(allBlogSlugs.slice(0, 8).map(s => [`/blog/${s}`, (blogTitles[s] || s).slice(0, 35) + '...']))],
      ['Nearby cities', aLinks(nearby.map(c => [`/locations/home-inspection-${c}`, allCityNames[c]]))],
      ['Home', aLinks([['/', 'Home'],['/services','All Services'],['/locations','All Cities']])],
    ]);

  } else if (parts[0] === 'blog' && parts.length === 2) {
    // /blog/:slug — related posts + service links + service×city for top cities
    const bSlug = parts[1];
    const bi = allBlogSlugs.indexOf(bSlug);
    const relPosts = [1, 2, 3, 4, 5].map(d => allBlogSlugs[(bi + d) % allBlogSlugs.length]);
    const topCities = allCitySlugs.slice(0, 10); // Toronto, Mississauga, Brampton, etc.
    linksHtml = nav([
      ['Related articles', aLinks(relPosts.map(s => [`/blog/${s}`, (blogTitles[s] || s).slice(0, 40) + '...']))],
      ['Our services', aLinks(allServiceSlugs.map(s => [`/services/${s}`, serviceNames[s]]))],
      ['Book an inspection', aLinks(topCities.map(c => [`/services/pre-purchase/${c}`, `Home Inspection ${allCityNames[c]}`]))],
      ['Service areas', aLinks(allCitySlugs.slice(0, 20).map(c => [`/locations/home-inspection-${c}`, allCityNames[c]]))],
      ['Home', aLinks([['/', 'Home'],['/blog','All Articles'],['/services','Services'],['/locations','All Cities']])],
    ]);
  }

  const h1 = esc(page.title);
  let html = baseHtml;

  // Use function replacements throughout — prevents $ in dynamic content
  // (prices like $399, $149) being misread as regex backreferences
  html = html.replace(/<title>[^<]*<\/title>/, () => `<title>${t}</title>`);
  html = html.replace(/<link rel="canonical"[^>]*>/, () => `<link rel="canonical" href="${canonical}" />`);
  html = html.replace(/<meta name="description"[^>]*\/?>/g, '');
  html = html.replace('<meta name="robots"', () => `<meta data-rh="true" name="description" content="${d}" />\n    <meta name="robots"`);
  html = html.replace(/<div id="root">[\s\S]*?<\/div>/, () => `<div id="root"><h1 style="font-size:1.5rem;font-weight:700;padding:1rem">${h1}</h1>${linksHtml}</div>`);

  // Inject breadcrumb JSON-LD into <head> so Googlebot sees it without JS
  const breadcrumbSchema = buildBreadcrumbSchema(page.path, parts);
  if (breadcrumbSchema) {
    html = html.replace('</head>', () => `${breadcrumbSchema}\n</head>`);
  }

  // Inject FAQPage JSON-LD into <head> so Googlebot sees it without JS.
  // React components do NOT render their own FAQPage — prerender is single source of truth.
  const sameDayFaqs = [
    { q: "How quickly can you do a same-day home inspection in Ontario?", a: "Call us before noon and we can typically get an inspector to your property the same afternoon or evening. We operate 7 days a week, 7am–10pm, across Toronto, the GTA, Hamilton, Kitchener-Waterloo, Barrie, and 100+ Ontario cities." },
    { q: "Is a same-day home inspection as thorough as a scheduled one?", a: "Yes — 100%. Our same-day inspections follow the identical InterNACHI Standards of Practice as all our inspections: 400+ checkpoints, thermal imaging available, foundation to roof. We never rush or cut corners to meet a same-day request." },
    { q: "How much does a same-day home inspection cost in Ontario?", a: "Same-day inspections are priced identically to standard inspections: condos from $299, townhouses from $349, detached homes from $399. There is no rush surcharge. Thermal imaging, mold screening, and radon testing are available as add-ons." },
    { q: "What areas do you cover for same-day home inspections?", a: "We cover 106 cities across Ontario including Toronto, Mississauga, Brampton, Vaughan, Markham, Richmond Hill, Oakville, Burlington, Hamilton, Kitchener, Waterloo, Cambridge, Barrie, Oshawa, Ajax, Whitby, Pickering, Newmarket, Aurora, and more." },
    { q: "Can I get a same-day inspection when waiving a home inspection condition?", a: "Yes — this is one of the most common same-day scenarios we handle. Book first thing in the morning, complete the inspection that afternoon, review the report, then make your decision before your offer expiry." },
  ];
  let faqSchema = null;
  if (parts[0] === 'services' && parts.length === 3) {
    const sSlug = parts[1];
    const cName = allCityNames[parts[2]] || parts[2];
    faqSchema = buildFaqSchema(serviceFaqsMap[sSlug], cName);
  } else if (parts[0] === 'services' && parts.length === 2 && parts[1] === 'same-day-home-inspection') {
    faqSchema = buildFaqSchema(sameDayFaqs, 'Ontario');
  } else if (parts[0] === 'services' && parts.length === 2) {
    faqSchema = buildFaqSchema(serviceFaqsMap[parts[1]], 'Ontario');
  } else if (parts[0] === 'locations' && parts.length === 2) {
    const cSlug = parts[1].replace(/^home-inspection-/, '');
    const cName = allCityNames[cSlug] || cSlug;
    faqSchema = buildFaqSchema(locationPageFaqs, cName);
  }
  if (faqSchema) {
    html = html.replace('</head>', () => `${faqSchema}\n</head>`);
  }

  // Write file
  const dir = resolve(DIST, ...page.path.split('/').filter(Boolean));
  mkdirSync(dir, { recursive: true });
  writeFileSync(resolve(dir, 'index.html'), html, 'utf8');
  count++;
}

console.log(`✓ Prerendered: ${count} pages → dist/`);
