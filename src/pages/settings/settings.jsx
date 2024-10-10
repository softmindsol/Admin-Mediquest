import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import DefaultLayout from "../../layouts/DefaultLayout";
import { NewRegisterSchema } from "../../schema/auth.schema";
import { changePassword, logout } from "../../store/features/auth/auth.service";

const inputFields = [
  {
    name: "oldPassword",
    type: "password",
    label: "Old Password:",
  },
  {
    name: "newPassword",
    type: "password",
    label: "New Password:",
  },
  {
    name: "confirmPassword",
    type: "password",
    label: "Confirm new password:",
  },
];

const Settings = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = async () => {
    const res = await dispatch(logout());
    console.log("🚀 ~ handleLogout ~ res:", res);

    if (res.type === "logout/fulfilled") {
      navigate("/log-in");
    }
  };
  return (
    <DefaultLayout>
      <>
        <div className="flex items-center justify-between mt-19">
          <div className="font-bold text-title-md text-black-2">Setting</div>
          <div className="">
            <Button
              onClick={handleLogout}
              text="Logout"
              type="submit"
              className="text-[#DC3545] bg-white font-semibold text-title-p rounded-[4px] px-5 py-1 border border-[#DC3545]    focus:outline-none "
            />
          </div>
        </div>
        <div className=" bg-white rounded-lg border border-[#E6E9EC] mt-12">
          <h2 className="text-title-p bg-[#F8F8F8] text-primary font-semibold  border-b border-[#E9ECEF] p-3 ">
            Change your password
          </h2>
          <Formik
            initialValues={{
              oldPassword: "",
              newPassword: "",
              confirmPassword: "",
            }}
            validationSchema={NewRegisterSchema}
            onSubmit={async (values, { resetForm }) => {
              try {
                const res = await dispatch(changePassword(values));

                if (res.type === "changePassword/fulfilled") {
                  resetForm();
                }
              } catch (error) {
                console.log(error);
              }
            }}
          >
            {() => (
              <Form className="p-3 space-y-5">
                <div className="grid grid-cols-1 gap-3 md:grid-cols-1">
                  {inputFields?.map((field) => (
                    <div key={field.name}>
                      <label
                        htmlFor={field.name}
                        className="text-[14px] block font-semibold text-black-3"
                      >
                        {field?.label}
                      </label>
                      <Field
                        id={field.name}
                        name={field.name}
                        type={field.type}
                        placeholder={field.placeholder}
                        className="mt-3 py-1 px-3  text-secondary text-[14px] font-bold focus:outline-none rounded-[4px] w-full border border-[#E9ECEF] placeholder-secondary"
                      />
                      <ErrorMessage
                        name={field.name}
                        component="div"
                        className="mt-1 text-sm text-red-500"
                      />
                    </div>
                  ))}
                </div>
                <p className="text-sm font-medium text-secondary">
                  password should be at least 8 long and contain at least 1
                  lowercase, 1 uppercase and 1 number
                </p>

                <Button
                  text="Save change to password"
                  type="submit"
                  className="text-[#0D6EFD] font-semibold text-title-p rounded-[4px] px-3 py-1 border border-[#0D6EFD]    focus:outline-none "
                />
              </Form>
            )}
          </Formik>
        </div>

        <div className="mt-6 bg-white rounded-lg border mb-5 border-[#E6E9EC]">
          <h2 className="text-title-p bg-[#F8F8F8] text-primary font-semibold  border-b border-[#E9ECEF] p-3 ">
            Semester Setting
          </h2>
          <div className="flex justify-center p-3 px-11 py-7 ">
            <div className="flex justify-between w-1/2 "></div>
          </div>
          <div className=" border-[#E6E9EC] mx-8 mt-4 py-4 text-center text-[14px] text-black-2"></div>
        </div>
      </>
    </DefaultLayout>
  );
};

export default Settings;
