"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import SliderNavigation from "@/theme/theme1/components/CardsSlider/SliderNavigation";
import CatalogueCard from "@/components/cards/CatalogueCard";
import Link from "next/link";
import CatalogCard from "../../ProductDetail/wholesale/component/CatalogCard";
import ProductCard from "../../ProductComponent/ProductCard";

const TrendingLehengas = ({ tabsData = [], purchaseType }) => {
    return (
        <div className="mx-auto px-4 mt-15 w-full sm:max-w-[540px] md:max-w-[720px] lg:max-w-[960px] xl:max-w-[1240px] 2xl:max-w-[1320px]">
            {Array.isArray(tabsData) && tabsData.map((block, idx) => {
                const products = purchaseType === "wholesale" ? block?.products?.catalogue : block?.products?.products;
                return (
                    <div key={idx} className="mb-12">
                        {/* Section Header */}
                        <div className="flex justify-between items-center mb-6">
                            <p className="text-[#222222] text-[20px] font-semibold text-center">
                                {block.title}
                            </p>

                            <Link
                                href={
                                    purchaseType === "retail"
                                        ? `/retail/${block.url}`
                                        : `/wholesale/${block.url}`
                                }
                                className="text-sm md:text-base font-bold hover:text-red-400 transition"
                            >
                                View All →
                            </Link>

                        </div>

                        {/* Slider */}
                        <div className="relative">
                            <SliderNavigation position="center" />
                            <Swiper
                                grabCursor
                                loop
                                slidesPerView="auto"
                                spaceBetween={20}
                                autoplay={{
                                    delay: 2500,
                                    disableOnInteraction: false,
                                }}
                                navigation={{
                                    nextEl: ".swiper-button-next",
                                    prevEl: ".swiper-button-prev",
                                }}
                                modules={[Autoplay, Navigation]}
                                className="w-full"
                                breakpoints={{
                                    0: { slidesPerView: 2, spaceBetween: 10 }, // 📱 small screens
                                    360: { slidesPerView: 2, spaceBetween: 12 },
                                    480: { slidesPerView: 2, spaceBetween: 14 },
                                    640: { slidesPerView: 3, spaceBetween: 16 },
                                    768: { slidesPerView: 3, spaceBetween: 18 },
                                    1024: { slidesPerView: 3, spaceBetween: 20 },
                                    1280: { slidesPerView: 4, spaceBetween: 24 },
                                }}
                            >
                                {Array.isArray(products) &&
                                    products.map((data, i) => {
                                        return (
                                            <SwiperSlide key={i} className="flex justify-center">
                                                {purchaseType === "wholesale" ? (
                                                    <CatalogCard product={data} category={block.url} />
                                                ) : (
                                                    <ProductCard
                                                        key={data.id}
                                                        product={data}
                                                        pathname={`${block.url}/${data?.url || "/"}`}
                                                    />
                                                    // <ProductCard data={data} />
                                                )}
                                            </SwiperSlide>
                                        )
                                    })}
                            </Swiper>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default TrendingLehengas;
