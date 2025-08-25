"use client"
import { useEffect, useRef, useState } from "react"
import { Search, User, ShoppingCart, Heart, Truck, Menu } from "lucide-react"
import data from "@/app/data/MenuData"
import Image from "next/image"
import MobileMenu from "./component/MobileMenu"

const currencies = [
    { code: "USD", flag: "https://flagcdn.com/us.svg" },
    { code: "EUR", flag: "https://flagcdn.com/eu.svg" },
    { code: "INR", flag: "https://flagcdn.com/in.svg" },
    { code: "GBP", flag: "https://flagcdn.com/gb.svg" },
    { code: "AUD", flag: "https://flagcdn.com/au.svg" },
    { code: "CAD", flag: "https://flagcdn.com/ca.svg" },
    { code: "JPY", flag: "https://flagcdn.com/jp.svg" },
    { code: "CNY", flag: "https://flagcdn.com/cn.svg" },
    { code: "SGD", flag: "https://flagcdn.com/sg.svg" },
    { code: "CHF", flag: "https://flagcdn.com/ch.svg" },
    { code: "NZD", flag: "https://flagcdn.com/nz.svg" },
    { code: "ZAR", flag: "https://flagcdn.com/za.svg" },
]

const NavBar = () => {
    const [openCurrency, setOpenCurrency] = useState(false)
    const [openUser, setOpenUser] = useState(false)
    const [openMenu, setOpenMenu] = useState(false) // 👈 for sidebar
    const currencyRef = useRef(null)
    const userRef = useRef(null)

    // Close dropdowns when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (currencyRef.current && !currencyRef.current.contains(event.target)) {
                setOpenCurrency(false)
            }
            if (userRef.current && !userRef.current.contains(event.target)) {
                setOpenUser(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [])

    return (
        <header className="w-full">
            {/* Top black bar */}
            <div className="bg-black text-white text-center text-sm p-2">
                FREE SHIPPING ON ORDER OVER ₹1000
            </div>

            {/* Middle section */}
            <div className="flex items-center justify-between px-6 py-3 mb-1">
                {/* Left: Mobile Menu Icon */}
                <div className="flex items-center lg:hidden md:hidden">
                    <button onClick={() => setOpenMenu(true)}>
                        <Menu size={28} className="text-gray-800" />
                    </button>
                </div>

                {/* Logo */}
                <div className="flex items-center">
                    <img
                        src="/logo.png"
                        alt="Superbazaar Logo"
                        className="h-14 object-contain"
                    />
                </div>

                {/* Center Shipping Info */}
                <div className="hidden md:block w-[30%] mx-6">
                    <div className="border-2 border-dashed border-slate-300 rounded-lg flex items-center justify-center py-2 text-sm shadow-none ring-0">
                        <Truck className="mr-2 h-4 w-4 text-red-800" />
                        <p className="text-red-800">Only Ready To Ship Products</p>
                    </div>
                </div>

                {/* Right Icons */}
                <div className="flex items-center space-x-4 text-gray-700">
                    <Search className="cursor-pointer w-18 mr-2  " />

                    {/* Currency Dropdown */}
                    <div className="relative" ref={currencyRef}>
                        <button
                            onClick={() => {
                                setOpenCurrency((prev) => !prev)
                                setOpenUser(false)
                            }}
                            className="flex items-center gap-1"
                        >
                            <Image
                                src="https://flagcdn.com/in.svg"
                                alt="Currency Flag"
                                className="w-6 h-4 object-cover"
                                width={30}
                                height={20}
                            />
                        </button>

                        {openCurrency && (
                            <div className="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded-lg p-3 grid grid-cols-4 gap-3 z-50">
                                {currencies.map((currency) => (
                                    <button
                                        key={currency.code}
                                        className="flex flex-col items-center p-2 hover:bg-gray-100 rounded"
                                    >
                                        <Image
                                            src={currency.flag}
                                            alt={currency.code}
                                            className="w-6 h-6 mb-1"
                                            width={24}
                                            height={24}
                                        />
                                        <span className="text-xs">{currency.code}</span>
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* User Dropdown */}
                    <div className="hidden md:flex relative" ref={userRef}>
                        <button
                            onClick={() => {
                                setOpenUser((prev) => !prev)
                                setOpenCurrency(false)
                            }}
                            className="cursor-pointer"
                        >
                            <User size={18} />
                        </button>

                        {openUser && (
                            <div className="absolute right-[-10px] mt-2 w-40 bg-white shadow-lg rounded-lg z-50">
                                <a href="/profile" className="block px-4 py-2 hover:bg-gray-100">
                                    My Account
                                </a>
                                <a href="/wishlist" className="block px-4 py-2 hover:bg-gray-100">
                                    Wishlist
                                </a>
                                <a href="/logout" className="block px-4 py-2 hover:bg-gray-100">
                                    Logout
                                </a>
                                <a href="/login" className="block px-4 py-2 hover:bg-gray-100">
                                    Login
                                </a>
                                <a href="/register" className="block px-4 py-2 hover:bg-gray-100">
                                    Register
                                </a>
                            </div>
                        )}
                    </div>

                    <Heart className="cursor-pointer hidden md:flex" />

                    <div className="relative hidden md:flex">
                        <ShoppingCart className="cursor-pointer" size={18} />
                        <span className="absolute -top-2 -right-2 bg-black text-white text-xs rounded-full px-1">
                            1
                        </span>
                    </div>
                </div>
            </div>

            {/* Desktop Menu */}
            <nav className="hidden lg:flex justify-center space-x-6 py-2 text-sm font-medium text-gray-800 relative mb-1">
                {data.map((item) => (
                    <div key={item.id} className="relative group">
                        <a
                            // href={`${purchaseType === "wholesale" ? `/wholesale/${item.url}` : `/retail/${item.url}`}`}
                            href={`/retail/${item.url}`}
                            className="hover:text-red-800 flex items-center text-[17px] text-gray-700 tracking-[1px]"
                        >
                            {item.name}
                        </a>

                        {/* Dropdown if children exist */}
                        {item.children.length > 0 && (
                            <div className="absolute left-0 top-full mt-2 w-56 bg-white shadow-lg rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                                <ul className="flex flex-col p-3 space-y-2">
                                    {item.children[0]?.children?.map((child) => (
                                        <li key={child.id}>
                                            <a
                                                href={`/${child.url}`}
                                                className="block hover:text-red-800"
                                            >
                                                {child.name}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                ))}
            </nav>

            {/* Mobile Sidebar */}
            {openMenu && (
                <MobileMenu data={data} closeMenu={() => setOpenMenu(false)} />
            )}
        </header>
    )
}

export default NavBar