# Mathstub — agent handoff notes

Passive-income utility-site portfolio. Live at mathstub.com. **Production repo: `Authentae/mathstub`** (deploys to Vercel → mathstub.com). Stack: Next.js 15 + React 19 + TS + Tailwind 3.4 + Vitest.

> **Note:** Earlier in this project's history Mathstub lived inside `Authentae/reviewhub`, which is why older notes reference that repo. As of mid-May 2026 Mathstub has its own dedicated repo at `Authentae/mathstub`. `Authentae/reviewhub` is now a separate, unrelated project (a local-business review dashboard) and should not be touched by Mathstub work.

## Working with the user (Earth)

- Move fast, autonomous execution. "ship", "go", "keep going", "more", "continue" all mean: keep developing without pausing.
- Push back when wrong; don't yes-agree.
- End-of-turn: short status + what's next. No long summaries.
- Non-technical user. Don't surface decisions unless: irreversible, >$10, >10 min of his time, or genuinely needs his judgment.
- One asset at a time. Don't fan out.

## Conventions (strict)

- **Pure tax math lives in `lib/tax/`** — NO React/Next/DOM imports. Must stay portable for future Chrome ext + Anthropic skill reuse.
- **Tools registered in `lib/tools.ts`** — drives nav, sitemap, homepage. Adding a tool requires:
  1. Entry in `lib/tools.ts` (`status: 'live' | 'planned'`).
  2. `app/<slug>/page.tsx` + `app/<slug>/<Name>Calculator.tsx` (client component).
  3. `content/<slug>.ts` (copy, FAQs, howToSteps for SEO schema).
  4. `lib/<topic>/` pure calc module + types in `lib/tax/types.ts` if shared.
  5. `tests/tax/<topic>.test.ts` Vitest unit tests.
- Path aliases: `@/*` → repo root, `@tax/*` → `lib/tax/*`.
- Page must include `JsonLd` (webApp + howTo + faq schemas), `Disclaimer`, `LastUpdatedBadge`, FTC affiliate disclosure when affiliate cards render.
- "Pending CPA review" stays in `reviewerName` until traffic justifies real CPA spend.
- `ToolShell` is the standard layout wrapper.
- Validation in calc modules throws `TaxCalcError` on bad input — UI catches and shows friendly error.

## Repo / push flow

- Production repo: **`Authentae/mathstub`** — `main` branch deploys to mathstub.com via Vercel.
- The Claude sandbox can't push directly to `Authentae/mathstub`. Two options to get code into production:
  1. **Earth pastes files from chat into his Codespace on `Authentae/mathstub`** → commits + pushes to `main`. Fastest path for small changes.
  2. (Legacy, not preferred) Claude pushes to a branch on `Authentae/reviewhub`; Earth fetches that branch into Codespace and `git push origin FETCH_HEAD:main` to the `Authentae/mathstub` remote. Avoid this unless option 1 is impractical.
- Don't push to `Authentae/reviewhub` for Mathstub work — that repo is now an unrelated project.

## Blocked on user (don't attempt)

(Most resolved 2026-05-10. Remaining:)
- Stripe Connect ID upload (Gumroad payouts held until done; site can still take sales).
- Verify FlexOffers email when verification arrives.
- Optional: submit 3 Notion templates to Notion Marketplace (free, separate review).

## Shipped 2026-05-11

- **PH launch scheduled** — Wed May 13, 12:01am PT. Form 100% complete. Real calculator screenshots replace auto-imported OG cards in gallery (1 brand card + 5 calc shots).
- **Bonus Tax Withholding Shortfall calculator** — 6th calculator at `/bonus-tax-shortfall`. Reuses RSU shortfall engine (calc is pure, just relabeled UI + bonus-specific FAQ targeting "bonus tax 22% withheld" search queries). Different audience entry point than RSU (any cash bonus recipient, not just equity).
- **NSO Exercise Tax calculator** — 7th calculator at `/nso-exercise`. Computes bargain element (FMV − strike) × shares, feeds it to the supplemental-withholding shortfall engine. Targets "NSO tax calculator" / "non-qualified stock options exercise tax" search queries. Audience: startup employees with NSOs (distinct from ISO §422 audience).
- **Comment-reply playbook** — 18 pre-drafted patterns at `marketing/comment-replies.md` for HN/PH/Reddit launch responses.

## Shipped 2026-05-10 — full launch session

- **mathstub.com** bought on Cloudflare Registrar (~$10.46/yr forever), Vercel DNS connected via Cloudflare Domain Connect, SSL live, sitemap serving https://mathstub.com URLs.
- **Gumroad** account live (Authentae / theearth1659@gmail.com), Thai bank + Stripe Connect connected, 3 products PUBLISHED:
  - Equity Comp Tracker $29 (`/products/jqyyp`)
  - Year-End Tax Checklist $19 (`/products/bdlfo`)
  - Tech Worker Annual Review $39 (`/products/jlsppt`)
- **AdSense** site verified, content review requested (1–14 day queue), Google CMP (3-choice GDPR) configured. Pub ID: `pub-6038024276617392`. Static `<script>` in app/layout.tsx renders the AdSense tag in initial HTML for crawler verification.
- **FlexOffers** publisher account submitted (1–3 day review). Email verification pending on user.
- **Chrome Web Store** extension submitted for review (1–7 day Google review). $5 dev fee paid. Trader status declared per EU consumer law. Web Store assets (440×280 promo + 1280×800 popup screenshot) generated via `npm run webstore:assets`.

## Project context

- 5-tier asset plan: utility site → Chrome ext → Notion templates → Anthropic skills → sister site (Pension Lump-Sum, gated on Mathstub > $50/mo at month 6).
- Tool #1 LIVE: RSU Tax Withholding Shortfall Calculator.
- 8 calculators LIVE: RSU shortfall, ESPP qualifying, ISO/AMT, Quarterly estimated, Bonus tax shortfall, NSO exercise, AMT Credit Recovery (Form 8801 scheduler), State stock-comp lookup.
- 446 tests across 17 files (calc layer + content cluster integrity + a11y enforcement). As of 2026-05-19.
- 23 blog posts shipped, marked "Pending CPA review" — all with QuickAnswer + Sources block + 800+ words + IRC citations. Cluster organized into 7 topic categories (RSU basics, paystub & W-2, stock options, ESPP, bonus, filing strategy, multi-state/IPO). See content/blog/categories.ts.
- Internal-link cluster: every blog post has a relations entry (content/blog/related.ts) referencing 3 sibling posts + 1–4 calculators. Test suite enforces no broken cross-references.
- Tools page integrity tests: every lib/tax/* module covered (federal-brackets, amt-brackets, ltcg-brackets, fica, state-rates, rsu-shortfall, espp, iso-amt, amt-credit-recovery, safe-harbor, state-stock-comp).
- YMYL trust scaffolding done (about, editorial-policy, disclaimer, privacy, terms, JSON-LD).

## Strategy: "5 assets, 4 channels, 1 audience"

One audience (US tech workers with equity comp + high earners), four discovery channels (Google, Chrome Web Store, Notion Marketplace, Gumroad), five cross-promoting assets that share brand authority. **Heavily weight non-Google channels** — AI Overviews steal 30–60% of Google clicks; Chrome Web Store, Notion Marketplace, App Stores, Gumroad have gotten EASIER for indie devs because users discover via in-store search.

Skip list (do not propose): 1000 thin sites (AdSense bans pattern), faceless YouTube/TikTok, newsletter, crypto. They came up in strategy and were ruled out.

Y2 realistic total: $500–4,400/mo. Y3 ceiling: $1,500–10,000/mo. User time: ~30–60h Y1, ~5–15h/yr Y2+. Cash investment Y1: ~$25.

## Build pipeline (in order, with time estimates)

**Tier 1 — Mathstub.com tool cluster (months 0–2)**
1. RSU Tax Shortfall — **LIVE**.
2. ESPP Qualifying Disposition (6h) — **LIVE**.
3. ISO/AMT (8h) — **NEXT**. Highest-payout users.
4. Quarterly Estimated Tax Safe-Harbor (5h) — same audience + 1099 freelancers.
5. State Stock-Comp Tax Lookup (4h) — long-tail SEO goldmine.

Net Tier 1 Y2 revenue: $50–800/mo. Single AdSense + affiliate approval covers all five.

**Tier 2 — Chrome ext "Equity Comp Vest Tracker" — CODE COMPLETE.** MV3 extension at `chrome-extension/`, daily 9am alarm + chrome.notifications, popup + options pages, JSON import/export, deep links into the Mathstub calculators. Manual entry only in v0.1 (no host_permissions / no scraping). `npm run ext:zip` builds the Web Store upload. Submission checklist in `chrome-extension/SUBMISSION.md`. Privacy policy hosted at `/extension-privacy`. **Blocked on user:** $5 Web Store dev fee + manual upload.

**Tier 3 — 3 Notion templates on Gumroad — CONTENT COMPLETE.** Templates at `notion-templates/`:
- Equity Comp Tracker — `notion-templates/equity-comp-tracker/template.md` ($29).
- Year-End Tax Checklist + Calculator Workbook — `notion-templates/year-end-tax-checklist/template.md` ($19).
- Tech Worker Annual Financial Review — `notion-templates/tech-worker-annual-review/template.md` ($39).
Each ships with a Gumroad listing copy (`listing.md`) + 1280×720 cover (`cover.png`). `npm run notion:images` regenerates covers from inline SVGs. **Blocked on user:** Gumroad account creation, payment setup, manual upload + publish per `notion-templates/README.md`. Distribution: Gumroad SEO + Notion Marketplace + Mathstub footer. Y2 $200–1,200/mo for 3.

**Tier 4 — Anthropic Skills marketplace bet (month 4, ~5h/skill).** Speculative first-mover. Build 1–2 niche skills wrapping the same calc logic (e.g., "Equity comp tax calculator skill"). Distribute as free MCP for now. If Anthropic ships paid marketplace, already ranked.

**Tier 5 — Sister utility site (month 6+, GATED).** Build Pension Lump-Sum vs Annuity Calculator on separate domain ONLY if Mathstub > $50/mo at month 6. Different audience (retiring boomers, $100–300/lead financial-advisor affiliates). Y2 ceiling $200–1,500/mo. If Mathstub NOT earning by month 6, pivot Mathstub niche instead.

## Lessons learned

1. **Math is sacred — cross-check before shipping.** Tests passing ≠ proof. For every new calc, run one real scenario by hand and verify against an IRS Pub example or a CPA blog example, BEFORE claiming "done." Coverage must include zero, negative, very large, year-boundary, rounding, and currency edge cases.
2. **YMYL discipline — never invent credentials, always cite IRS by Pub# + year.** "Pending CPA review" stays as-is until user says a real CPA is reviewing. Tax claims in FAQs/copy must cite an IRS `.gov` source by publication number and year. No random tax-blog "authority" links. `LastUpdated` only bumps when content actually changed.
3. **Mobile-first or it doesn't ship.** Users are on phones in panicked moments. Every calculator must work one-thumb on iPhone. Test mobile viewport before claiming done.
4. **Year-aware everything (current + prior 2 years minimum).** Every calc accepts a tax-year param and has data tables for current + prior 2 years. Never hardcode current-year values without a swap path.
5. **Don't fabricate metrics or recall from memory.** Numerical claims need a query/grep/git command shown. If unverifiable, label "unverified — my hunch."
6. **Verify before retracting.** A correction is itself a claim — get TWO independent verifications before publishing "actually X was wrong, the truth is Y."
7. **Don't conflate UI labels with status badges.** Screenshot ≠ state. Confirm state via DB/API/code before reporting.
8. **Domain not bought yet — no hardcoded mathstub.com.** Canonicals/sitemap/og:url must use the env-driven URL (currently vercel.app fallback). Don't hardcode the production domain until user confirms DNS is live.
9. **Pre-revenue priority filter.** Things that move us toward first $1 of revenue beat polish. New tool > redesigning existing tool. Real CPA review > better fonts. AdSense application > logo iteration. Push back on low-leverage polish at the wrong stage.
