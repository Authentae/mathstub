import { get, put } from '@vercel/blob';
import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';
const TOKEN_BLOB_PATH = 'private/etsy/shop-oauth.json';
const TOKEN_URL = 'https://api.etsy.com/v3/public/oauth/token';

type TokenRecord = { access_token: string; refresh_token: string; expires_in: number; obtained_at: number; shop_id: string; scopes: string[] };

export async function GET(request: NextRequest) {
  const expected = process.env.ETSY_STATUS_SECRET;
  const supplied = request.headers.get('authorization')?.replace(/^Bearer\s+/i, '') || '';
  if (!expected || !supplied || supplied.length !== expected.length || !Buffer.from(supplied).equals(Buffer.from(expected))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401, headers: { 'Cache-Control': 'no-store' } });
  }

  let blob;
  try {
    blob = await get(TOKEN_BLOB_PATH, { access: 'private', useCache: false });
  } catch (error) {
    console.error('Etsy token read failed:', error instanceof Error ? error.message : 'unknown error');
    return NextResponse.json({ error: 'Secure Etsy token store is unavailable.' }, { status: 503, headers: { 'Cache-Control': 'no-store' } });
  }
  if (!blob || blob.statusCode !== 200) return NextResponse.json({ connected: false }, { status: 200, headers: { 'Cache-Control': 'no-store' } });

  try {
    let record = JSON.parse(await new Response(blob.stream).text()) as TokenRecord;
    if (record.obtained_at + record.expires_in * 1000 < Date.now() + 60_000) {
      const keystring = process.env.ETSY_KEYSTRING;
      const sharedSecret = process.env.ETSY_SHARED_SECRET;
      if (!keystring || !sharedSecret) return NextResponse.json({ error: 'Etsy app credentials are not configured.' }, { status: 503, headers: { 'Cache-Control': 'no-store' } });
      const apiKey = process.env.ETSY_API_KEY || `${keystring}:${sharedSecret}`;
      const response = await fetch(TOKEN_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'x-api-key': apiKey },
        body: new URLSearchParams({ grant_type: 'refresh_token', client_id: keystring, refresh_token: record.refresh_token }),
        cache: 'no-store',
      });
      const body = await response.json().catch(() => ({}));
      if (!response.ok || typeof body.access_token !== 'string' || typeof body.refresh_token !== 'string') {
        console.error('Etsy refresh failed:', response.status);
        return NextResponse.json({ error: 'Etsy refresh failed; reconnect the shop.' }, { status: 502, headers: { 'Cache-Control': 'no-store' } });
      }
      record = { ...record, access_token: body.access_token, refresh_token: body.refresh_token, expires_in: Number(body.expires_in) || 3600, obtained_at: Date.now() };
      await put(TOKEN_BLOB_PATH, JSON.stringify(record), { access: 'private', addRandomSuffix: false, allowOverwrite: true, contentType: 'application/json', cacheControlMaxAge: 0 });
    }
    return NextResponse.json({ connected: true, shopId: record.shop_id, tokenExpiresAt: new Date(record.obtained_at + record.expires_in * 1000).toISOString(), scopes: record.scopes, accessToken: record.access_token }, { status: 200, headers: { 'Cache-Control': 'no-store' } });
  } catch (error) {
    console.error('Etsy token store read/update failed:', error instanceof Error ? error.message : 'unknown error');
    return NextResponse.json({ error: 'Could not read or refresh Etsy authorization.' }, { status: 503, headers: { 'Cache-Control': 'no-store' } });
  }
}
