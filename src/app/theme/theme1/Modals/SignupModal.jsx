"use client";

import { useState, useEffect } from "react";
import { useModal } from "@/app/hooks/useModal";
import { useFormik } from "formik";
import { signupSchema } from "@/app/schema/schema";
import { Eye, EyeOff } from "lucide-react";

export default function SignupModal() {
  const { modal, close, open } = useModal();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const initialValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    mobile_number: "",
  };

  const formik = useFormik({
    initialValues,
    validationSchema: signupSchema,
    onSubmit: (values) => {
      console.log("SignUp values:", values);
    },
  });

  useEffect(() => {
    if (!modal.signup) {
      formik.resetForm();
      setShowPassword(false);
      setShowConfirmPassword(false);
    }
  }, [modal.signup]);

  if (!modal.signup) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="absolute inset-0 bg-black/50"
        style={{ cursor: "url('/cursor-x.svg') 12 12, auto" }}
        onClick={() => close("signup")}
      ></div>

      <div className="relative bg-white rounded-md shadow-lg w-full max-w-lg p-8 z-10">
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-black"
          onClick={() => close("signup")}
        >
          ✕
        </button>

        <h2 className="text-2xl font-normal mb-6 text-left">Sign Up</h2>

        <form className="space-y-6" onSubmit={formik.handleSubmit}>
          <div className="relative">
            <input
              type="text"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder=""
              className="peer w-full border border-gray-300 rounded-lg px-3 pt-4 pb-2 text-sm focus:outline-none focus:border-zinc-500"
            />
            <label
              htmlFor="name"
              className="absolute left-3 text-gray-400 text-sm transition-all
                         peer-placeholder-shown:top-4
                         peer-placeholder-shown:text-gray-400
                         peer-placeholder-shown:text-sm
                         peer-focus:top-0
                         peer-focus:text-zinc-500
                         peer-focus:text-xs
                         bg-white px-1"
            >
              Name
            </label>
            {formik.touched.name && formik.errors.name && (
              <p className="text-xs text-red-500 mt-1">{formik.errors.name}</p>
            )}
          </div>
          <div className="relative">
            <input
              type="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder=""
              className="peer w-full border border-gray-300 rounded-lg px-3 pt-4 pb-2 text-sm focus:outline-none focus:border-zinc-500"
            />
            <label
              htmlFor="email"
              className="absolute left-3 text-gray-400 text-sm transition-all
                         peer-placeholder-shown:top-4
                         peer-placeholder-shown:text-gray-400
                         peer-placeholder-shown:text-sm
                         peer-focus:top-0
                         peer-focus:text-zinc-500
                         peer-focus:text-xs
                         bg-white px-1"
            >
              Email
            </label>
            {formik.touched.email && formik.errors.email && (
              <p className="text-xs text-red-500 mt-1">{formik.errors.email}</p>
            )}
          </div>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder=""
              className="peer w-full border border-gray-300 rounded-lg px-3 pt-4 pb-2 text-sm focus:outline-none focus:border-zinc-500"
            />
            <label
              htmlFor="password"
              className="absolute left-3 text-gray-400 text-sm transition-all
                         peer-placeholder-shown:top-4
                         peer-placeholder-shown:text-gray-400
                         peer-placeholder-shown:text-sm
                         peer-focus:top-0
                         peer-focus:text-zinc-500
                         peer-focus:text-xs
                         bg-white px-1"
            >
              Password
            </label>
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
            {formik.touched.password && formik.errors.password && (
              <p className="text-xs text-red-500 mt-1">{formik.errors.password}</p>
            )}
          </div>
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder=""
              className="peer w-full border border-gray-300 rounded-lg px-3 pt-4 pb-2 text-sm focus:outline-none focus:border-zinc-500"
            />
            <label
              htmlFor="confirmPassword"
              className="absolute left-3 text-gray-400 text-sm transition-all
                         peer-placeholder-shown:top-4
                         peer-placeholder-shown:text-gray-400
                         peer-placeholder-shown:text-sm
                         peer-focus:top-0
                         peer-focus:text-zinc-500
                         peer-focus:text-xs
                         bg-white px-1"
            >
              Confirm Password
            </label>
            <button
              type="button"
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
            {formik.touched.confirmPassword && formik.errors.confirmPassword && (
              <p className="text-xs text-red-500 mt-1">{formik.errors.confirmPassword}</p>
            )}
          </div>
          <div className="relative">
            <input
              type="text"
              name="mobile_number"
              value={formik.values.mobile_number}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder=""
              className="peer w-full border border-gray-300 rounded-lg px-3 pt-4 pb-2 text-sm focus:outline-none focus:border-zinc-500"
            />
            <label
              htmlFor="mobile_number"
              className="absolute left-3 text-gray-400 text-sm transition-all
                         peer-placeholder-shown:top-4
                         peer-placeholder-shown:text-gray-400
                         peer-placeholder-shown:text-sm
                         peer-focus:top-0
                         peer-focus:text-zinc-500
                         peer-focus:text-xs
                         bg-white px-1"
            >
              Mobile Number
            </label>
            {formik.touched.mobile_number && formik.errors.mobile_number && (
              <p className="text-xs text-red-500 mt-1">{formik.errors.mobile_number}</p>
            )}
          </div>

          <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <button
              type="submit"
              className="w-full sm:w-auto flex-1 bg-zinc-950 text-white py-2 rounded-sm hover:bg-zinc-700 transition-colors duration-200"
            >
              Sign Up
            </button>

            <p className="text-sm text-gray-600 text-center sm:text-left">
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => {
                  close("signup");
                  open("login");
                }}
                className="text-blue-600 font-medium hover:underline"
              >
                Login
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
