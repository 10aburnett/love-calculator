import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import DateOfBirthCalculator from '@/components/DateOfBirthCalculator';
import { Heart, Calendar } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Date of Birth Compatibility Calculator - Love Calculator',
  description: 'Discover your love compatibility based on your birth dates! Our Date of Birth Compatibility Calculator analyzes birth date patterns, age differences, and numerological factors for fun relationship insights.',
  keywords: ['date of birth calculator', 'birthday compatibility', 'birth date love test', 'numerology love calculator', 'age compatibility test'],
  alternates: {
    canonical: '/date-of-birth-calculator',
  },
  openGraph: {
    title: 'Date of Birth Compatibility Calculator - Test Birthday Compatibility',
    description: 'Find out your love compatibility based on birth dates! Analyze birthday patterns and numerological factors for entertaining relationship insights.',
    url: '/date-of-birth-calculator',
    type: 'website',
  },
};

export default function DateOfBirthCalculatorPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-purple-50">
        {/* Hero Section */}
        <section className="pt-12 pb-2">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h1 className="text-4xl md:text-5xl font-playfair font-bold love-gradient-text mb-6">
                Date of Birth Compatibility Calculator
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Discover your romantic compatibility based on your birth dates! Our algorithm analyzes birthday patterns, 
                age differences, and numerological factors to reveal fascinating relationship insights.
              </p>
            </div>
          </div>
        </section>

        {/* Calculator Section */}
        <section id="calculator" className="pb-1">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <DateOfBirthCalculator />
          </div>
        </section>

        {/* Info Section */}
        <section className="py-2 bg-white/50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  🎂 How It Works
                </h3>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li><strong>Age Harmony:</strong> Analyzes age differences and life stage compatibility</li>
                  <li><strong>Birth Month Patterns:</strong> Seasonal personality traits and compatibility</li>
                  <li><strong>Day Numerology:</strong> Life path numbers derived from birth dates</li>
                  <li><strong>Astrological Elements:</strong> Hidden connections between birth periods</li>
                  <li><strong>Cosmic Cycles:</strong> Birth year patterns and generational harmony</li>
                </ul>
              </div>
              
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  ✨ What You'll Discover
                </h3>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li>• Detailed compatibility breakdown with visual chart</li>
                  <li>• Age difference analysis and life stage alignment</li>
                  <li>• Birth month personality insights and seasonal harmony</li>
                  <li>• Numerological life path compatibility</li>
                  <li>• Perfect for sharing on social media!</li>
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
            <div className="bg-gradient-to-r from-rose-50 to-pink-50 border border-rose-200 rounded-2xl p-8">
              <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-2xl md:text-3xl font-playfair font-bold text-gray-900 mb-4">
                  🎂 Powered by Birthday Harmony Algorithm
                </h2>
                <p className="text-lg text-gray-700 mb-6">
                  Unlike simple date calculators, our advanced <strong>Birthday Harmony Algorithm</strong> analyzes your compatibility across 
                  <strong> five temporal dimensions</strong> including age synchronization, seasonal personality patterns, 
                  numerological life paths, cosmic birth cycles, and generational energy matching.
                </p>
                <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center">
                    <span className="w-2 h-2 bg-rose-500 rounded-full mr-2"></span>
                    Numerology-Based Analysis
                  </div>
                  <div className="flex items-center">
                    <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                    Seasonal Psychology Patterns
                  </div>
                  <div className="flex items-center">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                    5-Factor Temporal Scoring
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
                How Our Birthday Compatibility Algorithm Works
              </h2>
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="slide-in">
                  <p className="text-lg text-gray-700 mb-6">
                    Our exclusive <strong>Birthday Harmony Algorithm</strong> represents a breakthrough in 
                    temporal compatibility analysis. Unlike basic date calculators that use simple arithmetic, our 
                    system applies academic research in chronobiology, numerology, and seasonal psychology.
                  </p>
                  <p className="text-lg text-gray-700 mb-6">
                    We analyze birth dates across <strong>five scientific dimensions</strong> to create a comprehensive 
                    compatibility profile that considers not just when you were born, but how those cosmic timing 
                    patterns influence your relationship potential.
                  </p>
                  <div className="bg-rose-50 border border-rose-200 rounded-lg p-4">
                    <p className="text-sm text-rose-800">
                      <strong>Academic Foundation:</strong> Our algorithm incorporates principles from chronobiology research, 
                      traditional numerology systems, and seasonal personality studies to provide scientifically-informed entertainment.
                    </p>
                  </div>
                </div>
                <div className="slide-in">
                  <div className="bg-gradient-to-br from-rose-100 to-purple-100 rounded-2xl p-8">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Birth Date Analysis Process</h3>
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-rose-500 rounded-full flex items-center justify-center text-white font-bold text-sm mr-3 shrink-0">1</div>
                        <span className="text-gray-700">Extract temporal patterns from birth dates</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm mr-3 shrink-0">2</div>
                        <span className="text-gray-700">Calculate numerological life paths</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm mr-3 shrink-0">3</div>
                        <span className="text-gray-700">Analyze seasonal personality alignment</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-sm mr-3 shrink-0">4</div>
                        <span className="text-gray-700">Evaluate generational harmony</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-sm mr-3 shrink-0">5</div>
                        <span className="text-gray-700">Generate comprehensive compatibility score</span>
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
                The Five Pillars of Birthday Compatibility Analysis
              </h2>
              <div className="grid md:grid-cols-5 gap-6">
                <div className="bg-white rounded-xl p-6 shadow-lg text-center">
                  <div className="w-14 h-14 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4 shrink-0">
                    <span className="text-rose-600 font-bold text-xl">🎯</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Age Harmony</h3>
                  <p className="text-sm text-gray-600">Life stage alignment and generational compatibility analysis</p>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-lg text-center">
                  <div className="w-14 h-14 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4 shrink-0">
                    <span className="text-orange-600 font-bold text-xl">🌸</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Seasonal Patterns</h3>
                  <p className="text-sm text-gray-600">Birth month personality traits and seasonal energy matching</p>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-lg text-center">
                  <div className="w-14 h-14 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4 shrink-0">
                    <span className="text-purple-600 font-bold text-xl">🔢</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Numerological Paths</h3>
                  <p className="text-sm text-gray-600">Life path number compatibility using ancient numerology</p>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-lg text-center">
                  <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 shrink-0">
                    <span className="text-blue-600 font-bold text-xl">✨</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Cosmic Sync</h3>
                  <p className="text-sm text-gray-600">Birth day patterns and celestial timing alignment</p>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-lg text-center">
                  <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 shrink-0">
                    <span className="text-green-600 font-bold text-xl">🌍</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Generational Energy</h3>
                  <p className="text-sm text-gray-600">Birth year cohort analysis and era-based compatibility</p>
                </div>
              </div>
              
              <div className="mt-12 bg-gradient-to-r from-rose-50 to-purple-50 rounded-2xl p-8">
                <h3 className="text-2xl font-playfair font-bold text-gray-900 mb-4 text-center">
                  Why Birthday Compatibility Matters
                </h3>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">🎂 Temporal Psychology</h4>
                    <p className="text-gray-700 mb-4">
                      Research in chronobiology suggests that birth timing can influence personality traits, energy levels, 
                      and life perspectives. Our algorithm captures these temporal patterns to assess compatibility.
                    </p>
                    <h4 className="font-semibold text-gray-900 mb-3">📅 Life Stage Synchronization</h4>
                    <p className="text-gray-700">
                      Age differences and generational alignment play crucial roles in relationship dynamics. 
                      We analyze these factors to predict harmony in life goals and experiences.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">🔢 Numerological Wisdom</h4>
                    <p className="text-gray-700 mb-4">
                      Ancient numerology systems have tracked life path compatibility for millennia. 
                      Our algorithm incorporates these time-tested principles for deeper insights.
                    </p>
                    <h4 className="font-semibold text-gray-900 mb-3">🌱 Seasonal Influences</h4>
                    <p className="text-gray-700">
                      Birth season affects everything from vitamin D exposure to early life experiences. 
                      These subtle influences can shape personality and relationship preferences.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Birthday Compatibility Test Online Section */}
        <section className="py-8 bg-white/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-playfair font-bold text-gray-900 mb-8">
              Birthday Compatibility Test Online
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Ready to discover your birth date compatibility? Our online birthday calculator is completely free and 
              provides instant results with detailed analysis. Test your temporal harmony now!
            </p>
            <div className="space-y-4">
              <a 
                href="#calculator"
                className="inline-flex items-center bg-gradient-to-r from-rose-500 to-purple-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:shadow-lg transition-all duration-200"
              >
                <Calendar className="w-5 h-5 mr-2" />
                Calculate Your Birthday Compatibility Now
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
                Why Choose Our Birthday Calculator?
              </h2>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🧠</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Scientific Foundation</h3>
                  <p className="text-gray-600">
                    Based on chronobiology research, numerology principles, and seasonal psychology studies 
                    for comprehensive temporal analysis.
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">📊</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Detailed Breakdown</h3>
                  <p className="text-gray-600">
                    Get visual charts and detailed analysis across five compatibility dimensions 
                    with personalized insights for your relationship.
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🎉</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Social Sharing</h3>
                  <p className="text-gray-600">
                    Perfect for social media sharing, party games, and fun conversations with friends. 
                    Instant results you can share anywhere!
                  </p>
                </div>
              </div>
              
              <div className="mt-12 text-center">
                <p className="text-lg text-gray-700">
                  Birthday compatibility is a fascinating way to explore relationship dynamics through the lens of time and cosmic timing. 
                  It's an entertaining tool that combines ancient wisdom with modern analysis for fun insights into your connections!
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