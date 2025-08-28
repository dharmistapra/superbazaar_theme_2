import React from "react";
import { User, House, Heart, ShoppingCart } from "lucide-react";
import Link from "next/link";

const MobileNav = () => {
    return (
        <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t z-50 lg:hidden">
            <div className="flex justify-around items-center py-2">
                {/* Account */}
                <Link
                    href="/myaccount/account-details"
                    className="flex flex-col items-center text-gray-700 hover:text-red-600"
                >
                    <User size={20} />
                    <span className="text-xs">Account</span>
                </Link>

                {/* Home */}
                <Link
                    href="/"
                    className="flex flex-col items-center text-gray-700 hover:text-red-600"
                >
                    <House size={20} />
                    <span className="text-xs">Home</span>
                </Link>

                {/* Wishlist */}
                <Link
                    href="/myaccount/wishlist"
                    className="flex flex-col items-center text-gray-700 hover:text-red-600"
                >
                    <Heart size={20} />
                    <span className="text-xs">Wishlist</span>
                </Link>

                {/* Cart */}
                <Link
                    href="/cart"
                    className="flex flex-col items-center text-gray-700 hover:text-red-600 relative"
                >
                    <ShoppingCart size={20} />
                    <span className="absolute -top-1 right-2 bg-black text-white text-[10px] rounded-full px-1">
                        0
                    </span>
                    <span className="text-xs">Cart</span>
                </Link>
            </div>
        </div>
    );
};

export default MobileNav;
