/**
 * protasker-service-keywords.mjs
 * Pulls SEMrush keyword data (vol, KD, CPC, SERP owners) for every
 * Protasker service — same methodology as ASADS-SEO-Research.md.
 *
 * Output: C:/Users/Owner/Documents/Protasker-Service-Keywords.md
 * Runtime: ~35-40 minutes (138 keyword lookups × ~15s each)
 */

import puppeteer from 'puppeteer';
import { writeFileSync } from 'fs';
const sleep = ms => new Promise(r => setTimeout(r, ms));

const OUT = 'C:/Users/Owner/Documents/Protasker-Service-Keywords.md';
const DB  = 'ca';

// ── SERVICE KEYWORD CLUSTERS ──────────────────────────────────────────────────
// Format: { label, slug, keywords: [kw, ...] }
// 2–3 keywords per service: generic national + city + near me (where volume exists)
const SERVICES = [
  // ── CLEANING
  {
    label: 'Deep Cleaning',
    slug: 'deep-cleaning',
    keywords: ['deep cleaning service ontario', 'deep cleaning toronto', 'deep cleaning service near me'],
  },
  {
    label: 'Move-In Cleaning',
    slug: 'move-in-clean',
    keywords: ['move in cleaning service ontario', 'move in cleaning toronto'],
  },
  {
    label: 'Post-Construction Cleaning',
    slug: 'post-construction-clean',
    keywords: ['post construction cleaning ontario', 'post construction cleaning toronto'],
  },
  {
    label: 'Airbnb / Short-Term Rental Cleaning',
    slug: 'airbnb-turnaround',
    keywords: ['airbnb cleaning service toronto', 'short term rental cleaning ontario'],
  },
  {
    label: 'Carpet Cleaning',
    slug: 'carpet-cleaning',
    keywords: ['carpet cleaning ontario', 'carpet cleaning toronto', 'carpet steam cleaning near me'],
  },
  {
    label: 'Window Cleaning',
    slug: 'window-cleaning',
    keywords: ['window cleaning service ontario', 'window cleaning toronto', 'window cleaning near me'],
  },
  {
    label: 'Dryer Vent Cleaning',
    slug: 'dryer-vent-cleaning',
    keywords: ['dryer vent cleaning ontario', 'dryer vent cleaning toronto'],
  },

  // ── LAWN & EXTERIOR
  {
    label: 'Lawn Maintenance',
    slug: 'lawn-maintenance',
    keywords: ['lawn care service ontario', 'lawn maintenance toronto', 'lawn mowing service near me'],
  },
  {
    label: 'Gutter / Eavestrough Cleaning',
    slug: 'gutter-cleaning',
    keywords: ['eavestrough cleaning ontario', 'gutter cleaning toronto', 'eavestrough cleaning near me'],
  },
  {
    label: 'Pressure Washing',
    slug: 'pressure-washing',
    keywords: ['pressure washing service ontario', 'pressure washing toronto', 'power washing near me'],
  },
  {
    label: 'Snow Removal',
    slug: 'snow-removal',
    keywords: ['snow removal service ontario', 'snow removal toronto', 'driveway snow removal near me'],
  },
  {
    label: 'Tree Trimming',
    slug: 'tree-trimming',
    keywords: ['tree trimming service ontario', 'tree trimming toronto', 'tree pruning near me'],
  },
  {
    label: 'Yard Cleaning',
    slug: 'yard-cleaning',
    keywords: ['yard cleanup service ontario', 'yard cleaning toronto'],
  },
  {
    label: 'Yard Work',
    slug: 'yard-work',
    keywords: ['yard work service ontario', 'yard work toronto'],
  },
  {
    label: 'Mulch Installation',
    slug: 'mulch-installation',
    keywords: ['mulch installation ontario', 'garden mulching service toronto'],
  },
  {
    label: 'Weed Removal',
    slug: 'weed-removal',
    keywords: ['weed removal service ontario', 'weed control toronto'],
  },
  {
    label: 'Summer Landscaping',
    slug: 'summer-landscaping',
    keywords: ['landscaping service ontario', 'landscaping toronto', 'landscaping company near me'],
  },
  {
    label: 'Pool Maintenance',
    slug: 'pool-maintenance',
    keywords: ['pool maintenance service ontario', 'pool cleaning toronto', 'pool opening closing ontario'],
  },

  // ── HANDYMAN & GENERAL
  {
    label: 'Handyman',
    slug: 'handyman',
    keywords: ['handyman service ontario', 'handyman toronto', 'handyman near me'],
  },
  {
    label: 'Furniture Assembly',
    slug: 'furniture-assembly',
    keywords: ['furniture assembly service ontario', 'ikea furniture assembly toronto', 'furniture assembly near me'],
  },
  {
    label: 'TV Wall Mounting',
    slug: 'tv-wall-mounting',
    keywords: ['tv wall mounting service ontario', 'tv mounting toronto', 'tv installation near me'],
  },
  {
    label: 'Mirror / Art Hanging',
    slug: 'mirror-art-hanging',
    keywords: ['picture hanging service toronto', 'mirror hanging service ontario'],
  },
  {
    label: 'Junk Removal',
    slug: 'junk-removal',
    keywords: ['junk removal service ontario', 'junk removal toronto', 'junk removal near me'],
  },

  // ── PLUMBING
  {
    label: 'Plumbing Repair',
    slug: 'plumbing-repair',
    keywords: ['plumber ontario', 'plumber toronto', 'plumber near me'],
  },
  {
    label: 'Drain Cleaning / Snaking',
    slug: 'drain-snaking',
    keywords: ['drain cleaning service ontario', 'drain snaking toronto', 'clogged drain near me'],
  },
  {
    label: 'Water Heater Repair',
    slug: 'water-heater-repair',
    keywords: ['water heater repair ontario', 'hot water heater repair toronto'],
  },
  {
    label: 'Sump Pump Service',
    slug: 'sump-pump-service',
    keywords: ['sump pump repair ontario', 'sump pump installation toronto'],
  },
  {
    label: 'Dishwasher Installation',
    slug: 'dishwasher-installation',
    keywords: ['dishwasher installation ontario', 'dishwasher install toronto'],
  },

  // ── ELECTRICAL
  {
    label: 'Electrical Repair',
    slug: 'electrical-repair',
    keywords: ['electrician ontario', 'electrician toronto', 'electrician near me'],
  },
  {
    label: 'EV Charger Installation',
    slug: 'ev-charger-install',
    keywords: ['ev charger installation ontario', 'ev charger install toronto', 'home ev charging station ontario'],
  },
  {
    label: 'Smoke Detector Installation',
    slug: 'smoke-detector-install',
    keywords: ['smoke detector installation ontario', 'smoke alarm install toronto'],
  },
  {
    label: 'Bathroom Fan Replacement',
    slug: 'bathroom-fan-replacement',
    keywords: ['bathroom exhaust fan replacement ontario', 'bathroom fan install toronto'],
  },

  // ── HVAC & ENERGY
  {
    label: 'HVAC Maintenance',
    slug: 'hvac-maintenance',
    keywords: ['furnace repair ontario', 'ac repair toronto', 'hvac service near me'],
  },
  {
    label: 'Attic Insulation',
    slug: 'attic-insulation',
    keywords: ['attic insulation ontario', 'blown in insulation toronto', 'attic insulation cost ontario'],
  },
  {
    label: 'Weather Stripping',
    slug: 'weather-stripping',
    keywords: ['weather stripping installation ontario', 'draft sealing toronto'],
  },
  {
    label: 'Generator Maintenance',
    slug: 'generator-maintenance',
    keywords: ['generator maintenance ontario', 'standby generator repair toronto'],
  },

  // ── SMART HOME & TECH
  {
    label: 'Smart Home Automation',
    slug: 'home-automation',
    keywords: ['smart home automation ontario', 'smart home installation toronto', 'home automation near me'],
  },
  {
    label: 'Smart Home Setup',
    slug: 'smart-home-setup',
    keywords: ['smart home setup ontario', 'nest thermostat installation toronto'],
  },
  {
    label: 'Home Security',
    slug: 'home-security',
    keywords: ['home security camera installation ontario', 'security system install toronto'],
  },
  {
    label: 'Home Theater Setup',
    slug: 'home-theater-setup',
    keywords: ['home theater setup ontario', 'home cinema installation toronto'],
  },
  {
    label: 'Network / WiFi Optimization',
    slug: 'network-wifi-optimization',
    keywords: ['wifi setup service ontario', 'home network setup toronto', 'mesh wifi installation ontario'],
  },
  {
    label: 'Central Vacuum Repair',
    slug: 'central-vacuum-repair',
    keywords: ['central vacuum repair ontario', 'central vac repair toronto'],
  },

  // ── PAINTING
  {
    label: 'Interior Painting',
    slug: 'interior-painting',
    keywords: ['interior painting service ontario', 'interior painters toronto', 'house painting near me'],
  },
  {
    label: 'Exterior Painting',
    slug: 'exterior-painting',
    keywords: ['exterior painting service ontario', 'exterior painters toronto', 'house exterior paint near me'],
  },

  // ── FLOORING
  {
    label: 'Hardwood Floor Refinishing',
    slug: 'hardwood-refinishing',
    keywords: ['hardwood floor refinishing ontario', 'hardwood floor sanding toronto', 'floor refinishing near me'],
  },
  {
    label: 'Vinyl Plank Flooring Installation',
    slug: 'vinyl-plank-install',
    keywords: ['vinyl plank flooring installation ontario', 'lvp flooring install toronto'],
  },
  {
    label: 'Carpet Installation',
    slug: 'carpet-installation',
    keywords: ['carpet installation ontario', 'carpet install toronto', 'carpet installer near me'],
  },
  {
    label: 'Floor Tiling',
    slug: 'floor-tiling',
    keywords: ['tile floor installation ontario', 'floor tile install toronto'],
  },

  // ── KITCHEN & BATH
  {
    label: 'Cabinet Refacing',
    slug: 'cabinet-refacing',
    keywords: ['cabinet refacing ontario', 'kitchen cabinet refacing toronto', 'cabinet refinishing near me'],
  },
  {
    label: 'Backsplash Installation',
    slug: 'backsplash-installation',
    keywords: ['backsplash installation ontario', 'tile backsplash install toronto'],
  },
  {
    label: 'Bathtub Reglazing',
    slug: 'bathtub-reglazing',
    keywords: ['bathtub reglazing ontario', 'tub refinishing toronto', 'bathtub resurfacing near me'],
  },
  {
    label: 'Shower Door Installation',
    slug: 'shower-door-install',
    keywords: ['shower door installation ontario', 'frameless shower door toronto'],
  },
  {
    label: 'Kitchen Hood Installation',
    slug: 'kitchen-hood-install',
    keywords: ['range hood installation ontario', 'kitchen hood install toronto'],
  },
  {
    label: 'Kitchen Renovation',
    slug: 'kitchen-renovation',
    keywords: ['kitchen renovation ontario', 'kitchen remodel toronto', 'kitchen renovation cost ontario'],
  },
  {
    label: 'Bathroom Renovation',
    slug: 'bathroom-renovation',
    keywords: ['bathroom renovation ontario', 'bathroom remodel toronto', 'bathroom renovation cost ontario'],
  },

  // ── RENOVATION & STRUCTURAL
  {
    label: 'Basement Renovation',
    slug: 'basement-renovation',
    keywords: ['basement renovation ontario', 'basement finishing toronto', 'basement renovation cost ontario'],
  },
  {
    label: 'Roofing Repairs',
    slug: 'roofing-repairs',
    keywords: ['roof repair ontario', 'roofing repair toronto', 'roofer near me'],
  },
  {
    label: 'Foundation Repair',
    slug: 'foundation-repair',
    keywords: ['foundation repair ontario', 'basement waterproofing toronto', 'foundation crack repair near me'],
  },
  {
    label: 'Window Installation',
    slug: 'window-installation',
    keywords: ['window installation ontario', 'window replacement toronto', 'new windows near me'],
  },
  {
    label: 'Siding Repair',
    slug: 'siding-repair',
    keywords: ['siding repair ontario', 'vinyl siding repair toronto', 'siding installation near me'],
  },
  {
    label: 'Garage Door Repair',
    slug: 'garage-door-repair',
    keywords: ['garage door repair ontario', 'garage door repair toronto', 'garage door service near me'],
  },
  {
    label: 'Appliance Repair',
    slug: 'appliance-repair',
    keywords: ['appliance repair service ontario', 'appliance repair toronto', 'fridge repair near me'],
  },

  // ── OUTDOOR STRUCTURES
  {
    label: 'Deck Building',
    slug: 'deck-building',
    keywords: ['deck building ontario', 'deck contractor toronto', 'deck construction near me'],
  },
  {
    label: 'Deck Staining',
    slug: 'deck-staining',
    keywords: ['deck staining ontario', 'deck stain refinish toronto'],
  },
  {
    label: 'Deck Sealing',
    slug: 'deck-sealing',
    keywords: ['deck sealing ontario', 'deck waterproofing toronto'],
  },
  {
    label: 'Fence Installation',
    slug: 'fence-installation',
    keywords: ['fence installation ontario', 'fence contractor toronto', 'fencing near me'],
  },
  {
    label: 'Interlock / Paving Stone',
    slug: 'interlock-repair',
    keywords: ['interlock installation ontario', 'paving stone toronto', 'interlock repair near me'],
  },

  // ── SPECIALTY
  {
    label: 'Pest Control',
    slug: 'pest-control',
    keywords: ['pest control service ontario', 'exterminator toronto', 'pest control near me'],
  },
  {
    label: 'Locksmith Services',
    slug: 'locksmith-services',
    keywords: ['locksmith ontario', 'locksmith toronto', 'locksmith near me'],
  },
  {
    label: 'Interior Design',
    slug: 'interior-design',
    keywords: ['interior design service ontario', 'interior designer toronto', 'interior decorator near me'],
  },
  {
    label: 'Holiday Light Installation',
    slug: 'holiday-light-install',
    keywords: ['christmas light installation ontario', 'holiday lights install toronto'],
  },
  {
    label: 'Septic Tank Inspection',
    slug: 'septic-tank-inspection',
    keywords: ['septic inspection ontario', 'septic tank inspection toronto', 'septic system inspection near me'],
  },
  {
    label: 'Septic Installation',
    slug: 'septic-installation',
    keywords: ['septic system installation ontario', 'septic tank installation rural ontario'],
  },
  {
    label: 'Baseboard Install',
    slug: 'baseboard-install',
    keywords: ['baseboard installation ontario', 'baseboard trim install toronto'],
  },
  {
    label: 'Closet Organization',
    slug: 'closet-organization',
    keywords: ['closet organizer ontario', 'custom closet toronto', 'closet organization near me'],
  },
];

// ── SERP competitors to watch ─────────────────────────────────────────────────
const WATCH = ['homestars.com','bark.com','jiffy.com','angi.com','kijiji.ca',
               'thumbtack.com','homeadvisor.com','yelp.ca','yellowpages.ca',
               'houzz.com','reddit.com','protasker.ca'];

// ── SCRAPE ────────────────────────────────────────────────────────────────────
async function getSERP(pg, keyword) {
  process.stdout.write(`  → ${keyword.padEnd(55)} `);
  try {
    await pg.goto(
      `https://www.semrush.com/analytics/keywordoverview/?q=${encodeURIComponent(keyword)}&db=${DB}`,
      { waitUntil: 'networkidle2', timeout: 45000 }
    );
    await sleep(5000);

    const d = await pg.evaluate((kw, watch) => {
      const r = { keyword: kw, volume: '', kd: '', cpc: '', serpOwners: [] };
      const lines = document.body.innerText.split('\n').map(l => l.trim()).filter(Boolean);
      for (let i = 0; i < lines.length - 1; i++) {
        const label = lines[i], value = lines[i + 1];
        if (!value || value === 'n/a') continue;
        if (label === 'Volume' && /^[\d,]+$/.test(value) && !r.volume) r.volume = value;
        if (label === 'Keyword Difficulty' && /^\d+%?$/.test(value) && !r.kd) r.kd = value.replace('%', '');
        if (label === 'CPC' && /^[\d.$]+$/.test(value) && !r.cpc) r.cpc = value.startsWith('$') ? value : '$' + value;
      }
      // Extract SERP domains from links
      const seen = new Set();
      document.querySelectorAll('a[href^="http"]').forEach(a => {
        try {
          const host = new URL(a.href).hostname.replace(/^www\./, '');
          if (!seen.has(host) && host.includes('.') && host.length > 3) {
            seen.add(host);
            if (watch.some(w => host.includes(w.replace(/^www\./,''))))
              r.serpOwners.push(host);
          }
        } catch (_) {}
      });
      return r;
    }, keyword, WATCH);

    console.log(`vol=${d.volume||'?'} kd=${d.kd||'?'} cpc=${d.cpc||'?'} serp=[${d.serpOwners.slice(0,5).join(',')}]`);
    await sleep(2000);
    return d;
  } catch (e) {
    console.log(`ERROR: ${e.message.substring(0, 60)}`);
    return { keyword, volume: '', kd: '', cpc: '', serpOwners: [] };
  }
}

// ── MAIN ─────────────────────────────────────────────────────────────────────
async function main() {
  console.log('Connecting to Chrome...');
  const browser = await puppeteer.connect({ browserURL: 'http://localhost:9222', protocolTimeout: 60000 });
  const pg = await browser.newPage();
  pg.setDefaultTimeout(50000);
  await pg.setRequestInterception(true);
  pg.on('request', req => {
    try {
      if (['image', 'font', 'media'].includes(req.resourceType())) req.abort();
      else req.continue();
    } catch (_) {}
  });

  // Verify login
  await pg.goto('https://www.semrush.com/dashboard/', { waitUntil: 'networkidle2', timeout: 30000 });
  await sleep(3000);
  console.log('✅ SEMrush connected\n');

  const allResults = {}; // slug → { label, rows: [{keyword, volume, kd, cpc, serpOwners}] }

  // Progress tracking
  const total = SERVICES.reduce((s, svc) => s + svc.keywords.length, 0);
  let done = 0;
  console.log(`Starting: ${SERVICES.length} services, ${total} keywords total\n`);

  for (const svc of SERVICES) {
    console.log(`\n▶ ${svc.label} (${svc.slug})`);
    const rows = [];
    for (const kw of svc.keywords) {
      const row = await getSERP(pg, kw);
      rows.push(row);
      done++;
      // Save checkpoint every 20 keywords
      if (done % 20 === 0) {
        allResults[svc.slug] = { label: svc.label, rows };
        saveReport(allResults);
        console.log(`  ✓ Checkpoint saved (${done}/${total})`);
      }
    }
    allResults[svc.slug] = { label: svc.label, rows };
  }

  saveReport(allResults);
  console.log(`\n✅ Complete. Saved to ${OUT}`);
  try { await pg.close(); } catch (_) {}
  browser.disconnect();
}

// ── REPORT BUILDER ────────────────────────────────────────────────────────────
function saveReport(allResults) {
  const date = new Date().toISOString().split('T')[0];
  const sections = Object.values(allResults);

  // Build summary: top opportunities (vol > 500, KD < 30)
  const opportunities = [];
  sections.forEach(({ label, rows }) => {
    rows.forEach(r => {
      const vol = parseInt(r.volume?.replace(/,/g, '') || '0');
      const kd  = parseInt(r.kd || '100');
      if (vol >= 200 && kd <= 35) {
        opportunities.push({ label, keyword: r.keyword, vol, kd, cpc: r.cpc, serp: r.serpOwners.join(', ') });
      }
    });
  });
  opportunities.sort((a, b) => (b.vol / (b.kd + 1)) - (a.vol / (a.kd + 1)));

  let md = `# Protasker.ca — Service Keyword Research\n`;
  md += `*Generated: ${date} | ${sections.length} services | Canada (ca) database*\n\n`;

  // Quick wins summary table
  md += `---\n\n## TOP OPPORTUNITIES (vol ≥ 200, KD ≤ 35)\n\n`;
  md += `| Service | Keyword | Vol | KD | CPC | SERP Owners |\n`;
  md += `|---|---|---|---|---|---|\n`;
  opportunities.slice(0, 40).forEach(o => {
    md += `| ${o.label} | ${o.keyword} | ${o.vol.toLocaleString()} | ${o.kd} | ${o.cpc} | ${o.serp} |\n`;
  });

  // Per-service sections
  md += `\n---\n\n## SERVICE-BY-SERVICE BREAKDOWN\n\n`;
  sections.forEach(({ label, rows }) => {
    md += `### ${label}\n`;
    md += `| Keyword | Vol | KD | CPC | SERP |\n`;
    md += `|---|---|---|---|---|\n`;
    rows.forEach(r => {
      const serpShort = r.serpOwners.slice(0, 4).map(s =>
        s.replace('homestars.com','HomeStars').replace('bark.com','Bark')
         .replace('jiffy.com','Jiffy').replace('kijiji.ca','Kijiji')
         .replace('yelp.ca','Yelp').replace('houzz.com','Houzz')
         .replace('reddit.com','Reddit').replace('protasker.ca','PROTASKER ✓')
      ).join(', ');
      md += `| ${r.keyword} | ${r.volume||'—'} | ${r.kd||'—'} | ${r.cpc||'—'} | ${serpShort} |\n`;
    });
    md += '\n';
  });

  writeFileSync(OUT, md, 'utf8');
}

main().catch(e => { console.error('Fatal:', e.message); process.exit(1); });
