'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter, usePathname, useParams } from 'next/navigation';
import { useTranslations } from '@/hooks/useTranslations';
import { Globe } from 'lucide-react';

const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸', flagFallback: '/flags/us.svg' },
  { code: 'es', name: 'Español', flag: '🇪🇸', flagFallback: '/flags/es.svg' },
  { code: 'fr', name: 'Français', flag: '🇫🇷', flagFallback: '/flags/fr.svg' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪', flagFallback: '/flags/de.svg' },
  { code: 'it', name: 'Italiano', flag: '🇮🇹', flagFallback: '/flags/it.svg' },
  { code: 'pt', name: 'Português', flag: '🇵🇹', flagFallback: '/flags/pt.svg' },
  { code: 'ru', name: 'Русский', flag: '🇷🇺', flagFallback: '/flags/ru.svg' },
  { code: 'zh', name: '中文', flag: '🇨🇳', flagFallback: '/flags/cn.svg' },
  { code: 'ja', name: '日本語', flag: '🇯🇵', flagFallback: '/flags/jp.svg' },
  { code: 'ar', name: 'العربية', flag: '🇸🇦', flagFallback: '/flags/sa.svg' },
  { code: 'hi', name: 'हिन्दी', flag: '🇮🇳', flagFallback: '/flags/in.svg' },
] as const;

export default function LanguageToggle() {
  const { t } = useTranslations();
  const [isOpen, setIsOpen] = useState(false);
  const [useFallbackFlags, setUseFallbackFlags] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const currentLocale = params.locale as string;

  useEffect(() => {
    setIsMounted(true);
    
    // Test emoji support
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.font = '100px Arial';
      ctx.fillText('🇺🇸', 0, 100);
      const data = ctx.getImageData(0, 0, 100, 100).data;
      const hasEmoji = data.some(pixel => pixel !== 0);
      setUseFallbackFlags(!hasEmoji);
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLanguageChange = (newLocale: string) => {
    // Strip any existing locale prefix, then re-add the new one (English has
    // none). This keeps the user on the SAME page when switching languages,
    // whether the current URL is prefixed (e.g. /es/blog) or not (e.g. /blog).
    const knownLocales = languages.map((l) => l.code) as string[];
    const segments = pathname.split('/').filter(Boolean);
    if (segments.length > 0 && knownLocales.includes(segments[0])) {
      segments.shift();
    }
    const rest = segments.join('/');
    const newPath =
      newLocale === 'en' ? `/${rest}` : `/${newLocale}${rest ? `/${rest}` : ''}`;

    router.push(newPath || '/');
    setIsOpen(false);
  };

  // Don't render until mounted to prevent hydration mismatch
  if (!isMounted) {
    return (
      <div className="relative">
        <button
          className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-[var(--love-pink)]/10 transition-colors duration-200"
          aria-label="Select language"
        >
          <Globe className="w-5 h-5 text-[var(--love-pink)]" />
          <span className="text-sm font-medium text-gray-700">
            🇺🇸 English
          </span>
        </button>
      </div>
    );
  }

  const currentLanguage = languages.find(lang => lang.code === currentLocale) || languages[0];

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-[var(--love-pink)]/10 transition-colors duration-200"
        aria-label={t('common.selectLanguage') || 'Select language'}
      >
        <Globe className="w-5 h-5 text-[var(--love-pink)]" />
        <span className="text-sm font-medium text-gray-700">
          {useFallbackFlags ? (
            <img 
              src={currentLanguage.flagFallback} 
              alt={t(`languages.${currentLanguage.code}`) || currentLanguage.name}
              className="w-4 h-4 inline-block mr-1"
            />
          ) : (
            currentLanguage.flag
          )} {t(`languages.${currentLanguage.code}`) || currentLanguage.name}
        </span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleLanguageChange(lang.code)}
              className={`w-full px-4 py-2 text-left text-sm hover:bg-[var(--love-pink)]/10 transition-colors duration-200 ${
                currentLocale === lang.code ? 'text-[var(--love-pink)] font-medium' : 'text-gray-700'
              }`}
            >
              {useFallbackFlags ? (
                <img 
                  src={lang.flagFallback} 
                  alt={t(`languages.${lang.code}`) || lang.name}
                  className="w-4 h-4 inline-block mr-1"
                />
              ) : (
                lang.flag
              )} {t(`languages.${lang.code}`) || lang.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
} 