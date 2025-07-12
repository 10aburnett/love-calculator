'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Share2, RefreshCw, ChevronDown, ChevronUp, Download, Copy, Check, Twitter, Facebook, Instagram, Send, ExternalLink, MessageCircle, Phone } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import html2canvas from 'html2canvas';
import { useTranslations } from '@/hooks/useTranslations';
import { useParams } from 'next/navigation';

interface DateOfBirthResult {
  score: number;
  breakdown: {
    ageHarmony: number;
    birthMonthMatch: number;
    numerology: number;
    astrologicalSync: number;
    generationalHarmony: number;
  };
  analysis: {
    ageDifference: number;
    lifeStage: string;
    seasonalMatch: string;
    numerologyMessage: string;
    overallMessage: string;
  };
}

// Algorithm functions
function calculateLifePathNumber(date: Date): number {
  // Safety check for invalid dates
  if (!date || isNaN(date.getTime())) return 1;
  
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  
  // Additional safety checks
  if (isNaN(day) || isNaN(month) || isNaN(year)) return 1;
  
  let sum = day + month + year;
  while (sum > 9) {
    sum = sum.toString().split('').reduce((acc, num) => acc + parseInt(num), 0);
  }
  return sum || 1; // Ensure we never return 0
}

function getSeasonFromMonth(month: number): string {
  if (month >= 3 && month <= 5) return 'spring';
  if (month >= 6 && month <= 8) return 'summer';
  if (month >= 9 && month <= 11) return 'autumn';
  return 'winter';
}

function calculateAgeHarmony(date1: Date, date2: Date): number {
  // Safety check for invalid dates
  if (!date1 || !date2 || isNaN(date1.getTime()) || isNaN(date2.getTime())) return 50;
  
  const ageDiff = Math.abs(date1.getFullYear() - date2.getFullYear());
  
  // Ideal age differences get higher scores
  if (ageDiff === 0) return 100;
  if (ageDiff <= 2) return 95;
  if (ageDiff <= 5) return 85;
  if (ageDiff <= 10) return 70;
  if (ageDiff <= 15) return 55;
  return Math.max(20, 50 - ageDiff);
}

function calculateBirthMonthMatch(date1: Date, date2: Date): number {
  // Safety check for invalid dates
  if (!date1 || !date2 || isNaN(date1.getTime()) || isNaN(date2.getTime())) return 60;
  
  const month1 = date1.getMonth();
  const month2 = date2.getMonth();
  
  const season1 = getSeasonFromMonth(month1 + 1);
  const season2 = getSeasonFromMonth(month2 + 1);
  
  // Same season = high compatibility
  if (season1 === season2) return 90;
  
  // Complementary seasons (opposite) = good compatibility
  const opposites = [
    ['spring', 'autumn'],
    ['summer', 'winter']
  ];
  
  for (const pair of opposites) {
    if (pair.includes(season1) && pair.includes(season2)) return 75;
  }
  
  // Adjacent seasons = moderate compatibility
  return 60;
}

function calculateNumerology(date1: Date, date2: Date): number {
  // Safety check for invalid dates
  if (!date1 || !date2 || isNaN(date1.getTime()) || isNaN(date2.getTime())) return 65;
  
  const life1 = calculateLifePathNumber(date1);
  const life2 = calculateLifePathNumber(date2);
  
  // Perfect matches
  if (life1 === life2) return 95;
  
  // Highly compatible numbers
  const compatible = [
    [1, 3], [1, 5], [1, 9],
    [2, 4], [2, 6], [2, 8],
    [3, 5], [3, 7], [3, 9],
    [4, 6], [4, 8],
    [5, 7], [5, 9],
    [6, 8], [6, 9],
    [7, 9]
  ];
  
  for (const pair of compatible) {
    if (pair.includes(life1) && pair.includes(life2)) return 85;
  }
  
  // Moderate compatibility
  return 65;
}

function calculateAstrologicalSync(date1: Date, date2: Date): number {
  // Safety check for invalid dates
  if (!date1 || !date2 || isNaN(date1.getTime()) || isNaN(date2.getTime())) return 60;
  
  const day1 = date1.getDate();
  const day2 = date2.getDate();
  
  // Same birth day = cosmic connection
  if (day1 === day2) return 100;
  
  // Days within 3 of each other = strong sync
  if (Math.abs(day1 - day2) <= 3) return 85;
  
  // Days that add up to significant numbers
  const sum = day1 + day2;
  if (sum === 14 || sum === 21 || sum === 28) return 80;
  
  // Birth days in same week of month
  const week1 = Math.ceil(day1 / 7);
  const week2 = Math.ceil(day2 / 7);
  if (week1 === week2) return 70;
  
  return 60;
}

function calculateGenerationalHarmony(date1: Date, date2: Date): number {
  // Safety check for invalid dates
  if (!date1 || !date2 || isNaN(date1.getTime()) || isNaN(date2.getTime())) return 50;
  
  const year1 = date1.getFullYear();
  const year2 = date2.getFullYear();
  
  // Same year = perfect harmony
  if (year1 === year2) return 100;
  
  // Within 5 years = excellent
  if (Math.abs(year1 - year2) <= 5) return 90;
  
  // Within 10 years = very good
  if (Math.abs(year1 - year2) <= 10) return 80;
  
  // Within 20 years = good
  if (Math.abs(year1 - year2) <= 20) return 70;
  
  // Different generations but can work
  return 50;
}

function analyzeCompatibility(date1: Date, date2: Date, t: any): DateOfBirthResult {
  const ageHarmony = calculateAgeHarmony(date1, date2);
  const birthMonthMatch = calculateBirthMonthMatch(date1, date2);
  const numerology = calculateNumerology(date1, date2);
  const astrologicalSync = calculateAstrologicalSync(date1, date2);
  const generationalHarmony = calculateGenerationalHarmony(date1, date2);
  
  const score = Math.round((ageHarmony + birthMonthMatch + numerology + astrologicalSync + generationalHarmony) / 5);
  
  const ageDifference = Math.abs(date1.getFullYear() - date2.getFullYear());
  const season1 = getSeasonFromMonth(date1.getMonth() + 1);
  const season2 = getSeasonFromMonth(date2.getMonth() + 1);
  
  let lifeStage = '';
  if (ageDifference <= 2) lifeStage = t('dobCalculator.lifeStageMessages.perfectSync');
  else if (ageDifference <= 5) lifeStage = t('dobCalculator.lifeStageMessages.greatAlignment');
  else if (ageDifference <= 10) lifeStage = t('dobCalculator.lifeStageMessages.complementaryStages');
  else lifeStage = t('dobCalculator.lifeStageMessages.differentPerspectives');
  
  let seasonalMatch = '';
  if (season1 === season2) {
    seasonalMatch = t('dobCalculator.seasonalMatchMessages.bothSame', { season: t(`dobCalculator.seasons.${season1}`) });
  } else {
    seasonalMatch = t('dobCalculator.seasonalMatchMessages.different', { 
      season1: t(`dobCalculator.seasons.${season1}`), 
      season2: t(`dobCalculator.seasons.${season2}`) 
    });
  }
  
  const life1 = calculateLifePathNumber(date1);
  const life2 = calculateLifePathNumber(date2);
  const numerologyMessage = t('dobCalculator.numerologyMessages.lifePaths', {
    path1: life1,
    path2: life2,
    message: life1 === life2 ? t('dobCalculator.numerologyMessages.twinSouls') : t('dobCalculator.numerologyMessages.complementaryEnergies')
  });
  
  let overallMessage = '';
  if (score >= 85) overallMessage = t('dobCalculator.overallMessages.cosmicSoulmates');
  else if (score >= 75) overallMessage = t('dobCalculator.overallMessages.writtenInStars');
  else if (score >= 65) overallMessage = t('dobCalculator.overallMessages.beautifulConnection');
  else if (score >= 55) overallMessage = t('dobCalculator.overallMessages.goodVibes');
  else overallMessage = t('dobCalculator.overallMessages.uniquePairing');
  
  return {
    score,
    breakdown: {
      ageHarmony,
      birthMonthMatch,
      numerology,
      astrologicalSync,
      generationalHarmony,
    },
    analysis: {
      ageDifference,
      lifeStage,
      seasonalMatch,
      numerologyMessage,
      overallMessage,
    },
  };
}

// Improved ghost template function with separator support
function getGhostDOB(value: string, t: any) {
  const digits = value.replace(/\D/g, ''); // only digits
  const template = t('common.ghostDateFormat'); // Get localized template like "tt.mm.jjjj" or "gg/mm/aaaa"
  
  let display = '';
  let digitIndex = 0;
  
  for (let i = 0; i < template.length; i++) {
    const char = template.charAt(i);
    // Check if character is a separator (/, -, .)
    if (char === '/' || char === '-' || char === '.') {
      display += char;
    } else {
      // Character is part of the date pattern
      if (digitIndex < digits.length) {
        display += digits.charAt(digitIndex);
      } else {
        display += char;
      }
      digitIndex++;
    }
  }
  
  return display;
}

export default function DateOfBirthCalculator() {
  const { t } = useTranslations();
  const params = useParams();
  const locale = params?.locale as string || 'en';
  const [date1, setDate1] = useState('');
  const [date2, setDate2] = useState('');
  const [name1, setName1] = useState('');
  const [name2, setName2] = useState('');
  const [result, setResult] = useState<DateOfBirthResult | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [animatedScore, setAnimatedScore] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);

  const [copySuccess, setCopySuccess] = useState(false);
  const [isSharing, setIsSharing] = useState(false);
  const resultRef = useRef<HTMLDivElement>(null);
  const date1Ref = useRef<HTMLInputElement>(null);
  const date2Ref = useRef<HTMLInputElement>(null);

  // Handle date input formatting with proper separator based on locale
  const handleDateInput = (value: string, setDate: (date: string) => void) => {
    // Remove all non-numeric characters
    const digits = value.replace(/\D/g, '');
    
    // Get the separator from the date format
    const dateFormat = t('common.dateFormat');
    const separator = dateFormat.includes('.') ? '.' : '/';
    
    // Determine if we need year first (Chinese/Japanese format)
    const isYearFirst = dateFormat.startsWith('yyyy') || dateFormat.startsWith('年年年年');
    
    let formatted = '';
    
    if (isYearFirst) {
      // YYYY/MM/DD format for Chinese and Japanese
      if (digits.length >= 1) {
        formatted = digits.slice(0, 4);
      }
      if (digits.length >= 5) {
        formatted += separator + digits.slice(4, 6);
      }
      if (digits.length >= 7) {
        formatted += separator + digits.slice(6, 8);
      }
      // Limit to 10 characters total (yyyy/mm/dd)
      formatted = formatted.slice(0, 10);
    } else {
      // DD/MM/YYYY or MM/DD/YYYY format
      if (digits.length >= 1) {
        formatted = digits.slice(0, 2);
      }
      if (digits.length >= 3) {
        formatted += separator + digits.slice(2, 4);
      }
      if (digits.length >= 5) {
        formatted += separator + digits.slice(4, 8);
      }
      // Limit to 10 characters total (dd/mm/yyyy)
      formatted = formatted.slice(0, 10);
    }
    
    setDate(formatted);
  };

  // Handle date deletion/backspace with proper separator
  const handleDateKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, currentValue: string, setDate: (date: string) => void) => {
    if (e.key === 'Backspace' || e.key === 'Delete') {
      // Allow normal backspace behavior
      const input = e.target as HTMLInputElement;
      const cursorPosition = input.selectionStart;
      
      // Get the separator from the date format
      const dateFormat = t('common.dateFormat');
      const separator = dateFormat.includes('.') ? '.' : '/';
      
      if (cursorPosition !== null) {
        // If cursor is right after a separator, delete the digit before the separator
        if (cursorPosition > 0 && currentValue[cursorPosition - 1] === separator) {
          e.preventDefault();
          const newValue = currentValue.slice(0, cursorPosition - 2) + currentValue.slice(cursorPosition);
          handleDateInput(newValue, setDate);
          setTimeout(() => {
            input.setSelectionRange(cursorPosition - 2, cursorPosition - 2);
          }, 0);
    }
      }
    }
  };

  const handleCalculate = async () => {
    if (!date1 || !date2 || !name1.trim() || !name2.trim()) return;

    setIsCalculating(true);
    setResult(null);
    setAnimatedScore(0);

    try {
    // Simulate calculation delay
    await new Promise(resolve => setTimeout(resolve, 1500));

      // Parse dates with proper validation
      const birthDate1 = parseDate(date1);
      const birthDate2 = parseDate(date2);

      // Validate dates
      if (!birthDate1 || !birthDate2 || isNaN(birthDate1.getTime()) || isNaN(birthDate2.getTime())) {
        alert('Please enter valid dates in the correct format (MM/DD/YYYY, DD/MM/YYYY, or YYYY/MM/DD depending on your language).');
        setIsCalculating(false);
        return;
      }

      // Check if dates are reasonable (not in future, not before year 0)
      const now = new Date();
      const minYear = 0;
      
      if (birthDate1 > now || birthDate2 > now) {
        alert('Please enter dates that are not in the future.');
        setIsCalculating(false);
        return;
      }
      
      if (birthDate1.getFullYear() < minYear || birthDate2.getFullYear() < minYear) {
        alert('Please enter dates from year 0 onwards.');
        setIsCalculating(false);
        return;
      }

      const compatibility = analyzeCompatibility(birthDate1, birthDate2, t);

    setResult(compatibility);
    setIsCalculating(false);

    // Animate score
    animateScore(compatibility.score);
    } catch (error) {
      console.error('Error calculating compatibility:', error);
      setIsCalculating(false);
    }
  };

  // Helper function to parse dates with culture-aware formatting
  const parseDate = (dateString: string): Date | null => {
    if (!dateString || dateString.length < 8) return null;
    
    // Remove any non-numeric characters except separators
    const cleaned = dateString.replace(/[^0-9/.]/g, '');
    const parts = cleaned.split(/[/.]/); // Split on either slash or dot
    
    if (parts.length !== 3) return null;
    
    // Get the date format to determine order
    const dateFormat = t('common.dateFormat');
    const isYearFirst = dateFormat.startsWith('yyyy') || dateFormat.startsWith('年年年年');
    const isMonthFirst = dateFormat.startsWith('mm') || dateFormat.startsWith('MM');
    
    let day: number, month: number, year: number;
    
    if (isYearFirst) {
      // YYYY/MM/DD format (Chinese, Japanese)
      year = parseInt(parts[0], 10);
      month = parseInt(parts[1], 10);
      day = parseInt(parts[2], 10);
    } else if (isMonthFirst) {
      // MM/DD/YYYY format (US English)
      month = parseInt(parts[0], 10);
      day = parseInt(parts[1], 10);
      year = parseInt(parts[2], 10);
    } else {
      // DD/MM/YYYY format (most other countries)
      day = parseInt(parts[0], 10);
      month = parseInt(parts[1], 10);
      year = parseInt(parts[2], 10);
    }
    
    // Basic validation
    if (isNaN(day) || isNaN(month) || isNaN(year)) return null;
    if (day < 1 || day > 31) return null;
    if (month < 1 || month > 12) return null;
    if (year < 0 || year > new Date().getFullYear()) return null;
    
    // Create date (month is 0-indexed in JavaScript Date)
    // Use setFullYear to handle years 0-99 correctly (JavaScript interprets 0-99 as 1900-1999 otherwise)
    const date = new Date(2000, month - 1, day); // Start with a safe year
    date.setFullYear(year); // Then set the actual year to avoid JS interpretation issues
    
    // Verify the date is valid (handles cases like Feb 30)
    if (date.getDate() !== day || date.getMonth() !== month - 1 || date.getFullYear() !== year) {
      return null;
    }
    
    return date;
  };

  const animateScore = (targetScore: number) => {
    const duration = 2000;
    const steps = 60;
    const increment = targetScore / steps;
    let currentScore = 0;

    const timer = setInterval(() => {
      currentScore += increment;
      if (currentScore >= targetScore) {
        setAnimatedScore(targetScore);
        clearInterval(timer);
      } else {
        setAnimatedScore(Math.floor(currentScore));
      }
    }, duration / steps);
  };

  const reset = () => {
    setDate1('');
    setDate2('');
    setName1('');
    setName2('');
    setResult(null);
    setAnimatedScore(0);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleCalculate();
  };

  const generateShareImage = async () => {
    if (!result || !resultRef.current) return;

    try {
      // Create a styled clone for cleaner image generation
      const originalElement = resultRef.current;
      const clone = originalElement.cloneNode(true) as HTMLElement;
      
      // Create a temporary container
      const tempContainer = document.createElement('div');
      tempContainer.style.position = 'absolute';
      tempContainer.style.left = '-9999px';
      tempContainer.style.top = '-9999px';
      tempContainer.style.width = '800px';
      tempContainer.style.background = '#ffffff';
      tempContainer.style.padding = '40px';
      tempContainer.style.borderRadius = '20px';
      document.body.appendChild(tempContainer);
      tempContainer.appendChild(clone);

      // Generate the image
      const canvas = await html2canvas(tempContainer, {
        backgroundColor: '#ffffff',
        scale: 2,
        useCORS: true,
        logging: false,
        onclone: (clonedDoc) => {
          const style = clonedDoc.createElement('style');
          style.textContent = `
            /* Remove all backgrounds except main container */
            * {
              background: transparent !important;
              box-shadow: none !important;
            }
            
            /* Keep main container white */
            .glow {
              background: #ffffff !important;
              border: 2px solid #e0e7ff !important;
            }
            
            /* Ensure text is readable */
            * {
              color: #374151 !important;
            }
            
            h3, h4, .text-gray-900 {
              color: #111827 !important;
              font-weight: 700 !important;
            }
            
            /* Clean typography */
            .font-playfair {
              font-family: 'Playfair Display', serif !important;
            }
            
            /* Ensure emojis display properly */
            .heartbeat, .icon-bounce {
              font-size: 2.5rem !important;
            }
            
            /* Clean centered caption */
            .slide-in {
              color: #374151 !important;
              font-weight: 500 !important;
              font-size: 1.125rem !important;
              line-height: 1.75rem !important;
              margin-top: 1rem !important;
              text-align: center !important;
              margin-left: auto !important;
              margin-right: auto !important;
              max-width: 90% !important;
              padding: 0 1rem !important;
            }

            /* Hide interactive elements */
            button, .group, [role="button"] {
              display: none !important;
            }

            /* Remove the gap between chart and emoji section */
            .mb-6:has(.h-72) {
              margin-bottom: 0 !important;
            }

            /* Target the collapsible explanation button area that creates the gap */
            .mt-0 {
              margin-top: 0 !important;
              margin-bottom: 0 !important;
            }

            /* Remove spacing from the explanation button container */
            button[class*="group"] {
              margin-top: 0 !important;
              margin-bottom: 0 !important;
              padding-top: 0 !important;
              padding-bottom: 0 !important;
            }

            /* Target the emoji section to remove all top spacing */
            .icon-bounce {
              margin-top: 0 !important;
              margin-bottom: 0.5rem !important;
            }

            /* Target the motion div containing the emoji section */
            [style*="delay: 1s"] {
              margin-top: 0 !important;
              padding-top: 0 !important;
            }

            /* Ensure emoji section is centered */
            .text-center {
              text-align: center !important;
              display: flex !important;
              flex-direction: column !important;
              align-items: center !important;
              justify-content: center !important;
            }

            /* Remove extra margins from emoji section only */
            .text-6xl {
              margin-top: 0 !important;
              margin-bottom: 0.5rem !important;
            }
          `;
          clonedDoc.head.appendChild(style);
        }
      });

      // Clean up
      document.body.removeChild(tempContainer);

      // Convert to blob and download
      canvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `birthday-compatibility-${name1}-${name2}-${result.score}percent.png`;
          a.click();
          URL.revokeObjectURL(url);
        }
      }, 'image/png', 0.95);
    } catch (error) {
      console.error('Error generating image:', error);
      
      // Fallback: try a simpler approach
      try {
        const canvas = await html2canvas(resultRef.current, {
          backgroundColor: '#ffffff',
          scale: 1.5,
          useCORS: true,
          logging: false,
        });
        
        canvas.toBlob((blob) => {
          if (blob) {
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `birthday-score-${name1}-${name2}.png`;
            a.click();
            URL.revokeObjectURL(url);
          }
        });
      } catch (fallbackError) {
        console.error('Fallback image generation failed:', fallbackError);
        alert('Sorry, there was an issue generating the image. Your browser may not support this feature.');
      }
    }
  };

  // Mobile detection and deep linking utility
  const isMobile = () => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  };

  const tryMobileAppThenWeb = (mobileUrl: string, webUrl: string) => {
    if (isMobile()) {
      // Try mobile app first
      const iframe = document.createElement('iframe');
      iframe.style.display = 'none';
      iframe.src = mobileUrl;
      document.body.appendChild(iframe);
      
      // Fallback to web after short delay if app doesn't open
      setTimeout(() => {
        document.body.removeChild(iframe);
        window.open(webUrl, '_blank');
      }, 1000);
    } else {
      // Desktop: use web URL
      window.open(webUrl, '_blank');
    }
  };

  const shareToTwitter = () => {
    if (!result || isSharing) return;
    const text = t('common.share.dobCompatibility', { name1: name1, name2: name2, score: result.score }) + ' ' + result.analysis.overallMessage + ' ' + t('common.share.tryItYourself');
    const webUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(window.location.origin + '/date-of-birth-calculator')}`;
    window.open(webUrl, '_blank');
  };

  const shareToFacebook = () => {
    if (!result || isSharing) return;
    const shareUrl = window.location.origin + '/date-of-birth-calculator';
    const shareText = t('common.share.dobCompatibility', { name1: name1, name2: name2, score: result.score }) + ' ' + result.analysis.overallMessage;
    const webUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareText)}`;
    window.open(webUrl, '_blank');
  };

  const shareToInstagram = async () => {
    if (!result) return;
    try {
      await generateShareImage();
      const caption = t('common.share.dobCompatibility', { 
        name1: name1, 
        name2: name2, 
        score: result.score 
      }) + ' ' + result.analysis.overallMessage + ' ' + t('common.share.tryItYourself') + ' ' + window.location.origin + '/date-of-birth-calculator 🎂';
      alert(t('common.share.imageDownloaded') + ' ' + t('common.share.uploadToInstagram') + '\n\n' + caption);
    } catch (error) {
      console.error('Error generating Instagram share:', error);
    }
  };

  const shareToSnapchat = () => {
    if (!result) return;
    const text = t('common.share.dobCompatibility', { 
      name1: name1, 
      name2: name2, 
      score: result.score 
    }) + ' ' + result.analysis.overallMessage;
    const mobileUrl = `snapchat://share?text=${encodeURIComponent(text)}`;
    const webUrl = `https://www.snapchat.com/share?text=${encodeURIComponent(text)}&url=${encodeURIComponent(window.location.origin + '/date-of-birth-calculator')}`;
    tryMobileAppThenWeb(mobileUrl, webUrl);
  };

  const shareToTikTok = async () => {
    if (!result) return;
    try {
      await generateShareImage();
      const caption = t('common.share.dobCompatibility', { 
        name1: name1, 
        name2: name2, 
        score: result.score 
      }) + ' ' + result.analysis.overallMessage + ' ' + t('common.share.dobHashtags');
      alert(t('common.share.imageDownloaded') + ' ' + t('common.share.createTikTok') + '\n\n' + caption);
    } catch (error) {
      console.error('Error generating TikTok share:', error);
    }
  };

  const shareToWhatsApp = () => {
    if (!result || isSharing) return;
    const text = t('common.share.dobCompatibility', { name1: name1, name2: name2, score: result.score }) + ' ' + result.analysis.overallMessage + ' ' + t('common.share.tryItYourself') + ' ' + window.location.origin + '/date-of-birth-calculator';
    const webUrl = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(webUrl, '_blank');
  };

  const shareToTelegram = () => {
    if (!result || isSharing) return;
    const text = t('common.share.dobCompatibility', { name1: name1, name2: name2, score: result.score }) + ' ' + result.analysis.overallMessage;
    const shareUrl = window.location.origin + '/date-of-birth-calculator';
    const webUrl = `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(text)}`;
    window.open(webUrl, '_blank');
  };

  const shareToReddit = () => {
    if (!result || isSharing) return;
    const title = t('common.share.dobCompatibility', { name1: name1, name2: name2, score: result.score });
    const text = result.analysis.overallMessage + ' ' + t('common.share.tryItYourself');
    const shareUrl = window.location.origin + '/date-of-birth-calculator';
    const webUrl = `https://reddit.com/submit?url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(title)}&text=${encodeURIComponent(text)}`;
    window.open(webUrl, '_blank');
  };

  const copyToClipboard = async () => {
    if (!result) return;
    const text = t('common.share.dobCompatibility', { 
      name1: name1, 
      name2: name2, 
      score: result.score 
    }) + ' ' + result.analysis.overallMessage + ' ' + t('common.share.tryItYourself') + ' ' + window.location.origin + '/date-of-birth-calculator';
    try {
      await navigator.clipboard.writeText(text);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 3000);
    } catch (error) {
      console.error('Failed to copy:', error);
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 3000);
    }
  };

  const shareViaWebAPI = async () => {
    if (!result || isSharing) return;
    
    setIsSharing(true);
    const shareData = {
      title: t('common.share.loveCalculatorResult'),
      text: t('common.share.dobCompatibility', { 
        name1: name1, 
        name2: name2, 
        score: result.score 
      }) + ' ' + result.analysis.overallMessage,
      url: window.location.origin + '/date-of-birth-calculator',
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        // Fallback to copy to clipboard
        await copyToClipboard();
      }
    } catch (error: any) {
      // Only show error if it's not a user cancellation
      if (error.name !== 'AbortError' && !error.message?.includes('canceled')) {
        console.error('Error sharing:', error);
        // Fallback to copy to clipboard on actual errors
        await copyToClipboard();
      }
      // If user canceled, do nothing (this is expected behavior)
    } finally {
      setIsSharing(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Input Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white rounded-2xl shadow-xl p-8 mb-12 border border-gray-200 card-hover scale-in"
      >
        <div className="text-center mb-8">
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
          >
            <Calendar className="w-16 h-16 mx-auto mb-4 text-[var(--love-pink)] heartbeat" />
          </motion.div>
          <h2 className="text-2xl font-playfair font-bold text-gray-900 mb-2 fade-in">
            {t('dobCalculator.enterYourBirthDatesTitle')}
          </h2>
          <p className="text-gray-600 slide-in">
            {t('dobCalculator.enterYourBirthDatesDescription')}
          </p>
        </div>

        <div role="search" data-form-type="search" data-lpignore="true" data-1p-ignore="true" data-bwignore="true">
        <div className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('dobCalculator.yourName')}
                </label>
                <input
                  type="search"
                  value={name1}
                  onChange={(e) => setName1(e.target.value)}
                  placeholder={t('dobCalculator.enterYourName')}
                  autoComplete="nope"
                  autoCorrect="off"
                  autoCapitalize="off"
                  spellCheck="false"
                  data-form-type="search"
                  data-lpignore="true"
                  data-1p-ignore="true"
                  data-bwignore="true"
                  name="search_term_alpha"
                  role="searchbox"
                  className="calculator-input w-full px-4 py-3 border border-[var(--love-pink)]/20 rounded-lg focus:ring-2 focus:ring-[var(--love-pink)] focus:border-transparent transition-all duration-200 hover:border-[var(--love-pink)]/40"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('dobCalculator.theirName')}
                </label>
                <input
                  type="search"
                  value={name2}
                  onChange={(e) => setName2(e.target.value)}
                  placeholder={t('dobCalculator.enterTheirName')}
                  autoComplete="nope"
                  autoCorrect="off"
                  autoCapitalize="off"
                  spellCheck="false"
                  data-form-type="search"
                  data-lpignore="true"
                  data-1p-ignore="true"
                  data-bwignore="true"
                  name="search_term_beta"
                  role="searchbox"
                  className="calculator-input w-full px-4 py-3 border border-[var(--love-pink)]/20 rounded-lg focus:ring-2 focus:ring-[var(--love-pink)] focus:border-transparent transition-all duration-200 hover:border-[var(--love-pink)]/40"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('dobCalculator.yourBirthDate')}
                </label>
                <div style={{ position: 'relative', display: 'inline-block', width: '100%' }}>
                <input
                    type="search"
                    id="date1"
                    name="search_numeric_alpha"
                    inputMode="numeric"
                    autoComplete="nope"
                    data-form-type="search"
                    data-lpignore="true"
                    data-1p-ignore="true"
                    data-bwignore="true"
                    role="searchbox"
                    maxLength={10}
                  value={date1}
                    ref={date1Ref}
                    onChange={e => handleDateInput(e.target.value, setDate1)}
                    onKeyDown={e => handleDateKeyDown(e, date1, setDate1)}
                    className="calculator-input absolute top-0 left-0 bg-transparent text-gray-900 z-[2] border border-[var(--love-pink)]/20 p-2 w-full rounded-lg focus:ring-2 focus:ring-[var(--love-pink)] focus:border-transparent transition-all duration-200 hover:border-[var(--love-pink)]/40"
                    placeholder={t('common.ghostDateFormat')}
                  />
                  <div
                    className="ghost-date-template"
                    style={{
                      padding: 8,
                      border: '1px solid transparent',
                      width: '100%',
                      borderRadius: 6,
                    }}
                  >{getGhostDOB(date1, t)}</div>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('dobCalculator.theirBirthDate')}
                </label>
                <div style={{ position: 'relative', display: 'inline-block', width: '100%' }}>
                <input
                    type="search"
                    id="date2"
                    name="search_numeric_beta"
                    inputMode="numeric"
                    autoComplete="nope"
                    data-form-type="search"
                    data-lpignore="true"
                    data-1p-ignore="true"
                    data-bwignore="true"
                    role="searchbox"
                    maxLength={10}
                  value={date2}
                    ref={date2Ref}
                    onChange={e => handleDateInput(e.target.value, setDate2)}
                    onKeyDown={e => handleDateKeyDown(e, date2, setDate2)}
                    className="calculator-input absolute top-0 left-0 bg-transparent text-gray-900 z-[2] border border-[var(--love-pink)]/20 p-2 w-full rounded-lg focus:ring-2 focus:ring-[var(--love-pink)] focus:border-transparent transition-all duration-200 hover:border-[var(--love-pink)]/40"
                    placeholder={t('common.ghostDateFormat')}
                  />
                  <div
                    className="ghost-date-template"
                    style={{
                      padding: 8,
                      border: '1px solid transparent',
                      width: '100%',
                      borderRadius: 6,
                    }}
                  >{getGhostDOB(date2, t)}</div>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={!date1 || !date2 || !name1.trim() || !name2.trim() || isCalculating}
                className="flex-1 bg-gradient-to-r from-[var(--love-pink)] to-[var(--love-purple)] text-white font-semibold py-3 px-6 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed pulse-love hover:shadow-lg transition-all duration-200 btn-love"
              >
                {isCalculating ? (
                  <div className="flex items-center justify-center">
                    <RefreshCw className="w-5 h-5 animate-spin mr-2 loading-spinner" />
                    {t('dobCalculator.analyzingBirthDates')}
                  </div>
                ) : (
                  t('dobCalculator.calculateCompatibility')
                )}
              </motion.button>

              {result && (
                <motion.button
                  type="button"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={reset}
                  className="px-6 py-3 border-2 border-[var(--love-pink)] text-[var(--love-pink)] font-semibold rounded-lg hover:bg-[var(--love-pink)] hover:text-white transition-all duration-200 btn-love"
                >
                  {t('dobCalculator.tryAgain')}
                </motion.button>
              )}
            </div>
          </form>

          <div style={{textAlign: 'center', fontSize: 14, color: '#555', marginTop: 16, marginBottom: 0}}>
            <div style={{marginBottom: 6}}>{t('dobCalculator.whyNotTryOtherTools')}</div>
            <div>
              <a href={`/${locale}/love-calculator`} style={{color: '#e75480', textDecoration: 'underline', display: 'inline-block', margin: '4px 0'}}>{t('dobCalculator.loveCalculator')}</a>
            </div>
            <div>
              <a href={`/${locale}/zodiac-compatibility-calculator`} style={{color: '#e75480', textDecoration: 'underline', display: 'inline-block', margin: '0 0 -1px 0'}}>{t('dobCalculator.zodiacCompatibilityCalculator')}</a>
            </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Results */}
      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            transition={{ duration: 0.6, type: "spring", bounce: 0.4 }}
            className="mt-8"
            ref={resultRef}
          >
            <div className="bg-gradient-to-br from-rose-50 to-purple-50 rounded-2xl shadow-xl p-8 border border-rose-200 text-center card-hover glow">
              <div className="mb-6">
                <h3 className="text-3xl font-playfair font-semibold text-gray-900 mb-2 fade-in">
                  {name1} + {name2}
                </h3>
                <div className="flex items-center justify-center space-x-2 text-4xl mb-4">
                  <span className="heartbeat">🎂</span>
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5, type: "spring", bounce: 0.6 }}
                    className="text-4xl font-bold text-[var(--love-pink)] heartbeat"
                  >
                    {animatedScore}%
                  </motion.span>
                  <span className="heartbeat">🎂</span>
                </div>
              </div>

              {/* Breakdown Chart */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="mb-0"
              >
                <h4 className="text-lg font-semibold text-gray-900 mb-4">
                  {t('dobCalculator.birthdayCompatibilityBreakdown')}
                </h4>
                <div className="h-80 w-full min-h-[280px] overflow-hidden">
                  <ResponsiveContainer width="100%" height="100%" minHeight={200}>
                    <BarChart
                      data={[
                        { name: t('dobCalculator.age'), score: result.breakdown.ageHarmony || 0, fullName: t('dobCalculator.ageHarmonyFull'), color: '#ff6b9d'},
                        { name: t('dobCalculator.season'), score: result.breakdown.birthMonthMatch || 0, fullName: t('dobCalculator.seasonalPatternsFull'), color: '#c44569' },
                        { name: t('dobCalculator.numbers'), score: result.breakdown.numerology || 0, fullName: t('dobCalculator.numerologicalPathsFull'), color: '#f8b500' },
                        { name: t('dobCalculator.cosmic'), score: result.breakdown.astrologicalSync || 0, fullName: t('dobCalculator.cosmicSyncFull'), color: '#6c5ce7' },
                        { name: t('dobCalculator.generation'), score: result.breakdown.generationalHarmony || 0, fullName: t('dobCalculator.generationalEnergyFull'), color: '#00b894' },
                      ]}
                      margin={{ top: 20, right: 30, left: 10, bottom: 70 }}
                    >
                      <defs>
                        <linearGradient id="age" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#ff6b9d" stopOpacity={0.8}/>
                          <stop offset="100%" stopColor="#ff6b9d" stopOpacity={0.3}/>
                        </linearGradient>
                        <linearGradient id="season" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#c44569" stopOpacity={0.8}/>
                          <stop offset="100%" stopColor="#c44569" stopOpacity={0.3}/>
                        </linearGradient>
                        <linearGradient id="numerology" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#f8b500" stopOpacity={0.8}/>
                          <stop offset="100%" stopColor="#f8b500" stopOpacity={0.3}/>
                        </linearGradient>
                        <linearGradient id="cosmic" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#6c5ce7" stopOpacity={0.8}/>
                          <stop offset="100%" stopColor="#6c5ce7" stopOpacity={0.3}/>
                        </linearGradient>
                        <linearGradient id="generation" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#00b894" stopOpacity={0.8}/>
                          <stop offset="100%" stopColor="#00b894" stopOpacity={0.3}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid 
                        strokeDasharray="3 3" 
                        stroke="#e0e7ff" 
                        strokeOpacity={0.5}
                        vertical={false}
                      />
                      <XAxis 
                        dataKey="name" 
                        tick={{ fontSize: 10, fill: '#6b7280', fontWeight: 500, textAnchor: 'middle' }}
                        interval={0}
                        height={60}
                        axisLine={false}
                        tickLine={false}
                        angle={-45}
                        textAnchor="end"
                      />
                      <YAxis 
                        tick={{ fontSize: 9, fill: '#6b7280' }}
                        domain={[0, 100]}
                        axisLine={false}
                        tickLine={false}
                        tickFormatter={(value) => `${value}`}
                      />
                      <Tooltip 
                        formatter={(value, name, props) => {
                          const score = Math.round(Number(value));
                          return [`${score}/100`, t('common.chartTooltipScore') || 'Score'];
                        }}
                        labelFormatter={(label, payload) => {
                          const item = payload?.[0]?.payload;
                          return item?.fullName || label;
                        }}
                        contentStyle={{
                          backgroundColor: 'rgba(255, 255, 255, 0.95)',
                          border: 'none',
                          borderRadius: '12px',
                          fontSize: '13px',
                          fontWeight: '500',
                          boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
                          backdropFilter: 'blur(10px)'
                        }}
                        cursor={{
                          fill: 'rgba(255, 107, 157, 0.1)',
                          radius: 8
                        }}
                      />
                                                  <Bar dataKey="score" 
                        radius={[8, 8, 0, 0]}
                        stroke="rgba(255, 255, 255, 0.3)"
                        strokeWidth={1}
                       fill="#8884d8">
                        <Cell fill="#ff6b9d" />
                        <Cell fill="#c44569" />
                        <Cell fill="#6c5ce7" />
                        <Cell fill="#6c5ce7" />
                        <Cell fill="#00b894" />
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </motion.div>

              {/* Collapsible Explanation */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="mt-[-24px] mb-8"
              >
                <button
                  onClick={() => setShowExplanation(!showExplanation)}
                  className="group flex items-center justify-center space-x-2 bg-gradient-to-r from-rose-50 to-purple-50 hover:from-rose-100 hover:to-purple-100 dark:from-gray-700 dark:to-gray-600 dark:hover:from-gray-600 dark:hover:to-gray-500 border border-rose-200 hover:border-rose-300 dark:border-gray-600 dark:hover:border-gray-500 rounded-full px-6 py-3 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-rose-700 dark:hover:text-rose-300 transition-all duration-300 hover:shadow-md hover:scale-[1.02] mx-auto relative z-10 cursor-pointer"
                  style={{ pointerEvents: 'auto' }}
                >
                  <span className="text-rose-600 dark:text-rose-400 group-hover:text-rose-700 dark:group-hover:text-rose-300 transition-colors duration-200">🔍</span>
                  <span>{t('dobCalculator.whyThisScore')}</span>
                  <div className="transition-transform duration-200 group-hover:scale-110">
                    {showExplanation ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>
                
                <AnimatePresence>
                  {showExplanation && (
                    <motion.div
                      initial={{ opacity: 0, scaleY: 0 }}
                      animate={{ opacity: 1, scaleY: 1 }}
                      exit={{ opacity: 0, scaleY: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      style={{ transformOrigin: 'top' }}
                      className="mt-4 text-left text-xs text-gray-600 dark:text-gray-400 bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-600 overflow-hidden"
                    >
                      <h5 className="font-semibold mb-2 text-gray-800 dark:text-gray-200">{t('dobCalculator.scienceBehindScore')}</h5>
                      <ul className="space-y-1 list-disc list-inside">
                        <li><strong>{t('dobCalculator.ageHarmonyFull')} (0-100):</strong> {t('dobCalculator.ageHarmonyDescription')}</li>
                        <li><strong>{t('dobCalculator.seasonalPatternsFull')} (0-100):</strong> {t('dobCalculator.seasonPatternsDescription')}</li>
                        <li><strong>{t('dobCalculator.numerologicalPathsFull')} (0-100):</strong> {t('dobCalculator.numbersDescription')}</li>
                        <li><strong>{t('dobCalculator.cosmicSyncFull')} (0-100):</strong> {t('dobCalculator.cosmicSyncDescription')}</li>
                        <li><strong>{t('dobCalculator.generationalEnergyFull')} (0-100):</strong> {t('dobCalculator.generationDescription')}</li>
                      </ul>
                      <p className="mt-2 text-xs italic text-gray-500 dark:text-gray-400">
                        {t('dobCalculator.algorithmExplanation')}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Analysis */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                className="space-y-6 text-left"
              >
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white rounded-lg p-6 border border-gray-200 card-hover">
                    <h5 className="font-semibold text-gray-900 mb-3">🎯 {t('dobCalculator.lifeStageAnalysis')}</h5>
                    <p className="text-sm text-gray-700">{result.analysis.lifeStage}</p>
                  </div>
                  <div className="bg-white rounded-lg p-6 border border-gray-200 card-hover">
                    <h5 className="font-semibold text-gray-900 mb-3">🌸 {t('dobCalculator.seasonalHarmony')}</h5>
                    <p className="text-sm text-gray-700">{result.analysis.seasonalMatch}</p>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg p-6 border border-gray-200 card-hover">
                  <h5 className="font-semibold text-gray-900 mb-3">🔢 {t('dobCalculator.numerologicalInsight')}</h5>
                  <p className="text-sm text-gray-700">{result.analysis.numerologyMessage}</p>
                </div>
                
                <div className="text-center mt-8 pt-6">
                  <div className="text-6xl mb-6 icon-bounce">
                    {result.score >= 85 ? '💫' : result.score >= 75 ? '⭐' : result.score >= 65 ? '🌟' : result.score >= 55 ? '🎂' : '🎭'}
                  </div>
                  <p className="text-lg text-gray-700 font-medium slide-in">
                    {result.analysis.overallMessage}
                  </p>
                </div>
              </motion.div>

              {/* Share Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 }}
                className="mt-12 space-y-4"
              >
                <h4 className="text-lg font-semibold text-gray-900 mb-4 text-center">
                  {t('dobCalculator.shareYourResults') || 'Share Your Results'}
                </h4>
                
                {/* Social Media Share Buttons */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <button
                    onClick={shareToTwitter}
                    className="flex flex-col items-center space-y-2 p-3 rounded-lg transition-colors duration-200 btn-love"
                    style={{ backgroundColor: '#000000' }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#1a1a1a'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#000000'}
                  >
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                    <span className="text-sm font-medium text-white">Twitter</span>
                  </button>

                  <button
                    onClick={shareToFacebook}
                    className="flex flex-col items-center space-y-2 p-3 rounded-lg transition-colors duration-200 btn-love"
                    style={{ backgroundColor: '#1877F2' }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#166FE5'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#1877F2'}
                  >
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                    <span className="text-sm font-medium text-white">Facebook</span>
                  </button>

                  <button
                    onClick={shareToInstagram}
                    className="flex flex-col items-center space-y-2 p-3 rounded-lg transition-colors duration-200 btn-love"
                    style={{ background: 'linear-gradient(135deg, #833AB4, #E1306C, #F56040)' }}
                  >
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.40s-.644-1.44-1.439-1.40z"/>
                    </svg>
                    <span className="text-sm font-medium text-white">Instagram</span>
                  </button>

                  <button
                    onClick={shareToTikTok}
                    className="flex flex-col items-center space-y-2 p-3 rounded-lg transition-colors duration-200 btn-love"
                    style={{ backgroundColor: '#000000' }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#1a1a1a'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#000000'}
                  >
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                    </svg>
                    <span className="text-sm font-medium text-white">TikTok</span>
                  </button>

                  <button
                    onClick={shareToWhatsApp}
                    className="flex flex-col items-center space-y-2 p-3 rounded-lg transition-colors duration-200 btn-love"
                    style={{ backgroundColor: '#25D366' }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#22C55E'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#25D366'}
                  >
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.893 3.488"/>
                    </svg>
                    <span className="text-sm font-medium text-white">WhatsApp</span>
                  </button>

                  <button
                    onClick={shareToReddit}
                    className="flex flex-col items-center space-y-2 p-3 rounded-lg transition-colors duration-200 btn-love"
                    style={{ backgroundColor: '#FF6314' }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#E5571A'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#FF6314'}
                  >
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z"/>
                    </svg>
                    <span className="text-sm font-medium text-white">Reddit</span>
                  </button>

                  <button
                    onClick={shareToTelegram}
                    className="flex flex-col items-center space-y-2 p-3 rounded-lg transition-colors duration-200 btn-love"
                    style={{ backgroundColor: '#0088CC' }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#007BB5'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#0088CC'}
                  >
                    <svg className="w-6 h-6" fill="white" viewBox="0 0 24 24">
                      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                    </svg>
                    <span className="text-sm font-medium text-white">Telegram</span>
                  </button>

                  <button
                    onClick={shareToSnapchat}
                    className="flex flex-col items-center space-y-2 p-3 rounded-lg transition-colors duration-200 btn-love"
                    style={{ backgroundColor: '#FFFC00' }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#F7F700'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#FFFC00'}
                  >
                    <svg className="w-6 h-6" viewBox="147.353 39.286 514.631 514.631" style={{ shapeRendering: 'geometricPrecision' }}>
                      <circle cx="404.67" cy="292.0" r="280" fill="#FFFFFF" vectorEffect="non-scaling-stroke"/>
                      <path d="M408.336,124.235c14.455,0,64.231,3.883,87.688,56.472c7.724,17.317,5.744,48.686,4.156,73.885 c-0.248,3.999-0.494,7.875-0.694,11.576l-0.084,1.591l1.062,1.185c0.429,0.476,4.444,4.672,13.374,5.017l0.144,0.008l0.15-0.003 c5.904-0.225,12.554-2.059,19.776-5.442c1.064-0.498,2.48-0.741,3.978-0.741c1.707,0,3.521,0.321,5.017,0.951l0.226,0.09 c3.787,1.327,6.464,3.829,6.505,6.093c0.022,1.28-0.935,5.891-14.359,11.194c-1.312,0.518-3.039,1.069-5.041,1.7 c-8.736,2.774-21.934,6.96-26.376,17.427c-2.501,5.896-1.816,12.854,2.034,20.678c1.584,3.697,26.52,59.865,82.631,69.111 c-0.011,0.266-0.079,0.557-0.229,0.9c-0.951,2.24-6.996,9.979-44.612,15.783c-5.886,0.902-7.328,7.5-9,15.17 c-0.604,2.746-1.218,5.518-2.062,8.381c-0.258,0.865-0.306,0.914-1.233,0.914c-0.128,0-0.278,0-0.442,0 c-1.668,0-4.2-0.346-7.135-0.922c-5.345-1.041-12.647-2.318-21.982-2.318c-5.21,0-10.577,0.453-15.962,1.352 c-11.511,1.914-20.872,8.535-30.786,15.543c-13.314,9.408-27.075,19.143-48.071,19.143c-0.917,0-1.812-0.031-2.709-0.076 l-0.236-0.01l-0.237,0.018c-0.515,0.045-1.034,0.068-1.564,0.068c-20.993,0-34.76-9.732-48.068-19.143 c-9.916-7.008-19.282-13.629-30.791-15.543c-5.38-0.896-10.752-1.352-15.959-1.352c-9.333,0-16.644,1.428-21.978,2.471 c-2.935,0.574-5.476,1.066-7.139,1.066c-1.362,0-1.388-0.08-1.676-1.064c-0.844-2.865-1.461-5.703-2.062-8.445 c-1.676-7.678-3.119-14.312-9.002-15.215c-37.613-5.809-43.659-13.561-44.613-15.795c-0.149-0.352-0.216-0.652-0.231-0.918 c56.11-9.238,81.041-65.408,82.63-69.119c3.857-7.818,4.541-14.775,2.032-20.678c-4.442-10.461-17.638-14.653-26.368-17.422 c-2.007-0.635-3.735-1.187-5.048-1.705c-11.336-4.479-14.823-8.991-14.305-11.725c0.601-3.153,6.067-6.359,10.837-6.359 c1.072,0,2.012,0.173,2.707,0.498c7.747,3.631,14.819,5.472,21.022,5.472c9.751,0,14.091-4.537,14.557-5.055l1.057-1.182 l-0.085-1.583c-0.197-3.699-0.44-7.574-0.696-11.565c-1.583-25.205-3.563-56.553,4.158-73.871 c23.37-52.396,72.903-56.435,87.525-56.435c0.36,0,6.717-0.065,6.717-0.065C407.744,124.239,408.033,124.235,408.336,124.235 M408.336,115.197h-0.017c-0.333,0-0.646,0-0.944,0.004c-2.376,0.024-6.282,0.062-6.633,0.066c-8.566,0-25.705,1.21-44.115,9.336 c-10.526,4.643-19.994,10.921-28.14,18.66c-9.712,9.221-17.624,20.59-23.512,33.796c-8.623,19.336-6.576,51.905-4.932,78.078 l0.006,0.041c0.176,2.803,0.361,5.73,0.53,8.582c-1.265,0.581-3.316,1.194-6.339,1.194c-4.864,0-10.648-1.555-17.187-4.619 c-1.924-0.896-4.12-1.349-6.543-1.349c-3.893,0-7.997,1.146-11.557,3.239c-4.479,2.63-7.373,6.347-8.159,10.468 c-0.518,2.726-0.493,8.114,5.492,13.578c3.292,3.008,8.128,5.782,14.37,8.249c1.638,0.645,3.582,1.261,5.641,1.914 c7.145,2.271,17.959,5.702,20.779,12.339c1.429,3.365,0.814,7.793-1.823,13.145c-0.069,0.146-0.138,0.289-0.201,0.439 c-0.659,1.539-6.807,15.465-19.418,30.152c-7.166,8.352-15.059,15.332-23.447,20.752c-10.238,6.617-21.316,10.943-32.923,12.855 c-4.558,0.748-7.813,4.809-7.559,9.424c0.078,1.33,0.39,2.656,0.931,3.939c0.004,0.008,0.009,0.016,0.013,0.023 c1.843,4.311,6.116,7.973,13.063,11.203c8.489,3.943,21.185,7.26,37.732,9.855c0.836,1.59,1.704,5.586,2.305,8.322 c0.629,2.908,1.285,5.898,2.22,9.074c1.009,3.441,3.626,7.553,10.349,7.553c2.548,0,5.478-0.574,8.871-1.232 c4.969-0.975,11.764-2.305,20.245-2.305c4.702,0,9.575,0.414,14.48,1.229c9.455,1.574,17.606,7.332,27.037,14 c13.804,9.758,29.429,20.803,53.302,20.803c0.651,0,1.304-0.021,1.949-0.066c0.789,0.037,1.767,0.066,2.799,0.066 c23.88,0,39.501-11.049,53.29-20.799l0.022-0.02c9.433-6.66,17.575-12.41,27.027-13.984c4.903-0.814,9.775-1.229,14.479-1.229 c8.102,0,14.517,1.033,20.245,2.15c3.738,0.736,6.643,1.09,8.872,1.09l0.218,0.004h0.226c4.917,0,8.53-2.699,9.909-7.422 c0.916-3.109,1.57-6.029,2.215-8.986c0.562-2.564,1.46-6.674,2.296-8.281c16.558-2.6,29.249-5.91,37.739-9.852 c6.931-3.215,11.199-6.873,13.053-11.166c0.556-1.287,0.881-2.621,0.954-3.979c0.261-4.607-2.999-8.676-7.56-9.424 c-51.585-8.502-74.824-61.506-75.785-63.758c-0.062-0.148-0.132-0.295-0.205-0.438c-2.637-5.354-3.246-9.777-1.816-13.148 c2.814-6.631,13.621-10.062,20.771-12.332c2.07-0.652,4.021-1.272,5.646-1.914c7.039-2.78,12.07-5.796,15.389-9.221 c3.964-4.083,4.736-7.995,4.688-10.555c-0.121-6.194-4.856-11.698-12.388-14.393c-2.544-1.052-5.445-1.607-8.399-1.607 c-2.011,0-4.989,0.276-7.808,1.592c-6.035,2.824-11.441,4.368-16.082,4.588c-2.468-0.125-4.199-0.66-5.32-1.171 c0.141-2.416,0.297-4.898,0.458-7.486l0.067-1.108c1.653-26.19,3.707-58.784-4.92-78.134c-5.913-13.253-13.853-24.651-23.604-33.892 c-8.178-7.744-17.678-14.021-28.242-18.661C434.052,116.402,416.914,115.197,408.336,115.197" fill="#000000" stroke="#000000" strokeWidth="12"/>
                    </svg>
                    <span className="text-sm font-medium text-black">Snapchat</span>
                  </button>
                </div>

                {/* Utility Buttons */}
                <div className="flex flex-wrap justify-center gap-3 pt-4 border-t border-gray-200">
                  <button
                    onClick={generateShareImage}
                    className="flex items-center space-x-2 bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition-colors duration-200 btn-love"
                  >
                    <Download className="w-4 h-4 icon-scale" />
                    <span className="text-sm">{t('dobCalculator.downloadImage') || 'Download Image'}</span>
                  </button>

                  <button
                    onClick={copyToClipboard}
                    className={`flex items-center space-x-2 ${
                      copySuccess 
                        ? 'bg-green-500 text-white' 
                        : 'bg-gray-500 text-white hover:bg-gray-600'
                    } px-4 py-2 rounded-lg transition-colors duration-200 btn-love`}
                  >
                    {copySuccess ? (
                      <Check className="w-4 h-4 icon-scale" />
                    ) : (
                      <Copy className="w-4 h-4 icon-scale" />
                    )}
                    <span className="text-sm">{copySuccess ? (t('dobCalculator.copied') || 'Copied!') : (t('dobCalculator.copyResults') || 'Copy Results')}</span>
                  </button>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>


    </div>
  );
} 