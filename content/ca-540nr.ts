export const ca540NrContent = {
  slug: 'ca-540nr',
  title: 'CA Form 540NR Apportionment Calculator',
  metaTitle: 'CA Form 540NR Work-Source Apportionment Calculator — RSU after CA→TX move (2026)',
  metaDescription:
    'Free CA Form 540NR work-source apportionment calculator. For tech workers who moved CA→TX (or CA→NV/FL/WA) mid-vest. Vest-by-vest CA tax owed per FTB Pub 1004 + §19136 safe-harbor estimate + Q4 540-ES recommendation.',
  h1: 'CA Form 540NR Apportionment Calculator',
  lede:
    'California Franchise Tax Board Publication 1004 sources equity compensation income to the state where services were performed during the vesting period — not where you live at vest. Move CA→TX mid-vest and CA still claims its proportional share of every post-move vest. This calculator walks the math vest-by-vest and estimates the §19136 underpayment penalty + Q4 §540-ES payment to defeat it.',
  lastUpdated: '2026-05-26',
  taxYearDefault: 2026,
  howToSteps: [
    {
      name: 'List your remaining vests',
      text: 'Pull your grant agreement + vest schedule. Each row needs: vest label (e.g. "Nov 2024"), months between grant date and that vest (vesting-period months), months of those that you physically worked in California, FMV at vest (or projected FMV using current share price as a proxy).',
    },
    {
      name: 'Set your move date precisely',
      text: 'Count months in CA strictly. Lease, utilities, voter registration, drivers license — CA aggressively audits high-income movers. Document the move date and stick to it across every vest.',
    },
    {
      name: 'Optional: enter prior-year CA tax + AGI',
      text: 'For the §19136 safe-harbor estimate. Prior-year CA tax = your last CA 540 or 540NR tax line. Prior-year AGI > $150k triggers the 110% factor instead of 100%.',
    },
    {
      name: 'Read the vest breakdown + total CA tax owed',
      text: 'Per-vest: CA allocation %, CA-source income (Schedule CA(540NR) column E), CA tax at 13.3%. Total at the bottom + safe-harbor threshold + recommended Q4 540-ES payment.',
    },
  ],
  faqs: [
    {
      q: 'What is FTB Publication 1004?',
      a: "California Franchise Tax Board's guidance on sourcing stock-option income for non-residents. The core rule: equity compensation income is sourced to where the services were performed during the vesting period, not where the holder lives at vest. Applies to RSUs, ESPP discounts, ISO exercises, NSO exercises, SAR settlements. CA Revenue and Taxation Code §17951 is the statutory backstop.",
    },
    {
      q: 'Wait — I moved to Texas. Why does CA still tax my vests?',
      a: 'Because you EARNED the right to those shares while working in California. The vesting period is when the services were performed; the vest date is just when the property is delivered. CA taxes the portion of vesting-period months that occurred in CA. The remaining portion is sourced to wherever you worked during those months — for TX/NV/FL/WA movers, that portion is state-tax-free.',
    },
    {
      q: 'Is this only for moves out of CA?',
      a: 'No — the math runs both directions. Move TO California mid-vest and CA only claims the months you actually worked in CA. The calculator computes the CA-source portion based on monthsInCalifornia / vestingPeriodMonths regardless of move direction.',
    },
    {
      q: 'What is §19136 and the underpayment penalty?',
      a: "California Revenue and Taxation Code §19136 imposes a non-deductible penalty when, by April 15, you have not paid in (withholding + quarterly estimates) at least 90% of current-year CA tax OR 100% of prior-year CA tax (110% if AGI > $150k). For mid-year movers whose CA employer payroll stopped withholding CA tax after the move, this often triggers — the post-move vests carry CA-source income with no CA withholding.",
    },
    {
      q: 'Why a Q4 540-ES estimated payment and not just wait for filing?',
      a: "Unlike federal §6654(g)(1), California §19136 does NOT treat withholding as ratable. CA treats withholding AND estimated payments quarter-by-quarter. So you cannot retroactively cure a Q1-Q3 shortfall via Q4 W-4 the way you can federally. The only mid-year cure is filing CA Form 540-ES quarterly estimates. Submit Q3 by Sept 15 + Q4 by Jan 15.",
    },
    {
      q: 'What form do I file?',
      a: 'Form 540NR (long form for part-year residents in the move year; non-resident form for subsequent years). Schedule CA(540NR) Part III computes the apportionment ratio. Only the CA-source portion of each vest gets reported in column E.',
    },
    {
      q: 'What about ISO bargain elements during the CA work period?',
      a: 'Also CA-sourced under FTB Pub 1004. CA personal AMT (§17062) attaches to the bargain element. Disqualifying dispositions of ISOs exercised during the CA work period also carry CA exposure on the spread. The Mathstub Form 6251 calculator handles federal AMT; for state AMT exposure use the State Stock-Comp Tax Lookup.',
    },
    {
      q: 'NY convenience-of-employer rule?',
      a: 'Different state, different rule. NY can claim 100% of your income via TSB-M-06(5)I if your employer is NY-based and you work remotely "for your convenience" rather than the employer\'s. CA does not have a convenience-of-employer rule. For NY-employer + non-NY-residence scenarios, the math is more aggressive and is documented in the Mathstub Multi-State Equity Comp Tax Planner template.',
    },
    {
      q: 'Top marginal CA rate — is it always 13.3%?',
      a: "The calculator uses 13.3% for the post-2024 top bracket (CA RTC §17041). Lower-income filers may see a lower effective rate — but the FTB Pub 1004 sourcing rule still allocates the income to CA regardless. If you want a non-top-bracket effective rate, multiply by your actual CA marginal rate (mathstub /state-stock-comp/ca has the brackets).",
    },
    {
      q: 'Is this tax advice?',
      a: "No. It's a planning estimate. Real outcomes depend on: domicile evidence (CA audits high-income movers aggressively — keep lease/utilities/voter registration paperwork), day-count exactness if business travel back to CA is significant, prior-year carryovers, ISO holding-period interactions with CA state AMT. For multi-state moves with > $25k of post-move CA equity exposure, engage a CPA licensed in both states.",
    },
  ],
} as const;
