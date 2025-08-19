"use client"
import Image from "next/image"
import Link from "next/link"
import { ComapreButton, QuickViewButton, WishlistButton } from "./CardsButton"

const ProductCard = ({ data }) => {
    return (
        <div className="group relative w-full  bg-white rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 p-2">
            <div className="relative w-full h-95">
                <Image
                    src={data?.image?.[0] || "/banner1.webp"}
                    alt={data?.name || "Product"}
                    fill
                    className=" rounded-md transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute top-2 right-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <WishlistButton />
                    <QuickViewButton />
                    <ComapreButton />
                </div>
            </div>
            <div className="mt-4">
                <Link href={data?.link || "/link"}>
                    <h3 className="text-sm font-medium text-gray-700 hover:text-black line-clamp-2">
                        {data?.title || "Ribbed cotton-blend top"}
                    </h3>
                </Link>
                <div className="flex items-center gap-2 mt-1">
                    <span className="text-grey-600  text-sm font-normal">
                        ₹{data?.offerPrice || "999"}
                    </span>
                    {data?.price && (
                        <span className="text-gray-400 line-through text-sm font-normal">
                            ₹{data?.price}
                        </span>
                    )}
                    {data?.price && data?.offerPrice && (
                        <span className="text-grey-300 text-sm font-normal">
                            {Math.round(((data.price - data.offerPrice) / data.price) * 100)}% OFF
                        </span>
                    )}
                </div>
            </div>
        </div>
    )
}

export default ProductCard
