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
import { BonusShortfallCalculator } from './BonusShortfallCalculator';
import { bonusTaxShortfallContent as c } from '@/content/bonus-tax-shortfall';

export const metadata: Metadata = buildMetadata({
  slug: c.slug,
  title: c.metaTitle,
  description: c.metaDescription,
  ogImagePath: '/og/bonus-shortfall.png',
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
              kicker="mathstub / bonus shortfall"
              question="How much more do you owe on your bonus after April?"
              ircCite="Cash bonuses are withheld at the 22% federal supplemental flat rate. For high earners in the 32–37% bracket, that withholding leaves a five-figure gap the IRS expects you to true up at filing — or earlier via quarterly estimates."
              irc="IRC § 3402(g)(1)"
            />
            <BonusShortfallCalculator />
          </>
        }
        howItWorks={
          <>
            <MathDiagram
              slug="bonus-tax-shortfall"
              alt="Bonus shortfall formula chain: cash bonus B → supplemental withheld 22%·B (IRC §3402(g)(1)) → real marginal rate r → real federal owed r·B → shortfall = (r − 22%) · B"
            />
            <ol className="list-decimal space-y-2 pl-5">
              {c.howToSteps.map((s) => (
                <li key={s.name}>
                  <strong>{s.name}.</strong> {s.text}
                </li>
              ))}
            </ol>
          </>
        }
        faq={<FaqAccordion items={[...c.faqs]} />}
        related={<RelatedCalcs currentSlug={c.slug} />}
        calcSlug={c.slug}
        reportIssueContext={c.slug}
      />
    </>
  );
}
