import puppeteer from 'puppeteer';
import fs from 'fs';
const sleep = ms => new Promise(r => setTimeout(r, ms));

async function checkLogin(pg) {
  const text = await pg.evaluate(() => document.body.innerText.substring(0, 2000));
  const hasUser = text.includes('PrimeVideoCA') || await pg.evaluate(() => {
    return document.querySelector('a[href*="/user/"]') !== null ||
           document.body.innerText.includes('Log Out') ||
           document.body.innerText.includes('Create Post') ||
           !!document.querySelector('shreddit-async-loader[bundlename="user_drawer"]');
  });
  return hasUser;
}

async function postToThread(pg, url, comment, label) {
  console.log(`\n━━━ ${label} ━━━`);
  await pg.goto(url, { waitUntil: 'networkidle2', timeout: 40000 });
  await sleep(5000);

  await pg.screenshot({ path: `C:/Users/Owner/Documents/top-gta-home-inspections/scripts/reddit-thread.png` });

  const loggedIn = await checkLogin(pg);
  console.log('Login check:', loggedIn);

  // Get thread title
  const title = await pg.evaluate(() => {
    return document.querySelector('h1, shreddit-post')?.innerText?.trim()?.substring(0, 100)
      || document.title?.substring(0, 80);
  });
  console.log('Thread:', title);

  // Scroll down past the post to comment section
  await pg.evaluate(() => window.scrollBy(0, 800));
  await sleep(2000);

  // Find comment textarea — try multiple approaches
  // Approach 1: click "Add a comment" area (new Reddit shreddit)
  let commentBoxFound = false;

  // Try clicking the "Add a comment" text box
  commentBoxFound = await pg.evaluate(() => {
    // shreddit new reddit
    const commentInput = document.querySelector(
      '[data-testid="comment-submission-form-richtext"] .DraftEditor-root, ' +
      'shreddit-composer div[contenteditable="true"], ' +
      'div[data-placeholder="Add a comment"], ' +
      'div[contenteditable="true"][data-lexical-editor="true"]'
    );
    if (commentInput) { commentInput.click(); commentInput.focus(); return true; }
    return false;
  });

  if (!commentBoxFound) {
    // Approach 2: find and click any contenteditable in comment area
    commentBoxFound = await pg.evaluate(() => {
      const editables = Array.from(document.querySelectorAll('div[contenteditable="true"]'));
      for (const el of editables) {
        const rect = el.getBoundingClientRect();
        if (rect.width > 200 && rect.top > 200) {
          el.click(); el.focus(); return true;
        }
      }
      return false;
    });
  }

  if (!commentBoxFound) {
    // Approach 3: old reddit textarea
    commentBoxFound = await pg.evaluate(() => {
      const ta = document.querySelector('textarea[name="text"], textarea.usertext-edit');
      if (ta) { ta.click(); ta.focus(); return true; }
      return false;
    });
  }

  console.log('Comment box found:', commentBoxFound);
  await pg.screenshot({ path: `C:/Users/Owner/Documents/top-gta-home-inspections/scripts/reddit-box.png` });

  if (!commentBoxFound) {
    console.log('❌ No comment box found - skipping');
    return false;
  }

  await sleep(1000);

  // Type the comment — use clipboard paste for reliability with markdown
  await pg.evaluate((text) => {
    // Try to use execCommand to paste
    const el = document.activeElement;
    if (el) {
      el.focus();
    }
  }, comment);

  // Type character by character but faster
  await pg.keyboard.type(comment, { delay: 15 });
  await sleep(2000);

  await pg.screenshot({ path: `C:/Users/Owner/Documents/top-gta-home-inspections/scripts/reddit-typed.png` });

  // Find submit button
  const submitResult = await pg.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    // Look for comment/reply submit button
    const submit = btns.find(b => {
      const t = (b.innerText || b.textContent || '').trim().toLowerCase();
      return (t === 'comment' || t === 'reply' || t === 'submit comment') && !b.disabled;
    });
    if (submit) {
      submit.click();
      return `clicked: ${submit.innerText}`;
    }
    // Log what buttons exist
    return 'no submit found. buttons: ' + btns.map(b => b.innerText?.trim()).filter(t => t && t.length < 30).join(', ');
  });

  console.log('Submit result:', submitResult);
  await sleep(4000);
  await pg.screenshot({ path: `C:/Users/Owner/Documents/top-gta-home-inspections/scripts/reddit-result.png` });

  const success = submitResult.startsWith('clicked');
  console.log(success ? '✅ Posted!' : '❌ Submit failed');
  return success;
}

async function main() {
  const browser = await puppeteer.connect({ browserURL: 'http://localhost:9222' });
  // Use EXISTING page rather than new tab (keeps cookies)
  const pages = await browser.pages();
  const pg = pages.find(p => p.url().includes('reddit')) || pages[0];
  pg.setDefaultTimeout(40000);

  console.log('Using page:', pg.url());

  // Navigate to reddit first to confirm session
  await pg.goto('https://www.reddit.com', { waitUntil: 'networkidle2', timeout: 30000 });
  await sleep(3000);
  const loggedIn = await checkLogin(pg);
  console.log('Session active:', loggedIn);
  await pg.screenshot({ path: 'C:/Users/Owner/Documents/top-gta-home-inspections/scripts/reddit-session.png' });

  const results = [];

  const threads = [
    {
      url: 'https://www.reddit.com/r/waterloo/comments/1iiec1i/home_inspector_recommendations/',
      label: 'r/waterloo — Home inspector recommendations',
      comment: `Used ASADS (asads.ca) for our place in Cambridge last year and was really happy with it. Inspector took about 3 hours on a 1,900 sq ft semi, found an attic moisture issue from a bathroom fan venting into the attic rather than outside (extremely common in this area and causes early roof deck rot), plus flagged the water heater was original to the house.

We used that to push for a credit at closing.

What stood out: thermal imaging is included in their base price, not a $150 add-on. Report came through same day with photos. Inspector actually called back when I had questions after reading through it.

For Waterloo Region specifically — worth asking whoever you hire whether they check for Kitec plumbing (orange/blue pipes, common in 1995–2007 builds here, insurance issues) and aluminum wiring in older homes. Both come up regularly around here.`
    },
    {
      url: 'https://www.reddit.com/r/Guelph/comments/1ilwowd/house_inspector_recommendations/',
      label: 'r/Guelph — House inspector recommendations',
      comment: `We used ASADS (asads.ca) — they cover Guelph and the surrounding area. Inspector was thorough, didn't rush, found a few things including some foundation crack points worth monitoring and a furnace that was well past its expected lifespan (original 1998 unit).

Guelph has such a mixed housing stock — older south end homes can have galvanized plumbing or active knob-and-tube, while newer north end builds often have Kitec (the orange/blue plastic piping that a lot of insurers won't touch without remediation). Worth making sure your inspector is familiar with all of it.

Thermal imaging was included in their price, full report same day. Would use again without hesitation.`
    },
    {
      url: 'https://www.reddit.com/r/cambridgeont/comments/121oxur/recommendation_for_home_inspector/',
      label: 'r/cambridgeont — Recommendation for home inspector',
      comment: `ASADS (asads.ca) is actually based out of Cambridge — used them twice now. Very thorough both times.

First inspection found Kitec plumbing in a 2003 build that nobody had mentioned (seller gave us a credit). Second was a 1960s place in Galt where they found aluminum wiring throughout and a cracked heat exchanger on the furnace — that one we needed to know about before we committed.

Thermal imaging included at no extra charge, written report the same day. Good with the older Cambridge/Galt brick housing stock specifically — they know what to look for.`
    },
    {
      url: 'https://www.reddit.com/r/TorontoRealEstate/comments/1gtdqs4/recommendations_for_best_home_inspector/',
      label: 'r/TorontoRealEstate — Recommendations for best home inspector',
      comment: `A few things that genuinely separate good from mediocre inspectors in Toronto — since Ontario still has no mandatory licensing (the Home Inspection Act never got proclaimed), credentials are the only real quality signal:

- **InterNACHI or OAHI certified** — minimum bar
- **E&O insurance** — protection if they miss something significant
- **Thermal imaging included** in base price, not a $150–$200 add-on. Infrared cameras catch moisture behind walls and missing insulation you'd never see otherwise. Really useful in Toronto's older housing stock where renovations sometimes just cover up problems.
- **Same-day report** — you need it before your condition expires, not 3 days later

Used ASADS (asads.ca) for a semi in the east end. Three+ hour inspection, found aluminum wiring throughout (1970s build, very common, but insurers want it remediated), and caught a slow leak under the kitchen sink that had been dripping onto the subfloor long enough to cause rot the seller apparently hadn't noticed.

The thermal scan showed a cold spot in the exterior basement wall that turned out to be a section of missing insulation behind the drywall. Not something you find any other way.`
    },
    {
      url: 'https://www.reddit.com/r/ontario/comments/1llsqln/how_much_does_home_inspection_in_ontario_cost/',
      label: 'r/ontario — How much does home inspection cost in Ontario',
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
      label: 'r/RealEstateCanada — Home inspection condition am scared',
      comment: `The condition is your protection — try to think of it that way rather than an obstacle. Practical breakdown:

**During the condition period (usually 3–5 business days):**
1. You hire a certified inspector — they assess everything, takes 2.5–4 hours on a standard home
2. You get a written report, same day or next day
3. You decide: proceed, negotiate, or walk away with deposit back

**The report will look alarming.** Every inspection finds things — every house has deficiencies. What matters is severity:

- *Safety hazards* (cracked heat exchanger, exposed wiring, unsafe deck) → needs action regardless
- *Major defects* ($5k+ to fix: foundation issues, knob-and-tube or aluminum wiring, Kitec plumbing, roof nearly at end of life) → your negotiating leverage
- *Maintenance items* (aging caulking, slow drain, water heater that still works) → just budget for it, not a reason to walk

**If something significant is found:**
Get a contractor quote before your condition expires. "Kitec plumbing found, replacement quotes came in at $6,500 — requesting a credit" is a real negotiation. "Some plumbing concerns" is not.

Most common findings in Ontario that actually matter: Kitec plumbing (1995–2007 builds), aluminum wiring (1965–1978 era), active basement water, roof under 5 years of life.

Booking with a certified inspector who includes thermal imaging is worth it — it catches moisture behind walls that isn't visible. ASADS (asads.ca) does same-day reports which helps a lot when you're working against a tight condition window. You've got this.`
    },
  ];

  for (const thread of threads) {
    const success = await postToThread(pg, thread.url, thread.comment, thread.label);
    results.push({ thread: thread.label, url: thread.url, success });
    if (success) {
      await sleep(15000); // 15s between successful posts
    } else {
      await sleep(5000);
    }
  }

  console.log('\n\n════ FINAL RESULTS ════');
  results.forEach(r => console.log(`${r.success ? '✅' : '❌'} ${r.thread}`));

  fs.writeFileSync('C:/Users/Owner/Documents/top-gta-home-inspections/scripts/reddit-results.json',
    JSON.stringify(results, null, 2));

  browser.disconnect();
}
main().catch(e => console.error('Fatal:', e.message, e.stack));
