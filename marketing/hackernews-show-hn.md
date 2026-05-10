# Hacker News — Show HN

**Best post day/time:** Tuesday or Wednesday, 9–11am ET. Avoid Mondays (catch-up traffic from weekends) and Fridays (already coasting).
**Goal:** front page (~30 points = top 30, ~100 points = top 5). Even a brief front-page slot drives 5–20k visitors.

## Title

**Show HN: Free tax calculators for tech workers with equity comp (RSU/ESPP/ISO)**

## URL

`https://mathstub.com`

## First-comment (post this from your account immediately after submitting — HN convention)

> Solo dev here. Built this because every quarter I see the same panicked Reddit posts: "my RSU vested and now I owe $X in April, what do I do?" The math is public domain — IRS Pub 505, §3402(g) supplemental withholding, §6251 for AMT — but the existing tools either lock the answer behind TurboTax's funnel or assume you're already a CPA.
>
> Five calculators on the site:
>
> 1. **RSU tax shortfall** — the 22% supplemental withholding gap when your real marginal rate is 32-37%
> 2. **ESPP qualifying disposition** — splits the §423(c) sale into ordinary income (capped at offer-date discount) and LTCG, with NIIT
> 3. **ISO exercise AMT** — Form 6251 walk for exercise-and-hold vs same-year-sale, with the AMT credit carryforward calc
> 4. **Quarterly estimated tax safe-harbor** — §6654 90%/100%/110% rules with per-quarter cumulative schedule and recommended next payment
> 5. **State stock-comp lookup** — top marginal + supplemental withholding + state-AMT status for all 50 states
>
> Tech: Next.js 15 + TypeScript. Pure tax math is in `lib/tax/` with no React/DOM imports — same module powers a companion Chrome extension and is portable to an Anthropic Skill or MCP if/when those marketplaces ship. 213 unit tests, 99.76% coverage on the calc layer because tax math is the one thing that has to be right.
>
> Things I'm NOT trying to be:
> - tax software (no return-prep)
> - tax advice (every page has a disclaimer + IRS Pub citations)
> - a SaaS (no signup, no account, calculators run client-side, no data leaves the browser)
>
> Monetization is ads + affiliate links to TurboTax/TaxAct/Carta/Empower. Templates on Gumroad if anyone wants the deeper tools (Notion-based annual review, etc.). The calculators themselves stay free forever.
>
> Happy to answer questions about tax math, monetizing free utility tools, or the build pipeline. Source for the tax modules will go up on GitHub once I've stress-tested it for one more tax season.

## Notes

- **Don't bold or use headings in the HN comment.** HN auto-strips most formatting; only `*italics*` and code blocks render.
- **The "first comment from author" is HN convention** — gives the post context and signals you'll be present in the thread. Posts where the author shows up in the first 30 minutes do measurably better.
- **Engage in comments.** HN crowd likes nerdy follow-ups. Answer questions about tax-bracket math, AMT mechanics, why you used Next.js etc. Don't promote products in replies — answer the question, link the calculator only if they explicitly ask "where's the calc."
- **If asked about revenue:** be honest. "Day 1, $0. Three Notion templates on Gumroad, AdSense in review. We'll see." HN respects honest unfinished work.
- **Don't post on the same day as your Reddit posts.** Pace them out (~24h apart). Cross-pollination feels organic.
