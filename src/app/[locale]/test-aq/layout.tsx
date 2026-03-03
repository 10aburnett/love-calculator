import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AQ Algorithm Test Page',
  robots: {
    index: false,
    follow: false,
  },
};

export default function TestAQLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
