# 🗺️ Multi-State Equity Comp Tax Planner

> For tech workers who moved states mid-vest, work remote across state lines, or are deciding whether a CA→TX (or NY→FL) move actually pencils out after the work-source-allocation rules. Built around the same IRC + state-DOR-cited math the [Mathstub](https://mathstub.com) calculator suite runs. Updated every tax year.

---

## ⚡ 30-Second TL;DR

> 🎯 **If you remember 3 rules from this planner, remember these:**
> 1. **Old state still gets a piece.** Work-source allocation taxes vests based on where you *worked during the vesting period*, NOT where you live now. (§A)
> 2. **NY's "convenience of employer" can claim 100%** of your income even after you've left, if the employer is NY-based and the move was "for your convenience." (§B)
> 3. **Document the move RUTHLESSLY.** Driver's license, voter registration, lease, utility bills, doctors, kids' schools — all need to point at the new state. Defeats dual-domicile claims. (§1)
>
> Everything else in this planner is the math + filing forms. The 3 rules above are 80% of the strategy.

---

> ▶️ **Watch the 25-minute walkthrough first**: `[paste your Loom share URL here]`
> *The Loom should walk through Daniel's worked example (§0) end-to-end. This is the highest-leverage perceived-value lift for the $79 tier.*

---

> 💎 **What's inside**
> - **Daniel's worked example** — caught $34k of missed work-source-allocation tax on a CA→TX move
> - **§A — Work-source allocation calculator** — pro-rate every RSU vest, ISO exercise, and ESPP cycle across the states you worked in
> - **§B — NY "convenience of employer" rule decoder** — the rule that silently nukes anyone who left NYC for FL/TX without changing employers
> - **§C — 4-year residency + vest matrix** — see which state taxes which dollar of every future vest
> - **§D — Move ROI calculator** — projected $ savings net of work-source allocation, double-tax credit, and one-time relocation costs
> - **§E — State AMT decoder** — only CA, IA, MN, CT have state AMT; here's exactly when it triggers
> - **§F — State-by-state filing matrix** — what to file in each state if you have a foot in two (or three)
> - **§G — "Talk to your CPA" multi-state brief** — the document that turns a confused 90-min CPA call into a focused 30-min one
> - 50-state supplemental-withholding + top-marginal + LTCG-treatment table
> - **Free updates through tax year 2028** — re-pull any time state DORs publish new rates
> - **30-day no-questions money-back guarantee**

---

## ⚡ 5-minute setup

1. Duplicate this page into your Notion.
2. Fill in §1 Residency timeline with every state you've lived in / worked in for the past 24 months.
3. Pull your offer-letter grant dates + cliff schedule into §3 Grant + vest projection.
4. Walk §A → §G in order. Each ends with a decision or action item.

> ⚠️ **This is not a substitute for a CPA in a multi-state filing.** The math here gets you 80% of the way to a *correct* return. The last 20% requires reading your specific state's DOR guidance on stock-comp allocation, and we cite the source in every §.

---

## 🎯 §0 — Worked example — Daniel's $34k save

> 👨‍💻 **Daniel, 33, staff SWE at a public big-tech. Lived in San Francisco 2022–2024 (CA resident). Moved to Austin (TX) on Aug 1, 2024 keeping the same employer + same role. 1,600 RSUs vesting quarterly through 2027 from a 2022 grant. Exercised + held 2,000 ISOs in Mar 2024 (CA). MFJ, no kids.**
>
> What he initially thought after the move:
> - "I'm a Texas resident now → no state tax on anything that vests Aug 2024 onward."
> - "I'll save 13.3% × $90k/yr RSU = $12k/yr forever."
>
> What this template surfaced:
>
> | Item | His belief | The actual rule | $ impact |
> |---|---|---|---|
> | Aug 2024 RSU vest | TX (0%) | CA work-source allocation: 24 of 36 vesting months were CA-sourced → **66.6% taxed by CA at 13.3%** | $8,000 owed to CA |
> | Q4 2024 RSU vest | TX (0%) | Same rule: 24 of 39 months CA-sourced → **61.5% CA** | $7,400 owed to CA |
> | 2025 RSU vests (4) | TX (0%) | Still 24/48 → **50% CA** through 2025 | $24,000 owed to CA across 2025 |
> | 2026 RSU vests (4) | TX (0%) | 24/60 → **40% CA** | $19,000 owed to CA across 2026 |
> | Mar 2024 ISO exercise + hold | CA AMT was paid | CA AMT credit on next CA return when reg > TMT | $4,200 recoverable over 3 years |
> | Underpayment penalty (no CA estimates) | n/a | CA §19136 → ~5% APR | $1,400 |
>
> **Net impact:** Daniel was $34k under-withheld for CA across 2024–2026. By catching it in October 2024 (one month after the move), he could file a CA W-4-equivalent withholding election + plan quarterly estimates and avoid $1,400 in penalties on top of the back-taxes he was always going to owe.

> 💡 **The lesson.** Moving from a high-tax to a no-tax state does NOT free your equity from the old state's claim. The vesting period that pre-dated the move stays "sourced" to the old state under most DOR allocation rules.

---

## 🏠 §1 — Residency timeline

| From → To | State | Days in state | Tax home? | Domicile? | Address on file with employer? | Source-of-employment? |
|---|---|---|---|---|---|---|
| 2022-01-15 → 2024-07-31 | CA | ~900 | yes | yes | yes | CA |
| 2024-08-01 → present | TX | — | yes | yes | yes | TX |

**Definitions that matter for multi-state**
- **Tax home** = where you physically work most of the year. Drives "source" of W-2 + RSU income.
- **Domicile** = your "permanent home" — affects residency-vs-non-resident filing status. Harder to change than tax home (mail forwarding, voter registration, driver's license, doctor's visits, kids' schools — all factor in).
- **Source-of-employment** = where the work was *performed*. For remote workers, this is your physical desk, NOT the employer's HQ — except in the 7 "convenience of employer" states (NY, DE, NJ, NE, PA, AR, CT).

> ⚠️ **The dual-domicile trap.** If you move mid-year and both states claim you as a resident, you can be taxed on 100% by both. Resolution: pick one and document the move (lease, utility, license, voter reg) to defeat the other state's claim.

---

## 🔄 §A — Work-source allocation calculator

This is the single most-missed equity-comp tax rule. When stock vests, **most states allocate the income across the states where you worked during the vesting period.**

```
For each vest:
  vesting_months = months from grant date to vest date
  for each state where you worked during vesting_months:
     state_alloc_pct = months_worked_in_that_state / vesting_months
     state_tax_owed = vest_FMV × state_alloc_pct × state_marginal_rate
```

**Worked example — Daniel's Aug 1, 2024 vest**
- Grant: Aug 15, 2022 (CA). Vest: Aug 1, 2024.
- Total vesting period: 24 months.
- Months in CA: Aug 2022 – Jul 2024 = **24 months**.
- Months in TX: 0 (he moved Aug 1, vesting happens at start-of-day Aug 1).
- CA allocation: 24/24 = **100%**.
- TX allocation: 0%.
- Vest gross: $20,000.
- CA tax owed: $20,000 × 100% × 13.3% (top marginal) = **$2,660**.
- TX tax owed: $0.

**Worked example — Daniel's Nov 1, 2024 vest**
- Same grant. Vest: Nov 1, 2024.
- Total vesting period: 27 months.
- Months in CA: Aug 2022 – Jul 2024 = 24.
- Months in TX: Aug 2024 – Oct 2024 = 3.
- CA allocation: 24/27 = **88.9%**.
- Vest gross: $20,000.
- CA tax owed: $20,000 × 88.9% × 13.3% = **$2,365**.
- TX tax owed: $0.

> 🔗 Use [Mathstub 50-state lookup](https://mathstub.com/state-stock-comp) for each state's top-marginal rate, supplemental rate, and AMT/LTCG treatment.

**Allocation table — fill in for every vest**

| Vest date | Grant date | Total months | State 1 mo | State 1 % | State 1 rate | Tax 1 | State 2 mo | State 2 % | State 2 rate | Tax 2 |
|---|---|---|---|---|---|---|---|---|---|---|
| — | — | — | — | —% | —% | $— | — | —% | —% | $— |

> 💡 **Quirks to watch:** Pennsylvania doesn't allocate vested RSU — they tax it 100% if you're a PA resident at vest. Massachusetts uses "grant date" residency for some equity. New Jersey aggressively claims its share. **Always read your state DOR's stock-comp guidance** — the link to it is in the matrix below.

---

## 🗽 §B — NY "convenience of employer" rule decoder

This rule destroys more remote-work tax planning than any other state-level provision.

> ⚠️ **The rule.** If your employer's office is in NY State, and you work remotely **for your own convenience** (not your employer's necessity), NY taxes 100% of your W-2 + equity comp as NY-sourced regardless of where you actually sit.

**The 7 "convenience of employer" states**

| State | Rule | Threshold |
|---|---|---|
| NY | strict — for employer's necessity must be documented | NY claims it unless you prove otherwise |
| DE | same as NY | same |
| NJ | repealed for 2024+ (but pre-2024 cycles still subject) | n/a after Jan 1, 2024 |
| NE | "necessity" required | same |
| PA | "convenience" only when employer requires NY office | rare gaps |
| AR | "convenience" only | similar |
| CT | "necessity" must be employer-driven | similar |

**How to defeat NY convenience-of-employer**
1. **Document employer necessity.** A written email from HR: "Daniel's role requires Austin presence because [reason]" — the bar is high but doable.
2. **Move the formal work location.** Get the employer to assign you to a non-NY office on payroll. This is the cleanest path.
3. **Quit and rehire as a contractor.** Now you're a 1099 not subject to convenience-of-employer.
4. **Accept the hit.** Some people accept NY's claim and just pay; the alternative legal fight is expensive.

> 🔗 **Read [NY TSB-M-06(5)I](https://www.tax.ny.gov/pdf/memos/income/m06_5i.pdf)** — the actual NY DOR memo. Bring this to your CPA.

---

## 📅 §C — 4-year residency + vest matrix

Project every vest for the next 4 years against your projected state-of-residency. This is the single best decision tool in this template.

| Year | Vest count | Vest gross | State A (mo / %) | State A tax | State B (mo / %) | State B tax | Total state tax |
|---|---|---|---|---|---|---|---|
| **Year 1** | 4 | $— | — / — | $— | — / — | $— | $— |
| **Year 2** | 4 | $— | — / — | $— | — / — | $— | $— |
| **Year 3** | 4 | $— | — / — | $— | — / — | $— | $— |
| **Year 4** | 4 | $— | — / — | $— | — / — | $— | $— |
| **Total** | 16 | $— | | $— | | $— | $— |

> 💡 **Decision triggers.** If a move would bend the curve more than 8% on total state tax → the move is plausibly worth doing (relocation costs typically eat the first 3–5% savings).

---

## 💰 §D — Move ROI calculator

Should you actually move? Run the math.

```
Annual state-tax savings (4-year average from §C)        $—
× years you plan to stay in new state                    × ___
= Gross state-tax savings                                $—

ONE-TIME COSTS
Movers + travel                                         −$—
Selling primary residence (transaction costs)           −$—
Cost-of-living delta annualized × years                 −$—
Home purchase in new state (transaction costs)          −$—
Withholding+estimates retraining (your time)            −$—

INTANGIBLE COSTS
Social network reset                                    [your value]
Career-network thinning                                 [your value]
Family / friends                                        [your value]

NET FINANCIAL ROI                                        $—
```

**Heuristic** — for a typical 4-year vest cliff, the breakeven move-cost is ~$40–60k. If the projected savings is under $50k, the move is rarely worth doing on tax alone. If it's > $100k, it's hard to ignore.

---

## 🏛️ §E — State AMT decoder

Most states don't have a personal AMT. The ones that do:

| State | Has state AMT? | Triggers on ISO exercise (held)? | Credit recoverable? |
|---|---|---|---|
| CA | yes | yes — at 7% | yes, on future CA returns when reg > TMT |
| IA | yes (low rate) | yes — at 6.7% | limited |
| MN | yes | yes — at 6.75% | yes |
| CT | yes (Form CT-6251) | yes — at 6.99% | yes |
| All others | no | n/a | n/a |

> 🔗 If you exercised ISOs in any of the 4 above and held → run [Mathstub ISO/AMT](https://mathstub.com/iso-amt) and confirm state-AMT impact with that state's Form 6251 equivalent.

---

## 🗂️ §F — State-by-state filing matrix

If you split a year between states (or worked across them), you'll file in each. Here's what each state expects.

| Situation | Form to file | Filing status implication |
|---|---|---|
| Full-year resident of CA | Form 540 | All income subject to CA, regardless of source |
| Part-year resident of CA | Form 540NR (long) | Only CA-sourced income + portion of all-income for CA-resident months |
| Non-resident of CA but CA-sourced wages or vest | Form 540NR (long) | CA-sourced only |
| Full-year NY resident | IT-201 | All income subject to NY |
| Part-year NY resident | IT-203 | NY-sourced + resident-portion |
| Non-resident NY (convenience trap) | IT-203 | 100% if convenience rule triggers |
| Multiple non-resident states | One return per state, all with different apportionment | Coordinate; double-tax credit on resident state |
| TX / FL / NV / WA / SD / TN / WY / AK | No state income tax filing required | But still need to file the *other* state if you worked there |

**Double-tax credit** — most states give you a credit for taxes paid to *other* states on the same income. The catch: it's only available for income the OTHER state has *primary* claim on. Multi-state filing is the right time to hire a CPA who has done this before.

---

## 🧾 §G — "Talk to your CPA" multi-state brief

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
MULTI-STATE TAX BRIEF · [Your Name] · Prepared [Date]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

THE ASK
"Confirm work-source allocation on my RSU vests across [State A]
and [State B], file the right resident/non-resident forms, and
claim the double-tax credit on my resident state's return."

RESIDENCY TIMELINE (from §1)
[Date range] · [State] · [resident or non-resident]
[Date range] · [State] · [resident or non-resident]

EMPLOYMENT TIMELINE
- Employer: [Co.]
- Tax-home state during each period: [details]
- Employer's office of record (payroll): [State + city]
- Convenience-of-employer rule applies? [Y / N — see §B]

EQUITY EVENTS THIS YEAR
RSU vests              [count]  total gross $—
   Work-source split:  [State A — X%] · [State B — Y%]
   (see §A worked allocation in attached Notion export)
ISO exercises + held   [count]  bargain $—
   State AMT triggered (CA/IA/MN/CT)? [Y / N — see §E]
ESPP / NSO             [details]

QUESTIONS IN PRIORITY ORDER
1. Work-source allocation on $— of vests — confirm split.
2. Double-tax credit on resident state's return.
3. Withholding gap on [State X] — estimate or W-4 fix?
4. Convenience-of-employer rule — does it apply to my situation?
5. State AMT credit balance carryforward (if applicable).
6. Form 8949 RSU basis adjustment (covered by Equity Comp Decision Tracker §B).
7. [Your specific question]

ATTACHMENTS
- §1 Residency timeline
- §A Allocation worked spreadsheet (Excel export)
- §C 4-year vest matrix
- W-2(s) — primary + any with multiple state withholdings
- Forms 3921 / 3922 if applicable

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

## 📚 §H — State DOR primary sources (read these, not random blogs)

- [CA FTB — Pub 1005, Pension and Annuity Guidelines](https://www.ftb.ca.gov/forms/2024/2024-1005-publication.pdf) — covers stock-comp allocation
- [CA FTB — Pub 1004, Stock Options Guidelines](https://www.ftb.ca.gov/forms/2023/2023-1004.pdf)
- [NY TSB-M-06(5)I](https://www.tax.ny.gov/pdf/memos/income/m06_5i.pdf) — the convenience-of-employer memo
- [NY TSB-M-95(3)I](https://www.tax.ny.gov/pdf/memos/income/m95_3i.pdf) — stock-comp allocation for non-residents
- [NJ Tech Bulletin TB-39](https://www.state.nj.us/treasury/taxation/pdf/pubs/tb/tb39.pdf) — NJ position on remote-work post-2024
- [MA TIR 02-21](https://www.mass.gov/technical-information-release/tir-02-21-treatment-of-deferred-income-of-non-residents) — MA stock-comp allocation
- [PA REV-714](https://www.revenue.pa.gov/FormsandPublications/FormsforIndividuals/PIT/Documents/2023/2023_pa-40.pdf) — PA personal income tax
- [Mathstub 50-state stock-comp lookup](https://mathstub.com/state-stock-comp)
- [Mathstub state RSU calculator](https://mathstub.com/rsu-tax-shortfall) — change state in dropdown

---

## 📖 §I — Scenario cookbook (8 recipes)

The 8 most-common multi-state situations.

### 🧂 Recipe 1 — CA → TX move with unvested RSUs

The Daniel scenario from §0. Most common tech-worker move.

```
1. Set your TX move date in §1 Residency timeline.
2. For every future RSU vest: compute work-source allocation (CA months / total months).
3. CA's share at 13.3% top marginal will hit even after you've moved.
4. Plan CA estimated payments for the CA share (CA Form 540-ES).
5. After 4-yr vest cliff fully completes → 0% CA tax going forward (assuming no return).
6. File CA Form 540NR + TX no-income-tax return for each year there's CA-sourced.
```

### 🧂 Recipe 2 — NY (or DE/NE/CT) → FL move while keeping the same employer

The convenience-of-employer trap.

```
1. NY claims 100% of W-2 + equity comp if you work remote for own convenience.
2. To defeat: get employer to document "necessity" (HR memo, written job description)
   OR move the formal work-location to a non-NY office on payroll.
3. If can't defeat → factor 10.9% NY state + 3.876% NYC into your moved-state planning.
4. Easier path: switch to 1099 contractor (no W-2 convenience rule applies) — but
   gains SE tax 15.3% and loses W-2 benefits.
5. Most expensive path: accept and pay. Many do.
```

### 🧂 Recipe 3 — You're choosing between competing CA and TX offers

The tax math is one factor. Quantify it.

```
1. Build the 4-year vest schedule for each offer in §C.
2. CA path: 13.3% on entire vest schedule.
3. TX path: 0% on vests AFTER you move, BUT work-source allocation taxes pre-move years.
4. Net out into total tax over 4 years.
5. Add COL delta (Bay Area vs Austin: ~30-40% lower COL in Austin).
6. Subtract one-time move costs ($30-50k typical including double-rent).
```

### 🧂 Recipe 4 — Spouse and you live in different states (rare but happens)

The post-COVID two-cities couple.

```
1. Determine each spouse's tax home + domicile separately.
2. Filing status: MFJ federally is fine; states differ on whether to file MFJ or MFS.
3. CA, NY, NJ: tend to want MFS for state returns when domiciles differ. Each files
   own state return with own W-2.
4. NIIT 3.8% threshold remains $250k MFJ even though state filings split.
5. Document everything: where each spouse sleeps, where mail goes, kids' schools.
```

### 🧂 Recipe 5 — Mid-year remote-work apartment in another state

You worked from your parents' place in another state for 2 months in summer.

```
1. Count days physically present in the secondary state.
2. Most states' "income earned while physically present" threshold: 30+ days OR
   exceeding a $ threshold ($600/$1k/$5k varies).
3. If exceeded → file non-resident return in secondary state with apportioned income.
4. Resident state gives double-tax credit for taxes paid to secondary.
5. Track travel days in your calendar all year.
```

### 🧂 Recipe 6 — Statutory residency days (the surprise dual-residency)

Some states make you a "statutory resident" if you spend > 183 days even without domicile.

```
1. Tag every day in §1 with the state you slept in.
2. NY: > 183 days + maintaining "permanent place of abode" in NY = statutory resident
   → taxed on 100% of worldwide income.
3. CA: looks at "closest connections" rather than day-count for non-domicile cases.
4. MA, NJ, IL: similar day-count rules.
5. If you split half-year in NY but kept your apartment → you may have created a
   statutory residency without intending to.
```

### 🧂 Recipe 7 — ISO exercise while in CA (state AMT applies)

CA has its own AMT (1 of 4 states).

```
1. Confirm ISO exercise date + bargain element from §5 Equity Comp Decision Tracker.
2. Federal Form 6251 → bargain element to federal AMTI.
3. CA Form FTB 3510 → CA AMT computation. Triggers at lower exemption than federal.
4. CA AMT credit recoverable on future CA returns same way as federal Form 8801.
5. If you move to TX after exercise → still owe CA AMT for the exercise year.
6. The CA AMT credit cannot recover after you're no longer a CA filer — use it or lose it.
```

### 🧂 Recipe 8 — Pre-IPO secondary sale during a state move

You sold during the IPO secondary in May, moved states in August.

```
1. Sale date determines tax residency at time of sale.
2. If May sale + CA-resident: CA taxes 100% of cap gain at 13.3%.
3. If you'd waited until you moved to TX in August: CA could STILL claim via
   "source rule" if the underlying stock was earned in CA. Check FTB Pub 1004.
4. Form 540NR with apportionment if you became TX-resident after the sale.
5. This is a "hire a CPA" situation if > $250k of gains involved.
```

---

## ❓ §J — Frequently asked questions

**1. I moved in October. Am I a part-year resident or non-resident?**
Part-year. You file resident return for the months in the new state and either part-year OR non-resident return for the months in the old state. Both states' DORs have their own forms.

**2. What if I move and immediately come back? Do I still owe?**
Yes for the time you were a resident of the other state. Less common: if you maintained a "place of abode" in both, you could be statutory resident of both (taxed on 100% by both, minus the double-tax credit on the resident return).

**3. Does the convenience-of-employer rule apply if I'm 1099?**
No. The rule is specific to employer-employee W-2 relationships. Contractors source income to where they performed the work.

**4. Can I just change my W-2 address to TX before I move?**
No — and don't try. Your address on payroll is one input among many; the actual tax-home / domicile facts (where you slept, where your mail came, where kids went to school) are what auditors look at.

**5. How does Florida treat my CA RSU vests after I move?**
Florida doesn't tax personal income at all. So FL takes 0%. But CA still takes its work-source-allocated share. The combined rate is just the CA rate × allocation %.

**6. What about my 401(k) distributions in retirement — which state taxes them?**
Federal law (4 USC §114) says only the STATE WHERE YOU LIVE WHEN YOU TAKE THE DISTRIBUTION can tax it. Not the state where you contributed. So move to FL/TX before retirement and your 401(k) becomes 100% state-tax-free.

**7. Does CA have a "tax-residency look-back" if I leave?**
Yes-ish. CA has a "Closer Connection" test and is aggressive on residency disputes if you maintain ANY ties (driver's license, home, kids in school). Cut every tie when you leave. CA can ask for tax 4 years back during a residency audit.

**8. What about Washington state's capital-gains tax?**
WA has a 7% LTCG tax on gains > $250k/yr (as of 2023). Applies to RSU sales + ESPP sales while a WA resident. Plan accordingly if you're in WA + selling > $250k of equity.

**9. The state DOR primary sources you list are scary documents. Do I need to read them?**
Read the table of contents + skim the section about your specific situation (e.g., "non-resident stock compensation"). Bring the PDF to your CPA. They reference it back to you in plain English.

**10. I've been moved for 3 years already and never filed in old state. How bad?**
Statute of limitations on most states' assessment is 3-4 years. If audited NOW for those years, they'll demand back-tax + penalty + interest. Quietly file amended/missing returns BEFORE you get audited — voluntary disclosure programs usually waive penalties.

---

## 📚 §K — Glossary (multi-state terms)

**Apportionment** — Allocating income across multiple jurisdictions per a formula. For stock comp: usually months-in-state / total-vesting-months.

**Convenience of employer rule** — 7 states (NY, DE, NE, PA, AR, CT, and pre-2024 NJ) claim 100% of W-2 income if you work remote for *your own* convenience, not the employer's necessity.

**Domicile** — Your "permanent home." Where you intend to return after temporary absences. One per person at any time. Harder to change than residency.

**Double-tax credit** — A state gives credit for tax paid to another state on the SAME income. Available on the resident state's return.

**Form 540 (CA)** — California full-year resident return.

**Form 540NR (CA)** — California non-resident or part-year resident return.

**Form IT-201 (NY)** — New York full-year resident return.

**Form IT-203 (NY)** — New York non-resident or part-year resident return.

**Non-resident** — Tax-filing status when you owe a state tax only on income sourced from there (not your worldwide income).

**Part-year resident** — Tax-filing status during a year you moved. You owe full state tax on income during resident months + non-resident tax on source-state income during non-resident months.

**Source of income / sourcing rule** — Where income is treated as "earned" for state-tax purposes. For wages: where the work was done. For equity: usually allocated across vesting period.

**Statutory residency** — Some states (NY, CT, NJ, IL, MA) make you a resident if you spend > 183 days AND maintain a place of abode there — even if your domicile is elsewhere.

**Tax home** — Your principal place of business / work. Often the same as domicile but can differ.

**Work-source allocation** — The default method for splitting equity-comp income across states based on where work occurred during vesting.

---

## ⚠️ Disclaimer

This template is for personal planning. State tax law is the messiest area of US tax practice and changes frequently. State DOR positions on stock-comp allocation differ by state, by year, and sometimes by audit officer. The math here is correct for the cited primary sources at time of update, but multi-state returns require a CPA who has actually done the apportionment work for similar clients — not generic advice. **For any return with > $25k of multi-state equity-comp tax exposure, hire one.**

---

> 🔄 **Lifetime updates included.** Each new tax year (typically late November) we update this template for new state DOR positions + rate changes + reciprocity-agreement updates. Re-download from your Gumroad library — your purchase persists.
