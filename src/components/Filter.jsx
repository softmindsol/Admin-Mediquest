import React, { useState } from "react";
import { FaFileImport } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
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
const Filter = ({ onFilter }) => {
  const [filters, setFilters] = useState({
    search: "",
    topic: "",
    sem: "",
    city: "",
    dateAddedFrom: "",
    dateAddedTo: "",
    ev: "",
    deployed: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onFilter(filters); // Pass the filter values to the parent component
    console.log(filters); // Log the filters to the console
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex justify-between items-center overflow-x-auto mt-9 space-x-4"
    >
      <div className="flex gap-3 items-center border border-[#EEEEEE] bg-white rounded focus:outline-none px-8 py-3 text-black text-[12px]">
        <IoSearch size={18} />

        <input
          type="text"
          name="search"
          placeholder="Search question"
          value={filters.search}
          onChange={handleChange}
          className=" focus:outline-none"
        />
      </div>
      <select
        name="topic"
        value={filters.topic}
        onChange={handleChange}
        className="border border-[#EEEEEE] focus:outline-none text-[14px] font-bold text-[#211C1B] bg-white rounded px-4 py-3"
      >
        <option value="">Topic</option>
        {/* Add more options as needed */}
      </select>
      <select
        name="sem"
        value={filters.sem}
        onChange={handleChange}
        className="border border-[#EEEEEE] focus:outline-none text-[14px] font-bold text-[#211C1B] bg-white rounded px-4 py-3"
      >
        <option value="">Sem</option>
        {/* Add more options as needed */}
      </select>
      <select
        name="city"
        value={filters.city}
        onChange={handleChange}
        className="border border-[#EEEEEE] focus:outline-none text-[14px] font-bold text-[#211C1B] bg-white rounded px-4 py-3"
      >
        <option value="">City</option>
        {/* Add more options as needed */}
      </select>
      <input
        type="date"
        name="dateAddedFrom"
        value={filters.dateAddedFrom}
        onChange={handleChange}
        className="border border-[#EEEEEE] focus:outline-none text-[14px] font-bold text-[#211C1B] bg-white rounded px-4 py-3"
      />
      <p className="text-[14px] font-bold text-[#797979]">to</p>
      <input
        type="date"
        name="dateAddedTo"
        value={filters.dateAddedTo}
        onChange={handleChange}
        className="border border-[#EEEEEE] focus:outline-none text-[14px] font-bold text-[#211C1B] bg-white rounded px-4 py-3"
      />
      <select
        name="ev"
        value={filters.ev}
        onChange={handleChange}
        className="border border-[#EEEEEE] focus:outline-none text-[14px] font-bold text-[#211C1B] bg-white rounded px-4 py-3"
      >
        <option value="">EV</option>
        {/* Add more options as needed */}
      </select>
      <label className="flex items-center">
        <input
          type="checkbox"
          name="deployed"
          checked={filters.deployed}
          onChange={handleChange}
          className="mr-2 text-[14px] text-[#211C1B] font-bold"
        />
        Deployed
      </label>
      <div className="flex gap-3 items-center border border-[#EEEEEE] bg-white rounded focus:outline-none px-8 py-3 text-black text-[12px]">
        <FaFileImport size={18} />

        <label className="font-bold text-[14px] text-[#211C1B] cursor-pointer">
          Import file
          <input
            type="file"
            accept=".json"
            className="hidden"
            onChange={handleFileUpload}
          />
        </label>
      </div>
      {/* <button
        type="submit"
        className="bg-blue-500 text-white rounded px-4 py-2"
      >
        Filter
      </button> */}
    </form>
  );
};

export default Filter;
