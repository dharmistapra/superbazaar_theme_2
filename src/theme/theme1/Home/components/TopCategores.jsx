"use client"
import Image from "next/image"
import Denims from "../../../../Assets/Image/Denims.webp"
import Dress from "../../../../Assets/Image/Dress.webp"
import Footwear from "../../../../Assets/Image/footwear.webp"
import Handbags from "../../../../Assets/Image/Handbags.webp"
import Kids from "../../../../Assets/Image/Kids.webp"
import Shirts from "../../../../Assets/Image/Shirts.webp"
import TShirts from "../../../../Assets/Image/TShirts.webp"
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay } from "swiper/modules"
import Link from "next/link"
import "swiper/css"
const data = [
    { image: Shirts, link: "/shirts" },
    { image: TShirts, link: "/tshirts" },
    { image: Denims, link: "/denims" },
    { image: Dress, link: "/dress" },
    { image: Kids, link: "/kids" },
    { image: Footwear, link: "/footwear" },
    { image: Handbags, link: "/handbags" },
    { image: Shirts, link: "/shirts" }]

const Topcategories = () => {
    return (
        <div className="mx-auto px-4 mt-7  
  w-full 
  sm:max-w-[540px] 
  md:max-w-[720px] 
  lg:max-w-[960px] 
  xl:max-w-[1240px] 
  2xl:max-w-[1320px]">
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-3xl text-center font-normal mb-6">
  Shop by categories
</h1>

            <Swiper
  modules={[Autoplay]}
  loop={true}
  autoplay={{ delay: 3000, disableOnInteraction: false }}
  spaceBetween={20}
  breakpoints={{
    0: { slidesPerView: 3 },  
    640: { slidesPerView: 4 },  
    768: { slidesPerView: 5 },  
    1024: { slidesPerView: 6 }, 
    1280: { slidesPerView: 7 } 
  }}
>
  {data.map((item, index) => (
    <SwiperSlide key={index} className="flex justify-center">
      <Link href={item.link} className="block">
        <div className="w-24 sm:w-28 md:w-32 lg:w-36 xl:w-40 aspect-square">
          <Image
            src={item.image}
            alt={`Category ${index}`}
            fill
            className="object-cover border shadow-sm hover:scale-105 transition-transform duration-300"
          />
        </div>
      </Link>
    </SwiperSlide>
  ))}
</Swiper>

        </div>
    )
}

export default Topcategories
