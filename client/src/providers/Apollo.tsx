import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
} from '@apollo/client';
import withApollo from 'next-with-apollo';
import React from 'react';
import { onError } from '@apollo/client/link/error';
import { isServer } from '../utils';

/* -------------------------------------------------------------------------- */
/*                                 Error link                                 */
/* -------------------------------------------------------------------------- */

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    );

  if (networkError) console.log(`[Network error]: ${networkError}`);
});

/* -------------------------------------------------------------------------- */
/*                                  Http link                                 */
/* -------------------------------------------------------------------------- */

export default withApollo(
  ({ initialState = {}, ctx }) => {
    const headers: Record<string, string> = {};

    const cookie = isServer() ? ctx?.req?.headers.cookie : undefined;
    if (cookie) {
      headers.cookie = cookie;
    }

    const uri = process.env.API_URL;

    const httpLink = new HttpLink({
      uri,
      headers,
    });

    return new ApolloClient({
      link: ApolloLink.from([errorLink, httpLink]),
      ssrMode: isServer(),
      headers,
      // Note for Next.js:
      // If you set this to a small value like "100", it will cause a rendering value.
      // e.g, Expected server HTML to contain a matching <a> in <div>.
      // And the page will look broken.
      // https://www.apollographql.com/docs/react/performance/server-side-rendering/
      // If you are using fetchPolicy: network-only or fetchPolicy: cache-and-network on some of the initial queries,
      // you can pass the ssrForceFetchDelay option to skip force fetching during initialization,
      // so that even those queries run using the cache:
      ssrForceFetchDelay: 5000,
      cache: new InMemoryCache().restore(initialState || {}),
    });
  },
  {
    // eslint-disable-next-line react/display-name
    render: ({ Page, props }) => {
      return (
        <ApolloProvider client={props.apollo}>
          <Page {...props} />
        </ApolloProvider>
      );
    },
  }
);
