/**
 * protasker-intercept.mjs
 * Uses network response interception to capture SEMrush API JSON data.
 * Avoids virtual table DOM scraping entirely.
 *
 * Collects:
 *   1. Keyword Gap (protasker.ca vs each competitor) — missing/untapped keywords
 *   2. Site Audit issues for protasker.ca
 *
 * Output:
 *   C:/Users/Owner/Documents/Protasker-Keyword-Gap.md
 *   C:/Users/Owner/Documents/Protasker-Site-Audit.md
 */

import puppeteer from 'puppeteer';
import { writeFileSync } from 'fs';
const sleep = ms => new Promise(r => setTimeout(r, ms));

const OUT_GAP   = 'C:/Users/Owner/Documents/Protasker-Keyword-Gap.md';
const OUT_AUDIT = 'C:/Users/Owner/Documents/Protasker-Site-Audit.md';
const DB        = 'ca';
const MY_DOMAIN = 'protasker.ca';
const PROJECT_ID = '29269558'; // found from previous run

const COMPETITORS = [
  { name: 'HomeStars',   domain: 'homestars.com'     },
  { name: 'Bark',        domain: 'bark.com'           },
  { name: 'Jiffy',       domain: 'jiffyondemand.com'  },
  { name: 'TaskRabbit',  domain: 'taskrabbit.com'     },
  { name: 'UrbanTasker', domain: 'urbantasker.com'    },
  { name: 'Yelp CA',     domain: 'yelp.ca'            },
];

const SERVICE_TERMS = [
  'cleaning', 'handyman', 'plumber', 'plumbing', 'electrician', 'electrical',
  'hvac', 'furnace', 'ac repair', 'air condition', 'lawn', 'landscaping',
  'junk removal', 'trash', 'snow removal', 'pest control', 'locksmith',
  'renovation', 'remodel', 'painting', 'drywall', 'flooring', 'roofing',
  'eavestrough', 'gutter', 'window', 'fence', 'deck', 'interlocking',
  'pressure wash', 'tree', 'drain', 'sump pump', 'carpet', 'duct',
  'appliance', 'garage', 'pool', 'basement', 'bathroom', 'kitchen',
  'contractor', 'repair', 'install', 'service', 'near me',
];
const isServiceKw = kw => SERVICE_TERMS.some(t => kw.toLowerCase().includes(t));

function parseVol(v) {
  if (!v) return 0;
  v = String(v).replace(/,/g, '').trim();
  if (/[Kk]$/.test(v)) return parseFloat(v) * 1000;
  if (/[Mm]$/.test(v)) return parseFloat(v) * 1000000;
  return parseFloat(v) || 0;
}

async function dismissPopup(pg) {
  await pg.evaluate(() => {
    const btn = Array.from(document.querySelectorAll('button'))
      .find(b => /continue|terminate/i.test(b.innerText || ''));
    if (btn) btn.click();
  }).catch(() => {});
}

// ── Intercept API responses on a page ────────────────────────────────────────
function setupInterceptor(pg, collected) {
  pg.on('response', async (response) => {
    const url = response.url();
    const ct  = response.headers()['content-type'] || '';
    if (!ct.includes('json') && !ct.includes('text')) return;

    // Only care about SEMrush data endpoints
    if (!url.includes('semrush.com') && !url.includes('api.se-')) return;
    if (url.includes('.png') || url.includes('.js') || url.includes('.css')) return;

    try {
      const text = await response.text();
      if (!text || text.length < 50) return;
      if (!text.startsWith('{') && !text.startsWith('[')) return;

      const json = JSON.parse(text);
      collected.push({ url, json });
    } catch(_) {}
  });
}

// ── Extract keyword rows from captured JSON ───────────────────────────────────
function extractKeywordsFromJson(captured) {
  const rows = [];
  const seen = new Set();

  for (const { url, json } of captured) {
    // Try common SEMrush response patterns
    const candidates = [
      json?.data,
      json?.results,
      json?.rows,
      json?.keywords,
      json?.items,
      json,
    ].filter(x => Array.isArray(x));

    for (const arr of candidates) {
      for (const item of arr) {
        // Each item might be an object with keyword data
        const kw = item?.Ph || item?.keyword || item?.phrase ||
                   item?.kw  || item?.query   || item?.term;
        if (!kw || typeof kw !== 'string' || kw.length < 3 || seen.has(kw)) continue;

        const vol = String(item?.Nq ?? item?.volume ?? item?.search_volume ?? item?.vol ?? '');
        const kd  = String(item?.Kd ?? item?.kd ?? item?.keyword_difficulty ?? '');
        const cpc = String(item?.Co ?? item?.cpc ?? item?.cost_per_click ?? '');
        const pos = String(item?.Po ?? item?.position ?? item?.rank ?? '');

        seen.add(kw);
        rows.push({ kw, vol, kd, cpc, pos });
      }
    }

    // Also try flat array format [kw, vol, kd, cpc, ...]
    if (Array.isArray(json) && json.length > 0 && Array.isArray(json[0])) {
      for (const row of json) {
        const kw = String(row[0] || '');
        if (!kw || kw.length < 3 || seen.has(kw)) continue;
        seen.add(kw);
        rows.push({
          kw,
          vol: String(row[1] || ''),
          kd:  String(row[2] || ''),
          cpc: String(row[3] || ''),
          pos: String(row[4] || ''),
        });
      }
    }
  }

  return rows;
}

// ── Extract audit issues from captured JSON ───────────────────────────────────
function extractAuditFromJson(captured) {
  const issues = { errors: [], warnings: [], notices: [], summary: {} };
  const seen   = new Set();

  for (const { url, json } of captured) {
    // Look for audit-specific endpoints
    const isAudit = /audit|crawl|issue|health|seo.check/i.test(url);

    // Summary stats
    if (json?.health_score || json?.score || json?.site_health) {
      issues.summary.score    = json.health_score ?? json.score ?? json.site_health;
      issues.summary.crawled  = json.crawled_pages ?? json.pages_crawled ?? json.total_pages;
      issues.summary.errors   = json.errors_count   ?? json.errors;
      issues.summary.warnings = json.warnings_count ?? json.warnings;
      issues.summary.notices  = json.notices_count  ?? json.notices;
    }

    const tryExtract = (arr, category) => {
      if (!Array.isArray(arr)) return;
      for (const item of arr) {
        const title = item?.title || item?.name || item?.description || item?.message ||
                      item?.check_name || item?.issue || String(item?.id || '');
        if (!title || title.length < 5 || seen.has(title)) continue;
        const count = item?.count ?? item?.affected_pages ?? item?.pages ?? '';
        seen.add(title);
        issues[category].push({ title, count: String(count) });
      }
    };

    // Try various response shapes
    tryExtract(json?.errors   || json?.error_checks,   'errors');
    tryExtract(json?.warnings || json?.warning_checks, 'warnings');
    tryExtract(json?.notices  || json?.notice_checks,  'notices');
    tryExtract(json?.issues,  'errors');
    tryExtract(json?.data,    isAudit ? 'errors' : null);
    if (json?.checks) {
      tryExtract(json.checks.filter?.(c => c.status === 'error'),   'errors');
      tryExtract(json.checks.filter?.(c => c.status === 'warning'), 'warnings');
      tryExtract(json.checks.filter?.(c => c.status === 'notice'),  'notices');
    }
  }

  return issues;
}

// ── Scrape Keyword Gap ────────────────────────────────────────────────────────
async function scrapeKeywordGap(pg, competitorDomain) {
  const captured = [];
  const handler = async (response) => {
    const url = response.url();
    const ct  = response.headers()['content-type'] || '';
    if (!ct.includes('json') && !ct.includes('text')) return;
    if (!url.includes('semrush.com')) return;
    try {
      const text = await response.text();
      if (text?.startsWith('{') || text?.startsWith('[')) {
        captured.push({ url, json: JSON.parse(text) });
      }
    } catch(_) {}
  };

  pg.on('response', handler);

  const url = `https://www.semrush.com/analytics/keywordgap/?db=${DB}&q=${MY_DOMAIN}&domains=${competitorDomain}&type=missing`;
  try {
    await pg.goto(url, { waitUntil: 'domcontentloaded', timeout: 45000 });
    await sleep(10000);
    await dismissPopup(pg);
    await sleep(2000);

    // Trigger data load by scrolling
    for (let s = 1; s <= 20; s++) {
      await pg.evaluate(s => window.scrollTo(0, s * 400), s).catch(() => {});
      await sleep(150);
    }
    await sleep(3000);

    // Also try clicking Missing tab
    await pg.evaluate(() => {
      const els = Array.from(document.querySelectorAll('button,[role="tab"],a'));
      const el  = els.find(e => /^missing$/i.test((e.innerText || '').trim()));
      if (el) el.click();
    }).catch(() => {});
    await sleep(3000);

  } catch(e) {
    console.log(`  ERR: ${e.message.substring(0, 50)}`);
  }

  pg.off('response', handler);

  const rows = extractKeywordsFromJson(captured);
  console.log(`  Captured ${captured.length} API responses → ${rows.length} keywords`);
  return rows;
}

// ── Scrape Site Audit ─────────────────────────────────────────────────────────
async function scrapeSiteAudit(pg) {
  const captured = [];
  const handler  = async (response) => {
    const url = response.url();
    const ct  = response.headers()['content-type'] || '';
    if (!ct.includes('json') && !ct.includes('text')) return;
    if (!url.includes('semrush.com')) return;
    try {
      const text = await response.text();
      if (text?.startsWith('{') || text?.startsWith('[')) {
        captured.push({ url, json: JSON.parse(text) });
      }
    } catch(_) {}
  };

  pg.on('response', handler);

  // Go to site audit summary page using found project ID
  const auditUrl = `https://www.semrush.com/siteaudit/${PROJECT_ID}/summary/`;
  console.log(`  Navigating to ${auditUrl}`);

  try {
    await pg.goto(auditUrl, { waitUntil: 'domcontentloaded', timeout: 45000 });
    await sleep(10000);
    await dismissPopup(pg);
    await sleep(2000);

    // Navigate to issues list
    await pg.evaluate(() => {
      const links = Array.from(document.querySelectorAll('a, button'));
      const el = links.find(l =>
        /issues?|errors?|all issues/i.test(l.innerText || l.textContent || '')
      );
      if (el) el.click();
    }).catch(() => {});
    await sleep(4000);

    // Scroll to load
    for (let s = 1; s <= 15; s++) {
      await pg.evaluate(s => window.scrollTo(0, s * 400), s).catch(() => {});
      await sleep(200);
    }
    await sleep(2000);

  } catch(e) {
    console.log(`  ERR: ${e.message.substring(0, 50)}`);
  }

  pg.off('response', handler);

  const issues = extractAuditFromJson(captured);
  console.log(`  Captured ${captured.length} API responses`);
  console.log(`  Issues — E:${issues.errors.length} W:${issues.warnings.length} N:${issues.notices.length}`);
  return issues;
}

// ── Build reports ─────────────────────────────────────────────────────────────
function buildGapReport(gapData) {
  const date = new Date().toISOString().split('T')[0];
  let md = `# Protasker — Keyword Gap\n*${date} · Canada · SEMrush Keyword Gap*\n\n`;

  md += `## Summary\n\n| Competitor | Keywords Found | Service Kws |\n|-----------|---------------|-------------|\n`;
  for (const { name, rows } of gapData) {
    md += `| ${name} | ${rows.length} | ${rows.filter(r => isServiceKw(r.kw)).length} |\n`;
  }
  md += '\n---\n\n';

  // Combined service gaps
  const allGaps = new Map();
  for (const { name, rows } of gapData) {
    for (const r of rows) {
      if (!isServiceKw(r.kw)) continue;
      if (!allGaps.has(r.kw) || parseVol(r.vol) > parseVol(allGaps.get(r.kw).vol)) {
        allGaps.set(r.kw, { ...r, source: name });
      }
    }
  }
  const gapList = [...allGaps.values()].sort((a, b) => parseVol(b.vol) - parseVol(a.vol));

  if (gapList.length) {
    const easy = gapList.filter(r => parseInt(r.kd) <= 25 && parseVol(r.vol) >= 50);
    if (easy.length) {
      md += `## Easy Wins (KD ≤ 25, Vol ≥ 50)\n\n| Keyword | Vol | KD | CPC | Competitor |\n|---------|-----|----|----|------------|\n`;
      easy.slice(0, 60).forEach(r => {
        md += `| ${r.kw} | ${r.vol} | ${r.kd} | ${r.cpc ? '$'+r.cpc : '—'} | ${r.source} |\n`;
      });
      md += '\n';
    }

    md += `## All Service Gap Keywords\n\n| Keyword | Vol | KD | Competitor |\n|---------|-----|----|-----------|\n`;
    gapList.slice(0, 300).forEach(r => {
      md += `| ${r.kw} | ${r.vol || '—'} | ${r.kd || '—'} | ${r.source} |\n`;
    });
    md += '\n';
  } else {
    md += `> No keywords captured via interception — SEMrush may require additional auth for API responses.\n\n`;
    md += `**Manual approach:** In SEMrush → Keyword Gap → enter protasker.ca vs homestars.com → Missing tab → Export CSV.\n\n`;
  }

  for (const { name, domain, rows } of gapData) {
    if (!rows.length) continue;
    md += `## ${name} (${domain}) — ${rows.length} keywords\n\n`;
    md += `| Keyword | Vol | KD | CPC | Pos |\n|---------|-----|----|----|-----|\n`;
    rows.slice(0, 100).forEach(r => {
      md += `| ${r.kw} | ${r.vol || '—'} | ${r.kd || '—'} | ${r.cpc ? '$'+r.cpc : '—'} | ${r.pos || '—'} |\n`;
    });
    md += '\n';
  }
  return md;
}

function buildAuditReport(issues) {
  const date = new Date().toISOString().split('T')[0];
  const s = issues.summary;
  let md = `# Protasker.ca — SEMrush Site Audit\n*${date}*\n\n`;

  md += `## Summary\n\n| Metric | Value |\n|--------|-------|\n`;
  if (s.score)    md += `| Site Health | ${s.score}% |\n`;
  if (s.crawled)  md += `| Pages Crawled | ${s.crawled} |\n`;
  if (s.errors)   md += `| Errors | ${s.errors} |\n`;
  if (s.warnings) md += `| Warnings | ${s.warnings} |\n`;
  if (s.notices)  md += `| Notices | ${s.notices} |\n`;
  md += '\n';

  const aiIssues = [...issues.errors, ...issues.warnings, ...issues.notices]
    .filter(i => /ai|llm|schema|structured.data|e-e-a-t|eeat|entity|author|expert/i.test(i.title));

  if (aiIssues.length) {
    md += `## AI Visibility Issues\n\n| Issue | Pages |\n|-------|-------|\n`;
    aiIssues.forEach(i => { md += `| ${i.title} | ${i.count || '—'} |\n`; });
    md += '\n';
  }

  if (issues.errors.length) {
    md += `## Errors\n\n| Issue | Pages |\n|-------|-------|\n`;
    issues.errors.forEach(i => { md += `| ${i.title} | ${i.count || '—'} |\n`; });
    md += '\n';
  }
  if (issues.warnings.length) {
    md += `## Warnings\n\n| Issue | Pages |\n|-------|-------|\n`;
    issues.warnings.forEach(i => { md += `| ${i.title} | ${i.count || '—'} |\n`; });
    md += '\n';
  }
  if (issues.notices.length) {
    md += `## Notices\n\n| Issue | Pages |\n|-------|-------|\n`;
    issues.notices.slice(0, 50).forEach(i => { md += `| ${i.title} | ${i.count || '—'} |\n`; });
    md += '\n';
  }

  if (!issues.errors.length && !issues.warnings.length) {
    md += `> No issues captured via interception.\n\n`;
    md += `**Manual approach:** SEMrush → Projects → protasker.ca → Site Audit → export issues.\n`;
    md += `Direct URL: https://www.semrush.com/siteaudit/${PROJECT_ID}/summary/\n\n`;
  }

  return md;
}

// ── Main ──────────────────────────────────────────────────────────────────────
async function main() {
  const browser = await puppeteer.connect({ browserURL: 'http://localhost:9222', protocolTimeout: 60000 });
  const pg = await browser.newPage();
  pg.setDefaultTimeout(60000);

  console.log('Warming up...');
  await pg.goto('https://www.semrush.com/dashboard/', { waitUntil: 'domcontentloaded', timeout: 30000 }).catch(() => {});
  await sleep(3000);
  await dismissPopup(pg);
  await sleep(2000);
  console.log('Ready\n');

  // ── Keyword Gap ───────────────────────────────────────────────────────────
  console.log('═══ KEYWORD GAP ═══');
  const gapData = [];
  for (const { name, domain } of COMPETITORS) {
    console.log(`[${name}] protasker.ca vs ${domain}`);
    const rows = await scrapeKeywordGap(pg, domain);
    gapData.push({ name, domain, rows });
    writeFileSync(OUT_GAP, buildGapReport(gapData), 'utf8');
    await sleep(3000);
  }

  // ── Site Audit ────────────────────────────────────────────────────────────
  console.log('\n═══ SITE AUDIT ═══');
  const auditIssues = await scrapeSiteAudit(pg);
  writeFileSync(OUT_AUDIT, buildAuditReport(auditIssues), 'utf8');

  console.log(`\n✅ Done`);
  console.log(`   Gap:   ${OUT_GAP}`);
  console.log(`   Audit: ${OUT_AUDIT}`);

  await pg.close();
  browser.disconnect();
}

main().catch(e => { console.error('Fatal:', e.message); process.exit(1); });
