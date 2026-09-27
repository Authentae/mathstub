import { get } from '@vercel/blob';
import { NextRequest, NextResponse } from 'next/server';
import { timingSafeEqual } from 'node:crypto';

export const runtime = 'nodejs';
const TOKEN_BLOB_PATH = 'private/etsy/shop-oauth.json';
function equalSecret(a: string, b: string) { const left = Buffer.from(a); const right = Buffer.from(b); return left.length === right.length && timingSafeEqual(left, right); }

export async function GET(request: NextRequest) {
  const expected = process.env.ETSY_STATUS_SECRET;
  const supplied = request.headers.get('authorization')?.replace(/^Bearer\s+/i, '') || '';
  if (!expected || !supplied || !equalSecret(expected, supplied)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401, headers: { 'Cache-Control': 'no-store' } });
  try {
    const blob = await get(TOKEN_BLOB_PATH, { access: 'private', useCache: false });
    if (!blob || blob.statusCode !== 200) return NextResponse.json({ connected: false }, { headers: { 'Cache-Control': 'no-store' } });
    const record = JSON.parse(await new Response(blob.stream).text());
    return NextResponse.json({ connected: true, shopId: String(record.shop_id || ''), tokenExpiresAt: new Date(Number(record.obtained_at) + Number(record.expires_in) * 1000).toISOString(), refreshTokenStored: typeof record.refresh_token === 'string' && !!record.refresh_token, scopes: Array.isArray(record.scopes) ? record.scopes : [] }, { headers: { 'Cache-Control': 'no-store' } });
  } catch (error) {
    console.error('Etsy token status read failed:', error instanceof Error ? error.message : 'unknown error');
    return NextResponse.json({ error: 'Secure Etsy token store is unavailable.' }, { status: 503, headers: { 'Cache-Control': 'no-store' } });
  }
}
