export const backdoorRothIraContent = {
  slug: 'backdoor-roth-ira',
  title: 'Backdoor Roth IRA Calculator',
  metaTitle: 'Backdoor Roth IRA Calculator (2025–2026) — Pro-Rata Rule Check',
  metaDescription:
    'Free calculator: see if you can do the Backdoor Roth IRA, how much pro-rata tax you owe if you have a pre-tax Traditional IRA balance, and 30-year compounding projections. 2025/2026 IRS limits.',
  h1: 'Backdoor Roth IRA Calculator',
  lede:
    'High earners over the Roth IRA income limit cannot contribute directly. The Backdoor Roth — non-deductible Traditional IRA contribution + immediate conversion — is the workaround. The catch: the pro-rata rule (IRC §408(d)(2)) blends ALL your Traditional IRAs together for tax purposes. Estimate yours below.',
  lastUpdated: '2026-05-22',
  taxYearDefault: 2026,
  howToSteps: [
    {
      name: 'Enter your MAGI and filing status',
      text: 'Modified Adjusted Gross Income drives the phaseout. Roth IRA direct contributions phase out from $153,000–$168,000 (single) or $242,000–$252,000 (MFJ) in 2026. Above the top number, only Backdoor is available.',
    },
    {
      name: 'Enter your pre-tax Traditional IRA balance',
      text: 'Sum of all your pre-tax Traditional IRA accounts (not Roth, not 401(k)). If $0, the pro-rata rule does not apply. If positive, the IRS blends it with your backdoor contribution for tax purposes.',
    },
    {
      name: 'Enter your marginal rate',
      text: 'Your federal marginal rate determines the pro-rata conversion tax owed. Use the rate the next dollar of ordinary income would hit.',
    },
    {
      name: 'Read your eligibility + tax + projection',
      text: 'The calculator shows direct vs. backdoor amounts, pro-rata tax owed, and 30-year compounding projection. If pro-rata tax is large, consider rolling your pre-tax Traditional IRA into your 401(k) BEFORE the conversion to isolate basis.',
    },
  ],
  faqs: [
    {
      q: 'What is the Backdoor Roth IRA, in one sentence?',
      a: 'Non-deductible Traditional IRA contribution ($7,500/yr in 2026; $8,600 if 50+) immediately converted to a Roth IRA, giving high earners a path into Roth space that is otherwise closed by the income phaseout. Cited: IRC §408A and §219; the strategy is implicit in the Tax Code post-2010 when the conversion income limit was repealed.',
    },
    {
      q: 'What is the pro-rata rule?',
      a: 'IRC §408(d)(2) treats all your Traditional, SEP, and SIMPLE IRAs as one pool when calculating the taxable portion of a Roth conversion. The taxable fraction = pre-tax balance / (pre-tax balance + after-tax basis). If you have $93k of pre-tax IRA and add a $7k after-tax contribution, then convert $7k, the IRS treats 93% of that conversion as taxable — even though your intent was to convert only the new after-tax contribution.',
    },
    {
      q: 'How do I escape pro-rata?',
      a: 'Roll your pre-tax Traditional IRA balance into a 401(k) BEFORE the conversion happens. 401(k) plans are NOT subject to pro-rata. The IRS measures pro-rata at year-end (Dec 31), so the roll must be complete by then. Some 401(k) plans accept incoming IRA rollovers; check yours. If your plan does not, you face a choice: pay the pro-rata tax (sometimes worth it long-term), or skip the Backdoor entirely.',
    },
    {
      q: 'Does Roth 401(k) and Roth IRA combine for pro-rata?',
      a: 'No. Roth 401(k) balances do not enter the pro-rata calculation. The rule only counts Traditional / SEP / SIMPLE IRAs. So having a $500k Roth 401(k) from years of contributions does not affect your Backdoor Roth IRA pro-rata math at all.',
    },
    {
      q: 'When should I convert — immediately or wait?',
      a: 'Immediately. The longer the gap between contribution and conversion, the more growth accumulates in the Traditional IRA, and that growth becomes taxable on conversion. Most Backdoor practitioners contribute and convert on the same day, or within a few days. The IRS does not require a waiting period under current guidance.',
    },
    {
      q: 'Do I file Form 8606?',
      a: 'Yes. Form 8606 reports the non-deductible contribution and the conversion. It tracks your after-tax basis across years. Skip this filing and the IRS treats your entire IRA as pre-tax — you pay tax twice. Most tax software handles 8606 automatically if you tell it you made a non-deductible contribution and a Roth conversion.',
    },
    {
      q: 'Is the Backdoor Roth legal?',
      a: 'Yes. The IRS confirmed in Notice 2018-11 and via informal guidance that the Backdoor Roth is a permissible interpretation of the post-2010 conversion rules. The Build Back Better Act would have eliminated it but did not pass. As of 2026, no enacted legislation bans it. Most fee-only fiduciary planners recommend it for high earners.',
    },
    {
      q: 'What is the "step transaction doctrine"?',
      a: 'A general tax-law principle that the IRS can collapse a multi-step transaction into its economic substance. Some advisors recommend a waiting period (a few weeks to a few months) between the contribution and conversion to avoid step-transaction risk. The IRS has not formally invoked the doctrine against Backdoor Roth in any reported case, and Notice 2018-11 implicitly endorsed the same-year flow.',
    },
    {
      q: 'Can my spouse do this too?',
      a: 'Yes. Each spouse has their own contribution + conversion limit. A MFJ couple can do $14,000 of Backdoor Roth ($16,000 if both are 50+). Spousal IRA rules also allow one earner to fund the non-working spouse\'s IRA up to the limit. The pro-rata rule is calculated separately per person.',
    },
    {
      q: 'Is this tax advice?',
      a: 'No — it is an estimate based on published IRS rules and your inputs. Specific situations (rollover timing, year-end IRA valuation, state-tax interactions, ACA subsidies affected by conversion income) need a CPA or fee-only fiduciary planner.',
    },
  ],
} as const;
