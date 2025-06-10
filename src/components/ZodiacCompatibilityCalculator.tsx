'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Heart, Share2, RefreshCw, ChevronDown, ChevronUp, Download, Copy, Check, Twitter, Facebook, Instagram, Send, ExternalLink } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import html2canvas from 'html2canvas';

interface ZodiacResult {
  score: number;
  breakdown: {
    signHarmony: number;
    elementalBalance: number;
    modalityMatch: number;
    planetarySync: number;
    cosmicAspects: number;
  };
  analysis: {
    signPair: string;
    elementMatch: string;
    modalityMatch: string;
    planetaryMessage: string;
    classicPattern: string;
    overallMessage: string;
  };
}

// Zodiac data
const zodiacSigns = [
  'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
  'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'
];

const zodiacData = {
  'Aries': { element: 'Fire', modality: 'Cardinal', ruler: 'Mars', symbol: '♈' },
  'Taurus': { element: 'Earth', modality: 'Fixed', ruler: 'Venus', symbol: '♉' },
  'Gemini': { element: 'Air', modality: 'Mutable', ruler: 'Mercury', symbol: '♊' },
  'Cancer': { element: 'Water', modality: 'Cardinal', ruler: 'Moon', symbol: '♋' },
  'Leo': { element: 'Fire', modality: 'Fixed', ruler: 'Sun', symbol: '♌' },
  'Virgo': { element: 'Earth', modality: 'Mutable', ruler: 'Mercury', symbol: '♍' },
  'Libra': { element: 'Air', modality: 'Cardinal', ruler: 'Venus', symbol: '♎' },
  'Scorpio': { element: 'Water', modality: 'Fixed', ruler: 'Pluto', symbol: '♏' },
  'Sagittarius': { element: 'Fire', modality: 'Mutable', ruler: 'Jupiter', symbol: '♐' },
  'Capricorn': { element: 'Earth', modality: 'Cardinal', ruler: 'Saturn', symbol: '♑' },
  'Aquarius': { element: 'Air', modality: 'Fixed', ruler: 'Uranus', symbol: '♒' },
  'Pisces': { element: 'Water', modality: 'Mutable', ruler: 'Neptune', symbol: '♓' }
};

// Algorithm functions
function calculateSignHarmony(sign1: string, sign2: string): number {
  // Perfect matches (same sign)
  if (sign1 === sign2) return 95;
  
  // Highly compatible pairs
  const highlyCompatible = [
    ['Aries', 'Leo'], ['Aries', 'Sagittarius'], ['Aries', 'Gemini'], ['Aries', 'Aquarius'],
    ['Taurus', 'Virgo'], ['Taurus', 'Capricorn'], ['Taurus', 'Cancer'], ['Taurus', 'Pisces'],
    ['Gemini', 'Libra'], ['Gemini', 'Aquarius'], ['Gemini', 'Leo'], ['Gemini', 'Aries'],
    ['Cancer', 'Scorpio'], ['Cancer', 'Pisces'], ['Cancer', 'Taurus'], ['Cancer', 'Virgo'],
    ['Leo', 'Sagittarius'], ['Leo', 'Aries'], ['Leo', 'Gemini'], ['Leo', 'Libra'],
    ['Virgo', 'Capricorn'], ['Virgo', 'Taurus'], ['Virgo', 'Cancer'], ['Virgo', 'Scorpio'],
    ['Libra', 'Aquarius'], ['Libra', 'Gemini'], ['Libra', 'Leo'], ['Libra', 'Sagittarius'],
    ['Scorpio', 'Pisces'], ['Scorpio', 'Cancer'], ['Scorpio', 'Virgo'], ['Scorpio', 'Capricorn'],
    ['Sagittarius', 'Aries'], ['Sagittarius', 'Leo'], ['Sagittarius', 'Libra'], ['Sagittarius', 'Aquarius'],
    ['Capricorn', 'Taurus'], ['Capricorn', 'Virgo'], ['Capricorn', 'Scorpio'], ['Capricorn', 'Pisces'],
    ['Aquarius', 'Gemini'], ['Aquarius', 'Libra'], ['Aquarius', 'Sagittarius'], ['Aquarius', 'Aries'],
    ['Pisces', 'Cancer'], ['Pisces', 'Scorpio'], ['Pisces', 'Capricorn'], ['Pisces', 'Taurus']
  ];
  
  for (const pair of highlyCompatible) {
    if (pair.includes(sign1) && pair.includes(sign2)) return 85;
  }
  
  // Challenging but workable pairs
  const challenging = [
    ['Aries', 'Cancer'], ['Aries', 'Capricorn'],
    ['Taurus', 'Leo'], ['Taurus', 'Aquarius'],
    ['Gemini', 'Virgo'], ['Gemini', 'Pisces'],
    ['Cancer', 'Libra'], ['Cancer', 'Aries'],
    ['Leo', 'Scorpio'], ['Leo', 'Taurus'],
    ['Virgo', 'Sagittarius'], ['Virgo', 'Gemini'],
    ['Libra', 'Capricorn'], ['Libra', 'Cancer'],
    ['Scorpio', 'Aquarius'], ['Scorpio', 'Leo'],
    ['Sagittarius', 'Pisces'], ['Sagittarius', 'Virgo'],
    ['Capricorn', 'Aries'], ['Capricorn', 'Libra'],
    ['Aquarius', 'Taurus'], ['Aquarius', 'Scorpio'],
    ['Pisces', 'Gemini'], ['Pisces', 'Sagittarius']
  ];
  
  for (const pair of challenging) {
    if (pair.includes(sign1) && pair.includes(sign2)) return 55;
  }
  
  // Moderate compatibility
  return 70;
}

function calculateElementalBalance(sign1: string, sign2: string): number {
  const element1 = zodiacData[sign1].element;
  const element2 = zodiacData[sign2].element;
  
  // Same element = excellent
  if (element1 === element2) return 90;
  
  // Compatible elements
  const compatible = [
    ['Fire', 'Air'], ['Earth', 'Water']
  ];
  
  for (const pair of compatible) {
    if (pair.includes(element1) && pair.includes(element2)) return 80;
  }
  
  // Challenging but can work
  return 60;
}

function calculateModalityMatch(sign1: string, sign2: string): number {
  const modality1 = zodiacData[sign1].modality;
  const modality2 = zodiacData[sign2].modality;
  
  // Same modality = good understanding
  if (modality1 === modality2) return 85;
  
  // Complementary modalities
  const complementary = [
    ['Cardinal', 'Mutable'], ['Fixed', 'Cardinal']
  ];
  
  for (const pair of complementary) {
    if (pair.includes(modality1) && pair.includes(modality2)) return 75;
  }
  
  // Fixed with Mutable can be challenging
  return 65;
}

function calculatePlanetarySync(sign1: string, sign2: string): number {
  const ruler1 = zodiacData[sign1].ruler;
  const ruler2 = zodiacData[sign2].ruler;
  
  // Same ruler = cosmic connection
  if (ruler1 === ruler2) return 95;
  
  // Harmonious planetary relationships
  const harmonious = [
    ['Venus', 'Jupiter'], ['Sun', 'Jupiter'], ['Moon', 'Venus'],
    ['Mercury', 'Venus'], ['Mars', 'Jupiter'], ['Sun', 'Mars']
  ];
  
  for (const pair of harmonious) {
    if (pair.includes(ruler1) && pair.includes(ruler2)) return 80;
  }
  
  // Challenging planetary aspects
  const challenging = [
    ['Mars', 'Saturn'], ['Sun', 'Saturn'], ['Moon', 'Saturn'],
    ['Mars', 'Pluto'], ['Saturn', 'Uranus']
  ];
  
  for (const pair of challenging) {
    if (pair.includes(ruler1) && pair.includes(ruler2)) return 55;
  }
  
  // Neutral planetary relationship
  return 70;
}

function calculateCosmicAspects(sign1: string, sign2: string): number {
  const index1 = zodiacSigns.indexOf(sign1);
  const index2 = zodiacSigns.indexOf(sign2);
  const distance = Math.abs(index1 - index2);
  const minDistance = Math.min(distance, 12 - distance);
  
  // Conjunct (same sign)
  if (minDistance === 0) return 95;
  
  // Trine (4 signs apart) - harmonious
  if (minDistance === 4) return 90;
  
  // Sextile (2 signs apart) - supportive
  if (minDistance === 2) return 85;
  
  // Opposition (6 signs apart) - intense attraction
  if (minDistance === 6) return 75;
  
  // Square (3 signs apart) - challenging but passionate
  if (minDistance === 3) return 65;
  
  // Other aspects
  return 70;
}

function analyzeZodiacCompatibility(sign1: string, sign2: string): ZodiacResult {
  const signHarmony = calculateSignHarmony(sign1, sign2);
  const elementalBalance = calculateElementalBalance(sign1, sign2);
  const modalityMatch = calculateModalityMatch(sign1, sign2);
  const planetarySync = calculatePlanetarySync(sign1, sign2);
  const cosmicAspects = calculateCosmicAspects(sign1, sign2);
  
  const score = Math.round((signHarmony + elementalBalance + modalityMatch + planetarySync + cosmicAspects) / 5);
  
  const element1 = zodiacData[sign1].element;
  const element2 = zodiacData[sign2].element;
  const modality1 = zodiacData[sign1].modality;
  const modality2 = zodiacData[sign2].modality;
  const ruler1 = zodiacData[sign1].ruler;
  const ruler2 = zodiacData[sign2].ruler;
  
  const signPair = `${zodiacData[sign1].symbol} ${sign1} + ${zodiacData[sign2].symbol} ${sign2}`;
  
  let elementMatch = '';
  if (element1 === element2) elementMatch = `Both ${element1} signs - natural harmony and understanding!`;
  else elementMatch = `${element1} meets ${element2} - ${['Fire', 'Air'].includes(element1) && ['Fire', 'Air'].includes(element2) ? 'energetic and inspiring!' : ['Earth', 'Water'].includes(element1) && ['Earth', 'Water'].includes(element2) ? 'grounding and nurturing!' : 'complementary energies create balance!'}`;
  
  let modalityMatchText = '';
  if (modality1 === modality2) modalityMatchText = `Both ${modality1} signs - shared approach to life!`;
  else modalityMatchText = `${modality1} energy meets ${modality2} style - different but compatible!`;
  
  const planetaryMessage = `Ruled by ${ruler1} and ${ruler2} - ${ruler1 === ruler2 ? 'cosmic twins with shared planetary energy!' : 'unique planetary influences create dynamic attraction!'}`;
  
  let classicPattern = '';
  if (sign1 === sign2) classicPattern = 'Twin Souls - perfect understanding';
  else if (Math.abs(zodiacSigns.indexOf(sign1) - zodiacSigns.indexOf(sign2)) === 6) classicPattern = 'Opposite Attraction - magnetic pull';
  else if (Math.abs(zodiacSigns.indexOf(sign1) - zodiacSigns.indexOf(sign2)) === 4) classicPattern = 'Harmonic Trine - effortless flow';
  else if (Math.abs(zodiacSigns.indexOf(sign1) - zodiacSigns.indexOf(sign2)) === 2) classicPattern = 'Supportive Sextile - natural friendship';
  else classicPattern = 'Unique Dynamic - special connection';
  
  let overallMessage = '';
  if (score >= 85) overallMessage = 'Written in the stars! Celestial soulmates with cosmic harmony ✨';
  else if (score >= 75) overallMessage = 'Stellar connection! The stars align beautifully for you ⭐';
  else if (score >= 65) overallMessage = 'Cosmic chemistry! Great astrological compatibility 🌟';
  else if (score >= 55) overallMessage = 'Starlit romance! Good zodiac harmony with potential 💫';
  else overallMessage = 'Unique constellation! Different energies can create magic 🔮';
  
  return {
    score,
    breakdown: {
      signHarmony,
      elementalBalance,
      modalityMatch,
      planetarySync,
      cosmicAspects,
    },
    analysis: {
      signPair,
      elementMatch,
      modalityMatch: modalityMatchText,
      planetaryMessage,
      classicPattern,
      overallMessage,
    },
  };
}

export default function ZodiacCompatibilityCalculator() {
  const [sign1, setSign1] = useState('');
  const [sign2, setSign2] = useState('');
  const [name1, setName1] = useState('');
  const [name2, setName2] = useState('');
  const [result, setResult] = useState<ZodiacResult | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [animatedScore, setAnimatedScore] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const resultRef = useRef<HTMLDivElement>(null);

  const handleCalculate = async () => {
    if (!sign1 || !sign2 || !name1.trim() || !name2.trim()) return;

    setIsCalculating(true);
    setResult(null);
    setAnimatedScore(0);

    // Simulate calculation delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    const compatibility = analyzeZodiacCompatibility(sign1, sign2);

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
    setSign1('');
    setSign2('');
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
          a.download = `zodiac-compatibility-${name1}-${name2}-${result.score}percent.png`;
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
            a.download = `zodiac-score-${name1}-${name2}.png`;
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
    const text = `${name1} + ${name2} = ${result.score}% zodiac compatibility! ${result.analysis.overallMessage} Try the Zodiac Calculator: `;
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(window.location.origin + '/zodiac-compatibility-calculator')}`;
    window.open(url, '_blank');
  };

  const shareToFacebook = () => {
    if (!result) return;
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.origin + '/zodiac-compatibility-calculator')}&quote=${encodeURIComponent(`${name1} + ${name2} = ${result.score}% zodiac compatibility! ${result.analysis.overallMessage}`)}`;
    window.open(url, '_blank');
  };

  const shareToInstagram = async () => {
    if (!result) return;
    try {
      await generateShareImage();
      alert('Image downloaded! Upload it to Instagram and use this caption:\n\n' + 
            `${name1} + ${name2} = ${result.score}% zodiac compatibility! ${result.analysis.overallMessage} Try the Zodiac Calculator at ${window.location.origin}/zodiac-compatibility-calculator ⭐`);
    } catch (error) {
      console.error('Error generating Instagram share:', error);
    }
  };

  const shareToSnapchat = () => {
    if (!result) return;
    const text = `${name1} + ${name2} = ${result.score}% zodiac compatibility! ${result.analysis.overallMessage}`;
    const url = `https://www.snapchat.com/share?text=${encodeURIComponent(text)}&url=${encodeURIComponent(window.location.origin + '/zodiac-compatibility-calculator')}`;
    window.open(url, '_blank');
  };

  const shareToTikTok = async () => {
    if (!result) return;
    try {
      await generateShareImage();
      alert('Image downloaded! Create a TikTok video with this image and use this caption:\n\n' + 
            `${name1} + ${name2} = ${result.score}% zodiac compatibility! ${result.analysis.overallMessage} #ZodiacCompatibility #Astrology #LoveTest`);
    } catch (error) {
      console.error('Error generating TikTok share:', error);
    }
  };

  const copyToClipboard = async () => {
    if (!result) return;
    const text = `${name1} + ${name2} = ${result.score}% zodiac compatibility! ${result.analysis.overallMessage} Try it yourself: ${window.location.origin}/zodiac-compatibility-calculator`;
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
      title: 'Zodiac Compatibility Result',
      text: `${name1} + ${name2} = ${result.score}% zodiac compatibility! ${result.analysis.overallMessage}`,
      url: window.location.origin + '/zodiac-compatibility-calculator',
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
            <Star className="w-16 h-16 mx-auto mb-4 text-[var(--love-pink)] heartbeat" />
          </motion.div>
          <h2 className="text-2xl font-playfair font-bold text-gray-900 mb-2 fade-in">
            Select Your Zodiac Signs
          </h2>
          <p className="text-gray-600 slide-in">
            Discover your cosmic compatibility through the wisdom of the stars!
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
                Your Zodiac Sign
              </label>
              <select
                value={sign1}
                onChange={(e) => setSign1(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--love-pink)] focus:border-transparent input-focus"
              >
                <option value="">Select your sign</option>
                {zodiacSigns.map(sign => (
                  <option key={sign} value={sign}>
                    {zodiacData[sign].symbol} {sign}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Their Zodiac Sign
              </label>
              <select
                value={sign2}
                onChange={(e) => setSign2(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--love-pink)] focus:border-transparent input-focus"
              >
                <option value="">Select their sign</option>
                {zodiacSigns.map(sign => (
                  <option key={sign} value={sign}>
                    {zodiacData[sign].symbol} {sign}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleCalculate}
              disabled={!sign1 || !sign2 || !name1.trim() || !name2.trim() || isCalculating}
              className="flex-1 bg-gradient-to-r from-[var(--love-pink)] to-[var(--love-purple)] text-white font-semibold py-3 px-6 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed pulse-love hover:shadow-lg transition-all duration-200 btn-love"
            >
              {isCalculating ? (
                <div className="flex items-center justify-center">
                  <RefreshCw className="w-5 h-5 animate-spin mr-2 loading-spinner" />
                  Reading the Stars...
                </div>
              ) : (
                'Calculate Cosmic Compatibility'
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
            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl shadow-xl p-8 border border-indigo-200 text-center card-hover glow">
              <div className="mb-6">
                <h3 className="text-3xl font-playfair font-semibold text-gray-900 mb-2 fade-in">
                  {name1} + {name2}
                </h3>
                <p className="text-lg text-gray-700 mb-4 slide-in">{result.analysis.signPair}</p>
                <div className="flex items-center justify-center space-x-2 text-4xl mb-4">
                  <span className="heartbeat">⭐</span>
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5, type: "spring", bounce: 0.6 }}
                    className="text-4xl font-bold text-[var(--love-pink)] heartbeat"
                  >
                    {animatedScore}%
                  </motion.span>
                  <span className="heartbeat">⭐</span>
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
                  Astrological Compatibility Breakdown
                </h4>
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={[
                        { name: 'Signs', value: result.breakdown.signHarmony, fullName: 'Sign Harmony', color: '#ff6b9d' },
                        { name: 'Elements', value: result.breakdown.elementalBalance, fullName: 'Elemental Balance', color: '#c44569' },
                        { name: 'Modality', value: result.breakdown.modalityMatch, fullName: 'Modality Matching', color: '#f8b500' },
                        { name: 'Planets', value: result.breakdown.planetarySync, fullName: 'Planetary Sync', color: '#6c5ce7' },
                        { name: 'Aspects', value: result.breakdown.cosmicAspects, fullName: 'Cosmic Aspects', color: '#00b894' },
                      ]}
                      margin={{ top: 20, right: 30, left: 0, bottom: 15 }}
                    >
                      <defs>
                        <linearGradient id="signs" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#ff6b9d" stopOpacity={0.8}/>
                          <stop offset="100%" stopColor="#ff6b9d" stopOpacity={0.3}/>
                        </linearGradient>
                        <linearGradient id="elements" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#c44569" stopOpacity={0.8}/>
                          <stop offset="100%" stopColor="#c44569" stopOpacity={0.3}/>
                        </linearGradient>
                        <linearGradient id="modality" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#f8b500" stopOpacity={0.8}/>
                          <stop offset="100%" stopColor="#f8b500" stopOpacity={0.3}/>
                        </linearGradient>
                        <linearGradient id="planets" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#6c5ce7" stopOpacity={0.8}/>
                          <stop offset="100%" stopColor="#6c5ce7" stopOpacity={0.3}/>
                        </linearGradient>
                        <linearGradient id="aspects" x1="0" y1="0" x2="0" y2="1">
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
                        <Cell fill="url(#signs)" />
                        <Cell fill="url(#elements)" />
                        <Cell fill="url(#modality)" />
                        <Cell fill="url(#planets)" />
                        <Cell fill="url(#aspects)" />
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
                  className="group flex items-center justify-center space-x-2 bg-gradient-to-r from-indigo-50 to-purple-50 hover:from-indigo-100 hover:to-purple-100 dark:from-gray-700 dark:to-gray-600 dark:hover:from-gray-600 dark:hover:to-gray-500 border border-indigo-200 hover:border-indigo-300 dark:border-gray-600 dark:hover:border-gray-500 rounded-full px-6 py-3 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-indigo-700 dark:hover:text-indigo-300 transition-all duration-300 hover:shadow-md hover:scale-[1.02] mx-auto"
                >
                  <span className="text-indigo-600 dark:text-indigo-400 group-hover:text-indigo-700 dark:group-hover:text-indigo-300 transition-colors duration-200">🔍</span>
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
                      <h5 className="font-semibold mb-2 text-gray-800 dark:text-gray-200">The Science Behind Your Zodiac Score:</h5>
                      <ul className="space-y-1 list-disc list-inside">
                        <li><strong>Sign Harmony (0-100):</strong> Traditional zodiac compatibility patterns based on classical astrological relationships</li>
                        <li><strong>Elements (0-100):</strong> Fire, Earth, Air, and Water element interactions and natural harmonic compatibility</li>
                        <li><strong>Modality (0-100):</strong> Cardinal, Fixed, and Mutable energy pattern synchronization and dynamic balance</li>
                        <li><strong>Planets (0-100):</strong> Ruling planet relationships and celestial influence harmony between your signs</li>
                        <li><strong>Cosmic Aspects (0-100):</strong> Angular relationships (trine, sextile, opposition, square) and energetic dynamics</li>
                      </ul>
                      <p className="mt-2 text-xs italic text-gray-500 dark:text-gray-400">
                        This algorithm combines traditional astrology principles, elemental theory, planetary rulerships, and cosmic aspect relationships for authentic astrological compatibility analysis. All metrics scored 0-100 for precise celestial harmony assessment.
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
                    <h5 className="font-semibold text-gray-900 mb-3">🔥 Elemental Harmony</h5>
                    <p className="text-sm text-gray-700">{result.analysis.elementMatch}</p>
                  </div>
                  <div className="bg-white rounded-lg p-6 border border-gray-200 card-hover">
                    <h5 className="font-semibold text-gray-900 mb-3">⚡ Energy Patterns</h5>
                    <p className="text-sm text-gray-700">{result.analysis.modalityMatch}</p>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg p-6 border border-gray-200 card-hover">
                  <h5 className="font-semibold text-gray-900 mb-3">🪐 Planetary Influence</h5>
                  <p className="text-sm text-gray-700">{result.analysis.planetaryMessage}</p>
                </div>
                
                <div className="bg-white rounded-lg p-6 border border-gray-200 card-hover">
                  <h5 className="font-semibold text-gray-900 mb-3">✨ Astrological Pattern</h5>
                  <p className="text-sm text-gray-700">{result.analysis.classicPattern}</p>
                </div>
                
                <div className="text-center mt-8 pt-6">
                  <div className="text-6xl mb-6 icon-bounce">
                    {result.score >= 85 ? '✨' : result.score >= 75 ? '⭐' : result.score >= 65 ? '🌟' : result.score >= 55 ? '💫' : '🔮'}
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
                    className="flex items-center space-x-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-lg hover:scale-105 transition-all duration-200 btn-love"
                  >
                    <Share2 className="w-6 h-6 icon-scale" />
                    <div className="text-left">
                      <div>Share Your Results</div>
                      <div className="text-sm opacity-90">Turn your zodiac score into viral content!</div>
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
                  Share Your Zodiac Score! ⭐
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Choose your favorite platform to share your astrological compatibility results
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