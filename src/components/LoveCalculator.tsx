'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import html2canvas from 'html2canvas';
import { Heart, Share2, Download, Twitter, RefreshCw, ChevronDown, ChevronUp, Info, Facebook, Instagram, Send, Copy, ExternalLink, Check } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, Legend } from 'recharts';
import { calculateLoveScore, getLoveMessage, getCustomMessage, type LoveMessage } from '@/utils/loveCalculator';
import { affinityQuotientWithBreakdown, type AQBreakdown } from '@/aq/affinityQuotient';

interface LoveResult {
  score: number;
  message: LoveMessage;
  name1: string;
  name2: string;
  breakdown?: AQBreakdown;
}

export default function LoveCalculator() {
  const [name1, setName1] = useState('');
  const [name2, setName2] = useState('');
  const [result, setResult] = useState<LoveResult | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [animatedScore, setAnimatedScore] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [calculationError, setCalculationError] = useState<string | null>(null);
  const [showShareModal, setShowShareModal] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const resultRef = useRef<HTMLDivElement>(null);

  const handleCalculate = async () => {
    if (!name1.trim() || !name2.trim()) return;

    setIsCalculating(true);
    setResult(null);
    setAnimatedScore(0);
    setCalculationError(null);

    // Simulate calculation delay for better UX
    await new Promise(resolve => setTimeout(resolve, 1000));

    let newResult: LoveResult;

    // First, check for easter eggs (these should override the AQ algorithm)
    const customMessage = getCustomMessage(name1, name2);
    
    if (customMessage) {
      // Easter egg found - use the predetermined score from the legacy algorithm
      const easterEggScore = calculateLoveScore(name1, name2);
      
      newResult = {
        score: easterEggScore,
        message: customMessage,
        name1: name1.trim(),
        name2: name2.trim(),
        // No breakdown for easter eggs - they use predetermined scores
      };

      setResult(newResult);
    } else {
      // No easter egg found - use the advanced AQ algorithm
      try {
        const aqBreakdown = affinityQuotientWithBreakdown(name1, name2);
        const score = aqBreakdown.final;
        const message = getLoveMessage(score);

        newResult = {
          score,
          message,
          name1: name1.trim(),
          name2: name2.trim(),
          breakdown: aqBreakdown,
        };

        setResult(newResult);
      } catch (error) {
        // Fallback to the old algorithm if AQ fails
        console.warn('AQ algorithm failed, falling back to legacy algorithm:', error);
        const score = calculateLoveScore(name1, name2);
        const message = getLoveMessage(score);

        newResult = {
          score,
          message,
          name1: name1.trim(),
          name2: name2.trim(),
        };

        setResult(newResult);
        setCalculationError('Using simplified calculation due to technical limitations.');
      }
    }

    setIsCalculating(false);

    // Animate score counter
    animateScore(newResult.score);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleCalculate();
  };

  const animateScore = (targetScore: number) => {
    const duration = 2000; // 2 seconds
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

  const generateShareImage = async () => {
    if (!resultRef.current || !result) return;

    try {
      const canvas = await html2canvas(resultRef.current, {
        backgroundColor: '#ffffff',
        scale: 2,
        useCORS: true,
        allowTaint: false,
        logging: false,
        onclone: (clonedDoc) => {
          // Hide buttons and interactive elements in the cloned document
          const buttonsToHide = clonedDoc.querySelectorAll('button, .group, [role="button"]');
          buttonsToHide.forEach(button => {
            if (button instanceof HTMLElement) {
              button.style.display = 'none';
            }
          });

          // Apply styling for better image quality
          const style = clonedDoc.createElement('style');
          style.textContent = `
            * {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;
              background-image: none !important;
              background: none !important;
            }
            
            /* Remove all gradient backgrounds from text */
            span, div, h1, h2, h3, h4, h5, h6 {
              background: none !important;
              background-image: none !important;
              background-color: transparent !important;
              -webkit-background-clip: unset !important;
              -webkit-text-fill-color: inherit !important;
              background-clip: unset !important;
            }
            
            /* Make names more visible */
            h3 {
              color: #1f2937 !important;
              font-weight: 700 !important;
              font-size: 2.25rem !important;
              margin-bottom: 1rem !important;
            }
            
            /* Fix percentage display */
            .score-counter {
              color: #e91e63 !important;
              font-weight: 800 !important;
              font-size: 3rem !important;
              background: none !important;
              background-color: transparent !important;
              background-image: none !important;
              -webkit-background-clip: unset !important;
              -webkit-text-fill-color: #e91e63 !important;
              background-clip: unset !important;
            }
            
            /* Improve background */
            .bg-gradient-to-br {
              background: linear-gradient(135deg, #fdf2f8 0%, #faf5ff 100%) !important;
              border: 2px solid #ec4899 !important;
            }
            
            /* Fix chart text */
            .recharts-text {
              fill: #374151 !important;
              font-weight: 600 !important;
            }
            
            /* Improve chart title - keep original spacing above chart */
            h4 {
              color: #1f2937 !important;
              font-weight: 600 !important;
              font-size: 1.25rem !important;
              margin-bottom: 1.5rem !important;
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

      // Convert to blob and download
      canvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `love-compatibility-${result.name1}-${result.name2}-${result.score}percent.png`;
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
            a.download = `love-score-${result.name1}-${result.name2}.png`;
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
    const text = `${result.name1} + ${result.name2} = ${result.score}% love compatibility! ${result.message.shareText} Try the Love Calculator: `;
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(window.location.origin + '/love-calculator')}`;
    window.open(url, '_blank');
  };

  const shareToFacebook = () => {
    if (!result) return;
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.origin + '/love-calculator')}&quote=${encodeURIComponent(`${result.name1} + ${result.name2} = ${result.score}% love compatibility! ${result.message.shareText}`)}`;
    window.open(url, '_blank');
  };

  const shareToInstagram = async () => {
    if (!result) return;
    // Instagram requires image sharing through mobile app or web intent
    try {
      await generateShareImage();
      alert('Image downloaded! Upload it to Instagram and use this caption:\n\n' + 
            `${result.name1} + ${result.name2} = ${result.score}% love compatibility! ${result.message.shareText} Try the Love Calculator at ${window.location.origin}/love-calculator 💕`);
    } catch (error) {
      console.error('Error generating Instagram share:', error);
    }
  };

  const shareToSnapchat = () => {
    if (!result) return;
    const text = `${result.name1} + ${result.name2} = ${result.score}% love compatibility! ${result.message.shareText}`;
    const url = `https://www.snapchat.com/share?text=${encodeURIComponent(text)}&url=${encodeURIComponent(window.location.origin + '/love-calculator')}`;
    window.open(url, '_blank');
  };

  const shareToTikTok = async () => {
    if (!result) return;
    // TikTok requires video content, so we'll provide instructions
    try {
      await generateShareImage();
      alert('Image downloaded! Create a TikTok video with this image and use this caption:\n\n' + 
            `${result.name1} + ${result.name2} = ${result.score}% love compatibility! ${result.message.shareText} #LoveCalculator #Compatibility #LoveTest`);
    } catch (error) {
      console.error('Error generating TikTok share:', error);
    }
  };

  const copyToClipboard = async () => {
    if (!result) return;
    const text = `${result.name1} + ${result.name2} = ${result.score}% love compatibility! ${result.message.shareText} Try it yourself: ${window.location.origin}/love-calculator`;
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
      title: 'Love Calculator Result',
      text: `${result.name1} + ${result.name2} = ${result.score}% love compatibility! ${result.message.shareText}`,
      url: window.location.origin + '/love-calculator',
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

  const reset = () => {
    setName1('');
    setName2('');
    setResult(null);
    setAnimatedScore(0);
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Input Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-12 border border-gray-200 dark:border-gray-700 card-hover scale-in"
      >
        <div className="text-center mb-8">
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
          >
            <Heart className="w-16 h-16 mx-auto mb-4 text-[var(--love-pink)] heartbeat" />
          </motion.div>
          <h2 className="text-2xl font-playfair font-bold text-gray-900 dark:text-white mb-2 fade-in">
            Test Your Love Compatibility
          </h2>
          <p className="text-gray-600 dark:text-gray-400 slide-in">
            Enter your names to discover your love percentage!
          </p>
        </div>

        <div className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name1" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Your Name
                </label>
                <input
                  id="name1"
                  type="text"
                  value={name1}
                  onChange={(e) => setName1(e.target.value)}
                  placeholder="Enter your name"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[var(--love-pink)] focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-colors duration-200 input-focus"
                />
              </div>
              
              <div>
                <label htmlFor="name2" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Their Name
                </label>
                <input
                  id="name2"
                  type="text"
                  value={name2}
                  onChange={(e) => setName2(e.target.value)}
                  placeholder="Enter their name"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[var(--love-pink)] focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-colors duration-200 input-focus"
                />
              </div>
            </div>

            <div className="flex gap-4">
              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={!name1.trim() || !name2.trim() || isCalculating}
                className="flex-1 bg-gradient-to-r from-[var(--love-pink)] to-[var(--love-purple)] text-white font-semibold py-3 px-6 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed pulse-love hover:shadow-lg transition-all duration-200 btn-love"
              >
                {isCalculating ? (
                  <div className="flex items-center justify-center">
                    <RefreshCw className="w-5 h-5 animate-spin mr-2 loading-spinner" />
                    Calculating...
                  </div>
                ) : (
                  'Calculate Love Score'
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
                  Try Again
                </motion.button>
              )}
            </div>
          </form>
        </div>
      </motion.div>

      {/* Easter Egg Hint */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="text-center mb-10"
      >
        <p className="text-lg text-gray-500 dark:text-gray-400 italic fade-in">
          Psst... 100+ hidden celebrity, meme, and iconic pairs will trigger special love scores. How many can you unlock? 🎭✨
        </p>
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
          >
            <div
              ref={resultRef}
              className="bg-gradient-to-br from-pink-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-xl p-8 border border-pink-200 dark:border-gray-700 text-center card-hover glow"
            >
              {calculationError && (
                <div className="mb-4 p-3 bg-yellow-100 border border-yellow-300 rounded-lg text-yellow-800 text-sm">
                  <Info className="w-4 h-4 inline mr-2" />
                  {calculationError}
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-3xl font-playfair font-semibold text-gray-900 dark:text-white mb-2 fade-in">
                  {result.name1} + {result.name2}
                </h3>
                <div className="flex items-center justify-center space-x-2 text-4xl mb-4">
                  <span className="heartbeat">💕</span>
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5, type: "spring", bounce: 0.6 }}
                    className="score-counter heartbeat"
                  >
                    {animatedScore}%
                  </motion.span>
                  <span className="heartbeat">💕</span>
                </div>
              </div>

              {/* AQ Breakdown Chart */}
              {result.breakdown && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className="mb-6"
                >
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Breakdown of Your Results
                  </h4>
                  <div className="h-72 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={[
                          { name: 'Initial', value: result.breakdown.S, fullName: 'Initial Similarity', color: '#ff6b9d' },
                          { name: 'Letter', value: result.breakdown.L, fullName: 'Letter Frequency', color: '#c44569' },
                          { name: 'Sound', value: result.breakdown.P, fullName: 'Phonetic Similarity', color: '#f8b500' },
                          { name: 'Number', value: result.breakdown.N, fullName: 'Numerological Compatibility', color: '#6c5ce7' },
                          { name: 'Vowel', value: result.breakdown.B, fullName: 'Vowel Balance', color: '#00b894' },
                        ]}
                        margin={{ top: 20, right: 35, left: 0, bottom: 15 }}
                      >
                        <defs>
                          <linearGradient id="initial" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#ff6b9d" stopOpacity={0.8}/>
                            <stop offset="100%" stopColor="#ff6b9d" stopOpacity={0.3}/>
                          </linearGradient>
                          <linearGradient id="letter" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#c44569" stopOpacity={0.8}/>
                            <stop offset="100%" stopColor="#c44569" stopOpacity={0.3}/>
                          </linearGradient>
                          <linearGradient id="phonetic" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#f8b500" stopOpacity={0.8}/>
                            <stop offset="100%" stopColor="#f8b500" stopOpacity={0.3}/>
                          </linearGradient>
                          <linearGradient id="numerology" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#6c5ce7" stopOpacity={0.8}/>
                            <stop offset="100%" stopColor="#6c5ce7" stopOpacity={0.3}/>
                          </linearGradient>
                          <linearGradient id="vowel" x1="0" y1="0" x2="0" y2="1">
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
                          tick={{ fontSize: 9, fill: '#6b7280', fontWeight: 500 }}
                          interval={0}
                          height={35}
                          axisLine={false}
                          tickLine={false}
                        />
                        <YAxis 
                          tick={{ fontSize: 10, fill: '#6b7280' }}
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
                          <Cell fill="url(#initial)" />
                          <Cell fill="url(#letter)" />
                          <Cell fill="url(#phonetic)" />
                          <Cell fill="url(#numerology)" />
                          <Cell fill="url(#vowel)" />
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Collapsible Explanation */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="mt-0"
                  >
                    <button
                      onClick={() => setShowExplanation(!showExplanation)}
                      className="group flex items-center justify-center space-x-2 bg-gradient-to-r from-purple-50 to-pink-50 hover:from-purple-100 hover:to-pink-100 dark:from-gray-700 dark:to-gray-600 dark:hover:from-gray-600 dark:hover:to-gray-500 border border-purple-200 hover:border-purple-300 dark:border-gray-600 dark:hover:border-gray-500 rounded-full px-6 py-3 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-purple-700 dark:hover:text-purple-300 transition-all duration-300 hover:shadow-md hover:scale-[1.02] mx-auto"
                    >
                      <span className="text-purple-600 dark:text-purple-400 group-hover:text-purple-700 dark:group-hover:text-purple-300 transition-colors duration-200">🔍</span>
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
                          className="mt-3 text-left text-xs text-gray-600 dark:text-gray-400 bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-600"
                        >
                          <h5 className="font-semibold mb-2 text-gray-800 dark:text-gray-200">The Science Behind Your Score:</h5>
                          <ul className="space-y-1 list-disc list-inside">
                            <li><strong>Initial Similarity (0-100):</strong> Alphabet distance between first letters - closer letters score higher</li>
                            <li><strong>Letter Frequency (0-100):</strong> How similar the letter patterns in your names are (linguistic compatibility)</li>
                            <li><strong>Phonetic Similarity (0-100):</strong> How your names sound when spoken (auditory harmony)</li>
                            <li><strong>Numerological Compatibility (0-100):</strong> Based on ancient numerology principles and destiny numbers</li>
                            <li><strong>Vowel Balance (0-100):</strong> The rhythm and flow created by vowel-to-consonant ratios</li>
                          </ul>
                          <p className="mt-2 text-xs italic text-gray-500 dark:text-gray-400">
                            This algorithm combines multiple linguistic and psychological factors from academic research on name compatibility. All metrics are scored 0-100 for precise analysis.
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </motion.div>
              )}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                className="mb-6"
              >
                <div className="text-6xl mb-4 icon-bounce">{result.message.emoji}</div>
                <p className="text-lg text-gray-700 dark:text-gray-300 font-medium slide-in">
                  {result.message.message}
                </p>
              </motion.div>

              {/* Share Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 }}
                className="space-y-4"
              >
                {/* Main Share Button */}
                <div className="flex justify-center">
                  <button
                    onClick={() => setShowShareModal(true)}
                    className="flex items-center space-x-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-lg hover:scale-105 transition-all duration-200 btn-love"
                  >
                    <Share2 className="w-6 h-6 icon-scale" />
                    <div className="text-left">
                      <div>Share Your Results</div>
                      <div className="text-sm opacity-90">Turn your love score into viral content!</div>
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
                  Share Your Love Score! 💕
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Choose your favorite platform to share your compatibility results
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