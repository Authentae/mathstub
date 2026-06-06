interface FaqItem {
  q: string;
  a: string;
}

export function FaqAccordion({ items }: { items: FaqItem[] }) {
  return (
    <div className="space-y-2">
      {items.map((item, i) => (
        <details
          key={i}
          className="group rounded-md border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900"
        >
          {/*
            The webkit details marker is hidden — replaced with a visible
            CSS-rotated arrow so sighted users still see an open/closed
            indicator. Screen readers announce the open/closed state via
            the native <details> semantics regardless.

            focus-visible ring on the <summary> so keyboard users can see
            when the question is focused (Tab/arrow-key navigation).
          */}
          <summary className="flex cursor-pointer items-start gap-2 rounded font-semibold text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2 dark:text-slate-100 dark:focus-visible:ring-offset-slate-900 [&::-webkit-details-marker]:hidden">
            <span
              aria-hidden="true"
              className="mt-1 inline-block h-3 w-3 flex-shrink-0 rotate-0 text-slate-500 transition-transform group-open:rotate-90"
            >
              ▶
            </span>
            <span>{item.q}</span>
          </summary>
          <p className="mt-2 text-slate-700 dark:text-slate-300">{item.a}</p>
        </details>
      ))}
    </div>
  );
}
