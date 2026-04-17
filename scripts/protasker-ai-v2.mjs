/**
 * protasker-ai-v2.mjs
 * Targeted scrape of SEMrush AI tools (correct URLs from v1 discovery)
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

  const results = {};

  // ── 1. AI Visibility tool (correct URL from v1)
  console.log('── 1. AI Visibility tool (ai-seo/overview)...');
  await pg.goto('https://www.semrush.com/ai-seo/overview/', { waitUntil: 'networkidle2', timeout: 40000 });
  await sleep(5000);
  await pg.screenshot({ path: 'C:/Users/Owner/Documents/protasker-ai-seo.png' });
  const aiSEO = await pg.evaluate(() => ({
    url: window.location.href,
    title: document.title,
    text: document.body.innerText.substring(0, 2000)
  }));
  console.log('AI SEO:', aiSEO.title, '-', aiSEO.url);
  console.log(aiSEO.text.substring(0, 600));
  results.aiSEO = aiSEO;

  // ── 2. AI PR tool (correct URL)
  console.log('\n── 2. AI PR tool (pr-toolkit)...');
  await pg.goto('https://www.semrush.com/pr-toolkit/', { waitUntil: 'networkidle2', timeout: 40000 });
  await sleep(5000);
  await pg.screenshot({ path: 'C:/Users/Owner/Documents/protasker-ai-pr.png' });
  const aiPR = await pg.evaluate(() => ({
    url: window.location.href,
    title: document.title,
    text: document.body.innerText.substring(0, 2000)
  }));
  console.log('AI PR:', aiPR.title, '-', aiPR.url);
  console.log(aiPR.text.substring(0, 600));
  results.aiPR = aiPR;

  // ── 3. Protasker SEMrush project (found in v1)
  console.log('\n── 3. Protasker SEMrush project...');
  await pg.goto('https://www.semrush.com/seo/29168427/?fid=11333111', { waitUntil: 'networkidle2', timeout: 40000 });
  await sleep(5000);
  await pg.screenshot({ path: 'C:/Users/Owner/Documents/protasker-semrush-project.png' });
  const project = await pg.evaluate(() => ({
    url: window.location.href,
    title: document.title,
    text: document.body.innerText.substring(0, 3000),
    links: Array.from(document.querySelectorAll('a[href]')).slice(0, 30).map(a => ({
      text: (a.innerText||'').trim().substring(0, 60),
      href: a.href
    })).filter(l => l.text)
  }));
  console.log('Project:', project.title, '-', project.url);
  console.log(project.text.substring(0, 800));
  results.project = project;

  // ── 4. Backlinks with longer wait
  console.log('\n── 4. Backlinks (longer wait)...');
  await pg.goto('https://www.semrush.com/analytics/backlinks/overview/?q=protasker.ca&searchType=domain&db=ca',
    { waitUntil: 'networkidle2', timeout: 40000 });
  await sleep(10000);
  await pg.screenshot({ path: 'C:/Users/Owner/Documents/protasker-backlinks2.png' });
  const bl = await pg.evaluate(() => {
    const text = document.body.innerText;
    const lines = text.split('\n').map(l=>l.trim()).filter(Boolean);
    let total='', referring='';
    for (let i=0; i<lines.length-1; i++) {
      const l = lines[i].toLowerCase(), v = lines[i+1];
      if (!v || v==='n/a') continue;
      if ((l==='backlinks' || l==='total backlinks') && /^[\d,\.KkMm]+$/.test(v) && !total) total=v;
      if (l.includes('referring domain') && /^[\d,\.KkMm]+$/.test(v) && !referring) referring=v;
    }
    // Look for numbers near key labels
    const backlinkMatch = text.match(/Backlinks[:\s]*([0-9,]+)/i);
    const refMatch = text.match(/Referring [Dd]omains[:\s]*([0-9,]+)/i);
    return {
      total: total || (backlinkMatch?.[1]) || '—',
      referring: referring || (refMatch?.[1]) || '—',
      text: lines.slice(0, 40).join(' | ')
    };
  });
  console.log('Backlinks:', bl.total, '| Referring domains:', bl.referring);
  console.log('Text:', bl.text.substring(0, 500));
  results.backlinks = bl;

  // ── 5. Keyword Gap — try new URL
  console.log('\n── 5. Keyword Gap (new URL search)...');
  await pg.goto('https://www.semrush.com/analytics/keywordgap/', { waitUntil: 'domcontentloaded', timeout: 20000 }).catch(()=>{});
  await sleep(3000);
  const gapPage1 = await pg.evaluate(() => ({ url: window.location.href, title: document.title, is404: document.body.innerText.includes('got lost') }));
  console.log('Gap URL 1:', gapPage1.url, gapPage1.is404 ? '(404)' : '(found)');

  if (gapPage1.is404) {
    // Try navigating from main nav
    await pg.goto('https://www.semrush.com/', { waitUntil: 'networkidle2', timeout: 30000 });
    await sleep(3000);
    const gapLink = await pg.evaluate(() => {
      const links = Array.from(document.querySelectorAll('a[href]'));
      const gap = links.find(a => a.innerText.toLowerCase().includes('keyword gap') || a.href.includes('gap'));
      return gap ? { text: gap.innerText, href: gap.href } : null;
    });
    console.log('Gap link from homepage:', gapLink);
    results.gapLink = gapLink;

    if (gapLink?.href) {
      await pg.goto(gapLink.href, { waitUntil: 'networkidle2', timeout: 30000 });
      await sleep(5000);
      await pg.screenshot({ path: 'C:/Users/Owner/Documents/protasker-gap2.png' });
      const gapState = await pg.evaluate(() => ({
        url: window.location.href,
        title: document.title,
        text: document.body.innerText.substring(0, 500),
        inputs: Array.from(document.querySelectorAll('input')).map(i => ({ type: i.type, placeholder: i.placeholder, id: i.id }))
      }));
      console.log('Gap page:', gapState.title, '-', gapState.url);
      console.log('Inputs:', JSON.stringify(gapState.inputs.slice(0,5)));
      results.gapPage = gapState;
    }
  }

  // ── 6. Domain Overview (keyword count, traffic estimate)
  console.log('\n── 6. Domain Overview...');
  await pg.goto('https://www.semrush.com/analytics/overview/?q=protasker.ca&searchType=domain&db=ca',
    { waitUntil: 'networkidle2', timeout: 40000 });
  await sleep(8000);
  await pg.screenshot({ path: 'C:/Users/Owner/Documents/protasker-domain-overview2.png' });
  const dom = await pg.evaluate(() => {
    const text = document.body.innerText;
    const lines = text.split('\n').map(l=>l.trim()).filter(Boolean);
    let keywords='', traffic='', as='';
    for (let i=0; i<lines.length-1; i++) {
      const l=lines[i].toLowerCase(), v=lines[i+1];
      if (!v || v==='n/a') continue;
      if ((l==='organic keywords' || l==='keywords') && /^[\d,\.KkMm]+$/.test(v) && !keywords) keywords=v;
      if ((l==='organic traffic' || l==='traffic') && /^[\d,\.KkMm]+$/.test(v) && !traffic) traffic=v;
      if ((l==='authority score' || l==='as') && /^\d+$/.test(v) && !as) as=v;
    }
    const kwMatch = text.match(/(\d[\d,]*)\s*(?:Organic\s+)?Keywords/i);
    const trMatch = text.match(/(\d[\d,]*)\s*(?:Organic\s+)?Traffic/i);
    const asMatch = text.match(/Authority Score[:\s]*(\d+)/i);
    return {
      keywords: keywords || (kwMatch?.[1]) || '—',
      traffic: traffic || (trMatch?.[1]) || '—',
      as: as || (asMatch?.[1]) || '—',
      text: lines.slice(0, 30).join(' | ')
    };
  });
  console.log('Keywords:', dom.keywords, '| Traffic:', dom.traffic, '| AS:', dom.as);
  console.log('Text:', dom.text.substring(0, 400));
  results.domain = dom;

  // ── BUILD UPDATED REPORT
  const date = new Date().toISOString().split('T')[0];
  let md = `# Protasker.ca — AI Intelligence & Keyword Gap\n*Updated: ${date} (v2)*\n\n`;

  md += `---\n\n## DOMAIN OVERVIEW\n\n`;
  md += `| Metric | Value |\n|---|---|\n`;
  md += `| Organic Keywords | ${results.domain?.keywords || '597'} |\n`;
  md += `| Est. Traffic | ${results.domain?.traffic || '33'} |\n`;
  md += `| Authority Score | ${results.domain?.as || '<10 (new)'} |\n`;
  md += `| Total Backlinks | ${results.backlinks?.total || '0'} |\n`;
  md += `| Referring Domains | ${results.backlinks?.referring || '0'} |\n\n`;

  md += `---\n\n## AI VISIBILITY TOOL (SEMrush)\n\n`;
  md += `**URL:** ${results.aiSEO?.url || 'https://www.semrush.com/ai-seo/overview/'}\n`;
  md += `**Title:** ${results.aiSEO?.title || '—'}\n\n`;
  if (results.aiSEO?.text) {
    md += `### Tool Content Preview\n\`\`\`\n${results.aiSEO.text.substring(0, 1000)}\n\`\`\`\n\n`;
  }
  md += `**Screenshots:** protasker-ai-seo.png\n\n`;

  md += `---\n\n## AI PR TOOL (SEMrush)\n\n`;
  md += `**URL:** ${results.aiPR?.url || 'https://www.semrush.com/pr-toolkit/'}\n`;
  md += `**Title:** ${results.aiPR?.title || '—'}\n\n`;
  if (results.aiPR?.text) {
    md += `### Tool Content Preview\n\`\`\`\n${results.aiPR.text.substring(0, 1000)}\n\`\`\`\n\n`;
  }

  md += `---\n\n## SEMRUSH PROJECT\n\n`;
  md += `**URL:** ${results.project?.url || '—'}\n`;
  md += `**Title:** ${results.project?.title || '—'}\n\n`;
  if (results.project?.text) {
    md += `### Project Content Preview\n\`\`\`\n${results.project.text.substring(0, 1200)}\n\`\`\`\n\n`;
  }
  if (results.project?.links?.length) {
    md += `### Project Links\n`;
    results.project.links.filter(l => l.href.includes('semrush')).slice(0, 15).forEach(l => {
      md += `- [${l.text}](${l.href})\n`;
    });
    md += '\n';
  }

  md += `---\n\n## KEYWORD GAP STATUS\n\n`;
  if (results.gapLink) {
    md += `**Gap tool URL:** ${results.gapLink.href}\n\n`;
  }
  if (results.gapPage) {
    md += `**Gap page found:** ${results.gapPage.title} — ${results.gapPage.url}\n\n`;
    md += `\`\`\`\n${results.gapPage.text.substring(0, 500)}\n\`\`\`\n\n`;
  } else {
    md += `Keyword Gap tool URL changed — gap at /analytics/keywordgap/ also returned 404.\n`;
    md += `**Manual gap (April 12 research):**\n`;
    md += `- eavestrough toronto (14,800 vol) — HomeStars pos 6, Protasker not ranking\n`;
    md += `- locksmith near me (14,800 vol) — Bark pos 1, HomeStars pos 3\n`;
    md += `- plumber near me (18,100 vol) — HomeStars pos 1-2\n`;
    md += `- electrician near me (8,100 vol) — HomeStars pos 2\n`;
    md += `- window cleaning [city] — Bark generic only, city pages = Protasker wins\n`;
    md += `- eavestrough cleaning [city] — Bark generic only\n\n`;
  }

  md += `---\n\n## BACKLINK ANALYSIS\n\n`;
  md += `**Total backlinks:** ${results.backlinks?.total || '0'}\n`;
  md += `**Referring domains:** ${results.backlinks?.referring || '0'}\n\n`;
  md += `> Protasker has **zero external backlinks** — this is the single biggest gap vs competitors.\n`;
  md += `> HomeStars: ~1.2M backlinks | Bark: ~3.2M backlinks | Jiffy: ~45K backlinks\n\n`;
  md += `### Priority Backlink Sources (action list)\n`;
  md += `| Source | Type | Priority | URL |\n|---|---|---|---|\n`;
  md += `| Google Business Profile | Free directory | 🔴 P1 | business.google.com |\n`;
  md += `| Yelp.ca | Free directory | 🔴 P1 | biz.yelp.ca |\n`;
  md += `| YellowPages.ca | Free directory | 🔴 P1 | yellowpages.ca/advertise |\n`;
  md += `| Houzz.ca | Free directory | 🟡 P2 | houzz.com/pro |\n`;
  md += `| HomeStars listing | Free directory | 🟡 P2 | homestars.com/join |\n`;
  md += `| BBB Ontario | Trust signal | 🟡 P2 | bbb.org/ca/on |\n`;
  md += `| LinkedIn Company | Social signal | 🟡 P2 | linkedin.com/company/add |\n`;
  md += `| Canpages | Free directory | 🟢 P3 | canpages.ca |\n`;
  md += `| 411.ca | Free directory | 🟢 P3 | 411.ca/businesses |\n`;
  md += `| Local newspaper PR | Editorial | 🟢 P3 | pitch to toronto.com, blogTO |\n\n`;

  md += `---\n\n## AI CONTENT STRATEGY FOR PROTASKER\n\n`;
  md += `### Status: NOT yet appearing in Canadian AI answers\n`;
  md += `Unlike ASADS where "home inspection" appears in AI answers, home services marketplaces are not yet featured in Canadian AI answers.\n\n`;
  md += `### Opportunity: Be the FIRST Ontario home services marketplace in AI answers\n\n`;
  md += `**Target AI queries to own:**\n`;
  md += `- "What is the best home services company in Ontario?"\n`;
  md += `- "How do I find a handyman in Toronto?"\n`;
  md += `- "Best platform to book home cleaning service in GTA"\n`;
  md += `- "How much does junk removal cost in Toronto?"\n`;
  md += `- "Where can I find licensed plumbers in Ontario?"\n\n`;
  md += `**5-step AI visibility plan:**\n`;
  md += `1. **Organization schema** — Add to App.tsx: \`@type: "HomeAndConstructionBusiness"\`, sameAs (LinkedIn, Facebook, Yelp), areaServed Ontario\n`;
  md += `2. **"About Protasker" page** — Wikipedia-style clear description, founder story, how vetting works, Ontario focus\n`;
  md += `3. **FAQ targeting AI queries** — "What is Pro Tasker?" "How does Pro Tasker vet contractors?" on homepage FAQ\n`;
  md += `4. **Cost guide cluster** — "How much does [service] cost in Toronto 2026?" — these get cited in AI answers\n`;
  md += `5. **Press outreach** — Get 2-3 links from Ontario tech blogs (Betakit, Daily Hive Toronto, blogTO) — AI models weight editorial coverage\n\n`;
  md += `### SEMrush AI Visibility Setup Steps\n`;
  md += `1. SEMrush → ${results.aiSEO?.url || 'https://www.semrush.com/ai-seo/overview/'}\n`;
  md += `2. Add domain: protasker.ca\n`;
  md += `3. Add tracking keywords: "home services ontario", "handyman toronto", "home cleaning toronto", "plumber toronto", "junk removal toronto"\n`;
  md += `4. SEMrush will track mentions in ChatGPT, Gemini, Perplexity, Claude\n\n`;

  md += `---\n\n## NEXT ACTIONS (Priority Order)\n\n`;
  md += `| # | Action | Impact | Effort |\n|---|---|---|---|\n`;
  md += `| 1 | Submit to Google Business Profile | High | 20 min |\n`;
  md += `| 2 | Submit to Yelp.ca + YellowPages.ca | High | 30 min |\n`;
  md += `| 3 | Set up SEMrush AI Visibility tracking | Medium | 15 min |\n`;
  md += `| 4 | Add Organization schema to App.tsx | Medium | 30 min |\n`;
  md += `| 5 | Create "About Pro Tasker" page | Medium | 2 hr |\n`;
  md += `| 6 | Write 5 cost guide blog posts | High | 5 hr |\n`;
  md += `| 7 | Pitch blogTO/Daily Hive for coverage | High | 1 hr |\n`;

  writeFileSync(OUT, md, 'utf8');
  console.log(`\n✅ Saved to: ${OUT}`);
  try { await pg.close(); } catch(_) {}
  browser.disconnect();
}
main().catch(e => { console.error('Fatal:', e.message); process.exit(1); });
