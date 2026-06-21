import { getTranslations } from '@/lib/translations';
import { getDailyInsight } from '@/lib/dailyContent';
import LoveCalculatorPageContent from './love-calculator/LoveCalculatorPageContent';

// Regenerate at most hourly so the date-based Daily Love Insight rotates each
// day while pages stay statically cached (fast) the rest of the time.
export const revalidate = 3600;

export default async function LocalePage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const translations = await getTranslations(locale);
  const dailyInsight = getDailyInsight(locale);

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
      <LoveCalculatorPageContent dailyInsight={dailyInsight} />
    </>
  );
}
