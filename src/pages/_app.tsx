/* eslint-disable unicorn/prevent-abbreviations */
/* eslint-disable react/no-unknown-property */
import '@/css/globals.css';
import '@/scss/globals.scss';

import type { AppProps, AppType } from 'next/app';
import { Roboto } from 'next/font/google';
import { type Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import React from 'react';
import { Provider } from 'react-redux';

import store from '@/store/store';
import { api } from '@/utils/api';

const roboto = Roboto({
  weight: ['400', '500', '700', '900'],
  style: 'normal',
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'arial'],
  adjustFontFallback: true,
  variable: '--roboto'
});

const App: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps }
}: AppProps) => {
  return (
    <>
      <style jsx global>{`
        body {
          font-family: ${roboto.style.fontFamily};
        }
      `}</style>

      <SessionProvider session={session}>
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </SessionProvider>
    </>
  );
};

export default api.withTRPC(App);
