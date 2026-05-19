import { affiliates, type AffiliateOfferId } from '@/lib/affiliates';

export function AffiliateCard({ offerId }: { offerId: AffiliateOfferId }) {
  const offer = affiliates[offerId];
  const href = offer.href();
  const isPlaceholder = href === '#';

  return (
    <article className="my-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-900">
      {/*
        Inline FTC disclosure. 16 CFR Part 255 ("Endorsement Guides")
        requires that affiliate relationships are disclosed "clearly and
        conspicuously" — interpreted as visible next to each ad-style unit,
        not buried in a site-wide footer. A tiny "Sponsored" chip alone is
        not sufficient when revenue depends on the click, so we surface the
        plain-language affiliate statement right at the top of every card.
      */}
      <p className="mb-2 text-[11px] font-medium text-gray-500 dark:text-gray-400">
        Affiliate link · Mathstub earns a commission if you sign up. Your price does not change.
      </p>
      <header className="mb-1 flex items-center justify-between">
        <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100">
          {offer.brand}
        </h3>
        <span className="text-[10px] uppercase tracking-wide text-gray-400">
          Sponsored
        </span>
      </header>
      <p className="mb-1 font-medium text-gray-800 dark:text-gray-200">
        {offer.headline}
      </p>
      <p className="mb-3 text-sm text-gray-600 dark:text-gray-400">
        {offer.body}
      </p>
      <a
        href={href}
        target="_blank"
        rel="sponsored noopener noreferrer"
        aria-disabled={isPlaceholder}
        className={`inline-block rounded-md px-4 py-2 text-sm font-semibold text-white ${
          isPlaceholder
            ? 'cursor-not-allowed bg-gray-400'
            : 'bg-brand-600 hover:bg-brand-700'
        }`}
      >
        {offer.cta}
      </a>
      {offer.badge && (
        <p className="mt-2 text-[11px] text-gray-500 dark:text-gray-500">
          {offer.badge}
        </p>
      )}
    </article>
  );
}
