import type { Metadata } from 'next';
import { getMessages } from 'next-intl/server';
import LoveCalculatorPageContent from './[locale]/love-calculator/LoveCalculatorPageContent';

export const metadata: Metadata = {
  title: 'Love Calculator – Advanced Affinity Quotient Algorithm | Science-Based Compatibility',
  description: 'Experience the world\'s most sophisticated Love Calculator powered by the Affinity Quotient algorithm. Get scientific compatibility analysis with detailed breakdowns, literature-based scoring, and premium insights.',
  keywords: ['love calculator', 'affinity quotient', 'scientific compatibility test', 'advanced love algorithm', 'name compatibility analysis', 'relationship science'],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Love Calculator – Advanced Affinity Quotient Algorithm | Science-Based Compatibility',
    description: 'The world\'s most sophisticated Love Calculator featuring the exclusive Affinity Quotient algorithm for scientific compatibility analysis.',
    url: '/',
    type: 'website',
  },
};

export default function HomePage() {
  return <LoveCalculatorPageContent />;
}