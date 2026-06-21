import type { Metadata } from 'next';
import { buildAlternates } from '@/lib/hreflang';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: 'Privacy Policy - LoveCalcs.com',
    description: 'Read the LoveCalcs.com privacy policy. Learn how we protect your data and what information we collect when you use our love calculators and quizzes.',
    alternates: buildAlternates(locale, '/privacy'),
  };
}

export default function PrivacyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
