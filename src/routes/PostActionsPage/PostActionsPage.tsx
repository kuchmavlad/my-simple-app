import React from "react";
import {
  Form,
  redirect,
  useLoaderData,
  useMatches,
  useNavigate,
} from "react-router-dom";

import { useAuth } from "hooks";
import { PostsItem } from "dtos";

import "./postActionsPage.css";

export const PostActionsPage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const post = useLoaderData() as PostsItem;
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

export const newPosAction = async ({ request, params }: any) => {
  if (request.url.includes("new")) {
    const uniqId = Date.now();
    const formData = await request.formData();
    const updates = Object.fromEntries(formData);
    const userId = +formData.get("userId");

    const newPost = { ...updates, id: uniqId, userId };

    return fetch(`http://localhost:3001/posts`, {
      method: "POST",
      body: JSON.stringify(newPost),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }).then(() =>
      redirect(`/posts${params.userId ? `/${params.userId}` : ""}`)
    );
  } else if (request.url.includes("edit")) {
    const formData = await request.formData();
    const updates = Object.fromEntries(formData);
    const userId = +formData.get("userId");

    const newPost = { ...updates, userId };

    return fetch(`http://localhost:3001/posts/${params.postId}`, {
      method: "PUT",
      body: JSON.stringify(newPost),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }).then(() =>
      redirect(`/posts${params.userId ? `/${params.userId}` : ""}`)
    );
  } else if (request.url.includes("destroy")) {
    return await fetch(`http://localhost:3001/posts/${params.postId}`, {
      method: "DELETE",
    }).then(() =>
      redirect(`/posts${params.userId ? `/${params.userId}` : ""}`)
    );
  }
};

export const newPostLoader = async ({ params }: any) => {
  return await fetch(`http://localhost:3001/posts/${params.postId}`).then(
    (resp) => resp.json()
  );
};
