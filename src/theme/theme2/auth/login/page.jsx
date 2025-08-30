"use client";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup"; // if you already have schema file, import from there
import Head from "next/head";
import Link from "next/link";

// Example schema (replace with your `loginSchema`)
const loginSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
});

export default function Login() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [resErrors, setResErrors] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async (values) => {
        setLoading(true);
        setResErrors("");
        try {
            // replace this with your API call
            const response = await fakeLoginApi(values);

            localStorage.setItem("kekeeUserToken", response.token);
            localStorage.setItem("payload", JSON.stringify(response.payload));

            const from = searchParams.get("from");
            if (!from || from === "/") {
                router.push("/");
            } else {
                router.replace(from);
            }
        } catch (error) {
            setResErrors(error.message || "An error occurred");
        } finally {
            setLoading(false);
        }
    };

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
                <div className="container mx-auto px-4 py-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Left Side - Login Form */}
                        <div className="bg-white shadow rounded-2xl p-6">
                            <Formik
                                initialValues={{ email: "", password: "" }}
                                validationSchema={loginSchema}
                                onSubmit={handleLogin}
                            >
                                {({ isSubmitting }) => (
                                    <Form className="space-y-5">
                                        <h2 className="text-2xl font-bold text-gray-800">Login</h2>
                                        <p className="text-gray-500">
                                            If you have an account with us, please log in.
                                        </p>

                                        {/* Email */}
                                        <div>
                                            <Field
                                                type="email"
                                                name="email"
                                                placeholder="Your Email Address"
                                                className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                            <ErrorMessage
                                                name="email"
                                                component="span"
                                                className="text-red-500 text-sm"
                                            />
                                        </div>

                                        {/* Password */}
                                        <div>
                                            <Field
                                                type="password"
                                                name="password"
                                                placeholder="Your Password"
                                                className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                            <ErrorMessage
                                                name="password"
                                                component="span"
                                                className="text-red-500 text-sm"
                                            />
                                        </div>

                                        {/* Submit */}
                                        <button
                                            type="submit"
                                            disabled={loading || isSubmitting}
                                            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-70"
                                        >
                                            {loading ? (
                                                <span className="flex items-center justify-center">
                                                    <svg
                                                        className="animate-spin h-5 w-5 mr-2 text-white"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <circle
                                                            className="opacity-25"
                                                            cx="12"
                                                            cy="12"
                                                            r="10"
                                                            stroke="currentColor"
                                                            strokeWidth="4"
                                                        ></circle>
                                                        <path
                                                            className="opacity-75"
                                                            fill="currentColor"
                                                            d="M4 12a8 8 0 018-8v8H4z"
                                                        ></path>
                                                    </svg>
                                                    Waiting...
                                                </span>
                                            ) : (
                                                "Sign In"
                                            )}
                                        </button>

                                        {/* Error Message */}
                                        {resErrors && (
                                            <p className="text-red-600 text-sm text-center">
                                                {resErrors}
                                            </p>
                                        )}

                                        <Link
                                            href="/forgot-password"
                                            className="text-blue-600 hover:underline text-sm block text-center"
                                        >
                                            Forgot your password?
                                        </Link>
                                    </Form>
                                )}
                            </Formik>
                        </div>

                        {/* Right Side - Register Info */}
                        <div className="bg-gray-50 rounded-2xl p-6">
                            <h2 className="text-2xl font-bold mb-3">New Customer?</h2>
                            <p className="text-gray-600 mb-4">
                                Registering for this site allows you to access your order status
                                and history. We’ll get a new account set up for you in no time.
                            </p>
                            <Link
                                href="/signup"
                                className="inline-block bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
                            >
                                Create an account
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
