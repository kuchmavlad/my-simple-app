import React from "react";
import { Link } from "react-router-dom";

import { PostsItem } from "dtos";

interface PostsItemExtends extends Omit<PostsItem, "userId"> {
  index: number;
  userId?: number;
}

export const PostItem: React.FC<PostsItemExtends> = ({
  id,
  title,
  index,
  userId,
}) => {
  return (
    <Link
      data-testid="postItem"
      to={`/post${userId ? `/${userId}` : ""}/${id}`}
    >
      <h4>{`${index}. ${title}`}</h4>
    </Link>
  );
};
