"use client"
import React, { useState } from 'react'
import StitchingForm from './StitchingForm'
import Link from 'next/link';

const ProductAccordion = ({ product, Stitching, setStitchingData, attributes }) => {
    const [open, setOpen] = useState("stitching");
    const toggle = (section) => {
        setOpen(open === section ? null : section);
    };

    return (
        <div>
            <div className="border border-gray-400 round    ed-lg divide-y shadow-sm">
                {/* Stitching */}
                <div>
                    <button
                        onClick={() => toggle("stitching")}
                        className={`w-full flex justify-between items-center px-4 py-3 font-semibold 
      ${open === "stitching" ? "text-blue-600" : "text-gray-800"}`}
                    >
                        Stitching
                        <span className="text-xl">{open === "stitching" ? "−" : "+"}</span>
                    </button>
                    {open === "stitching" && (
                        <div className="px-4 pb-4 text-sm">
                            <StitchingForm stitchingData={Stitching} onChange={setStitchingData} />
                        </div>
                    )}
                </div>


                <div>
                    <button
                        onClick={() => toggle("details")}
                        className={`w-full flex justify-between items-center px-4 py-3 font-semibold 
            ${open === "details" ? "text-blue-600" : "text-gray-800"}`}
                    >
                        Product Details
                        <span className="text-xl">{open === "details" ? "−" : "+"}</span>
                    </button>
                    <div>


                        {open === "details" && (
                            <div className="px-4 pb-4 text-sm  border-t-0 rounded-b-md">
                                <table className="w-full border border-gray-200">
                                    <tbody>
                                        {attributes?.attributeValues?.map((attr, index) => {
                                            return (
                                                <tr
                                                    key={index}
                                                    className={`border-b border-gray-200 ${index % 2 === 0 ? "bg-white" : "bg-gray-100"
                                                        }`}
                                                >
                                                    <td className="font-semibold w-1/3 px-3 py-2">{attr.name}</td>
                                                    <td className="px-3 py-2">
                                                        {attr.key === "color" ? (
                                                            <div className="flex gap-2 flex-wrap">
                                                                {attr.values?.map((val, i) => (
                                                                    <div key={i} className="flex items-center gap-2">
                                                                        <span
                                                                            className="inline-block w-5 h-5 rounded-full border border-gray-300"
                                                                            style={{ backgroundColor: val.color }}
                                                                        ></span>
                                                                        <span>{val.value}</span>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        ) : (attr.values?.map((val) => (Array.isArray(val) ? val.join(", ") : val)).join(", "))}
                                                    </td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>

                                <p className="mt-3 text-sm">
                                    <span className="font-semibold">Catalog: </span>
                                    <Link href="#" className="text-blue-600 underline">
                                        View Full Catalog
                                    </Link>
                                </p>

                                <p className="mt-3 text-gray-700 leading-relaxed">
                                    {product.description}
                                </p>
                            </div>
                        )}
                    </div>

                </div>

                {/* Enquiry */}
                <div>
                    <button
                        onClick={() => toggle("enquiry")}
                        className={`w-full flex justify-between items-center px-4 py-3 font-semibold 
            ${open === "enquiry" ? "text-blue-600" : "text-gray-800"}`}
                    >
                        Enquiry
                        <span className="text-xl">{open === "enquiry" ? "−" : "+"}</span>
                    </button>
                    {open === "enquiry" && (
                        <div className="px-4 pb-4 text-sm">
                            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-6">
                                <div className="sm:col-span-3">
                                    <div className="">
                                        <input
                                            id="email"
                                            type="email"
                                            name="email"
                                            autoComplete="email"
                                            placeholder="Enter Your email"
                                            className="block w-full rounded-md bg-white/5 px-3 py-2.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm"

                                        />
                                    </div>
                                </div>

                                <div className="sm:col-span-3">
                                    <div className="">
                                        <input
                                            id="first-name"
                                            type="text"
                                            name="first-name"
                                            autoComplete="given-name"
                                            placeholder="Enter Your mobile number"
                                            className="block w-full rounded-md bg-white/5 px-3 py-2.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm"

                                        />
                                    </div>
                                </div>

                                <div className="col-span-full">
                                    <textarea
                                        id="message"
                                        name="message"
                                        rows={4}
                                        placeholder="Write your message here..."
                                        className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm"
                                    ></textarea>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default ProductAccordion
