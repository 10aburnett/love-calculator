import type { Metadata } from 'next';
import { getMessages } from 'next-intl/server';
import { getTranslations } from '@/lib/translations';
import LoveCalculatorPageContent from './LoveCalculatorPageContent';

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const translations = await getTranslations(locale);
  
  // For English, use root path; for other languages, use locale prefix
  const canonicalUrl = locale === 'en' ? '/' : `/${locale}/love-calculator`;
  
  // Generate hreflang alternates for all supported languages
  const supportedLocales = ['en', 'es', 'fr', 'de', 'it', 'pt', 'ru', 'zh', 'ja', 'ar', 'hi'];
  const hreflangAlternates: Record<string, string> = {};
  
  supportedLocales.forEach(supportedLocale => {
    if (supportedLocale === 'en') {
      hreflangAlternates[supportedLocale] = 'https://www.lovecalcs.com/';
    } else {
      hreflangAlternates[supportedLocale] = `https://www.lovecalcs.com/${supportedLocale}/love-calculator`;
    }
  });

  return {
    title: translations?.meta?.title || 'Love Calculator by Name - Free Love Percentage Test Online',
    description: translations?.meta?.description || 'Calculate your love percentage by name with our free love calculator. Enter two names and instantly discover your compatibility score. The best love tester online!',
    keywords: translations?.meta?.keywords || ['love calculator by name', 'love percentage calculator', 'love test by name', 'name love calculator', 'love compatibility by name', 'love percentage test'],
    alternates: {
      canonical: canonicalUrl,
      languages: hreflangAlternates,
    },
    openGraph: {
      title: translations?.meta?.title || 'Love Calculator by Name - Free Love Percentage Test Online',
      description: translations?.meta?.description || 'Calculate your love percentage by name with our free love calculator. Enter two names and instantly discover your compatibility score.',
      url: canonicalUrl,
      locale: locale,
      type: 'website',
      images: [{ url: 'https://www.lovecalcs.com/opengraph-image', width: 1200, height: 630, alt: 'Love Calculator - Free Compatibility Test' }],
    },
  };
}

export default async function LoveCalculatorPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const translations = await getTranslations(locale);

  const baseUrl = 'https://www.lovecalcs.com';
  const currentUrl = locale === 'en' ? baseUrl : `${baseUrl}/${locale}/love-calculator`;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": translations?.meta?.title || 'Love Calculator',
    "description": translations?.meta?.description || 'Free Love Calculator for name compatibility and love compatibility testing.',
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
      <LoveCalculatorPageContent />
    </>
  );
} 