export const ETSY_WEEKLY_LISTING_LIMIT = 3;
export const ETSY_DAILY_LISTING_LIMIT = 1;
export const ETSY_DAILY_AD_BUDGET_USD = 5;

export type ListingHistoryItem = {
  createdAt: string;
  idempotencyKey: string;
  listingId: string;
};

export type PublishDecision =
  | { allowed: true; dayCount: number; weekCount: number }
  | {
      allowed: false;
      reason: 'daily_limit' | 'weekly_limit' | 'duplicate';
      dayCount: number;
      weekCount: number;
    };

/** Count successful publishes in the current UTC Monday-to-Monday week. */
export function utcWeekStart(now = new Date()): Date {
  const start = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
  const daysSinceMonday = (start.getUTCDay() + 6) % 7;
  start.setUTCDate(start.getUTCDate() - daysSinceMonday);
  return start;
}

export function checkPublishAllowed(
  history: ListingHistoryItem[],
  idempotencyKey: string,
  now = new Date(),
): PublishDecision {
  const currentWeekStart = utcWeekStart(now).getTime();
  const todayStart = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());
  const thisWeek = history.filter((item) => {
    const created = Date.parse(item.createdAt);
    return Number.isFinite(created) && created >= currentWeekStart && created <= now.getTime();
  });
  const today = thisWeek.filter((item) => Date.parse(item.createdAt) >= todayStart);

  if (thisWeek.some((item) => item.idempotencyKey === idempotencyKey)) {
    return { allowed: false, reason: 'duplicate', dayCount: today.length, weekCount: thisWeek.length };
  }
  if (today.length >= ETSY_DAILY_LISTING_LIMIT) {
    return { allowed: false, reason: 'daily_limit', dayCount: today.length, weekCount: thisWeek.length };
  }
  if (thisWeek.length >= ETSY_WEEKLY_LISTING_LIMIT) {
    return { allowed: false, reason: 'weekly_limit', dayCount: today.length, weekCount: thisWeek.length };
  }
  return { allowed: true, dayCount: today.length, weekCount: thisWeek.length };
}

/** Fail closed when current ad spend is unknown or already at the cap. */
export function remainingDailyAdBudget(spendUsd: number | null): number {
  if (spendUsd === null || !Number.isFinite(spendUsd) || spendUsd < 0) return 0;
  return Math.max(0, ETSY_DAILY_AD_BUDGET_USD - spendUsd);
}

export function buildPerformanceReport<T>(
  rows: T[],
  period: 'daily' | 'weekly' | 'monthly',
  generatedAt = new Date(),
) {
  return {
    period,
    generatedAt: generatedAt.toISOString(),
    metricAvailability: 'source-dependent',
    itemCount: rows.length,
    listings: rows,
  };
}
