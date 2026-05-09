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

## Build pipeline (in order)

1. RSU Tax Shortfall — **LIVE**.
2. ESPP Qualifying Disposition — **in progress**.
3. ISO/AMT.
4. Estimated Tax Safe-Harbor.
5. State Stock-Comp Lookup.
6. Chrome ext "Equity Comp Vest Tracker".
7. 3 Notion templates on Gumroad.

## Lessons learned

(Append here when user corrects approach. Keep short — rule + one-line why.)
