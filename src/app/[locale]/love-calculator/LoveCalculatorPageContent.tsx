'use client';
import { useParams } from 'next/navigation';
import { useTranslations } from '@/hooks/useTranslations';
import LoveCalculator from '@/components/LoveCalculator';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { Heart, ArrowRight, Users, Share2, MessageCircle, BarChart3, Microscope, Target, Download, Instagram, Twitter, Smile, Gift } from 'lucide-react';
import { motion } from 'framer-motion';

export default function LoveCalculatorPageContent() {
  const { t } = useTranslations();
  const params = useParams();
  const locale = params.locale as string;

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50 page-transition">
        {/* Hero Section */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="pt-8 pb-2"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-6">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-4xl md:text-6xl font-playfair font-bold love-gradient-text mb-4 fade-in"
              >
                {t('loveCalculator.title')}
              </motion.h1>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex justify-center mb-6 fade-in"
              >
                <div className="inline-flex items-center bg-gradient-to-r from-amber-100 to-yellow-100 border border-amber-200 rounded-full px-4 py-2">
                  <span className="text-amber-800 text-sm font-semibold">{t('landing.newAlgorithmBadge')}</span>
                </div>
              </motion.div>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed slide-in"
              >
                {t('landing.intro')}
              </motion.p>
            </div>
          </div>
        </motion.section>

        {/* Calculator Section */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          id="calculator" 
          className="pb-1"
        >
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <LoveCalculator />
          </div>
        </motion.section>

        {/* Fun Love Test to Share Section */}
        <section className="py-12 bg-gradient-to-r from-pink-50 to-purple-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-playfair font-bold text-gray-900 mb-8 text-center fade-in">
                {t('landing.funLoveTestToShareTitle')}
              </h2>
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="slide-in">
                  <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                    {t('landing.funLoveTestDescription')}
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-center text-gray-700">
                      <Heart className="w-5 h-5 text-pink-500 mr-3" />
                      {t('landing.downloadShareableImages')}
                    </div>
                    <div className="flex items-center text-gray-700">
                      <Heart className="w-5 h-5 text-pink-500 mr-3" />
                      {t('landing.shareDirectlyToSocialMedia')}
                    </div>
                    <div className="flex items-center text-gray-700">
                      <Heart className="w-5 h-5 text-pink-500 mr-3" />
                      {t('landing.perfectForTikTokContent')}
                    </div>
                    <div className="flex items-center text-gray-700">
                      <Heart className="w-5 h-5 text-pink-500 mr-3" />
                      {t('landing.startConversationsWithFriends')}
                    </div>
                  </div>
                </div>
                <div className="slide-in delay-200">
                  <div className="bg-white rounded-2xl p-8 shadow-xl card-hover text-center">
                    <div className="text-6xl mb-4">📱</div>
                    <h3 className="text-2xl font-semibold text-gray-900 mb-4">{t('landing.shareYourResultsTitle')}</h3>
                    <p className="text-gray-600 mb-6">{t('landing.shareYourResultsDescription')}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Algorithm Features Section */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200 rounded-2xl p-8">
              <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-3xl md:text-4xl font-playfair font-bold text-gray-900 mb-6">
                  {t('landing.poweredByAQTitle')}
                </h2>
                <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                  {t('landing.poweredByAQDescription')}
                </p>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-white rounded-xl p-6 shadow-lg">
                    <BarChart3 className="w-12 h-12 text-indigo-600 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{t('landing.features.visual.title')}</h3>
                    <p className="text-gray-600 text-sm">{t('landing.features.visual.description')}</p>
                  </div>
                  <div className="bg-white rounded-xl p-6 shadow-lg">
                    <Microscope className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{t('landing.features.scientificMethod.title')}</h3>
                    <p className="text-gray-600 text-sm">{t('landing.features.scientificMethod.description')}</p>
                  </div>
                  <div className="bg-white rounded-xl p-6 shadow-lg">
                    <Target className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{t('landing.features.precisionAnalysis.title')}</h3>
                    <p className="text-gray-600 text-sm">{t('landing.features.precisionAnalysis.description')}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How Algorithm Works */}
        <section className="py-12 bg-white/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-playfair font-bold text-gray-900 mb-8 text-center fade-in">
                {t('landing.howAlgorithmWorksTitle')}
              </h2>
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="slide-in">
                  <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                    {t('landing.algorithmDescription1')}
                  </p>
                  <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                    {t('landing.algorithmDescription2')}
                  </p>
                  <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-6">
                    <p className="text-sm text-indigo-800">
                      <strong>{t('landing.academicFoundation')}:</strong> {t('landing.academicFoundationDescription')}
                    </p>
                  </div>
                </div>
                
                <div className="slide-in delay-200">
                  <div className="bg-gradient-to-br from-pink-50 to-purple-100 rounded-xl p-6 shadow-lg border border-pink-200 text-center">
                    <h3 className="text-xl font-semibold text-gray-900 mb-6">{t('landing.aqDifferenceTitle')}</h3>
                    <div className="mb-6">
                      <div className="text-4xl mb-2">🧬</div>
                      <p className="text-gray-600 font-medium">{t('landing.aqDifferenceSubtitle')}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Five Pillars of Compatibility Analysis */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-playfair font-bold text-gray-900 mb-8 text-center fade-in">
                {t('landing.fivePillarsTitle')}
              </h2>
              <p className="text-lg text-gray-600 text-center mb-12 max-w-4xl mx-auto">
                {t('landing.fivePillarsDescription')}
              </p>
              
              <div className="grid md:grid-cols-5 gap-6 mb-12">
                <div className="bg-pink-50 rounded-2xl p-6 text-center card-hover">
                  <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-pink-600">S</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">{t('landing.pillar1Title')}</h3>
                  <p className="text-sm text-gray-600">{t('landing.pillar1Description')}</p>
                </div>

                <div className="bg-blue-50 rounded-2xl p-6 text-center card-hover">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-blue-600">L</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">{t('landing.pillar2Title')}</h3>
                  <p className="text-sm text-gray-600">{t('landing.pillar2Description')}</p>
                </div>

                <div className="bg-green-50 rounded-2xl p-6 text-center card-hover">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-green-600">P</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">{t('landing.pillar3Title')}</h3>
                  <p className="text-sm text-gray-600">{t('landing.pillar3Description')}</p>
                </div>

                <div className="bg-purple-50 rounded-2xl p-6 text-center card-hover">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-purple-600">N</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">{t('landing.pillar4Title')}</h3>
                  <p className="text-sm text-gray-600">{t('landing.pillar4Description')}</p>
                </div>

                <div className="bg-yellow-50 rounded-2xl p-6 text-center card-hover">
                  <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-yellow-600">B</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">{t('landing.pillar5Title')}</h3>
                  <p className="text-sm text-gray-600">{t('landing.pillar5Description')}</p>
                </div>
              </div>

              {/* Entertainment Only Notice */}
              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 mb-8">
                <div className="text-center">
                  <div className="text-2xl mb-2">🎭</div>
                  <p className="text-yellow-800 font-medium">{t('landing.entertainmentDisclaimer')}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Name Compatibility Explained */}
        <section className="py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-playfair font-bold text-gray-900 mb-12 text-center fade-in">
                {t('landing.nameCompatibilityExplainedTitle')}
              </h2>
              
              <div className="grid md:grid-cols-3 gap-8 mb-12">
                <div className="bg-white rounded-2xl p-8 shadow-lg text-center card-hover">
                  <div className="text-5xl mb-4">👥</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">{t('landing.funEntertainmentTitle')}</h3>
                  <p className="text-gray-600">{t('landing.funEntertainmentDescription')}</p>
                </div>

                <div className="bg-white rounded-2xl p-8 shadow-lg text-center card-hover">
                  <div className="text-5xl mb-4">❤️</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">{t('landing.consistentResultsTitle')}</h3>
                  <p className="text-gray-600">{t('landing.consistentResultsDescription')}</p>
                </div>

                <div className="bg-white rounded-2xl p-8 shadow-lg text-center card-hover">
                  <div className="text-5xl mb-4">🔗</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">{t('landing.shareableFunTitle')}</h3>
                  <p className="text-gray-600">{t('landing.shareableFunDescription')}</p>
                </div>
              </div>

              <div className="text-center">
                <p className="text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed">
                  {t('landing.nameCompatibilityDescription')}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Love Compatibility Test Online */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-playfair font-bold text-gray-900 mb-8 fade-in">
                {t('landing.loveCompatibilityTestOnlineTitle')}
              </h2>
              <p className="text-xl text-gray-600 mb-12 leading-relaxed">
                {t('landing.loveCompatibilityTestOnlineDescription')}
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
                className="inline-flex items-center bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-4 rounded-lg font-semibold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 card-hover hover:scale-105 focus:outline-none focus:ring-4 focus:ring-pink-300"
              >
                <Heart className="w-6 h-6 mr-2" />
                {t('landing.calculateYourLoveScoreNow')}
                <ArrowRight className="w-6 h-6 ml-2" />
              </button>
            </div>
          </div>
        </section>

        {/* Relationship Quiz Section */}
        <section className="py-12 bg-gradient-to-r from-pink-50 to-purple-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-playfair font-bold text-gray-900 mb-8">
              {t('landing.relationshipQuizTitle')}
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              {t('landing.relationshipQuizDescription')}
            </p>
            <Link 
              href={`/${locale}/relationship-quiz`}
              className="inline-flex items-center border-2 border-[var(--love-pink)] text-[var(--love-pink)] px-8 py-4 rounded-lg font-semibold hover:bg-[var(--love-pink)] hover:text-white transition-all duration-200 text-lg"
            >
              {t('landing.takeTheQuiz')}
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
} 