"use client"
import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react"
import { Pagination, Autoplay } from "swiper/modules"

const Hero = () => {
    const banners = [
        "https://cdn.superbazaar.in/uploads/homeBanner/desktop/1751348504025-226916941.webp",
        "https://cdn.superbazaar.in/uploads/homeBanner/desktop/1751352584027-647670880.webp",
        "https://cdn.superbazaar.in/uploads/homeBanner/desktop/1751352597318-985055818.webp",
        "https://cdn.superbazaar.in/uploads/homeBanner/desktop/1753075411720-460759712.jpg",
    ]

    return (
        <section className="slideshow-wrapper mb-4">
            <Swiper
                modules={[Pagination, Autoplay]}
                pagination={{ clickable: true }}
                autoplay={{ delay: 3000 }}
                loop={true}
                className="w-full h-[400px] md:h-[auto]"
            >
                {banners.map((src, index) => (
                    <SwiperSlide key={index}>
                        <img
                            src={src}
                            alt={`Banner ${index + 1}`}
                            className="w-full h-full object-cover"
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    )
}

export default Hero
