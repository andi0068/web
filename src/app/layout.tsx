import type { Metadata } from 'next';
import { Source_Sans_3 } from 'next/font/google';

import { Provider } from '@/context/state';
import { AuthInitiator, FoldersInitiator, NotesInitiator, Redirector } from '@/hooks';
import { REDIRECT_PATHS } from '@/config/constants';
import { siteConfig } from '@/config/site';

import './globals.css';

const sans = Source_Sans_3({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
  icons: [
    { rel: 'apple-touch-icon', url: '/apple-touch-icon.png', sizes: '180x180' },
    { rel: 'icon', type: 'image/png', url: '/favicon-32x32.png', sizes: '32x32' },
    { rel: 'icon', type: 'image/png', url: '/favicon-16x16.png', sizes: '16x16' },
  ],
  manifest: '/site.webmanifest',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={sans.className}>
        <Provider>
          {children}
          <AuthInitiator />
          <FoldersInitiator />
          <NotesInitiator />
          <Redirector paths={REDIRECT_PATHS} />
        </Provider>
      </body>
    </html>
  );
}
