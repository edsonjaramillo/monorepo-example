import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import { Toast } from 'ui';

import { SessionWatcher } from '../components/context/SessionWatcher';
import { DesktopNavigation } from '../components/navigation/DesktopNavigation';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = { title: 'Web App', description: 'Monorepo Web App' };

type RootLayoutProperties = Readonly<{ children: React.ReactNode }>;

export default function RootLayout({ children }: RootLayoutProperties) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <DesktopNavigation />
        {children}
        <Toast />
        <SessionWatcher />
      </body>
    </html>
  );
}
