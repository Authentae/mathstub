import { createHmac, timingSafeEqual } from 'node:crypto';
import { put } from '@vercel/blob';
import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';
const COOKIE = 'etsy_oauth_transaction';
const TOKEN_URL = 'https://api.etsy.com/v3/public/oauth/token';
const TOKEN_BLOB_PATH = 'private/etsy/shop-oauth.json';
type Transaction = { state: string; verifier: string };
function mac(payload: string, secret: string) { return createHmac('sha256', secret).update(payload).digest('base64url'); }
function safeEqual(a: string, b: string) { const left = Buffer.from(a); const right = Buffer.from(b); return left.length === right.length && timingSafeEqual(left, right); }
function clearCookie(response: NextResponse) { response.cookies.delete(COOKIE); return response; }
function fail(message: string, status: number) { return clearCookie(NextResponse.json({ error: message }, { status, headers: { 'Cache-Control': 'no-store' } })); }
export async function GET(request: NextRequest) {
  const error = request.nextUrl.searchParams.get('error');
  if (error) return fail('Etsy authorization was declined or failed.', 400);
  const code = request.nextUrl.searchParams.get('code');
  const returnedState = request.nextUrl.searchParams.get('state');
  const cookie = request.cookies.get(COOKIE)?.value || '';
  const keystring = process.env.ETSY_KEYSTRING; const sharedSecret = process.env.ETSY_SHARED_SECRET; const redirectUri = process.env.ETSY_REDIRECT_URI;
  if (!code || !returnedState || !cookie || !keystring || !sharedSecret || !redirectUri) return fail('OAuth response or server configuration is incomplete.', 400);
  const separator = cookie.lastIndexOf('.');
  if (separator < 1) return fail('OAuth transaction is invalid or expired.', 400);
  const payload = cookie.slice(0, separator); const signature = cookie.slice(separator + 1);
  if (!safeEqual(signature, mac(payload, sharedSecret))) return fail('OAuth transaction is invalid or expired.', 400);
  let transaction: Transaction;
  try { transaction = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8')); } catch { return fail('OAuth transaction is invalid or expired.', 400); }
  if (!transaction || typeof transaction.state !== 'string' || typeof transaction.verifier !== 'string' || !/^[A-Za-z0-9_-]{43,128}$/.test(transaction.verifier) || !safeEqual(returnedState, transaction.state)) return fail('OAuth state did not match.', 400);
  const apiKey = process.env.ETSY_API_KEY || `${keystring}:${sharedSecret}`;
  let tokenResponse: Response;
  try { tokenResponse = await fetch(TOKEN_URL, { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'x-api-key': apiKey }, body: new URLSearchParams({ grant_type: 'authorization_code', client_id: keystring, redirect_uri: redirectUri, code, code_verifier: transaction.verifier }), cache: 'no-store' }); }
  catch { return fail('Etsy token exchange could not reach Etsy.', 502); }
  const tokenBody = await tokenResponse.json().catch(() => ({}));
  if (!tokenResponse.ok) { console.error('Etsy token exchange failed:', tokenResponse.status); return fail('Etsy token exchange failed. Check server configuration and app approval.', 502); }
  const accessToken = typeof tokenBody.access_token === 'string' ? tokenBody.access_token : ''; const shopIdMatch = accessToken.match(/^([0-9]+)\./); const refreshToken = typeof tokenBody.refresh_token === 'string' ? tokenBody.refresh_token : '';
  if (!accessToken || !shopIdMatch || !refreshToken) return fail('Etsy returned an unexpected token response.', 502);
  const shopId = shopIdMatch[1];
  let shopResponse: Response;
  try { shopResponse = await fetch(`https://openapi.etsy.com/v3/application/shops/${shopId}`, { headers: { 'x-api-key': apiKey, Authorization: `Bearer ${accessToken}` }, cache: 'no-store' }); }
  catch { return fail('Etsy shop access could not be verified.', 502); }
  if (!shopResponse.ok) { console.error('Etsy shop verification failed:', shopResponse.status); return fail('OAuth completed, but Etsy shop access could not be verified.', 502); }
  try {
    await put(TOKEN_BLOB_PATH, JSON.stringify({ access_token: accessToken, refresh_token: refreshToken, expires_in: Number(tokenBody.expires_in) || 3600, obtained_at: Date.now(), shop_id: shopId, scopes: ['listings_r', 'listings_w', 'shops_r'] }), { access: 'private', addRandomSuffix: false, allowOverwrite: true, contentType: 'application/json', cacheControlMaxAge: 0 });
  } catch (e) { console.error('Etsy token persistence failed:', e instanceof Error ? e.message : 'unknown error'); return fail('Shop access was verified, but secure token storage failed. Do not consider the connection complete.', 503); }
  const shop = await shopResponse.json().catch(() => ({}));
  return clearCookie(NextResponse.json({ authorized: true, shopId, shopName: typeof shop.shop_name === 'string' ? shop.shop_name : null, message: 'Etsy shop access verified and OAuth tokens saved in private storage.' }, { headers: { 'Cache-Control': 'no-store' } }));
}
