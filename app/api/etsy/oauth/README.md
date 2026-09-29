# Etsy OAuth setup for Mathstub

This branch implements Etsy OAuth authorization-code/PKCE, signed state transaction cookies, shop-access verification, private Vercel Blob token storage, and token refresh. The protected API routes are server-to-server only. No live listing is published by these routes.

## Before authorizing the shop

1. Use the HTTPS preview URL assigned to the latest successful Vercel deployment for this branch: `fix/etsy-oauth-start-config-check`. Do not use a guessed or old preview hostname.
2. Register the exact callback URL in Etsy Developer Apps: `https://<current-preview-host>/api/etsy/oauth/callback`.
3. In Vercel, set these variables for Preview and branch `fix/etsy-oauth-start-config-check`: `ETSY_KEYSTRING`, `ETSY_SHARED_SECRET`, `ETSY_REDIRECT_URI` (exact callback URL), and a long random `ETSY_STATUS_SECRET` for protected server-to-server routes.
4. Link a private Vercel Blob store to the Mathstub project so Vercel supplies `BLOB_READ_WRITE_TOKEN` to the preview runtime.
5. Redeploy this branch after settings change. Open `/api/etsy/oauth/start` on that branch's latest successful Preview and approve `listings_r listings_w shops_r` in Etsy.
6. Verify only after callback success: the callback confirms shop access and stores tokens privately. Protected `/api/etsy/oauth/status` reports connection metadata only; `/api/etsy/shop` performs authorized listing reads or draft creation. Live publishing is not provided. Digital file upload is not implemented and download listing creation is rejected.

Never place credentials in client-side code, `NEXT_PUBLIC_*`, source control, query strings, or chat. Do not promote this branch to production until the OAuth flow is tested and approved.
