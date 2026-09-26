# Etsy OAuth setup

This route pair provides the authorization-code/PKCE start and callback flow for the shop owner.

## Vercel environment variables

Set these as encrypted/sensitive values in the Vercel project:

- `ETSY_KEYSTRING`: Etsy app keystring.
- `ETSY_SHARED_SECRET`: Etsy app shared secret.
- `ETSY_REDIRECT_URI`: exact HTTPS callback URL, `https://www.mathstub.com/api/etsy/oauth/callback` (must be registered in Etsy app settings).
- `ETSY_API_KEY`: optional. If the station currently stores the combined value `keystring:shared_secret`, use it here. Otherwise omit this and the callback constructs the header from the two variables above.

Never expose these values in a `NEXT_PUBLIC_*` variable or client-side code.

## Authorization

1. Deploy this branch to a protected Vercel preview and set the variables for Preview.
2. In Etsy app settings, register the exact callback URL above.
3. Open `/api/etsy/oauth/start` on that preview URL while in the same browser session. Etsy prompts the shop owner to approve `listings_r listings_w shops_r`.
4. Etsy returns to `/api/etsy/oauth/callback`; it checks the one-use state and PKCE verifier and exchanges the code.
5. The callback verifies read access to the shop and returns the shop ID/name, but **does not persist OAuth tokens**. The OAuth response contains an access token and refresh token; they must be saved in a secure server-side secret store before later API calls can use the authorization.

## Important remaining work

Token persistence and refresh are deliberately not implemented in this first slice. Do not claim a durable/fully automated Etsy connection until token storage, refresh, revocation, and access verification have been implemented and tested. Do not expose callback response values in analytics or logs.
