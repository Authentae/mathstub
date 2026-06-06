interface Props {
  taxYear: number;
  isoDate: string; // YYYY-MM-DD
}

export function LastUpdatedBadge({ taxYear, isoDate }: Props) {
  const formatted = new Date(`${isoDate}T00:00:00Z`).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  });
  return (
    <p className="text-xs text-slate-500 dark:text-slate-400">
      Tax year {taxYear} · Last updated {formatted}
    </p>
  );
}
