import { locales } from '@/i18n/request'

const baseUrl = 'https://www.lovecalcs.com'

// Regenerate hourly so the index <lastmod> advances with each daily rotation.
export const revalidate = 3600

export async function GET() {
  // Each per-locale sitemap contains the daily-rotating home and love-calculator
  // pages, so the index legitimately changes every day — report today's UTC date
  // (date granularity, not a per-request timestamp).
  const now = new Date()
  const lastmod = new Date(
    Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate())
  )
    .toISOString()
    .slice(0, 10)

  const sitemapIndex = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${locales.map((locale) => `  <sitemap>
    <loc>${baseUrl}/sitemap/${locale}.xml</loc>
    <lastmod>${lastmod}</lastmod>
  </sitemap>`).join('\n')}
</sitemapindex>`

  return new Response(sitemapIndex, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  })
}
