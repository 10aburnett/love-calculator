'use client';

import { useTranslations } from '@/hooks/useTranslations';
import ZodiacCompatibilityCalculator from '@/components/ZodiacCompatibilityCalculator';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { Star, Heart, ArrowRight, Sparkles, Book, Users } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ZodiacCompatibilityCalculatorPageContent() {
  const { t } = useTranslations();

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50 page-transition">
        {/* Hero Section */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="pt-8 pb-2"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-6">
              <motion.div 
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                className="w-16 h-16 mx-auto mb-6"
              >
                <Star className="w-16 h-16 text-purple-600" />
              </motion.div>
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-playfair font-bold text-gray-900 mb-6 fade-in break-words hyphens-auto"
              >
                {t('zodiacCalculator.title')}
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed slide-in"
              >
                {t('zodiacCalculator.description')}
              </motion.p>
            </div>
          </div>
        </motion.section>

        {/* Calculator Section */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          id="calculator" 
          className="pb-8"
        >
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <ZodiacCompatibilityCalculator />
          </div>
        </motion.section>

        {/* Why Choose Our Zodiac Calculator */}
        <section className="py-12 bg-white/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-playfair font-bold text-gray-900 mb-12 text-center fade-in">
                {t('zodiacCalculator.whyChooseOurZodiacCalculatorTitle')}
              </h2>
              
              <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-white rounded-2xl p-8 shadow-lg text-center card-hover">
                  <Book className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">{t('zodiacCalculator.traditionalAstrologyTitle')}</h3>
                  <p className="text-gray-600">{t('zodiacCalculator.traditionalAstrologyDescription')}</p>
                </div>

                <div className="bg-white rounded-2xl p-8 shadow-lg text-center card-hover">
                  <Sparkles className="w-12 h-12 text-indigo-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">{t('zodiacCalculator.comprehensiveAnalysisTitle')}</h3>
                  <p className="text-gray-600">{t('zodiacCalculator.comprehensiveAnalysisDescription')}</p>
                </div>

                <div className="bg-white rounded-2xl p-8 shadow-lg text-center card-hover">
                  <Users className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">{t('zodiacCalculator.cosmicEntertainmentTitle')}</h3>
                  <p className="text-gray-600">{t('zodiacCalculator.cosmicEntertainmentDescription')}</p>
                </div>
              </div>

              <div className="text-center mt-12">
                <p className="text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed">
                  {t('zodiacCalculator.zodiacCompatibilityDescription')}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How Zodiac Compatibility Algorithm Works */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-playfair font-bold text-gray-900 mb-8 text-center fade-in">
                {t('zodiacCalculator.howAlgorithmWorksTitle')}
              </h2>
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="slide-in">
                  <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                    {t('zodiacCalculator.exclusiveCelestialHarmonyAlgorithm')}
                  </p>
                  <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                    {t('zodiacCalculator.systemAppliesTraditionalAstrology')}
                  </p>
                  <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
                    <p className="text-sm text-purple-800">
                      <strong>{t('zodiacCalculator.astrologicalFoundation')}:</strong> {t('zodiacCalculator.algorithmIncorporates')}
                    </p>
                  </div>
                </div>
                
                <div className="slide-in delay-200">
                  <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
                    <h3 className="text-xl font-semibold text-gray-900 mb-6">{t('zodiacCalculator.zodiacAnalysisProcessTitle')}</h3>
                    <div className="space-y-3">
                      <div className="flex items-start">
                        <span className="w-10 h-10 bg-pink-100 text-pink-600 rounded-full flex items-center justify-center text-sm font-semibold mr-3 mt-1 flex-shrink-0">1</span>
                        <span className="text-gray-700">{t('zodiacCalculator.analyzeTraditionalSignCompatibilityPatterns')}</span>
                      </div>
                      <div className="flex items-start">
                        <span className="w-10 h-10 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-sm font-semibold mr-3 mt-1 flex-shrink-0">2</span>
                        <span className="text-gray-700">{t('zodiacCalculator.calculateElementalHarmony')}</span>
                      </div>
                      <div className="flex items-start">
                        <span className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-semibold mr-3 mt-1 flex-shrink-0">3</span>
                        <span className="text-gray-700">{t('zodiacCalculator.evaluateModalitySynchronization')}</span>
                      </div>
                      <div className="flex items-start">
                        <span className="w-10 h-10 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm font-semibold mr-3 mt-1 flex-shrink-0">4</span>
                        <span className="text-gray-700">{t('zodiacCalculator.assessPlanetaryRulerRelationships')}</span>
                      </div>
                      <div className="flex items-start">
                        <span className="w-10 h-10 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-sm font-semibold mr-3 mt-1 flex-shrink-0">5</span>
                        <span className="text-gray-700">{t('zodiacCalculator.calculateCosmicAspectDynamics')}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Five Pillars of Zodiac Compatibility Analysis */}
        <section className="py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-playfair font-bold text-gray-900 mb-12 text-center fade-in">
                {t('zodiacCalculator.fivePillarsTitle')}
              </h2>
              
              <div className="grid md:grid-cols-5 gap-6 mb-12">
                <div className="bg-purple-50 rounded-2xl p-6 text-center card-hover">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">♌</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">{t('zodiacCalculator.signHarmonyTitle')}</h3>
                  <p className="text-sm text-gray-600">{t('zodiacCalculator.traditionalZodiacCompatibilityPatterns')}</p>
                </div>

                <div className="bg-red-50 rounded-2xl p-6 text-center card-hover">
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🔥</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">{t('zodiacCalculator.elementalBalance')}</h3>
                  <p className="text-sm text-gray-600">{t('zodiacCalculator.fireEarthAirWaterElementInteractions')}</p>
                </div>

                <div className="bg-blue-50 rounded-2xl p-6 text-center card-hover">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">⚡</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">{t('zodiacCalculator.modalityMatching')}</h3>
                  <p className="text-sm text-gray-600">{t('zodiacCalculator.cardinalFixedMutableEnergyPatternSynchronization')}</p>
                </div>

                <div className="bg-indigo-50 rounded-2xl p-6 text-center card-hover">
                  <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🪐</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">{t('zodiacCalculator.planetarySyncTitle')}</h3>
                  <p className="text-sm text-gray-600">{t('zodiacCalculator.rulingPlanetRelationships')}</p>
                </div>

                <div className="bg-green-50 rounded-2xl p-6 text-center card-hover">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">✨</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">{t('zodiacCalculator.cosmicAspects')}</h3>
                  <p className="text-sm text-gray-600">{t('zodiacCalculator.trineSextileOppositionSquareRelationshipDynamics')}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Zodiac Compatibility Matters */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-playfair font-bold text-gray-900 mb-12 text-center fade-in">
                {t('zodiacCalculator.whyZodiacCompatibilityMattersTitle')}
              </h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white rounded-2xl p-8 shadow-lg">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">{t('zodiacCalculator.astrologicalWisdom')}</h3>
                  <p className="text-gray-700 leading-relaxed">{t('zodiacCalculator.astrologicalWisdomDescription')}</p>
                </div>

                <div className="bg-white rounded-2xl p-8 shadow-lg">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">{t('zodiacCalculator.planetaryInfluences')}</h3>
                  <p className="text-gray-700 leading-relaxed">{t('zodiacCalculator.planetaryInfluencesDescription')}</p>
                </div>

                <div className="bg-white rounded-2xl p-8 shadow-lg">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">{t('zodiacCalculator.elementalChemistry')}</h3>
                  <p className="text-gray-700 leading-relaxed">{t('zodiacCalculator.elementalChemistryDescription')}</p>
                </div>

                <div className="bg-white rounded-2xl p-8 shadow-lg">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">{t('zodiacCalculator.cosmicTiming')}</h3>
                  <p className="text-gray-700 leading-relaxed">{t('zodiacCalculator.cosmicTimingDescription')}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Powered by Celestial Harmony Algorithm */}
        <section className="py-12 bg-gradient-to-r from-purple-50 to-indigo-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-playfair font-bold text-gray-900 mb-6 fade-in">
                  {t('zodiacCalculator.poweredByAlgorithmTitle')}
                </h2>
                <p className="text-lg text-gray-700 mb-8 max-w-4xl mx-auto leading-relaxed">
                  {t('zodiacCalculator.advancedAlgorithmDescription')}
                </p>
                <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600">
                  <div className="flex items-center">
                    <span className="w-3 h-3 bg-purple-500 rounded-full mr-2"></span>
                    {t('zodiacCalculator.traditionalAstrologyBased')}
                  </div>
                  <div className="flex items-center">
                    <span className="w-3 h-3 bg-indigo-500 rounded-full mr-2"></span>
                    {t('zodiacCalculator.elementalPlanetaryAnalysis')}
                  </div>
                  <div className="flex items-center">
                    <span className="w-3 h-3 bg-blue-500 rounded-full mr-2"></span>
                    {t('zodiacCalculator.5FactorCosmicScoring')}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Astrological Insights */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-playfair font-bold text-gray-900 mb-12 text-center fade-in">
                {t('zodiacCalculator.astrologicalInsightsTitle')}
              </h2>
              
              <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-2xl p-8 border border-purple-200">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <ul className="space-y-4 text-gray-700">
                      <li className="flex items-start">
                        <Star className="w-5 h-5 text-purple-500 mr-3 mt-1" />
                        <span>{t('zodiacCalculator.astrologicalInsights.item1')}</span>
                      </li>
                      <li className="flex items-start">
                        <Star className="w-5 h-5 text-purple-500 mr-3 mt-1" />
                        <span>{t('zodiacCalculator.astrologicalInsights.item2')}</span>
                      </li>
                      <li className="flex items-start">
                        <Star className="w-5 h-5 text-purple-500 mr-3 mt-1" />
                        <span>{t('zodiacCalculator.astrologicalInsights.item3')}</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <ul className="space-y-4 text-gray-700">
                      <li className="flex items-start">
                        <Star className="w-5 h-5 text-purple-500 mr-3 mt-1" />
                        <span>{t('zodiacCalculator.astrologicalInsights.item4')}</span>
                      </li>
                      <li className="flex items-start">
                        <Star className="w-5 h-5 text-purple-500 mr-3 mt-1" />
                        <span>{t('zodiacCalculator.astrologicalInsights.item5')}</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Entertainment Only Notice */}
        <section className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-8 text-center">
                <h3 className="text-2xl font-playfair font-bold text-gray-900 mb-4">
                  {t('zodiacCalculator.entertainmentOnlyTitle')}
                </h3>
                <p className="text-yellow-800 font-medium">
                  <strong>{t('zodiacCalculator.important')}:</strong> {t('zodiacCalculator.entertainmentOnlyDescription')}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Zodiac Compatibility Test Online */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-playfair font-bold text-gray-900 mb-8 fade-in">
                {t('zodiacCalculator.zodiacCompatibilityTestOnlineTitle')}
              </h2>
              <p className="text-xl text-gray-600 mb-12 leading-relaxed">
                {t('zodiacCalculator.zodiacCompatibilityTestOnlineDescription')}
              </p>
              <button 
                onClick={() => {
                  const calculatorSection = document.getElementById('calculator');
                  if (calculatorSection) {
                    calculatorSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    // Focus on the first input field for better UX
                    setTimeout(() => {
                      const firstInput = calculatorSection.querySelector('input');
                      if (firstInput) {
                        firstInput.focus();
                      }
                    }, 500);
                  }
                }}
                className="inline-flex items-center bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-8 py-4 rounded-lg font-semibold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 card-hover hover:scale-105 focus:outline-none focus:ring-4 focus:ring-purple-300"
              >
                <Star className="w-6 h-6 mr-2" />
                {t('zodiacCalculator.calculateYourZodiacCompatibilityNow')}
                <ArrowRight className="w-6 h-6 ml-2" />
              </button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
} 