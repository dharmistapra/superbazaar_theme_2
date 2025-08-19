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
        <div className="container mx-auto px-4 mt-7 ">
            <h1 className="text-3xl text-center font-normal mb-6 ">Top Categories</h1>
            <Swiper
                modules={[Autoplay]}
                loop={true}
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                spaceBetween={20}
                slidesPerView={7}>
                {data.map((item, index) => (
                    <SwiperSlide key={index} className="flex justify-center">
                        <Link href={item.link} className="block">
                            <Image
                                src={item.image}
                                alt={`Category ${index}`}
                                width={200}
                                height={200}
                                className="object-cover  border shadow-sm hover:scale-105 transition"
                            />
                        </Link>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}

export default Topcategories
