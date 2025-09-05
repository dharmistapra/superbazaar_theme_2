"use client";

import { useEffect, useRef, useState } from "react"
import { Search, User, ShoppingCart, Heart, Truck, Menu, LogOut } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import MobileMenu from "./MobileMenu"
import MobileNav from "./MobileNav";
import { useDispatch, useSelector } from "react-redux";
import { getWebSetting } from "@/services/webSetting";
import { setWebSetting } from "@/store/slice/webSettingSlice";
import data from "@/data/MenuData";
import CurrencyComponent from "./CurrencyComponent";
import { signOut, useSession } from "next-auth/react";
import { setCartItems } from "@/store/slice/cartItemSlice";
import { setWishlistData } from "@/store/slice/WishlistSlice";
import { getCartItems } from "@/services/cartService";
import { getUserWishlist } from "@/services/accountsService";
import { useRouter } from "next/navigation";
import { openCart } from "@/store/slice/MiniCartSlice";

const HeaderMenu = ({ menudata, currencyData }) => {
    const { data: session, } = useSession();
    const [openUser, setOpenUser] = useState(false)
    const [openMenu, setOpenMenu] = useState(false) // 👈 for sidebar
    // const [Menudata, currencyData] = Promise.all([getMenu(), getCurrency()]);
    const router = useRouter();
    const userRef = useRef(null)
    const [isSticky, setIsSticky] = useState(false);
    const dispatch = useDispatch();
    const webSetting = useSelector(state => state.webSetting.webSetting)

    const handleCartClick = () => dispatch(openCart());
    const fetchData = async () => {
        const data = await getWebSetting();
        dispatch(setWebSetting(data));
    }

    useEffect(() => {
        fetchData();
    }, []);

    const fetchProtectedData = async () => {
        const [wishlist, cartItems] = await Promise.all(
            [getUserWishlist(), getCartItems(session?.user?.id)]
        )
        dispatch(setWishlistData(wishlist.data))
        dispatch(setCartItems(cartItems))
    }

    useEffect(() => {
        if (session?.accessToken) {
            fetchProtectedData()
        }
        // dispatch(setCategoyData(Menudata))
    }, [session])

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsSticky(true);
            } else {
                setIsSticky(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleLogout = async () => {
        // localStorage.removeItem("token")
        // signOut({ redirect: false })
        router.push("/")
    }

    return (
        <>

            <header className="w-full">
                {/* Top black bar */}
                <div className="z-[49] bg-black text-white text-center text-[12px] p-[11px] px-1.5">
                    FREE SHIPPING ON ORDER OVER ₹1000
                </div>

                {/* Middle section */}
                <header className={`w-full bg-white transition-all duration-300 ${isSticky ? "fixed top-0 left-0 shadow-md z-50" : "relative"
                    }`}>
                    <div className="container mx-auto px-3">
                        <div className="flex items-center justify-between py-3">
                            {/* Left: Mobile Menu Icon */}
                            <div className="flex items-center lg:hidden gap-4">
                                <button>
                                    <Menu size={21} className="text-gray-800" />
                                </button>
                            </div>

                            {/* Logo */}
                            <div className=" flex items-center mx-4">
                                <Link href="/">
                                    <Image
                                        src="/logo.png"
                                        alt="Superbazaar Logo"
                                        className=" object-contain"
                                        width={260}
                                        height={100}
                                        priority
                                    />
                                </Link>
                            </div>

                            {/* Center Shipping Info */}
                            <div className="hidden md:block w-[50%] mx-6">
                                <div className="border-1 border-dashed border-slate-300 flex items-center justify-center py-2 text-sm">
                                    <Truck className="mr-2 h-4 w-4 text-red-800" />
                                    <p className="text-red-800">Only Ready To Ship Products</p>
                                </div>
                            </div>

                            {/* Right Icons */}
                            <div className="flex items-center space-x-4 text-gray-700 flex-shrink-0">
                                {/* Search */}
                                <Search className="cursor-pointer" size={20} />

                                {/* Currency Dropdown */}
                                <CurrencyComponent currencyData={currencyData} />

                                {/* User Dropdown */}
                                <div className="hidden md:flex relative" ref={userRef}>
                                    <button
                                        onClick={() => {
                                            setOpenUser((prev) => !prev);
                                            setOpenCurrency(false);
                                        }}
                                        className="cursor-pointer"
                                    >
                                        <User size={20} />
                                    </button>

                                    {openUser && (
                                        <div className="absolute right-[-10px] mt-6 w-40 bg-white shadow-lg rounded-lg z-50">
                                            {session?.accessToken ? (
                                                <>
                                                    <Link
                                                        href="/account/account-details"
                                                        className="block px-4 py-2 hover:bg-gray-100"
                                                    >
                                                        My Account
                                                    </Link>
                                                    <Link
                                                        href="/account/wishlist"
                                                        className="block px-4 py-2 hover:bg-gray-100"
                                                    >
                                                        Wishlist
                                                    </Link>
                                                    <button
                                                        onClick={handleLogout}
                                                        className="w-full text-left px-4 py-2 hover:bg-gray-100"
                                                    >
                                                        Logout
                                                    </button>
                                                </>
                                            ) : (
                                                <>
                                                    <Link
                                                        href="/login"
                                                        className="block px-4 py-2 hover:bg-gray-100"
                                                    >
                                                        Login
                                                    </Link>
                                                    <Link
                                                        href="/signup"
                                                        className="block px-4 py-2 hover:bg-gray-100"
                                                    >
                                                        Register
                                                    </Link>
                                                </>
                                            )}
                                        </div>
                                    )}
                                </div>

                                {/* Extra icons visible only when logged in */}
                                {session?.accessToken && (
                                    <>
                                        <Heart size={20} className="cursor-pointer hidden md:flex" />
                                        <div className="relative hidden md:flex">
                                            <ShoppingCart className="cursor-pointer" size={20} onClick={handleCartClick} />
                                            <span className="absolute -top-2 -right-2 bg-black text-white text-xs rounded-full px-1" >
                                                1
                                            </span>
                                        </div>
                                    </>
                                )}
                            </div>

                        </div>
                        <nav className="hidden lg:flex justify-center space-x-6 py-2 text-sm font-medium text-gray-800 relative mb-1">
                            {menudata.map((item) => (
                                <div key={item.id} className="relative group">
                                    <Link
                                        href={`${webSetting.purchaseType === "wholesale" ? `/wholesale/${item.url}` : `/retail/${item.url}`}`}
                                        className="hover:text-red-800 flex items-center text-[17px] text-gray-700 tracking-[2px]"
                                    >
                                        {item.name}
                                    </Link>

                                    {item.children.length > 0 && (
                                        <div className="absolute left-0 top-full mt-2 w-56 bg-white shadow-lg rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                                            <ul className="flex flex-col p-3 space-y-2">
                                                {item.children[0]?.children?.map((child) => (
                                                    <li key={child.id}>
                                                        <Link
                                                            href={`/${child.url}`}
                                                            className="block hover:text-red-800"
                                                        >
                                                            {child.name}
                                                        </Link>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </nav>
                    </div>

                </header>



                {/* Mobile Sidebar */}
                {
                    openMenu && (
                        <MobileMenu data={data} closeMenu={() => setOpenMenu(false)} />
                    )
                }
            </header >
            <MobileNav />
        </>
    );
};

export default HeaderMenu;