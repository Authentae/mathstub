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
        'The biggest source of confusion with tech-worker equity is mixing up how RSUs are taxed with how stock options are taxed. They are not the same. And even "stock options" splits into two totally different flavors — ISOs and NSOs — that get taxed differently even from the exact same move. Let us put all three side by side with real numbers so you can spot which one you have.',
    },
    { type: 'h2', text: 'The three types in plain English' },
    {
      type: 'ul',
      items: [
        '**RSU (Restricted Stock Unit).** A promise to hand you shares on a future date. Taxed when they vest, on their full value, as regular salary income. Your cost (what you already paid tax on) equals the vest-day value. Nothing is taxed when you first get the grant.',
        '**ISO (Incentive Stock Option).** The right to buy shares at a locked-in price. Tax-friendly: no regular income tax at grant, at vesting, or even when you buy. But the discount you get (share value minus your buy price) counts toward a separate tax called the AMT. If you then hold the shares long enough (2 years from grant, 1 year from when you bought), your entire gain gets the lower long-term capital-gains rate.',
        '**NSO (Non-Qualified Stock Option).** Also the right to buy shares at a locked-in price, but without the ISO perks. The discount (share value minus your buy price) is taxed as regular salary the day you buy, plus Social Security and Medicare. After that, any further growth is a capital gain when you sell.',
      ],
    },
    {
      type: 'callout',
      text:
        'The headline difference is **timing**: RSUs get taxed when they vest — you do not have to do anything. Options only get taxed when you choose to buy. ISOs push the regular tax even further out (only the AMT can bite) until you finally sell. NSOs hit you with regular income tax the moment you buy.',
    },
    { type: 'h2', text: 'Worked example — 1,000 shares, same company, three grant types' },
    {
      type: 'p',
      text:
        'Say you get a grant of 1,000 shares (or the option version) from a tech employer. The grant-day value is $10/share, the buy price for options is $10/share, and it vests over time. Two years in, all 1,000 shares vest. The price has climbed to $50/share. You hold two more years, the price hits $100/share, and you sell. You are single, live in California, and have $200k of other salary income. Here is the math for each path:',
    },
    { type: 'h3', text: 'Path A — RSUs' },
    {
      type: 'ul',
      items: [
        'At grant: no tax (nothing has changed hands yet).',
        'At vest (year 2, $50/share): 1,000 × $50 = $50,000 of regular salary income. Tax: 32% federal + 9.3% CA + 1.45% Medicare = ~21,375. Your cost is now $50,000.',
        'At sale (year 4, $100/share): you get $100,000. Your gain is $100,000 − $50,000 = $50,000, taxed at the lower long-term rate (you held over a year past vest). Tax: 15% federal + 9.3% CA + 3.8% NIIT = ~14,050.',
        'Total tax: $35,425 on $100,000 of total gain. Effective rate: 35.4%.',
      ],
    },
    { type: 'h3', text: 'Path B — ISOs' },
    {
      type: 'ul',
      items: [
        'At grant: no tax.',
        'At vest (year 2): no tax. With ISOs, vesting alone is not a taxable event.',
        'When you buy (say year 2, right after vest, $50/share): you pay $10/share × 1,000 = $10,000 cash to buy in. Your discount is ($50 − $10) × 1,000 = $40,000. That is NOT regular income — but it DOES count toward the AMT. With a $40k add-back on top of $200k of regular income, the AMT usually kicks in — the calculator pegs it at about $8,000 of AMT for that year.',
        'At sale (year 4, $100/share, held long enough): you get $100,000. Your cost is $10,000 (what you paid to buy). The whole $90,000 is a long-term gain. Tax: 15% federal + 9.3% CA + 3.8% NIIT = ~25,290.',
        'Getting the AMT back: that $8,000 of AMT you paid turns into a credit you claw back in later years when your regular tax is higher than your AMT. Often fully recovered within 3-5 years.',
        'Total tax: $33,290 over the whole stretch, before getting the AMT credit back. After recovery: ~$25,290. Effective rate: 25.3% (the lowest of the three).',
      ],
    },
    { type: 'h3', text: 'Path C — NSOs' },
    {
      type: 'ul',
      items: [
        'At grant: no tax.',
        'At vest: no tax (vesting alone does not trigger tax for options you have not bought yet).',
        'When you buy (year 2, $50/share): you pay $10,000 cash. Your discount ($40,000) is regular salary income. Tax: 32% federal + 9.3% CA + 1.45% Medicare + 0.9% extra Medicare (above $200k for the year) = ~17,500. Your cost is now $50,000.',
        'At sale (year 4, $100/share): you get $100,000. Your gain is $100,000 − $50,000 = $50,000, long-term. Tax: 15% federal + 9.3% CA + 3.8% NIIT = ~14,050.',
        'Total tax: $31,550 on $100,000 of total gain. Effective rate: 31.5%.',
      ],
    },
    {
      type: 'p',
      text:
        'Ranking cheapest to priciest for the exact same outcome: ISO ($25k after getting the credit back) < NSO ($31.5k) < RSU ($35.4k). The ISO win comes from turning all $90,000 of growth into a long-term gain — but it costs you cash up front to buy, the risk of paying AMT, and the patience to hold long enough. RSUs give up some of that tax savings in exchange for zero cash up front and zero timing decisions.',
    },
    { type: 'h2', text: 'The trade-offs behind the numbers' },
    {
      type: 'p',
      text:
        'The tax differences are real, but they hide some big non-tax trade-offs:',
    },
    {
      type: 'ul',
      items: [
        '**Cash needed.** RSUs need no cash out of pocket (your employer sells some shares to cover the tax). ISO and NSO buys need cash for the buy price (and NSOs also need tax on the discount). For a 10,000-share grant at a $10 buy price, that is $100,000 in cash. Plenty of people never buy in simply because they do not have it.',
        '**Downside.** RSUs hand you shares whether the stock went up or down — you always get something. Options can expire worthless if the price never beats your buy price.',
        '**Timing freedom.** RSUs: you can sell the same day with no tax penalty (your cost equals the sale price). ISOs: selling the same day blows the tax break and turns the whole discount into regular income. NSOs: same-day selling is fine — fully taxed, but no hidden trap.',
        '**AMT.** Only ISOs can trigger the AMT. RSUs and NSOs just add to your regular income.',
        '**Time windows.** Private-company ISOs and NSOs often give you only a short window to buy (a 90-day window after you leave is common). RSUs are simpler — when they vest, you get shares.',
        '**Moving states.** RSU vests get taxed based on where you worked while they vested. Option buys get taxed based on where you live when you buy. Movers get more flexibility with options.',
      ],
    },
    { type: 'h2', text: 'When each one wins' },
    {
      type: 'p',
      text:
        'There is no single best grant — each one wins in different situations:',
    },
    {
      type: 'ol',
      items: [
        '**RSUs win when** you cannot or do not want to put up cash to buy, the stock is jumpy and you want guaranteed shares, you want simple, or you plan to sell at vest anyway. Most public-company tech workers are here.',
        '**ISOs win when** you have cash to buy and hold long enough, you can use the AMT credit in future years, and the stock has real upside above the buy price. Pre-IPO startup folks with cheap buy prices are the classic case.',
        '**NSOs win when** you have cash to buy but do not get the ISO perks (think contractors, board members, or people past their leave window), you want the lower rate on later growth, and you can stomach the regular-income hit when you buy.',
      ],
    },
    { type: 'h2', text: 'Mixes and oddball cases' },
    {
      type: 'ul',
      items: [
        '**Double-trigger RSUs (pre-IPO companies).** These need both time AND a cash-out event (IPO or buyout) to vest. For tax purposes, the "vest" does not happen until both things occur. That lets you stack up shares without an immediate tax bill — but it sets up a giant regular-income hit at IPO when years of vesting all land at once.',
        '**The §83(b) election (early-buy options / restricted stock).** If your plan lets you buy options early before they vest, you can file an §83(b) election to be taxed on the discount right away (when it is usually $0 or tiny). All future growth then gets the lower long-term rate. High stakes — you have to file with the IRS within 30 days of buying, no extensions.',
        '**Blowing the ISO holding period.** Sell an ISO share too soon (before 2 years from grant + 1 year from buying) and the discount becomes regular income in the year you sell. That reverses the ISO break. Sometimes done on purpose when the price has crashed since you bought — it turns an AMT-driven gain into a regular-tax loss.',
        '**Cashless buy.** Some brokers let you buy NSOs (less often ISOs) by selling just enough shares to cover the buy price + tax. No cash from you, but buying still triggers full regular income on the discount. It is convenience, not a tax saving.',
      ],
    },
    { type: 'h2', text: 'How to check the math for your own grant' },
    {
      type: 'ol',
      items: [
        'Read your grant paperwork and confirm the type (RSU vs ISO vs NSO). Both the plan document and the grant notice have to say. ISO grants mention §422; NSO grants do not.',
        'Work out the discount (options only): (share value when you buy − buy price) × shares. That number drives all the tax math.',
        'For RSUs: run the RSU Tax Shortfall calculator with your vest amount and current year wages. For ISOs: run the ISO/AMT calculator with your buy price, share value at buy, and share count. For NSOs: run the NSO Exercise calculator.',
        'Estimate getting your AMT credit back (ISOs only) with the AMT Credit Recovery calculator if you bought in a prior year.',
        'Talk to a CPA before buying more than $50,000 of discount in a single year, especially for ISOs — the AMT math across multiple years of buying gets messy fast.',
      ],
    },
    { type: 'h2', text: 'The takeaway' },
    {
      type: 'p',
      text:
        'RSUs are the simplest equity grant — taxed once at vest at regular rates, no cash needed, no timing decisions. Options push the tax to when you buy, and split into ISOs (AMT, with a path to the lower long-term rate) and NSOs (regular income + Social Security/Medicare when you buy, lower rate only on later growth). The cheapest path is usually ISO + holding long enough + getting the AMT credit back — but it needs cash to buy, years of patience, and a tolerance for paying AMT in the buy year. The simplest path is RSUs sold at vest. The right answer for you depends on whether you are more "tech worker with public-company RSUs" or "pre-IPO employee with deep-in-the-money ISOs and time to wait."',
    },
    {
      type: 'p',
      text:
        'For tricky situations (a mix of grant types, moving states mid-vest, $1M+ in any single year, pre-IPO planning), talk to a fee-only CPA who specializes in equity comp. Mathstub matches you with vetted equity-comp pros through Harness Wealth — disclosed affiliate link.',
    },
    {
      type: 'p',
      text:
        'Sources: IRC §83 (taxation of property transferred for services); IRC §422 (ISO requirements and treatment); IRC §56(b)(3) (ISO AMT preference); IRC §53 (minimum tax credit); IRC §1(h) (long-term capital gains rates); IRC §1411 (Net Investment Income Tax); IRC §3101 (FICA on NSO bargain element); Treas. Reg. §1.83-7 (RSU vs option treatment); IRS Publication 525 (Taxable and Nontaxable Income); IRS Form 6251 (AMT); IRS Form 8801 (Minimum Tax Credit).',
    },
  ],
};
