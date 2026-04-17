/**
 * protasker-intel-v2.mjs
 * Reliable SEMrush intelligence sweep for Protasker + 6 competitors.
 * Fixes: no networkidle2 (causes hangs), simple scroll, proper timeouts.
 *
 * Output: C:/Users/Owner/Documents/Protasker-Full-Intel.md
 */

import puppeteer from 'puppeteer';
import { writeFileSync, appendFileSync, existsSync } from 'fs';
const sleep = ms => new Promise(r => setTimeout(r, ms));
const OUT = 'C:/Users/Owner/Documents/Protasker-Full-Intel.md';
const DB  = 'ca';

const DOMAINS = [
  { domain: 'protasker.ca',       label: 'Protasker ⬅',  self: true  },
  { domain: 'homestars.com',      label: 'HomeStars'                  },
  { domain: 'bark.com',           label: 'Bark.com'                   },
  { domain: 'jiffyondemand.com',  label: 'Jiffy'                      },
  { domain: 'taskrabbit.com',     label: 'TaskRabbit'                 },
  { domain: 'urbantasker.com',    label: 'UrbanTasker'                },
  { domain: 'yelp.ca',            label: 'Yelp.ca'                    },
];

// ── safe goto: use domcontentloaded to avoid hanging ─────────────────────────
async function safeGoto(pg, url, timeout = 40000) {
  try {
    await pg.goto(url, { waitUntil: 'domcontentloaded', timeout });
  } catch(e) {
    // If domcontentloaded timed out or aborted, still proceed — page may have content
    if (!e.message.includes('Navigation timeout') && !e.message.includes('net::ERR_ABORTED')) {
      throw e;
    }
  }
}

// ── dismiss multi-login ───────────────────────────────────────────────────────
async function dismissMultiLogin(pg) {
  await pg.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const act = btns.find(b => /continue|terminate/i.test(b.innerText||''));
    if (act) act.click();
  }).catch(() => {});
  await sleep(2000);
}

// ── extract text from page for scanning ──────────────────────────────────────
async function getPageText(pg) {
  return pg.evaluate(() => document.body.innerText || '').catch(() => '');
}

// ── 1. Domain Overview ────────────────────────────────────────────────────────
async function getDomainOverview(pg, domain) {
  process.stdout.write(`  overview: ${domain.padEnd(22)} `);
  try {
    await safeGoto(pg, `https://www.semrush.com/analytics/overview/?q=${domain}&searchType=domain&db=${DB}`);
    await dismissMultiLogin(pg);
    await sleep(10000);

    const d = await pg.evaluate(() => {
      const text = document.body.innerText;
      const lines = text.split('\n').map(l => l.trim()).filter(Boolean);
      const r = { keywords:'', traffic:'', as:'', rank:'' };

      for (let i = 0; i < lines.length - 1; i++) {
        const l = lines[i].toLowerCase(), v = lines[i+1];
        if (!v || v === 'n/a') continue;
        if (l === 'organic keywords' && !r.keywords) r.keywords = v;
        if (l === 'organic traffic'  && !r.traffic)  r.traffic  = v;
        if ((l === 'authority score' || l === 'as') && /^\d+$/.test(v) && !r.as) r.as = v;
        if (l === 'semrush rank' && !r.rank) r.rank = v;
      }
      // Regex fallbacks
      if (!r.keywords) { const m = text.match(/Organic Keywords[\s\S]{1,40}?([\d,\.KkMm]+)/); if (m) r.keywords = m[1]; }
      if (!r.traffic)  { const m = text.match(/Organic Traffic[\s\S]{1,40}?([\d,\.KkMm]+)/);  if (m) r.traffic  = m[1]; }
      if (!r.as)       { const m = text.match(/Authority Score[\s\S]{1,30}?(\d+)/);             if (m) r.as       = m[1]; }
      return r;
    });
    console.log(`kw=${d.keywords||'?'} traffic=${d.traffic||'?'} AS=${d.as||'?'}`);
    return d;
  } catch(e) {
    console.log(`ERR: ${e.message.substring(0,60)}`);
    return { keywords:'', traffic:'', as:'', rank:'' };
  }
}

// ── 2. Backlinks Overview ─────────────────────────────────────────────────────
async function getBacklinks(pg, domain) {
  process.stdout.write(`  backlinks:${domain.padEnd(22)} `);
  try {
    await safeGoto(pg, `https://www.semrush.com/analytics/backlinks/overview/?q=${domain}&searchType=domain`);
    await dismissMultiLogin(pg);
    await sleep(10000);

    const d = await pg.evaluate(() => {
      const text = document.body.innerText;
      const lines = text.split('\n').map(l => l.trim()).filter(Boolean);
      const r = { total:'', referring:'', as:'' };
      for (let i = 0; i < lines.length - 1; i++) {
        const l = lines[i].toLowerCase(), v = lines[i+1];
        if (!v) continue;
        const vclean = v.replace(/,/g,'');
        if ((l === 'backlinks' || l === 'total backlinks') && /^[\d\.KkMm]+$/.test(vclean) && !r.total) r.total = v;
        if (l.includes('referring domain') && /^[\d\.KkMm]+$/.test(vclean) && !r.referring) r.referring = v;
        if ((l === 'authority score' || l === 'as') && /^\d+$/.test(v) && !r.as) r.as = v;
      }
      return r;
    });
    console.log(`total=${d.total||'?'} refDomains=${d.referring||'?'} AS=${d.as||'?'}`);
    return d;
  } catch(e) {
    console.log(`ERR: ${e.message.substring(0,60)}`);
    return { total:'', referring:'', as:'' };
  }
}

// ── 3. Organic Positions ──────────────────────────────────────────────────────
async function getOrganic(pg, domain) {
  process.stdout.write(`  organic:  ${domain.padEnd(22)} `);
  try {
    await safeGoto(pg,
      `https://www.semrush.com/analytics/organic/positions/?q=${domain}&db=${DB}&sortby=Po&order=asc`
    );
    await dismissMultiLogin(pg);
    await sleep(10000);

    const rows = new Map();

    const harvest = async () => {
      const fresh = await pg.evaluate(() => {
        const res = [];
        // Table rows
        document.querySelectorAll('table tbody tr').forEach(tr => {
          const cells = Array.from(tr.querySelectorAll('td'));
          if (cells.length < 3) return;
          const kw  = cells[0]?.innerText?.trim()?.split('\n')[0] || '';
          const pos = cells[1]?.innerText?.trim()?.split('\n')[0] || '';
          const vol = cells[2]?.innerText?.trim()?.split('\n')[0] || '';
          const kd  = cells[3]?.innerText?.trim()?.split('\n')[0] || '';
          if (kw.length > 2 && /^\d+$/.test(pos) && +pos <= 200)
            res.push({ kw, pos: +pos, vol: vol.replace(/,/g,''), kd });
        });
        if (res.length >= 5) return res;

        // Line scan fallback
        const lines = document.body.innerText.split('\n').map(l => l.trim()).filter(Boolean);
        for (let i = 0; i < lines.length - 3 && res.length < 300; i++) {
          const p = lines[i+1], v = lines[i+2];
          if (/^\d+$/.test(p) && +p >= 1 && +p <= 200 &&
              /^[\d,]+$/.test(v.replace(/,/g,'')) &&
              lines[i].length > 2 && lines[i].length < 100 &&
              !lines[i].startsWith('Skip') && !/^\d+$/.test(lines[i]) && !lines[i].includes('©')) {
            res.push({ kw: lines[i], pos: +p, vol: v.replace(/,/g,''), kd: lines[i+3] || '' });
            i += 3;
          }
        }
        return res;
      }).catch(() => []);
      fresh.forEach(r => { if (!rows.has(r.kw.toLowerCase())) rows.set(r.kw.toLowerCase(), r); });
    };

    await harvest();

    // Simple page scroll — no complex container detection
    for (let s = 0; s < 15; s++) {
      await pg.evaluate(s => window.scrollTo(0, s * 600), s).catch(() => {});
      await sleep(400);
      await harvest();
    }

    // Next page (up to 4 more pages)
    for (let p = 2; p <= 5; p++) {
      const nextClicked = await pg.evaluate(() => {
        const btns = Array.from(document.querySelectorAll('button, a[aria-label], a'));
        const next = btns.find(b => {
          const t = (b.innerText || b.getAttribute('aria-label') || '').trim().toLowerCase();
          return t === 'next' || t === '>' || t === '→' || t.includes('next page');
        });
        if (next && !next.disabled) { next.click(); return true; }
        return false;
      }).catch(() => false);
      if (!nextClicked) break;
      await sleep(7000);
      await harvest();
      process.stdout.write(`+p${p}(${rows.size}) `);
    }

    console.log(`→ ${rows.size} rows`);
    return Array.from(rows.values());
  } catch(e) {
    console.log(`ERR: ${e.message.substring(0,60)}`);
    return [];
  }
}

// ── 4. Top Pages ──────────────────────────────────────────────────────────────
async function getTopPages(pg, domain) {
  process.stdout.write(`  top pages:${domain.padEnd(22)} `);
  try {
    await safeGoto(pg,
      `https://www.semrush.com/analytics/organic/pages/?q=${domain}&db=${DB}&sortby=Tr&order=desc`
    );
    await dismissMultiLogin(pg);
    await sleep(9000);

    const pages = await pg.evaluate(() => {
      const res = [];
      document.querySelectorAll('table tbody tr').forEach((tr, i) => {
        if (i >= 30) return;
        const cells = Array.from(tr.querySelectorAll('td'));
        const url = cells[0]?.innerText?.trim()?.split('\n')[0] || '';
        const traffic = cells[1]?.innerText?.trim()?.split('\n')[0] || '';
        const kws = cells[2]?.innerText?.trim()?.split('\n')[0] || '';
        if (url && url.length > 3) res.push({ url, traffic, keywords: kws });
      });
      if (res.length > 0) return res;

      // Line scan
      const lines = document.body.innerText.split('\n').map(l => l.trim()).filter(Boolean);
      for (let i = 0; i < lines.length - 2 && res.length < 30; i++) {
        if (lines[i].startsWith('/') || lines[i].startsWith('http')) {
          const traffic = lines[i+1];
          if (/^[\d,\.KkMm]+$/.test(traffic.replace(/,/g,''))) {
            res.push({ url: lines[i], traffic, keywords: lines[i+2] || '' });
            i += 2;
          }
        }
      }
      return res;
    }).catch(() => []);
    console.log(`${pages.length} pages`);
    return pages;
  } catch(e) {
    console.log(`ERR: ${e.message.substring(0,60)}`);
    return [];
  }
}

// ── Build Keyword Gap from organic data ──────────────────────────────────────
function buildGapAnalysis(allOrganic) {
  const protaskerKws = new Set(
    (allOrganic['protasker.ca'] || []).map(r => r.kw.toLowerCase())
  );

  const gapRows = [];
  for (const [domain, rows] of Object.entries(allOrganic)) {
    if (domain === 'protasker.ca') continue;
    for (const r of rows) {
      const kw = r.kw.toLowerCase();
      if (!protaskerKws.has(kw) && r.pos <= 20) {
        gapRows.push({ kw: r.kw, competitor: domain, pos: r.pos, vol: r.vol, kd: r.kd });
      }
    }
  }

  // Sort by volume desc
  gapRows.sort((a, b) => (+b.vol || 0) - (+a.vol || 0));

  // Deduplicate (keep highest-volume entry per keyword)
  const seen = new Set();
  return gapRows.filter(r => {
    const k = r.kw.toLowerCase();
    if (seen.has(k)) return false;
    seen.add(k);
    return true;
  });
}

// ── Main ──────────────────────────────────────────────────────────────────────
async function main() {
  const browser = await puppeteer.connect({
    browserURL: 'http://localhost:9222',
    protocolTimeout: 60000
  });

  // Get single page, close others
  const pages = await browser.pages();
  console.log(`Open tabs: ${pages.length} — closing extras...`);
  for (let i = pages.length - 1; i > 0; i--) {
    try { await pages[i].close(); } catch(_) {}
  }
  const pg = pages[0];
  pg.setDefaultTimeout(60000);

  // Resolve any session issues
  console.log('Resolving SEMrush session...');
  await safeGoto(pg, 'https://www.semrush.com/dashboard/');
  await dismissMultiLogin(pg);
  await sleep(3000);
  console.log('✅ Session OK\n');

  // ─── Section 1: Domain Overviews ───────────────────────────────────────────
  console.log('═══ 1. DOMAIN OVERVIEWS ═══');
  const overviews = {};
  for (const { domain } of DOMAINS) {
    overviews[domain] = await getDomainOverview(pg, domain);
  }

  // ─── Section 2: Backlinks ──────────────────────────────────────────────────
  console.log('\n═══ 2. BACKLINKS ═══');
  const backlinks = {};
  for (const { domain } of DOMAINS) {
    backlinks[domain] = await getBacklinks(pg, domain);
  }

  // ─── Section 3: Top Pages ──────────────────────────────────────────────────
  console.log('\n═══ 3. TOP PAGES (competitors only) ═══');
  const topPages = {};
  for (const { domain, self } of DOMAINS) {
    if (self) continue;
    topPages[domain] = await getTopPages(pg, domain);
  }

  // ─── Section 4: Organic Positions ─────────────────────────────────────────
  console.log('\n═══ 4. ORGANIC POSITIONS ═══');
  const allOrganic = {};
  for (const { domain, label } of DOMAINS) {
    console.log(`\n▶ ${label}`);
    allOrganic[domain] = await getOrganic(pg, domain);

    // Checkpoint save after each domain
    const partial = buildReport(overviews, backlinks, topPages, allOrganic, true);
    writeFileSync(OUT, partial, 'utf8');
    console.log(`  💾 checkpoint saved (${allOrganic[domain].length} kws)`);
  }

  // ─── Section 5: Keyword Gap ────────────────────────────────────────────────
  console.log('\n═══ 5. KEYWORD GAP ANALYSIS (derived) ═══');
  const gapRows = buildGapAnalysis(allOrganic);
  console.log(`Gap keywords: ${gapRows.length}`);

  // ─── Final Report ──────────────────────────────────────────────────────────
  const report = buildReport(overviews, backlinks, topPages, allOrganic, false, gapRows);
  writeFileSync(OUT, report, 'utf8');
  console.log(`\n✅ Report saved → ${OUT}`);

  browser.disconnect();
}

// ── Build Markdown Report ─────────────────────────────────────────────────────
function buildReport(overviews, backlinks, topPages, allOrganic, isCheckpoint = false, gapRows = []) {
  const date = new Date().toISOString().split('T')[0];
  let md = `# Protasker Competitor Intelligence\n*${date}${isCheckpoint ? ' — checkpoint' : ''}*\n\n`;

  // ── Domain Overview Table ────────────────────────────────────────────────────
  md += `## 1. Domain Overviews (Canada)\n\n`;
  md += `| Domain | Org Keywords | Org Traffic | Authority Score |\n`;
  md += `|--------|-------------|------------|----------------|\n`;
  for (const { domain, label } of DOMAINS) {
    const d = overviews[domain] || {};
    md += `| **${label}** \`${domain}\` | ${d.keywords||'—'} | ${d.traffic||'—'} | ${d.as||'—'} |\n`;
  }

  // ── Backlinks Table ───────────────────────────────────────────────────────────
  md += `\n## 2. Backlink Profiles\n\n`;
  md += `| Domain | Total Backlinks | Referring Domains | AS |\n`;
  md += `|--------|----------------|------------------|----||\n`;
  for (const { domain, label } of DOMAINS) {
    const b = backlinks[domain] || {};
    md += `| **${label}** \`${domain}\` | ${b.total||'—'} | ${b.referring||'—'} | ${b.as||'—'} |\n`;
  }

  // ── Top Pages ────────────────────────────────────────────────────────────────
  md += `\n## 3. Top Traffic Pages (Competitors)\n\n`;
  for (const { domain, label, self } of DOMAINS) {
    if (self) continue;
    const pages = topPages[domain] || [];
    if (pages.length === 0) continue;
    md += `### ${label} (\`${domain}\`)\n\n`;
    md += `| URL | Traffic | Keywords |\n|-----|---------|----------|\n`;
    pages.slice(0, 20).forEach(p => {
      md += `| \`${p.url}\` | ${p.traffic} | ${p.keywords} |\n`;
    });
    md += '\n';
  }

  // ── Organic Positions ────────────────────────────────────────────────────────
  md += `\n## 4. Organic Keyword Rankings\n\n`;
  for (const { domain, label } of DOMAINS) {
    const rows = allOrganic[domain] || [];
    if (rows.length === 0) {
      md += `### ${label} (\`${domain}\`) — 0 keywords captured\n\n`;
      continue;
    }
    // Filter to pos 1–20, sort by position
    const top = rows.filter(r => r.pos <= 20).sort((a, b) => a.pos - b.pos);
    const rest = rows.filter(r => r.pos > 20).sort((a, b) => (+b.vol||0) - (+a.vol||0));
    md += `### ${label} (\`${domain}\`) — ${rows.length} keywords total\n\n`;
    if (top.length > 0) {
      md += `**Top 20 positions:**\n\n`;
      md += `| Keyword | Pos | Volume | KD |\n|---------|-----|--------|----|\n`;
      top.forEach(r => { md += `| ${r.kw} | ${r.pos} | ${r.vol||'—'} | ${r.kd||'—'} |\n`; });
    }
    if (rest.length > 0) {
      md += `\n**Positions 21–200 (top by volume):**\n\n`;
      md += `| Keyword | Pos | Volume | KD |\n|---------|-----|--------|----|\n`;
      rest.slice(0, 50).forEach(r => { md += `| ${r.kw} | ${r.pos} | ${r.vol||'—'} | ${r.kd||'—'} |\n`; });
    }
    md += '\n';
  }

  // ── Keyword Gap ───────────────────────────────────────────────────────────────
  if (gapRows.length > 0) {
    md += `\n## 5. Keyword Gap — Competitors Rank, Protasker Doesn't\n\n`;
    md += `*Keywords where at least one competitor ranks in top 20 but Protasker has no ranking*\n\n`;
    md += `| Keyword | Volume | KD | Top Competitor | Competitor Pos |\n`;
    md += `|---------|--------|----|--------------|-----------------|\n`;
    gapRows.slice(0, 100).forEach(r => {
      md += `| ${r.kw} | ${r.vol||'—'} | ${r.kd||'—'} | \`${r.competitor}\` | ${r.pos} |\n`;
    });
    md += '\n';

    // Strategic summary
    md += `\n## 6. Strategic Analysis\n\n`;
    md += `### Keyword Opportunity Matrix\n\n`;
    // Count opportunities by competitor
    const byComp = {};
    gapRows.forEach(r => {
      byComp[r.competitor] = (byComp[r.competitor] || 0) + 1;
    });
    md += `| Competitor | Gap Keywords (top 20) |\n|------------|----------------------|\n`;
    Object.entries(byComp).sort((a,b) => b[1]-a[1]).forEach(([d,n]) => {
      md += `| \`${d}\` | ${n} |\n`;
    });

    // High-volume gaps
    const highVol = gapRows.filter(r => +r.vol >= 500).slice(0, 30);
    if (highVol.length > 0) {
      md += `\n### High-Volume Gaps (500+ monthly searches)\n\n`;
      md += `| Keyword | Volume | KD | Competitor |\n|---------|--------|----|-----------|\n`;
      highVol.forEach(r => { md += `| ${r.kw} | ${r.vol} | ${r.kd||'—'} | \`${r.competitor}\` |\n`; });
    }

    // Easy wins (KD ≤ 20)
    const easyWins = gapRows.filter(r => r.kd && +r.kd <= 20 && +r.vol >= 100).slice(0, 30);
    if (easyWins.length > 0) {
      md += `\n### Easy Wins (KD ≤ 20, Vol ≥ 100)\n\n`;
      md += `| Keyword | Volume | KD | Competitor |\n|---------|--------|----|-----------|\n`;
      easyWins.forEach(r => { md += `| ${r.kw} | ${r.vol} | ${r.kd} | \`${r.competitor}\` |\n`; });
    }
  }

  return md;
}

main().catch(e => {
  console.error('Fatal:', e.message);
  process.exit(1);
});
