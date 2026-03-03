'use client';

import { useContext } from 'react';
import { TranslationsContext } from '@/providers/TranslationsProvider';

export function useTranslations() {
  const { translations, locale } = useContext(TranslationsContext);

  const t = (key: string, params?: Record<string, string | number>): string => {
    const keys = key.split('.');
    let value: any = translations;

    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        return key;
      }
    }

    if (typeof value !== 'string') {
      return key;
    }

    if (params) {
      return value.replace(/\{\{(\w+)\}\}/g, (match: string, paramKey: string) => {
        return params[paramKey]?.toString() || match;
      });
    }

    return value;
  };

  return { t, locale, translations, isReady: Object.keys(translations).length > 0 };
}
