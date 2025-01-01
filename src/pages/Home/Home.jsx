import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import DefaultLayout from "../../layouts/DefaultLayout";
import Table from "../../components/table/Table";
import {
  getAllQuestions,
  uploadQuestions,
} from "../../store/features/questions/question.service";
import { useDispatch, useSelector } from "react-redux";
import useDebouncedEffect from "../../hooks/useDebounce";

const Home = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();

  const { questions: data, isLoading } = useSelector(
    (state) => state?.questions
  );
  console.log("--data", data);

  useDebouncedEffect(
    () => {
      const params = Object.fromEntries(searchParams.entries());
      dispatch(getAllQuestions(params));
    },
    [searchParams],
    500
  );

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async (e) => {
        try {
          const json = JSON.parse(e.target.result);

          await dispatch(uploadQuestions(json));
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
  return (
    <DefaultLayout>
      <div className="flex flex-col items-end justify-end gap-3 space-x-4 mt-17">
        <label className="bg-[#3A57E8] text-title-p font-semibold text-white py-3 px-4 rounded-md cursor-pointer">
          Upload JSON
          <input
            type="file"
            accept=".json"
            className="hidden"
            onChange={handleFileUpload}
          />
        </label>
      </div>
      <div className="text-title-md font-semibold mt-1 mb-9 text-[#343A40]">
        My JSON
      </div>

      <Table
        params={Object.fromEntries(searchParams.entries())}
        setParams={updateSearchParams}
      />
    </DefaultLayout>
  );
};

export default Home;
