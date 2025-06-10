'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { MessageCircle, ArrowRight, Heart, Users, CheckCircle, Mic, Volume2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Question {
  id: number;
  question: string;
  options: string[];
  points: number[];
  category: 'expressive' | 'analytical' | 'supportive' | 'direct';
}

const questions: Question[] = [
  {
    id: 1,
    question: "When your partner is upset, what's your first instinct?",
    options: [
      "Listen carefully and ask questions to understand",
      "Offer practical solutions to fix the problem", 
      "Give them a hug and emotional support",
      "Give them space until they're ready to talk"
    ],
    points: [3, 1, 4, 2],
    category: 'supportive'
  },
  {
    id: 2,
    question: "How do you prefer to discuss important relationship decisions?",
    options: [
      "Face-to-face with lots of discussion and emotion",
      "Calmly with facts, pros and cons laid out",
      "Over time with gentle conversations and check-ins",
      "Directly and efficiently to reach a conclusion"
    ],
    points: [4, 2, 3, 1],
    category: 'expressive'
  },
  {
    id: 3,
    question: "When you disagree with your partner, you tend to:",
    options: [
      "Express your feelings immediately and passionately",
      "Think it through before presenting logical arguments",
      "Focus on understanding their perspective first",
      "State your position clearly and expect the same"
    ],
    points: [4, 2, 3, 1],
    category: 'expressive'
  },
  {
    id: 4,
    question: "Your ideal way to share good news is:",
    options: [
      "Call them immediately, full of excitement and emotion",
      "Plan how to share it in an organized, clear way",
      "Tell them in a quiet moment with warmth and connection",
      "Share the facts straightforwardly and move on"
    ],
    points: [4, 2, 3, 1],
    category: 'expressive'
  },
  {
    id: 5,
    question: "When giving feedback to your partner, you:",
    options: [
      "Share your feelings openly about how their actions affected you",
      "Present specific examples and suggest concrete improvements",
      "Emphasize their strengths first, then gently mention areas to work on",
      "Be direct about what needs to change without sugarcoating"
    ],
    points: [3, 4, 2, 1],
    category: 'analytical'
  },
  {
    id: 6,
    question: "During conflicts, what matters most to you?",
    options: [
      "That both of you can express your true feelings",
      "Finding a logical solution that makes sense",
      "Maintaining connection and understanding throughout",
      "Resolving the issue quickly and clearly"
    ],
    points: [3, 4, 2, 1],
    category: 'analytical'
  },
  {
    id: 7,
    question: "How do you show love through communication?",
    options: [
      "Through heartfelt words and emotional expressions",
      "By remembering details and following through on promises",
      "With gentle encouragement and validating their feelings",
      "By being honest and straightforward about your commitment"
    ],
    points: [3, 4, 2, 1],
    category: 'analytical'
  },
  {
    id: 8,
    question: "When your partner needs to vent, you prefer to:",
    options: [
      "Match their energy and share similar experiences",
      "Ask clarifying questions to help them think through it",
      "Listen quietly and offer comfort and reassurance",
      "Listen briefly then help them move toward solutions"
    ],
    points: [3, 4, 2, 1],
    category: 'analytical'
  },
  {
    id: 9,
    question: "Your communication style is most energized by:",
    options: [
      "Deep emotional conversations about feelings and dreams",
      "Interesting discussions about ideas, plans, and possibilities",
      "Heart-to-heart talks that build intimacy and connection",
      "Efficient exchanges that accomplish goals and solve problems"
    ],
    points: [4, 2, 3, 1],
    category: 'expressive'
  },
  {
    id: 10,
    question: "When you need support from your partner, you prefer they:",
    options: [
      "Let you express everything you're feeling without judgment",
      "Help you analyze the situation and brainstorm solutions",
      "Offer comfort, validation, and reassurance",
      "Give you clear advice and next steps"
    ],
    points: [3, 4, 2, 1],
    category: 'analytical'
  }
];

function getCommunicationResult(expressiveScore: number, analyticalScore: number, supportiveScore: number, directScore: number) {
  const scores = {
    expressive: expressiveScore,
    analytical: analyticalScore,
    supportive: supportiveScore,
    direct: directScore
  };
  
  const dominantStyle = Object.keys(scores).reduce((a, b) => scores[a] > scores[b] ? a : b);
  const totalScore = expressiveScore + analyticalScore + supportiveScore + directScore;
  const percentage = Math.round((scores[dominantStyle] / totalScore) * 100);
  
  const styleResults = {
    expressive: {
      title: "Expressive Communicator 🎭",
      description: "You communicate with passion, emotion, and enthusiasm. You value deep conversations and emotional connection.",
      strengths: ["Great at sharing feelings", "Emotionally supportive", "Creates deep connections", "Passionate and engaging"],
      tips: ["Practice active listening", "Give others time to process", "Consider your partner's communication pace"]
    },
    analytical: {
      title: "Analytical Communicator 🧠", 
      description: "You prefer logical, structured communication. You value clear information and practical solutions.",
      strengths: ["Clear and organized", "Great problem solver", "Reliable follow-through", "Thoughtful responses"],
      tips: ["Show more emotional warmth", "Validate feelings before offering solutions", "Be patient with emotional expressions"]
    },
    supportive: {
      title: "Supportive Communicator 🤗",
      description: "You prioritize understanding, empathy, and maintaining harmony in your communications.",
      strengths: ["Excellent listener", "Highly empathetic", "Creates safe spaces", "Great at validation"],
      tips: ["Don't avoid necessary difficult conversations", "Express your own needs clearly", "It's okay to disagree sometimes"]
    },
    direct: {
      title: "Direct Communicator ⚡",
      description: "You value efficiency, honesty, and straightforward communication. You get to the point quickly.",
      strengths: ["Clear and honest", "Efficient communicator", "Good at making decisions", "No mixed messages"],
      tips: ["Add more warmth to your tone", "Take time for emotional check-ins", "Be patient with processing time"]
    }
  };
  
  return {
    percentage,
    dominantStyle,
    ...styleResults[dominantStyle],
    scores
  };
}

export default function CommunicationStyleQuizPage() {
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
      const expressiveScore = newAnswers.filter(a => a.category === 'expressive').reduce((sum, a) => sum + a.points, 0);
      const analyticalScore = newAnswers.filter(a => a.category === 'analytical').reduce((sum, a) => sum + a.points, 0);
      const supportiveScore = newAnswers.filter(a => a.category === 'supportive').reduce((sum, a) => sum + a.points, 0);
      const directScore = newAnswers.filter(a => a.category === 'direct').reduce((sum, a) => sum + a.points, 0);
      
      const quizResult = getCommunicationResult(expressiveScore, analyticalScore, supportiveScore, directScore);
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
      <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 page-transition">
        <section className="pt-8 pb-2">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-6">
              <div className="flex justify-center mb-6">
                <div className="p-4 bg-blue-100 rounded-full card-hover">
                  <MessageCircle className="w-16 h-16 text-blue-600 icon-pulse" />
                </div>
              </div>
              <h1 className="text-4xl md:text-6xl font-playfair font-bold text-gray-900 mb-6 fade-in">
                Communication Style Quiz
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed slide-in">
                Discover your unique communication style and learn how to connect better with your partner. 
                Understanding your communication preferences can transform your relationships!
              </p>
              <div className="mt-6 px-4 py-2 bg-blue-100 dark:bg-blue-900/20 border border-blue-300 dark:border-blue-700 rounded-lg inline-block scale-in">
                <p className="text-sm text-blue-800 dark:text-blue-200">
                  💬 Communication Focus: Understand your communication patterns and build deeper connections!
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-4">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatePresence mode="wait">
              {!showResult ? (
                <motion.div
                  key={currentQuestion}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200 card-hover scale-in"
                >
                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-sm font-medium text-gray-500 slide-in">
                        Question {currentQuestion + 1} of {questions.length}
                      </span>
                      <div className="w-32 bg-gray-200 rounded-full h-2 overflow-hidden">
                        <div 
                          className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2 rounded-full progress-bar"
                          style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                    <h2 className="text-2xl font-playfair font-semibold text-gray-900 mb-6 fade-in">
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
                        className="w-full p-4 text-left bg-gray-50 hover:bg-blue-50 rounded-lg border border-gray-200 transition-all duration-200 text-gray-700 hover:border-blue-400 answer-option"
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
                  className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200 scale-in"
                >
                  <div className="text-center mb-8">
                    <div className="text-6xl mb-6 heartbeat">💬</div>
                    <h2 className="text-3xl font-playfair font-bold text-gray-900 mb-4 fade-in">
                      {result.title}
                    </h2>
                    <div className="text-4xl font-bold text-blue-600 mb-6 score-counter">
                      {result.percentage}% Match
                    </div>
                    <p className="text-lg text-gray-700 mb-8 slide-in">
                      {result.description}
                    </p>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6 mb-8">
                    <div className="bg-blue-50 rounded-xl p-6 card-hover fade-in">
                      <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                        <CheckCircle className="w-5 h-5 text-blue-600 mr-2 icon-scale" />
                        Your Strengths
                      </h3>
                      <ul className="space-y-2">
                        {result.strengths.map((strength: string, index: number) => (
                          <li key={index} className="text-gray-700 flex items-start slide-in" style={{animationDelay: `${index * 0.1}s`}}>
                            <span className="text-blue-600 mr-2">•</span>
                            {strength}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="bg-indigo-50 rounded-xl p-6 card-hover fade-in">
                      <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                        <Heart className="w-5 h-5 text-indigo-600 mr-2 icon-scale" />
                        Growth Tips
                      </h3>
                      <ul className="space-y-2">
                        {result.tips.map((tip: string, index: number) => (
                          <li key={index} className="text-gray-700 flex items-start slide-in" style={{animationDelay: `${index * 0.1}s`}}>
                            <span className="text-indigo-600 mr-2">•</span>
                            {tip}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap justify-center gap-4">
                    <button
                      onClick={resetQuiz}
                      className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-200 btn-love"
                    >
                      Take Quiz Again
                    </button>
                    <Link 
                      href="/love-calculator#calculator"
                      className="inline-flex items-center border-2 border-blue-500 text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-500 hover:text-white transition-all duration-200 btn-love"
                    >
                      Calculate Your Love Score Now
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>

        <section className="py-16 bg-white/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-playfair font-bold text-gray-900 mb-8 fade-in">
                Why Communication Style Matters
              </h2>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-white rounded-xl p-6 shadow-lg card-hover scale-in">
                  <MessageCircle className="w-12 h-12 text-blue-600 mx-auto mb-4 icon-bounce" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Better Understanding</h3>
                  <p className="text-gray-600">
                    Learn how you naturally communicate and how your partner might receive your messages.
                  </p>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-lg card-hover scale-in" style={{animationDelay: '0.1s'}}>
                  <Users className="w-12 h-12 text-blue-600 mx-auto mb-4 icon-bounce" style={{animationDelay: '0.2s'}} />
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Reduce Conflicts</h3>
                  <p className="text-gray-600">
                    Understanding different communication styles helps prevent misunderstandings and arguments.
                  </p>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-lg card-hover scale-in" style={{animationDelay: '0.2s'}}>
                  <Heart className="w-12 h-12 text-blue-600 mx-auto mb-4 icon-bounce" style={{animationDelay: '0.4s'}} />
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Stronger Connection</h3>
                  <p className="text-gray-600">
                    Adapt your communication to create deeper intimacy and connection with your partner.
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