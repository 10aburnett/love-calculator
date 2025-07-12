import type { Metadata } from 'next';
import { getTranslations } from '@/lib/translations';

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const translations = await getTranslations(locale);
  
  // For English, use no prefix; for other languages, use locale prefix
  const canonicalUrl = locale === 'en' ? '/future-goals-compatibility' : `/${locale}/future-goals-compatibility`;

  // Generate hreflang alternates for all supported languages
  const supportedLocales = ['en', 'es', 'fr', 'de', 'it', 'pt', 'ru', 'zh', 'ja', 'ar', 'hi'];
  const hreflangAlternates: Record<string, string> = {};
  
  supportedLocales.forEach(supportedLocale => {
    if (supportedLocale === 'en') {
      hreflangAlternates[supportedLocale] = 'https://lovecalcs.com/future-goals-compatibility';
    } else {
      hreflangAlternates[supportedLocale] = `https://lovecalcs.com/${supportedLocale}/future-goals-compatibility`;
    }
  });

  return {
    title: translations?.meta?.futureGoalsCompatibility?.title || 'Future Goals Compatibility Quiz - Test Life Goals Alignment',
    description: translations?.meta?.futureGoalsCompatibility?.description || 'Take our future goals compatibility quiz to see how aligned your life dreams and plans are with your partner. Test lifestyle and goal compatibility.',
    keywords: translations?.meta?.futureGoalsCompatibility?.keywords || ['future goals quiz', 'life goals compatibility', 'lifestyle compatibility', 'relationship goals test'],
    alternates: {
      canonical: canonicalUrl,
      languages: hreflangAlternates,
    },
    openGraph: {
      title: translations?.meta?.futureGoalsCompatibility?.title || 'Future Goals Compatibility Quiz - Test Life Goals Alignment',
      description: translations?.meta?.futureGoalsCompatibility?.description || 'See how aligned your life goals and dreams are for the future.',
      url: canonicalUrl,
      locale: locale,
      type: 'website',
    },
  };
}

export default async function FutureGoalsCompatibilityLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const translations = await getTranslations(locale);
  
  const baseUrl = 'https://lovecalcs.com';
  const currentUrl = locale === 'en' ? `${baseUrl}/future-goals-compatibility` : `${baseUrl}/${locale}/future-goals-compatibility`;
  
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": translations?.meta?.futureGoalsCompatibility?.title || 'Future Goals Compatibility Quiz',
    "description": translations?.meta?.futureGoalsCompatibility?.description || 'Test how aligned your life goals and dreams are.',
    "url": currentUrl,
    "inLanguage": locale,
    "isPartOf": {
      "@type": "WebSite",
      "name": "LoveCalcs",
      "url": baseUrl
    },
    "about": {
      "@type": "Thing",
      "name": "Future Goals Compatibility",
      "description": "Assessment tools for life goal alignment and relationship planning"
    },
    "mainEntity": {
      "@type": "Quiz",
      "name": translations?.meta?.futureGoalsCompatibility?.title || 'Future Goals Compatibility Assessment',
      "description": translations?.meta?.futureGoalsCompatibility?.description || 'See how aligned your life goals are',
      "educationalLevel": "general",
      "assesses": "Life goal compatibility and relationship future planning"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      {children}
    </>
  );
}