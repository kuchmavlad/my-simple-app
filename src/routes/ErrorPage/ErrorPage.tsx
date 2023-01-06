import React from "react";
import { Link, useRouteError } from "react-router-dom";

import { ErrorType } from "dtos";
import { PATHS } from "../../constants";

import "./errorPage.css";

export const ErrorPage: React.FC = () => {
  const { statusText, status } = useRouteError() as ErrorType;

  return (
    <div id="errorPage">
      <h1>Oops! {status}</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{statusText}</i>
      </p>
      <Link to={PATHS.ROOT}>Home</Link>
    </div>
  );
};
