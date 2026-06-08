import type { BlogPost } from '../registry';

export const howToReportRsuTaxReturn: BlogPost = {
  slug: 'how-to-report-rsu-tax-return',
  title: 'How to report RSUs on your tax return: W-2, 1099-B, Form 8949, Schedule D',
  description:
    'Step-by-step guide to reporting RSU vests and sales on your federal return. RSU vest income flows through W-2 Box 1 (already done by your employer). Sold shares get reported on Form 8949 and rolled up to Schedule D — with one critical cost-basis adjustment most brokers leave to you to fix.',
  datePublished: '2026-05-19',
  dateModified: '2026-06-07',
  authorName: 'Mathstub Editorial',
  reviewerName: 'Reviewed against IRS primary sources',
  affiliateOfferIds: ['turbotax-premier', 'taxact-premier'],
  quickAnswer:
    'Report RSUs in two places on your federal return: (1) RSU vest income is already in W-2 Box 1 — nothing to add. (2) Any shares you sold during the year get reported on Form 8949 with the sale rolled up to Schedule D. The critical step: adjust the cost basis on Form 8949 column (g) to equal the FMV at vest. Most brokers report $0 cost basis on the 1099-B, which would double-tax the vested value. The adjustment fixes it.',
  keyPoints: [
    'Your vest income is already in W-2 Box 1 — don’t add it again.',
    'If you sold any shares, report each sale on Form 8949, which rolls up to Schedule D.',
    'Watch out: your broker’s 1099-B often shows a $0 cost basis, which double-taxes you.',
    'Fix it on Form 8949: set the cost basis to the share value on your vest day.',
    'Use adjustment code B to flag that the broker’s basis was wrong.',
    'If you didn’t sell any shares, there’s nothing extra to file — the W-2 handled it.',
  ],
  blocks: [
    {
      type: 'p',
      text:
        'Filing taxes with RSUs is mechanically simple but contains one near-universal trap that costs employees thousands every year: the broker reports the wrong cost basis on Form 1099-B. If you don\'t fix it on Form 8949, you pay tax twice on the vested value of every share you sold. This post walks the exact forms, line by line, with one worked example showing the adjustment.',
    },
    { type: 'h2', text: 'The two reporting events' },
    {
      type: 'p',
      text:
        'Every vested RSU creates two potential tax events for the year. They are reported on separate forms and feed into different parts of your 1040:',
    },
    {
      type: 'ol',
      items: [
        '**At vest** — the fair-market value of the delivered shares is ordinary W-2 income under IRC §83(a). Your employer already added it to W-2 Box 1 and withheld federal, state, FICA, and Medicare. You do NOT add it again on your return — it is already there.',
        '**At sale** — if you sold any vested shares during the year (including same-day sales at vest), you get a Form 1099-B from the broker. The sale gets reported on Form 8949 → Schedule D → 1040 line 7 (capital gain or loss). This is where most people go wrong.',
      ],
    },
    {
      type: 'callout',
      text:
        'If you didn\'t sell ANY RSU shares during the year, you don\'t need Form 8949 or Schedule D for the RSU portion. The W-2 already handled it. Holding vested shares is not a taxable event.',
    },
    { type: 'h2', text: 'What W-2 Box 1 contains' },
    {
      type: 'p',
      text:
        'Your employer-issued W-2 has the following relevant boxes for RSUs:',
    },
    {
      type: 'ul',
      items: [
        '**Box 1 (Wages, tips, other comp)** — Includes your regular salary PLUS the FMV of all RSU shares that vested during the year. Pre-tax 401(k) and HSA contributions reduce Box 1 but do not reduce the RSU portion.',
        '**Box 2 (Federal income tax withheld)** — Includes the supplemental withholding (default 22%) on RSU vests in addition to regular paycheck withholding.',
        '**Box 12 code V** — Sometimes used to report the income from non-qualified stock option exercises. RSUs are NOT usually code V — they flow into Box 1 without a separate code.',
        '**Box 14** — Some employers use Box 14 to itemize RSU vest income as "RSU" or "Equity comp" or "Section 132." Informational only — does not change the tax calculation.',
      ],
    },
    {
      type: 'p',
      text:
        'You do not adjust, add, or subtract anything from W-2 Box 1 on your return. The number flows straight to 1040 line 1a.',
    },
    { type: 'h2', text: 'What Form 1099-B contains (and where it goes wrong)' },
    {
      type: 'p',
      text:
        'If you sold RSU shares during the year, your broker (Schwab Stock Plan Services, Fidelity NetBenefits, E*Trade, Carta, Morgan Stanley Shareworks) issues Form 1099-B reporting each sale. Each row has:',
    },
    {
      type: 'ul',
      items: [
        '**Description** — the security ticker (e.g. "GOOGL").',
        '**Date acquired** — date the shares vested (becomes the holding-period start).',
        '**Date sold** — date you sold.',
        '**Proceeds** — sale price × shares, minus broker commission. Reported in column (d).',
        '**Cost basis** — reported in column (e). This is where brokers often report $0 or the strike price ($0 for RSUs) instead of the FMV at vest.',
        '**Box A/B/D/E checkbox** — indicates whether cost basis was reported to the IRS. RSU sales typically fall in **Box B (short-term, basis NOT reported)** or **Box E (long-term, basis NOT reported)** — telling you the IRS knows the proceeds but not the basis, so you must report it correctly.',
      ],
    },
    {
      type: 'p',
      text:
        'The "$0 cost basis" reporting is technically correct from the broker\'s perspective — you paid $0 to acquire the RSU shares (your employer gave them to you). But the IRS already taxed the vested value as W-2 wage income, which means the actual tax basis is the FMV at vest, not $0. Failing to make this adjustment on Form 8949 means you pay capital-gains tax on money that was already taxed as ordinary income.',
    },
    { type: 'h2', text: 'Form 8949 — where the adjustment happens' },
    {
      type: 'p',
      text:
        'Form 8949 is the form where every individual security sale gets reported with its proceeds, cost basis, gain/loss, and any adjustments. It splits into 6 categories based on (a) short-term vs long-term and (b) whether basis was reported to the IRS. For most RSU sales you will use Part I (short-term) Box B or Part II (long-term) Box E.',
    },
    {
      type: 'p',
      text:
        'Each row has columns:',
    },
    {
      type: 'table',
      caption: 'Form 8949 — what each column holds',
      headers: ['Column', 'What goes there'],
      rows: [
        ['(a)–(c)', 'Description, date acquired (your vest date), date sold'],
        ['(d) Proceeds', 'Sale price × shares'],
        ['(e) Reported basis', 'As shown on the 1099-B — often wrong ($0)'],
        ['(f) Code', '**B** when you’re correcting the basis'],
        ['(g) Adjustment', 'The difference to the correct basis (FMV at vest × shares)'],
        ['(h) Gain/loss', 'Auto-computed: (d) − (e) + (g)'],
      ],
    },
    { type: 'h2', text: 'Worked example — adjusting the cost basis' },
    {
      type: 'p',
      text:
        '100 RSUs vest on 2025-03-15 at $50/share = $5,000 FMV. Your employer adds $5,000 to W-2 Box 1 and withholds taxes via share-sell. You receive 65 shares net after withholding. On 2025-06-30, you sell all 65 shares at $55/share = $3,575 proceeds. Your 1099-B reports:',
    },
    {
      type: 'table',
      caption: 'Broker’s broken 1099-B vs your one-line fix (65 shares sold at $55)',
      headers: ['Form 8949 column', 'Broker’s 1099-B', 'Your fix'],
      rows: [
        ['(d) Proceeds', '$3,575', '$3,575'],
        ['(e) Reported basis', '$0', '$0'],
        ['(f) Code', '—', 'B'],
        ['(g) Adjustment', '—', '−$3,250'],
        ['(h) **Taxable gain**', '**$3,575**', '**$325**'],
      ],
    },
    {
      type: 'flow',
      caption: 'What the fix is worth',
      steps: [
        { label: 'Broker "gain"', value: '$3,575', tone: 'bad' },
        { label: 'Real gain', value: '$325', tone: 'good' },
        { label: 'Tax saved', value: '$1,358', tone: 'good' },
      ],
    },
    {
      type: 'p',
      text:
        'The corrected basis is 65 shares × $50 FMV at vest = $3,250, so you pay tax on $325, not $3,575. At a 32% federal + 9.3% CA rate the adjustment saves **$1,358** — the rest was already taxed in W-2 Box 1.',
    },
    { type: 'h2', text: 'Schedule D — the rollup' },
    {
      type: 'p',
      text:
        'Form 8949 totals flow to Schedule D:',
    },
    {
      type: 'ul',
      items: [
        '**Schedule D line 1b** — total short-term gains/losses from Form 8949 Part I (RSU sales held ≤1 year past vest).',
        '**Schedule D line 8b** — total long-term gains/losses from Form 8949 Part II (RSU sales held >1 year past vest, taxed at preferential LTCG rates).',
        '**Schedule D line 16** — net gain or loss, which flows to 1040 line 7.',
      ],
    },
    {
      type: 'p',
      text:
        'If you have multiple RSU sales in the same year, you list each one as a separate row on Form 8949. Tax software handles this automatically — but only if you correctly entered the 1099-B data AND made the cost-basis adjustment.',
    },
    { type: 'h2', text: 'Common reporting mistakes (and how to avoid each)' },
    {
      type: 'table',
      caption: 'The 5 reporting mistakes — and the fix',
      headers: ['Mistake', 'How to avoid it'],
      rows: [
        ['Forgetting the basis adjustment', 'The big one. Use your software’s "I need to adjust this" flow on every RSU lot.'],
        ['Double-reporting vest income', 'It’s already in W-2 Box 1 — don’t add it again. Trust Box 1.'],
        ['Wrong short- vs long-term', 'Count from the VEST date (the 1099-B "date acquired"), not the grant date.'],
        ['Re-reporting the sell-to-cover', 'Usually already handled; only report a gain/loss if proceeds differ from the tax withheld.'],
        ['Missing wash-sale risk', 'A loss sale within 30 days of a new vest can be disallowed (§1091) — watch monthly vesters.'],
      ],
    },
    { type: 'h2', text: 'When tax software handles this automatically' },
    {
      type: 'p',
      text:
        'TurboTax Premier, TaxAct Premier, and H&R Block Deluxe all have RSU-specific workflows. If you correctly tag the lot as "from an RSU/stock plan" during import, the software prompts you for the FMV at vest and generates Form 8949 with the proper adjustment. The catch: you must actively flag it. If you skip past the prompt or accept the auto-imported defaults, you keep the broken $0 basis.',
    },
    { type: 'h2', text: 'When to talk to a CPA' },
    {
      type: 'ul',
      items: [
        'Multi-state residency during the vesting period (cross-state allocation under California Code Reg §17951-7 etc).',
        'Disqualifying ESPP / ISO disposition crossing tax years.',
        'AMT credit recovery from prior-year ISO exercises (Form 8801).',
        'Total annual equity comp >$500,000 (37% federal supplemental + 3.8% NIIT + AMT interactions).',
        'Pre-IPO equity with §83(b) election or early-exercise §83(b) on NSOs.',
      ],
    },
    { type: 'h2', text: 'The takeaway' },
    {
      type: 'p',
      text:
        'Reporting RSUs on your tax return is two forms: the W-2 (no action needed — your employer handled it) and Form 8949 + Schedule D for any shares you sold (one critical cost-basis adjustment in column g). Most filers leave the broken $0 basis from 1099-B in place and overpay capital-gains tax on the vested value. The fix takes 5 minutes per sale lot but saves $300–$3,000+ depending on share count and rate.',
    },
    {
      type: 'p',
      text:
        'For the projected tax on a new vest BEFORE filing season, use the RSU Tax Shortfall calculator. It computes the gap between the 22% federal supplemental withholding and your actual marginal rate, so you can top up Form W-4 line 4(c) before year-end and avoid an April underpayment penalty under IRC §6654.',
    },
    {
      type: 'p',
      text:
        'Sources: IRC §83(a) (taxation of property transferred for services); IRC §1012 (cost basis); IRC §1091 (wash sale rule); IRC §1411 (NIIT); IRS Publication 525 (Taxable and Nontaxable Income); IRS Publication 550 (Investment Income); IRS Form 8949 instructions; IRS Schedule D instructions; IRS Topic 409 (Capital Gains and Losses); Treas. Reg. §1.83-7.',
    },
  ],
};
