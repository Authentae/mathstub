import type { BlogPost } from '../registry';

export const rsuWashSaleRule: BlogPost = {
  slug: 'rsu-wash-sale-rule',
  title: 'RSU wash sale rule: how a vest can quietly disallow your stock loss',
  description:
    'Selling company stock at a loss? An RSU vest within 30 days — before or after — counts as an "acquisition" under the wash sale rule and can disallow part of that loss. Here is how the §1091 trap works for RSU and ESPP holders, what gets disallowed, and how to avoid it.',
  datePublished: '2026-06-10',
  dateModified: '2026-06-10',
  authorName: 'Mathstub Editorial',
  reviewerName: 'Reviewed against IRS primary sources',
  affiliateOfferIds: ['turbotax-premier', 'harness-wealth'],
  quickAnswer:
    'The wash sale rule (IRC §1091) disallows a loss if you buy "substantially identical" stock within 30 days before or after selling at a loss — a 61-day window. The RSU trap: an RSU vest counts as an acquisition of company stock, so if you sell company shares at a loss and any RSUs vest (or an ESPP purchase happens) within that window, the loss is disallowed in proportion to the shares acquired. The loss is not gone forever — it is added to the cost basis of the newly acquired shares — but it is deferred, sometimes for years. Fix: check your vest calendar before selling company stock at a loss.',
  keyPoints: [
    'Wash sale rule: a loss is disallowed if you acquire the same stock within 30 days before or after the sale.',
    'The trap: an RSU vest (and an ESPP purchase) counts as "acquiring" the stock — even though you did not buy it.',
    'So selling company shares at a loss near a vest date can wipe out the tax benefit of that loss.',
    'It is partial: only the loss on the number of shares that vested in the window is disallowed.',
    'The disallowed loss is not lost — it is added to the basis of the vested shares and recovered when you sell those.',
    'Avoid it: check all your grant vest dates and ESPP purchase dates before selling company stock at a loss.',
  ],
  blocks: [
    {
      type: 'p',
      text:
        'You sell some of your company stock at a loss to harvest the tax deduction — a normal, smart move. Then at filing your broker reports part of that loss as "disallowed," and you cannot use it. The culprit is almost always the wash sale rule colliding with your RSU vesting schedule. It is one of the least-understood traps in equity comp because the "purchase" that triggers it is not a purchase you consciously made — it is your RSUs vesting.',
    },
    { type: 'h2', text: 'What the wash sale rule actually says' },
    {
      type: 'p',
      text:
        'Under IRC §1091, if you sell a security at a loss and acquire "substantially identical" stock within 30 days before or 30 days after that sale, the loss is disallowed. That is a 61-day window centered on the sale date (30 before + the day of + 30 after). The purpose is to stop people from selling purely to book a tax loss while staying invested.',
    },
    {
      type: 'callout',
      text:
        'The disallowed loss is not destroyed. It is added to the cost basis of the replacement shares (and their holding period is extended). You get the benefit back when you eventually sell those replacement shares — but the deduction is deferred, possibly for years.',
    },
    { type: 'h2', text: 'Why RSUs spring the trap' },
    {
      type: 'p',
      text:
        'Here is the part that catches people. The wash sale rule is triggered by acquiring substantially identical stock — and the IRS treats the vesting of RSUs as an acquisition of your company shares, even though you never placed a buy order. Same employer, same ticker, so the shares are "substantially identical" to the ones you sold at a loss. An ESPP purchase, a dividend reinvestment (DRIP), and an option exercise all count as acquisitions too.',
    },
    {
      type: 'flow',
      caption: 'The collision',
      steps: [
        { label: 'Sell ACME at a loss', value: '−$8,000', tone: 'bad' },
        { label: 'RSUs vest within 30 days', value: 'counts as buying', tone: 'bad' },
        { label: 'Loss disallowed (deferred)', value: 'no deduction now', tone: 'bad' },
      ],
    },
    {
      type: 'p',
      text:
        'So if you have quarterly or monthly RSU vests — common at large tech companies — there is almost always a vest within 30 days of any given date. That makes it very easy to accidentally trip the rule when you sell company stock at a loss.',
    },
    { type: 'h2', text: 'It is partial, not all-or-nothing' },
    {
      type: 'p',
      text:
        'The wash sale only disallows the loss proportional to the shares you acquired in the window. The replacement count, not the sale count, is what matters.',
    },
    {
      type: 'table',
      caption: 'Example: sell 1,000 shares at a $10,000 loss',
      headers: ['Shares that vested within the ±30-day window', 'Loss disallowed', 'Loss you can still claim'],
      rows: [
        ['0', '$0', '$10,000'],
        ['100', '$1,000 (deferred)', '$9,000'],
        ['1,000 or more', '$10,000 (deferred)', '$0'],
      ],
    },
    {
      type: 'p',
      text:
        'So 50 RSUs vesting near a 1,000-share loss sale only disallows the loss on 50 shares — a nuisance, not a catastrophe. The damage scales with how many shares hit your account in the window.',
    },
    { type: 'h2', text: 'The sale-to-cover question' },
    {
      type: 'p',
      text:
        'A common worry: "my RSUs vest with sell-to-cover — does that sale trigger a wash sale?" Usually not by itself. At vest, the shares are delivered at fair market value and the sell-to-cover sells some of them at essentially that same price, so there is little or no loss to disallow. The wash sale risk comes from a separate, deliberate sale of company stock at a loss that happens to land within 30 days of a vest (or ESPP purchase) — not from the routine vest-and-sell-to-cover itself.',
    },
    { type: 'h2', text: 'How to avoid it' },
    {
      type: 'ol',
      items: [
        'Before selling company stock at a loss, list every RSU grant\'s upcoming and recent vest dates, plus any ESPP purchase dates and DRIP dates.',
        'Make sure no shares are acquired in the 30 days before or after your planned sale date. If a vest is close, wait until the window clears.',
        'If you cannot avoid the window (e.g., monthly vesting), accept that the proportional loss is deferred into the new shares\' basis — you still get it back eventually.',
        'Turn off dividend reinvestment on company stock if you plan to harvest losses, since DRIP purchases silently trigger the rule.',
        'Never let the replacement acquisition happen inside an IRA — a wash sale against an IRA purchase permanently destroys the loss (it cannot be added to IRA basis).',
      ],
    },
    {
      type: 'callout',
      text:
        'Note: the IRS has not issued RSU-vesting-specific wash sale guidance, so the position that a vest is an "acquisition" is the prevailing, conservative interpretation that brokers and CPAs apply. Treat it as the safe assumption and confirm edge cases with a CPA.',
    },
    { type: 'h2', text: 'How it shows up at filing' },
    {
      type: 'p',
      text:
        'Your broker reports wash sales on Form 1099-B and flags the disallowed amount in box 1g ("wash sale loss disallowed"), which flows to Form 8949. Brokers only track wash sales within the same account, though — if your loss sale is in one brokerage and the vesting/replacement shares are in another (common when RSUs sit at a different custodian than your personal brokerage), the broker will NOT catch it and you are responsible for reporting the wash sale yourself. This cross-account case is where most people get it wrong.',
    },
    { type: 'h2', text: 'The takeaway' },
    {
      type: 'p',
      text:
        'The wash sale rule turns a routine RSU vest into an accidental "purchase" that can disallow a stock loss you were counting on. The fix is simple once you know to look: before selling company stock at a loss, check that no RSUs vest, no ESPP shares are bought, and no dividends reinvest within the 30 days before or after. The disallowed loss is only deferred, not lost — but if you want the deduction this year, keep the sale clear of the window, and watch the cross-account case your broker cannot see.',
    },
    {
      type: 'p',
      text:
        'Sources: IRC §1091 (wash sales of stock or securities); IRS Publication 550 (Investment Income and Expenses — wash sale rules and basis adjustment); Form 8949 and Form 1099-B box 1g (wash sale loss disallowed). The treatment of RSU vesting as an "acquisition" is the prevailing interpretation applied by brokers and tax practitioners; the IRS has not published RSU-vest-specific guidance, so confirm high-stakes cases with a CPA. Educational information, not tax advice.',
    },
  ],
};
