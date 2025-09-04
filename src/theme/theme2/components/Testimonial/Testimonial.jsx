"use client";

import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { Star } from "lucide-react";
import { ImageUrl } from "@/helper/imageUrl";


const Testimonial = ({ testimonials }) => {
  return (
    <section className="testimonial-wrapper py-8 bg-gray-50 mt-3 mb-5">
      <div className="container mx-auto px-4">
        <h3 className="text-2xl font-semibold mb-6 text-center">TESTIMONIALS</h3>

        <Swiper
          modules={[Pagination, Autoplay]}
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000 }}
          loop
          spaceBetween={24}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {testimonials.map((testimonial, index) => (
            <SwiperSlide key={index}>
              <div className="bg-white rounded-xl p-6 flex flex-col items-center text-center 
            border border-gray-200 shadow-lg shadow-gray-300/50 hover:shadow-xl transition-all h-80">
                <div className="w-24 h-28 mb-4 rounded-full overflow-hidden">
                  <Image
                    src={ImageUrl(testimonial.image)}
                    alt={testimonial.name}
                    width={96}
                    height={96}
                    className="object-cover mx-auto"
                  />
                </div>
                <p className="text-gray-700 text-sm leading-6 mb-4 line-clamp-3">
                  {testimonial.review}
                </p>

                <div className="flex gap-1 mb-3">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={i < testimonial.rating ? "text-amber-400" : "text-amber-400"}
                      fill={i < testimonial.rating ? "#FBBF24" : "none"}
                    />
                  ))}
                </div>
                <p className="font-semibold text-gray-800">
                  {testimonial.customer_name}
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Testimonial;