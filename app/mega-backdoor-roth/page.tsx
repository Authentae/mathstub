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
import { MegaBackdoorCalculator } from './MegaBackdoorCalculator';
import { megaBackdoorRothContent as c } from '@/content/mega-backdoor-roth';

export const metadata: Metadata = buildMetadata({
  slug: c.slug,
  title: c.metaTitle,
  description: c.metaDescription,
  ogImagePath: '/og/mega-backdoor-roth.png',
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
              kicker="mathstub / mega-backdoor"
              question="How much Roth space does your 401(k) plan actually leave you?"
              ircCite="The §415(c) overall annual contribution limit ($72,000 in 2026) is what bounds the Mega-Backdoor. Subtract elective deferral + employer match + profit-sharing and the rest is yours as after-tax → Roth — if your plan supports the conversion."
              irc="IRC § 415(c), § 402(g)"
            />
            <MegaBackdoorCalculator />
          </>
        }
        fullWidthDiagram={
          <MathDiagram
            slug="mega-backdoor-roth"
            alt="Mega-Backdoor Roth formula chain: §415 cap $70k − elective deferral $23.5k − employer match $11k = after-tax room $35.5k → in-service distribution or in-plan Roth conversion → tax-free growth"
          />
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
