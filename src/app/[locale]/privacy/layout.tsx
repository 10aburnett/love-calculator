import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy - LoveCalcs.com',
  description: 'Read the LoveCalcs.com privacy policy. Learn how we protect your data and what information we collect when you use our love calculators and quizzes.',
};

export default function PrivacyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
