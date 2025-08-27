"use client"
import { Swiper, SwiperSlide } from "swiper/react"
import { Pagination, Autoplay, EffectCoverflow } from "swiper/modules"
import "swiper/css"
import "swiper/css/pagination"
import "swiper/css/effect-coverflow"
import Image from "next/image"
import { ImageUrl } from "@/helper/imageUrl"

const CardsSlider3D = ({ slides }) => {
  return (
    <div className="w-full bg-gradient-to-r from-indigo-100 via-white to-indigo-100 py-10 mt-10">
      <h1 className="text-3xl text-center font-normal mb-6">Cards Slider</h1>

      <Swiper
        effect="coverflow"
        grabCursor
        centeredSlides={true}
        loop={true}
        slidesPerView="auto" 
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 120,
          modifier: 2.5,
          slideShadows: true,
        }}
        pagination={{ clickable: true }}
        modules={[Autoplay, EffectCoverflow, Pagination]}
className="max-w-6xl mx-auto"       >
        {slides.map((item, index) => (
          <SwiperSlide
            key={index}
            className="!w-[320px] !h-[400px]"
          >
              <Image
                src={ImageUrl(item.image)}
                alt={`Slide ${index + 1}`}
                fill
                className="rounded-lg shadow-lg"
              />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default CardsSlider3D
