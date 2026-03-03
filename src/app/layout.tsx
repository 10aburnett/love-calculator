import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Love Calculator - Free Love Percentage & Name Compatibility Test",
  description: "Free Love Calculator to test name compatibility and get your love percentage. Fun, instant results - find out if you're a match! Try the #1 love tester online.",
  keywords: ["love calculator", "love tester", "love percentage calculator", "name compatibility", "love match", "love meter", "crush calculator"],
  authors: [{ name: "Love Calculator Team" }],
  creator: "Love Calculator",
  publisher: "Love Calculator",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://www.lovecalcs.com'),
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' }
    ],
    apple: '/favicon.svg',
    shortcut: '/favicon.ico'
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.lovecalcs.com',
    title: 'Love Calculator - Free Love Percentage & Name Compatibility Test',
    description: 'Free Love Calculator to test name compatibility and get your love percentage. Fun, instant results - find out if you\'re a match! Try the #1 love tester online.',
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
    title: 'Love Calculator - Free Love Percentage & Name Compatibility Test',
    description: 'Free Love Calculator to test name compatibility and get your love percentage. Fun, instant results - find out if you\'re a match! Try the #1 love tester online.',
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
  return children;
}
