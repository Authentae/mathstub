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

## Live status (updated as work progresses)

- [x] Plan written
- [ ] Calc #9: Mega-Backdoor Roth — in progress
- [ ] Calc #10: Backdoor Roth IRA
- [ ] Homepage trust band
- [ ] Footer ecosystem block
- [ ] Blog post: RSU cost-basis fix
- [ ] Blog post: Mega-Backdoor Roth eligibility
- [ ] Blog post: CA→TX work-source trap
- [ ] Visual polish pass
- [ ] Final commit + verification
