import React from "react";
import { Form, useLoaderData } from "react-router-dom";

import { PostComments } from "components";

import { PostLoaderType } from "dtos";
import { useAuth } from "hooks";

import "./postPage.css";

export const PostPage: React.FC = () => {
  const { post, comments } = useLoaderData() as PostLoaderType;
  const { user } = useAuth();

  const isUsersPost = user?.id === post?.userId;
  const { title, body } = post;

  return (
    <div className="postPageWrapper">
      <h4>{title}</h4>
      <div>{body}</div>

      {isUsersPost && (
        <div className="postButtons">
          <Form action="edit">
            <button type="submit">Edit</button>
          </Form>
          <Form
            method="post"
            action="destroy"
            onSubmit={(event) => {
              if (
                !window.confirm(
                  "Please confirm you want to delete this record."
                )
              ) {
                event.preventDefault();
              }
            }}
          >
            <button type="submit">Delete</button>
          </Form>
        </div>
      )}

      <PostComments comments={comments} />
    </div>
  );
};

export const postLoader = async ({ request, params }: any) => {
  const isSimplePostAction = !(
    request.url.includes("edit") || request.url.includes("destroy")
  );

  const post = await fetch(`http://localhost:3001/posts/${params.postId}`).then(
    (resp) => resp.json()
  );

  if (isSimplePostAction) {
    const comments = await fetch(
      `http://localhost:3001/comments?postId=${params.postId}`
    ).then((resp) => resp.json());

    return { post, comments };
  }
  return { post };
};
