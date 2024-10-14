import React from "react";
import TextEditor from "./TextEditor"; // Import your TextEditor component

const EditQuestion = () => {
  const answers = [
    { id: 1, placeholder: "I am your reach text editor." },
    { id: 2, placeholder: "I am your reach text editor." },
    { id: 3, placeholder: "I am your reach text editor." },
    { id: 4, placeholder: "I am your reach text editor." },
  ];

  return (
    <div className="p-6 mt-20 rounded-md">
      <div className="flex mb-4 space-x-4">
        <div className="w-2/12 text-[#464E5F] font-semibold">
          Correct Answer*
        </div>
        <div className="w-8/12 text-[#464E5F] font-semibold">Answer</div>
      </div>

      {answers.map((answer, index) => (
        <div key={answer.id} className="flex items-center mb-8 space-x-4">
          <div className="w-2/12">
            <input
              type="radio"
              name="correctAnswer"
              className="form-radio h-4 w-4 mt-2.5 text-[#464E5F] border-gray-300 focus:ring-[#2E8F96]"
              value={answer.id}
            />
          </div>
          <div className="w-8/12 gap-2">
            <TextEditor
              name={`answer${index}`}
              // label={`Answer ${index + 1}`}
              required={true}
              placeholder={answer.placeholder}
              className="w-full"
              height={120}
              z
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default EditQuestion;
