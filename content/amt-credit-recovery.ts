export const amtCreditRecoveryContent = {
  slug: 'amt-credit-recovery',
  title: 'AMT Credit Recovery Calculator (Form 8801)',
  metaTitle: 'AMT Credit Recovery Calculator (Form 8801, 2025–2026)',
  metaDescription:
    'You paid AMT on an ISO exercise. When do you get the credit back? Free calculator projects your IRC §53 Minimum Tax Credit recovery year-by-year.',
  h1: 'AMT Credit Recovery Calculator',
  lede:
    'You paid AMT on an ISO exercise — Form 8801 carries that as a Minimum Tax Credit (MTC). Each future year your regular tax exceeds tentative minimum tax, you recover some of it. This calculator projects when the balance hits $0.',
  lastUpdated: '2026-05-11',
  taxYearDefault: 2026,
  howToSteps: [
    {
      name: 'Enter your starting credit balance',
      text: 'Pull this from the prior-year Form 8801, line 26 (Minimum tax credit carryforward to next year).',
    },
    {
      name: 'Enter projected annual income + filing status',
      text: 'Income should be your gross W-2 + other taxable income, before pre-tax deductions and standard deduction.',
    },
    {
      name: 'Optional: set an annual growth rate',
      text: 'If you expect raises or RSU vests pushing income up year-over-year, enter a percentage (e.g. 4%). Higher income = faster recovery (your regular tax outruns TMT by more).',
    },
    {
      name: 'Read the recovery schedule',
      text: 'The table shows year-by-year regular tax, TMT, credit usable, and remaining balance. The "years to full recovery" headline is your planning anchor.',
    },
  ],
  faqs: [
    {
      q: 'What is the AMT credit (Minimum Tax Credit)?',
      a: 'Per IRC §53, when you pay Alternative Minimum Tax in a year, the portion attributable to "deferral" preference items (like an ISO exercise that becomes ordinary income later when sold) generates a Minimum Tax Credit (MTC). The MTC carries forward indefinitely and offsets your regular tax in future years where regular tax exceeds tentative minimum tax. It is reported on IRS Form 8801.',
    },
    {
      q: 'When can I use the credit?',
      a: 'In any year where regular federal income tax exceeds tentative minimum tax (TMT). The amount you can apply is the difference between the two, capped at your remaining MTC balance. If TMT >= regular tax that year (you would otherwise be in AMT), you cannot apply credit — you carry the balance forward.',
    },
    {
      q: 'How long does the credit last?',
      a: 'IRC §53(d) makes the AMT credit carryforward indefinite — there is no expiration. However, "indefinite" is not "guaranteed to be recovered." If your future income is too low to make regular tax exceed TMT, the credit sits unused.',
    },
    {
      q: 'Why might I never recover the credit?',
      a: 'Two main scenarios: (1) Your future income drops or stays flat and AMT exemption phaseouts keep TMT close to regular tax. (2) You retire and live on capital gains / qualified dividends, which are taxed favorably under regular but get the full TMT treatment — TMT can stay above regular tax for years.',
    },
    {
      q: 'How is this different from "AMT refund credit" (the §53(e) refundable portion)?',
      a: 'The 100% refundable provision (former IRC §53(e)) was repealed by the Tax Cuts and Jobs Act of 2017. Today the AMT credit is non-refundable — it only offsets actual federal tax liability. The repealed refundable version applied to long-term unused credits from pre-2008 exercises and is no longer relevant for new credits.',
    },
    {
      q: 'Does this include state AMT credit?',
      a: 'No. v1 models federal MTC (Form 8801) only. California, New York, Massachusetts, and Minnesota have their own AMT systems with separate credit tracking. CA in particular requires Schedule P (540). Consult a CPA for state-credit interaction.',
    },
    {
      q: 'I am about to exercise more ISOs — does that affect my recovery?',
      a: 'Yes — significantly. Each new ISO exercise triggers fresh AMT preference, generates new MTC (good), but also pushes you back into AMT for that year, pausing recovery on existing balance (bad). Run the Mathstub ISO/AMT calculator first to size the new exposure, then re-run this scheduler with the new combined balance.',
    },
    {
      q: 'What does "tentative minimum tax" mean exactly?',
      a: 'TMT is what AMT would be in isolation: max(0, AMTI − exemption-after-phaseout) × 26%/28%. It is computed on Form 6251. AMT itself = max(0, TMT − regular tax). When regular tax > TMT, AMT is zero, and the difference is what the MTC can offset.',
    },
    {
      q: 'Is this tax advice?',
      a: 'No — it is a planning estimate. Real recovery depends on your actual future income, the full set of AMT preference items in future years (depreciation, oil/gas, certain bonds), and whether tax law changes (the TCJA AMT provisions sunset in 2025 unless extended). For real-money decisions, consult a CPA who specializes in equity comp and AMT planning.',
    },
  ],
} as const;
