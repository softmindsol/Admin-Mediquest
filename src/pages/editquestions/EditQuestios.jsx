import React, { useEffect, useState } from "react";
import DefaultLayout from "../../layouts/DefaultLayout";
import { useFormik } from "formik"; // Import Formik
import * as Yup from "yup"; // Import Yup for validation schema
import EditQuestion from "../../components/EditQuestion";
import { Link, useParams, useSearchParams } from "react-router-dom";
import TextEditor from "../../components/TextEditor";
import { useDispatch, useSelector } from "react-redux";
import { getDocumentQuestion } from "../../store/features/questions/question.service";

const EditQuestions = () => {
  const {
    totalPages,
    currentPage,
    questions,
    metadata: metaData,
  } = useSelector((state) => state?.questions?.documentQuestions);
  const [firstQuestion] = questions || [];

  const dispatch = useDispatch();
  const { documentId } = useParams();
  const [pageNo, setPageNo] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();

  const updatedParams = (newPageNo) => {
    setSearchParams({ page: newPageNo });
    setPageNo(newPageNo);
  };

  console.log(firstQuestion?.deploy);

  const [isDeployed, setIsDeployed] = useState(firstQuestion?.deploy);
  console.log("🚀 ~ EditQuestions ~ isDeployed:", isDeployed);

  useEffect(() => {
    dispatch(getDocumentQuestion({ documentId, pageNo }));
  }, [dispatch, documentId, pageNo]);

  // Initialize formik
  const formik = useFormik({
    initialValues: {
      question: firstQuestion?.question || "",
      solution: "",
      examVar: metaData?.exam_variable || "",
      year: metaData?.exam_year || "",
      topic: metaData?.topic || "",
    },
    validationSchema: Yup.object({
      question: Yup.string().required("Question is required"),
      solution: Yup.string().required("Solution is required"),
      examVar: Yup.string().required("Exam variable is required"),
      year: Yup.string().required("Year is required"),
      topic: Yup.string().required("Topic is required"),
    }),
    onSubmit: (values) => {
      console.log("Form submitted with values: ", values);
    },
    enableReinitialize: true,
  });

  return (
    <DefaultLayout>
      {/* Go Back Button */}
      <div className="flex flex-col items-start gap-3 mt-6">
        <Link
          to="/question-bank"
          className="bg-[#007AFF] text-white font-semibold py-2 px-4 rounded-md"
        >
          GO BACK
        </Link>
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-center mt-16 space-x-4">
        <button
          onClick={() => pageNo > 1 && updatedParams(pageNo - 1)}
          className="px-4 py-3 text-gray-500 bg-white border border-[#E9ECEF] rounded"
        >
          &lt; Prev
        </button>
        <div className="px-4 py-3 bg-[#3A57E8] text-white border border-[#7749F8] rounded">
          {pageNo} of {totalPages}
        </div>
        <button
          onClick={() => pageNo < totalPages && updatedParams(pageNo + 1)}
          className="px-4 py-3 text-gray-500 bg-white border border-[#E9ECEF] rounded"
        >
          Next &gt;
        </button>
      </div>

      {/* Dropdowns and Action Buttons */}
      <div className="flex flex-wrap items-center justify-between gap-3 mt-6 mb-10">
        <div className="flex flex-wrap items-center space-x-2 lg:flex-row">
          <div>
            <label className="block text-[#211C1B] lg:font-bold font-semibold mb-1">
              Exam Var
            </label>
            <select
              name="examVar"
              value={formik.values.examVar}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-32 px-4 py-3 focus:outline-none border border-[#949494] bg-white rounded-2xl"
            >
              <option value="">Select</option>
              {Array.from({ length: 10 }, (_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
            {formik.touched.examVar && formik.errors.examVar && (
              <span className="text-sm text-red-500">
                {formik.errors.examVar}
              </span>
            )}
          </div>
          <div>
            <label className="block text-[#211C1B] lg:font-bold font-semibold mb-1">
              Year
            </label>
            <select
              name="year"
              value={formik.values.year}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-32 px-4 py-3 focus:outline-none border border-[#949494] bg-white rounded-2xl"
            >
              <option value="">Select</option>
              <option value="2019">2019</option>
              <option value="2020">2020</option>
              <option value="2021">2021</option>
            </select>
            {formik.touched.year && formik.errors.year && (
              <span className="text-sm text-red-500">{formik.errors.year}</span>
            )}
          </div>
          <div>
            <label className="block text-[#211C1B] lg:font-bold font-semibold mb-1">
              Topic
            </label>
            <select
              name="topic"
              value={formik.values.topic}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-32 px-4 py-3 focus:outline-none border border-[#949494] bg-white rounded-2xl"
            >
              <option value="">Select</option>
              <option value="Biochimie">Biochimie</option>
            </select>
            {formik.touched.topic && formik.errors.topic && (
              <span className="text-sm text-red-500">
                {formik.errors.topic}
              </span>
            )}
          </div>
        </div>

        {/* Save, Deploy/Undeploy Buttons */}
        <div className="flex items-center space-x-4">
          <button
            type="button"
            className="px-6 py-2 text-white bg-[#8080808C] font-semibold rounded-2xl"
            onClick={formik.handleSubmit}
          >
            Save
          </button>
          {isDeployed ? (
            <button
              className="px-6 py-2 font-semibold text-white bg-red-500 rounded-2xl"
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
              id="question"
              required={true}
              name="question"
              placeholder={"I am your rich text editor."}
              value={formik.values.question}
              onChange={(content) => formik.setFieldValue("question", content)}
              onBlur={formik.handleBlur}
            />
            {formik.touched.question && formik.errors.question && (
              <span className="text-sm text-red-500">
                {formik.errors.question}
              </span>
            )}
          </div>
        </form>
      </div>

      {/* Edit Question Component */}
      <EditQuestion />
      <div className="relative pb-20 mt-10 px-7">
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-6">
            <TextEditor
              label="Solution*"
              id="solution"
              required={true}
              name="solution"
              placeholder={"I am your rich text editor."}
              value={formik.values.solution}
              onChange={(content) => formik.setFieldValue("solution", content)}
              onBlur={formik.handleBlur}
              height={150}
            />
            {formik.touched.solution && formik.errors.solution && (
              <span className="text-sm text-red-500">
                {formik.errors.solution}
              </span>
            )}
          </div>
        </form>
      </div>
    </DefaultLayout>
  );
};

export default EditQuestions;
