import React, { useState } from "react";
import { FaChevronUp } from "react-icons/fa";

// New recentTests data array with score
const recentTests = [
  {
    name: "Test Name",
    score: "23/540",
    description: "Topic one, two and three.",
    createdDate: "26/08/2024",
    buttonLabel: "Continue Quiz",
  },
  {
    name: "Test name 1",
    score: "56/84",
    description: "Topic for test 1.",
    createdDate: "25/08/2024",
    buttonLabel: "Continue Quiz",
  },
  {
    name: "Test name 2",
    score: "36/64",
    description: "Topic for test 2.",
    createdDate: "24/08/2024",
    buttonLabel: "Continue Quiz",
  },
  {
    name: "Test name 3",
    score: "45/80",
    description: "Topic for test 3.",
    createdDate: "23/08/2024",
    buttonLabel: "Continue Quiz",
  },
  {
    name: "Test name 4",
    score: "75/100",
    description: "Topic for test 4.",
    createdDate: "22/08/2024",
    buttonLabel: "Continue Quiz",
  },
];

const RecentTests = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold text-primary mb-6">Recent Tests</h2>
      <div className="bg-white rounded-lg border border-[#CED4DA]">
        {recentTests.map((test, index) => (
          <div key={index} className="border-b border-[#CED4DA]">
            {/* Accordion Header (Test Name and Score) */}
            <div
              className="flex justify-between items-center cursor-pointer p-4 hover:bg-gray-100"
              onClick={() => toggleAccordion(index)}
            >
              <span className="text-[14px] text-primary font-semibold">
                {test.name}
              </span>
              <div className="flex gap-7">
                <span className="bg-[#007AFF] text-white text-[12px] py-[6px] px-2 rounded-md font-semibold">
                  {test.score}
                </span>
                <span
                  className={`transform transition-transform ${
                    openIndex === index ? "rotate-180" : "rotate-0"
                  }`}
                >
                  <FaChevronUp size={16} className="text-black" />
                </span>
              </div>
            </div>

            {/* Accordion Content (Description, Date, Button) */}
            {openIndex === index && (
              <div className="mt-2 p-4 border-t border-[#CED4DA]">
                {test.description && (
                  <div className="flex justify-between">
                    <div className="flex flex-col gap-4">
                      <div className="text-[13px] text-secondary">
                        {test.description}
                      </div>
                      <div className="text-[12px] font-bold text-secondary">
                        Created: {test.createdDate}
                      </div>
                    </div>
                    <div className="flex items-end">
                      <button className="bg-white text-[#007AFF] px-4 py-2 border border-[#007AFF] rounded-md">
                        {test.buttonLabel}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentTests;
