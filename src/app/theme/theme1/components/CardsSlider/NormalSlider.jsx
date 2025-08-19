"use client"
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, Navigation } from "swiper/modules"
import "swiper/css" 
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import image1 from "../../../../Assets/Image/product1.webp"
import image2 from "../../../../Assets/Image/product3.webp"
import image3 from "../../../../Assets/Image/product4.webp"
import image4 from "../../../../Assets/Image/product5.webp"
import image5 from "../../../../Assets/Image/product6.webp"
import image6 from "../../../../Assets/Image/product7.webp"
import image7 from "../../../../Assets/Image/product8.webp"
import image8 from "../../../../Assets/Image/product9.webp"

const NormalSliderCard = () => {
  const sliderdata = [
    image1, image2, image3, image4,
    image5, image6, image7, image8,
  ]

  return (
    <div className="container mx-auto px-4 mt-7 relative">
      <div className="absolute top-1/2 -left-4 z-10 -translate-y-1/2">
        <button className="swiper-button-prev bg-white p-2 rounded-full shadow-md hover:bg-gray-100">
          <ChevronLeft className="font-bold" size={24}/>
        </button>
      </div>
      <div className="absolute top-1/2 -right-4 z-10 -translate-y-1/2">
        <button className="swiper-button-next bg-white p-2 rounded-full shadow-md hover:bg-gray-100">
          <ChevronRight className="font-bold" size={24}/>
        </button>
      </div>

      <Swiper
        grabCursor
        loop={true}
        slidesPerView="auto"
        spaceBetween={20}
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
      >
        {sliderdata.map((item, index) => (
          <SwiperSlide key={index} className="!w-64 !h-[380px]">
            <div className="w-full h-full rounded-xl overflow-hidden shadow-lg bg-white">
              <Image
                src={item}
                alt={`Slide ${index + 1}`}
                width={256}
                height={350}
                className="w-full h-full "
                priority={index === 0}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default NormalSliderCard
