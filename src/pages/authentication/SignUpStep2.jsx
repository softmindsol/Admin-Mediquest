import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { RegisterTwoSchema } from "../../schema/auth.schema"; // Import the validation schema
import Button from "../../components/Button";
import { Link } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { FiChevronLeft } from "react-icons/fi";

// Updated input fields with city as a select input
const inputFields = [
  {
    name: "year",
    type: "tel",
    placeholder: "Enter your Year",
    label: "Year ",
  },
  {
    name: "city",
    type: "select",
    label: "City",
  },
  {
    name: "university",
    type: "email",
    placeholder: "Enter your University",
    label: "University",
  },
  {
    name: "phoneNumber",
    type: "tel",
    placeholder: "Enter your number",
    label: "Phone Number",
  },
];

const cities = ["Rabat", "Casablanca", "Tanger", "Marrakech", "Agadir"];

const SignUpStep2 = () => {
  return (
    <>
      <Header />
      <div className="flex items-center max-w-full mb-10 justify-evenly mt-15">
        <Link to="/sign-up" className="flex items-center justify-center ">
          <Button
            text="Prev"
            type="button"
            iconPosition="left"
            className="bg-white border border-[#E9ECEF] text-secondary rounded-[4px] py-2 px-8 hover:bg-gray-100 focus:outline-none"
          />
        </Link>
        <div className="flex flex-col items-center">
          <h1 className="mb-1 font-semibold text-center text-black text-title-xl2">
            Create an account
          </h1>
          <p className="text-title-sm text-[#0D6EFD] font-bold text-center">
            2/2
          </p>
        </div>
        <div className="w-[72px]"></div>
      </div>

      <div className="w-[360px] m-auto ">
        <div className="max-w-full mb-60 pb-22">
          <Formik
            initialValues={{
              year: "",
              city: "",
              university: "",
              phoneNumber: "",
            }}
            validationSchema={RegisterTwoSchema}
            onSubmit={(values) => {
              console.log("Form Submitted Values:", values); // Log form values here
            }}
          >
            {() => (
              <Form className="space-y-6">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-1 ">
                  {inputFields?.map((field) => (
                    <div key={field.name}>
                      <label
                        htmlFor={field.name}
                        className="block font-normal text-title-p text-black-3"
                      >
                        {field.label}
                      </label>
                      {field.type === "select" ? (
                        <Field
                          as="select"
                          id={field.name}
                          name={field.name}
                          className="mt-3 p-3 text-secondary text-title-p bg-white focus:outline-none rounded-[4px] w-full border border-[#CED4DA] placeholder-secondary"
                        >
                          <option value="" label="Select your city" />
                          {cities.map((city) => (
                            <option key={city} value={city} label={city} />
                          ))}
                        </Field>
                      ) : (
                        <Field
                          id={field.name}
                          name={field.name}
                          type={field.type}
                          placeholder={field.placeholder}
                          className="mt-3 p-3 text-secondary text-title-p focus:outline-none rounded-[4px] w-full border border-[#CED4DA] placeholder-secondary"
                        />
                      )}
                      <ErrorMessage
                        name={field.name}
                        component="div"
                        className="mt-1 text-sm text-red-500"
                      />
                    </div>
                  ))}
                </div>

                <Link
                  to="/sign-up2"
                  className="flex justify-center w-full pt-9"
                >
                  <Button
                    text="Continue"
                    type="submit" // Ensure the button type is submit
                    className="bg-[#0D6EFD] text-title-p rounded-[4px] border text-white font-normal py-2 focus:outline-none w-full"
                  />
                </Link>
              </Form>
            )}
          </Formik>
          <p className="mt-8 font-normal text-center text-title-p text-secondary">
            Already have an account?
            <Link to="/log-in" className="text-[#0D6EFD] underline">
              Log in
            </Link>
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SignUpStep2;
