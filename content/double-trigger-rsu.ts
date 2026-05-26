export const doubleTriggerRsuContent = {
  slug: 'double-trigger-rsu',
  title: 'Double-Trigger RSU IPO/M&A Tax Calculator',
  metaTitle: 'Double-Trigger RSU Calculator — IPO + Acquisition Tax (2026)',
  metaDescription:
    'Free calculator for the double-trigger RSU tax bomb at IPO or acquisition. Computes taxable W-2 income, 22%/37% supplemental withholding, federal + state shortfall at marginal rate, sell-to-cover share count, net cash value.',
  h1: 'Double-Trigger RSU IPO/M&A Tax Calculator',
  lede:
    "When your pre-IPO startup goes public (or gets acquired), every time-vested RSU you hold becomes taxable W-2 income on the trigger date — all at once. The IRS supplemental withholding (22% federal, 37% above $1M YTD) almost always falls short of your real marginal rate. This calculator shows the gap before April so you can plan estimated payments or sell-to-cover.",
  lastUpdated: '2026-05-26',
  taxYearDefault: 2026,
  howToSteps: [
    {
      name: 'Find your time-vested shares released at trigger',
      text: 'Pull your equity statement — count the shares that had hit their service-vesting milestones AND were waiting on the liquidity event. These all release on the trigger date.',
    },
    {
      name: 'Enter the trigger-date FMV',
      text: 'IPO open price (for IPO trigger) or per-share deal price (for M&A trigger). Use the price your employer reports on the trigger-day RSU vest event.',
    },
    {
      name: 'Set your federal + state marginal rates',
      text: 'Most tech workers post-IPO are in the 35% or 37% federal bracket. State: CA 13.3% top marginal (13.3% supplemental 10.23%), NY 10.9% top, TX/NV/FL/WA 0%.',
    },
    {
      name: 'Read the shortfall + sell-to-cover share count',
      text: 'Federal shortfall = (marginal rate − supplemental rate) × taxable income. State shortfall same idea. Total = what you owe in April beyond withholding. Sell-to-cover = shares the broker auto-sells to cover withholding.',
    },
  ],
  faqs: [
    {
      q: 'What is a "double-trigger" RSU?',
      a: "Two events must both fire before an RSU vests: (1) time-based service vesting (e.g., 4-year schedule, 1-year cliff) AND (2) a liquidity event (IPO or M&A acquisition). Pre-IPO startups use double-trigger because if vesting happened on time alone, employees would owe ordinary-income tax on FMV at vest with no way to sell shares to pay it. Double-trigger defers the tax event to the day shares become sellable.",
    },
    {
      q: 'What is the trigger-day tax mechanic?',
      a: "On the trigger date (IPO open or M&A close), all time-vested RSUs release simultaneously. The FMV at release × your share count = ordinary W-2 income recognized that day. Federal supplemental withholding applies under IRC §3402(g) at 22% on the first $1M YTD, then 37% on the excess. State supplemental withholding varies — CA 10.23%, NY 11.7%, MA 5%, TX/NV/FL/WA 0%.",
    },
    {
      q: 'Why is supplemental withholding usually short of what I owe?',
      a: "Because the IRS supplemental rate (22% or 37%) is a default — not your real marginal rate. A senior engineer with $500k+ of double-trigger income at IPO is in the 37% federal bracket but only $1M of supplemental wages are taxed at 37%; the first $1M is at 22%. For a $700k double-trigger event on top of a $300k salary: first $700k of supplemental is at 22% (= $154k), but real owed is 37% (= $259k). Shortfall: $105k.",
    },
    {
      q: 'What is sell-to-cover?',
      a: "Your broker (Schwab, E*Trade, Fidelity, Morgan Stanley) auto-sells enough shares from the released batch to cover the total withholding (federal + state + FICA). The remaining shares are delivered to your brokerage account. Default behaviour at most large employers. You can opt for cash-payment-of-taxes if you have cash on hand, but most people sell-to-cover.",
    },
    {
      q: 'Should I sell more shares to cover the shortfall?',
      a: "It depends on concentration risk + lockup terms. Most IPOs have a 180-day lockup during which insiders cannot sell. If lockup ends in April (typically), you can sell then to cover the shortfall. If lockup ends after April 15, you need cash on hand for the shortfall — file a 4868 extension and pay the estimated tax with the extension request to avoid §6654 underpayment penalty.",
    },
    {
      q: 'What about Additional Medicare Tax?',
      a: "IRC §3101(b)(2) imposes an Additional Medicare Tax of 0.9% on wages above $200k single / $250k MFJ. For a $700k double-trigger event you'll owe ~$5k of Additional Medicare on top of FICA Medicare 1.45%. The calculator's federal marginal rate input should include this — bump it up 0.9 points if your double-trigger income pushes you above the threshold.",
    },
    {
      q: 'NIIT (Net Investment Income Tax) — does this apply?',
      a: "Not to the double-trigger W-2 income itself (NIIT only applies to investment income, IRC §1411). But if you then sell the released shares within 12 months at a gain, the short-term capital gain is subject to NIIT 3.8% on top of ordinary income tax (if your AGI is above the threshold). Hold for 1 year + 1 day to qualify for long-term capital gains treatment and the LTCG-NIIT-stack at 23.8% federal max.",
    },
    {
      q: 'M&A acquisition — is the math the same?',
      a: "Yes for the time-vested-but-not-liquid shares. M&A trigger pricing is usually the per-share deal price (cash deal) or the exchange-ratio × acquirer share price (stock deal). For stock deals, the calculator's triggerFmvUsd should be the cash-equivalent value of the acquirer shares received per unvested RSU. Acceleration provisions vary by employer — some accelerate all time-vested-but-unliquid shares (this calc's assumption), some accelerate ALL unvested shares regardless of service vesting (a much bigger bomb).",
    },
    {
      q: 'How is this different from the Mathstub RSU shortfall calculator?',
      a: "The RSU shortfall calc is for a single quarterly vest at a public company — small (~100 share) events. This calc is for the once-in-a-lifetime IPO/M&A trigger event when 5,000–50,000+ shares release at once. The math is the same supplemental-vs-marginal gap, but the scale (and the cash-on-hand requirements) is an order of magnitude bigger.",
    },
    {
      q: 'Is this tax advice?',
      a: "No — it's a planning estimate. Real outcomes depend on: lockup terms + 10b5-1 plan setup, ISO vs RSU vs NQSO grant composition (different rules), AMT exposure on any ISO portion, NIIT on subsequent sales, state-residency mid-year complexity if the IPO triggers a move, §83(b) elections on early-exercised options. For pre-IPO tax planning, engage a CPA who specialises in equity comp — typically before lockup expires.",
    },
  ],
} as const;
