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

**1. Six legacy blog posts (April 2026) are below the new content
standard.** Identified by `blog-posts.test.ts` and gated by the
2026-05-15 cutoff. Slugs:
- `why-rsu-tax-bill-too-high`
- `22-vs-37-supplemental-withholding`
- `estimated-tax-after-rsu-vest`
- `extra-w4-withholding-rsu`
- `rsu-taxes-by-state`
- `year-end-equity-comp-checklist`

Gaps: 266–386 word count (vs 800-word floor for new posts), no
trailing "Sources:" block citing IRC §, Treas. Reg., or IRS Pub.
The post-2026-05-15 standard ships these every post.

**Fix path:** backfill each with a Sources block + expand to 800+
words. Each post is 1 cycle ~10 minutes. Not done overnight because
each touches existing user-facing content and benefits from morning
review.

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
