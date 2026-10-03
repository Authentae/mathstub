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
  const request = new Request('https://app.test/api/etsy/automation/report?period=weekly', { headers: { Authorization: 'Bearer test-secret' } });
  return Object.assign(request, { nextUrl: new URL(request.url) });
}

describe('Etsy performance report route', () => {
  it('joins receipt transactions to active listings and totals revenue by currency', async () => {
    globalThis.fetch = vi.fn(async (input: RequestInfo | URL) => {
      const url = String(input);
      if (url.includes('/listings?state=')) {
        const state = new URL(url).searchParams.get('state');
        return Response.json({ count: state === 'active' ? 1 : 0, results: state === 'active' ? [{ listing_id: 101, title: 'Print', num_favorers: 7 }] : [] });
      }
      if (url.includes('/receipts?')) return Response.json({ count: 2, results: [
        { receipt_id: 1, status: 'paid', is_paid: true, transactions: [{ listing_id: 101, quantity: 2, price: { amount: 1250, divisor: 100, currency_code: 'USD' } }] },
        { receipt_id: 2, status: 'completed', is_paid: true, transactions: [{ listing_id: 101, quantity: 1, price: { amount: 900, divisor: 100, currency_code: 'USD' } }, { listing_id: 202, quantity: 1, price: { amount: 500, divisor: 100, currency_code: 'EUR' } }] },
      ] });
      throw new Error(`Unexpected request: ${url}`);
    }) as typeof fetch;

    const response = await GET(makeRequest() as never);
    const body = await response.json();
    expect(response.status).toBe(200);
    expect(body.shopPaidOrderCount).toBe(2);
    expect(body.shopRevenueByCurrency).toEqual({ USD: 34, EUR: 5 });
    expect(body.listings.find((item: { listing_id: number }) => item.listing_id === 101)).toMatchObject({ listing_id: 101, listingFavorites: 7, paidOrderCount: 2, transactionCount: 2, unitsSold: 3, grossRevenue: 34, revenueCurrency: 'USD' });
    expect(body.dataComplete).toBe(true);
    expect(body.dataGaps.join(' ')).toContain('cumulative listing totals');
  });

  it('reads every listing state and all result pages for listings and receipts', async () => {
    const calls: string[] = [];
    globalThis.fetch = vi.fn(async (input: RequestInfo | URL) => {
      const url = String(input);
      calls.push(url);
      const offset = new URL(url).searchParams.get('offset');
      if (url.includes('/listings?state=')) {
        const state = new URL(url).searchParams.get('state');
        if (state === 'active') {
        return offset === '100'
          ? Response.json({ count: 101, results: [{ listing_id: 101, title: 'Last listing' }] })
          : Response.json({ count: 101, results: Array.from({ length: 100 }, (_, index) => ({ listing_id: index + 1, title: `Listing ${index + 1}` })) });
        }
        return Response.json({ count: state === 'sold_out' ? 1 : 0, results: state === 'sold_out' ? [{ listing_id: 200, title: 'Past listing', state, num_favorers: 12 }] : [] });
      }
      if (url.includes('/receipts?')) {
        return offset === '100'
          ? Response.json({ count: 101, results: [{ receipt_id: 101, status: 'paid', is_paid: true, transactions: [{ listing_id: 101, quantity: 1, price: { amount: 500, divisor: 100, currency_code: 'USD' } }] }] })
          : Response.json({ count: 101, results: Array.from({ length: 100 }, (_, index) => ({ receipt_id: index, status: 'paid', is_paid: true, transactions: [] })) });
      }
      throw new Error(`Unexpected request: ${url}`);
    }) as typeof fetch;

    const response = await GET(makeRequest() as never);
    const body = await response.json();
    expect(response.status).toBe(200);
    expect(body.listings).toHaveLength(102);
    expect(body.listings.find((item: { listing_id: number }) => item.listing_id === 101)).toMatchObject({ listing_id: 101, paidOrderCount: 1, grossRevenue: 5 });
    expect(body.listings.find((item: { listing_id: number }) => item.listing_id === 200)).toMatchObject({ listing_id: 200, state: 'sold_out', listingFavorites: 12, paidOrderCount: 0 });
    expect(calls).toHaveLength(9);
    expect(calls.every((url) => new URL(url).searchParams.has('limit') && new URL(url).searchParams.has('offset'))).toBe(true);
    expect(new Set(calls.filter((url) => url.includes('/listings?state=')).map((url) => new URL(url).searchParams.get('state'))).size).toBe(6);
    expect(body.dataComplete).toBe(true);
  });

  it('does not report successful zero sales if receipt access is denied', async () => {
    globalThis.fetch = vi.fn(async (input: RequestInfo | URL) => String(input).includes('/listings?state=')
      ? Response.json({ count: 0, results: [] })
      : Response.json({ error: 'scope missing' }, { status: 403 })) as typeof fetch;

    const response = await GET(makeRequest() as never);
    const body = await response.json();
    expect(response.status).toBe(403);
    expect(body.error).toContain('order performance data');
    expect(body.shopOrderCount).toBeUndefined();
  });

  it('excludes unpaid and canceled receipts and reports refunds separately', async () => {
    globalThis.fetch = vi.fn(async (input: RequestInfo | URL) => {
      const url = String(input);
      if (url.includes('/listings?state=')) return Response.json({ count: 1, results: new URL(url).searchParams.get('state') === 'inactive' ? [{ listing_id: 404, state: 'inactive', num_favorers: 3 }] : [] });
      if (url.includes('/receipts?')) return Response.json({ count: 3, results: [
        { receipt_id: 1, status: 'paid', is_paid: true, transactions: [{ listing_id: 404, quantity: 1, price: { amount: 2000, divisor: 100, currency_code: 'USD' } }], refunds: [{ amount: { amount: 500, divisor: 100, currency_code: 'USD' } }] },
        { receipt_id: 2, status: 'canceled', is_paid: false, transactions: [{ listing_id: 404, quantity: 1, price: { amount: 2000, divisor: 100, currency_code: 'USD' } }] },
        { receipt_id: 3, status: 'fully refunded', is_paid: true, transactions: [{ listing_id: 404, quantity: 1, price: { amount: 2000, divisor: 100, currency_code: 'USD' } }] },
      ] });
      throw new Error(`Unexpected request: ${url}`);
    }) as typeof fetch;

    const response = await GET(makeRequest() as never);
    const body = await response.json();
    expect(response.status).toBe(200);
    expect(body.shopPaidOrderCount).toBe(1);
    expect(body.excludedReceiptCount).toBe(2);
    expect(body.shopRevenueByCurrency).toEqual({ USD: 20 });
    expect(body.shopRefundsByCurrency).toEqual({ USD: 5 });
    expect(body.shopNetRevenueByCurrency).toEqual({ USD: 15 });
    expect(body.listings[0]).toMatchObject({ listing_id: 404, state: 'inactive', paidOrderCount: 1, grossRevenue: 20, revenueCurrency: 'USD' });
  });

  it('marks malformed Etsy pagination responses as incomplete instead of reporting zero', async () => {
    globalThis.fetch = vi.fn(async (input: RequestInfo | URL) => String(input).includes('/listings?state=')
      ? Response.json({ count: 0, results: [] })
      : Response.json({ count: 1, unexpected: [] })) as typeof fetch;

    const response = await GET(makeRequest() as never);
    const body = await response.json();
    expect(response.status).toBe(502);
    expect(body.dataComplete).toBe(false);
    expect(body.error).toContain('malformed paginated response');
  });
});
