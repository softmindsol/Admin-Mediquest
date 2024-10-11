import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Login from "./pages/authentication/Login";
import Home from "./pages/Home/Home";
import Settings from "./pages/settings/settings";

import QuestionBank from "./pages/questionbank/QuestionBank";
import EditQuestions from "./pages/editquestions/EditQuestios";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/log-in" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/question-bank" element={<QuestionBank />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/edit-question" element={<EditQuestions />} />
      </Routes>
    </Router>
  );
}

export default App;
