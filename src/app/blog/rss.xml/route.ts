import { getAllPosts, getLocalizedContent } from '@/content/blog'
import { localeUrl, SITE_URL } from '@/lib/blogSchema'

function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

export async function GET() {
  const posts = getAllPosts()

  const items = posts
    .map((post) => {
      const content = getLocalizedContent(post, 'en')
      const url = localeUrl('en', `/blog/${post.slug}`)
      const pubDate = new Date(`${post.date}T00:00:00Z`).toUTCString()
      return `    <item>
      <title>${escapeXml(content.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${pubDate}</pubDate>
      <description>${escapeXml(content.excerpt)}</description>
    </item>`
    })
    .join('\n')

  const newest = posts[0]
  const lastBuildDate = newest
    ? new Date(`${newest.updated ?? newest.date}T00:00:00Z`).toUTCString()
    : new Date().toUTCString()

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>The LoveCalcs Blog</title>
    <link>${localeUrl('en', '/blog')}</link>
    <description>Playful, honest reads on love, attraction, and compatibility.</description>
    <language>en</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <atom:link href="${SITE_URL}/blog/rss.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>`

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  })
}
