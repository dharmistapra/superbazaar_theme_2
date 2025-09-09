import { Autoplay, Navigation } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react";
import SliderNavigation from "@/theme/theme1/components/CardsSlider/SliderNavigation"
import { useEffect, useRef, useState } from "react"
import ProductCard from "@/theme/theme2/ProductComponent/ProductCard";
import { usePathname } from "next/navigation";
import { getRelatedProduct } from "@/services/productService";

const RealtedProduct = ({ url }) => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const pathname = usePathname();
  const [ProductData, setProductData] = useState([])
  const fetchdata = async () => {
    const response = await getRelatedProduct(url)
    setProductData(response.data)
  }

  useEffect(() => {
    fetchdata()
  }, [url])
  return (
    <section className="pb-0 mb-5 mt-5">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-bold text-gray-800">
              You may also like this
            </h2>
            <p className="text-gray-500 text-sm">TOP SALE IN THIS WEEK</p>
          </div>
        </div>

        <div className="relative">
          <SliderNavigation position="center" ref={prevRef} />

          <Swiper
            grabCursor
            loop={true}
            slidesPerView="auto"
            spaceBetween={16}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            navigation={{
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            }}
            modules={[Autoplay, Navigation]}
            breakpoints={{
              0: { slidesPerView: 2, spaceBetween: 10 },
              640: { slidesPerView: 3, spaceBetween: 16 },
              1024: { slidesPerView: 4, spaceBetween: 20 },
            }}
          >
            {ProductData?.map((item, index) => {
              return (
                <SwiperSlide
                  key={item.id || index}
                  className="flex justify-center"
                  style={{ width: "305px" }}
                >
                  <ProductCard product={item} pathname={item.url} />
                </SwiperSlide>
              )
            })}
          </Swiper>
        </div>
      </div>
    </section>
  )
}

export default RealtedProduct
