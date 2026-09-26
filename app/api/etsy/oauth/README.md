# Etsy OAuth setup for Mathstub

The feature branch adds Etsy OAuth authorization-code/PKCE, state checking, a shop read verification, private Vercel Blob token storage, token refresh, and authenticated shop/listing API routes. No live listing is published by these routes.

## Configure the preview once

Use this preview host: `https://mathstub-id16ro63h-authentaes-projects.vercel.app`

1. In Etsy Developer Apps, register exactly: `https://mathstub-id16ro63h-authentaes-projects.vercel.app/api/etsy/oauth/callback`.
2. In Vercel, scope the following to Preview and branch `feat/etsy-oauth-callback`:
   - `ETSY_KEYSTRING`: app keystring.
   - `ETSY_SHARED_SECRET`: app shared secret.
   - `ETSY_REDIRECT_URI`: the exact callback URL above.
   - `ETSY_STATUS_SECRET`: generate a long random secret; use it only for server-to-server requests to protected API routes.
3. Add `@vercel/blob` to dependencies (this branch imports it) and link a private Blob store to the Mathstub project; Vercel must provide `BLOB_READ_WRITE_TOKEN` at runtime.
4. Redeploy the preview after configuration.
5. Commander opens `https://mathstub-id16ro63h-authentaes-projects.vercel.app/api/etsy/oauth/start` and approves `listings_r listings_w shops_r`.
6. Successful callback confirms shop access and writes access/refresh tokens to private Blob storage. The protected `/api/etsy/oauth/status` endpoint checks connection state; send the bearer token only from a trusted server, never browser JS or chat. `/api/etsy/shop` offers authenticated listing reads and draft creation for supported physical listings. Digital download file upload is deliberately not implemented yet and is refused rather than creating incomplete listings.

Do not enable Etsy Developer Mode on your live shop. Never expose secrets through `NEXT_PUBLIC_*`, source code, query strings, client-side code, or chat. Do not promote this branch to production until full testing is done.
