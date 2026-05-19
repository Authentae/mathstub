# Overnight loop status

Running cron `f85094f0` since ~03:48 local (Thailand UTC+7). Each
15-minute cycle ships ONE high-leverage improvement or skips silently.
Hard cap: 30 commits.

## Tonight's shipping log

Through cycle 17 (this commit):

### Blog content (11 new posts, #13–23)
- #13: Stock options vs RSUs tax treatment
- #14: How to report RSUs on tax return (Form 8949)
- #15: RSU tax category Box 14 W-2
- #16: Sell-to-cover vs net share settlement
- #17: Early exercise NSOs + §83(b) election
- #18: Multi-state RSU sourcing (California workday allocation)
- #19: Double-trigger RSUs at IPO
- #20: ESPP qualifying vs disqualifying
- #21: AMT credit recovery Form 8801
- #22: Why is my bonus taxed at 40%?
- #23: ISO disqualifying disposition

### Test coverage (4 new test files, 416 total tests)
- `amt-credit-recovery.test.ts` (28 tests) — last untested calc module
- `state-stock-comp.test.ts` (71 tests) — second untested calc module
- `blog-related.test.ts` (17 tests) — internal-link cluster integrity
- `blog-posts.test.ts` (57 tests) — content invariants (slugs, dates,
  word counts, Sources citations, QuickAnswer band, affiliate offers)

### A11y (2 passes)
- New components: aria-live announcements, role="group", focus-visible
  rings on ShareCalculation / WasThisHelpful / Header dropdowns
- Pre-existing components: EmailCapture got proper `<label>` + status
  aria-live + button focus ring; FaqAccordion got visible rotating
  arrow + summary focus ring

## Known gaps (to surface in morning review)

**Legacy backfills — COMPLETE as of cycle 23.** All six April-2026
posts have been expanded from 266–386 words to 900–1,100 words, with
Sources blocks citing the controlling IRC §, Treas. Reg., IRS Pub,
and (where applicable) state regulatory authorities. Each post now
satisfies the post-2026-05-15 content standard.

Backfilled cycle-by-cycle:
- Cycle 18: `why-rsu-tax-bill-too-high` (386 → ~900 words)
- Cycle 19: `22-vs-37-supplemental-withholding` (288 → ~1000 words)
- Cycle 20: `estimated-tax-after-rsu-vest` (377 → ~1100 words)
- Cycle 21: `extra-w4-withholding-rsu` (266 → ~1100 words)
- Cycle 22: `rsu-taxes-by-state` (300 → ~1100 words)
- Cycle 23: `year-end-equity-comp-checklist` (286 → ~1300 words)

The `blog-posts.test.ts` content-invariant suite now passes the
strict standard for ALL 23 blog posts, not just post-2026-05-15
ones. The dateModified field was bumped on each to 2026-05-19 to
reflect the substantive content update.

## Status numbers (end of cycle 17)

- 23 blog posts live
- 16 test files / 416 tests passing
- tsc clean
- Every calculator has a dedicated companion blog post
- Every blog post has a non-self-referencing relations entry
- Every relations entry resolves to real posts and real calcs

## What's left in the loop

13 cycles remaining (cron auto-expires after 7 days; will likely
hit the 30-commit cap or marginal-value floor first).
