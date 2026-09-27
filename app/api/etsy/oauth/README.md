# Etsy OAuth setup for Mathstub

This feature branch implements Etsy OAuth authorization-code/PKCE, signed state transaction cookies, shop-access verification, private Vercel Blob token storage, and token refresh. The protected API routes are server-to-server only. No live listing is published by these routes.

## Before the Commander authorizes the shop

1. Use the HTTPS preview URL assigned to the latest successful Vercel deployment for branch `feat/etsy-oauth-callback`. Do not use a guessed or old preview hostname.
2. In Etsy Developer Apps, register the exact callback URL: `https://<current-preview-host>/api/etsy/oauth/callback`.
3. In Vercel, set these variables for Preview and branch `feat/etsy-oauth-callback`: `ETSY_KEYSTRING`, `ETSY_SHARED_SECRET`, `ETSY_REDIRECT_URI` (exact callback URL), and a long random `ETSY_STATUS_SECRET` for protected server-to-server routes.
4. Link the private Vercel Blob store to the Mathstub project so Vercel supplies `BLOB_READ_WRITE_TOKEN` to the preview runtime.
5. Redeploy the feature branch after settings change. The Commander must open `/api/etsy/oauth/start` and approve `listings_r listings_w shops_r` in Etsy.
6. Verify only after callback success: the callback confirms shop access and stores tokens privately. Protected status route reads connection metadata only; protected `/api/etsy/shop` performs listing reads or can create drafts if deliberately invoked. No live listing should be published by this workflow. Digital file upload is not implemented and downloads are rejected.

Never place credentials in client-side code, `NEXT_PUBLIC_*`, source control, query strings, or chat. Do not promote this branch to production until the OAuth flow is tested and approved.
