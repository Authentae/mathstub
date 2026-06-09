# r/personalfinance draft — RSU withholding shortfall

**Subreddit:** r/personalfinance
**Best post day/time:** Tuesday or Wednesday, 8–10am ET
**Length:** ~850 words
**Flair:** Taxes
**Goal:** front page of /r/PF for ~24h, ~5–15k visitors to mathstub.com
**Voice:** non-CPA founder of a free calculator. Educational, no fake personal anecdote.

---

## Title

**Why your RSU vest will probably leave you owing more taxes than you think — the supplemental withholding gap, with worked math**

(Keeps it informational, no clickbait. Mods like this kind of title.)

---

## Body

> Posting because some version of "I just got my RSU vest and now I owe $X in April, what do I do?" hits this sub roughly every other week. Hopefully this saves a few people the surprise. I'm not a CPA — I built a free calculator (linked at the bottom) because the math was annoying to do by hand. Math first, then the link.

**The setup**

If you get RSUs, your company runs them through payroll as "supplemental wages." Per IRS Pub 15 and Treas. Reg. §31.3402(g)-1, that means a flat **22% federal withholding** rate up to $1M of YTD supplemental wages, then 37% above.

That 22% number is set by the IRS. It's not your employer being cheap. It's not negotiable. It applies the same to a $5k vest and a $500k vest.

**The problem**

22% is almost never your real marginal rate. If you make $200k base + a vest that pushes you to $250k taxable, your federal marginal rate is **32%** in 2026. Some of you are at 35% or 37%.

The IRS doesn't care that 22% was withheld. At filing, they apply your real marginal rate to the income. The shortfall lands in your lap on April 15.

**Worked example — the typical case**

- Base: $200,000 (already past the SS wage base by Q4)
- One RSU vest: $50,000 in fair market value at vest
- Filing: single, California
- Pre-tax 401(k): $23,500

What the employer withholds:

```
Federal (22% × $50,000)              = $11,000
California supplemental (10.23%)     = $5,115
FICA: SS already maxed → $0
       Medicare 1.45% × $50k         = $725
       Add'l Medicare 0.9% × $50k    = $450  (income > $200k threshold)
                                     -------
Total withheld at vest               = $17,290
```

What you actually owe on that $50k:

```
Projected total taxable income: $200k + $50k − $23.5k 401k − $15k std ded = $211,500
Federal marginal rate at $211,500 (single, 2025): 32%

Federal at marginal: 50,000 × 0.32   = $16,000
California marginal (12.3%):         = $6,150
FICA (same as withheld):             = $1,175
                                     -------
Total actually owed                  = $23,325
```

**Shortfall: $23,325 − $17,290 = $6,035** on this one vest.

That $6k shows up at filing. With penalties for underpayment of estimated tax, it's closer to $6,400.

**Why this matters beyond just "owing money"**

IRC §6654 imposes an **underpayment penalty** if you owe more than $1,000 at filing AND haven't met the safe harbor: paid in either 90% of this year's tax, OR 100% of last year's (110% if your prior-year AGI was over $150k).

A 5-figure RSU vest blows past the $1k threshold by itself. So if you don't proactively top up withholding or send an estimated payment, you're not just owing the gap — you're owing the gap plus a penalty (~7% annualized in early 2026, 6% from Q2, per IRC §6621).

**The fixes (pick one or combine)**

1. **Update Form W-4, Line 4(c)** — extra federal withholding per paycheck. Math: take the projected gap, divide by remaining bi-weekly paychecks. So in the example: $6,035 ÷ ~13 paychecks = $464/paycheck extra. Submit to payroll, done. Treats the whole amount as evenly-paid throughout the year for §6654 purposes.

2. **Send a quarterly estimated payment** via IRS Direct Pay → "estimated tax." Due dates April 15, June 15, Sept 15, Jan 15. This works but the IRS counts it as paid in the quarter sent — so a Q4 estimate covering a Q1 vest still leaves you exposed to penalty for Q1–Q3 (unless you use Form 2210 Schedule AI annualized-income method, which is its own can of worms).

3. **Sell-to-cover at vest, then ALSO send an estimate.** Some brokers let you sell more shares than the 22% to bring withholding closer to your marginal rate. Combined with a small Q-end estimate, this is what most people end up doing.

**Things people get wrong**

- *"I'll just owe a lot in April, no big deal."* That's the §6654 penalty trap. The IRS rate is short-term + 3 percentage points (~7% in early 2026, 6% from Q2). On a $10k underpayment that's ~$700 extra.
- *"My broker withholds at my marginal rate."* No they don't. They run payroll at 22% / 37% supplemental per IRS rule. Your actual marginal rate isn't visible to payroll.
- *"I'll fix it when I file."* Filing is when you discover it. The fix has to happen during the year you got vested.
- *"This only matters for huge vests."* Wrong. The $1k §6654 floor is low. A $20k vest in a 32% bracket already trips it.

**How to figure out your number**

You need three things:

1. Your YTD W-2 wages + this vest's gross
2. Your filing status + state
3. Your pre-tax deductions (401(k), HSA)

Run those through the federal bracket math (2026 brackets are in IRS Rev. Proc. 2025-32), subtract the supplemental withholding your broker already took. The difference is your shortfall.

I built a free calculator that does this and adds the FICA + state pieces because doing it by hand is annoying: **mathstub.com/rsu-tax-shortfall**. Same math as above, no signup. The site has ads (that's how it stays free) but the calculators don't. It also outputs the per-paycheck W-4 line 4(c) number to add.

There are other tools that do similar things — TurboTax has a Tax Caster, Carta has one for users, your CPA can run it for you. The math is public domain. The point is: do the math somewhere before December, not in April.

Happy to answer questions.

---

## How to handle common comment patterns

**"Is this a promo?"**
> Yes, I built it. It's free, ad-supported on the rest of the site. Math is public-domain IRS Pub 505 / §3402(g). Happy to delete the link if mods prefer.

**"Are you a CPA?"**
> No. I'm not licensed to give tax advice. The calculator is for planning estimates only — every page on the site says that. For decisions involving real money, talk to a CPA. The math itself is from IRS publications.

**"Why not just disable the link?"**
> Fair. Mods, if you want me to drop the link, I will — keeping the educational post stands either way.

**"What's the tax software equivalent?"**
> TurboTax Premier and TaxAct Premier both handle RSU/ESPP/ISO at filing time. The calculator is for *during the year* — figuring out withholding gaps before you file. Different point in the workflow.

**"What about [edge case: vest crosses $1M threshold / state X / NQDC]?"**
> Good question — the calculator handles the $1M federal threshold blend. State coverage is top-marginal-rate per state with overrides for CA's mental-health surtax and NY's supplemental rate. NQDC isn't modeled. Multi-state residency isn't modeled. For those, talk to a CPA.

**"Source code?"**
> Tax modules will go up on GitHub once I've stress-tested through one more tax season. Not opening it now because I want to refactor before public eyes.

---

## Posting checklist

- [ ] Reddit account has at least 10 karma (preferably 100+) and isn't brand new
- [ ] Posted from your normal account, not a new throwaway
- [ ] You can sit with the post for 30–60 min after submission to reply
- [ ] Calculator URL works (test mathstub.com/rsu-tax-shortfall in incognito before posting)
- [ ] You're ready to say "no, I'm not a CPA" if asked

## Don't

- Don't put the URL in the title
- Don't reply to "is this an ad" with sales pitch — admit it's yours, calmly
- Don't edit the post 30 min after submitting (algorithm punishes)
- Don't cross-post to other subs same day
