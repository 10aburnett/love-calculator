import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';

// Can be imported from a shared config
export const locales = ['en', 'es', 'fr', 'de', 'it', 'pt', 'ru', 'zh', 'ja', 'ar', 'hi'] as const;
export type Locale = typeof locales[number];

export default getRequestConfig(async ({ locale }) => {
  // Validate that the incoming `locale` parameter is valid
  if (!locale || !locales.includes(locale as Locale)) {
    notFound();
  }

  try {
    const messages = (await import(`../../public/locales/${locale}.json`)).default;
    return {
      locale,
      messages
    };
  } catch (error) {
    console.error('Failed to load messages for locale:', locale, error);
    notFound();
  }
}); 