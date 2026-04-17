/**
 * protasker-full-intel.mjs
 * FULL SEMrush intelligence sweep for Protasker + all 6 competitors.
 *
 * Features used:
 *  1. Domain Overview     — keywords, traffic, AS, rank
 *  2. Organic Positions   — top ranking keywords (scroll-harvest method)
 *  3. Top Pages           — which pages drive most traffic
 *  4. Backlink Overview   — total backlinks, referring domains, AS
 *  5. Traffic Analytics   — monthly visits, bounce, pages/visit
 *  6. Keyword Gap         — what competitors rank for that Protasker doesn't
 *
 * Competitors: jiffyondemand.com, homestars.com, taskrabbit.com,
 *              urbantasker.com, bark.com, yelp.ca
 *
 * Output: C:/Users/Owner/Documents/Protasker-Full-Intel.md
 */

import puppeteer from 'puppeteer';
import { writeFileSync } from 'fs';
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

// ── helper: dismiss multi-login if present ────────────────────────────────────
async function ensureLoggedIn(pg) {
  const url = pg.url();
  if (url.includes('multilogin') || url.includes('login')) {
    await pg.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button'));
      const act = btns.find(b => /continue|terminate/i.test(b.innerText||''));
      if (act) act.click();
    });
    await sleep(3000);
  }
}

// ── 1. Domain Overview ────────────────────────────────────────────────────────
async function getDomainOverview(pg, domain) {
  process.stdout.write(`  overview: ${domain.padEnd(22)} `);
  try {
    await pg.goto(
      `https://www.semrush.com/analytics/overview/?q=${domain}&searchType=domain&db=${DB}`,
      { waitUntil: 'networkidle2', timeout: 45000 }
    );
    await ensureLoggedIn(pg);
    await sleep(8000);

    const d = await pg.evaluate(() => {
      const text = document.body.innerText;
      const lines = text.split('\n').map(l => l.trim()).filter(Boolean);
      const r = { keywords:'', traffic:'', as:'', rank:'' };
      for (let i = 0; i < lines.length - 1; i++) {
        const l = lines[i].toLowerCase(), v = lines[i+1];
        if (!v || v==='n/a') continue;
        if (l==='organic keywords' && !r.keywords) r.keywords=v;
        if (l==='organic traffic'  && !r.traffic)  r.traffic=v;
        if ((l==='authority score'||l==='as') && /^\d+$/.test(v) && !r.as) r.as=v;
        if (l==='semrush rank' && !r.rank) r.rank=v;
      }
      // Regex fallbacks
      if (!r.keywords) { const m=text.match(/Organic Keywords[\s\S]{1,30}?([\d,\.KkMm]+)/); if(m) r.keywords=m[1]; }
      if (!r.traffic)  { const m=text.match(/Organic Traffic[\s\S]{1,30}?([\d,\.KkMm]+)/);  if(m) r.traffic=m[1];  }
      if (!r.as)       { const m=text.match(/Authority Score[\s\S]{1,20}?(\d+)/);            if(m) r.as=m[1];       }
      return r;
    });
    console.log(`kw=${d.keywords||'?'} traffic=${d.traffic||'?'} AS=${d.as||'?'}`);
    return d;
  } catch(e) {
    console.log(`ERR: ${e.message.substring(0,50)}`);
    return { keywords:'', traffic:'', as:'', rank:'' };
  }
}

// ── 2. Organic Positions (scroll harvest) ────────────────────────────────────
async function getOrganic(pg, domain) {
  process.stdout.write(`  organic:  ${domain.padEnd(22)} `);
  try {
    await pg.goto(
      `https://www.semrush.com/analytics/organic/positions/?q=${domain}&db=${DB}&sortby=Po&order=asc`,
      { waitUntil: 'networkidle2', timeout: 50000 }
    );
    await ensureLoggedIn(pg);
    await sleep(10000);

    const rows = new Map();

    const harvest = async () => {
      const fresh = await pg.evaluate(() => {
        const res = [];
        // Table rows
        document.querySelectorAll('table tbody tr').forEach(tr => {
          const cells = Array.from(tr.querySelectorAll('td'));
          if (cells.length < 3) return;
          const kw  = cells[0]?.innerText?.trim()?.split('\n')[0]||'';
          const pos = cells[1]?.innerText?.trim()?.split('\n')[0]||'';
          const vol = cells[2]?.innerText?.trim()?.split('\n')[0]||'';
          const kd  = cells[3]?.innerText?.trim()?.split('\n')[0]||'';
          const url = cells[5]?.innerText?.trim()?.split('\n')[0]||cells[4]?.innerText?.trim()?.split('\n')[0]||'';
          if (kw.length>2 && /^\d+$/.test(pos) && +pos<=200)
            res.push({ kw, pos:+pos, vol:vol.replace(/,/g,''), kd, url });
        });
        if (res.length>=5) return res;
        // Line scan fallback
        const lines = document.body.innerText.split('\n').map(l=>l.trim()).filter(Boolean);
        for (let i=0; i<lines.length-3 && res.length<200; i++) {
          const p=lines[i+1], v=lines[i+2];
          if (/^\d+$/.test(p) && +p>=1 && +p<=200 &&
              /^[\d,]+$/.test(v.replace(/,/g,'')) &&
              lines[i].length>2 && lines[i].length<90 &&
              !lines[i].startsWith('Skip') && !/^\d+$/.test(lines[i]) && !lines[i].includes('©')) {
            res.push({ kw:lines[i], pos:+p, vol:v.replace(/,/g,''), kd:lines[i+3]||'', url:'' });
            i+=3;
          }
        }
        return res;
      });
      fresh.forEach(r => { if (!rows.has(r.kw.toLowerCase())) rows.set(r.kw.toLowerCase(), r); });
    };

    await harvest();

    // Scroll table container + page
    for (let s=0; s<25; s++) {
      await pg.evaluate(s => {
        const containers = Array.from(document.querySelectorAll('*')).filter(el => {
          const st = window.getComputedStyle(el);
          return (st.overflowY==='auto'||st.overflowY==='scroll') &&
                 el.scrollHeight > el.clientHeight+100 && el.clientHeight>100;
        });
        if (containers.length>0) {
          const main = containers.reduce((a,b) => a.scrollHeight>b.scrollHeight?a:b);
          main.scrollTop = s * 350;
        }
        window.scrollBy(0, 350);
      }, s);
      await sleep(350);
      await harvest();
    }

    // Try next-page navigation
    for (let p=2; p<=5; p++) {
      const nextClicked = await pg.evaluate(() => {
        const btns = Array.from(document.querySelectorAll('button, a[aria-label], a'));
        const next = btns.find(b => {
          const t=(b.innerText||b.getAttribute('aria-label')||'').trim().toLowerCase();
          return t==='next'||t==='>'||t==='→'||t.includes('next page');
        });
        if (next) { next.click(); return true; }
        return false;
      });
      if (!nextClicked) break;
      await sleep(7000);
      await harvest();
      process.stdout.write(`+p${p}(${rows.size})`);
    }

    console.log(` → ${rows.size} rows`);
    return Array.from(rows.values());
  } catch(e) {
    console.log(`ERR: ${e.message.substring(0,50)}`);
    return [];
  }
}

// ── 3. Top Pages ──────────────────────────────────────────────────────────────
async function getTopPages(pg, domain) {
  process.stdout.write(`  top pages:${domain.padEnd(22)} `);
  try {
    await pg.goto(
      `https://www.semrush.com/analytics/organic/pages/?q=${domain}&db=${DB}&sortby=Tr&order=desc`,
      { waitUntil: 'networkidle2', timeout: 45000 }
    );
    await ensureLoggedIn(pg);
    await sleep(9000);

    const pages = await pg.evaluate(() => {
      const res = [];
      document.querySelectorAll('table tbody tr').forEach((tr,i) => {
        if (i>=30) return;
        const cells = Array.from(tr.querySelectorAll('td'));
        const url  = cells[0]?.innerText?.trim()?.split('\n')[0]||'';
        const tr2  = cells[1]?.innerText?.trim()?.split('\n')[0]||'';
        const kws  = cells[2]?.innerText?.trim()?.split('\n')[0]||'';
        if (url && url.length>3) res.push({ url, traffic:tr2, keywords:kws });
      });
      if (res.length>0) return res;
      // Line scan — look for URL patterns
      const lines = document.body.innerText.split('\n').map(l=>l.trim()).filter(Boolean);
      for (let i=0; i<lines.length-2 && res.length<30; i++) {
        if (lines[i].startsWith('/') || lines[i].startsWith('http')) {
          const traffic = lines[i+1];
          if (/^[\d,\.KkMm]+$/.test(traffic.replace(/,/g,''))) {
            res.push({ url:lines[i], traffic, keywords:lines[i+2]||'' });
            i+=2;
          }
        }
      }
      return res;
    });
    console.log(`${pages.length} pages`);
    return pages;
  } catch(e) {
    console.log(`ERR: ${e.message.substring(0,50)}`);
    return [];
  }
}

// ── 4. Backlinks Overview ────────────────────────────────────────────────────
async function getBacklinks(pg, domain) {
  process.stdout.write(`  backlinks:${domain.padEnd(22)} `);
  try {
    await pg.goto(
      `https://www.semrush.com/analytics/backlinks/overview/?q=${domain}&searchType=domain&db=${DB}`,
      { waitUntil: 'networkidle2', timeout: 45000 }
    );
    await ensureLoggedIn(pg);
    await sleep(10000);

    const d = await pg.evaluate(() => {
      const text = document.body.innerText;
      const r = { total:'', referring:'', follow:'', as:'' };
      const m1 = text.match(/Backlinks[\s:]*\n?([\d,\.KkMm]+)/i);
      const m2 = text.match(/Referring [Dd]omains[\s:]*\n?([\d,\.KkMm]+)/i);
      const m3 = text.match(/Follow[\s:]*\n?([\d,\.KkMm]+)/i);
      if (m1) r.total = m1[1];
      if (m2) r.referring = m2[1];
      if (m3) r.follow = m3[1];
      // Line scan
      const lines = text.split('\n').map(l=>l.trim()).filter(Boolean);
      for (let i=0; i<lines.length-1; i++) {
        const l=lines[i].toLowerCase(), v=lines[i+1];
        if (!v||v==='n/a') continue;
        if ((l==='backlinks'||l==='total backlinks') && /^[\d,\.KkMm]+$/.test(v) && !r.total) r.total=v;
        if (l.includes('referring domain') && /^[\d,\.KkMm]+$/.test(v) && !r.referring) r.referring=v;
        if ((l==='authority score'||l==='as') && /^\d+$/.test(v) && !r.as) r.as=v;
      }
      return r;
    });
    console.log(`total=${d.total||'?'} refDomains=${d.referring||'?'} AS=${d.as||'?'}`);
    return d;
  } catch(e) {
    console.log(`ERR: ${e.message.substring(0,50)}`);
    return { total:'', referring:'', follow:'', as:'' };
  }
}

// ── 5. Traffic Analytics ─────────────────────────────────────────────────────
async function getTrafficAnalytics(pg, domain) {
  process.stdout.write(`  traffic:  ${domain.padEnd(22)} `);
  try {
    await pg.goto(
      `https://www.semrush.com/analytics/traffic/overview/?q=${domain}&db=${DB}`,
      { waitUntil: 'networkidle2', timeout: 45000 }
    );
    await ensureLoggedIn(pg);
    await sleep(9000);

    const d = await pg.evaluate(() => {
      const text = document.body.innerText;
      const r = { visits:'', bounce:'', pagesPerVisit:'', avgDuration:'' };
      const lines = text.split('\n').map(l=>l.trim()).filter(Boolean);
      for (let i=0; i<lines.length-1; i++) {
        const l=lines[i].toLowerCase(), v=lines[i+1];
        if (!v||v==='n/a') continue;
        if ((l==='visits'||l==='total visits') && /^[\d,\.KkMm]+$/.test(v.replace(/,/g,'')) && !r.visits) r.visits=v;
        if (l.includes('bounce') && /^\d+\.?\d*%?$/.test(v) && !r.bounce) r.bounce=v;
        if ((l.includes('pages') && l.includes('visit')) && /^\d+\.?\d*$/.test(v) && !r.pagesPerVisit) r.pagesPerVisit=v;
        if ((l.includes('duration')||l.includes('time on site')) && !r.avgDuration) r.avgDuration=v;
      }
      return r;
    });
    console.log(`visits=${d.visits||'?'} bounce=${d.bounce||'?'}`);
    return d;
  } catch(e) {
    console.log(`ERR: ${e.message.substring(0,50)}`);
    return { visits:'', bounce:'', pagesPerVisit:'', avgDuration:'' };
  }
}

// ── 6. Keyword Gap Tool ──────────────────────────────────────────────────────
async function getKeywordGap(pg) {
  console.log('\n  Keyword Gap tool...');
  try {
    await pg.goto('https://www.semrush.com/analytics/keywordgap/?db=ca',
      { waitUntil: 'networkidle2', timeout: 45000 });
    await ensureLoggedIn(pg);
    await sleep(7000);
    await pg.screenshot({ path: 'C:/Users/Owner/Documents/gap-full-1.png' });

    const pageState = await pg.evaluate(() => ({
      url: window.location.href,
      isGap: window.location.href.includes('keywordgap'),
      inputs: Array.from(document.querySelectorAll('input')).map((el,i)=>({ i, ph:el.placeholder||'', val:el.value||'' }))
    }));

    if (!pageState.isGap) {
      console.log('  Not on gap page, skipping');
      return null;
    }

    console.log(`  Gap inputs: ${pageState.inputs.length}`);

    // Fill in domains
    const domains = ['protasker.ca','homestars.com','bark.com','jiffyondemand.com','taskrabbit.com'];
    const inputs = await pg.$$('input');
    for (let i = 0; i < Math.min(inputs.length, domains.length); i++) {
      await inputs[i].click({ clickCount: 3 });
      await sleep(200);
      await pg.keyboard.type(domains[i], { delay: 60 });
      await sleep(800);
      await pg.keyboard.press('Tab');
      await sleep(600);
    }

    await pg.screenshot({ path: 'C:/Users/Owner/Documents/gap-full-2.png' });

    // Click Compare
    const clicked = await pg.evaluate(() => {
      const all = Array.from(document.querySelectorAll('button'));
      const cmp = all.find(b => /compar/i.test(b.innerText||''));
      if (cmp) { cmp.click(); return cmp.innerText; }
      return null;
    });
    console.log(`  Clicked: ${clicked}`);

    if (clicked) {
      await sleep(20000);
      await pg.screenshot({ path: 'C:/Users/Owner/Documents/gap-full-3.png' });

      const rows = await pg.evaluate(() => {
        const res = [];
        document.querySelectorAll('table tbody tr').forEach((tr,i) => {
          if (i>=100) return;
          const cells = Array.from(tr.querySelectorAll('td'));
          const kw  = cells[0]?.innerText?.trim()?.split('\n')[0]||'';
          const vol = cells[1]?.innerText?.trim()?.split('\n')[0]||'';
          const kd  = cells[2]?.innerText?.trim()?.split('\n')[0]||'';
          if (kw && kw.length>2) res.push({ kw, vol, kd });
        });
        return res;
      });
      console.log(`  Gap rows: ${rows.length}`);
      return rows;
    }
  } catch(e) {
    console.log(`  Gap ERR: ${e.message.substring(0,60)}`);
  }
  return null;
}

// ── BRAND FILTER ─────────────────────────────────────────────────────────────
const BRAND_RE = [/^homestars\b/i,/^bark\b/i,/^jiffy\b/i,/^taskrabbit\b/i,/^urbantasker\b/i,/^yelp\b/i];
const SKIP_KW  = new Set(['login','sign up','signup','account','careers','press','contact','blog','about']);
function relevant(kw) {
  if (!kw||kw.length<4||kw.length>90) return false;
  if (BRAND_RE.some(p=>p.test(kw))) return false;
  if (SKIP_KW.has(kw.toLowerCase().trim())) return false;
  return true;
}

// ── MAIN ──────────────────────────────────────────────────────────────────────
async function main() {
  const browser = await puppeteer.connect({ browserURL:'http://localhost:9222', protocolTimeout:60000 });
  const pages = await browser.pages();
  for (let i=pages.length-1; i>0; i--) try { await pages[i].close(); } catch(_) {}
  const pg = pages[0];
  pg.setDefaultTimeout(55000);

  // Resolve session
  console.log('Resolving SEMrush session...');
  await pg.goto('https://www.semrush.com/dashboard/', { waitUntil:'domcontentloaded', timeout:50000 });
  await sleep(4000);
  await pg.evaluate(() => {
    const b = Array.from(document.querySelectorAll('button')).find(b=>/continue|terminate/i.test(b.innerText||''));
    if (b) b.click();
  });
  await sleep(3000);
  console.log('✅ Session OK\n');

  const data = {};

  // ── Run all sections ──────────────────────────────────────────────────────
  console.log('═══ 1. DOMAIN OVERVIEWS ═══');
  for (const c of DOMAINS) {
    data[c.domain] = { label:c.label, self:c.self||false };
    data[c.domain].overview = await getDomainOverview(pg, c.domain);
    await sleep(2000);
  }
  saveReport(data, null, null);

  console.log('\n═══ 2. BACKLINKS ═══');
  for (const c of DOMAINS) {
    data[c.domain].backlinks = await getBacklinks(pg, c.domain);
    await sleep(2000);
  }
  saveReport(data, null, null);

  console.log('\n═══ 3. TRAFFIC ANALYTICS ═══');
  for (const c of DOMAINS) {
    data[c.domain].traffic = await getTrafficAnalytics(pg, c.domain);
    await sleep(2000);
  }
  saveReport(data, null, null);

  console.log('\n═══ 4. TOP PAGES (competitors only) ═══');
  for (const c of DOMAINS.filter(c=>!c.self)) {
    data[c.domain].topPages = await getTopPages(pg, c.domain);
    await sleep(3000);
    saveReport(data, null, null);
  }

  console.log('\n═══ 5. ORGANIC POSITIONS (competitors only) ═══');
  for (const c of DOMAINS) {
    console.log(`\n▶ ${c.label}`);
    const rows = await getOrganic(pg, c.domain);
    data[c.domain].organic = rows.filter(r=>relevant(r.kw));
    saveReport(data, null, null);
    console.log(`  ✓ ${data[c.domain].organic.length} relevant keywords saved`);
    await sleep(4000);
  }

  console.log('\n═══ 6. KEYWORD GAP ═══');
  const gapRows = await getKeywordGap(pg);
  saveReport(data, gapRows, null);

  console.log(`\n✅ Complete → ${OUT}`);
  browser.disconnect();
}

// ── REPORT BUILDER ────────────────────────────────────────────────────────────
function fmt(v) { return v||'—'; }

function saveReport(data, gapRows, _unused) {
  const date = new Date().toISOString().split('T')[0];
  let md = `# Protasker — Full SEMrush Intelligence\n`;
  md += `*Generated: ${date} | Canada (ca) database | All SEMrush features*\n\n`;

  // ── 1. Domain overview table
  md += `---\n\n## 1. DOMAIN OVERVIEW\n\n`;
  md += `| Domain | Org. Keywords | Org. Traffic | Authority Score | SEMrush Rank |\n`;
  md += `|---|---|---|---|---|\n`;
  Object.values(data).forEach(d => {
    const o = d.overview||{};
    md += `| ${d.label} | ${fmt(o.keywords)} | ${fmt(o.traffic)} | ${fmt(o.as)} | ${fmt(o.rank)} |\n`;
  });

  // ── 2. Backlinks table
  md += `\n---\n\n## 2. BACKLINKS & AUTHORITY\n\n`;
  md += `| Domain | Total Backlinks | Referring Domains | Follow Links | AS |\n`;
  md += `|---|---|---|---|---|\n`;
  Object.values(data).forEach(d => {
    const b = d.backlinks||{};
    md += `| ${d.label} | ${fmt(b.total)} | ${fmt(b.referring)} | ${fmt(b.follow)} | ${fmt(b.as)} |\n`;
  });

  // ── 3. Traffic analytics table
  md += `\n---\n\n## 3. TRAFFIC ANALYTICS\n\n`;
  md += `| Domain | Monthly Visits | Bounce Rate | Pages/Visit | Avg Duration |\n`;
  md += `|---|---|---|---|---|\n`;
  Object.values(data).forEach(d => {
    const t = d.traffic||{};
    md += `| ${d.label} | ${fmt(t.visits)} | ${fmt(t.bounce)} | ${fmt(t.pagesPerVisit)} | ${fmt(t.avgDuration)} |\n`;
  });

  // ── 4. Top pages per competitor
  md += `\n---\n\n## 4. TOP TRAFFIC PAGES (per competitor)\n\n`;
  Object.values(data).filter(d=>!d.self&&d.topPages?.length).forEach(d => {
    md += `### ${d.label}\n`;
    md += `| Page URL | Traffic | Keywords |\n|---|---|---|\n`;
    d.topPages.slice(0,20).forEach(p => {
      md += `| ${p.url?.substring(0,80)||'—'} | ${fmt(p.traffic)} | ${fmt(p.keywords)} |\n`;
    });
    md += '\n';
  });

  // ── 5. Organic positions (top 60 per domain, sorted by volume)
  md += `---\n\n## 5. ORGANIC KEYWORD RANKINGS\n\n`;
  Object.values(data).forEach(d => {
    if (!d.organic?.length) return;
    md += `### ${d.label}\n`;
    md += `| Keyword | Vol | KD | Position |\n|---|---|---|---|\n`;
    [...d.organic]
      .sort((a,b) => parseInt(b.vol||'0') - parseInt(a.vol||'0'))
      .slice(0,60)
      .forEach(r => { md += `| ${r.kw} | ${fmt(r.vol)} | ${fmt(r.kd)} | ${r.pos} |\n`; });
    md += '\n';
  });

  // ── 6. Combined keyword gap
  md += `---\n\n## 6. KEYWORD GAP ANALYSIS\n\n`;
  const ptKws = new Set((data['protasker.ca']?.organic||[]).map(r=>r.kw.toLowerCase()));

  if (gapRows?.length) {
    md += `### Tool Output (Protasker vs HomeStars vs Bark vs Jiffy vs TaskRabbit)\n\n`;
    md += `| Keyword | Vol | KD |\n|---|---|---|\n`;
    gapRows.forEach(r => { md += `| ${r.kw} | ${fmt(r.vol)} | ${fmt(r.kd)} |\n`; });
    md += '\n';
  }

  // Derived gap: all competitor keywords Protasker doesn't rank for
  const gapMap = new Map();
  Object.entries(data).filter(([d])=>d!=='protasker.ca').forEach(([,{label,organic=[]}]) => {
    organic.forEach(r => {
      if (!ptKws.has(r.kw.toLowerCase())) {
        const k = r.kw.toLowerCase();
        if (!gapMap.has(k) || parseInt(r.vol||'0') > parseInt(gapMap.get(k).vol||'0'))
          gapMap.set(k, { ...r, competitor: label });
      }
    });
  });
  const gaps = [...gapMap.values()]
    .filter(r => parseInt(r.vol||'0') >= 50 || parseInt(r.kd||'100') <= 25)
    .sort((a,b) => {
      const s = (r) => parseInt(r.vol||'0') / (parseInt(r.kd||'100') + 1);
      return s(b) - s(a);
    });

  if (gaps.length > 0) {
    md += `### Derived Gap — Competitor ranks, Protasker doesn't (sorted by opportunity score)\n\n`;
    md += `| Keyword | Vol | KD | Competitor | Their Pos |\n|---|---|---|---|---|\n`;
    gaps.slice(0,80).forEach(r => {
      md += `| ${r.kw} | ${fmt(r.vol)} | ${fmt(r.kd)} | ${r.competitor} | ${r.pos} |\n`;
    });
    md += '\n';
  }

  // ── 7. Summary: Priority actions
  md += `---\n\n## 7. PRIORITY ACTIONS FOR PROTASKER\n\n`;
  md += `### Backlink Gap (most urgent)\n`;
  md += `Protasker has **0 backlinks**. First 5 submissions:\n`;
  md += `1. **Google Business Profile** — business.google.com (free, highest DA)\n`;
  md += `2. **Yelp.ca** — biz.yelp.ca (competitor AND a link source)\n`;
  md += `3. **YellowPages.ca** — free listing\n`;
  md += `4. **HomeStars.com listing** — free contractor profile = backlink from AS-50 domain\n`;
  md += `5. **BBB Ontario** — bbb.org/ca/on\n\n`;

  md += `### Keyword Gaps to Close (from service research + competitor data)\n`;
  md += `| Priority | Keyword | Vol | KD | CPC | Target Page |\n|---|---|---|---|---|---|\n`;
  [
    ['🔴','sump pump installation toronto','480','9','$4.92','/services/sump-pump-service/toronto'],
    ['🔴','power washing near me','720','12','$3.50','/services/pressure-washing/[all cities]'],
    ['🔴','floor refinishing near me','320','12','$2.15','/services/hardwood-refinishing/[all cities]'],
    ['🔴','drain snaking toronto','210','10','$8.76','/services/drain-snaking/toronto'],
    ['🔴','ac repair toronto','590','14','$6.85','/services/hvac-maintenance/toronto'],
    ['🔴','airbnb cleaning toronto','170','14','$22.52','/services/airbnb-turnaround/toronto (CPC!)'],
    ['🔴','weed control toronto','320','14','$3.65','/services/weed-removal/toronto'],
    ['🔴','post construction cleaning toronto','210','7','$3.42','/services/post-construction-clean/toronto'],
    ['🔴','tv installation near me','320','16','$2.00','/services/tv-wall-mounting/[all cities]'],
    ['🔴','clogged drain near me','880','16','—','/services/drain-snaking/[all cities]'],
    ['🟡','garage door repair toronto','480','21','$7.17','/services/garage-door-repair/toronto'],
    ['🟡','eavestrough cleaning near me','880','23','$3.47','/services/gutter-cleaning/[all cities]'],
    ['🟡','kitchen remodel toronto','210','18','$3.56','/services/kitchen-renovation/toronto'],
    ['🟡','dryer vent cleaning toronto','260','15','$7.43','/services/dryer-vent-cleaning/toronto'],
    ['🟡','cabinet refinishing near me','320','27','$3.20','/services/cabinet-refacing/[all cities]'],
  ].forEach(([p,kw,v,kd,cpc,pg_]) => { md += `| ${p} | ${kw} | ${v} | ${kd} | ${cpc} | ${pg_} |\n`; });

  writeFileSync(OUT, md, 'utf8');
}

main().catch(e => { console.error('Fatal:', e.message); process.exit(1); });
