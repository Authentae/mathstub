# Etsy shop connection setup

The `/api/etsy/oauth/start` and `/api/etsy/oauth/callback` routes implement the authorization-code/PKCE handshake. The callback verifies shop access but does **not** persist OAuth tokens. This is not yet a durable Etsy integration.

## Configure a preview safely

1. Add these as encrypted/sensitive Vercel Preview environment variables for the `feat/etsy-oauth-callback` branch:
   - `ETSY_KEYSTRING`: your Etsy app keystring.
   - `ETSY_SHARED_SECRET`: your Etsy app shared secret.
   - `ETSY_REDIRECT_URI`: the exact callback URL registered in Etsy. For the preview alias below, use `https://mathstub-git-feat-etsy-oauth-callback-authentaes-projects.vercel.app/api/etsy/oauth/callback`.
2. In Etsy Developer Apps, add that exact HTTPS callback URL to the app. Do not enable Developer Mode for your live shop.
3. Redeploy the preview after setting environment variables. Open `https://mathstub-git-feat-etsy-oauth-callback-authentaes-projects.vercel.app/api/etsy/oauth/start` and approve the requested scopes: `listings_r listings_w shops_r`.
4. The callback returns a shop verification result. It does not keep the access/refresh tokens, so authorization must not be treated as durable and listing automation is not ready until secure token storage and refresh are implemented.

The callback URI must exactly match between Etsy app settings, `ETSY_REDIRECT_URI`, and the request. Never put secrets in `NEXT_PUBLIC_*`, source files, chat, or browser-visible settings.

## Route behavior

- Start: generates one-use state and PKCE verifier/challenge, stores the transaction in a short-lived HttpOnly cookie, and redirects to Etsy.
- Callback: verifies state, exchanges the authorization code, extracts the shop ID from the token, and performs a read-only shop lookup. It never creates, edits, or publishes a listing.
- Current limitation: token persistence, refresh, revocation, and durable verification are not implemented.
