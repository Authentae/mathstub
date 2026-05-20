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
import { IsoAmtCalculator } from './IsoAmtCalculator';
import { isoAmtContent as c } from '@/content/iso-amt';

export const metadata: Metadata = buildMetadata({
  slug: c.slug,
  title: c.metaTitle,
  description: c.metaDescription,
  ogImagePath: '/og/iso-amt.png',
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
              kicker="mathstub / iso amt"
              question="Will exercising your ISOs trigger AMT?"
              ircCite="ISO exercises add the bargain element to your AMTI. If your tentative Alternative Minimum Tax exceeds your regular tax, you pay the AMT instead — and carry the difference as a credit to future years."
              irc="IRC § 56(b)(3) · § 55"
            />
            <IsoAmtCalculator />
          </>
        }
        fullWidthDiagram={<MathDiagram
              slug="iso-amt"
              alt="ISO/AMT formula chain: bargain element (IRC §422) → add to AMTI (IRC §56(b)(3)) → AMT exemption (IRC §55(d)) → AMT tentative tax 26%/28% → AMT owed = max(AMT, regular)"
            />}
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
