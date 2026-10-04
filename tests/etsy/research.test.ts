import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { GET } from '../../app/api/etsy/automation/research/route';

let originalFetch: typeof fetch;
beforeEach(() => {
  vi.stubEnv('ETSY_AUTOMATION_SECRET', 'automation-secret');
  vi.stubEnv('ETSY_KEYSTRING', 'key');
  originalFetch = globalThis.fetch;
});
afterEach(() => { globalThis.fetch = originalFetch; vi.unstubAllEnvs(); });

function req(query = 'keywords=planner&limit=2', secret = 'automation-secret') {
  const request = new Request(`https://app.test/api/etsy/automation/research?${query}`, { headers: { Authorization: `Bearer ${secret}` } });
  return Object.assign(request, { nextUrl: new URL(request.url) });
}

describe('Etsy listing-demand research route', () => {
  it('requires its explicit bearer secret', async () => {
    globalThis.fetch = vi.fn() as typeof fetch;
    const response = await GET(req('keywords=planner', 'wrong') as never);
    expect(response.status).toBe(401);
    expect(globalThis.fetch).not.toHaveBeenCalled();
  });

  it('validates keywords and bounded sample size', async () => {
    globalThis.fetch = vi.fn() as typeof fetch;
    expect((await GET(req('keywords=', 'automation-secret') as never)).status).toBe(400);
    expect((await GET(req('keywords=planner&limit=0', 'automation-secret') as never)).status).toBe(400);
    expect(globalThis.fetch).not.toHaveBeenCalled();
  });

  it('deduplicates and bounds keywords and reports catalog signals with caveats', async () => {
    const calls: string[] = [];
    globalThis.fetch = vi.fn(async (input: RequestInfo | URL) => {
      const url = new URL(String(input));
      calls.push(url.toString());
      return Response.json({ count: 10, results: Array.from({ length: 10 }, (_, index) => ({
        listing_id: index + 1,
        title: `Planner ${index + 1}`,
        price: { amount: (index + 1) * 100, divisor: 100, currency_code: 'USD' },
        num_favorers: index * 4,
        url: `https://etsy.test/listing/${index + 1}`,
      })) });
    }) as typeof fetch;

    const response = await GET(req('keywords=planner,planner,study%20planner,calendar,printable,template,extra&limit=3') as never);
    const body = await response.json();
    expect(response.status).toBe(200);
    expect(calls).toHaveLength(5);
    expect(body.results).toHaveLength(5);
    expect(body.results[0]).toMatchObject({ keyword: 'planner', catalogMatches: 3, sampledListings: 3, medianObservedPrice: 2, sampleIsSmall: true });
    expect(body.caveat).toContain('does not provide marketplace search volume');
    expect(body.results[0].warning).toContain('Small catalog sample');
  });

  it('marks incomplete when Etsy search exceeds its pagination safety ceiling', async () => {
    globalThis.fetch = vi.fn(async () => Response.json({ count: 600, results: Array.from({ length: 100 }, (_, i) => ({ listing_id: i })) })) as typeof fetch;
    const response = await GET(req('keywords=planner') as never);
    const body = await response.json();
    expect(body.results[0].cappedByPageLimit).toBe(true);
    expect(body.results[0].pagesRead).toBe(5);
  });
});
