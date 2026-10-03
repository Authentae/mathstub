import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { GET } from '../../app/api/etsy/automation/report/route';

const store = vi.hoisted(() => new Map<string, string>());
vi.mock('@vercel/blob', () => ({
  get: vi.fn(async (path: string) => {
    const value = store.get(path);
    return value === undefined ? null : { statusCode: 200, stream: new Blob([value]).stream() };
  }),
  put: vi.fn(async (path: string, value: string) => { store.set(path, value); return { url: `https://blob.test/${path}` }; }),
}));

let originalFetch: typeof fetch;
beforeEach(() => {
  store.clear();
  vi.stubEnv('ETSY_STATUS_SECRET', 'test-secret');
  vi.stubEnv('ETSY_KEYSTRING', 'test-key');
  vi.stubEnv('ETSY_SHARED_SECRET', 'test-app-secret');
  store.set('private/etsy/shop-oauth.json', JSON.stringify({ access_token: 'access-token', refresh_token: 'refresh-token', expires_in: 3600, obtained_at: Date.now(), shop_id: '123456', scopes: ['listings_r', 'listings_w', 'shops_r', 'transactions_r'] }));
  store.set('private/etsy/publish-history.json', '[]');
  originalFetch = globalThis.fetch;
});
afterEach(() => { globalThis.fetch = originalFetch; vi.unstubAllEnvs(); });

function makeRequest() {
  return new Request('https://app.test/api/etsy/automation/report?period=weekly', { headers: { Authorization: 'Bearer test-secret' } });
}

describe('Etsy performance report route', () => {
  it('joins receipt transactions to active listings and totals revenue by currency', async () => {
    globalThis.fetch = vi.fn(async (input: RequestInfo | URL) => {
      const url = String(input);
      if (url.includes('/listings/active')) return Response.json({ count: 1, results: [{ listing_id: 101, title: 'Print', views: 10 }] });
      if (url.includes('/receipts?')) return Response.json({ count: 2, results: [
        { transactions: [{ listing_id: 101, quantity: 2, price: { amount: 1250, divisor: 100, currency_code: 'USD' } }] },
        { transactions: [{ listing_id: 101, quantity: 1, price: { amount: 900, divisor: 100, currency_code: 'USD' } }, { listing_id: 202, quantity: 1, price: { amount: 500, divisor: 100, currency_code: 'EUR' } }] },
      ] });
      throw new Error(`Unexpected request: ${url}`);
    }) as typeof fetch;

    const response = await GET(makeRequest() as never);
    const body = await response.json();
    expect(response.status).toBe(200);
    expect(body.shopOrderCount).toBe(2);
    expect(body.shopRevenueByCurrency).toEqual({ USD: 34, EUR: 5 });
    expect(body.listings[0]).toMatchObject({ listing_id: 101, orderCount: 2, unitsSold: 3, attributedRevenue: 34, revenueCurrency: 'USD' });
    expect(body.dataGaps.join(' ')).toContain('first 100 results');
  });

  it('fails the report instead of showing order metrics as zero if receipt access is denied', async () => {
    globalThis.fetch = vi.fn(async (input: RequestInfo | URL) => String(input).includes('/listings/active')
      ? Response.json({ count: 0, results: [] })
      : Response.json({ error: 'scope missing' }, { status: 403 })) as typeof fetch;

    const response = await GET(makeRequest() as never);
    const body = await response.json();
    expect(response.status).toBe(403);
    expect(body.error).toContain('order performance data');
    expect(body.shopOrderCount).toBeUndefined();
  });
});
