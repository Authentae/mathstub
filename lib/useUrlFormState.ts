'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * Generic URL <-> form-state sync hook. Stores form state in React state but
 * mirrors it into the page URL via short query keys so any link copied from
 * the address bar reloads identical inputs. Used by the calculators to
 * power "Copy share link" / save-this-calculation flows.
 *
 * Each calculator supplies:
 *   - `defaults` — the initial FormState when no URL params are present.
 *   - `urlKeys` — a map from FormState key -> short URL key. Short keys keep
 *     shared links readable.
 *   - `parseValue` (optional) — coerce string -> typed value for fields
 *     that aren't already strings. Defaults to identity (treats every
 *     field as string). Override for booleans, enums, or numeric unions.
 *
 * Booleans are encoded as "1" / omitted. Strings round-trip directly. The
 * hook is intentionally permissive on decode — missing fields fall back
 * to the defaults rather than erroring.
 */
export interface UseUrlFormStateOptions<T extends Record<string, unknown>> {
  defaults: T;
  urlKeys: { [K in keyof T]: string };
  /** Optional per-field coercion when decoding from URL. */
  parseValue?: <K extends keyof T>(key: K, raw: string, defaultValue: T[K]) => T[K];
}

export function useUrlFormState<T extends Record<string, unknown>>(
  options: UseUrlFormStateOptions<T>,
): [T, (next: Partial<T> | ((prev: T) => T)) => void, () => string] {
  const { defaults, urlKeys, parseValue } = options;
  const [state, setState] = useState<T>(defaults);
  const hydratedRef = useRef(false);

  const encode = useCallback(
    (value: T): string => {
      const params = new URLSearchParams();
      for (const key in urlKeys) {
        const v = value[key];
        const urlKey = urlKeys[key];
        if (typeof v === 'boolean') {
          if (v) params.set(urlKey, '1');
        } else if (v === '' || v === undefined || v === null) {
          // Skip empty optionals so the URL stays short.
        } else {
          params.set(urlKey, String(v));
        }
      }
      return params.toString();
    },
    [urlKeys],
  );

  const decode = useCallback(
    (search: string): T => {
      const params = new URLSearchParams(search);
      const next: T = { ...defaults };
      for (const key in urlKeys) {
        const urlKey = urlKeys[key];
        const raw = params.get(urlKey);
        if (raw === null) continue;
        const defaultValue = defaults[key];
        if (typeof defaultValue === 'boolean') {
          (next as Record<string, unknown>)[key] = raw === '1';
        } else if (parseValue) {
          (next as Record<string, unknown>)[key] = parseValue(key, raw, defaultValue);
        } else {
          (next as Record<string, unknown>)[key] = raw;
        }
      }
      return next;
    },
    [defaults, urlKeys, parseValue],
  );

  // Hydrate from URL on mount. Skipped during SSR — useEffect only runs on
  // the client.
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.location.search.length > 1) {
      setState(decode(window.location.search));
    }
    hydratedRef.current = true;
  }, [decode]);

  // Mirror state -> URL via replaceState. Avoids history pollution and
  // doesn't trigger Next.js navigation events.
  useEffect(() => {
    if (!hydratedRef.current || typeof window === 'undefined') return;
    const query = encode(state);
    if (window.location.search.slice(1) !== query) {
      const newUrl = query
        ? `${window.location.pathname}?${query}`
        : window.location.pathname;
      window.history.replaceState(null, '', newUrl);
    }
  }, [state, encode]);

  const update = useCallback((next: Partial<T> | ((prev: T) => T)) => {
    if (typeof next === 'function') {
      setState(next);
    } else {
      setState((prev) => ({ ...prev, ...next }));
    }
  }, []);

  const getShareUrl = useCallback((): string => {
    if (typeof window === 'undefined') return '';
    const query = encode(state);
    return query
      ? `${window.location.origin}${window.location.pathname}?${query}`
      : `${window.location.origin}${window.location.pathname}`;
  }, [state, encode]);

  return [state, update, getShareUrl];
}
