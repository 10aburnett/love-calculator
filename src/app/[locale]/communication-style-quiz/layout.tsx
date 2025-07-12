import type { Metadata } from 'next';
import { getTranslations } from '@/lib/translations';

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const translations = await getTranslations(locale);
  
  // For English, use no prefix; for other languages, use locale prefix
  const canonicalUrl = locale === 'en' ? '/communication-style-quiz' : `/${locale}/communication-style-quiz`;

  // Generate hreflang alternates for all supported languages
  const supportedLocales = ['en', 'es', 'fr', 'de', 'it', 'pt', 'ru', 'zh', 'ja', 'ar', 'hi'];
  const hreflangAlternates: Record<string, string> = {};
  
  supportedLocales.forEach(supportedLocale => {
    if (supportedLocale === 'en') {
      hreflangAlternates[supportedLocale] = 'https://lovecalcs.com/communication-style-quiz';
    } else {
      hreflangAlternates[supportedLocale] = `https://lovecalcs.com/${supportedLocale}/communication-style-quiz`;
    }
  });

  return {
    title: translations?.meta?.communicationQuiz?.title || 'Communication Style Quiz - Discover Your Relationship Communication Patterns',
    description: translations?.meta?.communicationQuiz?.description || 'Take our communication style quiz to discover how you and your partner communicate. Learn your communication patterns and improve relationship dynamics.',
    keywords: translations?.meta?.communicationQuiz?.keywords || ['communication quiz', 'communication style test', 'relationship communication', 'communication patterns'],
    alternates: {
      canonical: canonicalUrl,
      languages: hreflangAlternates,
    },
    openGraph: {
      title: translations?.meta?.communicationQuiz?.title || 'Communication Style Quiz - Discover Your Communication Patterns',
      description: translations?.meta?.communicationQuiz?.description || 'Discover how you and your partner communicate and where you can improve.',
      url: canonicalUrl,
      locale: locale,
      type: 'website',
    },
  };
}

export default async function CommunicationQuizLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const translations = await getTranslations(locale);
  
  const baseUrl = 'https://lovecalcs.com';
  const currentUrl = locale === 'en' ? `${baseUrl}/communication-style-quiz` : `${baseUrl}/${locale}/communication-style-quiz`;
  
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": translations?.meta?.communicationQuiz?.title || 'Communication Style Quiz',
    "description": translations?.meta?.communicationQuiz?.description || 'Discover your communication patterns in relationships.',
    "url": currentUrl,
    "inLanguage": locale,
    "isPartOf": {
      "@type": "WebSite",
      "name": "LoveCalcs",
      "url": baseUrl
    },
    "about": {
      "@type": "Thing",
      "name": "Communication Styles",
      "description": "Assessment tools for communication patterns and relationship dynamics"
    },
    "mainEntity": {
      "@type": "Quiz",
      "name": translations?.meta?.communicationQuiz?.title || 'Communication Style Assessment',
      "description": translations?.meta?.communicationQuiz?.description || 'Discover your communication patterns',
      "educationalLevel": "general",
      "assesses": "Communication styles and relationship communication patterns"
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