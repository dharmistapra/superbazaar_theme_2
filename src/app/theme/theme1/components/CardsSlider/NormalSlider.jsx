"use client"
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, Navigation } from "swiper/modules"
import "swiper/css"
import Image from "next/image"
import SliderNavigation from "./SliderNavigation"

import image1 from "../../../../Assets/Image/product1.webp"
import image2 from "../../../../Assets/Image/product3.webp"
import image3 from "../../../../Assets/Image/product4.webp"
import image4 from "../../../../Assets/Image/product5.webp"
import image5 from "../../../../Assets/Image/product6.webp"
import image6 from "../../../../Assets/Image/product7.webp"
import image7 from "../../../../Assets/Image/product8.webp"
import image8 from "../../../../Assets/Image/product9.webp"

const NormalSliderCard = () => {
  const sliderData = [image1, image2, image3, image4, image5, image6, image7, image8]

  return (
    <div className="container mx-auto px-4 mt-7">
      <div className="relative">
        <SliderNavigation position="center" />

        <Swiper
          loop
          grabCursor
          autoplay={{ delay: 2500, disableOnInteraction: false }}
          navigation={{ nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" }}
          modules={[Autoplay, Navigation]}
          spaceBetween={20}
          className="w-full"
          breakpoints={{
            0: { slidesPerView: 2 },
            480: { slidesPerView: 2 },
            640: { slidesPerView: 3 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
            1280: { slidesPerView: 5 },
          }}
        >
          {sliderData.map((item, index) => (
            <SwiperSlide
              key={index}
              className="overflow-hidden shadow-lg bg-white rounded-lg"
            >
              <div className="relative w-full h-60 sm:h-72 md:h-80 lg:h-[400px]">
                <Image
                  src={item}
                  alt={`Slide ${index + 1}`}
                  fill
                  priority={index === 0}
                  className="object-cover"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

    </div>
  )
}

export default NormalSliderCard
