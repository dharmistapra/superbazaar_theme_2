"use client"
import { X, Plus, Minus } from "lucide-react"
import { useState } from "react"

const MobileMenu = ({ data, closeMenu }) => {
    const [openMenus, setOpenMenus] = useState({})

    const toggleMenu = (id) => {
        setOpenMenus((prev) => ({
            ...prev,
            [id]: !prev[id],
        }))
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex">
            {/* Sidebar */}
            <div className="w-72 bg-white h-full shadow-lg overflow-y-auto border-b">
                {/* Header */}
                {/* Header */}
                <div className="bg-gray-300 sticky top-0 z-10">
                    <div className="flex justify-between items-center p-4 border-b border-gray-200 h-18">
                        <h2 className="text-lg font-bold">Menu</h2>
                        <button onClick={closeMenu} className="text-gray-700 hover:text-red-800">
                            <X size={28} />
                        </button>
                    </div>
                </div>

                {/* Menu List */}
                <ul className="space-y-2">
                    {data.map((item) => {
                        // actual children live in item.children[0]?.children
                        const subCategories = item.children?.[0]?.children || []

                        return (
                            <li key={item.id} className="border-b border-gray-400 pt-[15px] pr-[45px] pb-[15px] pl-[15px]">
                                <div className="flex justify-between items-center">
                                    {subCategories.length > 0 ? (
                                        <button
                                            onClick={() => toggleMenu(item.id)}
                                            className="flex-1 text-left text-gray-800 font-medium hover:text-red-800"
                                        >
                                            {item.name}
                                        </button>
                                    ) : (
                                        <Link
                                            href={`/${item.url}`}
                                            className="block flex-1 text-gray-800 hover:text-red-800 font-medium"
                                        >
                                            {item.name}
                                        </Link>
                                    )}

                                    {subCategories.length > 0 && (
                                        <button
                                            onClick={() => toggleMenu(item.id)}
                                            className="ml-2 text-gray-700"
                                        >
                                            {openMenus[item.id] ? (
                                                <Minus size={18} />
                                            ) : (
                                                <Plus size={18} />
                                            )}
                                        </button>
                                    )}
                                </div>

                                {/* Submenu */}
                                {subCategories.length > 0 && openMenus[item.id] && (
                                    <ul className="pl-4 mt-2 space-y-2">
                                        {subCategories.map((subItem) => (
                                            <li key={subItem.id} className="pt-[15px] pr-[45px] pb-[0px] pl-[15px]">
                                                <Link
                                                    href={`/${subItem.url}`}
                                                    className="block text-gray-600 hover:text-red-700 text-sm"
                                                >
                                                    {subItem.name}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </li>
                        )
                    })}
                </ul>
            </div>

            {/* Click outside to close */}
            <div className="flex-1" onClick={closeMenu}></div>
        </div>
    )
}

export default MobileMenu

