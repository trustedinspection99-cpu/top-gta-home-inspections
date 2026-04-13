import puppeteer from 'puppeteer';
import fs from 'fs';
const sleep = ms => new Promise(r => setTimeout(r, ms));

async function getText(pg) {
  return pg.evaluate(() => document.body.innerText.substring(0, 8000));
}

async function main() {
  const browser = await puppeteer.connect({ browserURL: 'http://localhost:9222' });
  const pages = await browser.pages();
  const pg = pages.find(p => p.url().includes('semrush')) || pages[0];
  pg.setDefaultTimeout(40000);

  const results = {};

  // ── 1. AI Visibility Overview for asads.ca ──
  console.log('\n━━━ AI Visibility Overview ━━━');
  await pg.goto('https://www.semrush.com/ai-seo/', { waitUntil: 'networkidle2', timeout: 40000 });
  await sleep(4000);
  await pg.screenshot({ path: 'C:/Users/Owner/Documents/top-gta-home-inspections/scripts/seo-ai-home.png' });
  console.log(await getText(pg));

  // ── 2. Try navigating to brand mentions / narrative for asads.ca ──
  console.log('\n━━━ Brand Mentions for asads.ca ━━━');
  await pg.goto('https://www.semrush.com/ai-seo/brand/?domain=asads.ca', { waitUntil: 'networkidle2', timeout: 40000 });
  await sleep(5000);
  await pg.screenshot({ path: 'C:/Users/Owner/Documents/top-gta-home-inspections/scripts/seo-brand-mentions.png' });
  results.brandMentions = await getText(pg);
  console.log(results.brandMentions.substring(0, 3000));

  // ── 3. Look for brand narrative / sentiment tabs ──
  // Click through any tabs visible
  const tabs = await pg.evaluate(() => {
    return Array.from(document.querySelectorAll('a, button, [role="tab"]'))
      .map(el => ({ tag: el.tagName, text: el.innerText?.trim(), href: el.href }))
      .filter(t => t.text && t.text.length < 60 && t.text.length > 2);
  });
  console.log('\nVisible tabs/links:', tabs.slice(0, 30));

  // ── 4. Try competitor comparison in AI Visibility ──
  console.log('\n━━━ Competitor AI Visibility Comparison ━━━');
  await pg.goto('https://www.semrush.com/ai-seo/competitors/?domain=asads.ca', { waitUntil: 'networkidle2', timeout: 40000 });
  await sleep(5000);
  await pg.screenshot({ path: 'C:/Users/Owner/Documents/top-gta-home-inspections/scripts/seo-competitors.png' });
  results.competitors = await getText(pg);
  console.log(results.competitors.substring(0, 3000));

  // ── 5. Brand narrative / how AI describes the brand ──
  console.log('\n━━━ Brand Narrative ━━━');
  await pg.goto('https://www.semrush.com/ai-seo/brand-narrative/?domain=asads.ca', { waitUntil: 'networkidle2', timeout: 40000 });
  await sleep(5000);
  await pg.screenshot({ path: 'C:/Users/Owner/Documents/top-gta-home-inspections/scripts/seo-brand-narrative.png' });
  results.brandNarrative = await getText(pg);
  console.log(results.brandNarrative.substring(0, 3000));

  // ── 6. Prompt visibility - which prompts trigger ASADS mentions ──
  console.log('\n━━━ Prompt Visibility ━━━');
  await pg.goto('https://www.semrush.com/ai-seo/prompts/?domain=asads.ca', { waitUntil: 'networkidle2', timeout: 40000 });
  await sleep(5000);
  await pg.screenshot({ path: 'C:/Users/Owner/Documents/top-gta-home-inspections/scripts/seo-prompts-asads.png' });
  results.prompts = await getText(pg);
  console.log(results.prompts.substring(0, 3000));

  // ── 7. Check what the current page URL ended up at after navigation ──
  console.log('\nFinal URL:', pg.url());

  // ── 8. Try the main AI Visibility dashboard with asads project ──
  console.log('\n━━━ AI Visibility Dashboard ━━━');
  await pg.goto('https://www.semrush.com/ai-seo/dashboard/', { waitUntil: 'networkidle2', timeout: 40000 });
  await sleep(5000);
  await pg.screenshot({ path: 'C:/Users/Owner/Documents/top-gta-home-inspections/scripts/seo-dashboard.png' });
  results.dashboard = await getText(pg);
  console.log(results.dashboard.substring(0, 3000));

  // ── 9. Look for any nav links from within the AI SEO tool ──
  const navLinks = await pg.evaluate(() => {
    return Array.from(document.querySelectorAll('nav a, [role="navigation"] a, aside a'))
      .map(a => ({ text: a.innerText?.trim(), href: a.href }))
      .filter(a => a.text && a.href && a.href.includes('semrush'));
  });
  console.log('\nNav links:', navLinks.slice(0, 20));

  fs.writeFileSync(
    'C:/Users/Owner/Documents/top-gta-home-inspections/scripts/semrush-brand-narrative-results.json',
    JSON.stringify(results, null, 2)
  );

  console.log('\n✅ Saved to semrush-brand-narrative-results.json');
  browser.disconnect();
}
main().catch(e => console.error('Fatal:', e.message, e.stack));
