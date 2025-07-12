import type { Metadata } from 'next';
import { getTranslations } from '@/lib/translations';

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const translations = await getTranslations(locale);
  
  // For English, use no prefix; for other languages, use locale prefix
  const canonicalUrl = locale === 'en' ? '/love-language-assessment' : `/${locale}/love-language-assessment`;

  // Generate hreflang alternates for all supported languages
  const supportedLocales = ['en', 'es', 'fr', 'de', 'it', 'pt', 'ru', 'zh', 'ja', 'ar', 'hi'];
  const hreflangAlternates: Record<string, string> = {};
  
  supportedLocales.forEach(supportedLocale => {
    if (supportedLocale === 'en') {
      hreflangAlternates[supportedLocale] = 'https://lovecalcs.com/love-language-assessment';
    } else {
      hreflangAlternates[supportedLocale] = `https://lovecalcs.com/${supportedLocale}/love-language-assessment`;
    }
  });

  return {
    title: translations?.meta?.loveLanguageAssessment?.title || 'Love Language Assessment - Discover How You Give and Receive Love',
    description: translations?.meta?.loveLanguageAssessment?.description || 'Take our love language assessment to discover your primary love languages. Learn how you express and receive love in relationships.',
    keywords: translations?.meta?.loveLanguageAssessment?.keywords || ['love language quiz', 'love language test', 'five love languages', 'relationship assessment'],
    alternates: {
      canonical: canonicalUrl,
      languages: hreflangAlternates,
    },
    openGraph: {
      title: translations?.meta?.loveLanguageAssessment?.title || 'Love Language Assessment - Discover Your Love Languages',
      description: translations?.meta?.loveLanguageAssessment?.description || 'Find out your primary love languages and learn how to express love better.',
      url: canonicalUrl,
      locale: locale,
      type: 'website',
    },
  };
}

export default async function LoveLanguageAssessmentLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const translations = await getTranslations(locale);
  
  const baseUrl = 'https://lovecalcs.com';
  const currentUrl = locale === 'en' ? `${baseUrl}/love-language-assessment` : `${baseUrl}/${locale}/love-language-assessment`;
  
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": translations?.meta?.loveLanguageAssessment?.title || 'Love Language Assessment',
    "description": translations?.meta?.loveLanguageAssessment?.description || 'Discover your love languages and how you express love.',
    "url": currentUrl,
    "inLanguage": locale,
    "isPartOf": {
      "@type": "WebSite",
      "name": "LoveCalcs",
      "url": baseUrl
    },
    "about": {
      "@type": "Thing",
      "name": "Love Languages",
      "description": "Assessment tools for understanding love languages and relationship expression"
    },
    "mainEntity": {
      "@type": "Quiz",
      "name": translations?.meta?.loveLanguageAssessment?.title || 'Love Language Assessment',
      "description": translations?.meta?.loveLanguageAssessment?.description || 'Find out your primary love languages',
      "educationalLevel": "general",
      "assesses": "Primary love languages and relationship expression styles"
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