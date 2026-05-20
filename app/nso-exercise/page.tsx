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
import { NsoExerciseCalculator } from './NsoExerciseCalculator';
import { nsoExerciseContent as c } from '@/content/nso-exercise';

export const metadata: Metadata = buildMetadata({
  slug: c.slug,
  title: c.metaTitle,
  description: c.metaDescription,
  ogImagePath: '/og/nso-exercise.png',
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
              kicker="mathstub / nso exercise"
              question="How much tax do you owe when you exercise NSOs?"
              ircCite="The bargain element (FMV minus strike, times shares) is ordinary W-2 income at exercise — federal marginal + FICA + state. Your employer withholds at the 22% supplemental flat rate, which rarely matches a high earner's real bracket."
              irc="IRC § 83(a) · § 3402(g)"
            />
            <NsoExerciseCalculator />
          </>
        }
        howItWorks={
          <>
            <MathDiagram
              slug="nso-exercise"
              alt="NSO exercise formula chain: bargain element = (FMV − strike) · shares → ordinary income (IRC §83(a)) → FICA 7.65% (IRC §3101) → withheld 22% supplemental → shortfall = real marginal − 22%"
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
