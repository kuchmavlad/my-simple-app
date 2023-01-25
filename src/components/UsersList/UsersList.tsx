import React from "react";
import { NavLink, useLoaderData } from "react-router-dom";

import { UserItem } from "dtos";

export const UsersList: React.FC = () => {
  const { users } = useLoaderData() as { users: UserItem[] };

  return (
    <nav>
      {!!users.length ? (
        <ul>
          {users.map(({ id, name, favorite }, index) => (
            <li data-testid="userItem" key={index}>
              <NavLink
                to={`${id}`}
                className={({ isActive, isPending }) =>
                  isActive ? "active" : isPending ? "pending" : ""
                }
              >
                {name}
                {favorite && <span data-testid="testTEst">★</span>}
              </NavLink>
            </li>
          ))}
        </ul>
      ) : (
        <p>
          <i>No contacts</i>
        </p>
      )}
    </nav>
  );
};
