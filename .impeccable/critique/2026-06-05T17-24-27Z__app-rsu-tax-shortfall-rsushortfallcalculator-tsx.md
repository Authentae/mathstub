---
target: calculators (RSU flagship)
total_score: 31
p0_count: 0
p1_count: 2
timestamp: 2026-06-05T17-24-27Z
slug: app-rsu-tax-shortfall-rsushortfallcalculator-tsx
---
# Critique — RSU Tax Shortfall calculator (representative of all 17)

Target: app/rsu-tax-shortfall/RsuShortfallCalculator.tsx. Detector CLEAN. Score 31/40 (Good, low end).
Browser visualization unavailable (tooling down); source + detector.

## Heuristics
1 Status 4 (live results + mobile sticky total) · 2 Real-world 3 (jargon) · 3 Control 3 (no reset) ·
4 Consistency 2 (slate vs gray neutral drift) · 5 Prevention 3 (min=0, no max) · 6 Recognition 3 ·
7 Flexibility 4 (URL share, advanced toggle) · 8 Aesthetic 2 (result CTA pile-up) ·
9 Recovery 3 (generic fallback msg) · 10 Help 4 (Show-the-math w/ citations) = 31/40

## Strengths
- Live client-side results; mobile sticky shows the number updating. Best-in-class status.
- "Show the math" collapsible with IRC citations.
- URL-encoded shareable state.

## Priority issues
- [P1] Result-panel CTA overload: ~9 stacked blocks / 7+ competing actions after the number
  (W-4 btn, quarterly btn, ShareCalculation, W4Step4cLink, GumroadUpsell, ShowTheMath, 2 affiliate
  cards, EmailCapture, trust band). Establish ONE primary; group/demote the rest.
- [P1] Contrast: text-slate-500 small labels on slate-800/900 ~2.6-3.3:1, below AA 4.5. Family-wide
  (mini-stat captions, sub-lines). Bump to slate-400.
- [P2] Design-system drift: page mixes `slate` (canvas) and `gray` neutrals. inputCls is gray ->
  all 17 calcs have off-hue inputs. Unify on slate.
- [P2] Dead code: Waterfall (~85 lines) defined, never rendered. Remove.
- [P2] No reset-to-defaults control (user control/freedom).
- [P3] Error recovery: fallback "Invalid input" is generic; name the offending field.

## Family-wide leverage
inputCls, ShowTheMath, and the result-panel shape are shared templates -> fixing here lifts all 17.

## Path to 38-40
Fix CTA overload (8 -> 4), contrast (slate-400), slate unification, remove dead code, add reset,
better error copy. All legitimately raise heuristics (unlike the homepage's static-page ceiling).
