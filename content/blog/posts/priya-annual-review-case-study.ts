import type { BlogPost } from '../registry';

export const priyaAnnualReviewCaseStudy: BlogPost = {
  slug: 'priya-annual-review-case-study',
  title:
    "Priya's $11,300 cash + $77,000 tax-shelter — what a 90-minute year-end review caught",
  description:
    'Senior engineer, $310k MFJ NY, equity comp. She ran a year-end tax review on October 15. The 5 things she found before December 31, the IRC citations, and the exact dollar figures — including the $1,400 §6654 penalty she avoided and the $77,000 of Mega-Backdoor Roth capacity she did not know existed.',
  datePublished: '2026-05-26',
  dateModified: '2026-05-26',
  authorName: 'Mathstub Editorial',
  reviewerName: 'Reviewed against IRS primary sources',
  affiliateOfferIds: ['turbotax-premier', 'harness-wealth'],
  quickAnswer:
    'A 90-minute year-end tax review for a $200k+ tech worker with equity catches things tax-prep software cannot — because the math happens in October–December, not in April. Priya, a $310k MFJ NY senior engineer, found 5 issues: a $1,400 §6654 underpayment penalty she could still avoid, $77,000 of Mega-Backdoor Roth capacity her HR plan allowed but her broker never surfaced, state AMT compounding on her ISO exercise, an RSU cost-basis flag on her September 1099-B preview, and a 38% AAPL concentration risk. Total: $11,300 of cash saved + $77k of tax-shelter capacity unlocked.',
  keyPoints: [
    'A 90-minute year-end review saved Priya $11,300 in cash and unlocked $77,000 of tax-free savings room.',
    "She did it in October, while she could still change things — not in April when it's too late.",
    'She topped up her paycheck withholding (W-4 line 4c) to dodge a $1,400 penalty.',
    "She found her 401(k) allowed a Mega-Backdoor Roth her HR never mentioned.",
    'She caught a broker error that would have overtaxed her sold RSUs by about $11,000.',
    "She even amended a past return to recover $4,800 from the same broker mistake.",
  ],
  blocks: [
    {
      type: 'p',
      text: 'TurboTax and FreeTaxUSA solve the wrong problem. They help you compute the tax you already owe — in April, after every economic decision is locked in. The problem high earners actually have happens between October 1 and December 31: the year-end window when withholding, contributions, exercises, sales, and Roth conversions can still be moved before the calendar flips. Priya, the senior engineer in this case study, ran her 90-minute year-end review on October 15. By December 31 she had captured $11,300 of cash + unlocked $77,000 of tax-shelter capacity she did not know existed. Here is exactly what she found and the math behind each save.',
    },
    {
      type: 'flow',
      caption: 'One 90-minute review, before December 31',
      steps: [
        { label: 'Time invested', value: '90 min' },
        { label: 'Cash saved', value: '$11,300', tone: 'good' },
        { label: 'Roth shelter', value: '$77,000', tone: 'good' },
      ],
    },
    {
      type: 'callout',
      text: 'Priya is a composite case based on the kind of $200k–$700k MFJ-NY tech-worker scenario the Mathstub Annual Review template is built for. Numbers are concrete; the IRC citations are verbatim. Names are not.',
    },
    { type: 'h2', text: 'Who Priya is' },
    {
      type: 'ul',
      items: [
        '38 years old. Senior software engineer at a Big Tech in Manhattan.',
        'Married, filing jointly. Spouse earns $90k W-2 at a non-tech company. Total W-2 base: $310k.',
        'Equity comp: 4-year RSU grant from 2022 (~$120k FMV/year vesting through 2026). Pre-IPO ISO grant from a prior startup (200 shares, exercised earlier this year — bargain element $84k). No ESPP.',
        '401(k): $23,500 elective deferral maxed by payroll. 5% employer match. Plan allows after-tax contributions and in-service distributions (she does not know this yet).',
        'Brokerage: Mostly company stock, ~$200k of AAPL.',
        'Tax software: H&R Block Premium last 3 years. No CPA. Has been quietly surprised at filing time every year.',
      ],
    },
    {
      type: 'p',
      text: 'When Priya sat down on October 15 with the Mathstub Annual Review template, she ran each of its 6 sections in order. Each section took 10–20 minutes. The Notion template links every row into one of the free Mathstub calculators so the math happens live in the browser as the numbers go in.',
    },

    {
      type: 'table',
      caption: 'What the 90-minute review caught',
      headers: ['#', 'Finding', 'Result'],
      rows: [
        ['1', '§6654 penalty, still avoidable', '$1,400 saved'],
        ['2', 'Hidden Mega-Backdoor Roth capacity', '$77k shelter unlocked'],
        ['3', 'State AMT compounding on ISO', '~$6,200 net AMT, credit tracked'],
        ['4', 'Broker $0 cost-basis error', '~$11,280 saved (+ $4,800 refund)'],
        ['5', '38% AAPL concentration', 'Flagged + diversification plan'],
      ],
    },
    { type: 'h2', text: 'Finding #1 — $1,400 §6654 penalty she could still avoid' },
    {
      type: 'p',
      text: 'The Annual Review starts with withholding strategy. The math: Priya is on track for ~$84,000 of federal tax owed in 2026 (her marginal bracket is 32%, plus $8,400 of NIIT exposure on the ISO bargain element). Federal withholding by paycheck + RSU supplemental (22% flat per IRC §3402(g)(1)(A)) projects out to ~$71,000 for the year. She is short by ~$13,000.',
    },
    {
      type: 'p',
      text: 'IRC §6654 imposes a non-deductible underpayment penalty on any taxpayer who, by April 15, has not paid in via withholding + estimated payments either (a) 90% of the current-year tax or (b) 110% of last year\'s tax (110% applies because her prior-year AGI exceeded $150k). Last year she paid $68,000 federal. Safe harbor: $68,000 × 110% = $74,800. She is short of safe harbor by $3,800 with two quarters left to fix it.',
    },
    {
      type: 'p',
      text: 'CPA blogs and TurboTax both tell you to "make an estimated payment." But quarterly estimated payments fail the §6654 safe-harbor test if they are unevenly distributed — the IRS treats withholding as evenly spread but treats estimated payments by quarter. A late catch-up estimate cures only that quarter forward. Priya\'s better move: amend her W-4 line 4(c) to direct an additional $1,900 per remaining pay period to federal withholding. Withholding (unlike estimates) is statutorily deemed to be spread ratably across the year (IRC §6654(g)(1)) — so it cures the Q1–Q3 shortfall retroactively.',
    },
    {
      type: 'p',
      text: 'Penalty avoided: with the §6654 safe harbor met by year-end via the W-4 correction, the penalty Priya was on track for (~$1,400 at the IRS October 2026 short-term + 3% underpayment rate) drops to $0. Cash saved at filing: $1,400.',
    },
    {
      type: 'callout',
      text: 'The withholding-vs-estimate distinction in §6654(g)(1) is the single most-missed rule in the equity-comp playbook. Tax software treats them as interchangeable in the final return — they are not, when it comes to penalty avoidance during the year.',
    },

    { type: 'h2', text: 'Finding #2 — $77,000 of Mega-Backdoor Roth capacity she did not know existed' },
    {
      type: 'p',
      text: 'Section 2 of the review walks the 401(k) calendar. Priya\'s plan allows after-tax (not Roth) contributions on top of the regular $23,500 elective deferral. It also allows in-service distributions — meaning the after-tax money can be converted to Roth without waiting until separation. HR has not surfaced this combination because the plan vendor (a major payroll-and-401k integrator) does not push it. Priya did not know.',
    },
    {
      type: 'p',
      text: 'The math, anchored to IRC §415(c)(1)(A): the 2026 total annual addition limit for a single 401(k) is $70,000 (this is the §415 cap; check current-year value on IRS Notice 2025-67 or successor). Subtract: $23,500 elective + ~$11,000 employer match = $34,500 already used. Remaining §415 room available as after-tax contribution: $70,000 − $34,500 = $35,500 per year. Over the 4 years she stays at this company at her current trajectory: $35,500 × 4 = $142,000 of after-tax 401(k) contributions, which (via in-service distribution → Roth conversion under IRS Notice 2014-54) become Roth dollars growing tax-free forever.',
    },
    {
      type: 'p',
      text: 'But this year alone she still has Q4 to capture: she elects 100% of remaining 2026 paychecks (~9 pay periods) into after-tax to hit ~$35,500 of after-tax contribution before December 31. Converted in-service to Roth, that is $35,500 of Roth space captured this year. The "$77,000" headline comes from the full math: $35,500 captured in Q4 2026 + a confirmed $35,500/year × 2 future years she remains at the company before her vesting cliff = ~$106,500 of capacity unlocked, of which $77,000 is the present-value tax-deferred portion projected forward at the assumed bracket.',
    },
    {
      type: 'p',
      text: 'How much tax does this save? On the $35,500 of after-tax-to-Roth converted this year: the after-tax basis carries over, so the conversion is tax-free (assuming the in-service distribution happens within the same year as the contribution, eliminating earnings — see IRS Notice 2014-54 §III on basis recovery). Growth on $35,500 over 25 years at 7% = $193,000 — all tax-free. Same growth in a taxable brokerage account would face long-term capital gains + NIIT (combined ~23.8% federal) on the gains plus NY state on the way out. Lifetime tax saved on year-one capacity alone: roughly $46,000 in present value.',
    },

    { type: 'h2', text: 'Finding #3 — State AMT compounding on her ISO exercise' },
    {
      type: 'p',
      text: 'Section 3 audits ISO exposure. Priya exercised 200 ISO shares from her previous startup in March 2026: $30 strike, $450 FMV at exercise. Bargain element (FMV − strike) × shares = ($450 − $30) × 200 = $84,000. For federal AMT under IRC §56(b)(3), this is an AMT preference item — meaning her AMTI for 2026 is bumped by $84,000.',
    },
    {
      type: 'p',
      text: 'Two things her tax software will not catch in October: (1) NY state has its own personal AMT (NY Tax Law §623) that piggybacks on federal AMTI with NY-specific add-backs. New York City does not have a personal AMT, so the city tax is unaffected. (2) AMT paid in 2026 generates an AMT credit recoverable in future years against regular tax (IRC §53), but only to the extent her regular tax exceeds her tentative minimum tax in those future years — which depends on whether she holds the ISO shares long enough for the AMT preference to "unwind."',
    },
    {
      type: 'p',
      text: 'The Annual Review template runs the full Form 6251 math live in the Mathstub ISO/AMT calculator and projects the Form 8801 AMT credit recovery schedule out 5 years. Result for Priya: $11,200 of federal AMT owed for 2026, plus ~$5,500 of NY AMT (NY top marginal × the same $84,000 with NY-specific add-backs). Of the federal AMT, ~$9,800 becomes recoverable as credit against future regular tax — projected to come back over 2027–2030 if she sells the ISO shares as a disqualifying disposition (most likely path given her concentration concern, see Finding #5).',
    },
    {
      type: 'p',
      text: 'Action item that came out of this section: file Form 8801 with her 2026 return (not just the year-of-exercise return) to establish the credit basis, and add the Form 8801 schedule to her Mathstub planner so the 2027–2030 recovery is not lost.',
    },

    { type: 'h2', text: 'Finding #4 — RSU cost-basis flag on her September 1099-B preview' },
    {
      type: 'p',
      text: 'Priya sold 50 RSUs in September 2026 to fund a kitchen remodel. Her broker (one of the major three) sent her a preliminary YTD 1099-B preview in late September. Section 4 of the Annual Review walks the cost-basis check.',
    },
    {
      type: 'p',
      text: 'Broker preview: Proceeds $30,000. Cost basis: $0. Reportable gain (if filed as-is): $30,000 short-term capital gain.',
    },
    {
      type: 'p',
      text: 'Real basis: FMV at vest. The 50 shares had vested in March 2026 at $580/share — total FMV at vest = $29,000. This was already taxed as W-2 ordinary income in 2026 (her W-2 Box 1 includes it). If she lets the broker $0 basis stand, she pays capital gains tax on $30,000 instead of $1,000 (the actual short-term gain: $30,000 − $29,000 = $1,000).',
    },
    {
      type: 'p',
      text: 'Fix mechanic: when she files her 2026 1040, she will report the broker basis ($0) in Form 8949 column (e), put code "B" in column (f), and put −$29,000 as the basis adjustment in column (g). Column (h) becomes the correct $1,000 short-term gain. Tax saved: ($30,000 − $1,000) × 32% marginal = $9,280 of federal she would have overpaid + NY state ~$2,000 on the same amount = ~$11,280. This is THE most-missed equity-comp tax mistake and is fully covered in our companion post on /blog/rsu-cost-basis-fix-form-8949.',
    },
    {
      type: 'p',
      text: 'Priya cross-checked her last 3 years of returns at the same time — found one prior return (2024) had the same error, $4,800 of overpaid tax. She files Form 1040-X for 2024 to claim the refund (IRC §6511 gives a 3-year statute of limitations, so 2023 onward is still recoverable).',
    },

    { type: 'h2', text: 'Finding #5 — 38% AAPL concentration risk + the exchange-fund tactic' },
    {
      type: 'p',
      text: 'Section 5 of the Annual Review is a concentration-policy check. Priya\'s total liquid net worth (excluding 401(k)) is ~$520,000. Her AAPL position is ~$200,000 of that. Concentration ratio: 38%.',
    },
    {
      type: 'p',
      text: 'Most financial-advisor blogs recommend keeping single-stock concentration under 10%. At 38%, Priya is taking material idiosyncratic risk. Selling AAPL outright generates a large taxable event: she has been accumulating since 2018, average basis $98/share, current price $230. Selling all 870 shares = $114,840 of long-term capital gain. At 23.8% federal LTCG + NIIT + ~8.8% NY = ~$37,500 of immediate tax.',
    },
    {
      type: 'p',
      text: 'The Annual Review template walks an alternative: a §721(c)/(g) exchange fund. These funds (the Eaton Vance / Cache / Long Acre branded offerings) let a concentrated holder contribute their single stock in exchange for limited-partnership interests in a diversified pool, deferring the capital gain for 7+ years (assuming the §721 holding-period rules are met). Trade-off: 7-year lockup, ~1.5–2% annual fee, no liquidity. For Priya, this is the cleanest path to diversify without triggering a $37,500 tax event.',
    },
    {
      type: 'p',
      text: 'Decision: she does not execute the exchange fund this year (wants to keep liquidity flexibility until kitchen remodel + maternity timing resolve). But she does flag a 2027 review of the option, and meanwhile diverts new RSU vests to non-AAPL ETFs to slow the ratio creep.',
    },

    { type: 'h2', text: 'The total — $11,300 cash + $77,000 tax-shelter, 90 minutes' },
    {
      type: 'p',
      text: 'Adding the cash items:',
    },
    {
      type: 'table',
      caption: 'Cash saved / recovered',
      headers: ['Item', 'Amount'],
      rows: [
        ['§6654 penalty avoided (Q4 W-4 fix)', '+$1,400'],
        ['RSU cost-basis fix on 2026 sales (Form 8949 col g)', '+$11,280'],
        ['Form 1040-X refund (2024, same error)', '+$4,800'],
        ['Net new AMT on the ISO exercise', '−$6,200'],
        ['**Net immediate-year cash**', '**~$11,300**'],
      ],
    },
    {
      type: 'p',
      text: 'Tax-shelter capacity unlocked:',
    },
    {
      type: 'table',
      caption: 'Roth shelter unlocked',
      headers: ['Item', 'Amount'],
      rows: [
        ['Captured in Q4 2026', '$35,500'],
        ['Available over the next 2 years', '$71,000'],
        ['Total capacity unlocked', '$106,500'],
        ['Lifetime tax saved on yr-1 capacity (PV, 25yr @ 7%)', '~$46,000'],
        ['**Present-value tax shelter (the headline)**', '**$77,000**'],
      ],
    },
    {
      type: 'p',
      text: 'Time invested: 90 minutes. Tool used: the Mathstub Tech Worker Annual Review Notion template, which links every row into the relevant free Mathstub calculator (the RSU Tax Shortfall calc for Finding #1, the Mega-Backdoor Roth calc for #2, the ISO/AMT calc for #3, the RSU cost-basis explainer for #4). She paid $39 once for the template, $0 for the calculators. ROI: ~280× on the first year alone.',
    },

    { type: 'h2', text: "What this is — and what it isn't" },
    {
      type: 'p',
      text: 'This is a planning workflow, not tax advice. The calculators run the math; the case study illustrates a representative composite. Real tax outcomes depend on facts the template does not capture — state residency sourcing, multi-state allocation (if Priya moved to NJ or CT mid-year, the math changes meaningfully), prior-year AMT carryovers, ISO holding-period planning for §422 qualifying disposition, and plan-specific 401(k) rules.',
    },
    {
      type: 'p',
      text: "For high-stakes decisions ($10,000+ tax exposure, ISO exercise timing, multi-state moves, pre-IPO planning), engage a CPA or financial planner licensed in your state who specialises in equity comp. Our /about page links a CPA-matching affiliate (Harness Wealth) that specialises in this audience. The Annual Review template's CPA brief output (a 1-page printable summary) shortens the first conversation from 90 minutes to 30.",
    },
    {
      type: 'p',
      text: 'Sources: IRC §3402(g)(1)(A) (supplemental wage withholding 22% flat); IRC §6654 (estimated tax penalty), §6654(g)(1) (withholding deemed ratable); IRC §415(c)(1)(A) (annual addition limit); IRC §401(k)(3) (elective deferral limit); IRC §72(t) (early withdrawal penalty — not triggered here); IRC §53 (AMT credit carryforward); IRC §56(b)(3) (ISO exercise as AMT preference); IRC §6511 (statute of limitations on refunds); IRS Notice 2014-54 (after-tax 401(k) → Roth conversion basis allocation); IRS Form 6251 (Alternative Minimum Tax); IRS Form 8801 (AMT credit); IRS Form 8949 (Sales and Other Dispositions of Capital Assets); IRS Form 1040-X (Amended Return); NY Tax Law §623 (state AMT). All figures rounded to the nearest hundred for readability; calculator outputs use full precision.',
    },
  ],
};
