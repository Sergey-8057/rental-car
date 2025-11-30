import type { Metadata } from 'next';
import { Toaster } from 'react-hot-toast';
import { Manrope, Inter } from 'next/font/google';

import TanStackProvider from '@/components/TanStackProvider/TanStackProvider';
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
        <TanStackProvider>
          <Header />
          <main>
            <Toaster />
            {children}
          </main>
        </TanStackProvider>
      </body>
    </html>
  );
}
