import type { Metadata } from 'next';
import { getTranslations } from '@/lib/translations';
import DateOfBirthCalculatorPageContent from './DateOfBirthCalculatorPageContent';

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const translations = await getTranslations(locale);
  
  // For English, use no prefix; for other languages, use locale prefix
  const canonicalUrl = locale === 'en' ? '/date-of-birth-calculator' : `/${locale}/date-of-birth-calculator`;
  
  // Generate hreflang alternates for all supported languages
  const supportedLocales = ['en', 'es', 'fr', 'de', 'it', 'pt', 'ru', 'zh', 'ja', 'ar', 'hi'];
  const hreflangAlternates: Record<string, string> = {};
  
  supportedLocales.forEach(supportedLocale => {
    if (supportedLocale === 'en') {
      hreflangAlternates[supportedLocale] = 'https://lovecalcs.com/date-of-birth-calculator';
    } else {
      hreflangAlternates[supportedLocale] = `https://lovecalcs.com/${supportedLocale}/date-of-birth-calculator`;
    }
  });
  
  return {
    title: translations?.meta?.dobCalculator?.title || 'Date of Birth Compatibility Calculator - Test Birth Date Love Match',
    description: translations?.meta?.dobCalculator?.description || 'Calculate love compatibility based on birth dates. Discover if your birthdays predict romantic compatibility with our fun date calculator.',
    keywords: translations?.meta?.dobCalculator?.keywords || ['date of birth calculator', 'birth date compatibility', 'birthday love match', 'birth date love test'],
    alternates: {
      canonical: canonicalUrl,
      languages: hreflangAlternates,
    },
    openGraph: {
      title: translations?.meta?.dobCalculator?.title || 'Date of Birth Compatibility Calculator',
      description: translations?.meta?.dobCalculator?.description || 'Calculate love compatibility based on birth dates.',
      url: canonicalUrl,
      locale: locale,
      type: 'website',
      images: [{ url: 'https://lovecalcs.com/opengraph-image', width: 1200, height: 630, alt: 'Love Calculator - Date of Birth Compatibility Test' }],
    },
  };
}

export default async function DateOfBirthCalculatorPage({ params }: Props) {
  const { locale } = await params;
  const translations = await getTranslations(locale);

  const baseUrl = 'https://lovecalcs.com';
  const currentUrl = locale === 'en' ? `${baseUrl}/date-of-birth-calculator` : `${baseUrl}/${locale}/date-of-birth-calculator`;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": translations?.meta?.dobCalculator?.title || 'Date of Birth Compatibility Calculator',
    "description": translations?.meta?.dobCalculator?.description || 'Calculate love compatibility based on birth dates.',
    "url": currentUrl,
    "applicationCategory": "Entertainment",
    "operatingSystem": "Any",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "inLanguage": locale,
    "isPartOf": {
      "@type": "WebSite",
      "name": "LoveCalcs",
      "url": baseUrl
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <DateOfBirthCalculatorPageContent />
    </>
  );
} 