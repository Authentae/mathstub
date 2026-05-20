import type { Metadata } from 'next';
import {
  buildMetadata,
  canonical,
  faqSchema,
  howToSchema,
  webApplicationSchema,
} from '@/lib/seo';
import { JsonLd } from '@/components/JsonLd';
import { ToolShell } from '@/components/ToolShell';
import { FaqAccordion } from '@/components/FaqAccordion';
import { Disclaimer } from '@/components/Disclaimer';
import { LastUpdatedBadge } from '@/components/LastUpdatedBadge';
import { RelatedCalcs } from '@/components/RelatedCalcs';
import { MathDiagram } from '@/components/MathDiagram';
import { CalcIntro } from '@/components/CalcIntro';
import { QuarterlyEstimatedTaxCalculator } from './QuarterlyEstimatedTaxCalculator';
import { quarterlyEstimatedTaxContent as c } from '@/content/quarterly-estimated-tax';

export const metadata: Metadata = buildMetadata({
  slug: c.slug,
  title: c.metaTitle,
  description: c.metaDescription,
  ogImagePath: '/og/quarterly-safe-harbor.png',
});

export default function Page() {
  const url = canonical(c.slug);

  return (
    <>
      <JsonLd
        data={webApplicationSchema({
          name: c.title,
          description: c.metaDescription,
          url,
        })}
      />
      <JsonLd
        data={howToSchema({
          name: `How to use the ${c.title}`,
          description: c.metaDescription,
          steps: [...c.howToSteps],
        })}
      />
      <JsonLd data={faqSchema([...c.faqs])} />

      <ToolShell
        title={c.h1}
        lede={c.lede}
        meta={<LastUpdatedBadge taxYear={c.taxYearDefault} isoDate={c.lastUpdated} />}
        toolUi={
          <>
            <Disclaimer />
            <CalcIntro
              kicker="mathstub / quarterly estimated"
              question="What's the smallest quarterly payment that avoids the underpayment penalty?"
              ircCite="IRS safe harbor: 110% of last year's liability (for AGI above $150K) or 90% of this year's projected. Pay that, split into four installments due April / June / September / January, and you skip the §6654 penalty entirely — regardless of how much you actually owe at filing."
              irc="IRC § 6654"
            />
            <QuarterlyEstimatedTaxCalculator />
          </>
        }
        fullWidthDiagram={
          <MathDiagram
            slug="quarterly-estimated-tax"
            alt="Quarterly safe-harbor formula chain: prior-year liability L → safe harbor = 100% of L (or 110% if AGI > 150K) → quarterly = SH ÷ 4 (IRC §6654) → penalty avoided if paid each quarter"
          />
        }
        howItWorks={<ol className="list-decimal space-y-2 pl-5">
              {c.howToSteps.map((s) => (
                <li key={s.name}>
                  <strong>{s.name}.</strong> {s.text}
                </li>
              ))}
            </ol>}
        faq={<FaqAccordion items={[...c.faqs]} />}
        related={<RelatedCalcs currentSlug={c.slug} />}
        calcSlug={c.slug}
        reportIssueContext={c.slug}
      />
    </>
  );
}
