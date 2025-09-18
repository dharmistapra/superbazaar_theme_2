"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as Yup from "yup";
import Head from "next/head";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import Breadcrum from "../components/BreadCrums/Breadcrum";

// ✅ Validation schema
const loginSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
});

export default function Login() {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState(null);

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

                const session = await fetch("/api/auth/session").then((r) => r.json());
                if (session?.accessToken) {
                    localStorage.setItem("token", session.accessToken);
                }

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
                <Breadcrum name="login" />
                <div className="h-[450px] flex items-center justify-center bg-gray-50 mb-8">
                    <div className="container mx-auto px-4">
                        <div className="grid md:grid-cols-2 gap-8 items-center max-w-4xl mx-auto">
                            <div className="bg-white shadow-lg rounded-2xl border border-gray-200 p-8">
                                <h2 className="text-2xl font-semibold mb-6 text-gray-900">
                                    Welcome Back
                                </h2>

                                <form onSubmit={formik.handleSubmit} className="space-y-6">
                                    {/* Email */}
                                    <div>
                                        <label
                                            htmlFor="email"
                                            className="block text-sm font-medium text-gray-700 mb-1"
                                        >
                                            Email Address
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            placeholder="you@example.com"
                                            {...formik.getFieldProps("email")}
                                            className={`w-full border rounded-xl px-4 py-2.5 text-sm shadow-sm focus:ring-2 focus:outline-none ${formik.touched.email && formik.errors.email
                                                ? "border-red-500 focus:ring-red-400"
                                                : "border-gray-300 focus:ring-black"
                                                }`}
                                        />
                                        {formik.touched.email && formik.errors.email && (
                                            <p className="text-red-500 text-xs mt-1">
                                                {formik.errors.email}
                                            </p>
                                        )}
                                    </div>

                                    {/* Password */}
                                    <div>
                                        <label
                                            htmlFor="password"
                                            className="block text-sm font-medium text-gray-700 mb-1"
                                        >
                                            Password
                                        </label>
                                        <div className="relative">
                                            <input
                                                type={showPassword ? "text" : "password"}
                                                id="password"
                                                placeholder="••••••••"
                                                {...formik.getFieldProps("password")}
                                                className={`w-full border rounded-xl px-4 py-2.5 text-sm shadow-sm focus:ring-2 focus:outline-none ${formik.touched.password && formik.errors.password
                                                    ? "border-red-500 focus:ring-red-400"
                                                    : "border-gray-300 focus:ring-black"
                                                    }`}
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                            >
                                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                            </button>
                                        </div>
                                        {formik.touched.password && formik.errors.password && (
                                            <p className="text-red-500 text-xs mt-1">
                                                {formik.errors.password}
                                            </p>
                                        )}
                                    </div>

                                    {/* Error Message */}
                                    {errors && (
                                        <p className="text-red-500 text-sm text-center">{errors}</p>
                                    )}

                                    {/* Submit */}
                                    <button
                                        type="submit"
                                        disabled={formik.isSubmitting}
                                        className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-white text-sm font-medium transition ${formik.isSubmitting
                                            ? "bg-gray-400 cursor-not-allowed"
                                            : "bg-black hover:bg-red-600"
                                            }`}
                                    >
                                        {formik.isSubmitting ? (
                                            <Loader2 className="animate-spin" />
                                        ) : (
                                            "Login"
                                        )}
                                    </button>

                                    {/* Links */}
                                    <div className="flex items-center justify-between text-sm">
                                        <Link
                                            href="/forgot-password"
                                            className="text-blue-600 hover:underline"
                                        >
                                            Forgot Password?
                                        </Link>

                                    </div>
                                </form>
                            </div>

                            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl border border-gray-200 p-10 shadow-inner">
                                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                                    New Here?
                                </h2>
                                <p className="text-gray-600 mb-6 text-sm leading-relaxed">
                                    Registering for this site allows you to access your order
                                    status and history. We’ll get a new account set up for you in
                                    no time.
                                </p>
                                <Link
                                    href="/signup"
                                    className="inline-block bg-black text-white px-6 py-2.5 rounded-xl hover:bg-red-600 transition text-sm font-medium"
                                >
                                    Create an Account
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}


// "use client";
// import { useState } from "react";
// import { useRouter, useSearchParams } from "next/navigation";
// import { Formik, Form, Field, ErrorMessage, useFormik } from "formik";
// import * as Yup from "yup";
// import Head from "next/head";
// import Link from "next/link";
// import { signIn } from "next-auth/react";
// import { Eye, EyeOff, Loader2 } from "lucide-react"; // 👈 import icons
// import Breadcrum from "../components/BreadCrums/Breadcrum";

// // Example schema (replace with your `loginSchema` if you have one)
// const loginSchema = Yup.object().shape({
//     email: Yup.string().email("Invalid email").required("Email is required"),
//     password: Yup.string().required("Password is required"),
// });

// export default function Login() {
//     const router = useRouter();
//     const [showPassword, setShowPassword] = useState(false);
//     const [errors, setErrors] = useState(null);

//     // ✅ Formik Hook
//     const formik = useFormik({
//         initialValues: {
//             email: "",
//             password: "",
//         },
//         validationSchema: loginSchema,
//         onSubmit: async (values, { setSubmitting }) => {
//             try {
//                 const res = await signIn("credentials", {
//                     redirect: false,
//                     email: values.email,
//                     password: values.password,
//                 });
//                 const session = await fetch("/api/auth/session").then(r => r.json());
//                 if (session?.accessToken) {
//                     localStorage.setItem("token", session.accessToken);
//                 }
//                 if (res?.error) {
//                     setErrors("Invalid email or password");
//                 } else {
//                     setErrors(null);
//                     router.push("/");
//                 }
//             } catch (error) {
//                 setErrors("Something went wrong");
//             } finally {
//                 setSubmitting(false);
//             }
//         },
//     });


//     return (
//         <>
//             <Head>
//                 <title>Customer Login</title>
//                 <meta name="description" content="Kekee Impex Customer Login" />
//             </Head>

//             <div className="w-full">
//                 {/* Breadcrumb */}
//                 <Breadcrum name="login" />

//                 {/* Login Section */}
//                 <div className="container mx-auto">
//                     <div className="h-[450px] flex items-center justify-center">
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-3/4">
//                             {/* Left Side - Login Form */}
//                             <div className="bg-white shadow border border-gray-300 p-10">
//                                 <h2 className="text-xl mb-3 text-gray-800">Login</h2>
//                                 <form onSubmit={formik.handleSubmit} className="space-y-5">
//                                     {/* Email */}
//                                     <div className="relative">
//                                         <input
//                                             type="email"
//                                             name="email"
//                                             placeholder="Email"
//                                             {...formik.getFieldProps("email")}
//                                             className={`w-full border rounded-lg px-4 py-2 placeholder:text-sm focus:outline-none focus:border-zinc-500 text-gray-700 ${formik.touched.email && formik.errors.email
//                                                 ? "border-red-500 focus:ring-red-400"
//                                                 : "border-gray-300 focus:ring-gray-500"
//                                                 }`}
//                                         />
//                                         {formik.touched.email && formik.errors.email && (
//                                             <span className="text-red-500 text-xs mt-1 block">
//                                                 {formik.errors.email}
//                                             </span>
//                                         )}
//                                     </div>

//                                     {/* Password */}
//                                     <div className="w-full">
//                                         <div className="relative flex items-center">
//                                             <input
//                                                 type={showPassword ? "text" : "password"}
//                                                 name="password"
//                                                 placeholder="Password"
//                                                 {...formik.getFieldProps("password")}
//                                                 className={`w-full border rounded-lg px-4 py-2 placeholder:text-sm focus:outline-none focus:border-zinc-500 text-gray-700 ${formik.touched.password && formik.errors.password
//                                                     ? "border-red-500 focus:ring-red-400"
//                                                     : "border-gray-300 focus:ring-gray-500"
//                                                     }`}
//                                             />

//                                             {/* Eye Icon Button */}
//                                             <button
//                                                 type="button"
//                                                 onClick={() => setShowPassword(!showPassword)}
//                                                 className="absolute right-3 flex items-center justify-center h-full"
//                                             >
//                                                 {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
//                                             </button>
//                                         </div>

//                                         {formik.touched.password && formik.errors.password && (
//                                             <span className="text-red-500 text-xs mt-1 block">
//                                                 {formik.errors.password}
//                                             </span>
//                                         )}
//                                     </div>

//                                     {/* Submit */}
//                                     <button
//                                         type="submit"
//                                         disabled={formik.isSubmitting}
//                                         className={`w-full flex items-center justify-center gap-2 py-2 rounded-lg transition ${formik.isSubmitting
//                                             ? "bg-gray-400 cursor-not-allowed"
//                                             : "bg-black hover:bg-red-700 text-white"
//                                             }`}
//                                     >
//                                         {formik.isSubmitting ? (
//                                             <Loader2 className="animate-spin" />
//                                         ) : (
//                                             "Login"
//                                         )}
//                                     </button>

//                                     {errors && (
//                                         <p className="text-red-500 text-sm text-center">{errors}</p>
//                                     )}
//                                     <Link
//                                         href="/forgot-password"
//                                         className="text-blue-600 hover:underline text-sm block text-center"
//                                     >
//                                         Forgot your password?
//                                     </Link>

//                                     <p className="text-sm text-center mt-2 text-gray-600">
//                                         Don’t have an account?{" "}
//                                         <Link href="/signup" className="text-blue-600 hover:underline">
//                                             Sign Up
//                                         </Link>
//                                     </p>
//                                 </form>
//                             </div>

//                             {/* Right Side - Register Info */}
//                             <div className="bg-gray-50 border border-gray-300 p-10">
//                                 <h2 className="text-xl mb-3 text-gray-800">New Customer?</h2>
//                                 <p className="text-gray-600 mb-4 text-sm">

//                                     Registering for this site allows you to access your order
//                                     status and history. We’ll get a new account set up for you in
//                                     no time.
//                                 </p>
//                                 <Link
//                                     href="/signup"
//                                     className="inline-block bg-black text-white px-6 py-2 rounded-lg hover:bg-red-700 transition"
//                                 >
//                                     Create an account
//                                 </Link>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// }
