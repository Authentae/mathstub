import type { BlogPost } from '../registry';

export const rsuCostBasisFixForm8949: BlogPost = {
  slug: 'rsu-cost-basis-fix-form-8949',
  title: 'Your 1099-B shows $0 cost basis for RSUs. Here is how to fix it',
  description:
    'Brokers routinely report $0 cost basis on sold RSU shares, which makes you overpay tax on income you already paid. Here is the Form 8949 fix, step by step.',
  datePublished: '2026-05-22',
  dateModified: '2026-05-22',
  authorName: 'Mathstub Editorial',
  reviewerName: 'Reviewed against IRS primary sources',
  affiliateOfferIds: ['turbotax-premier', 'taxact-premier'],
  quickAnswer:
    'When you sell vested RSUs, your broker often reports $0 cost basis on Form 1099-B, even though you already paid ordinary income tax on the shares at vesting. Left uncorrected, you pay tax twice. Fix it on Form 8949 by entering the correct basis (the vest-date FMV) in column (e), using code B in column (f) and the adjustment in column (g).',
  keyPoints: [
    'Brokers frequently report $0 or missing cost basis for RSU sales.',
    'Your true basis is the fair-market value at vesting — the amount already taxed as income.',
    'Report the sale on Form 8949 with the corrected basis.',
    'Use code B in column (f) and the adjustment amount in column (g).',
    'This prevents paying capital gains tax on income you already paid tax on.',
  ],
  blocks: [
    {
      type: 'p',
      text:
        'This is the single most expensive mistake RSU holders make on their taxes — and the IRS will not flag it for you. When you sell vested RSU shares, your broker sends you (and the IRS) a form called a 1099-B that reports the sale. The problem: that form very often lists your cost as $0, as if the shares were free.',
    },
    {
      type: 'p',
      text:
        'If you take that $0 at face value, you will pay capital gains tax on the WHOLE sale — including the part you already paid regular income tax on back when the shares vested. That is real double taxation, and it can cost you thousands.',
    },
    {
      type: 'h2',
      text: 'Why does the broker put $0?',
    },
    {
      type: 'p',
      text:
        'It is not a conspiracy. It is a gap in the rules. Brokers are only required to report a cost they actually have on file. For shares you got through equity pay (RSUs, ESPP, options), the broker usually never receives the income number from your employer. So they report the only thing they know: $0, or sometimes just the cash you paid out of pocket (which for RSUs is almost always nothing).',
    },
    {
      type: 'p',
      text:
        'Meanwhile, the full value of those shares on your vest day was already added to your W-2 as income, and you paid tax on it. That value is your real cost — what you already paid tax on — under IRC §1012. The broker just does not know that.',
    },
    {
      type: 'h2',
      text: 'The fix: Form 8949 columns (e), (f), and (g)',
    },
    {
      type: 'p',
      text:
        'Form 8949 is where you report stock sales. It has columns built specifically to let you correct a wrong cost number from a 1099-B. Here is how to use them:',
    },
    {
      type: 'ol',
      items: [
        'Column (d): enter what you sold the shares for. This matches your 1099-B.',
        'Column (e): enter the CORRECT cost — what the shares were worth on your vest day. This is the number the broker probably got wrong.',
        'Column (f): enter code **B**. This tells the IRS you are fixing the cost the 1099-B reported.',
        'Column (g): enter the adjustment — the difference between the wrong cost and the right one, as a negative number if it shrinks your gain.',
      ],
    },
    {
      type: 'callout',
      text:
        'Code B is your friend. It says to the IRS: "the broker reported the wrong cost, and here is my correction." This is routine and totally expected — not a red flag. Millions of people with equity pay file Form 8949 with code B every year.',
    },
    {
      type: 'h2',
      text: 'A worked example',
    },
    {
      type: 'p',
      text:
        'Say 200 RSUs vested when the stock was $80, so $16,000 got added to your W-2 as income. Months later you sell all 200 shares at $90, for $18,000.',
    },
    {
      type: 'ul',
      items: [
        'Your 1099-B reports: proceeds $18,000, cost **$0**.',
        'If you do nothing, you get taxed on the full **$18,000** as a gain.',
        'Your real cost is **$16,000** (the vest-day value you already paid income tax on).',
        'Your actual gain is just **$2,000** ($18,000 − $16,000).',
        'The fix saves you tax on $16,000 of gain that was never really a gain.',
      ],
    },
    {
      type: 'p',
      text:
        'At a 15% long-term capital gains rate, fixing that cost saves you $2,400. At higher combined rates, you save even more. This is not a gray area — it is the correct, IRS-blessed way to report the sale.',
    },
    {
      type: 'h2',
      text: 'How to find your correct cost',
    },
    {
      type: 'ol',
      items: [
        'Pull up the vesting confirmation from your equity platform (Schwab, Fidelity, E*TRADE, Shareworks).',
        'Find the share price on your vest date.',
        'Multiply it by the number of shares that vested. That is your total cost.',
        'Cross-check your W-2: that vest value should already be sitting in your Box 1 wages.',
      ],
    },
    {
      type: 'p',
      text:
        'Already filed past returns with the $0 mistake? You can fix them with Form 1040-X — usually within three years. Plenty of people get a real refund back this way.',
    },
    {
      type: 'h2',
      text: 'A worked example, start to finish',
    },
    {
      type: 'p',
      text:
        'Say 100 shares vested at $50 each, so $5,000 of value was already added to your W-2 and taxed as income. A year later you sell all 100 at $60, for $6,000. Your broker’s 1099-B lists the cost as $0.',
    },
    {
      type: 'ul',
      items: [
        '**What the broker’s form implies:** $6,000 sale minus $0 cost = $6,000 of "gain" taxed again. That double-taxes the $5,000 you already paid income tax on.',
        '**What is actually true:** your real cost is the $5,000 vest value. So the real gain is just $6,000 minus $5,000 = **$1,000**.',
        '**The fix on Form 8949:** report the sale, then use column (g) with code B to raise the cost from $0 to $5,000. Your taxed gain drops from $6,000 to $1,000.',
      ],
    },
    {
      type: 'p',
      text:
        'At a 24% rate, that one correction is the difference between being taxed on $6,000 (about $1,440) and being taxed on $1,000 (about $240) — roughly **$1,200 saved** on a single small sale. Scale that to a real vesting schedule and the stakes get large fast.',
    },
    {
      type: 'callout',
      text:
        'The $0-cost trap is the single most expensive RSU filing mistake. It is also one of the easiest to fix — one adjusted number on one form. Always check the cost basis on your 1099-B before you file.',
    },
    {
      type: 'p',
      text:
        'Sources: IRC §1012 (cost basis); IRC §83(a) (RSU income at vesting); IRS Form 8949 instructions (basis correction, code B); IRS Publication 525; IRS Form 1099-B instructions.',
    },
  ],
};
