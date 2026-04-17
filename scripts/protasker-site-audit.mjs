/**
 * protasker-site-audit.mjs
 * Scrapes SEMrush Site Audit + AI Visibility for protasker.ca
 * Output: C:/Users/Owner/Documents/Protasker-Site-Audit.md
 */
import puppeteer from 'puppeteer';
import { writeFileSync } from 'fs';

const sleep = ms => new Promise(r => setTimeout(r, ms));
const OUT = 'C:/Users/Owner/Documents/Protasker-Site-Audit.md';
const PROJECT_ID = '29269558';

async function dismissPopup(pg) {
  await pg.evaluate(() => {
    const btn = Array.from(document.querySelectorAll('button'))
      .find(b => /continue|got it|close|dismiss|ok/i.test(b.innerText || ''));
    if (btn) btn.click();
  }).catch(() => {});
}

async function scrollPage(pg) {
  const height = await pg.evaluate(() => document.body.scrollHeight).catch(() => 3000);
  for (let s = 0; s <= 10; s++) {
    await pg.evaluate((y) => window.scrollTo(0, y), Math.floor((s / 10) * height)).catch(() => {});
    await sleep(400);
  }
}

async function getRawLines(pg) {
  return await pg.evaluate(() =>
    document.body.innerText.split('\n').map(l => l.trim()).filter(l => l.length > 2)
  ).catch(() => []);
}

// Parse lines into structured issue data
function parseIssueLines(lines) {
  const result = { score: '', errors: [], warnings: [], notices: [], aiScore: '' };

  for (let i = 0; i < lines.length; i++) {
    const l = lines[i];
    const next = lines[i+1] || '';
    const prev = lines[i-1] || '';

    // Health score: look for "Site Health" near a percentage
    if (/site health/i.test(l)) {
      const pctNear = [lines[i+1], lines[i+2], lines[i+3]].find(x => /^\d{1,3}$/.test(x?.trim()));
      if (pctNear) result.score = pctNear + '%';
    }

    // Standalone percentage like "87" after Site Health
    if (/^\d{1,3}$/.test(l) && /site health|health score/i.test(prev)) {
      result.score = l + '%';
    }

    // Section headers
    if (/^errors?$/i.test(l) && /^\d+$/.test(next)) {
      // Next few lines are error issues
      continue;
    }

    // Issue pattern: text line followed by a number (page count)
    // Errors section
    if (l.length > 20 && /^\d+$/.test(next) && result.errors.length < 30) {
      // Determine section from context (look back for section header)
      const contextBack = lines.slice(Math.max(0, i-15), i).join(' ').toLowerCase();
      if (/\berror/i.test(contextBack) && !/warning|notice/i.test(contextBack.slice(-60))) {
        result.errors.push({ desc: l, count: next });
      } else if (/warning/i.test(contextBack) && !/notice/i.test(contextBack.slice(-60))) {
        result.warnings.push({ desc: l, count: next });
      } else if (/notice/i.test(contextBack)) {
        result.notices.push({ desc: l, count: next });
      }
    }

    // AI Visibility score
    if (/ai visibility/i.test(l)) {
      const numNear = [lines[i+1], lines[i+2]].find(x => /^\d+$/.test(x?.trim()));
      if (numNear) result.aiScore = numNear + '/100';
    }
  }

  return result;
}

async function main() {
  const browser = await puppeteer.connect({ browserURL: 'http://localhost:9222', protocolTimeout: 60000 });
  const pg = await browser.newPage();
  pg.setDefaultTimeout(60000);

  let md = `# Protasker.ca — SEMrush Site Audit + AI Visibility\n`;
  md += `*${new Date().toISOString().split('T')[0]} · SEMrush Project ${PROJECT_ID}*\n\n`;

  // ── SITE AUDIT
  const auditUrls = [
    `https://www.semrush.com/siteaudit/${PROJECT_ID}/summary/`,
    `https://www.semrush.com/seo/${PROJECT_ID}/`,
  ];

  for (const url of auditUrls) {
    console.log(`\nTrying: ${url}`);
    await pg.goto(url, { waitUntil: 'domcontentloaded', timeout: 45000 }).catch(() => {});
    await sleep(10000);
    await dismissPopup(pg);
    await sleep(2000);
    await scrollPage(pg);
    await sleep(2000);

    const finalUrl = pg.url();
    const title = await pg.title().catch(() => '');
    console.log(`  → ${finalUrl.slice(0, 80)}`);
    console.log(`  Title: ${title.slice(0, 70)}`);

    const lines = await getRawLines(pg);
    console.log(`  Lines: ${lines.length}`);

    // Save screenshot for verification
    await pg.screenshot({ path: `C:/Users/Owner/Documents/audit-screenshot.png`, fullPage: false }).catch(() => {});

    const parsed = parseIssueLines(lines);
    console.log(`  Score: ${parsed.score} | Errors: ${parsed.errors.length} | Warnings: ${parsed.warnings.length}`);

    // Add to report regardless — dump all raw content
    md += `## Site Audit (${finalUrl.includes('siteaudit') ? 'Audit Page' : 'Dashboard'})\n\n`;
    if (parsed.score) md += `**Site Health:** ${parsed.score}\n\n`;

    if (parsed.errors.length > 0) {
      md += `### Errors (${parsed.errors.length})\n\n| Issue | Pages |\n|-------|-------|\n`;
      parsed.errors.forEach(r => { md += `| ${r.desc} | ${r.count} |\n`; });
      md += '\n';
    }
    if (parsed.warnings.length > 0) {
      md += `### Warnings (${parsed.warnings.length})\n\n| Issue | Pages |\n|-------|-------|\n`;
      parsed.warnings.forEach(r => { md += `| ${r.desc} | ${r.count} |\n`; });
      md += '\n';
    }
    if (parsed.notices.length > 0) {
      md += `### Notices (${parsed.notices.length})\n\n| Issue | Pages |\n|-------|-------|\n`;
      parsed.notices.forEach(r => { md += `| ${r.desc} | ${r.count} |\n`; });
      md += '\n';
    }

    // Always dump raw content so we can see what's on the page
    md += `### Raw Page Content\n\n\`\`\`\n${lines.slice(0, 120).join('\n')}\n\`\`\`\n\n`;

    if (lines.length > 20) break; // Got real content from this URL
  }

  // ── AI VISIBILITY
  console.log('\nNavigating to AI Visibility...');
  await pg.goto('https://www.semrush.com/ai-seo/overview/', { waitUntil: 'domcontentloaded', timeout: 45000 }).catch(() => {});
  await sleep(10000);
  await dismissPopup(pg);
  await sleep(2000);
  await scrollPage(pg);
  await sleep(1000);

  await pg.screenshot({ path: `C:/Users/Owner/Documents/ai-visibility-screenshot.png`, fullPage: false }).catch(() => {});

  const aiLines = await getRawLines(pg);
  console.log(`AI Visibility page lines: ${aiLines.length}`);

  md += `---\n\n## AI Visibility\n\n`;
  md += `### Raw AI Visibility Page\n\n\`\`\`\n${aiLines.slice(0, 100).join('\n')}\n\`\`\`\n`;

  writeFileSync(OUT, md, 'utf8');
  console.log(`\nSaved → ${OUT}`);
  console.log('Screenshots: audit-screenshot.png, ai-visibility-screenshot.png');

  await pg.close();
  browser.disconnect();
}

main().catch(e => { console.error('Fatal:', e.message); process.exit(1); });
