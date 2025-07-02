import type { Metadata } from 'next';
import { getMessages } from 'next-intl/server';
import LoveCalculatorPageContent from './LoveCalculatorPageContent';

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  return {
    title: 'Love Calculator – Advanced Affinity Quotient Algorithm | Science-Based Compatibility',
    description: 'Experience the world\'s most sophisticated Love Calculator powered by the Affinity Quotient algorithm. Get scientific compatibility analysis with detailed breakdowns, literature-based scoring, and premium insights.',
    keywords: ['love calculator', 'affinity quotient', 'scientific compatibility test', 'advanced love algorithm', 'name compatibility analysis', 'relationship science'],
    alternates: {
      canonical: `/${locale}/love-calculator`,
    },
    openGraph: {
      title: 'Love Calculator – Advanced Affinity Quotient Algorithm | Science-Based Compatibility',
      description: 'The world\'s most sophisticated Love Calculator featuring the exclusive Affinity Quotient algorithm for scientific compatibility analysis.',
      url: `/${locale}/love-calculator`,
      type: 'website',
    },
  };
}

export default function LoveCalculatorPage() {
  return <LoveCalculatorPageContent />;
} 