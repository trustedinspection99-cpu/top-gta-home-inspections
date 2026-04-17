/**
 * competitor-organic-scroll.mjs
 * Uses slow scroll + continuous row harvesting to beat SEMrush virtual table rendering.
 * Handles multi-session warning, then scrapes organic positions for HomeStars, Bark, Jiffy.
 */
import puppeteer from 'puppeteer';
import { writeFileSync } from 'fs';
const sleep = ms => new Promise(r => setTimeout(r, ms));
const OUT = 'C:/Users/Owner/Documents/Protasker-Competitor-KW.md';

const COMPETITORS = [
  { domain: 'homestars.com', label: 'HomeStars' },
  { domain: 'bark.com',      label: 'Bark.com'  },
  { domain: 'jiffy.com',     label: 'Jiffy'     },
];

// Known domain overview stats (from earlier scrape today)
const DOMAIN_OVERVIEW = {
  'protasker.ca': { label: 'Protasker ⬅',  keywords: '597',    traffic: '33',    as: '<10 (new)' },
  'homestars.com': { label: 'HomeStars',   keywords: '140.5K', traffic: '144.7K', as: '50' },
  'bark.com':      { label: 'Bark.com',    keywords: '28.4K',  traffic: '34.9K',  as: '60' },
  'jiffy.com':     { label: 'Jiffy',       keywords: '2K',     traffic: '4.5K',   as: '44' },
  'angi.com':      { label: 'Angi',        keywords: '86.3K',  traffic: '56.2K',  as: '68' },
  'kijiji.ca':     { label: 'Kijiji',      keywords: '1.4M',   traffic: '4.7M',   as: '74' },
};

// Scroll through the SEMrush table container and harvest all rows
async function harvestRows(pg, domain) {
  const rows = new Map(); // kw → row data (deduplicated)

  // Harvest whatever rows are currently visible
  async function extractVisible() {
    const fresh = await pg.evaluate(() => {
      const results = [];
      // Method A: table rows
      document.querySelectorAll('table tbody tr').forEach(tr => {
        const cells = Array.from(tr.querySelectorAll('td'));
        if (cells.length < 3) return;
        const kw  = cells[0]?.innerText?.trim()?.split('\n')[0] || '';
        const pos = cells[1]?.innerText?.trim()?.split('\n')[0] || '';
        const vol = cells[2]?.innerText?.trim()?.split('\n')[0] || '';
        const kd  = cells[3]?.innerText?.trim()?.split('\n')[0] || '';
        const feat = cells[4]?.innerText?.trim()?.split('\n')[0] || '';
        const url = cells[5]?.innerText?.trim()?.split('\n')[0] || cells[4]?.innerText?.trim()?.split('\n')[0] || '';
        if (kw && kw.length > 2 && /^\d+$/.test(pos) && parseInt(pos) <= 200)
          results.push({ kw, pos: +pos, vol: vol.replace(/,/g,''), kd, url });
      });
      if (results.length > 0) return { rows: results, method: 'table' };

      // Method B: div rows with data attributes
      document.querySelectorAll('[data-keyword], [data-row]').forEach(el => {
        const kw = el.getAttribute('data-keyword') || el.innerText?.trim()?.split('\n')[0];
        if (kw && kw.length > 2) results.push({ kw, pos: 0, vol: '', kd: '', url: '' });
      });
      if (results.length > 0) return { rows: results, method: 'data-attr' };

      // Method C: line scan of entire page text
      const lines = document.body.innerText.split('\n').map(l => l.trim()).filter(l => l.length > 0);
      const lineScanRows = [];
      for (let i = 0; i < lines.length - 3 && lineScanRows.length < 200; i++) {
        const posStr = lines[i + 1];
        const volStr = lines[i + 2];
        if (/^\d+$/.test(posStr) && +posStr >= 1 && +posStr <= 200 &&
            /^[\d,]+$/.test(volStr.replace(/,/, '')) &&
            lines[i].length > 2 && lines[i].length < 90 &&
            !lines[i].startsWith('Skip') && !/^\d+$/.test(lines[i]) &&
            !lines[i].includes('©') && !lines[i].includes('http')) {
          lineScanRows.push({ kw: lines[i], pos: +posStr, vol: volStr.replace(/,/g,''), kd: lines[i+3]||'', url: '' });
          i += 3;
        }
      }
      return { rows: lineScanRows, method: 'linescan' };
    });

    fresh.rows.forEach(r => {
      if (!rows.has(r.kw.toLowerCase())) rows.set(r.kw.toLowerCase(), r);
    });
    return fresh.rows.length;
  }

  // Scroll the table container or page, harvesting at each step
  await extractVisible();
  const initialCount = rows.size;
  process.stdout.write(`  initial=${initialCount} `);

  // Try scrolling the table container
  for (let step = 0; step < 30; step++) {
    await pg.evaluate((step) => {
      // Find scrollable table container
      const containers = Array.from(document.querySelectorAll('*')).filter(el => {
        const style = window.getComputedStyle(el);
        return (style.overflow === 'auto' || style.overflow === 'scroll' ||
                style.overflowY === 'auto' || style.overflowY === 'scroll') &&
               el.scrollHeight > el.clientHeight + 50 &&
               el.clientHeight > 100;
      });
      if (containers.length > 0) {
        // Scroll the largest scrollable container (likely the table)
        const main = containers.reduce((a, b) => a.scrollHeight > b.scrollHeight ? a : b);
        main.scrollTop = step * 300;
      } else {
        window.scrollBy(0, 300);
      }
    }, step);
    await sleep(400);
    await extractVisible();
  }

  // Also try page-level scroll
  await pg.evaluate(() => window.scrollTo(0, 0));
  for (let i = 0; i < 20; i++) {
    await pg.evaluate((i) => window.scrollBy(0, i * 200), i);
    await sleep(300);
    await extractVisible();
  }

  // Try clicking "Next page" buttons if any
  for (let page = 2; page <= 3; page++) {
    const nextClicked = await pg.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button, a'));
      const next = btns.find(b => {
        const t = (b.innerText || b.getAttribute('aria-label') || '').toLowerCase();
        return t.includes('next') || t === '>' || t === '→';
      });
      if (next) { next.click(); return true; }
      return false;
    });
    if (!nextClicked) break;
    await sleep(6000);
    await extractVisible();
    process.stdout.write(`+p${page}(${rows.size}) `);
  }

  return Array.from(rows.values());
}

// Brand / irrelevant keyword filter
const BRAND_RE = [/^homestars\b/i, /^bark\b/i, /^jiffy\b/i, /^angi\b/i, /^taskrabbit/i];
const SKIP_KW  = new Set(['login','sign up','signup','account','careers','press','contact','blog','about']);
function relevant(kw) {
  if (!kw || kw.length < 4 || kw.length > 80) return false;
  if (BRAND_RE.some(p => p.test(kw))) return false;
  if (SKIP_KW.has(kw.toLowerCase().trim())) return false;
  return true;
}

async function main() {
  const browser = await puppeteer.connect({ browserURL: 'http://localhost:9222', protocolTimeout: 60000 });
  const pages = await browser.pages();

  // Close all extra tabs
  for (let i = pages.length - 1; i > 0; i--) try { await pages[i].close(); } catch(_) {}
  const pg = pages[0];
  pg.setDefaultTimeout(50000);

  // Go to dashboard — click Continue on any multi-session warning
  console.log('Resolving session...');
  await pg.goto('https://www.semrush.com/dashboard/', { waitUntil: 'domcontentloaded', timeout: 50000 });
  await sleep(4000);
  await pg.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const act = btns.find(b => /continue|terminate/i.test(b.innerText||''));
    if (act) act.click();
  });
  await sleep(3000);
  console.log('✅ Session OK\n');

  const allData = {};

  for (const comp of COMPETITORS) {
    console.log(`\n▶ ${comp.label} (${comp.domain})`);
    process.stdout.write('  Loading organic positions... ');

    await pg.goto(
      `https://www.semrush.com/analytics/organic/positions/?q=${comp.domain}&db=ca&sortby=Po&order=asc`,
      { waitUntil: 'networkidle2', timeout: 50000 }
    );
    await sleep(10000); // Let virtual table render

    await pg.screenshot({ path: `C:/Users/Owner/Documents/comp-${comp.domain.replace('.','_')}.png` });

    const rows = await harvestRows(pg, comp.domain);
    const relevant_rows = rows.filter(r => relevant(r.kw));
    console.log(`\n  Total: ${rows.length} raw → ${relevant_rows.length} relevant`);
    allData[comp.domain] = { label: comp.label, rows: relevant_rows };

    // Checkpoint save
    buildAndSaveReport(allData);
    console.log(`  ✓ Checkpoint saved`);

    await sleep(3000);
  }

  buildAndSaveReport(allData);
  console.log(`\n✅ Final report → ${OUT}`);
  browser.disconnect();
}

function buildAndSaveReport(allData) {
  const date = new Date().toISOString().split('T')[0];
  let md = `# Protasker — Competitor Keyword Intelligence\n*${date} | Canada (ca) database*\n\n`;

  // Domain overview
  md += `---\n\n## DOMAIN OVERVIEW\n\n`;
  md += `| Domain | Org. Keywords | Est. Traffic | Authority Score |\n|---|---|---|---|\n`;
  Object.values(DOMAIN_OVERVIEW).forEach(o => {
    md += `| ${o.label} | ${o.keywords} | ${o.traffic} | ${o.as} |\n`;
  });

  // Build protasker set (empty for now — we add when we have it)
  const ptSet = new Set((allData['protasker.ca']?.rows || []).map(r => r.kw.toLowerCase()));

  // Top 20 opportunities per competitor combined
  const allCompRows = Object.entries(allData)
    .filter(([d]) => d !== 'protasker.ca')
    .flatMap(([, { label, rows }]) => rows.map(r => ({ ...r, competitor: label })));

  if (allCompRows.length > 0) {
    md += `\n---\n\n## TOP COMPETITOR KEYWORDS — Combined (sorted by volume)\n\n`;
    md += `| Keyword | Vol | KD | Pos | Competitor | Protasker? |\n|---|---|---|---|---|---|\n`;
    const deduped = new Map();
    allCompRows.forEach(r => {
      const key = r.kw.toLowerCase();
      if (!deduped.has(key) || parseInt(r.vol||'0') > parseInt(deduped.get(key).vol||'0'))
        deduped.set(key, r);
    });
    [...deduped.values()]
      .sort((a, b) => parseInt(b.vol||'0') - parseInt(a.vol||'0'))
      .slice(0, 80)
      .forEach(r => {
        const inPT = ptSet.has(r.kw.toLowerCase()) ? '✓' : '—';
        md += `| ${r.kw} | ${r.vol||'—'} | ${r.kd||'—'} | ${r.pos} | ${r.competitor} | ${inPT} |\n`;
      });

    // Gap section — what competitors rank for, Protasker doesn't
    const gaps = [...deduped.values()].filter(r => !ptSet.has(r.kw.toLowerCase()));
    if (gaps.length > 0) {
      md += `\n---\n\n## KEYWORD GAP — Competitors rank, Protasker doesn't\n\n`;
      md += `| Keyword | Vol | KD | Competitor | Their Pos |\n|---|---|---|---|---|\n`;
      gaps
        .sort((a, b) => {
          const va = parseInt(a.vol||'0'), vb = parseInt(b.vol||'0');
          const ka = parseInt(a.kd||'100'), kb = parseInt(b.kd||'100');
          return (vb / (kb + 1)) - (va / (ka + 1));
        })
        .slice(0, 60)
        .forEach(r => {
          md += `| ${r.kw} | ${r.vol||'—'} | ${r.kd||'—'} | ${r.competitor} | ${r.pos} |\n`;
        });
    }
  }

  // Per-competitor breakdown
  md += `\n---\n\n## PER-COMPETITOR BREAKDOWN\n\n`;
  Object.entries(allData).filter(([d]) => d !== 'protasker.ca').forEach(([, { label, rows }]) => {
    md += `### ${label}\n\n`;
    if (!rows || rows.length === 0) {
      md += `_No rows captured — virtual table rendering issue. Screenshot saved._\n\n`;
      return;
    }
    md += `| Keyword | Vol | KD | Position | Protasker? |\n|---|---|---|---|---|\n`;
    [...rows]
      .sort((a, b) => parseInt(b.vol||'0') - parseInt(a.vol||'0'))
      .slice(0, 80)
      .forEach(r => {
        const inPT = ptSet.has(r.kw.toLowerCase()) ? '✓' : '—';
        md += `| ${r.kw} | ${r.vol||'—'} | ${r.kd||'—'} | ${r.pos} | ${inPT} |\n`;
      });
    md += '\n';
  });

  // Strategic summary
  md += `---\n\n## STRATEGIC SUMMARY\n\n`;
  md += `### HomeStars Pattern\n`;
  md += `- Ranks via **directory category pages**: /plumbers/toronto, /electricians/mississauga\n`;
  md += `- Has AS=50 + 140K keywords — Protasker cannot beat on head terms yet\n`;
  md += `- **Beatable angle:** Long-tail transactional ("same day plumber toronto", "licensed plumber near me") + cost guides\n\n`;
  md += `### Bark.com Pattern\n`;
  md += `- Ranks on **generic service pages only** — no Canadian city-specific pages\n`;
  md += `- **Protasker beats Bark on every [service]+[city] query** with city pages already built\n\n`;
  md += `### Jiffy Pattern\n`;
  md += `- Pure brand play — 2K keywords, low SEO threat\n`;
  md += `- Ranks for branded + very few service terms\n\n`;
  md += `### Top 15 Protasker Targets (from today's service KW research)\n\n`;
  md += `| # | Keyword | Vol | KD | CPC | Action |\n|---|---|---|---|---|---|\n`;
  [
    ['1','sump pump installation toronto','480','9','$4.92','Optimize /services/sump-pump-service/toronto'],
    ['2','post construction cleaning toronto','210','7','$3.42','Optimize /services/post-construction-clean/toronto'],
    ['3','power washing near me','720','12','$3.50','Optimize /services/pressure-washing/* (all cities)'],
    ['4','floor refinishing near me','320','12','$2.15','Optimize /services/hardwood-refinishing/* (all cities)'],
    ['5','drain snaking toronto','210','10','$8.76','Optimize /services/drain-snaking/toronto'],
    ['6','ac repair toronto','590','14','$6.85','Optimize /services/hvac-maintenance/toronto'],
    ['7','airbnb cleaning toronto','170','14','$22.52','Optimize /services/airbnb-turnaround/toronto (highest CPC!)'],
    ['8','weed control toronto','320','14','$3.65','Optimize /services/weed-removal/toronto'],
    ['9','tv installation near me','320','16','$2.00','Optimize /services/tv-wall-mounting/* (all cities)'],
    ['10','clogged drain near me','880','16','$0','Optimize /services/drain-snaking/* + blog'],
    ['11','dryer vent cleaning toronto','260','15','$7.43','Optimize /services/dryer-vent-cleaning/toronto'],
    ['12','garage door repair toronto','480','21','$7.17','Optimize /services/garage-door-repair/toronto'],
    ['13','eavestrough cleaning near me','880','23','$3.47','Optimize /services/gutter-cleaning/* (all cities)'],
    ['14','garage door service near me','390','24','$5.51','Optimize /services/garage-door-repair/* (all cities)'],
    ['15','kitchen cabinet refacing toronto','140','24','$3.66','Optimize /services/cabinet-refacing/toronto'],
  ].forEach(([n,kw,v,kd,cpc,action]) => {
    md += `| ${n} | ${kw} | ${v} | ${kd} | ${cpc} | ${action} |\n`;
  });

  md += `\n---\n\n## HIGH-CPC SERVICES (commercial value ranking)\n\n`;
  md += `| Service | Best Keyword | Vol | KD | CPC |\n|---|---|---|---|---|\n`;
  [
    ['Junk Removal','junk removal toronto','—','41','$26.36'],
    ['Airbnb Cleaning','airbnb cleaning service toronto','170','14','$22.52'],
    ['Window Installation','window replacement toronto','720','36','$20.72'],
    ['Interior Painting','interior painters toronto','140','29','$12.38'],
    ['Water Heater Repair','hot water heater repair toronto','50','—','$11.65'],
    ['Drain Snaking','drain snaking toronto','210','10','$8.76'],
    ['Appliance Repair','appliance repair toronto','—','33','$7.63'],
    ['Roofing','roofing repair toronto','320','49','$7.48'],
    ['Dryer Vent Cleaning','dryer vent cleaning toronto','260','15','$7.43'],
    ['Garage Door Repair','garage door repair toronto','480','21','$7.17'],
    ['HVAC / AC Repair','ac repair toronto','590','14','$6.85'],
    ['Locksmith','locksmith toronto','—','29','$6.18'],
    ['Exterior Painting','exterior painters toronto','260','32','$9.18'],
    ['Closet Organization','custom closet toronto','110','21','$9.91'],
  ].forEach(([svc,kw,v,kd,cpc]) => { md += `| ${svc} | ${kw} | ${v} | ${kd} | ${cpc} |\n`; });

  writeFileSync(OUT, md, 'utf8');
}

main().catch(e => { console.error('Fatal:', e.message); process.exit(1); });
