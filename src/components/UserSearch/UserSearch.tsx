import React, { ChangeEvent, useEffect } from "react";
import {
  Form,
  useLoaderData,
  useNavigation,
  useSubmit,
} from "react-router-dom";
import classNames from "classnames";

import "./userSearch.css";

export const UserSearch: React.FC = () => {
  const { q } = useLoaderData() as { q: string | undefined };
  const submit = useSubmit();
  const navigation = useNavigation();

  const searching =
    navigation.location &&
    new URLSearchParams(navigation.location.search).has("q");

  const classes = classNames({
    loading: searching,
  });

  const onChangeHandle = <T extends ChangeEvent<HTMLInputElement>>({
    currentTarget,
  }: T) => {
    const isFirstSearch = q === null;
    submit(currentTarget.form, {
      replace: !isFirstSearch,
    });
  };

  useEffect(() => {
    if (!q) {
      // @ts-ignore
      document.getElementById("q").value = null;
    }
  }, [q]);

  return (
    <Form id="search-form" role="search">
      <input
        className={classes}
        id="q"
        aria-label="Search contacts"
        placeholder="Search"
        type="search"
        name="q"
        defaultValue={q}
        onChange={onChangeHandle}
      />
      <div id="search-spinner" aria-hidden hidden={!searching} />
    </Form>
  );
};
