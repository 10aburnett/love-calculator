import type { Metadata } from 'next';
import { getTranslations } from '@/lib/translations';

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const translations = await getTranslations(locale);
  
  // For English, use no prefix; for other languages, use locale prefix
  const canonicalUrl = locale === 'en' ? '/relationship-quiz' : `/${locale}/relationship-quiz`;

  // Generate hreflang alternates for all supported languages
  const supportedLocales = ['en', 'es', 'fr', 'de', 'it', 'pt', 'ru', 'zh', 'ja', 'ar', 'hi'];
  const hreflangAlternates: Record<string, string> = {};
  
  supportedLocales.forEach(supportedLocale => {
    if (supportedLocale === 'en') {
      hreflangAlternates[supportedLocale] = 'https://lovecalcs.com/relationship-quiz';
    } else {
      hreflangAlternates[supportedLocale] = `https://lovecalcs.com/${supportedLocale}/relationship-quiz`;
    }
  });

  return {
    title: translations?.meta?.relationshipQuiz?.title || 'Relationship Quiz - Are You Compatible? Free Couples Test',
    description: translations?.meta?.relationshipQuiz?.description || 'Take our comprehensive relationship quiz to discover your compatibility score. Free couples test with personalized insights about your relationship dynamics.',
    keywords: translations?.meta?.relationshipQuiz?.keywords || ['relationship quiz', 'couples quiz', 'compatibility quiz', 'relationship test'],
    alternates: {
      canonical: canonicalUrl,
      languages: hreflangAlternates,
    },
    openGraph: {
      title: translations?.meta?.relationshipQuiz?.title || 'Relationship Quiz - Are You Compatible? Free Couples Test',
      description: translations?.meta?.relationshipQuiz?.description || 'Take our comprehensive relationship quiz to discover your compatibility score.',
      url: canonicalUrl,
      locale: locale,
      type: 'website',
    },
  };
}

export default async function RelationshipQuizLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const translations = await getTranslations(locale);
  
  const baseUrl = 'https://lovecalcs.com';
  const currentUrl = locale === 'en' ? `${baseUrl}/relationship-quiz` : `${baseUrl}/${locale}/relationship-quiz`;
  
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": translations?.meta?.relationshipQuiz?.title || 'Relationship Quiz - Are You Compatible?',
    "description": translations?.meta?.relationshipQuiz?.description || 'Take our comprehensive relationship quiz to discover your compatibility score.',
    "url": currentUrl,
    "inLanguage": locale,
    "isPartOf": {
      "@type": "WebSite",
      "name": "LoveCalcs",
      "url": baseUrl
    },
    "about": {
      "@type": "Thing",
      "name": "Relationship Compatibility",
      "description": "Assessment tools for relationship compatibility and communication"
    },
    "mainEntity": {
      "@type": "Quiz",
      "name": translations?.meta?.relationshipQuiz?.title || 'Relationship Compatibility Quiz',
      "description": translations?.meta?.relationshipQuiz?.description || 'Comprehensive relationship assessment quiz',
      "educationalLevel": "general",
      "assesses": "Relationship compatibility and communication patterns"
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