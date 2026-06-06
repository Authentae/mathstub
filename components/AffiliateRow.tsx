import { AffiliateCard } from './AffiliateCard';
import type { AffiliateOfferId } from '@/lib/affiliates';

interface Props {
  offerIds: AffiliateOfferId[];
  /** Heading text — defaults to "Recommended next steps". */
  heading?: string;
  /** Max cards to render (defaults to all). */
  max?: number;
}

/**
 * Consistent grid layout for one or more AffiliateCards. Use anywhere we want
 * the same look across calculators and blog posts.
 */
export function AffiliateRow({
  offerIds,
  heading = 'Recommended next steps',
  max,
}: Props) {
  const ids = max ? offerIds.slice(0, max) : offerIds;
  if (ids.length === 0) return null;

  return (
    <section>
      <p className="mb-2 text-xs uppercase tracking-wide text-slate-500">{heading}</p>
      <div className="grid gap-3 md:grid-cols-2">
        {ids.map((id) => (
          <AffiliateCard key={id} offerId={id} />
        ))}
      </div>
    </section>
  );
}
