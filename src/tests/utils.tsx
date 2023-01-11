import * as React from "react";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import { render } from "@testing-library/react";

import { AuthContext } from "../hoc/AuthProvider";
import { routesConfig } from "utils";
import { AuthInitialStateProps } from "dtos";

export const renderWithRouter = (
  initialEntries?: string[],
  initialIndex?: number
) => {
  const router = createMemoryRouter(routesConfig, {
    initialEntries,
    initialIndex,
  });

  return render(<RouterProvider router={router} />);
};

export const renderWithRouterAndProvider = (
  providerState: AuthInitialStateProps,
  initialEntries?: string[],
  initialIndex?: number
) => {
  const router = createMemoryRouter(routesConfig, {
    initialEntries,
    initialIndex,
  });

  return render(
    <AuthContext.Provider value={providerState}>
      <RouterProvider router={router} />
    </AuthContext.Provider>
  );
};
