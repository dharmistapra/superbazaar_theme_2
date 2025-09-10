"use client";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Formik, Form, Field, ErrorMessage, useFormik } from "formik";
import * as Yup from "yup";
import Head from "next/head";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { Eye, EyeOff, Loader2 } from "lucide-react"; // 👈 import icons

// Example schema (replace with your `loginSchema` if you have one)
const loginSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
});

export default function Login() {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState(null);

    // ✅ Formik Hook
    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: loginSchema,
        onSubmit: async (values, { setSubmitting }) => {
            try {
                const res = await signIn("credentials", {
                    redirect: false,
                    email: values.email,
                    password: values.password,
                });

                if (res?.error) {
                    setErrors("Invalid email or password");
                } else {
                    setErrors(null);
                    router.push("/");
                }
            } catch (error) {
                setErrors("Something went wrong");
            } finally {
                setSubmitting(false);
            }
        },
    });


    return (
        <>
            <Head>
                <title>Customer Login</title>
                <meta name="description" content="Kekee Impex Customer Login" />
            </Head>

            <div className="w-full">
                {/* Breadcrumb */}
                <div className="bg-gray-100 py-3">
                    <div className="container mx-auto px-4">
                        <div className="flex items-center space-x-2 text-sm">
                            <Link href="/" className="text-blue-600 hover:underline">
                                Home
                            </Link>
                            <span>|</span>
                            <span className="font-semibold">Login</span>
                        </div>
                    </div>
                </div>

                {/* Login Section */}
                <div className="container mx-auto">
                    <div className="h-[450px] flex items-center justify-center">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-3/4">
                            {/* Left Side - Login Form */}
                            <div className="bg-white shadow border border-gray-300 p-10">
                                <h2 className="text-xl mb-3 text-gray-800">Login</h2>
                                <form onSubmit={formik.handleSubmit} className="space-y-5">
                                    {/* Email */}
                                    <div className="relative">
                                        <input
                                            type="email"
                                            name="email"
                                            placeholder="Email"
                                            {...formik.getFieldProps("email")}
                                            className={`w-full border rounded-lg px-4 py-2 placeholder:text-sm focus:outline-none focus:border-zinc-500 text-gray-700 ${formik.touched.email && formik.errors.email
                                                ? "border-red-500 focus:ring-red-400"
                                                : "border-gray-300 focus:ring-gray-500"
                                                }`}
                                        />
                                        {formik.touched.email && formik.errors.email && (
                                            <span className="text-red-500 text-xs mt-1 block">
                                                {formik.errors.email}
                                            </span>
                                        )}
                                    </div>

                                    {/* Password */}
                                    <div className="w-full">
                                        <div className="relative flex items-center">
                                            <input
                                                type={showPassword ? "text" : "password"}
                                                name="password"
                                                placeholder="Password"
                                                {...formik.getFieldProps("password")}
                                                className={`w-full border rounded-lg px-4 py-2 placeholder:text-sm focus:outline-none focus:border-zinc-500 text-gray-700 ${formik.touched.password && formik.errors.password
                                                    ? "border-red-500 focus:ring-red-400"
                                                    : "border-gray-300 focus:ring-gray-500"
                                                    }`}
                                            />

                                            {/* Eye Icon Button */}
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="absolute right-3 flex items-center justify-center h-full"
                                            >
                                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                            </button>
                                        </div>

                                        {formik.touched.password && formik.errors.password && (
                                            <span className="text-red-500 text-xs mt-1 block">
                                                {formik.errors.password}
                                            </span>
                                        )}
                                    </div>

                                    {/* Submit */}
                                    <button
                                        type="submit"
                                        disabled={formik.isSubmitting}
                                        className={`w-full flex items-center justify-center gap-2 py-2 rounded-lg transition ${formik.isSubmitting
                                            ? "bg-gray-400 cursor-not-allowed"
                                            : "bg-black hover:bg-red-700 text-white"
                                            }`}
                                    >
                                        {formik.isSubmitting ? (
                                            <Loader2 className="animate-spin" />
                                        ) : (
                                            "Login"
                                        )}
                                    </button>

                                    {errors && (
                                        <p className="text-red-500 text-sm text-center">{errors}</p>
                                    )}
                                    <Link
                                        href="/forgot-password"
                                        className="text-blue-600 hover:underline text-sm block text-center"
                                    >
                                        Forgot your password?
                                    </Link>

                                    <p className="text-sm text-center mt-2 text-gray-600">
                                        Don’t have an account?{" "}
                                        <Link href="/signup" className="text-blue-600 hover:underline">
                                            Sign Up
                                        </Link>
                                    </p>
                                </form>
                            </div>

                            {/* Right Side - Register Info */}
                            <div className="bg-gray-50 border border-gray-300 p-10">
                                <h2 className="text-xl mb-3 text-gray-800">New Customer?</h2>
                                <p className="text-gray-600 mb-4 text-sm">
                                    Registering for this site allows you to access your order
                                    status and history. We’ll get a new account set up for you in
                                    no time.
                                </p>
                                <Link
                                    href="/signup"
                                    className="inline-block bg-black text-white px-6 py-2 rounded-lg hover:bg-red-700 transition"
                                >
                                    Create an account
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
