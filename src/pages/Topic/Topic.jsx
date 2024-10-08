import React, { useState } from "react";
import DefaultLayout from "../../layouts/DefaultLayout";
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
import { RxCross2 } from "react-icons/rx";
import { IoSearchSharp } from "react-icons/io5";
import CreateQuizModal from "../../components/CreateQuizModal";
const categories = [
  {
    name: "Anatomy I",
    progress: "1 of 4203",
    subcategories: [
      { name: "Rabat", progress: "1 of 403" },
      { name: "Marrakech", progress: "1 of 403" },
      { name: "Casablanca", progress: "1 of 403" },
    ],
  },
  {
    name: "An item",
    progress: "1 of 493",
    subcategories: [
      { name: "Rabat", progress: "1 of 403" },
      { name: "Marrakech", progress: "1 of 403" },
      { name: "Casablanca", progress: "1 of 403" },
    ],
  },
  {
    name: "An item",
    progress: "1 of 493",
    subcategories: [
      { name: "Rabat", progress: "1 of 403" },
      { name: "Marrakech", progress: "1 of 403" },
      { name: "Casablanca", progress: "1 of 403" },
    ],
  },
  {
    name: "An item",
    progress: "1 of 493",
    subcategories: [
      { name: "Rabat", progress: "1 of 403" },
      { name: "Marrakech", progress: "1 of 403" },
      { name: "Casablanca", progress: "1 of 403" },
    ],
  },

];

// Array of category items from the design
const categoryItems = [
  "Family",
  "Family in Law",
  "Co-workers",
  "Friends",
  "Basketball Club",
  "Startup Investor Colleagues",
  "Swiss Embassy",
  "Zurich Meetup Group",
];

 const recentTests = [
   {
     name: "Test Name",
     description: "Topic one, two and three.",
     createdDate: "26/08/2024",
     buttonLabel: "Continue Quiz",
   },
   {
     name: "Test name 1",
     description: "Topic for test 1.",
     createdDate: "25/08/2024",
     buttonLabel: "Continue Quiz",
   },
   {
     name: "Test name 2",
     description: "Topic for test 2.",
     createdDate: "24/08/2024",
     buttonLabel: "Continue Quiz",
   },
   {
     name: "Test name 3",
     description: "Topic for test 3.",
     createdDate: "23/08/2024",
     buttonLabel: "Continue Quiz",
   },
   {
     name: "Test name 4",
     description: "Topic for test 4.",
     createdDate: "22/08/2024",
     buttonLabel: "Continue Quiz",
   },
 ];


const Topic = () => {

const [isModalOpen, setModalOpen] = useState(false);

// Function to open modal
const openModal = () => setModalOpen(true);

// Function to close modal
const closeModal = () => setModalOpen(false);


  // State to track which categories are expanded
  const [expandedCategories, setExpandedCategories] = useState([]);

  // Handle expanding and collapsing categories
  const toggleCategory = (index) => {
    if (expandedCategories.includes(index)) {
      setExpandedCategories(expandedCategories.filter((i) => i !== index));
    } else {
      setExpandedCategories([...expandedCategories, index]);
    }
  };

  // State for selected categories and search term
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Handle selecting or unselecting category
  const togleCategory = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(
        selectedCategories.filter((item) => item !== category)
      );
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  // Handle removing selected category
  const removeCategory = (category) => {
    setSelectedCategories(
      selectedCategories.filter((item) => item !== category)
    );
  };

  // Handle search functionality
  const filteredCategories = categoryItems.filter((category) =>
    category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // State to keep track of which accordion item is open
  const [openIndex, setOpenIndex] = useState(0); // First accordion item open by default

  // Function to handle accordion item click
  const toggleAccordion = (index) => {
    setOpenIndex(index === openIndex ? null : index); // Toggle accordion, close if already open
  };

  return (
    <DefaultLayout>
      <div className="">
        {/* Header */}
        <Breadcrumb pageName="Topics" />

        <div className="mb-6">
          <p className="text-sm text-black-2 font-medium">
            Welcome to the Question Bank.
          </p>
        </div>

        {/* Main content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Categories */}
          <div className="lg:col-span-2 space-y-6">
            {/* Create Quiz Section */}
            <div className="p-4 bg-white rounded-lg ">
              <div className="flex flex-wrap justify-start lg:gap-15 gap-3">
                <div>
                  <label
                    htmlFor="noOfQuestions"
                    className="block text-sm font-semibold text-[#111827] mb-1"
                  >
                    Quiz Name
                  </label>
                  <input
                    type="text"
                    placeholder="Create a test name"
                    className="mt-3 px-4 py-2  text-[#ADB5BD] text-title-p focus:outline-none rounded-[4px]  border border-[#CED4DA] placeholder-secondary"
                  />
                </div>
                <div>
                  <label
                    htmlFor="noOfQuestions"
                    className="block text-sm font-semibold text-[#111827] mb-1"
                  >
                    No. of questions
                  </label>
                  <select
                    type="select"
                    className="mt-3 px-4 py-2  text-[#ADB5BD] text-title-p focus:outline-none rounded-[4px]  border border-[#CED4DA] placeholder-secondary bg-white w-50"
                  >
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="15">15</option>
                    <option value="20">20</option>
                    <option value="25">20</option>
                    <option value="30">20</option>
                  </select>
                </div>
              </div>
              <div className="flex mt-3 mb-2 justify-end items-center">
                {/* <p className=" text-[13px] font-bold text-secondary">
                  Test contains 493 questions and 4 topics
                </p> */}
                <div>
                  {/* Create New Quiz Button */}
                  <button
                    className="bg-[#007AFF] text-[12px] font-semibold text-white px-4 py-3 rounded-md"
                    onClick={openModal}
                  >
                    Create New Quiz
                  </button>

                  {/* Modal Component */}
                  <CreateQuizModal
                    isOpen={isModalOpen}
                    closeModal={closeModal}
                  />
                </div>
              </div>
            </div>

            {/* Categories Section */}
            <div className="bg-white rounded-lg border border-[#E6E9EC]">
              <div className="flex justify-between items-center p-4 border-b border-[#DEE2E6]">
                <h2 className="text-title-sm text-primary font-semibold">
                  Categories - S1
                </h2>
                <h2 className="text-[13px] text-primary font-bold">
                  Attempted
                </h2>
              </div>
              <div className="grid gap-3">
                {categories.map((category, index) => (
                  <div key={index}>
                    {/* Main Category */}
                    <div className="flex justify-between items-center border-b border-[#DEE2E6] py-2 px-4 ">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          className="mr-3 cursor-pointer"
                          onClick={() => toggleCategory(index)}
                        />
                        <span className="text-[14px] text-primary">
                          {category.name}
                        </span>
                      </div>
                      <span className="text-white text-[10px] font-semibold bg-[#007AFF] px-2 py-1 rounded-md">
                        {category.progress}
                      </span>
                    </div>

                    {/* Subcategories (show only if expanded) */}
                    {expandedCategories.includes(index) &&
                      category.subcategories && (
                        <div className=" ">
                          {category.subcategories.map(
                            (subcategory, subIndex) => (
                              <div
                                key={subIndex}
                                className="flex justify-between items-center  pl-15 py-2 px-4 border-b border-[#DEE2E6]"
                              >
                                <div className="flex items-center">
                                  <input
                                    type="checkbox"
                                    className="mr-3 cursor-pointer"
                                  />
                                  <span className="text-[14px] text-primary ">
                                    {subcategory.name}
                                  </span>
                                </div>
                                <span className="text-white text-[10px] font-semibold bg-[#007AFF]  px-2 py-1 rounded-md">
                                  {subcategory.progress}
                                </span>
                              </div>
                            )
                          )}
                        </div>
                      )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Test Mode, Difficulty, Recent Tests */}
          <div className="space-y-6">
            {/* Test Mode */}
            <div className=" bg-white rounded-lg border border-[#E6E9EC] ">
              <h2 className="text-title-sm text-primary font-semibold  border-b border-[#E9ECEF] px-6 py-6 ">
                Test Mode
              </h2>
              <div className="px-4 py-6 grid grid-cols-2 ">
                <div className="flex items-center">
                  <input type="radio" name="mode" className="mr-2" />
                  <label className="text-[15px] font-medium text-primary">
                    Timed
                  </label>
                </div>
                <div className="flex items-center">
                  <input type="radio" name="mode" className="mr-2" />
                  <label className="text-[15px] font-medium text-primary">
                    Tutor
                  </label>
                </div>
              </div>
            </div>

            {/* Level of Difficulty */}
            <div className="bg-white rounded-lg border border-[#E6E9EC]">
              <h2 className="text-title-sm text-primary font-semibold  border-b border-[#DEE2E6] px-6 py-4">
                University
              </h2>
              {/* Top bar showing selected categories */}
              <div className="flex items-center flex-wrap  border-b border-[#DEE2E6] px-7 ">
                {selectedCategories.map((category, index) => (
                  <div
                    key={index}
                    className="bg-[#E5E6E6] flex items-center px-3 py-1 rounded-lg mr-6 my-2 "
                  >
                    <span className="text-sm">{category}</span>
                    <button
                      className="ml-2 "
                      onClick={() => removeCategory(category)}
                    >
                      <RxCross2 />
                    </button>
                  </div>
                ))}
              </div>

              {/* Search bar */}
              <div className="relative mb-4 ">
                <input
                  type="text"
                  placeholder="Search"
                  className="w-full px-7 py-2 border-b border-[#DEE2E6] rounded-md focus:outline-none  placeholder-secondary"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2  text-secondary">
                  <IoSearchSharp size={17} className="text-secondary" />
                </span>
              </div>

              {/* Category Items List */}
              <div className="space-y-2">
                {filteredCategories.map((category, index) => (
                  <div
                    key={index}
                    className="flex items-center px-4 py-3 border-b border-[#DEE2E6]"
                  >
                    <input
                      type="checkbox"
                      className="mr-2"
                      checked={selectedCategories.includes(category)}
                      onChange={() => togleCategory(category)}
                    />
                    <label className="text-[14px] text-primary">
                      {category}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Tests */}
            <h2 className="text-title-sm text-primary font-semibold">
              Recent Tests
            </h2>

            <div className=" bg-white rounded-lg border border-[#CED4DA]">
              <div className="">
                {recentTests.map((test, index) => (
                  <div key={index} className="border-b  border-[#CED4DA] ">
                    {/* Accordion Header (Test Name) */}
                    <div
                      className="text-[14px] text-primary font-semibold cursor-pointer p-4"
                      onClick={() => toggleAccordion(index)}
                    >
                      {test.name}
                    </div>

                    {/* Accordion Content (Description, Date, Button) */}
                    {openIndex === index && (
                      <div className="mt-2 p-4 border-t border-[#CED4DA] ">
                        {test.description && (
                          <>
                            <div className="flex justify-between">
                              <div className="flex flex-col gap-4">
                                <div className="text-[13px] text-secondary">
                                  {test.description}
                                </div>
                                <div className="text-[12px] font-bold text-secondary ">
                                  Created: {test.createdDate}
                                </div>
                              </div>
                              <div className="flex items-end">
                                <button className="bg-white text-[#007AFF] px-4 py-2 border border-[#007AFF] rounded-md ">
                                  {test.buttonLabel}
                                </button>
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Topic;
