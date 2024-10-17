import React, { useEffect } from "react";
import TextEditor from "./TextEditor";
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

  useEffect(() => {
    setModifiedOptions([...options]);
    setSelectedCorrectAnswers([...correct_answers]);
  }, [options, correct_answers]);

  const handleOptionChange = (index, content) => {
    setModifiedOptions((prevOptions) => {
      const updatedOptions = [...prevOptions];
      updatedOptions[index] = content;
      return updatedOptions;
    });
  };

  const handleCorrectAnswerChange = (id) => {
    setSelectedCorrectAnswers((prevAnswers) => {
      return prevAnswers.includes(id)
        ? prevAnswers.filter((answer) => answer !== id)
        : [...prevAnswers, id];
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
        const id = String.fromCharCode(65 + index); // A, B, C, etc.

        return (
          <div key={id} className="flex items-center mb-8 space-x-4">
            <div className="w-2/12 flex items-center gap-10">
              <span className="mr-2 mt-1  text-[#211C1B] font-bold lg:text-[20px]">{id}.</span>

              <input
                type="checkbox"
                name="correctAnswer"
                className="form-checkbox h-4 w-4  rounded-full mt-1 text-[#464E5F] border-gray-300 focus:ring-[#2E8F96]"
                value={id}
                checked={selectedCorrectAnswers.includes(id)}
                onChange={() => handleCorrectAnswerChange(id)}
              />
            </div>
            <div className="w-8/12">
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
