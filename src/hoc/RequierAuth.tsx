import React, { ReactElement } from "react";
import { Navigate, useLocation } from "react-router-dom";

import { useAuth } from "hooks";
import { PATHS } from "../constants";

interface RequireAuthProps {
  children: ReactElement;
}

export const RequireAuth: React.FC<RequireAuthProps> = ({ children }) => {
  const location = useLocation();
  const { user } = useAuth();

  if (!user) {
    return <Navigate to={PATHS.LOGIN} state={{ from: location }} />;
  }

  return children;
};
