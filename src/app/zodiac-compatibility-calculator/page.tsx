import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ZodiacCompatibilityCalculator from '@/components/ZodiacCompatibilityCalculator';
import { Heart, Star } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Zodiac Compatibility Calculator - Love Calculator',
  description: 'Discover your astrological love compatibility! Our Zodiac Compatibility Calculator analyzes star signs, elements, and planetary influences for detailed relationship insights.',
  keywords: ['zodiac compatibility', 'star sign love test', 'astrology compatibility', 'horoscope love calculator', 'astrological matching'],
  alternates: {
    canonical: '/zodiac-compatibility-calculator',
  },
  openGraph: {
    title: 'Zodiac Compatibility Calculator - Astrological Love Matching',
    description: 'Find out your zodiac love compatibility! Analyze star signs, elements, and planetary influences for entertaining astrological insights.',
    url: '/zodiac-compatibility-calculator',
    type: 'website',
  },
};

export default function ZodiacCompatibilityCalculatorPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        {/* Hero Section */}
        <section className="pt-12 pb-2">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h1 className="text-4xl md:text-5xl font-playfair font-bold love-gradient-text mb-6">
                Zodiac Compatibility Calculator
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Unlock the secrets of astrological love! Our zodiac calculator analyzes star signs, elements, 
                planetary rulers, and cosmic energies to reveal your celestial compatibility.
              </p>
            </div>
          </div>
        </section>

        {/* Calculator Section */}
        <section id="calculator" className="pb-1">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <ZodiacCompatibilityCalculator />
          </div>
        </section>

        {/* Info Section */}
        <section className="py-2 bg-white/50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  ⭐ How It Works
                </h3>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li><strong>Star Sign Harmony:</strong> Classic zodiac compatibility patterns</li>
                  <li><strong>Elemental Balance:</strong> Fire, Earth, Air, and Water interactions</li>
                  <li><strong>Modality Matching:</strong> Cardinal, Fixed, and Mutable energy alignment</li>
                  <li><strong>Planetary Influence:</strong> Ruling planet compatibility analysis</li>
                  <li><strong>Cosmic Aspects:</strong> Opposition, trine, and square relationships</li>
                </ul>
              </div>
              
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  🔮 Astrological Insights
                </h3>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li>• Detailed compatibility breakdown with cosmic chart</li>
                  <li>• Element and modality interaction analysis</li>
                  <li>• Planetary ruler harmony assessment</li>
                  <li>• Classic astrological relationship patterns</li>
                  <li>• Perfect for astrology enthusiasts and social sharing!</li>
                </ul>
              </div>
            </div>
            
            <div className="mt-8 text-center">
              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
                <div className="flex items-center justify-center mb-4">
                  <Heart className="w-6 h-6 text-[var(--love-pink)] mr-3" />
                  <h3 className="text-xl font-playfair font-semibold text-gray-900">
                    Entertainment Only
                  </h3>
                </div>
                <p className="text-gray-700">
                  <strong>Important:</strong> This is a fun activity designed for entertainment and social sharing, not actual dating or relationship advice!
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Algorithm Highlight Section */}
        <section className="py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200 rounded-2xl p-8">
              <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-2xl md:text-3xl font-playfair font-bold text-gray-900 mb-4">
                  ⭐ Powered by Celestial Harmony Algorithm
                </h2>
                <p className="text-lg text-gray-700 mb-6">
                  Unlike simple zodiac matchers, our advanced <strong>Celestial Harmony Algorithm</strong> analyzes your compatibility across 
                  <strong> five astrological dimensions</strong> including traditional sign harmony, elemental balance, 
                  modality synchronization, planetary influences, and cosmic aspect relationships.
                </p>
                <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center">
                    <span className="w-2 h-2 bg-indigo-500 rounded-full mr-2"></span>
                    Traditional Astrology-Based
                  </div>
                  <div className="flex items-center">
                    <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                    Elemental & Planetary Analysis
                  </div>
                  <div className="flex items-center">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                    5-Factor Cosmic Scoring
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How Our Algorithm Works */}
        <section className="py-8 bg-white/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-playfair font-bold text-gray-900 mb-8 text-center fade-in">
                How Our Zodiac Compatibility Algorithm Works
              </h2>
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="slide-in">
                  <p className="text-lg text-gray-700 mb-6">
                    Our exclusive <strong>Celestial Harmony Algorithm</strong> represents a breakthrough in 
                    astrological compatibility analysis. Unlike basic sign matching that only considers sun signs, our 
                    system applies traditional astrology principles across multiple cosmic dimensions.
                  </p>
                  <p className="text-lg text-gray-700 mb-6">
                    We analyze zodiac signs across <strong>five astrological factors</strong> to create a comprehensive 
                    compatibility profile that considers elemental harmony, modality synchronization, planetary rulers, 
                    and traditional aspect relationships between signs.
                  </p>
                  <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
                    <p className="text-sm text-indigo-800">
                      <strong>Astrological Foundation:</strong> Our algorithm incorporates classical astrology principles, 
                      elemental theory, planetary rulerships, and traditional aspect relationships for authentic cosmic analysis.
                    </p>
                  </div>
                </div>
                <div className="slide-in">
                  <div className="bg-gradient-to-br from-indigo-100 to-purple-100 rounded-2xl p-8">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Zodiac Analysis Process</h3>
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-indigo-500 rounded-full flex items-center justify-center text-white font-bold text-sm mr-3 shrink-0">1</div>
                        <span className="text-gray-700">Analyze traditional sign compatibility patterns</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm mr-3 shrink-0">2</div>
                        <span className="text-gray-700">Calculate elemental harmony (Fire, Earth, Air, Water)</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm mr-3 shrink-0">3</div>
                        <span className="text-gray-700">Evaluate modality synchronization</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-sm mr-3 shrink-0">4</div>
                        <span className="text-gray-700">Assess planetary ruler relationships</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-sm mr-3 shrink-0">5</div>
                        <span className="text-gray-700">Calculate cosmic aspect dynamics</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Five Pillars of Analysis */}
        <section className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-playfair font-bold text-gray-900 mb-12 text-center">
                The Five Pillars of Zodiac Compatibility Analysis
              </h2>
              <div className="grid md:grid-cols-5 gap-6">
                <div className="bg-white rounded-xl p-6 shadow-lg text-center">
                  <div className="w-14 h-14 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4 shrink-0">
                    <span className="text-indigo-600 font-bold text-xl">♈</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Sign Harmony</h3>
                  <p className="text-sm text-gray-600">Traditional zodiac compatibility patterns and classical relationships</p>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-lg text-center">
                  <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4 shrink-0">
                    <span className="text-red-600 font-bold text-xl">🔥</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Elemental Balance</h3>
                  <p className="text-sm text-gray-600">Fire, Earth, Air, and Water element interactions and harmony</p>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-lg text-center">
                  <div className="w-14 h-14 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4 shrink-0">
                    <span className="text-purple-600 font-bold text-xl">⚡</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Modality Matching</h3>
                  <p className="text-sm text-gray-600">Cardinal, Fixed, and Mutable energy pattern synchronization</p>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-lg text-center">
                  <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 shrink-0">
                    <span className="text-blue-600 font-bold text-xl">🪐</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Planetary Sync</h3>
                  <p className="text-sm text-gray-600">Ruling planet relationships and celestial influence harmony</p>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-lg text-center">
                  <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 shrink-0">
                    <span className="text-green-600 font-bold text-xl">✨</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Cosmic Aspects</h3>
                  <p className="text-sm text-gray-600">Trine, sextile, opposition, and square relationship dynamics</p>
                </div>
              </div>
              
              <div className="mt-12 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-8">
                <h3 className="text-2xl font-playfair font-bold text-gray-900 mb-4 text-center">
                  Why Zodiac Compatibility Matters
                </h3>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">⭐ Astrological Wisdom</h4>
                    <p className="text-gray-700 mb-4">
                      Astrology has been used for millennia to understand personality traits and relationship dynamics. 
                      Our algorithm captures these time-tested patterns to assess cosmic compatibility.
                    </p>
                    <h4 className="font-semibold text-gray-900 mb-3">🔥 Elemental Chemistry</h4>
                    <p className="text-gray-700">
                      The four elements (Fire, Earth, Air, Water) represent fundamental energy types that interact 
                      in predictable ways, creating harmony or tension in relationships.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">🪐 Planetary Influences</h4>
                    <p className="text-gray-700 mb-4">
                      Each zodiac sign is ruled by specific planets that influence personality traits and relationship styles. 
                      Compatible planetary rulers create natural understanding and attraction.
                    </p>
                    <h4 className="font-semibold text-gray-900 mb-3">🌟 Cosmic Timing</h4>
                    <p className="text-gray-700">
                      The angular relationships between zodiac signs create specific energetic dynamics, 
                      from harmonious trines to challenging squares, each with unique compatibility implications.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Zodiac Compatibility Test Online Section */}
        <section className="py-8 bg-white/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-playfair font-bold text-gray-900 mb-8">
              Zodiac Compatibility Test Online
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Ready to discover your astrological compatibility? Our online zodiac calculator is completely free and 
              provides instant results with detailed cosmic analysis. Unlock your celestial connection now!
            </p>
            <div className="space-y-4">
              <a 
                href="#calculator"
                className="inline-flex items-center bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:shadow-lg transition-all duration-200"
              >
                <Star className="w-5 h-5 mr-2" />
                Calculate Your Zodiac Compatibility Now
                <span className="w-5 h-5 ml-2">→</span>
              </a>
            </div>
          </div>
        </section>

        {/* Features and Benefits */}
        <section className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-playfair font-bold text-gray-900 mb-8 text-center">
                Why Choose Our Zodiac Calculator?
              </h2>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">📚</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Traditional Astrology</h3>
                  <p className="text-gray-600">
                    Based on classical astrological principles, elemental theory, and traditional planetary 
                    rulerships for authentic cosmic analysis.
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🌟</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Comprehensive Analysis</h3>
                  <p className="text-gray-600">
                    Get visual charts and detailed breakdowns across five astrological dimensions 
                    with personalized cosmic insights for your relationship.
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">✨</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Cosmic Entertainment</h3>
                  <p className="text-gray-600">
                    Perfect for astrology enthusiasts, social sharing, and fun conversations about 
                    star signs. Instant celestial insights you can share!
                  </p>
                </div>
              </div>
              
              <div className="mt-12 text-center">
                <p className="text-lg text-gray-700">
                  Zodiac compatibility is a captivating way to explore relationship dynamics through the wisdom of the stars. 
                  It's an entertaining tool that combines ancient astrological knowledge with modern analysis for cosmic insights into your connections!
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
} 