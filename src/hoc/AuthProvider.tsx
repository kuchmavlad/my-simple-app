import React, { createContext, ReactElement, useState } from "react";

import { UserItem } from "dtos/UserItem";
import { Nullable } from "dtos/globalTypes";

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
  const [user, setUser] = useState<Nullable<UserItem>>(null);

  const signIn = (user: UserItem, cb: () => void) => {
    setUser(user);
    cb();
  };

  const signOut = (cb: () => void) => {
    setUser(null);
    cb();
  };

  const value = { signIn, signOut, user };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
