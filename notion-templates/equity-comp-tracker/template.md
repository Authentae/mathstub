# 📈 Equity Comp Decision Tracker

> The Notion workspace tech workers use to **decide** — not just track — every RSU vest, ESPP cycle, ISO exercise, and NSO grant. Multi-year tax projection + AMT credit calendar + a "Talk to Your CPA" brief built in. Pairs with the [Mathstub](https://mathstub.com) calculator suite.

---

## ⚡ 30-Second TL;DR

> 🎯 **If you do exactly 3 things in this template, do these:**
> 1. **Run [RSU Shortfall calc](https://mathstub.com/rsu-tax-shortfall) the day every vest hits** → get the gap → file W-4 box 4(c) bump within 48 hours.
> 2. **Before any ISO exercise, model AMT in [ISO/AMT calc](https://mathstub.com/iso-amt)** → if 5-figure bargain element + hold → confirm you have the April-15 cash.
> 3. **Adjust Form 8949 column (g) on every RSU sale** (see §B) → stops TurboTax double-taxing the same dollars.
>
> Everything else in this template makes those 3 things faster, more accurate, or multi-year.

---

> ▶️ **Watch the 4-minute walkthrough** before you start: `[paste your Loom share URL here]`
> *(After you record your walkthrough, drop the Loom link in this callout. Buyers prefer 3–5 min, casual, screen-share narration — no script.)*

---

> 💎 **What's inside**
> - **§A — 4-year tax projection grid** — see W-2 + RSU + AMT credit consumption + cumulative liability for the next 48 months on one page. This is the "decision" layer most trackers skip.
> - **§B — AMT credit recovery calendar** — Form 8801 multi-year scheduler, year-by-year recovery projection, with "use it by 20X8" alerts
> - **§C — RSU cost-basis fix-it kit** — step-by-step Form 8949 adjustment that stops TurboTax double-taxing your RSU sales (the most-googled RSU pain in the world)
> - **§D — "Talk to your CPA" 2-page brief** — personalized intake template you hand them in the first 5 minutes of the meeting
> - 7 live databases (grants, vests, sales, exercises, AMT scratchpad, quarterly schedule, year-over-year)
> - 4 pre-filled scenarios (RSU vest, ESPP qualifying sale, ISO + AMT, NSO early-exercise + 83(b))
> - 50-state supplemental-withholding cheat sheet
> - 18-question CPA script + 10 common $1k+ mistakes
> - **Free updates through tax year 2028** — re-pull any time IRS publishes new limits
> - **14-day no-questions money-back guarantee**

---

## ⚡ 5-minute setup

1. **Duplicate this page** into your own Notion workspace (top-right `⋯` → Duplicate).
2. **Replace the example rows** in §1 Grants with your actual offer letters. Keep the headers.
3. Open §3 Vest log, change `ACME` to your ticker, and **delete the example rows once you understand the columns.**
4. Bookmark §6 Tax dashboard — that's the page you'll return to every quarter.
5. Set a recurring Notion reminder for the first weekend of October (year-end review) and Jan 8 (Q4 estimated-tax check).

> ⚠️ **Privacy:** This template runs entirely inside your Notion. Nothing leaves your workspace. The Mathstub calculator links are client-side — your inputs never hit any server.

---

## 🎯 Worked example — meet Maya

> 👩‍💻 **Maya, 31, senior SWE in San Francisco. $185k base + $40k target bonus. 1,200 RSUs vesting over 4 years (~$72k FMV/yr). 8,000 ISOs at $2 strike, FMV now $24. Maxes 401(k) + HSA. Married filing jointly, no kids yet.**
>
> Last year Maya owed **$28,400 at filing** she didn't see coming. Her employer withheld 22% supplemental on her RSUs but her real federal marginal rate was 32%. The 10-point gap × $72k of RSU income = $7,200 federal shortfall. Add CA top-rate shortfall ($2,900) + the ISO bargain element she didn't realize was AMT-preference ($14,000) + a forgotten ESPP qualifying-disposition reclassification ($4,300), and she was hit with a $510 §6654 underpayment penalty on top.
>
> This template would have flagged every one of those in October — three quarters before the surprise.

---

## 📒 §1 Grants

A grant is a single equity award. Never merge grants — even if they're from the same employer and same date, give each its own row so you can track the right vesting schedule and tax treatment.

| Company | Grant date | Type | Total shares | Strike / discount | Vest start | Vest cadence | Cliff (mo) | Notes |
|---|---|---|---|---|---|---|---|---|
| ACME | 2024-03-15 | RSU | 1,000 | — | 2024-03-15 | quarterly | 12 | 4-yr vest, 1-yr cliff |
| ACME | 2024-03-15 | ISO | 5,000 | $2.00 | 2024-03-15 | monthly | 12 | 4-yr vest, 1-yr cliff |
| ACME | 2024-03-15 | NSO | 2,000 | $2.00 | 2024-03-15 | monthly | 12 | post-ISO-cap allocation |
| ACME | 2024-06-01 | ESPP | — | 15% lookback | 2024-07-01 | semi-annual | 0 | 6-mo offering period |

**Legend**
- **Type:** `RSU` · `ESPP` · `ISO` · `NSO` · `RSA` · `PSU`
- **Strike / discount:** $ strike for ISO/NSO/RSA; "15% lookback" for §423 ESPP; — for RSU/PSU.
- **Vest cadence:** `monthly` · `quarterly` · `semi-annual` · `annual` · `cliff` (one-shot) · `performance` (PSU).

> 💡 **Multi-employer:** if you've changed jobs, keep old grants in the table. Disqualifying ISOs / unvested forfeited RSUs / ESPP that converted at termination — each has tax consequences in the year of separation.

---

## 🗓️ §2 Upcoming vest calendar

Auto-populate from §1. Use this to see at a glance what's hitting in the next 12 months.

| Date | Type | Shares | Est. FMV/share | Est. gross | Calc to run |
|---|---|---|---|---|---|
| 2026-01-15 | RSU | 62.5 | $26.00 | $1,625 | [RSU shortfall →](https://mathstub.com/rsu-tax-shortfall) |
| 2026-04-15 | RSU | 62.5 | $26.00 | $1,625 | [RSU shortfall →](https://mathstub.com/rsu-tax-shortfall) |
| 2026-06-30 | ESPP | 80 | $26.00 (purch) | $2,080 | [ESPP →](https://mathstub.com/espp-qualifying-disposition) |
| 2026-07-15 | RSU | 62.5 | $26.00 | $1,625 | [RSU shortfall →](https://mathstub.com/rsu-tax-shortfall) |
| 2026-10-15 | RSU | 62.5 | $26.00 | $1,625 | [RSU shortfall →](https://mathstub.com/rsu-tax-shortfall) |

> 🧠 **Estimating FMV:** if public, use yesterday's close. If pre-IPO with a recent 409A, use the 409A. Don't use the most recent funding round (preferred shares); the 409A is what payroll will report.

---

## 📊 §3 Vest log

Every vest event. Columns marked ★ are calculator inputs.

| Vest date | Type | Ticker | Shares | FMV at vest ★ | Withheld federal ★ | Withheld state ★ | Withheld FICA | Net shares | Cost basis/share | Status |
|---|---|---|---|---|---|---|---|---|---|---|
| 2024-04-01 | RSU | ACME | 62.5 | $24.00 | $330.00 | $153.45 | $114.75 | 38.6 | $24.00 | sold to cover |
| 2024-07-01 | RSU | ACME | 62.5 | $25.00 | $343.75 | $159.84 | $119.53 | 38.6 | $25.00 | held |
| 2024-10-01 | RSU | ACME | 62.5 | $26.50 | $364.38 | $169.43 | $126.67 | 38.6 | $26.50 | held |

**Action protocol on every vest**

```
1. Within 24h of vest:
   ☐ Confirm payroll posted the gross to your YTD wages
   ☐ Note FMV-at-vest (your cost basis going forward)
   ☐ Run RSU shortfall calc with all YTD numbers
   ☐ If shortfall > $1k → schedule next-quarter estimated payment OR file W-4 4(c) bump
2. Within 7 days:
   ☐ Add row here
   ☐ Decide hold-vs-sell on net shares (concentration rule in §10)
```

> 💡 **Withheld federal is almost never enough.** 22% supplemental flat rate (IRC §3402(g)) covers a marginal rate that single filers hit around $50k taxable / MFJ around $100k. Above that, every dollar of RSU income is under-withheld. Run the [RSU Shortfall calculator](https://mathstub.com/rsu-tax-shortfall) the day each vest hits — it takes 30 seconds.

---

## 💰 §4 Sales log

| Sale date | Lot type | Ticker | Shares | Sale price | Cost basis | Gain / loss | Holding (mo) | Disposition | Tax bucket |
|---|---|---|---|---|---|---|---|---|---|
| 2026-07-15 | RSU | ACME | 100 | $42.00 | $24.00 | $1,800 | 27 | LT | LTCG |
| 2026-09-01 | ESPP | ACME | 80 | $44.00 | $20.40 | $1,888 | 26 | qualifying | mixed (ord + LTCG) |
| 2026-10-12 | ISO | ACME | 200 | $50.00 | $2.00 | $9,600 | 30 | qualifying | LTCG (with AMT credit) |

**Disposition decoder**

| Code | Means | Tax treatment |
|---|---|---|
| `ST` | Short-term cap gain (≤ 1 yr) | Ordinary rate |
| `LT` | Long-term cap gain (> 1 yr) | LTCG: 0% / 15% / 20% + NIIT 3.8% if MAGI > $200k single / $250k MFJ |
| `ESPP qualifying` | Held > 2y from offer + > 1y from purchase | Discount = ordinary; rest = LTCG |
| `ESPP disqualifying` | Sold before holding period met | Entire gain to FMV-at-purchase = ordinary; rest = ST/LT cap gain |
| `ISO qualifying` | Held > 2y from grant + > 1y from exercise | Whole gain = LTCG (but bargain element was AMT preference at exercise) |
| `ISO disqualifying` | Sold before holding period met | Bargain element at exercise = ordinary; rest = ST/LT cap gain. Reverses AMT preference. |

> ⚠️ **Broker 1099-B trap.** Most brokers report your **cost basis = $0** on the 1099-B for the RSU lots. That's wrong — your real basis is FMV-at-vest (already taxed as wages). If you don't manually adjust on Form 8949 box (g), the IRS taxes the gain *twice*. This template's Vest log row is your audit trail; copy the FMV column to Form 8949.

---

## 🧮 §5 ISO exercise + AMT scratchpad

When you exercise ISOs and hold, the bargain element (FMV − strike) × shares becomes an AMT preference item on Form 6251.

| Exercise date | Shares | Strike | FMV at exercise | Bargain element | AMT preference | Held? |
|---|---|---|---|---|---|---|
| 2025-09-15 | 1,000 | $2.00 | $24.00 | $22,000 | $22,000 | yes (started LT clock) |

**Quick AMT check (rule-of-thumb only — run the [ISO/AMT calc](https://mathstub.com/iso-amt) for the real number)**

| Filing status | 2026 AMT exemption | Phaseout starts at AMTI |
|---|---|---|
| Single / HoH | $88,100 | $626,350 |
| MFJ / QW | $137,000 | $1,252,700 |
| MFS | $68,500 | $626,350 |

```
AMTI ≈ Form 1040 line 11 (AGI) + bargain element (held ISOs)
TMT  ≈ (AMTI − exemption) × 26%   if AMTI < $239,100
     ≈ (AMTI − exemption) × 28% − $5,978   if AMTI ≥ $239,100
AMT  = max(0, TMT − regular tax)
```

> 🧠 **Cashflow trap.** AMT is real cash due April 15. If you exercised + held a 5-figure bargain element, you might owe more in AMT than your bank account holds. Either (a) sell enough exercised shares to cover, or (b) wait to exercise until a low-income year (between jobs, sabbatical, etc.).

> 💡 **AMT credit.** Every dollar of AMT paid generates a credit on Form 8801 that you can claim in any *future* year when regular tax exceeds tentative minimum tax. Track it. People leave $20k+ on the table by forgetting.

---

## 📋 §6 Tax dashboard (this year)

Your every-quarter check-in.

| Item | Amount | How it's calculated |
|---|---|---|
| Total RSU income (vested at FMV) | $— | Sum §3 |
| Total ESPP ordinary income | $— | Sum §4 qualifying-disposition portion |
| ISO bargain element (held) | $— | Sum §5 — flows to AMTI |
| LTCG realized | $— | Sum §4 LT lots |
| STCG realized | $— | Sum §4 ST lots |
| Estimated full-year federal tax | $— | Run [Quarterly Estimated Tax →](https://mathstub.com/quarterly-estimated-tax) |
| YTD federal withholding | $— | From paystubs Box 1 YTD |
| Safe-harbor target | $— | Lesser of (90% × this year) or (100% × prior, 110% if AGI > $150k) |
| Gap to safe harbor | $— | If positive → schedule estimated payment |
| Projected April 15 owed | $— | Full-year tax − YTD withholding − YTD estimates |
| AMT exposure | $— | Run [ISO/AMT calc →](https://mathstub.com/iso-amt) |

**Decision tree**

```
April 15 owed > $1,000?
├── No  → No action. Confirm safe harbor met. Done.
└── Yes
    ├── Time before next paycheck > 6 weeks?
    │   └── File W-4 line 4(c) — extra per-paycheck withholding (treated as paid evenly per IRC §6654(g))
    └── Time before next paycheck < 6 weeks
        └── Send estimated payment by next quarterly deadline (Apr 15 / Jun 15 / Sep 15 / Jan 15)
```

---

## 🗓️ §7 Quarterly schedule

| Quarter | Period covered | Due date | Estimated | Sent? | Confirmation # |
|---|---|---|---|---|---|
| Q1 | Jan 1 – Mar 31 | Apr 15 | $— | ☐ | |
| Q2 | Apr 1 – May 31 | Jun 15 | $— | ☐ | |
| Q3 | Jun 1 – Aug 31 | Sep 15 | $— | ☐ | |
| Q4 | Sep 1 – Dec 31 | Jan 15 (next year) | $— | ☐ | |

> 💡 **Send via IRS Direct Pay** (free, no account needed) or EFTPS. Keep the confirmation # in the table above — it's your receipt if IRS later claims you didn't pay.

---

## 🗺️ §8 50-state supplemental-withholding cheat sheet

The flat rate your employer withholds on supplemental wages by state. If your state top marginal rate is *higher* than this, you're under-withheld on every RSU vest.

| State | Supplemental rate | Top marginal | Gap |
|---|---|---|---|
| AK · FL · NV · NH · SD · TN · TX · WA · WY | 0% (no state tax) | 0% | 0pp |
| CA | 10.23% (regular) / 14.63% (bonuses + RSU) | 13.3% | up to 3pp |
| NY | 11.7% | 10.9% (state) + 3.876% (NYC) | up to 2.9pp |
| OR | 8% | 9.9% | 1.9pp |
| MN | 6.25% | 9.85% | 3.6pp |
| HI | 7.9% | 11% | 3.1pp |
| NJ | 11.8% | 10.75% | 0pp |
| MA | 5% | 9% (millionaires tax > $1M) | 4pp at top |
| MD | 5.75% + local | 5.75% + local 2.25–3.2% | local layer |
| GA · IL · IN · MI · NC · PA · UT | flat 3–5% | same | 0pp |

> 🔗 Run the full picker at [Mathstub State Stock-Comp Lookup →](https://mathstub.com/state-stock-comp). Covers all 50 states + DC, plus state AMT status + LTCG treatment.

---

## ⚠️ §9 Common mistakes (each one costs $1k+)

| # | Mistake | What it costs | Fix |
|---|---|---|---|
| 1 | Trusting the 22% supplemental withholding | $5k–$15k April surprise | Run [RSU Shortfall](https://mathstub.com/rsu-tax-shortfall) every vest |
| 2 | Letting broker report $0 cost basis on RSU sales | 2× tax on the same dollars | Adjust Form 8949 col (g) manually |
| 3 | Exercising ISOs without checking AMT | $10k–$50k cash due in April you didn't budget | Run [ISO/AMT calc](https://mathstub.com/iso-amt) BEFORE exercise |
| 4 | Selling ESPP at < 2yr from offer / < 1yr from purchase | Lose qualifying disposition, pay ordinary on entire gain | Run [ESPP calc](https://mathstub.com/espp-qualifying-disposition) before each sale |
| 5 | Forgetting AMT credit carryforward | $5k–$25k left on table over the next few years | Track on Form 8801 every year |
| 6 | No quarterly estimates after a big vest | §6654 penalty (currently ~8% APR) | Use [Quarterly calc](https://mathstub.com/quarterly-estimated-tax) and Direct Pay |
| 7 | Moving states mid-year without prorating | Double-taxed by old + new state | Both states' DOR pages have apportionment rules — file part-year resident |
| 8 | NSO early-exercise without §83(b) election | All future appreciation taxed as ordinary | File §83(b) within 30 days of exercise |
| 9 | Trying to wash-sale your way out of a loss | Loss disallowed, basis just adjusted | Wait > 30 days OR sell a substantially-different ETF |
| 10 | Single-stock concentration above 20% | 1–2 standard deviations of life savings risk | Mechanically sell on each vest to your target ceiling |

---

## 🎯 §10 Concentration policy

| Risk band | % in employer stock | Action |
|---|---|---|
| Green | < 10% | Hold; let it grow |
| Yellow | 10–20% | Sell each new vest, don't add |
| Orange | 20–35% | Sell vests + 25%/yr of excess holdings |
| Red | > 35% | Build a 10b5-1 plan or schedule aggressive sells; consider exchange fund |

> 🧠 **The Bay Area survivors-bias graveyard:** Cisco employees who didn't diversify in 1999 lost 89% peak-to-trough. Enron, WorldCom, FTX, Bear Stearns — the same story. Your conviction in your company is not an investment thesis. It's payroll.

---

## 🔮 §A — 4-year tax projection grid

The single most-asked question by every tech worker with equity: *"What does the next 4 years actually look like, all-in?"* Fill this grid in December for each upcoming year — you'll catch the AMT bunch year, the multi-year safe-harbor curve, and the cliff vest that triggers a 37% supplemental bracket.

| Year | W-2 base + bonus | RSU vest income | ESPP discount realized | ISO bargain (held) | NSO bargain | LTCG / STCG | AGI proj. | Fed marginal | AMT triggered? | AMT credit balance EoY | Est. fed liability | Safe-harbor target | Action |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| **2026** | $— | $— | $— | $— | $— | $— | $— | —% | ☐ | $— | $— | $— | |
| **2027** | $— | $— | $— | $— | $— | $— | $— | —% | ☐ | $— | $— | $— | |
| **2028** | $— | $— | $— | $— | $— | $— | $— | —% | ☐ | $— | $— | $— | |
| **2029** | $— | $— | $— | $— | $— | $— | $— | —% | ☐ | $— | $— | $— | |

> 💡 **Why this grid changes everything.** Most planning is single-year. But equity comp is a *4-year compound problem*: a 2026 ISO exercise creates an AMT credit consumed in 2028. A 2027 RSU cliff stacks on top of 2027's bonus and pushes you to 37% supplemental. A 2028 IPO secondary sale changes your LTCG bracket retroactively. This grid is how you see the whole game board.

**How to populate**
1. Pull your offer letter(s) for unvested RSU/ISO/NSO + cliff schedule.
2. Use last year's bonus + 5% raise assumption for base.
3. Run each year through [RSU Shortfall](https://mathstub.com/rsu-tax-shortfall) + [ISO/AMT](https://mathstub.com/iso-amt) + [AMT Credit Recovery](https://mathstub.com/amt-credit-recovery) and drop results in.
4. Re-run every December and after any life event (job change, marriage, move, parental leave).

**Decision triggers**
- AMT triggered + holds planned → schedule the cash to pay AMT in April of that year.
- Marginal rate climbing past 32% in a single year → consider Roth conversion in the **lower** year.
- Cumulative AMT credit balance ≥ $10k by year 3 → check if a stock-sale year would unlock it (TMT < regular).
- Safe-harbor target growing > $30k/yr → set up EFTPS auto-scheduled quarterly payments.

---

## 🛠️ §B — RSU cost-basis fix-it kit (stop the TurboTax double-tax)

This is the **single biggest tax pain** for RSU holders, and TurboTax fails most users on it silently.

> ⚠️ **The bug.** Your broker (Schwab, E*Trade, Fidelity, Morgan Stanley) reports your 1099-B with **cost basis = $0** for RSU lots — because the broker only knows what *you paid them* for the shares ($0; the shares were granted). But your **real** cost basis is the FMV at vest, which was already taxed as wages on your W-2 Box 1. If you don't fix this, the IRS taxes the same dollars *twice*.

**The fix (Form 8949 column g adjustment)**

```
For each RSU sale lot:
  Broker 1099-B reports:
    Box 1d (proceeds)  = sale price × shares
    Box 1e (basis)     = $0    ← WRONG
  
  You override on Form 8949:
    Col (d) Proceeds   = sale price × shares (matches 1099-B)
    Col (e) Basis      = $0 (matches 1099-B — required for IRS reconciliation)
    Col (f) Code       = B (basis incorrect on 1099-B)
    Col (g) Adjustment = -(FMV at vest × shares)    ← the fix
    Col (h) Gain/loss  = (sale price − FMV at vest) × shares
```

**TurboTax walk-through**
1. Import 1099-B from broker.
2. For each RSU lot, select **"I'll enter additional info on my own"** → **"This is a less common situation"** → **"The cost basis on my 1099-B is incorrect or missing"**.
3. Enter **the correct basis** (FMV at vest from your §3 Vest log row).
4. TurboTax will generate Form 8949 with code B and the adjustment in column (g).
5. Schedule D total will reflect the corrected gain.

**FreeTaxUSA walk-through**
1. Enter the 1099-B import.
2. On the lot detail page, check **"Reported cost basis is incorrect"**.
3. Enter the corrected basis (same FMV at vest).

**What this saves you**
- A $50k RSU sale with $40k basis (incorrectly reported as $0) and 32% marginal = **$12,800 of double-taxation**.
- Multiply by every RSU sale lot you've ever made. People recover 4–5 figures going back and amending 3 years.

> 🔍 **Audit your past 3 years.** If you ever filed without this fix, you can amend via Form 1040-X within 3 years of the original filing deadline. The refund + 6% interest is real money.

---

## 🧾 §C — "Talk to your CPA" 2-page brief

Print this. Bring it to your meeting. Most CPAs bill $300–$500/hour; this brief makes the first 30 min productive instead of educational.

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CLIENT BRIEF · [Your Name] · Prepared [Date]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

THE SHORT VERSION
[1–2 sentences. e.g., "I had $90k RSU + $20k ESPP vest this year,
exercised + held 2,000 ISOs in Sept, and I want to confirm safe
harbor and the AMT picture before April."]

SITUATION
- Filing status: [single / MFJ / HoH] · State(s): [CA / NY / TX / multi]
- Employer: [Co.] · Role: [SWE L5]
- Spouse W-2: $— · Spouse 1099 / Schedule C: $—

EQUITY EVENTS THIS YEAR
RSU vested              $—  (from §3 Vest log totals)
ESPP purchase / sale    $—  ($— qualifying / $— disqualifying)
ISO exercised + held    $—  bargain = $— (§5 AMT scratchpad)
ISO exercised + sold    $—  (disqualifying → ordinary)
NSO exercised           $—  bargain = $—
Cap gains realized      $—  ($— LT / $— ST)
RSU cost-basis adj.     $—  (Form 8949 col g — see §B)

YTD WITHHOLDING (from final paystub or §6 Tax dashboard)
Federal                 $—
State                   $—
Estimates paid          $—  ($— Q1 / $— Q2 / $— Q3 / $— Q4)

OPEN QUESTIONS (in priority order)
1. Are we on §6654 safe harbor? Q4 estimate or W-4 4(c) bump?
2. Confirm Form 8949 col (g) adjustments for $— of RSU sales.
3. ISO bargain $— → Form 6251 AMT impact + Form 8801 credit balance.
4. Multi-state apportionment: [details if moved this year]
5. Mega-Backdoor Roth: did we max + does my plan allow IRR?
6. Backdoor Roth — Form 8606 filed?
7. [Your specific situation question]

ATTACHMENTS
- §3 Vest log (Excel export from this Notion)
- §4 Sales log (Excel export)
- §5 ISO AMT scratchpad
- Last 3 paystubs
- W-4 on file
- Form 3921 (ISO exercise reports)
- Form 3922 (ESPP transfer reports)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

> 💡 **Why this works.** A CPA who has seen this brief in the first 5 minutes will spend the next 55 doing tax work, not interviewing you. Most clients waste their first $200 of billable time on "education." This brief is the cheat code.

---

## 💼 §11 Talk-to-your-CPA script

The 18 questions a $300/hr CPA wishes you'd ask (because if you don't, they'll miss them too).

**Withholding & estimates**
1. Given my YTD numbers + remaining-year projection, am I on safe harbor — or do I need a Q4 estimated payment?
2. Should I file a W-4 line 4(c) increase instead of a Q4 estimate? (Withholding is deemed paid evenly per IRC §6654(g) — estimates aren't.)
3. If I'm under-withheld, what's the cheapest path forward (penalty vs. liquidity vs. tax bracket)?

**RSU & ESPP**
4. Did the broker report cost basis on my 1099-B for RSU sales? If $0 or near-$0, did we adjust Form 8949 column (g)?
5. Have we modeled the holding-period clock on each ESPP lot? Any qualifying dispositions coming up?
6. What's my plan for the next 4 quarters of RSU vests + sales?

**ISO & AMT**
7. Did I have ISO exercises this year that I held? What's the AMT preference?
8. What's my AMT credit carryforward from prior years (Form 8801)?
9. Is there a window where regular tax > TMT and I can recover AMT credit?

**Multi-state**
10. Did I work or reside in multiple states this year? How are we allocating?
11. Does the state where I exercised ISOs have its own AMT? (Most don't, but CA, IA, MN do.)

**Retirement**
12. Am I fully maxing 401(k)? Is Mega-Backdoor Roth available in my plan?
13. Did we file the Backdoor Roth properly (Form 8606)?
14. HSA: am I maxing + investing above the cash cushion?

**Concentration & planning**
15. Should I be 10b5-1'ing any of this?
16. Am I trading up the AMT credit / LTCG bracket cleanly each year?
17. Are there charitable-giving moves I should pre-plan (DAF, appreciated-stock donation)?
18. Any state-residency change I should plan for over the next 24 months?

---

## 📚 §12 Resources

**Mathstub calculators**
- [RSU Tax Shortfall](https://mathstub.com/rsu-tax-shortfall) — the 22%-vs-real-marginal gap
- [ESPP Qualifying Disposition](https://mathstub.com/espp-qualifying-disposition) — split discount vs. cap gain
- [ISO Exercise + AMT](https://mathstub.com/iso-amt) — bargain element, exemption, TMT
- [NSO Exercise Tax](https://mathstub.com/nso-exercise) — bargain element + FICA
- [Bonus Tax Shortfall](https://mathstub.com/bonus-tax-shortfall) — 22% / 37% supplemental gap
- [Quarterly Estimated Tax Safe-Harbor](https://mathstub.com/quarterly-estimated-tax) — §6654 target
- [AMT Credit Recovery](https://mathstub.com/amt-credit) — Form 8801 multi-year scheduler
- [State Stock-Comp Lookup](https://mathstub.com/state-stock-comp) — 50 states + DC

**IRS primary sources**
- [Pub 525 — Taxable & Nontaxable Income](https://www.irs.gov/publications/p525) (RSU/ESPP/ISO income recognition)
- [Pub 505 — Withholding & Estimated Tax](https://www.irs.gov/publications/p505)
- [Pub 550 — Investment Income & Expenses](https://www.irs.gov/publications/p550) (cap gains, wash sale)
- [Form 6251 — Alternative Minimum Tax](https://www.irs.gov/forms-pubs/about-form-6251)
- [Form 8801 — Credit for Prior Year Minimum Tax](https://www.irs.gov/forms-pubs/about-form-8801)
- [Form 3921 — ISO Exercise Reporting](https://www.irs.gov/forms-pubs/about-form-3921)
- [Form 3922 — ESPP Transfer Reporting](https://www.irs.gov/forms-pubs/about-form-3922)
- [Form 8949 — Sales & Dispositions](https://www.irs.gov/forms-pubs/about-form-8949)

---

## 📖 §13 — Scenario cookbook (10 recipes)

The 10 most-common equity-comp situations, each with the exact 3–6 step playbook. Find yours, follow the steps, done.

### 🧂 Recipe 1 — Your first RSU vest

You just had a vest hit. Here's the next 48 hours.

```
1. Add the row to §3 Vest log: vest date, shares, FMV, withholding from paystub.
2. Run RSU Shortfall calc (mathstub.com/rsu-tax-shortfall) with YTD wages + this vest.
3. If shortfall > $1,500 → file W-4 line 4(c) bump (§14 of Year-End Tax Playbook).
4. If you're holding the shares → log to §5 ISO/RSU lots with FMV as cost basis.
5. If sold-to-cover → net shares + per-share basis stay in §4 Sales log.
```

### 🧂 Recipe 2 — You're considering exercising ISOs and holding

The exercise creates a tax bill in April even if the stock craters. Here's how to avoid disaster.

```
1. Run ISO/AMT calc (mathstub.com/iso-amt) with your strike + FMV + AGI.
2. If TMT > regular tax → AMT amount is what you'll owe extra April 15. Have the cash.
3. If you don't have the cash → exercise + same-day-sell to fund the AMT.
4. If you do have the cash → exercise + hold. Log Form 3921 when it arrives in Jan.
5. Add row to §5 AMT scratchpad. Project the credit recovery over the next 3-5 years.
```

### 🧂 Recipe 3 — You got hit with AMT last year, want the credit back this year

It's real cash. Most people forget it exists.

```
1. Pull last year's Form 6251 — line with the AMT amount = your credit balance.
2. This year, project regular tax vs. TMT in ISO/AMT calc. If regular > TMT, claim.
3. Form 8801 → enter prior-year minimum tax credit carryforward.
4. The credit caps at (regular − TMT). Excess carries to next year (no expiration).
5. Track running balance in §B AMT scratchpad year over year until consumed.
```

### 🧂 Recipe 4 — You're selling RSU shares for the first time

The broker WILL report cost basis wrong. Here's the fix.

```
1. Sale settles → 1099-B comes in Feb.
2. Verify Box 1e (basis). If $0 or near-$0 → it's wrong (see §B).
3. Pull FMV-at-vest from §3 Vest log row.
4. On Form 8949: report exactly as 1099-B in cols (d), (e); enter code B in (f);
   enter -(FMV × shares) in (g); col (h) calculates the corrected gain.
5. Save the §3 row screenshot — IRS rarely asks but if they do, this is your evidence.
```

### 🧂 Recipe 5 — ESPP purchase: should you sell now or hold for qualifying?

The discount you got is always ordinary income. The question is whether the rest qualifies for LTCG.

```
1. Confirm offer date + purchase date in §1 Grants.
2. Run ESPP calc (mathstub.com/espp-qualifying-disposition) with both scenarios.
3. If holding 2y-from-offer + 1y-from-purchase → entire gain above discount = LTCG.
4. If selling early → entire gain to FMV-at-purchase = ordinary; rest = ST or LT cap gain.
5. Math: if marginal rate is 32%+ and LTCG bracket is 15%, the qualifying disposition
   saves you (32-15)% × (gain above discount). For a $20k gain, that's $3,400.
```

### 🧂 Recipe 6 — You just got a job offer with equity. Should you take it?

The base + bonus is easy. The equity needs math.

```
1. Enter the offer in §1 Grants: total RSU shares, vest schedule, cliff months.
2. Run a 4-year projection in §A using offer values.
3. Compare to your current trajectory net of new state if you're moving.
4. Factor in vesting risk: a 4-yr cliff means earliest 25% of stated value is realized.
5. Don't let the equity sticker price (4-yr face value) drive the decision —
   discount by vesting probability + dilution.
```

### 🧂 Recipe 7 — You moved states mid-vest (or are about to)

Old state still gets a piece. Here's how much.

```
1. Document residency timeline (see Multi-State Equity Comp Tax Planner template).
2. For each future vest, compute work-source allocation: months_in_state / months_total.
3. Old state taxes the allocated portion at their top marginal even though you've moved.
4. Withholding now goes 100% to new state. Cover the gap with old-state estimated payments.
5. File part-year resident return in old state + full-year in new state. Credit on resident return.
```

### 🧂 Recipe 8 — Pre-IPO secondary sale: should you sell some of your vested ISO/NSO?

You finally have liquidity. The temptation to sell everything is real. So is the tax bill.

```
1. Confirm holding period on each lot (>1 yr from exercise = LTCG).
2. Project sale at current secondary price in §4 Sales log.
3. If ISO + qualifying (>2yr grant + >1yr exercise) → entire gain = LTCG. Best case.
4. If ISO + disqualifying → bargain at exercise = ordinary; rest = cap gain. Reverses AMT.
5. Sell concentration down to your §10 target ceiling. Don't sell more than that "in case."
```

### 🧂 Recipe 9 — You missed an estimated payment last year. Now what?

The §6654 penalty is real but bounded. Here's the recovery.

```
1. Form 2210 calculates the penalty. Use IRS's online calculator or your tax software.
2. Penalty is roughly the underpayment × ~8% APR × time underpaid. Often $200-$2,000.
3. PAY THE PENALTY. Disputing rarely works unless extraordinary circumstances.
4. This year: hit §6654 safe harbor via W-4 4(c) bump (treated as paid evenly).
5. Set EFTPS auto-scheduled quarterly payments. Never miss again.
```

### 🧂 Recipe 10 — You're leaving the company. What about your unvested + your ISOs?

Vesting stops. ISO exercise window starts. Move fast.

```
1. Confirm post-separation exercise window (typically 90 days, sometimes 1+ years).
2. Project AMT on any ISO exercise + hold via §5 — if you can't afford the April bill, sell.
3. If post-90-day → ISOs convert to NSOs → bargain element at exercise becomes
   immediate ordinary income (worse tax treatment).
4. Unvested RSUs forfeit unless your separation agreement carved out a portion.
5. ESPP: pending offer period ends; participate up to separation date.
```

---

## ❓ §14 — Frequently asked questions

**1. Do I need an accountant if I have this template?**
Maybe. This template + the Mathstub calculators handle ~90% of standard equity-comp situations. The remaining 10% — multi-state with > $25k exposure, post-IPO sale > $500k, AMT credit > $50k, gift/estate planning — wants a CPA who has seen the situation before.

**2. What about the IRS supplemental wage 37% rule?**
If your YTD supplemental wages (RSU + bonus + commissions + ESPP) exceed $1M in a calendar year, **everything above $1M** is withheld at a mandatory 37% federal rate, not 22%. Most people don't hit this; if you might, factor into §A projection.

**3. Does this work for non-US residents?**
No. Equity-comp tax rules vary radically by country. This template is US-only (federal + state).

**4. What about NSO vs ISO — should I prefer one?**
ISOs are taxed more favorably (LTCG treatment + qualifying disposition path) but trigger AMT. NSOs are simpler (always ordinary at exercise + cap gain at sale) but more total tax. Most startups give a mix because of IRC §422's $100k ISO limit. The deciding factor for *exercising*: cash on hand to pay AMT.

**5. I didn't make estimated payments. How bad is it?**
Penalty is roughly the underpayment × IRS underpayment rate (~8% APR in 2025) × time underpaid. Often hundreds of dollars; rarely thousands unless you've been ignoring it for years.

**6. What if my company is private — what's "FMV"?**
The 409A valuation set by your company is the FMV for ISO/NSO bargain-element math. Don't use the most recent funding round (preferred shares) — payroll uses the 409A.

**7. Should I sell to cover or hold to cover RSU withholding?**
Sell-to-cover is the default for most W-2 employers (broker auto-sells enough to fund the 22% supplemental withhold). Hold-to-cover requires you to send the broker cash to fund withholding. Sell-to-cover is fine; just remember the FMV-at-vest is your cost basis on the net shares.

**8. What's "double-trigger" RSU vesting?**
Pre-IPO companies sometimes require BOTH a time-vest AND a liquidity event (IPO or acquisition) before RSUs vest. This means your "vested but not delivered" shares don't trigger tax until liquidity. Once liquidity hits, all of the time-vested shares vest in one big event — often a huge AMT-ish event for the year of the IPO.

**9. Does this template integrate with Carta / Schwab / Shareworks?**
No. Vests are entered manually. The complement is the [Mathstub Equity Comp Vest Tracker Chrome extension](https://mathstub.com), which sends a daily notification reminder to log new vests.

**10. What changes year over year?**
IRS limits (401(k), HSA, IRA, AMT exemption, FICA wage base, supplemental rates) update each November. We re-publish the template — your Gumroad library auto-updates. The structure stays stable.

---

## 📚 §15 — Glossary

**AGI** — Adjusted Gross Income. Form 1040 line 11. Drives most income-based phaseouts.

**AMT (Alternative Minimum Tax)** — A parallel tax system that prevents high-earners from using deductions to escape tax. Triggers commonly on ISO exercise + hold. IRC §55-§59.

**AMT credit / Form 8801** — When you pay AMT, you generate a credit recoverable in future years where regular tax > TMT. No expiration. Track every year.

**AMTI** — Alternative Minimum Taxable Income. AGI + AMT preferences − AMT exemption.

**Bargain element** — (FMV at exercise − strike price) × shares. The "spread" on an option exercise.

**Disqualifying disposition** — Selling ESPP / ISO shares before the holding-period threshold. Loses preferential tax treatment.

**ESPP §423** — Employee Stock Purchase Plan that qualifies for tax-favored treatment under IRC §423. 15% discount, lookback feature.

**FICA** — Federal Insurance Contributions Act. Social Security 6.2% (up to wage base $176,100 in 2025) + Medicare 1.45% (no cap) + Additional Medicare 0.9% (over $200k single / $250k MFJ).

**FMV** — Fair Market Value. For RSUs, FMV at vest. For ISOs, FMV at exercise.

**IPO** — Initial Public Offering. Often triggers double-trigger RSU vesting + ISO §422 disqualifying-disposition resets.

**ISO §422** — Incentive Stock Option, qualifying under IRC §422. LTCG treatment if held >2y from grant + >1y from exercise. Generates AMT preference.

**LTCG (Long-Term Capital Gain)** — Cap gain on assets held > 1 year. 0% / 15% / 20% federal + NIIT 3.8% on high earners.

**MAGI** — Modified Adjusted Gross Income. For Roth IRA phaseouts: AGI + traditional IRA deduction (rare) + several other adjustments.

**NIIT** — Net Investment Income Tax. 3.8% on investment income (interest, dividends, cap gains) over $200k single / $250k MFJ MAGI. Form 8960.

**NSO** — Non-Qualified Stock Option. Bargain element at exercise = ordinary income. No AMT trigger. Simpler than ISO.

**Qualifying disposition** — Selling ESPP / ISO shares after the holding-period threshold (ESPP: >2y offer + >1y purchase; ISO: >2y grant + >1y exercise). Preferential tax treatment.

**RSU (Restricted Stock Unit)** — Promise to deliver shares on a vest date. FMV at vest = ordinary income. No exercise needed.

**Safe harbor (§6654)** — Pay (a) 90% of current-year tax OR (b) 100% / 110% of prior-year tax → no underpayment penalty regardless of actual.

**Section 83(b) election** — File within 30 days of receiving restricted stock to pay tax NOW on FMV instead of WHEN it vests. Risky if you forfeit; locks in LTCG clock.

**Supplemental wages** — RSU, bonus, commissions, ESPP discount. Withheld at flat 22% federal (or 37% above $1M YTD). Often under-withholds. IRC §3402(g).

**TMT (Tentative Minimum Tax)** — Per Form 6251 line 9. If TMT > regular tax → AMT applies.

**Vesting** — The schedule on which RSU/ISO/NSO shares become yours. Typically 4 years monthly/quarterly with 1-year cliff.

**W-4 line 4(c)** — Extra federal withholding per paycheck. Treated as evenly paid for §6654 purposes — best fix for mid-year shortfalls.

**Wash sale** — Buying substantially-identical security within 30 days before/after a loss sale → loss is disallowed, added to basis of replacement. IRC §1091.

---

## ⚠️ Disclaimer

This template is a planning reference, not tax advice. Numbers in worked examples use 2026 federal brackets and rules published in 2025; verify current limits against the IRS publications cited above before relying on any figure. The Mathstub calculators are estimates based on published IRS + state DOR rules; they don't model multi-state apportionment, NQDC, state-AMT edge cases, or facts only a CPA who has seen your full return can catch. For decisions involving real money, talk to a licensed CPA.

---

> 🔄 **Lifetime updates included.** Each new tax year (typically late November) we re-pull this template with the new contribution limits, AMT exemption, FICA wage base, and bracket adjustments. Re-download from your Gumroad library — your purchase persists.
