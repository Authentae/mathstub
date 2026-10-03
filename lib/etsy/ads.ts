import { NextRequest, NextResponse } from 'next/server';

export const ETSY_ADS_DAILY_LIMIT_USD = 5;

export function requireAdsAutomationAuthorization(request: NextRequest) {
  const expected = process.env.ETSY_ADS_AUTOMATION_SECRET;
  const supplied = request.headers.get('authorization')?.replace(/^Bearer\s+/i, '');
  if (!expected || !supplied || supplied !== expected) {
    return NextResponse.json({ error: 'Unauthorized Etsy Ads automation request' }, { status: 401 });
  }
  return null;
}
