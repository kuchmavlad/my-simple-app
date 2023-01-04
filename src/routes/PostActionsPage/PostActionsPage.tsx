import React from "react";
import {
  Form,
  redirect,
  useLoaderData,
  useMatches,
  useNavigate,
} from "react-router-dom";

import { useAuth } from "hooks";
import { PostLoaderType } from "dtos";

import "./postActionsPage.css";

export const PostActionsPage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { post } = useLoaderData() as PostLoaderType;
  const [, { pathname }] = useMatches();

  const isNewPost = pathname.includes("new");
  const userIdValue = isNewPost ? user?.id : post.userId;

  return (
    <Form method="post" id="new-post">
      <input hidden name="userId" defaultValue={userIdValue} />

      <input
        required
        placeholder="Title"
        aria-label="title"
        type="text"
        name="title"
        defaultValue={post?.title}
      />
      <textarea
        required
        placeholder="Description"
        name="body"
        defaultValue={post?.body}
      />

      <div>
        <button type="submit">Save</button>
        <button type="button" onClick={() => navigate(-1)}>
          Cancel
        </button>
      </div>
    </Form>
  );
};

export const postActions = async ({ request, params }: any) => {
  const formData = await request.formData();
  const updates = Object.fromEntries(formData);
  const userId = +formData.get("userId");
  const url = "http://localhost:3001/posts";
  const headers = {
    "Content-type": "application/json; charset=UTF-8",
  };

  const redirectPath = `/posts${params.userId ? `/${params.userId}` : ""}`;

  if (request.url.includes("new")) {
    const uniqId = Date.now();
    const newPost = { ...updates, id: uniqId, userId };

    return fetch(url, {
      method: "POST",
      body: JSON.stringify(newPost),
      headers,
    }).then(() => redirect(redirectPath));
  } else if (request.url.includes("edit")) {
    const newPost = { ...updates, userId };

    return fetch(`${url}/${params.postId}`, {
      method: "PUT",
      body: JSON.stringify(newPost),
      headers,
    }).then(() => redirect(redirectPath));
  } else if (request.url.includes("destroy")) {
    return await fetch(`${url}/${params.postId}`, {
      method: "DELETE",
    }).then(() => redirect(redirectPath));
  }
};
