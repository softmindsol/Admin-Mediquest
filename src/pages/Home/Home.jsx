import React from "react";
import { useDispatch } from "react-redux";
import DefaultLayout from "../../layouts/DefaultLayout";
import { uploadQuestions } from "../../store/features/questions/question.service";

const Home = () => {
  const dispatch = useDispatch();
  const handleFileUpload = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = async (e) => {
        try {
          const json = JSON.parse(e.target.result);
          console.log("🚀 ~ reader.onload= ~ json:", json);
          // const formData = new FormData();
          // formData.append(
          //   "question",
          //   new Blob([JSON.stringify(json)], { type: "application/json" }),
          //   file.name
          // );
          await dispatch(uploadQuestions(json));
        } catch (err) {
          console.error("Invalid JSON file", err);
        }
      };
      reader.readAsText(file);
    }
  };
  return (
    <DefaultLayout>
      <div className="text-title-md font-semibold mt-17 text-[#343A40]">
        Add Data
      </div>
      <div className="flex my-8 ">
        <label className="bg-white text-title-md text-black rounded-2xl font-semibold py-24 px-44 lg:w-fit w-[90%]  text-center cursor-pointer">
          Upload
          <input
            type="file"
            accept=".json"
            className="hidden"
            onChange={handleFileUpload}
          />
        </label>
      </div>
    </DefaultLayout>
  );
};

export default Home;
