import type { BlogPost, BlogPostContent, BlogFAQ } from '@/content/blog/types';

export const SITE_URL = 'https://www.lovecalcs.com';
const SITE_NAME = 'LoveCalcs';
const LOGO_URL = `${SITE_URL}/favicon-32x32.png`;

/** Absolute URL for a path in a given locale (English has no prefix). */
export function localeUrl(locale: string, path: string): string {
  const clean = path.startsWith('/') ? path : `/${path}`;
  return locale === 'en' ? `${SITE_URL}${clean}` : `${SITE_URL}/${locale}${clean}`;
}

export function articleSchema(
  post: BlogPost,
  content: BlogPostContent,
  locale: string,
): Record<string, unknown> {
  const url = localeUrl(locale, `/blog/${post.slug}`);
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: content.title,
    description: content.description,
    inLanguage: locale,
    datePublished: post.date,
    dateModified: post.updated ?? post.date,
    author: { '@type': 'Organization', name: post.author, url: SITE_URL },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      logo: { '@type': 'ImageObject', url: LOGO_URL },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    url,
    keywords: post.tags.join(', '),
  };
}

export function faqSchema(faq: BlogFAQ[]): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  };
}

export function breadcrumbSchema(
  items: { name: string; url: string }[],
): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function blogIndexSchema(
  posts: { title: string; url: string }[],
  locale: string,
): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: `${SITE_NAME} Blog`,
    url: localeUrl(locale, '/blog'),
    inLanguage: locale,
    blogPost: posts.map((p) => ({ '@type': 'BlogPosting', headline: p.title, url: p.url })),
  };
}
