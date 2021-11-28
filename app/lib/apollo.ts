import { useMemo } from "react";
import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
  HttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

let apolloClient: ApolloClient<NormalizedCacheObject> | undefined;

function createApolloClient() {
  //create an authentication link
  const authLink = setContext((_, { headers }) => {
    // get authentication token from sessionStorage if it exits
    // sessionStorage vs localeStorage
    const token = sessionStorage.getItem("token");
    // return headers so httpLinks can read them
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
      },
    };
  });

  const httpLinks = new HttpLink({
    uri: "http://localhost:8000/graphql",
    credentials: "include",
  });

  return new ApolloClient({
    link: authLink.concat(httpLinks),
    cache: new InMemoryCache(),
  });
}

// initialize apollo Client with context and initialize the state

export function initializeApollo(initialState: any = null) {
  const _apolloClient = apolloClient ?? createApolloClient();

  // initial apollo client state get re-hydrated here
  if (initialState) {
    _apolloClient.cache.restore(initialState);
  }

  // for SSR or SSG always create a new apolloClient
  if (typeof window === "undefined") return _apolloClient;

  // create apollo client once in the client
  if (!apolloClient) apolloClient = _apolloClient;
  return _apolloClient;
}

export function useApollo(
  initialState: any,
): ApolloClient<NormalizedCacheObject> {
  const store = useMemo(() => initializeApollo(initialState), [initialState]);
  return store;
}
