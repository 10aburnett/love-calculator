import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us - LoveCalcs.com',
  description: 'Get in touch with the LoveCalcs.com team. Questions, feedback, or partnership inquiries - we\'d love to hear from you.',
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
