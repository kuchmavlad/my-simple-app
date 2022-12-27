import { Form, useSubmit } from "react-router-dom";
import React from "react";

export const PostsCheckbox: React.FC = () => {
  const submit = useSubmit();

  const checkboxHandle = ({ currentTarget }: any) => {
    submit(currentTarget.form, { method: "post", action: "/posts" });
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
