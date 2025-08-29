"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { ArrowRight } from "lucide-react";
import SliderNavigation from "@/theme/theme1/components/CardsSlider/SliderNavigation";

const TrendingLehengas = () => {
    const images = [
        "https://cdn.superbazaar.in/uploads/CmsContent/1747488833450-790946516.webp",
        "https://cdn.superbazaar.in/uploads/CmsContent/1747488843069-530946070.webp",
        "https://cdn.superbazaar.in/uploads/CmsContent/1747488846748-882243746.webp",
        "https://cdn.superbazaar.in/uploads/CmsContent/1747488855700-382435072.webp",
        "https://cdn.superbazaar.in/uploads/CmsContent/1748249009061-532972852.jpg",
        "https://cdn.superbazaar.in/uploads/CmsContent/1753264794681-578982304.webp",
    ];

    // refs for navigation buttons
    const prevRef = useRef(null);
    const nextRef = useRef(null);

    return (
        <div className="container mx-auto px-4 mt-3 mb-0">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-3">
                <div className="text-center">
                    <h1 className="text-8xl sm:text-xl ">Trending Lehengas</h1>
                </div>
                <Link
                    href="/retail/lehengas"
                    className="inline-flex items-center justify-center px-4 py-2 text-sm sm:text-base font-bold hover:text-pink-600 transition"
                >
                    View All
                    <ArrowRight className="ml-2" />
                </Link>
            </div>

            <div className="relative">
                <SliderNavigation position="center" ref={prevRef} />
                <Swiper
                    modules={[Navigation, Pagination, Autoplay]}
                    navigation={{ prevEl: prevRef.current, nextEl: nextRef.current }}
                    onBeforeInit={(swiper) => {
                        swiper.params.navigation.prevEl = prevRef.current;
                        swiper.params.navigation.nextEl = nextRef.current;
                    }}
                    pagination={{ clickable: true }}
                    autoplay={{ delay: 3000 }}
                    loop
                    spaceBetween={16}
                    slidesPerView={2}
                    breakpoints={{
                        320: { slidesPerView: 1 },
                        768: { slidesPerView: 2 },
                        1024: { slidesPerView: 5 },
                    }}
                >
                    {images.map((img, i) => (
                        <SwiperSlide key={i}>
                            <Link href="/" className="relative block">
                                <Image
                                    src={img}
                                    alt={`Slide ${i + 1}`}
                                    width={224}
                                    height={350}
                                    className="w-full h-[350px] object-cover rounded-lg shadow"
                                    unoptimized
                                />
                            </Link>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
};

export default TrendingLehengas;
