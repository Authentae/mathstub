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
import { BackdoorRothCalculator } from './BackdoorRothCalculator';
import { backdoorRothIraContent as c } from '@/content/backdoor-roth-ira';

export const metadata: Metadata = buildMetadata({
  slug: c.slug,
  title: c.metaTitle,
  description: c.metaDescription,
  ogImagePath: '/og/backdoor-roth-ira.png',
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
              kicker="mathstub / backdoor roth"
              question="Can you do the Backdoor Roth — and what's the pro-rata tax?"
              ircCite="The Backdoor flow: non-deductible Trad IRA contribution → Roth conversion. The catch: IRC §408(d)(2) pro-rata rule treats all your Trad IRAs as one pool. A pre-existing pre-tax IRA balance taxes the conversion proportionally."
              irc="IRC § 408A, § 408(d)(2)"
            />
            <BackdoorRothCalculator />
          </>
        }
        fullWidthDiagram={
          <MathDiagram
            slug="backdoor-roth-ira"
            alt="Backdoor Roth IRA formula chain: non-deductible Trad IRA $7,000 → convert → pro-rata = pre-tax balance ÷ (pre-tax + after-tax) → tax owed on taxable %"
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
