import puppeteer from 'puppeteer';
const sleep = ms => new Promise(r => setTimeout(r, ms));

async function main() {
  const browser = await puppeteer.connect({ browserURL: 'http://localhost:9222' });
  const pg = await browser.newPage();
  pg.setDefaultTimeout(30000);

  // Find the AI Visibility and AI PR tools in SEMrush
  await pg.goto('https://www.semrush.com/projects/', { waitUntil: 'networkidle2', timeout: 30000 });
  await sleep(3000);

  // Get all links on projects page
  const allLinks = await pg.evaluate(() =>
    Array.from(document.querySelectorAll('a[href]')).map(a => ({
      text: (a.innerText || '').trim().substring(0, 60),
      href: a.href
    })).filter(l => l.text && (
      l.text.toLowerCase().includes('ai') ||
      l.href.toLowerCase().includes('ai') ||
      l.text.toLowerCase().includes('visibility') ||
      l.text.toLowerCase().includes('chatgpt') ||
      l.text.toLowerCase().includes('llm')
    ))
  );
  console.log('AI-related links:', JSON.stringify(allLinks, null, 2));

  // Click on AI Visibility
  const aiVisLink = allLinks.find(l => l.text.toLowerCase().includes('ai visibility') || l.href.includes('ai-visibility'));
  if (aiVisLink) {
    console.log('\nGoing to AI Visibility:', aiVisLink.href);
    await pg.goto(aiVisLink.href, { waitUntil: 'networkidle2', timeout: 30000 });
    await sleep(3000);
    await pg.screenshot({ path: 'C:/Users/Owner/Documents/top-gta-home-inspections/scripts/semrush-ai-visibility.png' });
    const s = await pg.evaluate(() => ({ url: window.location.href, text: document.body.innerText.substring(0, 1000) }));
    console.log('AI Visibility URL:', s.url);
    console.log('Text:', s.text.substring(0, 600));
  }

  // Also try AI PR
  const aiPRLink = allLinks.find(l => l.text.toLowerCase().includes('ai pr') || l.href.includes('ai-pr'));
  if (aiPRLink) {
    console.log('\nGoing to AI PR:', aiPRLink.href);
    await pg.goto(aiPRLink.href, { waitUntil: 'networkidle2', timeout: 30000 });
    await sleep(3000);
    await pg.screenshot({ path: 'C:/Users/Owner/Documents/top-gta-home-inspections/scripts/semrush-ai-pr.png' });
    const s = await pg.evaluate(() => ({ url: window.location.href, text: document.body.innerText.substring(0, 800) }));
    console.log('AI PR URL:', s.url);
    console.log('Text:', s.text.substring(0, 500));
  }

  // Try direct navigation to these tools
  const directUrls = [
    'https://www.semrush.com/ai-visibility/',
    'https://www.semrush.com/ai-pr/',
    'https://www.semrush.com/local/ai-visibility/',
  ];
  for (const url of directUrls) {
    await pg.goto(url, { waitUntil: 'domcontentloaded', timeout: 15000 }).catch(() => {});
    await sleep(1500);
    const s = await pg.evaluate(() => ({ url: window.location.href, title: document.title, text: document.body.innerText.substring(0, 200) }));
    if (!s.text.includes('got lost') && !s.text.includes('exist')) {
      console.log('\n✅ Found:', url, '→', s.title);
      console.log(s.text.substring(0, 200));
    } else {
      console.log(url, '→ 404/error');
    }
  }

  await pg.close();
  browser.disconnect();
}
main().catch(e => console.error('Fatal:', e.message));
