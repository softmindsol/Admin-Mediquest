import React, { useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { GrEdit } from "react-icons/gr";
import { RiDeleteBin6Line } from "react-icons/ri";
import Pagination from "../Pagination";
import { Link } from "react-router-dom";

// Updated columns based on the screenshot design
const columns = [
  { name: "ID", label: "ID" },
  { name: "Question", label: "Question" },
  { name: "DateAdded", label: "Date Added" },
  { name: "Topic", label: "Topic" },
  { name: "Deploy", label: "Deploy" },
];

// Updated sample data for demonstration based on the screenshot
const data = [
  {
    ID: 1,
    Question: "Who are all ______ people?",
    DateAdded: "B",
    Topic: "nguyenquocuy",
    Deploy: "nguyenquocuy",
  },
  {
    ID: 2,
    Question: "Who are all ______ people?",
    DateAdded: "B",
    Topic: "nguyenquocuy",
    Deploy: "nguyenquocuy",
  },
  {
    ID: 3,
    Question: "Who are all ______ people?",
    DateAdded: "B",
    Topic: "nguyenquocuy",
    Deploy: "nguyenquocuy",
  },
  {
    ID: 4,
    Question: "Who are all ______ people?",
    DateAdded: "B",
    Topic: "nguyenquocuy",
    Deploy: "nguyenquocuy",
  },
  {
    ID: 5,
    Question: "Who are all ______ people?",
    DateAdded: "B",
    Topic: "nguyenquocuy",
    Deploy: "nguyenquocuy",
  },
  {
    ID: 6,
    Question: "Who are all ______ people?",
    DateAdded: "B",
    Topic: "nguyenquocuy",
    Deploy: "nguyenquocuy",
  },
  {
    ID: 7,
    Question: "Who are all ______ people?",
    DateAdded: "B",
    Topic: "nguyenquocuy",
    Deploy: "nguyenquocuy",
  },
  {
    ID: 8,
    Question: "Who are all ______ people?",
    DateAdded: "B",
    Topic: "nguyenquocuy",
    Deploy: "nguyenquocuy",
  },
  // More rows...
];

const Table = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 4; // Number of rows per page
  const totalPages = Math.ceil(data.length / rowsPerPage);

  // const openEditModal = () => {
  //   console.log("Open edit modal");
  // };

  // const openDeleteModal = () => {
  //   console.log("Open delete modal");
  // };

  // Calculate the current rows to display based on the current page
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = data.slice(indexOfFirstRow, indexOfLastRow);

  return (
    <div className="overflow-x-auto shadow-md sm:rounded-lg bg-white mt-4 p-8">
      <table className="w-full text-center rtl:text-right">
        <thead className="text-[14px] font-bold text-[#A0AEC0] bg-white">
          <tr>
            {columns.map((col) => (
              <th key={col.name} scope="col" className="px-6 py-3">
                {col.label}
              </th>
            ))}
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="text-[#6B7280] text-[14px]">
          {currentRows.map((row, index) => (
            <tr
              key={index}
              className="bg-white border-b border-[#F0F3F7] hover:bg-gray-50 transition-all duration-200"
            >
              {columns.map((col, i) => (
                <td key={i} className="px-6 py-3 text-black text-[12px]">
                  {row[col.name]}
                </td>
              ))}
              <td className="flex justify-center items-center px-6 py-4 space-x-2">
                <div className="flex border border-[#EEEEEE] rounded">
                  <Link
                    to="/edit-question"
                    // onClick={openEditModal}
                    className="font-medium cursor-pointer text-[#282F5A] p-2 rounded-full hover:bg-[#282F5A1F] transition-all duration-300"
                  >
                    <GrEdit size={20} className="text-[#ff9a69]" />
                  </Link>
                  <button
                    // onClick={openDeleteModal}
                    className="font-medium cursor-pointer text-red-600 p-2 rounded-full hover:bg-red-100 transition-all duration-300"
                  >
                    <RiDeleteBin6Line size={20} className="text-[#ff022f]" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-end">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onNextPage={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          onPrevPage={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          onPageChange={(page) => setCurrentPage(page)}
          hasNext={currentPage < totalPages}
          hasPrev={currentPage > 1}
        />
      </div>
    </div>
  );
};

export default Table;
