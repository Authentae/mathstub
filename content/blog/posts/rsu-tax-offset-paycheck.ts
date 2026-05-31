import type { BlogPost } from '../registry';

export const rsuTaxOffsetPaycheck: BlogPost = {
  slug: 'rsu-tax-offset-paycheck',
  title: 'What is the "RSU Tax Offset" on my paycheck?',
  description:
    'A line called “RSU Tax Offset” on your pay stub can be confusing. It is how payroll squares the tax it withheld on vested shares with your cash wages. Here is what it means.',
  datePublished: '2026-05-28',
  dateModified: '2026-05-28',
  authorName: 'Mathstub Editorial',
  reviewerName: 'Reviewed against IRS primary sources',
  affiliateOfferIds: ['turbotax-premier'],
  quickAnswer:
    'An "RSU Tax Offset" on your pay stub is a payroll bookkeeping entry. When RSUs vest, their value is added to your wages and tax is withheld — often by selling some shares (sell-to-cover) or by deducting from cash. The offset line reconciles the RSU value added to income against the tax withheld and shares delivered, so your net pay reflects the correct amount. It is not an extra tax.',
  keyPoints: [
    'The RSU Tax Offset is a payroll reconciliation entry, not an additional tax.',
    'It appears because RSU value is added to taxable wages, then tax is withheld.',
    'Often pairs with a sell-to-cover, where shares are sold to pay withholding.',
    'Your net cash pay is adjusted so you are not paid the RSU value in cash twice.',
    'Check that total withholding covers your real marginal rate, not just 22%.',
  ],
  blocks: [
    {
      type: 'p',
      text:
        'You open your pay stub the week your RSUs vested and spot a weird line: "RSU Tax Offset," usually a negative number that drags down your take-home pay. Naturally you think: wait, am I getting taxed again? Did payroll mess up?',
    },
    {
      type: 'p',
      text:
        'Almost certainly not. The RSU Tax Offset is just a bookkeeping trick payroll uses to square the value of your vested shares with the tax it took out. Here is exactly what it is doing.',
    },
    {
      type: 'h2',
      text: 'Why this line exists at all',
    },
    {
      type: 'p',
      text:
        'When RSUs vest, two things hit payroll\'s books at the same moment: (1) the value of the vested shares gets added to your taxable wages, and (2) tax has to come out of that value. Here is the snag — the RSU value is not cash in your paycheck. It is shares. So payroll needs a way to add the income, take out the tax, and still NOT pay you the share value as cash on top.',
    },
    {
      type: 'p',
      text:
        'That is the offset\'s whole job. It adds the RSU value to your wages so the tax math works, then quietly subtracts the same amount back out — because you already got that value as shares, not cash.',
    },
    {
      type: 'h2',
      text: 'A simple pay stub walkthrough',
    },
    {
      type: 'p',
      text:
        'Picture 100 shares vesting at $50 each — $5,000 of RSU income. Your employer uses sell-to-cover, meaning it sells just enough shares to pay the tax. Here is roughly what shows up on your stub:',
    },
    {
      type: 'ul',
      items: [
        'Earnings: +$5,000 of RSU income added to your gross wages.',
        'Tax withheld: about $1,100 (22% federal) plus Social Security, Medicare, and state — call it $1,500 total.',
        'RSU Tax Offset: −$5,000 to pull the non-cash RSU value back out of your cash pay.',
        'Net effect: your cash pay drops by the tax withheld, and you keep the leftover shares.',
      ],
    },
    {
      type: 'p',
      text:
        'The offset is that −$5,000 line. Without it, payroll would be handing you $5,000 in cash on top of the shares — paying you twice. The offset cancels out the duplicate, so the only thing that actually shrinks your take-home is the tax.',
    },
    {
      type: 'callout',
      text:
        'The RSU Tax Offset is not a tax. It is the accounting entry that stops you from getting paid the RSU value twice — once as shares, once as cash. The real tax is the withholding line, which is a separate thing.',
    },
    {
      type: 'h2',
      text: 'Sell-to-cover vs. other ways to pay the tax',
    },
    {
      type: 'p',
      text:
        'How your employer covers the tax changes what you see on the stub:',
    },
    {
      type: 'ol',
      items: [
        '**Sell-to-cover:** The most common one. Your plan administrator sells just enough vested shares to cover the tax, and you keep the rest. The offset squares up the value of the sold shares.',
        '**Net share settlement:** The company keeps back some shares instead of selling them on the market. Fewer shares show up in your account, but the tax still gets covered.',
        '**Cash withholding:** Rare, but some employers pull the RSU tax straight out of your regular salary instead of selling shares. That hits your take-home harder on vest days.',
      ],
    },
    {
      type: 'p',
      text:
        'In all three, an offset-style line keeps the books straight between the RSU income that got added and however the tax got covered.',
    },
    {
      type: 'h2',
      text: 'What to actually keep an eye on',
    },
    {
      type: 'p',
      text:
        'The offset itself is harmless. The real thing to watch is whether enough tax came out. If your employer withholds at the flat 22% rate but your real top rate is 32% or higher, the offset bookkeeping will look perfectly fine — while you are quietly having too little taken out and may owe at tax time.',
    },
    {
      type: 'p',
      text:
        'So when you see the RSU Tax Offset, do not stress about that line. Instead, look at the withholding line and compare it to your real top rate. That is where the actual risk is hiding.',
    },
    {
      type: 'h2',
      text: 'Three more pay-stub lines that confuse people',
    },
    {
      type: 'p',
      text:
        'The RSU Tax Offset is not the only odd line that shows up on a vest-day stub. A few others trip people up the same way:',
    },
    {
      type: 'ul',
      items: [
        '**"RSU income" or "Stock comp":** This is the positive line that adds the share value to your wages. It is the income half of the entry the offset later cancels in cash terms.',
        '**"Imputed income":** A general term for non-cash value added to your wages for tax purposes. Your RSU value can show up under this label instead of a plain "RSU" line.',
        '**A big jump in year-to-date taxes:** On a vest week your withholding spikes because a chunk of share value just got taxed all at once. The next normal paycheck goes back to looking normal.',
      ],
    },
    {
      type: 'p',
      text:
        'None of these are extra taxes. They are all just payroll showing its work as it moves a non-cash thing (shares) through a system built for cash.',
    },
    {
      type: 'h2',
      text: 'The one number that actually matters',
    },
    {
      type: 'p',
      text:
        'If you only check one thing on a vest-day stub, make it the federal withholding rate on the RSU income. Divide the federal tax withheld on the vest by the RSU value. If it comes out to 22% but your real top rate is 32% or higher, you are quietly under-withheld and may owe in April. That gap, not the scary-looking offset line, is the thing worth your attention.',
    },
    {
      type: 'p',
      text:
        'Sources: IRC §83(a) (RSU income at vesting); IRC §3402 (wage withholding); Treas. Reg. §31.3402(g)-1 (supplemental wage withholding); IRS Publication 15 (Circular E).',
    },
  ],
};
