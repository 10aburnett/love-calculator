import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Relationship Quiz - Are You Compatible? Free Couples Test',
  description: 'Take our comprehensive relationship quiz to discover your compatibility score. Free couples test with personalized insights about your relationship dynamics.',
  keywords: ['relationship quiz', 'couples quiz', 'compatibility quiz', 'relationship test'],
  alternates: {
    canonical: '/relationship-quiz',
  },
  openGraph: {
    title: 'Relationship Quiz - Are You Compatible? Free Couples Test',
    description: 'Take our comprehensive relationship quiz to discover your compatibility score.',
    url: '/relationship-quiz',
    type: 'website',
  },
};

export default function RelationshipQuizLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
} 