import type { BlogPost } from '../registry';

export const howToAvoidRsuTax: BlogPost = {
  slug: 'how-to-avoid-rsu-tax',
  title: 'Is there a way to avoid taxes on RSUs? (Honest answer: no, but 5 ways to optimize)',
  description:
    'You cannot legally avoid tax on RSU vests — the FMV is taxed as ordinary income under IRC §83(a) the moment shares deliver. But 5 strategies can legally reduce, defer, or offset the tax bill: state arbitrage, 401(k) and HSA stacking, qualified charitable gifts, tax-loss harvesting, and post-vest holding for LTCG.',
  datePublished: '2026-05-19',
  dateModified: '2026-06-07',
  authorName: 'Mathstub Editorial',
  reviewerName: 'Reviewed against IRS primary sources',
  affiliateOfferIds: ['harness-wealth', 'turbotax-premier'],
  quickAnswer:
    'You cannot legally avoid tax on RSU vests — the FMV is taxed as ordinary wage income under IRC §83(a) the moment the shares deliver. Five legal strategies can reduce, defer, or offset the bill: (1) state arbitrage before vest, (2) max 401(k) and HSA, (3) charitable stock gifts of vested shares, (4) tax-loss harvesting, (5) hold post-vest for long-term capital gains treatment on appreciation. None erase the vest-tax itself.',
  keyPoints: [
    'No — you can’t legally avoid the tax when RSUs vest, but you can shrink the bill.',
    'Move to a no-tax state before (not after) a vest to dodge state tax on it.',
    'Max your 401(k) and HSA the same year to lower your overall taxable income.',
    'Donate appreciated shares to charity and skip the capital-gains tax entirely.',
    'Sell losing investments to offset gains, and hold over a year for lower rates.',
    'Ignore the “loopholes”: no 83(b) on RSUs, no refusing a vest, no offshore tricks.',
  ],
  blocks: [
    {
      type: 'p',
      text:
        'Short answer: no, you cannot legally avoid the tax owed on an RSU vest. The fair-market value of the shares is taxed as ordinary wage income under IRC §83(a) the moment they deliver — same as a cash bonus. Anyone selling you an "RSU tax loophole" is either misinformed or breaking the law. But there are five legitimate strategies that legally reduce, defer, or offset the total tax bite. Here is the honest list.',
    },
    {
      type: 'callout',
      text:
        'There is no "avoid" button. You can only reduce taxable income elsewhere (deductions), defer when tax is paid (timing), or convert ordinary income to lower-rate capital gain on the appreciation portion (post-vest holding). The vest itself always hits ordinary rates.',
    },
    {
      type: 'table',
      caption: 'The 5 legal levers — none erase the vest tax itself',
      headers: ['Lever', 'What it does', 'Rough saving'],
      rows: [
        ['Move before a vest', 'Skips state tax on future vests', 'Up to ~13% of the vest'],
        ['Max 401(k) + HSA', 'Lowers your taxable income that year', '~$13k on $400k income'],
        ['Donate appreciated shares', 'Skips capital-gains tax + full deduction', '~$840 per $8k gifted'],
        ['Tax-loss harvesting', 'Offsets capital gains (not the vest)', 'Varies'],
        ['Hold 1+ year', 'Appreciation taxed at the lower LTCG rate', 'Small; risk tradeoff'],
      ],
    },
    { type: 'h2', text: 'Strategy 1 — State residency arbitrage (before vest, not after)' },
    {
      type: 'p',
      text:
        'If you move from a high-tax state (California 13.3%, New York 10.9%) to a no-tax state (Texas, Florida, Washington) before the vesting date, the vest may be sourced to your new state under that state\'s rules. Caveat: most states use "workday allocation" or "trailing nexus" — California sources RSU income to CA based on the percentage of vesting period you worked in CA, not where you live on vest day.',
    },
    {
      type: 'p',
      text:
        'Concrete savings: 100% remote tech worker moves from CA to TX one year before a $200,000 vest. CA might still claim 50-100% of the income depending on facts. But for the next year\'s vest where the entire vesting period was in TX, CA claims nothing — saving $26,600 (13.3% × $200k). The move only pays off if you actually establish bona fide TX residency (driver\'s license, voter registration, no CA real-estate, etc.) and your equity vests over multiple years.',
    },
    { type: 'h2', text: 'Strategy 2 — Max pre-tax 401(k) and HSA the same year as vesting' },
    {
      type: 'p',
      text:
        'Pre-tax retirement and health-savings contributions reduce your W-2 Box 1 ordinary income dollar-for-dollar. The RSU vest is still taxed in full as ordinary income, BUT pushing your total taxable income lower may keep you out of higher brackets, reduce AMT exposure, and lower the marginal rate that applies to the next dollar of vest:',
    },
    {
      type: 'ul',
      items: [
        '401(k) contribution limit 2026 (projected): $24,000 elective deferral + $8,000 catch-up if 50+. Employer match adds nothing taxable.',
        'HSA contribution limit 2026 (projected): $4,400 self-only / $8,750 family + $1,000 catch-up if 55+.',
        'Mega backdoor Roth (if your plan allows): up to $46,500 in after-tax 401(k) contributions, immediately converted to Roth. Does not reduce current taxes but locks in tax-free growth on the contribution AND any earnings.',
      ],
    },
    {
      type: 'p',
      text:
        'For a $400,000 W-2 earner in California in the 32% federal bracket, maxing 401(k) + HSA saves approximately $13,150 in combined federal + state tax that year. Real money, totally legal, no tradeoff except the cash is locked until retirement.',
    },
    { type: 'h2', text: 'Strategy 3 — Charitable stock gifts (donate appreciated shares, not cash)' },
    {
      type: 'p',
      text:
        'If you already plan to donate to charity, donate appreciated RSU shares directly instead of selling them and donating cash. You get:',
    },
    {
      type: 'ul',
      items: [
        'A charitable deduction equal to the current FMV of the shares (up to 30% of AGI for long-term appreciated stock to a public charity per IRC §170(b)(1)(C)).',
        'Zero capital gain on the appreciation — the charity sells the shares tax-free.',
        'No "deemed sale" — you skip the cap-gain tax you would have owed on selling the appreciated shares yourself.',
      ],
    },
    {
      type: 'p',
      text:
        'Example — 100 shares (cost basis $5,000) now worth $8,000:',
    },
    {
      type: 'table',
      caption: 'Donate the shares vs sell first, then donate cash',
      headers: ['', 'Deduction', 'Capital-gains tax'],
      rows: [
        ['Donate shares directly', '$8,000', '$0'],
        ['Sell, then donate cash', '$8,000', '~$840'],
      ],
    },
    {
      type: 'p',
      text:
        'Same $8,000 deduction either way — but donating the shares directly saves the ~$840 of capital-gains tax (15% + 3.8% NIIT). For larger gifts, a donor-advised fund (Fidelity Charitable, Schwab, Vanguard) lets you time the deduction.',
    },
    { type: 'h2', text: 'Strategy 4 — Tax-loss harvesting (offset cap gains, not ordinary income)' },
    {
      type: 'p',
      text:
        'If you have other investment positions sitting at unrealized losses, sell them in the same calendar year as your RSU vest. The realized capital losses offset:',
    },
    {
      type: 'ol',
      items: [
        'Capital gains on RSU shares sold at appreciation (dollar-for-dollar offset).',
        'Up to $3,000 of ordinary income per year if your losses exceed your gains.',
        'Excess losses carry forward indefinitely under IRC §1212(b).',
      ],
    },
    {
      type: 'p',
      text:
        'Limitation: tax-loss harvesting does not offset the ordinary-income portion of an RSU vest. The vest FMV is W-2 wages, not capital gain. Harvesting only helps if you have capital gains to offset (from selling vested shares post-appreciation, or other investments). Watch the wash-sale rule under IRC §1091 — do not buy back the same security within 30 days.',
    },
    { type: 'h2', text: 'Strategy 5 — Hold for long-term capital gains on appreciation' },
    {
      type: 'p',
      text:
        'The FMV at vest is taxed as ordinary income — unavoidable. But if you hold the shares for 366+ days after vest, any appreciation from vest price to sale price is taxed at long-term capital gains rates (0/15/20% federal) instead of ordinary rates (22-37%). The saving is real but only applies to the gain ABOVE the vest FMV.',
    },
    {
      type: 'p',
      text:
        'Example: 100 RSUs vest at $50/share ($5,000 FMV, taxed as ordinary income at ~$2,140 in CA). Hold 18 months, sell at $80/share. The $3,000 appreciation is taxed at 15% LTCG + 3.8% NIIT + 9.3% CA = ~$840. If sold inside 1 year, that same $3,000 would have been ~$1,330 at ordinary rates. Saving: $490 on $8,000 of gross sale. Tradeoff: 18 months of single-stock concentration risk on $8,000.',
    },
    {
      type: 'p',
      text:
        'For most tech workers with diversification concerns, the LTCG saving is too small to justify holding. See our separate post on when to sell RSUs after vesting for the full risk math.',
    },
    { type: 'h2', text: 'What does NOT work (avoid these "loopholes")' },
    {
      type: 'table',
      caption: 'The "loopholes" that don’t work',
      headers: ['The "trick"', 'Why it fails'],
      rows: [
        ['83(b) election on RSUs', 'Doesn’t apply — RSUs are taxed at vest under §83(a); no election exists (it’s for restricted stock or options).'],
        ['Refuse the vest', 'You can’t. The grant controls; vested shares can’t be returned for a tax do-over.'],
        ['Defer with an NQDC plan', 'Strict §409A rules, usually execs only, and your deferral is an unsecured claim on the employer.'],
        ['Move to Puerto Rico (Act 60)', 'US-source work done before the move stays federally taxable; Pub 570 / Act 60 sourcing is aggressively audited.'],
        ['Offshore entity to hold RSUs', 'Illegal — RSU income is your personal W-2 wages; routing it through an entity is evasion (§61, §7201).'],
      ],
    },
    { type: 'h2', text: 'The takeaway' },
    {
      type: 'p',
      text:
        'No magic trick erases tax on an RSU vest. The FMV at vest is ordinary wage income under §83(a), full stop. What you can do is reduce other taxable income (pre-tax retirement, charitable giving), defer or smooth out the timing (state arbitrage, NQDC), or convert future appreciation to capital gain (hold past 1 year). For a high-earner with significant equity, combining strategies 2 + 3 + 5 typically saves $5,000–$30,000 per year of vesting — without any aggressive positions.',
    },
    {
      type: 'p',
      text:
        'For complex situations (multi-state residency, $1M+ vests pushing into 37% federal supplemental, ISO/AMT interactions, or pre-IPO equity), talk to a fee-only fiduciary CPA who specializes in equity compensation. The Harness Wealth network is a good starting point — Mathstub matches you with vetted equity-comp pros.',
    },
    {
      type: 'p',
      text:
        'Sources: IRC §83(a) (taxation of property transferred for services); IRC §170(b)(1)(C) (charitable contribution limits for appreciated property); IRC §1091 (wash sale rule); IRC §1212(b) (capital loss carryover); IRC §1411 (Net Investment Income Tax); IRC §409A (nonqualified deferred compensation); IRC §61 (gross income definition); IRC §7201 (tax evasion); IRS Publication 525 (Taxable and Nontaxable Income); IRS Publication 526 (Charitable Contributions); IRS Publication 570 (Tax Guide for Individuals With Income From U.S. Possessions); Treas. Reg. §1.83-7 (taxation of options vs RSUs).',
    },
  ],
};
