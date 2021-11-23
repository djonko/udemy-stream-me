import React, { useState, useContext, createContext, useEffect } from "react";
import { useApolloClient } from "@apollo/client";
import { useRouter } from "next/router";

import {
  useSignInMutation,
  useCurrentUserQuery,
  useSignUpMutation,
  User,
  SignInMutationVariables,
  SignUpMutationVariables,
} from "generated/types";
import { HOME_LOGIN_PATH, TOKEN_KEY } from "./constant";

type AuthProps = {
  user: any;
  error: string;
  signIn: (email: any, password: any) => Promise<void>;
  signUp: (email: any, password: any) => Promise<void>;
  signOut: () => Promise<void>;
};

function useProviderAuth() {
  const client = useApolloClient();
  const router = useRouter();
  const [error, setError] = useState("");
  const { data } = useCurrentUserQuery({
    fetchPolicy: "network-only",
    errorPolicy: "ignore",
  });
  const user = data && (data.currentUser ? (data.currentUser as User) : null);

  // Signing In and signing Up
  // Pass mutation to useMutation
  const [signInMutation] = useSignInMutation();
  const [signUpMutation] = useSignUpMutation();
  const signIn = async (email, password) => {
    try {
      const varSignUp = {
        loginInput: { email, password },
      } as SignInMutationVariables;
      const { data } = await signInMutation({ variables: varSignUp });
      if (data.login.token && data.login.user) {
        sessionStorage.setItem(TOKEN_KEY, data.login.token);
        // reset apollo store after login user and route user  to home page
        client.resetStore().then(() => {
          router.push(HOME_LOGIN_PATH);
        });
      } else {
        setError("Invalid login");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const signUp = async (email, password) => {
    try {
      const varSignUp = {
        registerInput: { email, password },
      } as SignUpMutationVariables;
      const { data } = await signUpMutation({ variables: varSignUp });
      if (data.register.token && data.register.user) {
        sessionStorage.setItem(TOKEN_KEY, data.register.token);
        client.resetStore().then(() => {
          router.push(HOME_LOGIN_PATH);
        });
      } else {
        setError("Invalid sign Up");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const signOut = () => {
    sessionStorage.removeItem(TOKEN_KEY);
    client.resetStore().then(() => {
      router.push(HOME_LOGIN_PATH);
    });
  };

  return { user, error, signIn, signOut, signUp } as AuthProps;
}

const authContext = createContext<Partial<AuthProps>>({});

// You can wrap your _app.tsx with this provider
export function AuthProvider({ children }) {
  const auth = useProviderAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

// Custom react hook to access the context
export const useAuth = () => useContext(authContext);
