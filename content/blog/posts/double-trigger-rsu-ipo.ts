import type { BlogPost } from '../registry';

export const doubleTriggerRsuIpo: BlogPost = {
  slug: 'double-trigger-rsu-ipo-tax',
  title: 'Double-Trigger RSUs at IPO: why a huge tax bill lands all at once',
  description:
    'Double-trigger RSUs vest in two conditions: time AND a liquidity event like an IPO. When both are met, years of accumulated shares become taxable income in a single moment — often with too little withheld. Here is the mechanism and the cash-flow trap.',
  datePublished: '2026-05-20',
  dateModified: '2026-05-20',
  authorName: 'Mathstub Editorial',
  reviewerName: 'Reviewed against IRS primary sources',
  affiliateOfferIds: ['turbotax-premier', 'harness-wealth'],
  quickAnswer:
    'Double-trigger RSUs require two conditions to vest: a time-based service condition AND a liquidity event (usually IPO or acquisition). When the company IPOs, all time-vested shares trigger at once — the full fair-market value becomes ordinary income in that tax year. Employer withholding (often 22% supplemental) is usually far below the real marginal rate, creating a large April shortfall.',
  keyPoints: [
    'Double-trigger RSUs need BOTH time-vesting AND a liquidity event (IPO/acquisition) to vest.',
    'At IPO, years of accumulated shares all become taxable income at once.',
    'The entire fair-market value at vest is ordinary income that year.',
    'Default 22% withholding is usually far too low against a top marginal rate.',
    'The gap between withholding and real tax owed can be six figures.',
  ],
  blocks: [
    {
      type: 'p',
      text:
        'Double-trigger RSUs are the normal way startups hand out equity. The whole point is to protect you (and the company) from getting taxed on shares you cannot actually sell yet. But that protection has a sharp edge. When the second trigger finally fires — usually an IPO — every share you have piled up over the years becomes taxable income in one single year, and often way too little tax got held back.',
    },
    {
      type: 'p',
      text:
        'This is the tax surprise that blindsides freshly-IPO\'d employees. The stock goes public, everyone is celebrating, and then April shows up with a tax bill that is much bigger than what came out of your paychecks. Knowing how this works ahead of time is the difference between a sale you planned and a sale you are forced into.',
    },
    { type: 'h2', text: 'What "double-trigger" really means' },
    {
      type: 'p',
      text:
        'A double-trigger RSU only vests when TWO things have both happened:',
    },
    {
      type: 'ol',
      items: [
        'You put in the time — you stay employed through the normal vesting schedule (say, 4 years with a 1-year cliff). That is the first trigger.',
        'The company has a "liquidity event" — it goes public (IPO) or gets acquired. That is the second trigger.',
      ],
    },
    {
      type: 'p',
      text:
        'With single-trigger RSUs (the usual kind at public companies), shares vest on the time schedule alone and get taxed as they vest. With double-trigger, your time-vested shares sit in a kind of holding pattern — earned, but not yet taxable — until the liquidity event happens. The IPO is what flips all of them to taxable at the same moment.',
    },
    {
      type: 'callout',
      text:
        'Why do startups use double-trigger? Without it, you would owe regular income tax on your RSUs as they time-vest — even though the shares are stuck (no market to sell into) and you have no way to sell any to cover the tax. Double-trigger pushes the tax off until there is actually a market. The downside: all that delayed income then lands in one single year.',
    },
    { type: 'h2', text: 'The all-at-once income spike' },
    {
      type: 'p',
      text:
        'Say you joined a startup 4 years before its IPO, and 40,000 RSUs time-vested over those years. With double-trigger, none of them were taxable as they vested — they were all waiting on the liquidity event. Then the IPO hits, the stock is at $25, and all 40,000 shares land at once:',
    },
    {
      type: 'ul',
      items: [
        '40,000 shares × $25 = $1,000,000 of regular income in the IPO year.',
        'That piles on top of your normal salary — likely shoving you into the 37% top federal bracket.',
        'Your employer holds back at the 22% supplemental rate on the first $1M: $220,000.',
        'But your real rate (federal + state) might be 45-50%+, so what you actually owe is around $450,000+.',
        'The gap left after withholding: $230,000+ due when you file.',
      ],
    },
    {
      type: 'p',
      text:
        'That $230,000 gap is the trap. The good news is the shares are liquid now, so you can sell some to cover it — but only if you plan ahead. A lot of newly-IPO\'d employees glance at the withholding on their pay stub, assume it took care of the tax, and spend or hold the rest. Then April arrives.',
    },
    { type: 'h2', text: 'The lockup makes it worse' },
    {
      type: 'p',
      text:
        'Most IPOs come with a lockup — a 90-to-180-day window where employees are not allowed to sell. If your shares trigger at the IPO (say, in March) but the lockup blocks you from selling until September, you have a taxable event in one quarter and the cash to pay for it in another. And it gets worse: if the stock falls during the lockup, you still owe tax based on the higher IPO-day value, but you can only sell at the lower price afterward.',
    },
    {
      type: 'callout',
      text:
        'The lockup-drop scenario is brutal: you are taxed on what the shares were worth when they triggered (the IPO date), not when you are finally allowed to sell. If the stock drops 40% during a 180-day lockup, you can owe tax on value that has largely vanished by the time you can sell. This is exactly what happened to a lot of people in the 2021-2022 IPO crowd.',
    },
    { type: 'h2', text: 'How to plan for it' },
    {
      type: 'ol',
      items: [
        'Know your trigger date and when the lockup ends. The taxable event is the trigger (usually the IPO date or a few days later), not the lockup expiry.',
        'Estimate what you really owe at your full rate — not the 22% that got withheld. The gap between them is what you need to set aside.',
        'Plan a sale right when the lockup ends, sized to cover that tax gap — before you spend anything or diversify.',
        'If the stock bounces around a lot, remember the tax is locked in at the trigger-date value but your sale proceeds are not — leave yourself a cushion.',
        'Make a Q4 estimated payment or a W-4 top-up to cover the gap and dodge the underpayment penalty.',
      ],
    },
    {
      type: 'p',
      text:
        'Double-trigger is genuinely a good deal for employees — it keeps you from being taxed on shares you cannot sell. But because all that income bunches into one year, you get a single year with a monster tax bill, and the withholding system just is not built to keep up. Plan the sale, set aside the gap, and the IPO becomes a windfall instead of a cash-flow crisis.',
    },
    { type: 'h2', text: 'When to get help' },
    {
      type: 'ul',
      items: [
        'Your company just announced an IPO or acquisition and you hold double-trigger RSUs.',
        'You expect $500k+ of RSU income to trigger in a single year.',
        'You face a lockup and need to plan when to sell against when the tax is due.',
        'You have other equity too (ISOs, ESPP) that piles onto the same one-year income spike.',
      ],
    },
    {
      type: 'callout',
      text:
        'A double-trigger IPO is one of the highest-stakes tax moments in a tech career — often a six-figure bill. A CPA who maps out the trigger, the lockup, and the sale timing is worth far more than the fee. Mathstub matches you with equity-comp specialists via Harness Wealth — disclosed affiliate link.',
    },
    {
      type: 'p',
      text:
        'Sources: IRC §83(a) (property transferred for services — taxable at vest); Treas. Reg. §1.83-1; IRC §451 (timing of income inclusion); Rev. Rul. 2004-... [constructive receipt principles for liquidity-conditioned RSUs]; IRS Publication 525 (Taxable and Nontaxable Income); Treas. Reg. §31.3402(g)-1 (supplemental wage withholding).',
    },
  ],
};
