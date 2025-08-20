"use client"
import { ChevronLeft, ChevronRight } from "lucide-react"

const SliderNavigation = ({ position = "center" }) => {
  return (
    <>
      <div
        className={`absolute top-1/2 -left-4 z-10 -translate-y-1/2 ${
          position === "bottom" ? "top-auto bottom-2 -translate-y-0" : ""
        }`}
      >
        <button className="swiper-button-prev bg-white p-2 rounded-full shadow-md hover:bg-gray-100">
          <ChevronLeft size={24} />
        </button>
      </div>
      <div
        className={`absolute top-1/2 -right-4 z-10 -translate-y-1/2 ${
          position === "bottom" ? "top-auto bottom-2 -translate-y-0" : ""
        }`}
      >
        <button className="swiper-button-next bg-white p-2 rounded-full shadow-md hover:bg-gray-100">
          <ChevronRight size={24} />
        </button>
      </div>
    </>
  )
}

export default SliderNavigation
