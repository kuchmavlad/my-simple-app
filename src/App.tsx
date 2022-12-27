import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { HomeIndex, UserPageIndex } from "components";
import {
  Root,
  ErrorPage,
  PostsPage,
  SinglePostPage,
  UsersPage,
  UserPage,
  UserEditPage,
  NewPostPage,
} from "routes";

import { loginAction, LoginPage } from "routes/LoginPage/LoginPage";
import { postAction, postLoader } from "routes/PostsPage/PostsPage";
import { singPostLoader } from "routes/SinglePostPage/SinglePostPage";
import { userAction, usersLoader } from "routes/UsersPage/UsersPage";
import { createUserAction, userLoader } from "routes/UserPage/UserPage";
import { userEditAction } from "routes/UserEditPage/UserEditPage";
import {
  userCreateAction,
  UserCreatePage,
} from "routes/UserCreatePage/UserCreatePage";
import { favoriteAction } from "components/Favorite/Favorite";

import { AuthProvider, RequireAuth } from "hoc";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomeIndex /> },
      {
        path: "posts",
        element: <PostsPage />,
        loader: postLoader,
        action: postAction,
      },
      {
        path: "posts/:id",
        element: <SinglePostPage />,
        loader: singPostLoader,
      },
      {
        path: "posts/new",
        element: <NewPostPage />,
      },
      {
        path: "users",
        element: (
          <RequireAuth>
            <UsersPage />
          </RequireAuth>
        ),
        loader: usersLoader,
        action: userAction,
        children: [
          { index: true, element: <UserPageIndex /> },
          {
            path: ":id",
            element: <UserPage />,
            loader: userLoader,
            action: favoriteAction,
          },
          {
            path: ":id/edit",
            element: <UserEditPage />,
            loader: userLoader,
            action: userEditAction,
          },
          {
            path: ":id/new",
            element: <UserCreatePage />,
            action: userCreateAction,
          },
          {
            path: ":id/destroy",
            element: <UserCreatePage />,
            action: createUserAction,
          },
        ],
      },
      {
        path: "login",
        element: <LoginPage />,
        action: loginAction,
      },
    ],
  },
]);

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
};
