import React from "react";
import { Outlet, useNavigation } from "react-router-dom";
import classNames from "classnames";

import { Header } from "components";

export const Root: React.FC = () => {
  const { state } = useNavigation();

  const mainClasses = classNames("main", {
    loading: state === "loading",
  });

  return (
    <>
      <Header />
      <main className={mainClasses}>
        <Outlet />
      </main>
    </>
  );
};
