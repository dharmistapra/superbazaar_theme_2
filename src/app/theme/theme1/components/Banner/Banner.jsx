"use client"
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
const Banner = () => {
    const slides = [
        { id: 1, image: "/banner1.webp", alt: "Banner 1" },
        { id: 2, image: "/banner2.webp", alt: "Banner 2" },
        { id: 3, image: "/banner3.webp", alt: "Banner 3" },
    ];

    return (
        <div className="w-full">
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
                            className="w-full h-[450px] object-cover rounded-lg"
                        />
                    </SwiperSlide>
                ))}
            </Swiper>

            <style jsx global>{`
        .swiper-pagination {
          bottom: 15px !important;
          display: flex;
          justify-content: center;
          gap: 12px; /* bullets ke beech gap */
        }

        .swiper-pagination-bullet {
          position: relative;
          width: 16px;   
          height: 16px;
          background: transparent;
          border-radius: 50%;
          border: 2px solid #fff;  
          opacity: 1;
          transition: all 0.3s;
          box-sizing: border-box;
        }

        .swiper-pagination-bullet::after {
          content: "";
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 5px;  
          height: 5px;
          background: white;
          border-radius: 50%;
        }

        .swiper-pagination-bullet-active::after {
          width: 9px;   
          height: 9px;
        }
      `}</style>
        </div>
    );
};

export default Banner;
