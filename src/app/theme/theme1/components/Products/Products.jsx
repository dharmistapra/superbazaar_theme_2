"use client"
import { useEffect, useState } from "react"
import ProductData from "@/app/data/HomeProductData"
import ProductCard from "../Cards/ProductCards"
import { Swiper, SwiperSlide } from "swiper/react"
import { Pagination, Autoplay, Navigation } from "swiper/modules"
import "swiper/css"
import "swiper/css/pagination"
import SliderNavigation from "../CardsSlider/SliderNavigation"

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
    <div className="container mx-auto px-4 mt-15 mb-20">
      <div className="w-full flex justify-center items-center gap-8 mb-10">
        {tabsData.map((tab) => (
          <button
      key={tab.url}
      onClick={() => setActive(tab.url)}
      className={`pb-2 text-sm sm:text-base md:text-lg lg:text-xl font-medium transition-colors duration-300
        ${active === tab.url
          ? "text-black border-b-2 border-black"
          : "text-gray-500 hover:text-black"}`}
    >
      {tab.title}
    </button>
        ))}
      </div>
      <div className="relative">
        <SliderNavigation position="center" />

        <Swiper
          grabCursor
          loop={true}
          slidesPerView="auto"
          spaceBetween={1}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
          modules={[Autoplay, Navigation]}
          className="w-full"
           breakpoints={{
            0: { slidesPerView: 2 },
            480: { slidesPerView: 2 },
            640: { slidesPerView: 3 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 5 },
          }}
        >
          {activeTabData?.products?.map((product, index) => (
            <SwiperSlide key={index} className="flex justify-center h:md-100"> 
              <ProductCard data={product} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  )
}

export default Products
