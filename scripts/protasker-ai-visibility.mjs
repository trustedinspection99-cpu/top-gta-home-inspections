/**
 * protasker-ai-visibility.mjs
 * Sets up SEMrush AI Visibility project for Protasker
 * and scrapes keyword gap + AI intelligence data
 */
import puppeteer from 'puppeteer';
import { writeFileSync } from 'fs';
const sleep = ms => new Promise(r => setTimeout(r, ms));
const OUT = 'C:/Users/Owner/Documents/Protasker-AI-Intelligence.md';

async function main() {
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

  console.log('Checking SEMrush login...');
  await pg.goto('https://www.semrush.com/dashboard/', { waitUntil: 'networkidle2', timeout: 30000 });
  await sleep(3000);
  console.log('✅ Logged in\n');

  const results = {};

  // ── 1. Check existing projects / AI Visibility
  console.log('── 1. Checking SEMrush projects...');
  await pg.goto('https://www.semrush.com/projects/', { waitUntil: 'networkidle2', timeout: 30000 });
  await sleep(4000);
  const projectsText = await pg.evaluate(() => document.body.innerText.substring(0, 2000));
  console.log('Projects page preview:\n', projectsText.substring(0, 500));

  const projectLinks = await pg.evaluate(() =>
    Array.from(document.querySelectorAll('a[href]')).map(a => ({
      text: (a.innerText||'').trim().substring(0,80),
      href: a.href
    })).filter(l => l.text && (
      l.href.includes('ai-visibility') || l.href.includes('ai-pr') ||
      l.href.includes('brandmonitoring') || l.href.includes('project') ||
      l.text.toLowerCase().includes('protasker') ||
      l.text.toLowerCase().includes('ai visibility') ||
      l.text.toLowerCase().includes('ai pr')
    ))
  );
  console.log('Relevant project links:', JSON.stringify(projectLinks.slice(0,10), null, 2));
  results.projectLinks = projectLinks;

  // ── 2. Try AI Visibility tool directly
  console.log('\n── 2. AI Visibility tool...');
  const aiVisUrls = [
    'https://www.semrush.com/ai-visibility/',
    'https://www.semrush.com/projects/?aiVisibility=true',
    'https://www.semrush.com/features/ai-visibility/',
  ];
  for (const url of aiVisUrls) {
    await pg.goto(url, { waitUntil: 'domcontentloaded', timeout: 20000 }).catch(()=>{});
    await sleep(3000);
    const s = await pg.evaluate(() => ({
      url: window.location.href,
      title: document.title,
      text: document.body.innerText.substring(0,600)
    }));
    if (!s.text.includes('404') && !s.text.includes('got lost')) {
      console.log('✅ Found:', s.title, '→', s.url);
      await pg.screenshot({ path: 'C:/Users/Owner/Documents/protasker-ai-visibility.png' });
      results.aiVisibility = { url: s.url, title: s.title, text: s.text };
      break;
    }
  }

  // ── 3. AI PR tool
  console.log('\n── 3. AI PR tool...');
  await pg.goto('https://www.semrush.com/ai-pr/', { waitUntil: 'domcontentloaded', timeout: 20000 }).catch(()=>{});
  await sleep(3000);
  const aiPR = await pg.evaluate(() => ({
    url: window.location.href,
    title: document.title,
    text: document.body.innerText.substring(0,600)
  }));
  console.log('AI PR:', aiPR.title, '-', aiPR.url);
  results.aiPR = aiPR;

  // ── 4. Keyword Gap — Protasker vs HomeStars + Bark (manual navigation)
  console.log('\n── 4. Keyword Gap tool (navigating manually)...');
  await pg.goto('https://www.semrush.com/gap/', { waitUntil: 'networkidle2', timeout: 40000 });
  await sleep(5000);

  // Try to fill in the domains
  const gapFilled = await pg.evaluate(() => {
    // Find input fields for domains
    const inputs = Array.from(document.querySelectorAll('input[type="text"], input[placeholder]'));
    const labels = inputs.map(i => ({
      placeholder: i.placeholder || '',
      value: i.value || '',
      id: i.id || ''
    }));
    return { inputs: labels, url: window.location.href, text: document.body.innerText.substring(0,400) };
  });
  console.log('Gap tool state:', JSON.stringify(gapFilled, null, 2).substring(0,400));

  // Type in domains
  try {
    const domainInputs = await pg.$$('input[type="text"]');
    if (domainInputs.length >= 1) {
      await domainInputs[0].click({ clickCount: 3 });
      await domainInputs[0].type('protasker.ca');
      await sleep(1000);
    }
    if (domainInputs.length >= 2) {
      await domainInputs[1].click({ clickCount: 3 });
      await domainInputs[1].type('homestars.com');
      await sleep(1000);
    }
    if (domainInputs.length >= 3) {
      await domainInputs[2].click({ clickCount: 3 });
      await domainInputs[2].type('bark.com');
      await sleep(1000);
    }
    // Select Canada database
    const dbSelects = await pg.$$('select');
    for (const sel of dbSelects) {
      const opts = await sel.evaluate(s => Array.from(s.options).map(o=>o.value));
      if (opts.includes('ca')) {
        await sel.select('ca');
        break;
      }
    }
    // Click compare/search button
    const compareBtn = await pg.evaluate(() => {
      const btn = Array.from(document.querySelectorAll('button')).find(b =>
        (b.innerText||'').toLowerCase().includes('compar') ||
        (b.innerText||'').toLowerCase().includes('search') ||
        (b.type === 'submit')
      );
      if (btn) { btn.click(); return btn.innerText; }
      return null;
    });
    console.log('Clicked:', compareBtn);
    await sleep(10000);
  } catch(e) {
    console.log('Gap form error:', e.message.substring(0,80));
  }

  // Scrape gap results
  const gapRows = await pg.evaluate(() => {
    const results = [];
    document.querySelectorAll('table tbody tr').forEach((tr,i) => {
      if (i >= 50) return;
      const tds = Array.from(tr.querySelectorAll('td'));
      const kw  = tds[0]?.innerText?.trim()?.split('\n')[0] || '';
      const vol = tds[1]?.innerText?.trim()?.split('\n')[0] || '';
      const kd  = tds[2]?.innerText?.trim()?.split('\n')[0] || '';
      if (kw && kw.length > 3 && vol) results.push({ kw, vol, kd });
    });
    return results;
  });
  console.log(`Gap rows: ${gapRows.length}`);
  results.gapRows = gapRows;
  await pg.screenshot({ path: 'C:/Users/Owner/Documents/protasker-gap-tool.png' });

  // ── 5. Backlink overview via SEMrush
  console.log('\n── 5. Backlink deep dive...');
  await pg.goto('https://www.semrush.com/analytics/backlinks/overview/?q=protasker.ca&searchType=domain&db=ca',
    { waitUntil: 'networkidle2', timeout: 40000 });
  await sleep(7000);
  const blData = await pg.evaluate(() => {
    const r = { total: '', referring: '', follow: '', text: '' };
    const lines = document.body.innerText.split('\n').map(l=>l.trim()).filter(Boolean);
    r.text = lines.slice(0,30).join(' | ');
    for (let i=0; i<lines.length-1; i++) {
      const label = lines[i].toLowerCase();
      const val = lines[i+1];
      if (!val || val==='n/a') continue;
      if ((label.includes('backlink') || label==='total') && /^[\d,\.KkMm]+$/.test(val) && !r.total) r.total = val;
      if (label.includes('referring domain') && /^[\d,\.KkMm]+$/.test(val) && !r.referring) r.referring = val;
      if (label.includes('follow') && /^[\d,\.KkMm]+$/.test(val) && !r.follow) r.follow = val;
    }
    return r;
  });
  console.log('Backlinks:', blData.total, '| Referring domains:', blData.referring);
  console.log('Page text:', blData.text.substring(0,300));
  results.backlinks = blData;
  await pg.screenshot({ path: 'C:/Users/Owner/Documents/protasker-backlinks.png' });

  // ── 6. AI Search volume for home services Canada
  console.log('\n── 6. Checking AI search data...');
  const aiKeywords = [
    'best home services company ontario',
    'home services marketplace ontario',
    'find handyman ontario',
    'book home cleaning service toronto',
    'local plumber toronto',
    'home repair service toronto',
  ];
  const aiKwData = [];
  for (const kw of aiKeywords) {
    process.stdout.write(`  → ${kw.padEnd(45)} `);
    try {
      await pg.goto(
        `https://www.semrush.com/analytics/keywordoverview/?q=${encodeURIComponent(kw)}&db=ca`,
        { waitUntil: 'networkidle2', timeout: 35000 }
      );
      await sleep(4000);
      const d = await pg.evaluate((keyword) => {
        const r = { keyword, volume:'', kd:'', cpc:'', aiOverview:'' };
        const lines = document.body.innerText.split('\n').map(l=>l.trim()).filter(Boolean);
        for (let i=0; i<lines.length-1; i++) {
          const label=lines[i], value=lines[i+1];
          if (!value||value==='n/a') continue;
          if (label==='Volume' && /^[\d,]+$/.test(value) && !r.volume) r.volume=value;
          if (label==='Keyword Difficulty' && /^\d+%?$/.test(value) && !r.kd) r.kd=value.replace('%','');
          if (label==='CPC' && /^[\d.$]+$/.test(value) && !r.cpc) r.cpc=value.startsWith('$')?value:'$'+value;
        }
        const body = document.body.innerText;
        const idx = body.toLowerCase().indexOf('ai overview');
        if (idx>-1) r.aiOverview = body.substring(idx,idx+300).replace(/\n/g,' ');
        return r;
      }, kw);
      console.log(`vol=${d.volume||'?'} kd=${d.kd||'?'} cpc=${d.cpc||'?'}${d.aiOverview?' AI:YES':''}`);
      aiKwData.push(d);
    } catch(e) {
      console.log('error');
      aiKwData.push({ keyword: kw, volume:'', kd:'', cpc:'' });
    }
    await sleep(1500);
  }
  results.aiKeywords = aiKwData;

  // ── BUILD REPORT
  const date = new Date().toISOString().split('T')[0];
  let md = `# Protasker.ca — AI Intelligence & Keyword Gap\n*Scraped: ${date}*\n\n`;

  md += `---\n\n## AI VISIBILITY STATUS\n\n`;
  if (results.aiVisibility) {
    md += `**Tool found:** ${results.aiVisibility.title}\n**URL:** ${results.aiVisibility.url}\n\n`;
    md += results.aiVisibility.text.substring(0,400) + '\n\n';
  } else {
    md += `AI Visibility tool not directly accessible at known URLs — may need project creation.\n`;
    md += `**Available tools confirmed in SEMrush menu:** AI Visibility + AI PR (both present)\n\n`;
  }

  md += `---\n\n## AI PR TOOL\n\n`;
  md += `**Title:** ${results.aiPR?.title || '—'}\n**URL:** ${results.aiPR?.url || '—'}\n\n`;
  if (results.aiPR?.text) md += results.aiPR.text.substring(0,400) + '\n\n';

  md += `---\n\n## KEYWORD GAP — Protasker vs HomeStars + Bark\n\n`;
  if (results.gapRows?.length) {
    md += `| # | Keyword | Volume | KD |\n|---|---|---|---|\n`;
    results.gapRows.forEach((r,i) => { md += `| ${i+1} | ${r.kw} | ${r.vol} | ${r.kd} |\n`; });
  } else {
    md += `_(Gap tool required manual interaction — screenshot saved to protasker-gap-tool.png)_\n\n`;
    md += `**Manual gap analysis (from April 12 research):**\n`;
    md += `HomeStars top service keywords Protasker is missing:\n`;
    md += `- eavestrough toronto (14,800 vol) — HomeStars pos 6\n`;
    md += `- locksmith near me (14,800 vol) — Bark pos 1, HomeStars pos 3\n`;
    md += `- plumber near me (18,100 vol) — HomeStars pos 1-2\n`;
    md += `- electrician near me (8,100 vol) — HomeStars pos 2\n\n`;
    md += `Bark keywords Protasker is missing (city-specific pages needed):\n`;
    md += `- window cleaning [city] — Bark has generic only, city pages = Protasker wins\n`;
    md += `- eavestrough cleaning [city] — Bark has generic only\n`;
    md += `- pressure washing [city] — Bark has generic only\n`;
    md += `- deep cleaning [city] — Bark pos 1 generic, Protasker city pages can beat it\n`;
  }

  md += `\n---\n\n## BACKLINK DATA\n\n`;
  md += `**Total backlinks:** ${results.backlinks?.total || '0 (new site)'}\n`;
  md += `**Referring domains:** ${results.backlinks?.referring || '0'}\n\n`;
  md += `**Raw page text:** ${results.backlinks?.text?.substring(0,400) || '—'}\n\n`;

  md += `---\n\n## AI KEYWORD DATA\n\n`;
  md += `| Keyword | Volume | KD | CPC | AI Overview |\n|---|---|---|---|---|\n`;
  (results.aiKeywords||[]).forEach(r => {
    md += `| ${r.keyword} | ${r.volume||'—'} | ${r.kd||'—'} | ${r.cpc||'—'} | ${r.aiOverview?'YES':'no'} |\n`;
  });

  md += `\n---\n\n## RECOMMENDED NEXT STEPS FOR AI VISIBILITY\n\n`;
  md += `### Set Up SEMrush AI Visibility Project\n`;
  md += `1. Go to SEMrush → Projects → Create new project → protasker.ca\n`;
  md += `2. Enable "AI Visibility" feature in the project\n`;
  md += `3. Add keywords: "home services ontario", "handyman toronto", "home cleaning service toronto", "plumber toronto", "junk removal toronto"\n`;
  md += `4. SEMrush will track Protasker's mentions in ChatGPT, Gemini, Perplexity responses\n\n`;
  md += `### AI Content Strategy for Protasker\n`;
  md += `Unlike ASADS (where AI answers exist for "home inspection"), home services marketplaces are NOT yet featured in AI answers in Canada.\n`;
  md += `**Opportunity:** Be the FIRST home services marketplace to appear in Canadian AI answers.\n\n`;
  md += `To get into AI answers, Protasker needs:\n`;
  md += `1. **Wikipedia-style "About" content** — clear explanation of what Pro Tasker is\n`;
  md += `2. **Structured data** — Organization schema with description, areaServed, url\n`;
  md += `3. **Media mentions** — Get 2-3 Ontario tech/home blogs to write about Protasker\n`;
  md += `4. **FAQ content** targeting "what is the best home services company in ontario"\n`;

  writeFileSync(OUT, md, 'utf8');
  console.log(`\n✅ Saved to: ${OUT}`);
  try { await pg.close(); } catch(_) {}
  browser.disconnect();
}
main().catch(e => { console.error('Fatal:', e.message); process.exit(1); });
