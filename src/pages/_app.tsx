import { useStore } from 'react-redux';
import type { AppProps } from 'next/app';
import { ApolloProvider } from '@apollo/client';
import Head from 'next/head';
import { ThemeProvider } from '@mui/material/styles';
import { CacheProvider, EmotionCache } from '@emotion/react';
import CssBaseline from '@mui/material/CssBaseline';
import wrapper from 'src/redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import { MinimalLayout } from 'src/layouts/';

import createEmotionCache from '../styles/createEmotionCache';
import theme from '../styles/theme';
import React from 'react';
import { Loader } from 'src/components';
import { apolloClient } from 'src/utils';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

const ReduxLoader = () => (
  <MinimalLayout>
    <Loader />
  </MinimalLayout>
);

const App = function MyApp({
  Component,
  emotionCache = clientSideEmotionCache,
  pageProps,
}: MyAppProps) {
  const store = useStore();
  return (
    <React.Fragment>
      {/* // eslint-disable-next-line 
      @ts-ignore */}
      <PersistGate persistor={store.__persistor} loading={<ReduxLoader />}>
        <CacheProvider value={emotionCache}>
          <Head>
            <title>Pokedex</title>
          </Head>
          <ApolloProvider client={apolloClient}>
            <ThemeProvider theme={theme}>
              {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
              <CssBaseline />
              <Component {...pageProps} />
            </ThemeProvider>
          </ApolloProvider>
        </CacheProvider>
      </PersistGate>
    </React.Fragment>
  );
};

export default wrapper.withRedux(App);
