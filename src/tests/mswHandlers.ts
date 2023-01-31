import { rest } from "msw";

import { server } from "./server";
import {
  commentsMock,
  editedUserMock,
  favoriteUser,
  newUserMock,
  postsLimitedMock,
  postsMock,
  updatedUsersMock,
  userMock,
  usersMock,
} from "./moks";

import { ENDPOINT_PATH } from "../constants";
import { CommentType, PostsItem, UserItem } from "../dtos";

// Posts Handlers
export const setupPostsHandlers = (customMock?: PostsItem[]) => {
  server.use(
    rest.get(ENDPOINT_PATH.POSTS, (req, res, ctx) => {
      const limit = req.url.searchParams.get("_limit");
      return res(
        ctx.status(200),
        ctx.json(customMock ? customMock : limit ? postsLimitedMock : postsMock)
      );
    })
  );
};

// Post Handlers
export const setupPostHandlers = (postId: number) => {
  server.use(
    rest.get(`${ENDPOINT_PATH.POSTS}/${postId}`, (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json(postsMock.find(({ id }) => id === postId))
      );
    })
  );
};

export const setupPostNewHandlers = () => {
  server.use(
    rest.post(ENDPOINT_PATH.POSTS, (req, res, ctx) => {
      return res(ctx.status(201), ctx.json({}));
    })
  );
};

export const setupPostDeleteHandlers = (postId: number) => {
  server.use(
    rest.delete(`${ENDPOINT_PATH.POSTS}/${postId}`, (req, res, ctx) => {
      return res(ctx.status(200), ctx.json({}));
    })
  );
};

export const setupPostEditHandlers = (postId: number) => {
  server.use(
    rest.put(`${ENDPOINT_PATH.POSTS}/${postId}`, (req, res, ctx) => {
      return res(ctx.status(200), ctx.json({}));
    })
  );
};

// Comments Handlers
export const setupPostCommentsHandlers = (customMock?: CommentType[]) => {
  server.use(
    rest.get(`${ENDPOINT_PATH.COMMENTS}`, (req, res, ctx) => {
      return res(ctx.status(200), ctx.json(customMock ?? commentsMock));
    })
  );
};

// User Handlers
export const setupUserLoginHandlers = (customMock?: UserItem[]) => {
  server.use(
    rest.get(`${ENDPOINT_PATH.USERS}`, (req, res, ctx) => {
      return res(ctx.status(200), ctx.json(customMock ?? [userMock]));
    })
  );
};

export const setupUserHandlers = (userId: number, customMock?: UserItem) => {
  server.use(
    rest.get(`${ENDPOINT_PATH.USERS}/${userId}`, (req, res, ctx) => {
      return res(ctx.status(200), ctx.json(customMock ?? userMock));
    })
  );
};

export const setupUserFavoriteHandlers = (userId: number) => {
  server.use(
    rest.patch(`${ENDPOINT_PATH.USERS}/${userId}`, (req, res, ctx) => {
      return res(ctx.status(200), ctx.json(favoriteUser));
    })
  );
};

export const setupEditedUserHandlers = (userId: number) => {
  server.use(
    rest.put(`${ENDPOINT_PATH.USERS}/${userId}`, (req, res, ctx) => {
      return res(ctx.status(200), ctx.json(editedUserMock));
    })
  );
};

export const setupUserDeleteHandlers = (userId: number) => {
  server.use(
    rest.delete(`${ENDPOINT_PATH.USERS}/${userId}`, (req, res, ctx) => {
      return res(ctx.status(200), ctx.json({}));
    })
  );
};

// Users Handlers
export const setupUsersHandlers = (updatedUsersMock?: UserItem[]) => {
  server.use(
    rest.get(`${ENDPOINT_PATH.USERS}`, (req, res, ctx) => {
      return res(ctx.status(200), ctx.json(updatedUsersMock ?? usersMock));
    })
  );
};

export const setupUsersPostHandlers = () => {
  server.use(
    rest.post(`${ENDPOINT_PATH.USERS}`, (req, res, ctx) => {
      return res(ctx.status(201), ctx.json(newUserMock));
    })
  );
};

export const setupUsersUpdatedHandlers = () => {
  server.use(
    rest.get(`${ENDPOINT_PATH.USERS}`, (req, res, ctx) => {
      return res(ctx.status(200), ctx.json(updatedUsersMock));
    })
  );
};

export const setupUsersEmptyHandlers = () => {
  server.use(
    rest.get(`${ENDPOINT_PATH.USERS}`, (req, res, ctx) => {
      return res(ctx.status(200), ctx.json([]));
    })
  );
};

export const setupUsersFilterHandlers = (inputText: string) => {
  server.use(
    rest.get(`${ENDPOINT_PATH.USERS}?q=${inputText}`, (req, res, ctx) => {
      return res(ctx.status(200), ctx.json([userMock]));
    })
  );
};

export const setupUsersFilterEmptyHandlers = (inputText: string) => {
  server.use(
    rest.get(`${ENDPOINT_PATH.USERS}?q=${inputText}`, (req, res, ctx) => {
      return res(ctx.status(200), ctx.json([]));
    })
  );
};
