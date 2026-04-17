/**
 * protasker-kw-missing.mjs
 * Fill in the 8 services that failed with detached frame errors.
 * Also handles competitor keyword gap via the gap tool UI.
 */

import puppeteer from 'puppeteer';
import { readFileSync, writeFileSync } from 'fs';
const sleep = ms => new Promise(r => setTimeout(r, ms));

const SERVICE_OUT = 'C:/Users/Owner/Documents/Protasker-Service-Keywords.md';
const COMP_OUT    = 'C:/Users/Owner/Documents/Protasker-Competitor-KW.md';
const DB = 'ca';

const MISSING_SERVICES = [
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

async function getSERP(pg, keyword) {
  process.stdout.write(`  → ${keyword.padEnd(55)} `);
  try {
    await pg.goto(
      `https://www.semrush.com/analytics/keywordoverview/?q=${encodeURIComponent(keyword)}&db=${DB}`,
      { waitUntil: 'networkidle2', timeout: 40000 }
    );
    await sleep(5000);
    const d = await pg.evaluate((kw) => {
      const r = { keyword: kw, volume: '', kd: '', cpc: '' };
      const lines = document.body.innerText.split('\n').map(l => l.trim()).filter(Boolean);
      for (let i = 0; i < lines.length - 1; i++) {
        const label = lines[i], value = lines[i + 1];
        if (!value || value === 'n/a') continue;
        if (label === 'Volume' && /^[\d,]+$/.test(value) && !r.volume) r.volume = value;
        if (label === 'Keyword Difficulty' && /^\d+%?$/.test(value) && !r.kd) r.kd = value.replace('%','');
        if (label === 'CPC' && /^[\d.$]+$/.test(value) && !r.cpc) r.cpc = value.startsWith('$') ? value : '$'+value;
      }
      return r;
    }, keyword);
    console.log(`vol=${d.volume||'?'} kd=${d.kd||'?'} cpc=${d.cpc||'?'}`);
    await sleep(2000);
    return d;
  } catch(e) {
    console.log(`ERROR: ${e.message.substring(0,50)}`);
    return { keyword, volume: '', kd: '', cpc: '' };
  }
}

async function main() {
  console.log('Connecting...');
  const browser = await puppeteer.connect({ browserURL: 'http://localhost:9222', protocolTimeout: 60000 });
  const pg = await browser.newPage();
  pg.setDefaultTimeout(45000);
  await pg.setRequestInterception(true);
  pg.on('request', req => {
    try {
      if (['image','font','media'].includes(req.resourceType())) req.abort();
      else req.continue();
    } catch(_) {}
  });

  await pg.goto('https://www.semrush.com/dashboard/', { waitUntil: 'networkidle2', timeout: 30000 });
  await sleep(3000);
  console.log('✅ Connected\n');

  // ── Part 1: Fill missing service keywords ────────────────────────────────
  console.log('── PART 1: Missing service keywords ──\n');
  const newSections = [];
  for (const svc of MISSING_SERVICES) {
    console.log(`\n▶ ${svc.label}`);
    const rows = [];
    for (const kw of svc.keywords) {
      rows.push(await getSERP(pg, kw));
    }
    newSections.push({ label: svc.label, rows });
  }

  // Append to existing service keywords report
  let existing = readFileSync(SERVICE_OUT, 'utf8');
  // Remove trailing newlines
  existing = existing.trimEnd();

  let append = '\n\n';
  newSections.forEach(({ label, rows }) => {
    append += `### ${label}\n| Keyword | Vol | KD | CPC | SERP |\n|---|---|---|---|---|\n`;
    rows.forEach(r => {
      append += `| ${r.keyword} | ${r.volume||'—'} | ${r.kd||'—'} | ${r.cpc||'—'} |  |\n`;
    });
    append += '\n';
  });

  // Rebuild top opportunities from ALL data
  const allLines = (existing + append).split('\n');
  const allRows = [];
  let currentSection = '';
  for (const line of allLines) {
    if (line.startsWith('### ')) currentSection = line.replace('### ','').trim();
    const m = line.match(/^\| ([^|]+) \| ([\d,]+) \| (\d+) \| (\$[\d.]+) \|/);
    if (m) {
      allRows.push({ label: currentSection, keyword: m[1].trim(), vol: parseInt(m[2].replace(/,/g,'')), kd: parseInt(m[3]), cpc: m[4] });
    }
  }

  // Sort by vol / (kd+1)
  const opps = allRows.filter(r => r.vol >= 200 && r.kd <= 35)
    .sort((a,b) => (b.vol/(b.kd+1)) - (a.vol/(a.kd+1)));

  // Rebuild top opps table
  let topOpps = `---\n\n## TOP OPPORTUNITIES (vol ≥ 200, KD ≤ 35)\n\n`;
  topOpps += `| Service | Keyword | Vol | KD | CPC | SERP Owners |\n|---|---|---|---|---|---|\n`;
  opps.forEach(o => {
    topOpps += `| ${o.label} | ${o.keyword} | ${o.vol.toLocaleString()} | ${o.kd} | ${o.cpc} |  |\n`;
  });

  // Replace old top opps section
  const finalReport = (existing + append).replace(
    /---\n\n## TOP OPPORTUNITIES[\s\S]*?---\n\n## SERVICE-BY-SERVICE/,
    topOpps + '\n---\n\n## SERVICE-BY-SERVICE'
  );
  writeFileSync(SERVICE_OUT, finalReport, 'utf8');
  console.log(`\n✅ Service keywords updated → ${SERVICE_OUT}`);

  // ── Part 2: Competitor keyword gap tool ─────────────────────────────────
  console.log('\n── PART 2: Competitor keyword gap ──\n');
  await pg.goto('https://www.semrush.com/analytics/keywordgap/?rankType=common',
    { waitUntil: 'networkidle2', timeout: 30000 });
  await sleep(5000);
  await pg.screenshot({ path: 'C:/Users/Owner/Documents/protasker-gap-page.png' });

  const gapPageState = await pg.evaluate(() => ({
    url: window.location.href,
    title: document.title,
    text: document.body.innerText.substring(0, 1000),
    inputs: Array.from(document.querySelectorAll('input[type="text"], input[placeholder], input:not([type])')).map(i => ({
      id: i.id || '', placeholder: i.placeholder || '', name: i.name || '', value: i.value || ''
    }))
  }));
  console.log('Gap page:', gapPageState.title, gapPageState.url);
  console.log('Inputs:', JSON.stringify(gapPageState.inputs.slice(0,8), null, 2));
  console.log('Text preview:', gapPageState.text.substring(0, 300));

  // Try to fill in domains
  let gapData = null;
  try {
    // Look for domain input fields
    await pg.waitForSelector('input', { timeout: 5000 });
    const allInputs = await pg.$$('input');
    console.log(`Found ${allInputs.length} inputs`);

    if (allInputs.length >= 2) {
      // First input: our domain
      await allInputs[0].click({ clickCount: 3 });
      await pg.keyboard.type('protasker.ca');
      await sleep(1500);

      // Second input: first competitor
      await allInputs[1].click({ clickCount: 3 });
      await pg.keyboard.type('homestars.com');
      await sleep(1500);

      // Third input if available: bark.com
      if (allInputs.length >= 3) {
        await allInputs[2].click({ clickCount: 3 });
        await pg.keyboard.type('bark.com');
        await sleep(1500);
      }

      // Find and click Compare button
      const clicked = await pg.evaluate(() => {
        const btns = Array.from(document.querySelectorAll('button'));
        const compareBtn = btns.find(b => {
          const t = (b.innerText || b.textContent || '').toLowerCase();
          return t.includes('compar') || t.includes('search') || t.includes('analyz') || b.type === 'submit';
        });
        if (compareBtn) { compareBtn.click(); return compareBtn.innerText; }
        return null;
      });
      console.log('Clicked button:', clicked);
      if (clicked) {
        await sleep(15000);
        await pg.screenshot({ path: 'C:/Users/Owner/Documents/protasker-gap-results.png' });

        // Scrape gap results
        gapData = await pg.evaluate(() => {
          const rows = [];
          document.querySelectorAll('table tbody tr').forEach((tr, i) => {
            if (i >= 100) return;
            const tds = Array.from(tr.querySelectorAll('td'));
            const kw  = tds[0]?.innerText?.trim()?.split('\n')[0] || '';
            const vol = tds[1]?.innerText?.trim()?.split('\n')[0] || '';
            const kd  = tds[2]?.innerText?.trim()?.split('\n')[0] || '';
            if (kw && kw.length > 2 && vol) rows.push({ kw, vol, kd });
          });
          if (rows.length > 0) return rows;

          // Line scan fallback
          const lines = document.body.innerText.split('\n').map(l => l.trim()).filter(Boolean);
          const result = [];
          for (let i = 0; i < lines.length - 2; i++) {
            const vol = lines[i+1], kd = lines[i+2];
            if (/^[\d,]+$/.test(vol.replace(/,/g,'')) && parseInt(vol.replace(/,/g,'')) > 0 &&
                /^\d+$/.test(kd) && lines[i].length > 3 && lines[i].length < 80 &&
                !lines[i].match(/^\d+$/) && !lines[i].startsWith('Skip')) {
              result.push({ kw: lines[i], vol, kd });
              i += 2;
            }
          }
          return result;
        });
        console.log(`Gap rows: ${gapData?.length || 0}`);
      }
    }
  } catch(e) {
    console.log('Gap tool error:', e.message.substring(0, 80));
  }

  // ── Part 3: Per-competitor top keywords via Organic Positions
  // (using scroll approach to force virtual table rendering)
  console.log('\n── PART 3: HomeStars organic positions (with scroll) ──\n');
  const competitorData = {};

  for (const comp of ['homestars.com', 'bark.com']) {
    console.log(`\n▶ ${comp}`);
    await pg.goto(
      `https://www.semrush.com/analytics/organic/positions/?q=${comp}&db=${DB}&sortby=Po&order=asc`,
      { waitUntil: 'networkidle2', timeout: 40000 }
    );
    await sleep(10000);

    // Scroll through table to trigger virtual rendering
    for (let scroll = 0; scroll < 10; scroll++) {
      await pg.evaluate((s) => window.scrollBy(0, s * 200), scroll);
      await sleep(300);
    }
    await sleep(3000);

    const rows = await pg.evaluate(() => {
      const results = [];
      // Try all table rows
      document.querySelectorAll('tbody tr, [role="row"]').forEach((tr, i) => {
        if (i >= 150) return;
        const cells = tr.querySelectorAll('td, [role="cell"]');
        if (cells.length < 3) return;
        const kw  = cells[0]?.innerText?.trim()?.split('\n')[0] || '';
        const pos = cells[1]?.innerText?.trim()?.split('\n')[0] || '';
        const vol = cells[2]?.innerText?.trim()?.split('\n')[0] || '';
        const kd  = cells[3]?.innerText?.trim()?.split('\n')[0] || '';
        if (kw.length > 2 && /^\d+$/.test(pos) && parseInt(pos) <= 150)
          results.push({ kw, pos: +pos, vol: vol.replace(/,/g,''), kd });
      });
      if (results.length >= 5) return results;

      // Line scan
      const lines = document.body.innerText.split('\n').map(l => l.trim()).filter(l => l.length > 0);
      const res = [];
      for (let i = 0; i < lines.length - 3 && res.length < 100; i++) {
        const pos = lines[i+1], vol = lines[i+2];
        if (/^\d+$/.test(pos) && +pos >= 1 && +pos <= 100 &&
            /^[\d,]+$/.test(vol.replace(/,/g,'')) && parseInt(vol.replace(/,/g,'')) >= 0) {
          const kw = lines[i];
          if (kw.length > 2 && kw.length < 80 && !kw.startsWith('Skip') &&
              !/^[\d,]+$/.test(kw) && !kw.includes('©')) {
            res.push({ kw, pos: +pos, vol: vol.replace(/,/g,''), kd: lines[i+3] || '' });
            i += 3;
          }
        }
      }
      return res;
    });

    console.log(`  ${rows.length} rows for ${comp}`);
    competitorData[comp] = rows.filter(r =>
      r.kw.length > 3 &&
      !r.kw.match(/^homestars$/i) &&
      !r.kw.match(/^bark$/i) &&
      !r.kw.match(/login|account|sign.?up|review$/i)
    );
    await sleep(3000);
  }

  // ── BUILD COMPETITOR REPORT ───────────────────────────────────────────
  const date = new Date().toISOString().split('T')[0];
  let md = `# Protasker — Competitor Keyword Intelligence\n*${date} | Canada (ca)*\n\n`;

  md += `---\n\n## DOMAIN OVERVIEW\n\n`;
  md += `| Domain | Org. Keywords | Est. Traffic | Authority Score |\n|---|---|---|---|\n`;
  const domainData = [
    ['Protasker ⬅', '597', '33', '<10 (new)'],
    ['HomeStars', '140.5K', '144.7K', '50'],
    ['Bark.com', '28.4K', '34.9K', '60'],
    ['Jiffy', '2K', '4.5K', '44'],
    ['Angi', '86.3K', '56.2K', '68'],
    ['Kijiji', '1.4M', '4.7M', '74'],
  ];
  domainData.forEach(([d, kw, tr, as]) => { md += `| ${d} | ${kw} | ${tr} | ${as} |\n`; });

  md += `\n---\n\n## KEYWORD GAP TOOL OUTPUT\n\n`;
  if (gapData && gapData.length > 0) {
    md += `*Protasker vs HomeStars vs Bark — keywords they rank for, Protasker doesn't*\n\n`;
    md += `| Keyword | Volume | KD |\n|---|---|---|\n`;
    gapData.slice(0, 60).forEach(r => { md += `| ${r.kw} | ${r.vol} | ${r.kd} |\n`; });
  } else {
    md += `_Gap tool UI required interaction — screenshot saved to protasker-gap-results.png_\n\n`;
    md += `**Known gaps from April 12-14 research:**\n`;
    md += `- eavestrough toronto (14,800 vol) — HomeStars pos 6, Protasker not ranking\n`;
    md += `- plumber near me (18,100 vol) — HomeStars pos 1-2\n`;
    md += `- locksmith near me (14,800 vol) — Bark pos 1, HomeStars pos 3\n`;
    md += `- electrician near me (8,100 vol) — HomeStars pos 2\n`;
    md += `- window cleaning near me — Bark generic only\n`;
    md += `- handyman near me — KD 47 (high, owned by directories)\n\n`;
  }

  md += `\n---\n\n## PER-COMPETITOR TOP KEYWORDS\n\n`;
  for (const [comp, rows] of Object.entries(competitorData)) {
    const label = comp === 'homestars.com' ? 'HomeStars' : 'Bark.com';
    md += `### ${label} — Top Keywords\n\n`;
    if (rows.length === 0) {
      md += `_No rows extracted (virtual table rendering) — see screenshots_\n\n`;
    } else {
      const top = [...rows].sort((a,b) => parseInt(b.vol||'0') - parseInt(a.vol||'0')).slice(0,60);
      md += `| Keyword | Vol | KD | Position |\n|---|---|---|---|\n`;
      top.forEach(r => { md += `| ${r.kw} | ${r.vol||'—'} | ${r.kd||'—'} | ${r.pos} |\n`; });
    }
    md += '\n';
  }

  md += `---\n\n## STRATEGIC GAPS — SERVICE×CITY OPPORTUNITIES\n\n`;
  md += `Based on keyword research + competitor pattern analysis:\n\n`;
  md += `### HomeStars Pattern\n`;
  md += `HomeStars ranks for **category + city** pages (e.g., /plumbers/toronto) and has directory authority.\n`;
  md += `Protasker can beat HomeStars on **informational + transactional long-tail** where directories don't excel:\n`;
  md += `- "how much does [service] cost toronto" — cost guides (Protasker pages can rank these)\n`;
  md += `- "[service] same day toronto" — urgency modifier, less competition\n`;
  md += `- "[service] licensed ontario" — licensing qualifier, converts better\n\n`;

  md += `### Bark.com Pattern\n`;
  md += `Bark ranks ONLY on generic nationwide pages (no city-specific pages in Canada).\n`;
  md += `**Protasker beats Bark on EVERY city-specific query** — just need content + ranking time.\n\n`;

  md += `### Top 15 Keyword Gaps to Target (from service research)\n\n`;
  md += `| # | Keyword | Vol | KD | CPC | Priority |\n|---|---|---|---|---|---|\n`;
  const topGaps = [
    ['1', 'clogged drain near me', '880', '16', '$0', '🔴 P1 — service×city + blog'],
    ['2', 'eavestrough cleaning near me', '880', '23', '$3.47', '🔴 P1 — service×city focus'],
    ['3', 'power washing near me', '720', '12', '$3.50', '🔴 P1 — very low KD'],
    ['4', 'ac repair toronto', '590', '14', '$6.85', '🔴 P1 — high CPC, low KD'],
    ['5', 'bathroom remodel toronto', '590', '37', '$3.82', '🟡 P2 — higher KD'],
    ['6', 'garage door repair toronto', '480', '21', '$7.17', '🔴 P1 — low KD, high CPC'],
    ['7', 'sump pump installation toronto', '480', '9', '$4.92', '🔴 P1 — easiest win'],
    ['8', 'gutter cleaning toronto', '480', '44', '$4.25', '🟡 P2 — higher KD'],
    ['9', 'window replacement toronto', '720', '36', '$20.72', '🟡 P2 — very high CPC'],
    ['10', 'garage door service near me', '390', '24', '$5.51', '🔴 P1'],
    ['11', 'weed control toronto', '320', '14', '$3.65', '🔴 P1 — very low KD'],
    ['12', 'floor refinishing near me', '320', '12', '$2.15', '🔴 P1 — very low KD'],
    ['13', 'tv installation near me', '320', '16', '$2.00', '🔴 P1'],
    ['14', 'pressure washing toronto', '320', '32', '$2.36', '🟡 P2'],
    ['15', 'cabinet refinishing near me', '320', '27', '$3.20', '🟡 P2'],
  ];
  topGaps.forEach(([n, kw, v, kd, cpc, pri]) => { md += `| ${n} | ${kw} | ${v} | ${kd} | ${cpc} | ${pri} |\n`; });

  md += `\n---\n\n## HIGH-CPC SERVICES TO PRIORITIZE\n\n`;
  md += `_High CPC = competitors paying a lot for clicks = high commercial intent = worth ranking for_\n\n`;
  md += `| Service | Best Keyword | Vol | KD | CPC |\n|---|---|---|---|---|\n`;
  const highCPC = [
    ['Interior Painting', 'interior painters toronto', '140', '29', '$12.38'],
    ['Window Installation', 'window replacement toronto', '720', '36', '$20.72'],
    ['Airbnb Cleaning', 'airbnb cleaning service toronto', '170', '14', '$22.52'],
    ['Junk Removal', 'junk removal toronto', '—', '41', '$26.36'],
    ['Exterior Painting', 'exterior painters toronto', '260', '32', '$9.18'],
    ['Garage Door Repair', 'garage door repair toronto', '480', '21', '$7.17'],
    ['HVAC', 'ac repair toronto', '590', '14', '$6.85'],
    ['Water Heater', 'hot water heater repair toronto', '50', '—', '$11.65'],
    ['Dryer Vent Cleaning', 'dryer vent cleaning toronto', '260', '15', '$7.43'],
    ['Drain Snaking', 'drain snaking toronto', '210', '10', '$8.76'],
    ['Appliance Repair', 'appliance repair toronto', '—', '33', '$7.63'],
    ['Roofing', 'roofing repair toronto', '320', '49', '$7.48'],
  ];
  highCPC.forEach(([svc, kw, v, kd, cpc]) => { md += `| ${svc} | ${kw} | ${v} | ${kd} | ${cpc} |\n`; });

  writeFileSync(COMP_OUT, md, 'utf8');
  console.log(`\n✅ Competitor report saved → ${COMP_OUT}`);

  try { await pg.close(); } catch(_) {}
  browser.disconnect();
}
main().catch(e => { console.error('Fatal:', e.message); process.exit(1); });
