import { Form, useParams, useSubmit } from "react-router-dom";
import React from "react";

export const PostsCheckbox: React.FC = () => {
  const submit = useSubmit();
  const { userId } = useParams();

  const checkboxHandle = ({ currentTarget }: any) => {
    submit(currentTarget.form, {
      method: "post",
      action: `/posts${userId ? `/${userId}` : ""}`,
    });
  };

  return (
    <Form id="search-limit">
      <input
        id="limit"
        aria-label="Limit posts"
        type="checkbox"
        name="limit"
        onChange={checkboxHandle}
      />
      <label style={{ paddingLeft: "10px" }} htmlFor="limit">
        First 10 posts
      </label>
    </Form>
  );
};
