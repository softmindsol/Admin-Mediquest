import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
const LoginRoute = ({ children }) => {
  const isLoggedIn = useSelector((state) => state?.admin?.isLoggedIn);
  console.log("🚀 ~ LoginRoute ~ isLoggedIn:", isLoggedIn);
  const isAdminLoggedIn = localStorage.getItem("user");
  const location = useLocation();

  // const [isLoggedIn, setLoggedIn] = useState(false);
  // useEffect(() => {
  //   apiClient
  //     .get("/admin/verifyAdminToken")
  //     .then((res) => {
  //       console.log(res.data);

  //       setLoggedIn(res.data.data.isLoggedIn);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       setLoggedIn(err.response.errors.isLoggedIn);
  //     });
  // }, []);

  if (isLoggedIn || isAdminLoggedIn) {
    return <Navigate to={location.state?.from || "/"} replace />;
  }

  return children;
};

export default LoginRoute;
