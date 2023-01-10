import React, { createContext, ReactElement } from "react";

import { UserItem, Nullable } from "dtos";
import { useAsyncState } from "hooks";

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
  const [user, setUser] = useAsyncState<Nullable<UserItem>>(null);

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
