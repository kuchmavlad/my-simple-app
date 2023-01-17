import React from "react";
import {
  Form,
  LoaderFunctionArgs,
  redirect,
  useLoaderData,
  useMatches,
  useNavigate,
} from "react-router-dom";

import { useAuth } from "hooks";
import { PostLoaderType } from "dtos";
import {
  ENDPOINT_PATH,
  FORM_METHODS,
  HTTP_METHODS,
  PATHS,
} from "../../constants";

import "./postActionsPage.css";

export const PostActionsPage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const postData = useLoaderData() as PostLoaderType | undefined;
  const [, { pathname }] = useMatches();

  const isNewPost = pathname.includes(PATHS.NEW);
  const userIdValue = isNewPost ? user?.id : postData?.post.userId;

  return (
    <Form method={FORM_METHODS.POST} id="new-post">
      <input hidden name="userId" defaultValue={userIdValue} />

      <div className="postActionWrapper">
        <h2>{isNewPost ? "New" : "Edit"} post</h2>

        <div className="inputWrapper">
          <input
            required
            placeholder="Title"
            aria-label="title"
            type="text"
            name="title"
            defaultValue={postData?.post.title}
          />
          <textarea
            required
            placeholder="Description"
            name="body"
            defaultValue={postData?.post.body}
          />
        </div>

        <div>
          <button type="submit">Save</button>
          <button type="button" onClick={() => navigate(-1)}>
            Cancel
          </button>
        </div>
      </div>
    </Form>
  );
};

export const postActions = async ({ request, params }: LoaderFunctionArgs) => {
  const formData = await request.formData();
  const updates = Object.fromEntries(formData);
  const userId = Number(formData.get("userId"));
  const url = ENDPOINT_PATH.POSTS;
  const headers = {
    "Content-type": "application/json; charset=UTF-8",
  };

  const redirectPath = `/${PATHS.POSTS}${
    params.userId ? `/${params.userId}` : ""
  }`;

  if (request.url.includes(PATHS.NEW)) {
    const uniqId = Date.now();
    const newPost = { ...updates, id: uniqId, userId };

    return fetch(url, {
      method: HTTP_METHODS.POST,
      body: JSON.stringify(newPost),
      headers,
    }).then(() => redirect(redirectPath));
  } else if (request.url.includes(PATHS.EDIT)) {
    const newPost = { ...updates, userId };

    return fetch(`${url}/${params.postId}`, {
      method: HTTP_METHODS.PUT,
      body: JSON.stringify(newPost),
      headers,
    }).then(() => redirect(redirectPath));
  } else if (request.url.includes(PATHS.DESTROY)) {
    return await fetch(`${url}/${params.postId}`, {
      method: HTTP_METHODS.DELETE,
    }).then(() => redirect(redirectPath));
  }
};
