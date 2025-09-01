"use client";
import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";
import { ImageUrl } from "@/helper/imageUrl";

const ProductCard = ({ product, pathname }) => {
    if (!product) return null;

    return (
        <div className="single-product-card bg-white rounded-md shadow hover:shadow-lg transition overflow-hidden">
            <div className="product-image relative">
                <Link
                    href={`${pathname}`}
                    className="product-img hover-image-container block relative group"
                >
                    <Image
                        src={ImageUrl(product?.mediumImage?.[0])}
                        alt={product?.name || "Product"}
                        title={product?.name || "Product"}
                        width={274}
                        height={480}
                        className="w-full object-cover bg-gray-100 transition duration-300"
                        loading="eager"
                        priority
                    />
                    {product?.mediumImage?.[1] && (
                        <Image
                            src={ImageUrl(product?.mediumImage?.[1])}
                            alt={product?.name || "Product"}
                            title={product?.name || "Product"}
                            width={274}
                            height={480}
                            className="hover-image w-full object-cover absolute top-0 left-0 opacity-0 group-hover:opacity-100 transition duration-300"
                            loading="eager"
                        />
                    )}

                    {/* Wishlist Button */}
                    <div className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <button className="bg-white p-2 shadow rounded-md hover:bg-black hover:text-white transition-colors duration-200 flex items-center justify-center">
                            <Heart size={20} className="text-gray-600 hover:text-white" />
                        </button>
                    </div>
                </Link>
            </div>

            <div className="product-details text-start mt-2 p-2">
                <div className="product-name text-truncate font-semibold text-sm mb-1">
                    <Link
                        href={`${pathname}}`}
                        className="text-gray-800 hover:text-amber-700 transition"
                    >
                        {product?.name?.length > 33
                            ? product?.name?.slice(0, 33) + "..."
                            : product?.name}
                    </Link>
                </div>

                {/* Product Price */}
                <div className="product-price flex justify-between items-center gap-2">
                    <span className="price text-red-600 font-bold text-sm">
                        Rs {product?.offer_price}
                    </span>
                    {product?.price && product?.price > product?.offer_price && (
                        <span className="line-through text-gray-500 text-xs">
                            Rs {product?.price}
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
