import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Love Calculator – Free Name Compatibility & Love Compatibility Test",
  description: "Discover your love compatibility with our free Love Calculator! Test relationship compatibility, name match, and get fun personalized results to share.",
  keywords: ["love calculator", "name compatibility", "love compatibility test", "relationship quiz", "fun love test"],
  authors: [{ name: "Love Calculator Team" }],
  creator: "Love Calculator",
  publisher: "Love Calculator",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://love-calculator.vercel.app'),
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.svg', sizes: '32x32' },
      { url: '/favicon.svg', sizes: '16x16' }
    ],
    apple: '/favicon.svg',
    shortcut: '/favicon.svg'
  },
  manifest: '/manifest.json',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://love-calculator.vercel.app',
    title: 'Love Calculator – Free Name Compatibility & Love Compatibility Test',
    description: 'Discover your love compatibility with our free Love Calculator! Test relationship compatibility, name match, and get fun personalized results to share.',
    siteName: 'Love Calculator',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Love Calculator - Test Your Compatibility',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Love Calculator – Free Name Compatibility & Love Compatibility Test',
    description: 'Discover your love compatibility with our free Love Calculator! Test relationship compatibility, name match, and get fun personalized results to share.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Inter:wght@300;400;500;600;700&display=swap" 
          rel="stylesheet" 
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Love Calculator",
              "description": "Free love compatibility calculator and relationship tests",
              "url": "https://love-calculator.vercel.app",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://love-calculator.vercel.app/love-calculator?q={search_term_string}",
                "query-input": "required name=search_term_string"
              }
            })
          }}
        />
      </head>
      <body className="font-inter antialiased" suppressHydrationWarning={true}>
        <div className="floating-hearts">
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              className="heart"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 15}s`,
              }}
      >
              💖
            </div>
          ))}
        </div>
        {children}
      </body>
    </html>
  );
}
