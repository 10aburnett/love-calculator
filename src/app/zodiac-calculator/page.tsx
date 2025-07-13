import type { Metadata } from 'next';
import ZodiacCompatibilityCalculatorPageContent from '../[locale]/zodiac-compatibility-calculator/ZodiacCompatibilityCalculatorPageContent';

export const metadata: Metadata = {
  title: 'Zodiac Compatibility Calculator – Astrological Love Match Analysis',
  description: 'Discover your zodiac compatibility with our advanced astrological calculator. Get detailed insights into your cosmic connection and love potential.',
  keywords: ['zodiac compatibility', 'astrological love calculator', 'star signs compatibility', 'horoscope match', 'astrology relationship'],
  alternates: {
    canonical: '/zodiac-calculator',
  },
  openGraph: {
    title: 'Zodiac Compatibility Calculator – Astrological Love Match Analysis',
    description: 'Discover your zodiac compatibility with our advanced astrological calculator.',
    url: '/zodiac-calculator',
    type: 'website',
  },
};

export default function ZodiacCalculatorPage() {
  return <ZodiacCompatibilityCalculatorPageContent />;
}