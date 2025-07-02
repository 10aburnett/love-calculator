import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Inter, Playfair_Display } from 'next/font/google';
import { locales } from '@/i18n/request';
import { getTranslations } from '@/lib/translations';
import GoogleAnalytics from '@/components/GoogleAnalytics';
import '../globals.css';

const inter = Inter({ subsets: ['latin'] });
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' });

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  
  // Load translations for metadata
  const translations = await getTranslations(locale);
  const meta = translations.meta || {};
  
  return {
    title: meta.title || 'Love Calculator – Free Name Compatibility & Love Compatibility Test',
    description: meta.description || 'Discover your love compatibility with our free Love Calculator! Test relationship compatibility, name match, and get fun personalized results to share.',
    keywords: meta.keywords || ['love calculator', 'name compatibility', 'love compatibility test', 'relationship quiz', 'fun love test'],
    alternates: {
      canonical: `https://lovecalcs.com/${locale}`,
      languages: Object.fromEntries(
        locales.map(loc => [loc, `https://lovecalcs.com/${loc}`])
      )
    },
    openGraph: {
      title: meta.title || 'Love Calculator – Free Name Compatibility & Love Compatibility Test',
      description: meta.description || 'Discover your love compatibility with our free Love Calculator!',
      url: `https://lovecalcs.com/${locale}`,
      siteName: meta.siteName || 'Love Calculator',
      locale: locale,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: meta.title || 'Love Calculator – Free Name Compatibility & Love Compatibility Test',
      description: meta.description || 'Discover your love compatibility with our free Love Calculator!',
    },
  };
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as any)) {
    notFound();
  }

  // Load translations
  const translations = await getTranslations(locale);

  // Translations loaded successfully

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        {/* Hreflang tags for SEO */}
        {locales.map((loc) => (
          <link
            key={loc}
            rel="alternate"
            hrefLang={loc}
            href={`https://lovecalcs.com/${loc}`}
          />
        ))}
        <link rel="alternate" hrefLang="x-default" href="https://lovecalcs.com/en" />
      </head>
      <body className={`${inter.className} ${playfair.variable}`} suppressHydrationWarning>
        <GoogleAnalytics measurementId="G-WX3SZWJN3R" />
        <div data-locale={locale} data-translations={JSON.stringify(translations)}>
          {children}
        </div>
      </body>
    </html>
  );
} 