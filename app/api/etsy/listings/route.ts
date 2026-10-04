import { createHash } from 'node:crypto';
import { del, get, put } from '@vercel/blob';
import { NextRequest, NextResponse } from 'next/server';
import { enforcePublishLimits, isLockFresh, ListingHistoryItem, ListingLock } from '@/lib/etsy/automation';

export const runtime = 'nodejs';
const ETSY_API_BASE = 'https://openapi.etsy.com/v3/application';
const TOKEN_PATH = 'private/etsy/oauth-token.json';
const HISTORY_PATH = 'private/etsy/publish-history.json';
const LOCK_PATH = 'private/etsy/publish-lock.json';
const MAX_IMAGE_BYTES = 10 * 1024 * 1024;
const MAX_FILE_BYTES = 20 * 1024 * 1024;
const REQUIRED_SCOPES = ['listings_r', 'listings_w', 'shops_r'];

type EtsyToken = { access_token: string; refresh_token?: string; expires_at?: number; scope?: string[] };
type ListingDraftInput = {
  title: string;
  description: string;
  price: number;
  quantity: number;
  who_made: string;
  when_made: string;
  taxonomy_id: number;
  shipping_profile_id?: number;
  readiness_confirmed?: boolean;
  readiness_evidence?: string;
  image_urls?: string[];
  digital_file_url?: string;
  file_name?: string;
  tags?: string[];
  materials?: string[];
  is_supply?: boolean;
  is_customizable?: boolean;
  type?: 'physical' | 'download';
  listing_type?: 'physical' | 'digital';
};
type EtsyListingResponse = { listing_id: number; state?: string };

async function saveJson(path: string, value: unknown) {
  const token = process.env.ETSY_BLOB_READ_WRITE_TOKEN;
  if (!token) throw new Error('ETSY_BLOB_READ_WRITE_TOKEN is not configured');
  const result = await put(path, JSON.stringify(value), { access: 'private', addRandomSuffix: false, allowOverwrite: true, token, contentType: 'application/json' });
  return result;
}

async function loadJson<T>(path: string, fallback: T): Promise<T> {
  const token = process.env.ETSY_BLOB_READ_WRITE_TOKEN;
  if (!token) throw new Error('ETSY_BLOB_READ_WRITE_TOKEN is not configured');
  const { blobs } = await import('@vercel/blob').then(({ list }) => list({ prefix: path, limit: 1, token }));
  if (!blobs.length) return fallback;
  const response = await fetch(blobs[0]!.downloadUrl);
  if (!response.ok) throw new Error(`Could not read ${path} (${response.status})`);
  try { return await response.json() as T; } catch { throw new Error(`Stored JSON is invalid: ${path}`); }
}

async function readToken(): Promise<EtsyToken | null> {
  const { value: token } = await get(TOKEN_PATH, { access: 'private', token: process.env.ETSY_BLOB_READ_WRITE_TOKEN });
  if (!token) return null;
  let parsed: EtsyToken;
  try { parsed = JSON.parse(await new Response(token).text()) as EtsyToken; }
  catch { throw new Error('Stored Etsy OAuth token is invalid JSON'); }
  if (typeof parsed.access_token !== 'string' || !parsed.access_token) throw new Error('Stored Etsy OAuth token is missing access_token');
  if (!Array.isArray(parsed.scope)) throw new Error('Stored Etsy OAuth token is missing scopes; reconnect Etsy with listings_w permission');
  if (parsed.expires_at && parsed.expires_at <= Date.now()) throw new Error('Etsy access token expired; reconnect Etsy');
  return parsed;
}

function requireScope(token: EtsyToken, scope: string) {
  if (!token.scope?.includes(scope)) throw new Error(`Etsy OAuth permission missing: ${scope}; reconnect Etsy and approve the requested scope`);
}

function forbidden(message: string) { return NextResponse.json({ error: message }, { status: 403 }); }
function unauthorized() { return NextResponse.json({ error: 'Unauthorized' }, { status: 401 }); }

async function saveHistory(item: ListingHistoryItem) {
  const history = await loadJson<ListingHistoryItem[]>(HISTORY_PATH, []);
  history.push(item);
  await saveJson(HISTORY_PATH, history);
}

async function acquireLock(fingerprint: string) {
  const existing = await loadJson<ListingLock | null>(LOCK_PATH, null);
  if (existing && isLockFresh(existing, Date.now())) return { ok: false as const, state: existing.state };
  const lock: ListingLock = { fingerprint, startedAt: new Date().toISOString(), state: 'publishing' };
  await saveJson(LOCK_PATH, lock);
  return { ok: true as const };
}

async function updateLock(update: Partial<ListingLock>) {
  const existing = await loadJson<ListingLock | null>(LOCK_PATH, null);
  await saveJson(LOCK_PATH, { ...(existing || {}), ...update });
}

async function releaseLock() { await del(LOCK_PATH, { token: process.env.ETSY_BLOB_READ_WRITE_TOKEN }); }

function parseBody(body: unknown): ListingDraftInput | null {
  if (!body || typeof body !== 'object') return null;
  const input = body as Partial<ListingDraftInput>;
  if (typeof input.title !== 'string' || input.title.trim().length < 5 || input.title.length > 140) return null;
  if (typeof input.description !== 'string' || input.description.trim().length < 30) return null;
  if (typeof input.price !== 'number' || !Number.isFinite(input.price) || input.price <= 0) return null;
  if (typeof input.quantity !== 'number' || !Number.isInteger(input.quantity) || input.quantity < 1) return null;
  if (typeof input.taxonomy_id !== 'number' || !Number.isInteger(input.taxonomy_id) || input.taxonomy_id <= 0) return null;
  if (!['i_did', 'someone_else', 'collective'].includes(input.who_made || '')) return null;
  if (!['made_to_order', '2020_2026', '2010_2019', '2000_2009', 'before_2000', '1990s', '1980s', '1970s', '1960s', '1950s', '1940s', '1930s', '1920s', '1910s', '1900s', '1800s', '1700s', 'before_1700'].includes(input.when_made || '')) return null;
  if (input.type !== 'physical' && input.type !== 'download' && input.listing_type !== 'physical' && input.listing_type !== 'digital') return null;
  if (input.image_urls && (!Array.isArray(input.image_urls) || input.image_urls.length > 10 || input.image_urls.some((url) => typeof url !== 'string' || !url.startsWith('https://')))) return null;
  if (input.digital_file_url && (typeof input.digital_file_url !== 'string' || !input.digital_file_url.startsWith('https://'))) return null;
  return input as ListingDraftInput;
}

async function readBody(request: NextRequest) {
  try { return await request.json(); } catch { return null; }
}

function requestFingerprint(input: ListingDraftInput) {
  return createHash('sha256').update(JSON.stringify(input)).digest('hex');
}

async function etsyFetch(url: string, token: EtsyToken, init: RequestInit = {}) {
  const response = await fetch(url, { ...init, headers: { 'x-api-key': process.env.ETSY_KEYSTRING || '', Authorization: `Bearer ${token.access_token}`, ...(init.headers || {}) } });
  if (!response.ok) throw new Error(`Etsy API returned ${response.status}: ${(await response.text()).slice(0, 300)}`);
  return response;
}

async function uploadRemoteFile(url: string, name: string) {
  const response = await fetch(url, { signal: AbortSignal.timeout(15000) });
  if (!response.ok) throw new Error(`Could not download product file (${response.status})`);
  const contentLength = Number(response.headers.get('content-length'));
  if (Number.isFinite(contentLength) && contentLength > MAX_FILE_BYTES) throw new Error('Digital file exceeds 20 MB upload limit');
  const bytes = await response.arrayBuffer();
  if (bytes.byteLength > MAX_FILE_BYTES) throw new Error('Digital file exceeds 20 MB upload limit');
  const form = new FormData();
  form.set('file', new Blob([bytes]), name);
  form.set('name', name);
  return form;
}

async function uploadRemoteImage(url: string) {
  const response = await fetch(url, { signal: AbortSignal.timeout(15000) });
  if (!response.ok) throw new Error(`Could not download listing image (${response.status})`);
  const contentLength = Number(response.headers.get('content-length'));
  if (Number.isFinite(contentLength) && contentLength > MAX_IMAGE_BYTES) throw new Error('Listing image exceeds 10 MB limit');
  const bytes = await response.arrayBuffer();
  if (bytes.byteLength > MAX_IMAGE_BYTES) throw new Error('Listing image exceeds 10 MB limit');
  const contentType = response.headers.get('content-type') || 'image/jpeg';
  if (!contentType.startsWith('image/')) throw new Error('Listing image URL must return an image');
  return new Blob([bytes], { type: contentType });
}

function acceptedReadiness(input: ListingDraftInput) { return input.readiness_confirmed === true && typeof input.readiness_evidence === 'string' && input.readiness_evidence.trim().length >= 20; }

export async function POST(request: NextRequest) {
  const secret = process.env.ETSY_AUTOMATION_SECRET;
  if (!secret || request.headers.get('authorization') !== `Bearer ${secret}`) return unauthorized();
  if (!process.env.ETSY_KEYSTRING) return NextResponse.json({ error: 'ETSY_KEYSTRING is not configured' }, { status: 503 });
  const input = parseBody(await readBody(request));
  if (!input) return NextResponse.json({ error: 'Invalid listing payload' }, { status: 400 });
  let token: EtsyToken | null;
  try {
    token = await readToken();
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Stored Etsy OAuth token is invalid' }, { status: 503 });
  }
  if (!token) return NextResponse.json({ error: 'Shop OAuth connection not found' }, { status: 503 });
  try { requireScope(token, 'listings_w'); } catch (error) { return forbidden((error as Error).message); }
  if (!input.readiness_confirmed || !input.readiness_evidence || input.readiness_evidence.trim().length < 20) {
    return NextResponse.json({ error: 'Listing must pass independent readiness checks before publication' }, { status: 422 });
  }
  if (input.type === 'physical' && !input.shipping_profile_id) return NextResponse.json({ error: 'Shipping profile is required for physical listings' }, { status: 400 });
  let lock;
  const fingerprint = requestFingerprint(input);
  try { lock = await acquireLock(fingerprint); }
  catch (error) { return NextResponse.json({ error: error instanceof Error ? error.message : 'Could not acquire publish lock' }, { status: 503 }); }
  if (!lock.ok) return NextResponse.json({ error: 'A listing publication is already in progress', state: lock.state }, { status: 409 });
  let createdListingId: number | null = null;
  try {
    const shopId = process.env.ETSY_SHOP_ID;
    if (!shopId) throw new Error('ETSY_SHOP_ID is not configured');
    await enforcePublishLimits(HISTORY_PATH, process.env.ETSY_BLOB_READ_WRITE_TOKEN || '', async (path, tokenValue) => loadJson<ListingHistoryItem[]>(path, []), Date.now());
    const createBody = new URLSearchParams({
      quantity: String(input.quantity),
      title: input.title,
      description: input.description,
      price: String(input.price),
      who_made: input.who_made,
      when_made: input.when_made,
      taxonomy_id: String(input.taxonomy_id),
      is_supply: String(input.is_supply ?? false),
      is_customizable: String(input.is_customizable ?? false),
      type: input.type === 'download' || input.listing_type === 'digital' ? 'download' : 'physical',
    });
    if (input.shipping_profile_id) createBody.set('shipping_profile_id', String(input.shipping_profile_id));
    for (const tag of input.tags || []) createBody.append('tags[]', tag);
    for (const material of input.materials || []) createBody.append('materials[]', material);
    const created = await etsyFetch(`${ETSY_API_BASE}/shops/${shopId}/listings`, token, { method: 'POST', body: createBody });
    const listing = await created.json() as EtsyListingResponse;
    if (!listing.listing_id) throw new Error('Etsy did not return a listing id');
    createdListingId = listing.listing_id;
    if (input.type === 'download' || input.listing_type === 'digital') {
      if (!input.digital_file_url || !input.file_name) throw new Error('Digital listings require a digital file URL and file name');
      const form = await uploadRemoteFile(input.digital_file_url, input.file_name);
      await etsyFetch(`${ETSY_API_BASE}/shops/${shopId}/listings/${listing.listing_id}/files`, token, { method: 'POST', body: form });
    }
    const uploadedImages: string[] = [];
    for (const imageUrl of input.image_urls || []) {
      const image = await uploadRemoteImage(imageUrl);
      const form = new FormData();
      form.set('image', image, imageUrl.split('/').pop() || 'listing-image.jpg');
      await etsyFetch(`${ETSY_API_BASE}/shops/${shopId}/listings/${listing.listing_id}/images`, token, { method: 'POST', body: form });
      uploadedImages.push(imageUrl);
    }
    await etsyFetch(`${ETSY_API_BASE}/shops/${shopId}/listings/${listing.listing_id}`, token, { method: 'PATCH', body: new URLSearchParams({ state: 'active' }) });
    const confirmed = await etsyFetch(`${ETSY_API_BASE}/shops/${shopId}/listings/${listing.listing_id}`, token);
    const confirmedListing = await confirmed.json() as EtsyListingResponse;
    if (confirmedListing.state !== 'active') throw new Error('Etsy listing activation could not be confirmed');
    await saveHistory({ listingId: listing.listing_id, createdAt: new Date().toISOString(), title: input.title, price: input.price, currency: 'USD', status: 'active' });
    await updateLock({ state: 'completed', listingId: listing.listing_id, completedAt: new Date().toISOString() });
    return NextResponse.json({ listing_id: listing.listing_id, state: 'active', uploadedImages }, { status: 201 });
  } catch (error) {
    if (createdListingId) {
      try { await updateLock({ state: 'needs_review', listingId: createdListingId }); } catch { /* retain the original publication failure */ }
      return NextResponse.json({ error: error instanceof Error ? error.message : 'Listing creation was incomplete', listing_id: createdListingId, state: 'needs_review' }, { status: 502 });
    }
    try { await releaseLock(); } catch { /* retain the original publication failure */ }
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Listing creation failed' }, { status: 502 });
  }
}
