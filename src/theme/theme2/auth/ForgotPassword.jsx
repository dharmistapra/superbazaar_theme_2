"use client";

import { forgetSchema } from "@/schema/schema";
import { createClientAxios } from "@/services/apiClient";
import { useFormik } from "formik";
import { ArrowUpRight, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Breadcrum from "../components/BreadCrums/Breadcrum";
import Link from "next/link";

export default function ForgotPassword() {
    const [errors, setErrors] = useState(null);
    const router = useRouter();
    const initialValues = { email: "" };

    const formik = useFormik({
        initialValues,
        validationSchema: forgetSchema,
        onSubmit: async (values) => {
            try {
                const axiosInstance = createClientAxios();
                const response = await axiosInstance.post("auth/otp", values);

                if (response.data.status == 200) {
                    localStorage.setItem("otpsecrets", response?.data?.secret);
                    localStorage.setItem("email", values.email);

                    // ✅ navigate to OTP page
                    router.push("/otp");
                }
            } catch (error) {
                setErrors(error.response?.data?.message || "Something went wrong");
                return error;
            }
        },
    });

    return (
        <>
            <Breadcrum name="Forgot password" />
            <div className="flex items-center justify-center  p-6">
                <div className="relative bg-white rounded border w-full max-w-md mt-7 mb-36 p-8">
                    <h2 className="text-2xl font-normal mb-6 text-left text-gray-800">
                        Forgot Password
                    </h2>

                    <form className="space-y-6" onSubmit={formik.handleSubmit}>
                        {/* Email Input */}
                        <div className="relative">
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder=" "
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className={`w-full border border-gray-300 rounded-lg px-4 py-2 placeholder:text-sm focus:outline-none focus:border-zinc-500 text-gray-700 ${formik.touched.email && formik.errors.email ? "border-red-500 focus:ring-red-400" : "border-gray-300 ocus:ring-gray-500"
                                    }`}
                            // className="w-full border border-gray-400 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:ring-gray-400 placeholder:text-sm"
                            />

                            {formik.touched.email && formik.errors.email && (
                                <p className="text-xs text-red-500 mt-1">
                                    {formik.errors.email}
                                </p>
                            )}
                        </div>


                        <p className="text-sm text-gray-600 text-center sm:text-left cursor-pointer">
                            <Link
                                href="/login"
                                className="text-blue-600 font-medium hover:underline flex items-center justify-center gap-1"
                            >
                                Back To Login <ArrowUpRight size={14} />
                            </Link>
                        </p>

                        <button
                            type="submit"
                            disabled={formik.isSubmitting}
                            className={`w-full flex items-center justify-center gap-2 py-2 rounded-sm transition-colors duration-200 ${formik.isSubmitting ? "bg-gray-400 cursor-not-allowed text-white" : "bg-zinc-950 text-white hover:bg-zinc-700"}`}
                        >
                            {formik.isSubmitting ? (
                                <>
                                    <Loader2 className="animate-spin" />
                                    <span>Processing...</span>
                                </>
                            ) : (
                                "Send OTP"
                            )}
                        </button>

                        {errors && (
                            <p className="text-red-400 text-sm text-center">{errors}</p>
                        )}
                    </form>
                </div>
            </div >
        </>
    );
}
