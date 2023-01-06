import React, { useRef, useState } from "react";
import { AiOutlineUser } from "react-icons/ai";
import { Link, useLocation } from "react-router-dom";

import { LogOutModal } from "components";

import { useAuth } from "hooks";
import { PATHS } from "../../constants";

import "./logInOut.css";

export const LogInOut: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { user } = useAuth();
  const location = useLocation();
  const btnRef = useRef<HTMLSpanElement>(null);

  const onClickHandle = () => {
    setIsModalOpen((prev) => !prev);
  };

  return (
    <>
      <div id="logInOut">
        {user ? (
          <span onClick={onClickHandle} ref={btnRef}>
            <AiOutlineUser />
          </span>
        ) : (
          <Link to={PATHS.LOGIN} state={{ from: location }}>
            Login
          </Link>
        )}
        <LogOutModal
          show={isModalOpen}
          toggleModal={setIsModalOpen}
          btnRef={btnRef}
        />
      </div>
    </>
  );
};
