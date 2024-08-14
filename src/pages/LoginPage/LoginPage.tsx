import type { FC } from "react";

import { useSelector } from "react-redux";
import { selectAuth } from "../../store/authSlice";

import { Navigate } from "react-router-dom";

import { STATUS } from "../../types/Status";

import LoginForm from "./LoginForm/LoginForm";
import Spinner from "../../UI/Spinner/Spinner";

const LoginPage: FC = () => {
  const { user, status } = useSelector(selectAuth);

  if (
    (status === STATUS.LOADING || status === STATUS.WAITING) &&
    localStorage.getItem("accessToken")
  ) {
    return <Spinner />;
  }

  if (localStorage.getItem('accessToken')) {
    return <Navigate to={"/admin/dashboard/games"} replace={true} />;
  }

  return (
    <div
      style={{
        backgroundColor: "#020C27",
        position: "fixed",
        width: "100%",
        height: "100%",
        left: 0,
        top: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <LoginForm />
    </div>
  );
};

export default LoginPage;
