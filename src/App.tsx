import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { HomeIndex, UserPageIndex } from "components";
import {
  Root,
  ErrorPage,
  PostsPage,
  PostPage,
  UsersPage,
  UserPage,
  UserActionsPage,
  PostActionsPage,
  LoginPage,
} from "routes";

import { AuthProvider, RequireAuth } from "hoc";
import {
  loginAction,
  postsAction,
  usersAction,
  userAction,
  userActions,
  postActions,
} from "routes/actions";
import {
  postsLoader,
  postLoader,
  usersLoader,
  userLoader,
} from "routes/loaders";

import { PATHS } from "./constants";

const router = createBrowserRouter([
  {
    path: PATHS.ROOT,
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomeIndex /> },
      {
        path: PATHS.POSTS,
        element: <PostsPage />,
        loader: postsLoader,
        action: postsAction,
      },
      {
        path: PATHS.USER_POSTS,
        element: <PostsPage />,
        loader: postsLoader,
        action: postsAction,
      },
      {
        path: PATHS.POST,
        element: <PostPage />,
        loader: postLoader,
      },
      {
        path: PATHS.USER_POST,
        element: <PostPage />,
        loader: postLoader,
      },
      {
        path: PATHS.POST_NEW,
        element: (
          <RequireAuth>
            <PostActionsPage />
          </RequireAuth>
        ),
        action: postActions,
      },
      {
        path: PATHS.USER_POST_NEW,
        element: (
          <RequireAuth>
            <PostActionsPage />
          </RequireAuth>
        ),
        action: postActions,
      },
      {
        path: PATHS.POST_EDIT,
        element: (
          <RequireAuth>
            <PostActionsPage />
          </RequireAuth>
        ),
        action: postActions,
        loader: postLoader,
      },
      {
        path: PATHS.USER_POST_EDIT,
        element: (
          <RequireAuth>
            <PostActionsPage />
          </RequireAuth>
        ),
        action: postActions,
        loader: postLoader,
      },
      {
        path: PATHS.POST_DESTROY,
        element: (
          <RequireAuth>
            <PostActionsPage />
          </RequireAuth>
        ),
        action: postActions,
      },
      {
        path: PATHS.USER_POST_DESTROY,
        element: (
          <RequireAuth>
            <PostActionsPage />
          </RequireAuth>
        ),
        action: postActions,
      },
      {
        path: PATHS.USERS,
        element: (
          <RequireAuth>
            <UsersPage />
          </RequireAuth>
        ),
        loader: usersLoader,
        action: usersAction,
        children: [
          { index: true, element: <UserPageIndex /> },
          {
            path: PATHS.USER,
            element: <UserPage />,
            loader: userLoader,
            action: userAction,
          },
          {
            path: PATHS.USER_EDIT,
            element: <UserActionsPage />,
            loader: userLoader,
            action: userActions,
          },
          {
            path: PATHS.USER_NEW,
            element: <UserActionsPage />,
            action: userActions,
          },
          {
            path: PATHS.USER_DESTROY,
            element: <UserActionsPage />,
            action: userActions,
          },
        ],
      },
      {
        path: PATHS.LOGIN,
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
