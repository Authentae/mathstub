import { describe, expect, it, vi, afterEach } from 'vitest';
import { ETSY_ADS_DAILY_LIMIT_USD, requireAdsAutomationAuthorization } from '../../lib/etsy/ads';

afterEach(() => vi.unstubAllEnvs());

describe('Etsy Ads safety boundary', () => {
  it('defines a $5 per-day maximum for a future authorized ads integration', () => {
    expect(ETSY_ADS_DAILY_LIMIT_USD).toBe(5);
  });

  it('rejects ads automation without its separately configured bearer secret', () => {
    vi.stubEnv('ETSY_ADS_AUTOMATION_SECRET', 'ads-secret');
    const request = new Request('https://app.test/api/etsy/ads', { headers: { Authorization: 'Bearer wrong' } });
    expect(requireAdsAutomationAuthorization(request as never)).toMatchObject({ status: 401 });
  });
});
