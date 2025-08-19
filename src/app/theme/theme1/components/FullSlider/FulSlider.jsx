"use client"
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
const FullSlider = () => {
    const slides = [
        { id: 1, image: "/banner1.webp", alt: "Banner 1" },
        { id: 2, image: "/banner2.webp", alt: "Banner 2" },
        { id: 3, image: "/banner3.webp", alt: "Banner 3" },
    ];

    return (
        <div className="container mx-auto px-4 mt-10">
            <Swiper
                modules={[Pagination, Autoplay]}
                loop={true}
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                pagination={{ clickable: true }}
                className="rounded-lg"
            >
                {slides.map((slide) => (
                    <SwiperSlide key={slide.id}>
                        <img
                            src={slide.image}
                            alt={slide.alt}
                            className="w-full h-[400px] object-cover rounded-lg"
                        />
                    </SwiperSlide>
                ))}
            </Swiper>

         
        </div>
    );
};

export default FullSlider;
