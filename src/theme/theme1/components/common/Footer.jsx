"use client"
import { useEffect, useState } from "react"
import { Mail, Phone, ChevronDown, ChevronUp } from "lucide-react"
import Image from "next/image"
import SocialIcon from "./SocialIcon"
import { getWebSetting } from "@/services/webSetting"
import { useDispatch, useSelector } from "react-redux"
import { setWebSetting } from "@/store/slice/webSettingSlice"
import { getPolicies, getSocialIcon } from "@/services/cmsService"
import Link from "next/link"
import { ImageUrl } from "@/helper/imageUrl"

const Footer = () => {
  const dispatch = useDispatch();
  const [openSection, setOpenSection] = useState(null)
  const { data } = useSelector((state) => state?.categorystore)
  const [cmsData, setCmsData] = useState([])
  const [socialIcons, setSocialIcons] = useState([])
  const [webSetting, setWebSettingState] = useState({})

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

  const toggleSection = (index) => {
    setOpenSection(openSection === index ? null : index)
  }

  return (
    <footer className="w-full mt-10 bg-zinc-950 text-white relative overflow-hidden">
       <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:15px_15px]"></div>

      <div className="relative max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 p-8 md:p-10 items-start">
        <div className="flex flex-col gap-4">
          <Image
            src={ImageUrl(webSetting?.footerLogo || "/logo.png")}
            alt="Logo"
            width={230}
            height={80}
            className="h-[80px] w-[250px] object-contain"
          />
          <p className="text-sm leading-relaxed text-gray-300">
            {webSetting?.address}
          </p>
          <div className="flex flex-col gap-2 mt-2 text-gray-300">
            <div className="flex items-center gap-2">
              <Mail size={18} />
              <span className="text-sm">{webSetting?.email}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone size={18} />
              <span className="text-sm">{webSetting?.complaintNumber}</span>
            </div>
          </div>
          <div className="mt-4 flex gap-3">
            <SocialIcon socialMedia={socialIcons} />
          </div>
        </div>

        <div className="flex flex-col">
          <div
            className="flex justify-between items-center border-b border-gray-700 py-2 md:border-none md:py-0 md:block cursor-pointer md:cursor-default"
            onClick={() => toggleSection(0)}
          >
            <h2 className="text-lg font-semibold">Shop By Category</h2>
            <span className="md:hidden">
              {openSection === 0 ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </span>
          </div>
          <div
            className={`transition-all duration-300 overflow-hidden 
              ${openSection === 0 ? "max-h-screen py-2" : "max-h-0 md:max-h-none md:py-2"}`}
          >
            <ul className="space-y-2 text-sm text-gray-300">
              {data && data?.length > 0 && data.map((item, i) => (
                <li key={i}>
                  <a href="#" className="hover:text-white transition-colors">
                    {item?.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="flex flex-col">
          <div
            className="flex justify-between items-center border-b border-gray-700 py-2 md:border-none md:py-0 md:block cursor-pointer md:cursor-default"
            onClick={() => toggleSection(1)}
          >
            <h2 className="text-lg font-semibold">Help & Support</h2>
            <span className="md:hidden">
              {openSection === 1 ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </span>
          </div>
          <div
            className={`transition-all duration-300 overflow-hidden 
              ${openSection === 1 ? "max-h-screen py-2" : "max-h-0 md:max-h-none md:py-2"}`}
          >
            <ul className="space-y-2 text-sm text-gray-300">
              {cmsData && cmsData?.length > 0 && cmsData.map((item, i) => (
                <li key={i}>
                  <Link href={`/policies/${item?.url}`} className="hover:text-white transition-colors">
                    {item?.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <h2 className="text-lg font-semibold mb-1">Newsletter</h2>
          <p className="text-sm text-gray-400 mb-2">
            Subscribe to our newsletter for exclusive updates & offers!
          </p>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              alert("Subscribed!")
            }}
            className="flex flex-col sm:flex-row gap-2"
          >
            <input
              type="email"
              required
              placeholder="Enter your email"
              className="px-4 py-2 rounded-md bg-gray-800 text-white text-sm flex-1 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      <div className="border-t border-gray-700 text-center py-4 text-sm text-gray-400">
        © {new Date().getFullYear()} SuperBazaar. All Rights Reserved.
      </div>
    </footer>
  )
}

export default Footer
