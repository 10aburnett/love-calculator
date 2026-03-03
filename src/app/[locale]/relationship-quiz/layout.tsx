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
      hreflangAlternates[supportedLocale] = 'https://www.lovecalcs.com/relationship-quiz';
    } else {
      hreflangAlternates[supportedLocale] = `https://www.lovecalcs.com/${supportedLocale}/relationship-quiz`;
    }
  });

  return {
    title: translations?.meta?.relationshipQuiz?.title || 'Relationship Compatibility Quiz - Free Couples Test (8 Questions)',
    description: translations?.meta?.relationshipQuiz?.description || 'Take our free 8-question relationship compatibility quiz. Get personalised insights about your relationship strengths, communication style, and compatibility score instantly.',
    keywords: translations?.meta?.relationshipQuiz?.keywords || ['relationship quiz', 'relationship compatibility quiz', 'couples quiz', 'are we compatible quiz', 'compatibility test for couples', 'relationship test'],
    alternates: {
      canonical: canonicalUrl,
      languages: hreflangAlternates,
    },
    openGraph: {
      title: translations?.meta?.relationshipQuiz?.title || 'Relationship Compatibility Quiz - Free Couples Test (8 Questions)',
      description: translations?.meta?.relationshipQuiz?.description || 'Take our free 8-question relationship compatibility quiz. Get personalised insights about your relationship strengths and compatibility score.',
      url: canonicalUrl,
      locale: locale,
      type: 'website',
      images: [{ url: 'https://www.lovecalcs.com/opengraph-image', width: 1200, height: 630, alt: 'Love Calculator - Relationship Quiz' }],
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
  
  const baseUrl = 'https://www.lovecalcs.com';
  const currentUrl = locale === 'en' ? `${baseUrl}/relationship-quiz` : `${baseUrl}/${locale}/relationship-quiz`;
  
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": translations?.meta?.relationshipQuiz?.title || 'Relationship Compatibility Quiz - Free Couples Test',
    "description": translations?.meta?.relationshipQuiz?.description || 'Take our free 8-question relationship compatibility quiz. Get personalised insights about your compatibility score.',
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
      "name": translations?.meta?.relationshipQuiz?.title || 'Relationship Compatibility Quiz - Free Couples Test',
      "description": translations?.meta?.relationshipQuiz?.description || 'Free 8-question relationship compatibility quiz',
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