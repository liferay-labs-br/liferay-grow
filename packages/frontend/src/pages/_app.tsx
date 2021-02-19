import '../../styles/globals.scss';
import '@clayui/css/lib/css/atlas.css';
import 'react-toastify/dist/ReactToastify.css';

import { ApolloProvider } from '@apollo/client';
import { ClayIconSpriteContext } from '@clayui/icon';
import { AppProps } from 'next/app';
import React from 'react';
import { ToastContainer } from 'react-toastify';

import AppContext from '../AppContext';
import AppContextProvider from '../AppContextProvider';
import Layout from '../components/Layout';
import { useApollo } from '../graphql/nextApollo';

const spritemap = require('../assets/spritemap.svg');

const MyApp = ({ Component, pageProps }: AppProps): React.ReactElement => {
  const apolloClient = useApollo(pageProps.initialApolloState);

  return (
    <ClayIconSpriteContext.Provider value={spritemap}>
      <ToastContainer position="bottom-left" />
      <AppContextProvider>
        <AppContext.Consumer>
          {({ state }) => {
            const token = state.user.token;
            const language = state.portal.languageId;
            apolloClient.link.options.headers.Authorization = `Bearer ${token}`;
            apolloClient.link.options.headers['Accept-Language'] = language;

            return (
              <ApolloProvider
                client={{
                  ...apolloClient
                }}
              >
                <Layout>
                  <Component {...pageProps} />
                </Layout>
              </ApolloProvider>
            );
          }}
        </AppContext.Consumer>
      </AppContextProvider>
    </ClayIconSpriteContext.Provider>
  );
};

export default MyApp;
