import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About LoveCalcs - Free Love Calculator & Compatibility Tests',
  description: 'Learn about LoveCalcs.com - the free love calculator and compatibility testing platform. Discover how our love calculators, zodiac tools, and relationship quizzes work.',
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
