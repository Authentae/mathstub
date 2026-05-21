export const megaBackdoorRothContent = {
  slug: 'mega-backdoor-roth',
  title: 'Mega-Backdoor Roth Calculator',
  metaTitle: 'Mega-Backdoor Roth Calculator (2025–2026) — After-Tax 401(k) Room',
  metaDescription:
    'Free calculator to estimate your Mega-Backdoor Roth room. Plug in your 401(k) elective deferral + employer match — see exactly how much after-tax space your plan leaves under the $70k §415 cap. 2025/2026 IRS limits.',
  h1: 'Mega-Backdoor Roth Calculator',
  lede:
    'Most high earners are blocked from direct Roth IRA contributions. The Mega-Backdoor Roth — funded via after-tax 401(k) contributions that get converted to Roth — lets you save up to ~$46,500 more in Roth space each year, on top of the standard $23,500 elective deferral. Estimate yours below.',
  lastUpdated: '2026-05-22',
  taxYearDefault: 2026,
  howToSteps: [
    {
      name: 'Pick your tax year',
      text: 'Limits update each year. The §415 overall cap was $70,000 in 2025 — the calculator handles 2024–2026.',
    },
    {
      name: 'Enter your elective deferral',
      text: 'Your year-to-date pre-tax + Roth 401(k) deferral combined. Cap is $23,500 in 2025 ($31,000 with the 50+ catch-up; $34,750 if you are 60–63 via SECURE 2.0 super catch-up).',
    },
    {
      name: 'Add your employer match',
      text: 'Annual employer match $. This counts against the §415 ceiling.',
    },
    {
      name: 'Confirm plan eligibility',
      text: 'Two things must be true: (1) your plan allows after-tax (non-Roth) employee contributions, and (2) the plan supports in-service distributions OR in-plan Roth conversions. Both flags must be ON or the Mega-Backdoor is blocked.',
    },
    {
      name: 'Read your room + projection',
      text: 'See exactly how many dollars of after-tax room remain under §415, plus a 25-year compounding projection at 7% — both one-time and recurring annual.',
    },
  ],
  faqs: [
    {
      q: 'What is a Mega-Backdoor Roth, in one sentence?',
      a: 'You make after-tax (non-Roth) contributions to your 401(k), then convert them to a Roth IRA or Roth 401(k) — turning ~$30–50k/yr of additional space into tax-free retirement growth. The math is governed by IRC §415(c) (the $70k overall cap) and IRS Notice 2014-54 (the basis-isolation rule for the conversion).',
    },
    {
      q: 'How is this different from a Backdoor Roth IRA?',
      a: 'The Backdoor Roth IRA is the $7,000/yr ($8k if 50+) Traditional-IRA-to-Roth-IRA workaround for high earners. The Mega-Backdoor uses your employer 401(k) and unlocks an order of magnitude more space ($30–46k/yr typically). They are independent — you can do both in the same year.',
    },
    {
      q: 'How do I know if my plan allows after-tax contributions?',
      a: 'Read your Summary Plan Description (SPD), check your 401(k) provider portal under "Contribution Sources" (look for "After-Tax" alongside "Pre-Tax" and "Roth"), or ask your HR/benefits team directly. Common employers that allow it: Google, Microsoft, Meta, Netflix, Amazon (varies by group), Salesforce, most large tech. Many smaller employers do not. About 50% of plans offer after-tax per Vanguard\'s How America Saves 2024 report — but only a subset of those also allow conversion.',
    },
    {
      q: 'What is "in-service distribution" or "in-plan Roth conversion"?',
      a: 'Two mechanisms to move after-tax money to Roth: (a) in-service distribution — pulling the after-tax balance out of your 401(k) while still employed, rolling it to a Roth IRA. (b) In-plan Roth Rollover (IRR) — converting the after-tax sub-account to a Roth 401(k) sub-account without leaving the plan. Either one works. Without one of them, your after-tax money grows tax-deferred (not tax-free), which is much worse than just contributing to a regular brokerage.',
    },
    {
      q: 'Should I convert immediately or let after-tax grow first?',
      a: 'Convert immediately. If you let after-tax money grow before converting, the growth becomes taxable upon conversion (treated as pre-tax earnings under IRC §72). Most plans support automated periodic conversion (sometimes called "auto-conversion" or "Roth in-plan conversion every pay period") — turn it on if available. Otherwise convert manually after each contribution.',
    },
    {
      q: 'What if my employer match counts against the §415 limit?',
      a: 'It always does. The $70k §415(c) limit includes: your elective deferral (pre-tax + Roth 401(k) combined, capped at $23,500), your employer match, employer non-elective / profit-sharing contributions, and your after-tax contributions. The calculator subtracts everything except the after-tax to give you the available room.',
    },
    {
      q: 'I am 50+ — does the catch-up change my Mega-Backdoor room?',
      a: 'The catch-up contribution ($7,500 in 2025, or $11,250 super-catch-up if 60–63 under SECURE 2.0) is itself "elective deferral" that counts against your personal $23,500 limit BUT the §415 overall limit ($70k) is also raised by the catch-up amount. Net result: 50+ filers have roughly the same Mega-Backdoor room as under-50, with slightly different elective-deferral capacity.',
    },
    {
      q: 'What about the pro-rata rule?',
      a: 'The pro-rata rule (IRC §72(d)) only matters when you have BOTH pre-tax AND after-tax money in the same account at the time of a partial conversion. The Mega-Backdoor flow specifically isolates after-tax via the basis-isolation rule in IRS Notice 2014-54 — when you convert/distribute the after-tax sub-account separately, no pro-rata. The pro-rata rule does affect the Backdoor Roth IRA (different calculator), so do not confuse the two.',
    },
    {
      q: 'Can I do this if I am self-employed?',
      a: 'Yes — via a Solo 401(k) that allows after-tax contributions, but only specific Solo 401(k) providers offer this (Schwab and most banks DO NOT; specialty providers like My Solo 401k Financial, Carry, and a few others DO). Plan setup is more complex than a regular Solo 401(k) — the plan document needs explicit after-tax and Roth-conversion language.',
    },
    {
      q: 'What is the tax treatment of growth?',
      a: 'Tax-free at withdrawal, assuming you follow the Roth qualification rules: (1) Roth IRA / Roth 401(k) must be open for 5+ years, (2) you must be 59½ or qualify under an exception. The "5-year clock" is per-account for Roth IRAs and per-conversion for Roth 401(k)s — be careful if you plan early withdrawal. The Mega-Backdoor principal can be withdrawn anytime (Roth contributions are always accessible); only the growth is locked until 59½.',
    },
    {
      q: 'Is this tax advice?',
      a: 'No — it is an estimate based on published IRS rules and your inputs. Plan-specific rules vary (some plans have lower internal caps, ERISA non-discrimination testing limits, top-heavy plan restrictions). For your specific situation, talk to a licensed tax professional or a fee-only fiduciary financial planner.',
    },
  ],
} as const;
