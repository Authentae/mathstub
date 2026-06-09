# r/personalfinance draft — Bonus tax withholding gap

**Subreddit:** r/personalfinance
**Best post day/time:** Tuesday or Wednesday, 8–10am ET
**Length:** ~700 words
**Flair:** Taxes
**Goal:** different angle than the RSU post — targets every employee with a cash bonus (much wider audience than equity-comp).
**Voice:** non-CPA founder of a free calculator. Educational, no fake personal anecdote.

---

## Title

**The 22% bonus withholding rate is not a tax — it's an estimate, and for most people it's wrong**

(Gets the click because most people don't know "22% on bonuses" isn't your actual rate. Mods like declarative titles.)

---

## Body

> Posting because "I got a $X bonus, my employer took 22%, and now I owe taxes in April" hits this sub constantly. The 22% number is a default the IRS chose, not a tax. I built a free calculator (linked at the end) — math first.

**The setup**

When your employer pays you a cash bonus — sign-on, performance, retention, year-end, doesn't matter — they have to withhold federal tax on it. Per IRS Pub 15 (Employer's Tax Guide) and Treas. Reg. §31.3402(g)-1, bonuses are "supplemental wages" and the default federal withholding rate is **22%** flat (37% on the portion above $1M YTD).

That 22% number is set by the IRS. It's not your employer being cheap. It's not negotiable. And it's almost never your actual marginal rate.

**Why 22% is wrong for you**

Your real federal marginal rate is whatever bracket your total annual income lands in. For 2026 single filers:

- 22% bracket: $50,400 – $105,700
- 24% bracket: $105,700 – $201,775
- 32% bracket: $201,775 – $256,225
- 35% bracket: $256,225 – $640,600
- 37% bracket: above $640,600

If your total income for the year is $130k and your bonus pushes you to $150k, your marginal rate is 24%, not 22%. The 2 percentage points come out of your pocket at filing.

If you're a higher earner ($200k+), the gap is 10+ percentage points.

**Worked example — a typical case**

- Base salary: $130,000
- Bonus: $20,000
- Filing: single, lives in a state with 5% income tax
- Pre-tax 401(k): $15,000 YTD

What the employer withholds on the bonus:

```
Federal: 22% × $20,000               = $4,400
State: ~5% × $20,000                 = $1,000
FICA: 6.2% SS × 20k (under cap)     = $1,240
       1.45% Medicare × 20k          = $290
                                     -------
Total withheld at bonus              = $6,930
```

What you actually owe on the bonus at year-end:

```
Projected taxable income: $150k − $15k 401k − $16,100 std ded = $118,900
Federal marginal rate at $118,900 (single, 2026): 24%

Federal at marginal: 20,000 × 0.24    = $4,800
State at ~5%:                         = $1,000
FICA (same):                          = $1,530
                                      -------
Total actually owed                   = $7,330
```

**Shortfall: $7,330 − $6,930 = $400** on this one bonus.

Small? Sure. But add a $400 surprise on top of normal April reconciliation, and now you're writing a $1,200+ check instead of getting the refund you expected.

**Where it gets ugly**

For tech workers, finance, sales — anyone with a base over $200k and a meaningful annual bonus — the gap is much bigger. A $50k bonus on a $250k base in a high-tax state can produce a $5–8k shortfall. Add the IRC §6654 underpayment penalty (~7% annualized in early 2026, 6% from Q2) for not paying enough during the year and you have a real problem.

**The §6654 underpayment penalty trap**

The IRS imposes an underpayment penalty if you owe more than $1,000 at filing AND haven't met the safe harbor: paid in either 90% of this year's tax, OR 100% of last year's (110% if your prior-year AGI was over $150k).

A bonus shortfall of even $1,500 trips this if you haven't otherwise overpaid through regular paycheck withholding. The IRS rate is short-term + 3 percentage points (~7% in Q1 2026, 6% in Q2). On a $5k underpayment that's ~$350 extra you didn't budget for.

**The fixes (pick one or combine)**

1. **Update Form W-4, Line 4(c)** — extra federal withholding per remaining paycheck. Math: shortfall ÷ paychecks left. So in our example: $400 ÷ ~10 paychecks = $40/paycheck extra. Submit to payroll. The IRS treats W-4 withholding as evenly paid throughout the year for §6654 purposes.

2. **Send a quarterly estimated payment** via IRS Direct Pay → "estimated tax." Due dates April 15, June 15, Sept 15, Jan 15. Caveat: the IRS counts it as paid in the quarter sent — so a Q4 estimate covering a Q1 bonus still leaves you exposed to penalty for Q1–Q3 unless you use Form 2210 Schedule AI annualized-income method.

3. **Sell-to-cover (RSU only)** — N/A for cash bonuses, but worth knowing if you also have RSU vests.

**Things people get wrong**

- *"Bonuses are taxed at a higher rate."* False. They're WITHHELD at 22% (or 37% for high earners). The actual TAX is your marginal rate. If anything, the withholding under-collects for higher earners.
- *"I'll just owe a lot in April, no big deal."* That's the §6654 penalty trap.
- *"My employer should have withheld more."* They literally can't — the supplemental rate is set by federal regulation, not company policy. If you want more withheld, file an updated W-4.
- *"This only matters for huge bonuses."* The $1,000 §6654 floor is low. A $20k bonus in a 24% bracket already trips it.

**How to figure out your number**

You need:

1. Bonus amount + YTD wages
2. Filing status + state
3. Pre-tax deductions (401(k), HSA)

Run those through the federal bracket math (2026 brackets are in IRS Rev. Proc. 2025-32), subtract the 22% your employer already withheld, add state. The difference is your shortfall.

I built a free calculator that does this and adds the FICA + state pieces: **mathstub.com/bonus-tax-shortfall**. No signup, runs in your browser. Site has ads (that's how it stays free) but the calculators don't.

There are similar tools — TurboTax has one, your CPA can run it for you, online bracket calculators get close. The math is public domain. The point is: do the math somewhere before December, not at filing time in April.

Happy to answer questions.

---

## Comment-pattern responses

**"Is this a promo?"**
> Yes, I built it. It's free, ad-supported on the rest of the site. Math is public-domain IRS Pub 15 / Reg. §31.3402(g)-1. Mods, happy to drop the link if you want.

**"I always thought bonuses were taxed at a higher rate?"**
> Common misconception. Bonuses are WITHHELD at 22% federal flat (37% above $1M YTD). The actual TAX is your normal marginal rate when you file. So bonuses aren't "taxed higher" — they're just under-withheld for most people.

**"What if my employer uses the aggregate method?"**
> Some employers do — they treat the bonus as part of your next regular paycheck and withhold at your normal payroll rate. This usually withholds MORE than the flat 22% method. If your bonus showed up on your normal paycheck and the withholding looked higher than 22%, you're probably on the aggregate method and the shortfall (if any) will be smaller. The calculator assumes the flat-rate method since that's what most large payrolls default to.

**"Are you a CPA?"**
> No. I'm not licensed to give tax advice. The calculator is for planning estimates only — every page on the site says that. The math itself is from IRS publications. For real-money decisions, talk to a CPA.

---

## Posting checklist

- [ ] Reddit account has at least 10 karma (preferably 100+)
- [ ] Posted from your normal account, not a throwaway
- [ ] Available to reply for 30–60 min after submission
- [ ] Calculator URL works (test mathstub.com/bonus-tax-shortfall in incognito before posting)
- [ ] You're ready to say "no, I'm not a CPA" if asked

## Don't

- Don't put the URL in the title
- Don't reply to "is this an ad" with sales pitch — admit it's yours, calmly
- Don't edit the post 30 min after submitting (algorithm punishes)
- Don't cross-post to other subs same day
