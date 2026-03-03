import { getTranslations } from '@/lib/translations';
import LoveCalculatorPageContent from './love-calculator/LoveCalculatorPageContent';

export default async function LocalePage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const translations = await getTranslations(locale);

  const baseUrl = 'https://lovecalcs.com';
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
      <LoveCalculatorPageContent />
    </>
  );
}
