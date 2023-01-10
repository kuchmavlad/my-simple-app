import React from "react";
import { Form, LoaderFunctionArgs, useLoaderData } from "react-router-dom";

import { PostComments } from "components";

import { PostLoaderType } from "dtos";
import { useAuth } from "hooks";
import { ENDPOINT_PATH, FORM_METHODS, PATHS } from "../../constants";

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
          <Form action={PATHS.EDIT}>
            <button type="submit">Edit</button>
          </Form>
          <Form
            method={FORM_METHODS.POST}
            action={PATHS.DESTROY}
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

export const postLoader = async ({ request, params }: LoaderFunctionArgs) => {
  const isSimplePostAction = !(
    request.url.includes(PATHS.EDIT) || request.url.includes(PATHS.DESTROY)
  );

  const post = await fetch(`${ENDPOINT_PATH.POSTS}/${params.postId}`).then(
    (resp) => resp.json()
  );

  if (isSimplePostAction) {
    const comments = await fetch(
      `${ENDPOINT_PATH.COMMENTS}?postId=${params.postId}`
    ).then((resp) => resp.json());

    return { post, comments };
  }
  return { post };
};
