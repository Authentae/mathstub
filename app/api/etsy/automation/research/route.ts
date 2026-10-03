import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';

const ETSY_SEARCH_URL = 'https://openapi.etsy.com/v3/application/listings/active';
const MAX_KEYWORDS = 5;
const MAX_KEYWORD_LENGTH = 80;
const MAX_LIMIT = 50;
const DEFAULT_LIMIT = 20;
const MAX_PAGES = 5;
const PAGE_SIZE = 100;
const MIN_SAMPLE_SIZE = 5;

interface EtsyListing {
  listing_id: number;
  title: string;
  description?: string;
  price?: { amount?: number; divisor?: number; currency_code?: string };
  quantity?: number;
  num_favorers?: number;
  views?: number;
  url?: string;
  state?: string;
  creation_timestamp?: number;
}

interface EtsySearchPage {
  count?: number;
  results?: EtsyListing[];
}

function json(status: number, body: Record<string, unknown>) {
  return NextResponse.json(body, { status });
}

function bearerSecret(request: NextRequest) {
  const configured = process.env.ETSY_AUTOMATION_SECRET || process.env.ETSY_STATUS_SECRET;
  if (!configured) return { ok: false, status: 503, error: 'Research route authentication is not configured' };
  const supplied = request.headers.get('authorization')?.replace(/^Bearer\s+/i, '')
    || request.nextUrl.searchParams.get('secret');
  if (!supplied || supplied !== configured) return { ok: false, status: 401, error: 'Unauthorized' };
  return { ok: true as const };
}

function normalizeKeywords(value: string | null): string[] {
  if (!value) return [];
  return [...new Set(value.split(',').map((keyword) => keyword.trim().replace(/\s+/g, ' ')))]
    .filter((keyword) => keyword.length > 0 && keyword.length <= MAX_KEYWORD_LENGTH)
    .slice(0, MAX_KEYWORDS);
}

function safeListing(listing: EtsyListing) {
  const amount = listing.price?.amount;
  const divisor = listing.price?.divisor;
  return {
    listingId: listing.listing_id,
    title: listing.title,
    price: Number.isFinite(amount) && Number.isFinite(divisor) && divisor
      ? amount! / divisor! : null,
    currency: listing.price?.currency_code || null,
    quantity: Number.isFinite(listing.quantity) ? listing.quantity : null,
    favorites: Number.isFinite(listing.num_favorers) ? listing.num_favorers : null,
    views: Number.isFinite(listing.views) ? listing.views : null,
    url: listing.url || null,
    createdAt: Number.isFinite(listing.creation_timestamp) ? new Date(listing.creation_timestamp! * 1000).toISOString() : null,
  };
}

function summarize(listings: EtsyListing[]) {
  const unique = [...new Map(listings.map((listing) => [listing.listing_id, listing])).values()];
  const prices = unique.map((listing) => {
    const amount = listing.price?.amount;
    const divisor = listing.price?.divisor;
    return Number.isFinite(amount) && Number.isFinite(divisor) && divisor ? amount! / divisor! : null;
  }).filter((price): price is number => price !== null);
  const favorites = unique.map((listing) => listing.num_favorers).filter((n): n is number => Number.isFinite(n));
  const sortedPrices = [...prices].sort((a, b) => a - b);
  return {
    catalogMatches: unique.length,
    sampledPriceCount: prices.length,
    medianObservedPrice: sortedPrices.length
      ? sortedPrices[Math.floor(sortedPrices.length / 2)] : null,
    medianCumulativeFavorites: favorites.length
      ? [...favorites].sort((a, b) => a - b)[Math.floor(favorites.length / 2)] : null,
    sampleIsSmall: unique.length < MIN_SAMPLE_SIZE,
    warning: unique.length < MIN_SAMPLE_SIZE
      ? 'Small catalog sample: do not treat favorites as a reliable demand estimate.'
      : 'Catalog matches and cumulative favorites are listing signals, not search volume, sales velocity, or proof of demand.',
    examples: unique.slice(0, 10).map(safeListing),
  };
}

async function searchKeyword(keyword: string, apiKey: string, limit: number) {
  const rows: EtsyListing[] = [];
  let total = 0;
  for (let pageIndex = 0; pageIndex < MAX_PAGES; pageIndex++) {
    const url = new URL(ETSY_SEARCH_URL);
    url.searchParams.set('keywords', keyword);
    url.searchParams.set('limit', String(PAGE_SIZE));
    url.searchParams.set('offset', String(pageIndex * PAGE_SIZE));
    const response = await fetch(url, { headers: { 'x-api-key': apiKey }, cache: 'no-store' });
    if (!response.ok) throw new Error(`Etsy catalog search failed (${response.status})`);
    const payload = await response.json() as EtsySearchPage;
    if (!Array.isArray(payload.results) || !Number.isFinite(payload.count)) {
      throw new Error('Etsy returned an invalid catalog-search page');
    }
    total = payload.count!;
    rows.push(...payload.results);
    if (rows.length >= total || payload.results.length < PAGE_SIZE) break;
  }
  const sliced = rows.slice(0, limit);
  return {
    keyword,
    observedAt: new Date().toISOString(),
    pagesRead: Math.min(Math.ceil(rows.length / PAGE_SIZE), MAX_PAGES),
    sampledListings: sliced.length,
    catalogTotal: total,
    cappedByPageLimit: rows.length < total && rows.length >= MAX_PAGES * PAGE_SIZE,
    ...summarize(sliced),
  };
}

export async function GET(request: NextRequest) {
  const auth = bearerSecret(request);
  if (!auth.ok) return json(auth.status, { error: auth.error });
  const apiKey = process.env.ETSY_KEYSTRING;
  if (!apiKey) return json(503, { error: 'ETSY_KEYSTRING is not configured' });

  const keywords = normalizeKeywords(request.nextUrl.searchParams.get('keywords'));
  if (!keywords.length) return json(400, { error: 'Provide one to five comma-separated keywords (1-80 characters each).' });
  const requestedLimit = Number(request.nextUrl.searchParams.get('limit') || DEFAULT_LIMIT);
  if (!Number.isInteger(requestedLimit) || requestedLimit < 1) return json(400, { error: 'limit must be a positive integer' });
  const limit = Math.min(requestedLimit, MAX_LIMIT);

  try {
    const results = await Promise.all(keywords.map((keyword) => searchKeyword(keyword, apiKey, limit)));
    return NextResponse.json({
      generatedAt: new Date().toISOString(),
      source: 'Etsy active-listing catalog search',
      caveat: 'This route reads public active-listing matches only. It does not provide marketplace search volume, sales velocity, or Etsy Ads performance.',
      results,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown Etsy research failure';
    return json(502, { error: message });
  }
}
