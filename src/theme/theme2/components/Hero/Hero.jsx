"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { ImageUrl } from "@/helper/imageUrl";

const Hero = ({ banners }) => {
    return (
        <section className="slideshow-wrapper mb-4">
            <Swiper
                modules={[Pagination, Autoplay]}
                pagination={{ clickable: true }}
                autoplay={{ delay: 3000 }}
                loop={true}
                className="w-full"
            >
                {banners.map((banner, index) => (
                    <SwiperSlide key={index}>
                        <picture>
                            {/* Mobile Image */}
                            <source
                                media="(max-width: 767px)"
                                srcSet={ImageUrl(banner.mobileImage)}
                            />
                            {/* Desktop Image */}
                            <img
                                src={ImageUrl(banner.desktopImage)}
                                alt={`Banner ${index + 1}`}
                                className="w-full h-[auto] sm:h-[auto] md:h-[auto] lg:h-[auto] object-cover"
                            />
                        </picture>
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
};

export default Hero;
