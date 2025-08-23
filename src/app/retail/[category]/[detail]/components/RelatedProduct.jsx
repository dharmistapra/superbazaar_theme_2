import { Pagination, Autoplay, Navigation } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import SliderNavigation from "@/app/theme/theme1/components/CardsSlider/SliderNavigation"
import ProductCard from "@/app/theme/theme1/components/Cards/ProductCards"
import ProductData from "@/app/data/HomeProductData"
const RealtedProduct=()=>{
    return(
         <div className="relative"> 
         <SliderNavigation position="center" />

        <Swiper
          grabCursor
          loop={true}
          slidesPerView="auto"
          spaceBetween={1}
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
            0: { slidesPerView: 2 },
            480: { slidesPerView: 2 },
            640: { slidesPerView: 3 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 4 },
          }}>
          {ProductData?.[0]?.products?.map((product, index) => (
            <SwiperSlide key={index} className="flex justify-center h:md-100" style={{ width: '320px' }} > 
              <ProductCard data={product} />
            </SwiperSlide>
          ))}
        </Swiper>
        </div>
        
    )
}

export default RealtedProduct