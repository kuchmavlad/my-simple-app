import React from "react";
import { Link } from "react-router-dom";

import { PostsItem } from "dtos/PostItem";

interface PostsItemTest extends PostsItem {
  index: number;
}

export const PostItem: React.FC<PostsItemTest> = ({ id, title, index }) => {
  return (
    <Link to={`/posts/${id}`}>
      <h4>{`${index}. ${title}`}</h4>
    </Link>
  );
};
