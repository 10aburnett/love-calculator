import { MetadataRoute } from 'next'
import { locales, Locale } from '@/i18n/request'

const baseUrl = 'https://lovecalcs.com'

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

// Generate sitemap index entries - one sitemap per locale
export async function generateSitemaps() {
  return locales.map((locale) => ({ id: locale }))
}

// Generate sitemap for a specific locale
export default async function sitemap({ id }: { id: string }): Promise<MetadataRoute.Sitemap> {
  const locale = id as Locale

  return routes.map((route) => ({
    url: `${baseUrl}/${locale}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : route === '/love-calculator' ? 0.9 : 0.8,
    alternates: {
      languages: Object.fromEntries(
        locales.map((lang) => [lang, `${baseUrl}/${lang}${route}`])
      ),
    },
  }))
} 