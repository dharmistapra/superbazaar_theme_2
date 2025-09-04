"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react"; // if you're using next-auth
import { createClientAxios } from "@/services/apiClient";

// ✅ Validation schema
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
    const { data: session, } = useSession();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [errors, setErrors] = useState(null);

    // ✅ Formik Hook
    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
            mobile_number: "",
        },
        validationSchema: signupSchema,
        onSubmit: async (values, { setSubmitting }) => {
            try {
                const axiosInstance = createClientAxios();
                const response = await axiosInstance.post("/register", values);

                if (response.status === 200) {
                    setErrors(null);

                    // 🔹 Optional: Auto login after signup
                    const loginRes = await signIn("credentials", {
                        redirect: false,
                        email: values.email,
                        password: values.password,
                    });

                    if (loginRes?.error) {
                        setErrors("Login failed after signup");
                    } else {
                        router.push("/");
                    }
                }
            } catch (error) {
                setErrors(error?.response?.data?.message || "Something went wrong");
            } finally {
                setSubmitting(false);
            }
        },
    });

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-10 px-4">
            <div className="bg-white w-full max-w-md p-8 border border-gray-300">
                <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
                    Create Account
                </h2>

                <form onSubmit={formik.handleSubmit} className="space-y-5">
                    {/* Name */}
                    <div className="relative">
                        <input
                            type="text"
                            name="name"
                            placeholder="Name"
                            {...formik.getFieldProps("name")}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 placeholder:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
                        />
                        {formik.touched.name && formik.errors.name && (
                            <span className="text-red-500 text-xs mt-1 block">
                                {formik.errors.name}
                            </span>
                        )}
                    </div>

                    {/* Email */}
                    <div className="relative">
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            {...formik.getFieldProps("email")}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 placeholder:text-sm focus:outline-none focus:ring-2 focus:ring-gray-500 text-gray-700"
                        />
                        {formik.touched.email && formik.errors.email && (
                            <span className="text-red-500 text-xs mt-1 block">
                                {formik.errors.email}
                            </span>
                        )}
                    </div>

                    {/* Password */}
                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            placeholder="Password"
                            {...formik.getFieldProps("password")}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 placeholder:text-sm focus:outline-none focus:ring-2 focus:ring-gray-500 text-gray-700"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                        {formik.touched.password && formik.errors.password && (
                            <span className="text-red-500 text-xs mt-1 block">
                                {formik.errors.password}
                            </span>
                        )}
                    </div>

                    {/* Confirm Password */}
                    <div className="relative">
                        <input
                            type={showConfirmPassword ? "text" : "password"}
                            name="confirmPassword"
                            placeholder="Confirm Password"
                            {...formik.getFieldProps("confirmPassword")}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 placeholder:text-sm focus:outline-none focus:ring-2 focus:ring-gray-500 text-gray-700"
                        />
                        <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                            {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                        {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                            <span className="text-red-500 text-xs mt-1 block">
                                {formik.errors.confirmPassword}
                            </span>
                        )}
                    </div>

                    {/* Mobile Number */}
                    <div className="relative">
                        <input
                            type="text"
                            name="mobile_number"
                            placeholder="Mobile Number"
                            {...formik.getFieldProps("mobile_number")}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 placeholder:text-sm focus:outline-none focus:ring-2 focus:ring-gray-500 text-gray-700"
                        />
                        {formik.touched.mobile_number && formik.errors.mobile_number && (
                            <span className="text-red-500 text-xs mt-1 block">
                                {formik.errors.mobile_number}
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
                            "Sign Up"
                        )}
                    </button>

                    {errors && (
                        <p className="text-red-500 text-sm text-center">{errors}</p>
                    )}

                    <p className="text-sm text-center mt-2 text-gray-600">
                        Already have an account?{" "}
                        <Link href="/login" className="text-blue-600 hover:underline">
                            Login
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
}


// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { Formik, Form, Field, ErrorMessage } from "formik";
// import * as Yup from "yup";
// import { Eye, EyeOff, Loader2 } from "lucide-react";
// import Link from "next/link";

// // Validation schema
// const signupSchema = Yup.object().shape({
//     name: Yup.string().required("Name is required"),
//     email: Yup.string().email("Invalid email").required("Email is required"),
//     password: Yup.string().required("Password is required"),
//     confirmPassword: Yup.string()
//         .oneOf([Yup.ref("password"), null], "Passwords must match")
//         .required("Confirm your password"),
//     mobile_number: Yup.string().required("Mobile number is required"),
// });

// export default function Signup() {
//     const router = useRouter();
//     const [showPassword, setShowPassword] = useState(false);
//     const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//     const [errors, setErrors] = useState(null);

//     // const handleSignup = async (values, { setSubmitting }) => {
//     //     setErrors(null);
//     //     try {
//     //         const res = await fetch("/register", {
//     //             method: "POST",
//     //             headers: { "Content-Type": "application/json" },
//     //             body: JSON.stringify(values),
//     //         });
//     //         const data = await res.json();

//     //         if (res.ok && data.token) {
//     //             localStorage.setItem("kekeeUserToken", data.token);
//     //             localStorage.setItem("payload", JSON.stringify(data.payload));
//     //             router.push("/login");
//     //         } else {
//     //             setErrors(data.message || "Signup failed");
//     //         }
//     //     } catch (err) {
//     //         console.error(err);
//     //         setErrors("Something went wrong!");
//     //     } finally {
//     //         setSubmitting(false);
//     //     }
//     // };
//     const formik = useFormik({
//         initialValues,
//         validationSchema: signupSchema,
//         onSubmit: async (values) => {
//             try {
//                 const axiosInstance = createClientAxios();
//                 const response = await axiosInstance.post("/register", values)
//                 if (response.status == 200) {
//                     close("signup")
//                     setErrors(null)
//                     const loginRes = await signIn("credentials", {
//                         redirect: false,
//                         email: values.email,
//                         password: values.password,
//                     });

//                     if (loginRes?.error) {
//                         setErrors(errors?.response?.data?.message || "Something went wrong")
//                     } else {
//                         close("signup");
//                     }

//                 }
//             } catch (errors) {
//                 setErrors(errors?.response?.data?.message || "Something went wrong")
//                 return errors
//             }
//         },
//     });

//     return (
//         <div className="min-h-screen flex items-center justify-center bg-gray-50 py-10 px-4">
//             <div className="bg-white w-full max-w-md p-8 border border-gray-300 rounded-lg shadow">
//                 <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Create Account</h2>

//                 <Formik
//                     initialValues={{
//                         name: "",
//                         email: "",
//                         password: "",
//                         confirmPassword: "",
//                         mobile_number: "",
//                     }}
//                     validationSchema={signupSchema}
//                     onSubmit={handleSignup}
//                 >
//                     {({ isSubmitting }) => (
//                         <Form className="space-y-5">
//                             {/* Name */}
//                             <div className="relative">
//                                 <Field
//                                     name="name"
//                                     placeholder="Name"
//                                     className="w-full border border-gray-300 rounded-lg px-4 py-2 placeholder:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
//                                 />
//                                 <ErrorMessage name="name" component="span" className="text-red-500 text-xs mt-1 block" />
//                             </div>

//                             {/* Email */}
//                             <div className="relative">
//                                 <Field
//                                     type="email"
//                                     name="email"
//                                     placeholder="Email"
//                                     className="w-full border border-gray-300 rounded-lg px-4 py-2 placeholder:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
//                                 />
//                                 <ErrorMessage name="email" component="span" className="text-red-500 text-xs mt-1 block" />
//                             </div>

//                             {/* Password */}
//                             <div className="relative">
//                                 <Field
//                                     type={showPassword ? "text" : "password"}
//                                     name="password"
//                                     placeholder="Password"
//                                     className="w-full border border-gray-300 rounded-lg px-4 py-2 pr-10 placeholder:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
//                                 />
//                                 <button
//                                     type="button"
//                                     onClick={() => setShowPassword(!showPassword)}
//                                     className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
//                                 >
//                                     {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
//                                 </button>
//                                 <ErrorMessage name="password" component="span" className="text-red-500 text-xs mt-1 block" />
//                             </div>

//                             {/* Confirm Password */}
//                             <div className="relative">
//                                 <Field
//                                     type={showConfirmPassword ? "text" : "password"}
//                                     name="confirmPassword"
//                                     placeholder="Confirm Password"
//                                     className="w-full border border-gray-300 rounded-lg px-4 py-2 pr-10 placeholder:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
//                                 />
//                                 <button
//                                     type="button"
//                                     onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                                     className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
//                                 >
//                                     {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
//                                 </button>
//                                 <ErrorMessage name="confirmPassword" component="span" className="text-red-500 text-xs mt-1 block" />
//                             </div>

//                             {/* Mobile Number */}
//                             <div className="relative">
//                                 <Field
//                                     type="text"
//                                     name="mobile_number"
//                                     placeholder="Mobile Number"
//                                     className="w-full border border-gray-300 rounded-lg px-4 py-2 placeholder:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
//                                 />
//                                 <ErrorMessage name="mobile_number" component="span" className="text-red-500 text-xs mt-1 block" />
//                             </div>

//                             {/* Submit */}
//                             <button
//                                 type="submit"
//                                 disabled={isSubmitting}
//                                 className={`w-full flex items-center justify-center gap-2 py-2 rounded-lg transition
//                   ${isSubmitting ? "bg-gray-400 cursor-not-allowed" : "bg-black hover:bg-red-700 text-white"}`}
//                             >
//                                 {isSubmitting ? <Loader2 className="animate-spin" /> : "Sign Up"}
//                             </button>

//                             {errors && <p className="text-red-500 text-sm text-center">{errors}</p>}

//                             <p className="text-sm text-center mt-2 text-gray-600">
//                                 Already have an account?{" "}
//                                 <Link href="/login" className="text-blue-600 hover:underline">
//                                     Login
//                                 </Link>
//                             </p>
//                         </Form>
//                     )}
//                 </Formik>
//             </div>
//         </div>
//     );
// }


// // "use client";

// // import { useState } from "react";
// // import { useRouter } from "next/navigation";
// // import { Formik, Form, Field, ErrorMessage } from "formik";
// // import * as Yup from "yup";
// // import { Eye, EyeOff, Loader2 } from "lucide-react";
// // import Link from "next/link";

// // // Validation schema
// // const signupSchema = Yup.object().shape({
// //     name: Yup.string().required("Name is required"),
// //     email: Yup.string().email("Invalid email").required("Email is required"),
// //     password: Yup.string().required("Password is required"),
// //     confirmPassword: Yup.string()
// //         .oneOf([Yup.ref("password"), null], "Passwords must match")
// //         .required("Confirm your password"),
// //     mobile_number: Yup.string().required("Mobile number is required"),
// // });

// // export default function Signup() {
// //     const router = useRouter();
// //     const [showPassword, setShowPassword] = useState(false);
// //     const [showConfirmPassword, setShowConfirmPassword] = useState(false);
// //     const [errors, setErrors] = useState(null);

// //     const handleSignup = async (values, { setSubmitting }) => {
// //         setErrors(null);
// //         try {
// //             const res = await fetch("/register", {
// //                 method: "POST",
// //                 headers: { "Content-Type": "application/json" },
// //                 body: JSON.stringify(values),
// //             });
// //             const data = await res.json();

// //             if (res.ok && data.token) {
// //                 localStorage.setItem("kekeeUserToken", data.token);
// //                 localStorage.setItem("payload", JSON.stringify(data.payload));
// //                 router.push("/login");
// //             } else {
// //                 setErrors(data.message || "Signup failed");
// //             }
// //         } catch (err) {
// //             console.error(err);
// //             setErrors("Something went wrong!");
// //         } finally {
// //             setSubmitting(false);
// //         }
// //     };

// //     return (
// //         <div className="min-h-screen flex items-center justify-center bg-gray-50 py-10 px-4">
// //             <div className="bg-white w-full max-w-md p-8 border border-gray-300">
// //                 <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Create Account</h2>
// //                 <Formik
// //                     initialValues={{
// //                         name: "",
// //                         email: "",
// //                         password: "",
// //                         confirmPassword: "",
// //                         mobile_number: "",
// //                     }}
// //                     validationSchema={signupSchema}
// //                     onSubmit={handleSignup}
// //                 >
// //                     {({ isSubmitting }) => (
// //                         <Form className="space-y-5">
// //                             {/* Name */}
// //                             <div className="relative">
// //                                 <Field
// //                                     name="name"
// //                                     placeholder="Name"
// //                                     className="w-full border  border-gray-300 rounded-lg px-4 py-2  placeholder:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
// //                                 />

// //                                 <ErrorMessage
// //                                     name="name"
// //                                     component="span"
// //                                     className="text-red-500 text-xs mt-1 block"
// //                                 />
// //                             </div>

// //                             {/* Email */}
// //                             <div className="relative">
// //                                 <Field
// //                                     type="email"
// //                                     name="email"
// //                                     placeholder="Email"
// //                                     className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none placeholder:text-sm focus:ring-2 focus:ring-gray-500 text-gray-700"
// //                                 />
// //                                 <ErrorMessage
// //                                     name="email"
// //                                     component="span"
// //                                     className="text-red-500 text-xs mt-1 block"
// //                                 />
// //                             </div>

// //                             {/* Password */}
// //                             <div className="relative">
// //                                 <Field
// //                                     type={showPassword ? "text" : "password"}
// //                                     name="password"
// //                                     placeholder="Password"
// //                                     className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none placeholder:text-sm focus:ring-2 focus:ring-gray-500 text-gray-700"
// //                                 />
// //                                 <button
// //                                     type="button"
// //                                     onClick={() => setShowPassword(!showPassword)}
// //                                     className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 items-center"

// //                                 >
// //                                     {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
// //                                 </button>
// //                                 <ErrorMessage
// //                                     name="password" component="span"
// //                                     className="text-red-500 text-xs mt-1 block"
// //                                 />
// //                             </div>

// //                             {/* Confirm Password */}
// //                             <div className="relative">
// //                                 <Field
// //                                     type={showConfirmPassword ? "text" : "password"}
// //                                     name="confirmPassword"
// //                                     placeholder="Confirm Password"
// //                                     className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none placeholder:text-sm focus:ring-2 focus:ring-gray-500 text-gray-700"
// //                                 />
// //                                 <button
// //                                     type="button"
// //                                     onClick={() => setShowConfirmPassword(!showConfirmPassword)}
// //                                     className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 items-center"
// //                                 >
// //                                     {showConfirmPassword ? <EyeOff size={18} className="" /> : <Eye size={18} />}
// //                                 </button>
// //                                 <ErrorMessage
// //                                     name="confirmPassword"
// //                                     component="span"
// //                                     className="text-red-500 text-xs mt-1 block"
// //                                 />
// //                             </div>

// //                             {/* Mobile Number */}
// //                             <div className="relative">
// //                                 <Field
// //                                     type="text"
// //                                     name="mobile_number"
// //                                     placeholder="Mobile Number"
// //                                     className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none placeholder:text-sm focus:ring-2 focus:ring-gray-500 text-gray-700"
// //                                 />
// //                                 <ErrorMessage
// //                                     name="mobile_number"
// //                                     component="span"
// //                                     className="text-red-500 text-xs mt-1 block"
// //                                 />
// //                             </div>

// //                             {/* Submit */}
// //                             <button
// //                                 type="submit"
// //                                 disabled={isSubmitting}
// //                                 className={`w-full flex items-center justify-center gap-2 py-2 rounded-lg transition
// //                   ${isSubmitting ? "bg-gray-400 cursor-not-allowed" : "bg-black hover:bg-red-700 text-white"}`}
// //                             >
// //                                 {isSubmitting ? <Loader2 className="animate-spin" /> : "Sign Up"}
// //                             </button>

// //                             {errors && <p className="text-red-500 text-sm text-center">{errors}</p>}

// //                             <p className="text-sm text-center mt-2 text-gray-600">
// //                                 Already have an account?{" "}
// //                                 <Link href="/login" className="text-blue-600 hover:underline">
// //                                     Login
// //                                 </Link>
// //                             </p>
// //                         </Form>
// //                     )}
// //                 </Formik>
// //             </div>
// //         </div>
// //     );
// // }