'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Shield, Eye, Cookie, Share2, Lock, Mail } from 'lucide-react';
import { motion } from 'framer-motion';

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        {/* Hero Section */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="pt-12 pb-4"
        >
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-4">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-4xl md:text-5xl font-playfair font-bold love-gradient-text mb-6"
              >
                Privacy Policy
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
              >
                Your privacy is important to us. This policy explains how we collect, use, and protect your information.
              </motion.p>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="mt-4 flex items-center justify-center space-x-2 text-sm text-gray-500"
              >
                <Lock className="w-4 h-4" />
                <span>Last updated: December 2025</span>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Privacy Content */}
        <section className="py-4">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="bg-white rounded-2xl shadow-lg p-8 md:p-12 space-y-8"
            >
              
              {/* Information We Collect */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <div className="flex items-center mb-4">
                  <Eye className="w-6 h-6 text-[var(--love-pink)] mr-3" />
                  <h2 className="text-2xl font-playfair font-semibold text-gray-900">
                    Information We Collect
                  </h2>
                </div>
                <div className="space-y-4 text-gray-700">
                  <p>
                    Our Love Calculator is designed to be a fun, entertainment-focused service. We collect minimal information to provide you with the best experience:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li><strong>Names for Calculations:</strong> The names you enter are processed locally in your browser and are not stored on our servers.</li>
                    <li><strong>Usage Analytics:</strong> We may collect anonymous usage data to improve our service, such as page views and feature usage.</li>
                    <li><strong>Device Information:</strong> Basic device and browser information for compatibility and performance optimization.</li>
                  </ul>
                </div>
              </motion.div>

              {/* How We Use Information */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
              >
                <div className="flex items-center mb-4">
                  <Share2 className="w-6 h-6 text-[var(--love-pink)] mr-3" />
                  <h2 className="text-2xl font-playfair font-semibold text-gray-900">
                    How We Use Your Information
                  </h2>
                </div>
                <div className="space-y-4 text-gray-700">
                  <p>We use the information we collect to:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Provide our love calculator and compatibility test services</li>
                    <li>Improve our website functionality and user experience</li>
                    <li>Analyze usage patterns to enhance our features</li>
                    <li>Ensure technical functionality and security of our platform</li>
                  </ul>
                  <p className="text-sm bg-blue-50 p-4 rounded-lg">
                    <strong>Important:</strong> We do not store, sell, or share the names you enter into our love calculator. All calculations are performed locally in your browser.
                  </p>
                </div>
              </motion.div>

              {/* Cookies and Tracking */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                <div className="flex items-center mb-4">
                  <Cookie className="w-6 h-6 text-[var(--love-pink)] mr-3" />
                  <h2 className="text-2xl font-playfair font-semibold text-gray-900">
                    Cookies and Tracking
                  </h2>
                </div>
                <div className="space-y-4 text-gray-700">
                  <p>
                    We may use cookies and similar technologies to enhance your experience:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li><strong>Essential Cookies:</strong> Required for basic website functionality</li>
                    <li><strong>Analytics Cookies:</strong> Help us understand how visitors use our site</li>
                    <li><strong>Preference Cookies:</strong> Remember your settings and preferences</li>
                  </ul>
                  <p>
                    You can control cookies through your browser settings. However, disabling cookies may affect some website functionality.
                  </p>
                </div>
              </motion.div>

              {/* Data Security */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.9 }}
              >
                <div className="flex items-center mb-4">
                  <Shield className="w-6 h-6 text-[var(--love-pink)] mr-3" />
                  <h2 className="text-2xl font-playfair font-semibold text-gray-900">
                    Data Security
                  </h2>
                </div>
                <div className="space-y-4 text-gray-700">
                  <p>
                    We take reasonable measures to protect your information:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Our website uses HTTPS encryption for secure data transmission</li>
                    <li>We minimize data collection to only what's necessary for our service</li>
                    <li>Regular security reviews and updates to our systems</li>
                    <li>No storage of personal names or calculation data on our servers</li>
                  </ul>
                </div>
              </motion.div>

              {/* Third-Party Services */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1 }}
              >
                <h2 className="text-2xl font-playfair font-semibold text-gray-900 mb-4">
                  Third-Party Services
                </h2>
                <div className="space-y-4 text-gray-700">
                  <p>
                    Our website may use third-party services for analytics, hosting, and performance optimization. These services have their own privacy policies:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Web hosting and content delivery networks</li>
                    <li>Analytics services to understand website usage</li>
                    <li>Social media integration for sharing features</li>
                  </ul>
                  <p>
                    We encourage you to review the privacy policies of any third-party services you interact with through our website.
                  </p>
                </div>
              </motion.div>

              {/* Your Rights */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.1 }}
              >
                <h2 className="text-2xl font-playfair font-semibold text-gray-900 mb-4">
                  Your Rights and Choices
                </h2>
                <div className="space-y-4 text-gray-700">
                  <p>You have the right to:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Use our love calculator without creating an account</li>
                    <li>Control cookie settings through your browser</li>
                    <li>Contact us with any privacy-related questions</li>
                    <li>Request information about data we may have collected</li>
                  </ul>
                  <p className="text-sm bg-green-50 p-4 rounded-lg">
                    <strong>Good News:</strong> Since we don't store personal calculation data, most privacy concerns are automatically addressed by our design!
                  </p>
                </div>
              </motion.div>

              {/* Children's Privacy */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.2 }}
              >
                <h2 className="text-2xl font-playfair font-semibold text-gray-900 mb-4">
                  Children's Privacy
                </h2>
                <div className="space-y-4 text-gray-700">
                  <p>
                    Our service is intended for general audiences. We do not knowingly collect personal information from children under 13. 
                    If you are a parent or guardian and believe your child has provided us with personal information, please contact us.
                  </p>
                </div>
              </motion.div>

              {/* Changes to Privacy Policy */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.3 }}
              >
                <h2 className="text-2xl font-playfair font-semibold text-gray-900 mb-4">
                  Changes to This Privacy Policy
                </h2>
                <div className="space-y-4 text-gray-700">
                  <p>
                    We may update this privacy policy from time to time. Any changes will be posted on this page with an updated effective date. 
                    We encourage you to review this policy periodically.
                  </p>
                </div>
              </motion.div>

              {/* Contact Information */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.4 }}
                className="bg-gray-50 rounded-xl p-6"
              >
                <div className="flex items-center mb-4">
                  <Mail className="w-6 h-6 text-[var(--love-pink)] mr-3" />
                  <h2 className="text-2xl font-playfair font-semibold text-gray-900">
                    Questions About Privacy?
                  </h2>
                </div>
                <p className="text-gray-700 mb-4">
                  If you have any questions about this privacy policy or our data practices, please don't hesitate to contact us.
                </p>
                <a 
                  href="/contact" 
                  className="inline-flex items-center bg-gradient-to-r from-[var(--love-pink)] to-[var(--love-purple)] text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-200"
                >
                  Contact Us
                </a>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
} 