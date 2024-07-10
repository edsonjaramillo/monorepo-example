import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { Inter } from 'next/font/google';

import { Toast } from 'ui';

import { PostHogProvider } from '../components/analytics/PostHogProvider';
import { SessionWatcher } from '../components/context/SessionWatcher';
import { DesktopNavigation } from '../components/navigation/DesktopNavigation';
import './globals.css';

const PostHogPageView = dynamic(async () => import('../components/analytics/PostHogView'), {
  ssr: false,
});

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = { title: 'Web App', description: 'Monorepo Web App' };

type RootLayoutProperties = Readonly<{ children: React.ReactNode }>;

export default function RootLayout({ children }: RootLayoutProperties) {
  return (
    <html lang="en">
      <PostHogProvider>
        <body className={inter.className}>
          <DesktopNavigation />
          {children}
          <Toast />
          <SessionWatcher />
          <PostHogPageView />
        </body>
      </PostHogProvider>
    </html>
  );
}
