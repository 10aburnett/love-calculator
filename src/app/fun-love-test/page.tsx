import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import LoveCalculator from '@/components/LoveCalculator';
import Link from 'next/link';
import { Heart, ArrowRight, Smile, Zap, Share2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Fun Love Test - Entertaining Relationship Quiz Free Online',
  description: 'Take our fun love test for entertaining relationship insights! Free online love quiz with instant results, perfect for sharing with friends on social media.',
  keywords: ['fun love test', 'entertaining love quiz', 'relationship test', 'love quiz'],
  alternates: {
    canonical: '/fun-love-test',
  },
  openGraph: {
    title: 'Fun Love Test - Entertaining Relationship Quiz Free Online',
    description: 'Take our fun love test for entertaining relationship insights!',
    url: '/fun-love-test',
    type: 'website',
  },
};

export default function FunLoveTestPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-orange-50">
        {/* Hero Section */}
        <section className="pt-8 pb-2">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-6">
              <h1 className="text-4xl md:text-6xl font-playfair font-bold love-gradient-text mb-6">
                Fun Love Test
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Looking for a fun and entertaining way to test your love? Our playful love test 
                is perfect for couples, friends, and anyone curious about relationship compatibility!
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

        <section className="py-16 bg-white/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-playfair font-bold text-gray-900 mb-8">
                Why Our Fun Love Test is Perfect for You
              </h2>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <Smile className="w-12 h-12 text-[var(--love-pink)] mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Entertaining</h3>
                  <p className="text-gray-600">
                    Designed to be fun and lighthearted while providing meaningful results.
                  </p>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <Zap className="w-12 h-12 text-[var(--love-pink)] mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Instant Results</h3>
                  <p className="text-gray-600">
                    Get your love compatibility score immediately with no waiting time.
                  </p>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <Share2 className="w-12 h-12 text-[var(--love-pink)] mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Shareable</h3>
                  <p className="text-gray-600">
                    Perfect for social media sharing and starting conversations with friends.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-gradient-to-r from-yellow-100 to-orange-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-playfair font-bold text-gray-900 mb-8">
                Perfect for Social Media Fun
              </h2>
              <p className="text-lg text-gray-700 mb-8">
                Our fun love test results are designed to be engaging and shareable. Create content 
                that your friends will love to see and interact with!
              </p>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Great for TikTok</h3>
                  <p className="text-gray-600">
                    Create engaging TikTok content by testing celebrity couples or fictional characters!
                  </p>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Instagram Stories</h3>
                  <p className="text-gray-600">
                    Download beautiful result images perfect for Instagram stories and posts.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-playfair font-bold text-gray-900 mb-8">
              Start Your Fun Love Test Today!
            </h2>
            <Link 
              href="#calculator"
              className="inline-flex items-center bg-gradient-to-r from-[var(--love-pink)] to-[var(--love-purple)] text-white px-8 py-4 rounded-lg font-semibold text-lg hover:shadow-lg transition-all duration-200 pulse-love"
            >
              <Heart className="w-5 h-5 mr-2" />
              Calculate Your Love Score Now
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
} 