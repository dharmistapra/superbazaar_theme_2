import * as Yup from "yup";

export const loginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

export const signupSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .email("Invalid email")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
  mobile_number: Yup.string()
    .matches(/^[0-9]{10}$/, "Mobile number must be 10 digits")
    .required("Mobile number is required"),
});

export const forgetSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
});

export const otpSchema = Yup.object().shape({
  otp: Yup.string()
    .length(6, "OTP must be 6 digits")
    .required("OTP is required"),
});
export const ResetPasswordschema = Yup.object({
    password: Yup.string().min(6, "Password must be at least 6 characters").required("Required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Required"),
  });

  export const profileschema=Yup.object().shape({
  name: Yup.string().min(3, "Full Name must be at least 3 characters").required("Full Name is required"),
  mobile: Yup.string()
    .matches(/^[0-9]{10}$/, "Enter a valid 10-digit mobile number")
    .required("Mobile number is required"),
  email: Yup.string().email("Enter a valid email address").required("Email is required"),
});

export const addressschema=Yup.object({
    fullName: Yup.string().required("Full name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    mobile: Yup.string().required("Mobile number is required"),
    country: Yup.string().required("Country is required"),
    state: Yup.string().required("State is required"),
    city: Yup.string().required("City is required"),
    zipCode: Yup.string().required("Zip code is required"),
    address1: Yup.string().required("Address is required"),
  });