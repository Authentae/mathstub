import { get, put } from '@vercel/blob';
import { NextRequest, NextResponse } from 'next/server';
import { buildPerformanceReport, ListingHistoryItem } from '@/lib/etsy/automation';

export const runtime = 'nodejs';
const TOKEN_PATH = 'private/etsy/shop-oauth.json';
const HISTORY_PATH = 'private/etsy/publish-history.json';
const ADS_PATH = 'private/etsy/ads-state.json';
const SNAPSHOT_PREFIX = 'private/etsy/performance-snapshots';
const PAGE_SIZE = 100;
const MAX_RECORDS_PER_RESOURCE = 5000;
const MAX_SNAPSHOTS = 400;

interface EtsyPage<T> {
  count: number;
  results: T[];
}

interface EtsyListing {
  listing_id: number;
  title?: string;
  state?: string;
  num_favorers?: number;
}

interface PerformanceSnapshot {
  capturedAt: string;
  listings: Array<{ listingId: number; favorites: number | null }>;
}

interface EtsyReceipt {
  receipt_id: number;
  status?: string;
  is_paid?: boolean;
  transactions?: Array<{
    listing_id: number;
    quantity?: number;
    price?: { amount?: number; divisor?: number; currency_code?: string };
  }>;
  refunds?: Array<{ amount?: { amount?: number; divisor?: number; currency_code?: string } }>;
}

interface EtsyToken {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  obtained_at: number;
  shop_id: string;
  scopes: string[];
}

type MoneyTotals = Record<string, number>;

function unauthorized() {
  return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
}

function addMoney(totals: MoneyTotals, money?: { amount?: number; divisor?: number; currency_code?: string }) {
  if (!money || typeof money.amount !== "number" || !Number.isFinite(money.amount) || typeof money.divisor !== "number" || !Number.isFinite(money.divisor) || !money.divisor || !money.currency_code) return;
  totals[money.currency_code] = (totals[money.currency_code] || 0) + money.amount / money.divisor;
}

function isPaidReceipt(receipt: EtsyReceipt) {
  if (receipt.is_paid !== true) return false;
  return !['canceled', 'cancelled', 'fully refunded', 'fully_refunded'].includes((receipt.status || '').toLowerCase());
}

async function loadJson<T>(path: string, fallback: T): Promise<T> {
  const result = await get(path, { access: 'private', useCache: false });
  if (!result || result.statusCode !== 200) return fallback;
  return JSON.parse(await new Response(result.stream).text()) as T;
}

async function fetchAllPages<T>(url: string, token: string): Promise<{ rows: T[]; incomplete: boolean; error?: string }> {
  const rows: T[] = [];
  const baseUrl = new URL(url);
  const expectedTotal = Number(baseUrl.searchParams.get('expected_total') || 0);
  baseUrl.searchParams.delete('expected_total');

  for (let offset = 0; offset < MAX_RECORDS_PER_RESOURCE; offset += PAGE_SIZE) {
    const pageUrl = new URL(baseUrl);
    pageUrl.searchParams.set('limit', String(PAGE_SIZE));
    pageUrl.searchParams.set('offset', String(offset));
    let response: Response;
    try {
      response = await fetch(pageUrl, { headers: { 'x-api-key': process.env.ETSY_KEYSTRING!, Authorization: `Bearer ${token}` }, cache: 'no-store' });
    } catch {
      return { rows, incomplete: true, error: 'Etsy pagination network request failed' };
    }
    if (!response.ok) return { rows, incomplete: true, error: `Etsy pagination request failed (${response.status})` };

    let page: EtsyPage<T>;
    try {
      page = await response.json() as EtsyPage<T>;
    } catch {
      return { rows, incomplete: true, error: 'Etsy returned invalid JSON for a paginated response' };
    }
    if (!Array.isArray(page.results) || !Number.isFinite(page.count)) return { rows, incomplete: true, error: 'Etsy returned a malformed paginated response' };
    rows.push(...page.results.slice(0, MAX_RECORDS_PER_RESOURCE - rows.length));
    if (offset + page.results.length >= page.count || page.results.length < PAGE_SIZE) {
      return { rows, incomplete: false };
    }
  }

  return { rows, incomplete: expectedTotal > MAX_RECORDS_PER_RESOURCE || rows.length >= MAX_RECORDS_PER_RESOURCE, error: 'Pagination stopped at the safety ceiling' };
}

async function fetchAdsState() {
  // Etsy does not expose ads-performance metrics through the supported application endpoints used here.
  // Return locally tracked state only; never imply that Etsy confirmed an ads setting.
  try {
    return await loadJson<{ dailyLimitUsd?: number; updatedAt?: string }>(ADS_PATH, {});
  } catch {
    return {};
  }
}

function isPerformanceSnapshot(value: unknown): value is PerformanceSnapshot {
  if (!value || typeof value !== 'object') return false;
  const snapshot = value as Partial<PerformanceSnapshot>;
  return typeof snapshot.capturedAt === 'string'
    && Number.isFinite(Date.parse(snapshot.capturedAt))
    && Array.isArray(snapshot.listings)
    && snapshot.listings.every((listing) => listing
      && Number.isInteger(listing.listingId)
      && (listing.favorites === null || (Number.isInteger(listing.favorites) && listing.favorites >= 0)));
}

async function savePerformanceSnapshot(snapshot: PerformanceSnapshot) {
  const path = `${SNAPSHOT_PREFIX}.json`;
  const previous = await loadJson<PerformanceSnapshot[]>(path, []);
  const valid = Array.isArray(previous) ? previous.filter(isPerformanceSnapshot) : [];
  const day = snapshot.capturedAt.slice(0, 10);
  const next = valid.filter((item) => item.capturedAt.slice(0, 10) !== day);
  next.push(snapshot);
  next.sort((left, right) => Date.parse(left.capturedAt) - Date.parse(right.capturedAt));
  await put(path, JSON.stringify(next.slice(-MAX_SNAPSHOTS)), {
    access: 'private',
    contentType: 'application/json',
    allowOverwrite: true,
  });
  return valid;
}

export async function GET(request: NextRequest) {
  const secret = process.env.ETSY_STATUS_SECRET;
  const supplied = request.headers.get('authorization')?.replace(/^Bearer\s+/i, '') || request.nextUrl.searchParams.get('secret');
  if (!secret || !supplied || supplied !== secret) return unauthorized();

  try {
    const token = await loadJson<EtsyToken | null>(TOKEN_PATH, null);
    if (!token?.access_token || !token.shop_id) return NextResponse.json({ error: 'Shop OAuth connection not found' }, { status: 503 });
    if (!process.env.ETSY_KEYSTRING) return NextResponse.json({ error: 'Etsy API key configuration is missing' }, { status: 503 });

    const now = Date.now();
    const period = request.nextUrl.searchParams.get('period') || 'weekly';
    const rangeDays = period === 'daily' ? 1 : period === 'monthly' ? 30 : 7;
    const minCreated = Math.floor(now / 1000) - rangeDays * 24 * 60 * 60;
    const shopId = encodeURIComponent(token.shop_id);
    const base = 'https://openapi.etsy.com/v3/application';

    const states = ['active', 'inactive', 'sold_out', 'draft', 'expired', 'incomplete'];
    const listingPages = await Promise.all(states.map((state) => fetchAllPages<EtsyListing>(
      `${base}/shops/${shopId}/listings?state=${state}`, token.access_token,
    )));
    const listings = listingPages.flatMap((page) => page.rows);
    const receiptPages = await fetchAllPages<EtsyReceipt>(
      `${base}/shops/${shopId}/receipts?min_created=${minCreated}`, token.access_token,
    );
    const dataGaps: string[] = [];
    const failedListingPages = listingPages.filter((page) => page.error);
    const failedListings = failedListingPages.length;
    if (failedListings) {
      dataGaps.push(`${failedListings} listing state page(s) could not be fully retrieved`);
    }
    if (receiptPages.error) {
      dataGaps.push('Order performance data could not be fully retrieved');
    }
    const dataComplete = failedListings === 0 && !receiptPages.error && !listingPages.some((page) => page.incomplete) && !receiptPages.incomplete;
    if (!dataComplete && !dataGaps.length) dataGaps.push('One or more Etsy result sets are incomplete');
    if (receiptPages.error) {
      return NextResponse.json({ error: `Etsy order performance data could not be retrieved: ${receiptPages.error}`, dataComplete: false }, { status: receiptPages.error.includes('(403)') ? 403 : 502 });
    }
    const failedListingPage = listingPages.find((page) => page.error);
    if (failedListingPage?.error) {
      return NextResponse.json({ error: failedListingPage.error, dataComplete: false }, { status: 502 });
    }
    const incompletePage = [...listingPages, receiptPages].find((page) => page.incomplete && page.error);
    if (incompletePage?.error) {
      return NextResponse.json({ error: incompletePage.error, dataComplete: false }, { status: 502 });
    }
    const receipts = receiptPages.rows;
    const history = await loadJson<ListingHistoryItem[]>(HISTORY_PATH, []);
    const adsState = await fetchAdsState();

    const listingMetrics = new Map<number, {
      paidOrderCount: number;
      transactionCount: number;
      unitsSold: number;
      grossByCurrency: MoneyTotals;
      refundsByCurrency: MoneyTotals;
    }>();
    const shopRevenueByCurrency: MoneyTotals = {};
    const shopRefundsByCurrency: MoneyTotals = {};
    let shopPaidOrderCount = 0;
    let excludedReceiptCount = 0;

    for (const receipt of receipts) {
      if (!isPaidReceipt(receipt)) {
        excludedReceiptCount++;
        continue;
      }
      shopPaidOrderCount++;
      for (const transaction of receipt.transactions || []) {
        const amount = transaction.price && typeof transaction.price.amount === "number" && Number.isFinite(transaction.price.amount) && typeof transaction.price.divisor === "number" && Number.isFinite(transaction.price.divisor) && transaction.price.divisor
          ? (transaction.price.amount / transaction.price.divisor) * (transaction.quantity || 1)
          : 0;
        const currency = transaction.price?.currency_code;
        if (currency && amount) shopRevenueByCurrency[currency] = (shopRevenueByCurrency[currency] || 0) + amount;
        const metrics = listingMetrics.get(transaction.listing_id) || { paidOrderCount: 0, transactionCount: 0, unitsSold: 0, grossByCurrency: {}, refundsByCurrency: {} };
        metrics.paidOrderCount++;
        metrics.transactionCount++;
        metrics.unitsSold += transaction.quantity || 1;
        if (currency && amount) metrics.grossByCurrency[currency] = (metrics.grossByCurrency[currency] || 0) + amount;
        listingMetrics.set(transaction.listing_id, metrics);
      }
      for (const refund of receipt.refunds || []) {
        addMoney(shopRefundsByCurrency, refund.amount);
      }
    }

    const filteredHistory = history.filter((item) => item.createdAt && new Date(item.createdAt).getTime() >= now - rangeDays * 24 * 60 * 60 * 1000);
    const currentSnapshot: PerformanceSnapshot = {
      capturedAt: new Date(now).toISOString(),
      listings: listings.map((listing) => ({
        listingId: listing.listing_id,
        favorites: Number.isInteger(listing.num_favorers) && (listing.num_favorers || 0) >= 0 ? listing.num_favorers! : null,
      })),
    };
    const previousSnapshots = await savePerformanceSnapshot(currentSnapshot);
    const baselineSnapshot = previousSnapshots
      .filter((snapshot) => Date.parse(snapshot.capturedAt) <= minCreated * 1000)
      .sort((left, right) => Date.parse(right.capturedAt) - Date.parse(left.capturedAt))[0];
    const baselineFavorites = new Map((baselineSnapshot?.listings || []).map((item) => [item.listingId, item.favorites]));
    const reportListings = listings.map((listing) => {
      const metrics = listingMetrics.get(listing.listing_id);
      const historyItem = history.find((item) => item.listingId === listing.listing_id);
      const currencies = Object.keys(metrics?.grossByCurrency || {});
      const singleCurrency = currencies[0];
      return {
        listing_id: listing.listing_id,
        title: listing.title || historyItem?.title || `Listing ${listing.listing_id}`,
        state: listing.state || 'unknown',
        listingFavorites: Number.isFinite(listing.num_favorers) ? listing.num_favorers : null,
        listingFavoritesChange: Number.isFinite(listing.num_favorers) && baselineFavorites.get(listing.listing_id) !== null && baselineFavorites.get(listing.listing_id) !== undefined
          ? listing.num_favorers! - baselineFavorites.get(listing.listing_id)!
          : null,
        paidOrderCount: metrics?.paidOrderCount || 0,
        transactionCount: metrics?.transactionCount || 0,
        unitsSold: metrics?.unitsSold || 0,
        grossRevenue: singleCurrency && currencies.length === 1 ? metrics?.grossByCurrency[singleCurrency] ?? null : null,
        revenueByCurrency: metrics?.grossByCurrency || {},
        revenueCurrency: currencies.length === 1 ? currencies[0] : currencies.length > 1 ? 'mixed' : null,
      };
    });

    for (const currency of Object.keys(shopRefundsByCurrency)) {
      const refunded = shopRefundsByCurrency[currency] || 0;
      const gross = shopRevenueByCurrency[currency] || 0;
      shopRefundsByCurrency[currency] = Math.min(refunded, gross);
    }
    const shopNetRevenueByCurrency = Object.fromEntries(Object.entries(shopRevenueByCurrency).map(([currency, gross]) => [currency, gross - (shopRefundsByCurrency[currency] || 0)]));
    const report = buildPerformanceReport(reportListings, filteredHistory, minCreated * 1000, now);

    return NextResponse.json({
      report,
      period,
      rangeDays,
      generatedAt: new Date(now).toISOString(),
      dataComplete,
      dataGaps: [
        ...dataGaps,
        ...(baselineSnapshot ? [] : ['Listing favorite changes are unavailable for this period because no earlier snapshot exists at or before its start.']),
        'Listing favorite changes compare the current cumulative Etsy favorite count with the latest stored snapshot at or before the report start; the baseline timestamp is included.',
        'Gross revenue is calculated from paid receipt transactions and does not include fees, taxes, shipping, or payout adjustments.',
        'Etsy Ads reporting and budget mutation are not implemented by this route.',
        'Listing history only includes changes recorded by this application.',
      ],
      shopListingCount: reportListings.length,
      favoritesBaselineAt: baselineSnapshot?.capturedAt ?? null,
      favoritesSnapshotAt: currentSnapshot.capturedAt,
      shopPaidOrderCount,
      excludedReceiptCount,
      shopRevenueByCurrency,
      shopRefundsByCurrency,
      shopNetRevenueByCurrency,
      ads: {
        dailyLimitUsd: adsState.dailyLimitUsd ?? null,
        lastUpdated: adsState.updatedAt ?? null,
        confirmedByEtsy: false,
      },
      listings: reportListings,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown report failure';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
