# Etsy shop connection setup

This branch implements the Etsy OAuth authorization-code/PKCE handshake, validates OAuth state, checks shop access, and saves access and refresh tokens to a private Vercel Blob. It does not create, edit, or publish listings.

## Configure the preview

The preview domain below was returned by Vercel for this branch:

`https://mathstub-git-feat-etsy-oauth-callback-authentaes-projects.vercel.app`

1. In Etsy Developer Apps, add this exact callback URL: `https://mathstub-git-feat-etsy-oauth-callback-authentaes-projects.vercel.app/api/etsy/oauth/callback`.
2. In Vercel Preview environment variables scoped to branch `feat/etsy-oauth-callback`, set `ETSY_KEYSTRING`, `ETSY_SHARED_SECRET`, and `ETSY_REDIRECT_URI` (the exact callback URL above). Use encrypted/sensitive values; never use `NEXT_PUBLIC_*` variables.
3. Link the private Blob store `etsy-oauth-tokens` to the `mathstub` project in Preview and verify `BLOB_READ_WRITE_TOKEN` is available.
4. Redeploy the branch preview so it picks up the updated settings.
5. Open `https://mathstub-git-feat-etsy-oauth-callback-authentaes-projects.vercel.app/api/etsy/oauth/start` and approve the requested scopes: `listings_r listings_w shops_r`.
6. A successful callback returns `{ "authorized": true, ... }` and stores tokens at `private/etsy/shop-oauth.json` in private Blob storage.

Do not enable Etsy Developer Mode on your live shop. The callback performs a read-only shop check and stores tokens; it does not publish or change listings. Refresh-token automation and listing workflows still require implementation and testing before unattended use.
