import React, { Dispatch, RefObject, SetStateAction, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "hooks/useAuth";

import "./logOutModal.css";

interface LogOutModalProps {
  show: boolean;
  toggleModal: Dispatch<SetStateAction<boolean>>;
  btnRef: RefObject<HTMLSpanElement>;
}

export const LogOutModal: React.FC<LogOutModalProps> = ({
  show,
  toggleModal,
  btnRef,
}) => {
  const navigate = useNavigate();
  const { signOut, user } = useAuth();

  const onLogOutHandle = () => {
    toggleModal(false);
    signOut(() => navigate("/", { replace: false }));
  };

  useEffect(() => {
    const closeModal = ({ path }: any) => {
      const svgPath = btnRef.current;
      const svg = btnRef.current?.firstElementChild;
      const span = btnRef.current?.firstElementChild?.firstElementChild;
      if (path[0] !== svgPath && path[0] !== svg && path[0] !== span) {
        toggleModal(false);
      }
    };

    document.body.addEventListener("click", closeModal);

    return () => document.body.removeEventListener("click", closeModal);
  }, [btnRef, toggleModal]);

  return (
    <>
      {show && (
        <div id="logOutModal">
          <div className="userName">{user?.name}</div>
          <div className="userEmail">{user?.email}</div>
          <button type="submit" onClick={onLogOutHandle}>
            LogOut
          </button>
        </div>
      )}
    </>
  );
};
