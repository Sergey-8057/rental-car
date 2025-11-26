import type { Metadata } from 'next';
import { Manrope, Inter } from 'next/font/google';

import Header from '@/components/Header/Header';
// import 'modern-normalize';
import './globals.css';

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-family',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--second-family',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Rental car',
  description: 'Website for rental car',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${manrope.variable} ${inter.variable}`}>
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}
