"use client"
import { useEffect, useState } from "react"
import ProductCard from "../Cards/ProductCards"
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, Navigation } from "swiper/modules"
import "swiper/css"
import "swiper/css/pagination"
import SliderNavigation from "../CardsSlider/SliderNavigation"

const Products = ({ tabsData = [] }) => {
  const [active, setActive] = useState("")
  useEffect(() => {
    if (tabsData.length > 0) {
      setActive(tabsData[0].url) 
    }
  }, [tabsData])

  const activeTabData = tabsData.find((tab) => tab.url === active)

  return (
    <div className="mx-auto px-4 mt-15  
  w-full 
  sm:max-w-[540px] 
  md:max-w-[720px] 
  lg:max-w-[960px] 
  xl:max-w-[1140px] 
  2xl:max-w-[1320px]">
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
            1280: { slidesPerView: 4 },
          }}
        >
          {activeTabData?.products?.products?.map((product, index) => (
            <SwiperSlide key={index} className="flex justify-center">
              <ProductCard data={product} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  )
}

export default Products
