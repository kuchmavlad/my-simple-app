import { Form, useParams, useSubmit } from "react-router-dom";
import React, { ChangeEvent } from "react";

import { FORM_METHODS, PATHS } from "../../constants";

export const PostsCheckbox: React.FC = () => {
  const submit = useSubmit();
  const { userId } = useParams();

  const checkboxHandle = ({ currentTarget }: ChangeEvent<HTMLInputElement>) => {
    submit(currentTarget.form, {
      method: FORM_METHODS.POST,
      action: `/${PATHS.POSTS}${userId ? `/${userId}` : ""}`,
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
