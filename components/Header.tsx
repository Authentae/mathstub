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

        <nav className="hidden text-sm sm:block">
          <ul className="flex flex-wrap justify-end gap-x-4 gap-y-1">
            {tools.map((t) => (
              <li key={t.slug}>
                <Link
                  href={`/${t.slug}`}
                  className="text-gray-700 hover:text-brand-700 dark:text-gray-200 dark:hover:text-brand-100"
                >
                  {t.shortTitle}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/blog"
                className="text-gray-700 hover:text-brand-700 dark:text-gray-200 dark:hover:text-brand-100"
              >
                Blog
              </Link>
            </li>
          </ul>
        </nav>

        <nav className="text-sm sm:hidden">
          <ul className="flex gap-2">
            <li>
              <Link
                href="/"
                className="inline-flex min-h-11 items-center rounded-md px-3 py-2 text-gray-700 hover:bg-gray-100 hover:text-brand-700 dark:text-gray-200 dark:hover:bg-gray-800 dark:hover:text-brand-100"
              >
                Tools
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
          </ul>
        </nav>
      </div>
    </header>
  );
}
