import React from "react";
import { NavLink, useLoaderData } from "react-router-dom";

import { UserItem } from "dtos";

export const UsersList: React.FC = () => {
  const { users } = useLoaderData() as { users: UserItem[] };

  return (
    <>
      {!!users.length ? (
        <nav>
          {users.map(({ id, name, favorite }, index) => (
            <NavLink
              data-testid="userItem"
              key={index}
              to={`${id}`}
              className={({ isActive, isPending }) =>
                isActive ? "active" : isPending ? "pending" : ""
              }
            >
              {name}
              {favorite && <span data-testid="testTEst">★</span>}
            </NavLink>
          ))}
        </nav>
      ) : (
        <p>
          <i>No contacts</i>
        </p>
      )}
    </>
  );
};
