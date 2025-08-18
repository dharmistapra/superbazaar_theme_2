"use client"
import { useEffect, useRef, useState } from "react"
import { Search, User, ShoppingBag, Heart, Key, UserPlus } from "lucide-react"
import Image from "next/image"
import Menu from "./Menu"
const NavBar = () => {
    const [open, setOpen] = useState(false)
    const dropdownRef = useRef(null)

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setOpen(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    })
    return (
        <nav className="w-full bg-white shadow-md px-6 py-3 ">
            <div className="flex items-center justify-between relative">

                <div className="flex items-center gap-2">
                    <Image
                        src="/logo.png"
                        alt="Logo"
                        width={250}
                        height={250}
                        className="h-12 w-auto" />
                </div>
                <div className="flex-1 max-w-lg mx-6">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search..."
                            className="w-full pl-4 pr-10 py-3 bg-gray-200 rounded-lg outline-none"
                        />
                        <Search
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                            size={18}
                        />
                    </div>
                </div>

                <div className="flex items-center gap-5 text-gray-700 relative">
                    <Heart className="cursor-pointer hover:text-black" size={23} />
                    <ShoppingBag className="cursor-pointer hover:text-black" size={23} />
                    <div className="relative" ref={dropdownRef}>
                        <User
                            className="cursor-pointer hover:text-black"
                            size={23}
                            onClick={() => setOpen(!open)}
                        />

                        {open && (
                            <div className="absolute right-0 mt-2 w-52 bg-white rounded-lg shadow-lg z-50">
                                <ul className="py-2 text-sm text-gray-700">
                                    <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2 transition-colors">
                                        <Key size={18} className="text-gray-500" />
                                        <span>Login</span>
                                    </li>
                                    <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2 transition-colors">
                                        <UserPlus size={18} className="text-gray-500" />
                                        <span>Sign Up</span>
                                    </li>
                                    <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2 transition-colors">
                                        <Heart size={18} className="text-gray-500" />
                                        <span>Wishlist</span>
                                    </li>
                                    <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2 transition-colors">
                                        <User size={18} className="text-gray-500" />
                                        <span>Account</span>
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div >
                <Menu />
            </div>

        </nav>
    )
}

export default NavBar
