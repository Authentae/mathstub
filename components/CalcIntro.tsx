/**
 * CalcIntro — shared above-the-form treatment for every calculator.
 *
 * Goal: address Google AdSense's "low value content" review rejection by
 * adding the same substantive context block above each calculator that
 * the RSU calc already has — header chip + outcome-led question + IRC
 * cite + 3-card trust band. The pattern proved effective on RSU
 * shortfall and harmonizing it across all calcs gives Google's reviewer
 * (and human visitors) the same depth signal everywhere.
 *
 * Each calc page passes its own kicker / question / IRC cite — the rest
 * (trust band, "Pending CPA review" copy, no-tracking guarantees) is
 * shared so all 8 calcs read with one voice.
 */
export function CalcIntro({
  kicker,
  question,
  ircCite,
  irc,
}: {
  /** Top-of-block breadcrumb chip, e.g. "mathstub / iso amt". */
  kicker: string;
  /** Outcome-led H2 the visitor sees first, e.g. "Will exercising your ISOs trigger AMT?" */
  question: string;
  /** The lede sentence — what the calc actually does, in plain English. */
  ircCite: string;
  /** Inline IRC reference rendered next to ircCite, e.g. "IRC § 422" or "IRC § 6654". */
  irc: string;
}) {
  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-wide text-brand-700 dark:text-brand-300">
          {kicker}
        </p>
        <h2 className="text-2xl font-bold leading-tight text-gray-900 dark:text-gray-100 sm:text-3xl">
          {question}
        </h2>
        <p className="max-w-prose text-sm text-gray-600 dark:text-gray-400">
          {ircCite}{' '}
          <cite className="not-italic text-gray-500 dark:text-gray-500">({irc})</cite>
        </p>
      </header>

      <ul className="grid gap-3 rounded-lg border border-gray-200 bg-gray-50 p-4 text-xs dark:border-gray-800 dark:bg-gray-900/40 sm:grid-cols-3">
        <li className="flex items-start gap-2">
          <span aria-hidden="true" className="text-brand-700 dark:text-brand-300">✓</span>
          <span>
            <strong className="block font-semibold text-gray-900 dark:text-gray-100">No signup, ever</strong>
            <span className="text-gray-500 dark:text-gray-500">No tracking, no email required.</span>
          </span>
        </li>
        <li className="flex items-start gap-2">
          <span aria-hidden="true" className="text-brand-700 dark:text-brand-300">✓</span>
          <span>
            <strong className="block font-semibold text-gray-900 dark:text-gray-100">Math runs in your browser</strong>
            <span className="text-gray-500 dark:text-gray-500">No data leaves this page.</span>
          </span>
        </li>
        <li className="flex items-start gap-2">
          <span aria-hidden="true" className="text-brand-700 dark:text-brand-300">✓</span>
          <span>
            <strong className="block font-semibold text-gray-900 dark:text-gray-100">Every claim cites IRC § or IRS Pub</strong>
            <span className="text-gray-500 dark:text-gray-500">Pending CPA review — see footer.</span>
          </span>
        </li>
      </ul>
    </div>
  );
}
