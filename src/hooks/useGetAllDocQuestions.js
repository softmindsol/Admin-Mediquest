import { useState, useEffect } from "react";
import { axiosWithToken } from "../api";
import decryptQuestionData from "../utils/decryptQuestionData";

const useGetAllDocQuestions = (initialParams = {}) => {
  const [questions, setQuestions] = useState([]);

  const [pageNo, setPageNo] = useState(1);
  const [questionsDetail, setQuestionsDetail] = useState({
    totalQuestions: 0,
    totalPage: 0,
    currentQuestion: 0,
  });
  const [isLoading, setLoading] = useState(false);
  const [params, setParams] = useState({
    ...initialParams,
    pageNo,
  });

  console.log(params, "ok");

  const fetchQuestions = async (queryParams) => {
    setLoading(true);
    try {
      console.log(queryParams);

      const response = await axiosWithToken.get(
        "/questions/get-all-questions",
        {
          params: queryParams,
        }
      );
      console.log(response.data, "response--data");

      const encryptedQuesitons = response?.data?.data?.questions;
      console.log(
        "🚀 ~ fetchQuestions ~ encryptedQuesitons:",
        encryptedQuesitons
      );
      const decryptedQuestions = encryptedQuesitons.map((question) => {
        return decryptQuestionData(question, import.meta.env.VITE_SECRET_KEY);
      });

      setQuestions((prev) => [...prev, ...decryptedQuestions]);

      setQuestionsDetail((prev) => ({
        ...prev,
        totalPage: response.data.data.totalPage,
        totalQuestions: response.data.data.totalQuestions,
      }));
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestions(params);
  }, [params]);

  const updateParams = (newParams) => {
    setParams((prev) => ({
      ...prev,
      ...newParams,
    }));
  };

  return {
    questions,
    setQuestionsDetail,
    questionsDetail,
    isLoading,
    updateParams,
    params,
    setQuestions,
  };
};

export default useGetAllDocQuestions;
