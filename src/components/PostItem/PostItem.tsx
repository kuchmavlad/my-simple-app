import React from "react";
import { Link } from "react-router-dom";

import { PostsItem } from "dtos";

interface PostsItemExtends extends PostsItem {
  index: number;
}

export const PostItem: React.FC<PostsItemExtends> = ({
  id,
  title,
  index,
  userId,
}) => {
  return (
    <Link to={`/post${userId ? `/${userId}` : ""}/${id}`}>
      <h4>{`${index}. ${title}`}</h4>
    </Link>
  );
};
