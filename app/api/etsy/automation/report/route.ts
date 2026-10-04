import { get, put } from '@vercel/blob';
import { NextRequest, NextResponse } from 'next/server';
import { buildPerformanceReport, ListingHistoryItem } from '@/lib/etsy/automation';

export const runtime = 'nodejs';
const TOKEN_PATH = 'private/etsy/oauth-token.json';
const HISTORY_PATH = 'private/etsy/publish-history.json';
const ADS_PATH = 'private/etsy/ads-state.json';
const ETSY_API_BASE = 'https://openapi.etsy.com/v3/application';
const PAGE_SIZE = 100;

type EtsyToken = { access_token: string; refresh_token?: string; expires_at?: number; scope?: string[] };
type EtsyMoney = { amount?: number; divisor?: number; currency_code?: string };
type EtsyTransaction = { listing_id?: number; quantity?: number; price?: EtsyMoney; variations?: unknown[] };
type EtsyReceipt = { receipt_id: number; status?: string; transactions?: EtsyTransaction[] };
type EtsyListing = { listing_id: number; title?: string; state?: string; num_favorers?: number; quantity?: number; price?: EtsyMoney };
type EtsyPage<T> = { count?: number; results?: T[] };
type PageResult<T> = { rows: T[]; incomplete: boolean; error?: string };
type MoneyTotals = Record<string, number>;

function authHeader(token: EtsyToken) {
  return { 'x-api-key': process.env.ETSY_KEYSTRING || '', Authorization: `Bearer ${token.access_token}` };
}

async function loadJson<T>(path: string, fallback: T): Promise<T> {
  const { blobs } = await list({ prefix: path, limit: 1 });
  if (!blobs.length) return fallback;
  const response = await fetch(blobs[0]!.downloadUrl);
  if (!response.ok) return fallback;
  return await response.json() as T;
}

function unauthorized() {
  return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
}

function addMoney(totals: MoneyTotals, money?: { amount?: number; divisor?: number; currency_code?: string }) {
  if (!money || typeof money.amount !== "number" || !Number.isFinite(money.amount) || typeof money.divisor !== "number" || !Number.isFinite(money.divisor) || !money.divisor || !money.currency_code) return;
  totals[money.currency_code] = (totals[money.currency_code] || 0) + money.amount / money.divisor;
}

async function fetchAllPages<T>(url: string, headers: HeadersInit): Promise<PageResult<T>> {
  const rows: T[] = [];
  let offset = 0;
  let expectedCount: number | null = null;
  try {
    while (true) {
      const separator = url.includes('?') ? '&' : '?';
      const response = await fetch(`${url}${separator}limit=${PAGE_SIZE}&offset=${offset}`, { headers, cache: 'no-store' });
      if (!response.ok) {
        const details = await response.text();
        return { rows, incomplete: true, error: `Etsy API returned ${response.status}: ${details.slice(0, 300)}` };
      }
      const page = await response.json() as EtsyPage<T>;
      const pageRows = Array.isArray(page.results) ? page.results : [];
      if (typeof page.count === 'number' && Number.isFinite(page.count)) expectedCount = page.count;
      rows.push(...pageRows);
      if (!pageRows.length || pageRows.length < PAGE_SIZE) break;
      offset += pageRows.length;
    }
  } catch (error) {
    return { rows, incomplete: true, error: error instanceof Error ? error.message : 'Etsy API request failed' };
  }
  return { rows, incomplete: expectedCount !== null && rows.length < expectedCount };
}

async function list(params?: Record<string, string | number>) {
  if (!process.env.ETSY_BLOB_READ_WRITE_TOKEN) throw new Error('ETSY_BLOB_READ_WRITE_TOKEN is not configured');
  const { blobs } = await import('@vercel/blob').then(({ list: listBlobs }) => listBlobs({ prefix: '', limit: 1000 }));
  return { blobs };
}

export async function GET(request: NextRequest) {
  const secret = process.env.ETSY_AUTOMATION_SECRET;
  if (!secret || request.headers.get('authorization') !== `Bearer ${secret}`) return unauthorized();
  if (!process.env.ETSY_KEYSTRING) return NextResponse.json({ error: 'ETSY_KEYSTRING is not configured' }, { status: 503 });
  const token = await loadJson<EtsyToken | null>(TOKEN_PATH, null);
  if (!token) return NextResponse.json({ error: 'Etsy OAuth connection not found' }, { status: 503 });
  if (token.expires_at && token.expires_at <= Date.now()) return NextResponse.json({ error: 'Etsy access token expired; reconnect Etsy' }, { status: 401 });
  const shopId = process.env.ETSY_SHOP_ID;
  if (!shopId) return NextResponse.json({ error: 'ETSY_SHOP_ID is not configured' }, { status: 503 });
  const headers = authHeader(token);
  const [listingPages, receiptPages] = await Promise.all([
    fetchAllPages<EtsyListing>(`${ETSY_API_BASE}/shops/${shopId}/listings/active`, headers),
    fetchAllPages<EtsyReceipt>(`${ETSY_API_BASE}/shops/${shopId}/receipts`, headers),
  ]);
  const listingRows = listingPages.rows;
  const dataGaps: string[] = [];
  if (listingPages.error) dataGaps.push(listingPages.error);
  if (receiptPages.error) dataGaps.push(receiptPages.error);
  if (listingPages.incomplete) dataGaps.push('Active listing pagination was incomplete');
  if (receiptPages.incomplete) dataGaps.push('Receipt pagination was incomplete');
  const failedListings = 0;
  const listingMetrics = new Map<number, { paidOrderCount: number; transactionCount: number; unitsSold: number; grossByCurrency: MoneyTotals }>();
  const shopRevenueByCurrency: MoneyTotals = {};
  const shopRefundsByCurrency: MoneyTotals = {};
  const receipts = receiptPages.rows;
  for (const receipt of receipts) {
    if (receipt.status === 'Canceled' || receipt.status === 'Cancelled' || receipt.status === 'Fully Refunded') continue;
    for (const transaction of receipt.transactions || []) {
      const listingId = transaction.listing_id;
      if (!listingId) continue;
      const metrics = listingMetrics.get(listingId) || { paidOrderCount: 0, transactionCount: 0, unitsSold: 0, grossByCurrency: {} };
      metrics.transactionCount++;
      metrics.unitsSold += transaction.quantity || 1;
      addMoney(metrics.grossByCurrency, transaction.price);
      addMoney(shopRevenueByCurrency, transaction.price);
      listingMetrics.set(listingId, metrics);
    }
  }
  const history = await loadJson<ListingHistoryItem[]>(HISTORY_PATH, []);
  const listings = listingRows.map((listing) => {
    const metrics = listingMetrics.get(listing.listing_id);
    const currencies = Object.keys(metrics?.grossByCurrency || {});
    const singleCurrency = currencies[0];
    return {
      listing_id: listing.listing_id,
      title: listing.title || `Listing ${listing.listing_id}`,
      state: listing.state,
      num_favorers: listing.num_favorers || 0,
      quantity: listing.quantity,
      price: listing.price,
      paidOrderCount: metrics?.paidOrderCount || 0,
      transactionCount: metrics?.transactionCount || 0,
      unitsSold: metrics?.unitsSold || 0,
      grossRevenue: singleCurrency && currencies.length === 1 ? metrics?.grossByCurrency[singleCurrency] ?? null : null,
      revenueByCurrency: metrics?.grossByCurrency || {},
      revenueCurrency: currencies.length === 1 ? currencies[0] : currencies.length > 1 ? 'mixed' : null,
    };
  });
  const now = Date.now();
  const report = buildPerformanceReport(listings, history, now - 30 * 86400000, now);
  return NextResponse.json({ ...report, dataComplete: failedListings === 0 && !listingPages.incomplete && !receiptPages.incomplete, dataGaps, shopPaidOrderCount: 0, shopRevenueByCurrency, shopRefundsByCurrency, ads: await loadJson(ADS_PATH, {}), notes: [
    'Etsy API listing favorites and order totals are cumulative listing totals; daily/weekly/monthly performance deltas require stored snapshots.',
    'Gross revenue is calculated from paid receipt transactions and does not include fees, taxes, shipping, or payout adjustments.',
    'Etsy Ads reporting and budget mutation are not implemented by this route.',
    'Listing history only includes changes recorded by this application.',
  ] });
}
