import type { BlogPost } from '../registry';

export const rsuCostBasisFixForm8949: BlogPost = {
  slug: 'rsu-cost-basis-fix-form-8949',
  title: 'How to fix the RSU cost-basis double-tax on Form 8949',
  description:
    'Your broker reports cost basis = $0 on RSU sales. If you let that stand, the IRS taxes the same dollars twice — once as W-2 wages at vest, again as capital gain at sale. Fix it with Form 8949 column (g). Step-by-step walkthrough with screenshots for TurboTax + FreeTaxUSA.',
  datePublished: '2026-05-22',
  dateModified: '2026-05-22',
  authorName: 'Mathstub Editorial',
  reviewerName: 'Pending CPA review',
  affiliateOfferIds: ['turbotax-premier', 'freetaxusa'],
  quickAnswer:
    'The broker reports cost basis = $0 on your 1099-B for RSU sales because it only knows you paid $0 to acquire the shares. Your real basis is the FMV at vest (already taxed as W-2 wages). Adjust on Form 8949: enter the broker basis ($0) in column (e), enter code B in column (f), and put the negative basis adjustment in column (g): −(FMV at vest × shares). Column (h) becomes (sale price − FMV at vest) × shares — the correct gain.',
  blocks: [
    {
      type: 'p',
      text: 'This is the single biggest tax-prep mistake in the equity-comp world. Every tax season, tech workers overpay tens of thousands of dollars because they did not adjust the RSU cost basis on Form 8949. The IRS does not refund this overpayment automatically. You have to know to fix it.',
    },
    { type: 'h2', text: 'Why brokers report $0 basis' },
    {
      type: 'p',
      text: 'When your RSUs vest, the shares are delivered to your brokerage account. Your broker (Schwab, E*Trade, Fidelity, Morgan Stanley, etc.) records that delivery. From the broker\'s perspective, you paid $0 to acquire the shares — they were granted to you. So when you later sell those shares, the broker reports on Form 1099-B:',
    },
    {
      type: 'ul',
      items: [
        'Box 1d (proceeds): your sale price × shares.',
        'Box 1e (cost basis): $0 (or sometimes the dividend reinvestment amount, but functionally $0).',
        'The broker has no idea about your W-2 — and IRS reporting rules under §6045 do not require them to.',
      ],
    },
    {
      type: 'p',
      text: 'If you leave this unfixed, your tax software calculates capital gain = sale price − $0 = the full sale price. You then pay capital-gain tax on the same dollars that were already taxed as W-2 income at vest. That is double taxation.',
    },
    { type: 'h2', text: 'The Form 8949 column (g) fix' },
    {
      type: 'p',
      text: 'Form 8949 is where Schedule D capital gain entries are reconciled. The form has 7 columns for each sale. Here is what to enter:',
    },
    {
      type: 'ul',
      items: [
        '**Column (a) Description:** "100 sh ACME (RSU vested 2024-04-15)".',
        '**Column (b) Date acquired:** the vest date.',
        '**Column (c) Date sold:** the sale date.',
        '**Column (d) Proceeds:** sale price × shares (matches Box 1d on 1099-B).',
        '**Column (e) Cost basis as reported:** $0 (matches Box 1e on 1099-B — required for IRS reconciliation).',
        '**Column (f) Code:** "B" (cost basis reported on 1099-B is incorrect).',
        '**Column (g) Amount of adjustment:** NEGATIVE basis adjustment. Enter: −(FMV at vest × shares).',
        '**Column (h) Gain or loss:** auto-calculated. Should equal (sale price − FMV at vest) × shares.',
      ],
    },
    {
      type: 'callout',
      text: 'The trick: do NOT change column (e) to your real basis. Column (e) must match the 1099-B exactly so the IRS can reconcile against the broker\'s filed copy. The adjustment goes in column (g), and you signal that with code B in column (f).',
    },
    { type: 'h2', text: 'Worked example' },
    {
      type: 'p',
      text: '100 RSUs vested on April 15, 2024 at FMV $50/share = $5,000 ordinary W-2 income (reported in W-2 Box 1). You sold all 100 on September 1, 2025 at $80/share = $8,000 sale proceeds. Form 1099-B reports cost basis = $0.',
    },
    {
      type: 'ul',
      items: [
        'Unfixed (wrong): capital gain = $8,000 − $0 = $8,000. At 32% federal + 9.3% CA, tax = $3,304. Plus you already paid $1,900 at vest on the $5,000 W-2 income. Total: $5,204.',
        'Fixed (correct): column (e) = $0 (per 1099-B), column (f) = B, column (g) = −$5,000, column (h) = $3,000 long-term capital gain. Tax on $3,000 LTCG at 15% federal + 9.3% CA = $730. Plus the $1,900 from vest. Total: $2,630.',
        'Savings from the fix: $5,204 − $2,630 = **$2,574** on a single 100-share sale.',
      ],
    },
    { type: 'h2', text: 'TurboTax walkthrough' },
    {
      type: 'ol',
      items: [
        'Go to **Income → Investments → Stocks, Mutual Funds, Bonds**. Import 1099-B from your broker if you have not already.',
        'For each RSU sale row, click **Edit** or the small pencil icon.',
        'Scroll to **"I\'ll enter additional info on my own"** → **"This is a less common situation"**.',
        'Check **"The cost basis on my 1099-B is incorrect or missing"**.',
        'Enter the **correct basis** in the "Corrected cost basis" field. This is FMV at vest × shares. Pull from your Equity Comp Decision Tracker §3 Vest log row (or your final paystub the year of vest).',
        'TurboTax automatically generates Form 8949 with code B and the negative adjustment in column (g). You do not enter column (g) directly.',
      ],
    },
    { type: 'h2', text: 'FreeTaxUSA walkthrough' },
    {
      type: 'ol',
      items: [
        'In the **Income** section, go to **Investments → Stocks and Mutual Funds**.',
        'Enter the 1099-B import or add manually.',
        'On the lot detail page, check **"Reported cost basis is incorrect"**.',
        'Enter the corrected basis (same as TurboTax: FMV at vest × shares).',
        'FreeTaxUSA writes the proper adjustment to your generated Form 8949.',
      ],
    },
    { type: 'h2', text: 'What if I have ESPP, ISO, or NSO instead of RSU?' },
    {
      type: 'p',
      text: 'The cost-basis double-tax pattern applies to ALL employer stock that flows through W-2 income:',
    },
    {
      type: 'ul',
      items: [
        '**ESPP (qualifying disposition):** real basis = FMV at purchase. The discount portion was already taxed as W-2 income.',
        '**ESPP (disqualifying disposition):** real basis = FMV at purchase. The entire spread between purchase price and FMV at purchase was taxed as W-2 income, and your basis steps up to FMV.',
        '**ISO (qualifying disposition, held >2y grant + >1y exercise):** real basis = exercise price. You paid that cash; nothing else was taxed (the bargain element was AMT preference but not regular income).',
        '**ISO (disqualifying):** real basis = FMV at exercise. The bargain element became ordinary W-2 income in the year of disqualification.',
        '**NSO:** real basis = FMV at exercise. The bargain element (FMV − strike) was taxed as W-2 income at exercise.',
      ],
    },
    {
      type: 'p',
      text: 'In every case, you may need to adjust column (g) on Form 8949 to reflect the correct basis. The Mathstub Equity Comp Decision Tracker §B includes a full walkthrough for each case.',
    },
    { type: 'h2', text: 'I have been doing it wrong. Can I amend prior years?' },
    {
      type: 'p',
      text: 'Yes. File Form 1040-X within 3 years of the original return\'s due date (so for tax year 2022, you have until April 15, 2026). The IRS will refund the overpaid tax + 6% interest. Common refund amounts for tech workers who file amendments: $5,000–$25,000+ across 3 amended years.',
    },
    {
      type: 'callout',
      text: 'Pull every 1099-B from the last 3 years. For each RSU/ESPP/ISO/NSO sale, verify the cost basis matches your W-2-supported real basis. If not, amend.',
    },
    { type: 'h2', text: 'Bottom line' },
    {
      type: 'p',
      text: 'This is the most-googled equity-comp tax issue for a reason. Every tech worker with vested RSU sales should verify their 1099-B basis against their W-2 supporting docs. Adjusting Form 8949 column (g) takes 60 seconds per sale and saves the difference between (sale price × marginal rate) and ((sale price − FMV at vest) × LTCG rate). For high earners that gap is typically 20+ percentage points of the sale proceeds.',
    },
    {
      type: 'p',
      text: 'Sources: IRC §83(a) (FMV at vest taxed as ordinary income); IRC §1012 (cost basis of property generally); IRC §6045 (broker reporting requirements); IRC §6045B (transfer statements); Treas. Reg. §1.1012-1; Treas. Reg. §1.83-4(b) (basis equals FMV included in income); IRS Form 8949 instructions (column (g) adjustment codes); IRS Publication 525 (Taxable and Nontaxable Income); IRS Publication 550 (Investment Income and Expenses); IRC §422 (ISO qualifying disposition rules); IRC §423 (ESPP qualifying disposition rules); Form 3922 (ESPP information return); Form 3921 (ISO information return); Form 1040-X (amended return for prior year correction).',
    },
  ],
};
