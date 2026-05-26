export const rothSequencerContent = {
  slug: 'roth-sequencer',
  title: 'Backdoor + Mega-Backdoor Roth Sequencing Optimizer',
  metaTitle: 'Backdoor + Mega-Backdoor Roth Sequencer — Which First? (2026)',
  metaDescription:
    'Combine the Backdoor Roth IRA + Mega-Backdoor Roth into one decision. Sequenced steps: when basis isolation comes first (pre-tax IRA + pro-rata rule), when Mega-Backdoor wins, total Roth capacity per year.',
  h1: 'Backdoor + Mega-Backdoor Roth Sequencer',
  lede:
    'Mathstub already has a Mega-Backdoor Roth calculator and a Backdoor Roth IRA calculator. This calculator answers the OR question: should I do both? Which first? And if I have a pre-tax IRA balance, does the pro-rata rule break the traditional Backdoor — and what is the basis-isolation move that unlocks it?',
  lastUpdated: '2026-05-26',
  taxYearDefault: 2026,
  howToSteps: [
    {
      name: 'Enter your high-level financial picture',
      text: 'Filing status, age, MAGI (modified AGI from your last 1040), your federal marginal rate (typically 0.24, 0.32, or 0.35), and any pre-tax Traditional IRA balance.',
    },
    {
      name: 'Enter your 401(k) plan setup',
      text: 'Annual elective deferral (often $23,500 in 2026), employer match $, plan flags: allows after-tax contributions? allows in-service distribution OR in-plan Roth conversion? accepts rollovers IN (the receiver side of basis isolation)?',
    },
    {
      name: 'Read the sequenced steps',
      text: 'Up to 3 steps in order: basis isolation (if needed), Mega-Backdoor, Backdoor IRA. Each step shows the dollar capacity unlocked + the IRC citation + the blocker if any.',
    },
    {
      name: 'Add the steps to your year-end plan',
      text: 'Total annual Roth capacity headline at the top. Most $200k+ tech workers will see between $35,500 and $42,500 of new Roth space per year between the two paths.',
    },
  ],
  faqs: [
    {
      q: 'Should I do Mega-Backdoor or Backdoor IRA first?',
      a: "Mega-Backdoor first — it's a much bigger number per year (typically $35,500 in 2026 vs $7,000 for the IRA Backdoor) and the §415(c) limit is calendar-year — unused room can't be carried forward. Do Mega-Backdoor by Dec 31 to capture the year, then do Backdoor IRA anytime (you have until April 15 of the following year for prior-year contributions).",
    },
    {
      q: "What's the pro-rata rule and why does it 'break' the Backdoor?",
      a: "IRC §408(d)(2) — when you do a Roth conversion of any Traditional IRA money, the IRS treats ALL your Traditional IRA balances as a single pool. Suppose you have $50,000 pre-tax in a SEP-IRA + $7,000 nondeductible from this year's Backdoor contribution. Pro-rata says 50/57 = 87.7% of any conversion is taxable. Doing a Backdoor here costs you ($7,000 × 87.7%) × your marginal rate ≈ $2,000 in conversion tax. That's the pro-rata 'break.'",
    },
    {
      q: 'What is basis isolation?',
      a: "Rolling your pre-tax Traditional IRA balance INTO your 401(k) before doing the Backdoor conversion. The §408(d) pro-rata pool is computed across IRAs only — 401(k) balances are NOT included. So once the pre-tax money is inside the 401(k), the Backdoor conversion pool is just your $7,000 of nondeductible basis, pro-rata is clean, and the conversion is $0 taxable. Requires that your 401(k) plan accepts rollovers IN — not all plans do.",
    },
    {
      q: 'My plan does not accept rollovers in — am I stuck?',
      a: 'You have three options: (1) skip the Backdoor IRA and rely on Mega-Backdoor only — most of the Roth capacity comes from Mega anyway; (2) ask your plan administrator to enable rollover-in (sometimes possible via plan amendment); (3) do a one-time Roth conversion on the entire pre-tax balance and pay the tax — clears the pool permanently. Option 3 is expensive but makes future Backdoor conversions clean forever.',
    },
    {
      q: "What if my MAGI is below the Roth IRA phaseout?",
      a: "You do not need the Backdoor at all — just contribute directly to your Roth IRA. The calculator detects this and shows the 'Direct Roth IRA' step instead. 2026 phaseouts: single $150k–$165k, MFJ $236k–$246k. Below the lower bound = full direct contribution; in the band = partial; above = backdoor required.",
    },
    {
      q: "How is this different from running the 2 standalone calcs?",
      a: "Both standalone calcs answer 'how much can I contribute via THIS path?' This sequencer answers the sequencing question — basis isolation order, which path to prioritise, and whether your plan setup blocks one of them. The total combined Roth-per-year figure is the headline you actually need for year-end planning.",
    },
    {
      q: "Mega-Backdoor + Backdoor IRA = how much Roth per year for a typical tech worker?",
      a: "For a $300k–$700k MFJ tech worker with: $23,500 elective deferral + $11,000 employer match + plan supports after-tax + plan supports in-service distribution: Mega-Backdoor ≈ $35,500 + Backdoor IRA ≈ $7,000 = $42,500/yr of new Roth space. Over a 30-year career at 7%: ~$4.3M of tax-free retirement savings on top of your regular 401(k).",
    },
    {
      q: 'Does Mega-Backdoor count against my Roth IRA limit?',
      a: "No — they are separate buckets. The Roth IRA $7,000 limit (IRC §408A) and the §415(c) $70,000 cap (which controls Mega-Backdoor room) are distinct. You can fill both in the same year. The §402(g) $23,500 elective deferral limit is yet a third bucket, also separate.",
    },
    {
      q: 'What happens if my employer match is large?',
      a: "Big match shrinks the Mega-Backdoor room dollar-for-dollar. Example: employer match $30,000 + elective deferral $23,500 = $53,500 used; §415(c) cap $70,000 leaves $16,500 of after-tax room. The math is fully mechanical — the calculator computes this for you.",
    },
    {
      q: "What's NOT covered here?",
      a: 'In-plan Roth 401(k) conversion strategy (a different mechanic), governmental 457 plans, 403(b) considerations for non-profit employees, SEP-IRA / SIMPLE IRA contributions, conversions of OLD Traditional IRA balances (the one-time pre-Backdoor cleanup), and the conversion ladder strategy for early-retirement access (IRC §72(t)). For those, talk to a CPA who specialises in equity-comp + retirement planning — the Mathstub /about page links a CPA-matching affiliate.',
    },
    {
      q: 'Is this tax advice?',
      a: "No — it's a planning calculator. Real decisions depend on facts the calculator does not capture (state tax interactions, conversion-year vs. distribution-year planning, expected future marginal rate, plan-specific rules). For high-stakes decisions ($25k+ of Roth capacity at stake) engage a CPA or fiduciary planner.",
    },
  ],
} as const;
