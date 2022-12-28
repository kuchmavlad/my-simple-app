import React from "react";

import { CommentType } from "dtos/CommentType";

import "./index.css";

interface PostCommentsProps {
  comments: CommentType[];
}

export const PostComments: React.FC<PostCommentsProps> = ({ comments }) => {
  return (
    <>
      <h4>Comments:</h4>
      <div className="commentsWrapper">
        <ul>
          {comments.map(({ email, body, id }) => (
            <li key={id} className="commentItem" id={String(id)}>
              <h5>{email}</h5>
              <p>{body}</p>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
