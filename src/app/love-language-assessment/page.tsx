'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { Heart, ArrowRight, Gift, MessageCircle, Clock, Hand, MessageSquare, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Question {
  id: number;
  question: string;
  options: string[];
  points: number[];
  category: 'words' | 'quality' | 'touch' | 'service' | 'gifts';
}

const questions: Question[] = [
  {
    id: 1,
    question: "What makes you feel most loved by your partner?",
    options: [
      "When they tell me they love me and appreciate me",
      "When we spend uninterrupted time together",
      "When they give me a hug or hold my hand",
      "When they help me with tasks or do things for me",
      "When they surprise me with thoughtful gifts"
    ],
    points: [4, 1, 2, 1, 3],
    category: 'words'
  },
  {
    id: 2,
    question: "When you want to show your partner you care, you usually:",
    options: [
      "Write them a heartfelt note or send sweet messages",
      "Plan a special date or activity together",
      "Give them physical affection like hugs and kisses",
      "Do something helpful like cooking or cleaning",
      "Buy them something they've been wanting"
    ],
    points: [4, 2, 3, 1, 1],
    category: 'words'
  },
  {
    id: 3,
    question: "Your ideal evening with your partner involves:",
    options: [
      "Deep conversations where you share your thoughts and dreams",
      "Doing an activity together with phones put away",
      "Cuddling on the couch while watching a movie",
      "Working together on a project or tackling household tasks",
      "Going shopping together or exchanging small surprises"
    ],
    points: [2, 4, 3, 1, 1],
    category: 'quality'
  },
  {
    id: 4,
    question: "Which gesture would make you feel most appreciated?",
    options: [
      "A sincere compliment about something you did well",
      "Your partner putting their phone away to focus completely on you",
      "A spontaneous back rub or hand massage",
      "Coming home to find your partner has done your least favorite chore",
      "A small gift that shows they were thinking of you"
    ],
    points: [3, 4, 2, 1, 1],
    category: 'quality'
  },
  {
    id: 5,
    question: "When your partner is away, what do you miss most?",
    options: [
      "Hearing their voice and the sweet things they say",
      "The time you spend together and shared experiences",
      "Their physical presence and affectionate touches",
      "The way they help with daily life and responsibilities",
      "The little surprises and thoughtful gestures"
    ],
    points: [3, 4, 2, 1, 1],
    category: 'quality'
  },
  {
    id: 6,
    question: "Physical affection is important to you because:",
    options: [
      "It's a way to communicate love without words",
      "It makes you feel connected during quality time together",
      "It makes you feel secure and loved",
      "It shows your partner cares about your comfort and well-being",
      "It's often paired with giving or receiving something special"
    ],
    points: [2, 3, 4, 1, 1],
    category: 'touch'
  },
  {
    id: 7,
    question: "How do you prefer to be comforted when upset?",
    options: [
      "Words of encouragement and reassurance",
      "Having your partner's undivided attention and presence",
      "Physical comfort like hugs, hand-holding, or cuddling",
      "Having your partner take care of practical things for you",
      "Being surprised with something to cheer you up"
    ],
    points: [2, 3, 4, 1, 1],
    category: 'touch'
  },
  {
    id: 8,
    question: "When your partner helps you, you feel most loved when they:",
    options: [
      "Tell you how much they enjoy helping you",
      "Make the time to help despite their busy schedule",
      "Work alongside you with physical closeness",
      "Notice what you need without being asked",
      "Bring you tools or supplies to make the task easier"
    ],
    points: [2, 3, 1, 4, 1],
    category: 'service'
  },
  {
    id: 9,
    question: "What means more to you?",
    options: [
      "A handwritten love letter",
      "A day trip planned just for the two of you",
      "A surprise massage or long hug",
      "Coming home to a clean house and dinner made",
      "A thoughtful gift that reminded them of you"
    ],
    points: [2, 3, 1, 4, 1],
    category: 'service'
  },
  {
    id: 10,
    question: "What would make you feel most special on your birthday?",
    options: [
      "A heartfelt speech about what you mean to your partner",
      "Having your partner's complete attention all day",
      "Lots of affectionate touches and physical closeness",
      "Having everything planned and organized so you can relax",
      "A perfect gift that shows how well they know you"
    ],
    points: [1, 2, 3, 1, 4],
    category: 'gifts'
  }
];

function getLoveLanguageResult(wordsScore: number, qualityScore: number, touchScore: number, serviceScore: number, giftsScore: number) {
  const scores = {
    words: wordsScore,
    quality: qualityScore,
    touch: touchScore,
    service: serviceScore,
    gifts: giftsScore
  };
  
  const sortedLanguages = Object.entries(scores).sort(([,a], [,b]) => b - a);
  const primaryLanguage = sortedLanguages[0][0];
  const totalScore = wordsScore + qualityScore + touchScore + serviceScore + giftsScore;
  const percentage = Math.round((scores[primaryLanguage] / totalScore) * 100);
  
  const languageResults = {
    words: {
      title: "Words of Affirmation 💬",
      icon: MessageSquare,
      description: "You thrive on verbal appreciation, compliments, and encouraging words. Hearing 'I love you' means the world to you.",
      characteristics: ["Values verbal appreciation", "Loves compliments and praise", "Enjoys meaningful conversations", "Feels hurt by harsh words"],
      tips: ["Express appreciation verbally", "Leave loving notes", "Offer genuine compliments", "Avoid criticism"],
      partnerTips: ["Tell them you love them regularly", "Acknowledge their efforts out loud", "Send sweet text messages", "Praise them in front of others"]
    },
    quality: {
      title: "Quality Time ⏰",
      icon: Clock,
      description: "You feel most loved when you have your partner's undivided attention. Being together and creating memories matters most.",
      characteristics: ["Values undivided attention", "Enjoys shared activities", "Feels loved through presence", "Dislikes distractions during together time"],
      tips: ["Give your full attention", "Plan regular date nights", "Put devices away when together", "Create new experiences"],
      partnerTips: ["Schedule regular one-on-one time", "Be fully present without distractions", "Plan activities you both enjoy", "Listen actively when they speak"]
    },
    touch: {
      title: "Physical Touch 🤗",
      icon: Hand,
      description: "Physical affection makes you feel most connected and loved. Hugs, kisses, and gentle touches speak louder than words.",
      characteristics: ["Needs regular physical affection", "Feels connected through touch", "Values non-sexual touch", "Feels unloved when touch is lacking"],
      tips: ["Initiate appropriate physical contact", "Hold hands frequently", "Give hugs and kisses", "Respect physical boundaries"],
      partnerTips: ["Offer regular hugs and kisses", "Hold hands while walking", "Sit close during movies", "Give back rubs or massages"]
    },
    service: {
      title: "Acts of Service 🛠️",
      icon: CheckCircle,
      description: "You feel loved when your partner helps with tasks and responsibilities. Actions speak louder than words for you.",
      characteristics: ["Values helpful actions", "Appreciates assistance with tasks", "Feels loved through practical help", "May feel burdened when help isn't offered"],
      tips: ["Help with daily responsibilities", "Anticipate their needs", "Follow through on promises", "Ask how you can help"],
      partnerTips: ["Help with household chores", "Run errands for them", "Cook their favorite meal", "Take care of tasks they dislike"]
    },
    gifts: {
      title: "Receiving Gifts 🎁",
      icon: Gift,
      description: "Thoughtful gifts and gestures make you feel most appreciated. It's not about expense, but the thought and effort behind it.",
      characteristics: ["Values thoughtful gestures", "Appreciates symbolic gifts", "Remembers special occasions", "Feels hurt when occasions are forgotten"],
      tips: ["Give thoughtful, meaningful gifts", "Remember important dates", "Bring small surprises", "Put thought into gift selection"],
      partnerTips: ["Remember birthdays and anniversaries", "Bring small unexpected gifts", "Pay attention to things they mention wanting", "Handmade gifts show extra thought"]
    }
  };
  
  return {
    percentage,
    primaryLanguage,
    ...languageResults[primaryLanguage],
    scores,
    sortedLanguages: sortedLanguages.map(([lang, score]) => ({ language: lang, score, percentage: Math.round((score / totalScore) * 100) }))
  };
}

export default function LoveLanguageAssessmentPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{ category: string; points: number }[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState<any>(null);

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
      const wordsScore = newAnswers.filter(a => a.category === 'words').reduce((sum, a) => sum + a.points, 0);
      const qualityScore = newAnswers.filter(a => a.category === 'quality').reduce((sum, a) => sum + a.points, 0);
      const touchScore = newAnswers.filter(a => a.category === 'touch').reduce((sum, a) => sum + a.points, 0);
      const serviceScore = newAnswers.filter(a => a.category === 'service').reduce((sum, a) => sum + a.points, 0);
      const giftsScore = newAnswers.filter(a => a.category === 'gifts').reduce((sum, a) => sum + a.points, 0);
      
      const quizResult = getLoveLanguageResult(wordsScore, qualityScore, touchScore, serviceScore, giftsScore);
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

  const getLanguageEmoji = (language: string) => {
    const emojis = {
      words: "💬",
      quality: "⏰", 
      touch: "🤗",
      service: "🛠️",
      gifts: "🎁"
    };
    return emojis[language] || "💖";
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        {/* Hero Section */}
        <section className="pt-8 pb-2">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-6">
              <Heart className="w-16 h-16 mx-auto mb-6 text-rose-500" />
              <h1 className="text-4xl md:text-6xl font-playfair font-bold text-gray-900 dark:text-white mb-6">
                Love Language Assessment
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Discover your primary love language and learn how you best give and receive love. 
                Take this assessment to transform your relationships and deepen your connections!
              </p>
              <div className="mt-6 px-4 py-2 bg-rose-100 dark:bg-rose-900/20 border border-rose-300 dark:border-rose-700 rounded-lg inline-block">
                <p className="text-sm text-rose-800 dark:text-rose-200">
                  💕 <strong>Love Focus:</strong> Understand how you express and receive love best!
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Quiz Section - MOVED TO TOP */}
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
                        Question {currentQuestion + 1} of {questions.length}
                      </span>
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-rose-500 to-pink-600 h-2 rounded-full transition-all duration-300"
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
                        className="w-full p-4 text-left bg-gray-50 hover:bg-rose-50 rounded-lg border border-gray-200 transition-all duration-200 text-gray-700 hover:border-rose-400"
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
                    <div className="text-6xl mb-6">💕</div>
                    <h2 className="text-3xl font-playfair font-bold text-gray-900 mb-4">
                      {result.title}
                    </h2>
                    <div className="text-4xl font-bold text-rose-600 mb-6">
                      {result.percentage}% Primary
                    </div>
                    <p className="text-lg text-gray-700 mb-8">
                      {result.description}
                    </p>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6 mb-8">
                    <div className="bg-rose-50 rounded-xl p-6">
                      <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                        <CheckCircle className="w-5 h-5 text-rose-600 mr-2" />
                        Your Characteristics
                      </h3>
                      <ul className="space-y-2">
                        {result.characteristics.map((characteristic: string, index: number) => (
                          <li key={index} className="text-gray-700 flex items-start">
                            <span className="text-rose-600 mr-2">•</span>
                            {characteristic}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="bg-pink-50 rounded-xl p-6">
                      <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                        <Heart className="w-5 h-5 text-pink-600 mr-2" />
                        For Your Partner
                      </h3>
                      <ul className="space-y-2">
                        {result.partnerTips.map((tip: string, index: number) => (
                          <li key={index} className="text-gray-700 flex items-start">
                            <span className="text-pink-600 mr-2">•</span>
                            {tip}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-6 mb-8">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Your Love Language Scores</h3>
                    <div className="space-y-3">
                      {result.sortedLanguages.map((lang: any, index: number) => (
                        <div key={lang.language} className="flex items-center justify-between">
                          <div className="flex items-center">
                            <span className="text-xl mr-3">{getLanguageEmoji(lang.language)}</span>
                            <span className="font-medium text-gray-900 capitalize">
                              {lang.language === 'words' ? 'Words of Affirmation' : 
                               lang.language === 'quality' ? 'Quality Time' :
                               lang.language === 'touch' ? 'Physical Touch' :
                               lang.language === 'service' ? 'Acts of Service' :
                               'Receiving Gifts'}
                            </span>
                          </div>
                          <div className="flex items-center">
                            <div className="w-24 bg-gray-200 rounded-full h-2 mr-3">
                              <div 
                                className="bg-gradient-to-r from-rose-500 to-pink-600 h-2 rounded-full"
                                style={{ width: `${lang.percentage}%` }}
                              ></div>
                            </div>
                            <span className="text-sm font-medium text-gray-600">{lang.percentage}%</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap justify-center gap-4">
                    <button
                      onClick={resetQuiz}
                      className="bg-gradient-to-r from-rose-500 to-pink-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-200"
                    >
                      Take Assessment Again
                    </button>
                    <Link 
                      href="/love-calculator#calculator"
                      className="inline-flex items-center border-2 border-rose-500 text-rose-600 px-6 py-3 rounded-lg font-semibold hover:bg-rose-500 hover:text-white transition-all duration-200"
                    >
                      Calculate Your Love Score Now
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>

        {/* Features Preview - MOVED BELOW QUIZ */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-playfair font-bold text-gray-900 dark:text-white mb-12 text-center">
              What You'll Learn from the Love Language Assessment
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-rose-100 dark:bg-rose-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🎯</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  Your Primary Love Language
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Discover which of the 5 love languages speaks to you most deeply and resonates with your heart.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-rose-100 dark:bg-rose-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">💝</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  How to Express Love
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Learn the best ways to show love to your partner based on their unique love language preferences.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-rose-100 dark:bg-rose-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🌱</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  Relationship Growth Tips
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Get personalized advice for strengthening your relationship through better love language understanding.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Other Quizzes */}
        <section className="py-16 bg-white/50 dark:bg-gray-800/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-playfair font-bold text-gray-900 dark:text-white mb-8">
              More Relationship Assessments
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Link 
                href="/communication-style-quiz"
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700"
              >
                <div className="text-4xl mb-3">💬</div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Communication Style Quiz
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Discover your communication patterns
                </p>
              </Link>
              <Link 
                href="/future-goals-compatibility"
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700"
              >
                <div className="text-4xl mb-3">🎯</div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Future Goals Compatibility
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  See how aligned your life goals are
                </p>
              </Link>
              <Link 
                href="/conflict-resolution-style"
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700"
              >
                <div className="text-4xl mb-3">🤝</div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Conflict Resolution Style Quiz
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Learn your conflict resolution approach
                </p>
              </Link>
              <Link 
                href="/love-calculator"
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700"
              >
                <div className="text-4xl mb-3">💖</div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Love Calculator Test
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Test your name compatibility instantly
                </p>
              </Link>
            </div>
          </div>
        </section>

        {/* The 5 Love Languages Section - MOVED BELOW QUIZ */}
        <section className="py-16 bg-white/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-playfair font-bold text-gray-900 mb-8">
                The 5 Love Languages
              </h2>
              <div className="grid md:grid-cols-5 gap-6">
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <MessageSquare className="w-12 h-12 text-rose-600 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Words of Affirmation</h3>
                  <p className="text-sm text-gray-600">
                    Verbal appreciation, compliments, and encouraging words
                  </p>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <Clock className="w-12 h-12 text-rose-600 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Quality Time</h3>
                  <p className="text-sm text-gray-600">
                    Undivided attention and meaningful time together
                  </p>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <Hand className="w-12 h-12 text-rose-600 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Physical Touch</h3>
                  <p className="text-sm text-gray-600">
                    Appropriate physical affection and touch
                  </p>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <CheckCircle className="w-12 h-12 text-rose-600 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Acts of Service</h3>
                  <p className="text-sm text-gray-600">
                    Helpful actions and assistance with tasks
                  </p>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <Gift className="w-12 h-12 text-rose-600 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Receiving Gifts</h3>
                  <p className="text-sm text-gray-600">
                    Thoughtful gifts and meaningful gestures
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
} 