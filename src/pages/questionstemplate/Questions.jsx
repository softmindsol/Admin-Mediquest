import React, { useState } from "react";
import QuestionTemplate from "../../components/QuestionTemplate";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const Question = () => {
  const [currentQuestion, setCurrentQuestion] = useState({
    question:
      "A 54-year-old man has this and that and 49mg of that, rushing to the ER because of something. Lay yre7mo.",
    options: ["Option 1", "Option 2", "Option 3", "Option 4"],
  });

  const handleAnswerSubmit = (selectedOption) => {
    console.log(`Selected answer: ${currentQuestion.options[selectedOption]}`);
    // You can then trigger navigation to the AnswerTemplate, etc.
  };

  return (
    <>
      <Header />

      <div>
        <QuestionTemplate
          question={currentQuestion}
          onSubmit={handleAnswerSubmit}
        />
      </div>
<Footer/>
    </>
  );
};

export default Question;
