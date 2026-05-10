import { NextResponse } from 'next/server';

export const runtime = 'edge';

interface SubscribeBody {
  email: string;
  source?: string;
  context?: Record<string, string | number>;
}

function isEmail(s: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s) && s.length < 254;
}

/**
 * POST /api/subscribe
 *
 * Captures an email + the calculator context for the lead magnet flow.
 *
 * Provider plumbing (set ONE of these in Vercel env vars to activate):
 *   CONVERTKIT_FORM_ID + CONVERTKIT_API_KEY
 *   MAILCHIMP_LIST_ID + MAILCHIMP_API_KEY + MAILCHIMP_DC
 *   RESEND_AUDIENCE_ID + RESEND_API_KEY
 *
 * If none are set, the route returns success but only logs (so the form
 * works visually during launch even before email backend is wired).
 */
export async function POST(request: Request): Promise<Response> {
  let body: SubscribeBody;
  try {
    body = (await request.json()) as SubscribeBody;
  } catch {
    return NextResponse.json({ ok: false, error: 'invalid json' }, { status: 400 });
  }

  const email = (body.email ?? '').trim().toLowerCase();
  if (!isEmail(email)) {
    return NextResponse.json({ ok: false, error: 'invalid email' }, { status: 400 });
  }

  const source = body.source ?? 'unknown';

  if (process.env.CONVERTKIT_FORM_ID && process.env.CONVERTKIT_API_KEY) {
    const r = await fetch(
      `https://api.convertkit.com/v3/forms/${process.env.CONVERTKIT_FORM_ID}/subscribe`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          api_key: process.env.CONVERTKIT_API_KEY,
          email,
          tags: [source],
          fields: body.context ?? {},
        }),
      },
    );
    if (!r.ok) return NextResponse.json({ ok: false }, { status: 502 });
  } else if (
    process.env.MAILCHIMP_LIST_ID &&
    process.env.MAILCHIMP_API_KEY &&
    process.env.MAILCHIMP_DC
  ) {
    const r = await fetch(
      `https://${process.env.MAILCHIMP_DC}.api.mailchimp.com/3.0/lists/${process.env.MAILCHIMP_LIST_ID}/members`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Basic ${Buffer.from(`anystring:${process.env.MAILCHIMP_API_KEY}`).toString('base64')}`,
        },
        body: JSON.stringify({
          email_address: email,
          status: 'subscribed',
          tags: [source],
          merge_fields: body.context ?? {},
        }),
      },
    );
    if (!r.ok && r.status !== 400) {
      return NextResponse.json({ ok: false }, { status: 502 });
    }
  } else if (process.env.RESEND_AUDIENCE_ID && process.env.RESEND_API_KEY) {
    const r = await fetch(
      `https://api.resend.com/audiences/${process.env.RESEND_AUDIENCE_ID}/contacts`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        },
        body: JSON.stringify({ email, unsubscribed: false }),
      },
    );
    if (!r.ok) return NextResponse.json({ ok: false }, { status: 502 });
  } else {
    console.log('[subscribe] no provider configured — logging only', { email, source });
  }

  return NextResponse.json({ ok: true });
}
