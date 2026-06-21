import type { Locale } from '@/i18n/request';
import type { BlogPostContent } from '../types';
import { es } from './es';
import { fr } from './fr';
import { de } from './de';
import { it } from './it';
import { pt } from './pt';
import { ru } from './ru';
import { zh } from './zh';
import { ja } from './ja';
import { ar } from './ar';
import { hi } from './hi';

// Per-locale blog translations, keyed by post slug. English lives with the post
// itself; everything else is here so each locale can be authored independently.
const translations: Partial<Record<Locale, Record<string, BlogPostContent>>> = {
  es,
  fr,
  de,
  it,
  pt,
  ru,
  zh,
  ja,
  ar,
  hi,
};

export function getBlogTranslation(locale: string, slug: string): BlogPostContent | undefined {
  return translations[locale as Locale]?.[slug];
}
