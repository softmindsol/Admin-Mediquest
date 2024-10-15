import React, { useEffect, useState } from "react";
import TextEditor from "./TextEditor"; // Import your TextEditor component
import { useSelector } from "react-redux";

const EditQuestion = ({
  modifiedOptions,
  setModifiedOptions,
  selectedCorrectAnswers,
  setSelectedCorrectAnswers,
}) => {
  const { questions = {} } =
    useSelector((state) => state?.questions?.documentQuestions) || {};

  const { options = [], correct_answers = [] } = questions;
  console.log("🚀 ~ EditQuestion ~ options:", options);

  // Initialize state with existing options and correct answers
  useEffect(() => {
    setModifiedOptions([...options]); // Copy initial options
    setSelectedCorrectAnswers([...correct_answers]); // Copy initial correct answers
  }, [options, correct_answers]);

  const handleOptionChange = (index, content) => {
    setModifiedOptions((prevOptions) => {
      const updatedOptions = [...prevOptions];
      updatedOptions[index] = content; // Update the specific option
      return updatedOptions;
    });
  };

  const handleCorrectAnswerChange = (id) => {
    setSelectedCorrectAnswers((prevAnswers) => {
      return prevAnswers.includes(id)
        ? prevAnswers.filter((answer) => answer !== id) // Remove if already included
        : [...prevAnswers, id]; // Add if not included
    });
  };

  return (
    <div className="p-6 mt-20 rounded-md">
      <div className="flex mb-4 space-x-4">
        <div className="w-2/12 text-[#464E5F] font-semibold">
          Correct Answer*
        </div>
        <div className="w-8/12 text-[#464E5F] font-semibold">Answer</div>
      </div>

      {modifiedOptions.map((option, index) => {
        const id = String.fromCharCode(65 + index); // Incremental ID for each answer
        return (
          <div key={id} className="flex items-center mb-8 space-x-4">
            <div className="w-2/12">
              <input
                type="checkbox"
                name="correctAnswer"
                className="form-checkbox h-4 w-4 mt-2.5 text-[#464E5F] border-gray-300 focus:ring-[#2E8F96]"
                value={id}
                checked={selectedCorrectAnswers.includes(id)}
                onChange={() => handleCorrectAnswerChange(id)}
              />
            </div>
            <div className="w-8/12 gap-2">
              <TextEditor
                name={`answer${id}`}
                required={true}
                placeholder="I am your rich text editor."
                className="w-full"
                height={120}
                value={option}
                onChange={(content) => handleOptionChange(index, content)}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default EditQuestion;
