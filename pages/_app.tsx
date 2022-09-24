import { SessionProvider } from 'next-auth/react';

import '@/styles/main.scss';
import type { AppProps } from 'next/app';
import { Session } from 'next-auth';

type CustomAppProps = AppProps & {
  pageProps: { session?: Session };
};

function MyApp({ Component, pageProps: { session, ...pageProps } }: CustomAppProps) {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />;
    </SessionProvider>
  );
}

export default MyApp;
