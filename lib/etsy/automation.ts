export const MAX_LISTINGS_PER_UTC_DAY = 1;
export const MAX_LISTINGS_PER_ROLLING_WEEK = 3;
export const PUBLISH_LOCK_TTL_MS = 30 * 60 * 1000;

export interface ListingHistoryItem {
  listingId: number;
  title: string;
  state: string;
  createdAt: string;
  publishPath: string;
}

export type ListingLockState = 'pending' | 'etsy_created' | 'upload_pending' | 'uploads_partial' | 'activation_pending' | 'active' | 'completed';

export interface ListingLock {
  idempotencyKey: string;
  draftHash: string;
  startedAt: string;
  state: ListingLockState;
  listingId?: number;
  title?: string;
  uploadedFiles?: string[];
  uploadedImages?: string[];
  failedFile?: string;
  failedImage?: string;
  error?: string;
}

export interface PublishLimitResult {
  allowed: boolean;
  reason?: string;
}

export function enforcePublishLimits(history: ListingHistoryItem[], nowMs: number): PublishLimitResult {
  const valid = history
    .map((item) => ({ ...item, timestamp: Date.parse(item.createdAt) }))
    .filter((item) => Number.isFinite(item.timestamp) && item.timestamp <= nowMs);
  const utcDate = new Date(nowMs).toISOString().slice(0, 10);
  const today = valid.filter((item) => new Date(item.timestamp).toISOString().slice(0, 10) === utcDate);
  if (today.length >= MAX_LISTINGS_PER_UTC_DAY) {
    return { allowed: false, reason: 'One successful listing has already been recorded for this UTC day' };
  }
  const weekAgo = nowMs - 7 * 24 * 60 * 60 * 1000;
  const thisWeek = valid.filter((item) => item.timestamp >= weekAgo);
  if (thisWeek.length >= MAX_LISTINGS_PER_ROLLING_WEEK) {
    return { allowed: false, reason: 'The rolling seven-day listing cap has been reached' };
  }
  return { allowed: true };
}

export function isLockFresh(lock: ListingLock | null | undefined, nowMs: number): boolean {
  if (!lock) return false;
  const started = Date.parse(lock.startedAt);
  if (!Number.isFinite(started) || started > nowMs) return false;
  return nowMs - started < PUBLISH_LOCK_TTL_MS;
}


export function buildPerformanceReport<T>(listings: T[], history: ListingHistoryItem[], startMs: number, endMs: number) {
  const publications = history.filter((item) => {
    const timestamp = Date.parse(item.createdAt);
    return Number.isFinite(timestamp) && timestamp >= startMs && timestamp <= endMs;
  });
  return {
    start: new Date(startMs).toISOString(),
    end: new Date(endMs).toISOString(),
    listingCount: listings.length,
    publicationCount: publications.length,
    publications,
    listings,
  };
}
