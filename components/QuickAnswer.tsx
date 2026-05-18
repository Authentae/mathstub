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
      className="mt-4 rounded-lg border-l-4 border-brand-500 bg-brand-50 p-5 dark:border-brand-400 dark:bg-brand-950/40"
    >
      <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-brand-700 dark:text-brand-300">
        Quick answer
      </p>
      <p className="text-base font-medium leading-relaxed text-gray-900 dark:text-gray-100">
        {text}
      </p>
    </aside>
  );
}
