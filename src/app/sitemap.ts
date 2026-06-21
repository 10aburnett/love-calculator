import { MetadataRoute } from 'next'
import { locales, Locale } from '@/i18n/request'
import { getAllPosts } from '@/content/blog'

const baseUrl = 'https://www.lovecalcs.com'

const routes = [
  '',
  '/love-calculator',
  '/date-of-birth-calculator',
  '/zodiac-compatibility-calculator',
  '/about',
  '/contact',
  '/terms',
  '/privacy',
  '/relationship-quiz',
  '/communication-style-quiz',
  '/love-language-assessment',
  '/future-goals-compatibility',
  '/conflict-resolution-style',
]

// Honest last-modified dates.
//
// Pages carrying the date-rotating "Daily Love Insight" genuinely change every
// day, so they report today's UTC date. Every other route reports the date its
// content/metadata actually last changed — a fixed constant, updated only when
// the page really changes. We deliberately avoid the old `new Date()` on every
// route, which claimed "modified now" on every crawl; search engines learn to
// ignore a perpetually-now lastmod, so it was a wasted (and dishonest) signal.
const DAILY_ROUTES = new Set(['', '/love-calculator'])

// Last genuine content/metadata change for non-daily routes (YYYY-MM-DD).
// Bump these when you actually edit the corresponding page.
const STATIC_LASTMOD: Record<string, string> = {
  '/date-of-birth-calculator': '2026-03-04',
  '/zodiac-compatibility-calculator': '2026-03-04',
  '/relationship-quiz': '2026-03-04',
  '/communication-style-quiz': '2026-03-04',
  '/love-language-assessment': '2026-03-04',
  '/future-goals-compatibility': '2026-03-04',
  '/conflict-resolution-style': '2026-03-04',
  '/about': '2025-07-11',
  '/contact': '2025-07-11',
  '/terms': '2025-07-11',
  '/privacy': '2025-07-11',
}

function todayUTC(): string {
  const now = new Date()
  return new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()))
    .toISOString()
    .slice(0, 10)
}

function lastModFor(route: string): string {
  if (DAILY_ROUTES.has(route)) return todayUTC()
  return STATIC_LASTMOD[route] ?? '2026-03-04'
}

// Generate sitemap index entries - one sitemap per locale
export async function generateSitemaps() {
  return locales.map((locale) => ({ id: locale }))
}

// Generate sitemap for a specific locale
export default async function sitemap({ id }: { id: string }): Promise<MetadataRoute.Sitemap> {
  const locale = id as Locale

  const localeUrl = (lang: string, route: string) =>
    lang === 'en' ? `${baseUrl}${route || '/'}` : `${baseUrl}/${lang}${route}`

  const staticEntries: MetadataRoute.Sitemap = routes.map((route) => ({
    url: localeUrl(locale, route),
    lastModified: lastModFor(route),
    changeFrequency: (DAILY_ROUTES.has(route) ? 'daily' : 'weekly') as const,
    priority: route === '' ? 1.0 : route === '/love-calculator' ? 0.9 : 0.8,
    alternates: {
      languages: Object.fromEntries(
        locales.map((lang) => [lang, localeUrl(lang, route)])
      ),
    },
  }))

  const posts = getAllPosts()

  // Blog index — lastmod tracks the most recent post.
  const newestPost = posts.reduce(
    (latest, p) => ((p.updated ?? p.date) > latest ? (p.updated ?? p.date) : latest),
    '2026-01-01',
  )
  const blogIndexEntry: MetadataRoute.Sitemap[number] = {
    url: localeUrl(locale, '/blog'),
    lastModified: newestPost,
    changeFrequency: 'weekly',
    priority: 0.7,
    alternates: {
      languages: Object.fromEntries(locales.map((lang) => [lang, localeUrl(lang, '/blog')])),
    },
  }

  // Individual posts — honest lastmod from each post's own date.
  const postEntries: MetadataRoute.Sitemap = posts.map((post) => {
    const route = `/blog/${post.slug}`
    return {
      url: localeUrl(locale, route),
      lastModified: post.updated ?? post.date,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
      alternates: {
        languages: Object.fromEntries(locales.map((lang) => [lang, localeUrl(lang, route)])),
      },
    }
  })

  return [...staticEntries, blogIndexEntry, ...postEntries]
}
