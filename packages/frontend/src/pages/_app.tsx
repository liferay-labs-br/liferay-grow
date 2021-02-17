import '../../styles/globals.scss';
import '@clayui/css/lib/css/atlas.css';
import 'react-toastify/dist/ReactToastify.css';

import { ApolloProvider } from '@apollo/client';
import { ClayIconSpriteContext } from '@clayui/icon';
import React from 'react';
import { ToastContainer } from 'react-toastify';

import Layout from '../components/Layout';
import { useApollo } from '../graphql/nextApollo';

const spritemap = require('../assets/spritemap.svg');

const MyApp = ({ Component, pageProps }): React.ReactElement => {
  const apolloClient = useApollo(pageProps.initialApolloState);
  return (
    <ClayIconSpriteContext.Provider value={spritemap}>
      <ApolloProvider client={apolloClient}>
        <ToastContainer position="bottom-left" />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ApolloProvider>
    </ClayIconSpriteContext.Provider>
  );
};

export default MyApp;
