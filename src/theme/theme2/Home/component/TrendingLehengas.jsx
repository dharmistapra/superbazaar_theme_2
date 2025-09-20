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
import { useEffect, useMemo } from "react";

// Simple skeleton placeholder
const ProductSkeleton = () => (
    <div className="h-60 w-40 bg-gray-200 animate-pulse rounded" />
);

const TrendingLehengas = ({ tabsData, webSetting, isLoading }) => {
    const memoizedTabsData = useMemo(() => {
        return Array.isArray(tabsData)
            ? tabsData.map(block => ({
                ...block,
                filteredProducts: webSetting?.purchaseType === "retail"
                    ? block?.products || []
                    : block?.catalogue || []
            }))
            : [];
    }, [tabsData]);

    return (
        <div className="mx-auto px-4 mt-15 w-full sm:max-w-[540px] md:max-w-[720px] lg:max-w-[960px] xl:max-w-[1240px] 2xl:max-w-[1320px]">
            {isLoading ? (
                <div className="flex gap-4">
                    {[...Array(4)].map((_, i) => (
                        <ProductSkeleton key={i} />
                    ))}
                </div>
            ) : (

                memoizedTabsData.map((block, idx) => (
                    <div key={idx} className="mb-12">
                        {/* Section Header */}
                        <div className="flex justify-between items-center mb-6">
                            <p className="text-[#222222] text-[20px] font-semibold text-center">
                                {block.title}
                            </p>

                            <Link
                                href={
                                    webSetting.purchaseType === "retail"
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
                            <SliderNavigation
                                position="center"
                                prevClass={`swiper-button-prev-${idx}`}
                                nextClass={`swiper-button-next-${idx}`}
                            />
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
                                    nextEl: `.swiper-button-next-${idx}`,
                                    prevEl: `.swiper-button-prev-${idx}`,
                                }}
                                modules={[Autoplay, Navigation]}
                                className="w-full"
                                breakpoints={{
                                    0: { slidesPerView: 2, spaceBetween: 10 },
                                    360: { slidesPerView: 2, spaceBetween: 12 },
                                    480: { slidesPerView: 2, spaceBetween: 14 },
                                    640: { slidesPerView: 3, spaceBetween: 16 },
                                    768: { slidesPerView: 3, spaceBetween: 18 },
                                    1024: { slidesPerView: 3, spaceBetween: 20 },
                                    1280: { slidesPerView: 4, spaceBetween: 24 },
                                }}
                            >
                                {block.filteredProducts.map((data, i) => (
                                    <SwiperSlide key={i} className="flex justify-center">
                                        {webSetting?.purchaseType === "retail" ? (
                                            <ProductCard
                                                key={data.id}
                                                product={data}
                                                webSetting={webSetting}
                                                pathname={webSetting.purchaseType === "retail"
                                                    ? `/retail/${block.url}/${data?.url || "/"}`
                                                    : `/wholesale/${block.url}/${data?.url || "/"}`
                                                }
                                            />
                                        ) : (
                                            <CatalogCard
                                                product={data}
                                                category={block.url}
                                            />
                                        )}
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
                    </div>
                ))
            )}
        </div >
    );
};

export default TrendingLehengas;
