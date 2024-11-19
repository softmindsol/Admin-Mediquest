import React from "react";
import { GrEdit } from "react-icons/gr";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useModal } from "../../context/modal";
import {
  deleteQuestion,
  getAllQuestions,
} from "../../store/features/questions/question.service";
import Loader from "../Loader";
import Modal from "../Modal";
import WarningModal from "../Modal/WarningModal";
import Pagination from "../Pagination";

// Updated columns based on the screenshot design
const columns = [
  { name: "_id", label: "ID" },
  { name: "question", label: "Question" },
  { name: "createdAt", label: "Date Added" },
  { name: "topic", label: "Topic" },
  { name: "deploy", label: "Deploy" },
];

const Table = ({ setParams, params }) => {
  const dispatch = useDispatch();
  const { questions: data, isLoading } = useSelector(
    (state) => state?.questions
  );

  const { openModal, closeModal } = useModal();

  const openWarningModal = (documentId, questionId) => {
    openModal(
      <WarningModal
        onClick={async () => {
          await dispatch(deleteQuestion({ documentId, questionId }));
          closeModal();
          dispatch(getAllQuestions());
        }}
        closeModal={closeModal}
        description="This will delete the question?"
      />
    );
  };

  const pageNo = Number(params?.pageNo) || 1;
  const { questions = [], totalPage: totalPages = 0 } = data || {};

  const handlePageChange = (newPage) => {
    setParams({ ...params, pageNo: newPage });
  };

  return (
    <div className="p-8 mt-4 overflow-x-auto bg-white shadow-md sm:rounded-lg">
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
          {!isLoading ? (
            questions && questions?.length > 0 ? (
              questions?.map((row) => (
                <tr
                  key={row?._id}
                  className="bg-white border-b border-[#F0F3F7] hover:bg-gray-50 transition-all duration-200"
                >
                  <td className="px-6 py-3 text-black text-[12px]">
                    {row?._id}
                  </td>
                  <td className="px-6 py-3 text-black text-[12px]">
                    <p
                      dangerouslySetInnerHTML={{
                        __html: row?.content?.questions?.question,
                      }}
                    />
                  </td>

                  <td className="px-6 py-3 text-black text-[12px]">
                    {new Date(
                      row?.content?.questions?.createdAt
                    ).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-3 text-black text-[12px]">
                    {row?.metadata?.topic}
                  </td>
                  <td className="px-6 py-3 text-black text-[12px]">
                    {row?.content?.questions?.deploy ? "Yes" : "No"}
                  </td>
                  <td className="flex items-center justify-center px-6 py-4 space-x-2">
                    <div className="flex border border-[#EEEEEE] rounded">
                      <Link
                        to={`/edit-question/${row?.documentId}/${row?.questionId}`}
                      >
                        <button
                          // onClick={openEditModal}
                          className="font-medium cursor-pointer text-[#282F5A] p-2 rounded-full hover:bg-[#282F5A1F] transition-all duration-300"
                        >
                          <GrEdit size={20} className="text-[#ff9a69]" />
                        </button>
                      </Link>
                      <button
                        onClick={() =>
                          openWarningModal(row?.documentId, row?.questionId)
                        }
                        className="p-2 font-medium text-red-600 transition-all duration-300 rounded-full cursor-pointer hover:bg-red-100"
                      >
                        <RiDeleteBin6Line
                          size={20}
                          className="text-[#ff022f]"
                        />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length + 1} className="py-4 text-center">
                  No questions available
                </td>
              </tr>
            )
          ) : (
            <tr className="">
              <td>
                <Loader />
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="flex justify-end">
        <Pagination
          currentPage={pageNo}
          totalPages={totalPages}
          onNextPage={() => handlePageChange(pageNo + 1)}
          onPrevPage={() => handlePageChange(pageNo - 1)}
          onPageChange={handlePageChange}
          hasNext={pageNo < Number(totalPages)}
          hasPrev={pageNo > 1}
        />
      </div>

      <Modal />
    </div>
  );
};

export default Table;
