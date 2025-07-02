import type { Metadata } from 'next';
import { getTranslations } from '@/lib/translations';
import ZodiacCompatibilityCalculatorPageContent from './ZodiacCompatibilityCalculatorPageContent';

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const translations = await getTranslations(locale);
  
  return {
    title: translations?.meta?.zodiacCalculator?.title || 'Zodiac Compatibility Calculator - Astrological Love Match Test',
    description: translations?.meta?.zodiacCalculator?.description || 'Test zodiac sign compatibility for love and relationships. Discover astrological compatibility between your star signs with our fun zodiac calculator.',
    keywords: translations?.meta?.zodiacCalculator?.keywords || ['zodiac compatibility', 'star sign compatibility', 'astrological love match', 'horoscope compatibility'],
    alternates: {
      canonical: `/${locale}/zodiac-compatibility-calculator`,
    },
    openGraph: {
      title: translations?.meta?.zodiacCalculator?.title || 'Zodiac Compatibility Calculator',
      description: translations?.meta?.zodiacCalculator?.description || 'Test zodiac sign compatibility for love and relationships.',
      url: `/${locale}/zodiac-compatibility-calculator`,
      locale: locale,
      type: 'website',
    },
  };
}

export default async function ZodiacCompatibilityCalculatorPage({ params }: Props) {
  const { locale } = await params;
  
  return <ZodiacCompatibilityCalculatorPageContent />;
} 