import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { Heart, Users, Smile, Zap, MessageCircle, Target, Gift, Clock, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Love Calculator - Advanced Affinity Quotient Technology & Scientific Compatibility',
  description: 'Discover the science behind Love Calculator\'s exclusive Affinity Quotient algorithm. Learn how our literature-based approach revolutionizes compatibility analysis with advanced multi-metric scoring.',
  keywords: ['about love calculator', 'affinity quotient technology', 'scientific compatibility analysis', 'advanced love algorithm', 'relationship science'],
  alternates: {
    canonical: '/about',
  },
  openGraph: {
    title: 'About Love Calculator - Advanced Affinity Quotient Technology & Scientific Compatibility',
    description: 'Discover the revolutionary Affinity Quotient technology powering the world\'s most sophisticated love calculator.',
    url: '/about',
    type: 'website',
  },
};

export default function AboutPage() {
  const features = [
    {
      icon: Heart,
      title: "Love Calculator",
      description: "Our flagship Affinity Quotient (AQ) powered calculator with 5-metric analysis, visual breakdowns, and scientific methodology.",
      color: "text-purple-600",
      href: "/love-calculator",
      featured: true
    },
    {
      icon: MessageCircle,
      title: "Communication Style Quiz",
      description: "Discover whether you're expressive, analytical, supportive, or direct in your communication.",
      color: "text-blue-600",
      href: "/communication-style-quiz"
    },
    {
      icon: Gift,
      title: "Love Language Assessment",
      description: "Find out your primary love language and learn how you best give and receive love.",
      color: "text-rose-600",
      href: "/love-language-assessment"
    },
    {
      icon: Target,
      title: "Future Goals Compatibility",
      description: "See how aligned your life goals and dreams are across career, family, and lifestyle.",
      color: "text-emerald-600",
      href: "/future-goals-compatibility"
    },
    {
      icon: Users,
      title: "Conflict Resolution Style Quiz",
      description: "Learn your approach to handling disagreements and discover better resolution strategies.",
      color: "text-indigo-600",
      href: "/conflict-resolution-style"
    },
    {
      icon: Smile,
      title: "Relationship Quiz",
      description: "Take our comprehensive relationship compatibility quiz for personalized insights.",
      color: "text-purple-600",
      href: "/relationship-quiz"
    }
  ];

  const values = [
    {
      icon: Smile,
      title: "Pure Entertainment",
      description: "We believe relationships should be fun! Our tools are designed purely for entertainment and social sharing."
    },
    {
      icon: Heart,
      title: "Spreading Joy",
      description: "We want to bring smiles, spark conversations, and create moments of joy between people."
    },
    {
      icon: Users,
      title: "Bringing People Together",
      description: "Our quizzes and calculators are perfect icebreakers that help people connect and share laughs."
    },
    {
      icon: Zap,
      title: "Instant Fun",
      description: "Quick, engaging, and shareable results that you can enjoy and share with friends immediately."
    }
  ];

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50 page-transition">
        {/* Hero Section */}
        <section className="pt-8 pb-2">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-6">
              <div className="flex justify-center mb-6">
                <div className="p-4 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full card-hover">
                  <Heart className="w-16 h-16 text-purple-600 heartbeat" />
                </div>
              </div>
              <div className="inline-flex items-center bg-gradient-to-r from-emerald-100 to-blue-100 border border-emerald-200 rounded-full px-4 py-2 mb-4 fade-in">
                <span className="text-emerald-800 text-sm font-semibold">🔬 Powered by Advanced AQ Technology</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-playfair font-bold love-gradient-text mb-6 fade-in">
                About Love Calculator
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed slide-in">
                We're revolutionizing relationship compatibility analysis with our exclusive <strong>Affinity Quotient (AQ) algorithm</strong> – 
                the world's most sophisticated love calculator powered by advanced academic research, linguistic analysis, and scientific methodology.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-4 text-sm text-gray-600">
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                  Literature-Based Technology
                </div>
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  5-Metric Scientific Analysis
                </div>
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                  Advanced Visualization
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* AQ Technology Spotlight */}
        <section className="py-8">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200 rounded-2xl p-8 mb-8 card-hover scale-in">
              <div className="text-center">
                <h2 className="text-2xl md:text-3xl font-playfair font-bold text-gray-900 mb-4">
                  🧬 The Affinity Quotient Revolution
                </h2>
                <p className="text-lg text-gray-700 mb-6 max-w-4xl mx-auto">
                  Unlike basic love calculators that use simple formulas, our <strong>Affinity Quotient (AQ) algorithm</strong>{' '}
                  represents a breakthrough in compatibility analysis. We've combined academic research in linguistics, 
                  psychology, and numerology to create the most sophisticated love compatibility engine ever built.
                </p>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-white rounded-lg p-6 shadow-sm">
                    <div className="text-3xl mb-3">🎯</div>
                    <h3 className="font-semibold text-gray-900 mb-2">5-Metric Analysis</h3>
                    <p className="text-sm text-gray-600">Advanced scoring across multiple scientific dimensions</p>
                  </div>
                  <div className="bg-white rounded-lg p-6 shadow-sm">
                    <div className="text-3xl mb-3">📊</div>
                    <h3 className="font-semibold text-gray-900 mb-2">Visual Insights</h3>
                    <p className="text-sm text-gray-600">Interactive breakdowns showing exactly how scores are calculated</p>
                  </div>
                  <div className="bg-white rounded-lg p-6 shadow-sm">
                    <div className="text-3xl mb-3">🔬</div>
                    <h3 className="font-semibold text-gray-900 mb-2">Research-Based</h3>
                    <p className="text-sm text-gray-600">Grounded in academic literature and proven methodologies</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-4">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200 card-hover scale-in">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-playfair font-bold text-gray-900 mb-6 fade-in">
                  Our Mission: Advancing Compatibility Science
                </h2>
                <p className="text-lg text-gray-700 mb-6 slide-in">
                  Love Calculator exists to bridge the gap between entertainment and science in relationship compatibility. 
                  Our <strong>Affinity Quotient technology</strong> delivers both engaging experiences and meaningful insights, 
                  setting a new standard for what love calculators can achieve.
                </p>
                <div className="bg-gradient-to-r from-pink-100 to-purple-100 rounded-xl p-6">
                  <div className="text-4xl mb-4 heartbeat">🧬</div>
                  <p className="text-gray-700 font-medium">
                    "Revolutionizing compatibility analysis through advanced technology and scientific rigor."
                  </p>
                </div>
                <div className="mt-8 grid md:grid-cols-2 gap-6 text-left">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">🎯 What Sets Us Apart</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• First literature-based love calculator</li>
                      <li>• Advanced multi-metric analysis</li>
                      <li>• Interactive visual breakdowns</li>
                      <li>• Research-backed methodology</li>
                    </ul>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">💡 The AQ Advantage</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Phonetic harmony analysis</li>
                      <li>• 26-dimensional letter vectors</li>
                      <li>• Psychological first impressions</li>
                      <li>• Numerological precision</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* What We Offer Section */}
        <section className="py-16 bg-white/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-playfair font-bold text-gray-900 mb-8 fade-in">
                What We Offer
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto slide-in">
                Discover our collection of fun, entertaining tools designed to bring joy to your relationships.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <Link
                  key={feature.title}
                  href={feature.href}
                  className={`relative bg-white rounded-xl p-6 shadow-lg card-hover scale-in transition-all duration-200 hover:shadow-xl ${
                    feature.featured 
                      ? 'ring-2 ring-purple-200 bg-gradient-to-br from-purple-50 to-pink-50 md:col-span-2 lg:col-span-1 transform hover:scale-105' 
                      : ''
                  }`}
                  style={{animationDelay: `${index * 0.1}s`}}
                >
                  {feature.featured && (
                    <div className="absolute -top-3 -right-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                      🔬 NEW
                    </div>
                  )}
                  <feature.icon className={`w-12 h-12 ${feature.color} mx-auto mb-4 icon-bounce`} />
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 text-center">{feature.title}</h3>
                  <p className="text-gray-600 text-center">
                    {feature.description}
                  </p>
                  {feature.featured && (
                    <div className="mt-4 text-center">
                      <span className="inline-flex items-center text-sm font-medium text-purple-600">
                        Powered by AQ Technology
                        <span className="ml-1">🧬</span>
                      </span>
                    </div>
                  )}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Our Values Section */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-playfair font-bold text-gray-900 mb-8 fade-in">
                Our Values
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto slide-in">
                These core values guide everything we create and every experience we design.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              {values.map((value, index) => (
                <div 
                  key={value.title} 
                  className="bg-gradient-to-br from-white to-gray-50 rounded-xl p-8 shadow-lg card-hover fade-in"
                  style={{animationDelay: `${index * 0.15}s`}}
                >
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <value.icon className="w-8 h-8 text-pink-600 icon-scale" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-3">{value.title}</h3>
                      <p className="text-gray-700">
                        {value.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="py-16 bg-gradient-to-r from-pink-100 to-purple-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-playfair font-bold text-gray-900 mb-8 fade-in">
                Why Choose Love Calculator?
              </h2>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-white rounded-xl p-6 shadow-lg card-hover scale-in">
                  <div className="text-4xl mb-4 heartbeat">🧬</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Advanced AQ Technology</h3>
                  <p className="text-gray-600">
                    The world's first literature-based love calculator with 5-metric scientific analysis and visual breakdowns.
                  </p>
                </div>
                
                <div className="bg-white rounded-xl p-6 shadow-lg card-hover scale-in" style={{animationDelay: '0.1s'}}>
                  <div className="text-4xl mb-4 icon-bounce">📊</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Interactive Insights</h3>
                  <p className="text-gray-600">
                    See exactly how your compatibility is calculated with beautiful charts and detailed explanations.
                  </p>
                </div>
                
                <div className="bg-white rounded-xl p-6 shadow-lg card-hover scale-in" style={{animationDelay: '0.2s'}}>
                  <div className="text-4xl mb-4 icon-pulse">⚡</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Premium Features Free</h3>
                  <p className="text-gray-600">
                    Access advanced scientific analysis, visual breakdowns, and premium insights - completely free!
                  </p>
                </div>
              </div>
              <div className="mt-12 bg-white rounded-2xl p-8 shadow-lg">
                <h3 className="text-2xl font-playfair font-bold text-gray-900 mb-4">
                  🔬 The Science Behind Our Success
                </h3>
                <p className="text-gray-700 mb-6">
                  Our <strong>Affinity Quotient algorithm</strong> analyzes compatibility across five scientific dimensions:
                  phonetic harmony, letter frequency patterns, psychological impressions, numerological compatibility, and vowel balance.
                </p>
                <div className="grid md:grid-cols-2 gap-6 text-left">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">🎯 Precision Analysis</h4>
                    <p className="text-sm text-gray-600">Multi-dimensional scoring system based on academic research</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">📈 Visual Intelligence</h4>
                    <p className="text-sm text-gray-600">Interactive charts and breakdowns show exactly how scores are calculated</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Entertainment Disclaimer */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-8 text-center scale-in">
              <div className="text-4xl mb-4 icon-bounce">🎭</div>
              <h3 className="text-2xl font-playfair font-semibold text-gray-900 mb-4">
                Pure Entertainment & Fun!
              </h3>
              <p className="text-lg text-gray-700 mb-6">
                Love Calculator is designed purely for entertainment, social sharing, and fun. Our tools are not 
                intended as relationship advice or predictions. We're all about bringing joy, 
                sparking conversations, and creating moments of laughter and connection.
              </p>
              <p className="text-gray-600">
                Think of us as your go-to source for relationship entertainment - perfect for parties, 
                social media content, icebreakers, and just having fun with friends!
              </p>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-playfair font-bold text-gray-900 mb-8 fade-in">
              Experience the AQ Advantage
            </h2>
            <p className="text-xl text-gray-600 mb-8 slide-in">
              Join thousands who've discovered the power of our revolutionary <strong>Affinity Quotient technology</strong>. 
              Get scientific insights, visual breakdowns, and premium analysis that no other love calculator can match.
            </p>
            
            <div className="space-y-4">
              <Link 
                href="/love-calculator"
                className="inline-flex items-center bg-gradient-to-r from-[var(--love-pink)] to-[var(--love-purple)] text-white px-8 py-4 rounded-lg font-semibold text-lg hover:shadow-lg transition-all duration-200 btn-love"
              >
                <Heart className="w-5 h-5 mr-2 heartbeat" />
                Try Love Calculator
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
              
              <div className="mt-4">
                <Link 
                  href="/communication-style-quiz"
                  className="inline-flex items-center border-2 border-[var(--love-pink)] text-[var(--love-pink)] px-6 py-3 rounded-lg font-semibold hover:bg-[var(--love-pink)] hover:text-white transition-all duration-200 btn-love"
                >
                  Explore More Tools
                </Link>
              </div>
            </div>
            
            <div className="mt-8 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-200">
              <div className="flex items-center justify-center space-x-6 text-sm text-gray-600">
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  5-Metric Analysis
                </div>
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                  Visual Breakdowns
                </div>
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                  100% Free
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