import React from 'react';
import { Work_Sans, Spline_Sans_Mono } from 'next/font/google';
import clsx from 'clsx';

import { LIGHT_TOKENS, DARK_TOKENS, BLOG_TITLE } from '@/constants';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import './styles.css';
import { cookies } from 'next/headers';
import MotionConfigProvider from '@/components/MotionConfigProvider';

export const metadata = {
  title: BLOG_TITLE,
  description: 'A wonderful blog about JavaScript',
};

const mainFont = Work_Sans({
  subsets: ['latin'],
  display: 'fallback',
  weight: 'variable',
  variable: '--font-family',
});
const monoFont = Spline_Sans_Mono({
  subsets: ['latin'],
  display: 'fallback',
  weight: 'variable',
  variable: '--font-family-mono',
});

function RootLayout({ children }) {
  const theme = cookies().get('color-theme') || 'light';

  return (
    <MotionConfigProvider>
      <html
        lang="en"
        className={clsx(mainFont.variable, monoFont.variable)}
        data-color-theme={theme}
        style={theme === 'light' ? LIGHT_TOKENS : DARK_TOKENS}>
        <body>
          <Header initialTheme={theme} />
          <main>{children}</main>
          <Footer />
        </body>
      </html>
    </MotionConfigProvider>
  );
}

export default RootLayout;
