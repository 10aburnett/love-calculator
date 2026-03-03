import type { Metadata } from 'next';
import { getTranslations } from '@/lib/translations';
import ZodiacCompatibilityCalculatorPageContent from './ZodiacCompatibilityCalculatorPageContent';

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const translations = await getTranslations(locale);
  
  // For English, use no prefix; for other languages, use locale prefix
  const canonicalUrl = locale === 'en' ? '/zodiac-compatibility-calculator' : `/${locale}/zodiac-compatibility-calculator`;
  
  // Generate hreflang alternates for all supported languages
  const supportedLocales = ['en', 'es', 'fr', 'de', 'it', 'pt', 'ru', 'zh', 'ja', 'ar', 'hi'];
  const hreflangAlternates: Record<string, string> = {};
  
  supportedLocales.forEach(supportedLocale => {
    if (supportedLocale === 'en') {
      hreflangAlternates[supportedLocale] = 'https://www.lovecalcs.com/zodiac-compatibility-calculator';
    } else {
      hreflangAlternates[supportedLocale] = `https://www.lovecalcs.com/${supportedLocale}/zodiac-compatibility-calculator`;
    }
  });
  
  return {
    title: translations?.meta?.zodiacCalculator?.title || 'Zodiac Compatibility Calculator - Astrological Love Match Test',
    description: translations?.meta?.zodiacCalculator?.description || 'Test zodiac sign compatibility for love and relationships. Discover astrological compatibility between your star signs with our fun zodiac calculator.',
    keywords: translations?.meta?.zodiacCalculator?.keywords || ['zodiac compatibility', 'star sign compatibility', 'astrological love match', 'horoscope compatibility'],
    alternates: {
      canonical: canonicalUrl,
      languages: hreflangAlternates,
    },
    openGraph: {
      title: translations?.meta?.zodiacCalculator?.title || 'Zodiac Compatibility Calculator',
      description: translations?.meta?.zodiacCalculator?.description || 'Test zodiac sign compatibility for love and relationships.',
      url: canonicalUrl,
      locale: locale,
      type: 'website',
      images: [{ url: 'https://www.lovecalcs.com/opengraph-image', width: 1200, height: 630, alt: 'Love Calculator - Zodiac Compatibility Test' }],
    },
  };
}

export default async function ZodiacCompatibilityCalculatorPage({ params }: Props) {
  const { locale } = await params;
  const translations = await getTranslations(locale);

  const baseUrl = 'https://www.lovecalcs.com';
  const currentUrl = locale === 'en' ? `${baseUrl}/zodiac-compatibility-calculator` : `${baseUrl}/${locale}/zodiac-compatibility-calculator`;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": translations?.meta?.zodiacCalculator?.title || 'Zodiac Compatibility Calculator',
    "description": translations?.meta?.zodiacCalculator?.description || 'Test zodiac sign compatibility for love and relationships.',
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
      <ZodiacCompatibilityCalculatorPageContent />
    </>
  );
} 