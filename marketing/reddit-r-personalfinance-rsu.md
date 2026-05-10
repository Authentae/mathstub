# r/personalfinance draft — RSU withholding shortfall

**Subreddit:** r/personalfinance
**Best post day/time:** Tuesday or Wednesday, 8–10am ET (highest organic engagement, mods are awake)
**Length:** ~900 words
**Flair:** Taxes
**Goal:** front page of /r/personalfinance for ~24h, ~5–15k visitors to mathstub.com

---

## Title (pick one)

A. **Why your RSU vest will probably leave you owing more taxes than you think — the supplemental withholding gap, with worked math**

B. **PSA for anyone with RSUs: the 22% your employer withholds is almost never enough. Here's the math, and the fix.**

C. **My $50k RSU vest left me owing $6k in April. Here's exactly why, and how to avoid the same surprise.**

I'd lead with **C** — personal story angles convert higher on PF.

---

## Body

> Posting because I see a version of this question every quarter and the answer keeps getting buried. Hopefully this saves a few people a surprise April bill.

**The setup**

If you get RSUs, your company runs them through payroll as "supplemental wages." Per IRS Pub 15 and Treas. Reg. §31.3402(g)-1, that means a flat **22% federal withholding** rate up to $1M of YTD supplemental wages, then 37% above.

That 22% number is set by the IRS. It's not your employer being cheap. It's not negotiable. It applies the same to a $5k vest and a $500k vest.

**The problem**

22% is almost never your real marginal rate. If you're a tech worker making, say, $200k base + a vest that pushes you to $250k taxable, your federal marginal rate is **32%** in 2025. Some of you are at 35% or 37%.

The IRS doesn't care that 22% was withheld. At filing, they apply your real marginal rate to the income. The shortfall lands in your lap on April 15.

**Worked example — the case that got me**

- Base: $200,000 (already past the SS wage base by Q4)
- One RSU vest: $50,000 in fair market value at vest
- Filing: single, California
- Pre-tax 401(k): $23,500

What the employer withheld:

```
Federal (22% × $50,000)              = $11,000
California supplemental (10.23%)     = $5,115
FICA: SS already maxed → $0
       Medicare 1.45% × $50k         = $725
       Add'l Medicare 0.9% × $50k    = $450  (income > $200k threshold)
                                     -------
Total withheld at vest               = $17,290
```

What I actually owed on that $50k:

```
Projected total taxable income: $200k + $50k − $23.5k 401k − $15k std ded = $211,500
Federal marginal rate at $211,500 (single, 2025): 32%

Federal at marginal: 50,000 × 0.32   = $16,000
California marginal (12.3%):         = $6,150
FICA (same as withheld):             = $1,175
                                     -------
Total actually owed                  = $23,325
```

**Shortfall: $23,325 − $17,290 = $6,035.**

That $6k showed up at filing. With penalties for underpayment of estimated tax, it was closer to $6,400.

**Why this matters**

IRC §6654 imposes an underpayment penalty if you owe more than $1,000 at filing AND haven't met the safe harbor: paid in either 90% of this year's tax, OR 100% of last year's (110% if your prior-year AGI was over $150k).

A 5-figure RSU vest blows past the $1k threshold by itself. So if you don't proactively top up withholding or send an estimated payment, you're not just owing the gap — you're owing the gap plus a penalty.

**The fixes (pick one or combine)**

1. **Update Form W-4, Line 4(c)** — extra federal withholding per paycheck. Math: take the projected gap, divide by remaining bi-weekly paychecks. So in my case, $6,035 ÷ ~13 paychecks left = $464/paycheck extra. Submit to payroll, done. Treats the whole amount as evenly-paid throughout the year for §6654 purposes.

2. **Send a quarterly estimated payment.** IRS Direct Pay, choose "estimated tax." Due dates April 15, June 15, Sept 15, Jan 15. This works but the IRS counts it as paid in the quarter sent — so a Q4 estimate covering a Q1 vest still leaves you exposed to penalty for Q1–Q3 (unless you use Form 2210 Schedule AI annualized-income method, which is its own can of worms).

3. **Sell-to-cover at vest, then ALSO send an estimate.** Some brokers let you sell more shares than the 22% to bring withholding closer to your marginal rate. Combined with a small Q-end estimate, this is what most people I know end up doing.

**Things people get wrong**

- *"I'll just owe a lot in April, no big deal."* That's the §6654 penalty trap. The IRS rate is short-term + 3% (~8% in 2025). On a $10k underpayment that's another $800.
- *"My broker withholds at my marginal rate."* No they don't. They run payroll at 22% / 37% supplemental per IRS rule. Your actual marginal rate isn't visible to payroll.
- *"I'll fix it when I file."* Filing is when you discover it. The fix has to happen during the year you got vested.

**How to figure out your number**

You need three things:

1. Your YTD W-2 wages + this vest's gross
2. Your filing status + state
3. Your pre-tax deductions (401(k), HSA)

Run those through the federal bracket math (2025 brackets are in IRS Rev. Proc. 2024-40). Subtract the supplemental withholding your broker already took. The difference is your shortfall.

I built a free calculator that does this and adds the FICA + state pieces because doing it by hand is annoying: **mathstub.com/rsu-tax-shortfall**. Same math as above, no signup, no ads in the calculator (the rest of the site has ads — that's how it stays free). It also tells you the per-paycheck W-4 line 4(c) number to add.

There are other calculators that do similar things — TurboTax Tax Caster has a version, Carta has one for their users. The math is public domain. The point is: do the math somewhere before December, not in April.

Happy to answer questions in the thread.

---

## Notes for posting

- **Don't link mathstub.com in the title.** Keep it natural in the body, ~80% through the post. Reddit shadow-bans posts that look like ads.
- **Don't reply to "what's mathstub" with a sales pitch.** Reply with the calculator URL only when someone explicitly asks for the link.
- **Cross-post to r/cscareerquestions and r/financialindependence** 12–24 hours later (Reddit treats simultaneous cross-posts as spam).
- **Engage in the comments for the first 4 hours.** Mods notice low-engagement posts and demote them. Answer 3–5 substantive questions, even if it's redirecting to the calculator.
- **Disclosure if asked:** "Yeah, I built it — it's free, ad-supported. Not pretending otherwise." Honesty preempts mod removal.
