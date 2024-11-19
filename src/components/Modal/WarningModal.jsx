import { useSelector } from "react-redux";
import { CloseSvg, WarningSvg } from "../../assets/images/svg";
import Button from "../Button";
import Loader from "../Loader";

const WarningModal = ({
  closeModal,
  title = "Are you Sure?",
  description,
  successText = "Yes, delete it",
  onClick,
}) => {
  const { isLoading = false } = useSelector((state) => state?.questions || {});

  return (
    <div className=" z-999999">
      <div className="flex justify-end px-3 pt-4">
        <CloseSvg
          className="text-gray-500 hover:text-black me-2.5"
          onClick={closeModal}
        />
      </div>
      <div className="flex px-3 font-medium pb-7 gap-x-3">
        <div>
          <WarningSvg className="text-custom_primary" />
        </div>
        <div className="flex flex-col gap-y-1">
          <h1 className="text-[15.2px] font-semibold text-custom_black_100">
            {title}
          </h1>
          <p className="text-sm text-[#6B7280] ">{description}</p>
        </div>
      </div>

      <div className="flex justify-end px-4 py-4 rounded-md gap-x-3 bg-custom_grey_300">
        <Button
          className="text-sm bg-transparent py-2.5 font-bold rounded-md px-3 text-[#1F2937] border"
          onClick={closeModal}
        >
          No, cancel
        </Button>

        <Button
          className="text-sm flex justify-center items-center text-[white] py-2.5 px-3 bg-red-500 rounded-md hover:bg-[#FF0000] font-bold hover:text-white"
          onClick={onClick}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <span className="">Loading...</span>
              <Loader className="w-4 h-4 border-white border-solid rounded-full animate-spin-1.5 border-t-transparent border-2" />
            </>
          ) : (
            successText
          )}
        </Button>
      </div>
    </div>
  );
};

export default WarningModal;
