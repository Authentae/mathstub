import { get, put } from '@vercel/blob';
import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';
const TOKEN_BLOB_PATH = 'private/etsy/shop-oauth.json';
const TOKEN_URL = 'https://api.etsy.com/v3/public/oauth/token';

type TokenRecord = { access_token: string; refresh_token: string; expires_in: number; obtained_at: number; shop_id: string; scopes: string[] };

function authorized(request: NextRequest) {
  const expected = process.env.ETSY_STATUS_SECRET;
  const supplied = request.headers.get('authorization')?.replace(/^Bearer\s+/i, '') || '';
  return !!expected && !!supplied && supplied.length === expected.length && Buffer.from(supplied).equals(Buffer.from(expected));
}

async function getToken() {
  const blob = await get(TOKEN_BLOB_PATH, { access: 'private', useCache: false });
  if (!blob || blob.statusCode !== 200) return null;
  let record = JSON.parse(await new Response(blob.stream).text()) as TokenRecord;
  if (record.obtained_at + record.expires_in * 1000 < Date.now() + 60_000) {
    const keystring = process.env.ETSY_KEYSTRING;
    const sharedSecret = process.env.ETSY_SHARED_SECRET;
    if (!keystring || !sharedSecret) throw new Error('Etsy app credentials are not configured');
    const apiKey = process.env.ETSY_API_KEY || `${keystring}:${sharedSecret}`;
    const response = await fetch(TOKEN_URL, {
      method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'x-api-key': apiKey },
      body: new URLSearchParams({ grant_type: 'refresh_token', client_id: keystring, refresh_token: record.refresh_token }), cache: 'no-store',
    });
    const body = await response.json().catch(() => ({}));
    if (!response.ok || typeof body.access_token !== 'string' || typeof body.refresh_token !== 'string') throw new Error('Etsy refresh failed');
    record = { ...record, access_token: body.access_token, refresh_token: body.refresh_token, expires_in: Number(body.expires_in) || 3600, obtained_at: Date.now() };
    await put(TOKEN_BLOB_PATH, JSON.stringify(record), { access: 'private', addRandomSuffix: false, allowOverwrite: true, contentType: 'application/json', cacheControlMaxAge: 0 });
  }
  return record;
}

async function etsyRequest(request: NextRequest, method: 'GET' | 'POST', url: string, body?: URLSearchParams) {
  const record = await getToken();
  if (!record) return NextResponse.json({ error: 'Etsy shop is not connected.' }, { status: 409, headers: { 'Cache-Control': 'no-store' } });
  const keystring = process.env.ETSY_KEYSTRING;
  const sharedSecret = process.env.ETSY_SHARED_SECRET;
  if (!keystring || !sharedSecret) return NextResponse.json({ error: 'Etsy app credentials are not configured.' }, { status: 503 });
  const response = await fetch(url, { method, headers: { 'x-api-key': process.env.ETSY_API_KEY || `${keystring}:${sharedSecret}`, Authorization: `Bearer ${record.access_token}`, ...(body ? { 'Content-Type': 'application/x-www-form-urlencoded' } : {}) }, body, cache: 'no-store' });
  const data = await response.json().catch(() => ({}));
  return NextResponse.json(data, { status: response.status, headers: { 'Cache-Control': 'no-store' } });
}

export async function GET(request: NextRequest) {
  if (!authorized(request)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401, headers: { 'Cache-Control': 'no-store' } });
  try {
    const record = await getToken();
    if (!record) return NextResponse.json({ connected: false }, { status: 200, headers: { 'Cache-Control': 'no-store' } });
    const url = `https://openapi.etsy.com/v3/application/shops/${record.shop_id}/listings/active?limit=100`;
    const response = await fetch(url, { headers: { 'x-api-key': process.env.ETSY_API_KEY || `${process.env.ETSY_KEYSTRING}:${process.env.ETSY_SHARED_SECRET}`, Authorization: `Bearer ${record.access_token}` }, cache: 'no-store' });
    const body = await response.json().catch(() => ({}));
    return NextResponse.json({ connected: response.ok, shopId: record.shop_id, activeListingCountReturned: body?.count ?? null, listings: body?.results ?? [] }, { status: response.status, headers: { 'Cache-Control': 'no-store' } });
  } catch (error) {
    console.error('Etsy listing read failed:', error instanceof Error ? error.message : 'unknown error');
    return NextResponse.json({ error: 'Could not read Etsy listings.' }, { status: 503, headers: { 'Cache-Control': 'no-store' } });
  }
}

export async function POST(request: NextRequest) {
  if (!authorized(request)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401, headers: { 'Cache-Control': 'no-store' } });
  let input: { title?: string; description?: string; price?: number; quantity?: number; taxonomy_id?: number; who_made?: string; when_made?: string; is_supply?: boolean; type?: string };
  try { input = await request.json(); } catch { return NextResponse.json({ error: 'Invalid JSON.' }, { status: 400 }); }
  const { title, description, price, quantity, taxonomy_id, who_made, when_made, is_supply, type } = input;
  if (!title || !description || !price || !quantity || !taxonomy_id || !who_made || !when_made || typeof is_supply !== 'boolean' || !type) return NextResponse.json({ error: 'Missing required Etsy draft-listing fields.' }, { status: 400 });
  if (type !== 'download' && type !== 'physical') return NextResponse.json({ error: 'type must be download or physical.' }, { status: 400 });
  if (type === 'download') return NextResponse.json({ error: 'Digital file upload is not implemented; refusing to create an incomplete listing.' }, { status: 501 });
  try {
    const record = await getToken();
    if (!record) return NextResponse.json({ error: 'Etsy shop is not connected.' }, { status: 409 });
    const keystring = process.env.ETSY_KEYSTRING;
    const sharedSecret = process.env.ETSY_SHARED_SECRET;
    if (!keystring || !sharedSecret) return NextResponse.json({ error: 'Etsy app credentials are not configured.' }, { status: 503 });
    const params = new URLSearchParams({ title, description, price: String(price), quantity: String(quantity), taxonomy_id: String(taxonomy_id), who_made, when_made, is_supply: String(is_supply), type, state: 'draft' });
    const result = await etsyRequest(request, 'POST', `https://openapi.etsy.com/v3/application/shops/${record.shop_id}/listings`, params);
    return result;
  } catch (error) {
    console.error('Etsy draft listing creation failed:', error instanceof Error ? error.message : 'unknown error');
    return NextResponse.json({ error: 'Could not create Etsy draft listing.' }, { status: 503, headers: { 'Cache-Control': 'no-store' } });
  }
}
