# Mathstub — agent handoff notes

Passive-income utility-site portfolio. Live at mathstub.vercel.app. Repo: authentae/reviewhub (deployed as Mathstub). Stack: Next.js 15 + React 19 + TS + Tailwind 3.4 + Vitest.

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

- Sandbox can only push to `authentae/reviewhub`.
- Mathstub repo updates go via the user's Codespace:
  ```
  git fetch https://github.com/Authentae/reviewhub.git <branch>
  git push origin FETCH_HEAD:main
  ```
- Open PR #1 in authentae/reviewhub is staging-only (+12131 lines, draft). User can close anytime.

## Blocked on user (don't attempt)

- Buy mathstub.com domain (~$10 Cloudflare Registrar).
- Connect mathstub.com to Vercel via DNS.
- Apply for AdSense.
- Sign up for FlexOffers.

## Project context

- 5-tier asset plan: utility site → Chrome ext → Notion templates → Anthropic skills → sister site (Pension Lump-Sum, gated on Mathstub > $50/mo at month 6).
- Tool #1 LIVE: RSU Tax Withholding Shortfall Calculator.
- 86 tests, 99.76% coverage on `lib/tax/`.
- 6 pillar blog posts shipped, marked "Pending CPA review".
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

**Tier 3 — 3 Notion templates on Gumroad (months 3–4, ~6–10h each).**
- Equity Comp Tracker (RSU + ESPP + ISO + grants) — $29.
- Year-End Tax Checklist + Calculator workbook — $19.
- Tech Worker Annual Financial Review — $39.
Distribution: Gumroad SEO + Notion Marketplace + Mathstub footer. Y2 $200–1,200/mo for 3.

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
