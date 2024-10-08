import * as Yup from "yup";

export const RegisterSchema = Yup.object().shape({
  name: Yup.string()
    .required("Name is required")
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be at most 50 characters"),

  email: Yup.string().required("Email is required").email("Invalid email"),

  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[a-zA-Z])(?=.*[0-9]).*$/,
      "Password must contain at least one letter and one number"
    ),

  confirmPassword: Yup.string()
    .required("Confirm password is required")
    .oneOf([Yup.ref("password")], "Passwords do not match"),

  year: Yup.string()
    .required("Year is required")
    .matches(/^S([1-9]|10)$/, "Year must be S1 to S10"), // Validate year as S1 to S10

  city: Yup.string().required("City is required"),

  university: Yup.string().required("University is required"),

  phoneNumber: Yup.string()
    .required("Phone number is required")
    .matches(/^[0-9]{10}$/, "Phone number must be exactly 10 digits"),
});

export const RegisterTwoSchema = Yup.object({
  year: Yup.string().required("year is required"),
  city: Yup.string().required("city is required"),
  university: Yup.string().required("university is required"),
  phoneNumber: Yup.string()
    .matches(/^\d+$/, "Phone Number can only contain digits")
    .required("Phone Number is required"),
});

export const NewRegisterSchema = Yup.object({
  oldPassword: Yup.string().required("Old password is required"),
  newPassword: Yup.string()
    .required("New password is required")
    .min(8, "Password must be at least 8 characters long")
    .matches(/[A-Z]/, "Password must have at least one uppercase letter")
    .matches(/[a-z]/, "Password must have at least one lowercase letter")
    .matches(/\d/, "Password must have at least one number")
    .matches(/[@$!%*?&#]/, "Password must have at least one special character"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
    .required("Confirm password is required"),
});

export const LoginSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string().required("Password is required"), // Add this line
});
