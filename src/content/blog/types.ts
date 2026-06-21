import type { Locale } from '@/i18n/request';

/** A single FAQ entry — rendered visibly and emitted as FAQPage JSON-LD. */
export interface BlogFAQ {
  question: string;
  answer: string; // markdown allowed
}

/** A content section. `anchor` drives the table-of-contents links. */
export interface BlogSection {
  heading: string;
  anchor: string;
  body: string; // markdown
}

/** The translatable body of a post. One per locale. */
export interface BlogPostContent {
  title: string;
  description: string; // meta description
  excerpt: string; // shown on the blog index card
  intro: string; // markdown, before the first section
  sections: BlogSection[];
  faq: BlogFAQ[];
}

/** A link from a post to one of the site's tools (internal linking for SEO). */
export interface RelatedTool {
  /** Route relative to the locale root, e.g. "/love-calculator". */
  href: string;
  /** Visible label (English; localized variants live in content where needed). */
  label: string;
  emoji: string;
}

/** Locale-independent metadata + the per-locale content map. */
export interface BlogPost {
  slug: string;
  /** ISO date published (YYYY-MM-DD). */
  date: string;
  /** ISO date last meaningfully updated (YYYY-MM-DD). */
  updated?: string;
  author: string;
  tags: string[];
  /** Simple decorative emoji used in cards/hero (keeps us image-free for now). */
  emoji: string;
  relatedTools: RelatedTool[];
  /** English is required; other locales added as translations land. */
  content: Partial<Record<Locale, BlogPostContent>> & { en: BlogPostContent };
}
