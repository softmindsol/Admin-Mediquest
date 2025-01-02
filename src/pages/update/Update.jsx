import { useFormik } from "formik";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import * as Yup from "yup";
import EditQuestion from "../../components/EditQuestion";
import Loader from "../../components/Loader";
import TextEditor from "../../components/TextEditor";
import useGetAllDocQuestions from "../../hooks/useGetAllDocQuestions";
import DefaultLayout from "../../layouts/DefaultLayout";
import { editQuestion } from "../../store/features/questions/question.service";
import { modulesArray } from "../editquestions/constant";

const Update = () => {
  const location = useLocation();
  const params = location?.state;
  const {
    questions,
    setQuestionsDetail,
    questionsDetail,
    isLoading,
    updateParams,
    params: queryParams,
    setQuestions,
  } = useGetAllDocQuestions(params);
  const dispatch = useDispatch();

  const currentQuestion = questions[questionsDetail.currentQuestion];
  const CURRENT_QUESTION = questionsDetail?.currentQuestion + 1;
  const TOTAL_QUESTIONS = questionsDetail?.totalQuestions;
  const isDeployed = currentQuestion?.content?.questions?.deploy;
  console.log("🚀 ~ Update ~ isDeployed:", isDeployed);
  const IMAGE =
    currentQuestion?.content?.questions?.image_url !== null
      ? currentQuestion?.content?.questions?.image_url
      : "";
  console.log(IMAGE, "image");

  const [error, setError] = useState({
    correctOptionError: "",
    optionError: "",
  });
  console.log("🚀 ~ Update ~ currentQuestion:", currentQuestion);

  const handleNext = () => {
    const nextIndex = questionsDetail.currentQuestion + 1;

    const isCloseToEnd = !questions[nextIndex + 3];

    if (nextIndex < questionsDetail.totalQuestions) {
      setQuestionsDetail((prev) => ({
        ...prev,
        currentQuestion: nextIndex,
      }));

      if (isCloseToEnd && nextIndex + 3 < questionsDetail.totalQuestions) {
        const nextPage = queryParams.pageNo + 1;
        updateParams({ pageNo: nextPage });
      }
    }
  };

  const handlePrev = () => {
    const prevIndex = questionsDetail.currentQuestion - 1;
    if (questionsDetail.currentQuestion > 0) {
      setQuestionsDetail((prev) => ({
        ...prev,
        currentQuestion: prevIndex,
      }));
    }
  };

  const [loading, setLoading] = useState(false);
  const [modifiedOptions, setModifiedOptions] = useState([]);
  console.log("modifiedOptions", modifiedOptions);

  const [selectedCorrectAnswers, setSelectedCorrectAnswers] = useState([]);
  console.log("🚀 ~ Update ~ selectedCorrectAnswers:", selectedCorrectAnswers);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];

    if (!file) return toast.error("Please select an image file");
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const questionId = currentQuestion?._id;
        setQuestions((prevQuestions) =>
          prevQuestions.map((question) =>
            question._id === questionId
              ? {
                  ...question,
                  content: {
                    ...question.content,
                    questions: {
                      ...question.content.questions,
                      image_url: reader.result,
                    },
                  },
                }
              : question
          )
        );
      };
      reader.readAsDataURL(file);
    }
  };

  console.log(questions);

  const handleChangeDeploy = (questionId) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((question) =>
        question._id === questionId
          ? {
              ...question,
              content: {
                ...question.content,
                questions: {
                  ...question.content.questions,
                  deploy: !question.content.questions.deploy,
                },
              },
            }
          : question
      )
    );
  };

  console.log(currentQuestion?.content?.questions?.deploy, "deploy");
  console.log(currentQuestion?._id, "id");

  const handleRemoveImage = () => {
    const questionId = currentQuestion._id;
    setQuestions((prevQuestions) =>
      prevQuestions.map((question) =>
        question._id === questionId
          ? {
              ...question,
              content: {
                ...question.content,
                questions: {
                  ...question.content.questions,
                  image_url: null,
                },
              },
            }
          : question
      )
    );
  };

  const stripHtmlTags = (html) => {
    const div = document.createElement("div");
    div.innerHTML = html;
    return div.textContent || div.innerText || "";
  };

  console.log("error", error);

  const formik = useFormik({
    initialValues: {
      question: currentQuestion?.content?.questions?.question || "",
      exam_variable: currentQuestion?.metadata?.exam_variable || "",
      semester: currentQuestion?.metadata?.semester || "",
      topic: currentQuestion?.metadata?.topic || "",
    },
    validationSchema: Yup.object({
      question: Yup.string()
        .test(
          "is-valid-question",
          "Question is required",
          (value) => !!stripHtmlTags(value).trim()
        )
        .required("Question is required"),
      exam_variable: Yup.string().required("Exam variable is required"),
      topic: Yup.string().required("Topic is required"),
    }),
    onSubmit: async (values) => {
      const updatedData = {
        ...values,
        deploy: currentQuestion?.content?.questions?.deploy,
        options: modifiedOptions,
        image_url: currentQuestion?.content?.questions?.image_url,
        correct_answers: selectedCorrectAnswers,
      };

      try {
        if (selectedCorrectAnswers.length === 0) {
          setError({
            ...error,
            correctOptionError: "At least one correct answer must be selected",
          });
          return;
        }

        if (
          modifiedOptions
            ?.map((option) => stripHtmlTags(option).trim())
            .filter((value) => value != "").length === 0
        ) {
          setError({ ...error, optionError: "At least add one option" });
        } else {
          setError({
            ...error,
            optionError: "",
          });
        }
        setLoading(true);
        console.log("selectedCorrectAnswers", selectedCorrectAnswers);
        const questionId = currentQuestion?._id;
        const res = await dispatch(
          editQuestion({
            documentId: currentQuestion?.documentId,
            questionId: questionId,
            data: updatedData,
          })
        );

        console.log("nyc", res);

        if (res.type === "editQuestion/fulfilled") {
          setQuestions((prevQuestions) =>
            prevQuestions.map((question) =>
              question._id === questionId
                ? {
                    ...question,
                    metadata: {
                      ...question.metadata,
                      topic: values.topic,
                      semester: values.semester,
                      exam_variable: values.exam_variable,
                    },
                    content: {
                      ...question.content,
                      questions: {
                        ...question.content.questions,
                        question: values.question,
                        options: modifiedOptions,
                        correct_answers: selectedCorrectAnswers,
                        image_url: res?.payload?.data?.image_url,
                      },
                    },
                  }
                : question
            )
          );
        }
        setLoading(false);
      } catch (error) {
        console.error("Error submitting edit: ", error);
      }
    },
    enableReinitialize: true,
  });

  // const validateForm = () => {
  //   const errors = {};

  //   if (!formik.values.question || formik.values.question.trim() === "") {
  //     errors.question = "Question is required";
  //   }

  //   if (!modifiedOptions || modifiedOptions.length === 0) {
  //     errors.options = "Options are required";
  //   } else {
  //     const hasEmptyOption = modifiedOptions.some(
  //       (option) => !option || option.trim() === ""
  //     );
  //     if (hasEmptyOption) {
  //       errors.options = "All options must be filled out";
  //     }
  //   }

  //   if (!selectedCorrectAnswers || selectedCorrectAnswers.length === 0) {
  //     errors.correctAnswers = "At least one correct answer must be selected";
  //   }

  //   return errors;
  // };

  console.log("error", formik.errors);
  console.log("values", formik.values);

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
          disabled={params.pageNo <= 1 || isLoading}
        >
          &lt; Prev
        </button>
        <div className="px-4 py-3 bg-[#3A57E8] text-white border border-[#7749F8] rounded">
          {CURRENT_QUESTION} of {TOTAL_QUESTIONS}
        </div>
        <button
          onClick={handleNext}
          className="px-4 py-3 text-gray-500 bg-white border border-[#E9ECEF] rounded"
          disabled={params?.pageNo >= TOTAL_QUESTIONS || isLoading}
        >
          Next &gt;
        </button>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-3 mt-6 mb-10">
        <div className="flex flex-wrap items-center space-x-2 lg:flex-row">
          <div>
            <label className="block text-[#211C1B] lg:font-bold font-semibold mb-1">
              Exam Var
            </label>
            <select
              disabled={true}
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
          <div>
            <label className="block text-[#211C1B] lg:font-bold font-semibold mb-1">
              Semester
            </label>
            <select
              disabled={true}
              name="semester"
              value={formik.values.semester}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-32 px-4 py-3 focus:outline-none border border-[#949494] bg-white rounded-2xl"
            >
              <option value="">Select</option>

              {Array.from({ length: 10 }, (_, index) => (
                <option key={`S${index + 1}`} value={`S${index + 1}`}>
                  S{index + 1}
                </option>
              ))}
            </select>
            {formik.touched.exam_year && formik.errors.semester && (
              <span className="text-sm text-red-500">
                {formik.errors.semester}
              </span>
            )}
          </div>

          <div>
            <label className="block text-[#211C1B] lg:font-bold font-semibold mb-1">
              Topic
            </label>
            <select
              disabled={true}
              key={formik.values.topic}
              name="topic"
              value={formik.values.topic}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-32 px-4 py-3 focus:outline-none border border-[#949494] bg-white rounded-2xl"
            >
              <option value="">Select</option>
              {modulesArray.map((module) => (
                <option value={module.value}>{module.name}</option>
              ))}{" "}
            </select>
            {formik.touched.topic && formik.errors.topic && (
              <span className="text-sm text-red-500">
                {formik.errors.topic}
              </span>
            )}
          </div>
        </div>

        <div className="flex items-end mt-6 space-x-4">
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
            onClick={() => handleChangeDeploy(currentQuestion?._id)}
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
          {IMAGE ? (
            <img
              src={IMAGE}
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
        setError={setError}
        error={error}
        questions={currentQuestion}
        modifiedOptions={modifiedOptions}
        setModifiedOptions={setModifiedOptions}
        selectedCorrectAnswers={selectedCorrectAnswers}
        setSelectedCorrectAnswers={setSelectedCorrectAnswers}
      />
    </DefaultLayout>
  );
};

export default Update;
