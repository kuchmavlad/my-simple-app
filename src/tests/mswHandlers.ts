import { rest } from "msw";

import { server } from "./server";
import {
  commentsMock,
  postsEmptyMock,
  postsLimitedMock,
  postsMock,
} from "./moks";
import { ENDPOINT_PATH } from "../constants";

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
