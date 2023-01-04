import React from "react";
import {
  Form,
  useActionData,
  useLoaderData,
  useParams,
} from "react-router-dom";

import { PostItem, PostsCheckbox } from "components";
import { PostsItem } from "dtos";

import "./postPage.css";

export const PostsPage: React.FC = () => {
  const loadedPosts = useLoaderData() as PostsItem[];
  const limitedPosts = useActionData() as PostsItem[];
  const { userId } = useParams();

  const posts = limitedPosts ?? loadedPosts;

  return (
    <div className="postsWrapper">
      <h2>PostsPage</h2>
      <div className="postsHeader">
        {!!posts.length && <PostsCheckbox />}

        <Form action={`/post${userId ? `/${userId}` : ""}/new`}>
          <button type="submit">Add new post</button>
        </Form>
      </div>

      {!posts.length ? (
        <h3>No posts</h3>
      ) : (
        posts.map((post, index) => (
          <PostItem
            {...post}
            index={index + 1}
            key={post.id}
            userId={userId ? +userId : 0}
          />
        ))
      )}
    </div>
  );
};

export const postsLoader = async ({ params }: any) => {
  return await fetch(
    `http://localhost:3001/posts${
      params.userId ? `?userId=${params.userId}` : ""
    }`
  ).then((resp) => resp.json());
};

export const postsAction = async ({ request, params }: any) => {
  const formData = await request.formData();
  const limit = formData.get("limit");

  return fetch(
    `http://localhost:3001/posts${
      params.userId ? `?userId=${params.userId}` : ""
    }${limit ? "&_limit=10" : ""}`
  ).then((resp) => resp.json());
};
