import { PostsItem } from "./PostItem";
import { CommentType } from "./CommentType";

export type PostLoaderType = {
  post: PostsItem;
  comments?: CommentType[];
};
