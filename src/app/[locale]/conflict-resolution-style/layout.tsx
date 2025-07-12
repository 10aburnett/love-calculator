import type { Metadata } from 'next';
import { getTranslations } from '@/lib/translations';

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const translations = await getTranslations(locale);
  
  // For English, use no prefix; for other languages, use locale prefix
  const canonicalUrl = locale === 'en' ? '/conflict-resolution-style' : `/${locale}/conflict-resolution-style`;

  // Generate hreflang alternates for all supported languages
  const supportedLocales = ['en', 'es', 'fr', 'de', 'it', 'pt', 'ru', 'zh', 'ja', 'ar', 'hi'];
  const hreflangAlternates: Record<string, string> = {};
  
  supportedLocales.forEach(supportedLocale => {
    if (supportedLocale === 'en') {
      hreflangAlternates[supportedLocale] = 'https://lovecalcs.com/conflict-resolution-style';
    } else {
      hreflangAlternates[supportedLocale] = `https://lovecalcs.com/${supportedLocale}/conflict-resolution-style`;
    }
  });

  return {
    title: translations?.meta?.conflictResolutionQuiz?.title || 'Conflict Resolution Style Quiz - Discover Your Approach to Conflicts',
    description: translations?.meta?.conflictResolutionQuiz?.description || 'Take our conflict resolution quiz to discover how you handle disagreements and conflicts in relationships. Learn your resolution style and improve communication.',
    keywords: translations?.meta?.conflictResolutionQuiz?.keywords || ['conflict resolution quiz', 'conflict style test', 'relationship conflicts', 'communication skills'],
    alternates: {
      canonical: canonicalUrl,
      languages: hreflangAlternates,
    },
    openGraph: {
      title: translations?.meta?.conflictResolutionQuiz?.title || 'Conflict Resolution Style Quiz - Learn Your Approach',
      description: translations?.meta?.conflictResolutionQuiz?.description || 'Learn how you handle disagreements and how to resolve conflicts better.',
      url: canonicalUrl,
      locale: locale,
      type: 'website',
    },
  };
}

export default async function ConflictResolutionStyleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const translations = await getTranslations(locale);
  
  const baseUrl = 'https://lovecalcs.com';
  const currentUrl = locale === 'en' ? `${baseUrl}/conflict-resolution-style` : `${baseUrl}/${locale}/conflict-resolution-style`;
  
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": translations?.meta?.conflictResolutionQuiz?.title || 'Conflict Resolution Style Quiz',
    "description": translations?.meta?.conflictResolutionQuiz?.description || 'Discover how you handle conflicts and disagreements.',
    "url": currentUrl,
    "inLanguage": locale,
    "isPartOf": {
      "@type": "WebSite",
      "name": "LoveCalcs",
      "url": baseUrl
    },
    "about": {
      "@type": "Thing",
      "name": "Conflict Resolution Styles",
      "description": "Assessment tools for conflict management and relationship problem solving"
    },
    "mainEntity": {
      "@type": "Quiz",
      "name": translations?.meta?.conflictResolutionQuiz?.title || 'Conflict Resolution Assessment',
      "description": translations?.meta?.conflictResolutionQuiz?.description || 'Learn your conflict resolution approach',
      "educationalLevel": "general",
      "assesses": "Conflict resolution styles and relationship problem-solving approaches"
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