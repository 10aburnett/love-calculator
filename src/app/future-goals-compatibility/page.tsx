'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { Target, ArrowRight, Heart, MessageCircle, Compass, CheckCircle, Home, Briefcase, Baby } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Question {
  id: number;
  question: string;
  options: string[];
  points: number[];
  category: 'career' | 'family' | 'lifestyle' | 'finances' | 'personal';
}

const questions: Question[] = [
  {
    id: 1,
    question: "In 5 years, what's most important to you career-wise?",
    options: [
      "Climbing the corporate ladder and achieving leadership roles",
      "Finding work-life balance with a stable, fulfilling job",
      "Being my own boss and running a successful business",
      "Having the flexibility to travel and work remotely"
    ],
    points: [4, 2, 3, 1],
    category: 'career'
  },
  {
    id: 2,
    question: "What's your ideal work schedule in the future?",
    options: [
      "Full-time career with potential for overtime when needed",
      "Standard full-time with clear work-life boundaries",
      "Part-time or flexible schedule for family/personal time",
      "Freelance or entrepreneurial with complete control over time"
    ],
    points: [3, 4, 2, 1],
    category: 'career'
  },
  {
    id: 3,
    question: "When do you see yourself having children (if at all)?",
    options: [
      "Already have them or want them within the next 2-3 years",
      "In the next 5-7 years when we're more established",
      "Maybe someday, but it's not a priority right now",
      "I don't want children or am unsure about it"
    ],
    points: [4, 3, 2, 1],
    category: 'family'
  },
  {
    id: 4,
    question: "How important is it to live near family?",
    options: [
      "Essential - within 30 minutes of parents/siblings",
      "Preferred - same city or within a few hours drive",
      "Nice but not necessary - same state or region is fine",
      "Not important - we can live anywhere that's best for us"
    ],
    points: [4, 3, 2, 1],
    category: 'family'
  },
  {
    id: 5,
    question: "Where do you see yourself living in 10 years?",
    options: [
      "In a big city with lots of opportunities and excitement",
      "In the suburbs with a nice house and good schools",
      "In a small town or rural area for peace and quiet",
      "Traveling frequently or living in different places"
    ],
    points: [3, 4, 2, 1],
    category: 'lifestyle'
  },
  {
    id: 6,
    question: "What's your vision for friendships and social life?",
    options: [
      "Large circle of friends with frequent social gatherings",
      "Close-knit group of friends with regular but balanced socializing",
      "Small group of very close friends with occasional meetups",
      "Prefer quiet time together, minimal social obligations"
    ],
    points: [3, 4, 2, 1],
    category: 'lifestyle'
  },
  {
    id: 7,
    question: "How important is financial security to your future happiness?",
    options: [
      "Essential - I want to be wealthy and financially independent",
      "Very important - I want to be comfortable and debt-free",
      "Somewhat important - enough to cover needs and some wants",
      "Not very important - money doesn't buy happiness"
    ],
    points: [4, 3, 2, 1],
    category: 'finances'
  },
  {
    id: 8,
    question: "How do you want to handle big purchases and financial decisions?",
    options: [
      "Always discuss and agree together on everything over $100",
      "Discuss major purchases over $500-1000 together",
      "Have individual freedom for smaller amounts, discuss large ones",
      "Mostly independent financial decisions with occasional check-ins"
    ],
    points: [4, 3, 2, 1],
    category: 'finances'
  },
  {
    id: 9,
    question: "What's your approach to major life decisions?",
    options: [
      "Plan everything carefully with detailed strategies",
      "Have a general plan but stay flexible for opportunities",
      "Go with the flow and see what life brings",
      "Follow your heart and intuition above all else"
    ],
    points: [4, 3, 2, 1],
    category: 'personal'
  },
  {
    id: 10,
    question: "How important is continuing education and personal growth?",
    options: [
      "Extremely important - always learning new skills and growing",
      "Important - pursuing additional education or certifications",
      "Somewhat important - learning when opportunities arise",
      "Not a priority - focus on other life goals instead"
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
    title = "Future Soulmates! 🌟";
    description = "Your future goals are incredibly aligned! You both want similar things and have compatible timelines for achieving your dreams.";
    emoji = "🌟";
  } else if (percentage >= 70) {
    compatibilityLevel = "Very Good";
    title = "Great Life Partners! 💫";
    description = "You have strong compatibility in your future goals with some areas that might need discussion and compromise.";
    emoji = "💫";
  } else if (percentage >= 55) {
    compatibilityLevel = "Good";
    title = "Good Foundation! 🌱";
    description = "You share many similar goals but may need to work through some differences in priorities and timelines.";
    emoji = "🌱";
  } else {
    compatibilityLevel = "Needs Discussion";
    title = "Important Conversations Ahead! 💬";
    description = "You have some significant differences in future goals that deserve serious discussion and compromise.";
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

export default function FutureGoalsCompatibilityPage() {
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

  const getCategoryIcon = (category: string) => {
    const icons = {
      career: Briefcase,
      family: Baby,
      lifestyle: Home,
      finances: Target,
      personal: Compass
    };
    return icons[category] || Target;
  };

  const getCategoryName = (category: string) => {
    const names = {
      career: 'Career Goals',
      family: 'Family Plans',
      lifestyle: 'Lifestyle',
      finances: 'Financial Goals',
      personal: 'Personal Growth'
    };
    return names[category] || category;
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        {/* Hero Section */}
        <section className="pt-8 pb-2">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-6">
              <Target className="w-16 h-16 mx-auto mb-6 text-emerald-500" />
              <h1 className="text-4xl md:text-6xl font-playfair font-bold text-gray-900 dark:text-white mb-6">
                Future Goals Compatibility
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Discover how aligned you and your partner are when it comes to life goals, dreams, and future plans. 
                Building a life together starts with shared vision!
              </p>
              <div className="mt-6 px-4 py-2 bg-emerald-100 dark:bg-emerald-900/20 border border-emerald-300 dark:border-emerald-700 rounded-lg inline-block">
                <p className="text-sm text-emerald-800 dark:text-emerald-200">
                  🎯 <strong>Goals Focus:</strong> Align your dreams and build a shared future together!
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
                    <h2 className="text-3xl font-playfair font-bold text-gray-900 mb-4">
                      {result.title}
                    </h2>
                    <div className="text-4xl font-bold text-emerald-600 mb-6">
                      {result.percentage}% Compatible
                    </div>
                    <p className="text-lg text-gray-700 mb-8">
                      {result.description}
                    </p>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6 mb-8">
                    <div className="bg-emerald-50 rounded-xl p-6">
                      <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                        <CheckCircle className="w-5 h-5 text-emerald-600 mr-2" />
                        Your Strongest Areas
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
                        Areas for Discussion
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
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Detailed Compatibility Breakdown</h3>
                    <div className="space-y-4">
                      {Object.entries(result.categoryScores).map(([category, score]) => {
                        const IconComponent = getCategoryIcon(category);
                        return (
                          <div key={category} className="flex items-center justify-between">
                            <div className="flex items-center flex-1">
                              <IconComponent className="w-5 h-5 text-emerald-600 mr-3" />
                              <span className="font-medium text-gray-900 mr-4">{getCategoryName(category)}</span>
                              <div className="flex-1 bg-gray-200 rounded-full h-2 mr-4">
                                <div 
                                  className="bg-gradient-to-r from-emerald-500 to-teal-600 h-2 rounded-full"
                                  style={{ width: `${score}%` }}
                                ></div>
                              </div>
                            </div>
                            <span className="text-sm font-medium text-gray-600">{score}%</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap justify-center gap-4">
                    <button
                      onClick={resetQuiz}
                      className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-200"
                    >
                      Take Quiz Again
                    </button>
                    <Link 
                      href="/love-calculator#calculator"
                      className="inline-flex items-center border-2 border-emerald-500 text-emerald-600 px-6 py-3 rounded-lg font-semibold hover:bg-emerald-500 hover:text-white transition-all duration-200"
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
              What the Future Goals Compatibility Quiz Will Reveal
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🎯</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  Goal Alignment Score
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  See how closely your life goals and dreams match with your partner's vision for the future.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🗺️</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  Shared Path Planning
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Learn how to create a shared roadmap for your future together and align your individual dreams.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">💡</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  Compromise Strategies
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Get tips on how to navigate differences in goals and find win-win solutions for your relationship.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Other Quizzes */}
        <section className="py-16 bg-white/50 dark:bg-gray-800/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-playfair font-bold text-gray-900 dark:text-white mb-8">
              More Relationship Tools
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
                href="/love-language-assessment"
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700"
              >
                <div className="text-4xl mb-3">💕</div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Love Language Assessment
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Discover your primary love languages
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

        {/* Why Future Goals Matter Section - MOVED BELOW QUIZ */}
        <section className="py-16 bg-white/50 dark:bg-gray-800/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-playfair font-bold text-gray-900 mb-8">
                Why Future Goals Matter
              </h2>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <Target className="w-12 h-12 text-emerald-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Aligned Direction</h3>
                  <p className="text-gray-600">
                    When couples share similar goals, they can support each other and work together toward their dreams.
                  </p>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <Compass className="w-12 h-12 text-emerald-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Avoid Conflicts</h3>
                  <p className="text-gray-600">
                    Understanding differences early helps prevent major disagreements about life direction later on.
                  </p>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <Heart className="w-12 h-12 text-emerald-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Build Together</h3>
                  <p className="text-gray-600">
                    Shared goals create opportunities to build a life together rather than pursuing separate paths.
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