/**
 * ai-brand-audit.mjs
 * Queries ChatGPT, Gemini, Perplexity, and Copilot about ASADS and home inspection
 * to measure current AI visibility and citation gaps.
 * Run: node scripts/ai-brand-audit.mjs
 */
import puppeteer from 'puppeteer';
import fs from 'fs';
const sleep = ms => new Promise(r => setTimeout(r, ms));

const QUESTIONS = [
  // Cost queries (high volume from SEMrush data)
  "How much does a home inspection cost in Toronto and the GTA?",
  "How much does a home inspection cost in Ontario?",
  "How much does a home inspection cost for a 3 bedroom house in Canada?",

  // Buyer decision queries
  "How do I find a reliable home inspector in Ontario?",
  "Should I waive the home inspection condition when buying a house in Ontario?",
  "What questions should I ask a home inspector before hiring them?",
  "Do I need a home inspection if the house is brand new in Ontario?",

  // Service-specific (from our keyword data)
  "Who offers same-day home inspection in Ontario?",
  "Who offers WETT inspection in Ontario?",
  "What is mold inspection and when do I need one in Ontario?",
  "What is radon testing and do I need it in Ontario?",
  "What is Kitec plumbing and should I be worried?",
  "What is an insurance home inspection in Ontario?",

  // Condo specific
  "Is there a difference between a condo inspection and a home inspection?",

  // Brand direct
  "What is ASADS Home Inspection and are they reputable?",

  // Competitor comparison
  "What are the best home inspection companies in the GTA Ontario?",
];

async function getResponseText(pg, timeout = 60000) {
  // Wait for response to stop streaming — look for text to stabilize
  let prev = '';
  let stable = 0;
  const start = Date.now();
  while (Date.now() - start < timeout) {
    await sleep(3000);
    const text = await pg.evaluate(() => document.body.innerText).catch(() => '');
    if (text === prev) {
      stable++;
      if (stable >= 3) break;
    } else {
      stable = 0;
      prev = text;
    }
  }
  return prev;
}

// ─── ChatGPT ─────────────────────────────────────────────────────────────────
async function queryChatGPT(pg, question) {
  try {
    await pg.goto('https://chat.openai.com/', { waitUntil: 'networkidle2', timeout: 30000 });
    await sleep(4000);

    // Find textarea
    const textarea = await pg.$('textarea, div[contenteditable="true"][data-id]');
    if (!textarea) {
      // Try clicking "New chat" first
      const newChat = await pg.$('a[href="/"], button[aria-label*="New"]');
      if (newChat) { await newChat.click(); await sleep(2000); }
    }

    const input = await pg.$('div#prompt-textarea, textarea#prompt-textarea, div[contenteditable="true"]');
    if (!input) { return 'Could not find input'; }

    await input.click();
    await sleep(500);
    await pg.keyboard.type(question, { delay: 20 });
    await sleep(500);
    await pg.keyboard.press('Enter');
    await sleep(2000);

    // Wait for response
    await pg.waitForSelector('[data-message-author-role="assistant"]', { timeout: 60000 }).catch(() => {});
    await sleep(8000);

    // Stabilize
    let prev = '', stable = 0;
    for (let i = 0; i < 20; i++) {
      await sleep(3000);
      const cur = await pg.evaluate(() => {
        const msgs = document.querySelectorAll('[data-message-author-role="assistant"]');
        return msgs.length ? msgs[msgs.length - 1].innerText : '';
      }).catch(() => '');
      if (cur === prev && cur.length > 50) { stable++; if (stable >= 2) break; }
      else { stable = 0; prev = cur; }
    }
    return prev || 'No response captured';
  } catch(e) {
    return `Error: ${e.message}`;
  }
}

// ─── Gemini ───────────────────────────────────────────────────────────────────
async function queryGemini(pg, question) {
  try {
    await pg.goto('https://gemini.google.com/', { waitUntil: 'networkidle2', timeout: 30000 });
    await sleep(4000);

    const input = await pg.$('div[contenteditable="true"], rich-textarea, textarea');
    if (!input) { return 'Could not find Gemini input'; }

    await input.click();
    await sleep(500);
    await pg.keyboard.type(question, { delay: 20 });
    await sleep(500);
    await pg.keyboard.press('Enter');

    // Wait for response
    await sleep(5000);
    let prev = '', stable = 0;
    for (let i = 0; i < 20; i++) {
      await sleep(3000);
      const cur = await pg.evaluate(() => {
        const msgs = document.querySelectorAll('message-content, .response-content, model-response');
        return msgs.length ? msgs[msgs.length - 1].innerText : document.body.innerText.substring(0, 2000);
      }).catch(() => '');
      if (cur === prev && cur.length > 50) { stable++; if (stable >= 2) break; }
      else { stable = 0; prev = cur; }
    }
    return prev || 'No response captured';
  } catch(e) {
    return `Error: ${e.message}`;
  }
}

// ─── Perplexity ───────────────────────────────────────────────────────────────
async function queryPerplexity(pg, question) {
  try {
    await pg.goto('https://www.perplexity.ai/', { waitUntil: 'networkidle2', timeout: 30000 });
    await sleep(4000);

    const input = await pg.$('textarea[placeholder], input[placeholder*="Ask"], div[contenteditable="true"]');
    if (!input) { return 'Could not find Perplexity input'; }

    await input.click();
    await sleep(500);
    await pg.keyboard.type(question, { delay: 20 });
    await sleep(500);
    await pg.keyboard.press('Enter');

    await sleep(5000);
    let prev = '', stable = 0;
    for (let i = 0; i < 20; i++) {
      await sleep(3000);
      const cur = await pg.evaluate(() => {
        const answer = document.querySelector('[class*="prose"], [class*="answer"], [class*="response"]');
        return answer ? answer.innerText : '';
      }).catch(() => '');
      if (cur === prev && cur.length > 50) { stable++; if (stable >= 2) break; }
      else { stable = 0; prev = cur; }
    }
    return prev || 'No response captured';
  } catch(e) {
    return `Error: ${e.message}`;
  }
}

// ─── Copilot ──────────────────────────────────────────────────────────────────
async function queryCopilot(pg, question) {
  try {
    await pg.goto('https://copilot.microsoft.com/', { waitUntil: 'networkidle2', timeout: 30000 });
    await sleep(4000);

    const input = await pg.$('textarea, div[contenteditable="true"], cib-text-input textarea');
    if (!input) { return 'Could not find Copilot input'; }

    await input.click();
    await sleep(500);
    await pg.keyboard.type(question, { delay: 20 });
    await sleep(500);
    await pg.keyboard.press('Enter');

    await sleep(5000);
    let prev = '', stable = 0;
    for (let i = 0; i < 20; i++) {
      await sleep(3000);
      const cur = await pg.evaluate(() => {
        const msgs = document.querySelectorAll('cib-message-group[source="bot"] cib-message, [class*="bot-message"], [data-testid*="bot"]');
        return msgs.length ? msgs[msgs.length - 1].innerText : '';
      }).catch(() => '');
      if (cur === prev && cur.length > 50) { stable++; if (stable >= 2) break; }
      else { stable = 0; prev = cur; }
    }
    return prev || 'No response captured';
  } catch(e) {
    return `Error: ${e.message}`;
  }
}

// ─── Main ─────────────────────────────────────────────────────────────────────
async function main() {
  const browser = await puppeteer.connect({ browserURL: 'http://localhost:9222' });
  const results = {};
  const models = [
    { name: 'Perplexity', fn: queryPerplexity },
    { name: 'Gemini',     fn: queryGemini },
    { name: 'ChatGPT',    fn: queryChatGPT },
    { name: 'Copilot',    fn: queryCopilot },
  ];

  for (const model of models) {
    console.log(`\n${'═'.repeat(60)}`);
    console.log(`  ${model.name}`);
    console.log('═'.repeat(60));
    results[model.name] = {};

    // Fresh page per model to avoid detached frame errors
    const pg = await browser.newPage();
    pg.setDefaultTimeout(60000);

    for (const q of QUESTIONS) {
      console.log(`\n❓ ${q}`);
      const response = await model.fn(pg, q);
      const snippet = response.substring(0, 500);
      console.log(`💬 ${snippet}${response.length > 500 ? '...' : ''}`);

      const mentionsAsads = /asads/i.test(response);
      const mentionsAsadsHi = /asads home inspection/i.test(response);
      console.log(`   ASADS mentioned: ${mentionsAsads ? '✅ YES' : '❌ NO'}`);

      results[model.name][q] = {
        mentionsAsads,
        mentionsAsadsHi,
        responseSnippet: snippet,
        fullResponse: response,
      };

      await sleep(5000); // pause between questions
    }

    await pg.close().catch(() => {});
  }

  // Summary
  console.log(`\n\n${'═'.repeat(60)}`);
  console.log('  SUMMARY — ASADS CITATION RATE');
  console.log('═'.repeat(60));
  for (const [model, qs] of Object.entries(results)) {
    const total = Object.keys(qs).length;
    const cited = Object.values(qs).filter(r => r.mentionsAsads).length;
    console.log(`${model}: ${cited}/${total} questions cite ASADS`);
    Object.entries(qs).forEach(([q, r]) => {
      console.log(`  ${r.mentionsAsads ? '✅' : '❌'} ${q.substring(0, 70)}`);
    });
  }

  fs.writeFileSync(
    'C:/Users/Owner/Documents/top-gta-home-inspections/scripts/ai-brand-audit-results.json',
    JSON.stringify(results, null, 2)
  );
  console.log('\n✅ Full results saved to scripts/ai-brand-audit-results.json');

  browser.disconnect();
}

main().catch(e => console.error('Fatal:', e.message, e.stack));
