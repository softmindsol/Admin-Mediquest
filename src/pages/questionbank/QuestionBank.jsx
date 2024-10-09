import React, { useState } from "react";
import DefaultLayout from "../../layouts/DefaultLayout";
import Table from "../../components/table/Table";
import Filter from "../../components/Filter";
  const handleFileUpload = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const json = JSON.parse(e.target.result);
          console.log("JSON File Content:", json);
        } catch (err) {
          console.error("Invalid JSON file", err);
        }
      };
      reader.readAsText(file);
    }
  };
 
const QuestionBank = () => {
     const [filterValues, setFilterValues] = useState({});

     const handleFilter = (filters) => {
       setFilterValues(filters);
       console.log("Applied Filters:", filters); // Log the applied filters
     };
  return (
    <>
      <DefaultLayout>
        <div className="mt-17 flex flex-col items-end gap-3 justify-end space-x-4">
          <label className="bg-[#007AFF] text-title-p font-semibold text-white py-2 px-4 rounded-md cursor-pointer">
            Upload JSON
            <input
              type="file"
              accept=".json"
              className="hidden"
              onChange={handleFileUpload}
            />
          </label>
          <button className="bg-[#007AFF] text-white text-title-p font-semibold py-2 px-4 rounded-md">
            Switch to Individual view
          </button>
        </div>
        <Filter onFilter={handleFilter} />
        <Table filters={filterValues} />
      </DefaultLayout>
    </>
  );
};

export default QuestionBank;
