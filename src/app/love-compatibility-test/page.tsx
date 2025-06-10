import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import LoveCalculator from '@/components/LoveCalculator';
import Link from 'next/link';
import { Heart, ArrowRight, Sparkles, Users, Gift } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Love Compatibility Test - Free Fun Relationship Quiz Online',
  description: 'Take our free love compatibility test for entertaining relationship insights! Fun online love quiz with instant results - perfect for sharing with friends.',
  keywords: ['love compatibility test', 'relationship quiz', 'fun love test', 'compatibility quiz'],
  alternates: {
    canonical: '/love-compatibility-test',
  },
  openGraph: {
    title: 'Love Compatibility Test - Free Fun Relationship Quiz Online',
    description: 'Take our free love compatibility test for entertaining relationship insights!',
    url: '/love-compatibility-test',
    type: 'website',
  },
};

export default function LoveCompatibilityTestPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
        <section className="pt-8 pb-2">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-6">
              <h1 className="text-4xl md:text-6xl font-playfair font-bold love-gradient-text mb-6">
                Love Compatibility Test
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Take our entertaining love compatibility test and discover your relationship fun factor! 
                Get instant results perfect for sharing with friends and on social media.
              </p>
            </div>
          </div>
        </section>

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

        <section className="py-16 bg-white/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-playfair font-bold text-gray-900 mb-12 text-center">
                Why Take Our Fun Love Test?
              </h2>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
                  <Sparkles className="w-12 h-12 text-[var(--love-pink)] mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Pure Entertainment</h3>
                  <p className="text-gray-600">
                    Designed for fun and entertainment, perfect for sparking conversations and laughter with friends.
                  </p>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
                  <Gift className="w-12 h-12 text-[var(--love-pink)] mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Instant Fun Results</h3>
                  <p className="text-gray-600">
                    Get entertaining compatibility results instantly that are perfect for sharing on social media.
                  </p>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
                  <Users className="w-12 h-12 text-[var(--love-pink)] mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Social Sharing</h3>
                  <p className="text-gray-600">
                    Create engaging content for your social media with beautiful, shareable results.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-gradient-to-r from-pink-100 to-purple-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-playfair font-bold text-gray-900 mb-8">
              More Fun Relationship Activities
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Explore more entertaining ways to have fun with relationships and compatibility!
            </p>
            <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
              <Link 
                href="/relationship-quiz"
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200"
              >
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Relationship Quiz
                </h3>
                <p className="text-gray-600 mb-4">
                  Take our fun 8-question quiz for entertaining relationship insights.
                </p>
                <div className="inline-flex items-center text-[var(--love-pink)] font-medium">
                  Start Quiz <ArrowRight className="w-4 h-4 ml-2" />
                </div>
              </Link>
              <Link 
                href="/name-compatibility"
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200"
              >
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Name Compatibility
                </h3>
                <p className="text-gray-600 mb-4">
                  Discover your name compatibility for fun and social sharing.
                </p>
                <div className="inline-flex items-center text-[var(--love-pink)] font-medium">
                  Try Now <ArrowRight className="w-4 h-4 ml-2" />
                </div>
              </Link>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-8">
              <h3 className="text-2xl font-playfair font-semibold text-gray-900 mb-4">
                Just for Fun! 🎉
              </h3>
              <p className="text-gray-700 text-lg">
                Our love compatibility test is designed purely for entertainment and social sharing. 
                It's a fun way to spark conversations, create social media content, and have a laugh with friends. 
                Results are not intended as relationship advice or predictions.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
} 