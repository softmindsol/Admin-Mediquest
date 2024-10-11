import React from "react";
import TextEditor from "./TextEditor"; // Import your TextEditor component

const EditQuestion = () => {
  // Array of answers (modify as needed)
  const answers = [
    { id: 1, placeholder: "I am your reach text editor." },
    { id: 2, placeholder: "I am your reach text editor." },
    { id: 3, placeholder: "I am your reach text editor." },
    { id: 4, placeholder: "I am your reach text editor." },
  ];

  return (
    <div className="mt-20 p-6 rounded-md">
      {/* Titles for the columns */}
      <div className="flex space-x-4 mb-4">
        <div className="w-2/12 text-[#464E5F] font-semibold">
          Correct Answer*
        </div>
        <div className="w-8/12 text-[#464E5F] font-semibold">Answer</div>
      </div>

      {/* Radio buttons and TextEditor components */}
      {answers.map((answer, index) => (
        <div key={answer.id} className="flex space-x-4 items-center mb-8">
          {/* Radio Button */}
          <div className="w-2/12">
            <input
              type="radio"
              name="correctAnswer"
              className="form-radio h-4 w-4 mt-2.5 text-[#464E5F] border-gray-300 focus:ring-[#2E8F96]"
              value={answer.id}
            />
          </div>

          {/* Text Editor Component */}
          <div className="w-8/12  gap-2">
            <TextEditor
              name={`answer${index}`}
              // label={`Answer ${index + 1}`}
              required={true}
              placeholder={answer.placeholder}
              className="w-full"
              height={120}
z            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default EditQuestion;
