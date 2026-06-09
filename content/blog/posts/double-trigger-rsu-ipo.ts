import type { BlogPost } from '../registry';

export const doubleTriggerRsuIpo: BlogPost = {
  slug: 'double-trigger-rsu-ipo-tax',
  title: 'Double-trigger RSUs at IPO: the tax math nobody warned you about',
  description:
    'Pre-IPO RSUs at companies like Stripe, Databricks, SpaceX, and Canva vest on TWO triggers: time-based vesting + a liquidity event. Until IPO, no tax. When the company finally goes public, every share that "vested" over the past 4-7 years hits ordinary income in a single year — often producing seven-figure tax bills with no cash to pay them.',
  datePublished: '2026-05-19',
  dateModified: '2026-06-10',
  authorName: 'Mathstub Editorial',
  reviewerName: 'Reviewed against IRS primary sources',
  affiliateOfferIds: ['harness-wealth', 'turbotax-premier'],
  quickAnswer:
    'Double-trigger RSUs do not vest for tax purposes until BOTH (1) the time-based vesting schedule completes for a tranche AND (2) a qualifying liquidity event occurs (typically IPO + the post-IPO lockup expires). Until the second trigger fires, no tax — the shares are still subject to substantial risk of forfeiture under IRC §83(a). When IPO finally happens, every previously time-vested tranche becomes ordinary W-2 income at the same moment, at the post-lockup share price. Often results in $500k-$5M+ ordinary income concentrated in one tax year.',
  keyPoints: [
    'Pre-IPO RSUs are not taxed until two things happen: they time-vest AND the company goes public.',
    'When the IPO finally hits, years of vested shares all become taxable income in one year.',
    'That one-year spike is often $500k to $5M+ of income — sometimes more than your total pay there.',
    "The flat 22%/37% withholding usually won't cover the bill, so you can owe a lot more in April.",
    'Best moves: sell at lockup to diversify, top up withholding, and get a CPA before IPO.',
  ],
  blocks: [
    {
      type: 'p',
      text:
        'If you joined Stripe in 2018, you have been "vesting" RSUs every month for years — but you have not paid a dollar of tax on any of them. That changes the day they IPO. On that day, the IRS treats every previously-vested share as ordinary wage income at the post-lockup share price, creating a tax event that can dwarf your cumulative salary across your entire tenure at the company. This post walks the mechanics, the worked numbers, and the four strategies that actually help if you are sitting on a pile of unvested-for-tax-purposes double-trigger RSUs.',
    },
    { type: 'h2', text: 'How double-trigger RSUs differ from regular RSUs' },
    {
      type: 'p',
      text:
        'Public-company RSUs (Google, Meta, Apple) use a single trigger: time-based vesting. Each tranche delivers shares to your brokerage account when the time-vest hits, and the FMV at that moment is ordinary income under IRC §83(a). You pay tax that year, like any other wage.',
    },
    {
      type: 'p',
      text:
        'Private pre-IPO companies cannot easily do that — the shares are not freely tradeable, so taxing the FMV at time-vest would create a tax bill with no liquid way to pay it. The solution: the grant agreement adds a second trigger, the "performance condition" or "liquidity event," that must also occur before the RSU is treated as vested for tax purposes.',
    },
    {
      type: 'flow',
      caption: 'Both triggers must fire before any tax',
      steps: [
        { label: 'Trigger 1', value: 'Time-vest' },
        { label: 'Trigger 2', value: 'IPO + lockup' },
        { label: 'Result', value: 'Taxed at once', tone: 'bad' },
      ],
    },
    {
      type: 'ul',
      items: [
        '**Trigger 1 — time vesting.** Standard 4-year vest with a 1-year cliff. Shares "time-vest" as you stay — but no tax yet.',
        '**Trigger 2 — a liquidity event.** Usually an IPO plus the ~180-day lockup expiring (some grants also accept an acquisition or tender offer). Only now does tax hit.',
      ],
    },
    {
      type: 'p',
      text:
        'Under IRC §83(a), shares are taxed when the "substantial risk of forfeiture" lapses. The IRS has consistently held that for double-trigger RSUs, that moment is when BOTH triggers have fired — not when only the time trigger fires. Until that liquidity event the shares stay at risk, so there is no tax — and whether you keep the time-vested portion at all if you leave depends on your plan (covered below).',
    },
    {
      type: 'callout',
      text:
        'When the second trigger fires, every previously time-vested share becomes ordinary income in that single tax year. Years of "vesting" compress into one tax event. This is the IPO tax bomb.',
    },
    { type: 'h2', text: 'What happens to double-trigger RSUs if you leave before the IPO?' },
    {
      type: 'p',
      text:
        'This is the question that keeps pre-IPO employees up at night, and the honest answer is: it depends on your plan document — there are two common structures, so you cannot assume.',
    },
    {
      type: 'table',
      caption: 'Leaving before the liquidity event',
      headers: ['Portion of your grant', 'What typically happens when you leave'],
      rows: [
        ['Not-yet-time-vested units', 'Forfeited — same as any RSU. No service, no vesting.'],
        ['Time-vested but not released (modern plans)', 'Often RETAINED and still settle if a liquidity event happens within a fixed window — commonly 7 years from grant.'],
        ['Time-vested but not released (stricter plans)', 'Forfeited on departure if no liquidity event has occurred yet.'],
      ],
    },
    {
      type: 'p',
      text:
        'Many large pre-IPO companies adopted the employee-friendly structure after ~2013: your time-vested double-trigger RSUs survive your departure and will still convert to shares if the company IPOs or is acquired before the award expires. Older or stricter plans cancel even time-vested units the day you leave if liquidity has not happened. The difference is worth potentially six figures, and it is buried in the plan document — not the offer letter.',
    },
    {
      type: 'callout',
      text:
        'Before you resign, pull your RSU plan document or grant agreement and search for "settlement," "liquidity event," and "termination." The decisive question: do my time-vested RSUs still settle at a future IPO or acquisition after I have left, and is there an expiration date on that right?',
    },
    {
      type: 'p',
      text:
        'Tax timing follows settlement, not your departure date. Even if your time-vested shares are retained, leaving is not a taxable event — the ordinary-income hit still lands only when (and if) the second trigger fires and the shares are released. If the award expires unsettled, you were never taxed and never received anything. So departing pre-IPO does not create a surprise tax bill; the risk is purely whether you keep the upside at all.',
    },
    { type: 'h2', text: 'Worked example — 5 years at a pre-IPO company' },
    {
      type: 'p',
      text:
        'You joined a startup in 2020 with a 4-year RSU grant of 100,000 shares (5,000 shares vested at the 1-year cliff, 2,083 each month thereafter). 409A FMV at grant: $5/share. The company IPOs in 2026 at $80/share. By the post-lockup date 180 days later, the share price is $100/share.',
    },
    {
      type: 'p',
      text:
        'Time-vesting was complete by 2024 (4 years post-grant). For tax purposes, NO INCOME was recognized in 2020-2025 because the second trigger had not fired. On the lockup expiration date in 2026, the second trigger fires. All 100,000 shares are deemed to vest at $100/share = $10,000,000 ordinary income, all in tax year 2026.',
    },
    {
      type: 'flow',
      caption: '100,000 shares · IPO at $100/share · single CA filer',
      steps: [
        { label: 'Deemed income', value: '$10M', tone: 'bad' },
        { label: 'Total tax', value: '$5.1M', tone: 'bad' },
        { label: 'Effective rate', value: '51%', tone: 'bad' },
        { label: 'Net', value: '~$4.9M', tone: 'good' },
      ],
    },
    {
      type: 'p',
      text:
        'Here is where that ~$5.1M comes from (single filer, California):',
    },
    {
      type: 'table',
      caption: 'The tax on $10M of ordinary income',
      headers: ['Tax', 'How it’s figured', 'Amount'],
      rows: [
        ['Federal supplemental', '22% to $1M, then 37% on $9M', '$3,550,000'],
        ['California', '13.3% (top bracket + $1M surcharge)', '$1,330,000'],
        ['Medicare + Add’l', '1.45% + 0.9%', '$235,000'],
        ['**Total**', '**~51% effective**', '**$5,115,000**'],
      ],
    },
    {
      type: 'p',
      text:
        'Social Security is capped at the wage base, so it is trivial next to the rest.',
    },
    {
      type: 'p',
      text:
        'Your employer withholds at the supplemental rate — but the cash they collect from share-withholding may not cover the full tax bill if the share price drops between vest and withholding. And if you hold the post-tax shares and the price drops, you can owe more tax than your remaining shares are worth.',
    },
    { type: 'h2', text: 'The "tax bill but no cash" problem' },
    {
      type: 'p',
      text:
        'Your employer must withhold tax on the entire $10M of ordinary income at the supplemental rate. To get cash, they sell shares on the open market through your broker (sell-to-cover) or retain shares directly (NSS). After the dust settles, you receive the net shares.',
    },
    {
      type: 'p',
      text:
        'But:',
    },
    {
      type: 'ul',
      items: [
        'The withholding only covers the FLAT supplemental rate (22% federal, then 37% above $1M). For high earners, that\'s often under-withholding the full marginal tax. You can owe an additional $500k-$1M at April filing.',
        'If the share price drops between vest day and your sell-date, the share-sells executed by the broker may not have generated enough cash to cover the tax — leaving you on the hook for the difference in cash.',
        'If you hold post-withholding shares and the price keeps dropping, you owe the tax bill on the $10M ordinary income locked in at the vest price, but your remaining shares may now be worth less than that tax bill. People have gone bankrupt this way during the dotcom bust.',
      ],
    },
    { type: 'h2', text: 'Strategy 1 — sell aggressively at the lockup' },
    {
      type: 'p',
      text:
        'The single biggest risk in the IPO year is over-concentration in a single stock that\'s now publicly traded but has volatile price action. The IPO-lockup-expiration moment is the first time you can sell. Selling at or near that moment converts ordinary-income-already-recognized into cash, locks in the tax basis at the vest price (so future capital gain or loss is small), and removes single-stock concentration risk.',
    },
    {
      type: 'p',
      text:
        'Critique of holding past lockup:',
    },
    {
      type: 'ul',
      items: [
        'You\'ve already paid the ordinary tax on $10M. Holding doesn\'t reduce that bill.',
        'Holding bets that the stock will appreciate, but you\'re betting with money that\'s already on the hook for tax. A 30% drop wipes out tax-free capital, then eats into principal.',
        'Indexed reinvestment yields better risk-adjusted returns than concentrated single-stock holding — same logic as our when-to-sell-rsus-after-vesting post but at 100× the stakes.',
      ],
    },
    { type: 'h2', text: 'Strategy 2 — withhold extra via W-4 line 4(c) post-IPO' },
    {
      type: 'p',
      text:
        'The 22%/37% supplemental withholding usually does not cover the full federal liability for a $10M event. The fix is the same as for regular RSU shortfall — top up Form W-4 line 4(c) on your post-IPO paychecks (or quarterly estimated payment) so the IRS gets enough cash by year-end and you avoid an underpayment penalty under IRC §6654.',
    },
    {
      type: 'p',
      text:
        'Caveat: for the $10M of ordinary income concentrated in one quarter, the W-4-paycheck-topup math has limited room — there\'s only a few months of remaining paychecks to absorb a 7-figure additional withholding. Often a Q3 or Q4 estimated payment via IRS Direct Pay is the practical fix.',
    },
    { type: 'h2', text: 'Strategy 3 — diversify with a 10b5-1 plan' },
    {
      type: 'p',
      text:
        'Once you\'re a public company employee with material non-public information (most senior engineers and above), you can\'t freely time stock sales. A SEC Rule 10b5-1 plan pre-commits you to a selling schedule (e.g., 1/12th per month for the next year) executed by your broker automatically. This:',
    },
    {
      type: 'ul',
      items: [
        'Avoids insider-trading violation risk.',
        'Implements dollar-cost-averaging out of the concentrated position.',
        'Removes the emotional element of deciding when to sell.',
        'Must be set up during an open trading window and have a "cooling off" period (~30-90 days) before the first scheduled trade.',
      ],
    },
    { type: 'h2', text: 'Strategy 4 — charitable stock gifting' },
    {
      type: 'p',
      text:
        'If you were already planning charitable giving, donating appreciated post-IPO shares directly (instead of cash) avoids capital-gain tax on the appreciation AND gives you a charitable deduction at FMV. Up to 30% of AGI in long-term capital-gain property deduction per IRC §170(b)(1)(C).',
    },
    {
      type: 'p',
      text:
        'Caveat: this does NOT reduce the ordinary income at the lockup-vest event. The $10M is already taxed when the second trigger fires. Charitable gifting only helps with FUTURE capital gain on shares you hold past lockup. Donor-advised funds (Fidelity Charitable, Schwab Charitable, Vanguard) can be useful for stockpiling the deduction across multiple years.',
    },
    { type: 'h2', text: 'What does NOT help' },
    {
      type: 'ul',
      items: [
        '**§83(b) election.** Does NOT apply to RSUs (single or double-trigger). RSUs are not "property transferred for services" at grant — they\'re a promise. The 30-day §83(b) clock for restricted stock or early-exercised options does not exist for RSUs.',
        '**Refusing the lockup-vest.** You cannot refuse a vest to avoid tax. The grant terms control.',
        '**Moving to a no-tax state right before the IPO.** For the federal piece, won\'t help — federal applies regardless. For the state piece, see the workday-allocation post — California in particular still claims the workday-fractional portion even after you move.',
        '**Trying to defer with an NQDC plan.** Most public-company NQDC plans were not designed for $10M ordinary income spikes from RSU lockup events. §409A rules are restrictive and the deferral horizons rarely match the vesting period.',
      ],
    },
    { type: 'h2', text: 'When to talk to a CPA (always, for this one)' },
    {
      type: 'p',
      text:
        'Double-trigger RSU IPO events are the single most expensive tax decision in a tech career. A CPA who specializes in equity comp pays for themselves at 1% of the savings they enable. Specifically you need help with:',
    },
    {
      type: 'ul',
      items: [
        'Pre-IPO multi-year tax projection — modeling whether to accelerate income before IPO via §83(b)-eligible side actions (e.g., early-exercising NSOs in the same period).',
        'AMT credit recovery — if you also did ISO exercises in earlier years, the AMT credit can offset some of the IPO-year ordinary tax.',
        'State sourcing if you moved during the vesting period.',
        '10b5-1 plan design and timing.',
        'Charitable gifting strategy — donor-advised fund vs direct donation.',
      ],
    },
    { type: 'h2', text: 'The takeaway' },
    {
      type: 'p',
      text:
        'Double-trigger RSUs at pre-IPO companies create the single largest tax event in most tech careers — often $500k to $5M+ of ordinary income concentrated in one year, at the post-IPO lockup price. The 22%/37% supplemental withholding doesn\'t cover the full liability for high earners. The most important moves: sell aggressively at lockup expiration to diversify and lock in basis, top up withholding to hit the safe harbor, set up a 10b5-1 plan for the remaining shares, and engage a CPA who specializes in IPO equity events before lockup hits.',
    },
    {
      type: 'p',
      text:
        'For the federal piece of any RSU vest after the lockup expires, use the RSU Tax Shortfall calculator. For multi-state allocation if you moved during the vesting period, see the workday-allocation post. For CPA matching on a complex IPO-year planning engagement, Harness Wealth specializes in equity comp — disclosed affiliate link.',
    },
    {
      type: 'p',
      text:
        'Sources: IRC §83(a) (taxation when substantial risk of forfeiture lapses); Treas. Reg. §1.83-3(c) (substantial risk of forfeiture definition); IRC §3402(g) and Treas. Reg. §31.3402(g)-1 (supplemental withholding); IRC §6654 (estimated tax safe harbor); IRC §170(b)(1)(C) (charitable contribution limits); IRC §409A (deferred compensation rules); SEC Rule 10b5-1 (pre-planned trading); IRS Publication 525.',
    },
  ],
};
