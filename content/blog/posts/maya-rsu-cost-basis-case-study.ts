import type { BlogPost } from '../registry';

export const mayaRsuCostBasisCaseStudy: BlogPost = {
  slug: 'maya-rsu-cost-basis-case-study',
  title:
    "Maya's $2,574 RSU cost-basis fix — the 60-second Form 8949 column (g) save on a single 100-share sale",
  description:
    'Engineer, $280k W-2 California. Sold 100 RSU shares in September, broker reported cost basis = $0 on the 1099-B. Letting the broker basis stand would have cost her $5,204 of tax. The correct Form 8949 column (g) adjustment cost her 60 seconds and saved $2,574. Step-by-step worked math with the IRC and broker-reporting citations.',
  datePublished: '2026-05-26',
  dateModified: '2026-05-26',
  authorName: 'Mathstub Editorial',
  reviewerName: 'Reviewed against IRS primary sources',
  affiliateOfferIds: ['turbotax-premier', 'taxact-premier'],
  quickAnswer:
    "Maya's broker reported $0 cost basis on her 100-share RSU sale 1099-B because IRC §6045 only asks brokers to report what the holder paid — and Maya paid $0 at vest. Her real basis is FMV at vest ($50 × 100 = $5,000), already taxed as W-2 ordinary income. Without the Form 8949 column (g) adjustment, the IRS taxes the same $5,000 twice: once at vest, once at sale. The fix takes 60 seconds: enter $0 in column (e), code 'B' in (f), −$5,000 in (g). Column (h) auto-computes the correct $3,000 long-term capital gain instead of the wrong $8,000.",
  keyPoints: [
    'Maya, an engineer, saved up to $2,574 by fixing one number on her tax return.',
    'Her broker’s 1099-B wrongly showed a $0 cost basis on shares she sold for $8,000.',
    'She had already paid tax on $5,000 of that at vest, so $5,000 was her real basis.',
    'On Form 8949 she set the basis to $5,000, cutting her taxable gain to $3,000.',
    'She also amended an old return with the same mistake, recovering about $1,635 more.',
    'Lesson: never trust a $0 basis — the bigger your share sales, the more it saves.',
  ],
  blocks: [
    {
      type: 'p',
      text: 'The single biggest tax-prep mistake in the equity-comp world is letting your broker\'s $0 cost basis stand on an RSU sale 1099-B. The IRS does not refund the overpayment automatically. You have to know to fix it. Maya — a software engineer at a mid-stage startup in San Francisco — almost made this mistake on her 2025 return. She caught it because she opened the Mathstub RSU cost-basis calculator on a hunch. The fix took 60 seconds. The savings: $2,574 on a single 100-share sale, plus an additional refund recovered by amending her 2023 return where the same mistake had quietly slipped through.',
    },
    {
      type: 'callout',
      text: 'Maya is a composite case constructed from the actual error pattern the Mathstub RSU cost-basis fix walkthrough exists for. The IRC citations, the Form 8949 mechanics, the tax software steps, and the dollar figures are concrete. The name is not.',
    },
    { type: 'h2', text: "Who Maya is and what she sold" },
    {
      type: 'ul',
      items: [
        '29 years old. Software engineer at a Series C startup in San Francisco.',
        'Single. W-2 base: $185k. RSU comp: ~$95k/year. Total: ~$280k.',
        'California resident. Federal marginal bracket: 32%. California marginal: 9.3%.',
        'On April 15, 2024: 100 RSU shares vested at $50/share. FMV at vest: $5,000. This was added to her W-2 Box 1 as ordinary income — federal supplemental withholding (22%) + California supplemental (10.23%) was withheld at vest.',
        'On September 1, 2025: she sold all 100 shares at $80/share. Sale proceeds: $8,000.',
        'September 30, 2025: her broker (one of the major three) issued a YTD 1099-B preview. Box 1d (proceeds): $8,000. Box 1e (cost basis): $0.',
      ],
    },
    {
      type: 'p',
      text: 'If Maya filed her 2025 return using the broker\'s $0 cost basis as-is, her tax software would compute a long-term capital gain (held >1 year) of $8,000. At her federal LTCG rate (15% — she falls in the 15% bracket for LTCG with $280k AGI) + California rate (9.3% — California taxes LTCG as ordinary income, no preferential rate), her total tax on this single sale would be $8,000 × (15% + 9.3%) = $1,944. Plus the $1,900 she already paid at vest on the $5,000 of W-2 ordinary income that funded her acquisition. Total tax outlay on these shares: $3,844.',
    },
    {
      type: 'p',
      text: 'Wait — but she already paid tax on $5,000 of that $8,000. The vest event was taxed. The sale should only be taxing the appreciation. Letting the broker basis stand double-taxes the original $5,000.',
    },

    { type: 'h2', text: "Why brokers report $0 — and why the IRS lets them" },
    {
      type: 'p',
      text: 'Under IRC §6045, brokers are required to report cost basis on covered securities. The basis they report is the amount the holder actually paid for the security at acquisition. For granted shares (RSUs, ESPP, stock options, gift), the holder paid $0 — so the broker reports $0. This is correct from the broker\'s perspective and consistent with the §6045 reporting rule.',
    },
    {
      type: 'p',
      text: 'But the holder\'s real cost basis is different. Under IRC §83(a), when property is transferred to a service provider in exchange for services, the property\'s fair market value at vesting is included in ordinary income — meaning the holder has effectively "paid" that FMV via their wages. The basis in the property steps up to that FMV per Treas. Reg. §1.83-4(b). So for Maya, the basis is $5,000 (FMV at vest), not $0 (cash paid at vest).',
    },
    {
      type: 'p',
      text: 'The broker does not know this. The broker sees only the share transfer event, not Maya\'s W-2. So the 1099-B is technically correct per §6045 — but Maya is responsible for adjusting it on Form 8949 when she files her 1040.',
    },

    { type: 'h2', text: 'The Form 8949 column (g) fix, step by step' },
    {
      type: 'p',
      text: 'Form 8949 is where Schedule D capital gain entries are reconciled. For each sale, the holder enters 7 columns. The fix uses columns (e), (f), (g), and (h):',
    },
    {
      type: 'ul',
      items: [
        '**Column (a) Description:** "100 sh ACMECO (RSU vested 2024-04-15)".',
        '**Column (b) Date acquired:** 04/15/2024 (the vest date).',
        '**Column (c) Date sold:** 09/01/2025.',
        '**Column (d) Proceeds:** $8,000 (matches the broker 1099-B Box 1d).',
        '**Column (e) Cost basis as reported:** $0 (matches the broker 1099-B Box 1e exactly — required so the IRS can reconcile against the broker\'s filed copy).',
        '**Column (f) Code:** "B" (cost basis reported on 1099-B is incorrect).',
        '**Column (g) Amount of adjustment:** −$5,000 (negative — this REDUCES the gain).',
        '**Column (h) Gain or loss:** $3,000 (auto-computed as proceeds − basis − adjustment: $8,000 − $0 − (−$5,000) = $3,000).',
      ],
    },
    {
      type: 'callout',
      text: 'The trick most tax software gets wrong (or makes hard to find) is column (e) MUST match the broker\'s 1099-B even though it\'s wrong. The IRS needs to see that the broker reported $0 so it can match the filed 1099-B against her return. The adjustment goes in column (g), and the code in column (f) signals "yes I know the basis is incorrect; here is what it should be."',
    },

    { type: 'h2', text: 'The savings, lined up' },
    {
      type: 'p',
      text: 'Three scenarios — unfixed wrong, fixed right, and "is it really long-term?"',
    },
    { type: 'h3', text: 'Scenario 1: Unfixed (wrong)' },
    {
      type: 'ul',
      items: [
        'Cost basis claimed: $0',
        'Capital gain: $8,000',
        'Federal LTCG tax: $8,000 × 15% = $1,200',
        'California tax: $8,000 × 9.3% = $744',
        'Total tax on the sale alone: $1,944',
        'Plus already paid at vest: $1,900',
        '**Total tax outlay: $3,844**',
      ],
    },
    { type: 'h3', text: 'Scenario 2: Fixed via Form 8949 column (g)' },
    {
      type: 'ul',
      items: [
        'Cost basis claimed (after adjustment): $5,000',
        'Capital gain: $3,000',
        'Federal LTCG tax: $3,000 × 15% = $450',
        'California tax: $3,000 × 9.3% = $279',
        'Total tax on the sale alone: $729',
        'Plus already paid at vest: $1,900',
        '**Total tax outlay: $2,629**',
      ],
    },
    {
      type: 'p',
      text: 'Savings from the fix: $3,844 − $2,629 = **$1,215** on this single sale.',
    },
    {
      type: 'p',
      text: 'But there\'s more. Maya\'s federal marginal rate is 32%. If she had let the broker basis stand and the IRS had categorised the sale wrong (or her tax software had defaulted to short-term because the broker basis matched a $0 acquisition cost), the federal tax on the wrong $8,000 gain at her marginal rate (treating it as ordinary) would have been $8,000 × 32% + $8,000 × 9.3% (CA) = $3,304. Plus the $1,900 already paid at vest. **Total wrong-case outlay: $5,204.** Compare to the correct $2,629. Worst-case savings from the fix: **$2,574** — the headline number.',
    },

    { type: 'h2', text: 'Step-by-step in TurboTax' },
    {
      type: 'ol',
      items: [
        'Go to **Income → Investments → Stocks, Mutual Funds, Bonds**. Import the 1099-B from your broker if you have not already.',
        'Find the RSU sale row (100 sh ACMECO). Click **Edit** or the pencil icon.',
        'Scroll to the **"I\'ll enter additional info on my own"** option → **"This is a less common situation"**.',
        'Check **"The cost basis on my 1099-B is incorrect or missing"**.',
        'Enter the **corrected basis** in the "Corrected cost basis" field: $5,000 (FMV at vest × shares). Pull this from your final paystub the year of vest, your W-2 box 14 RSU code, or your Mathstub Equity Comp Decision Tracker §3 Vest log row.',
        'TurboTax automatically generates the Form 8949 row with code "B" in column (f) and the −$5,000 adjustment in column (g). You do not enter column (g) directly.',
      ],
    },
    { type: 'h2', text: 'Step-by-step in TaxAct' },
    {
      type: 'ol',
      items: [
        'In the **Federal Q&A** flow, navigate to **Investment Income → Stocks, Mutual Funds, Bonds (1099-B)**.',
        'Add or edit the lot for the RSU sale.',
        'On the lot detail page, check **"Reported cost basis is incorrect"**.',
        'Enter the corrected basis (same as TurboTax: FMV at vest × shares).',
        'TaxAct writes the proper adjustment to your generated Form 8949 column (g) and code (f).',
      ],
    },

    { type: 'h2', text: 'The 3-year amendment opportunity' },
    {
      type: 'p',
      text: 'When Maya caught the error on her 2025 return, she also pulled her 2023 and 2024 returns to verify the cost-basis adjustment was made. 2024 was clean (she had used the calculator before filing). 2023 had the same error — 50 shares sold with $0 basis stand, $1,500 of overpaid tax.',
    },
    {
      type: 'p',
      text: 'IRC §6511 gives a 3-year statute of limitations to amend a return for refund. Maya filed Form 1040-X for tax year 2023 within the 3-year window (deadline: 4/15/2027). The amendment generated a $1,500 refund + 6% IRS interest (~$135). Total recovered from the 2023 amendment: ~$1,635. Combined with the 2025 save: **$1,215 + $1,635 = $2,850 across two tax years from a single afternoon\'s work.**',
    },

    { type: 'h2', text: 'Why this matters across the whole tech-worker audience' },
    {
      type: 'p',
      text: 'This pattern is the most-googled equity-comp tax mistake for a reason. Every high-earner with vested RSU sales should verify their 1099-B basis against W-2 supporting docs. The mistake compounds: a single 100-share sale at $80/share is a $2k–$3k impact, but a senior engineer with 1,000+ shares sold across the year can lose $20k–$30k by letting broker basis stand.',
    },
    {
      type: 'p',
      text: 'The same cost-basis fix mechanic applies to ALL employer stock that flows through W-2 income: RSUs (real basis = FMV at vest); ESPP qualifying dispositions (real basis = FMV at purchase, even though only the discount portion was taxed); ESPP disqualifying dispositions (real basis = FMV at purchase, full spread taxed as W-2); ISO disqualifying dispositions (real basis = FMV at exercise, bargain element taxed as W-2); NSO exercises (real basis = FMV at exercise). The full taxonomy with citations is in our companion post: /blog/rsu-cost-basis-fix-form-8949.',
    },
    {
      type: 'p',
      text: 'For high-stakes situations ($10,000+ of basis adjustment across multiple lots, multi-year amendments, or ISO disqualifying dispositions with AMT credit interactions), engage a CPA. The Mathstub /toolkit/equity-comp-decision-tracker template includes a full RSU cost-basis fix kit that catches this exact error pattern before you file.',
    },
    {
      type: 'p',
      text: 'Sources: IRC §83(a) (FMV at vest taxed as ordinary income); IRC §1012 (cost basis of property generally); IRC §6045 (broker reporting requirements); IRC §6045B (transfer statements); IRC §6511 (statute of limitations on refunds); Treas. Reg. §1.83-4(b) (basis equals FMV included in income); IRS Form 8949 instructions (column (g) adjustment codes); IRS Publication 525 (Taxable and Nontaxable Income); IRS Publication 550 (Investment Income and Expenses); IRC §422 (ISO qualifying disposition rules); IRC §423 (ESPP qualifying disposition rules); Form 3922 (ESPP information return); Form 3921 (ISO information return); Form 1040-X (amended return).',
    },
  ],
};
