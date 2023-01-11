import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { AuthProvider } from "hoc";
import { routesConfig } from "utils";

const router = createBrowserRouter(routesConfig);

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
};
