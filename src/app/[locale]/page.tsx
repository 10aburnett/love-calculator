import { getMessages } from 'next-intl/server';
import LoveCalculatorPageContent from './love-calculator/LoveCalculatorPageContent';

export default async function LocalePage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  
  // Show the love calculator directly instead of redirecting
  return <LoveCalculatorPageContent />;
}
