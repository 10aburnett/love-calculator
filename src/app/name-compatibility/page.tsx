import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import LoveCalculator from '@/components/LoveCalculator';
import Link from 'next/link';
import { Heart, ArrowRight, Sparkles, Users, Gift } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Name Compatibility Calculator - Fun Name Match Test Free',
  description: 'Discover your name compatibility with our entertaining name match calculator! Fun online test with instant results perfect for sharing with friends.',
  keywords: ['name compatibility', 'name match test', 'fun name calculator', 'name compatibility test'],
  alternates: {
    canonical: '/name-compatibility',
  },
  openGraph: {
    title: 'Name Compatibility Calculator - Fun Name Match Test Free',
    description: 'Test your name compatibility for fun entertainment and social sharing!',
    url: '/name-compatibility',
    type: 'website',
  },
};

export default function NameCompatibilityPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50">
        {/* Hero Section */}
        <section className="pt-8 pb-2">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-6">
              <h1 className="text-4xl md:text-6xl font-playfair font-bold love-gradient-text mb-6">
                Name Compatibility Calculator
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Discover your name compatibility with our fun and entertaining name match calculator! 
                Perfect for creating shareable content and sparking conversations with friends.
              </p>
            </div>
          </div>
        </section>

        {/* Main Calculator Section - MOVED TO TOP */}
        <section id="calculator" className="py-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <LoveCalculator />
          </div>
        </section>

        {/* Entertainment Disclaimer */}
        <section className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="max-w-3xl mx-auto">
              <div className="px-4 py-2 bg-yellow-100 border border-yellow-300 rounded-lg inline-block">
                <p className="text-sm text-yellow-800">
                  🎉 <strong>For Entertainment Only:</strong> This is a fun activity designed for entertainment and social sharing, not actual dating or relationship advice!
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-16 bg-white/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-playfair font-bold text-gray-900 mb-8 text-center">
                How Our Fun Name Calculator Works
              </h2>
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <p className="text-lg text-gray-700 mb-6">
                    Our entertaining name compatibility calculator uses a fun mathematical approach 
                    to generate compatibility percentages between two names. It creates consistent 
                    results that are perfect for sharing and guaranteed to spark conversations!
                  </p>
                  <p className="text-lg text-gray-700 mb-6">
                    While name compatibility tests have been popular forms of entertainment for 
                    generations, our modern version is designed purely for fun, social sharing, 
                    and creating memorable moments with friends.
                  </p>
                  <div className="flex items-center space-x-4 text-[var(--love-pink)]">
                    <Heart className="w-6 h-6" />
                    <span className="text-gray-700">100% free and fun to use</span>
                  </div>
                </div>
                <div className="text-center">
                  <div className="bg-gradient-to-br from-indigo-100 to-blue-100 rounded-2xl p-8">
                    <div className="text-6xl mb-4">💫</div>
                    <p className="text-gray-700 font-medium">
                      Enter names → Get instant fun results → Share with friends!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-white/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-playfair font-bold text-gray-900 mb-8">
                Why Our Name Calculator Is Perfect for Fun
              </h2>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
                  <Sparkles className="w-12 h-12 text-[var(--love-pink)] mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Entertaining Results</h3>
                  <p className="text-gray-600">
                    Get fun compatibility percentages that create perfect conversation starters.
                  </p>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
                  <Gift className="w-12 h-12 text-[var(--love-pink)] mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Consistent Fun</h3>
                  <p className="text-gray-600">
                    The same name combination always gives the same entertaining result for reliability.
                  </p>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
                  <Users className="w-12 h-12 text-[var(--love-pink)] mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Social Sharing</h3>
                  <p className="text-gray-600">
                    Generate beautiful images perfect for sharing on Instagram, TikTok, and other platforms.
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

        {/* Fun Ideas Section */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-playfair font-bold text-gray-900 mb-8">
              Fun Ways to Use Name Compatibility
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto mb-12">
              <div className="bg-gradient-to-br from-pink-100 to-purple-100 rounded-xl p-6">
                <div className="text-4xl mb-3">👥</div>
                <h3 className="font-semibold text-gray-900 mb-2">Friend Groups</h3>
                <p className="text-sm text-gray-600">Test all your friends' names together</p>
              </div>
              <div className="bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl p-6">
                <div className="text-4xl mb-3">⭐</div>
                <h3 className="font-semibold text-gray-900 mb-2">Celebrity Couples</h3>
                <p className="text-sm text-gray-600">Try famous celebrity name combinations</p>
              </div>
              <div className="bg-gradient-to-br from-green-100 to-emerald-100 rounded-xl p-6">
                <div className="text-4xl mb-3">📱</div>
                <h3 className="font-semibold text-gray-900 mb-2">Social Content</h3>
                <p className="text-sm text-gray-600">Create engaging posts for your socials</p>
              </div>
              <div className="bg-gradient-to-br from-yellow-100 to-orange-100 rounded-xl p-6">
                <div className="text-4xl mb-3">🎉</div>
                <h3 className="font-semibold text-gray-900 mb-2">Party Games</h3>
                <p className="text-sm text-gray-600">Fun activity for parties and gatherings</p>
              </div>
            </div>

            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Ready to discover your name compatibility? Our fun calculator provides instant entertainment 
              with features like celebrity easter eggs, sharing options, and beautiful result displays.
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

        {/* Related Tools Section */}
        <section className="py-16 bg-gradient-to-r from-indigo-100 to-blue-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-playfair font-bold text-gray-900 mb-8">
              More Fun Compatibility Tools
            </h2>
            <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
              <Link 
                href="/love-compatibility-test"
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200"
              >
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Love Compatibility Test
                </h3>
                <p className="text-gray-600 mb-4">
                  Take our comprehensive compatibility test for more entertainment.
                </p>
                <div className="inline-flex items-center text-[var(--love-pink)] font-medium">
                  Try Test <ArrowRight className="w-4 h-4 ml-2" />
                </div>
              </Link>
              <Link 
                href="/relationship-quiz"
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200"
              >
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Relationship Quiz
                </h3>
                <p className="text-gray-600 mb-4">
                  Answer fun questions about your relationship for entertaining insights.
                </p>
                <div className="inline-flex items-center text-[var(--love-pink)] font-medium">
                  Start Quiz <ArrowRight className="w-4 h-4 ml-2" />
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* Disclaimer Section */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-8">
              <h3 className="text-2xl font-playfair font-semibold text-gray-900 mb-4">
                Just for Fun! 🎊
              </h3>
              <p className="text-gray-700 text-lg">
                Our name compatibility calculator is designed purely for entertainment and social sharing. 
                It's a fun way to create content, spark conversations, and have a laugh with friends. 
                Results are not meant as relationship advice or predictions about actual compatibility.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
} 