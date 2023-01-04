import React from "react";
import { Form, Outlet, redirect, useNavigation } from "react-router-dom";
import classNames from "classnames";

import { UserSearch, UsersList } from "components";

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
          <Form method="post">
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
  return redirect(`/users/${uniqId}/new`);
};

export const usersLoader = async ({ request }: any) => {
  const url = new URL(request.url);
  const q = url.searchParams.get("q");

  if (q) {
    const users = await fetch(`http://localhost:3001/users?q=${q}`).then(
      (resp) => resp.json()
    );
    return { users, q };
  }

  const users = await fetch("http://localhost:3001/users").then((resp) =>
    resp.json()
  );

  return { users };
};
