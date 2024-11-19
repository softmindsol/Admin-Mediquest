import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useSearchParams } from "react-router-dom";
import * as Yup from "yup";
import {
  editQuestion,
  getAllDocQuestions,
} from "../../store/features/questions/question.service";
import DefaultLayout from "../../layouts/DefaultLayout";
import TextEditor from "../../components/TextEditor";
import EditQuestion from "../../components/EditQuestion";
import toast from "react-hot-toast";
import Loader from "../../components/Loader";

const Update = () => {
  const [loading, setLoading] = useState(false);
  const [modifiedOptions, setModifiedOptions] = useState([]);
  const [selectedCorrectAnswers, setSelectedCorrectAnswers] = useState([]);
  const {
    totalQuestions = 0,
    documentId,
    questions = {},
    metadata: metaData = {},
  } = useSelector((state) => state?.questions?.documentQuestions) || {};
  const [image, setImage] = useState(null);

  const { isLoading } = useSelector((state) => state?.questions || {});

  const handleImageUpload = (e) => {
    const file = e.target.files[0];

    if (!file) return toast.error("Please select an image file");
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
        setImageUrl("");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    setImageUrl("");
  };
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const [pageNo, setPageNo] = useState(1);
  const [image_url, setImageUrl] = useState("");
  const [isDeployed, setIsDeployed] = useState(questions?.deploy);

  useEffect(() => {
    // Check if pageNo is present in the search params
    const currentPageNo = searchParams.get("pageNo");
    if (!currentPageNo) {
      // If not present, set pageNo to 1
      setPageNo(1);
      setSearchParams({ pageNo: 1 });
    } else {
      setPageNo(Number(currentPageNo));
    }
  }, [searchParams, setSearchParams]);

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const res = await dispatch(
          getAllDocQuestions({
            pageNo: searchParams.get("pageNo") || 1,
          })
        );

        if (res.type === "getAllDocQuestions/fulfilled") {
          setImage(res?.payload?.allQuestions?.image_url);
          setImageUrl(res?.payload?.allQuestions?.image_url);
        }
      } catch (error) {
        console.error("Error fetching question: ", error);
      }
    };

    fetchQuestion();
  }, [dispatch, searchParams]);

  useEffect(() => {
    if (questions && questions.deploy !== undefined) {
      setIsDeployed(questions.deploy);
    }
  }, [questions]);

  const handlePrev = () => {
    if (pageNo > 1) {
      const newPageNo = pageNo - 1;
      setPageNo(newPageNo);
      setSearchParams({ pageNo: newPageNo });
    }
  };

  const handleNext = () => {
    if (pageNo < totalQuestions) {
      const newPageNo = pageNo + 1;
      setPageNo(newPageNo);
      setSearchParams({ pageNo: newPageNo });
    }
  };

  const formik = useFormik({
    initialValues: {
      question: questions?.question || "",
      exam_variable: metaData?.exam_variable || "",
      exam_year: metaData?.exam_year || "",
      topic: metaData?.topic || "",
    },
    validationSchema: Yup.object({
      question: Yup.string().required("Question is required"),
      exam_variable: Yup.string().required("Exam variable is required"),
      topic: Yup.string().required("Topic is required"),
    }),
    onSubmit: async (values) => {
      const updatedData = {
        ...values,
        deploy: isDeployed,
        options: modifiedOptions,
        image_url,
        image,
        correct_answers: selectedCorrectAnswers,
      };

      try {
        setLoading(true);
        const res = await dispatch(
          editQuestion({
            documentId,
            questionId: questions?._id,
            image_url: "",
            image,
            data: updatedData,
          })
        );
        setLoading(false);
      } catch (error) {
        console.error("Error submitting edit: ", error);
      }
    },
    enableReinitialize: true,
  });

  return (
    <DefaultLayout>
      <div className="flex flex-col items-start gap-3 mt-6">
        <Link
          to="/question-bank"
          className="bg-[#007AFF] text-white font-semibold py-2 px-4 rounded-md"
        >
          GO BACK
        </Link>
      </div>
      <div className="flex items-center justify-center mt-16 space-x-4">
        <button
          onClick={handlePrev}
          className="px-4 py-3 text-gray-500 bg-white border border-[#E9ECEF] rounded"
          disabled={pageNo <= 1 || isLoading}
        >
          &lt; Prev
        </button>
        <div className="px-4 py-3 bg-[#3A57E8] text-white border border-[#7749F8] rounded">
          {pageNo} of {totalQuestions}
        </div>
        <button
          onClick={handleNext}
          className="px-4 py-3 text-gray-500 bg-white border border-[#E9ECEF] rounded"
          disabled={pageNo >= totalQuestions || isLoading}
        >
          Next &gt;
        </button>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-3 mt-6 mb-10">
        <div className="flex flex-wrap items-center space-x-2 lg:flex-row">
          {/* Exam Variable Dropdown */}
          <div>
            <label className="block text-[#211C1B] lg:font-bold font-semibold mb-1">
              Exam Var
            </label>
            <select
              name="exam_variable"
              value={formik.values.exam_variable}
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
            {formik.touched.exam_variable && formik.errors.exam_variable && (
              <span className="text-sm text-red-500">
                {formik.errors.exam_variable}
              </span>
            )}
          </div>
          {/* Year Dropdown */}
          <div>
            <label className="block text-[#211C1B] lg:font-bold font-semibold mb-1">
              Year
            </label>
            <select
              name="exam_year"
              value={formik.values.exam_year}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-32 px-4 py-3 focus:outline-none border border-[#949494] bg-white rounded-2xl"
            >
              <option value="">Select</option>
              <option value="2019">2019</option>
              <option value="2020">2020</option>
              <option value="2021">2021</option>
            </select>
            {formik.touched.exam_year && formik.errors.exam_year && (
              <span className="text-sm text-red-500">
                {formik.errors.exam_year}
              </span>
            )}
          </div>
          {/* Topic Dropdown */}
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

        <div className="flex items-center space-x-4">
          <button
            type="button"
            disabled={loading}
            className="px-6 py-2 text-white bg-[#007AFF] font-semibold rounded-2xl"
            onClick={formik.handleSubmit}
          >
            {loading ? (
              <Loader className="w-5 h-5 border-white border-solid rounded-full animate-spin-1.5 border-t-transparent border-2" />
            ) : (
              "Save"
            )}
          </button>
          <button
            type="button"
            className={`px-6 py-2 font-semibold text-white rounded-2xl ${
              isDeployed ? "bg-red-500" : "bg-[#007AFF]"
            }`}
            onClick={() => setIsDeployed(!isDeployed)}
          >
            {isDeployed ? "Undeploy" : "Deploy"}
          </button>
        </div>
      </div>
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
      <div className="flex items-end justify-between p-4">
        <div className="lg:w-[60%] flex justify-end ite w-full">
          {image ? (
            <img
              src={image}
              alt="Uploaded"
              className="object-contain h-64 w-100"
            />
          ) : (
            <div className="text-sm ">No image uploaded</div>
          )}
        </div>
        <div className="flex flex-col items-end justify-end mt-4 space-y-4">
          <button
            onClick={handleRemoveImage}
            className="bg-[#FF3B30] text-white text-title-p font-semibold  px-4 w-fit py-2 rounded cursor-pointer"
          >
            Remove Image
          </button>
          <label className="bg-[#007AFF] text-white text-title-p font-semibold  px-4 w-fit py-2 rounded cursor-pointer">
            Upload new Image
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </label>
        </div>
      </div>
      <EditQuestion
        modifiedOptions={modifiedOptions}
        setModifiedOptions={setModifiedOptions}
        selectedCorrectAnswers={selectedCorrectAnswers}
        setSelectedCorrectAnswers={setSelectedCorrectAnswers}
      />
    </DefaultLayout>
  );
};

export default Update;
