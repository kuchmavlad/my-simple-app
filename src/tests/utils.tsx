import * as React from "react";
import {
  createMemoryRouter,
  RouteObject,
  RouterProvider,
} from "react-router-dom";
import { render } from "@testing-library/react";

import { AuthContext, AuthProvider } from "../hoc/AuthProvider";
import { routesConfig } from "utils";
import { AuthInitialStateProps, MemoryRoutOptionsType } from "dtos";

export const renderWithRouter = (
  routes?: RouteObject[],
  opts?: MemoryRoutOptionsType
) => {
  const router = createMemoryRouter(routes || routesConfig, opts);

  return render(<RouterProvider router={router} />);
};

export const renderWithRouterAndCustomProviderState = (
  providerState: AuthInitialStateProps,
  routes?: RouteObject[],
  opts?: MemoryRoutOptionsType
) => {
  const router = createMemoryRouter(routes || routesConfig, opts);

  return render(
    <AuthContext.Provider value={providerState}>
      <RouterProvider router={router} />
    </AuthContext.Provider>
  );
};

export const renderWithRouterAndProvider = (
  routes?: RouteObject[],
  opts?: MemoryRoutOptionsType
) => {
  const router = createMemoryRouter(routes || routesConfig, opts);

  return render(
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
};
