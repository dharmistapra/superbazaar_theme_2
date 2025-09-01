"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import Link from "next/link";

// Validation schema
const signupSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Confirm your password"),
    mobile_number: Yup.string().required("Mobile number is required"),
});

export default function Signup() {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [errors, setErrors] = useState(null);

    const handleSignup = async (values, { setSubmitting }) => {
        setErrors(null);
        try {
            const res = await fetch("/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(values),
            });
            const data = await res.json();

            if (res.ok && data.token) {
                localStorage.setItem("kekeeUserToken", data.token);
                localStorage.setItem("payload", JSON.stringify(data.payload));
                // toast.success(data.message || "Account created successfully!");
                router.push("/login");
            } else {
                setErrors(data.message || "Signup failed");
            }
        } catch (err) {
            console.error(err);
            setErrors("Something went wrong!");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 py-10 px-4">
            <div className="bg-white w-full max-w-md p-8 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>

                <Formik
                    initialValues={{
                        name: "",
                        email: "",
                        password: "",
                        confirmPassword: "",
                        mobile_number: "",
                    }}
                    validationSchema={signupSchema}
                    onSubmit={handleSignup}
                >
                    {({ isSubmitting }) => (
                        <Form className="space-y-4">
                            {/* Name */}
                            <div className="relative">
                                <Field
                                    name="name"
                                    placeholder="Name"
                                    className="peer w-full border border-gray-300 rounded-lg px-3 pt-4 pb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <ErrorMessage name="name" component="span" className="text-red-500 text-xs mt-1 block" />
                            </div>

                            {/* Email */}
                            <div className="relative">
                                <Field
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    className="peer w-full border border-gray-300 rounded-lg px-3 pt-4 pb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <ErrorMessage name="email" component="span" className="text-red-500 text-xs mt-1 block" />
                            </div>

                            {/* Password */}
                            <div className="relative">
                                <Field
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    placeholder="Password"
                                    className="peer w-full border border-gray-300 rounded-lg px-3 pt-4 pb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                                <ErrorMessage name="password" component="span" className="text-red-500 text-xs mt-1 block" />
                            </div>

                            {/* Confirm Password */}
                            <div className="relative">
                                <Field
                                    type={showConfirmPassword ? "text" : "password"}
                                    name="confirmPassword"
                                    placeholder="Confirm Password"
                                    className="peer w-full border border-gray-300 rounded-lg px-3 pt-4 pb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                >
                                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                                <ErrorMessage name="confirmPassword" component="span" className="text-red-500 text-xs mt-1 block" />
                            </div>

                            {/* Mobile Number */}
                            <div className="relative">
                                <Field
                                    type="text"
                                    name="mobile_number"
                                    placeholder="Mobile Number"
                                    className="peer w-full border border-gray-300 rounded-lg px-3 pt-4 pb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <ErrorMessage name="mobile_number" component="span" className="text-red-500 text-xs mt-1 block" />
                            </div>

                            {/* Submit */}
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className={`w-full flex items-center justify-center gap-2 py-2 rounded-lg transition
                  ${isSubmitting ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 text-white"}`}
                            >
                                {isSubmitting ? <Loader2 className="animate-spin" /> : "Sign Up"}
                            </button>

                            {errors && <p className="text-red-500 text-sm text-center">{errors}</p>}

                            <p className="text-sm text-center mt-2">
                                Already have an account?{" "}
                                <Link href="/login" className="text-blue-600 hover:underline">
                                    Login
                                </Link>
                            </p>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
}
