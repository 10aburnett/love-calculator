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
      hreflangAlternates[supportedLocale] = 'https://www.lovecalcs.com/future-goals-compatibility';
    } else {
      hreflangAlternates[supportedLocale] = `https://www.lovecalcs.com/${supportedLocale}/future-goals-compatibility`;
    }
  });

  return {
    title: translations?.meta?.futureGoalsCompatibility?.title || 'Future Goals Compatibility Quiz - Are Your Life Goals Aligned?',
    description: translations?.meta?.futureGoalsCompatibility?.description || 'Are your life goals aligned with your partner? Take our free future goals compatibility quiz to discover if your dreams, values, and plans for the future match.',
    keywords: translations?.meta?.futureGoalsCompatibility?.keywords || ['future goals compatibility quiz', 'life goals compatibility', 'couples goals quiz', 'are we compatible life goals', 'relationship goals test'],
    alternates: {
      canonical: canonicalUrl,
      languages: hreflangAlternates,
    },
    openGraph: {
      title: translations?.meta?.futureGoalsCompatibility?.title || 'Future Goals Compatibility Quiz - Are Your Life Goals Aligned?',
      description: translations?.meta?.futureGoalsCompatibility?.description || 'Are your life goals aligned with your partner? Take our free future goals compatibility quiz.',
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
  
  const baseUrl = 'https://www.lovecalcs.com';
  const currentUrl = locale === 'en' ? `${baseUrl}/future-goals-compatibility` : `${baseUrl}/${locale}/future-goals-compatibility`;
  
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": translations?.meta?.futureGoalsCompatibility?.title || 'Future Goals Compatibility Quiz - Are Your Life Goals Aligned?',
    "description": translations?.meta?.futureGoalsCompatibility?.description || 'Are your life goals aligned with your partner? Take our free quiz.',
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
      "name": translations?.meta?.futureGoalsCompatibility?.title || 'Future Goals Compatibility Quiz',
      "description": translations?.meta?.futureGoalsCompatibility?.description || 'Discover if your life goals and dreams match',
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