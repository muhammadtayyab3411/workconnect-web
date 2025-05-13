import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms & Conditions | WorkConnect',
  description: 'Understand how we protect your rights and ensure fair use for all at WorkConnect.',
};

export default function TermsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
} 