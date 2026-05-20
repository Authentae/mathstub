import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Analytics, AdsenseLoader } from '@/components/Analytics';
import { Analytics as VercelAnalytics } from '@vercel/analytics/next';
import { SITE_NAME, siteUrl } from '@/lib/seo';
import { env } from '@/lib/env';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl()),
  title: {
    default: `${SITE_NAME} — free tools for your money and your time`,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    'Small, fast utility calculators for things that actually matter. RSU tax shortfalls, equity comp planning, and more — free and ad-supported.',
  applicationName: SITE_NAME,
  formatDetection: { email: false, address: false, telephone: false },
  ...(env.gscVerification()
    ? { other: { 'google-site-verification': env.gscVerification()! } }
    : {}),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const adsenseClient = env.adsense.clientId();
  return (
    <html lang="en" className="dark">
      <head>
        <meta name="impact-site-verification" content="7dd46510-dd74-4c10-a4ce-5cddf36a1e85" />
        {adsenseClient && (
          // Static <script> in <head> so the AdSense crawler can detect the
          // snippet in the initial HTML response (next/script with strategy
          // "afterInteractive" injects the tag client-side and the crawler
          // never sees it).
          <script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseClient}`}
            crossOrigin="anonymous"
          />
        )}
      </head>
      <body className="flex min-h-screen flex-col">
        <Header />
        <div className="flex-1">{children}</div>
        <Footer />
        <Analytics />
        <VercelAnalytics />
        <AdsenseLoader />
      </body>
    </html>
  );
}
