import Link from 'next/link';
import { liveTools } from '@/lib/tools';
import { SITE_NAME } from '@/lib/seo';

export function Header() {
  const tools = liveTools();
  return (
    <header className="border-b border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-950">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-3">
        <Link href="/" className="text-lg font-semibold text-brand-700 dark:text-brand-100">
          {SITE_NAME}
        </Link>

        {/*
          Desktop nav: collapse the 8 tools into a hover-revealed dropdown so
          the top bar stays scannable. Native <details>/<summary> keeps it
          keyboard-accessible without JS state.
        */}
        <nav className="hidden text-sm sm:block">
          <ul className="flex flex-wrap items-center justify-end gap-x-4 gap-y-1">
            <li className="relative">
              <details className="group">
                <summary className="cursor-pointer list-none rounded text-gray-700 hover:text-brand-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2 dark:text-gray-200 dark:hover:text-brand-100 dark:focus-visible:ring-offset-gray-950">
                  Tools ▾
                </summary>
                <ul className="absolute right-0 z-20 mt-2 min-w-[260px] rounded-md border border-gray-200 bg-white p-2 shadow-lg dark:border-gray-800 dark:bg-gray-950">
                  {tools.map((t) => (
                    <li key={t.slug}>
                      <Link
                        href={`/${t.slug}`}
                        className="block rounded px-3 py-2 text-gray-700 hover:bg-gray-50 hover:text-brand-700 dark:text-gray-200 dark:hover:bg-gray-900 dark:hover:text-brand-100"
                      >
                        {t.emoji ? `${t.emoji} ` : ''}
                        {t.shortTitle}
                      </Link>
                    </li>
                  ))}
                </ul>
              </details>
            </li>
            <li>
              <Link
                href="/equity-comp-tax-map"
                className="text-gray-700 hover:text-brand-700 dark:text-gray-200 dark:hover:text-brand-100"
              >
                Tax Map
              </Link>
            </li>
            <li>
              <Link
                href="/blog"
                className="text-gray-700 hover:text-brand-700 dark:text-gray-200 dark:hover:text-brand-100"
              >
                Blog
              </Link>
            </li>
            <li>
              <Link
                href="/toolkit"
                className="text-gray-700 hover:text-brand-700 dark:text-gray-200 dark:hover:text-brand-100"
              >
                Toolkit
              </Link>
            </li>
          </ul>
        </nav>

        {/*
          Mobile nav: <details>/<summary> Tools menu lists every calc so users
          on phones can jump directly between tools without going home first.
        */}
        <nav className="text-sm sm:hidden">
          <ul className="flex items-center gap-1">
            <li>
              <details className="relative">
                <summary className="inline-flex min-h-11 cursor-pointer list-none items-center rounded-md px-3 py-2 text-gray-700 hover:bg-gray-100 hover:text-brand-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2 dark:text-gray-200 dark:hover:bg-gray-800 dark:hover:text-brand-100 dark:focus-visible:ring-offset-gray-950">
                  Tools ▾
                </summary>
                <ul className="absolute right-0 z-20 mt-1 min-w-[240px] rounded-md border border-gray-200 bg-white p-2 shadow-lg dark:border-gray-800 dark:bg-gray-950">
                  {tools.map((t) => (
                    <li key={t.slug}>
                      <Link
                        href={`/${t.slug}`}
                        className="block rounded px-3 py-2 text-gray-700 hover:bg-gray-50 hover:text-brand-700 dark:text-gray-200 dark:hover:bg-gray-900 dark:hover:text-brand-100"
                      >
                        {t.emoji ? `${t.emoji} ` : ''}
                        {t.shortTitle}
                      </Link>
                    </li>
                  ))}
                </ul>
              </details>
            </li>
            <li>
              <Link
                href="/equity-comp-tax-map"
                className="inline-flex min-h-11 items-center rounded-md px-3 py-2 text-gray-700 hover:bg-gray-100 hover:text-brand-700 dark:text-gray-200 dark:hover:bg-gray-800 dark:hover:text-brand-100"
              >
                Tax Map
              </Link>
            </li>
            <li>
              <Link
                href="/blog"
                className="inline-flex min-h-11 items-center rounded-md px-3 py-2 text-gray-700 hover:bg-gray-100 hover:text-brand-700 dark:text-gray-200 dark:hover:bg-gray-800 dark:hover:text-brand-100"
              >
                Blog
              </Link>
            </li>
            <li>
              <Link
                href="/toolkit"
                className="inline-flex min-h-11 items-center rounded-md px-3 py-2 text-gray-700 hover:bg-gray-100 hover:text-brand-700 dark:text-gray-200 dark:hover:bg-gray-800 dark:hover:text-brand-100"
              >
                Toolkit
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
