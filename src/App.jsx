import React, { useEffect } from "react";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
  useLocation,
} from "react-router-dom";
import Login from "./pages/authentication/Login";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home/Home";
import Settings from "./pages/settings/settings";

import QuestionBank from "./pages/questionbank/QuestionBank";
import { useDispatch, useSelector } from "react-redux";
import { verifyToken } from "./store/features/auth/auth.service";
import ProtectedRoute from "./components/ProtectedRoute";
import LoginRoute from "./components/LoginRoute";
import { ModalProvider } from "./context/modal";
function App() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state?.admin?.isLoggedIn);

  useEffect(() => {
    if (!isLoggedIn) {
      dispatch(verifyToken());
    }
  }, [dispatch, isLoggedIn]);

  return (
    <Router>
      <Routes>
        <Route
          path="/log-in"
          element={
            <LoginRoute>
              <Login />
            </LoginRoute>
          }
        />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/question-bank"
          element={
            <ProtectedRoute>
              <ModalProvider>
                <QuestionBank />
              </ModalProvider>
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
