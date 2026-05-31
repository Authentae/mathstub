import type { BlogPost } from '../registry';

export const supplementalRule: BlogPost = {
  slug: '22-vs-37-supplemental-withholding',
  title: '22% vs 37% supplemental wage withholding, explained',
  description:
    'The IRS supplemental-wage rule taxes your RSU and bonus payments at 22% — until you cross $1M in YTD supplemental wages, when it jumps to 37%. Here is exactly how the threshold works, including the multi-employer edge case and what to do when 37% is still not enough.',
  datePublished: '2026-04-18',
  dateModified: '2026-05-19',
  authorName: 'Mathstub Editorial',
  reviewerName: 'Reviewed against IRS primary sources',
  affiliateOfferIds: ['turbotax-premier', 'harness-wealth'],
  quickAnswer:
    'Employers withhold federal tax on bonuses and RSU vests at a flat 22% on the first $1,000,000 of supplemental wages paid in a calendar year, then 37% on every dollar above that. The threshold is per-employee per-employer per-year, not per-payment. Multi-employer mid-year switches reset the counter, which can create an under-withholding gap. Rule: Treas. Reg. §31.3402(g)-1; IRS Pub 15-T.',
  keyPoints: [
    'Bonuses and RSU vests are withheld at a flat 22%, then 37% past $1M in a year.',
    'That $1M limit resets for each employer — so switching jobs mid-year can under-withhold a lot.',
    'These flat rates are usually too low if your real tax bracket is higher than 22%.',
    'At the very top, even 37% misses state, Medicare, and local taxes that stack on top.',
    'Fix a shortfall before Dec 31: add extra withholding on your W-4 or pay the IRS directly.',
  ],
  blocks: [
    {
      type: 'p',
      text:
        'A "supplemental wage" is just any pay you get on top of your normal salary. Think bonuses, commissions, severance, a payout for unused vacation days, and RSU vests. The IRS has a special rule for how your employer holds back tax on this kind of pay, and the shape of it is simple: **22% gets taken out, until your supplemental pay for the year passes $1 million — then it jumps to 37%.**',
    },
    {
      type: 'p',
      text:
        'Sounds easy. The part that trips people up is *when* that $1M line gets crossed, especially if you have more than one employer in a year, switch jobs partway through, or get a big vest near December. Let us walk through it.',
    },
    { type: 'h2', text: 'The two rates' },
    {
      type: 'ul',
      items: [
        '**22%** comes out of the first $1,000,000 of supplemental pay a single employer gives you during the year.',
        '**37%** comes out of every dollar above $1,000,000.',
      ],
    },
    {
      type: 'p',
      text:
        'Here is the key thing: these are just *withholding* rates — how much your employer parks with the IRS up front. They are not your actual tax rate. The 37% rate happens to match the top tax bracket, but the 22% rate is a one-size-fits-all guess. And for most senior tech workers, whose real bracket is well above 22%, that guess is too low. So not enough gets held back, and you owe the difference in April.',
    },
    { type: 'h2', text: 'The $1M line resets for each employer' },
    {
      type: 'p',
      text:
        'This is the trap that costs people the most. If you change jobs mid-year, each employer counts your $1M from scratch — they have no idea what the other one already paid you.',
    },
    {
      type: 'p',
      text:
        'So you could get $1.8M in supplemental pay in one year — say $900k from each of two employers — and have **$0** of it taxed at the 37% rate. Both employers stayed under their own $1M line, so both used 22% the whole time. The IRS does not pass your running total between employers. But come tax time, your real rate (37%) applies to the *whole* $1.8M. Meanwhile only $396k was held back (22% × $1.8M). You are short about **$270k**.',
    },
    {
      type: 'p',
      text:
        'This catches a lot of senior tech workers who leave one company for another with similar pay. Rule of thumb: if you already got $500k+ of supplemental pay earlier in the year and then switch jobs, that should trigger a quarterly estimated tax payment or a top-up on your new W-4 (line 4(c) — more on that below).',
    },
    { type: 'h2', text: 'What happens when one vest crosses the line' },
    {
      type: 'p',
      text:
        'Say you have already gotten $800k of supplemental pay this year, and now a $400k vest lands. That single vest straddles the $1M line. Here is how it splits:',
    },
    {
      type: 'ul',
      items: [
        'The first $200k of the vest (which brings your year total up to exactly $1M) is held back at 22% = $44,000.',
        'The next $200k (now above $1M) is held back at 37% = $74,000.',
        'Total held back on the $400k vest: $118,000.',
        'Blend those together and the effective rate is 29.5%.',
      ],
    },
    {
      type: 'p',
      text:
        'If you are a high earner, even that 29.5% is still below your real 37% rate — and that is before state tax and Medicare pile on top. So yes, even crossing into the 37% zone does not always wipe out the shortfall. At the very top, your true all-in rate can top 50%.',
    },
    {
      type: 'callout',
      text:
        'One thing to keep straight: the $1M line is counted as the total supplemental pay from ONE employer across the calendar year. It is not per-paycheck and it is not per-vest. (This is spelled out in Treas. Reg. §31.3402(g)-1(b).)',
    },
    { type: 'h2', text: 'Why even 37% can fall short at the very top' },
    {
      type: 'p',
      text:
        'Once your total income passes the top federal bracket ($626,350 single, $751,600 married filing jointly in 2025; projected around $640k single in 2026), every extra dollar of regular income gets hit by a stack of taxes, not just one:',
    },
    {
      type: 'ul',
      items: [
        '**Federal income tax** — 37%. This matches the supplemental rate, so above $1M there is no federal gap.',
        '**Extra Medicare tax** — an extra 0.9% on wages above $200k (single) or $250k (joint) for the year, under IRC §3101(b)(2).',
        '**State income tax** — up to 13.3% in California (14.3% once you add the Mental Health Services Tax surcharge), 10.9% in New York, around 13% in New Jersey, around 10.75% in DC.',
        '**NYC local tax** — up to 3.876% if you live in the city.',
      ],
    },
    {
      type: 'p',
      text:
        'Add it up for a senior tech worker living in NYC in the top bracket and the real rate on the next dollar is about **51.7%** (37% federal + 0.9% extra Medicare + 10.9% NY state + 3.876% NYC). The 37% supplemental withholding by itself leaves a 14-point gap. That gap is your April bill.',
    },
    { type: 'h2', text: 'A worked example: switching jobs mid-year' },
    {
      type: 'p',
      text:
        'You leave Employer A in June. By then they have already paid you $600k of supplemental wages (a big pre-IPO RSU lockup vest hit in March). In July you start at Employer B, who pays you a $300k signing bonus that month. Here is how each one sees it:',
    },
    {
      type: 'ul',
      items: [
        'Employer A held back 22% × $600,000 = **$132,000** — well under their $1M line, so all at 22%.',
        'Employer B holds back 22% × $300,000 = **$66,000** — and from their point of view, your year started at $0.',
        'Combined, that is $198,000 held back on $900,000 of supplemental pay — a blended **22%**.',
        'But your real rate is 37% (your total income is now way past the $626k bracket): $900,000 × 37% = $333,000 actually owed.',
        'You are short **$135,000** when you file.',
      ],
    },
    {
      type: 'p',
      text:
        'Neither employer is required to know what the other paid you. The whole thing gets reconciled on your 1040 — and if you come up short, the IRS adds an underpayment penalty (IRC §6654) unless you had already covered the gap with extra withholding on Form W-4 line 4(c) or a quarterly estimated payment before December 31.',
    },
    { type: 'h2', text: 'How to fix the shortfall before it bites' },
    {
      type: 'ol',
      items: [
        '**Add extra withholding on your W-4 (line 4(c)) at your current job.** Figure out roughly how short you will be (the RSU Tax Shortfall calculator does this, or just take your rate gap × your supplemental pay), divide that by the number of paychecks left in the year, and enter that dollar amount. Bonus: the IRS treats withholding as if it were spread evenly across the whole year (IRC §6654(g)(1)), so this can retroactively patch up earlier months when too little came out.',
        '**Pay the IRS directly with a quarterly estimated payment.** Go to irs.gov/payments and send the shortfall as a "Form 1040 estimated tax" payment. This one only counts from the day you pay it — so use it if you have missed your chance to adjust your W-4.',
        '**Do both.** If you are short more than $100k, split it: use the W-4 top-up (spread evenly) plus a Q4 estimated payment (covers the big number right away). That balances the two methods.',
      ],
    },
    { type: 'h2', text: 'There is a second method your employer might use' },
    {
      type: 'p',
      text:
        'Instead of the flat 22%, the rules (Treas. Reg. §31.3402(g)-1(a)(2)) let an employer use the "aggregate method": they bundle your supplemental pay in with your normal paycheck and withhold using the regular IRS tables at your effective rate. For high earners, that often lands around 28-32% federal on the supplemental amount — a lot closer to what you actually owe.',
    },
    {
      type: 'p',
      text:
        'Most companies stick with the flat 22% because it is simpler to run. A minority use the aggregate method. Both are perfectly legal, and you usually do not get to choose. Check your offer letter or equity plan document to see which one your company uses — that tells you whether to brace for a shortfall.',
    },
    { type: 'h2', text: 'When it is worth calling a CPA' },
    {
      type: 'ul',
      items: [
        '**You switched jobs mid-year with $500k+ of supplemental pay already paid.** That is the $1M-resets-per-employer trap.',
        '**You have double-trigger vests around an IPO.** A pile of regular income lands in one year and often blows past $1M mid-vest.',
        '**You are crossing the $1M line for the first time.** Your withholding suddenly jumps from 22% to 37%, so cash-flow planning matters.',
        '**You lived in more than one state the same year you got supplemental pay.** State sourcing adds another layer on top of the federal shortfall.',
      ],
    },
    {
      type: 'callout',
      text:
        'If your year is messy (multiple employers, double-trigger IPO vests, or crossing the $1M line), it is worth $200-400 to have a CPA run the numbers once and confirm. Mathstub matches you with equity-comp specialists via Harness Wealth — disclosed affiliate link.',
    },
    { type: 'h2', text: 'The takeaway' },
    {
      type: 'p',
      text:
        'The 22%/37% rule is a per-employer, per-year mechanic — not a real calculation of what you owe. The 22% rate is too low for anyone above the 22% bracket. And even the 37% rate at the very top leaves a gap once state tax, extra Medicare, and local taxes stack on. The single most expensive trap is switching jobs mid-year, because each employer restarts your $1M count from zero. Cover the gap before December 31 with extra withholding on Form W-4 line 4(c) or a quarterly estimated payment, and you dodge the IRC §6654 underpayment penalty.',
    },
    {
      type: 'p',
      text:
        'Sources: IRC §3402(g) (supplemental wage withholding rule); Treas. Reg. §31.3402(g)-1 (flat-rate method); Treas. Reg. §31.3402(g)-1(a)(2) (aggregate method); Treas. Reg. §31.3402(g)-1(b) ($1M threshold mechanics); IRC §6654 (underpayment-of-estimated-tax penalty); IRC §6654(g)(1) (withholding deemed paid evenly across the year); IRC §3101(b)(2) (Additional Medicare Tax 0.9%); IRS Publication 15-T (Federal Income Tax Withholding Methods, 2026); IRS Form W-4 instructions.',
    },
  ],
};
