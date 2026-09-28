import { get, put } from '@vercel/blob';
import { NextRequest, NextResponse } from 'next/server';
import { timingSafeEqual } from 'node:crypto';

export const runtime = 'nodejs';
const TOKEN_PATH = 'private/etsy/shop-oauth.json';
const TOKEN_URL = 'https://api.etsy.com/v3/public/oauth/token';
type TokenRecord = { access_token: string; refresh_token: string; expires_in: number; obtained_at: number; shop_id: string; scopes: string[] };
function validSecret(request: NextRequest) {
  const expected = process.env.ETSY_STATUS_SECRET;
  const supplied = request.headers.get('authorization')?.replace(/^Bearer\s+/i, '') || '';
  if (!expected || !supplied) return false;
  const a = Buffer.from(expected); const b = Buffer.from(supplied);
  return a.length === b.length && timingSafeEqual(a, b);
}
async function currentToken(): Promise<TokenRecord | null> {
  const blob = await get(TOKEN_PATH, { access: 'private', useCache: false });
  if (!blob || blob.statusCode !== 200) return null;
  let record = JSON.parse(await new Response(blob.stream).text()) as TokenRecord;
  if (record.obtained_at + record.expires_in * 1000 < Date.now() + 60_000) {
    const key = process.env.ETSY_KEYSTRING; const secret = process.env.ETSY_SHARED_SECRET;
    if (!key || !secret) throw new Error('Missing Etsy app credentials');
    const response = await fetch(TOKEN_URL, { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'x-api-key': process.env.ETSY_API_KEY || `${key}:${secret}` }, body: new URLSearchParams({ grant_type: 'refresh_token', client_id: key, refresh_token: record.refresh_token }), cache: 'no-store' });
    const body = await response.json().catch(() => ({}));
    if (!response.ok || typeof body.access_token !== 'string' || typeof body.refresh_token !== 'string') throw new Error(`Etsy refresh HTTP ${response.status}`);
    record = { ...record, access_token: body.access_token, refresh_token: body.refresh_token, expires_in: Number(body.expires_in) || 3600, obtained_at: Date.now() };
    await put(TOKEN_PATH, JSON.stringify(record), { access: 'private', addRandomSuffix: false, allowOverwrite: true, contentType: 'application/json', cacheControlMaxAge: 0 });
  }
  return record;
}
async function api(record: TokenRecord, method: 'GET' | 'POST', path: string, body?: URLSearchParams) {
  const key = process.env.ETSY_KEYSTRING; const secret = process.env.ETSY_SHARED_SECRET;
  if (!key || !secret) throw new Error('Missing Etsy app credentials');
  return fetch(`https://openapi.etsy.com/v3/application${path}`, { method, headers: { 'x-api-key': process.env.ETSY_API_KEY || `${key}:${secret}`, Authorization: `Bearer ${record.access_token}`, ...(body ? { 'Content-Type': 'application/x-www-form-urlencoded' } : {}) }, body, cache: 'no-store' });
}
export async function GET(request: NextRequest) {
  if (!validSecret(request)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401, headers: { 'Cache-Control': 'no-store' } });
  try {
    const record = await currentToken();
    if (!record) return NextResponse.json({ connected: false }, { headers: { 'Cache-Control': 'no-store' } });
    const res = await api(record, 'GET', `/shops/${record.shop_id}/listings/active?limit=100`);
    const body = await res.json().catch(() => ({}));
    return NextResponse.json({ connected: res.ok, shopId: record.shop_id, count: body?.count ?? null, listings: body?.results ?? [] }, { status: res.status, headers: { 'Cache-Control': 'no-store' } });
  } catch (error) {
    console.error('Etsy shop read failed:', error instanceof Error ? error.message : 'unknown error');
    return NextResponse.json({ error: 'Could not read Etsy shop.' }, { status: 503, headers: { 'Cache-Control': 'no-store' } });
  }
}
export async function POST(request: NextRequest) {
  if (!validSecret(request)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401, headers: { 'Cache-Control': 'no-store' } });
  let input: Record<string, unknown>;
  try { input = await request.json(); } catch { return NextResponse.json({ error: 'Invalid JSON.' }, { status: 400 }); }
  const required = ['title', 'description', 'price', 'quantity', 'taxonomy_id', 'who_made', 'when_made', 'is_supply', 'type'];
  if (required.some((key) => input[key] === undefined || input[key] === null || input[key] === '')) return NextResponse.json({ error: 'Missing required Etsy draft listing fields.' }, { status: 400 });
  if (input.type === 'download') return NextResponse.json({ error: 'Digital file upload must be implemented before creating a complete digital listing.' }, { status: 501 });
  if (input.type !== 'physical') return NextResponse.json({ error: 'type must be physical or download.' }, { status: 400 });
  try {
    const record = await currentToken();
    if (!record) return NextResponse.json({ error: 'Etsy shop is not connected.' }, { status: 409 });
    const form = new URLSearchParams({ title: String(input.title), description: String(input.description), price: String(input.price), quantity: String(input.quantity), taxonomy_id: String(input.taxonomy_id), who_made: String(input.who_made), when_made: String(input.when_made), is_supply: String(input.is_supply), type: 'physical', state: 'draft' });
    const res = await api(record, 'POST', `/shops/${record.shop_id}/listings`, form);
    const body = await res.json().catch(() => ({}));
    return NextResponse.json(body, { status: res.status, headers: { 'Cache-Control': 'no-store' } });
  } catch (error) {
    console.error('Etsy draft creation failed:', error instanceof Error ? error.message : 'unknown error');
    return NextResponse.json({ error: 'Could not create Etsy draft listing.' }, { status: 503, headers: { 'Cache-Control': 'no-store' } });
  }
}
