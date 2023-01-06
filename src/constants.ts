export enum PATHS {
  ROOT = "/",
  POSTS = "posts",
  POST = "post/:postId",
  POST_NEW = "post/new",
  POST_EDIT = "post/:postId/edit",
  POST_DESTROY = "post/:postId/destroy",
  USER_POSTS = "posts/:userId",
  USER_POST = "post/:userId/:postId",
  USER_POST_NEW = "post/:userId/new",
  USER_POST_EDIT = "post/:userId/:postId/edit",
  USER_POST_DESTROY = "post/:userId/:postId/destroy",
  USERS = "users",
  USER = ":userId",
  USER_EDIT = ":userId/edit",
  USER_NEW = ":userId/new",
  USER_DESTROY = ":userId/destroy",
  LOGIN = "/login",
  ALBUMS = "albums",
  NEW = "new",
  EDIT = "edit",
  DESTROY = "destroy",
}
export enum ENDPOINT_PATH {
  USERS = "http://localhost:3001/users",
  POSTS = "http://localhost:3001/posts",
  COMMENTS = "http://localhost:3001/comments",
}

export enum HTTP_METHODS {
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
  GET = "GET",
  PATCH = "PATCH",
}

export enum FORM_METHODS {
  POST = "post",
  GET = "get",
}
