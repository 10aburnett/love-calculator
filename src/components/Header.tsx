'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Heart, Menu, X, ChevronDown } from 'lucide-react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isQuizDropdownOpen, setIsQuizDropdownOpen] = useState(false);

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
    { href: '/zodiac-compatibility-calculator', label: 'Zodiac Compatibility Calculator', description: 'Test astrological love compatibility' },
    { href: '/date-of-birth-calculator', label: 'Date of Birth Compatibility Calculator', description: 'Analyze birth date compatibility patterns' },
    { href: '/relationship-quiz', label: 'Relationship Quiz', description: 'Answer questions about your relationship' },
    { href: '/communication-style-quiz', label: 'Communication Style Quiz', description: 'Discover your communication patterns' },
    { href: '/love-language-assessment', label: 'Love Language Assessment', description: 'Find out your primary love languages' },
    { href: '/future-goals-compatibility', label: 'Future Goals Compatibility', description: 'See how aligned your life goals are' },
    { href: '/conflict-resolution-style', label: 'Conflict Resolution Style Quiz', description: 'Learn your conflict resolution approach' },
  ];

  const navLinks = [
    { href: '/love-calculator', label: 'Love Calculator' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <Heart className="w-8 h-8 text-[var(--love-pink)] icon-bounce" />
            <span className="text-xl font-playfair font-bold love-gradient-text transition-all duration-200 group-hover:scale-105">
              Love Calculator
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              href="/love-calculator" 
              className="text-gray-700 hover:text-[var(--love-pink)] font-medium transition-colors duration-200 hover:scale-105 transform"
            >
              Love Calculator
            </Link>
            
            {/* More Tools Dropdown */}
            <div className="relative quiz-dropdown">
              <button
                onClick={() => setIsQuizDropdownOpen(!isQuizDropdownOpen)}
                className="flex items-center text-gray-700 hover:text-[var(--love-pink)] font-medium transition-colors duration-200 hover:scale-105 transform"
              >
                More Tools
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
              href="/about" 
              className="text-gray-700 hover:text-[var(--love-pink)] font-medium transition-colors duration-200 hover:scale-105 transform"
            >
              About
            </Link>
            <Link 
              href="/contact" 
              className="text-gray-700 hover:text-[var(--love-pink)] font-medium transition-colors duration-200 hover:scale-105 transform"
            >
              Contact
            </Link>
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200 btn-love"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-gray-700 icon-rotate" />
            ) : (
              <Menu className="w-6 h-6 text-gray-700 icon-scale" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 shadow-lg slide-in">
          <div className="px-4 py-3 space-y-3">
            <Link 
              href="/love-calculator" 
              className="block text-gray-700 hover:text-[var(--love-pink)] font-medium py-2 transition-colors duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              Love Calculator
            </Link>
            
            <div className="space-y-2">
              <div className="text-gray-900 font-medium py-2">More Tools</div>
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
              { href: '/about', label: 'About' },
              { href: '/contact', label: 'Contact' }
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