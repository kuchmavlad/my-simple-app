import { rest } from "msw";

import { server } from "./server";
import {
  commentsMock,
  editedUserMock,
  newUserMock,
  postsEmptyMock,
  postsLimitedMock,
  postsMock,
  updatedUsersMock,
  userMock,
  usersMock,
} from "./moks";

import { ENDPOINT_PATH } from "../constants";
import { UserItem } from "../dtos";

export const setupPostsHandlers = () => {
  server.use(
    rest.get(ENDPOINT_PATH.POSTS, (req, res, ctx) => {
      return res(ctx.status(200), ctx.json(postsMock));
    })
  );
};

export const setupPostsEmptyHandlers = () => {
  server.use(
    rest.get(ENDPOINT_PATH.POSTS, (req, res, ctx) => {
      return res(ctx.status(200), ctx.json(postsEmptyMock));
    })
  );
};

export const setupPostsLimitedHandlers = () => {
  server.use(
    rest.get(`${ENDPOINT_PATH.POSTS}?_limit=10`, (req, res, ctx) => {
      return res(ctx.status(200), ctx.json(postsLimitedMock));
    })
  );
};

export const setupSinglePostHandlers = (postId: number) => {
  server.use(
    rest.get(`${ENDPOINT_PATH.POSTS}/${postId}`, (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json(postsMock.find(({ id }) => id === postId))
      );
    })
  );
};

export const setupPostCommentsHandlers = (postId: number) => {
  server.use(
    rest.get(`${ENDPOINT_PATH.COMMENTS}?postId=${postId}`, (req, res, ctx) => {
      return res(ctx.status(200), ctx.json(commentsMock));
    })
  );
};

export const setupPostCommentsEmptyHandlers = (postId: number) => {
  server.use(
    rest.get(`${ENDPOINT_PATH.COMMENTS}?postId=${postId}`, (req, res, ctx) => {
      return res(ctx.status(200), ctx.json([]));
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

export const setupPostsNewHandlers = () => {
  server.use(
    rest.post(ENDPOINT_PATH.POSTS, (req, res, ctx) => {
      return res(ctx.status(201), ctx.json({}));
    })
  );
};

export const setupUserLoginHandlers = (userEmail: string) => {
  server.use(
    rest.get(`${ENDPOINT_PATH.USERS}?email=${userEmail}`, (req, res, ctx) => {
      return res(ctx.status(200), ctx.json([userMock]));
    })
  );
};

export const setupUserLoginEmptyHandlers = (userEmail: string) => {
  server.use(
    rest.get(`${ENDPOINT_PATH.USERS}?email=${userEmail}`, (req, res, ctx) => {
      return res(ctx.status(200), ctx.json([]));
    })
  );
};

export const setupUserHandlers = (
  userId: number,
  updatedUserMock?: UserItem
) => {
  server.use(
    rest.get(`${ENDPOINT_PATH.USERS}/${userId}`, (req, res, ctx) => {
      return res(ctx.status(200), ctx.json(updatedUserMock ?? userMock));
    })
  );
};

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

export const setupNewUserHandlers = (userId: number) => {
  server.use(
    rest.get(`${ENDPOINT_PATH.USERS}/${userId}`, (req, res, ctx) => {
      return res(ctx.status(200), ctx.json(newUserMock));
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
