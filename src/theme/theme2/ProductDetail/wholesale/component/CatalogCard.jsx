// components/ProductCard.jsx
import Link from "next/link";
import { Heart } from "lucide-react";
import Image from "next/image";
import { ImageUrl } from "@/helper/imageUrl";
import PriceConverter from "@/components/PriceConverter";
import WishlistButton from "@/components/cards/attribute/WishlistButton";

const CatalogCard = ({ product, category }) => {
    console.log(product.id, "<================ catalog card");

    return (
        <div >
            <div className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow relative">

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
                        <div className="absolute top-3 right-3 z-10">
                            <WishlistButton catalogueId={product.id} type="catalogue" variant="detail" />
                        </div>
                    </div>
                </div>

                {/* Product Details */}
                <div className="text-center p-2 bg-gray-50">
                    <h3 className=" font-semibold text-sm ">
                        {/* <Link href="/catalogue/new-arrivals/georgette-readymade-palazzo-set-jasmine"> */}
                        <p className="line-clamp-1 text-left">{product.name}</p>
                        {/* </Link> */}
                    </h3>

                    <div className="flex justify-between mt-2 text-sm">
                        <div className="hidden sm:block">
                            <div><PriceConverter price={product.average_price} /></div>
                            <span className="text-gray-500 text-xs">AVG PRICE</span>
                        </div>
                        <div>
                            <div><PriceConverter price={product.offer_price} /></div>
                            <span className="text-gray-500 text-xs  text-center">FULL PRICE</span>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default CatalogCard;
