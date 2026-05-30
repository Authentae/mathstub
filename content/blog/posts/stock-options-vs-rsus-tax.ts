import type { BlogPost } from '../registry';

export const stockOptionsVsRsusTax: BlogPost = {
  slug: 'stock-options-vs-rsus-tax',
  title: 'Stock options vs RSUs: how the tax treatment actually differs (worked examples)',
  description:
    'RSUs are taxed at vest as ordinary W-2 income on the full FMV. Stock options are only taxed when you exercise — and the mechanics split into ISOs (AMT preference, no ordinary income) and NSOs (ordinary income + FICA on the bargain element). The right grant to choose depends on share-price trajectory, holding plans, and AMT exposure.',
  datePublished: '2026-05-19',
  dateModified: '2026-05-19',
  authorName: 'Mathstub Editorial',
  reviewerName: 'Reviewed against IRS primary sources',
  affiliateOfferIds: ['harness-wealth', 'turbotax-premier'],
  quickAnswer:
    'RSUs are taxed at vest as ordinary W-2 income on the full FMV under IRC §83(a). Stock options are taxed at exercise, not at grant or vest. ISOs (IRC §422) add the bargain element to AMT income but not regular income — sometimes triggering AMT but allowing long-term capital gains treatment on a later qualifying sale. NSOs (IRC §83) tax the bargain element as ordinary W-2 income at exercise plus FICA. Net: RSUs are simpler but always trigger ordinary tax; options defer tax until exercise and can convert appreciation to LTCG.',
  keyPoints: [
    'RSUs are taxed the moment they vest, on their full value, as regular salary.',
    'Stock options are only taxed when you buy (exercise) the shares — not before.',
    'ISOs can dodge regular income tax but may trigger the AMT, a separate tax.',
    'NSOs are taxed as regular salary on your discount the day you exercise.',
    'Options can turn more of your gain into lower-taxed long-term capital gains.',
    'RSUs are simplest and need no cash; options need cash up front but can save tax.',
  ],
  blocks: [
    {
      type: 'p',
      text:
        'The single biggest source of confusion in tech-worker equity compensation is mixing up RSU tax mechanics with stock option tax mechanics. They are not the same. Even within "stock options" there are two completely different regimes — ISOs and NSOs — that produce different tax outcomes from identical exercise events. This post walks the three regimes side-by-side with worked numbers so you can pattern-match your own grant.',
    },
    { type: 'h2', text: 'The three regimes at a glance' },
    {
      type: 'ul',
      items: [
        '**RSU (Restricted Stock Unit).** Promise to deliver shares on a future vesting date. Taxed at vest on the FMV of the delivered shares as ordinary W-2 income under IRC §83(a). Cost basis = FMV at vest. No tax at grant.',
        '**ISO (Incentive Stock Option).** Right to buy shares at a fixed strike price. Tax-favored under IRC §422. No ordinary income at grant, vest, or exercise. The bargain element (FMV at exercise minus strike) is an AMT preference item under IRC §56(b)(3). If you hold the exercised shares for the qualifying-disposition period (2 years from grant, 1 year from exercise), the entire gain is taxed as long-term capital gain.',
        '**NSO (Non-Qualified Stock Option).** Right to buy shares at a fixed strike price, no §422 preferences. The bargain element at exercise is ordinary W-2 income under IRC §83(a) plus FICA. Cost basis after exercise = FMV at exercise. Any further appreciation is capital gain at sale.',
      ],
    },
    {
      type: 'callout',
      text:
        'Tax timing is the headline difference: RSU = taxed at vest, no exercise needed. Options = taxed at exercise, no automatic event. ISOs further defer ordinary tax (only AMT bites) until the qualifying-sale finish line. NSOs trigger ordinary income the moment you exercise.',
    },
    { type: 'h2', text: 'Worked example — 1,000 shares, same employer, three grant types' },
    {
      type: 'p',
      text:
        'You receive a grant of 1,000 shares (or option-equivalent) from a tech employer. Grant-date FMV is $10/share, strike (for options) is $10/share, vesting is 1-year cliff plus 36-month monthly thereafter. Two years in, all 1,000 shares vest. Share price has risen to $50/share. You hold 2 more years, share price hits $100/share, and you sell. Single filer, CA resident, $200k of other W-2 income. Tax math:',
    },
    { type: 'h3', text: 'Path A — RSUs' },
    {
      type: 'ul',
      items: [
        'At grant: no tax (nothing has transferred yet).',
        'At vest (year 2, $50/share): 1,000 × $50 = $50,000 ordinary W-2 income. Tax: 32% federal + 9.3% CA + 1.45% Medicare = ~21,375. Cost basis = $50,000.',
        'At sale (year 4, $100/share): proceeds $100,000. Capital gain $100,000 − $50,000 = $50,000 long-term (held >1 year past vest). LTCG tax: 15% federal + 9.3% CA + 3.8% NIIT = ~14,050.',
        'Total tax: $35,425 on $100,000 of total economic gain. Effective rate: 35.4%.',
      ],
    },
    { type: 'h3', text: 'Path B — ISOs' },
    {
      type: 'ul',
      items: [
        'At grant: no tax.',
        'At vest (year 2): no tax. Vesting alone is not a taxable event for ISOs.',
        'At exercise (assume year 2 immediately after vest, $50/share): you pay $10/share × 1,000 = $10,000 cash to exercise. Bargain element = ($50 − $10) × 1,000 = $40,000. NOT ordinary income. IS an AMT preference item under §56(b)(3). At a $40k AMT add-back on top of $200k regular income, AMT typically bites — the calculator estimates ~$8,000 of AMT owed in the exercise year.',
        'At sale (year 4, $100/share, qualifying disposition met): proceeds $100,000. Cost basis $10,000 (your strike). Entire $90,000 is LTCG. Tax: 15% federal + 9.3% CA + 3.8% NIIT = ~25,290.',
        'AMT credit recovery: the $8,000 AMT paid at exercise becomes an IRC §53 minimum tax credit, recovered against regular tax in years when regular tax exceeds tentative AMT. Often fully recovered within 3-5 years.',
        'Total tax: $33,290 over the holding period, before AMT credit recovery. After recovery: ~$25,290. Effective rate: 25.3% (lowest of the three paths).',
      ],
    },
    { type: 'h3', text: 'Path C — NSOs' },
    {
      type: 'ul',
      items: [
        'At grant: no tax.',
        'At vest: no tax (vesting alone doesn\'t trigger tax for unexercised NSOs).',
        'At exercise (year 2, $50/share): you pay $10,000 cash. Bargain element ($40,000) is ordinary W-2 income. Tax: 32% federal + 9.3% CA + 1.45% Medicare + 0.9% Add\'l Medicare (above $200k YTD) = ~17,500. Cost basis after exercise = $50,000.',
        'At sale (year 4, $100/share): proceeds $100,000. Capital gain $100,000 − $50,000 = $50,000 long-term. Tax: 15% federal + 9.3% CA + 3.8% NIIT = ~14,050.',
        'Total tax: $31,550 on $100,000 of total economic gain. Effective rate: 31.5%.',
      ],
    },
    {
      type: 'p',
      text:
        'Ranking from lowest to highest total tax on identical economic outcome: ISO ($25k after credit recovery) < NSO ($31.5k) < RSU ($35.4k). The ISO advantage comes from converting all $90,000 of appreciation to LTCG, but it requires fronting cash to exercise + carrying AMT risk + meeting the qualifying-disposition holding period. RSUs trade tax efficiency for zero cash-flow risk and zero holding-period decisions.',
    },
    { type: 'h2', text: 'Key tradeoffs by regime' },
    {
      type: 'p',
      text:
        'The total-tax differences are real but they hide important non-tax tradeoffs:',
    },
    {
      type: 'ul',
      items: [
        '**Cash flow.** RSUs require no out-of-pocket cash (employer withholds via share-sell). ISO and NSO exercises require cash to pay the strike price (and NSO also requires withholding on the bargain element). For a 10,000-share grant at $10 strike: $100,000 cash to exercise. Many employees never exercise because the cash isn\'t there.',
        '**Downside risk.** RSUs deliver shares whether the stock has gone up or down — you always get something. Options can expire worthless if the stock never crosses the strike price.',
        '**Holding period flexibility.** RSUs: you can sell same-day with zero tax penalty (cost basis = sale price). ISOs: same-day sale is a disqualifying disposition, converting the entire spread to ordinary income (defeats the §422 advantage). NSOs: same-day sale is fine, fully taxed but no extra trap.',
        '**AMT exposure.** Only ISOs trigger AMT. RSUs and NSOs add to regular ordinary income (no AMT impact from the grant itself).',
        '**Liquidity windows.** Private-company ISOs and NSOs often have only narrow exercise windows (post-termination 90-day window is common). RSUs are simpler — at vest, you get shares.',
        '**State residency arbitrage.** RSU vests are sourced to where you worked during the vesting period. Option exercises are sourced to where you live at exercise. Movers gain more flexibility with options.',
      ],
    },
    { type: 'h2', text: 'When each regime wins' },
    {
      type: 'p',
      text:
        'There is no universally best grant type — each wins in different scenarios:',
    },
    {
      type: 'ol',
      items: [
        '**RSUs win when:** you cannot or will not front exercise cash, the stock is volatile and you want guaranteed delivery, you want simplicity, or you plan to sell at vest anyway. Most public-company tech workers fall here.',
        '**ISOs win when:** you have cash to exercise + hold for the qualifying period, you have AMT credit-recovery capacity in future years, and the stock has significant upside above the strike. Pre-IPO startup employees with low-strike grants are the classic case.',
        '**NSOs win when:** you have cash to exercise but lack §422 preferences (e.g. contractors, board members, or post-termination employees), you want capital-gains treatment on the post-exercise appreciation, and you can manage the immediate ordinary income hit at exercise.',
      ],
    },
    { type: 'h2', text: 'Hybrid grants and edge cases' },
    {
      type: 'ul',
      items: [
        '**Double-trigger RSUs (pre-IPO companies).** Vesting requires both time + a liquidity event (IPO or acquisition). The "vest" doesn\'t happen for tax purposes until both triggers fire. Allows employees to accumulate shares without immediate tax — but creates a giant ordinary-income event at IPO when years of cumulative vesting hits at once.',
        '**§83(b) election for early-exercise NSOs / restricted stock.** If your option plan allows early exercise of unvested options, you can §83(b)-elect to be taxed on the bargain element at exercise (when the spread is usually $0 or tiny). All future appreciation is then LTCG. High-stakes election — must file with IRS within 30 days of exercise, no extensions.',
        '**Disqualifying ISO disposition.** Sell an ISO share before the qualifying period (2 yr grant + 1 yr exercise) and the bargain element becomes ordinary W-2 income in the year of sale. Reverses the §422 advantage. Sometimes done deliberately when share price has crashed since exercise — converts AMT-driven gain to a regular-tax loss.',
        '**Cashless exercise.** Some brokers let you exercise NSOs (less often ISOs) by selling enough shares immediately to cover the strike + tax. No cash from you, but the exercise still triggers full ordinary income on the bargain element under §83. Convenience, not tax savings.',
      ],
    },
    { type: 'h2', text: 'How to verify the math for your own grant' },
    {
      type: 'ol',
      items: [
        'Read your grant agreement and confirm the type (RSU vs ISO vs NSO). The plan document and the grant notice both must say. ISO grants will reference §422; NSO grants will not.',
        'Calculate the bargain element (options only): (FMV at exercise − strike price) × shares. This is the number that flows into your tax math.',
        'For RSUs: run the RSU Tax Shortfall calculator with your vest gross and current YTD wages. For ISOs: run the ISO/AMT calculator with strike, FMV at exercise, and shares. For NSOs: run the NSO Exercise calculator.',
        'Project your AMT credit recovery (ISOs only) using the AMT Credit Recovery calculator if you exercised in a prior year.',
        'Talk to a CPA before exercising more than $50,000 of bargain element in a single year, especially for ISOs — AMT interactions across multi-year exercises get complex fast.',
      ],
    },
    { type: 'h2', text: 'The takeaway' },
    {
      type: 'p',
      text:
        'RSUs are the simplest equity grant — taxed once at vest at ordinary rates, no cash needed, no holding-period decisions. Stock options defer the tax event to exercise, and split into ISOs (AMT preference, qualifying-disposition LTCG path) and NSOs (ordinary income + FICA at exercise, capital gain on appreciation only). The lowest-total-tax path is usually ISO + qualifying disposition + AMT credit recovery — but it requires cash to exercise, multi-year holding, and tolerating AMT in the exercise year. The simplest path is RSUs sold at vest. The right answer for you depends on whether your situation is closer to "tech worker with public-company RSUs" or "pre-IPO employee with deeply-in-the-money ISOs and runway to wait."',
    },
    {
      type: 'p',
      text:
        'For complex situations (multi-grant mixes, multi-state residency during vesting, $1M+ in any single year, pre-IPO planning), talk to a fee-only fiduciary CPA who specializes in equity comp. Mathstub matches you with vetted equity-comp pros through Harness Wealth — disclosed affiliate link.',
    },
    {
      type: 'p',
      text:
        'Sources: IRC §83 (taxation of property transferred for services); IRC §422 (ISO requirements and treatment); IRC §56(b)(3) (ISO AMT preference); IRC §53 (minimum tax credit); IRC §1(h) (long-term capital gains rates); IRC §1411 (Net Investment Income Tax); IRC §3101 (FICA on NSO bargain element); Treas. Reg. §1.83-7 (RSU vs option treatment); IRS Publication 525 (Taxable and Nontaxable Income); IRS Form 6251 (AMT); IRS Form 8801 (Minimum Tax Credit).',
    },
  ],
};
