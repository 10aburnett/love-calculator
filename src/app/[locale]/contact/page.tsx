'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Mail, MessageCircle, Heart, HelpCircle, Star, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ContactPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-green-50 via-white to-teal-50">
        {/* Hero Section */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="pt-12 pb-8"
        >
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-4xl md:text-5xl font-playfair font-bold love-gradient-text mb-6"
              >
                Contact Us
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
              >
                Have questions about our love calculator? Want to share feedback? We'd love to hear from you!
              </motion.p>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="mt-6 flex items-center justify-center space-x-2 text-sm text-gray-500"
              >
                <Heart className="w-4 h-4" />
                <span>We typically respond within 24 hours</span>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Contact Content */}
        <section className="py-8">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-8">
              
              {/* Contact Information */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="bg-white rounded-2xl shadow-lg p-8 md:p-10"
              >
                <div className="flex items-center mb-6">
                  <Mail className="w-6 h-6 text-[var(--love-pink)] mr-3" />
                  <h2 className="text-2xl font-playfair font-semibold text-gray-900">
                    Get in Touch
                  </h2>
                </div>
                
                <div className="space-y-6">
                  <p className="text-gray-700">
                    We're here to help with any questions about our love calculator, compatibility tests, or website features. 
                    Whether you've found a bug, have a suggestion, or just want to share your experience, we'd love to hear from you!
                  </p>
                  
                  {/* Email Contact */}
                  <div className="bg-gray-50 rounded-xl p-6">
                    <div className="flex items-center mb-3">
                      <Mail className="w-5 h-5 text-[var(--love-pink)] mr-2" />
                      <h3 className="font-semibold text-gray-900">Email Us</h3>
                    </div>
                    <p className="text-gray-700 mb-3">
                      Send us an email and we'll get back to you as soon as possible.
                    </p>
                    <a 
                      href="mailto:infolovecalcs@gmail.com" 
                      className="text-[var(--love-pink)] hover:text-[var(--love-purple)] font-medium"
                    >
                      infolovecalcs@gmail.com
                    </a>
                  </div>

                  {/* Response Time */}
                  <div className="bg-blue-50 rounded-xl p-6">
                    <div className="flex items-center mb-3">
                      <Clock className="w-5 h-5 text-[var(--love-pink)] mr-2" />
                      <h3 className="font-semibold text-gray-900">Response Time</h3>
                    </div>
                    <p className="text-gray-700">
                      We typically respond to all inquiries within 24 hours during business days. 
                      For urgent technical issues, we aim to respond even faster!
                    </p>
                  </div>

                  {/* What to Include */}
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">When contacting us, please include:</h3>
                    <ul className="list-disc list-inside space-y-2 text-gray-700 text-sm">
                      <li>A clear description of your question or issue</li>
                      <li>Your browser type and version (if reporting a technical issue)</li>
                      <li>Steps to reproduce any problems you're experiencing</li>
                      <li>Screenshots if they help explain the issue</li>
                    </ul>
                  </div>
                </div>
              </motion.div>

              {/* FAQ Section */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="bg-white rounded-2xl shadow-lg p-8 md:p-10"
              >
                <div className="flex items-center mb-6">
                  <HelpCircle className="w-6 h-6 text-[var(--love-pink)] mr-3" />
                  <h2 className="text-2xl font-playfair font-semibold text-gray-900">
                    Frequently Asked Questions
                  </h2>
                </div>
                
                <div className="space-y-6">
                  
                  {/* FAQ Item 1 */}
                  <div className="border-b border-gray-200 pb-6">
                    <h3 className="font-semibold text-gray-900 mb-2">
                      How accurate is the love calculator?
                    </h3>
                    <p className="text-gray-700 text-sm">
                      Our love calculator is designed purely for entertainment! It's not based on scientific methods or real compatibility factors. 
                      The results are consistent for the same name combinations, making it fun for social sharing, but should not be taken seriously for relationship decisions.
                    </p>
                  </div>

                  {/* FAQ Item 2 */}
                  <div className="border-b border-gray-200 pb-6">
                    <h3 className="font-semibold text-gray-900 mb-2">
                      Do you store the names I enter?
                    </h3>
                    <p className="text-gray-700 text-sm">
                      No! All calculations are performed locally in your browser. We don't store, track, or save any of the names you enter into our love calculator. 
                      Your privacy is important to us.
                    </p>
                  </div>

                  {/* FAQ Item 3 */}
                  <div className="border-b border-gray-200 pb-6">
                    <h3 className="font-semibold text-gray-900 mb-2">
                      Why do I get different results on different websites?
                    </h3>
                    <p className="text-gray-700 text-sm">
                      Different love calculator websites use different algorithms and formulas. Our calculator uses a unique approach that ensures consistent 
                      results for the same name combinations, making it reliable for entertainment and social sharing.
                    </p>
                  </div>

                  {/* FAQ Item 4 */}
                  <div className="border-b border-gray-200 pb-6">
                    <h3 className="font-semibold text-gray-900 mb-2">
                      Can I suggest new features?
                    </h3>
                    <p className="text-gray-700 text-sm">
                      Absolutely! We love hearing ideas from our users. Send us an email with your suggestions and we'll consider them for future updates. 
                      Popular requests include new quiz types, sharing options, and fun new features.
                    </p>
                  </div>

                  {/* FAQ Item 5 */}
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">
                      Is the love calculator free to use?
                    </h3>
                    <p className="text-gray-700 text-sm">
                      Yes! Our love calculator and all compatibility tests are completely free to use. 
                      No registration required, no hidden fees, just pure entertainment for everyone to enjoy.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Additional Help Section */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="mt-8 bg-gradient-to-r from-pink-100 to-purple-100 rounded-2xl p-8 text-center"
            >
              <div className="max-w-2xl mx-auto">
                <div className="flex items-center justify-center mb-4">
                  <MessageCircle className="w-8 h-8 text-[var(--love-pink)] mr-3" />
                  <h2 className="text-2xl font-playfair font-semibold text-gray-900">
                    We're Here to Help!
                  </h2>
                </div>
                <p className="text-gray-700 mb-6">
                  Whether you're having technical difficulties, want to share feedback, or just want to tell us about your fun experiences 
                  with our love calculator, we're always happy to hear from our users.
                </p>
                <div className="grid md:grid-cols-3 gap-4 text-sm">
                  <div className="bg-white rounded-lg p-4">
                    <Star className="w-6 h-6 text-[var(--love-pink)] mx-auto mb-2" />
                    <p className="font-medium text-gray-900">Feature Requests</p>
                    <p className="text-gray-600">Suggest new features or improvements</p>
                  </div>
                  <div className="bg-white rounded-lg p-4">
                    <HelpCircle className="w-6 h-6 text-[var(--love-pink)] mx-auto mb-2" />
                    <p className="font-medium text-gray-900">Technical Support</p>
                    <p className="text-gray-600">Get help with technical issues</p>
                  </div>
                  <div className="bg-white rounded-lg p-4">
                    <Heart className="w-6 h-6 text-[var(--love-pink)] mx-auto mb-2" />
                    <p className="font-medium text-gray-900">General Feedback</p>
                    <p className="text-gray-600">Share your thoughts and experiences</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Business Inquiries */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="mt-8 bg-white rounded-2xl shadow-lg p-8 text-center"
            >
              <h2 className="text-2xl font-playfair font-semibold text-gray-900 mb-4">
                Business Inquiries
              </h2>
              <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
                Interested in partnerships, collaborations, or have business-related questions? 
                We're open to discussing opportunities that align with our mission of bringing fun and entertainment to relationships.
              </p>
              <a 
                href="mailto:infolovecalcs@gmail.com" 
                className="inline-flex items-center bg-gradient-to-r from-[var(--love-pink)] to-[var(--love-purple)] text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-200"
              >
                <Mail className="w-5 h-5 mr-2" />
                infolovecalcs@gmail.com
              </a>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
} 