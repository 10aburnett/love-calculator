import { MetadataRoute } from 'next'
import { locales } from '@/i18n/request'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://love-calculator.vercel.app'
  
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

  const sitemapEntries: MetadataRoute.Sitemap = []

  // Create entries for each locale and route combination
  locales.forEach(locale => {
    routes.forEach(route => {
      sitemapEntries.push({
        url: `${baseUrl}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: route === '' ? 1.0 : route === '/love-calculator' ? 0.9 : 0.8,
        alternates: {
          languages: Object.fromEntries(
            locales.map(lang => [lang, `${baseUrl}/${lang}${route}`])
          )
        }
      })
    })
  })

  return sitemapEntries
} 