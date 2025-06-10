'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { Users, ArrowRight, Heart, MessageCircle, Shield, CheckCircle, Scale, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Question {
  id: number;
  question: string;
  options: string[];
  points: number[];
  category: 'collaborative' | 'competing' | 'accommodating' | 'avoiding' | 'compromising';
}

const questions: Question[] = [
  {
    id: 1,
    question: "When you and your partner disagree about something important, your first instinct is to:",
    options: [
      "Find a solution that works for both of you",
      "Argue your point until they understand you're right",
      "Give in to keep the peace and avoid conflict",
      "Change the subject or walk away from the conversation",
      "Meet halfway and each compromise something"
    ],
    points: [4, 1, 2, 1, 3],
    category: 'collaborative'
  },
  {
    id: 2,
    question: "During a heated argument, you typically:",
    options: [
      "Try to understand their perspective and find common ground",
      "Get louder and more insistent about your position",
      "Back down and apologize even if you disagree",
      "Shut down emotionally and stop participating",
      "Suggest taking a break and finding a middle ground later"
    ],
    points: [4, 1, 2, 1, 3],
    category: 'collaborative'
  },
  {
    id: 3,
    question: "Your approach to winning arguments is:",
    options: [
      "Arguments should be about finding truth, not winning",
      "I usually win because I'm well-prepared and persistent",
      "I don't like winning arguments, it hurts relationships",
      "I try to avoid arguments altogether",
      "I'm willing to win some and lose some"
    ],
    points: [3, 4, 2, 1, 3],
    category: 'competing'
  },
  {
    id: 4,
    question: "When you're clearly right about something but your partner disagrees:",
    options: [
      "I focus on helping them understand my perspective",
      "I keep arguing until they admit I'm right",
      "I let them think they're right to keep harmony",
      "I drop it and move on to something else",
      "I present my case once and then let it go"
    ],
    points: [3, 4, 2, 1, 3],
    category: 'competing'
  },
  {
    id: 5,
    question: "When your partner is upset about your behavior, you tend to:",
    options: [
      "Listen carefully and work together on a solution",
      "Defend yourself and explain why you acted that way",
      "Apologize immediately and promise to change",
      "Feel overwhelmed and withdraw from the conversation",
      "Acknowledge their point and offer to meet in the middle"
    ],
    points: [3, 2, 4, 1, 3],
    category: 'accommodating'
  },
  {
    id: 6,
    question: "How often do you give in during disagreements to make your partner happy?",
    options: [
      "Sometimes, when it's truly important to them",
      "Rarely - my opinions and needs matter too",
      "Very often - their happiness is my priority",
      "I don't usually engage enough to give in",
      "About half the time - fair is fair"
    ],
    points: [3, 2, 4, 1, 3],
    category: 'accommodating'
  },
  {
    id: 7,
    question: "When conflict arises, your immediate reaction is usually to:",
    options: [
      "Stay present and work through it",
      "Engage directly and argue your case",
      "Try to make peace as quickly as possible",
      "Distance yourself physically or emotionally",
      "Look for a quick middle-ground solution"
    ],
    points: [3, 2, 3, 4, 3],
    category: 'avoiding'
  },
  {
    id: 8,
    question: "How comfortable are you with ongoing relationship tension?",
    options: [
      "I can handle it if we're working toward resolution",
      "I'm fine with it - conflict can be productive",
      "I hate it and will do anything to end it",
      "I find it overwhelming and need to escape",
      "I don't like it but can tolerate it temporarily"
    ],
    points: [3, 2, 3, 4, 3],
    category: 'avoiding'
  },
  {
    id: 9,
    question: "When you can't agree on a decision, you prefer to:",
    options: [
      "Keep discussing until we find a creative solution",
      "Present the strongest case for the best option",
      "Go with whatever makes my partner happiest",
      "Table the decision until we both feel ready",
      "Split the difference or alternate who decides"
    ],
    points: [3, 2, 3, 4, 4],
    category: 'compromising'
  },
  {
    id: 10,
    question: "Your ideal approach to resolving relationship problems is:",
    options: [
      "Open dialogue where we both share and problem-solve",
      "Present strong arguments and reach the right conclusion",
      "Focus on understanding and supporting each other",
      "Give each other space and let time heal things",
      "Negotiate fair trades and compromises"
    ],
    points: [4, 2, 3, 1, 4],
    category: 'compromising'
  }
];

function getConflictStyleResult(collaborativeScore: number, competingScore: number, accommodatingScore: number, avoidingScore: number, compromisingScore: number) {
  const scores = {
    collaborative: collaborativeScore,
    competing: competingScore,
    accommodating: accommodatingScore,
    avoiding: avoidingScore,
    compromising: compromisingScore
  };
  
  const sortedStyles = Object.entries(scores).sort(([,a], [,b]) => b - a);
  const primaryStyle = sortedStyles[0][0];
  const totalScore = collaborativeScore + competingScore + accommodatingScore + avoidingScore + compromisingScore;
  const percentage = Math.round((scores[primaryStyle] / totalScore) * 100);
  
  const styleResults = {
    collaborative: {
      title: "Collaborative Problem-Solver 🤝",
      description: "You believe in working together to find win-win solutions. You value both your needs and your partner's equally.",
      strengths: ["Great at finding creative solutions", "Values both perspectives", "Builds stronger relationships", "Addresses root causes"],
      challenges: ["Can take more time", "May avoid quick decisions", "Requires partner cooperation", "Can be exhausting"],
      tips: ["Continue nurturing this healthy approach", "Be patient when your partner needs time", "Don't force collaboration when quick decisions are needed"],
      partnerAdvice: ["Appreciate their commitment to fairness", "Engage openly in problem-solving", "Give them time to work through issues together"]
    },
    competing: {
      title: "Direct Competitor 🏆",
      description: "You prefer to stand firm on your positions and advocate strongly for your viewpoint. You value being right and winning.",
      strengths: ["Clear about your needs", "Decisive in tough situations", "Stands up for important values", "Gets results quickly"],
      challenges: ["May damage relationship harmony", "Can escalate conflicts", "Partner may feel unheard", "May miss compromise opportunities"],
      tips: ["Practice active listening", "Consider your partner's feelings", "Choose your battles wisely", "Ask questions instead of just arguing"],
      partnerAdvice: ["Stand your ground on important issues", "Help them see your perspective", "Appreciate their passion and commitment"]
    },
    accommodating: {
      title: "Harmony Keeper 🕊️",
      description: "You prioritize relationship peace and your partner's happiness. You're willing to sacrifice your preferences for harmony.",
      strengths: ["Maintains relationship peace", "Shows love through sacrifice", "Avoids destructive conflicts", "Creates safe emotional space"],
      challenges: ["Your needs may go unmet", "Can build resentment over time", "Problems may not get fully resolved", "Partner may not know your true feelings"],
      tips: ["Practice expressing your needs", "Set healthy boundaries", "Address issues before they build up", "Remember your opinions matter too"],
      partnerAdvice: ["Encourage them to share their true feelings", "Check in on their needs regularly", "Don't take advantage of their accommodation"]
    },
    avoiding: {
      title: "Conflict Avoider 🚪",
      description: "You prefer to step away from conflicts and let tensions resolve naturally. You need space to process emotions.",
      strengths: ["Prevents escalation", "Gives time for emotions to cool", "Avoids saying hurtful things", "Can provide valuable perspective"],
      challenges: ["Problems may not get resolved", "Partner may feel ignored", "Issues can build up over time", "May miss opportunities for growth"],
      tips: ["Schedule specific times to discuss issues", "Practice staying present for short periods", "Communicate your need for space", "Return to address problems after cooling off"],
      partnerAdvice: ["Give them space when they need it", "Schedule calm times to discuss issues", "Be patient with their processing time"]
    },
    compromising: {
      title: "Fair Negotiator ⚖️",
      description: "You believe in fairness and finding middle ground. You're willing to give some to get some in most situations.",
      strengths: ["Creates fair outcomes", "Quick resolution", "Both parties get something", "Practical and realistic"],
      challenges: ["May not address deeper issues", "Both parties may feel unsatisfied", "Can become routine rather than thoughtful", "May avoid dealing with core problems"],
      tips: ["Sometimes dig deeper for win-win solutions", "Make sure compromises feel fair to both", "Address underlying needs, not just surface issues"],
      partnerAdvice: ["Appreciate their fairness", "Speak up when compromises don't feel balanced", "Work together on more collaborative solutions sometimes"]
    }
  };
  
  return {
    percentage,
    primaryStyle,
    ...styleResults[primaryStyle],
    scores,
    sortedStyles: sortedStyles.map(([style, score]) => ({ 
      style, 
      score, 
      percentage: Math.round((score / totalScore) * 100) 
    }))
  };
}

export default function ConflictResolutionStylePage() {
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
      const collaborativeScore = newAnswers.filter(a => a.category === 'collaborative').reduce((sum, a) => sum + a.points, 0);
      const competingScore = newAnswers.filter(a => a.category === 'competing').reduce((sum, a) => sum + a.points, 0);
      const accommodatingScore = newAnswers.filter(a => a.category === 'accommodating').reduce((sum, a) => sum + a.points, 0);
      const avoidingScore = newAnswers.filter(a => a.category === 'avoiding').reduce((sum, a) => sum + a.points, 0);
      const compromisingScore = newAnswers.filter(a => a.category === 'compromising').reduce((sum, a) => sum + a.points, 0);
      
      const quizResult = getConflictStyleResult(collaborativeScore, competingScore, accommodatingScore, avoidingScore, compromisingScore);
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

  const getStyleEmoji = (style: string) => {
    const emojis = {
      collaborative: "🤝",
      competing: "🏆",
      accommodating: "🕊️",
      avoiding: "🚪",
      compromising: "⚖️"
    };
    return emojis[style] || "💭";
  };

  const getStyleName = (style: string) => {
    const names = {
      collaborative: 'Collaborative',
      competing: 'Competing',
      accommodating: 'Accommodating',
      avoiding: 'Avoiding',
      compromising: 'Compromising'
    };
    return names[style] || style;
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        {/* Hero Section */}
        <section className="pt-8 pb-2">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-6">
              <Users className="w-16 h-16 mx-auto mb-6 text-indigo-500" />
              <h1 className="text-4xl md:text-6xl font-playfair font-bold text-gray-900 dark:text-white mb-6">
                Conflict Resolution Style Quiz
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Learn how you handle disagreements and discover better ways to resolve conflicts in your relationships. 
                Take this quiz to improve your conflict resolution skills and build stronger connections!
              </p>
              <div className="mt-6 px-4 py-2 bg-indigo-100 dark:bg-indigo-900/20 border border-indigo-300 dark:border-indigo-700 rounded-lg inline-block">
                <p className="text-sm text-indigo-800 dark:text-indigo-200">
                  🤝 <strong>Conflict Focus:</strong> Transform disagreements into opportunities for deeper connection!
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
                          className="bg-gradient-to-r from-indigo-500 to-purple-600 h-2 rounded-full transition-all duration-300"
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
                        className="w-full p-4 text-left bg-gray-50 hover:bg-indigo-50 rounded-lg border border-gray-200 transition-all duration-200 text-gray-700 hover:border-indigo-400"
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
                    <div className="text-6xl mb-6">{getStyleEmoji(result.primaryStyle)}</div>
                    <h2 className="text-3xl font-playfair font-bold text-gray-900 mb-4">
                      {result.title}
                    </h2>
                    <div className="text-4xl font-bold text-indigo-600 mb-6">
                      {result.percentage}% Primary Style
                    </div>
                    <p className="text-lg text-gray-700 mb-8">
                      {result.description}
                    </p>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6 mb-8">
                    <div className="bg-indigo-50 rounded-xl p-6">
                      <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                        <CheckCircle className="w-5 h-5 text-indigo-600 mr-2" />
                        Your Strengths
                      </h3>
                      <ul className="space-y-2">
                        {result.strengths.map((strength: string, index: number) => (
                          <li key={index} className="text-gray-700 flex items-start">
                            <span className="text-indigo-600 mr-2">•</span>
                            {strength}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="bg-purple-50 rounded-xl p-6">
                      <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                        <Zap className="w-5 h-5 text-purple-600 mr-2" />
                        Growth Areas
                      </h3>
                      <ul className="space-y-2">
                        {result.challenges.map((challenge: string, index: number) => (
                          <li key={index} className="text-gray-700 flex items-start">
                            <span className="text-purple-600 mr-2">•</span>
                            {challenge}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6 mb-8">
                    <div className="bg-blue-50 rounded-xl p-6">
                      <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                        <Shield className="w-5 h-5 text-blue-600 mr-2" />
                        Tips for You
                      </h3>
                      <ul className="space-y-2">
                        {result.tips.map((tip: string, index: number) => (
                          <li key={index} className="text-gray-700 flex items-start">
                            <span className="text-blue-600 mr-2">•</span>
                            {tip}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="bg-green-50 rounded-xl p-6">
                      <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                        <Heart className="w-5 h-5 text-green-600 mr-2" />
                        For Your Partner
                      </h3>
                      <ul className="space-y-2">
                        {result.partnerAdvice.map((advice: string, index: number) => (
                          <li key={index} className="text-gray-700 flex items-start">
                            <span className="text-green-600 mr-2">•</span>
                            {advice}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-6 mb-8">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Your Conflict Style Breakdown</h3>
                    <div className="space-y-3">
                      {result.sortedStyles.map((styleData: any, index: number) => (
                        <div key={styleData.style} className="flex items-center justify-between">
                          <div className="flex items-center">
                            <span className="text-xl mr-3">{getStyleEmoji(styleData.style)}</span>
                            <span className="font-medium text-gray-900">{getStyleName(styleData.style)}</span>
                          </div>
                          <div className="flex items-center">
                            <div className="w-24 bg-gray-200 rounded-full h-2 mr-3">
                              <div 
                                className="bg-gradient-to-r from-indigo-500 to-purple-600 h-2 rounded-full"
                                style={{ width: `${styleData.percentage}%` }}
                              ></div>
                            </div>
                            <span className="text-sm font-medium text-gray-600">{styleData.percentage}%</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap justify-center gap-4">
                    <button
                      onClick={resetQuiz}
                      className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-200"
                    >
                      Take Quiz Again
                    </button>
                    <Link 
                      href="/love-calculator#calculator"
                      className="inline-flex items-center border-2 border-indigo-500 text-indigo-600 px-6 py-3 rounded-lg font-semibold hover:bg-indigo-500 hover:text-white transition-all duration-200"
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
              What You'll Discover About Your Conflict Resolution Style
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-indigo-100 dark:bg-indigo-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🎭</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  Your Conflict Style
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Identify your primary approach to handling disagreements and understand your natural tendencies.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-indigo-100 dark:bg-indigo-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🛠️</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  Resolution Strategies
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Learn effective techniques for resolving conflicts in a healthy and constructive manner.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-indigo-100 dark:bg-indigo-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">💪</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  Relationship Strengthening
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Transform conflicts into opportunities for deeper understanding and stronger connections.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 bg-white/50 dark:bg-gray-800/50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-playfair font-bold text-gray-900 dark:text-white mb-8 text-center">
              Why Understanding Conflict Styles Matters
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  🌟 Better Communication
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Understanding your conflict style helps you communicate more effectively during disagreements 
                  and avoid destructive patterns.
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  💝 Stronger Relationships
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Learning to resolve conflicts constructively leads to deeper trust, understanding, 
                  and intimacy in your relationships.
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  🧠 Personal Growth
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Awareness of your conflict patterns helps you develop emotional intelligence 
                  and become a more mature partner.
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  🎯 Faster Resolution
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Knowing effective resolution strategies helps you address conflicts quickly 
                  before they escalate and damage the relationship.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Other Quizzes */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-playfair font-bold text-gray-900 dark:text-white mb-8">
              Complete Your Relationship Profile
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

        {/* Why Conflict Resolution Matters - MOVED BELOW QUIZ */}
        <section className="py-16 bg-white/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-playfair font-bold text-gray-900 mb-8">
                Why Conflict Resolution Matters
              </h2>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <Users className="w-12 h-12 text-indigo-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Stronger Relationships</h3>
                  <p className="text-gray-600">
                    Healthy conflict resolution builds trust and deepens intimacy rather than damaging relationships.
                  </p>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <Scale className="w-12 h-12 text-indigo-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Fair Solutions</h3>
                  <p className="text-gray-600">
                    Understanding different styles helps create solutions that work for both partners' needs.
                  </p>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <Heart className="w-12 h-12 text-indigo-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Emotional Safety</h3>
                  <p className="text-gray-600">
                    Good conflict skills create emotional safety where both partners feel heard and valued.
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