import PropTypes from "prop-types";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";

const Pagination = ({
  currentPage,
  totalPages,
  onNextPage,
  onPrevPage,
  onPageChange,
  hasNext,
  hasPrev,
}) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="p-4 sm:p-6 xl:p-7.5 flex items-center justify-center ">
      <nav>
        <ul className="flex items-center gap-3 bg-white rounded-md shadow-md">
          <li>
            <button
              onClick={onPrevPage}
              disabled={!hasPrev}
              className={`flex items-center justify-center h-10 w-10 rounded-l-md  shadow hover:bg-gray-200 hover:text-blue-600 disabled:cursor-not-allowed disabled:bg-gray-200`}
            >
              <GrFormPrevious size={24} />
            </button>
          </li>
          {pages.map((page) => (
            <li key={page}>
              <button
                onClick={() => onPageChange(page)}
                className={`flex items-center justify-center  shadow py-2 px-4 font-medium${
                  page === currentPage
                    ? " border border-[#3182CE] text-[#3182CE]"
                    : " text-black hover:bg-gray-100"
                }`}
              >
                {page}
              </button>
            </li>
          ))}
          <li>
            <button
              onClick={onNextPage}
              disabled={!hasNext}
              className={`flex items-center justify-center h-10 w-10 rounded-l-md  shadow hover:bg-gray-200 hover:text-blue-600 disabled:cursor-not-allowed disabled:bg-gray-200`}
            >
              <GrFormNext size={24} />
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onNextPage: PropTypes.func.isRequired,
  onPrevPage: PropTypes.func.isRequired,
  onPageChange: PropTypes.func.isRequired,
  hasNext: PropTypes.bool.isRequired,
  hasPrev: PropTypes.bool.isRequired,
};

export default Pagination;
