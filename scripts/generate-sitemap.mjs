/**
 * generate-sitemap.mjs
 * Generates a complete sitemap.xml in /public covering all pages including
 * service×city (14 × 106 = 1,484) and blog×city (48 × 106 = 5,088) cross-pages.
 * Run: node scripts/generate-sitemap.mjs
 */

import { readFileSync, writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const BASE_URL = 'https://www.asads.ca';
const TODAY = new Date().toISOString().split('T')[0]; // YYYY-MM-DD

// ─── Read source files ────────────────────────────────────────────────────────

const locationRaw = readFileSync(resolve(ROOT, 'src/data/locationData.ts'), 'utf8');
const blogRaw     = readFileSync(resolve(ROOT, 'src/data/blogPosts.ts'), 'utf8');

// ─── Extract helpers ──────────────────────────────────────────────────────────

function extractField(content, key) {
  const dq = new RegExp(`${key}:\\s*"([^"]+)"`, 'g');
  const sq = new RegExp(`${key}:\\s*'([^']+)'`, 'g');
  const dqM = [...content.matchAll(dq)].map(m => m[1]);
  if (dqM.length > 0) return dqM;
  return [...content.matchAll(sq)].map(m => m[1]);
}

const locationFullSlugs = [...locationRaw.matchAll(/slug:\s*"(home-inspection-[^"]+)"/g)].map(m => m[1]);
// Clean slugs for service×city and blog×city URLs (e.g. "brampton" not "home-inspection-brampton")
const locationSlugs = locationFullSlugs; // keep full for /locations/ pages
const citySlugs = locationFullSlugs.map(s => s.replace(/^home-inspection-/, ''));
const blogSlugs     = extractField(blogRaw, 'slug');

// Service slugs — hardcoded list matching serviceDefinitions in serviceCityData.ts
const serviceSlugs = [
  'pre-purchase', 'pre-listing', 'condo', 'new-construction', 'commercial',
  'thermal-imaging', 'mold-inspection', 'asbestos-testing', 'radon-testing',
  'well-water-testing', 'lead-paint-testing', 'air-quality', 'wett',
  'insurance-inspection',
  // sewer-scope excluded: not offered by ASADS (redirects to pre-purchase)
];

// ─── URL builder ──────────────────────────────────────────────────────────────

function url(path, priority = '0.7', changefreq = 'monthly', lastmod = TODAY) {
  return `  <url><loc>${BASE_URL}${path}</loc><lastmod>${lastmod}</lastmod><changefreq>${changefreq}</changefreq><priority>${priority}</priority></url>`;
}

// ─── Collect all URLs ─────────────────────────────────────────────────────────

const lines = ['<?xml version="1.0" encoding="UTF-8"?>', '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'];

// Static pages
lines.push(url('/', '1.0', 'weekly'));
lines.push(url('/about', '0.8'));
lines.push(url('/services', '0.9'));
lines.push(url('/locations', '0.9'));
lines.push(url('/blog', '0.7', 'weekly'));
lines.push(url('/testimonials', '0.7'));
lines.push(url('/faq', '0.6'));
lines.push(url('/pricing', '0.8'));
lines.push(url('/booking', '0.9'));
lines.push(url('/contact', '0.8'));
lines.push(url('/sitemap', '0.4'));
// /privacy-policy and /terms are noindex — excluded from sitemap intentionally
lines.push('');

// Service pages
const servicePages = [
  'pre-purchase', 'pre-listing', 'new-construction', 'condo', 'commercial',
  'radon-testing', 'mold-inspection', 'asbestos-testing', 'thermal-imaging',
  'wett', 'lead-paint-testing', 'well-water-testing', 'air-quality',
  'same-day-home-inspection', 'designated-substance-survey', 'insurance-inspection',
  // sewer-scope: not offered — redirects to /services/pre-purchase
  // pdi-inspection: no route exists — redirected to /services/new-construction
];
servicePages.forEach(s => lines.push(url(`/services/${s}`, '0.9')));
lines.push('');

// Location pages
locationSlugs.forEach(s => lines.push(url(`/locations/${s}`, '0.8')));
lines.push('');

// Blog posts
blogSlugs.forEach(s => lines.push(url(`/blog/${s}`, '0.7', 'monthly')));
lines.push('');

// Service × City cross-pages (clean city slug: /services/mold-inspection/brampton)
serviceSlugs.forEach(svc => {
  citySlugs.forEach(city => {
    lines.push(url(`/services/${svc}/${city}`, '0.6'));
  });
  lines.push('');
});

// Blog × City cross-pages are noindex — excluded from sitemap to protect crawl budget
// Google should focus on the 1,484 service×city pages instead

lines.push('</urlset>');

// ─── Write sitemap ────────────────────────────────────────────────────────────

const sitemap = lines.join('\n');
writeFileSync(resolve(ROOT, 'public/sitemap.xml'), sitemap, 'utf8');

const svcCity = serviceSlugs.length * citySlugs.length;
const total = 13 + servicePages.length + locationSlugs.length + blogSlugs.length + svcCity;
console.log(`✓ Sitemap generated: ${total} URLs → public/sitemap.xml`);
console.log(`  Static: 13 | Services: ${servicePages.length} | Locations: ${locationSlugs.length} | Blog: ${blogSlugs.length} | Service×City: ${svcCity} | Blog×City: excluded (noindex)`);
