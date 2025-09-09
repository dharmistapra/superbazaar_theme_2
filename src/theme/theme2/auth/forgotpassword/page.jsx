"use client";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup"; // if you already have schema file, import from there
import Head from "next/head";
import Link from "next/link";
import { signIn } from "next-auth/react";
import Breadcrum from "../../components/BreadCrums/Breadcrum";

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


    const handleLogin = async (values, { setSubmitting, setErrors }) => {
        try {
            setResErrors("");
            const res = await signIn("credentials", {
                redirect: false,      // prevent automatic redirect
                email: values.email,
                password: values.password,
            });

            if (res?.error) {
                setResErrors("Invalid email or password");
            } else {
                const session = await fetch("/api/auth/session").then(r => r.json());
                if (session?.accessToken) {
                    localStorage.setItem("token", session.accessToken);
                }

                const from = searchParams.get("from");
                if (!from || from === "/") router.push("/");
                else router.replace(from);
            }
        } catch (err) {
            console.error(err);
            setResErrors("Something went wrong. Please try again.");
        } finally {
            setSubmitting(false);
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
                <Breadcrum name="Forgot Password" />
                {/* <div className="bg-gray-100 py-3">
                    <div className="container mx-auto px-4">
                        <div className="flex items-center space-x-2 text-sm">
                            <Link href="/" className="text-blue-600 hover:underline">
                                Home
                            </Link>
                            <span>|</span>
                            <span className="font-semibold">Login</span>
                        </div>
                    </div>
                </div> */}

                {/* Login Section */}
                <div className="container mx-auto ">
                    <div className="h-[450px] flex items-center justify-center ">
                        {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-3/4 "> */}
                        {/* Left Side - Login Form */}
                        <div className="bg-white shadow border border-gray-300 p-6">
                            <Formik
                                initialValues={{ email: "", password: "" }}
                                validationSchema={loginSchema}
                                onSubmit={handleLogin}
                            >
                                {({ isSubmitting }) => (
                                    <Form className="space-y-5">
                                        <h3 className="text-xl uppercase text-gray-800">Login</h3>
                                        <p className="text-sm text-gray-500">
                                            If you have an account with us, please log in.
                                        </p>

                                        {/* Email */}
                                        <div>
                                            <Field
                                                type="email"
                                                name="email"
                                                placeholder="Your Email Address"
                                                className="w-full border border-gray-400 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:ring-gray-500 placeholder:text-sm"
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
                                                className="w-full border border-gray-400 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:ring-gray-500 placeholder:text-sm"
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
                                            className="w-full bg-black text-white py-2 rounded-lg hover:bg-red-700 transition disabled:opacity-70"
                                        >
                                            {loading ? "Waiting..." : "Sign In"}
                                        </button>

                                        {/* Error */}
                                        {resErrors && (
                                            <p className="text-red-600 text-sm text-center">{resErrors}</p>
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
                    </div>
                </div>
            </div >
        </>
    );
}
