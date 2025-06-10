import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Scale, AlertTriangle, Copyright, Users, Heart, Mail } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Terms of Service - Love Calculator',
  description: 'Terms of Service for Love Calculator - Learn about the terms and conditions for using our fun love compatibility tests and entertainment services.',
  keywords: ['terms of service', 'terms and conditions', 'love calculator terms'],
  alternates: {
    canonical: '/terms',
  },
  openGraph: {
    title: 'Terms of Service - Love Calculator',
    description: 'Terms of Service for Love Calculator - Terms and conditions for our entertainment services.',
    url: '/terms',
    type: 'website',
  },
};

export default function TermsPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
        {/* Hero Section */}
        <section className="pt-12 pb-4">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-4">
              <h1 className="text-4xl md:text-5xl font-playfair font-bold love-gradient-text mb-6">
                Terms of Service
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Please read these terms carefully before using our love calculator and entertainment services.
              </p>
              <div className="mt-4 flex items-center justify-center space-x-2 text-sm text-gray-500">
                <Scale className="w-4 h-4" />
                <span>Last updated: December 2024</span>
              </div>
            </div>
          </div>
        </section>

        {/* Terms Content */}
        <section className="py-4">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 space-y-8">
              
              {/* Entertainment Notice */}
              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
                <div className="flex items-center mb-4">
                  <Heart className="w-6 h-6 text-[var(--love-pink)] mr-3" />
                  <h2 className="text-2xl font-playfair font-semibold text-gray-900">
                    Entertainment Only
                  </h2>
                </div>
                <p className="text-gray-700">
                  <strong>Important:</strong> Our Love Calculator is designed purely for entertainment purposes. 
                  Results should not be used to make relationship decisions. 
                  Have fun, but don't take the results too seriously!
                </p>
              </div>

              {/* Acceptance of Terms */}
              <div>
                <h2 className="text-2xl font-playfair font-semibold text-gray-900 mb-4">
                  Acceptance of Terms
                </h2>
                <div className="space-y-4 text-gray-700">
                  <p>
                    By accessing and using our Love Calculator website, you accept and agree to be bound by the terms and provision of this agreement. 
                    If you do not agree to abide by the above, please do not use this service.
                  </p>
                  <p>
                    These terms apply to all visitors, users, and others who access or use our service.
                  </p>
                </div>
              </div>

              {/* Use of Service */}
              <div>
                <div className="flex items-center mb-4">
                  <Users className="w-6 h-6 text-[var(--love-pink)] mr-3" />
                  <h2 className="text-2xl font-playfair font-semibold text-gray-900">
                    Use of Service
                  </h2>
                </div>
                <div className="space-y-4 text-gray-700">
                  <p>You may use our Love Calculator service for:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Personal entertainment and fun</li>
                    <li>Social sharing with friends and family</li>
                    <li>Creating engaging social media content</li>
                    <li>Party games and icebreaker activities</li>
                  </ul>
                  
                  <p>You agree NOT to use our service for:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Making serious relationship decisions</li>
                    <li>Harassing or intimidating others</li>
                    <li>Any illegal or unauthorized purpose</li>
                    <li>Attempting to reverse engineer our calculations</li>
                    <li>Overwhelming our servers with automated requests</li>
                  </ul>
                </div>
              </div>

              {/* Disclaimer */}
              <div>
                <div className="flex items-center mb-4">
                  <AlertTriangle className="w-6 h-6 text-[var(--love-pink)] mr-3" />
                  <h2 className="text-2xl font-playfair font-semibold text-gray-900">
                    Disclaimer
                  </h2>
                </div>
                <div className="space-y-4 text-gray-700">
                  <p>
                    Our Love Calculator provides entertainment results based on name combinations and fun algorithms. 
                    <strong> These results are not predictions, scientific analyses, or relationship advice.</strong>
                  </p>
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <p className="font-semibold text-red-800 mb-2">Please Note:</p>
                    <ul className="list-disc list-inside space-y-1 text-red-700 text-sm">
                      <li>Results are for entertainment purposes only</li>
                      <li>No scientific or psychological basis</li>
                      <li>Should not influence real relationship decisions</li>
                      <li>We make no guarantees about accuracy or reliability</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Intellectual Property */}
              <div>
                <div className="flex items-center mb-4">
                  <Copyright className="w-6 h-6 text-[var(--love-pink)] mr-3" />
                  <h2 className="text-2xl font-playfair font-semibold text-gray-900">
                    Intellectual Property
                  </h2>
                </div>
                <div className="space-y-4 text-gray-700">
                  <p>
                    The service and its original content, features, and functionality are and will remain the exclusive property of Love Calculator and its licensors. 
                    The service is protected by copyright, trademark, and other laws.
                  </p>
                  <p>
                    You may share results and screenshots from our love calculator on social media and other platforms for entertainment purposes.
                  </p>
                </div>
              </div>

              {/* User Conduct */}
              <div>
                <h2 className="text-2xl font-playfair font-semibold text-gray-900 mb-4">
                  User Conduct
                </h2>
                <div className="space-y-4 text-gray-700">
                  <p>While using our service, you agree to:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Use respectful language and behavior</li>
                    <li>Not enter offensive, inappropriate, or harmful names</li>
                    <li>Not attempt to hack, compromise, or damage our service</li>
                    <li>Respect other users and the entertainment nature of our platform</li>
                    <li>Not use our service for commercial purposes without permission</li>
                  </ul>
                </div>
              </div>

              {/* Privacy */}
              <div>
                <h2 className="text-2xl font-playfair font-semibold text-gray-900 mb-4">
                  Privacy
                </h2>
                <div className="space-y-4 text-gray-700">
                  <p>
                    Your privacy is important to us. Names entered into our love calculator are processed locally in your browser and are not stored on our servers. 
                    Please review our Privacy Policy for more information about how we handle your data.
                  </p>
                  <a 
                    href="/privacy" 
                    className="inline-flex items-center text-[var(--love-pink)] hover:text-[var(--love-purple)] font-medium"
                  >
                    Read our Privacy Policy →
                  </a>
                </div>
              </div>

              {/* Limitation of Liability */}
              <div>
                <h2 className="text-2xl font-playfair font-semibold text-gray-900 mb-4">
                  Limitation of Liability
                </h2>
                <div className="space-y-4 text-gray-700">
                  <p>
                    In no event shall Love Calculator, nor its directors, employees, partners, agents, suppliers, or affiliates, 
                    be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, 
                    loss of profits, data, use, goodwill, or other intangible losses, resulting from your use of the service.
                  </p>
                  <p>
                    Since our service is for entertainment only, we are not responsible for any decisions made based on our love calculator results.
                  </p>
                </div>
              </div>

              {/* Termination */}
              <div>
                <h2 className="text-2xl font-playfair font-semibold text-gray-900 mb-4">
                  Termination
                </h2>
                <div className="space-y-4 text-gray-700">
                  <p>
                    We may terminate or suspend your access immediately, without prior notice or liability, for any reason whatsoever, 
                    including without limitation if you breach the Terms.
                  </p>
                  <p>
                    Upon termination, your right to use the service will cease immediately.
                  </p>
                </div>
              </div>

              {/* Changes to Terms */}
              <div>
                <h2 className="text-2xl font-playfair font-semibold text-gray-900 mb-4">
                  Changes to Terms
                </h2>
                <div className="space-y-4 text-gray-700">
                  <p>
                    We reserve the right, at our sole discretion, to modify or replace these Terms at any time. 
                    If a revision is material, we will try to provide at least 30 days notice prior to any new terms taking effect.
                  </p>
                  <p>
                    What constitutes a material change will be determined at our sole discretion. 
                    By continuing to access or use our Service after those revisions become effective, you agree to be bound by the revised terms.
                  </p>
                </div>
              </div>

              {/* Governing Law */}
              <div>
                <h2 className="text-2xl font-playfair font-semibold text-gray-900 mb-4">
                  Governing Law
                </h2>
                <div className="space-y-4 text-gray-700">
                  <p>
                    These Terms shall be interpreted and governed by the laws of the jurisdiction in which our service operates, 
                    without regard to its conflict of law provisions.
                  </p>
                  <p>
                    Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights.
                  </p>
                </div>
              </div>

              {/* Contact Information */}
              <div className="bg-gray-50 rounded-xl p-6">
                <div className="flex items-center mb-4">
                  <Mail className="w-6 h-6 text-[var(--love-pink)] mr-3" />
                  <h2 className="text-2xl font-playfair font-semibold text-gray-900">
                    Questions About These Terms?
                  </h2>
                </div>
                <p className="text-gray-700 mb-4">
                  If you have any questions about these Terms of Service, please contact us. 
                  We're here to help and ensure you have a great experience with our love calculator!
                </p>
                <a 
                  href="/contact" 
                  className="inline-flex items-center bg-gradient-to-r from-[var(--love-pink)] to-[var(--love-purple)] text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-200"
                >
                  Contact Us
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
} 