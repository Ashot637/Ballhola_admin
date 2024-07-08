import { useSelector } from "react-redux";
import { selectAuth } from "../store/authSlice";
import { useLocation, useNavigate } from "react-router-dom";
import Spinner from "../UI/Spinner/Spinner";
import { useEffect } from "react";

const AdminPage = () => {
  const { user, status } = useSelector(selectAuth);
  const navigate = useNavigate();

  console.log(user)

  useEffect(() => {
    localStorage.getItem('accessToken') ? navigate("/admin/dashboard/games") : navigate("/admin/login");
  });

  return (
    <>
      <Spinner />
    </>
  );
};

export default AdminPage;
