import React from "react";
import { Form, Outlet, redirect, useNavigation } from "react-router-dom";
import classNames from "classnames";

import { UserSearch, UsersList } from "components";
import { ENDPOINT_PATH, FORM_METHODS, PATHS } from "../../constants";

import "./userPage.css";

export const UsersPage: React.FC = () => {
  const { state } = useNavigation();

  const mainClasses = classNames("main", {
    loading: state === "loading" || state === "submitting",
  });

  return (
    <div id="userWrapper">
      <div id="sidebar">
        <div>
          <UserSearch />
          <Form method={FORM_METHODS.POST}>
            <button type="submit">New</button>
          </Form>
        </div>
        <UsersList />
      </div>
      <div id="detail" className={mainClasses}>
        <Outlet />
      </div>
    </div>
  );
};

export const usersAction = () => {
  const uniqId = Date.now();
  return redirect(`/${PATHS.USERS}/${uniqId}/${PATHS.NEW}`);
};

export const usersLoader = async ({ request }: any) => {
  const url = new URL(request.url);
  const q = url.searchParams.get("q");

  if (q) {
    const users = await fetch(`${ENDPOINT_PATH.USERS}?q=${q}`).then((resp) =>
      resp.json()
    );
    return { users, q };
  }

  const users = await fetch(ENDPOINT_PATH.USERS).then((resp) => resp.json());

  return { users };
};
