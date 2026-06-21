import type { Locale } from '@/i18n/request';
import type { RotationalContent } from '@/lib/dailyContentTypes';
import { en } from './en';
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

// Locale-specific rotational pools. Every supported locale has a native
// translation; English remains the fallback for any future/unknown locale.
const pools: Record<Locale, RotationalContent> = {
  en,
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

export function getRotationalContent(locale: Locale): RotationalContent {
  return pools[locale] ?? en;
}
