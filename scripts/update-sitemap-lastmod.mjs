/**
 * update-sitemap-lastmod.mjs
 * Writes scripts/sitemap-lastmod.json: the date each page's source file last
 * changed, so sitemap.xml shows real <lastmod> dates instead of the build date.
 * Uses git history, so run it locally before committing page changes
 * (Vercel's shallow clone can't see the full history).
 * Run: node scripts/update-sitemap-lastmod.mjs
 */

import { execSync } from 'child_process';
import { writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');

const git = (cmd) => execSync(`git ${cmd}`, { cwd: ROOT, encoding: 'utf8' }).trim();

// Date of the oldest commit whose version of the file matches the current one.
// A change that was later reverted doesn't count as a change.
function fileDate(file) {
  const current = git(`rev-parse HEAD:${file}`);
  let date = '';
  for (const line of git(`log --format="%H %cs" -- ${file}`).split('\n').filter(Boolean)) {
    const [hash, day] = line.split(' ');
    let blob = '';
    try { blob = git(`rev-parse ${hash}:${file}`); } catch { blob = ''; }
    if (blob === current) date = day;
  }
  return date;
}

const latest = (...files) => files.map(fileDate).filter(Boolean).sort().pop();

const staticPages = {
  '/': 'src/pages/Index.tsx',
  '/about': 'src/pages/About.tsx',
  '/services': 'src/pages/Services.tsx',
  '/locations': 'src/pages/Locations.tsx',
  '/testimonials': 'src/pages/Testimonials.tsx',
  '/faq': 'src/pages/FAQ.tsx',
  '/pricing': 'src/pages/Pricing.tsx',
  '/booking': 'src/pages/Booking.tsx',
  '/contact': 'src/pages/Contact.tsx',
  '/sitemap': 'src/pages/Sitemap.tsx',
};

const serviceHubs = {
  'pre-purchase': 'PrePurchase', 'pre-listing': 'PreListing', 'new-construction': 'NewConstruction',
  'pdi-inspection': 'PreDeliveryInspection', 'condo': 'Condo', 'commercial': 'Commercial',
  'radon-testing': 'RadonTesting', 'mold-inspection': 'MoldInspection', 'asbestos-testing': 'AsbestosTesting',
  'thermal-imaging': 'ThermalImaging', 'wett': 'WETT', 'lead-paint-testing': 'LeadPaintTesting',
  'well-water-testing': 'WellWaterTesting', 'air-quality': 'AirQuality',
  'same-day-home-inspection': 'SameDayInspection', 'designated-substance-survey': 'DesignatedSubstanceSurvey',
  'insurance-inspection': 'InsuranceInspection',
};

const out = { pages: {}, groups: {} };
for (const [path, file] of Object.entries(staticPages)) out.pages[path] = fileDate(file);
for (const [slug, name] of Object.entries(serviceHubs)) out.pages[`/services/${slug}`] = fileDate(`src/pages/services/${name}.tsx`);
out.groups.locations = latest('src/pages/LocationDetail.tsx', 'src/data/locationData.ts');
out.groups.serviceCity = latest('src/pages/services/ServiceCityPage.tsx', 'src/data/serviceCityData.ts', 'src/data/locationData.ts');

writeFileSync(resolve(__dirname, 'sitemap-lastmod.json'), JSON.stringify(out, null, 2) + '\n', 'utf8');
console.log('✓ Wrote scripts/sitemap-lastmod.json');
console.log(out);
