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
    },
  };
}

export default async function DateOfBirthCalculatorPage({ params }: Props) {
  const { locale } = await params;
  
  return <DateOfBirthCalculatorPageContent />;
} 