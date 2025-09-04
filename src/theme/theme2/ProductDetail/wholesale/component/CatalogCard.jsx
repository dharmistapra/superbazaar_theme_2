// components/ProductCard.jsx
import Link from "next/link";
import { Heart } from "lucide-react";
import Image from "next/image";
import { ImageUrl } from "@/helper/imageUrl";
import PriceConverter from "@/components/PriceConverter";

const CatalogCard = ({ product, category }) => {
    return (
        <div >
            <div className="bg-white rounded-lg overflow-hidden shadow hover:shadow-lg transition-shadow relative">

                {/* Product Image */}
                <div className="relative w-full">
                    <Link href={`/catalogue/${category}/${product.url}`}>
                        <div className="block relative w-full">
                            <Image
                                src={ImageUrl(product.coverImage)}
                                alt="Georgette Readymade Palazzo Set"
                                width={1000}
                                height={1500}
                                className="w-full object-cover bg-gray-200"
                                priority
                            />
                            {/* Top-right badge */}
                            <div className="absolute top-0 right-0 bg-black text-white text-xs font-semibold px-2 py-1 rounded-bl-md">
                                Full Set + Single
                            </div>
                            {/* Bottom-right pcs badge */}
                            <div className="absolute bottom-2 right-2 bg-black text-white text-xs font-medium px-2 py-1 rounded">
                                3 PCS
                            </div>
                        </div>
                    </Link>


                    <div className="absolute top-4 right-2">
                        <button className="p-2 rounded-full bg-white text-gray-700 shadow-md 
                   transition-all duration-300 hover:bg-black hover:text-white hover:shadow-lg">
                            <Heart className=" text-red-500" size={18} />
                            <span className="sr-only">Add to Wishlist</span>
                        </button>
                    </div>
                </div>

                {/* Product Details */}
                <div className="text-center p-2 bg-gray-50">
                    <h3 className="truncate font-semibold text-sm">
                        <Link href="/catalogue/new-arrivals/georgette-readymade-palazzo-set-jasmine">
                            <p className="hover:underline">{product.name}</p>
                        </Link>
                    </h3>

                    <div className="flex justify-between mt-2 text-sm">
                        <div className="hidden sm:block">
                            <div><PriceConverter price={product.average_price} /></div>
                            <span className="text-gray-500 text-xs">AVG PRICE</span>
                        </div>
                        <div>
                            <div>Rs <PriceConverter price={product.offer_price} /></div>
                            <span className="text-gray-500 text-xs hidden sm:block text-center">FULL PRICE</span>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default CatalogCard;
