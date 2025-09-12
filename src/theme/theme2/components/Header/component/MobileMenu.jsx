"use client"
import { X, Plus, Minus } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

const MobileMenu = ({ data, closeMenu, webSetting }) => {
    const [openMenus, setOpenMenus] = useState({}) // tracks which menu/submenu is open

    // Toggle top-level menu or nested submenu
    const toggleMenu = (id, subId) => {
        setOpenMenus((prev) => {
            if (subId) {
                // toggle nested submenu
                return {
                    ...prev,
                    [id]: {
                        ...prev[id],
                        [subId]: !prev[id]?.[subId],
                    },
                }
            }
            // toggle top-level menu
            return {
                ...prev,
                [id]: !prev[id],
            }
        })
    }

    // Recursive function to render submenus
    const renderSubMenu = (parentId, items) => (
        <ul className="pl-4 mt-2 space-y-2">
            {items.map((item) => (
                <li key={item.id} className="pt-[15px] pr-[45px] pb-[0px] pl-[15px]">
                    <div className="flex justify-between items-center">
                        <Link
                            href={
                                item.url === "wholesale"
                                    ? "/wholesale"
                                    : webSetting?.purchaseType === "wholesale"
                                        ? `/wholesale/${item.url}`
                                        : `/retail/${item.url}`
                            }
                            className="block text-gray-600 hover:text-red-700 text-sm"
                            onClick={closeMenu}
                        >
                            {item.name || item.title}
                        </Link>
                        {item.children?.length > 0 && (
                            <button
                                onClick={(e) => {
                                    e.preventDefault()
                                    toggleMenu(parentId, item.id)
                                }}
                                className="ml-2 text-gray-700"
                            >
                                {openMenus[parentId]?.[item.id] ? (
                                    <Minus size={14} />
                                ) : (
                                    <Plus size={14} />
                                )}
                            </button>
                        )}
                    </div>
                    {item.children?.length > 0 && openMenus[parentId]?.[item.id] && renderSubMenu(parentId, item.children)}
                </li>
            ))}
        </ul>
    )

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex" onClick={closeMenu}>
            {/* Sidebar */}
            <div
                className="w-72 bg-white h-full shadow-lg overflow-y-auto border-b"
                onClick={(e) => e.stopPropagation()}
            >
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
                        const subCategories = item.children?.[0]?.children || []

                        return (
                            <li
                                key={item.id}
                                className="border-b border-gray-400 pt-[15px] pr-[45px] pb-[15px] pl-[15px]"
                            >
                                <div className="flex justify-between items-center">
                                    <Link
                                        href={
                                            item.url === "wholesale"
                                                ? "/wholesale"
                                                : webSetting?.purchaseType === "wholesale"
                                                    ? `/wholesale/${item.url}`
                                                    : `/retail/${item.url}`
                                        }
                                        className="block flex-1 text-gray-800 hover:text-red-800 font-medium"
                                        onClick={closeMenu}
                                    >
                                        {item.name}
                                    </Link>

                                    {subCategories.length > 0 && (
                                        <button
                                            onClick={() => toggleMenu(item.id)}
                                            className="ml-2 text-gray-700"
                                        >
                                            {openMenus[item.id] ? <Minus size={18} /> : <Plus size={18} />}
                                        </button>
                                    )}
                                </div>

                                {subCategories.length > 0 && openMenus[item.id] && renderSubMenu(item.id, subCategories)}
                            </li>
                        )
                    })}
                </ul>
            </div>
        </div>
    )
}

export default MobileMenu;