'use client';

import { useEffect, useState } from 'react';

export function useTranslations() {
  const [translations, setTranslations] = useState<any>({});
  const [locale, setLocale] = useState('en');
  const [isHydrated, setIsHydrated] = useState(false);

  // Function to load translations from DOM
  const loadTranslationsFromDOM = () => {
    try {
      const container = document.querySelector('[data-translations]');
      if (container) {
        const translationsData = container.getAttribute('data-translations');
        const localeData = container.getAttribute('data-locale');
        
        console.log('🔍 Client-side translation debug:', {
          containerFound: !!container,
          dataLength: translationsData?.length || 0,
          locale: localeData,
          firstChars: translationsData?.substring(0, 100) || 'none',
          lastChars: translationsData?.substring(Math.max(0, (translationsData?.length || 0) - 100)) || 'none'
        });
        
        if (translationsData) {
          const parsed = JSON.parse(translationsData);
          
          console.log('🔍 Parsed translation debug:', {
            hasEasterEggs: 'easterEggs' in parsed,
            easterEggsKeys: parsed.easterEggs ? Object.keys(parsed.easterEggs) : 'none',
            totalKeys: Object.keys(parsed).length
          });
          
          return { translations: parsed, locale: localeData || 'en' };
        }
      }
    } catch (error) {
      console.error('Failed to load translations:', error);
    }
    return null;
  };

  useEffect(() => {
    // Mark as hydrated and load translations
    setIsHydrated(true);
    
    const result = loadTranslationsFromDOM();
    if (result) {
      setTranslations(result.translations);
      setLocale(result.locale);
    }
  }, []);

  const t = (key: string, params?: Record<string, string | number>): string => {
    // During SSR, always return the key to prevent hydration mismatch
    if (!isHydrated) {
      return key;
    }

    // Try to load translations if not loaded
    if (!translations || Object.keys(translations).length === 0) {
      const result = loadTranslationsFromDOM();
      if (result) {
        setTranslations(result.translations);
        setLocale(result.locale);
        
        // Use newly loaded translations
        const keys = key.split('.');
        let value = result.translations;
        
        for (const k of keys) {
          if (value && typeof value === 'object' && k in value) {
            value = value[k];
          } else {
            return key;
          }
        }
        
        if (typeof value === 'string') {
          if (params) {
            return value.replace(/\{\{(\w+)\}\}/g, (match, paramKey) => {
              return params[paramKey]?.toString() || match;
            });
          }
          return value;
        }
      }
      return key;
    }

    // Easter egg translations work correctly now

    // Normal translation lookup
    const keys = key.split('.');
    let value = translations;
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        // Translation key not found
        return key;
      }
    }
    
    if (typeof value !== 'string') {
      // Translation value is not a string
      return key;
    }
    
    // Parameter substitution
    if (params) {
      return value.replace(/\{\{(\w+)\}\}/g, (match, paramKey) => {
        return params[paramKey]?.toString() || match;
      });
    }
    
    return value;
  };

  return { t, locale, translations, isReady: Object.keys(translations).length > 0 && isHydrated };
} 