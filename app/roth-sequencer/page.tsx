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
import { RothSequencerCalculator } from './RothSequencerCalculator';
import { rothSequencerContent as c } from '@/content/roth-sequencer';

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
              kicker="mathstub / roth sequencer"
              question="Mega-Backdoor first? Backdoor IRA first? Basis-isolate the pre-tax IRA first? Get the right sequence + total Roth capacity per year."
              ircCite="The Roth-stacking puzzle hinges on three IRC sections: §415(c) $70k cap (Mega-Backdoor room), §408(d)(2) pro-rata rule (breaks the IRA Backdoor if you have pre-tax IRA balance), and §408A Roth-IRA phaseout (Backdoor only needed above phaseout)."
              irc="IRC § 408(d)(2)"
            />
            <RothSequencerCalculator />
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
