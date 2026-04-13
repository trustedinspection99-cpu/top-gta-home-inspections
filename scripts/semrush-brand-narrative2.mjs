import puppeteer from 'puppeteer';
import fs from 'fs';
const sleep = ms => new Promise(r => setTimeout(r, ms));

async function main() {
  const browser = await puppeteer.connect({ browserURL: 'http://localhost:9222' });
  const pages = await browser.pages();
  const pg = pages.find(p => p.url().includes('semrush')) || pages[0];
  pg.setDefaultTimeout(40000);

  const results = {};

  // ── 1. Navigate to the AI Visibility Toolkit overview ──
  console.log('\n━━━ AI Visibility Toolkit ━━━');
  await pg.goto('https://www.semrush.com/ai-seo/overview/', { waitUntil: 'networkidle2', timeout: 40000 });
  await sleep(5000);
  await pg.screenshot({ path: 'C:/Users/Owner/Documents/top-gta-home-inspections/scripts/seo-aiseo-overview.png' });

  const overviewText = await pg.evaluate(() => document.body.innerText.substring(0, 6000));
  console.log(overviewText.substring(0, 3000));

  // Get all internal nav links from within the tool
  const allLinks = await pg.evaluate(() => {
    return Array.from(document.querySelectorAll('a[href]'))
      .map(a => ({ text: a.innerText?.trim().substring(0, 50), href: a.href }))
      .filter(a => a.href.includes('semrush.com/ai-seo') || a.href.includes('semrush.com/brand'))
      .slice(0, 50);
  });
  console.log('\nAI SEO internal links found:', JSON.stringify(allLinks, null, 2));
  results.overview = overviewText;
  results.internalLinks = allLinks;

  // ── 2. Click the asads.ca project to open it ──
  console.log('\n━━━ Opening asads.ca project ━━━');
  const clicked = await pg.evaluate(() => {
    const links = Array.from(document.querySelectorAll('a, button, [role="button"]'));
    const asads = links.find(el => el.innerText?.includes('asads.ca') || el.href?.includes('asads'));
    if (asads) { asads.click(); return 'clicked asads'; }
    // Try clicking "Check AI Visibility" button
    const checkBtn = links.find(el => el.innerText?.trim() === 'Check AI Visibility');
    if (checkBtn) { checkBtn.click(); return 'clicked check'; }
    return null;
  });
  console.log('Clicked:', clicked);
  await sleep(5000);
  await pg.screenshot({ path: 'C:/Users/Owner/Documents/top-gta-home-inspections/scripts/seo-asads-project.png' });
  console.log('URL after click:', pg.url());

  const projectText = await pg.evaluate(() => document.body.innerText.substring(0, 6000));
  console.log(projectText.substring(0, 3000));
  results.projectPage = projectText;

  // Get all nav/sidebar links from the project
  const projectLinks = await pg.evaluate(() => {
    return Array.from(document.querySelectorAll('a[href], nav a, aside a, [role="navigation"] a'))
      .map(a => ({ text: a.innerText?.trim().substring(0, 50), href: a.href }))
      .filter(a => a.href && a.href.includes('semrush') && !a.href.includes('logout') && !a.href.includes('cookie'))
      .slice(0, 40);
  });
  console.log('\nProject page links:', JSON.stringify(projectLinks, null, 2));
  results.projectLinks = projectLinks;

  // ── 3. Look for Brand Narrative tab/section ──
  const brandNarrativeLink = projectLinks.find(l =>
    l.text?.toLowerCase().includes('narrative') ||
    l.text?.toLowerCase().includes('brand') ||
    l.text?.toLowerCase().includes('sentiment') ||
    l.href?.toLowerCase().includes('narrative') ||
    l.href?.toLowerCase().includes('sentiment')
  );
  console.log('\nBrand narrative link:', brandNarrativeLink);

  if (brandNarrativeLink) {
    console.log('\n━━━ Brand Narrative Section ━━━');
    await pg.goto(brandNarrativeLink.href, { waitUntil: 'networkidle2', timeout: 40000 });
    await sleep(5000);
    await pg.screenshot({ path: 'C:/Users/Owner/Documents/top-gta-home-inspections/scripts/seo-brand-narrative-found.png' });
    results.brandNarrative = await pg.evaluate(() => document.body.innerText.substring(0, 8000));
    console.log(results.brandNarrative.substring(0, 4000));
  }

  // ── 4. Click through sidebar items to find all sections ──
  console.log('\n━━━ Exploring sidebar sections ━━━');
  const sidebarItems = await pg.evaluate(() => {
    return Array.from(document.querySelectorAll('nav a, aside a, [class*="sidebar"] a, [class*="menu"] a, [class*="nav"] a'))
      .map(a => ({ text: a.innerText?.trim(), href: a.href }))
      .filter(a => a.text && a.text.length > 1 && a.href?.includes('semrush'))
      .slice(0, 20);
  });
  console.log('Sidebar items:', JSON.stringify(sidebarItems, null, 2));
  results.sidebarItems = sidebarItems;

  fs.writeFileSync(
    'C:/Users/Owner/Documents/top-gta-home-inspections/scripts/semrush-brand-narrative2.json',
    JSON.stringify(results, null, 2)
  );

  console.log('\n✅ Saved');
  browser.disconnect();
}
main().catch(e => console.error('Fatal:', e.message, e.stack));
