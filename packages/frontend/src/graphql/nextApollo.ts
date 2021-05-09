import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client';
import { concatPagination } from '@apollo/client/utilities';

import { getToken } from '@/utils/cookie';

export const baseURL =
  process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3333';

function createApolloClient() {
  const Authorization = getToken();

  return new ApolloClient({
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            allPosts: concatPagination(),
          },
          keyFields: ['id'],
        },
      },
    }),
    link: new HttpLink({
      credentials: 'same-origin',
      headers: {
        Authorization,
      },
      uri: `${baseURL}/graphql`,
    }),
    ssrMode: typeof window === 'undefined',
  });
}

export function initializeApollo(
  initialState = null,
  createNew = false,
): ApolloClient<NormalizedCacheObject> {
  if (createNew) {
    const client = createApolloClient();

    return client;
  }

  const _apolloClient = createApolloClient();

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // gets hydrated here
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = _apolloClient.extract();
    // Restore the cache using the data passed from getStaticProps/getServerSideProps
    // combined with the existing cached data
    _apolloClient.cache.restore({ ...existingCache, ...initialState });
  }
  // For SSG and SSR always create a new Apollo Client
  if (typeof window === 'undefined') return _apolloClient;

  return _apolloClient;
}

export function useApollo(): ApolloClient<NormalizedCacheObject> {
  const store = initializeApollo();

  return store;
}
