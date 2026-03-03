import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service - LoveCalcs.com',
  description: 'LoveCalcs.com terms of service. Read our terms and conditions for using our free love calculators, compatibility tests, and relationship quizzes.',
};

export default function TermsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
