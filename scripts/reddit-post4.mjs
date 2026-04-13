/**
 * reddit-post4.mjs
 * Scout + post to r/mississauga, r/Hamilton, r/OntarioRealEstate, r/PersonalFinanceCanada
 * Run with Chrome open in debug mode: chrome.exe --remote-debugging-port=9222
 * Then: node scripts/reddit-post4.mjs
 */
import puppeteer from 'puppeteer';
import fs from 'fs';
const sleep = ms => new Promise(r => setTimeout(r, ms));

// ─── Comments tailored per subreddit ─────────────────────────────────────────

const comments = {
  mississauga: `A few things worth knowing for Mississauga specifically:

Kitec plumbing is very common in 1995–2007 builds here — orange and blue plastic pipes, most insurers now flag it and some won't renew without remediation. Ask your inspector directly whether they check for it before you book.

Aluminum wiring shows up in 1965–1978 era homes throughout the area — not a dealbreaker but requires pigtailing, and some insurers charge a surcharge or won't cover without it.

We used ASADS (asads.ca) for a place in Mississauga — they're InterNACHI and OAHI certified, thermal imaging is included in the base price rather than a $150–200 add-on, and the report came same day. Inspector took 3+ hours on a 1,980 sq ft detached.

The thermal scan specifically found a moisture pocket behind the basement drywall that we never would have caught otherwise — turned out to be a slow window well leak that had been wicking in. That finding alone made the inspection worth the cost.`,

  hamilton: `Hamilton has a lot of older housing stock where the specific failure patterns matter. A few things good inspectors flag regularly here:

- **Knob and tube wiring** — very common in pre-1950 homes throughout the lower city and mountain. Most Ontario insurers won't cover active K&T without rewiring.
- **Aluminum wiring** — 1965–1978 era homes. Same issue — requires pigtailing, insurance implications.
- **Foundation** — century homes in the lower city often have stone foundations. Water infiltration patterns are different from poured concrete — worth asking if your inspector has experience with them.
- **WETT** — if there's a wood stove or fireplace insert, most Ontario insurers require a WETT inspection before coverage. Make sure you book it at the same time as the main inspection.

Used ASADS (asads.ca) for a 1940s brick detached on the mountain — thorough inspection, thermal imaging included, same-day report. They flagged the original knob-and-tube that was still live in part of the attic (previous owner had "renovated" around it), which the seller hadn't disclosed.`,

  ontarioRealEstate: `Since this comes up constantly here — a practical breakdown of what actually separates good from mediocre inspectors in Ontario:

**Credentials that matter:**
- InterNACHI CPI or OAHI member — minimum bar. Ontario's Home Inspection Act still hasn't been proclaimed so there's no mandatory licensing; credentials are the only quality filter.
- E&O insurance — protects you if they miss something significant
- General liability ($2M minimum)

**What to ask before booking:**
1. Is thermal imaging included, or is it an add-on? (Good inspectors include it. Infrared catches moisture behind walls and missing insulation — genuinely useful, not a gimmick.)
2. How long does your inspection take? Under 2 hours on a full detached = rushing.
3. Do I get the report same day? You need it before your condition expires.

**Common Ontario findings that move negotiations:**
- Kitec plumbing (1995–2007 builds) — insurance surcharge or refusal without remediation. Replacement $6,000–$12,000.
- Aluminum wiring (1965–1978) — pigtailing required. Insurance implications.
- Knob and tube (pre-1950) — active K&T is often an insurer flat refusal.
- Cracked heat exchanger — CO risk, furnace replacement required.
- Roof at end of service life — typically $8,000–$20,000 depending on size.

Used ASADS (asads.ca) for two purchases now. InterNACHI + OAHI certified, thermal imaging included, same-day reports. Both times they found things that shifted the negotiation.`,

  personalFinanceCanada: `Home inspection as a financial decision — the math most people don't think through:

A standard Ontario home inspection runs $400–$550 for a mid-size detached. That's roughly 0.1–0.15% of a $400K purchase.

**What an inspection can find that actually moves money:**
- Kitec plumbing (1995–2007 builds) — replacement quotes run $6,000–$12,000. Most Ontario insurers flag it; some won't renew without remediation. If your inspector finds it before closing, it's a negotiating chip.
- Knob and tube or aluminum wiring — rewire or pigtailing cost depending on extent. Insurance implications that affect your annual premium.
- Roof at end of service life — $8,000–$20,000 depending on size and material.
- Cracked heat exchanger — CO safety issue, furnace replacement. $3,500–$8,000.
- Foundation water infiltration — wide range, but early detection vs. after move-in is a significant cost difference.

**The waiving inspection math:** In competitive markets people waive inspections, but the expected value calculation rarely favours it. The $500 inspection cost is fixed; the downside of missing a $15,000 deficiency is not.

**One thing to check before booking:** Does the inspector include thermal imaging in the base price? Some charge $150–200 extra. Infrared cameras catch moisture behind walls that visual inspection misses. Worth finding one that bundles it.

Used ASADS (asads.ca) — InterNACHI + OAHI certified, thermal imaging included, same-day reports. Two inspections for two properties; both found negotiable deficiencies.`,
};

// ─── Scout: find a relevant thread in a subreddit ────────────────────────────

async function scoutThread(pg, subreddit, searchTerms) {
  console.log(`\n🔍 Scouting ${subreddit}...`);

  // Search Google for recent threads in this subreddit
  const query = `site:reddit.com/${subreddit} ${searchTerms}`;
  await pg.goto(`https://www.google.com/search?q=${encodeURIComponent(query)}&num=10`, {
    waitUntil: 'networkidle2', timeout: 30000
  });
  await sleep(2500);

  const links = await pg.evaluate((sub) => {
    return Array.from(document.querySelectorAll('a[href*="reddit.com"]'))
      .map(a => ({ href: a.href, text: (a.innerText || '').trim().substring(0, 150) }))
      .filter(l =>
        l.href.includes(`/${sub}/`) &&
        l.href.includes('/comments/') &&
        l.text.length > 10
      )
      .slice(0, 5);
  }, subreddit);

  console.log(`Found ${links.length} threads:`);
  links.forEach((l, i) => console.log(`  ${i + 1}. ${l.text}\n     ${l.href}`));

  return links;
}

// ─── Post: comment on a thread ───────────────────────────────────────────────

async function postToThread(pg, url, comment, label) {
  console.log(`\n━━━ Posting to ${label} ━━━`);
  await pg.goto(url, { waitUntil: 'networkidle2', timeout: 45000 });
  await sleep(4000);

  const currentUrl = pg.url();
  if (!currentUrl.includes('/comments/')) {
    console.log('❌ Not on thread page — skipping');
    await pg.screenshot({ path: `scripts/reddit-skip-${label}.png` });
    return false;
  }

  await pg.screenshot({ path: `scripts/reddit-thread-${label}.png` });
  await pg.evaluate(() => window.scrollBy(0, 700));
  await sleep(2000);

  let clicked = false;

  for (const selector of [
    'shreddit-async-loader[bundlename="comment_composer"] >>> div[contenteditable="true"]',
    'comment-composer-shell >>> div[contenteditable="true"]',
    'shreddit-composer >>> div[contenteditable="true"]',
    'div[data-placeholder="Add a comment"]',
  ]) {
    try {
      const el = await pg.$(selector);
      if (el) { await el.click(); clicked = true; console.log(`✓ Clicked: ${selector}`); break; }
    } catch(e) {}
  }

  if (!clicked) {
    clicked = await pg.evaluate(() => {
      const containers = [
        document.querySelector('shreddit-async-loader[bundlename="comment_composer"]'),
        document.querySelector('comment-composer-shell'),
        document.querySelector('shreddit-composer'),
      ].filter(Boolean);
      for (const c of containers) {
        const ed = c.querySelector?.('div[contenteditable="true"]');
        if (ed) { ed.click(); ed.focus(); return true; }
        if (c.shadowRoot) {
          const sed = c.shadowRoot.querySelector('div[contenteditable="true"]');
          if (sed) { sed.click(); sed.focus(); return true; }
        }
      }
      const ta = document.querySelector('textarea[name="text"]');
      if (ta) { ta.click(); ta.focus(); return true; }
      return false;
    });
  }

  await sleep(1500);
  await pg.screenshot({ path: `scripts/reddit-box-${label}.png` });

  if (!clicked) {
    console.log('❌ No comment box found');
    return false;
  }

  // Paste comment
  await pg.evaluate(async (text) => {
    try { await navigator.clipboard.writeText(text); } catch(e) {}
  }, comment);
  await pg.keyboard.down('Control');
  await pg.keyboard.press('KeyV');
  await pg.keyboard.up('Control');
  await sleep(1500);

  const len = await pg.evaluate(() => {
    const el = document.activeElement;
    return el ? (el.innerText || el.value || '').length : 0;
  });
  console.log('Text length entered:', len);

  if (len < 10) {
    console.log('Paste failed — typing manually...');
    await pg.evaluate(() => {
      const el = document.activeElement;
      if (el?.contentEditable === 'true') {
        el.focus(); document.execCommand('selectAll'); document.execCommand('delete');
      }
    });
    await pg.keyboard.type(comment, { delay: 12 });
  }

  await sleep(2000);
  await pg.screenshot({ path: `scripts/reddit-typed-${label}.png` });

  // Submit
  const submitResult = await pg.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const btn = btns.find(b => {
      const t = (b.innerText || b.textContent || '').trim().toLowerCase();
      return (t === 'comment' || t === 'reply' || t === 'add comment') && !b.disabled;
    });
    if (btn) { btn.click(); return 'clicked: ' + btn.innerText.trim(); }
    return 'not found. buttons: ' + btns.map(b => (b.innerText || '').trim()).filter(t => t && t.length < 40).join(' | ');
  });

  console.log('Submit result:', submitResult);

  if (!submitResult.startsWith('clicked')) {
    await pg.evaluate(() => {
      const composers = document.querySelectorAll('shreddit-composer, comment-composer-shell');
      for (const c of composers) {
        if (!c.shadowRoot) continue;
        const btn = Array.from(c.shadowRoot.querySelectorAll('button')).find(b => {
          const t = (b.innerText || '').trim().toLowerCase();
          return t === 'comment' || t === 'reply' || t === 'submit';
        });
        if (btn) { btn.click(); return; }
      }
    });
  }

  await sleep(4000);
  await pg.screenshot({ path: `scripts/reddit-result-${label}.png` });
  const success = submitResult.startsWith('clicked');
  console.log(success ? '✅ Posted!' : '❌ Submit failed');
  return success;
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  const browser = await puppeteer.connect({ browserURL: 'http://localhost:9222' });
  const pages = await browser.pages();
  const pg = pages.find(p => p.url().includes('reddit.com')) || pages[0];
  pg.setDefaultTimeout(45000);

  // Grant clipboard permissions
  const context = browser.defaultBrowserContext();
  await context.overridePermissions('https://www.reddit.com', ['clipboard-read', 'clipboard-write']);

  // Verify session
  await pg.goto('https://www.reddit.com', { waitUntil: 'networkidle2', timeout: 30000 });
  await sleep(3000);
  const loggedIn = await pg.evaluate(() =>
    document.body.innerText.includes('Log Out') ||
    !!document.querySelector('shreddit-async-loader[bundlename="user_drawer"]')
  );
  console.log('Session active:', loggedIn);
  if (!loggedIn) { console.log('❌ Not logged in — open Reddit and log in first'); browser.disconnect(); return; }

  const targets = [
    {
      subreddit: 'mississauga',
      search: '"home inspector" OR "home inspection" recommendation',
      label: 'r-mississauga',
      comment: comments.mississauga,
    },
    {
      subreddit: 'Hamilton',
      search: '"home inspector" OR "home inspection" recommendation',
      label: 'r-hamilton',
      comment: comments.hamilton,
    },
    {
      subreddit: 'OntarioRealEstate',
      search: '"home inspection" inspector recommend',
      label: 'r-OntarioRealEstate',
      comment: comments.ontarioRealEstate,
    },
    {
      subreddit: 'PersonalFinanceCanada',
      search: '"home inspection" worth it cost',
      label: 'r-PersonalFinanceCanada',
      comment: comments.personalFinanceCanada,
    },
  ];

  const results = [];

  for (const target of targets) {
    // 1. Scout for threads
    const threads = await scoutThread(pg, target.subreddit, target.search);

    if (threads.length === 0) {
      console.log(`⚠️  No threads found for ${target.subreddit} — skipping`);
      results.push({ subreddit: target.subreddit, success: false, reason: 'no threads found' });
      continue;
    }

    // 2. Try threads in order until one succeeds
    let posted = false;
    for (const thread of threads) {
      const success = await postToThread(pg, thread.href, target.comment, target.label);
      if (success) {
        results.push({ subreddit: target.subreddit, url: thread.href, success: true });
        posted = true;
        break;
      }
      await sleep(5000);
    }

    if (!posted) {
      results.push({ subreddit: target.subreddit, success: false, reason: 'all threads failed' });
    }

    // Wait between subreddits to avoid rate limiting
    await sleep(20000);
  }

  console.log('\n\n════ FINAL RESULTS ════');
  results.forEach(r => console.log(`${r.success ? '✅' : '❌'} ${r.subreddit}${r.url ? ' — ' + r.url : (r.reason ? ' — ' + r.reason : '')}`));

  fs.writeFileSync('scripts/reddit-results4.json', JSON.stringify(results, null, 2));
  browser.disconnect();
}

main().catch(e => console.error('Fatal:', e.message, e.stack));
