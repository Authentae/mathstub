import type { BlogPost } from '../registry';

export const rsuTaxCategoryBox14: BlogPost = {
  slug: 'rsu-tax-category-box-14-w2',
  title: 'What tax category are RSUs? Decoding Box 14 on your W-2',
  description:
    'RSUs show up as ordinary wage income on your W-2 — usually flagged in Box 14 with a code like RSU. Here is what that means and how RSUs are categorized for tax.',
  datePublished: '2026-05-28',
  dateModified: '2026-05-28',
  authorName: 'Mathstub Editorial',
  reviewerName: 'Reviewed against IRS primary sources',
  affiliateOfferIds: ['turbotax-premier', 'taxact-premier'],
  quickAnswer:
    'RSUs are taxed as ordinary income (compensation) at vesting — the same category as your salary. The vest-date value is included in Box 1 wages on your W-2, and often itemized in Box 14 with a label like "RSU". It is subject to federal income tax, Social Security, and Medicare. When you later sell, any gain or loss is a separate capital transaction.',
  keyPoints: [
    'RSUs are ordinary income (compensation), not capital gains, at vesting.',
    'The vest value is included in Box 1 of your W-2.',
    'Box 14 often itemizes the RSU amount with a code like "RSU" for your reference.',
    'RSU income is subject to income tax plus Social Security and Medicare.',
    'Selling the shares later is a separate capital gain/loss event.',
  ],
  blocks: [
    {
      type: 'p',
      text:
        'You are doing your taxes, you spot "RSU" in Box 14 of your W-2, and you pause: what kind of income is this? A capital gain? Some special category? The answer is simpler than you would guess. RSUs are just regular income — the same bucket as your salary.',
    },
    {
      type: 'p',
      text:
        'The reason Box 14 trips people up is that it looks separate from your wages, like a second thing you have to account for. Here is exactly how RSUs are categorized, why they land where they do on your W-2, and whether you need to do anything about Box 14 (spoiler: barely).',
    },
    {
      type: 'h2',
      text: 'RSUs are regular income, plain and simple',
    },
    {
      type: 'p',
      text:
        'On your vest day, the value of your RSUs is treated as regular income — exactly like your salary or a cash bonus. It is taxed at your regular income tax rate (10% to 37% federal, depending on your bracket), not the lower long-term capital gains rate.',
    },
    {
      type: 'p',
      text:
        'Here is the mental model that makes it click: vesting is an income event, not an investing event. The investing part starts later — when you hang on to the shares and they go up or down.',
    },
    {
      type: 'h2',
      text: 'Why RSUs show up in Box 14',
    },
    {
      type: 'p',
      text:
        'Box 14 on the W-2 is a catch-all "other" box where employers jot down informational stuff. For RSUs, your employer usually lists the vested value here with a label like "RSU", "RSUVEST", or something similar. It is purely for your information — that amount is already counted in your Box 1 wages.',
    },
    {
      type: 'callout',
      text:
        'Do NOT add the Box 14 RSU amount to your income on its own. It is already baked into Box 1. Box 14 is just your employer showing you how much of your Box 1 wages came from RSUs vesting. Count it twice and you will overpay.',
    },
    {
      type: 'h2',
      text: 'The two stages of an RSU\'s tax life',
    },
    {
      type: 'p',
      text:
        'Getting RSU taxes right comes down to keeping two separate events straight:',
    },
    {
      type: 'ol',
      items: [
        '**Vesting (regular income):** The value on your vest day gets added to your W-2 wages and taxed as regular income — hit with income tax, Social Security, and Medicare.',
        '**Selling (capital gain or loss):** When you later sell the shares, the difference between the sale price and the vest-day value is a capital gain or loss — short-term if you held a year or less, long-term if you held longer than a year.',
      ],
    },
    {
      type: 'p',
      text:
        'These two events play by completely different rule books. Vesting follows the compensation rules (IRC §83); selling follows the capital asset rules (IRC §1001 and §1222).',
    },
    {
      type: 'h2',
      text: 'A quick example',
    },
    {
      type: 'p',
      text:
        'Say 100 RSUs vest when the stock is $50. That is $5,000 of regular income, added to your Box 1 wages and itemized in Box 14 as "RSU $5,000". You pay tax on that $5,000 at your regular rate.',
    },
    {
      type: 'p',
      text:
        'Six months later you sell all 100 shares at $60, for $6,000. Your cost is the $5,000 you already paid tax on, so your capital gain is just $1,000 — taxed at short-term rates because you held under a year.',
    },
    {
      type: 'p',
      text:
        'Notice the pattern: the $5,000 is taxed once as income, and only the $1,000 of growth is taxed as a gain. No double taxation — as long as you set your cost correctly when you sell.',
    },
    {
      type: 'h2',
      text: 'What to do at tax time',
    },
    {
      type: 'ol',
      items: [
        'Confirm the Box 14 RSU value is already inside your Box 1 wages (it almost always is).',
        'Do not add the Box 14 amount again as extra income.',
        'When you sell the shares, report the sale on Schedule D and Form 8949 using the right vest-day cost.',
        'If your broker reports $0 cost, fix it (see our guide on fixing $0 cost basis).',
      ],
    },
    {
      type: 'h2',
      text: 'Box 14 vs the other W-2 boxes, quickly',
    },
    {
      type: 'p',
      text:
        'It helps to know where your RSU money actually "lives" on the W-2, versus where it is just shown for reference:',
    },
    {
      type: 'ul',
      items: [
        '**Box 1 (wages):** This is the real one. Your RSU vest value is included here and is what you are taxed on.',
        '**Box 14 (other):** Reference only. Your employer breaks out how much of Box 1 came from RSUs. You do not add it again.',
        '**Boxes 3 and 5 (Social Security and Medicare wages):** Your RSU value is usually in here too, because vesting income is hit by those payroll taxes as well.',
        '**Box 2 (federal tax withheld):** Includes the tax taken out when your RSUs vested, blended in with the tax from your regular paychecks.',
      ],
    },
    {
      type: 'p',
      text:
        'So the same RSU vest touches several boxes at once — but it is only counted as income one time, in Box 1. The other boxes are just describing that one event from different angles.',
    },
    {
      type: 'h2',
      text: 'Does Box 14 change what you owe?',
    },
    {
      type: 'p',
      text:
        'No. Box 14 is informational, full stop. Whether your employer labels it "RSU", "RSUVEST", or leaves it blank entirely, your tax bill is exactly the same — it is driven by Box 1. The only time Box 14 matters to you is as a cross-check: if the RSU number there looks wildly different from what your year-end pay stubs say vested, that is worth a quick question to payroll before you file.',
    },
    {
      type: 'p',
      text:
        'Sources: IRC §83(a) (property transferred for services); IRS General Instructions for Forms W-2 and W-3 (Box 14 reporting); IRC §3121 (Social Security and Medicare wages); IRC §1222 (capital gain holding periods).',
    },
  ],
};
