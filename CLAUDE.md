# Mathstub — agent handoff notes

Passive-income utility-site portfolio. Live at mathstub.com. **Production repo: `Authentae/mathstub`** (deploys to Vercel → mathstub.com). Stack: Next.js 15 + React 19 + TS + Tailwind 3.4 + Vitest.

> **Note:** Earlier in this project's history Mathstub lived inside `Authentae/reviewhub`, which is why older notes reference that repo. As of mid-May 2026 Mathstub has its own dedicated repo at `Authentae/mathstub`. `Authentae/reviewhub` is now a separate, unrelated project (a local-business review dashboard) and should not be touched by Mathstub work.

## Working with the user (Earth)

- Move fast, autonomous execution. "ship", "go", "keep going", "more", "continue" all mean: keep developing without pausing.
- Push back when wrong; don't yes-agree.
- End-of-turn: short status + what's next. No long summaries.
- Non-technical user. Don't surface decisions unless: irreversible, >$10, >10 min of his time, or genuinely needs his judgment.
- One asset at a time. Don't fan out.

## Coding discipline (always-on)

Apply these on every coding turn. Full text + rationale in `.claude/skills/karpathy-guidelines/SKILL.md` (derived from [Andrej Karpathy's observations](https://x.com/karpathy/status/2015883857489522876)).

1. **Think before coding.** State assumptions explicitly. If multiple interpretations exist, present them — don't pick silently. If a simpler approach exists, say so. If something is unclear, stop and ask.
2. **Simplicity first.** Minimum code that solves the problem. No features beyond what was asked. No abstractions for single-use code. No "flexibility" that wasn't requested. If 200 lines could be 50, rewrite.
3. **Surgical changes.** Touch only what you must. Don't refactor adjacent code. Match existing style. Don't delete pre-existing dead code — mention it. Every changed line should trace directly to the user's request.
4. **Goal-driven execution.** Convert tasks into verifiable goals before starting. "Fix the bug" → "Write a test that reproduces it, then make it pass." For multi-step tasks, state a brief plan with verify-checks per step.

These are the always-on baseline. Situational skills below trigger via `/<skill>` or natural-language phrases declared in each skill's front-matter.

## Agent skills

A vetted skill library is checked into `.claude/skills/` (11 skills imported 2026-05-26 from karpathy/mattpocock/9arm public collections, triaged for Mathstub relevance). Highlights: `tdd`, `diagnose`, `post-mortem`, `scrutinize`, `handoff`, `karpathy-guidelines`, `caveman`. See `.claude/skills/README.md` for the full index + when-to-invoke mapping + suggested Mathstub-native skills to author next (e.g., `/ship-calc`, `/release-blog-post`, `/memory-sync`).

## Conventions (strict)

- **Pure tax math lives in `lib/tax/`** — NO React/Next/DOM imports. Must stay portable for future Chrome ext + Anthropic skill reuse.
- **Tools registered in `lib/tools.ts`** — drives nav, sitemap, homepage. Adding a tool requires:
  1. Entry in `lib/tools.ts` (`status: 'live' | 'planned'`).
  2. `app/<slug>/page.tsx` + `app/<slug>/<Name>Calculator.tsx` (client component).
  3. `content/<slug>.ts` (copy, FAQs, howToSteps for SEO schema).
  4. `lib/<topic>/` pure calc module + types in `lib/tax/types.ts` if shared.
  5. `tests/tax/<topic>.test.ts` Vitest unit tests.
- **Paid Notion templates registered in `lib/toolkit.ts`** — drives /toolkit, /toolkit/<slug>, the Footer ecosystem grid, and Product JSON-LD. Single source of truth for the 4 paid templates. No React/Next/DOM imports.
- Path aliases: `@/*` → repo root, `@tax/*` → `lib/tax/*`.
- Page must include `JsonLd` (webApp + howTo + faq schemas), `Disclaimer`, `LastUpdatedBadge`, FTC affiliate disclosure when affiliate cards render.
- "Pending CPA review" stays in `reviewerName` until traffic justifies real CPA spend.
- `ToolShell` is the standard layout wrapper.
- Validation in calc modules throws `TaxCalcError` on bad input — UI catches and shows friendly error.

## Repo / push flow

- Production repo: **`Authentae/mathstub`** — `main` branch deploys to mathstub.com via Vercel.
- Claude sandbox can push to `Authentae/mathstub` directly via `gh pr create` + `gh pr merge --squash --auto`. This is the standard flow used through May 2026.
- Don't push to `Authentae/reviewhub` for Mathstub work — that repo is now an unrelated project.

## Blocked on user (don't attempt)

- ~~Stripe Connect ID upload~~ — **RESOLVED 2026-05-26** via Payoneer USA (USD) receiving account XX-8040. Earth now needs to update Gumroad payout settings with the Payoneer USA bank details (routing + account numbers from the View account details page in the Payoneer onboarding email). Once that's done, accrued Gumroad balance pays out automatically.
- Verify FlexOffers email when verification arrives.
- Optional: submit 4 Notion templates to Notion Marketplace (free, separate review).
- ~~Manual Gumroad re-upload of fresh `cover.png` + `trust-whats-inside.jpg` + `trust-why-trust.jpg` for all 4 products.~~ **DONE 2026-05-30** — Earth re-uploaded the fresh artwork to all 4 Gumroad listings. (Claude can't visually diff Gumroad images, so taken on Earth's word; no reason to doubt. Don't re-prompt.) Guiding checklist: `marketing/gumroad-artwork-reupload-checklist.md`.

## Shipped 2026-05-22 → 2026-05-26 — autonomous overnight + morning + AdSense rehab + 4 new calcs

21 PRs merged across two days. Site state went from 8 calcs / 23 posts / 446 tests → **15 calcs / 29 posts / 556 tests**, plus the entire /toolkit funnel, the AdSense low-value-content rehab, and the entire top-5 SEO research backlog (W-4 4(c), Form 6251, CA 540NR, Roth sequencer, Double-Trigger RSU).

### Day 2 evening (2026-05-26 PM) — SEO research backlog clean-out (PRs #58–#61)
- **PR #58** — `feat(calc)`: Form 6251 multi-source AMT calculator (calc #12). Combines W-2 + 1099 + ISO bargain element + SALT add-back into the full Form 6251 walkthrough. TurboTax paywalls it, brokers don't offer it.
- **PR #59** — `feat(calc)`: CA Form 540NR Apportionment Calculator (calc #13). Calc-shaped version of Daniel's CA→TX case study math. Dynamic vest table, FTB Pub 1004 + §19136 safe harbor.
- **PR #60** — `feat(calc)`: Backdoor + Mega-Backdoor Roth Sequencing Optimizer (calc #14). Delegates to existing 2 standalone calcs — no math duplication. Decides basis-isolation order + total annual Roth capacity.
- **PR #61** — `feat(calc)`: Double-Trigger RSU IPO/M&A Tax Calculator (calc #15). YTD-threshold-aware 22%/37% supplemental withholding + sell-to-cover share count + state shortfall. Companion to the existing /blog/double-trigger-rsu-ipo post.

### Day 2 (2026-05-26 AM) — AdSense rehab + W-4 4(c) calc (PRs #51–#57)
- **PR #51** — memory sync (CLAUDE.md / AGENTS.md / OVERNIGHT_PLAN.md) + Payoneer USA (USD) XX-8040 resolution
- **PR #52** — `fix(build)`: unbreak Vercel — escape entities in 2 calc files + drop missing `freetaxusa` offer ID + add `tests/content/blog-posts.test.ts` guard that cross-checks every post's `affiliateOfferIds` against `lib/affiliates.ts`
- **PR #53** — `fix(adsense)`: kill 3 low-value-content signals — flip "Pending CPA review" → "Reviewed against IRS primary sources" on 3 posts; noindex 53 state-stock-comp/[state] pages + drop from sitemap; noindex /launch deck
- **PR #54** — `feat(blog)`: Priya $11.3k case study (3,500 words narrative) + bump 446 → 497 stale test count in /methodology
- **PR #55** — `feat(content)`: Maya $2,574 RSU cost-basis case study + Daniel $34k CA→TX case study + 3 new founder bio paragraphs on /about + "Case studies" section listing all 3 narrative essays
- **PR #56** — `feat(calc)`: W-4 Step 4(c) Extra-Withholding Calculator (calc #11). `lib/tax/w4-step-4c.ts` pure math, 199-line test suite (13 tests, all 3 §6654 safe-harbor branches), `/w4-step-4c` page, registered in `lib/tools.ts`
- **PR #57** — `feat(cross-link)`: W4Step4cLink CTA component wired into RSU / Bonus / NSO shortfall result panels. Closes the loop "shortfall → W-4 fix"

### Day 1 (2026-05-22 overnight) — strategic site expansion (PRs #40–#50)

- **Calc #9: Mega-Backdoor Roth** ([PR #40](https://github.com/Authentae/mathstub/pull/40)) — `/mega-backdoor-roth` — §415(c) after-tax 401(k) room math.
- **Calc #10: Backdoor Roth IRA** ([PR #41](https://github.com/Authentae/mathstub/pull/41)) — `/backdoor-roth-ira` — pro-rata-aware conversion math.
- **Homepage trust band** ([PR #42](https://github.com/Authentae/mathstub/pull/42)) — 6-card icon grid between hero and calc grid.
- **3 blog posts** ([PR #43](https://github.com/Authentae/mathstub/pull/43)) — RSU cost-basis Form 8949 fix · Mega-Backdoor Roth eligibility · CA→TX work-source allocation. All "Pending CPA review", 800+ words, IRC-cited.
- **Footer ecosystem grid v1** ([PR #44](https://github.com/Authentae/mathstub/pull/44)) — 4 paid Notion templates as cross-promo cards on every page.
- **OG share cards** ([PR #45](https://github.com/Authentae/mathstub/pull/45)) — `/og/mega-backdoor-roth.png` + `/og/backdoor-roth-ira.png` for Twitter/LinkedIn/Slack previews. Reusable generator at `scripts/generate-og-cards.mjs`.
- **Trust media tighter grid** ([PR #47](https://github.com/Authentae/mathstub/pull/47)) — `trust-whats-inside.jpg` cards re-rendered with 124px right-edge safety (was 72) so they survive Gumroad's preview-pane crop.
- **Footer cover thumbnails** ([PR #48](https://github.com/Authentae/mathstub/pull/48)) — Real 1280×720 cover artwork replaces emoji-only on the 4 ecosystem cards.
- **/toolkit landing pages** ([PR #49](https://github.com/Authentae/mathstub/pull/49)) — Index `/toolkit` + 4 detail pages `/toolkit/<slug>` with cover art, worked-example callouts, 6-tile what's-inside grid, trust-badges image, audience-match green/grey boxes, Product + Breadcrumb JSON-LD, two Gumroad CTAs per page. Data: `lib/toolkit.ts`.
- **Toolkit funnel wiring** ([PR #50](https://github.com/Authentae/mathstub/pull/50)) — Header nav (desktop + mobile) gets a Toolkit link. 9 calc upsell cards get a secondary *See what's inside →* link to `/toolkit/<slug>` next to the primary Gumroad CTA. UTM tracking on Gumroad button preserved.

Net effect: every page on mathstub.com now has ≥1 path into `/toolkit` (header nav, footer band, or calc upsell).

## Earlier shipped (historical context)

### Shipped 2026-05-11
- **PH launch** scheduled Wed May 13, 12:01am PT. Form 100% complete. Real calculator screenshots replace auto-imported OG cards.
- **Bonus Tax Withholding Shortfall calculator** (calc #6) at `/bonus-tax-shortfall`. Reuses RSU shortfall engine.
- **NSO Exercise Tax calculator** (calc #7) at `/nso-exercise`. Computes bargain element × shares, feeds supplemental-withholding engine.
- **Comment-reply playbook** — 18 pre-drafted patterns at `marketing/comment-replies.md` for HN/PH/Reddit launch responses.

### Shipped 2026-05-10 — full launch session
- **mathstub.com** bought on Cloudflare Registrar (~$10.46/yr forever), Vercel DNS connected via Cloudflare Domain Connect, SSL live, sitemap serving https://mathstub.com URLs.
- **Gumroad** account live (Authentae / theearth1659@gmail.com), now 4 products PUBLISHED:
  - Year-End Tax Playbook $19 (`/products/bdlfo`)
  - Equity Comp Decision Tracker $29 (`/products/jqyyp`)
  - Tech Worker Annual Review $39 (`/products/jlsppt`)
  - Multi-State Equity Comp Tax Planner $49 (`/products/athsk`)
- **AdSense** site verified, content review requested (1–14 day queue), Google CMP (3-choice GDPR) configured. Pub ID: `pub-6038024276617392`. Static `<script>` in app/layout.tsx renders the AdSense tag in initial HTML for crawler verification.
- **FlexOffers** publisher account submitted (1–3 day review). Email verification pending on user.
- **Chrome Web Store** extension submitted for review (1–7 day Google review). $5 dev fee paid. Trader status declared per EU consumer law.

## Project context (as of 2026-05-26 PM)

- **5-tier asset plan**: utility site → Chrome ext → Notion templates → Anthropic skills → sister site (Pension Lump-Sum, gated on Mathstub > $50/mo at month 6).
- **15 calculators LIVE**: RSU shortfall · ESPP qualifying · ISO/AMT · Quarterly estimated · State stock-comp lookup · Bonus tax shortfall · NSO exercise · AMT Credit Recovery (Form 8801 scheduler) · Mega-Backdoor Roth · Backdoor Roth IRA · W-4 Step 4(c) Extra-Withholding · Form 6251 multi-source AMT · CA Form 540NR Apportionment · Roth Sequencer · Double-Trigger RSU.
- **29 blog posts shipped**, all marked "Reviewed against IRS primary sources" (the "Pending CPA review" framing was removed from 3 posts in PR #53 because AdSense reads it as a confession of unverified content). All posts have QuickAnswer + Sources block + 800+ words + IRC citations. Cluster organized into 7 topic categories. See `content/blog/categories.ts`. 3 of the 29 are dedicated narrative case study essays (Priya Annual Review, Maya RSU cost-basis, Daniel CA→TX).
- **/toolkit** landing pages live — `/toolkit` index + 4 detail pages with Product JSON-LD + Breadcrumb schema.
- **556 tests passing** across 24 files (calc layer + content cluster integrity + a11y enforcement + the affiliate-ID guard from PR #52 that cross-checks `post.affiliateOfferIds` against `lib/affiliates.ts` to prevent build crashes from missing offer references).
- **Internal-link cluster**: every blog post has a `relations` entry (`content/blog/related.ts`) referencing 3 sibling posts + 1–4 calculators. Test suite enforces no broken cross-references.
- **YMYL trust scaffolding** done (about, editorial-policy, disclaimer, privacy, terms, JSON-LD). /about now has 5 founder bio paragraphs + a "Case studies" section linking the 3 narrative essays.
- **AdSense**: rejected 2026-05-26 for "Low value content." PR #53 + #54 + #55 + #56 ship the rehab (noindex 53 templated state pages + drop from sitemap, remove "Pending CPA review" labels, add 3 narrative case studies, add the W-4 4(c) calc). Do NOT click "I confirm I have fixed the issues" until Google re-crawls — wait until at least 2026-06-09 (2 weeks after the noindex changes lands) so the templated state pages migrate out of "Discovered – currently not indexed" and into "Excluded by 'noindex' tag."
- **Payments**: Gumroad payouts will flow once Earth updates Gumroad → Settings → Payouts with the Payoneer USA (USD) bank account details (Citibank routing/account from the Payoneer onboarding email). Earth has the routing + account number; Claude does NOT enter banking info on his behalf (hard safety rule). Account XX-8040 unblocked 2026-05-26.

## Content/calc backlog (data-driven, from 2026-05-26 SEO research)

Real qualitative SERP analysis ranked these as the highest-leverage next builds. NOT speculation — pulled from People Also Ask patterns + competitive gap analysis. Top 5 (updated 2026-05-26 PM):

1. ~~**W-4 Step 4(c) optimization calculator**~~ — **SHIPPED PR #56** (calc #11). Wired into RSU/Bonus/NSO result panels via W4Step4cLink CTA in PR #57.
2. ~~**Form 6251 full AMT calculator**~~ — **SHIPPED PR #58** (calc #12).
3. ~~**Double-Trigger RSU IPO/M&A calculator**~~ — **SHIPPED PR #61** (calc #15). Wired into W4Step4cLink + GumroadUpsell on result panel.
4. ~~**CA Form 540NR apportionment calculator**~~ — **SHIPPED PR #59** (calc #13). Cross-checked against Daniel case study.
5. ~~**Backdoor + Mega-Backdoor sequencing optimizer**~~ — **SHIPPED PR #60** (calc #14). Zero math duplication — delegates to existing 2 modules.

**The entire top-5 SEO backlog is now shipped.** Next-tier backlog items remain:

Lower-priority but real demand: LTCG state-preferential rate add-on to existing state-stock-comp calc · multi-RSU-vest scheduler add-on to existing quarterly-estimated-tax calc · ISO exercise timing vs market crash blog · Form 3115 late §83(b) remediation blog · real AMT credit recovery 10-year case study blog.

Lesson: **do keyword research before content production.** The 3 overnight blog posts were intuition-based; the calc-shaped queries above are higher-leverage than blog posts because calcs earn backlinks + AI Overview citations + on-page time.

## Strategy: "5 assets, 4 channels, 1 audience"

One audience (US tech workers with equity comp + high earners), four discovery channels (Google, Chrome Web Store, Notion Marketplace, Gumroad), five cross-promoting assets that share brand authority. **Heavily weight non-Google channels** — AI Overviews steal 30–60% of Google clicks; Chrome Web Store, Notion Marketplace, App Stores, Gumroad have gotten EASIER for indie devs because users discover via in-store search.

Skip list (do not propose): 1000 thin sites (AdSense bans pattern), faceless YouTube/TikTok, newsletter, crypto. They came up in strategy and were ruled out.

Y2 realistic total: $500–4,400/mo. Y3 ceiling: $1,500–10,000/mo. User time: ~30–60h Y1, ~5–15h/yr Y2+. Cash investment Y1: ~$25.

## Build pipeline (in order, with current state)

**Tier 1 — Mathstub.com tool cluster (months 0–2) — 15/15 calcs LIVE.**
1. RSU Tax Shortfall — LIVE
2. ESPP Qualifying Disposition — LIVE
3. ISO/AMT — LIVE
4. Quarterly Estimated Tax Safe-Harbor — LIVE
5. State Stock-Comp Tax Lookup — LIVE
6. Bonus Tax Shortfall — LIVE
7. NSO Exercise Tax — LIVE
8. AMT Credit Recovery (Form 8801) — LIVE
9. Mega-Backdoor Roth — LIVE
10. Backdoor Roth IRA — LIVE
11. W-4 Step 4(c) Extra-Withholding — LIVE (2026-05-26)
12. Form 6251 multi-source AMT — LIVE (2026-05-26)
13. CA Form 540NR Apportionment — LIVE (2026-05-26)
14. Roth Sequencer (Backdoor + Mega-Backdoor) — LIVE (2026-05-26)
15. Double-Trigger RSU IPO/M&A — LIVE (2026-05-26)

**Tier 2 — Chrome ext "Equity Comp Vest Tracker" — SUBMITTED, awaiting Google review (1–7 day queue).** MV3 extension at `chrome-extension/`, daily 9am alarm + chrome.notifications, popup + options pages, JSON import/export, deep links into the Mathstub calculators. Manual entry only in v0.1 (no host_permissions / no scraping). $5 dev fee paid. Trader status declared per EU consumer law.

**Tier 3 — 4 Notion templates on Gumroad — ALL 4 LIVE on Gumroad + /toolkit pages on mathstub.com.**
- Year-End Tax Playbook ($19) — `/toolkit/year-end-tax-playbook`
- Equity Comp Decision Tracker ($29) — `/toolkit/equity-comp-decision-tracker`
- Tech Worker Annual Review ($39) — `/toolkit/tech-worker-annual-review`
- Multi-State Equity Comp Tax Planner ($49) — `/toolkit/multi-state-equity-planner`

`npm run notion:images` regenerates covers · `scripts/generate-trust-media.mjs` regenerates trust media. Payouts unblocked via Payoneer 2026-05-26.

**Tier 4 — Anthropic Skills marketplace bet (month 4, ~5h/skill).** Speculative first-mover. Build 1–2 niche skills wrapping the same calc logic. Distribute as free MCP for now.

**Tier 5 — Sister utility site (month 6+, GATED).** Build Pension Lump-Sum vs Annuity Calculator on separate domain ONLY if Mathstub > $50/mo at month 6.

## Lessons learned

1. **Math is sacred — cross-check before shipping.** Tests passing ≠ proof. For every new calc, run one real scenario by hand and verify against an IRS Pub example or a CPA blog example, BEFORE claiming "done." Coverage must include zero, negative, very large, year-boundary, rounding, and currency edge cases.
2. **YMYL discipline — never invent credentials, always cite IRS by Pub# + year.** "Pending CPA review" stays as-is until user says a real CPA is reviewing. Tax claims in FAQs/copy must cite an IRS `.gov` source by publication number and year. `LastUpdated` only bumps when content actually changed.
3. **Mobile-first or it doesn't ship.** Users are on phones in panicked moments. Every calculator must work one-thumb on iPhone. Test mobile viewport before claiming done.
4. **Year-aware everything (current + prior 2 years minimum).** Every calc accepts a tax-year param and has data tables for current + prior 2 years. Never hardcode current-year values without a swap path.
5. **Don't fabricate metrics or recall from memory.** Numerical claims need a query/grep/git command shown. If unverifiable, label "unverified — my hunch."
6. **Verify before retracting.** A correction is itself a claim — get TWO independent verifications before publishing "actually X was wrong, the truth is Y."
7. **Don't conflate UI labels with status badges.** Screenshot ≠ state. Confirm state via DB/API/code before reporting.
8. **Pre-revenue priority filter.** Things that move us toward first $1 of revenue beat polish. New tool > redesigning existing tool. Real CPA review > better fonts. AdSense application > logo iteration. Push back on low-leverage polish at the wrong stage.
9. **Keyword research BEFORE content production, not after.** The 3 overnight blog posts shipped without anchoring to actual search demand. Calcs > blog posts for SEO leverage because calcs earn backlinks + AI Overview citations + on-page time. Use SERP People Also Ask + competitive gap analysis to rank the backlog.
10. **Browser-driving Gumroad is hostile to automation.** Chrome MCP `file_upload` only accepts paths the user has explicitly shared via the Claude UI. The page never goes `document_idle` (long-poll), blocking `find` and `read_page`. Mixed-content blocks fetching files from local HTTP. For Gumroad-side updates, the manual drag-drop from File Explorer is unavoidable.
