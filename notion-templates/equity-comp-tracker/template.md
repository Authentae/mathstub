# Equity Comp Tracker

> One Notion home for every RSU, ESPP, and ISO grant you'll ever get. Pairs with the [Mathstub](https://mathstub.vercel.app) tax calculators.

---

## How to use this template

1. **Duplicate this page** into your own Notion workspace (top-right "Duplicate" button).
2. Fill in the **Grants** table for each grant in your offer letter (or letters, if you've changed jobs).
3. Each time a vest hits, add a row to **Vest log**. Most fields are pre-typed columns — Notion will keep totals on the bottom.
4. When you sell shares, add a row to **Sales log**. The template flags ST vs LT based on holding-period.
5. The **Tax dashboard** links to Mathstub calculators with the right scenario pre-loaded so you can plan estimated tax, AMT, and shortfalls in seconds.
6. Run the **Year-end review** in Q4 — every line item there is something that costs real money to miss.

> 💡 The links to Mathstub are deep-linked by tool. You don't need an account; the calculators run client-side and don't store your data.

---

## 📒 Grants

A grant is a single equity award from your employer. RSU, ESPP, and ISO each have their own row. If you have multiple grants of the same type, give each its own row — never merge them.

| Company | Grant date | Type | Total shares | Strike / discount | Vest start | Vest cadence | Cliff months | Notes |
|---|---|---|---|---|---|---|---|---|
| ACME | 2024-03-15 | RSU | 1,000 | — | 2024-03-15 | quarterly | 12 | 4-yr vest, 1-yr cliff |
| ACME | 2024-03-15 | ISO | 5,000 | $2.00 | 2024-03-15 | monthly | 12 | 4-yr vest, 1-yr cliff |
| ACME | 2024-06-01 | ESPP | — | 15% lookback | 2024-07-01 | semi-annual | 0 | 6-mo offering |

**Legend**
- **Type:** `RSU`, `ESPP`, or `ISO`. NSO not modeled in v1.
- **Strike / discount:** dollar strike for ISO/NSO; "15% lookback" for §423 ESPP.
- **Vest cadence:** `monthly`, `quarterly`, `semi-annual`, `annual`, or `cliff` for one-shot vests.

---

## 🗓️ Vest log

Every vest event goes here. Columns marked ★ are calculator inputs — copy them into the matching Mathstub tool.

| Vest date | Company | Type | Ticker | Shares | FMV at vest ★ | Withheld federal ★ | Withheld state ★ | Withheld FICA | Status | Mathstub link |
|---|---|---|---|---|---|---|---|---|---|---|
| 2024-04-01 | ACME | RSU | ACME | 62.5 | $24.00 | $330.00 | $153.45 | $35.25 | done | [RSU calc →](https://mathstub.vercel.app/rsu-tax-shortfall) |
| 2024-04-01 | ACME | ISO | ACME | 104 | $24.00 | — | — | — | held | [ISO calc →](https://mathstub.vercel.app/iso-amt) |
| 2024-06-30 | ACME | ESPP | ACME | 80 | $24.00 (purch) | — | — | — | held | [ESPP calc →](https://mathstub.vercel.app/espp-qualifying-disposition) |

> 💡 **Use the RSU calculator on every RSU vest line** the day it hits. The 22% supplemental withholding is almost always lower than your real marginal rate. Plan the gap NOW, not in April.

---

## 💰 Sales log

When you sell shares, log the lot here. The template auto-flags qualifying vs disqualifying for ESPP/ISO based on the dates in the Grants table.

| Sale date | Lot type | Ticker | Shares | Sale price | Cost basis | Gain / loss | Holding (mo) | Disposition | Tax bucket |
|---|---|---|---|---|---|---|---|---|---|
| 2026-07-15 | RSU | ACME | 100 | $42.00 | $24.00 | $1,800 | 27 | LT | LTCG |
| 2026-09-01 | ESPP | ACME | 80 | $44.00 | $20.40 | $1,888 | 26 | qualifying | mixed (ord + LTCG) |
| 2026-10-12 | ISO | ACME | 200 | $50.00 | $2.00 | $9,600 | 30 | qualifying | LTCG (AMT credit) |

**Disposition codes**
- `LT` — long-term capital gain (>1 yr from receipt for RSU/NSO).
- `ST` — short-term, taxed as ordinary.
- `qualifying` — ESPP held >2y from offer + >1y from purchase, OR ISO held >2y from grant + >1y from exercise.
- `disqualifying` — ESPP/ISO sold before holding requirements met.

---

## 📊 Tax dashboard (this year)

A running tally of what you've withheld, what you'll owe, and what's missing.

| Item | Amount | Notes |
|---|---|---|
| Total RSU income (vested) | $— | Sum from Vest log |
| Total ESPP ordinary income | $— | Sum from Sales log, qualifying portion |
| Total LTCG | $— | LT lots from Sales log |
| Total STCG | $— | ST lots from Sales log |
| Estimated full-year tax | $— | Use [Quarterly Estimated Tax](https://mathstub.vercel.app/quarterly-estimated-tax) |
| YTD withholding (federal) | $— | From paystubs |
| Safe-harbor target | $— | Lesser of 90% × current OR 100% (110%) × prior |
| Gap to safe harbor | $— | If positive, schedule estimated payment |
| AMT exposure (ISOs held) | $— | Use [ISO/AMT calc](https://mathstub.vercel.app/iso-amt) |

> 💡 If the gap to safe harbor is over $1,000, the IRS §6654 underpayment penalty starts to bite. Send an estimated payment on the next quarterly date or update Form W-4 line 4(c) to add per-paycheck withholding.

---

## ✅ Year-end review

Run this in late October or early November — there's still time to act.

- [ ] Re-run the [RSU shortfall calculator](https://mathstub.vercel.app/rsu-tax-shortfall) with full-year actuals, including any Q4 vest already scheduled.
- [ ] Verify YTD federal withholding hits the §6654 safe-harbor target (use [Quarterly Estimated Tax](https://mathstub.vercel.app/quarterly-estimated-tax)).
- [ ] If short, file W-4 line 4(c) update OR schedule January 15 estimated payment.
- [ ] Review held ISOs for AMT exposure if you exercised this year. Run [ISO/AMT calc](https://mathstub.vercel.app/iso-amt).
- [ ] Decide on tax-loss harvesting: sell underwater lots before Dec 31 to offset gains.
- [ ] Plan ESPP qualifying-disposition sales for the new year (don't sell before the 2y/1y window).
- [ ] If income is unusually high this year, consider larger 401(k) catch-up, HSA, or Roth conversion via Roth-not-this-year planning.
- [ ] Update beneficiaries on brokerage accounts.

---

## 🔗 Resources

- [Mathstub RSU Tax Shortfall Calculator](https://mathstub.vercel.app/rsu-tax-shortfall)
- [Mathstub ESPP Qualifying Disposition Calculator](https://mathstub.vercel.app/espp-qualifying-disposition)
- [Mathstub ISO Exercise AMT Calculator](https://mathstub.vercel.app/iso-amt)
- [Mathstub Quarterly Estimated Tax Safe-Harbor Calculator](https://mathstub.vercel.app/quarterly-estimated-tax)
- [Mathstub State Stock-Comp Lookup (50 states)](https://mathstub.vercel.app/state-stock-comp)
- [IRS Publication 525 — Taxable and Nontaxable Income](https://www.irs.gov/publications/p525)
- [IRS Publication 505 — Tax Withholding and Estimated Tax](https://www.irs.gov/publications/p505)
- [IRS Form 6251 — Alternative Minimum Tax](https://www.irs.gov/forms-pubs/about-form-6251)
- [IRS Form 3921 — ISO Exercise Reporting](https://www.irs.gov/forms-pubs/about-form-3921)
- [IRS Form 3922 — ESPP Transfer Reporting](https://www.irs.gov/forms-pubs/about-form-3922)

---

## ⚠️ Disclaimer

This template is a planning reference, not tax advice. The Mathstub calculators it links to are estimates based on published IRS rules and your inputs. They do not consider state AMT (other than California), multi-state residency, NQDC interactions, or other facts a CPA would catch. For decisions involving real money, talk to a licensed tax professional.
