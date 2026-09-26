import { createHash, timingSafeEqual } from 'node:crypto';
import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';

const COOKIE = 'etsy_oauth_transaction';
const TOKEN_URL = 'https://api.etsy.com/v3/public/oauth/token';
const KV_REST_URL = process.env.ETSY_TOKEN_KV_REST_API_URL;
const KV_REST_TOKEN = process.env.ETSY_TOKEN_KV_REST_API_TOKEN;

function safeEqual(a: string, b: string) {
  const left = Buffer.from(a);
  const right = Buffer.from(b);
  return left.length === right.length && timingSafeEqual(left, right);
}

async function saveTokens(value: unknown) {
  if (!KV_REST_URL || !KV_REST_TOKEN) throw new Error('Etsy token store is not configured');
  const url = `${KV_REST_URL.replace(/\/$/, '')}/set/etsy-shop-oauth/${encodeURIComponent(JSON.stringify(value))}`;
  const response = await fetch(url, { headers: { Authorization: `Bearer ${KV_REST_TOKEN}` }, cache: 'no-store' });
  if (!response.ok) throw new Error(`Etsy token store returned HTTP ${response.status}`);
  const result = await response.json().catch(() => ({}));
  if (result?.result !== 'OK') throw new Error('Etsy token store rejected the write');
}

export async function GET(request: NextRequest) {
  const error = request.nextUrl.searchParams.get('error');
  if (error) {
    const response = NextResponse.json({ error: 'Etsy authorization was declined or failed.' }, { status: 400 });
    response.cookies.delete(COOKIE);
    return response;
  }

  const code = request.nextUrl.searchParams.get('code');
  const returnedState = request.nextUrl.searchParams.get('state');
  const transactionCookie = request.cookies.get(COOKIE)?.value;
  const keystring = process.env.ETSY_KEYSTRING;
  const sharedSecret = process.env.ETSY_SHARED_SECRET;
  const redirectUri = process.env.ETSY_REDIRECT_URI;
  const rawApiKey = process.env.ETSY_API_KEY;

  if (!code || !returnedState || !transactionCookie || !keystring || !sharedSecret || !redirectUri) {
    return NextResponse.json({ error: 'OAuth response or server configuration is incomplete.' }, { status: 400 });
  }

  let transaction: { state: string; verifier: string };
  try {
    transaction = JSON.parse(transactionCookie);
  } catch {
    return NextResponse.json({ error: 'OAuth transaction is invalid or expired.' }, { status: 400 });
  }

  if (!safeEqual(returnedState, transaction.state)) {
    const response = NextResponse.json({ error: 'OAuth state did not match.' }, { status: 400 });
    response.cookies.delete(COOKIE);
    return response;
  }

  const apiKey = rawApiKey || `${keystring}:${sharedSecret}`;
  const tokenResponse = await fetch(TOKEN_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'x-api-key': apiKey },
    body: new URLSearchParams({
      grant_type: 'authorization_code', client_id: keystring, redirect_uri: redirectUri, code, code_verifier: transaction.verifier,
    }),
    cache: 'no-store',
  });

  const tokenBody = await tokenResponse.json().catch(() => ({}));
  if (!tokenResponse.ok) {
    console.error('Etsy token exchange failed:', tokenResponse.status);
    const response = NextResponse.json({ error: 'Etsy token exchange failed. Check server configuration and app approval.' }, { status: 502 });
    response.cookies.delete(COOKIE);
    return response;
  }

  const accessToken = typeof tokenBody.access_token === 'string' ? tokenBody.access_token : '';
  const shopIdMatch = accessToken.match(/^([0-9]+)\./);
  const refreshToken = typeof tokenBody.refresh_token === 'string' ? tokenBody.refresh_token : '';
  if (!accessToken || !shopIdMatch || !refreshToken) {
    const response = NextResponse.json({ error: 'Etsy returned an unexpected token response.' }, { status: 502 });
    response.cookies.delete(COOKIE);
    return response;
  }

  const shopId = shopIdMatch[1];
  const shopResponse = await fetch(`https://openapi.etsy.com/v3/application/shops/${shopId}`, {
    headers: { 'x-api-key': apiKey, Authorization: `Bearer ${accessToken}` }, cache: 'no-store',
  });
  if (!shopResponse.ok) {
    console.error('Etsy shop verification failed:', shopResponse.status);
    const response = NextResponse.json({ error: 'OAuth completed, but Etsy shop access could not be verified.' }, { status: 502 });
    response.cookies.delete(COOKIE);
    return response;
  }

  try {
    await saveTokens({
      access_token: accessToken,
      refresh_token: refreshToken,
      expires_in: Number(tokenBody.expires_in) || 3600,
      obtained_at: Date.now(),
      shop_id: shopId,
      scopes: ['listings_r', 'listings_w', 'shops_r'],
    });
  } catch (e) {
    console.error('Etsy token persistence failed:', e instanceof Error ? e.message : 'unknown error');
    const response = NextResponse.json({ error: 'Shop access was verified, but secure token storage failed. Do not consider the connection complete.' }, { status: 503 });
    response.cookies.delete(COOKIE);
    return response;
  }

  const shop = await shopResponse.json().catch(() => ({}));
  const response = NextResponse.json({
    authorized: true,
    shopId,
    shopName: typeof shop.shop_name === 'string' ? shop.shop_name : null,
    message: 'Etsy shop access verified and OAuth tokens saved securely.',
  });
  response.cookies.delete(COOKIE);
  return response;
}
