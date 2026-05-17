import { env } from '@/lib/env';

interface Props {
  /** Page slug or label to include in the prefilled subject line. */
  context?: string;
}

/**
 * Small "found a bug / have feedback" mailto link rendered on every calc page.
 * Lets early users surface miscalculations, edge cases, or UX confusion that
 * unit tests cannot catch.
 */
export function ReportIssue({ context }: Props) {
  const email = env.contact.issueEmail();
  const subject = encodeURIComponent(
    context ? `Mathstub feedback — ${context}` : 'Mathstub feedback',
  );
  const body = encodeURIComponent(
    'What were you trying to calculate? What did you expect vs. what you saw?\n\n',
  );
  const href = `mailto:${email}?subject=${subject}&body=${body}`;

  return (
    <p className="mt-8 border-t border-dashed border-gray-200 pt-4 text-center text-xs text-gray-500 dark:border-gray-800 dark:text-gray-400">
      Spotted a bug, edge case, or numbers that look off?{' '}
      <a
        href={href}
        className="font-semibold text-brand-700 hover:underline dark:text-brand-300"
      >
        Tell us
      </a>{' '}
      — we read every report.
    </p>
  );
}
