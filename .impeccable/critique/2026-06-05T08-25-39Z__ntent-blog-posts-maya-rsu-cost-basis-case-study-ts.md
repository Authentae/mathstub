---
target: the maya blog
total_score: 27
p0_count: 0
p1_count: 2
timestamp: 2026-06-05T08-25-39Z
slug: ntent-blog-posts-maya-rsu-cost-basis-case-study-ts
---
# Critique — Maya RSU cost-basis case study (/blog/maya-rsu-cost-basis-case-study)

Lens: brand register, calm-expert, "a child could read it without yuck, but accurate + packed."
Browser visualization unavailable (preview/screenshot tooling timing out this session). Assessment from source + deterministic detector.

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | Collapsibles + embed give feedback; static article so mostly n/a |
| 2 | Match System / Real World | 2 | Heavy undefined jargon in the *visible* layer (cost basis, 1099-B, FMV, LTCG, column (e/f/g)) |
| 3 | User Control and Freedom | 3 | Deep-dives expandable, calc resettable, companion links |
| 4 | Consistency and Standards | 2 | The 2025 save is stated as BOTH $2,574 (headline/top flow) and $1,215 (math/bottom flow) |
| 5 | Error Prevention | 3 | Page's whole job is error prevention; calc validates input |
| 6 | Recognition Rather Than Recall | 2 | Reader must juggle 5+ dollar figures ($2,574/$1,215/$3,844/$5,204/$2,629) |
| 7 | Flexibility and Efficiency | 3 | KeyPoints skim layer + details deep-dive serves novice and expert |
| 8 | Aesthetic and Minimalist | 3 | Strong varied blocks; number-sprawl adds mild clutter |
| 9 | Error Recovery | 3 | Calc error states now dark-aware (fixed PR #98) |
| 10 | Help and Documentation | 3 | Inline IRC citations, companion post, CPA guidance, live embed |
| **Total** | | **27/40** | **Acceptable (edge of Good)** |

## Anti-Patterns Verdict
- **Detector (deterministic):** CLEAN — `[]` on the renderer + BlogHero/KeyPoints/QuickAnswer. The de-slop pass removed every flagged tell.
- **LLM view:** Does NOT read as AI slop. Varied block types, a genuine analogy, real worked math. The opposite risk applies: it is slightly *over*-dense with numbers.

## What's Working
1. Visual scaffolding genuinely beats the wall: top money-flow, Form 8949 table, 3-outcome table, collapsible deep-dives, live embed, KeyPoints skim box.
2. Coat-check analogy is the standout — the one device that passes the "a child gets it" test. Need more of these.
3. Progressive disclosure (`<details>`) is the correct resolution of the SEO-depth vs readability tension: full text stays in HTML, surface stays light.

## Priority Issues
- **[P1] Contradictory headline number.** Title + top flow + intro say Maya "saved $2,574"; the post's own math says the realized save is $1,215 and labels $2,574 as a worst-case hypothetical (if software mis-taxed at 32% ordinary). The two-year-total flow then uses $1,215. A careful reader sees two different "2025 saves." On a YMYL/trust page this is the worst failure. Fix: pick one honest framing — lead with the real $1,215 save and present $2,574 explicitly as "worst case if you also got the rate wrong," consistently in title, flow, intro, keyPoints.
- **[P1] Jargon barrier in the visible layer.** cost basis, 1099-B, FMV, vest, LTCG, marginal bracket, supplemental withholding, column (e/f/g), Box 1d/1e — mostly undefined on first use outside the collapsed sections. Fails the first-timer/child test. Fix: one plain-English sentence per term on first visible use, or a tiny "in plain words" gloss; keep the precise terms for SEO.
- **[P2] Mobile horizontal scroll on wide blocks.** The 5-step top flow (~650px) and the 4-column outcome table (long headers) scroll sideways on a 375px phone. Not broken, but a distracted mobile reader may see only 3 of 5 flow steps and miss "tax saved." Fix: stack flow vertically under ~480px; let the outcome table collapse to stacked rows on mobile.
- **[P2] "Who Maya is" bullet crams 5 facts into one line** (vest date + FMV + W-2 box + two withholding rates) — a mini-wall inside a bullet. Fix: split into its own small flow or 2-3 short bullets.
- **[P3] Off-by-one math.** $5,204 − $2,629 = $2,575, post says $2,574. "Math is sacred" — reconcile.

## Persona Red Flags
- **Jordan (first-timer):** First visible sentence assumes "cost basis / equity comp / RSU." No 5-second "what is this about" hook in plain words. Bounces before the analogy that would have saved them.
- **Casey (mobile):** Wide flow + table scroll sideways; thumb-scroller misses the payoff step. Numbers-to-track exceed working memory on a small screen.
- **Riley (stress-tester):** Spots the $2,574-vs-$1,215 contradiction immediately and distrusts the whole page.

## Questions to Consider
- Which is the ONE number a reader should walk away with — the realistic $1,215 or the attention-grabbing $2,574? Commit to one as the hero.
- Could each tax term carry a 4-word plain gloss the first time it appears, without bloating the SEO body?
- Should wide tables/flows reflow to vertical on mobile rather than scroll?
