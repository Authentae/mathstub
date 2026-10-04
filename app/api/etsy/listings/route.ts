import { createHash } from 'node:crypto';
import { del, get, put } from '@vercel/blob';
import { NextRequest, NextResponse } from 'next/server';
import { enforcePublishLimits, isLockFresh, ListingHistoryItem, ListingLock } from '@/lib/etsy/automation';

export const runtime = 'nodejs';
const HISTORY_PATH = 'private/etsy/publish-history.json';
const LOCK_PATH = 'private/etsy/publish-lock.json';
const TOKEN_PATH = 'private/etsy/shop-oauth.json';
const PAGE_SIZE = 100;
const MAX_RECORDS_PER_RESOURCE = 5000;
const REQUIRED_SCOPES = ['listings_r', 'listings_w'] as const;

interface EtsyToken {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  obtained_at: number;
  shop_id: string;
  scopes: string[];
}

interface ListingDraftInput {
  title: string;
  description: string;
  price: number;
  quantity?: number;
  who_made: 'i_did' | 'someone_else' | 'collective';
  when_made: string;
  taxonomy_id: number;
  tags: string[];
  materials?: string[];
  shipping_profile_id?: number;
  return_policy_id?: number;
  digital?: boolean;
  readiness_confirmed?: boolean;
  readiness_evidence?: string;
  files?: Array<{ filename: string; content: string; mimeType: string }>;
  images?: Array<{ filename: string; content: string; mimeType: string; rank?: number }>;
}

interface EtsyListing {
  listing_id: number;
  title?: string;
  state?: string;
  num_favorers?: number;
}

interface EtsyReceipt {
  receipt_id: number;
  is_paid?: boolean;
  status?: string;
  transactions?: Array<{ listing_id: number }>;
}

interface EtsyPage<T> {
  count: number;
  results: T[];
}

interface EtsyRequestResult {
  response: Response;
  url: URL;
}

const MAX_PAGES = Math.ceil(MAX_RECORDS_PER_RESOURCE / PAGE_SIZE);

async function fetchPaged(url: string, token: EtsyToken, init?: RequestInit) {
  const rows: unknown[] = [];
  const baseUrl = new URL(url);
  for (let page = 0; page < MAX_PAGES; page++) {
    const pageUrl = new URL(baseUrl);
    pageUrl.searchParams.set('limit', String(PAGE_SIZE));
    pageUrl.searchParams.set('offset', String(page * PAGE_SIZE));
    const response = await etsyFetch(pageUrl, token, init);
    if (!response.ok) throw new Error(`Etsy paginated request failed (${response.status})`);
    const data = await response.json() as EtsyPage<unknown>;
    if (!Array.isArray(data.results) || !Number.isFinite(data.count)) throw new Error('Etsy returned a malformed paginated response');
    rows.push(...data.results);
    if (rows.length >= data.count || data.results.length < PAGE_SIZE) return rows.slice(0, MAX_RECORDS_PER_RESOURCE);
  }
  throw new Error('Etsy result exceeds the safe pagination limit; publishing stopped');
}

function authError() {
  return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
}

function forbidden(message: string) {
  return NextResponse.json({ error: message }, { status: 403 });
}

function getSecret(request: NextRequest) {
  const expected = process.env.ETSY_AUTOMATION_SECRET || process.env.ETSY_STATUS_SECRET;
  const authorization = request.headers.get('authorization')?.replace(/^Bearer\s+/i, '');
  return expected && authorization === expected;
}

function requireScope(token: EtsyToken, scope: string) {
  if (!Array.isArray(token.scopes) || !token.scopes.includes(scope)) {
    throw new Error(`Etsy OAuth permission '${scope}' is required; reconnect the shop with this scope.`);
  }
}

async function readPrivateJson<T>(path: string): Promise<{ value: T | null; etag?: string }> {
  const result = await get(path, { access: 'private', useCache: false });
  if (!result || result.statusCode !== 200) return { value: null };
  return { value: JSON.parse(await new Response(result.stream).text()) as T, etag: result.blob.etag };
}

async function readToken(): Promise<EtsyToken | null> {
  const { value: token } = await readPrivateJson<EtsyToken>(TOKEN_PATH);
  if (!token) return null;
  if (!Number.isFinite(token.obtained_at) || !Number.isFinite(token.expires_in)) throw new Error('Stored Etsy OAuth token is missing valid expiry metadata');
  if (Date.now() >= token.obtained_at + token.expires_in * 1000 - 30_000) throw new Error('Stored Etsy OAuth token is expired or too close to expiry; reconnect the shop');
  return token;
}

async function etsyFetch(url: URL, token: EtsyToken, init?: RequestInit): Promise<Response> {
  const headers = new Headers(init?.headers);
  headers.set('x-api-key', process.env.ETSY_KEYSTRING!);
  headers.set('Authorization', `Bearer ${token.access_token}`);
  return fetch(url, { ...init, headers, cache: 'no-store' });
}

async function readHistory(): Promise<ListingHistoryItem[]> {
  const { value } = await readPrivateJson<ListingHistoryItem[]>(HISTORY_PATH);
  return value || [];
}

async function latestLock(): Promise<ListingLock | null> {
  const { value } = await readPrivateJson<ListingLock>(LOCK_PATH);
  return value;
}

async function createLock(idempotencyKey: string, draftHash: string, now: number) {
  const existing = await latestLock();
  if (isLockFresh(existing, now)) throw new Error('Another listing publication is in progress; retry after the lock clears');
  const lock: ListingLock = { idempotencyKey, draftHash, startedAt: new Date(now).toISOString(), state: 'pending' };
  await put(LOCK_PATH, JSON.stringify(lock), { access: 'private', contentType: 'application/json' });
}

async function updateLock(lock: ListingLock) {
  await put(LOCK_PATH, JSON.stringify(lock), { access: 'private', contentType: 'application/json' });
}

async function clearLock() {
  try { await del(LOCK_PATH); } catch { /* Preserve the original failure. */ }
}

function recordForListing(listing: EtsyListing, now: number, publishPath: string): ListingHistoryItem {
  return {
    listingId: listing.listing_id,
    title: listing.title || `Listing ${listing.listing_id}`,
    state: listing.state || 'unknown',
    createdAt: new Date(now).toISOString(),
    publishPath,
  };
}

function parseBody(body: unknown): ListingDraftInput | null {
  if (!body || typeof body !== 'object') return null;
  const candidate = body as Partial<ListingDraftInput>;
  if (typeof candidate.title !== 'string' || candidate.title.trim().length < 2 || candidate.title.length > 140) return null;
  if (typeof candidate.description !== 'string' || candidate.description.trim().length < 20 || candidate.description.length > 10_000) return null;
  if (typeof candidate.price !== 'number' || !Number.isFinite(candidate.price) || candidate.price <= 0) return null;
  if (!['i_did', 'someone_else', 'collective'].includes(candidate.who_made || '')) return null;
  if (typeof candidate.when_made !== 'string' || !candidate.when_made || candidate.when_made.length > 32) return null;
  if (!Number.isInteger(candidate.taxonomy_id) || (candidate.taxonomy_id || 0) <= 0) return null;
  if (!Array.isArray(candidate.tags) || candidate.tags.length > 13 || candidate.tags.some((tag) => typeof tag !== 'string' || !tag.trim() || tag.length > 20)) return null;
  if (candidate.materials && (!Array.isArray(candidate.materials) || candidate.materials.length > 13 || candidate.materials.some((material) => typeof material !== 'string' || !material.trim() || material.length > 45))) return null;
  if (candidate.quantity !== undefined && (!Number.isInteger(candidate.quantity) || candidate.quantity < 1 || candidate.quantity > 999)) return null;
  if (candidate.digital !== undefined && typeof candidate.digital !== 'boolean') return null;
  if (!Array.isArray(candidate.images) || candidate.images.length < 1 || candidate.images.length > 10) return null;
  if (candidate.images.some((image) => !image || typeof image.filename !== 'string' || !image.filename || image.filename.length > 180 || typeof image.mimeType !== 'string' || !/^image\/(jpeg|png|gif|webp)$/.test(image.mimeType) || typeof image.content !== 'string' || !image.content || image.content.length > 12_000_000)) return null;
  if (candidate.digital && (!Array.isArray(candidate.files) || candidate.files.length < 1 || candidate.files.length > 5)) return null;
  if (candidate.files && (!Array.isArray(candidate.files) || candidate.files.length > 5 || candidate.files.some((file) => !file || typeof file.filename !== 'string' || !file.filename || file.filename.length > 180 || typeof file.mimeType !== 'string' || file.mimeType.length > 120 || typeof file.content !== 'string' || !file.content || file.content.length > 60_000_000))) return null;
  if (candidate.shipping_profile_id !== undefined && (!Number.isInteger(candidate.shipping_profile_id) || candidate.shipping_profile_id <= 0)) return null;
  if (candidate.return_policy_id !== undefined && (!Number.isInteger(candidate.return_policy_id) || candidate.return_policy_id <= 0)) return null;
  return candidate as ListingDraftInput;
}

function requestFingerprint(input: ListingDraftInput) {
  return createHash('sha256').update(JSON.stringify(input)).digest('hex');
}

async function fetchListing(url: string, token: EtsyToken): Promise<EtsyRequestResult> {
  const target = new URL(url);
  const response = await etsyFetch(target, token);
  return { response, url: target };
}

function responseError(data: unknown, fallback: string) {
  if (data && typeof data === 'object' && 'error' in data && typeof (data as { error?: unknown }).error === 'string') return (data as { error: string }).error;
  return fallback;
}

function safeListingFields(listing: ListingDraftInput) {
  const payload: Record<string, unknown> = {
    title: listing.title.trim(),
    description: listing.description.trim(),
    price: listing.price,
    quantity: listing.quantity || 1,
    who_made: listing.who_made,
    when_made: listing.when_made,
    taxonomy_id: listing.taxonomy_id,
    tags: listing.tags.map((tag) => tag.trim()),
    is_supply: false,
    type: listing.digital ? 'download' : 'physical',
  };
  if (listing.digital) payload.shipping_profile_id = undefined;
  else if (listing.shipping_profile_id) payload.shipping_profile_id = listing.shipping_profile_id;
  if (listing.return_policy_id) payload.return_policy_id = listing.return_policy_id;
  if (listing.materials?.length) payload.materials = listing.materials.map((material) => material.trim());
  return payload;
}

async function parseEtsyResponse(response: Response) {
  const text = await response.text();
  try { return text ? JSON.parse(text) as Record<string, unknown> : {}; }
  catch { return { error: text.slice(0, 500) || `Etsy returned ${response.status}` }; }
}

async function readBody(request: NextRequest) {
  try { return await request.json(); } catch { return null; }
}

function acceptedReadiness(input: ListingDraftInput) {
  return input.readiness_confirmed === true && typeof input.readiness_evidence === 'string' && input.readiness_evidence.trim().length >= 20;
}

async function reconcilePublication(token: EtsyToken) {
  const lock = await latestLock();
  if (!lock) return NextResponse.json({ reconciled: false, unresolved: false, message: 'No publication lock exists.' });
  if (!Number.isInteger(lock.listingId) || !lock.listingId) {
    return NextResponse.json({ error: 'The unresolved lock has no Etsy listing ID; it cannot be safely reconciled automatically.', unresolved: true }, { status: 409 });
  }

  let result: EtsyRequestResult;
  try {
    result = await fetchListing(`https://openapi.etsy.com/v3/application/shops/${encodeURIComponent(token.shop_id)}/listings/${lock.listingId}`, token);
  } catch {
    return NextResponse.json({ error: 'Could not read the Etsy listing; the publication lock remains unchanged.', unresolved: true }, { status: 502 });
  }
  const listing = await parseEtsyResponse(result.response);
  if (!result.response.ok) {
    return NextResponse.json({ error: responseError(listing, `Etsy listing read failed (${result.response.status}); the publication lock remains unchanged.`), unresolved: true }, { status: 502 });
  }
  if (Number(listing.listing_id) !== lock.listingId) {
    return NextResponse.json({ error: 'Etsy did not confirm the expected listing ID; the publication lock remains unchanged.', unresolved: true }, { status: 502 });
  }

  if (listing.state !== 'active') {
    return NextResponse.json({
      reconciled: false,
      unresolved: true,
      listing_id: lock.listingId,
      remoteState: typeof listing.state === 'string' ? listing.state : 'unknown',
      message: 'The Etsy listing is not active. The lock remains in place to prevent a duplicate; complete or inspect the listing manually, then reconcile again.',
    }, { status: 409 });
  }

  const history = await readHistory();
  const alreadyRecorded = history.some((item) => item.listingId === lock.listingId);
  if (!alreadyRecorded) {
    const startedAt = Date.parse(lock.startedAt);
    await put(HISTORY_PATH, JSON.stringify([
      ...history,
      recordForListing(listing as unknown as EtsyListing, Number.isFinite(startedAt) ? startedAt : Date.now(), 'reconciled publication'),
    ]), { access: 'private', contentType: 'application/json' });
  }
  await updateLock({ ...lock, state: 'completed', title: typeof listing.title === 'string' ? listing.title : lock.title });
  return NextResponse.json({ reconciled: true, unresolved: false, listing_id: lock.listingId, state: 'active', historyRecorded: !alreadyRecorded });
}

export async function GET(request: NextRequest) {
  if (!getSecret(request)) return authError();
  const token = await readToken();
  if (!token) return NextResponse.json({ error: 'Shop OAuth connection not found' }, { status: 503 });
  try { requireScope(token, 'listings_r'); } catch (error) { return forbidden((error as Error).message); }
  const shopId = encodeURIComponent(token.shop_id);
  const [listingRows, receiptRows] = await Promise.all([
    fetchPaged(`https://openapi.etsy.com/v3/application/shops/${shopId}/listings?state=active`, token),
    fetchPaged(`https://openapi.etsy.com/v3/application/shops/${shopId}/receipts`, token),
  ]);
  const listings = listingRows as EtsyListing[];
  const receipts = receiptRows as EtsyReceipt[];
  const listingOrderCount = new Map<number, number>();
  const listingPaidOrderCount = new Map<number, number>();
  for (const receipt of receipts) {
    if (!Array.isArray(receipt.transactions)) continue;
    for (const transaction of receipt.transactions) {
      listingOrderCount.set(transaction.listing_id, (listingOrderCount.get(transaction.listing_id) || 0) + 1);
      if (receipt.is_paid === true && !['canceled', 'cancelled', 'fully refunded', 'fully_refunded'].includes((receipt.status || '').toLowerCase())) {
        listingPaidOrderCount.set(transaction.listing_id, (listingPaidOrderCount.get(transaction.listing_id) || 0) + 1);
      }
    }
  }
  return NextResponse.json({
    listings: listings.map((listing) => ({
      ...listing,
      shop_order_count: listingOrderCount.get(listing.listing_id) || 0,
      shop_paid_order_count: listingPaidOrderCount.get(listing.listing_id) || 0,
    })),
    total_count: listings.length,
  });
}

export async function POST(request: NextRequest) {
  if (!getSecret(request)) return authError();
  if (!process.env.ETSY_KEYSTRING) return NextResponse.json({ error: 'ETSY_KEYSTRING is not configured' }, { status: 503 });
  const body = await readBody(request);
  if (body && typeof body === 'object' && (body as { action?: unknown }).action === 'reconcile') {
    let reconciliationToken: EtsyToken | null;
    try { reconciliationToken = await readToken(); }
    catch (error) { return NextResponse.json({ error: error instanceof Error ? error.message : 'Stored Etsy OAuth token is invalid' }, { status: 503 }); }
    if (!reconciliationToken) return NextResponse.json({ error: 'Shop OAuth connection not found' }, { status: 503 });
    try { requireScope(reconciliationToken, 'listings_r'); }
    catch (error) { return forbidden((error as Error).message); }
    try { return await reconcilePublication(reconciliationToken); }
    catch (error) { return NextResponse.json({ error: error instanceof Error ? error.message : 'Could not reconcile Etsy publication', unresolved: true }, { status: 503 }); }
  }
  const input = parseBody(body);
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
    return NextResponse.json({ error: 'Listing readiness confirmation and evidence are required before Etsy mutation.' }, { status: 409 });
  }
  const now = Date.now();
  const history = await readHistory();
  const limitResult = enforcePublishLimits(history, now);
  if (!limitResult.allowed) return NextResponse.json({ error: limitResult.reason }, { status: 429 });
  const fingerprint = requestFingerprint(input);
  const suppliedIdempotency = request.headers.get('idempotency-key')?.trim();
  if (!suppliedIdempotency || suppliedIdempotency.length < 16 || suppliedIdempotency.length > 200) {
    return NextResponse.json({ error: 'A stable Idempotency-Key header is required for publication' }, { status: 400 });
  }
  const existingLock = await latestLock();
  if (existingLock?.idempotencyKey === suppliedIdempotency && existingLock.draftHash === fingerprint && existingLock.state === 'completed' && existingLock.listingId) {
    return NextResponse.json({ listing_id: existingLock.listingId, replayed: true }, { status: 200 });
  }
  if (existingLock?.idempotencyKey === suppliedIdempotency && existingLock.draftHash !== fingerprint) {
    return NextResponse.json({ error: 'Idempotency-Key was already used for a different listing payload' }, { status: 409 });
  }
  if (existingLock && (existingLock.state === 'etsy_created' || existingLock.state === 'active' || existingLock.state === 'uploads_partial' || existingLock.state === 'upload_pending' || existingLock.state === 'activation_pending')) {
    return NextResponse.json({ error: `Previous Etsy publication is unresolved (${existingLock.state}); reconcile it before retrying.` }, { status: 409 });
  }
  const draft = {
    idempotencyKey: suppliedIdempotency,
    draftHash: fingerprint,
    startedAt: new Date(now).toISOString(),
    state: 'pending' as const,
  };
  try {
    await createLock(suppliedIdempotency, fingerprint, now);
    const createUrl = new URL(`https://openapi.etsy.com/v3/application/shops/${encodeURIComponent(token.shop_id)}/listings`);
    const fields = safeListingFields(input);
    const form = new URLSearchParams();
    for (const [key, value] of Object.entries(fields)) {
      if (value === undefined) continue;
      if (Array.isArray(value)) value.forEach((item) => form.append(key, String(item)));
      else form.set(key, String(value));
    }
    const createResponse = await etsyFetch(createUrl, token, { method: 'POST', body: form });
    const created = await parseEtsyResponse(createResponse);
    if (!createResponse.ok || !Number.isInteger(created.listing_id)) {
      if (createResponse.status >= 500) {
        await updateLock({ ...draft, state: 'activation_pending', error: 'Etsy create outcome is unresolved; verify remote listings before retrying' });
      } else await clearLock();
      return NextResponse.json({ error: responseError(created, 'Etsy listing creation failed'), unresolved: createResponse.status >= 500 }, { status: createResponse.status >= 500 ? 502 : 400 });
    }
    const listingId = Number(created.listing_id);
    const createdState = typeof created.state === 'string' ? created.state : 'draft';
    if (createdState !== 'draft') {
      await updateLock({ ...draft, state: 'activation_pending', listingId, title: input.title, error: `Expected Etsy draft but received state '${createdState}'` });
      return NextResponse.json({ error: 'Etsy did not return a draft listing; publication paused for reconciliation', listing_id: listingId, state: createdState, unresolved: true }, { status: 502 });
    }
    await updateLock({ ...draft, state: 'etsy_created', listingId, title: input.title });

    const uploadedFiles: string[] = [];
    const skippedFiles: string[] = [];
    const publishPath = input.digital ? 'file digital listing' : 'create draft and upload images';
    for (const [index, asset] of (input.files || []).entries()) {
      const formData = new FormData();
      const buffer = Buffer.from(asset.content, 'base64');
      formData.append('file', new Blob([buffer], { type: asset.mimeType }), asset.filename);
      formData.append('name', asset.filename);
      let uploadResponse: Response;
      try {
        uploadResponse = await etsyFetch(new URL(`https://openapi.etsy.com/v3/application/shops/${encodeURIComponent(token.shop_id)}/listings/${listingId}/files`), token, { method: 'POST', body: formData });
      } catch {
        await updateLock({ ...draft, state: 'upload_pending', listingId, title: input.title, uploadedFiles, failedFile: asset.filename, error: 'Digital file upload outcome is unresolved; verify the listing before retrying' });
        return NextResponse.json({ error: 'Etsy digital file upload outcome is unresolved; listing was not activated', listing_id: listingId, uploadedFiles, unresolved: true }, { status: 502 });
      }
      const uploadResult = await parseEtsyResponse(uploadResponse);
      if (!uploadResponse.ok) {
        const unresolved = uploadResponse.status >= 500;
        await updateLock({ ...draft, state: unresolved ? 'upload_pending' : 'uploads_partial', listingId, title: input.title, uploadedFiles, failedFile: asset.filename, error: responseError(uploadResult, `Digital file ${index + 1} upload failed`) });
        return NextResponse.json({ error: responseError(uploadResult, `Digital file ${index + 1} upload failed; listing was not activated`), listing_id: listingId, uploadedFiles, unresolved }, { status: unresolved ? 502 : 400 });
      }
      uploadedFiles.push(asset.filename);
      await updateLock({ ...draft, state: 'etsy_created', listingId, title: input.title, uploadedFiles });
    }

    const uploadedImages: string[] = [];
    for (const [index, image] of (input.images || []).entries()) {
      const formData = new FormData();
      formData.append('image', new Blob([Buffer.from(image.content, 'base64')], { type: image.mimeType }), image.filename);
      formData.append('rank', String(image.rank ?? index));
      let imageResponse: Response;
      try {
        imageResponse = await etsyFetch(new URL(`https://openapi.etsy.com/v3/application/shops/${encodeURIComponent(token.shop_id)}/listings/${listingId}/images`), token, { method: 'POST', body: formData });
      } catch {
        await updateLock({ ...draft, state: 'upload_pending', listingId, title: input.title, uploadedFiles, uploadedImages, failedImage: image.filename, error: 'Image upload outcome is unresolved; verify the listing before retrying' });
        return NextResponse.json({ error: 'Etsy image upload outcome is unresolved; listing was not activated', listing_id: listingId, uploadedImages, unresolved: true }, { status: 502 });
      }
      const imageResult = await parseEtsyResponse(imageResponse);
      if (!imageResponse.ok) {
        const unresolved = imageResponse.status >= 500;
        await updateLock({ ...draft, state: unresolved ? 'upload_pending' : 'uploads_partial', listingId, title: input.title, uploadedFiles, uploadedImages, failedImage: image.filename, error: responseError(imageResult, `Image ${index + 1} upload failed`) });
        return NextResponse.json({ error: responseError(imageResult, `Image ${index + 1} upload failed; listing was not activated`), listing_id: listingId, uploadedImages, unresolved }, { status: unresolved ? 502 : 400 });
      }
      uploadedImages.push(image.filename);
      await updateLock({ ...draft, state: 'etsy_created', listingId, title: input.title, uploadedFiles, uploadedImages });
    }

    const activationUrl = new URL(`https://openapi.etsy.com/v3/application/shops/${encodeURIComponent(token.shop_id)}/listings/${listingId}`);
    activationUrl.searchParams.set('state', 'active');
    const activationForm = new URLSearchParams({ state: 'active' });
    await updateLock({ ...draft, state: 'activation_pending', listingId, title: input.title, uploadedFiles, uploadedImages });
    let activationResponse: Response;
    try {
      activationResponse = await etsyFetch(activationUrl, token, { method: 'PATCH', body: activationForm });
    } catch {
      await updateLock({ ...draft, state: 'activation_pending', listingId, title: input.title, uploadedFiles, uploadedImages, error: 'Activation request outcome is unresolved; reconcile the Etsy listing before retrying' });
      return NextResponse.json({ error: 'Etsy activation outcome is unresolved; check the listing state before retrying', listing_id: listingId, unresolved: true }, { status: 502 });
    }
    const activationResult = await parseEtsyResponse(activationResponse);
    if (!activationResponse.ok) {
      const unresolved = activationResponse.status >= 500;
      await updateLock({ ...draft, state: 'activation_pending', listingId, title: input.title, uploadedFiles, uploadedImages, error: responseError(activationResult, 'Etsy listing activation failed') });
      return NextResponse.json({ error: responseError(activationResult, 'Etsy listing activation failed'), listing_id: listingId, unresolved }, { status: unresolved ? 502 : 400 });
    }

    const verified = await fetchListing(`https://openapi.etsy.com/v3/application/shops/${encodeURIComponent(token.shop_id)}/listings/${listingId}`, token);
    const verifiedData = await parseEtsyResponse(verified.response);
    if (!verified.response.ok || verifiedData.state !== 'active') {
      await updateLock({ ...draft, state: 'activation_pending', listingId, title: input.title, uploadedFiles, uploadedImages, error: 'Activation response was not confirmed as active by Etsy listing read-back' });
      return NextResponse.json({ error: 'Etsy did not confirm the listing is active; reconcile before retrying', listing_id: listingId, unresolved: true }, { status: 502 });
    }

    const nextHistory = [...history, recordForListing(verifiedData as unknown as EtsyListing, now, publishPath)];
    await put(HISTORY_PATH, JSON.stringify(nextHistory), { access: 'private', contentType: 'application/json' });
    await updateLock({ ...draft, state: 'completed', listingId, title: input.title, uploadedFiles, uploadedImages });
    return NextResponse.json({ listing_id: listingId, state: 'active', uploadedFiles, uploadedImages }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Etsy publishing failed' }, { status: 502 });
  }
}
