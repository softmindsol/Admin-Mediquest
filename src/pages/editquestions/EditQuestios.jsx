import React, { useState } from "react";
import DefaultLayout from "../../layouts/DefaultLayout";
import { useFormik } from "formik"; // Import Formik
import * as Yup from "yup"; // Import Yup for validation schema
import EditQuestion from "../../components/EditQuestion";
import { Link } from "react-router-dom";
import TextEditor from "../../components/TextEditor";

const EditQuestions = () => {
  const [isDeployed, setIsDeployed] = useState(false);

  // Initialize formik
  const formik = useFormik({
    initialValues: {
      text: "",
    },
    validationSchema: Yup.object({
      text: Yup.string().required("Text is required"),
    }),
    onSubmit: (values) => {
      console.log("Form submitted with values: ", values);
    },
  });

  return (
    <>
      <DefaultLayout>
        {/* Go Back Button */}
        <div className="mt-6 flex flex-col items-start gap-3">
          <Link
            to="/question-bank"
            className="bg-[#007AFF] text-white font-semibold py-2 px-4 rounded-md"
          >
            GO BACK
          </Link>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-center items-center space-x-4 mt-16">
          <button className="px-4 py-3 text-gray-500 bg-white border border-[#E9ECEF] rounded">
            &lt; Prev
          </button>
          <div className="px-4 py-3 bg-[#3A57E8] text-white border border-[#7749F8] rounded">
            1 of 230
          </div>
          <button className="px-4 py-3 text-gray-500 bg-white border border-[#E9ECEF] rounded">
            Next &gt;
          </button>
        </div>

        {/* Dropdowns and Action Buttons */}
        <div className="flex flex-wrap gap-3 justify-between items-center mt-6 mb-10">
          {/* Dropdown Selects */}
          <div className="flex items-center lg:flex-row flex-wrap space-x-2">
            <div>
              <label className="block text-[#211C1B] lg:font-bold font-semibold mb-1">
                Exam Var
              </label>
              <select className="w-32 px-4 py-3 focus:outline-none border border-[#949494] bg-white rounded-2xl">
                {/* <option value="">Select</option> */}
              </select>
            </div>
            <div>
              <label className="block text-[#211C1B] lg:font-bold font-semibold mb-1">
                Year
              </label>
              <select className="w-32 px-4 py-3 focus:outline-none border border-[#949494] bg-white rounded-2xl">
                {/* <option value="">Select</option> */}
              </select>
            </div>
            <div>
              <label className="block text-[#211C1B] lg:font-bold font-semibold mb-1">
                Topic
              </label>
              <select className="w-32 px-4 py-3 focus:outline-none border border-[#949494] bg-white rounded-2xl">
                {/* <option value="">Select</option> */}
              </select>
            </div>
          </div>

          {/* Save, Deploy/Undeploy Buttons */}
          <div className="flex items-center space-x-4">
            <button className="px-6 py-2 text-white bg-[#8080808C] font-semibold rounded-2xl">
              Save
            </button>
            {isDeployed ? (
              <button
                className="px-6 py-2 text-white bg-red-500 font-semibold rounded-2xl"
                onClick={() => setIsDeployed(false)}
              >
                Undeploy
              </button>
            ) : (
              <button
                className="px-6 py-2 text-white bg-[#007AFF] font-semibold rounded-2xl"
                onClick={() => setIsDeployed(true)}
              >
                Deploy
              </button>
            )}
          </div>
        </div>

        {/* Form Section */}
        <div className="relative px-7">
          <form onSubmit={formik.handleSubmit}>
            <div className="mb-6">
              <TextEditor
                label="Question*"
                id="text"
                required={true}
                name="text"
                placeholder={"I am your reach text editor."}
                value={formik.values.text} // Bind the value
                onChange={(content) => formik.setFieldValue("text", content)}
                onBlur={formik.handleBlur}
              />
              {formik.touched.text && formik.errors.text && (
                <span className="text-red-500 text-sm">
                  {formik.errors.text}
                </span>
              )}
            </div>
          </form>
        </div>

        {/* Edit Question Component */}
        <EditQuestion />
        <div className="relative mt-10 pb-20 px-7">
          <form onSubmit={formik.handleSubmit}>
            <div className="mb-6">
              <TextEditor
                label="Solution*"
                id="text"
                required={true}
                name="text"
                placeholder={"I am your reach text editor."}
                value={formik.values.text} // Bind the value
                onChange={(content) => formik.setFieldValue("text", content)}
                onBlur={formik.handleBlur}
                height={150}
              />
              {formik.touched.text && formik.errors.text && (
                <span className="text-red-500 text-sm">
                  {formik.errors.text}
                </span>
              )}
            </div>
          </form>
        </div>
      </DefaultLayout>
    </>
  );
};

export default EditQuestions;
