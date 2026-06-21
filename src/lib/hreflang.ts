import { locales } from '@/i18n/request';

const baseUrl = 'https://www.lovecalcs.com';

/**
 * Build correct, self-consistent canonical + hreflang alternates for a page.
 *
 * - `path` is the route without locale, e.g. '' (home), '/about',
 *   '/blog/welcome-to-lovecalcs'.
 * - canonical points to the CURRENT locale's URL (self-referencing).
 * - languages lists every locale plus an `x-default` pointing to the English URL.
 *
 * English has no locale prefix (as-needed), so its URLs are unprefixed.
 */
export function buildAlternates(locale: string, path: string) {
  const clean = path === '/' ? '' : path;
  const url = (loc: string) =>
    loc === 'en' ? `${baseUrl}${clean || '/'}` : `${baseUrl}/${loc}${clean}`;

  const languages: Record<string, string> = {};
  for (const loc of locales) languages[loc] = url(loc);
  languages['x-default'] = url('en');

  return {
    canonical: url(locale),
    languages,
  };
}
