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
  { path: '/services/mold-inspection', title: 'Mold Inspection & Testing Toronto | From $299 | ASADS',              desc: 'Certified mold inspection & testing in Toronto and GTA from $299. Air sampling, black mold ID, AIHA lab results. Independent inspector — not remediation.' },
  { path: '/services/asbestos-testing',title: 'Asbestos Testing Toronto | Accredited Lab | ASADS',                   desc: 'Accredited asbestos testing across Ontario. Bulk sampling, O.Reg 278/05 compliance, lab-certified results. Residential & commercial. Call (647) 801-9311.' },
  { path: '/services/radon-testing',   title: 'Radon Testing Ontario | Health Canada Certified | ASADS',             desc: 'Long-term & short-term radon testing across Ontario. Health Canada guidelines, certified detectors, written report. From $149. Call (647) 801-9311.' },
  { path: '/services/sewer-scope',     title: 'Sewer Scope Inspection Toronto | From $299 | ASADS',                 desc: 'Sewer scope inspection from $299. CCTV drain camera finds root intrusion, pipe bellies & cracks before you buy. GPS mapping, same-day video report. GTA & Ontario.' },
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
  { path: '/privacy-policy',title: 'Privacy Policy | ASADS Home Inspection',                            desc: 'ASADS Home Inspection privacy policy. Learn how we collect, use, store, and protect your personal information when booking an inspection.' },
  { path: '/terms',         title: 'Terms of Service | ASADS Home Inspection',                          desc: 'ASADS Home Inspection terms of service and booking conditions for Ontario homeowners and property buyers. Read before scheduling an inspection.' },
  { path: '/sitemap',       title: 'Site Map | ASADS Home Inspection',                                  desc: 'Full site map for ASADS Home Inspection. Find all pages including service areas, inspection services, blog, and contact information.' },
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

// ─── Blog × City cross-pages ──────────────────────────────────────────────────

blogs.forEach(b => {
  locationSlugs.forEach(loc => {
    const city = loc.city;
    const rawTitle = `${b.title} | ${city}, Ontario`;
    const title = rawTitle.length > 70 ? rawTitle.slice(0, 67) + '...' : rawTitle;
    const rawDesc = `${b.desc} Serving ${city} homeowners & buyers.`;
    const desc = rawDesc.length > 160 ? rawDesc.slice(0, 157) + '...' : rawDesc;
    pages.push({
      path: `/blog/${b.slug}/${loc.citySlug}`,
      title,
      desc,
    });
  });
});

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
    ['Our services', aLinks(allServiceSlugs.slice(0, 8).map(s => [`/services/${s}`, serviceNames[s]]))],
    ['Service areas', aLinks(allCitySlugs.slice(0, 8).map(c => [`/locations/home-inspection-${c}`, allCityNames[c]]))],
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

  if (parts[0] === 'services') {
    items.push({ "@type": "ListItem", "position": 2, "name": "Services", "item": BASE_URL + "/services" });
    if (parts.length >= 2) {
      const sName = serviceNames[parts[1]] || parts[1];
      items.push({ "@type": "ListItem", "position": 3, "name": sName, "item": `${BASE_URL}/services/${parts[1]}` });
      if (parts.length === 3) {
        const cName = allCityNames[parts[2]] || parts[2];
        items.push({ "@type": "ListItem", "position": 4, "name": cName, "item": BASE_URL + pagePath });
      }
    }
  } else if (parts[0] === 'locations') {
    items.push({ "@type": "ListItem", "position": 2, "name": "Service Areas", "item": BASE_URL + "/locations" });
    if (parts.length === 2) {
      const cSlug = parts[1].replace(/^home-inspection-/, '');
      const cName = allCityNames[cSlug] || cSlug;
      items.push({ "@type": "ListItem", "position": 3, "name": cName, "item": BASE_URL + pagePath });
    }
  } else if (parts[0] === 'blog') {
    items.push({ "@type": "ListItem", "position": 2, "name": "Blog", "item": BASE_URL + "/blog" });
    if (parts.length >= 2) {
      const bTitle = (blogTitles[parts[1]] || parts[1]).replace(/ \|.*$/, '').trim();
      items.push({ "@type": "ListItem", "position": 3, "name": bTitle, "item": `${BASE_URL}/blog/${parts[1]}` });
      if (parts.length === 3) {
        const cName = allCityNames[parts[2]] || parts[2];
        items.push({ "@type": "ListItem", "position": 4, "name": cName, "item": BASE_URL + pagePath });
      }
    }
  } else {
    return null; // homepage + static pages — no breadcrumb needed
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
    // /services/:slug — link to top cities + related services
    const sSlug = parts[1];
    const si = allServiceSlugs.indexOf(sSlug);
    const related = allServiceSlugs.filter(s => s !== sSlug).slice(0, 4);
    linksHtml = nav([
      [`${serviceNames[sSlug] || sSlug} near you`, aLinks(allCitySlugs.slice(0, 12).map(c => [`/services/${sSlug}/${c}`, allCityNames[c]]))],
      ['Related services', aLinks(related.map(s => [`/services/${s}`, serviceNames[s]]))],
      ['Home', aLinks([['/', 'Home'],['/services','All Services'],['/locations','All Cities']])],
    ]);

  } else if (parts[0] === 'services' && parts.length === 3) {
    // /services/:svc/:city — nearby cities + related services
    const sSlug = parts[1];
    const cSlug = parts[2];
    const ci = allCitySlugs.indexOf(cSlug);
    const nearby = [];
    for (let d = 1; d <= 3; d++) {
      nearby.push(allCitySlugs[(ci - d + allCitySlugs.length) % allCitySlugs.length]);
      nearby.push(allCitySlugs[(ci + d) % allCitySlugs.length]);
    }
    const si = allServiceSlugs.indexOf(sSlug);
    const relSvcs = [];
    for (let d = 1; d <= 2; d++) {
      relSvcs.push(allServiceSlugs[(si - d + allServiceSlugs.length) % allServiceSlugs.length]);
      relSvcs.push(allServiceSlugs[(si + d) % allServiceSlugs.length]);
    }
    linksHtml = nav([
      ['Also serving', aLinks(nearby.map(c => [`/services/${sSlug}/${c}`, allCityNames[c]]))],
      ['Related services', aLinks(relSvcs.map(s => [`/services/${s}/${cSlug}`, serviceNames[s]]))],
      ['Home', aLinks([['/', 'Home'],['/services','All Services'],['/locations','All Cities']])],
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
      [`Inspection guides for ${allCityNames[cSlug] || cSlug}`, aLinks(allBlogSlugs.slice(0, 8).map(s => [`/blog/${s}/${cSlug}`, (blogTitles[s] || s).slice(0, 35) + '...']))],
      ['Nearby cities', aLinks(nearby.map(c => [`/locations/home-inspection-${c}`, allCityNames[c]]))],
      ['Home', aLinks([['/', 'Home'],['/services','All Services'],['/locations','All Cities']])],
    ]);

  } else if (parts[0] === 'blog' && parts.length === 2) {
    // /blog/:slug — city versions + related posts
    const bSlug = parts[1];
    const bi = allBlogSlugs.indexOf(bSlug);
    const relPosts = [1, 2, 3].map(d => allBlogSlugs[(bi + d) % allBlogSlugs.length]);
    linksHtml = nav([
      ['Read in your city', aLinks(allCitySlugs.slice(0, 12).map(c => [`/blog/${bSlug}/${c}`, allCityNames[c]]))],
      ['Related articles', aLinks(relPosts.map(s => [`/blog/${s}`, (blogTitles[s] || s).slice(0, 35) + '...']))],
      ['Home', aLinks([['/', 'Home'],['/blog','All Articles'],['/services','Services']])],
    ]);

  } else if (parts[0] === 'blog' && parts.length === 3) {
    // /blog/:slug/:city — nearby cities + related posts
    const bSlug = parts[1];
    const cSlug = parts[2];
    const ci = allCitySlugs.indexOf(cSlug);
    const nearby = [];
    for (let d = 1; d <= 3; d++) {
      nearby.push(allCitySlugs[(ci - d + allCitySlugs.length) % allCitySlugs.length]);
      nearby.push(allCitySlugs[(ci + d) % allCitySlugs.length]);
    }
    const bi = allBlogSlugs.indexOf(bSlug);
    const relPosts = [1, 2].map(d => allBlogSlugs[(bi + d) % allBlogSlugs.length]);
    linksHtml = nav([
      ['Also reading in', aLinks(nearby.map(c => [`/blog/${bSlug}/${c}`, allCityNames[c]]))],
      ['Related articles', aLinks(relPosts.map(s => [`/blog/${s}/${cSlug}`, (blogTitles[s] || s).slice(0, 35) + '...']))],
      ['Home', aLinks([['/', 'Home'],['/blog','All Articles'],['/services','Services']])],
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

  // Write file
  const dir = resolve(DIST, ...page.path.split('/').filter(Boolean));
  mkdirSync(dir, { recursive: true });
  writeFileSync(resolve(dir, 'index.html'), html, 'utf8');
  count++;
}

console.log(`✓ Prerendered: ${count} pages → dist/`);
