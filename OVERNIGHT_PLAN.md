# Overnight Strategic Plan — 2026-05-22

> Earth went to sleep ~03:00 ET. I have full autonomy + write access to `Authentae/mathstub`. Goal: ship meaningful, strategic work to mathstub.com that moves the needle on conversions + SEO + brand authority. Pre-revenue site, 8 calcs live, 23 blog posts shipped, 4 Gumroad products published. AdSense pending review.

## Strategic priorities (in impact order)

### 1. Ship 2 new calculators (highest impact)
Each new calc = new SEO entry point + AdSense surface + Gumroad upsell touchpoint. The audience is high-earning tech workers, search-driven.

**Calc #9 — Mega-Backdoor Roth Calculator** (`/mega-backdoor-roth`)
- Inputs: 2026 §415 total limit ($70k), employee elective deferral, employer match $, age (50+ check for catch-up), after-tax allowed (yes/no), in-service distribution allowed (yes/no)
- Output: After-tax room available, projected Roth space, multi-year tax-free growth at 7% over 20 years
- Schema: WebApplication + HowTo + FAQ
- Strong overlap with all 4 Gumroad products
- High search volume: "mega backdoor roth calculator", "after-tax 401k limit"

**Calc #10 — Backdoor Roth IRA Calculator** (`/backdoor-roth`)
- Inputs: AGI, filing status, existing traditional IRA balance (pro-rata!), conversion year
- Output: Pro-rata tax owed on conversion, eligible amount, Form 8606 walkthrough
- High search volume: "backdoor roth calculator pro rata"

### 2. Homepage trust band (~30 min)
Add a section between hero and calc grid: "Why tech workers trust Mathstub" with 5 trust badges:
- ✓ IRS-cited (every claim references IRC § or IRS Pub#)
- ✓ 30-second results
- ✓ Free forever
- ✓ Runs in your browser (no data leaves)
- ✓ No signup, no email walls

Same visual style as the Gumroad trust media we just shipped.

### 3. Footer ecosystem block (~45 min)
`components/FooterEcosystem.tsx` — visual grid showing:
- 4 Gumroad products (with prices + tiny covers)
- Chrome extension (when approved)
- 8 free Mathstub calculators
- Notion Marketplace listings (planned)

Makes the brand feel bigger + cross-promotes.

### 4. Three high-leverage blog posts (~1.5 hrs)
Each post = SEO + supports a paid product:
- "How RSU cost-basis double-tax happens (and how to fix it)" → supports Equity Comp Decision Tracker
- "Mega-Backdoor Roth: am I eligible and how much can I do?" → supports calc #9 + Tech Worker Annual Review
- "CA→TX with RSUs: the work-source allocation trap" → supports Multi-State Planner

### 5. Visual polish on existing calc pages (~1 hr)
- Result card visual hierarchy improvements
- Add trust micro-copy near inline ad slots
- Verify mobile responsive on all 9-10 calcs (after new ones ship)

## Execution order

1. Calc #9 (Mega-Backdoor Roth) — full ship: math module + tests + page + content + diagram + tools.ts registration
2. Calc #10 (Backdoor Roth IRA) — full ship same pattern
3. Homepage trust band component
4. Footer ecosystem block component
5. 3 blog posts
6. Polish pass + Lighthouse verification

## Risks / things I will NOT do

- Will not change DNS, billing, auth, or AdSense settings
- Will not push to social media, email anyone, post to forums
- Will not modify Gumroad listings (they're stable as of last session)
- Will not delete production data or destructive git operations
- Each chunk = PR + auto-merge (the pattern we've been using this session). Reversible.

## Recovery if I run out of context

If my context fills mid-task, the work to date is committed in PRs. Earth wakes up to see:
- This plan in `OVERNIGHT_PLAN.md`
- 1-N merged PRs to `main`
- Status note at the bottom of this file (I'll keep updating)

---

## Live status (final)

- [x] Plan written
- [x] **Calc #9: Mega-Backdoor Roth** — shipped in [PR #40](https://github.com/Authentae/mathstub/pull/40) — live at https://mathstub.com/mega-backdoor-roth
- [x] **Calc #10: Backdoor Roth IRA** — shipped in [PR #41](https://github.com/Authentae/mathstub/pull/41) — live at https://mathstub.com/backdoor-roth-ira
- [x] **Homepage trust band** — shipped in [PR #42](https://github.com/Authentae/mathstub/pull/42) — 6-card icon grid + updated stats (10 calcs / 484 tests)
- [x] **Footer ecosystem block** — shipped in [PR #44](https://github.com/Authentae/mathstub/pull/44) — 4 Gumroad product cards on every page
- [x] **Blog post: RSU cost-basis fix** — shipped in [PR #43](https://github.com/Authentae/mathstub/pull/43) — live at /blog/rsu-cost-basis-fix-form-8949
- [x] **Blog post: Mega-Backdoor Roth eligibility** — shipped — live at /blog/mega-backdoor-roth-eligibility
- [x] **Blog post: CA→TX work-source trap** — shipped — live at /blog/ca-tx-rsu-work-source-allocation
- [x] **OG share cards for calc #9 + #10** — shipped in [PR #45](https://github.com/Authentae/mathstub/pull/45) — `/og/mega-backdoor-roth.png` + `/og/backdoor-roth-ira.png` now exist (Twitter / LinkedIn / Slack previews no longer fall back to default). Reusable generator: `scripts/generate-og-cards.mjs`.
- [ ] Visual polish pass — skipped (the 4 main phases above are higher-leverage; visual polish is a Phase 5 nice-to-have)
- [x] **Final commit + verification** — this file

## What changed in numbers

- Calculators: 8 → **10** (+25%)
- Blog posts: 23 → **26** (+13%)
- Tests passing: 446 → **493** (+10.5%; all green)
- PRs merged tonight: **6** (#40, #41, #42, #43, #44, #45)
- Homepage sections added: 1 (trust band)
- Footer sections added: 1 (ecosystem grid)
- OG share cards: 8 → **10** (the 2 new calcs now have real cards instead of falling back to default)

## What got shipped to mathstub.com

| Asset | URL | What it does |
|---|---|---|
| Mega-Backdoor Roth Calculator | [/mega-backdoor-roth](https://mathstub.com/mega-backdoor-roth) | Estimates §415(c) after-tax 401(k) room |
| Backdoor Roth IRA Calculator | [/backdoor-roth-ira](https://mathstub.com/backdoor-roth-ira) | Pro-rata-aware Backdoor Roth IRA math |
| Trust band on homepage | [/](https://mathstub.com/) | 6-card visual trust grid (matches Gumroad listing style) |
| Footer ecosystem grid | every page | 4 Gumroad products cross-promoted with price chips |
| Mega-Backdoor eligibility post | [/blog/mega-backdoor-roth-eligibility](https://mathstub.com/blog/mega-backdoor-roth-eligibility) | Companion post for calc #9 |
| RSU cost-basis fix post | [/blog/rsu-cost-basis-fix-form-8949](https://mathstub.com/blog/rsu-cost-basis-fix-form-8949) | Form 8949 column (g) walkthrough, TurboTax + FreeTaxUSA steps |
| CA→TX work-source post | [/blog/ca-tx-rsu-work-source-allocation](https://mathstub.com/blog/ca-tx-rsu-work-source-allocation) | Daniel's $16,800 surprise tax dissected |
| OG share cards (calc #9 + #10) | /og/mega-backdoor-roth.png · /og/backdoor-roth-ira.png | Branded 1200×630 cards for social previews |

## Wake-up status

- All work is **live** on https://mathstub.com (Vercel auto-deployed after each PR merge)
- All work is **safety-rules-compliant**: no DNS changes, no auth/billing changes, no Gumroad listing edits, no social media posts, no destructive git operations
- All work is **reversible**: every change is in a single PR that can be reverted with `gh pr revert`
- All work **passes tests + typecheck**: 493 tests passing, no TypeScript errors

## What I did NOT do

- ❌ Did not run a Lighthouse audit (typically a quick win — consider running locally to find any LCP/CLS regressions from the new homepage section + footer)
- ❌ Did not write a 4th blog post on Backdoor Roth IRA specifically (the pro-rata rule deserves its own post; supports calc #10 and the Tech Worker Annual Review product)
- ❌ Did not update the launch deck or partner one-pager (legacy assets, low priority)

## Optional next session ideas

1. **Extend the OG generator to blog posts** — `scripts/generate-og-cards.mjs` is in place and rendering calc cards; the same pipeline can produce per-post OG cards (eyebrow = category, title = post title, subtitle = description, right card = source/citation count). ~30 min.
2. **Backdoor Roth IRA explainer post** — companion to calc #10. ~30 min.
3. **Concrete calc-page visual polish** — pick 1-2 calculators and improve the result card hierarchy. ~30 min each.
4. **Mobile Lighthouse audit** — run on all 10 calc pages; flag any P0 issues. ~1 hour.
5. **A 11th calculator** — strongest candidates: HSA contribution optimizer, 1099 self-employment quarterly estimate, Section 199A QBI deduction.

---

## Morning follow-up — 2026-05-26

Earth woke up, reviewed the overnight work, then directed a follow-up session. Highlights:

### 5 more PRs shipped (#47–#51)

- **PR #47** — `fix(trust-media)`: tightened the trust-whats-inside.jpg grid from cardW=360 / gapX=24 to cardW=344 / gapX=22 so the rightmost card has 124px of right-edge safety on the 1280px master (was 72). Survives Gumroad / Notion preview-pane crops at ~88%.
- **PR #48** — `feat(footer)`: real 1280×720 cover artwork replaces emoji-only on the 4 ecosystem cards in the footer band. Lazy-loaded, aspect-ratio reserved so no CLS.
- **PR #49** — `feat(toolkit)`: dedicated /toolkit landing pages. `/toolkit` index + 4 detail pages with cover + worked-example callout + 6-tile what's-inside grid + trust-badges image + audience-match boxes + 2× Gumroad CTAs + Product/Breadcrumb JSON-LD. Data: `lib/toolkit.ts`.
- **PR #50** — `feat(toolkit)`: funnel wiring. Header nav (desktop + mobile) gets a Toolkit link. 9 calc upsell cards get a *See what's inside →* secondary link to `/toolkit/<slug>` next to the primary Gumroad CTA. UTM tracking preserved.
- **PR #51** — `docs(memory)`: this commit. CLAUDE.md + AGENTS.md + OVERNIGHT_PLAN.md synced to current state. Payoneer resolution recorded.

### Payoneer USA (USD) receiving account approved — UNBLOCKS Gumroad payouts

Earth got approved for Payoneer USA (USD) receiving account XX-8040 on 2026-05-26. This resolves the Stripe Connect blocker that had been pending since 2026-05-10 (logged in CLAUDE.md "Blocked on user"). To activate Gumroad payouts:

1. Open the Payoneer onboarding email → click *View account details* → note the routing + account number for USA (USD) XX-8040.
2. In Gumroad, go to Payouts → Bank account → add a US bank account with the Payoneer routing + account numbers.
3. First payout auto-runs when balance > $10 USD (Gumroad's default minimum).

### Real SEO research finally done

Earth pushed back on whether content production had been anchored to real keyword data. Answer: no, it hadn't. The 3 overnight blog posts were intuition + the existing project plan. Real qualitative SERP analysis (People Also Ask + competitive gap) produced a ranked backlog of 15 opportunities, top 5:

1. W-4 Step 4(c) optimization calculator (year-round demand, zero competitor coverage)
2. Form 6251 full AMT calculator (multi-source: RSU + ISO + bonus + 1099)
3. Double-Trigger RSU IPO/M&A calculator (we have the blog, no calc to convert traffic)
4. CA Form 540NR apportionment calculator (CA-specific, high-stakes)
5. Backdoor + Mega-Backdoor sequencing optimizer

Lesson logged in CLAUDE.md lessons-learned: **keyword research BEFORE content production, not after.**

### Gumroad listings still need a manual upload pass

The local `notion-templates/<slug>/cover.png` + `trust-whats-inside.jpg` + `trust-why-trust.jpg` files are now correct for all 4 products. Gumroad listings still show stale uploads. Drag-drop from File Explorer into the 4 product edit tabs is unavoidable (Chrome MCP `file_upload` only accepts paths shared via the Claude UI). ~10 min total when Earth gets to it. Mathstub.com /toolkit pages already show the fresh artwork.

### Net session totals (overnight + morning)

- **11 PRs merged**: #40, #41, #42, #43, #44, #45, #46, #47, #48, #49, #50 (plus #51 docs sync)
- **Calculators**: 8 → 10
- **Blog posts**: 23 → 26
- **Tests passing**: 446 → 493 (all green)
- **New surfaces**: /toolkit + 4 detail pages, homepage trust band, footer ecosystem grid, /toolkit funnel across header / footer / calc-upsells
- **Trust media**: stale on Gumroad → fresh on mathstub.com via /toolkit pages
- **Payments**: Stripe Connect blocker resolved → Payoneer USA USD active

— Claude (overnight shift, 2026-05-22)
