import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Login from "./pages/authentication/Login";
import Home from "./pages/Home/Home";
import Settings from "./pages/settings/settings";

import LoginRoute from "./components/LoginRoute";
import ProtectedRoute from "./components/ProtectedRoute";
import { ModalProvider } from "./context/modal";
import EditQuestions from "./pages/editquestions/EditQuestios";
import NotFound from "./pages/NotFound";
import QuestionBank from "./pages/questionbank/QuestionBank";
import Update from "./pages/update/Update";

function App() {
  // const isLoggedIn = useSelector((state) => state?.admin?.isLoggedIn);

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

        <Route
          path="/edit-question/:documentId/:questionId"
          element={
            <ProtectedRoute>
              <EditQuestions />
            </ProtectedRoute>
          }
        />
        <Route path="/update-questions" element={<Update />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
