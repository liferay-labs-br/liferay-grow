import 'react-toastify/dist/ReactToastify.css';
import '@clayui/css/lib/css/atlas.css';
import '../../styles/globals.scss';

import { ApolloProvider } from '@apollo/client';
import { ClayIconSpriteContext } from '@clayui/icon';
import { AppProps } from 'next/app';
import React from 'react';
import { ToastContainer } from 'react-toastify';

import AppContext from '../AppContext';
import AppContextProvider from '../AppContextProvider';
import spritemap from '../assets/spritemap.svg';
import Layout from '../components/layout';
import { useApollo } from '../graphql/nextApollo';

const App = ({ Component, pageProps }: AppProps): React.ReactElement => {
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
                  ...apolloClient,
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

export default App;
