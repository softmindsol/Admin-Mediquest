import React, { useEffect } from "react";
import TextEditor from "./TextEditor";

const EditQuestion = ({
  modifiedOptions,
  questions,
  setModifiedOptions,
  selectedCorrectAnswers,
  setSelectedCorrectAnswers,
}) => {
  console.log("🚀 ~ currentQuestion:", questions);

  const { options = [], correct_answers = [] } =
    questions?.content?.questions || {};

  useEffect(() => {
    if (JSON.stringify(modifiedOptions) !== JSON.stringify(options)) {
      setModifiedOptions([...options]);
    }
    if (
      JSON.stringify(selectedCorrectAnswers) !== JSON.stringify(correct_answers)
    ) {
      setSelectedCorrectAnswers([...correct_answers]);
    }
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
      <div className="flex mb-4 space-x-4 text-sm leading-[16.41px]">
        <div className="w-2/12 text-[#211C1B] font-semibold">
          Correct Answer*
        </div>
        <div className="w-8/12 text-[#211C1B] font-semibold">Answer</div>
      </div>

      {modifiedOptions.map((option, index) => {
        const id = String.fromCharCode(65 + index);

        return (
          <div key={id} className="flex items-center mb-8 space-x-4">
            <div className="flex items-center w-2/12 gap-10">
              <span className="mr-2 mt-1  text-[#211C1B] font-bold lg:text-[20px]">
                {id}.
              </span>

              <input
                type="checkbox"
                name="correctAnswer"
                className="form-checkbox h-4 w-4  rounded-full mt-1 text-[#464E5F] border-gray-300 focus:ring-[#2E8F96]"
                value={id}
                checked={selectedCorrectAnswers.includes(id)}
                onChange={() => handleCorrectAnswerChange(id)}
              />
            </div>
            <div className="w-8/12 text-[12px] font-normal">
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
