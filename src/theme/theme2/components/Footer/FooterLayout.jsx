"use client";

import { Mail, MoveUp } from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";

const FooterLayout = () => {
    const [showScroll, setShowScroll] = useState(false);

    // Scroll-to-top functionality
    useEffect(() => {
        const handleScroll = () => {
            setShowScroll(window.scrollY > 200);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <footer className="bg-gray-900 text-white">
            {/* Top Section */}
            <div className="py-8 border-b border-gray-700">
                <div className="container mx-auto px-4 text-center">
                    <div className="mb-4">
                        <Image
                            src="https://cdn.superbazaar.in/uploads/logo/footer/1751887757153-231762557.png"
                            alt="Footer Logo"
                            width={300}
                            height={60}
                            className="mx-auto mb-5"
                        />
                        <p className="text-[13px] tracking-wider mb-3 mt-2">D-House, 21st Century Building, Ring Road, Surat, Gujarat-395002, INDIA</p>
                        <p className="mt-1">
                            Phone: <a href="tel:+919898013133" className=" text-[13px] tracking-wider ">+91-9898013133</a>{" "}
                            | Email: <a href="mailto:info@superbazaar.in" className=" text-[13px] tracking-wider ">info@superbazaar.in</a>
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-left mt-8">
                        {/* Online Shopping Links */}
                        <div>
                            <h4 className="font-medium mb-3 uppercase tracking-[3px]">Online Shopping</h4>
                            <ul className="space-y-1 text-[13px] tracking-wider">
                                {[
                                    ["New Arrivals", "/catalogue/new-arrivals"],
                                    ["Sarees", "/catalogue/sarees"],
                                    ["Salwar Suits", "/catalogue/salwar-suits"],
                                    ["Lehengas", "/catalogue/lehengas"],
                                    ["Gowns", "/catalogue/gowns"],
                                    ["Kurtis", "/catalogue/kurtis"],
                                    ["Mens's Wear", "/catalogue/menss-wear"],
                                    ["Wholesale", "/catalogue/wholesale"],
                                    ["Brands", "/brands"],
                                ].map(([label, href]) => (
                                    <li key={label} className="gap-5">
                                        <a href={href} className="hover:underline ">{label}</a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Help & Support */}
                        <div>
                            <h4 className="font-medium mb-3 uppercase tracking-[3px]">Help & Support</h4>
                            <ul className="space-y-1 text-[13px] tracking-wider">
                                {[
                                    ["About Us", "/help-support/about-us"],
                                    ["Terms & Conditions", "/help-support/terms-and-conditions"],
                                    ["Shipping Policy", "/help-support/shipping-policy"],
                                    ["Stitching Charges", "/help-support/stitching-charges"],
                                    ["Return Policy", "/help-support/return-policy"],
                                ].map(([label, href]) => (
                                    <li key={label}>
                                        <a href={href} className="hover:underline">{label}</a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Quick Links */}
                        <div>
                            <h4 className="font-medium mb-3 uppercase tracking-[3px]">Quick Link</h4>
                            <ul className="space-y-1 text-[13px] tracking-wider">
                                <li className="flex gap-1">
                                    <a href="/login" className="hover:underline">Login</a>/
                                    <a href="/signup" className="hover:underline">Register</a>
                                </li>
                                <li><a href="/contact-us" className="hover:underline">Contact Us</a></li>
                            </ul>
                        </div>

                        {/* Newsletter */}
                        <div>
                            <h4 className="font-medium mb-2 uppercase tracking-[3px]">Newsletter Sign Up</h4>
                            <p className="mb-3 tracking-wider text-[13px] ">Be the First to Explore Our Latest Collections</p>
                            <form className="flex gap-2">
                                <input
                                    type="email"
                                    placeholder="Email address"
                                    className="flex-1 px-3 py-2 rounded bg-white text-gray-900"
                                    required
                                />
                                <button
                                    type="submit"
                                    className="bg-yellow-500 px-3 py-2 rounded hover:bg-yellow-600"
                                    aria-label="Subscribe"
                                >
                                    <Mail />
                                </button>
                            </form>

                            {/* Social Icons */}
                            <div className="flex gap-3 mt-4 justify-center lg:justify-start">
                                {[
                                    ["youtube", "/"],
                                    ["facebook", "/"],
                                    ["twitter", "/"],
                                    ["instagram", "/"],
                                ].map(([name, href]) => (
                                    <a
                                        key={name}
                                        href={href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="hover:text-yellow-500"
                                    >
                                        <svg className="w-6 h-6" fill="currentColor">
                                            <use href={`/icons.svg#${name}`} />
                                        </svg>
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Section */}
            <div className="py-4 flex flex-col md:flex-row items-center justify-between container mx-auto px-4 text-gray-400">
                <div className="uppercase text-sm mb-2 md:mb-0">© 2025 super Bazaar. All Rights Reserved.</div>
                <Image
                    src="/static/media/payment.020e7c82487e5bff608b.webp"
                    alt="Payment"
                    width={300}
                    height={35}
                />
            </div>

            {/* Scroll to top */}
            {
                showScroll && (
                    <button
                        onClick={scrollToTop}
                        aria-label="Scroll to top"
                        className="fixed bottom-5 right-5 bg-white hover:bg-slate-400 text-white p-2 rounded-sm z-50"
                    >
                        <MoveUp size={28} fill="black" className="text-black" />
                    </button>
                )
            }
        </footer >
    );
};

export default FooterLayout;