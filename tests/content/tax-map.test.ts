import { describe, it, expect } from 'vitest';
import { TAX_MAP_STAGES, resolveTaxMap } from '@/lib/tax-map';
import { liveTools, tools } from '@/lib/tools';

const liveSlugs = new Set(liveTools().map((t) => t.slug));
const allSlugs = new Set(tools.map((t) => t.slug));

describe('tax-map — stage integrity', () => {
  it('every referenced calc slug exists in lib/tools', () => {
    const invalid: Array<{ stage: string; slug: string }> = [];
    for (const stage of TAX_MAP_STAGES) {
      for (const slug of stage.calcSlugs) {
        if (!allSlugs.has(slug)) invalid.push({ stage: stage.id, slug });
      }
    }
    expect(invalid, `Unknown calc slugs: ${JSON.stringify(invalid)}`).toEqual([]);
  });

  it('every referenced calc slug is a LIVE tool', () => {
    const notLive: Array<{ stage: string; slug: string }> = [];
    for (const stage of TAX_MAP_STAGES) {
      for (const slug of stage.calcSlugs) {
        if (!liveSlugs.has(slug)) notLive.push({ stage: stage.id, slug });
      }
    }
    expect(notLive, `Non-live calc slugs on the map: ${JSON.stringify(notLive)}`).toEqual([]);
  });

  it('step numbers are unique and sequential from 1', () => {
    const steps = TAX_MAP_STAGES.map((s) => s.step);
    expect(steps).toEqual(Array.from({ length: steps.length }, (_, i) => i + 1));
  });

  it('stage ids are unique', () => {
    const ids = TAX_MAP_STAGES.map((s) => s.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('every LIVE calculator appears somewhere on the map (no orphans)', () => {
    const mapped = new Set(TAX_MAP_STAGES.flatMap((s) => s.calcSlugs));
    const missing = [...liveSlugs].filter((slug) => !mapped.has(slug));
    expect(missing, `Live calcs missing from the tax map: ${JSON.stringify(missing)}`).toEqual([]);
  });

  it('resolveTaxMap drops nothing for the current (all-live) config', () => {
    const resolved = resolveTaxMap();
    const resolvedCount = resolved.reduce((n, s) => n + s.calcs.length, 0);
    const declaredCount = TAX_MAP_STAGES.reduce((n, s) => n + s.calcSlugs.length, 0);
    expect(resolvedCount).toBe(declaredCount);
  });
});
