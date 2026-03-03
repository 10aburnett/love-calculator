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
      hreflangAlternates[supportedLocale] = 'https://www.lovecalcs.com/love-language-assessment';
    } else {
      hreflangAlternates[supportedLocale] = `https://www.lovecalcs.com/${supportedLocale}/love-language-assessment`;
    }
  });

  return {
    title: translations?.meta?.loveLanguageAssessment?.title || 'Love Language Quiz - Discover Your 5 Love Languages Free',
    description: translations?.meta?.loveLanguageAssessment?.description || 'Take the free love language quiz to find your primary love language. Discover how you give and receive love based on the 5 love languages. Quick, fun, and insightful!',
    keywords: translations?.meta?.loveLanguageAssessment?.keywords || ['love language quiz', 'love language test', '5 love languages quiz', 'what is my love language', 'love languages test free', 'love language quiz for couples'],
    alternates: {
      canonical: canonicalUrl,
      languages: hreflangAlternates,
    },
    openGraph: {
      title: translations?.meta?.loveLanguageAssessment?.title || 'Love Language Quiz - Discover Your 5 Love Languages Free',
      description: translations?.meta?.loveLanguageAssessment?.description || 'Take the free love language quiz to find your primary love language. Discover how you give and receive love.',
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
  
  const baseUrl = 'https://www.lovecalcs.com';
  const currentUrl = locale === 'en' ? `${baseUrl}/love-language-assessment` : `${baseUrl}/${locale}/love-language-assessment`;
  
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": translations?.meta?.loveLanguageAssessment?.title || 'Love Language Quiz - Discover Your 5 Love Languages Free',
    "description": translations?.meta?.loveLanguageAssessment?.description || 'Take the free love language quiz to find your primary love language.',
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
      "name": translations?.meta?.loveLanguageAssessment?.title || 'Love Language Quiz',
      "description": translations?.meta?.loveLanguageAssessment?.description || 'Discover your primary love language with our free quiz',
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