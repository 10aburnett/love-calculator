'use client';

import { createContext, ReactNode } from 'react';

export interface TranslationsContextType {
  translations: Record<string, any>;
  locale: string;
}

export const TranslationsContext = createContext<TranslationsContextType>({
  translations: {},
  locale: 'en',
});

interface TranslationsProviderProps {
  translations: Record<string, any>;
  locale: string;
  children: ReactNode;
}

export default function TranslationsProvider({
  translations,
  locale,
  children,
}: TranslationsProviderProps) {
  return (
    <TranslationsContext.Provider value={{ translations, locale }}>
      {children}
    </TranslationsContext.Provider>
  );
}
