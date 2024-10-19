import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import Loader from "../Loader";
import { verifyToken } from "../../store/features/auth/auth.service";
import { useEffect } from "react";

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const isAdminLoggedIn = localStorage.getItem("isLoggedIn");
  console.log("🚀 ~ ProtectedRoute ~ isAdminLoggedIn:", isAdminLoggedIn);
  const pathname = location.pathname;

  const { isLoggedIn, isLoading } = useSelector((state) => state?.admin);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!isLoggedIn) {
      dispatch(verifyToken());
    }
  }, [dispatch, isLoggedIn]);

  if (isLoading) return <Loader />;

  if (isLoggedIn && pathname === "/log-in") {
    return <Navigate to="/" replace />;
  }

  console.log("Hello.....");

  if (!isAdminLoggedIn && !isLoggedIn) {
    return <Navigate to="/log-in" replace />;
  }
  return children;
};

export default ProtectedRoute;
