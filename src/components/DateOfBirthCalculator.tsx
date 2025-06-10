'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Heart, Share2, RefreshCw, ChevronDown, ChevronUp, Download, Copy, Check, Twitter, Facebook, Instagram, Send, ExternalLink } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import html2canvas from 'html2canvas';

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
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  
  let sum = day + month + year;
  while (sum > 9) {
    sum = sum.toString().split('').reduce((acc, num) => acc + parseInt(num), 0);
  }
  return sum;
}

function getSeasonFromMonth(month: number): string {
  if (month >= 3 && month <= 5) return 'Spring';
  if (month >= 6 && month <= 8) return 'Summer';
  if (month >= 9 && month <= 11) return 'Autumn';
  return 'Winter';
}

function calculateAgeHarmony(date1: Date, date2: Date): number {
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
  const month1 = date1.getMonth();
  const month2 = date2.getMonth();
  
  const season1 = getSeasonFromMonth(month1 + 1);
  const season2 = getSeasonFromMonth(month2 + 1);
  
  // Same season = high compatibility
  if (season1 === season2) return 90;
  
  // Complementary seasons (opposite) = good compatibility
  const opposites = [
    ['Spring', 'Autumn'],
    ['Summer', 'Winter']
  ];
  
  for (const pair of opposites) {
    if (pair.includes(season1) && pair.includes(season2)) return 75;
  }
  
  // Adjacent seasons = moderate compatibility
  return 60;
}

function calculateNumerology(date1: Date, date2: Date): number {
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

function analyzeCompatibility(date1: Date, date2: Date): DateOfBirthResult {
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
  if (ageDifference <= 2) lifeStage = 'Perfect sync - you\'re in the same life stage!';
  else if (ageDifference <= 5) lifeStage = 'Great alignment - similar life experiences';
  else if (ageDifference <= 10) lifeStage = 'Complementary stages - learn from each other';
  else lifeStage = 'Different perspectives - unique dynamic';
  
  let seasonalMatch = '';
  if (season1 === season2) seasonalMatch = `Both ${season1} babies - natural harmony!`;
  else seasonalMatch = `${season1} meets ${season2} - beautiful contrast!`;
  
  const life1 = calculateLifePathNumber(date1);
  const life2 = calculateLifePathNumber(date2);
  const numerologyMessage = `Life paths ${life1} & ${life2} - ${life1 === life2 ? 'Twin souls!' : 'Complementary energies'}`;
  
  let overallMessage = '';
  if (score >= 85) overallMessage = 'Cosmic soulmates! Your birth dates reveal incredible compatibility 💫';
  else if (score >= 75) overallMessage = 'Written in the stars! Amazing birthday harmony ⭐';
  else if (score >= 65) overallMessage = 'Beautiful connection! Your dates align wonderfully 🌟';
  else if (score >= 55) overallMessage = 'Good vibes! Solid birthday compatibility 🎂';
  else overallMessage = 'Unique pairing! Opposites can attract beautifully 🎭';
  
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

export default function DateOfBirthCalculator() {
  const [date1, setDate1] = useState('');
  const [date2, setDate2] = useState('');
  const [name1, setName1] = useState('');
  const [name2, setName2] = useState('');
  const [result, setResult] = useState<DateOfBirthResult | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [animatedScore, setAnimatedScore] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const resultRef = useRef<HTMLDivElement>(null);

  const handleCalculate = async () => {
    if (!date1 || !date2 || !name1.trim() || !name2.trim()) return;

    setIsCalculating(true);
    setResult(null);
    setAnimatedScore(0);

    // Simulate calculation delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    const birthDate1 = new Date(date1);
    const birthDate2 = new Date(date2);
    const compatibility = analyzeCompatibility(birthDate1, birthDate2);

    setResult(compatibility);
    setIsCalculating(false);

    // Animate score
    animateScore(compatibility.score);
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

  const shareToTwitter = () => {
    if (!result) return;
    const text = `${name1} + ${name2} = ${result.score}% birthday compatibility! ${result.analysis.overallMessage} Try the Date of Birth Calculator: `;
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(window.location.origin + '/date-of-birth-calculator')}`;
    window.open(url, '_blank');
  };

  const shareToFacebook = () => {
    if (!result) return;
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.origin + '/date-of-birth-calculator')}&quote=${encodeURIComponent(`${name1} + ${name2} = ${result.score}% birthday compatibility! ${result.analysis.overallMessage}`)}`;
    window.open(url, '_blank');
  };

  const shareToInstagram = async () => {
    if (!result) return;
    try {
      await generateShareImage();
      alert('Image downloaded! Upload it to Instagram and use this caption:\n\n' + 
            `${name1} + ${name2} = ${result.score}% birthday compatibility! ${result.analysis.overallMessage} Try the Birthday Calculator at ${window.location.origin}/date-of-birth-calculator 🎂`);
    } catch (error) {
      console.error('Error generating Instagram share:', error);
    }
  };

  const shareToSnapchat = () => {
    if (!result) return;
    const text = `${name1} + ${name2} = ${result.score}% birthday compatibility! ${result.analysis.overallMessage}`;
    const url = `https://www.snapchat.com/share?text=${encodeURIComponent(text)}&url=${encodeURIComponent(window.location.origin + '/date-of-birth-calculator')}`;
    window.open(url, '_blank');
  };

  const shareToTikTok = async () => {
    if (!result) return;
    try {
      await generateShareImage();
      alert('Image downloaded! Create a TikTok video with this image and use this caption:\n\n' + 
            `${name1} + ${name2} = ${result.score}% birthday compatibility! ${result.analysis.overallMessage} #BirthdayCompatibility #DateOfBirth #LoveTest`);
    } catch (error) {
      console.error('Error generating TikTok share:', error);
    }
  };

  const copyToClipboard = async () => {
    if (!result) return;
    const text = `${name1} + ${name2} = ${result.score}% birthday compatibility! ${result.analysis.overallMessage} Try it yourself: ${window.location.origin}/date-of-birth-calculator`;
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
    if (!result) return;
    const shareData = {
      title: 'Date of Birth Compatibility Result',
      text: `${name1} + ${name2} = ${result.score}% birthday compatibility! ${result.analysis.overallMessage}`,
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
            Enter Your Birth Dates
          </h2>
          <p className="text-gray-600 slide-in">
            Discover your cosmic compatibility through birth date analysis!
          </p>
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your Name
              </label>
              <input
                type="text"
                value={name1}
                onChange={(e) => setName1(e.target.value)}
                placeholder="Enter your name"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--love-pink)] focus:border-transparent input-focus"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Their Name
              </label>
              <input
                type="text"
                value={name2}
                onChange={(e) => setName2(e.target.value)}
                placeholder="Enter their name"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--love-pink)] focus:border-transparent input-focus"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your Birth Date
              </label>
              <input
                type="date"
                value={date1}
                onChange={(e) => setDate1(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--love-pink)] focus:border-transparent input-focus"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Their Birth Date
              </label>
              <input
                type="date"
                value={date2}
                onChange={(e) => setDate2(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--love-pink)] focus:border-transparent input-focus"
              />
            </div>
          </div>

          <div className="flex gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleCalculate}
              disabled={!date1 || !date2 || !name1.trim() || !name2.trim() || isCalculating}
              className="flex-1 bg-gradient-to-r from-[var(--love-pink)] to-[var(--love-purple)] text-white font-semibold py-3 px-6 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed pulse-love hover:shadow-lg transition-all duration-200 btn-love"
            >
              {isCalculating ? (
                <div className="flex items-center justify-center">
                  <RefreshCw className="w-5 h-5 animate-spin mr-2 loading-spinner" />
                  Analyzing Birth Dates...
                </div>
              ) : (
                'Calculate Compatibility'
              )}
            </motion.button>

            {result && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={reset}
                className="px-6 py-3 border-2 border-[var(--love-pink)] text-[var(--love-pink)] font-semibold rounded-lg hover:bg-[var(--love-pink)] hover:text-white transition-all duration-200 btn-love"
              >
                Try Again
              </motion.button>
            )}
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
                className="mb-6"
              >
                <h4 className="text-lg font-semibold text-gray-900 mb-4">
                  Birthday Compatibility Breakdown
                </h4>
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={[
                        { name: 'Age', value: result.breakdown.ageHarmony, fullName: 'Age Harmony', color: '#ff6b9d' },
                        { name: 'Season', value: result.breakdown.birthMonthMatch, fullName: 'Seasonal Patterns', color: '#c44569' },
                        { name: 'Numbers', value: result.breakdown.numerology, fullName: 'Numerological Paths', color: '#f8b500' },
                        { name: 'Cosmic', value: result.breakdown.astrologicalSync, fullName: 'Cosmic Sync', color: '#6c5ce7' },
                        { name: 'Generation', value: result.breakdown.generationalHarmony, fullName: 'Generational Energy', color: '#00b894' },
                      ]}
                      margin={{ top: 20, right: 30, left: 0, bottom: 15 }}
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
                        tick={{ fontSize: 8, fill: '#6b7280', fontWeight: 500 }}
                        interval={0}
                        height={30}
                        axisLine={false}
                        tickLine={false}
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
                          return [`${score}/100`, 'Score'];
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
                      <Bar 
                        dataKey="value" 
                        radius={[8, 8, 0, 0]}
                        stroke="rgba(255, 255, 255, 0.3)"
                        strokeWidth={1}
                      >
                        <Cell fill="url(#age)" />
                        <Cell fill="url(#season)" />
                        <Cell fill="url(#numerology)" />
                        <Cell fill="url(#cosmic)" />
                        <Cell fill="url(#generation)" />
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
                className="mt-6 mb-8"
              >
                <button
                  onClick={() => setShowExplanation(!showExplanation)}
                  className="group flex items-center justify-center space-x-2 bg-gradient-to-r from-rose-50 to-purple-50 hover:from-rose-100 hover:to-purple-100 dark:from-gray-700 dark:to-gray-600 dark:hover:from-gray-600 dark:hover:to-gray-500 border border-rose-200 hover:border-rose-300 dark:border-gray-600 dark:hover:border-gray-500 rounded-full px-6 py-3 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-rose-700 dark:hover:text-rose-300 transition-all duration-300 hover:shadow-md hover:scale-[1.02] mx-auto"
                >
                  <span className="text-rose-600 dark:text-rose-400 group-hover:text-rose-700 dark:group-hover:text-rose-300 transition-colors duration-200">🔍</span>
                  <span>Why this score?</span>
                  <div className="transition-transform duration-200 group-hover:scale-110">
                    {showExplanation ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>
                
                <AnimatePresence>
                  {showExplanation && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mt-4 text-left text-xs text-gray-600 dark:text-gray-400 bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-600"
                    >
                      <h5 className="font-semibold mb-2 text-gray-800 dark:text-gray-200">The Science Behind Your Birthday Score:</h5>
                      <ul className="space-y-1 list-disc list-inside">
                        <li><strong>Age Harmony (0-100):</strong> Analyzes age differences and life stage compatibility - closer ages get higher scores</li>
                        <li><strong>Season Patterns (0-100):</strong> Birth month personality traits and seasonal energy matching based on psychology research</li>
                        <li><strong>Numbers (0-100):</strong> Numerological life path compatibility using ancient calculation methods and destiny numbers</li>
                        <li><strong>Cosmic Sync (0-100):</strong> Birth day patterns, celestial timing, and cosmic connection analysis</li>
                        <li><strong>Generation (0-100):</strong> Birth year cohort analysis and generational energy harmony assessment</li>
                      </ul>
                      <p className="mt-2 text-xs italic text-gray-500 dark:text-gray-400">
                        This algorithm combines chronobiology research, numerology principles, and seasonal psychology to analyze temporal compatibility patterns. All metrics scored 0-100 for precise birthday harmony analysis.
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
                    <h5 className="font-semibold text-gray-900 mb-3">🎯 Life Stage Analysis</h5>
                    <p className="text-sm text-gray-700">{result.analysis.lifeStage}</p>
                  </div>
                  <div className="bg-white rounded-lg p-6 border border-gray-200 card-hover">
                    <h5 className="font-semibold text-gray-900 mb-3">🌸 Seasonal Harmony</h5>
                    <p className="text-sm text-gray-700">{result.analysis.seasonalMatch}</p>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg p-6 border border-gray-200 card-hover">
                  <h5 className="font-semibold text-gray-900 mb-3">🔢 Numerological Insight</h5>
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
                {/* Main Share Button */}
                <div className="flex justify-center">
                  <button
                    onClick={() => setShowShareModal(true)}
                    className="flex items-center space-x-3 bg-gradient-to-r from-rose-500 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-lg hover:scale-105 transition-all duration-200 btn-love"
                  >
                    <Share2 className="w-6 h-6 icon-scale" />
                    <div className="text-left">
                      <div>Share Your Results</div>
                      <div className="text-sm opacity-90">Turn your birthday score into viral content!</div>
                    </div>
                  </button>
                </div>

                {/* Quick Action Buttons */}
                <div className="flex flex-wrap justify-center gap-3">
                  <button
                    onClick={generateShareImage}
                    className="flex items-center space-x-2 bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition-colors duration-200 btn-love"
                  >
                    <Download className="w-4 h-4 icon-scale" />
                    <span>Download Image</span>
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
                    <span>{copySuccess ? 'Copied!' : 'Copy Results'}</span>
                  </button>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Share Modal */}
      <AnimatePresence>
        {showShareModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowShareModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-md w-full max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  Share Your Birthday Score! 🎂
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Choose your favorite platform to share your birth date compatibility results
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => { shareToTwitter(); setShowShareModal(false); }}
                  className="flex items-center space-x-2 bg-blue-500 text-white px-4 py-3 rounded-lg hover:bg-blue-600 transition-colors duration-200 btn-love"
                >
                  <Twitter className="w-5 h-5" />
                  <span>X/Twitter</span>
                </button>

                <button
                  onClick={() => { shareToFacebook(); setShowShareModal(false); }}
                  className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 btn-love"
                >
                  <Facebook className="w-5 h-5" />
                  <span>Facebook</span>
                </button>

                <button
                  onClick={() => { shareToInstagram(); setShowShareModal(false); }}
                  className="flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-3 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-200 btn-love"
                >
                  <Instagram className="w-5 h-5" />
                  <span>Instagram</span>
                </button>

                <button
                  onClick={() => { shareToSnapchat(); setShowShareModal(false); }}
                  className="flex items-center space-x-2 bg-yellow-400 text-black px-4 py-3 rounded-lg hover:bg-yellow-500 transition-colors duration-200 btn-love"
                >
                  <Send className="w-5 h-5" />
                  <span>Snapchat</span>
                </button>

                <button
                  onClick={() => { shareToTikTok(); setShowShareModal(false); }}
                  className="flex items-center space-x-2 bg-black text-white px-4 py-3 rounded-lg hover:bg-gray-800 transition-colors duration-200 btn-love"
                >
                  <ExternalLink className="w-5 h-5" />
                  <span>TikTok</span>
                </button>

                <button
                  onClick={() => { shareViaWebAPI(); setShowShareModal(false); }}
                  className="flex items-center space-x-2 bg-green-500 text-white px-4 py-3 rounded-lg hover:bg-green-600 transition-colors duration-200 btn-love"
                >
                  <Share2 className="w-5 h-5" />
                  <span>More Apps</span>
                </button>
              </div>

              <div className="mt-6 flex justify-center">
                <button
                  onClick={() => setShowShareModal(false)}
                  className="px-6 py-2 bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors duration-200"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 