import React from "react";
import { NavLink } from "react-router-dom";

import { LogInOut } from "components";
import { PATHS } from "../../constants";

import "./header.css";

export const Header: React.FC = () => {
  return (
    <header>
      <nav data-testid="navbar">
        <NavLink to={PATHS.ROOT}>Home</NavLink>
        <NavLink to={PATHS.POSTS}>Posts</NavLink>
        <NavLink to={PATHS.USERS}>Users</NavLink>
        <NavLink to={PATHS.ALBUMS}>Albums</NavLink>
      </nav>
      <LogInOut />
    </header>
  );
};
