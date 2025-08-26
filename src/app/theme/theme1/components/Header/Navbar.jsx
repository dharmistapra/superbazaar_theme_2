"use client";
import { useEffect, useRef, useState } from "react";
import { Search, User, ShoppingBag, Heart, Key, UserPlus, MenuIcon } from "lucide-react";
import Image from "next/image";
import Menu from "./components/Menu";
import MobileMenu from "./components/MobileMenu";
import Link from "next/link";
import { openCart } from "@/app/store/slice/MiniCartSlice";
import { useModal } from "@/app/hooks/useModal";
import { useDispatch } from "react-redux";
const NavBar = () => {
  const dispatch=useDispatch()
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { open } = useModal();
  const handleMenu = () => setMenuOpen(!menuOpen);
const handleCartClick = () => {
    dispatch(openCart());
  };
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 640) setMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("pointerdown", handleClickOutside);
    return () => document.removeEventListener("pointerdown", handleClickOutside);
  }, []);


  return (
    <nav className="w-full bg-white shadow-md px-6 py-3">
      <div className="flex items-center justify-between relative">
        <div className="flex items-center gap-2">
          <div className="sm:hidden cursor-pointer">
            <MenuIcon size={28} onClick={handleMenu} />
          </div>
          <div className="hidden sm:flex">
            <Link href="/">
              <Image src="/logo.png" alt="Logo" width={250} height={250} className="h-12 w-auto" />
            </Link>
          </div>
        </div>

        <div className="flex-1 max-w-lg mx-6">
          <div className="relative hidden sm:block">
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-4 pr-10 py-3 bg-gray-200 rounded-lg outline-none"
            />
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
          </div>
          <div className="sm:hidden flex justify-center">
            <Image src="/logo.png" alt="Logo" width={150} height={150} className="h-10 w-auto" />
          </div>
        </div>

        <div className="flex items-center gap-5 text-gray-700 relative" ref={dropdownRef}>
          <Heart className="cursor-pointer hover:text-black hidden sm:block" size={23} />
          <ShoppingBag className="cursor-pointer hover:text-black hidden sm:block" size={23} onClick={handleCartClick}/>
          <div className="relative" ref={dropdownRef}>
            <User
              className="cursor-pointer hover:text-black"
              size={23}
              onClick={() => setDropdownOpen(!dropdownOpen)}
            />
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 z-50">
                <ul className="py-2 text-sm text-gray-700">
                  <li
                    onClick={() => open("login")}
                    className="flex items-center gap-3 px-4 py-2.5 cursor-pointer transition-all duration-200 hover:bg-gray-50 hover:text-red-500"
                  >
                    <Key size={18} className="text-gray-500 group-hover:text-red-400" />
                    <span className="font-medium">Login</span>
                  </li>

                  <li
                    onClick={() => open("signup")}
                    className="flex items-center gap-3 px-4 py-2.5 cursor-pointer transition-all duration-200 hover:bg-gray-50 hover:text-red-500"
                  >
                    <UserPlus size={18} className="text-gray-500 group-hover:text-red-400" />
                    <span className="font-medium">Sign Up</span>
                  </li>

                  <hr className="my-1 border-gray-200" />

                  <li>
                    <Link
                      href="/account/wishlist"
                      className="flex items-center gap-3 px-4 py-2.5 transition-all duration-200 hover:bg-gray-50 hover:text-red-500"
                    >
                      <Heart size={18} className="text-gray-500 group-hover:text-red-400" />
                      <span className="font-medium">Wishlist</span>
                    </Link>
                  </li>

                  <li>
                    <Link
                      href="/account/account-details"
                      className="flex items-center gap-3 px-4 py-2.5 transition-all duration-200 hover:bg-gray-50 hover:text-red-500"
                    >
                      <User size={18} className="text-gray-500 group-hover:text-red-400" />
                      <span className="font-medium">Account</span>
                    </Link>
                  </li>
                </ul>
              </div>
            )}

          </div>
        </div>
      </div>
      <Menu />
      <MobileMenu open={menuOpen} handleMenu={handleMenu} />
    </nav>
  );
};

export default NavBar;
