import type { Metadata } from 'next';
import { buildAlternates } from '@/lib/hreflang';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: 'Contact Us - LoveCalcs.com',
    description: 'Get in touch with the LoveCalcs.com team. Questions, feedback, or partnership inquiries - we\'d love to hear from you.',
    alternates: buildAlternates(locale, '/contact'),
  };
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
