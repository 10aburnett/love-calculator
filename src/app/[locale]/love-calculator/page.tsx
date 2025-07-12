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
      hreflangAlternates[supportedLocale] = 'https://lovecalcs.com/';
    } else {
      hreflangAlternates[supportedLocale] = `https://lovecalcs.com/${supportedLocale}/love-calculator`;
    }
  });

  return {
    title: translations?.meta?.title || 'Love Calculator – Advanced Affinity Quotient Algorithm | Science-Based Compatibility',
    description: translations?.meta?.description || 'Experience the world\'s most sophisticated Love Calculator powered by the Affinity Quotient algorithm. Get scientific compatibility analysis with detailed breakdowns, literature-based scoring, and premium insights.',
    keywords: translations?.meta?.keywords || ['love calculator', 'affinity quotient', 'scientific compatibility test', 'advanced love algorithm', 'name compatibility analysis', 'relationship science'],
    alternates: {
      canonical: canonicalUrl,
      languages: hreflangAlternates,
    },
    openGraph: {
      title: translations?.meta?.title || 'Love Calculator – Advanced Affinity Quotient Algorithm | Science-Based Compatibility',
      description: translations?.meta?.description || 'The world\'s most sophisticated Love Calculator featuring the exclusive Affinity Quotient algorithm for scientific compatibility analysis.',
      url: canonicalUrl,
      locale: locale,
      type: 'website',
    },
  };
}

export default function LoveCalculatorPage() {
  return <LoveCalculatorPageContent />;
} 