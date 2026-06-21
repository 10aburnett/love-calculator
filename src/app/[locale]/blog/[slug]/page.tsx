import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Clock, ArrowRight, ArrowLeft } from 'lucide-react';
import { locales } from '@/i18n/request';
import {
  getPost,
  getPostSlugs,
  getLocalizedContent,
  readingMinutes,
  getRelatedPosts,
} from '@/content/blog';
import { blogUi } from '@/content/blog/ui';
import { getTranslations, useTranslations as createTranslator } from '@/lib/translations';

// Map a tool's path to the translation key already used by the site Header, so
// related-tool labels render in the page's language (only the brand stays as-is).
const TOOL_LABEL_KEYS: Record<string, string> = {
  '/love-calculator': 'header.loveCalculator',
  '/zodiac-compatibility-calculator': 'header.zodiacCalculator',
  '/relationship-quiz': 'header.relationshipQuiz',
  '/date-of-birth-calculator': 'header.dobCalculator',
  '/love-language-assessment': 'header.loveLanguageAssessment',
  '/communication-style-quiz': 'header.communicationQuiz',
  '/future-goals-compatibility': 'header.futureGoalsCompatibility',
  '/conflict-resolution-style': 'header.conflictResolutionQuiz',
};
import {
  articleSchema,
  faqSchema,
  breadcrumbSchema,
  localeUrl,
} from '@/lib/blogSchema';
import { buildAlternates } from '@/lib/hreflang';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/blog/Breadcrumbs';
import BlogContent from '@/components/blog/BlogContent';
import ShareButtons from '@/components/blog/ShareButtons';

export function generateStaticParams() {
  const slugs = getPostSlugs();
  return locales.flatMap((locale) => slugs.map((slug) => ({ locale, slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  const content = getLocalizedContent(post, locale);
  const url = localeUrl(locale, `/blog/${slug}`);

  return {
    title: content.title,
    description: content.description,
    authors: [{ name: post.author }],
    alternates: buildAlternates(locale, `/blog/${slug}`),
    openGraph: {
      title: content.title,
      description: content.description,
      url,
      siteName: 'LoveCalcs',
      locale,
      type: 'article',
      publishedTime: post.date,
      modifiedTime: post.updated ?? post.date,
      authors: [post.author],
      tags: post.tags,
    },
    twitter: { card: 'summary_large_image', title: content.title, description: content.description },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const content = getLocalizedContent(post, locale);
  const ui = blogUi[locale as keyof typeof blogUi] ?? blogUi.en;
  const reading = readingMinutes(content);

  // Resolve related-tool labels into the page's language.
  const translations = await getTranslations(locale);
  const t = createTranslator(translations);
  const toolLabel = (tool: { href: string; label: string }) => {
    const key = TOOL_LABEL_KEYS[tool.href];
    if (key) {
      const translated = t(key);
      if (translated && translated !== key) return translated;
    }
    return tool.label;
  };
  const homeHref = locale === 'en' ? '/' : `/${locale}`;
  const blogHref = `${homeHref === '/' ? '' : homeHref}/blog`;
  const postUrl = localeUrl(locale, `/blog/${slug}`);
  const related = getRelatedPosts(slug);

  let formattedDate = post.date;
  try {
    formattedDate = new Intl.DateTimeFormat(locale || 'en', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      timeZone: 'UTC',
    }).format(new Date(`${post.date}T00:00:00Z`));
  } catch {
    // keep ISO fallback
  }

  const article = articleSchema(post, content, locale);
  const faq = faqSchema(content.faq);
  const crumbs = breadcrumbSchema([
    { name: 'LoveCalcs', url: localeUrl(locale, '/') },
    { name: ui.nav, url: localeUrl(locale, '/blog') },
    { name: content.title, url: postUrl },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(article) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(crumbs) }} />
      <Header />
      <main className="min-h-screen bg-white">
        {/* Hero */}
        <section className="bg-gradient-to-br from-pink-50 via-white to-purple-50 pt-8 pb-10">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <Breadcrumbs
              crumbs={[
                { label: 'LoveCalcs', href: homeHref },
                { label: ui.nav, href: blogHref },
                { label: content.title },
              ]}
            />
            <div className="text-center mt-6">
              <div className="text-6xl mb-4" aria-hidden>
                {post.emoji}
              </div>
              <h1 className="text-3xl md:text-5xl font-playfair font-bold text-gray-900 leading-tight mb-4">
                {content.title}
              </h1>
              <div className="flex items-center justify-center gap-4 text-sm text-gray-500">
                <span suppressHydrationWarning>
                  {ui.published} {formattedDate}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {reading} {ui.minRead}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Body */}
        <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          {/* Table of contents */}
          {content.sections.length > 1 && (
            <nav className="bg-pink-50 border border-pink-100 rounded-2xl p-6 mb-10">
              <h2 className="text-sm font-bold uppercase tracking-wide text-pink-700 mb-3">
                {ui.contents}
              </h2>
              <ul className="space-y-2">
                {content.sections.map((s) => (
                  <li key={s.anchor}>
                    <a
                      href={`#${s.anchor}`}
                      className="text-gray-700 hover:text-pink-600 transition-colors"
                    >
                      {s.heading}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          )}

          {/* Intro */}
          <BlogContent markdown={content.intro} locale={locale} />

          {/* Sections */}
          {content.sections.map((s) => (
            <section key={s.anchor} id={s.anchor} className="mt-10 scroll-mt-24">
              <h2 className="text-2xl md:text-3xl font-playfair font-bold text-gray-900 mb-4">
                {s.heading}
              </h2>
              <BlogContent markdown={s.body} locale={locale} />
            </section>
          ))}

          {/* FAQ */}
          {content.faq.length > 0 && (
            <section className="mt-14">
              <h2 className="text-2xl md:text-3xl font-playfair font-bold text-gray-900 mb-6">
                {ui.faqHeading}
              </h2>
              <div className="space-y-4">
                {content.faq.map((f, i) => (
                  <details
                    key={i}
                    className="group bg-gray-50 rounded-xl p-5 border border-gray-100"
                  >
                    <summary className="font-semibold text-gray-900 cursor-pointer list-none flex justify-between items-center">
                      {f.question}
                      <span className="text-pink-500 group-open:rotate-45 transition-transform text-xl leading-none">
                        +
                      </span>
                    </summary>
                    <div className="mt-3">
                      <BlogContent markdown={f.answer} locale={locale} />
                    </div>
                  </details>
                ))}
              </div>
            </section>
          )}

          {/* Related tools (internal links) */}
          {post.relatedTools.length > 0 && (
            <section className="mt-14">
              <h2 className="text-xl font-playfair font-bold text-gray-900 mb-4">{ui.tryNext}</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {post.relatedTools.map((tool) => (
                  <Link
                    key={tool.href}
                    href={locale === 'en' ? tool.href : `/${locale}${tool.href}`}
                    className="flex items-center gap-3 bg-white border border-pink-100 rounded-xl p-4 shadow-sm hover:shadow-md hover:border-pink-300 transition-all"
                  >
                    <span className="text-2xl" aria-hidden>
                      {tool.emoji}
                    </span>
                    <span className="font-semibold text-gray-800">{toolLabel(tool)}</span>
                    <ArrowRight className="w-4 h-4 text-pink-500 ml-auto" />
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Share */}
          <div className="mt-12 pt-8 border-t border-gray-100">
            <ShareButtons url={postUrl} title={content.title} shareLabel={ui.share} />
          </div>
        </article>

        {/* Related posts */}
        {related.length > 0 && (
          <section className="bg-gradient-to-r from-pink-50 to-purple-50 py-12">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-2xl font-playfair font-bold text-gray-900 mb-6 text-center">
                {ui.keepReading}
              </h2>
              <div className="grid sm:grid-cols-2 gap-6">
                {related.map((rp) => {
                  const rc = getLocalizedContent(rp, locale);
                  return (
                    <Link
                      key={rp.slug}
                      href={`${blogHref}/${rp.slug}`}
                      className="group bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all flex items-start gap-4"
                    >
                      <span className="text-3xl" aria-hidden>
                        {rp.emoji}
                      </span>
                      <div>
                        <h3 className="font-playfair font-bold text-gray-900 group-hover:text-pink-600 transition-colors">
                          {rc.title}
                        </h3>
                        <p className="text-sm text-gray-600 mt-1 line-clamp-2">{rc.excerpt}</p>
                      </div>
                    </Link>
                  );
                })}
              </div>
              <div className="text-center mt-8">
                <Link
                  href={blogHref}
                  className="inline-flex items-center gap-2 text-pink-600 font-semibold hover:text-pink-700"
                >
                  <ArrowLeft className="w-4 h-4" />
                  {ui.allArticles}
                </Link>
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
