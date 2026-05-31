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
import { CalcIntro } from '@/components/CalcIntro';
import { Ca540NrCalculator } from './Ca540NrCalculator';
import { ca540NrContent as c } from '@/content/ca-540nr';

export const metadata: Metadata = buildMetadata({
  slug: c.slug,
  title: c.metaTitle,
  description: c.metaDescription,
});

export default function Page() {
  const url = canonical(c.slug);

  return (
    <>
      <JsonLd data={webApplicationSchema({ name: c.title, description: c.metaDescription, url })} />
      <JsonLd data={howToSchema({ name: `How to use the ${c.title}`, description: c.metaDescription, steps: [...c.howToSteps] })} />
      <JsonLd data={faqSchema([...c.faqs])} />

      <ToolShell
        title={c.h1}
        lede={c.lede}
        meta={<LastUpdatedBadge taxYear={c.taxYearDefault} isoDate={c.lastUpdated} />}
        toolUi={
          <>
            <Disclaimer />
            <CalcIntro
              kicker="mathstub / form 540nr"
              question="How much California tax do you owe on equity vests after a CAโ’TX move? Vest-by-vest math under FTB Pub 1004."
              ircCite="CA Franchise Tax Board Pub 1004 + CA Revenue and Taxation Code ยง17951 source equity comp income to where services were performed during the vesting period โ€” not where the holder lives at vest. CA still claims its proportional share of every post-move vest."
              irc="CA RTC ยง 17951"
            />
            <Ca540NrCalculator />
          </>
        }
        howItWorks={
          <ol className="list-decimal space-y-2 pl-5">
            {c.howToSteps.map((s) => (
              <li key={s.name}>
                <strong>{s.name}.</strong> {s.text}
              </li>
            ))}
          </ol>
        }
        faq={<FaqAccordion items={[...c.faqs]} />}
        related={<RelatedCalcs currentSlug={c.slug} />}
        calcSlug={c.slug}
        reportIssueContext={c.slug}
      />
    </>
  );
}
