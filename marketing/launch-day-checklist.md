# Launch Week Checklist — Earth's morning playbook

Wake up, open this doc, work through in order. Time per item is realistic.

---

## TODAY (Mon May 11) — Show HN evening Thailand

**7-9pm Thailand time = 8-10am ET = peak HN traffic**

### Step 1 — Post Show HN (5 min)

Go to https://news.ycombinator.com/submit. **Important:** put URL in the URL field, NOT in the title.

**Title (copy verbatim — under 80 chars):**
```
Show HN: Mathstub – Free tax calculators for tech workers with equity comp
```

**URL field:**
```
https://mathstub.com
```

**Text field:** leave blank (URL submission, not text post).

After submitting, **immediately post this as a comment on your own thread** (this is HN-allowed and increases dwell time):

```
Solo dev, first launch. Built this because the same question keeps coming up in tech-worker circles: my RSU/ESPP/ISO vested, now what do I owe in April? The math is public domain — IRS Pub 505, §3402(g), Form 6251 — but the existing tools either lock answers behind TurboTax's funnel or assume you already speak CPA.

Seven calculators on the site:

- RSU tax shortfall — the gap between 22% supplemental withholding and your real marginal rate
- Bonus tax shortfall — same engine for cash bonuses (a wider audience than just equity comp)
- ESPP qualifying disposition — splits §423(c) sale into ordinary income and LTCG, with NIIT
- ISO exercise AMT — Form 6251 walk for exercise-and-hold vs same-year-sell
- NSO exercise tax — bargain element + supplemental withholding shortfall + FICA
- Quarterly estimated tax safe-harbor — §6654 with the exact dollar amount to send by next deadline
- 50-state stock-comp lookup — top marginal + supplemental + state-AMT status

Tech: Next.js 15 + TypeScript + Tailwind + Vitest. Tax math is pure functions in lib/tax/ (no React/DOM imports), 243 tests because the math has to be right.

Not trying to be: tax software (no return prep), tax advice (every page has IRS Pub citations + disclaimer), or a SaaS (no signup, calculators run client-side, no data leaves the browser).

Monetization: AdSense + affiliate links to TurboTax/TaxAct/Carta/Empower. Three Notion templates on Gumroad ($19/$29/$39) for the deeper "track-your-equity-comp-all-year" use case. The calculators stay free forever.

Happy to answer questions about tax math, monetizing free tools, or the build pipeline.
```

### Step 2 — Sit on the thread for 30-60 min replying to comments

Use **`marketing/comment-replies.md`** — 18 pre-drafted patterns. Search by question, copy reply, edit, post.

Common HN patterns:
- "Are you a CPA?" → reply pattern #1
- "How is this different from TurboTax?" → reply #2
- "Why not open-source?" → reply #3
- "Is this an ad?" → reply #4
- Skeptical/edge case → reply #5a-d

**Do NOT:**
- Edit the post 30 min after submitting (HN algorithm punishes edits)
- Reply with "thanks!" — engage with substance
- Argue. If someone hates it, thank them for the input and move on.

### Step 3 — Don't refresh the rank obsessively

HN rank fluctuates wildly in the first hour. If you're on the front page after 2h, you've succeeded. If not, the post will fade — that's normal. Move on to PH prep.

---

## TUESDAY (May 12) — Reply window + last prep

### Morning
- Check HN comments overnight, reply to anything new (reply window stays valid 24h)
- Verify FlexOffers email verification (probably arrived overnight)
- Check Empower rejection email — log it for re-apply post-launch

### Afternoon (5 min)
- Apply to **TaxAct direct** — https://www.taxact.com/affiliates — small player, easy approval
- Apply to **Amazon Associates** — https://affiliate-program.amazon.com — instant 24h account approval

### Evening (10 min)
- Stripe ID upload — your Gumroad payouts unblock the moment this clears
- Check Impact Marketplace approval status (link in your email, should be ≤2 days)

---

## WEDNESDAY (May 13) — PH LAUNCH DAY 🚀

### 11am Thailand (= 12:01am PT) — PH goes LIVE
- PH was scheduled, will auto-publish. You'll get a notification.
- The launch URL will be `https://www.producthunt.com/posts/mathstub`
- **Post your maker comment immediately** — already drafted, copy from `marketing/producthunt-launch.md` step "Maker comment"

### 11am-3pm Thailand — peak engagement window
- Reply to every PH comment within 30 min (PH algorithm rewards comment velocity)
- Use `marketing/comment-replies.md` patterns
- **Tweet the PH link** with the launch promo image (`C:\Users\Computer\Desktop\mathstub-uploads\launch-promo.png`):
  ```
  Just launched Mathstub on Product Hunt — free tax calculators for US tech workers with equity comp. RSU shortfall, ISO/AMT, NSO exercise, ESPP, bonus, quarterly estimated, 50-state lookup. Math straight from IRS publications, no signup. [PH link]
  ```
- LinkedIn post — see `marketing/linkedin-launch.md`

### 3pm onwards — Reddit decision
**Don't post Reddit Wed.** Wait at least 24h after PH goes live so the channels don't compete for the same Mathstub traffic.

### End of Wed: save your PH ranking screenshot
- Whatever rank you finish at, screenshot it. PH gives a permanent badge for top-N-of-the-day.
- Add the badge link to mathstub.com footer next week.

---

## THURSDAY+ (May 14+)

### Day 1 of "post-PH" — Reddit
- Pick ONE: r/personalfinance with the **bonus tax post** (broader audience than RSU) — `marketing/reddit-r-personalfinance-bonus.md`
- Best time: Thu/Fri 8-10am ET (= 7-9pm Thailand)
- Sit on the post 30-60 min replying

### Day 2 — Reddit r/cscareerquestions (if Day 1 went well)
- Use `marketing/reddit-r-cscareerquestions-iso.md` (ISO/AMT post)

### Days 3-7 — Re-apply Empower with traffic stats
After 7 days, you'll have a week of Vercel Analytics. Email `Empower@hamstergarage.com`:

> Subject: Re-application — Mathstub (was declined May 11)
>
> Hi Empower team,
>
> I applied via Impact for the Empower affiliate program on May 11 and was declined for "site not yet live or traffic levels too low." That's now resolved — I launched on Product Hunt May 13 and Hacker News May 11. Last 7 days I've had [X] visitors and [Y] sessions per Vercel Analytics, with the top traffic sources being PH, HN, Reddit r/personalfinance, and direct.
>
> Mathstub.com publishes free interactive tax calculators for US tech workers with equity comp — exactly Empower's high-net-worth ICP. Each calculator ends with a "Recommended next steps" section that surfaces relevant partner products. I'd like to add Empower as the recommended wealth-tracker for users with $5k+ tax shortfalls (~70% of my high-shortfall calc users have $100k+ in equity).
>
> Happy to share traffic dashboard read-only if helpful.
>
> Thanks,
> Earth (Authentae)

### Day 7+ — High-bar affiliates with traffic data
- **Carta direct**: https://carta.com/partners/ — application, 5-14 days
- **Harness Wealth**: email `partners@harnesswealth.com` (template in `marketing/affiliate-applications.md` step 3)

### Day 7+ — Apply to Impact-hosted brands
Once Impact approves your publisher account, log in → Programs marketplace → search:
- **Intuit (TurboTax)** — apply
- **NerdWallet** — apply
- **Personal Capital / Empower** (already rejected; wait)
- Any other tax/finance brand

---

## DAILY CHECKS (post-launch)

Bookmark these tabs:
- Vercel Analytics: https://vercel.com/authentaes-projects/mathstub/analytics
- Gumroad sales: https://app.gumroad.com/dashboard
- AdSense: https://www.google.com/adsense/start/
- Kit subscribers: https://app.kit.com/subscribers
- Impact dashboard: https://app.impact.com (when approved)

Daily 5-min check: any sales? Any new Kit subscribers? Any traffic spikes?

---

## DON'T DO

- Don't lower the Notion template prices in panic if first day = 0 sales. Launch-day conversion is 0.5-2%, slow tail.
- Don't redesign the homepage in week 1 based on one critical comment. Wait for 7-day data.
- Don't apply to Empower again before 7 days — burns the relationship.
- Don't pay for ads. The model is "free traffic via SEO + organic launch" — paid ads break the unit economics until AdSense + affiliates are live.
- Don't ship feature requests unless 5+ people ask for the same thing. Cross-post the request to a "v2 ideas" doc and move on.

---

## METRICS TO BEAT (week 1 conservative target)

- HN: 20+ upvotes, didn't disappear from /show in <4h ✓ launch attempt
- PH: 50+ upvotes, top 10 of the day, badge earned
- Vercel Analytics: 1,000+ unique visitors over 7 days
- Kit subscribers: 50+ (5% of visitors)
- Gumroad sales: 1+ in first week
- AdSense: approved by end of week
- FlexOffers: email verified, account approved
- Impact: publisher approved + at least 1 brand application

If hit ≥5/8: launch is a success. Iterate from there.
