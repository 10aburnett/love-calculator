import type { Locale } from '@/i18n/request';
import type { BlogPost, BlogPostContent } from './types';
import { welcomeToLovecalcs } from './posts/welcome-to-lovecalcs';
// Additional pillar posts — written and translated, ready to publish in due
// course. Re-add to POSTS below to make them live.
// import { whatYourLovePercentageMeans } from './posts/what-your-love-percentage-means';
// import { zodiacLoveCompatibilityGuide } from './posts/zodiac-love-compatibility-guide';
// import { nameCompatibilityScienceOfAttraction } from './posts/name-compatibility-science-of-attraction';
import { getBlogTranslation } from './translations';

// Registry of all live blog posts. Add posts here to publish them.
const POSTS: BlogPost[] = [
  welcomeToLovecalcs,
];

/** All posts, newest first. */
export function getAllPosts(): BlogPost[] {
  return [...POSTS].sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostSlugs(): string[] {
  return POSTS.map((p) => p.slug);
}

export function getPost(slug: string): BlogPost | undefined {
  return POSTS.find((p) => p.slug === slug);
}

/** Localized content for a post, falling back to English when not translated.
 *  Checks inline per-post translations first, then the shared translations
 *  registry, then English. */
export function getLocalizedContent(post: BlogPost, locale: string): BlogPostContent {
  if (locale === 'en') return post.content.en;
  return (
    post.content[locale as Locale] ??
    getBlogTranslation(locale, post.slug) ??
    post.content.en
  );
}

/** Rough reading-time estimate. Handles space-delimited and CJK scripts. */
export function readingMinutes(content: BlogPostContent): number {
  const text = [
    content.intro,
    ...content.sections.map((s) => `${s.heading} ${s.body}`),
    ...content.faq.flatMap((f) => [f.question, f.answer]),
  ]
    .join(' ')
    .trim();
  const spaceWords = text.split(/\s+/).filter(Boolean).length;
  // CJK text has few spaces — fall back to a character-based estimate.
  const words = Math.max(spaceWords, Math.round(text.length / 6));
  return Math.max(1, Math.round(words / 200));
}

export function getRelatedPosts(slug: string, limit = 2): BlogPost[] {
  return getAllPosts()
    .filter((p) => p.slug !== slug)
    .slice(0, limit);
}
