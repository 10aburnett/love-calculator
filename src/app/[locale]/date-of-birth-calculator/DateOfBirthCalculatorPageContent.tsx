'use client';

import { useTranslations } from '@/hooks/useTranslations';
import DateOfBirthCalculator from '@/components/DateOfBirthCalculator';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { Calendar, Heart, ArrowRight, Brain, BarChart3, Share2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function DateOfBirthCalculatorPageContent() {
  const { t } = useTranslations();

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 page-transition">
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
                <Calendar className="w-16 h-16 text-blue-600" />
              </motion.div>
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-playfair font-bold text-gray-900 mb-6 fade-in break-words hyphens-auto"
              >
                {t('dobCalculator.title')}
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed slide-in"
              >
                {t('dobCalculator.description')}
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
            <DateOfBirthCalculator />
          </div>
        </motion.section>

        {/* Why Choose Our Birthday Calculator */}
        <section className="py-12 bg-white/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-playfair font-bold text-gray-900 mb-12 text-center fade-in">
                {t('dobCalculator.whyChooseOurBirthdayCalculatorTitle')}
              </h2>
              
              <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-white rounded-2xl p-8 shadow-lg text-center card-hover">
                  <Brain className="w-12 h-12 text-pink-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">{t('dobCalculator.scientificFoundationTitle')}</h3>
                  <p className="text-gray-600">{t('dobCalculator.scientificFoundationDescription')}</p>
                </div>

                <div className="bg-white rounded-2xl p-8 shadow-lg text-center card-hover">
                  <BarChart3 className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">{t('dobCalculator.detailedBreakdownTitle')}</h3>
                  <p className="text-gray-600">{t('dobCalculator.detailedBreakdownDescription')}</p>
                </div>

                <div className="bg-white rounded-2xl p-8 shadow-lg text-center card-hover">
                  <Share2 className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">{t('dobCalculator.socialSharingTitle')}</h3>
                  <p className="text-gray-600">{t('dobCalculator.socialSharingDescription')}</p>
                </div>
              </div>

              <div className="text-center mt-12">
                <p className="text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed">
                  {t('dobCalculator.birthdayCompatibilityDescription')}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How Birthday Compatibility Algorithm Works */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-playfair font-bold text-gray-900 mb-8 text-center fade-in">
                {t('dobCalculator.howAlgorithmWorksTitle')}
              </h2>
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="slide-in">
                  <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                    {t('dobCalculator.algorithmFoundationDescription')}
                  </p>
                  <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                    {t('dobCalculator.comprehensiveCompatibilityProfile')}
                  </p>
                  <div className="bg-pink-50 border border-pink-200 rounded-lg p-6">
                    <p className="text-sm text-pink-800">
                      <strong>{t('dobCalculator.academicFoundation')}:</strong> {t('dobCalculator.algorithmIncorporates')}
                    </p>
                  </div>
                </div>
                
                <div className="slide-in delay-200">
                  <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
                    <h3 className="text-xl font-semibold text-gray-900 mb-6">{t('dobCalculator.birthDateAnalysisProcessTitle')}</h3>
                    <div className="space-y-3">
                      <div className="flex items-start">
                        <span className="w-10 h-10 bg-pink-100 text-pink-600 rounded-full flex items-center justify-center text-sm font-semibold mr-3 mt-1 flex-shrink-0">1</span>
                        <span className="text-gray-700">{t('dobCalculator.extractTemporalPatterns')}</span>
                      </div>
                      <div className="flex items-start">
                        <span className="w-10 h-10 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-sm font-semibold mr-3 mt-1 flex-shrink-0">2</span>
                        <span className="text-gray-700">{t('dobCalculator.calculateNumerologicalPaths')}</span>
                      </div>
                      <div className="flex items-start">
                        <span className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-semibold mr-3 mt-1 flex-shrink-0">3</span>
                        <span className="text-gray-700">{t('dobCalculator.analyzeSeasonalPersonalityAlignment')}</span>
                      </div>
                      <div className="flex items-start">
                        <span className="w-10 h-10 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm font-semibold mr-3 mt-1 flex-shrink-0">4</span>
                        <span className="text-gray-700">{t('dobCalculator.evaluateGenerationalHarmony')}</span>
                      </div>
                      <div className="flex items-start">
                        <span className="w-10 h-10 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-sm font-semibold mr-3 mt-1 flex-shrink-0">5</span>
                        <span className="text-gray-700">{t('dobCalculator.generateComprehensiveCompatibilityScore')}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Five Pillars of Birthday Compatibility Analysis */}
        <section className="py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-playfair font-bold text-gray-900 mb-12 text-center fade-in">
                {t('dobCalculator.fivePillarsTitle')}
              </h2>
              
              <div className="grid md:grid-cols-5 gap-6 mb-12">
                <div className="bg-pink-50 rounded-2xl p-6 text-center card-hover">
                  <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🎯</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">{t('dobCalculator.ageHarmony')}</h3>
                  <p className="text-sm text-gray-600">{t('dobCalculator.ageHarmonyDescription')}</p>
                </div>

                <div className="bg-yellow-50 rounded-2xl p-6 text-center card-hover">
                  <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🌸</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">{t('dobCalculator.seasonalPatterns')}</h3>
                  <p className="text-sm text-gray-600">{t('dobCalculator.seasonalPatternsDescription')}</p>
                </div>

                <div className="bg-blue-50 rounded-2xl p-6 text-center card-hover">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🔢</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">{t('dobCalculator.numerologicalPaths')}</h3>
                  <p className="text-sm text-gray-600">{t('dobCalculator.numerologicalPathsDescription')}</p>
                </div>

                <div className="bg-purple-50 rounded-2xl p-6 text-center card-hover">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">✨</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">{t('dobCalculator.cosmicSync')}</h3>
                  <p className="text-sm text-gray-600">{t('dobCalculator.cosmicSyncDescription')}</p>
                </div>

                <div className="bg-green-50 rounded-2xl p-6 text-center card-hover">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🌍</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">{t('dobCalculator.generationalEnergy')}</h3>
                  <p className="text-sm text-gray-600">{t('dobCalculator.generationalEnergyDescription')}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Birthday Compatibility Matters */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-playfair font-bold text-gray-900 mb-12 text-center fade-in">
                {t('dobCalculator.whyBirthdayCompatibilityMattersTitle')}
              </h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white rounded-2xl p-8 shadow-lg">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">{t('dobCalculator.temporalPsychology')}</h3>
                  <p className="text-gray-700 leading-relaxed">{t('dobCalculator.temporalPsychologyDescription')}</p>
                </div>

                <div className="bg-white rounded-2xl p-8 shadow-lg">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">{t('dobCalculator.numerologicalWisdom')}</h3>
                  <p className="text-gray-700 leading-relaxed">{t('dobCalculator.numerologicalWisdomDescription')}</p>
                </div>

                <div className="bg-white rounded-2xl p-8 shadow-lg">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">{t('dobCalculator.lifeStageSynchronization')}</h3>
                  <p className="text-gray-700 leading-relaxed">{t('dobCalculator.lifeStageSynchronizationDescription')}</p>
                </div>

                <div className="bg-white rounded-2xl p-8 shadow-lg">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">{t('dobCalculator.seasonalInfluences')}</h3>
                  <p className="text-gray-700 leading-relaxed">{t('dobCalculator.seasonalInfluencesDescription')}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Powered by Birthday Harmony Algorithm */}
        <section className="py-12 bg-gradient-to-r from-blue-50 to-purple-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-playfair font-bold text-gray-900 mb-6 fade-in">
                  {t('dobCalculator.poweredByAlgorithmTitle')}
                </h2>
                <p className="text-lg text-gray-700 mb-8 max-w-4xl mx-auto leading-relaxed">
                  {t('dobCalculator.advancedAlgorithmDescription')}
                </p>
                <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600">
                  <div className="flex items-center">
                    <span className="w-3 h-3 bg-blue-500 rounded-full mr-2"></span>
                    {t('dobCalculator.numerologyBasedAnalysis')}
                  </div>
                  <div className="flex items-center">
                    <span className="w-3 h-3 bg-purple-500 rounded-full mr-2"></span>
                    {t('dobCalculator.seasonalPsychologyPatterns')}
                  </div>
                  <div className="flex items-center">
                    <span className="w-3 h-3 bg-pink-500 rounded-full mr-2"></span>
                    {t('dobCalculator.fiveFactorTemporalScoring')}
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
                  {t('dobCalculator.entertainmentOnlyTitle')}
                </h3>
                <p className="text-yellow-800 font-medium">
                  <strong>{t('dobCalculator.important')}:</strong> {t('dobCalculator.entertainmentOnlyDescription')}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Birthday Compatibility Test Online */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-playfair font-bold text-gray-900 mb-8 fade-in">
                {t('dobCalculator.birthdayCompatibilityTestOnlineTitle')}
              </h2>
              <p className="text-xl text-gray-600 mb-12 leading-relaxed">
                {t('dobCalculator.birthdayCompatibilityTestOnlineDescription')}
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
                className="inline-flex items-center bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-lg font-semibold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 card-hover hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300"
              >
                <Calendar className="w-6 h-6 mr-2" />
                {t('dobCalculator.calculateYourBirthdayCompatibilityNow')}
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