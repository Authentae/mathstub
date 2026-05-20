import type { BlogPost } from '../registry';

export const rsuTaxCategoryBox14: BlogPost = {
  slug: 'rsu-tax-category-box-14-w2',
  title: 'What is the RSU tax category in Box 14 on my W-2? (Plain-English decoder)',
  description:
    'Box 14 on your W-2 is an informational line your employer uses to itemize specific compensation components. The RSU code there (RSU, RSU VEST, SECT 132, EQUITY COMP, STKCMP) is not extra income — it is just a callout of how much of your Box 1 wages came from RSU vests. No action required on your federal return.',
  datePublished: '2026-05-19',
  dateModified: '2026-05-19',
  authorName: 'Mathstub Editorial',
  reviewerName: 'Reviewed against IRS primary sources',
  affiliateOfferIds: ['turbotax-premier', 'taxact-premier'],
  quickAnswer:
    'W-2 Box 14 is an employer-defined informational box that itemizes specific components of your Box 1 wages. The RSU line there (often labeled "RSU", "RSU VEST", "SECT 132", "EQUITY COMP", or "STKCMP") tells you how much of your Box 1 income came from RSU vests. It is NOT separate income to add — the amount is already in Box 1. Most tax software handles Box 14 automatically; you don\'t do anything special with it on your federal return.',
  blocks: [
    {
      type: 'p',
      text:
        'You open your W-2 in February and see Box 14 has a line like "RSU $42,500" or "SECT 132 $42,500" or "STKCMP $42,500" — and you panic, wondering if you need to add that to your return somewhere. You do not. Box 14 is informational only. The RSU amount listed there is already in Box 1 (Wages, tips, other compensation). This post decodes every common RSU-related Box 14 code so you can recognize what you are looking at in 10 seconds.',
    },
    {
      type: 'callout',
      text:
        'Bottom line: Box 14 is your employer telling you "of the total in Box 1, this much came from RSUs." The amount is NOT separate income. Do not add it. Do not subtract it. Just leave it alone unless your tax software specifically asks about it.',
    },
    { type: 'h2', text: 'What Box 14 is for' },
    {
      type: 'p',
      text:
        'Box 14 ("Other") is the W-2 box where your employer can itemize specific compensation or deduction components for your reference. Unlike Boxes 1-13, Box 14 has no IRS-mandated codes — each employer picks their own labels. Per IRS Form W-2 instructions, Box 14 is for "information that you want to give to your employees" that does not fit cleanly in the other boxes.',
    },
    {
      type: 'p',
      text:
        'Common Box 14 entries include 401(k) contributions, after-tax retirement contributions, union dues, certain pre-tax benefits, and — most relevant here — itemized equity-compensation income that\'s already inside Box 1.',
    },
    { type: 'h2', text: 'Common RSU-related Box 14 codes (decoder)' },
    {
      type: 'p',
      text:
        'Different payroll systems use different labels. All mean the same thing — they break out the RSU vest income within your total Box 1 wages:',
    },
    {
      type: 'ul',
      items: [
        '**RSU** — straight up "Restricted Stock Unit" income. Most common label, used by Workday and ADP.',
        '**RSU VEST** — same thing, explicitly labeled as a vesting event.',
        '**SECT 132** — references IRC §132 (fringe benefits). Some payroll systems use this as a generic "non-cash compensation" label even for RSU vests.',
        '**EQUITY COMP** / **EQUITY** — generic equity compensation label, may include RSUs + NSO exercises + ESPP discounts combined.',
        '**STKCMP** or **STOCK COMP** — abbreviated "stock compensation."',
        '**STK** — extremely abbreviated stock-comp callout.',
        '**OFFSET** — sometimes appears alongside the income line to indicate the share-withholding accounting offset (see our separate post on the RSU tax offset).',
        '**NQSO** / **NQ** — non-qualified stock option exercise income (not RSU — different grant type). Worth flagging separately because §83 mechanics differ from §83(a) for RSUs.',
      ],
    },
    { type: 'h2', text: 'Why your tax software asks about Box 14' },
    {
      type: 'p',
      text:
        'TurboTax, TaxAct, H&R Block, and FreeTaxUSA all prompt you to enter Box 14 codes during W-2 import. They ask for two reasons:',
    },
    {
      type: 'ol',
      items: [
        '**Some states pull from Box 14 specifically.** Pennsylvania, New Jersey, and a few others have state-specific wage calculations that subtract or add certain Box 14 items to derive state-taxable wages. The RSU line in particular matters for some state-level allocations.',
        '**Cost-basis lookup for sold RSU shares.** If you sold RSU shares during the year, the tax software needs the FMV-at-vest to fix the broken cost basis on Form 1099-B (see our post on reporting RSUs on your tax return). Box 14 sometimes contains enough information to help the software auto-populate the adjustment.',
      ],
    },
    {
      type: 'p',
      text:
        'For most federal return purposes, you can categorize the Box 14 RSU line as "Other (not on the list)" or pick the closest match. Tax software treats it as informational unless your state needs it.',
    },
    { type: 'h2', text: 'When Box 14 does require state-return attention' },
    {
      type: 'ul',
      items: [
        '**Pennsylvania** — PA does not allow pre-tax 401(k) and certain deferrals from federal Box 1 to reduce PA wages. PA-specific wages are higher than federal Box 1, and Box 14 entries help reconcile.',
        '**New Jersey** — NJ has its own wage calculation that differs from federal Box 1. Box 14 entries flagged "NJ" or specific deductions matter here.',
        '**California** — CA Box 14 entries labeled "CASDI" (state disability insurance) are deductible on Schedule A as state taxes. RSU-related Box 14 entries are informational.',
        '**Multi-state allocation** — If you worked in multiple states during the RSU vesting period, the Box 14 RSU line plus the W-2 Box 15/16/17 state wage allocation determines how the vest is split for state purposes. Worth a CPA conversation for >$50,000 vests crossing state lines.',
      ],
    },
    { type: 'h2', text: 'When Box 14 indicates a real error' },
    {
      type: 'p',
      text:
        'Three rare cases where the Box 14 amount itself is worth questioning:',
    },
    {
      type: 'ol',
      items: [
        '**Box 14 RSU amount ≠ what your equity tracker shows for the year.** Cross-reference against your Schwab / Fidelity / E*Trade equity dashboard. If they differ by more than $100 (rounding), ask payroll to explain.',
        '**Box 14 RSU amount > Box 1 wages.** Mathematically impossible if everything is reported correctly. The RSU line is a SUBSET of Box 1, not separate from it. Discrepancy means a payroll bug.',
        '**Box 14 says "RSU $0" but you definitely had vests this year.** Either the payroll system did not classify the vests correctly, or your vests are reported under a different label (try matching by amount against Box 1 to find the right line).',
      ],
    },
    { type: 'h2', text: 'How Box 14 RSU interacts with Form 8949 cost basis' },
    {
      type: 'p',
      text:
        'If you sold RSU shares during the year, the Box 14 amount tells you the FMV at vest (in aggregate, for the year). This is exactly the cost basis you need to plug into Form 8949 column (g) as an adjustment to fix the broken $0 basis on Form 1099-B. For example: if Box 14 RSU shows $42,500 and you sold 100% of those shares during the year, your aggregate adjusted cost basis is $42,500.',
    },
    {
      type: 'p',
      text:
        'Caveat: if you sold only some of the year\'s vested shares, you need per-lot FMV-at-vest data (each individual vest date and price), not the Box 14 aggregate. Get the detail from your broker\'s "supplemental information" or "RSU activity report." Box 14 alone is not granular enough.',
    },
    { type: 'h2', text: 'Frequently missed: Box 14 vs Box 12 code V' },
    {
      type: 'p',
      text:
        'Sometimes confused: Box 12 code V is specifically for non-qualified stock option (NSO) exercises and is IRS-mandated. RSU vests are NOT reported under Box 12 code V — they go in Box 14 (employer-defined) plus Box 1. If you see a Box 12 V on your W-2, it indicates an NSO exercise event, not an RSU vest. Different grant type, different cluster of tax mechanics (see our separate post on stock options vs RSUs).',
    },
    { type: 'h2', text: 'Quick verification checklist' },
    {
      type: 'p',
      text:
        'When you receive your W-2 in late January / early February:',
    },
    {
      type: 'ol',
      items: [
        'Find the Box 14 line(s) with RSU-related labels.',
        'Sum them. Cross-check the total against your equity-tracker dashboard (Schwab / Fidelity / E*Trade) for the year\'s vested FMV.',
        'Confirm the total is included in Box 1 (your Box 1 should equal regular wages + Box 14 RSU + Box 14 NQSO + Box 12 code V + other supplemental, minus 401(k) and HSA pre-tax).',
        'Enter Box 14 into your tax software during W-2 import — pick "Other (not on list)" if no specific RSU category exists.',
        'If you sold any RSU shares, use the Box 14 amount as guidance for the FMV-at-vest cost-basis adjustment on Form 8949 column (g), but pull per-lot FMV from your broker for the actual numbers.',
      ],
    },
    { type: 'h2', text: 'The takeaway' },
    {
      type: 'p',
      text:
        'Box 14 on your W-2 is your employer\'s informational line telling you how much of Box 1 came from RSU vests. It is not separate income — the amount is already in Box 1 and you have already been taxed on it via your normal W-2 wage withholding. The label varies by payroll system (RSU, RSU VEST, SECT 132, EQUITY COMP, STKCMP) but all mean the same thing. For federal returns: no special action needed. For some state returns: tax software prompts will use it for state-specific adjustments. For Form 8949 cost-basis adjustments on sold shares: it is a useful aggregate cross-check.',
    },
    {
      type: 'p',
      text:
        'For projecting next year\'s RSU tax bill before April, use the RSU Tax Shortfall calculator. It computes the gap between the 22% federal supplemental withholding rate and your actual marginal rate — the gap that drives most April-surprise underpayment situations.',
    },
    {
      type: 'p',
      text:
        'Sources: IRC §83(a) (taxation of property transferred for services); IRC §132 (fringe benefits — referenced by SECT 132 Box 14 label); IRS Form W-2 instructions 2025 (Box 14 guidance); IRS Publication 525 (Taxable and Nontaxable Income); state revenue department guidance for PA, NJ, CA wage calculations.',
    },
  ],
};
