import type { Metadata } from 'next';
import { getTranslations } from '@/lib/translations';
import DateOfBirthCalculatorPageContent from './DateOfBirthCalculatorPageContent';

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const translations = await getTranslations(locale);
  
  return {
    title: translations?.meta?.dobCalculator?.title || 'Date of Birth Compatibility Calculator - Test Birth Date Love Match',
    description: translations?.meta?.dobCalculator?.description || 'Calculate love compatibility based on birth dates. Discover if your birthdays predict romantic compatibility with our fun date calculator.',
    keywords: translations?.meta?.dobCalculator?.keywords || ['date of birth calculator', 'birth date compatibility', 'birthday love match', 'birth date love test'],
    alternates: {
      canonical: `/${locale}/date-of-birth-calculator`,
    },
    openGraph: {
      title: translations?.meta?.dobCalculator?.title || 'Date of Birth Compatibility Calculator',
      description: translations?.meta?.dobCalculator?.description || 'Calculate love compatibility based on birth dates.',
      url: `/${locale}/date-of-birth-calculator`,
      locale: locale,
      type: 'website',
    },
  };
}

export default async function DateOfBirthCalculatorPage({ params }: Props) {
  const { locale } = await params;
  
  return <DateOfBirthCalculatorPageContent />;
} 