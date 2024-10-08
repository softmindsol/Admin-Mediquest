import React from "react";
import { RxCross2 } from "react-icons/rx";

const CreateQuizModal = ({ isOpen, closeModal }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#E6E6E6CC] ">
      <div className="bg-white rounded-md p-6 max-w-lg w-full">
        <div className="flex justify-between items-center ">
          <h2 className="text-base text-[#111827] font-semibold mb-2">
            Create Quiz
          </h2>
          <button
            className="text-[#6B7280]   hover:text-gray-600"
            onClick={closeModal}
          >
            <RxCross2 />
          </button>
        </div>
        <p className="text-[#6B7280] text-subtitle-xsm mb-4">
          Please confirm your quiz settings.
        </p>
        <div className="flex justify-start gap-15">
          {/* Exam Name Input */}
          <div className="mb-6">
            <label className="block text-sm  text-[#111827] font-semibold">
              Exam Name
            </label>
            <input
              type="text"
              placeholder="Exam Name here"
              className="mt-3 px-4 py-2  text-[#ADB5BD] text-title-p focus:outline-none rounded-[4px] w-50 border border-[#CED4DA] placeholder-secondary"
            />
          </div>

          {/* No. of Questions */}
          <div className="mb-6">
            <label className="block text-sm  text-[#111827] font-semibold">
              No. of Questions
            </label>
            <select className="mt-3 px-4 py-2  text-[#ADB5BD] text-title-p focus:outline-none rounded-[4px]  border border-[#CED4DA] placeholder-secondary bg-white">
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="30">30</option>
              <option value="50">50</option>
            </select>
          </div>
        </div>

        {/* Test Mode */}
        <div className="mb-6">
          <label className="block text-sm  text-[#111827] font-semibold">
            Test Mode
          </label>
          <p className="text-[#6B7280] text-[13px] font-medium">Timed</p>
        </div>

        {/* University */}
        <div className="mb-6">
          <label className="block text-sm  text-[#111827] font-semibold">
            University
          </label>
          <p className="text-[#6B7280] text-[13px] font-medium">
            Rabat, Casablanca
          </p>
        </div>

        {/* Topics */}
        <div className="mb-6">
          <label className="block text-sm  text-[#111827] font-semibold">
            Topics
          </label>
          <p className="text-[#6B7280] text-[13px] font-medium">
            Anatomy I, Something Tech
          </p>
        </div>

        {/* Start Quiz Button */}
        <div className="flex justify-between mt-7">
          <span className="ml-2 text-[#6B7280] text-[13px] font-bold">
            Add to my Tests
          </span>
          <button
            className="bg-[#007AFF] text-white font-semibold px-4 py-2 rounded-md"
            onClick={closeModal}
          >
            Start Quiz
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateQuizModal;
