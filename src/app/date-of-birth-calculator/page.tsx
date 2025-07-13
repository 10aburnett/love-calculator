import type { Metadata } from 'next';
import DateOfBirthCalculatorPageContent from '../[locale]/date-of-birth-calculator/DateOfBirthCalculatorPageContent';

export const metadata: Metadata = {
  title: 'Date of Birth Compatibility Calculator – Numerological Love Analysis',
  description: 'Calculate love compatibility based on birth dates using advanced numerological algorithms. Discover your cosmic connection through numbers.',
  keywords: ['date of birth compatibility', 'numerology love calculator', 'birth date analysis', 'numerological compatibility', 'birth date love match'],
  alternates: {
    canonical: '/date-of-birth-calculator',
  },
  openGraph: {
    title: 'Date of Birth Compatibility Calculator – Numerological Love Analysis',
    description: 'Calculate love compatibility based on birth dates using advanced numerological algorithms.',
    url: '/date-of-birth-calculator',
    type: 'website',
  },
};

export default function DateOfBirthCalculatorPage() {
  return <DateOfBirthCalculatorPageContent />;
}