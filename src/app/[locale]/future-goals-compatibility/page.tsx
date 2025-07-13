'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { Target, ArrowRight, Heart, MessageCircle, Compass, CheckCircle, Home, Briefcase, Baby, Share2, Download, Twitter, Facebook, Instagram, Send, ExternalLink, Copy, Check, MessageCircle as Reddit, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from '@/hooks/useTranslations';
import { useParams } from 'next/navigation';

interface Question {
  id: number;
  question: string;
  options: string[];
  points: number[];
  category: 'career' | 'family' | 'lifestyle' | 'finances' | 'personal';
}

export default function FutureGoalsCompatibilityPage() {
  const { t } = useTranslations();
  const params = useParams();
  const locale = params.locale as string;
  
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{ category: string; points: number }[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [copySuccess, setCopySuccess] = useState(false);

const questions: Question[] = [
  {
    id: 1,
      question: t('quizzes.futureGoalsCompatibility.questions.q1.question'),
    options: [
        t('quizzes.futureGoalsCompatibility.questions.q1.options.opt1'),
        t('quizzes.futureGoalsCompatibility.questions.q1.options.opt2'),
        t('quizzes.futureGoalsCompatibility.questions.q1.options.opt3'),
        t('quizzes.futureGoalsCompatibility.questions.q1.options.opt4')
    ],
    points: [4, 2, 3, 1],
    category: 'career'
  },
  {
    id: 2,
      question: t('quizzes.futureGoalsCompatibility.questions.q2.question'),
    options: [
        t('quizzes.futureGoalsCompatibility.questions.q2.options.opt1'),
        t('quizzes.futureGoalsCompatibility.questions.q2.options.opt2'),
        t('quizzes.futureGoalsCompatibility.questions.q2.options.opt3'),
        t('quizzes.futureGoalsCompatibility.questions.q2.options.opt4')
    ],
    points: [3, 4, 2, 1],
    category: 'career'
  },
  {
    id: 3,
      question: t('quizzes.futureGoalsCompatibility.questions.q3.question'),
    options: [
        t('quizzes.futureGoalsCompatibility.questions.q3.options.opt1'),
        t('quizzes.futureGoalsCompatibility.questions.q3.options.opt2'),
        t('quizzes.futureGoalsCompatibility.questions.q3.options.opt3'),
        t('quizzes.futureGoalsCompatibility.questions.q3.options.opt4')
    ],
    points: [4, 3, 2, 1],
    category: 'family'
  },
  {
    id: 4,
      question: t('quizzes.futureGoalsCompatibility.questions.q4.question'),
    options: [
        t('quizzes.futureGoalsCompatibility.questions.q4.options.opt1'),
        t('quizzes.futureGoalsCompatibility.questions.q4.options.opt2'),
        t('quizzes.futureGoalsCompatibility.questions.q4.options.opt3'),
        t('quizzes.futureGoalsCompatibility.questions.q4.options.opt4')
    ],
    points: [4, 3, 2, 1],
    category: 'family'
  },
  {
    id: 5,
      question: t('quizzes.futureGoalsCompatibility.questions.q5.question'),
    options: [
        t('quizzes.futureGoalsCompatibility.questions.q5.options.opt1'),
        t('quizzes.futureGoalsCompatibility.questions.q5.options.opt2'),
        t('quizzes.futureGoalsCompatibility.questions.q5.options.opt3'),
        t('quizzes.futureGoalsCompatibility.questions.q5.options.opt4')
    ],
    points: [3, 4, 2, 1],
    category: 'lifestyle'
  },
  {
    id: 6,
      question: t('quizzes.futureGoalsCompatibility.questions.q6.question'),
    options: [
        t('quizzes.futureGoalsCompatibility.questions.q6.options.opt1'),
        t('quizzes.futureGoalsCompatibility.questions.q6.options.opt2'),
        t('quizzes.futureGoalsCompatibility.questions.q6.options.opt3'),
        t('quizzes.futureGoalsCompatibility.questions.q6.options.opt4')
    ],
    points: [3, 4, 2, 1],
    category: 'lifestyle'
  },
  {
    id: 7,
      question: t('quizzes.futureGoalsCompatibility.questions.q7.question'),
    options: [
        t('quizzes.futureGoalsCompatibility.questions.q7.options.opt1'),
        t('quizzes.futureGoalsCompatibility.questions.q7.options.opt2'),
        t('quizzes.futureGoalsCompatibility.questions.q7.options.opt3'),
        t('quizzes.futureGoalsCompatibility.questions.q7.options.opt4')
    ],
    points: [4, 3, 2, 1],
    category: 'finances'
  },
  {
    id: 8,
      question: t('quizzes.futureGoalsCompatibility.questions.q8.question'),
    options: [
        t('quizzes.futureGoalsCompatibility.questions.q8.options.opt1'),
        t('quizzes.futureGoalsCompatibility.questions.q8.options.opt2'),
        t('quizzes.futureGoalsCompatibility.questions.q8.options.opt3'),
        t('quizzes.futureGoalsCompatibility.questions.q8.options.opt4')
    ],
    points: [4, 3, 2, 1],
    category: 'finances'
  },
  {
    id: 9,
      question: t('quizzes.futureGoalsCompatibility.questions.q9.question'),
    options: [
        t('quizzes.futureGoalsCompatibility.questions.q9.options.opt1'),
        t('quizzes.futureGoalsCompatibility.questions.q9.options.opt2'),
        t('quizzes.futureGoalsCompatibility.questions.q9.options.opt3'),
        t('quizzes.futureGoalsCompatibility.questions.q9.options.opt4')
    ],
    points: [4, 3, 2, 1],
    category: 'personal'
  },
  {
    id: 10,
      question: t('quizzes.futureGoalsCompatibility.questions.q10.question'),
    options: [
        t('quizzes.futureGoalsCompatibility.questions.q10.options.opt1'),
        t('quizzes.futureGoalsCompatibility.questions.q10.options.opt2'),
        t('quizzes.futureGoalsCompatibility.questions.q10.options.opt3'),
        t('quizzes.futureGoalsCompatibility.questions.q10.options.opt4')
    ],
    points: [4, 3, 2, 1],
    category: 'personal'
  }
];

function getCompatibilityResult(careerScore: number, familyScore: number, lifestyleScore: number, financesScore: number, personalScore: number) {
  const totalScore = careerScore + familyScore + lifestyleScore + financesScore + personalScore;
  const maxPossibleScore = questions.length * 4;
  const percentage = Math.round((totalScore / maxPossibleScore) * 100);
  
  const categoryScores = {
    career: Math.round((careerScore / (questions.filter(q => q.category === 'career').length * 4)) * 100),
    family: Math.round((familyScore / (questions.filter(q => q.category === 'family').length * 4)) * 100),
    lifestyle: Math.round((lifestyleScore / (questions.filter(q => q.category === 'lifestyle').length * 4)) * 100),
    finances: Math.round((financesScore / (questions.filter(q => q.category === 'finances').length * 4)) * 100),
    personal: Math.round((personalScore / (questions.filter(q => q.category === 'personal').length * 4)) * 100)
  };
  
  let compatibilityLevel;
  let title;
  let description;
  let emoji;
  
  if (percentage >= 85) {
    compatibilityLevel = "Excellent";
      title = t('quizzes.futureGoalsCompatibility.results.highlyCompatible.title');
      description = t('quizzes.futureGoalsCompatibility.results.highlyCompatible.message');
    emoji = "🌟";
  } else if (percentage >= 70) {
    compatibilityLevel = "Very Good";
      title = t('quizzes.futureGoalsCompatibility.results.wellMatched.title');
      description = t('quizzes.futureGoalsCompatibility.results.wellMatched.message');
    emoji = "💫";
  } else if (percentage >= 55) {
    compatibilityLevel = "Good";
      title = t('quizzes.futureGoalsCompatibility.results.someAlignment.title');
      description = t('quizzes.futureGoalsCompatibility.results.someAlignment.message');
    emoji = "🌱";
  } else {
    compatibilityLevel = "Needs Discussion";
      title = t('quizzes.futureGoalsCompatibility.results.significantDifferences.title');
      description = t('quizzes.futureGoalsCompatibility.results.significantDifferences.message');
    emoji = "💬";
  }
  
  return {
    percentage,
    compatibilityLevel,
    title,
    description,
    emoji,
    categoryScores,
    strongestAreas: Object.entries(categoryScores)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 2)
      .map(([category, score]) => ({ category, score })),
    growthAreas: Object.entries(categoryScores)
      .sort(([,a], [,b]) => a - b)
      .slice(0, 2)
      .map(([category, score]) => ({ category, score }))
  };
}

  const handleAnswer = (optionIndex: number) => {
    const question = questions[currentQuestion];
    const newAnswer = {
      category: question.category,
      points: question.points[optionIndex]
    };
    const newAnswers = [...answers, newAnswer];
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Calculate final result
      const careerScore = newAnswers.filter(a => a.category === 'career').reduce((sum, a) => sum + a.points, 0);
      const familyScore = newAnswers.filter(a => a.category === 'family').reduce((sum, a) => sum + a.points, 0);
      const lifestyleScore = newAnswers.filter(a => a.category === 'lifestyle').reduce((sum, a) => sum + a.points, 0);
      const financesScore = newAnswers.filter(a => a.category === 'finances').reduce((sum, a) => sum + a.points, 0);
      const personalScore = newAnswers.filter(a => a.category === 'personal').reduce((sum, a) => sum + a.points, 0);
      
      const quizResult = getCompatibilityResult(careerScore, familyScore, lifestyleScore, financesScore, personalScore);
      setResult(quizResult);
      setShowResult(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setShowResult(false);
    setResult(null);
  };

  // Share functions
  const shareToTwitter = () => {
    if (!result) return;
    const text = t('common.share.futureGoalsFullShare', { 
      title: result.title, 
      percentage: result.percentage, 
      description: result.description, 
      url: `${window.location.origin}/future-goals-compatibility` 
    });
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  const shareToFacebook = () => {
    if (!result) return;
    const text = t('common.share.futureGoalsBasic', { 
      title: result.title, 
      percentage: result.percentage, 
      description: result.description 
    });
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.origin + '/future-goals-compatibility')}&quote=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  const shareToInstagram = async () => {
    if (!result) return;
    const alertText = t('common.share.copyForInstagram');
    const shareText = t('common.share.futureGoalsInstagram', { 
      title: result.title, 
      percentage: result.percentage, 
      description: result.description, 
      url: `${window.location.origin}/future-goals-compatibility` 
    });
    alert(`${alertText}\n\n${shareText}`);
  };

  const shareToSnapchat = () => {
    if (!result) return;
    const text = t('common.share.futureGoalsBasic', { 
      title: result.title, 
      percentage: result.percentage, 
      description: result.description 
    });
    const url = `https://www.snapchat.com/share?text=${encodeURIComponent(text)}&url=${encodeURIComponent(window.location.origin + '/future-goals-compatibility')}`;
    window.open(url, '_blank');
  };

  const shareToTelegram = () => {
    if (!result) return;
    const text = t('common.share.futureGoalsFullShare', { 
      title: result.title, 
      percentage: result.percentage, 
      description: result.description, 
      url: `${window.location.origin}/future-goals-compatibility` 
    });
    const url = `https://t.me/share/url?url=${encodeURIComponent(window.location.origin + '/future-goals-compatibility')}&text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  const shareToReddit = () => {
    if (!result) return;
    const title = t('common.share.futureGoalsRedditTitle', { title: result.title });
    const text = t('common.share.futureGoalsRedditText', { description: result.description });
    const url = `https://reddit.com/submit?url=${encodeURIComponent(window.location.origin + '/future-goals-compatibility')}&title=${encodeURIComponent(title)}&text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  const shareToTikTok = async () => {
    if (!result) return;
    const alertText = t('common.share.createTikTok');
    const shareText = t('common.share.futureGoalsTikTok', { 
      title: result.title, 
      percentage: result.percentage, 
      description: result.description 
    });
    alert(`${alertText}\n\n${shareText}`);
  };

  const shareToWhatsApp = () => {
    if (!result) return;
    const text = t('common.share.futureGoalsFullShare', { 
      title: result.title, 
      percentage: result.percentage, 
      description: result.description, 
      url: `${window.location.origin}/future-goals-compatibility` 
    });
    const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  const copyToClipboard = async () => {
    if (!result) return;
    const text = t('common.share.futureGoalsFullShare', { 
      title: result.title, 
      percentage: result.percentage, 
      description: result.description, 
      url: `${window.location.origin}/future-goals-compatibility` 
    });
    try {
      await navigator.clipboard.writeText(text);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 3000);
    } catch (error) {
      console.error('Failed to copy:', error);
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

  const getCategoryIcon = (category: string) => {
    const icons = {
      career: Briefcase,
      family: Baby,
      lifestyle: Home,
      finances: Target,
      personal: Compass
    };
    return icons[category as keyof typeof icons] || Target;
  };

  const getCategoryName = (category: string) => {
    const names = {
      career: t('quizzes.common.careerGoals'),
      family: t('quizzes.common.familyPlans'),
      lifestyle: t('quizzes.common.lifestyle'),
      finances: t('quizzes.common.financialGoals'),
      personal: t('quizzes.common.personalGrowth')
    };
    return names[category as keyof typeof names] || category;
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        {/* Hero Section */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="pt-8 pb-2"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-6">
              <div className="flex justify-center mb-6">
                <motion.div 
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                  className="p-4 bg-green-100 rounded-full card-hover"
                >
                  <Target className="w-16 h-16 text-green-600 icon-pulse" />
                </motion.div>
              </div>
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-4xl md:text-6xl font-playfair font-bold text-gray-900 dark:text-white mb-6"
              >
                {t('quizzes.futureGoalsCompatibility.title')}
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed"
              >
                {t('quizzes.futureGoalsCompatibility.description')}
              </motion.p>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="mt-6 px-4 py-2 bg-green-100 dark:bg-green-900/20 border border-green-300 dark:border-green-700 rounded-lg inline-block"
              >
                <p className="text-sm text-green-800 dark:text-green-200">
                  🎯 <strong>{t('quizzes.common.goalsFocus')}:</strong> {t('quizzes.common.alignYourDreams')}!
                </p>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Quiz Section */}
        <section className="py-4">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatePresence mode="wait">
              {!showResult ? (
                <motion.div
                  key={currentQuestion}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200"
                >
                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-sm font-medium text-gray-500">
                        {t('quizzes.common.question', { current: currentQuestion + 1, total: questions.length })}
                      </span>
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-emerald-500 to-teal-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                    <h2 className="text-2xl font-playfair font-semibold text-gray-900 mb-6">
                      {questions[currentQuestion].question}
                    </h2>
                  </div>

                  <div className="space-y-3">
                    {questions[currentQuestion].options.map((option, index) => (
                      <motion.button
                        key={index}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleAnswer(index)}
                        className="w-full p-4 text-left bg-gray-50 hover:bg-emerald-50 rounded-lg border border-gray-200 transition-all duration-200 text-gray-700 hover:border-emerald-400"
                      >
                        {option}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200"
                >
                  <div className="text-center mb-8">
                    <div className="text-6xl mb-6">{result.emoji}</div>
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-playfair font-bold text-gray-900 mb-4 break-words">
                      {result.title}
                    </h2>
                    <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-emerald-600 mb-6 break-words">
                      {result.percentage}% {t('quizzes.common.compatible')}
                    </div>
                    <p className="text-base sm:text-lg text-gray-700 mb-8 break-words">
                      {result.description}
                    </p>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6 mb-8">
                    <div className="bg-emerald-50 rounded-xl p-6">
                      <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                        <CheckCircle className="w-5 h-5 text-emerald-600 mr-2" />
                        {t('quizzes.common.yourStrongestAreas')}
                      </h3>
                      <div className="space-y-3">
                        {result.strongestAreas.map((area: any, index: number) => {
                          const IconComponent = getCategoryIcon(area.category);
                          return (
                            <div key={area.category} className="flex items-center justify-between">
                              <div className="flex items-center">
                                <IconComponent className="w-5 h-5 text-emerald-600 mr-3" />
                                <span className="font-medium text-gray-900">{getCategoryName(area.category)}</span>
                              </div>
                              <span className="text-emerald-600 font-bold">{area.score}%</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                    
                    <div className="bg-teal-50 rounded-xl p-6">
                      <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                        <Heart className="w-5 h-5 text-teal-600 mr-2" />
                        {t('quizzes.common.areasForDiscussion')}
                      </h3>
                      <div className="space-y-3">
                        {result.growthAreas.map((area: any, index: number) => {
                          const IconComponent = getCategoryIcon(area.category);
                          return (
                            <div key={area.category} className="flex items-center justify-between">
                              <div className="flex items-center">
                                <IconComponent className="w-5 h-5 text-teal-600 mr-3" />
                                <span className="font-medium text-gray-900">{getCategoryName(area.category)}</span>
                              </div>
                              <span className="text-teal-600 font-bold">{area.score}%</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-6 mb-8">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">{t('quizzes.common.detailedCompatibilityBreakdown')}</h3>
                    <div className="space-y-4">
                      {Object.entries(result.categoryScores).map(([category, score]) => {
                        const IconComponent = getCategoryIcon(category);
                        return (
                          <div key={category} className="block">
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center">
                                <IconComponent className="w-5 h-5 text-emerald-600 mr-3" />
                                <span className="font-medium text-gray-900">{getCategoryName(category)}</span>
                              </div>
                              <span className="text-sm font-medium text-gray-600">{Number(score)}%</span>
                            </div>
                            <div className="bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-gradient-to-r from-emerald-500 to-teal-600 h-2 rounded-full"
                                style={{ width: `${score}%` }}
                              ></div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 mb-8">
                    <button
                      onClick={resetQuiz}
                      className="w-full sm:w-auto bg-gradient-to-r from-[var(--love-pink)] to-[var(--love-purple)] text-white font-medium sm:font-semibold py-3 px-3 sm:px-4 md:px-6 rounded-lg pulse-love hover:shadow-lg transition-all duration-200 btn-love text-sm sm:text-base text-center break-words"
                    >
                      {t('quizzes.common.tryAgain')}
                    </button>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Link 
                        href={`/${locale}/love-calculator`}
                        className="w-full sm:w-auto inline-flex items-center justify-center border-2 border-[var(--love-pink)] text-[var(--love-pink)] font-medium sm:font-semibold py-3 px-3 sm:px-4 md:px-6 rounded-lg hover:bg-[var(--love-pink)] hover:text-white transition-all duration-200 btn-love text-sm sm:text-base text-center"
                      >
                        {t('quizzes.common.loveCalculator')}
                      </Link>
                    </motion.div>
                  </div>

                  {/* Share Results Section */}
                  <div className="mt-8 pt-6 border-t border-gray-200">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4 text-center">
                      {t('common.share.shareYourResults')}
                    </h4>
                    
                    {/* Social Media Share Buttons */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
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
                          <path d="M408.336,124.235c14.455,0,64.231,3.883,87.688,56.472c7.724,17.317,5.744,48.686,4.156,73.885 c-0.248,3.999-0.494,7.875-0.694,11.576l-0.084,1.591l1.062,1.185c0.429,0.476,4.444,4.672,13.374,5.017l0.144,0.008l0.15-0.003 c5.904-0.225,12.554-2.059,19.776-5.442c1.064-0.498,2.48-0.741,3.978-0.741c1.707,0,3.521,0.321,5.017,0.951l0.226,0.09 c3.787,1.327,6.464,3.829,6.505,6.093c0.022,1.28-0.935,5.891-14.359,11.194c-1.312,0.518-3.039,1.069-5.041,1.7 c-8.736,2.774-21.934,6.96-26.376,17.427c-2.501,5.896-1.816,12.854,2.034,20.678c1.584,3.697,26.52,59.865,82.631,69.111 c-0.011,0.266-0.079,0.557-0.229,0.9c-0.951,2.24-6.996,9.979-44.612,15.783c-5.886,0.902-7.328,7.5-9,15.17 c-0.604,2.746-1.218,5.518-2.062,8.381c-0.258,0.865-0.306,0.914-1.233,0.914c-0.128,0-0.278,0-0.442,0 c-1.668,0-4.2-0.346-7.135-0.922c-5.345-1.041-12.647-2.318-21.982-2.318c-5.21,0-10.577,0.453-15.962,1.352 c-11.511,1.914-20.872,8.535-30.786,15.543c-13.314,9.408-27.075,19.143-48.071,19.143c-0.917,0-1.812-0.031-2.709-0.076 l-0.236-0.01l-0.237,0.018c-0.515,0.045-1.034,0.068-1.564,0.068c-20.993,0-34.76-9.732-48.068-19.143 c-9.916-7.008-19.282-13.629-30.791-15.543c-5.38-0.896-10.752-1.352-15.959-1.352c-9.333,0-16.644,1.428-21.978,2.471 c-2.935,0.574-5.476,1.066-7.139,1.066c-1.362,0-1.388-0.08-1.676-1.064c-0.844-2.865-1.461-5.703-2.062-8.445 c-1.676-7.678-3.119-14.312-9.002-15.215c-37.613-5.809-43.659-13.561-44.613-15.795c-0.149-0.352-0.216-0.652-0.231-0.918 c56.11-9.238,81.041-65.408,82.63-69.119c3.857-7.818,4.541-14.775,2.032-20.678c-4.442-10.461-17.638-14.653-26.368-17.422 c-2.007-0.635-3.735-1.187-5.048-1.705c-11.336-4.479-14.823-8.991-14.305-11.725c0.601-3.153,6.067-6.359,10.837-6.359 c1.072,0,2.012,0.173,2.707,0.498c7.747,3.631,14.819,5.472,21.022,5.472c9.751,0,14.091-4.537,14.557-5.055l1.057-1.182 l-0.085-1.583c-0.197-3.699-0.44-7.574-0.696-11.565c-1.583-25.205-3.563-56.553,4.158-73.871 c23.37-52.396,72.903-56.435,87.525-56.435c0.36,0,6.717-0.065,6.717-0.065C407.744,124.239,408.033,124.235,408.336,124.235 M408.336,115.197h-0.017c-0.333,0-0.646,0-0.944,0.004c-2.376,0.024-6.282,0.062-6.633,0.066c-8.566,0-25.705,1.21-44.115,9.336 c-10.526,4.643-19.994,10.921-28.14,18.66c-9.712,9.221-17.624,20.59-23.512,33.796c-8.623,19.336-6.576,51.905-4.932,78.078 l0.006,0.041c0.176,2.803,0.361,5.73,0.53,8.582c-1.265,0.581-3.316,1.194-6.339,1.194c-4.864,0-10.648-1.555-17.187-4.619 c-1.924-0.896-4.12-1.349-6.543-1.349c-3.893,0-7.997,1.146-11.557,3.239c-4.479,2.63-7.373,6.347-8.159,10.468 c-0.518,2.726-0.493,8.114,5.492,13.578c3.292,3.008,8.128,5.782,14.37,8.249c1.638,0.645,3.582,1.261,5.641,1.914 c7.145,2.271,17.959,5.702,20.779,12.339c1.429,3.365,0.814,7.793-1.823,13.145c-0.069,0.146-0.138,0.289-0.201,0.439 c-0.659,1.539-6.807,15.465-19.418,30.152c-7.166,8.352-15.059,15.332-23.447,20.752c-10.238,6.617-21.316,10.943-32.923,12.855 c-4.558,0.748-7.813,4.809-7.559,9.424c0.078,1.33,0.39,2.656,0.931,3.939c0.004,0.008,0.009,0.016,0.013,0.023 c1.843,4.311,6.116,7.973,13.063,11.203c8.489,3.943,21.185,7.26,37.732,9.855c0.836,1.59,1.704,5.586,2.305,8.322 c0.629,2.908,1.285,5.898,2.22,9.074c1.009,3.441,3.626,7.553,10.349,7.553c2.548,0,5.478-0.574,8.871-1.232 c4.969-0.975,11.764-2.305,20.245-2.305c4.702,0,9.575,0.414,14.48,1.229c9.455,1.574,17.606,7.332,27.037,14 c13.804,9.758,29.429,20.803,53.302,20.803c0.651,0,1.304-0.021,1.949-0.066c0.789,0.037,1.767,0.066,2.799,0.066 c23.88,0,39.501-11.049,53.29-20.799l0.022-0.02c9.433-6.66,17.575-12.41,27.027-13.984c4.903-0.814,9.775-1.229,14.479-1.229 c8.102,0,14.517,1.033,20.245,2.150c3.738,0.736,6.643,1.09,8.872,1.09l0.218,0.004h0.226c4.917,0,8.53-2.699,9.909-7.422 c0.916-3.109,1.57-6.029,2.215-8.986c0.562-2.564,1.46-6.674,2.296-8.281c16.558-2.6,29.249-5.91,37.739-9.852 c6.931-3.215,11.199-6.873,13.053-11.166c0.556-1.287,0.881-2.621,0.954-3.979c0.261-4.607-2.999-8.676-7.56-9.424 c-51.585-8.502-74.824-61.506-75.785-63.758c-0.062-0.148-0.132-0.295-0.205-0.438c-2.637-5.354-3.246-9.777-1.816-13.148 c2.814-6.631,13.621-10.062,20.771-12.332c2.07-0.652,4.021-1.272,5.646-1.914c7.039-2.78,12.07-5.796,15.389-9.221 c3.964-4.083,4.736-7.995,4.688-10.555c-0.121-6.194-4.856-11.698-12.388-14.393c-2.544-1.052-5.445-1.607-8.399-1.607 c-2.011,0-4.989,0.276-7.808,1.592c-6.035,2.824-11.441,4.368-16.082,4.588c-2.468-0.125-4.199-0.66-5.32-1.171 c0.141-2.416,0.297-4.898,0.458-7.486l0.067-1.108c1.653-26.19,3.707-58.784-4.92-78.134c-5.913-13.253-13.853-24.651-23.604-33.892 c-8.178-7.744-17.678-14.021-28.242-18.661C434.052,116.402,416.914,115.197,408.336,115.197" fill="#000000" stroke="#000000" strokeWidth="12"/>
                        </svg>
                        <span className="text-sm font-medium text-black">Snapchat</span>
                      </button>
                    </div>

                    {/* Utility Buttons */}
                    <div className="flex flex-wrap justify-center gap-3">
                      <button
                        onClick={copyToClipboard}
                        className={`flex items-center space-x-2 ${
                          copySuccess 
                            ? 'bg-green-500 text-white' 
                            : 'bg-gray-500 text-white hover:bg-gray-600'
                        } px-4 py-2 rounded-lg transition-colors duration-200`}
                      >
                        {copySuccess ? (
                          <Check className="w-4 h-4" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                        <span className="text-sm">{copySuccess ? t('common.share.copied') : t('common.share.copyResults')}</span>
                      </button>
                    </div>
                  </div>

                  {/* Cross-navigation section */}
                  <div className="mt-12 pt-8 border-t border-gray-200">
                    <h3 className="text-xl font-semibold text-gray-900 mb-6">
                      {t('quizzes.common.exploreOtherQuizzes')}
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <motion.div
                        whileHover={{ scale: 1.02, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Link 
                          href={`/${locale}/relationship-quiz`}
                          className="block p-4 bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-lg border border-purple-200 dark:border-purple-700 hover:shadow-lg hover:border-purple-300 dark:hover:border-purple-600 transition-all duration-200 btn-love"
                      >
                        <h4 className="font-semibold text-purple-900 dark:text-purple-100 mb-2">
                          {t('quizzes.common.relationshipQuiz')}
                        </h4>
                        <p className="text-sm text-purple-700 dark:text-purple-200">
                          {t('quizzes.common.answerQuestions')}
                        </p>
                        </Link>
                      </motion.div>
                      <motion.div
                        whileHover={{ scale: 1.02, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Link 
                          href={`/${locale}/communication-style-quiz`}
                          className="block p-4 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-lg border border-blue-200 dark:border-blue-700 hover:shadow-lg hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-200 btn-love"
                      >
                        <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
                          {t('quizzes.common.communicationStyleQuiz')}
                        </h4>
                        <p className="text-sm text-blue-700 dark:text-blue-200">
                          {t('quizzes.common.learnYourCommunicationStyle')}
                        </p>
                        </Link>
                      </motion.div>
                      <motion.div
                        whileHover={{ scale: 1.02, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Link 
                          href={`/${locale}/love-language-assessment`}
                          className="block p-4 bg-gradient-to-r from-pink-50 to-pink-100 dark:from-pink-900/20 dark:to-pink-800/20 rounded-lg border border-pink-200 dark:border-pink-700 hover:shadow-lg hover:border-pink-300 dark:hover:border-pink-600 transition-all duration-200 btn-love"
                      >
                        <h4 className="font-semibold text-pink-900 dark:text-pink-100 mb-2">
                          {t('quizzes.common.loveLanguageAssessment')}
                        </h4>
                        <p className="text-sm text-pink-700 dark:text-pink-200">
                          {t('quizzes.common.discoverYourLoveLanguage')}
                        </p>
                        </Link>
                      </motion.div>
                      <motion.div
                        whileHover={{ scale: 1.02, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Link 
                          href={`/${locale}/conflict-resolution-style`}
                          className="block p-4 bg-gradient-to-r from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 rounded-lg border border-orange-200 dark:border-orange-700 hover:shadow-lg hover:border-orange-300 dark:hover:border-orange-600 transition-all duration-200 btn-love"
                      >
                        <h4 className="font-semibold text-orange-900 dark:text-orange-100 mb-2">
                          {t('quizzes.common.conflictResolutionQuiz')}
                        </h4>
                        <p className="text-sm text-orange-700 dark:text-orange-200">
                          {t('quizzes.common.learnYourApproach')}
                        </p>
                        </Link>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>

        {/* Features Preview */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-playfair font-bold text-gray-900 dark:text-white mb-12 text-center">
              {t('quizzes.common.whatFutureGoalsWillReveal')}
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🎯</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  {t('quizzes.common.goalAlignmentScore')}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {t('quizzes.common.seeHowCloselyGoals')}
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🗺️</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  {t('quizzes.common.sharedPathPlanning')}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {t('quizzes.common.learnHowToCreate')}
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">💡</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  {t('quizzes.common.compromiseStrategies')}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {t('quizzes.common.getTipsOnNavigating')}
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
} 