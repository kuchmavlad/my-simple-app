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
  UserActionsPage,
  PostActionsPage,
  LoginPage,
} from "routes";

import { loginAction } from "routes/LoginPage/LoginPage";
import { postAction, postLoader } from "routes/PostsPage/PostsPage";
import { singPostLoader } from "routes/SinglePostPage/SinglePostPage";
import { userAction, usersLoader } from "routes/UsersPage/UsersPage";
import { userLoader } from "routes/UserPage/UserPage";
import { userActions } from "routes/UserActionsPage/UserActionsPage";
import {
  newPosAction,
  newPostLoader,
} from "routes/PostActionsPage/PostActionsPage";
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
        path: "posts/:userId",
        element: <PostsPage />,
        loader: postLoader,
        action: postAction,
      },
      {
        path: "post/:postId",
        element: <SinglePostPage />,
        loader: singPostLoader,
      },
      {
        path: "post/:userId/:postId",
        element: <SinglePostPage />,
        loader: singPostLoader,
      },
      {
        path: "post/new",
        element: (
          <RequireAuth>
            <PostActionsPage />
          </RequireAuth>
        ),
        action: newPosAction,
      },
      {
        path: "post/:userId/new",
        element: (
          <RequireAuth>
            <PostActionsPage />
          </RequireAuth>
        ),
        action: newPosAction,
      },
      {
        path: "post/:postId/edit",
        element: (
          <RequireAuth>
            <PostActionsPage />
          </RequireAuth>
        ),
        action: newPosAction,
        loader: newPostLoader,
      },
      {
        path: "post/:userId/:postId/edit",
        element: (
          <RequireAuth>
            <PostActionsPage />
          </RequireAuth>
        ),
        action: newPosAction,
        loader: newPostLoader,
      },
      {
        path: "post/:postId/destroy",
        element: (
          <RequireAuth>
            <PostActionsPage />
          </RequireAuth>
        ),
        action: newPosAction,
      },
      {
        path: "post/:userId/:postId/destroy",
        element: (
          <RequireAuth>
            <PostActionsPage />
          </RequireAuth>
        ),
        action: newPosAction,
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
            path: ":userId",
            element: <UserPage />,
            loader: userLoader,
            action: favoriteAction,
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
