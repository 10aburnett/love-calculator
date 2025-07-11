'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Heart, Menu, X, ChevronDown } from 'lucide-react';
import { useParams } from 'next/navigation';
import { useTranslations } from '@/hooks/useTranslations';
import LanguageToggle from './LanguageToggle';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isQuizDropdownOpen, setIsQuizDropdownOpen] = useState(false);
  const params = useParams();
  const locale = params.locale as string;
  const { t } = useTranslations();

  useEffect(() => {
    // Close dropdown when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest('.quiz-dropdown')) {
        setIsQuizDropdownOpen(false);
      }
    };

    if (isQuizDropdownOpen) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isQuizDropdownOpen]);

  const quizOptions = [
    { href: `/${locale}/zodiac-compatibility-calculator`, label: t('header.zodiacCalculator') || 'Zodiac Compatibility Calculator', description: t('header.zodiacCalculatorDescription') || 'Test astrological love compatibility' },
    { href: `/${locale}/date-of-birth-calculator`, label: t('header.dobCalculator') || 'Date of Birth Compatibility Calculator', description: t('header.dobCalculatorDescription') || 'Analyze birth date compatibility patterns' },
    { href: `/${locale}/relationship-quiz`, label: t('header.relationshipQuiz') || 'Relationship Quiz', description: t('header.relationshipQuizDescription') || 'Answer questions about your relationship' },
    { href: `/${locale}/communication-style-quiz`, label: t('header.communicationQuiz') || 'Communication Style Quiz', description: t('header.communicationQuizDescription') || 'Discover your communication patterns' },
    { href: `/${locale}/love-language-assessment`, label: t('header.loveLanguageAssessment') || 'Love Language Assessment', description: t('header.loveLanguageAssessmentDescription') || 'Find out your primary love languages' },
    { href: `/${locale}/future-goals-compatibility`, label: t('header.futureGoalsCompatibility') || 'Future Goals Compatibility', description: t('header.futureGoalsCompatibilityDescription') || 'See how aligned your life goals are' },
    { href: `/${locale}/conflict-resolution-style`, label: t('header.conflictResolutionQuiz') || 'Conflict Resolution Style Quiz', description: t('header.conflictResolutionQuizDescription') || 'Learn your conflict resolution approach' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href={locale === 'en' ? '/' : `/${locale}`} className="flex items-center space-x-2 group">
            <Heart className="w-8 h-8 text-[var(--love-pink)] icon-bounce" />
            <span className="text-xl font-playfair font-bold love-gradient-text transition-all duration-200 group-hover:scale-105">
              {t('header.loveCalculator') || 'Love Calculator'}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              href={locale === 'en' ? '/' : `/${locale}`}
              className="text-gray-700 hover:text-[var(--love-pink)] font-medium transition-colors duration-200 hover:scale-105 transform"
            >
              {t('header.loveCalculator') || 'Love Calculator'}
            </Link>
            
            {/* More Tools Dropdown */}
            <div className="relative quiz-dropdown">
              <button
                onClick={() => setIsQuizDropdownOpen(!isQuizDropdownOpen)}
                className="flex items-center text-gray-700 hover:text-[var(--love-pink)] font-medium transition-colors duration-200 hover:scale-105 transform"
              >
                {t('header.moreTools') || 'More Tools'}
                <ChevronDown className={`w-4 h-4 ml-1 transition-transform duration-200 ${isQuizDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {isQuizDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50 scale-in">
                  {quizOptions.map((quiz, index) => (
                    <Link
                      key={quiz.href}
                      href={quiz.href}
                      className="block px-4 py-3 text-sm hover:bg-gray-50 transition-colors duration-200 answer-option"
                      onClick={() => setIsQuizDropdownOpen(false)}
                    >
                      <div className="font-medium text-gray-900">{quiz.label}</div>
                      <div className="text-gray-600 text-xs mt-1">{quiz.description}</div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
            
            <Link 
              href={`/${locale}/about`}
              className="text-gray-700 hover:text-[var(--love-pink)] font-medium transition-colors duration-200 hover:scale-105 transform"
            >
              {t('header.about') || 'About'}
            </Link>
            <Link 
              href={`/${locale}/contact`}
              className="text-gray-700 hover:text-[var(--love-pink)] font-medium transition-colors duration-200 hover:scale-105 transform"
            >
              {t('header.contact') || 'Contact'}
            </Link>
            {/* Language Toggle Desktop */}
            <div className="ml-4">
              <LanguageToggle />
            </div>
          </nav>

          {/* Mobile menu button and Language Toggle */}
          <div className="flex items-center space-x-2 md:hidden">
            <LanguageToggle />
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200 btn-love"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-gray-700 icon-rotate" />
            ) : (
              <Menu className="w-6 h-6 text-gray-700 icon-scale" />
            )}
          </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 shadow-lg slide-in">
          <div className="px-4 py-3 space-y-3">
            <Link 
              href={locale === 'en' ? '/' : `/${locale}`}
              className="block text-gray-700 hover:text-[var(--love-pink)] font-medium py-2 transition-colors duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              {t('header.loveCalculator') || 'Love Calculator'}
            </Link>
            
            <div className="space-y-2">
              <div className="text-gray-900 font-medium py-2">{t('header.moreTools') || 'More Tools'}</div>
              <div className="pl-4 space-y-2">
                {quizOptions.map((quiz, index) => (
                  <Link
                    key={quiz.href}
                    href={quiz.href}
                    className="block text-sm text-gray-600 hover:text-[var(--love-pink)] py-1 transition-colors duration-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {quiz.label}
                  </Link>
                ))}
              </div>
            </div>
            
            {[
              { href: `/${locale}/about`, label: t('header.about') || 'About' },
              { href: `/${locale}/contact`, label: t('header.contact') || 'Contact' }
            ].map((link) => (
              <Link 
                key={link.href}
                href={link.href} 
                className="block text-gray-700 hover:text-[var(--love-pink)] font-medium py-2 transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
} 