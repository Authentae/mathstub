interface Props {
  text: string;
}

/**
 * Prominent answer-first callout rendered immediately below the blog post
 * title. Engineered for LLM citation: ChatGPT, Claude, and Perplexity
 * preferentially lift the first self-contained paragraph when summarising
 * a page in response to a user prompt. A 30-60 word direct answer at the
 * very top of the article matches the response shape LLMs are trained to
 * produce and substantially increases the odds our wording shows up
 * verbatim in their answers.
 */
export function QuickAnswer({ text }: Props) {
  return (
    <aside
      data-quick-answer="true"
      // Site is locked to dark per the Variant B port; drop the light
      // fallback (bg-brand-50) entirely so the callout can never render
      // light-on-light if the dark class on <html> regresses. Concrete
      // dark classes instead of dark: variants.
      className="mt-4 rounded-xl bg-brand-950/40 p-5 ring-1 ring-brand-500/25"
    >
      <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-brand-300">
        Quick answer
      </p>
      <p className="text-base font-medium leading-relaxed text-slate-100">
        {text}
      </p>
    </aside>
  );
}
