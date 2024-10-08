import { useState } from "react";
import { useDispatch } from "react-redux";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Notification from "../../components/Notification";
import { checkMail, resendMail } from "../../store/features/auth/auth.service";
import { useNavigate } from "react-router-dom";

const EmailVerification = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isEmailSent, setIsEmailSent] = useState(true);
  const [notification, setNotification] = useState(null);
  const userId = localStorage.getItem("userId");

  const handleResendEmail = async () => {
    const response = await dispatch(resendMail(userId));
    if (response.type === "resendMail/fulfilled") {
      setNotification({ title: response.payload.message, type: "success" });
    } else {
      setNotification({
        title:
          response.payload?.response?.data?.error || "Failed to resend email.",
        type: "error",
      });
    }
  };

  const handleConfirmEmail = async () => {
    const response = await dispatch(checkMail(userId));

    console.log(response);

    if (response.type === "checkMail/fulfilled") {
      navigate("/log-in");
    } else {
      setNotification({
        title:
          response.payload?.response?.data?.error || "Failed to confirm email.",
        type: "error",
      });
    }
  };

  // Determine the notification color based on the type
  const getNotificationColor = (type) => {
    switch (type) {
      case "success":
        return "bg-green-200 border-green-400"; // Example success color
      case "error":
        return "bg-red-200 border-red-400"; // Red color for errors
      default:
        return "bg-[#CFF4FC] border-[#6EDFF6]"; // Default color
    }
  };

  return (
    <>
      <Header />
      <div className="flex flex-col items-center justify-center">
        {isEmailSent && notification && (
          <Notification
            title={notification.title}
            color={getNotificationColor(notification.type)}
            onClick={() => setNotification(null)}
          />
        )}

        <div className="w-full max-w-2xl mt-8 bg-white border border-[#CED4DA] rounded-xl">
          <div className="flex justify-between items-center border-b border-[#CED4DA] p-4">
            <h2 className="font-semibold text-black text-title-p">
              Email Confirmation
            </h2>
            <button
              className="text-gray-500 text-[20px] hover:text-gray-800 focus:outline-none"
              onClick={() => console.log("Close modal")}
            >
              &times;
            </button>
          </div>

          <p className="text-secondary text-title-p border-b border-[#CED4DA] p-4">
            Please confirm your email to continue using our services. If you
            haven't received an email, you can resend it.
          </p>

          <div className="flex items-center justify-end gap-5 p-4">
            <button
              onClick={handleResendEmail}
              className="px-4 py-2 bg-[#808080] font-semibold text-title-p text-white rounded-md"
            >
              Resend Email
            </button>

            <button
              onClick={handleConfirmEmail}
              className="px-4 py-2 bg-[#007AFF] font-semibold text-title-p text-white rounded-md"
            >
              I Confirmed My Email
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default EmailVerification;
