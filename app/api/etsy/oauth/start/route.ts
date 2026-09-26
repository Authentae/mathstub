import { createHash, randomBytes } from 'node:crypto';
import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

const COOKIE = 'etsy_oauth_transaction';
const MAX_AGE = 10 * 60;

function base64url(value: Buffer) {
  return value.toString('base64url');
}

export async function GET(request: Request) {
  const keystring = process.env.ETSY_KEYSTRING;
  const redirectUri = process.env.ETSY_REDIRECT_URI;

  if (!keystring || !redirectUri) {
    return NextResponse.json({ error: 'Etsy OAuth is not configured.' }, { status: 503 });
  }

  const verifier = base64url(randomBytes(32));
  const challenge = base64url(createHash('sha256').update(verifier).digest());
  const state = base64url(randomBytes(32));
  const url = new URL('https://www.etsy.com/oauth/connect');
  url.searchParams.set('response_type', 'code');
  url.searchParams.set('client_id', keystring);
  url.searchParams.set('redirect_uri', redirectUri);
  url.searchParams.set('scope', 'listings_r listings_w shops_r');
  url.searchParams.set('state', state);
  url.searchParams.set('code_challenge', challenge);
  url.searchParams.set('code_challenge_method', 'S256');

  const response = NextResponse.redirect(url);
  response.cookies.set(COOKIE, JSON.stringify({ state, verifier }), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/api/etsy/oauth/callback',
    maxAge: MAX_AGE,
  });
  return response;
}
