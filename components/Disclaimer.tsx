import Link from 'next/link';

export function Disclaimer() {
  return (
    <aside
      role="note"
      className="my-4 rounded-lg bg-red-500/10 p-4 text-sm text-red-200 ring-1 ring-red-500/30"
    >
      <strong>This is an estimate, not tax advice.</strong> Numbers are based on
      published IRS and state tax rules and your inputs. Real tax outcomes
      depend on facts not captured here (AMT, state nuances, multi-state
      residency, etc.). For decisions involving real money, consult a CPA. See
      our{' '}
      <Link href="/disclaimer" className="underline">
        full disclaimer
      </Link>
      .
    </aside>
  );
}
