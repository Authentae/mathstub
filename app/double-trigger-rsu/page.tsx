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
import { DoubleTriggerRsuCalculator } from './DoubleTriggerRsuCalculator';
import { doubleTriggerRsuContent as c } from '@/content/double-trigger-rsu';

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
              kicker="mathstub / double-trigger rsu"
              question="Your startup just IPO'd. How much will the trigger-day RSU tax bomb cost you in April?"
              ircCite="Double-trigger RSUs vest on the later of service-completion + liquidity event. At trigger (IPO open or M&A close), all time-vested shares are recognised as W-2 ordinary income at FMV under IRC §83(a). Federal supplemental withholding at 22% / 37% under IRC §3402(g) — almost always falls short of marginal rate."
              irc="IRC § 83(a)"
            />
            <DoubleTriggerRsuCalculator />
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
