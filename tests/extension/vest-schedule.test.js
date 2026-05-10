import { describe, it, expect } from 'vitest';
import {
  daysUntil,
  parseIsoDate,
  toIsoDate,
  sortByVestDate,
  upcomingVests,
  vestsToNotifyToday,
  summarizeUpcomingByTicker,
  validateVest,
  newVestId,
} from '../../chrome-extension/src/lib/vest-schedule.js';

const todayUtc = (iso) => parseIsoDate(iso);

describe('parseIsoDate / toIsoDate roundtrip', () => {
  it('round-trips a date', () => {
    const d = parseIsoDate('2026-09-15');
    expect(toIsoDate(d)).toBe('2026-09-15');
  });
  it('throws on malformed string', () => {
    expect(() => parseIsoDate('2026/09/15')).toThrow();
    expect(() => parseIsoDate('not-a-date')).toThrow();
    expect(() => parseIsoDate('')).toThrow();
  });
});

describe('daysUntil', () => {
  it('zero on same day', () => {
    expect(daysUntil(todayUtc('2026-09-15'), todayUtc('2026-09-15'))).toBe(0);
  });
  it('positive when vest is in future', () => {
    expect(daysUntil(todayUtc('2026-09-15'), todayUtc('2026-10-15'))).toBe(30);
  });
  it('negative when vest is past', () => {
    expect(daysUntil(todayUtc('2026-09-15'), todayUtc('2026-09-14'))).toBe(-1);
  });
  it('handles year boundary', () => {
    expect(daysUntil(todayUtc('2026-12-31'), todayUtc('2027-01-01'))).toBe(1);
  });
  it('handles long ranges', () => {
    expect(daysUntil(todayUtc('2026-01-01'), todayUtc('2027-01-01'))).toBe(365);
  });
});

describe('sortByVestDate', () => {
  it('returns ascending by date', () => {
    const vests = [
      { id: '1', ticker: 'A', shares: 1, vestDateIso: '2026-12-01', type: 'RSU', notifyDays: 30 },
      { id: '2', ticker: 'A', shares: 1, vestDateIso: '2026-06-01', type: 'RSU', notifyDays: 30 },
      { id: '3', ticker: 'A', shares: 1, vestDateIso: '2026-09-01', type: 'RSU', notifyDays: 30 },
    ];
    const sorted = sortByVestDate(vests);
    expect(sorted.map((v) => v.id)).toEqual(['2', '3', '1']);
  });
  it('does not mutate input', () => {
    const vests = [
      { id: '1', ticker: 'A', shares: 1, vestDateIso: '2026-12-01', type: 'RSU', notifyDays: 30 },
      { id: '2', ticker: 'A', shares: 1, vestDateIso: '2026-06-01', type: 'RSU', notifyDays: 30 },
    ];
    sortByVestDate(vests);
    expect(vests[0].id).toBe('1');
  });
});

describe('upcomingVests', () => {
  const vests = [
    { id: '1', ticker: 'A', shares: 1, vestDateIso: '2026-01-01', type: 'RSU', notifyDays: 30 },
    { id: '2', ticker: 'A', shares: 1, vestDateIso: '2026-09-15', type: 'RSU', notifyDays: 30 },
    { id: '3', ticker: 'A', shares: 1, vestDateIso: '2026-12-01', type: 'RSU', notifyDays: 30 },
  ];
  it('keeps only future and today', () => {
    const out = upcomingVests(vests, todayUtc('2026-09-15'));
    expect(out.map((v) => v.id)).toEqual(['2', '3']);
  });
  it('returns empty when all past', () => {
    expect(upcomingVests(vests, todayUtc('2027-01-01'))).toEqual([]);
  });
  it('returns all when all future', () => {
    expect(upcomingVests(vests, todayUtc('2025-01-01'))).toHaveLength(3);
  });
});

describe('vestsToNotifyToday', () => {
  const vests = [
    { id: '30day', ticker: 'A', shares: 1, vestDateIso: '2026-10-15', type: 'RSU', notifyDays: 30 },
    { id: '7day', ticker: 'A', shares: 1, vestDateIso: '2026-09-22', type: 'RSU', notifyDays: 7 },
    { id: '60day', ticker: 'A', shares: 1, vestDateIso: '2026-11-14', type: 'RSU', notifyDays: 60 },
    { id: 'past', ticker: 'A', shares: 1, vestDateIso: '2026-09-01', type: 'RSU', notifyDays: 30 },
  ];
  it('matches when notifyDays === days-until exactly', () => {
    const out = vestsToNotifyToday(vests, todayUtc('2026-09-15'));
    // 30 days from 09-15 → 10-15 (matches 30day); 7 days → 09-22 (matches 7day); 60 → 11-14 (60day)
    expect(out.map((v) => v.id).sort()).toEqual(['30day', '60day', '7day']);
  });
  it('returns empty when no exact match', () => {
    expect(vestsToNotifyToday(vests, todayUtc('2026-09-16'))).toEqual([]);
  });
  it('does not fire for past vests', () => {
    // Pick a "now" that is AFTER the past vest. daysUntil → negative,
    // never equals notifyDays (which is non-negative).
    const out = vestsToNotifyToday(vests, todayUtc('2026-09-30'));
    expect(out.find((v) => v.id === 'past')).toBeUndefined();
  });
  it('defaults to 30-day notify when notifyDays absent', () => {
    const v = { id: 'x', ticker: 'A', shares: 1, vestDateIso: '2026-10-15', type: 'RSU' };
    const out = vestsToNotifyToday([v], todayUtc('2026-09-15'));
    expect(out).toHaveLength(1);
  });
});

describe('summarizeUpcomingByTicker', () => {
  const vests = [
    { id: '1', ticker: 'GOOGL', shares: 100, vestDateIso: '2026-10-01', type: 'RSU', notifyDays: 30 },
    { id: '2', ticker: 'GOOGL', shares: 50, vestDateIso: '2026-11-01', type: 'RSU', notifyDays: 30 },
    { id: '3', ticker: 'NVDA', shares: 25, vestDateIso: '2026-10-15', type: 'RSU', notifyDays: 30 },
    { id: '4', ticker: 'GOOGL', shares: 200, vestDateIso: '2027-03-01', type: 'RSU', notifyDays: 30 }, // outside window
  ];
  it('aggregates shares per ticker within window', () => {
    const r = summarizeUpcomingByTicker(vests, todayUtc('2026-09-15'), 90);
    expect(r).toEqual({ GOOGL: 150, NVDA: 25 });
  });
  it('excludes past vests', () => {
    const r = summarizeUpcomingByTicker(vests, todayUtc('2026-12-31'), 90);
    expect(r).toEqual({ GOOGL: 200 });
  });
  it('respects window boundary', () => {
    // 2026-10-01 is exactly 16 days out from 2026-09-15. Window 15 → excluded.
    const r = summarizeUpcomingByTicker(vests, todayUtc('2026-09-15'), 15);
    expect(r).toEqual({});
  });
});

describe('validateVest', () => {
  const valid = {
    id: 'abc',
    ticker: 'GOOGL',
    shares: 100,
    vestDateIso: '2026-10-01',
    type: 'RSU',
    notifyDays: 30,
  };
  it('passes valid', () => {
    expect(() => validateVest(valid)).not.toThrow();
  });
  it('throws on missing id', () => {
    expect(() => validateVest({ ...valid, id: '' })).toThrow();
  });
  it('throws on missing ticker', () => {
    expect(() => validateVest({ ...valid, ticker: '' })).toThrow();
  });
  it('throws on negative shares', () => {
    expect(() => validateVest({ ...valid, shares: -1 })).toThrow();
  });
  it('throws on bad date', () => {
    expect(() => validateVest({ ...valid, vestDateIso: 'tomorrow' })).toThrow();
  });
  it('throws on bad type', () => {
    expect(() => validateVest({ ...valid, type: 'NSO' })).toThrow();
  });
  it('throws on negative notifyDays', () => {
    expect(() => validateVest({ ...valid, notifyDays: -1 })).toThrow();
  });
  it('throws on >365 notifyDays', () => {
    expect(() => validateVest({ ...valid, notifyDays: 400 })).toThrow();
  });
  it('allows undefined notifyDays', () => {
    const { notifyDays: _omit, ...rest } = valid;
    void _omit;
    expect(() => validateVest(rest)).not.toThrow();
  });
});

describe('newVestId', () => {
  it('returns a uuid-shaped string', () => {
    const id = newVestId();
    expect(id).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/);
  });
  it('returns unique values', () => {
    const ids = new Set();
    for (let i = 0; i < 100; i++) ids.add(newVestId());
    expect(ids.size).toBe(100);
  });
});
