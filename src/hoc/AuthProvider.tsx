import React, { createContext, ReactElement } from "react";

import { UserItem } from "dtos/UserItem";
import { Nullable } from "dtos/globalTypes";
import { useAsyncState } from "hooks/useAsyncState";

interface AuthProviderProps {
  children: ReactElement;
}

interface authInitialStateProps {
  user: Nullable<UserItem>;
  signIn: (user: UserItem, cb: () => void) => void;
  signOut: (cb: () => void) => void;
}

const authInitialState: authInitialStateProps = {
  user: null,
  signIn: () => {},
  signOut: () => {},
};

export const AuthContext = createContext(authInitialState);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useAsyncState(null);

  const signIn = async (user: UserItem, cb: () => void) => {
    await setUser(user);
    cb();
  };

  const signOut = async (cb: () => void) => {
    await setUser(null);
    cb();
  };

  const value = { signIn, signOut, user };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
