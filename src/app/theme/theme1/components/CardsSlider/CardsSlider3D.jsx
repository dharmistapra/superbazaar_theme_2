"use client"
import { Swiper, SwiperSlide } from "swiper/react"
import { Pagination, Autoplay, EffectCoverflow } from "swiper/modules"
import "swiper/css"
import "swiper/css/pagination"
import "swiper/css/effect-coverflow"
import Image from "next/image"

import image1 from "../../../../Assets/Image/product1.webp"
import image2 from "../../../../Assets/Image/product3.webp"
import image3 from "../../../../Assets/Image/product4.webp"
import image4 from "../../../../Assets/Image/product5.webp"
import image5 from "../../../../Assets/Image/product6.webp"
import image6 from "../../../../Assets/Image/product7.webp"
import image7 from "../../../../Assets/Image/product8.webp"
import image8 from "../../../../Assets/Image/product9.webp"

const CardsSlider3D = () => {
  const sliderdata = [image1, image2, image3, image4, image5, image6, image7, image8]

  return (
    <div className="w-full bg-gradient-to-r from-indigo-100 via-white to-indigo-100  py-10 mt-10">
      <h1 className="text-3xl text-center font-normal mb-6 ">Cards Slider</h1>

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
          rotate: 12,
          stretch: 0,
          depth: 150,
          modifier: 2,
          slideShadows: false,
        }}
        pagination={{ clickable: true }}
        modules={[Autoplay, EffectCoverflow, Pagination]}
        className="max-w-6xl mx-auto"
      >
        {sliderdata.map((item, index) => (
          <SwiperSlide
            key={index}
            className="!w-64 !h-100 flex items-center justify-center"
          >
            <div className="w-full h-full rounded-xl overflow-hidden shadow-lg bg-white">
              <Image
                src={item}
                alt={`Slide ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default CardsSlider3D
