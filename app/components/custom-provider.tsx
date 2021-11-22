import { ApolloProvider } from "@apollo/client";
import { useApollo } from "lib/apollo";
import React from "react";
import { MockedProvider } from "@apollo/client/testing";
// repere https://github.com/laij84/apollo-mocked-provider/blob/master/src/App.tsx
interface ProviderProps {
  useMocks?: boolean;
  initialApolloState?: any;
}

export const CustomProvider: React.FC<ProviderProps> = ({
  useMocks,
  initialApolloState,
  children,
}) => {
  const apolloClient = useApollo(initialApolloState);

  if (useMocks)
    return (
      <MockedProvider mocks={[]}>
        <>{children}</>
      </MockedProvider>
    );
  return (
    <ApolloProvider client={apolloClient}>
      <>{children}</>
    </ApolloProvider>
  );
};
