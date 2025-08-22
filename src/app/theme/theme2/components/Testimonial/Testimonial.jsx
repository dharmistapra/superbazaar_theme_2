"use client";

import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const testimonials = [{ name: "Hamlet Tuong", text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry...", image: "https://cdn.superbazaar.in/uploads/testimonial/1739791652064-280532059.jpg", rating: 5, }, { name: "Darshana Viswanathan", text: "What you see is what you get, really worth every bit. I have bought twice and I have no regrets...", image: "https://cdn.superbazaar.in/uploads/testimonial/1739791687042-941120435.jpg", rating: 5, }, { name: "Rohit Singh", text: "Here you will find very good stufs, A Huge collection of Designer sarees, Lehenga's...", image: "https://cdn.superbazaar.in/uploads/testimonial/1739791624138-511016228.jpg", rating: 5, }, { name: "Sandhya Gupta", text: "The Best Wholesaler. The quality of merchandise is exceptional and the customer service is top class...", image: "https://cdn.superbazaar.in/uploads/testimonial/1739791633055-320089774.jpg", rating: 5, }, { name: "Sneh Prasad", text: "The Best Wholesaler. The quality of merchandise is exceptional and the customer service is top class...", image: "https://cdn.superbazaar.in/uploads/testimonial/1739791642543-434870092.jpg", rating: 5, },];

const Testimonial = () => {
  return (
    <section className="testimonial-wrapper py-8 bg-gray-50 mt-3 mb-3">
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
              <div className="bg-white rounded-lg shadow-xl p-6 flex flex-col items-center text-center border-2 border-gray-100 ">
                <div className="w-24 h-28 mb-4 rounded-full overflow-hidden">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    width={96}
                    height={96}
                    className="object-cover mx-auto"
                  />
                </div>
                <p className="text-gray-700 text-sm mb-4">
                  {testimonial.text}
                </p>
                <div className="flex gap-1 mb-3">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg
                      key={i}
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill={i < testimonial.rating ? "#FBBF24" : "none"}
                      stroke="#FBBF24"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M12 2l3 6 6 .9-4.5 4.5 1 6-5.5-3-5.5 3 1-6L3 8.9 9 8z" />
                    </svg>
                  ))}
                </div>
                <p className="font-semibold text-gray-800">
                  {testimonial.name}
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