"use client"
import { useState } from "react"
import { Mail, Phone, ChevronDown, ChevronUp } from "lucide-react"
import Image from "next/image"
import SocialIcon from "./SocialIcon"
import SocialIconData from "@/app/data/SocialIcon"

const Footer = () => {
  const [openSection, setOpenSection] = useState(null)

  const toggleSection = (index) => {
    setOpenSection(openSection === index ? null : index)
  }

  const sections = [
    {
      title: "Shop by Category",
      items: ["Sarees", "Salwar Kameez", "Lehengas", "Kurtis"],
    },
    {
      title: "Customer Service",
      items: ["About Us", "Contact Us", "Shipping Policy", "Return Policy"],
    },
  ]

  return (
    <footer className="w-full mt-10 bg-zinc-950 text-white">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 p-8 md:p-10 items-start">
        {/* Logo & Contact Info */}
        <div className="flex flex-col gap-4">
          <Image
            src="/logo.png"
            alt="Logo"
            width={230}
            height={75}
            className="h-[75px] w-[230px] object-contain"
          />
          <p className="text-sm leading-relaxed text-gray-300">
            D-House, 21st Century Building <br />
            Ring Road, Surat, Gujarat-395002, INDIA
          </p>

          <div className="flex flex-col gap-2 mt-2 text-gray-300">
            <div className="flex items-center gap-2">
              <Mail size={18} />
              <span className="text-sm">info@superbazaar.in</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone size={18} />
              <span className="text-sm">+91-9898013133</span>
            </div>
          </div>

          <div className="mt-4 flex gap-3">
            <SocialIcon socialMedia={SocialIconData} />
          </div>
        </div>

        {/* Sections */}
        {sections.map((section, index) => (
          <div key={index} className="flex flex-col">
            <div
              className="flex justify-between items-center border-b border-gray-700 py-2 md:border-none md:py-0 md:block cursor-pointer md:cursor-default"
              onClick={() => toggleSection(index)}
            >
              <h2 className="text-lg font-semibold">{section.title}</h2>
              <span className="md:hidden">
                {openSection === index ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </span>
            </div>
            <div
              className={`transition-all duration-300 overflow-hidden 
                ${openSection === index ? "max-h-screen py-2" : "max-h-0 md:max-h-none md:py-2"}`}
            >
              <ul className="space-y-2 text-sm text-gray-300">
                {section.items.map((item, i) => (
                  <li key={i}>
                    <a href="#" className="hover:text-white transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}

        {/* Newsletter */}
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
