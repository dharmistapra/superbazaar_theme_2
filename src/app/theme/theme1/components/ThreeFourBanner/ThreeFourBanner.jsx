"use client"
import Image from "next/image"
const ThreeFourBanner = ({ data ,bannergrid=4 }) => {
  return (
    <div className="container mx-auto px-4 mt-7">
      <div className={`grid ${bannergrid === 3? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4" :"grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4"}`}>
        {data?.map((item, index) => (
          <div
            key={index}
            className="w-full rounded-lg overflow-hidden shadow hover:scale-105 transition-transform"
          >
            <Image
              src={item?.image}
              alt={item?.title || "Banner"}
              width={400}   
              height={400}
              className="w-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default ThreeFourBanner
