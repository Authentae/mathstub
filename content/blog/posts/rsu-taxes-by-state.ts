import type { BlogPost } from '../registry';

export const byState: BlogPost = {
  slug: 'rsu-taxes-by-state',
  title: 'RSU taxes by state: California, New York, Washington, and Texas compared',
  description:
    'How state income tax stacks on top of federal RSU withholding in the four biggest tech-worker states — plus the multi-state allocation rule that catches movers, and worked examples for a typical $50k vest in each state.',
  datePublished: '2026-04-25',
  dateModified: '2026-05-19',
  authorName: 'Mathstub Editorial',
  reviewerName: 'Reviewed against IRS primary sources',
  affiliateOfferIds: ['turbotax-premier', 'harness-wealth'],
  quickAnswer:
    'State tax on RSU vests in the four biggest tech states: California withholds at 10.23% supplemental and taxes up to 13.3% marginal (or 14.3% with the Mental Health Services Tax surcharge). New York withholds at 11.7% supplemental, with NYC residents adding up to 3.876% local. Washington and Texas have zero state income tax — though Washington does have a 7% capital-gains excise tax on sales above the indexed threshold. Combined federal + state + FICA typically lands in the 35-47% range for high earners.',
  blocks: [
    {
      type: 'p',
      text:
        'Federal RSU withholding is the same everywhere: 22% (or 37% above $1M YTD supplemental wages) under Treas. Reg. §31.3402(g)-1. State withholding is wildly different. The four biggest tech-worker states span the full range from 0% (TX, WA) to 14%+ (CA with the surcharge) — and the choice of state can swing the all-in tax bill on a $50,000 vest by $5,000+. This post walks each state\'s mechanics with worked numbers, plus the multi-state allocation rule that catches workers who moved during the vesting period.',
    },
    { type: 'h2', text: 'California — the high-rate aggressive enforcer' },
    {
      type: 'ul',
      items: [
        '**Top marginal rate:** 12.3% (13.3% above $1M income with the Mental Health Services Tax surcharge; 14.4% if you cross the $1M threshold and also have the SDI ceiling). Per Cal. Code Regs. tit. 18, §17041.',
        '**Supplemental withholding:** 10.23% on stock-option / RSU income (FTB Publication DE 44, Method B).',
        '**Workday allocation:** Cal. Code Regs. tit. 18, §17951-4(d) sources RSU income based on workdays during the vesting period — not residence at vest day. A CA resident who moved out before a vest still owes CA tax on the CA-workday fraction.',
        '**Net effect:** at the top bracket, supplemental under-withholds by 2-4 percentage points on top of the federal gap.',
      ],
    },
    {
      type: 'p',
      text:
        'California is also the most aggressive state about audit enforcement on departing residents. The FTB regularly challenges "I moved before the vest" claims when domicile ties remain (CA real estate, family, voter registration, vehicle registration). See our separate post on multi-state-rsu-sourcing-california for the workday-allocation mechanic in detail.',
    },
    { type: 'h2', text: 'New York — high state + city stack for NYC residents' },
    {
      type: 'ul',
      items: [
        '**Top marginal rate:** 10.9% state (NY Tax Law §601 — top bracket for income > $25M, but the 10.3% rate kicks in at $5M; senior tech workers see 9.65% at $215k-$1.1M and 10.3% above).',
        '**Supplemental withholding:** 11.7% per NYS Publication NYS-50 for high earners.',
        '**NYC residents:** add a separate NYC personal income tax of up to 3.876% under Admin. Code §11-1701. NYC tax is based on residence on vest day, NOT workday allocation.',
        '**Workday allocation:** NY uses workday-based sourcing for state income (NY TSB-M-86 (1)I) similar to CA — but the NYC piece sticks to residence.',
        '**Net effect:** an NYC resident in the top federal bracket faces a true marginal of ~51.7% (37% federal + 0.9% Add\'l Medicare + 10.9% NY + 3.876% NYC). Highest combined effective rate of any major US tech city.',
      ],
    },
    { type: 'h2', text: 'Washington — no income tax, but watch the capital-gains excise' },
    {
      type: 'ul',
      items: [
        '**Top marginal rate:** 0% on wages. No state personal income tax under Washington Constitution Art. VII.',
        '**Supplemental withholding:** 0%.',
        '**Capital-gains excise tax:** 7% on long-term capital gains above an indexed annual threshold (~$270k for 2026). Applies to RSU shares SOLD after vest where the gain exceeds the threshold. Per RCW §82.87 (the "Capital Gains Tax Act" of 2021).',
        '**Net effect:** the RSU vest itself is federal-only. The downstream sale of held shares can trigger the WA excise tax if the cumulative annual gain exceeds the threshold.',
      ],
    },
    {
      type: 'p',
      text:
        'For most tech workers, the WA capital-gains excise rarely binds (sell-at-vest avoids it entirely, since cost basis = sale price). For workers who hold significant post-vest positions and sell large appreciated lots in a single year, the excise can matter.',
    },
    { type: 'h2', text: 'Texas — clean zero state tax, period' },
    {
      type: 'ul',
      items: [
        '**Top marginal rate:** 0% on wages. No state personal income tax under Texas Constitution Art. VIII §24 (constitutional prohibition).',
        '**Supplemental withholding:** 0%.',
        '**No capital-gains tax** at the state level. Same federal LTCG rates apply.',
        '**Net effect:** federal-only shortfall. For an out-of-state mover, the only catch is workday allocation back to the prior state for any RSU vest where the vesting period spanned both states.',
      ],
    },
    { type: 'h2', text: 'Worked comparison — $50,000 vest, $200,000 base, single filer' },
    {
      type: 'p',
      text:
        'Federal piece (same everywhere): marginal 32% × $50k = $16,000 owed. Withheld 22% × $50k = $11,000. Federal gap = $5,000.',
    },
    {
      type: 'p',
      text:
        'State piece by location:',
    },
    {
      type: 'ul',
      items: [
        '**California (San Francisco resident):** marginal 9.3% × $50k = $4,650 owed. Withheld 10.23% × $50k = $5,115. State refund: $465. Combined gap: $4,535 owed.',
        '**California top bracket ($1M+ income):** marginal 13.3% × $50k = $6,650. Withheld 10.23% × $50k = $5,115. State gap: $1,535. Combined gap: $6,535 owed.',
        '**New York (Manhattan resident):** marginal NY 9.65% × $50k = $4,825. NYC 3.876% × $50k = $1,938. Combined state+local owed: $6,763. Withheld NY 11.7% × $50k = $5,850 (NY supplemental); NYC withholding similar at ~3.876% = $1,938. Net state/NYC: roughly break-even.',
        '**Washington (Seattle resident):** state piece: $0 federal-only. Combined gap: $5,000 ($5k federal shortfall).',
        '**Texas (Austin resident):** state piece: $0. Combined gap: $5,000.',
      ],
    },
    {
      type: 'p',
      text:
        'The headline: federal gap is the bigger lever for everyone. State gap is significant only for CA at the top bracket (where the surcharge fires) and NYC for residents. WA and TX are clean: federal-only.',
    },
    { type: 'h2', text: 'Other states briefly' },
    {
      type: 'ul',
      items: [
        '**Massachusetts:** 5% flat (9% with the 4% surtax above $1M under the Fair Share Amendment). Short-term capital gains at 8.5%.',
        '**Oregon:** 9.9% top marginal. Aggressive about tax on remote workers based in OR for Bay Area companies.',
        '**Illinois:** 4.95% flat.',
        '**Colorado:** 4.4% flat.',
        '**Florida / Nevada / South Dakota / Tennessee / Wyoming:** all 0% state, similar to TX/WA.',
      ],
    },
    {
      type: 'callout',
      text:
        'Multi-state residency mid-year (very common for IPO workers who relocate around the lockup, or remote workers who moved during a vesting period) is a separate problem with its own rules. The income may be split between states based on workdays performed. This is exactly the kind of fact pattern where a $200-400 CPA consultation pays for itself — Mathstub matches you with equity-comp specialists via Harness Wealth (disclosed affiliate link).',
    },
    { type: 'h2', text: 'How to fix state shortfalls' },
    {
      type: 'p',
      text:
        'Most states have their own W-4 equivalent for state withholding (CA Form DE-4, NY IT-2104, MA M-4, etc.). The federal Form W-4 only controls federal withholding. If you have a state shortfall, file the state W-4 equivalent with an extra-withholding amount per pay period — typically calculated by dividing your projected state shortfall by remaining pay periods.',
    },
    {
      type: 'p',
      text:
        'Some states also allow quarterly estimated tax payments via their own equivalent of IRS Direct Pay (FTB Pay, NY Online Services, etc.). Most states follow the federal §6654 rule that withholding is treated as paid evenly across the year, so the state-W-4 fix retroactively cures earlier under-withholding the same way the federal one does.',
    },
    { type: 'h2', text: 'The takeaway' },
    {
      type: 'p',
      text:
        'Federal RSU withholding is uniform; state withholding varies wildly. The federal gap (22% supplemental vs your real marginal rate) is the dominant shortfall for most filers — $5,000 on a $50k vest at 32% federal marginal. State gap is meaningful for CA top-bracket filers (additional ~$1,500 on the same vest) and NYC residents (where the 3.876% local stacks). WA and TX are federal-only, no state shortfall. For movers during the vesting period, workday-allocation rules can claw back state tax even after relocation — see the dedicated multi-state CA sourcing post.',
    },
    {
      type: 'p',
      text:
        'For your specific state, vest amount, and base salary, use the RSU Tax Shortfall calculator (which encodes state supplemental and marginal rates for all 50 states) plus the State Stock-Comp Lookup for a quick rate comparison before deciding where to move or live.',
    },
    {
      type: 'p',
      text:
        'Sources: IRC §3402(g) (federal supplemental withholding); Treas. Reg. §31.3402(g)-1; Cal. Code Regs. tit. 18, §17041 (CA bracket structure); Cal. Code Regs. tit. 18, §17951-4(d) (CA workday allocation); California FTB Publication DE 44 (10.23% supplemental); California FTB Publication 1004 (stock options); NY Tax Law §601 (NY brackets); NYS Publication NYS-50 (11.7% supplemental); NY TSB-M-86 (1)I (workday allocation); NYC Admin. Code §11-1701; RCW §82.87 (Washington Capital Gains Tax Act); Washington Constitution Art. VII; Texas Constitution Art. VIII §24; IRC §6654 (estimated tax safe harbor).',
    },
  ],
};
