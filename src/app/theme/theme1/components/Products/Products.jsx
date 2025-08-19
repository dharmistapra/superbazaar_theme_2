"use client"
import { useEffect, useState } from "react"
import ProductData from "@/app/data/HomeProductData"
import ProductCard from "../Cards/ProductCards"
const Products = () => {
  const [tabsData, setTabsData] = useState([])
  const [active, setActive] = useState("")
  useEffect(() => {
    setTabsData(ProductData)
    if (ProductData.length > 0) {
      setActive(ProductData[0].url)
    }
  }, [])

  const activeTabData = tabsData.find((tab) => tab.url === active)

  return (
    <div className="container mx-auto px-4 mt-10">
      <div className="w-full flex justify-center items-center gap-8 ">
        {tabsData.map((tab) => (
          <button
            key={tab.url}
            onClick={() => setActive(tab.url)}
            className={`pb-2 text-lg font-medium transition-colors duration-300 
              ${active === tab.url
                ? "text-black border-b-2 border-black"
                : "text-gray-500 hover:text-black"}`}
          >
            {tab.title}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mt-6">
        {activeTabData?.products?.map((product, idx) => (
          <ProductCard key={idx} data={product} />
        ))}
      </div>
    </div>
  )
}

export default Products