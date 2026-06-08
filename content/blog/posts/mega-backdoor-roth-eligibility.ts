import type { BlogPost } from '../registry';

export const megaBackdoorRothEligibility: BlogPost = {
  slug: 'mega-backdoor-roth-eligibility',
  title: 'Mega-Backdoor Roth: am I eligible, and how much can I actually do?',
  description:
    'Two conditions decide it: your 401(k) plan must allow after-tax contributions AND offer in-service distribution or in-plan Roth conversion. Walk the §415(c) math, identify the room your plan leaves, and learn how to check both flags inside 60 seconds.',
  datePublished: '2026-05-22',
  dateModified: '2026-06-07',
  authorName: 'Mathstub Editorial',
  reviewerName: 'Reviewed against IRS primary sources',
  affiliateOfferIds: ['turbotax-premier'],
  quickAnswer:
    'Two things must be true: (1) your 401(k) plan allows after-tax (non-Roth, non-pre-tax) contributions, and (2) the plan supports either in-service distributions or in-plan Roth conversions. If both check out, your annual room equals $70,000 (the §415(c) overall limit) minus your elective deferral ($23,500 max), employer match, and any profit-sharing. Typical FAANG L5: ~$35,000/year of additional Roth space on top of the regular 401(k).',
  keyPoints: [
    'It works only if your 401(k) plan offers two specific features.',
    'Feature 1: lets you add extra "after-tax" money beyond the normal $23,500 cap.',
    'Feature 2: lets you move that money into a Roth (in-plan or as a rollout).',
    'In 2025 the overall cap is $70,000, minus what you and your employer already put in.',
    'A typical senior engineer gets about $35,000/year of extra Roth room this way.',
    'Convert the money fast — earnings that pile up first get taxed when you convert.',
  ],
  blocks: [
    {
      type: 'p',
      text: 'The Mega-Backdoor Roth is the highest-leverage retirement move available to high-earning tech workers. Direct Roth IRA contributions phase out at $165,000 MAGI (single) / $246,000 (MFJ) for 2025, which closes the door for almost every FAANG L5+ employee. The Backdoor Roth IRA opens a $7,000/year crack. The Mega-Backdoor opens a $30,000–$46,000/year door — but only if your 401(k) plan supports it.',
    },
    { type: 'h2', text: 'The two-condition test' },
    {
      type: 'p',
      text: 'You can do the Mega-Backdoor only if your employer 401(k) plan satisfies both of these. Skip either one and the strategy collapses.',
    },
    {
      type: 'ol',
      items: [
        '**The plan allows after-tax (non-Roth) employee contributions.** This is a SEPARATE contribution source from pre-tax 401(k) and Roth 401(k). Most plan documents list three options: Pre-Tax, Roth, After-Tax. You need the third one. About 50% of plans offer it per Vanguard\'s How America Saves 2024 report — common at large tech (Google, Microsoft, Meta, Netflix, Amazon, Salesforce), rare at smaller employers.',
        '**The plan allows EITHER in-service distribution OR in-plan Roth conversion (IRR).** Without one of these, your after-tax money grows tax-deferred (taxable when withdrawn). With one of them, you can convert the after-tax money to Roth — unlocking tax-free growth. Many plans that offer after-tax DO NOT offer the conversion mechanism. Check both flags.',
      ],
    },
    { type: 'h2', text: 'How to verify both flags inside 60 seconds' },
    {
      type: 'p',
      text: 'Three places to look, in order of reliability:',
    },
    {
      type: 'ul',
      items: [
        '**Your 401(k) provider portal.** Log into Fidelity / Vanguard / Schwab / etc. and look under "Contribution Sources" or "Change Contributions." If you see a checkbox or input for "After-Tax" alongside "Pre-Tax" and "Roth", condition 1 is satisfied.',
        '**Your Summary Plan Description (SPD).** Required to be available to all participants under ERISA. Search the PDF for "after-tax" and "in-service distribution" or "in-plan Roth rollover" / "in-plan Roth conversion." Both must appear.',
        '**Ask HR / benefits directly.** Ask the exact question: "Does our 401(k) plan allow after-tax employee contributions AND in-plan Roth conversion?" Avoid leading questions like "Can I do a Mega-Backdoor Roth?" — most HR reps will say no out of caution. The two-flag question is unambiguous.',
      ],
    },
    { type: 'h2', text: 'The §415(c) math' },
    {
      type: 'p',
      text: 'The IRS sets an overall annual contribution cap on your 401(k) under IRC §415(c). For 2025, that cap is $70,000. Your Mega-Backdoor room equals that cap minus everything else that flows into your account.',
    },
    {
      type: 'quote',
      text: 'Mega-Backdoor room = $70,000 (§415 cap) − elective deferral − employer match − employer profit-sharing.',
      cite: 'Working formula',
    },
    {
      type: 'p',
      text: 'Worked example — typical FAANG L5 senior engineer in 2025:',
    },
    {
      type: 'flow',
      caption: 'A typical FAANG L5’s room (2025)',
      steps: [
        { label: '§415 cap', value: '$70,000' },
        { label: '− your deferral', value: '$23,500', tone: 'bad' },
        { label: '− employer match', value: '$11,000', tone: 'bad' },
        { label: 'Mega-Backdoor room', value: '$35,500', tone: 'good' },
      ],
    },
    {
      type: 'p',
      text:
        'Elective deferral is the $23,500 §402(g) cap (pre-tax + Roth 401(k) combined); the employer match is a typical $11,000 (it varies, often $11k–$15k); most large tech plans have no profit-sharing. Whatever the §415 cap minus those leaves is your after-tax room.',
    },
    {
      type: 'p',
      text: 'That $35,500 — every year — converted to Roth, compounded at 7% real return over 25 years to age 60, becomes roughly $193,000 of tax-free retirement money. Do it every year for 25 years: $2.25 million tax-free. The Mathstub Mega-Backdoor Roth calculator runs the projection on your inputs.',
    },
    { type: 'h2', text: 'The conversion mechanism, explained' },
    {
      type: 'p',
      text: 'After-tax money sitting in your 401(k) grows tax-deferred — when you withdraw it, the growth is taxed as ordinary income. To unlock the Roth benefit (tax-free growth), you have to convert the after-tax sub-account to Roth. Two mechanisms:',
    },
    {
      type: 'ol',
      items: [
        '**In-service distribution.** While still employed, you pull the after-tax balance out of your 401(k) and roll it directly into a Roth IRA (custodian-to-custodian transfer). IRS Notice 2014-54 explicitly allows this and confirms basis isolation — only the after-tax portion goes to Roth IRA; any earnings can be sent to a Traditional IRA simultaneously.',
        '**In-plan Roth Rollover (IRR).** Convert the after-tax sub-account to a Roth 401(k) sub-account without leaving the plan. Cleaner if your plan offers it because the money stays inside the 401(k) ecosystem.',
      ],
    },
    {
      type: 'callout',
      text: 'Convert immediately. The longer after-tax money sits in your 401(k), the more growth accumulates, and that growth becomes taxable upon conversion. Most plans that support the Mega-Backdoor also offer auto-conversion — turn it on if available so each pay period\'s after-tax contribution converts to Roth within days.',
    },
    { type: 'h2', text: 'Common gotchas' },
    {
      type: 'ul',
      items: [
        '**The 415 limit changes yearly.** $66,000 (2023), $69,000 (2024), $70,000 (2025). Check the current year before assuming.',
        '**Catch-up contributions sit OUTSIDE the §415 cap.** If you are 50+, the $7,500 catch-up adds to the $70k ceiling, raising your effective total contribution capacity. The Mega-Backdoor room is unchanged.',
        '**Non-discrimination testing (ACP test) can refund your after-tax contributions.** Smaller employers whose highly-paid employees disproportionately use after-tax contributions can fail the IRS ACP test and have to refund some of your contributions. Common at startups, rare at FAANG. Your plan administrator will warn you if this is a risk.',
        '**State tax treatment of the Roth conversion varies.** Most states follow federal treatment (no tax owed on the after-tax basis converted to Roth). California and a few others may treat the conversion differently — verify with your CPA if you are in a state with non-conforming Roth rules.',
      ],
    },
    { type: 'h2', text: 'Should you do this?' },
    {
      type: 'p',
      text: 'For most $200k+ tech workers whose 401(k) plan supports both conditions: yes. The after-tax → Roth pathway is one of the highest after-tax-IRR moves available because the alternative use of that capital is taxable brokerage (where growth is taxed at LTCG + state + 3.8% NIIT for high earners). Roth growth is taxed at exactly 0%.',
    },
    {
      type: 'p',
      text: 'For people in a lower bracket or planning a sub-65 retirement: still usually yes, but the marginal benefit shrinks. Talk to a fee-only fiduciary planner if your situation is unusual (early retirement plans, ACA subsidy considerations, planning a job change mid-year, etc.).',
    },
    {
      type: 'p',
      text: 'Run the Mathstub Mega-Backdoor Roth calculator with your numbers to see exact room + projection at your inputs.',
    },
    {
      type: 'p',
      text: 'Sources: IRC §415(c) (overall annual contribution limit, $70,000 for 2025); IRC §402(g)(1) (employee elective deferral limit, $23,500 for 2025); IRC §414(v) (catch-up contributions for ages 50+); IRC §408A (Roth IRA rules); IRS Notice 2014-54 (basis isolation rule for after-tax 401(k) conversion); IRS Notice 2024-80 (2025 contribution limits); IRS Publication 560 (Retirement Plans for Small Business); IRS Publication 590-A (Contributions to IRAs); Treas. Reg. §1.415-6; Vanguard, How America Saves 2024 (plan-level after-tax availability statistics).',
    },
  ],
};
