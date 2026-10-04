# Etsy OAuth production checklist

## Create/configure the Etsy app

1. In the Etsy Developer portal, verify the app is approved for commercial access and record its API keystring and shared secret.
2. Add the deployed OAuth callback URL exactly as shown by the deployment, for example `https://<deployment-host>/api/etsy/oauth/callback`.
3. Use Etsy's OAuth authorization flow with PKCE and the required scopes. This project stores and rotates the shop access and refresh tokens in private Vercel Blob storage after Etsy consent. An API key does not grant shop scopes by itself.

## Required environment configuration

Set the following in Vercel for the deployment environment that will run the automation:

- `ETSY_KEYSTRING`: Etsy API keystring (not the OAuth token).
- `ETSY_SHARED_SECRET`: Etsy app shared secret.
- `ETSY_REDIRECT_URI`: exact deployed callback URL.
- `ETSY_AUTOMATION_SECRET`: high-entropy bearer secret used to authenticate scheduled requests.
- `ETSY_STATUS_SECRET`: separate secret for status and report routes.
- `BLOB_READ_WRITE_TOKEN`: private Vercel Blob access.
- `NEXT_PUBLIC_SITE_URL`: canonical deployed site origin.

After changing variables, redeploy the preview or production environment that should receive them. Do not place secret values in Git, URLs, logs, or screenshots.

## Connect the shop

1. Open `/api/etsy/oauth/start` in a signed-in browser and complete Etsy consent.
2. Confirm the callback verifies the state and PKCE verifier, then stores the scoped token record in private Blob storage.
3. Run `/api/etsy/oauth/status` and confirm the shop token, expiry, and required scopes. Listing research requires the supported read scopes; listing publication requires explicit `listings_w` consent.
4. For any unattended routine, use a protected preview or production endpoint only after confirming that the routine platform can access the deployment, that the bearer secret is configured, and that the E-STOP is intentionally released.

## Listing safeguards

The listing route requires `listings_w`, readiness confirmation and evidence, a stable `Idempotency-Key`, and private Blob storage for its quota lock and publication history. It creates an Etsy draft, uploads required assets, activates only after successful uploads, then reads the listing back before recording a successful publication. It enforces a maximum of three successful listings in any rolling seven-day window, with no separate daily cap. Readiness confirmation is caller-supplied information, not an independent AI quality verdict.

Etsy's Ads controls and reporting are not implemented here. The `$5` daily cap is a proposed ceiling only, not a configured or verified Etsy budget. No ad spend occurs through these routes.

## Before launch

- Run typecheck, tests, and production build.
- Verify the callback URL on the intended Vercel deployment and complete Etsy consent with the required OAuth scopes.
- Verify that a protected listing read works and that a staging listing can be created, uploaded, activated, and read back before enabling automation.
- Verify scheduled invocation authorization and run a no-write report first.
- Keep the scheduler stopped until the Commander approves a production smoke test and clears the E-STOP.
