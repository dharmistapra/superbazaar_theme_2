// "use client";

// import React, { useEffect, useRef, useState } from "react";
// import Image from "next/image"; // ✅
// import { ImageUrl } from "@/helper/imageUrl";

// const CurrencyComponent = ({ currencyData }) => {
//     const [openCurrency, setOpenCurrency] = useState(false);
//     const [openUser, setOpenUser] = useState(false); // ✅ you also used setOpenUser but never defined state
//     const currencyRef = useRef(null);
//     const userRef = useRef(null);

//     useEffect(() => {
//         const handleClickOutside = (event) => {
//             if (currencyRef.current && !currencyRef.current.contains(event.target)) {
//                 setOpenCurrency(false);
//             }
//             if (userRef.current && !userRef.current.contains(event.target)) {
//                 setOpenUser(false);
//             }
//         };

//         document.addEventListener("mousedown", handleClickOutside);
//         return () => {
//             document.removeEventListener("mousedown", handleClickOutside);
//         };
//     }, []);

//     return (
//         <div className="relative" ref={currencyRef}>
//             <button
//                 onClick={() => {
//                     setOpenCurrency((prev) => !prev);
//                     setOpenUser(false);
//                 }}
//                 className="flex items-center gap-2 rounded-md hover:bg-gray-50"
//             >
//                 <Image
//                     src="https://flagcdn.com/in.svg"
//                     alt="Currency Flag"
//                     className="object-cover"
//                     width={24}
//                     height={24}
//                 />
//             </button>

//             {openCurrency && (
//                 <div className="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded-lg p-3 grid grid-cols-4 gap-3 z-50">
//                     {currencyData.map((currency) => (
//                         <button
//                             key={currency.code}
//                             className="flex flex-col items-center p-2 hover:bg-gray-100 rounded"
//                         >
//                             <Image
//                                 src={ImageUrl(currency.flag)}
//                                 alt={currency.code}
//                                 width={30}
//                                 height={20}
//                                 className="mb-1"
//                             />
//                             <span className="text-xs">{currency.code}</span>
//                         </button>
//                     ))}
//                 </div>
//             )}
//         </div>
//     );
// };

// export default CurrencyComponent;

"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ImageUrl } from "@/helper/imageUrl";
import { useDispatch, useSelector } from "react-redux";

import { setSelectedCurrency, loadSelectedCurrency } from "@/store/slice/CurrencySlice";
const CurrencyComponent = ({ currencyData }) => {
    const dispatch = useDispatch();
    const { selected } = useSelector((state) => state.currency);
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        if (currencyData?.length) {
            dispatch(loadSelectedCurrency());
            if (!selected) {
                const inr = currencyData.find((c) => c.code === "INR") || currencyData[0];
                dispatch(setSelectedCurrency(inr));
            }
        }
    }, [currencyData, dispatch]);
    const handleSelect = (cur) => {
        dispatch(setSelectedCurrency(cur));
        setOpen(false);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="relative" ref={dropdownRef}>
            <div
                onClick={() => setOpen(!open)}
                className="cursor-pointer flex items-center"
            >
                {selected && (
                    <Image
                        src={ImageUrl(selected.flag)}
                        alt={selected.code}
                        width={30}
                        height={30}
                        className="object-cover"
                    />
                )}
            </div>
            {open && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                    <ul className="grid grid-cols-3 gap-2 p-3 max-h-64 overflow-y-auto">
                        {currencyData?.map((cur) => {
                            const isSelected = selected?.code === cur.code;
                            return (
                                <li
                                    key={cur.id}
                                    onClick={() => handleSelect(cur)}
                                    className={`flex flex-col items-center justify-start gap-1 cursor-pointer p-2 rounded-md
                    ${isSelected
                                            ? "bg-gray-200 border border-gray-400"
                                            : "hover:bg-gray-100"
                                        }`}
                                >
                                    <Image
                                        src={ImageUrl(cur.flag)}
                                        alt={cur.code}
                                        width={25}
                                        height={25}
                                        className="object-cover"
                                    />
                                    <div className="flex flex-col">
                                        <span className="text-xs text-gray-500">{cur.symbol}</span>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default CurrencyComponent;
