import { locales } from '@/i18n/request';

export type Locale = typeof locales[number];

// Cache for loaded translations
const translationCache = new Map<string, any>();

export async function getTranslations(locale: string): Promise<any> {
  if (!locales.includes(locale as Locale)) {
    locale = 'en'; // fallback to English
  }

  // Check cache first
  if (translationCache.has(locale)) {
    return translationCache.get(locale);
  }

  try {
    // Dynamically import the JSON file
    const translations = await import(`../../public/locales/${locale}.json`);
    const data = translations.default;
    
    // Translation data loaded successfully
    
    // Cache the result
    translationCache.set(locale, data);
    return data;
  } catch (error) {
    console.error(`Failed to load translations for locale: ${locale}`, error);
    
    // Fallback to English if the locale file doesn't exist
    if (locale !== 'en') {
      return getTranslations('en');
    }
    
    // Return empty object as last resort
    return {};
  }
}

export function useTranslations(translations: any) {
  return function t(key: string, params?: Record<string, string | number>): string {
    const keys = key.split('.');
    let value = translations;
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        return key; // Return the key if not found
      }
    }
    
    if (typeof value !== 'string') {
      return key; // Return the key if the final value is not a string
    }
    
    // Simple parameter substitution
    if (params) {
      return value.replace(/\{\{(\w+)\}\}/g, (match, paramKey) => {
        return params[paramKey]?.toString() || match;
      });
    }
    
    return value;
  };
} 