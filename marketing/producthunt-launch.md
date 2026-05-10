# ProductHunt launch — Mathstub

**Best launch day:** Tuesday, Wednesday, or Thursday. Avoid Mondays (lots of competing launches) and weekends (low traffic).
**Launch time:** **12:01am Pacific Time** is the official PH cutoff. Launch at 12:01am PT to get a full 24-hour day on the homepage.
**Goal:** top 5 of the day = ~3–8k visitors + a small badge you can put on the site forever.

## Account setup

- Use an existing PH account if you have one (older = more credibility) OR create one a few days before launch and engage genuinely on a few products first to look human.
- Profile name: "Earth Singharash" or however you brand publicly
- Profile bio: "Solo maker. Building small tools that solve specific tax-and-money pain points for tech workers."
- Profile pic: anything that's not a logo (PH culture prefers human faces; a stylized illustration works)

## Submission fields

### Name
**Mathstub**

### Tagline (≤60 chars)
**Free tax calculators for tech workers with equity comp**

(Counts: 53 chars. Direct, no fluff. Don't try to be clever.)

### Description (≤260 chars)
> RSU, ESPP, ISO/AMT, quarterly estimated tax, and a 50-state stock-comp lookup. Free, no signup, math straight from IRS publications. Built because every quarter "I just got an RSU vest and now I owe $X" hits Reddit and the answer keeps getting buried.

(Counts: 257 chars. Just under cap.)

### Maker comment (top comment from your account, post immediately after launch)

> Hi PH. Solo dev, this is my first launch.
>
> Built Mathstub because the same question keeps coming up in tech-worker circles: my RSU/ESPP/ISO vested, now what do I owe in April? The math is public domain — IRS Pub 505, §3402(g), Form 6251 — but the existing tools either lock answers behind TurboTax's funnel or assume you already speak CPA.
>
> Five calculators on the site:
>
> - RSU tax shortfall — the gap between 22% supplemental withholding and your real marginal rate (32–37% for most tech workers).
> - ESPP qualifying disposition — splits §423(c) sale into ordinary income and LTCG, with NIIT.
> - ISO exercise AMT — Form 6251 walk for exercise-and-hold vs same-year-sell, with AMT credit carryforward.
> - Quarterly estimated tax safe-harbor — §6654 90%/100%/110% rules with per-quarter cumulative schedule and the exact dollar amount to send by the next deadline.
> - State stock-comp lookup — top marginal + supplemental withholding + state-AMT status for all 50 states.
>
> Tech: Next.js 15 + TypeScript. Tax math is pure functions (no React/DOM imports), 99.76% test coverage on the calc layer because the math has to be right.
>
> Things I'm NOT trying to be: tax software (no return-prep), tax advice (every page has a disclaimer + IRS Pub citations), or a SaaS (no signup, calculators run client-side, no data leaves the browser).
>
> Monetization: ads + affiliate links to TurboTax/TaxAct/Carta/Empower. Three Notion templates on Gumroad ($19/$29/$39) for the deeper "track-your-equity-comp-all-year" use case. The calculators stay free forever.
>
> Happy to answer questions about tax math, monetizing free tools, or the build pipeline. First launch — feedback wanted.

### Categories (PH lets you pick 3)

1. **Tax** (primary — small but high-relevance audience)
2. **Productivity** (broad)
3. **Personal Finance** (broad, brings comments)

### Topics / tags
`tax`, `personal finance`, `equity compensation`, `RSU`, `tech workers`, `calculator`, `free tool`, `Notion`, `developer tools`

### Pricing
**Free** (with optional paid Notion templates noted in the description)

### Media

- **Logo:** use `chrome-extension/icons/icon-128.png` or upgrade with Claude Design later
- **Gallery (4–8 images):** screenshots of each calculator in use. PH visitors scan images first, click later. Take real screenshots from mathstub.com:
  1. Homepage with all 5 calculators listed
  2. RSU shortfall calculator with realistic inputs filled
  3. ISO/AMT calculator showing the worked example
  4. Quarterly estimated tax with the per-quarter schedule
  5. State lookup showing California
  6. (Optional) Mobile view of one calculator

If you don't have time to take real screenshots, ship without and iterate. Don't gate the launch on perfect images.

### Hunter
**You hunt your own product.** PH used to allow "hunters" but most products now self-hunt for credit attribution. Just submit it under your own account.

## Day-of-launch playbook

### 12:01am PT (launch goes live)
- Post the maker comment as your first comment on the launch
- Tweet/X about it from any tech-worker-following account you have: "Just launched Mathstub on Product Hunt — free tax calculators for tech workers with RSU/ESPP/ISO. mathstub.com [PH link]"
- Pin the launch on your profile

### First 4 hours
This is when the algorithm decides if you make top 5. Engagement matters.

- **Reply to every single comment within 30 min.** PH comment-velocity is a ranking signal.
- **Don't beg for upvotes.** "Hunting for upvotes" is against PH terms; the badge gets revoked. Instead share interesting build detail, ask for feedback, engage genuinely.
- **Don't have friends spam-upvote from new accounts.** PH's anti-vote-ring detection is aggressive; the launch gets nuked.

### After 24 hours
- Save your final ranking screenshot (top X of the day) — PH gives you a badge to embed on mathstub.com
- Add a `Featured on Product Hunt — May 11, 2026` link or badge to the footer of mathstub.com
- Save the top 5 comments / pieces of feedback for product-iteration backlog

## What to NOT do

- Don't launch the same week as Reddit posts. Pace them out — PH gets its own day.
- Don't use multiple accounts to upvote. PH catches it; banning is permanent.
- Don't announce the launch to friends/family before 12:01am PT — early upvotes from outside the first-hour window count less.
- Don't change the description after launch. PH freezes the listing at midnight PT day-of; edits don't propagate to top-of-day ranking.
- Don't skip the maker comment. Launches without one underperform by ~40% because there's nothing for visitors to engage with.
