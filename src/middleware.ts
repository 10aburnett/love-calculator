import createMiddleware from 'next-intl/middleware';
import { locales } from './i18n/request';

export default createMiddleware({
  // A list of all locales that are supported
  locales,

  // Used when no locale matches
  defaultLocale: 'en',

  // Disable automatic locale detection to always default to English
  localeDetection: false,

  // Never use locale prefix for English, always for other languages
  localePrefix: {
    mode: 'as-needed',
    prefixes: {
      'en': ''
    }
  }
});

export const config = {
  // Temporarily disable middleware
  matcher: []
}; 