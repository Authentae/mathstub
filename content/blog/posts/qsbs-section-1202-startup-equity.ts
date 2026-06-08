import type { BlogPost } from '../registry';

export const qsbsSection1202: BlogPost = {
  slug: 'qsbs-section-1202-startup-equity',
  title: 'QSBS explained: how startup employees can pay $0 tax on up to $15M of gains',
  description:
    'Section 1202 (QSBS) can wipe out federal tax on millions in startup stock gains — and the rules just got better in July 2025. Here is who qualifies, the new tiered holding period, and the traps in plain English.',
  datePublished: '2026-06-01',
  dateModified: '2026-06-07',
  authorName: 'Mathstub Editorial',
  reviewerName: 'Reviewed against IRS primary sources',
  affiliateOfferIds: ['harness-wealth', 'turbotax-premier'],
  quickAnswer:
    'QSBS (Qualified Small Business Stock, IRC §1202) lets eligible holders exclude federal tax on startup-stock gains — up to the greater of $15M or 10× your basis per company. For stock issued on or after July 4, 2025, the One Big Beautiful Bill Act (OBBBA) added a tiered hold: 50% excluded at 3 years, 75% at 4 years, 100% at 5 years. The company must be a US C-corp with under $75M in gross assets when the stock was issued, in a qualified (non-service) business. Options do not qualify — only the shares after you exercise, with the clock starting at exercise.',
  keyPoints: [
    'QSBS can make millions in startup-stock gains completely federal-tax-free.',
    'The cap is the greater of $15M or 10× what you paid — per company.',
    'New as of July 4, 2025: you no longer need a full 5 years. 3 years = 50% off, 4 = 75%, 5 = 100%.',
    'The company must be a US C-corp with under $75M in assets when your shares were issued.',
    'Stock options do not count — only the actual shares after you exercise (the clock starts then).',
    'It is a FEDERAL break. Some states (like California) tax the gain anyway.',
  ],
  blocks: [
    {
      type: 'p',
      text:
        'There is a tax break in the startup world so generous that people assume it must be a myth: you can sell your startup shares for millions and pay $0 in federal tax on the gain. It is real, it is called QSBS, and most employees who qualify for it have never heard of it. Worse, some sell their shares a few months too early and hand the IRS a check they never had to write.',
    },
    {
      type: 'p',
      text:
        'QSBS — short for Qualified Small Business Stock, written into the law as Section 1202 — is the rule behind it. And as of July 2025 it got meaningfully better. Here is the whole thing in plain English: who gets it, how much it saves, the new shorter timeline, and the traps that quietly disqualify people.',
    },
    { type: 'h2', text: 'What QSBS actually does' },
    {
      type: 'p',
      text:
        'Normally, when you sell stock for more than you paid, you owe capital-gains tax on the profit. QSBS says: if your shares qualify, you can **exclude** that profit from federal tax entirely — wipe it off your return — up to a very large cap.',
    },
    {
      type: 'p',
      text:
        'The cap is generous: the **greater of $15 million, or 10× what you paid for the shares**, per company. So if you paid $100,000 to exercise your options, your 10× cap is $1,000,000 — but the $15M floor means you are really protected up to $15M of gain regardless. For the vast majority of employees, that means the entire gain is covered.',
    },
    {
      type: 'callout',
      text:
        'Plainly: a startup employee who exercises early, holds long enough, and has a big exit can legally pay $0 federal tax on up to $15 million of profit. That is not a loophole — it is Congress deliberately rewarding people who fund and build small companies.',
    },
    { type: 'h2', text: 'The 2025 upgrade: you no longer need a full 5 years' },
    {
      type: 'p',
      text:
        'This is the part that is new and that almost no one has caught up on yet. The old rule was strict: hold the shares **5 full years** or you got nothing. Miss it by a day and the entire break vanished.',
    },
    {
      type: 'p',
      text:
        'The One Big Beautiful Bill Act (OBBBA), signed July 2025, replaced that all-or-nothing rule with a sliding scale — but only for **stock issued on or after July 4, 2025**:',
    },
    {
      type: 'table',
      caption: 'New sliding scale — shares issued on/after July 4, 2025',
      headers: ['How long you hold', 'Gain that’s tax-free', 'All-in federal rate on the rest'],
      rows: [
        ['3 years', '50%', '~15.9%'],
        ['4 years', '75%', '~7.95%'],
        ['5+ years', '100%', '$0'],
      ],
    },
    {
      type: 'p',
      text:
        '(Those “all-in” rates already include the 3.8% net investment income tax on the portion that is still taxed.)',
    },
    {
      type: 'p',
      text:
        'So an exit at year 3 or 4 — which used to mean zero QSBS benefit — now gets you half or three-quarters of the break. If your shares were issued **before** July 4, 2025, you are still on the old rule: 5 years for 100%, nothing before that.',
    },
    {
      type: 'callout',
      text:
        'The date your shares were issued decides which rulebook you use. Newer shares (on/after July 4, 2025) get the friendly 3/4/5-year sliding scale. Older shares keep the strict 5-year-or-nothing rule. Know which bucket each grant falls into.',
    },
    { type: 'h2', text: 'Does your company qualify? The checklist' },
    {
      type: 'p',
      text:
        'QSBS is about the company, not just you. All of these have to be true for the shares to count:',
    },
    {
      type: 'ul',
      items: [
        '**US C-corporation** — not an S-corp, LLC, or partnership. Most venture-backed startups already are.',
        '**Under $75M in assets when your shares were issued** ($50M before July 4, 2025). Growing huge later is fine — only the size on issue day counts.',
        '**A real operating business, not a service firm.** Software/product startups qualify; law, accounting, consulting, health, and finance shops are excluded.',
        '**Shares bought straight from the company** ("original issuance") — exercised options or a direct purchase, not bought from another shareholder.',
      ],
    },
    { type: 'h2', text: 'The trap that catches employees: options are not QSBS' },
    {
      type: 'p',
      text:
        'Here is the single most expensive misunderstanding. **Your stock options — ISOs or NSOs — are not QSBS.** Holding options for years does nothing for your QSBS clock, because you do not own QSBS shares yet. You only own them once you **exercise**.',
    },
    {
      type: 'p',
      text:
        'That means your QSBS holding period starts on the day you exercise, not the day you were granted the options. The practical takeaway is brutal in its simplicity: **the earlier you exercise, the sooner your QSBS clock starts.** People who wait until right before an exit to exercise often blow past any chance at the exclusion, because they never held actual shares long enough.',
    },
    {
      type: 'analogy',
      text:
        'Think of options like a ticket to buy a seat — not the seat itself. The QSBS clock only starts once you actually own the seat (exercise into real shares). Holding the ticket for years counts for nothing.',
    },
    {
      type: 'callout',
      text:
        'If you are holding vested options at a qualifying startup and you can afford the exercise cost (and any AMT), exercising early does two things: it starts your QSBS clock, and it locks in a low cost basis. This is exactly the kind of move worth modeling with a CPA before a liquidity event is on the horizon — not after.',
    },
    { type: 'h2', text: 'A simple worked example' },
    {
      type: 'p',
      text:
        'Say you join a software startup and exercise your options in 2026 for $50,000 total, when the company has $20 million in assets (well under the $75M cap). Five years later the company is acquired and your shares are worth $5,050,000 — a $5,000,000 gain.',
    },
    {
      type: 'flow',
      caption: 'Exercise $50k → hold 5 years → $5M gain',
      steps: [
        { label: 'Exercise cost', value: '$50k' },
        { label: 'Gain at exit', value: '$5M', tone: 'good' },
        { label: 'Tax without QSBS', value: '−$1.19M', tone: 'bad' },
        { label: 'Tax with QSBS', value: '$0', tone: 'good' },
      ],
    },
    {
      type: 'p',
      text:
        'The shares were issued after July 4, 2025 and held 5 full years, so **100% of the $5,000,000 gain is federal-tax-free**. Without QSBS, that gain at the top 23.8% rate (20% long-term + 3.8% NIIT) would have cost about **$1,190,000**.',
    },
    {
      type: 'p',
      text:
        'Sell at year 3 instead and you would exclude 50% — $2,500,000 tax-free, with the other half taxed. Still a six-figure savings for holding a little longer than you might have.',
    },
    { type: 'h2', text: 'The state-tax catch most people miss' },
    {
      type: 'p',
      text:
        'QSBS is a **federal** break. States get to decide whether they follow it, and not all do. The big one: **California does not recognize QSBS at all** — it taxes the full gain at state rates even when your federal tax is zero. New Jersey and a couple of others also decouple.',
    },
    {
      type: 'p',
      text:
        'So "tax-free" can mean genuinely $0 if you live in a no-income-tax state like Texas or Washington, but "federal-free, state-taxed" if you are in California. If a QSBS exit and a possible move are both on your horizon, the order and timing matter — and that is a planning conversation worth having early.',
    },
    { type: 'h2', text: 'What to do now' },
    {
      type: 'ol',
      items: [
        '**Find out if your company is a C-corp** and roughly what its gross assets were when your shares were issued. Your equity admin (Carta, Pulley) or the company’s finance team can confirm.',
        '**Pin down your issuance dates.** For each grant, was the stock issued before or after July 4, 2025? That decides which holding-period rule you are under.',
        '**If you hold vested options, model an early exercise.** Starting the QSBS clock sooner is the lever most employees control. Weigh it against the cash cost and any AMT (our ISO/AMT calculator helps with that piece).',
        '**Ask for a QSBS attestation letter** from the company around the time you sell — it documents that the shares qualified, which you will want if the IRS ever asks.',
        '**Loop in a CPA before a liquidity event, not after.** QSBS is high-dollar and full of edge cases (trusts, stacking, state rules). Getting it right is worth real money.',
      ],
    },
    {
      type: 'p',
      text:
        'QSBS is one of the few places in the tax code where the reward for understanding the rules is measured in hundreds of thousands — sometimes millions — of dollars. The 2025 changes only made it more generous and more reachable. If you have startup equity, it is worth ten minutes to find out whether you are sitting on it.',
    },
    {
      type: 'p',
      text:
        'Sources: IRC §1202 (exclusion for qualified small business stock); IRC §1202(d) (gross-assets and qualified-trade requirements); IRC §1411 (3.8% Net Investment Income Tax); One Big Beautiful Bill Act of 2025 (Pub. L. 119-21, §1202 amendments — tiered exclusion, $15M cap, $75M gross-assets cap, effective for stock issued on/after July 4, 2025); IRS Publication 550 (Investment Income and Expenses). State conformity varies — California (R&TC) does not conform to §1202. This is educational information, not tax advice; confirm your situation with a qualified CPA.',
    },
  ],
} as const;
