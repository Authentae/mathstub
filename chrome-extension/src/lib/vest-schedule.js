// Pure helpers for working with a list of vest events.
// No chrome.* / DOM imports — keeps this module unit-testable in Node.

/** @typedef {('RSU'|'ESPP'|'ISO')} VestType */
/**
 * @typedef {Object} Vest
 * @property {string} id          uuid v4 string
 * @property {string} ticker      stock ticker, uppercased
 * @property {number} shares      share count (>= 0)
 * @property {string} vestDateIso ISO YYYY-MM-DD
 * @property {VestType} type
 * @property {string} [notes]
 * @property {number} notifyDays  days before vest to notify (default 30)
 */

const MS_PER_DAY = 86_400_000;

/** ISO YYYY-MM-DD → Date at UTC midnight. Throws on invalid. */
export function parseIsoDate(s) {
  if (typeof s !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(s)) {
    throw new Error(`Invalid date: ${s}`);
  }
  const d = new Date(`${s}T00:00:00Z`);
  if (Number.isNaN(d.getTime())) throw new Error(`Invalid date: ${s}`);
  return d;
}

/** Date → "YYYY-MM-DD" (UTC). */
export function toIsoDate(d) {
  const y = d.getUTCFullYear();
  const m = String(d.getUTCMonth() + 1).padStart(2, '0');
  const day = String(d.getUTCDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

/**
 * Whole days from `now` to `vestDate`. Negative = vest is in the past.
 * Both args are Dates (or anything with .getTime()).
 */
export function daysUntil(now, vestDate) {
  const a = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());
  const b = Date.UTC(
    vestDate.getUTCFullYear(),
    vestDate.getUTCMonth(),
    vestDate.getUTCDate(),
  );
  return Math.round((b - a) / MS_PER_DAY);
}

/**
 * Sort a list of vests by date (ascending). Returns a new array.
 * @param {Vest[]} vests
 * @returns {Vest[]}
 */
export function sortByVestDate(vests) {
  return [...vests].sort((a, b) =>
    a.vestDateIso < b.vestDateIso ? -1 : a.vestDateIso > b.vestDateIso ? 1 : 0,
  );
}

/**
 * Vests strictly in the future relative to `now`, sorted ascending.
 * @param {Vest[]} vests
 * @param {Date} now
 * @returns {Vest[]}
 */
export function upcomingVests(vests, now) {
  return sortByVestDate(vests).filter((v) => {
    const d = parseIsoDate(v.vestDateIso);
    return daysUntil(now, d) >= 0;
  });
}

/**
 * Vests for which today is exactly `notifyDays` away from the vest date.
 * Used by the daily alarm handler to fire chrome.notifications.
 * @param {Vest[]} vests
 * @param {Date} now
 * @returns {Vest[]}
 */
export function vestsToNotifyToday(vests, now) {
  return vests.filter((v) => {
    const d = parseIsoDate(v.vestDateIso);
    const days = daysUntil(now, d);
    return days === (v.notifyDays ?? 30);
  });
}

/**
 * Total share count summary by ticker for the next `windowDays` days.
 * Useful for popup "next 90 days" widget.
 * @param {Vest[]} vests
 * @param {Date} now
 * @param {number} windowDays
 * @returns {Record<string, number>} ticker → total shares
 */
export function summarizeUpcomingByTicker(vests, now, windowDays) {
  const result = {};
  for (const v of vests) {
    const d = parseIsoDate(v.vestDateIso);
    const days = daysUntil(now, d);
    if (days >= 0 && days <= windowDays) {
      result[v.ticker] = (result[v.ticker] ?? 0) + v.shares;
    }
  }
  return result;
}

/** Validate a vest record. Throws Error on bad input. */
export function validateVest(v) {
  if (!v || typeof v !== 'object') throw new Error('Vest must be an object');
  if (typeof v.id !== 'string' || v.id.length === 0) {
    throw new Error('Vest.id required');
  }
  if (typeof v.ticker !== 'string' || v.ticker.length === 0) {
    throw new Error('Vest.ticker required');
  }
  if (!Number.isFinite(v.shares) || v.shares < 0) {
    throw new Error(`Vest.shares invalid: ${v.shares}`);
  }
  parseIsoDate(v.vestDateIso); // throws if bad
  if (!['RSU', 'ESPP', 'ISO'].includes(v.type)) {
    throw new Error(`Vest.type invalid: ${v.type}`);
  }
  if (
    v.notifyDays !== undefined &&
    (!Number.isInteger(v.notifyDays) || v.notifyDays < 0 || v.notifyDays > 365)
  ) {
    throw new Error(`Vest.notifyDays invalid: ${v.notifyDays}`);
  }
}

/** Generate a UUID v4 (works in service worker + popup contexts). */
export function newVestId() {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  // Fallback for older runtimes (test environments).
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
  });
}
