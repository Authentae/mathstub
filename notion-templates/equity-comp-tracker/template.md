# 📈 Equity Comp Tracker

> The Notion workspace tech workers use to plan every RSU vest, ESPP cycle, and ISO exercise — with projected tax owed quarter-by-quarter. Built around the same IRC-cited math the [Mathstub](https://mathstub.com) calculators run. Updated every tax year.

---

> 💎 **What you're getting**
> - 7 live tables (grants, vests, sales, exercises, AMT scratchpad, quarterly schedule, year-over-year)
> - 4 pre-filled scenarios (RSU vest, ESPP qualifying sale, ISO exercise + AMT, NSO early-exercise + 83(b))
> - 12 deep-linked Mathstub calculators that auto-fill from your rows
> - 50-state supplemental-withholding cheat sheet
> - "Talk to your CPA" question script — 18 questions a $300/hr CPA wishes you'd ask
> - Lifetime updates — re-pull the latest version from Gumroad any time IRS publishes new limits

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

## ⚠️ Disclaimer

This template is a planning reference, not tax advice. Numbers in worked examples use 2026 federal brackets and rules published in 2025; verify current limits against the IRS publications cited above before relying on any figure. The Mathstub calculators are estimates based on published IRS + state DOR rules; they don't model multi-state apportionment, NQDC, state-AMT edge cases, or facts only a CPA who has seen your full return can catch. For decisions involving real money, talk to a licensed CPA.

---

> 🔄 **Lifetime updates included.** Each new tax year (typically late November) we re-pull this template with the new contribution limits, AMT exemption, FICA wage base, and bracket adjustments. Re-download from your Gumroad library — your purchase persists.
