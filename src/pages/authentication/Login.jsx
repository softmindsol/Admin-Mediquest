import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { LoginSchema } from "../../schema/auth.schema"; // Import the validation schema
import Button from "../../components/Button";
import { Link, useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useDispatch } from "react-redux";
import { loginUser } from "../../store/features/auth/auth.service";

const inputFields = [
  {
    name: "email",
    type: "email",
    placeholder: "Enter your email",
    label: "Email",
  },
  {
    name: "password",
    type: "password",
    placeholder: "Enter your password",
    label: "Password",
  },
];

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <>
      <Header />
      <div className="w-[360px] m-auto ">
        <div className="max-w-full mt-30 mb-60 pb-22">
          <h1 className="mb-5 font-semibold text-center text-title-xl2 text-black-3">
            Log in to your account
          </h1>
          <p className="mb-6 text-center text-title-p text-secondary">
            Welcome back! Please enter your details.
          </p>

          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            validationSchema={LoginSchema}
            onSubmit={async (values, { setSubmitting, resetForm }) => {
              console.log("Form Submitted Values:", values);
              setSubmitting(true);

              try {
                const response = await dispatch(loginUser(values));

                console.log(response);

                if (response.type === "loginUser/fulfilled") {
                  navigate("/");
                  resetForm();
                }
              } catch (error) {
                console.log(error);
              } finally {
                setSubmitting(false);
              }
            }}
          >
            {({ isSubmitting }) => (
              <Form className="space-y-6">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-1 ">
                  {inputFields?.map((field) => (
                    <div key={field.name}>
                      <label
                        htmlFor={field.name}
                        className="block font-normal text-title-p text-black-3"
                      >
                        {field?.label}
                      </label>
                      <Field
                        id={field.name}
                        name={field.name}
                        type={field.type}
                        placeholder={field.placeholder}
                        className="mt-3 p-3  text-secondary text-title-p focus:outline-none rounded-[4px] w-full border border-[#CED4DA] placeholder-secondary"
                      />
                      <ErrorMessage
                        name={field.name}
                        component="div"
                        className="mt-1 text-sm text-red-500"
                      />
                    </div>
                  ))}
                </div>

                <div className="flex justify-center w-full pt-9">
                  <Button
                    disabled={isSubmitting}
                    text="Sign in"
                    type="submit"
                    className="bg-[#0D6EFD] text-title-p rounded-[4px] border text-white font-normal py-2  focus:outline-none w-full"
                  />
                </div>
              </Form>
            )}
          </Formik>
          <p className="mt-8 font-normal text-center text-title-p text-secondary">
            Don’t have an account?
            <Link to="/sign-up" className="text-[#0D6EFD] underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
