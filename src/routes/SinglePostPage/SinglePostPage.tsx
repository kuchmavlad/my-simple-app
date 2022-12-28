import React from "react";
import { useLoaderData } from "react-router-dom";

import { PostComments } from "components/PostComents/PostComments";

import { PostsItem } from "dtos/PostItem";
import { CommentType } from "dtos/CommentType";

import "./singlePostPage.css";

type SinglePostLoaderType = {
  post: PostsItem;
  comments: CommentType[];
};

export const SinglePostPage: React.FC = () => {
  const { post, comments } = useLoaderData() as SinglePostLoaderType;

  const { title, body } = post;
  return (
    <div className="postPageWrapper">
      <h4>{title}</h4>
      <div>{body}</div>

      <PostComments comments={comments} />
    </div>
  );
};

export const singPostLoader = async ({ params }: any) => {
  const post = await fetch(`http://localhost:3001/posts/${params.id}`).then(
    (resp) => resp.json()
  );

  const comments = await fetch(
    `http://localhost:3001/comments?postId=${params.id}`
  ).then((resp) => resp.json());

  return { post, comments };
};
