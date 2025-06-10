import type { Metadata } from 'next';
import LoveCalculator from '@/components/LoveCalculator';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { Heart, ArrowRight, Users, Share2, MessageCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Love Calculator – Advanced Affinity Quotient Algorithm | Science-Based Compatibility',
  description: 'Experience the world\'s most sophisticated Love Calculator powered by the Affinity Quotient algorithm. Get scientific compatibility analysis with detailed breakdowns, literature-based scoring, and premium insights.',
  keywords: ['love calculator', 'affinity quotient', 'scientific compatibility test', 'advanced love algorithm', 'name compatibility analysis', 'relationship science'],
  alternates: {
    canonical: '/love-calculator',
  },
  openGraph: {
    title: 'Love Calculator – Advanced Affinity Quotient Algorithm | Science-Based Compatibility',
    description: 'The world\'s most sophisticated Love Calculator featuring the exclusive Affinity Quotient algorithm for scientific compatibility analysis.',
    url: '/love-calculator',
    type: 'website',
  },
};

export default function LoveCalculatorPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50 page-transition">
        {/* Hero Section */}
        <section className="pt-8 pb-2">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-6">
              <h1 className="text-4xl md:text-6xl font-playfair font-bold love-gradient-text mb-4 fade-in">
                Love Calculator
              </h1>
              <div className="flex justify-center mb-6 fade-in">
                <div className="inline-flex items-center bg-gradient-to-r from-amber-100 to-yellow-100 border border-amber-200 rounded-full px-4 py-2">
                  <span className="text-amber-800 text-sm font-semibold">🔬 NEW: Powered by Affinity Quotient Algorithm</span>
                </div>
              </div>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed slide-in">
                Experience the world's most sophisticated love compatibility calculator powered by our exclusive 
                <strong> Affinity Quotient (AQ) algorithm</strong>. Get scientific analysis with detailed breakdowns 
                of your compatibility across multiple dimensions.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-4 text-sm text-gray-600">
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  Literature-Based Algorithm
                </div>
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                  Visual Breakdown Analysis
                </div>
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                  5-Metric Scientific Scoring
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Calculator Section */}
        <section id="calculator" className="py-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <LoveCalculator />
          </div>
        </section>

        {/* Premium Features Highlight */}
        <section className="py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200 rounded-2xl p-8">
              <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-2xl md:text-3xl font-playfair font-bold text-gray-900 mb-4">
                  🧬 Powered by Affinity Quotient Technology
                </h2>
                <p className="text-lg text-gray-700 mb-6">
                  Unlike simple love calculators, our advanced AQ algorithm analyzes your compatibility across 
                  <strong> five scientific dimensions</strong> including phonetic harmony, letter frequency patterns, 
                  numerological compatibility, vowel balance, and psychological first impressions.
                </p>
                <div className="grid md:grid-cols-3 gap-6 mt-8">
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <div className="text-2xl mb-2">📊</div>
                    <h3 className="font-semibold text-gray-900 mb-1">Visual Breakdown</h3>
                    <p className="text-sm text-gray-600">See exactly how your score is calculated with interactive charts</p>
                  </div>
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <div className="text-2xl mb-2">🔬</div>
                    <h3 className="font-semibold text-gray-900 mb-1">Scientific Method</h3>
                    <p className="text-sm text-gray-600">Based on linguistic research and compatibility studies</p>
                  </div>
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <div className="text-2xl mb-2">🎯</div>
                    <h3 className="font-semibold text-gray-900 mb-1">Precision Analysis</h3>
                    <p className="text-sm text-gray-600">Multi-metric scoring for comprehensive insights</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How the Advanced Algorithm Works Section */}
        <section className="py-8 bg-white/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-playfair font-bold text-gray-900 mb-8 text-center fade-in">
                How Our Advanced Algorithm Works
              </h2>
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="slide-in">
                  <p className="text-lg text-gray-700 mb-6">
                    Our exclusive <strong>Affinity Quotient (AQ) algorithm</strong> represents a breakthrough in 
                    compatibility analysis. Unlike basic name calculators that use simple hash functions, our 
                    system applies academic research in linguistics, psychology, and numerology.
                  </p>
                  <p className="text-lg text-gray-700 mb-6">
                    We analyze names across <strong>five scientific dimensions</strong> to create a comprehensive 
                    compatibility profile that considers not just letters, but linguistic patterns, phonetic 
                    harmony, and numerological significance.
                  </p>
                  <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
                    <p className="text-sm text-indigo-800">
                      <strong>Academic Foundation:</strong> Our algorithm incorporates principles from published 
                      linguistic research, phonetic analysis, and mathematical compatibility theory.
                    </p>
                  </div>
                </div>
                <div className="text-center scale-in">
                  <div className="bg-gradient-to-br from-pink-100 to-purple-100 rounded-2xl p-8 card-hover">
                    <div className="text-6xl mb-4 heartbeat">🧬</div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      The AQ Difference
                    </h3>
                    <p className="text-gray-700 font-medium">
                      Analyze → Visualize → Understand
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 5 Metrics Explained */}
        <section className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-playfair font-bold text-gray-900 mb-12 text-center">
                The Five Pillars of Compatibility Analysis
              </h2>
              <div className="grid md:grid-cols-5 gap-6">
                <div className="bg-white rounded-xl p-6 shadow-lg text-center">
                  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-red-600 font-bold">S</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Initial Similarity</h3>
                  <p className="text-sm text-gray-600">First letter psychology and instant impression compatibility</p>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-lg text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-blue-600 font-bold">L</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Letter Frequency</h3>
                  <p className="text-sm text-gray-600">26-dimensional vector analysis of linguistic patterns</p>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-lg text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-green-600 font-bold">P</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Phonetic Harmony</h3>
                  <p className="text-sm text-gray-600">Sound-based matching and auditory compatibility</p>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-lg text-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-purple-600 font-bold">N</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Numerological</h3>
                  <p className="text-sm text-gray-600">Ancient numerology with mathematical precision</p>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-lg text-center">
                  <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-yellow-600 font-bold">B</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Vowel Balance</h3>
                  <p className="text-sm text-gray-600">Rhythm, flow, and auditory harmony analysis</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Entertainment Disclaimer */}
        <section className="py-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="max-w-3xl mx-auto">
              <div className="px-4 py-2 bg-yellow-100 border border-yellow-300 rounded-lg inline-block scale-in">
                <p className="text-sm text-yellow-800">
                  🎉 <strong>For Entertainment Only:</strong> This is a fun activity designed for entertainment and social sharing, not actual dating or relationship advice!
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Name Compatibility Explained Section */}
        <section className="py-8 bg-white/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-playfair font-bold text-gray-900 mb-8">
                Name Compatibility Explained
              </h2>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <Users className="w-12 h-12 text-[var(--love-pink)] mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Fun Entertainment</h3>
                  <p className="text-gray-600">
                    Our playful approach creates entertaining compatibility scores perfect for social sharing.
                  </p>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <Heart className="w-12 h-12 text-[var(--love-pink)] mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Consistent Results</h3>
                  <p className="text-gray-600">
                    The same name combination will always produce the same love percentage for reliability.
                  </p>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <Share2 className="w-12 h-12 text-[var(--love-pink)] mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Shareable Fun</h3>
                  <p className="text-gray-600">
                    Generate beautiful images of your results to share on social media and with friends.
                  </p>
                </div>
              </div>
              <p className="text-lg text-gray-700 mt-8">
                Name compatibility is a playful and entertaining way to test relationships and spark conversations. 
                It's a great icebreaker and entertainment tool for parties, social media, and fun times with friends!
              </p>
            </div>
          </div>
        </section>

        {/* Love Compatibility Test Online Section */}
        <section className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-playfair font-bold text-gray-900 mb-8">
              Love Compatibility Test Online
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Ready to discover your love compatibility? Our online love calculator is completely free and 
              provides instant results. Test your relationship compatibility now and see what the stars have in store!
            </p>
            <div className="space-y-4">
              <Link 
                href="#calculator"
                className="inline-flex items-center bg-gradient-to-r from-[var(--love-pink)] to-[var(--love-purple)] text-white px-8 py-4 rounded-lg font-semibold text-lg hover:shadow-lg transition-all duration-200 pulse-love"
              >
                <Heart className="w-5 h-5 mr-2" />
                Calculate Your Love Score Now
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </div>
          </div>
        </section>

        {/* Fun Love Test to Share Section */}
        <section className="py-8 bg-gradient-to-r from-pink-100 to-purple-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-playfair font-bold text-gray-900 mb-8">
                Fun Love Test to Share With Friends
              </h2>
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="text-left">
                  <p className="text-lg text-gray-700 mb-6">
                    Our love calculator isn't just fun for you – it's perfect for sharing! Generate beautiful 
                    result images that look great on Instagram, TikTok, Twitter, and other social platforms.
                  </p>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-center">
                      <Heart className="w-5 h-5 text-[var(--love-pink)] mr-3" />
                      Download shareable images
                    </li>
                    <li className="flex items-center">
                      <Heart className="w-5 h-5 text-[var(--love-pink)] mr-3" />
                      Share directly to social media
                    </li>
                    <li className="flex items-center">
                      <Heart className="w-5 h-5 text-[var(--love-pink)] mr-3" />
                      Perfect for TikTok content
                    </li>
                    <li className="flex items-center">
                      <Heart className="w-5 h-5 text-[var(--love-pink)] mr-3" />
                      Start conversations with friends
                    </li>
                  </ul>
                </div>
                <div className="text-center">
                  <div className="bg-white rounded-2xl p-8 shadow-xl">
                    <div className="text-5xl mb-4">📱</div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      Share Your Results
                    </h3>
                    <p className="text-gray-600">
                      Turn your love score into viral content!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Relationship Quiz Section */}
        <section className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-playfair font-bold text-gray-900 mb-8">
              Relationship Quiz – Are You a Perfect Match?
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Want more than just a love calculator? Take our comprehensive relationship quiz to dive deeper 
              into your compatibility and discover what makes your relationship unique.
            </p>
            <Link 
              href="/relationship-quiz"
              className="inline-flex items-center border-2 border-[var(--love-pink)] text-[var(--love-pink)] px-6 py-3 rounded-lg font-semibold hover:bg-[var(--love-pink)] hover:text-white transition-all duration-200"
            >
              Take the Quiz
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
} 