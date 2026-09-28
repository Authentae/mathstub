import { createHash, createHmac, randomBytes } from 'node:crypto';
import { NextResponse } from 'next/server';

export const runtime = 'nodejs';
const COOKIE = 'etsy_oauth_transaction';
const MAX_AGE = 10 * 60;
const REQUESTED_SCOPES = ['listings_r', 'listings_w', 'shops_r'] as const;
function base64url(value: Buffer) { return value.toString('base64url'); }
export async function GET() {
  const keystring = process.env.ETSY_KEYSTRING;
  const sharedSecret = process.env.ETSY_SHARED_SECRET;
  const redirectUri = process.env.ETSY_REDIRECT_URI;
  if (!keystring || !sharedSecret || !redirectUri) return NextResponse.json({ error: 'Etsy OAuth is not configured.' }, { status: 503, headers: { 'Cache-Control': 'no-store' } });
  const verifier = base64url(randomBytes(32));
  const challenge = base64url(createHash('sha256').update(verifier).digest());
  const state = base64url(randomBytes(32));
  const payload = base64url(Buffer.from(JSON.stringify({ state, verifier, scopes: REQUESTED_SCOPES })));
  const signature = createHmac('sha256', sharedSecret).update(payload).digest('base64url');
  const url = new URL('https://www.etsy.com/oauth/connect');
  url.searchParams.set('response_type', 'code');
  url.searchParams.set('client_id', keystring);
  url.searchParams.set('redirect_uri', redirectUri);
  url.searchParams.set('scope', REQUESTED_SCOPES.join(' '));
  url.searchParams.set('state', state);
  url.searchParams.set('code_challenge', challenge);
  url.searchParams.set('code_challenge_method', 'S256');
  const response = NextResponse.redirect(url);
  response.headers.set('Cache-Control', 'no-store');
  response.cookies.set(COOKIE, `${payload}.${signature}`, { httpOnly: true, secure: true, sameSite: 'lax', path: '/api/etsy/oauth/callback', maxAge: MAX_AGE });
  return response;
}
