'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { Heart, ArrowRight, CheckCircle, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Question {
  id: number;
  question: string;
  options: string[];
  points: number[];
}

const questions: Question[] = [
  {
    id: 1,
    question: "How often do you and your partner have meaningful conversations?",
    options: ["Daily", "A few times a week", "Weekly", "Rarely"],
    points: [4, 3, 2, 1]
  },
  {
    id: 2,
    question: "When you disagree, how do you typically resolve conflicts?",
    options: ["Talk it through calmly", "Need some time but work it out", "Argue but make up quickly", "Avoid the topic"],
    points: [4, 3, 2, 1]
  },
  {
    id: 3,
    question: "How aligned are your future goals and dreams?",
    options: ["Perfectly aligned", "Mostly similar", "Some differences", "Very different"],
    points: [4, 3, 2, 1]
  },
  {
    id: 4,
    question: "How much quality time do you spend together?",
    options: ["Plenty, and we enjoy it", "Good amount", "Could be more", "Not enough"],
    points: [4, 3, 2, 1]
  },
  {
    id: 5,
    question: "How do you handle each other's friends and family?",
    options: ["Love them all", "Get along well", "Some challenges", "Frequent issues"],
    points: [4, 3, 2, 1]
  },
  {
    id: 6,
    question: "How well do you communicate your needs and feelings?",
    options: ["Very openly", "Pretty well", "Sometimes struggle", "Rarely express them"],
    points: [4, 3, 2, 1]
  },
  {
    id: 7,
    question: "How do you support each other during tough times?",
    options: ["Always there for each other", "Usually supportive", "Sometimes", "Struggle with this"],
    points: [4, 3, 2, 1]
  },
  {
    id: 8,
    question: "How compatible are your lifestyle preferences?",
    options: ["Very compatible", "Mostly compatible", "Some differences", "Quite different"],
    points: [4, 3, 2, 1]
  }
];

function getQuizResult(score: number) {
  const percentage = Math.round((score / 32) * 100);
  
  if (percentage >= 85) {
    return {
      percentage,
      title: "Perfect Match! 💖",
      message: "You two are relationship goals! Your compatibility is off the charts.",
      emoji: "🌟"
    };
  } else if (percentage >= 70) {
    return {
      percentage,
      title: "Great Compatibility! 💕",
      message: "You have a strong relationship with excellent potential.",
      emoji: "💫"
    };
  } else if (percentage >= 55) {
    return {
      percentage,
      title: "Good Foundation! 💛",
      message: "You have a solid relationship with room for growth.",
      emoji: "🌱"
    };
  } else {
    return {
      percentage,
      title: "Work in Progress! 💪",
      message: "Every relationship can improve with effort and communication.",
      emoji: "🔧"
    };
  }
}

export default function RelationshipQuizPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleAnswer = (pointsIndex: number) => {
    const newAnswers = [...answers, questions[currentQuestion].points[pointsIndex]];
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Calculate final result
      const totalScore = newAnswers.reduce((sum, score) => sum + score, 0);
      const quizResult = getQuizResult(totalScore);
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

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <section className="pt-8 pb-2">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-6">
              <h1 className="text-4xl md:text-6xl font-playfair font-bold love-gradient-text mb-6">
                Relationship Quiz
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Discover how compatible you and your partner really are! Answer these questions 
                honestly to get personalized insights about your relationship.
              </p>
              <div className="mt-6 px-4 py-2 bg-purple-100 dark:bg-purple-900/20 border border-purple-300 dark:border-purple-700 rounded-lg inline-block">
                <p className="text-sm text-purple-800 dark:text-purple-200">
                  💕 <strong>Relationship Focus:</strong> Discover your compatibility and strengthen your bond together!
                </p>
              </div>
            </div>
          </div>
        </section>

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
                  className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700"
                >
                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Question {currentQuestion + 1} of {questions.length}
                      </span>
                      <div className="w-32 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-[var(--love-pink)] to-[var(--love-purple)] h-2 rounded-full transition-all duration-300"
                          style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                    <h2 className="text-2xl font-playfair font-semibold text-gray-900 dark:text-white mb-6">
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
                        className="w-full p-4 text-left bg-gray-50 dark:bg-gray-700 hover:bg-[var(--love-light)]/20 dark:hover:bg-gray-600 rounded-lg border border-gray-200 dark:border-gray-600 transition-all duration-200 text-gray-700 dark:text-gray-300 hover:border-[var(--love-pink)]"
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
                  className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700 text-center"
                >
                  <div className="text-6xl mb-6">{result.emoji}</div>
                  <h2 className="text-3xl font-playfair font-bold text-gray-900 dark:text-white mb-4">
                    {result.title}
                  </h2>
                  <div className="text-5xl font-bold love-gradient-text mb-6">
                    {result.percentage}%
                  </div>
                  <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
                    {result.message}
                  </p>
                  
                  <div className="flex flex-wrap justify-center gap-4">
                    <button
                      onClick={resetQuiz}
                      className="bg-gradient-to-r from-[var(--love-pink)] to-[var(--love-purple)] text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-200"
                    >
                      Take Quiz Again
                    </button>
                    <Link 
                      href="/love-calculator#calculator"
                      className="inline-flex items-center border-2 border-[var(--love-pink)] text-[var(--love-pink)] px-6 py-3 rounded-lg font-semibold hover:bg-[var(--love-pink)] hover:text-white transition-all duration-200"
                    >
                      Calculate Your Love Score Now
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>

        <section className="py-16 bg-white/50 dark:bg-gray-800/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-playfair font-bold text-gray-900 dark:text-white mb-8">
                Why Take Our Relationship Quiz?
              </h2>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                  <CheckCircle className="w-12 h-12 text-[var(--love-pink)] mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Self-Awareness</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Gain insights into your relationship patterns and areas for improvement.
                  </p>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                  <MessageCircle className="w-12 h-12 text-[var(--love-pink)] mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Communication</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Start meaningful conversations about your relationship with your partner.
                  </p>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                  <Heart className="w-12 h-12 text-[var(--love-pink)] mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Growth</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Identify strengths to celebrate and areas where you can grow together.
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