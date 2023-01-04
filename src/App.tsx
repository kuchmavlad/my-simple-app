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
        loader: postsLoader,
        action: postsAction,
      },
      {
        path: "posts/:userId",
        element: <PostsPage />,
        loader: postsLoader,
        action: postsAction,
      },
      {
        path: "post/:postId",
        element: <PostPage />,
        loader: postLoader,
      },
      {
        path: "post/:userId/:postId",
        element: <PostPage />,
        loader: postLoader,
      },
      {
        path: "post/new",
        element: (
          <RequireAuth>
            <PostActionsPage />
          </RequireAuth>
        ),
        action: postActions,
      },
      {
        path: "post/:userId/new",
        element: (
          <RequireAuth>
            <PostActionsPage />
          </RequireAuth>
        ),
        action: postActions,
      },
      {
        path: "post/:postId/edit",
        element: (
          <RequireAuth>
            <PostActionsPage />
          </RequireAuth>
        ),
        action: postActions,
        loader: postLoader,
      },
      {
        path: "post/:userId/:postId/edit",
        element: (
          <RequireAuth>
            <PostActionsPage />
          </RequireAuth>
        ),
        action: postActions,
        loader: postLoader,
      },
      {
        path: "post/:postId/destroy",
        element: (
          <RequireAuth>
            <PostActionsPage />
          </RequireAuth>
        ),
        action: postActions,
      },
      {
        path: "post/:userId/:postId/destroy",
        element: (
          <RequireAuth>
            <PostActionsPage />
          </RequireAuth>
        ),
        action: postActions,
      },
      {
        path: "users",
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
            path: ":userId",
            element: <UserPage />,
            loader: userLoader,
            action: userAction,
          },
          {
            path: ":userId/edit",
            element: <UserActionsPage />,
            loader: userLoader,
            action: userActions,
          },
          {
            path: ":userId/new",
            element: <UserActionsPage />,
            action: userActions,
          },
          {
            path: ":userId/destroy",
            element: <UserActionsPage />,
            action: userActions,
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
