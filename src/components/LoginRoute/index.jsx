import React from "react";
import { useSelector } from "react-redux";
import { useLocation, Navigate } from "react-router-dom";

const LoginRoute = ({ children }) => {
  const isLoggedIn = useSelector((state) => state?.admin?.isLoggedIn);
  const location = useLocation();

  if (isLoggedIn) {
    return <Navigate to={location.state?.from || "/"} replace />;
  }

  return children;
};

export default LoginRoute;
