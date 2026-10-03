import { describe, expect, it } from 'vitest';
import { enforcePublishLimits, isLockFresh, ListingHistoryItem, ListingLock, MAX_LISTINGS_PER_ROLLING_WEEK, MAX_LISTINGS_PER_UTC_DAY, PUBLISH_LOCK_TTL_MS } from '../../lib/etsy/automation';

function item(createdAt: string, listingId = 1): ListingHistoryItem {
  return { listingId, title: `Listing ${listingId}`, state: 'active', createdAt, publishPath: 'test' };
}

describe('Etsy automation publication limits', () => {
  it('allows one listing on an unused UTC day', () => {
    const now = Date.parse('2025-01-15T12:00:00.000Z');
    expect(enforcePublishLimits([], now)).toEqual({ allowed: true });
  });

  it('blocks a second successful listing on the same UTC day', () => {
    const now = Date.parse('2025-01-15T12:00:00.000Z');
    expect(enforcePublishLimits([item('2025-01-15T01:00:00.000Z')], now)).toMatchObject({ allowed: false, reason: expect.stringContaining('UTC day') });
  });

  it('blocks a fourth listing in the rolling seven-day window even on a new day', () => {
    const now = Date.parse('2025-01-15T12:00:00.000Z');
    const history = [item('2025-01-09T12:00:00.000Z', 1), item('2025-01-11T12:00:00.000Z', 2), item('2025-01-13T12:00:00.000Z', 3)];
    expect(enforcePublishLimits(history, now)).toMatchObject({ allowed: false, reason: expect.stringContaining('rolling seven-day') });
  });

  it('allows a listing after entries age out of the rolling window', () => {
    const now = Date.parse('2025-01-15T12:00:00.000Z');
    expect(enforcePublishLimits([item('2025-01-08T11:59:59.999Z')], now)).toEqual({ allowed: true });
  });

  it('ignores invalid and future history records', () => {
    const now = Date.parse('2025-01-15T12:00:00.000Z');
    const history = [item('not-a-date'), item('2025-01-16T00:00:00.000Z')];
    expect(enforcePublishLimits(history, now)).toEqual({ allowed: true });
  });

  it('treats a live publication lock as fresh only within its TTL', () => {
    const now = Date.parse('2025-01-15T12:00:00.000Z');
    const lock: ListingLock = { idempotencyKey: 'key', draftHash: 'hash', startedAt: new Date(now - 1000).toISOString(), state: 'pending' };
    expect(isLockFresh(lock, now)).toBe(true);
    expect(isLockFresh({ ...lock, startedAt: new Date(now - PUBLISH_LOCK_TTL_MS).toISOString() }, now)).toBe(false);
    expect(isLockFresh({ ...lock, startedAt: new Date(now + 1000).toISOString() }, now)).toBe(false);
    expect(isLockFresh(null, now)).toBe(false);
  });
});
