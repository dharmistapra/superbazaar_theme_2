"use client";

import { ImageUrl } from "@/helper/imageUrl";
import { getPolicies, getSocialIcon } from "@/services/cmsService";
import { getWebSetting } from "@/services/webSetting";
import { setWebSetting } from "@/store/slice/webSettingSlice";
import { Mail, MoveUp } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as LucideIcons from "lucide-react";

const FooterLayout = () => {
    const dispatch = useDispatch();
    const [showScroll, setShowScroll] = useState(false);
    const { data } = useSelector((state) => state?.categorystore)
    const [cmsData, setCmsData] = useState([])
    const [socialIcons, setSocialIcons] = useState([])
    const [webSetting, setWebSettingState] = useState({})
    const socialColors = {
        facebook: "bg-blue-600 text-white hover:bg-blue-700",
        twitter: "bg-sky-500 text-white hover:bg-sky-600",
        instagram: "bg-pink-500 text-white hover:bg-pink-600",
        linkedin: "bg-blue-700 text-white hover:bg-blue-800",
        youtube: "bg-red-600 text-white hover:bg-red-700"
    };

    const fetchData = async () => {
        const [webData, cmsDataResp, socialIconData] = await Promise.all([
            getWebSetting(),
            getPolicies(),
            getSocialIcon()
        ])
        setCmsData(cmsDataResp?.data)
        setSocialIcons(socialIconData?.data)
        setWebSettingState(webData)
        dispatch(setWebSetting(webData));
    }

    useEffect(() => {
        fetchData();
    }, []);

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
        <footer className="bg-black text-white">
            {/* Top Section */}
            <div className="py-8 border-b border-gray-700">
                <div className="container mx-auto px-4 text-center">
                    <div className="mb-4">
                        <Image
                            src={ImageUrl(webSetting?.footerLogo || "/logo.png")}
                            alt="Footer Logo"
                            width={300}
                            height={60}
                            className="mx-auto mb-5"
                        />
                        <p className="text-[13px] tracking-wider mb-3 mt-2">{webSetting?.address}</p>
                        <p className="mt-1">
                            Phone: <Link href="tel:+919898013133" className=" text-[13px] tracking-wider ">{webSetting?.complaintNumber}</Link>{" "}
                            | Email: <Link href={`mailto:${webSetting?.email}`} className=" text-[13px] tracking-wider ">{webSetting?.email}</Link>
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-left mt-8">
                        <div>
                            <h4 className="font-medium mb-3 uppercase tracking-[3px]">Online Shopping</h4>
                            <ul className="space-y-1 text-[13px] tracking-wider">
                                {data && data?.length > 0 && data.map((item, i) => {
                                    return (
                                        <li key={i}>
                                            <Link href={item.url === "wholesale" ? "/wholesale" : webSetting?.purchaseType === "wholesale" ? `/wholesale/${item.url}`
                                                : `/retail/${item.url}`} className="hover:text-white transition-colors">
                                                {item?.name}
                                            </Link>
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>

                        {/* Help & Support */}
                        <div>
                            <h4 className="font-medium mb-3 uppercase tracking-[3px]">Help & Support</h4>
                            <ul className="space-y-1 text-[13px] tracking-wider">
                                {cmsData.map((cms, i) => {
                                    return (
                                        <li key={i}>
                                            <Link href={`/policies/${cms?.url}`} className="hover:underline">{cms?.title}</Link>
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>

                        {/* Quick Links */}
                        <div>
                            <h4 className="font-medium mb-3 uppercase tracking-[3px]">Quick Link</h4>
                            <ul className="space-y-1 text-[13px] tracking-wider">
                                <li className="flex gap-1">
                                    <Link href="/login" className="hover:underline">Login</Link>/
                                    <Link href="/signup" className="hover:underline">Register</Link>
                                </li>
                                <li><Link href="/contact-us" className="hover:underline">Contact Us</Link></li>
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
                                {socialIcons?.map((media) => {
                                    const IconComponent = LucideIcons[media.icon];
                                    const colorClasses = socialColors[media.icon?.toLowerCase()] || "bg-gray-200 text-black";

                                    return (
                                        <Link
                                            key={media.id}
                                            href={media.url || "#"}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={`superbazaar-social-icon rounded-full p-3 flex items-center justify-center ${colorClasses}`}
                                        >
                                            {IconComponent ? <IconComponent size={20} /> : null}
                                        </Link>
                                    );
                                })}

                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Section */}
            <div className="py-4 flex flex-col md:flex-row items-center justify-between container mx-auto px-4 text-gray-400">
                <div className="uppercase text-sm mb-2 md:mb-0">  © {new Date().getFullYear()}  {webSetting?.copyRightText}.</div>
                <Image
                    src="/safepayment.webp"
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
                        className="fixed bottom-14 right-2 bg-white hover:bg-slate-400 text-white p-2 rounded-sm z-50"
                    >
                        <MoveUp size={28} fill="black" className="text-black" />
                    </button>
                )
            }
        </footer >
    );
};

export default FooterLayout;