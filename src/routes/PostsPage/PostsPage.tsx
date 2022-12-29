import React from "react";
import { Form, useActionData, useLoaderData } from "react-router-dom";

import { PostItem, PostsCheckbox } from "components";
import { PostsItem } from "dtos";

import "./postPage.css";

export const PostsPage: React.FC = () => {
  const loadedPosts = useLoaderData() as PostsItem[];
  const limitedPosts = useActionData() as PostsItem[];

  const posts = limitedPosts ?? loadedPosts;

  return (
    <div className="postsWrapper">
      <h2>PostsPage</h2>
      <div className="postsHeader">
        <PostsCheckbox />

        <Form action="new">
          <button type="submit">Add new post</button>
        </Form>
      </div>

      {posts.map((post, index) => (
        <PostItem {...post} index={index + 1} key={post.id} />
      ))}
    </div>
  );
};

export const postLoader = async () => {
  return await fetch("http://localhost:3001/posts").then((resp) => resp.json());
};

export const postAction = async ({ request }: any) => {
  const formData = await request.formData();
  const limit = formData.get("limit");

  return fetch(`http://localhost:3001/posts${limit ? "?_limit=10" : ""}`).then(
    (resp) => resp.json()
  );
};
