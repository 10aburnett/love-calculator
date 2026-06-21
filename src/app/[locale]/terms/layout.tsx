import type { Metadata } from 'next';
import { buildAlternates } from '@/lib/hreflang';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: 'Terms of Service - LoveCalcs.com',
    description: 'LoveCalcs.com terms of service. Read our terms and conditions for using our free love calculators, compatibility tests, and relationship quizzes.',
    alternates: buildAlternates(locale, '/terms'),
  };
}

export default function TermsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
