import React from "react";
import { NavLink } from "react-router-dom";

import { LogInOut } from "components";

import "./header.css";

export const Header: React.FC = () => {
  return (
    <header>
      <nav>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/posts">Posts</NavLink>
        <NavLink to="/users">Users</NavLink>
        <NavLink to="/albums">Albums</NavLink>
      </nav>
      <LogInOut />
    </header>
  );
};
