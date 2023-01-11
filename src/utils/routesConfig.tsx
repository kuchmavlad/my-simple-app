import { HomeIndex, UserPageIndex } from "components";
import { PATHS } from "../constants";
import { RequireAuth } from "hoc";
import {
  ErrorPage,
  LoginPage,
  PostActionsPage,
  PostPage,
  PostsPage,
  Root,
  UserActionsPage,
  UserPage,
  UsersPage,
} from "routes";

import {
  postsAction,
  postActions,
  usersAction,
  userAction,
  userActions,
  loginAction,
} from "routes/actions";
import {
  postsLoader,
  postLoader,
  usersLoader,
  userLoader,
} from "routes/loaders";

export const routesConfig = [
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
];
