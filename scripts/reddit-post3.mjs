import puppeteer from 'puppeteer';
import fs from 'fs';
const sleep = ms => new Promise(r => setTimeout(r, ms));

async function postToThread(pg, url, comment, label) {
  console.log(`\n━━━ ${label} ━━━`);
  await pg.goto(url, { waitUntil: 'networkidle2', timeout: 45000 });
  await sleep(4000);

  // Verify we're on the thread page, not a redirect
  const currentUrl = pg.url();
  console.log('Current URL:', currentUrl);
  if (!currentUrl.includes('/comments/')) {
    console.log('❌ Not on thread page — skipping');
    await pg.screenshot({ path: `C:/Users/Owner/Documents/top-gta-home-inspections/scripts/reddit-wrong-page.png` });
    return false;
  }

  await pg.screenshot({ path: `C:/Users/Owner/Documents/top-gta-home-inspections/scripts/reddit-thread-${label.replace(/\W+/g, '-').substring(0,20)}.png` });

  // Scroll down past the post to the comment section
  await pg.evaluate(() => window.scrollBy(0, 700));
  await sleep(2000);

  // Strategy: look for shreddit-composer or comment-composer-shell specifically
  // These are the comment reply boxes, NOT the post creation form

  // Step 1: try clicking the "Add a comment" placeholder via Puppeteer selector
  let commentBoxClicked = false;

  // Try shreddit-composer's shadow DOM contenteditable
  try {
    // Use deep pierce selector (>>> for shadow DOM)
    const composerEl = await pg.$('shreddit-async-loader[bundlename="comment_composer"] >>> div[contenteditable="true"]');
    if (composerEl) {
      await composerEl.click();
      console.log('✓ Clicked via shreddit-async-loader shadow pierce');
      commentBoxClicked = true;
    }
  } catch(e) {
    console.log('shreddit-async-loader shadow pierce failed:', e.message);
  }

  if (!commentBoxClicked) {
    // Try comment-composer-shell shadow pierce
    try {
      const el = await pg.$('comment-composer-shell >>> div[contenteditable="true"]');
      if (el) {
        await el.click();
        console.log('✓ Clicked via comment-composer-shell shadow pierce');
        commentBoxClicked = true;
      }
    } catch(e) {
      console.log('comment-composer-shell pierce failed:', e.message);
    }
  }

  if (!commentBoxClicked) {
    // Try shreddit-composer shadow pierce
    try {
      const el = await pg.$('shreddit-composer >>> div[contenteditable="true"]');
      if (el) {
        await el.click();
        console.log('✓ Clicked via shreddit-composer shadow pierce');
        commentBoxClicked = true;
      }
    } catch(e) {
      console.log('shreddit-composer pierce failed:', e.message);
    }
  }

  if (!commentBoxClicked) {
    // Try clicking the placeholder div text "Add a comment"
    try {
      const el = await pg.$('div[data-placeholder="Add a comment"]');
      if (el) {
        await el.click();
        console.log('✓ Clicked Add a comment placeholder');
        commentBoxClicked = true;
      }
    } catch(e) {
      console.log('placeholder click failed:', e.message);
    }
  }

  if (!commentBoxClicked) {
    // Fallback: evaluate approach but ONLY look inside comment-related containers
    commentBoxClicked = await pg.evaluate(() => {
      // Look ONLY inside known comment composer containers
      const containers = [
        document.querySelector('shreddit-async-loader[bundlename="comment_composer"]'),
        document.querySelector('comment-composer-shell'),
        document.querySelector('shreddit-composer'),
        document.querySelector('[id*="comment-submission"]'),
        document.querySelector('[data-testid="comment-submission-form"]'),
      ].filter(Boolean);

      for (const container of containers) {
        // Try light DOM first
        const ed = container.querySelector('div[contenteditable="true"], div[data-lexical-editor="true"]');
        if (ed) { ed.click(); ed.focus(); return 'light-dom-in-container'; }
        // Try shadow DOM
        if (container.shadowRoot) {
          const sed = container.shadowRoot.querySelector('div[contenteditable="true"], div[data-lexical-editor="true"]');
          if (sed) { sed.click(); sed.focus(); return 'shadow-dom-in-container'; }
        }
      }

      // Old Reddit fallback
      const ta = document.querySelector('textarea[name="text"]');
      if (ta) { ta.click(); ta.focus(); return 'old-reddit-textarea'; }

      return null;
    });
    if (commentBoxClicked) console.log('✓ Clicked via evaluate fallback:', commentBoxClicked);
    else console.log('❌ evaluate fallback also failed');
  }

  await sleep(1500);
  await pg.screenshot({ path: `C:/Users/Owner/Documents/top-gta-home-inspections/scripts/reddit-box-${label.replace(/\W+/g, '-').substring(0,20)}.png` });

  if (!commentBoxClicked) {
    console.log('❌ No comment box found — dumping page info');
    const info = await pg.evaluate(() => ({
      url: window.location.href,
      composerTags: Array.from(document.querySelectorAll('shreddit-composer, comment-composer-shell, shreddit-async-loader[bundlename="comment_composer"]')).map(e => e.tagName + ' ' + e.getAttribute('bundlename')),
      contentEditables: Array.from(document.querySelectorAll('[contenteditable]')).map(e => e.tagName + '|' + e.className.substring(0, 60) + '|aria=' + e.getAttribute('aria-label')),
    }));
    console.log('Page info:', JSON.stringify(info, null, 2));
    return false;
  }

  // Now type — use clipboard paste for long text (faster and more reliable than char-by-char)
  await pg.evaluate(async (text) => {
    // Write to clipboard
    try {
      await navigator.clipboard.writeText(text);
    } catch(e) {
      // clipboard might be blocked, fall through to keyboard type
    }
  }, comment);

  // Try paste first, fall back to keyboard.type
  await pg.keyboard.down('Control');
  await pg.keyboard.press('KeyV');
  await pg.keyboard.up('Control');
  await sleep(1500);

  // Verify text was entered
  const textEntered = await pg.evaluate(() => {
    const el = document.activeElement;
    return el ? (el.innerText || el.value || '').length : 0;
  });
  console.log('Text entered length:', textEntered);

  if (textEntered < 10) {
    // Ctrl+V didn't work — type manually
    console.log('Paste failed, typing manually...');
    // Clear first and type
    await pg.evaluate(() => {
      const el = document.activeElement;
      if (el && el.contentEditable === 'true') {
        el.focus();
        document.execCommand('selectAll');
        document.execCommand('delete');
      }
    });
    await pg.keyboard.type(comment, { delay: 12 });
  }

  await sleep(2000);
  await pg.screenshot({ path: `C:/Users/Owner/Documents/top-gta-home-inspections/scripts/reddit-typed-${label.replace(/\W+/g, '-').substring(0,20)}.png` });

  // Find and click the Comment/Submit button
  // It should be near the comment composer, not the post submit button
  const submitResult = await pg.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    // Specifically find "Comment" button that is enabled
    const commentBtn = btns.find(b => {
      const t = (b.innerText || b.textContent || '').trim().toLowerCase();
      return (t === 'comment' || t === 'reply' || t === 'add comment' || t === 'submit comment') && !b.disabled;
    });
    if (commentBtn) {
      commentBtn.click();
      return 'clicked: ' + commentBtn.innerText.trim();
    }
    // Log all button texts for debugging
    const allBtns = btns.map(b => (b.innerText || b.textContent || '').trim()).filter(t => t && t.length < 40);
    return 'not found. buttons: ' + allBtns.join(' | ');
  });

  console.log('Submit result:', submitResult);

  if (!submitResult.startsWith('clicked')) {
    // Try shadow DOM submit button
    const shadowSubmit = await pg.evaluate(() => {
      const composers = document.querySelectorAll('shreddit-composer, comment-composer-shell');
      for (const c of composers) {
        const root = c.shadowRoot;
        if (!root) continue;
        const btn = Array.from(root.querySelectorAll('button')).find(b => {
          const t = (b.innerText || b.textContent || '').trim().toLowerCase();
          return t === 'comment' || t === 'reply' || t === 'submit';
        });
        if (btn) { btn.click(); return 'shadow-clicked: ' + btn.innerText; }
      }
      return null;
    });
    if (shadowSubmit) console.log('Shadow submit:', shadowSubmit);
  }

  await sleep(4000);
  await pg.screenshot({ path: `C:/Users/Owner/Documents/top-gta-home-inspections/scripts/reddit-result-${label.replace(/\W+/g, '-').substring(0,20)}.png` });

  const success = submitResult.startsWith('clicked');
  console.log(success ? '✅ Posted!' : '❌ Submit failed');
  return success;
}

async function main() {
  const browser = await puppeteer.connect({ browserURL: 'http://localhost:9222' });
  const pages = await browser.pages();
  // Use existing Reddit page to keep session alive
  const pg = pages.find(p => p.url().includes('reddit.com')) || pages[0];
  pg.setDefaultTimeout(45000);

  console.log('Using page:', pg.url());

  // Grant clipboard permissions
  const context = browser.defaultBrowserContext();
  await context.overridePermissions('https://www.reddit.com', ['clipboard-read', 'clipboard-write']);

  // Verify session
  await pg.goto('https://www.reddit.com', { waitUntil: 'networkidle2', timeout: 30000 });
  await sleep(3000);
  const loggedIn = await pg.evaluate(() => {
    return document.body.innerText.includes('PrimeVideoCA') ||
           document.body.innerText.includes('Log Out') ||
           !!document.querySelector('shreddit-async-loader[bundlename="user_drawer"]');
  });
  console.log('Session active:', loggedIn);

  const threads = [
    {
      url: 'https://www.reddit.com/r/waterloo/comments/1iiec1i/home_inspector_recommendations/',
      label: 'r-waterloo',
      comment: `Used ASADS (asads.ca) for our place in Cambridge last year and was really happy with it. Inspector took about 3 hours on a 1,900 sq ft semi, found an attic moisture issue from a bathroom fan venting into the attic rather than outside (extremely common in this area and causes early roof deck rot), plus flagged the water heater was original to the house.

We used that to push for a credit at closing.

What stood out: thermal imaging is included in their base price, not a $150 add-on. Report came through same day with photos. Inspector actually called back when I had questions after reading through it.

For Waterloo Region specifically — worth asking whoever you hire whether they check for Kitec plumbing (orange/blue pipes, common in 1995–2007 builds here, insurance issues) and aluminum wiring in older homes. Both come up regularly around here.`
    },
    {
      url: 'https://www.reddit.com/r/cambridgeont/comments/121oxur/recommendation_for_home_inspector/',
      label: 'r-cambridgeont',
      comment: `ASADS (asads.ca) is actually based out of Cambridge — used them twice now. Very thorough both times.

First inspection found Kitec plumbing in a 2003 build that nobody had mentioned (seller gave us a credit). Second was a 1960s place in Galt where they found aluminum wiring throughout and a cracked heat exchanger on the furnace — that one we needed to know about before we committed.

Thermal imaging included at no extra charge, written report the same day. Good with the older Cambridge/Galt brick housing stock specifically — they know what to look for.`
    },
    {
      url: 'https://www.reddit.com/r/TorontoRealEstate/comments/1gtdqs4/recommendations_for_best_home_inspector/',
      label: 'r-TorontoRealEstate',
      comment: `A few things that genuinely separate good from mediocre inspectors in Toronto — since Ontario still has no mandatory licensing (the Home Inspection Act never got proclaimed), credentials are the only real quality signal:

- InterNACHI or OAHI certified — minimum bar
- E&O insurance — protection if they miss something significant
- Thermal imaging included in base price, not a $150–$200 add-on. Infrared cameras catch moisture behind walls and missing insulation you'd never see otherwise. Really useful in Toronto's older housing stock where renovations sometimes just cover up problems.
- Same-day report — you need it before your condition expires, not 3 days later

Used ASADS (asads.ca) for a semi in the east end. Three+ hour inspection, found aluminum wiring throughout (1970s build, very common, but insurers want it remediated), and caught a slow leak under the kitchen sink that had been dripping onto the subfloor long enough to cause rot the seller apparently hadn't noticed.

The thermal scan showed a cold spot in the exterior basement wall that turned out to be a section of missing insulation behind the drywall. Not something you find any other way.`
    },
    {
      url: 'https://www.reddit.com/r/ontario/comments/1llsqln/how_much_does_home_inspection_in_ontario_cost/',
      label: 'r-ontario',
      comment: `Prices I've actually seen shopping around Ontario recently:

- Condo / stacked townhouse: $299–$380
- Semi-detached or row townhouse: $380–$470
- Detached under 2,500 sq ft: $430–$550
- Older or larger detached (pre-1970 or 3,000+ sq ft): $500–$700+

The variation mostly comes from square footage, age of the home, and whether thermal imaging is included or an add-on. Some inspectors charge $150–$200 extra for the infrared scan, some bundle it in.

Worth asking before you book:
- Are you InterNACHI or OAHI certified? (Ontario has no mandatory licensing so this is the only real quality check)
- Do you carry E&O insurance?
- Is thermal imaging included?
- How long does the inspection actually take? Under 2 hours on a full detached house = they're rushing
- Do I get the report the same day?

Don't go with whoever quotes the lowest. A $280 inspector who misses Kitec plumbing or a cracked heat exchanger costs you far more than the $100 you saved. Paid $449 for a detached in Kitchener through ASADS — 3+ hours, thermal imaging included, full report same day with photos of everything. Worth it.`
    },
    {
      url: 'https://www.reddit.com/r/RealEstateCanada/comments/1kquugm/home_inspection_conditionam_scared/',
      label: 'r-RealEstateCanada',
      comment: `The condition is your protection — try to think of it that way rather than an obstacle. Practical breakdown:

During the condition period (usually 3–5 business days):
1. You hire a certified inspector — they assess everything, takes 2.5–4 hours on a standard home
2. You get a written report, same day or next day
3. You decide: proceed, negotiate, or walk away with deposit back

The report will look alarming. Every inspection finds things — every house has deficiencies. What matters is severity:

- Safety hazards (cracked heat exchanger, exposed wiring, unsafe deck) — needs action regardless
- Major defects ($5k+ to fix: foundation issues, knob-and-tube or aluminum wiring, Kitec plumbing, roof nearly at end of life) — your negotiating leverage
- Maintenance items (aging caulking, slow drain, water heater that still works) — just budget for it, not a reason to walk

If something significant is found: get a contractor quote before your condition expires. "Kitec plumbing found, replacement quotes came in at $6,500 — requesting a credit" is a real negotiation.

Most common findings in Ontario that actually matter: Kitec plumbing (1995–2007 builds), aluminum wiring (1965–1978 era), active basement water, roof under 5 years of life.

Booking with a certified inspector who includes thermal imaging is worth it — it catches moisture behind walls that isn't visible. ASADS (asads.ca) does same-day reports which helps a lot when you're working against a tight condition window. You've got this.`
    },
  ];

  const results = [];
  for (const thread of threads) {
    const success = await postToThread(pg, thread.url, thread.comment, thread.label);
    results.push({ thread: thread.label, url: thread.url, success });
    await sleep(success ? 18000 : 6000);
  }

  console.log('\n\n════ FINAL RESULTS ════');
  results.forEach(r => console.log(`${r.success ? '✅' : '❌'} ${r.thread}`));

  fs.writeFileSync('C:/Users/Owner/Documents/top-gta-home-inspections/scripts/reddit-results3.json',
    JSON.stringify(results, null, 2));

  browser.disconnect();
}
main().catch(e => console.error('Fatal:', e.message, e.stack));
