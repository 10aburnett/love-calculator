import type { Metadata } from 'next';
import { locales } from '@/i18n/request';
import { getAllPosts, getLocalizedContent, readingMinutes } from '@/content/blog';
import { blogUi } from '@/content/blog/ui';
import { blogIndexSchema, breadcrumbSchema, localeUrl, SITE_URL } from '@/lib/blogSchema';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/blog/Breadcrumbs';
import BlogCard from '@/components/blog/BlogCard';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const ui = blogUi[locale as keyof typeof blogUi] ?? blogUi.en;
  const url = localeUrl(locale, '/blog');

  return {
    title: `${ui.indexTitle} — Love, Attraction & Compatibility`,
    description: ui.indexSubtitle,
    alternates: {
      canonical: url,
      languages: Object.fromEntries(locales.map((loc) => [loc, localeUrl(loc, '/blog')])),
    },
    openGraph: {
      title: ui.indexTitle,
      description: ui.indexSubtitle,
      url,
      siteName: 'LoveCalcs',
      locale,
      type: 'website',
    },
    twitter: { card: 'summary_large_image', title: ui.indexTitle, description: ui.indexSubtitle },
  };
}

export default async function BlogIndexPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const ui = blogUi[locale as keyof typeof blogUi] ?? blogUi.en;
  const posts = getAllPosts();
  const homeHref = locale === 'en' ? '/' : `/${locale}`;

  const cards = posts.map((post) => {
    const content = getLocalizedContent(post, locale);
    return {
      post,
      content,
      href: `${homeHref === '/' ? '' : homeHref}/blog/${post.slug}`,
      reading: readingMinutes(content),
    };
  });

  const indexSchema = blogIndexSchema(
    cards.map((c) => ({ title: c.content.title, url: localeUrl(locale, `/blog/${c.post.slug}`) })),
    locale,
  );
  const crumbSchema = breadcrumbSchema([
    { name: 'LoveCalcs', url: localeUrl(locale, '/') },
    { name: ui.nav, url: localeUrl(locale, '/blog') },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(indexSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(crumbSchema) }} />
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
        <section className="pt-10 pb-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Breadcrumbs crumbs={[{ label: 'LoveCalcs', href: homeHref }, { label: ui.nav }]} />
            <div className="text-center mt-6 mb-2">
              <h1 className="text-4xl md:text-5xl font-playfair font-bold love-gradient-text mb-4">
                {ui.indexTitle}
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">{ui.indexSubtitle}</p>
            </div>
          </div>
        </section>

        <section className="pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {cards.map((c) => (
                <BlogCard
                  key={c.post.slug}
                  href={c.href}
                  emoji={c.post.emoji}
                  title={c.content.title}
                  excerpt={c.content.excerpt}
                  date={c.post.date}
                  readingMinutes={c.reading}
                  minReadLabel={ui.minRead}
                  readArticleLabel={ui.readArticle}
                  locale={locale}
                />
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
