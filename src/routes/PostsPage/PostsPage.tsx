import React from "react";
import {
  Form,
  LoaderFunctionArgs,
  useActionData,
  useLoaderData,
  useParams,
} from "react-router-dom";

import { PostItem, PostsCheckbox } from "components";

import { PostsItem } from "dtos";
import { ENDPOINT_PATH, PATHS } from "../../constants";

import "./postPage.css";

export const PostsPage: React.FC = () => {
  const loadedPosts = useLoaderData() as PostsItem[];
  const limitedPosts = useActionData() as PostsItem[];
  const { userId } = useParams();

  const posts = limitedPosts ?? loadedPosts;

  return (
    <div className="postsWrapper">
      <h2>Posts Page</h2>
      <div className="postsHeader">
        {!!posts.length && <PostsCheckbox />}

        <Form
          action={`/post${userId?.length ? `/${userId}` : ""}/${PATHS.NEW}`}
        >
          <button type="submit">Add new post</button>
        </Form>
      </div>
      <div>
        {!posts.length ? (
          <h3>No posts</h3>
        ) : (
          posts.map((post, index) => (
            <PostItem
              {...post}
              index={index + 1}
              key={post.id}
              userId={userId?.length && +userId}
            />
          ))
        )}
      </div>
    </div>
  );
};

export const postsLoader = async ({ params }: LoaderFunctionArgs) => {
  return await fetch(
    `${ENDPOINT_PATH.POSTS}${params.userId ? `?userId=${params.userId}` : ""}`
  ).then((resp) => resp.json());
};

export const postsAction = async ({ request, params }: LoaderFunctionArgs) => {
  const formData = await request.formData();
  const limit = formData.get("limit");

  return fetch(
    `${ENDPOINT_PATH.POSTS}${params.userId ? `?userId=${params.userId}` : ""}${
      limit ? `${params.userId ? "&" : "?"}_limit=10` : ""
    }`
  ).then((resp) => resp.json());
};
