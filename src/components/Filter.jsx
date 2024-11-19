import React from "react";
import { FaFileImport } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import { modulesArray, uniqueCities } from "../pages/editquestions/constant";

const Filter = ({ params, setParams }) => {
  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setParams({
      ...params,
      [name]: type === "checkbox" ? checked : value,
    });
  };
  return (
    <form className="flex items-center justify-between space-x-4 overflow-x-auto mt-9">
      <div className="flex gap-3 items-center border border-[#EEEEEE] bg-white rounded focus:outline-none px-8 py-3 text-black text-[12px]">
        <IoSearch size={18} />
        <input
          type="text"
          name="search"
          placeholder="Search question"
          value={params?.search}
          onChange={handleChange}
          className="focus:outline-none"
        />
      </div>

      <select
        name="topic"
        value={params?.topic}
        onChange={handleChange}
        className="border w-28 border-[#EEEEEE] focus:outline-none text-[14px] font-bold text-[#211C1B] bg-white rounded px-4 py-3"
      >
        <option value="">Topic</option>
        {modulesArray.map((module) => (
          <option value={module.value}>{module.name}</option>
        ))}
      </select>

      <select
        name="semester"
        value={params?.semester}
        onChange={handleChange}
        className="border border-[#EEEEEE] focus:outline-none text-[14px] font-bold text-[#211C1B] bg-white rounded px-4 py-3"
      >
        <option value="">Semester</option>
        {Array.from({ length: 10 }, (_, i) => (
          <option key={i + 1} value={`S${i + 1}`}>
            S{i + 1}
          </option>
        ))}
      </select>

      <select
        name="city"
        value={params?.city}
        onChange={handleChange}
        className="border w-28 border-[#EEEEEE] focus:outline-none text-[14px] font-bold text-[#211C1B] bg-white rounded px-4 py-3"
      >
        <option value="">City</option>
        {uniqueCities.map((city) => (
          <option value={city.value}>{city.name}</option>
        ))}
      </select>

      <input
        type="date"
        name="startDate"
        value={params?.startDate}
        onChange={handleChange}
        className="border border-[#EEEEEE] focus:outline-none text-[14px] font-bold text-[#211C1B] bg-white rounded px-4 py-3"
      />
      <p className="text-[14px] font-bold text-[#797979]">to</p>
      <input
        type="date"
        name="endDate"
        value={params?.endDate}
        onChange={handleChange}
        className="border border-[#EEEEEE] focus:outline-none text-[14px] font-bold text-[#211C1B] bg-white rounded px-4 py-3"
      />

      <select
        name="exam_variable"
        value={params?.exam_variable}
        onChange={handleChange}
        className="border border-[#EEEEEE] focus:outline-none text-[14px] font-bold text-[#211C1B] bg-white rounded px-4 py-3"
      >
        <option value="">EV</option>
        {Array.from({ length: 10 }, (_, i) => (
          <option key={i + 1} value={i + 1}>
            {i + 1}
          </option>
        ))}
      </select>

      <label className="flex items-center">
        <input
          type="checkbox"
          name="deployed"
          checked={params?.deployed}
          onChange={handleChange}
          className="mr-2 text-[14px] text-[#211C1B] font-bold"
        />
        Deployed
      </label>

      <div className="flex gap-3 items-center border border-[#EEEEEE] bg-white rounded focus:outline-none px-8 py-3 text-black text-[12px]">
        <FaFileImport size={18} />
        <label className="font-bold text-[14px] text-[#211C1B] cursor-pointer">
          Import file
          <input type="file" accept=".json" className="hidden" />
        </label>
      </div>
    </form>
  );
};

export default Filter;
