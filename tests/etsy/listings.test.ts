import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { POST, GET } from '../../app/api/etsy/listings/route';

const store = vi.hoisted(() => new Map<string, string>());
vi.mock('@vercel/blob', () => ({
  get: vi.fn(async (path: string) => {
    const value = store.get(path);
    return value === undefined ? null : { statusCode: 200, blob: { etag: 'test-etag' }, stream: new Blob([value]).stream() };
  }),
  put: vi.fn(async (path: string, value: string) => { store.set(path, value); return { url: `https://blob.test/${path}` }; }),
  del: vi.fn(async (path: string) => { store.delete(path); }),
}));

const appSecret = 'automation-test-secret';
const validInput = {
  title: 'Original botanical wall print',
  description: 'An original printable artwork designed for a calm reading nook.',
  price: 9.5,
  quantity: 25,
  who_made: 'i_did',
  when_made: '2020_2025',
  taxonomy_id: 1,
  tags: ['botanical art', 'reading nook'],
  images: [{ filename: 'preview.png', content: Buffer.from('image bytes').toString('base64'), mimeType: 'image/png' }],
  readiness_confirmed: true,
  readiness_evidence: 'Original source files and QA evidence reviewed by workflow.',
} as const;

let originalFetch: typeof fetch;
beforeEach(() => {
  store.clear();
  vi.stubEnv('ETSY_AUTOMATION_SECRET', appSecret);
  vi.stubEnv('ETSY_KEYSTRING', 'test-key');
  store.set('private/etsy/shop-oauth.json', JSON.stringify({ access_token: 'access-token', refresh_token: 'refresh-token', expires_in: 3600, obtained_at: Date.now(), shop_id: '123456', scopes: ['listings_r', 'listings_w'] }));
  store.set('private/etsy/publish-history.json', '[]');
  originalFetch = globalThis.fetch;
});
afterEach(() => { globalThis.fetch = originalFetch; vi.unstubAllEnvs(); });

function request(body: unknown, headers: Record<string, string> = {}) {
  return new Request('https://app.test/api/etsy/listings', {
    method: 'POST',
    headers: { Authorization: `Bearer ${appSecret}`, 'Content-Type': 'application/json', 'Idempotency-Key': 'stable-test-key-0001', ...headers },
    body: JSON.stringify(body),
  });
}

function routeRequest(body: unknown, headers?: Record<string, string>) {
  const req = request(body, headers);
  return Object.assign(req, { nextUrl: new URL(req.url) });
}

describe('Etsy listing publication route', () => {
  it('creates draft, uploads assets, activates and reads back before recording success', async () => {
    const calls: Array<{ url: string; method: string; body?: BodyInit | null }> = [];
    globalThis.fetch = vi.fn(async (input: RequestInfo | URL, init?: RequestInit) => {
      const url = String(input);
      calls.push({ url, method: init?.method || 'GET', body: init?.body });
      if (url.endsWith('/listings') && init?.method === 'POST') return Response.json({ listing_id: 456, state: 'draft', title: validInput.title });
      if (url.endsWith('/images') && init?.method === 'POST') return Response.json({ listing_image_id: 12 });
      if (url.includes('/listings/456?state=active') && init?.method === 'PATCH') return Response.json({ listing_id: 456, state: 'active' });
      if (url.endsWith('/listings/456') && init?.method !== 'PATCH') return Response.json({ listing_id: 456, state: 'active', title: validInput.title });
      throw new Error(`Unexpected request: ${url} ${init?.method}`);
    }) as typeof fetch;

    const response = await POST(routeRequest(validInput) as never);
    const body = await response.json();
    expect(response.status).toBe(201);
    expect(body).toMatchObject({ listing_id: 456, state: 'active', uploadedImages: ['preview.png'] });
    expect(calls.map((call) => call.method)).toEqual(['POST', 'POST', 'PATCH', 'GET']);
    const createBody = calls[0].body as URLSearchParams;
    expect(createBody.get('type')).toBe('physical');
    expect(createBody.get('state')).toBeNull();
    expect(calls[1].body).toBeInstanceOf(FormData);
    expect(calls[1].url).toContain('/images');
    expect(calls[2].body).toBeInstanceOf(URLSearchParams);
    expect(JSON.parse(store.get('private/etsy/publish-history.json') || '[]')).toHaveLength(1);
    expect(JSON.parse(store.get('private/etsy/publish-lock.json') || '{}')).toMatchObject({ state: 'completed', listingId: 456 });
  });

  it('requires readiness evidence and a stable idempotency key before Etsy mutation', async () => {
    globalThis.fetch = vi.fn() as typeof fetch;
    const noEvidence = { ...validInput, readiness_confirmed: false };
    const first = await POST(routeRequest(noEvidence) as never);
    const noKey = await POST(routeRequest(validInput, { 'Idempotency-Key': '' }) as never);
    expect(first.status).toBe(409);
    expect(noKey.status).toBe(400);
    expect(globalThis.fetch).not.toHaveBeenCalled();
  });

  it('verifies OAuth expiry before making a listing request', async () => {
    store.set('private/etsy/shop-oauth.json', JSON.stringify({ access_token: 'expired-token', refresh_token: 'refresh-token', expires_in: 60, obtained_at: Date.now() - 120_000, shop_id: '123456', scopes: ['listings_r', 'listings_w'] }));
    globalThis.fetch = vi.fn() as typeof fetch;
    const response = await POST(routeRequest(validInput) as never);
    expect(response.status).toBe(503);
    expect(globalThis.fetch).not.toHaveBeenCalled();
  });

  it('prevents retrying after an unresolved Etsy side effect', async () => {
    store.set('private/etsy/publish-lock.json', JSON.stringify({ idempotencyKey: 'old', draftHash: 'old', startedAt: new Date(Date.now() - 45 * 60_000).toISOString(), state: 'etsy_created', listingId: 99 }));
    globalThis.fetch = vi.fn() as typeof fetch;
    const response = await POST(routeRequest(validInput) as never);
    expect(response.status).toBe(409);
    expect(globalThis.fetch).not.toHaveBeenCalled();
  });

  it('does not activate after a failed image upload', async () => {
    const calls: string[] = [];
    globalThis.fetch = vi.fn(async (input: RequestInfo | URL, init?: RequestInit) => {
      const url = String(input);
      calls.push(`${init?.method}:${url}`);
      if (url.endsWith('/listings') && init?.method === 'POST') return Response.json({ listing_id: 789, state: 'draft' });
      if (url.endsWith('/images') && init?.method === 'POST') return Response.json({ error: 'invalid image' }, { status: 400 });
      throw new Error(`Unexpected request: ${url} ${init?.method}`);
    }) as typeof fetch;
    const response = await POST(routeRequest(validInput) as never);
    const body = await response.json();
    expect(response.status).toBe(400);
    expect(body.listing_id).toBe(789);
    expect(body.unresolved).toBe(false);
    expect(calls.some((call) => call.startsWith('PATCH:'))).toBe(false);
    expect(JSON.parse(store.get('private/etsy/publish-lock.json') || '{}')).toMatchObject({ state: 'uploads_partial', listingId: 789 });
  });

  it('uploads digital listing files with Etsy multipart fields file and name', async () => {
    const calls: Array<{ url: string; method: string; body?: BodyInit | null }> = [];
    const digitalInput = {
      ...validInput,
      digital: true,
      files: [{ filename: 'printable.pdf', content: Buffer.from('pdf bytes').toString('base64'), mimeType: 'application/pdf' }],
    };
    globalThis.fetch = vi.fn(async (input: RequestInfo | URL, init?: RequestInit) => {
      const url = String(input);
      calls.push({ url, method: init?.method || 'GET', body: init?.body });
      if (url.endsWith('/listings') && init?.method === 'POST') return Response.json({ listing_id: 456, state: 'draft', title: validInput.title });
      if (url.endsWith('/files') && init?.method === 'POST') return Response.json({ listing_file_id: 99 });
      if (url.endsWith('/images') && init?.method === 'POST') return Response.json({ listing_image_id: 12 });
      if (url.includes('/listings/456?state=active') && init?.method === 'PATCH') return Response.json({ listing_id: 456, state: 'active' });
      if (url.endsWith('/listings/456') && init?.method !== 'PATCH') return Response.json({ listing_id: 456, state: 'active', title: validInput.title });
      throw new Error(`Unexpected request: ${url} ${init?.method}`);
    }) as typeof fetch;
    const response = await POST(routeRequest(digitalInput) as never);
    expect(response.status).toBe(201);
    expect(calls.map((call) => call.method)).toEqual(['POST', 'POST', 'POST', 'PATCH', 'GET']);
    const fileForm = calls[1].body as FormData;
    expect(fileForm.get('file')).toBeInstanceOf(Blob);
    expect(fileForm.get('name')).toBe('printable.pdf');
    expect(calls[1].url).toContain('/files');
  });

  it('preserves unresolved state when activation succeeds but read-back fails', async () => {
    globalThis.fetch = vi.fn(async (input: RequestInfo | URL, init?: RequestInit) => {
      const url = String(input);
      if (url.endsWith('/listings') && init?.method === 'POST') return Response.json({ listing_id: 800, state: 'draft' });
      if (url.endsWith('/images') && init?.method === 'POST') return Response.json({ listing_image_id: 13 });
      if (url.includes('/listings/800?state=active') && init?.method === 'PATCH') return Response.json({ listing_id: 800, state: 'active' });
      if (url.endsWith('/listings/800')) return Response.json({ error: 'temporary outage' }, { status: 503 });
      throw new Error(`Unexpected request: ${url} ${init?.method}`);
    }) as typeof fetch;
    const response = await POST(routeRequest(validInput) as never);
    const body = await response.json();
    expect(response.status).toBe(502);
    expect(body).toMatchObject({ listing_id: 800, unresolved: true });
    expect(JSON.parse(store.get('private/etsy/publish-history.json') || '[]')).toHaveLength(0);
    expect(JSON.parse(store.get('private/etsy/publish-lock.json') || '{}')).toMatchObject({ state: 'activation_pending', listingId: 800 });
  });

  it('requires listings_r scope for the published listing read route', async () => {
    store.set('private/etsy/shop-oauth.json', JSON.stringify({ access_token: 'token', refresh_token: 'refresh', expires_in: 3600, obtained_at: Date.now(), shop_id: '123456', scopes: [] }));
    globalThis.fetch = vi.fn() as typeof fetch;
    const request = new Request('https://app.test/api/etsy/listings', { headers: { Authorization: `Bearer ${appSecret}` } });
    const response = await GET(Object.assign(request, { nextUrl: new URL(request.url) }) as never);
    expect(response.status).toBe(403);
    expect(globalThis.fetch).not.toHaveBeenCalled();
  });
});
