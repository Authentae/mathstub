import { describe, it, expect } from 'vitest';
import {
  stateStockCompProfiles,
  findStateProfile,
  listStateProfileCodes,
  type StateStockCompProfile,
} from '@tax/state-stock-comp';

describe('stateStockCompProfiles — data integrity', () => {
  it('covers all 50 states plus DC (51 entries)', () => {
    expect(stateStockCompProfiles).toHaveLength(51);
  });

  it('has unique state codes (no duplicates)', () => {
    const codes = stateStockCompProfiles.map((s) => s.code);
    const unique = new Set(codes);
    expect(unique.size).toBe(codes.length);
  });

  it('has all uppercase 2-letter codes (DC is the only 2-char exception)', () => {
    for (const profile of stateStockCompProfiles) {
      expect(profile.code).toMatch(/^[A-Z]{2}$/);
    }
  });

  it('every state has a non-empty name', () => {
    for (const profile of stateStockCompProfiles) {
      expect(profile.name.length).toBeGreaterThan(2);
    }
  });

  it('every state has a revenue dept URL using https', () => {
    for (const profile of stateStockCompProfiles) {
      expect(profile.revenueDeptUrl).toMatch(/^https:\/\//);
    }
  });

  it('every state has a non-empty revenue dept label', () => {
    for (const profile of stateStockCompProfiles) {
      expect(profile.revenueDeptLabel.length).toBeGreaterThan(5);
    }
  });

  it('top marginal rates are bounded in [0, 0.20]', () => {
    for (const profile of stateStockCompProfiles) {
      expect(profile.topMarginalRate).toBeGreaterThanOrEqual(0);
      // No US state has an individual rate above 13.3% in 2025 (CA).
      // Allow a wider 0.20 ceiling for future-proofing.
      expect(profile.topMarginalRate).toBeLessThan(0.2);
    }
  });

  it('supplemental rates (when set) are bounded in [0, 0.20]', () => {
    for (const profile of stateStockCompProfiles) {
      if (profile.supplementalRate !== null) {
        expect(profile.supplementalRate).toBeGreaterThanOrEqual(0);
        expect(profile.supplementalRate).toBeLessThan(0.2);
      }
    }
  });
});

describe('stateStockCompProfiles — no-tax state consistency', () => {
  // The 9 traditional no-income-tax states: AK, FL, NV, NH, SD, TN, TX, WA, WY.
  // (NH technically taxes interest+dividends but no broad personal income tax.)
  const NO_TAX_STATES = ['AK', 'FL', 'NV', 'NH', 'SD', 'TN', 'TX', 'WA', 'WY'];

  it.each(NO_TAX_STATES)('%s has topMarginalRate=0', (code) => {
    const profile = findStateProfile(code);
    expect(profile).toBeDefined();
    expect(profile!.topMarginalRate).toBe(0);
  });

  it.each(NO_TAX_STATES)(
    '%s has supplementalRate=0 (not null — explicit zero is the right model for no-tax states)',
    (code) => {
      const profile = findStateProfile(code);
      expect(profile!.supplementalRate).toBe(0);
    },
  );

  it.each(NO_TAX_STATES)('%s has hasPersonalAmt=false', (code) => {
    const profile = findStateProfile(code);
    expect(profile!.hasPersonalAmt).toBe(false);
  });

  it.each(NO_TAX_STATES)('%s has notes field set (NO_TAX_NOTE or equivalent)', (code) => {
    const profile = findStateProfile(code);
    expect(profile!.notes).toBeDefined();
    expect(profile!.notes!.length).toBeGreaterThan(0);
  });
});

describe('stateStockCompProfiles — spot checks on high-impact states', () => {
  it('California has 12.3% top marginal + 10.23% supplemental + personal AMT', () => {
    const ca = findStateProfile('CA');
    expect(ca).toBeDefined();
    expect(ca!.topMarginalRate).toBeCloseTo(0.123, 3);
    expect(ca!.supplementalRate).toBeCloseTo(0.1023, 4);
    expect(ca!.hasPersonalAmt).toBe(true);
    expect(ca!.taxesLtcgAsOrdinary).toBe(true);
  });

  it('New York has 10.9% top marginal + 10.23% supplemental (no personal AMT)', () => {
    const ny = findStateProfile('NY');
    expect(ny).toBeDefined();
    expect(ny!.topMarginalRate).toBeCloseTo(0.109, 3);
    expect(ny!.supplementalRate).toBeCloseTo(0.1023, 4);
    expect(ny!.hasPersonalAmt).toBe(false);
    expect(ny!.notes).toContain('11.7%');
    expect(ny!.notes).toContain('NYC');
  });

  it('Texas has zero state tax', () => {
    const tx = findStateProfile('TX');
    expect(tx!.topMarginalRate).toBe(0);
    expect(tx!.supplementalRate).toBe(0);
  });

  it('Minnesota retains a personal AMT', () => {
    const mn = findStateProfile('MN');
    expect(mn!.hasPersonalAmt).toBe(true);
    expect(mn!.notes).toContain('AMT');
  });

  it('Washington has no broad income tax but has a capital-gains excise tax note', () => {
    const wa = findStateProfile('WA');
    expect(wa!.topMarginalRate).toBe(0);
    // The notes mention the 7% capital-gains excise tax — important for RSU sellers.
    expect(wa!.notes).toContain('capital-gains excise');
  });

  it('Pennsylvania has a flat rate and ESPP caveat', () => {
    const pa = findStateProfile('PA');
    expect(pa!.topMarginalRate).toBeCloseTo(0.0307, 4);
    expect(pa!.notes).toContain('ESPP');
  });

  it('Massachusetts has 9% top rate including the $1M surtax', () => {
    const ma = findStateProfile('MA');
    expect(ma!.topMarginalRate).toBeCloseTo(0.09, 3);
    expect(ma!.notes).toContain('surtax');
  });
});

describe('stateStockCompProfiles — preferential LTCG states', () => {
  // States that do NOT tax LTCG as ordinary (have some preferential treatment).
  const PREFERENTIAL_LTCG_STATES = ['AR', 'MT', 'ND', 'SC', 'WI'];

  it.each(PREFERENTIAL_LTCG_STATES)('%s has taxesLtcgAsOrdinary=false', (code) => {
    const profile = findStateProfile(code);
    expect(profile!.taxesLtcgAsOrdinary).toBe(false);
  });

  it.each(PREFERENTIAL_LTCG_STATES)('%s has a notes field explaining the preference', (code) => {
    const profile = findStateProfile(code);
    expect(profile!.notes).toBeDefined();
    // Should mention capital-gain or LTCG explicitly.
    expect(profile!.notes!).toMatch(/capital[- ]gain|LTCG|exclusion|deduction/i);
  });
});

describe('findStateProfile', () => {
  it('returns the profile for a valid uppercase code', () => {
    const ca = findStateProfile('CA');
    expect(ca).toBeDefined();
    expect(ca!.name).toBe('California');
  });

  it('returns the profile for a valid lowercase code (case-insensitive)', () => {
    const ca = findStateProfile('ca');
    expect(ca).toBeDefined();
    expect(ca!.code).toBe('CA');
  });

  it('returns the profile for a mixed-case code', () => {
    const ca = findStateProfile('Ca');
    expect(ca).toBeDefined();
    expect(ca!.code).toBe('CA');
  });

  it('returns undefined for an unknown code', () => {
    expect(findStateProfile('ZZ')).toBeUndefined();
  });

  it('returns undefined for an empty string', () => {
    expect(findStateProfile('')).toBeUndefined();
  });

  it('returns DC profile correctly', () => {
    const dc = findStateProfile('DC');
    expect(dc).toBeDefined();
    expect(dc!.name).toBe('District of Columbia');
  });
});

describe('listStateProfileCodes', () => {
  it('returns 51 codes (50 states + DC)', () => {
    expect(listStateProfileCodes()).toHaveLength(51);
  });

  it('returns codes in the same order as stateStockCompProfiles', () => {
    const codes = listStateProfileCodes();
    for (let i = 0; i < codes.length; i++) {
      expect(codes[i]).toBe(stateStockCompProfiles[i]!.code);
    }
  });

  it('returns a fresh array on each call (does not return a shared reference)', () => {
    const a = listStateProfileCodes();
    const b = listStateProfileCodes();
    expect(a).toEqual(b);
    // Mutating one should not affect the other.
    a.push('XX');
    expect(b).not.toContain('XX');
  });
});

describe('stateStockCompProfiles — TypeScript exhaustiveness', () => {
  it('every profile satisfies the StateStockCompProfile interface', () => {
    for (const profile of stateStockCompProfiles) {
      // Spread the assertion across each required field.
      const _typed: StateStockCompProfile = profile;
      expect(typeof _typed.code).toBe('string');
      expect(typeof _typed.name).toBe('string');
      expect(typeof _typed.topMarginalRate).toBe('number');
      expect(typeof _typed.hasPersonalAmt).toBe('boolean');
      expect(typeof _typed.taxesLtcgAsOrdinary).toBe('boolean');
      expect(typeof _typed.revenueDeptUrl).toBe('string');
      expect(typeof _typed.revenueDeptLabel).toBe('string');
    }
  });
});
