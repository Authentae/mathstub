import type { BlogPost } from '../registry';

export const rsusTaxedTwice: BlogPost = {
  slug: 'do-rsus-get-taxed-twice',
  title: 'Do RSUs get taxed twice? The double-taxation myth, explained with math',
  description:
    'Short answer: no — but RSUs do trigger two separate tax events. Walk the math: vest taxes the FMV as ordinary income, sale taxes only the appreciation as capital gain. Most "double taxation" claims trace to a misread W-2 or 1099-B.',
  datePublished: '2026-05-16',
  dateModified: '2026-05-16',
  authorName: 'Mathstub Editorial',
  reviewerName: 'Reviewed against IRS primary sources',
  affiliateOfferIds: ['turbotax-premier', 'taxact-premier'],
  quickAnswer:
    'No. Each RSU dollar is taxed exactly once. At vest, the fair-market value is taxed as ordinary W-2 income under IRC §83(a). Your cost basis equals that FMV per IRC §1012. At sale, only the appreciation FROM vest TO sale is taxed as capital gain. The "double taxation" panic almost always traces to a Form 1099-B showing $0 cost basis — fix it on Form 8949 column (g).',
  blocks: [
    {
      type: 'p',
      text:
        'Every tax season, the same thread appears on r/personalfinance: "My RSUs were taxed at vest, and now they are being taxed AGAIN when I sell? Am I being double-taxed?" The short answer is no. But there are two real tax events on a vested RSU share, and if you read your W-2 and 1099-B wrong (which most people do), the math looks like double taxation. Here is the actual rule, with the cost-basis logic that resolves it.',
    },
    { type: 'h2', text: 'The two tax events on a vested RSU' },
    {
      type: 'p',
      text:
        'Every RSU share you receive has exactly two tax moments. They tax different things, not the same thing twice.',
    },
    {
      type: 'ol',
      items: [
        '**At vest.** The fair-market value of the share on the vesting date is treated as ordinary W-2 income. Your employer withholds at the supplemental rate (22% federal, plus state, Medicare, and Social Security). This is reported in Box 1 of your W-2.',
        '**At sale.** The capital gain or loss is calculated as (sale price − cost basis) × shares. Your cost basis is the FMV at vest — the same value already taxed as W-2 income at step 1. So the sale only taxes the appreciation FROM vest TO sale, not the value of the share itself.',
      ],
    },
    {
      type: 'p',
      text:
        'Result: each dollar is taxed exactly once. The vested value is taxed at ordinary rates (step 1). The appreciation is taxed at capital-gain rates (step 2). The two amounts are mutually exclusive — they add up to the total economic gain, no overlap.',
    },
    { type: 'h2', text: 'Worked example — same FMV, no double tax' },
    {
      type: 'p',
      text:
        'You receive 100 RSUs that vest at $50/share (total FMV = $5,000). You sell all 100 immediately at $50/share. How much tax?',
    },
    {
      type: 'ul',
      items: [
        'Step 1 (vest): $5,000 ordinary W-2 income. At a 32% federal marginal rate plus 9.3% CA state plus 1.45% Medicare, that is roughly $2,140 in tax.',
        'Step 2 (sale): cost basis = $50/share × 100 = $5,000. Sale proceeds = $5,000. Capital gain = $0. Tax on sale = $0.',
        'Total tax: $2,140 on a $5,000 gain. Effective rate ~43%. Not double, just once at ordinary income rates because the price did not move between vest and sale.',
      ],
    },
    { type: 'h2', text: 'Worked example — stock appreciated between vest and sale' },
    {
      type: 'p',
      text:
        'Same 100 RSUs vest at $50/share, but you hold for 18 months and sell at $80/share.',
    },
    {
      type: 'ul',
      items: [
        'Step 1 (vest): $5,000 ordinary W-2 income, ~$2,140 in tax (same as above).',
        'Step 2 (sale): cost basis = $50/share × 100 = $5,000. Sale proceeds = $80/share × 100 = $8,000. Long-term capital gain = $3,000. At 15% federal LTCG + 9.3% CA + 3.8% NIIT (if MAGI > $200k single) = $840 in tax.',
        'Total tax: $2,140 + $840 = $2,980 on an $8,000 gain. The $5,000 from step 1 is taxed at ordinary rates. The $3,000 of appreciation from $50 to $80 is taxed at LTCG rates. No dollar is taxed twice.',
      ],
    },
    { type: 'h2', text: 'Why people think they are being double-taxed' },
    {
      type: 'p',
      text:
        'Three common misreadings cause the panic:',
    },
    {
      type: 'ol',
      items: [
        '**Brokers report the wrong cost basis on Form 1099-B.** Many brokers (Schwab, Fidelity, Etrade) historically reported the cost basis as $0 or as the purchase price (which for RSUs is $0). This means your tax software calculates a capital gain on the FULL sale price, not just the appreciation — overstating your gain by the vested value. The fix: manually adjust the cost basis on Form 8949 to equal the FMV at vest, which is the actual value already taxed as W-2 income. Look for "Box 12 cost basis was not reported to the IRS" on your 1099-B.',
        '**The vest hits Box 1 of W-2 in the same year as the sale.** When both events happen in the same calendar year, the W-2 income figure looks inflated, and people assume the proceeds are being counted twice. They are not — the W-2 has the vest, the 1099-B has the sale, and they are separate line items on your return.',
        '**Withholding looks too high at vest.** Supplemental withholding can stack to 30-40% (federal 22% + state + Medicare + SS), which people misread as "double tax." It is only one tax event being withheld at high rates because of the supplemental wage rule. (See our separate post on RSU over-withholding for the full math.)',
      ],
    },
    {
      type: 'callout',
      text:
        'The single most common RSU tax error is failing to adjust the 1099-B cost basis to the FMV at vest. This causes you to pay tax twice on the vested value — once via W-2 at vest, again via Schedule D at sale. The IRS allows you to fix this on Form 8949 column (g) "adjustment". If you do not, you are literally double-paying.',
    },
    { type: 'h2', text: 'How to verify your own RSU taxes are clean' },
    {
      type: 'p',
      text:
        'Three checks to run when you file:',
    },
    {
      type: 'ol',
      items: [
        '**Trace the vest gross.** Your year-end W-2 Box 1 should include the vested FMV. Your December pay stub (or Workday/ADP year-to-date earnings statement) should show "RSU vest" as a line item. Confirm the two numbers reconcile.',
        '**Check the 1099-B cost basis.** Pull your 1099-B from the broker. For each RSU sale lot, the cost basis should equal the FMV at the corresponding vest date × shares sold. If the 1099-B shows $0 or a different number, you must adjust it on Form 8949.',
        '**Calculate the implied total tax.** Add the W-2 ordinary tax on the vest to the capital-gain tax on (sale price − basis). This should equal your total RSU-related tax owed for the year. If it does not match what your return shows, the cost-basis adjustment is missing.',
      ],
    },
    { type: 'h2', text: 'What is NOT a tax event' },
    {
      type: 'p',
      text:
        'A few moments that look like they should trigger tax but do not:',
    },
    {
      type: 'ul',
      items: [
        'The grant of RSUs. No tax until they actually vest. The grant itself is just a promise.',
        'Holding vested RSU shares without selling. No tax. The FMV-at-vest was already taxed; further holding only changes the eventual capital-gain math.',
        'Transferring vested shares into your own brokerage account. No tax. It is the same owner, no taxable disposition.',
        'Donating RSUs to charity. This is a deductible event — you can take a deduction at FMV without paying cap gain on the appreciation. (Separate post topic.)',
      ],
    },
    { type: 'h2', text: 'The takeaway' },
    {
      type: 'p',
      text:
        'RSUs are taxed once, in two parts: ordinary income at vest, and capital gain/loss at sale. The "double-taxation" complaint almost always traces to a broker reporting a $0 cost basis on Form 1099-B that you forgot to adjust. If you adjust the basis correctly, the math works out clean — each dollar is taxed exactly once at the rate appropriate to its character (ordinary at vest, capital at appreciation).',
    },
    {
      type: 'p',
      text:
        'Use the RSU Tax Shortfall calculator to project your total tax owed for the year and check whether your withholding plus expected tax owed matches. Catch the cost-basis error in March, not April.',
    },
    {
      type: 'p',
      text:
        'Sources: IRC §83(a) (taxation of property transferred for services); IRC §1012 (cost basis); Treas. Reg. §1.83-2; IRS Publication 525 (Taxable and Nontaxable Income); IRS Form 8949 instructions (cost basis adjustments); IRC §6654 (estimated tax safe harbor).',
    },
  ],
};
