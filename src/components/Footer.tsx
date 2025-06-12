import Link from 'next/link';
import { Heart, Twitter, Instagram, Facebook } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: 'Fun Quizzes',
      links: [
        { href: '/relationship-quiz', label: 'Relationship Quiz', description: 'Take our fun 8-question quiz for entertaining relationship insights' },
        { href: '/communication-style-quiz', label: 'Communication Style Quiz', description: 'Discover how you and your partner communicate and where you can improve' },
        { href: '/love-language-assessment', label: 'Love Language Assessment', description: 'Find out your primary love languages and learn how to express love better' },
        { href: '/future-goals-compatibility', label: 'Future Goals Compatibility', description: 'See how aligned your life goals and dreams are for the future' },
        { href: '/conflict-resolution-style', label: 'Conflict Resolution Style Quiz', description: 'Learn how you handle disagreements and how to resolve conflicts better' },
      ],
    },
    {
      title: 'Support & Legal',
      links: [
        { href: '/contact', label: 'Contact Us', description: 'Get in touch with our team for questions, feedback, or support' },
        { href: '/privacy', label: 'Privacy Policy', description: 'Learn how we protect your data and privacy while you have fun' },
        { href: '/terms', label: 'Terms of Service', description: 'Terms and conditions for using our entertainment services' },
      ],
    },
    {
      title: 'More Tools',
      links: [
        { href: '/date-of-birth-calculator', label: 'Date of Birth Compatibility Calculator' },
        { href: '/zodiac-compatibility-calculator', label: 'Zodiac Compatibility Calculator' },
      ],
      isMinor: true,
    },
  ];

  const socialLinks = [
    { href: 'https://twitter.com', icon: Twitter, label: 'Twitter' },
    { href: 'https://instagram.com', icon: Instagram, label: 'Instagram' },
    { href: 'https://facebook.com', icon: Facebook, label: 'Facebook' },
  ];

  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <Link href="/love-calculator" className="flex items-center space-x-2 group mb-4">
              <Heart className="w-8 h-8 text-[var(--love-pink)] group-hover:scale-110 transition-transform duration-200 heartbeat" />
              <span className="text-xl font-playfair font-bold love-gradient-text">
                Love Calculator
              </span>
            </Link>
            <p className="text-gray-600 mb-6 max-w-md fade-in">
              Discover your love compatibility with our fun and entertaining love calculator. 
              Test your relationship compatibility and share your results with friends!
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-white text-gray-600 hover:text-[var(--love-pink)] hover:bg-gray-100 transition-colors duration-200 shadow-sm btn-love"
                  aria-label={social.label}
                  style={{animationDelay: `${index * 0.1}s`}}
                >
                  <social.icon className="w-5 h-5 icon-scale" />
                </a>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          {footerLinks.map((section, sectionIndex) => (
            <div key={section.title} className={`${section.isMinor ? 'opacity-75' : ''} slide-in`} style={{animationDelay: `${(sectionIndex + 1) * 0.1}s`}}>
              <h3 className={`font-semibold text-gray-900 mb-4 ${
                section.title === 'Fun Quizzes' ? 'text-xl' : 
                section.title === 'Support & Legal' ? 'text-lg' : 'text-lg'
              }`}>
                {section.title}
                {section.title === 'Fun Quizzes' && <span className="text-[var(--love-pink)] ml-2 icon-bounce">✨</span>}
                {section.title === 'Support & Legal' && <span className="text-[var(--love-pink)] ml-2 icon-bounce">📋</span>}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={`text-gray-600 hover:text-[var(--love-pink)] transition-colors duration-200 ${section.isMinor ? 'text-sm' : 'text-sm'} hover:scale-105 transform`}
                    >
                      <div>
                        <div className={
                          section.title === 'Fun Quizzes' || section.title === 'Support & Legal' ? 'font-medium' : ''
                        }>{link.label}</div>
                        {link.description && (
                          <div className="text-xs text-gray-500 mt-1 leading-tight">
                            {link.description}
                          </div>
                        )}
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-200 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-600 text-sm fade-in">
              © {currentYear} Love Calculator. Made with <span className="heartbeat">💖</span> for everyone.
            </div>
            
            <div className="flex space-x-6 text-sm">
              <Link 
                href="/privacy" 
                className="text-gray-600 hover:text-[var(--love-pink)] transition-colors duration-200 hover:scale-105 transform"
              >
                Privacy Policy
              </Link>
              <Link 
                href="/terms" 
                className="text-gray-600 hover:text-[var(--love-pink)] transition-colors duration-200 hover:scale-105 transform"
              >
                Terms of Service
              </Link>
              <Link 
                href="/contact" 
                className="text-gray-600 hover:text-[var(--love-pink)] transition-colors duration-200 hover:scale-105 transform"
              >
                Contact
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
} 