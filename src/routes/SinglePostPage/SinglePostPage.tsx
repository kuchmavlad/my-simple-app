import React from "react";
import { Form, useLoaderData } from "react-router-dom";

import { PostComments } from "components";

import { PostsItem, CommentType } from "dtos";
import { useAuth } from "hooks";

import "./singlePostPage.css";

type SinglePostLoaderType = {
  post: PostsItem;
  comments: CommentType[];
};

export const SinglePostPage: React.FC = () => {
  const { post, comments } = useLoaderData() as SinglePostLoaderType;
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

export const singPostLoader = async ({ params }: any) => {
  const post = await fetch(`http://localhost:3001/posts/${params.postId}`).then(
    (resp) => resp.json()
  );

  const comments = await fetch(
    `http://localhost:3001/comments?postId=${params.postId}`
  ).then((resp) => resp.json());

  return { post, comments };
};
