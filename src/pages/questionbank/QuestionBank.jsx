import React from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link, useSearchParams } from "react-router-dom";
import Filter from "../../components/Filter";
import Table from "../../components/table/Table";
import useDebouncedEffect from "../../hooks/useDebounce";
import DefaultLayout from "../../layouts/DefaultLayout";
import {
  getAllQuestions,
  uploadQuestions,
} from "../../store/features/questions/question.service";

const QuestionBank = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();

  useDebouncedEffect(
    () => {
      const params = Object.fromEntries(searchParams.entries());
      dispatch(getAllQuestions(params));
    },
    [searchParams],
    500
  );

  const params = Object.fromEntries(searchParams.entries());
  console.log("🚀 ~ QuestionBank ~ params:", params);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];

    if (!file) toast.error("Please select a json file to upload.");
    if (file) {
      const reader = new FileReader();
      reader.onload = async (e) => {
        try {
          const json = JSON.parse(e.target.result);

          const res = await dispatch(uploadQuestions(json));

          if (res.type === "uploadQuestion/fulfilled") {
            await dispatch(getAllQuestions());
          }
        } catch (err) {
          console.error("Invalid JSON file", err);
        }
      };
      reader.readAsText(file);
    }
  };

  const updateSearchParams = (newParams) => {
    setSearchParams((prev) => {
      const updatedParams = new URLSearchParams(prev);
      Object.keys(newParams).forEach((key) => {
        if (newParams[key]) {
          updatedParams.set(key, newParams[key]);
        } else {
          updatedParams.delete(key);
        }
      });
      return updatedParams;
    });
  };

  const filteredParams = { ...params };
  delete filteredParams?.pageNo;
  delete filteredParams?.search;
  delete filteredParams?.deployed;
  delete filteredParams?.startDate;
  delete filteredParams?.endDate;
  delete filteredParams?.exam_variable;

  return (
    <>
      <DefaultLayout>
        <div className="flex flex-col items-end justify-end gap-3 space-x-4 mt-17">
          <label className="bg-[#007AFF] text-title-p font-semibold text-white py-2 px-4 rounded-md cursor-pointer">
            Upload JSON
            <input
              type="file"
              accept=".json"
              className="hidden"
              onChange={handleFileUpload}
            />
          </label>
          <Link to="/update-questions" state={filteredParams}>
            <button className="bg-[#007AFF] text-white text-title-p font-semibold py-2 px-4 rounded-md">
              Switch to Individual view
            </button>
          </Link>
        </div>
        <Filter
          params={Object.fromEntries(searchParams.entries())}
          setParams={updateSearchParams}
        />
        <Table
          params={Object.fromEntries(searchParams.entries())}
          setParams={updateSearchParams}
        />
      </DefaultLayout>
    </>
  );
};

export default QuestionBank;
