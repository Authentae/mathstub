import { get, put } from '@vercel/blob';
import { NextRequest, NextResponse } from 'next/server';
import { buildPerformanceReport, ListingHistoryItem } from '@/lib/etsy/automation';

export const runtime = 'nodejs';
const TOKEN_PATH = 'private/etsy/shop-oauth.json';
const HISTORY_PATH = 'private/etsy/publish-history.json';
const TOKEN_URL = 'https://api.etsy.com/v3/public/oauth/token';

type TokenRecord = { access_token: string; refresh_token: string; expires_in: number; obtained_at: number; shop_id: string; scopes?: string[] };

async function getFreshToken(): Promise<TokenRecord | null> {
  const tokenBlob = await get(TOKEN_PATH, { access: 'private', useCache: false });
  if (!tokenBlob || tokenBlob.statusCode !== 200) return null;
  let token = JSON.parse(await new Response(tokenBlob.stream).text()) as TokenRecord;
  if (token.obtained_at + token.expires_in * 1000 < Date.now() + 60_000) {
    const key = process.env.ETSY_KEYSTRING;
    const secret = process.env.ETSY_SHARED_SECRET;
    if (!key || !secret) throw new Error('Etsy app credentials are not configured');
    const response = await fetch(TOKEN_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'x-api-key': process.env.ETSY_API_KEY || `${key}:${secret}` },
      body: new URLSearchParams({ grant_type: 'refresh_token', client_id: key, refresh_token: token.refresh_token }),
      cache: 'no-store',
    });
    const body = await response.json().catch(() => ({}));
    if (!response.ok || typeof body.access_token !== 'string' || typeof body.refresh_token !== 'string') throw new Error('Etsy refresh failed');
    token = { ...token, access_token: body.access_token, refresh_token: body.refresh_token, expires_in: Number(body.expires_in) || 3600, obtained_at: Date.now() };
    await put(TOKEN_PATH, JSON.stringify(token), { access: 'private', addRandomSuffix: false, allowOverwrite: true, contentType: 'application/json', cacheControlMaxAge: 0 });
  }
  return token;
}

function authorized(request: NextRequest) {
  const expected = process.env.ETSY_STATUS_SECRET;
  const supplied = request.headers.get('authorization')?.replace(/^Bearer\\s+/i, '') || '';
  return !!expected && !!supplied && supplied.length === expected.length && Buffer.from(supplied).equals(Buffer.from(expected));
}

export async function GET(request: NextRequest) {
  if (!authorized(request)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401, headers: { 'Cache-Control': 'no-store' } });
  const period = request.nextUrl.searchParams.get('period');
  if (period !== 'daily' && period !== 'weekly' && period !== 'monthly') {
    return NextResponse.json({ error: 'period must be daily, weekly, or monthly.' }, { status: 400 });
  }
  try {
    const [token, historyBlob] = await Promise.all([
      getFreshToken(),
      get(HISTORY_PATH, { access: 'private', useCache: false }),
    ]);
    const history: ListingHistoryItem[] = historyBlob?.statusCode === 200
      ? JSON.parse(await new Response(historyBlob.stream).text())
      : [];
    if (!token) return NextResponse.json({ error: 'Etsy shop is not connected.' }, { status: 409 });

    const start = new Date();
    if (period === 'daily') start.setUTCHours(0, 0, 0, 0);
    if (period === 'weekly') {
      start.setUTCHours(0, 0, 0, 0);
      start.setUTCDate(start.getUTCDate() - ((start.getUTCDay() + 6) % 7));
    }
    if (period === 'monthly') {
      start.setUTCHours(0, 0, 0, 0);
      start.setUTCDate(1);
    }
    const accessToken = token.access_token;
    if (!accessToken || !token.shop_id) return NextResponse.json({ error: 'Stored Etsy authorization is invalid.' }, { status: 503 });
    const key = process.env.ETSY_KEYSTRING;
    const secret = process.env.ETSY_SHARED_SECRET;
    if (!key || !secret) return NextResponse.json({ error: 'Etsy app credentials are not configured.' }, { status: 503 });
    const authHeaders = { 'x-api-key': process.env.ETSY_API_KEY || `${key}:${secret}`, Authorization: `Bearer ${accessToken}` };
    const minCreated = Math.floor(start.getTime() / 1000);
    const [listingsResponse, receiptsResponse] = await Promise.all([
      fetch(`https://openapi.etsy.com/v3/application/shops/${token.shop_id}/listings/active?limit=100`, { headers: authHeaders, cache: 'no-store' }),
      fetch(`https://openapi.etsy.com/v3/application/shops/${token.shop_id}/receipts?min_created=${minCreated}&limit=100`, { headers: authHeaders, cache: 'no-store' }),
    ]);
    const [listingsBody, receiptsBody] = await Promise.all([
      listingsResponse.json().catch(() => ({})),
      receiptsResponse.json().catch(() => ({})),
    ]);
    if (!listingsResponse.ok || !receiptsResponse.ok) {
      const failedStatus = !listingsResponse.ok ? listingsResponse.status : receiptsResponse.status;
      return NextResponse.json({ error: 'Could not read Etsy listing or order performance data.', etsyStatus: failedStatus }, { status: failedStatus, headers: { 'Cache-Control': 'no-store' } });
    }
    const listingRows = Array.isArray(listingsBody.results) ? listingsBody.results : [];
    const receipts = Array.isArray(receiptsBody.results) ? receiptsBody.results : [];
    const ordersByListing = new Map<string, { orders: number; units: number; revenue: number; currency: string | null }>();
    const shopRevenueByCurrency: Record<string, number> = {};
    let shopOrderCount = 0;
    for (const receipt of receipts as Array<{ transactions?: Array<{ listing_id?: number | string | null; quantity?: number; price?: { amount?: number; divisor?: number; currency_code?: string } }> }>) {
      const transactions = Array.isArray(receipt.transactions) ? receipt.transactions : [];
      if (!transactions.length) continue;
      shopOrderCount += 1;
      for (const transaction of transactions) {
        if (transaction.listing_id == null) continue;
        const listingId = String(transaction.listing_id);
        const existing = ordersByListing.get(listingId) || { orders: 0, units: 0, revenue: 0, currency: null };
        const quantity = Number(transaction.quantity) || 0;
        const currency = transaction.price?.currency_code || null;
        const revenue = (Number(transaction.price?.amount) || 0) / (Number(transaction.price?.divisor) || 1) * quantity;
        existing.orders += 1;
        existing.units += quantity;
        existing.revenue += revenue;
        existing.currency = currency || existing.currency;
        ordersByListing.set(listingId, existing);
        if (currency) shopRevenueByCurrency[currency] = (shopRevenueByCurrency[currency] || 0) + revenue;
      }
    }
    const enrichedListings = listingRows.map((listing: { listing_id?: number | string; [key: string]: unknown }) => {
      const stats = listing.listing_id == null ? undefined : ordersByListing.get(String(listing.listing_id));
      return { ...listing, orderCount: stats?.orders || 0, unitsSold: stats?.units || 0, attributedRevenue: stats?.revenue || 0, revenueCurrency: stats?.currency || null };
    });
    const now = new Date();
    const publishedInPeriod = history.filter((item) => Date.parse(item.createdAt) >= start.getTime() && Date.parse(item.createdAt) <= now.getTime());
    return NextResponse.json({
      ...buildPerformanceReport(enrichedListings, period, now),
      window: { start: start.toISOString(), end: now.toISOString() },
      publishedInPeriod,
      shopOrderCount,
      shopRevenueByCurrency,
      dataGaps: ['Listing views, favorites, ad impressions, ad spend, and ad-attributed orders are not included. Etsy receipt retrieval is limited to the first 100 results and may undercount high-volume periods. Revenue is attributed by listing using transaction price × quantity, grouped by currency; shipping, tax, refunds, and cancellations are not subtracted.'],
    }, { headers: { 'Cache-Control': 'no-store' } });
  } catch (error) {
    console.error('Etsy report failed:', error instanceof Error ? error.message : 'unknown error');
    return NextResponse.json({ error: 'Could not build Etsy report.' }, { status: 503, headers: { 'Cache-Control': 'no-store' } });
  }
}
