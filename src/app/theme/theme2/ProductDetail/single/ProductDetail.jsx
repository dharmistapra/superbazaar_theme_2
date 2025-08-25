"use client";

import { useState } from "react";
import { CircleQuestionMark, Heart, MessageCircle, Repeat, Share2 } from "lucide-react";
import OfferBanner from "@/app/components/OfferBanner";
import ProductImageGallery from "./components/ProductImageGallery";
import SizeSelector from "@/app/components/SizeSelector";
import SharePopup from "./components/SharePopup";
import RealtedProduct from "./components/RelatedProduct";
import StitchingForm from "./components/StitchingForm";
import ProductDescription from "./components/ProductDescription";
import StaticImage from "./components/StaticImage";
import Image from "next/image";

const ProductDetailTheme2 = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(null);
  const [errors, setErrors] = useState(null)
  const [wishlist, setWishlist] = useState(false);
  const [compare, setCompare] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);

  const increment = () => setQuantity((prev) => prev + 1);
  const decrement = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const toggleWishlist = () => setWishlist((prev) => !prev);
  const toggleCompare = () => setCompare((prev) => !prev);


  const handleAddtoCart = () => {
    if (product.optionType === "Size" && !selectedSize) {
      return setErrors("Please select size")
    }

  }
  return (
    <>
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap -mx-4">
          {/* Left Column: Images */}
          <div className="w-full md:w-1/2 lg:w-7/12 mb-4 md:pr-4 lg:pr-6 relative">
            <div className="flex flex-col md:flex-row">
              {/* Thumbnails */}
              <div className="flex flex-col space-y-2 mx-3">
                <a href="/retail/sarees/mahotsav-erisha-s3689-to-s3693-designer-saree-erisha-s3692" className="border-2 border-dashed border-gray-800 rounded">
                  <Image
                    src="https://cdn.superbazaar.in/uploads/product/thumb/Erisha_S3692.webp"
                    alt="Thumb 1"
                    className="w-20 h-32 object-cover rounded"
                    width={133}
                    height={200}
                  />
                </a>
                <a href="#" className="border-2 border-dashed border-gray-800 rounded">
                  <Image
                    src="https://cdn.superbazaar.in/uploads/product/thumb/Erisha_S3692-A.webp"
                    alt="Thumb 2"
                    className="w-20 h-32 object-cover rounded"
                    width={133}
                    height={200}
                  />
                </a>
                <a href="#" className="border-2 border-dashed border-gray-800 rounded">
                  <Image
                    src="https://cdn.superbazaar.in/uploads/product/thumb/Erisha_S3692-B.webp"
                    alt="Thumb 3"
                    className="w-20 h-32 object-cover rounded"
                    width={133}
                    height={200}
                  />
                </a>
              </div>

              {/* Main Image */}
              <div className="relative flex-1">
                <img
                  src="https://cdn.superbazaar.in/uploads/product/Erisha_S3692.webp"
                  alt="Product"
                  className="w-full h-auto rounded transition-transform duration-200 ease-out"
                />
                {/* Wishlist Icon */}
                <div className="absolute top-2 right-2">
                  <button className="p-2 bg-white rounded-full shadow hover:bg-red-600 hover:text-white transition">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-heart">
                      <path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5"></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Product Info */}
          <div className="w-full md:w-1/2 lg:w-5/12 mt-4 md:mt-0">
            <div className="sticky top-4">
              <h2 className="text-lg font-medium mb-2">
                Brand: <span className="bg-red-600 text-white px-2 py-1 rounded">Mahotsav Group</span>
              </h2>
              <h1 className="text-2xl font-semibold mb-1">Green Georgette Casual Sequins Work Saree</h1>
              <p className="text-gray-600 mb-2">SKU: Erisha-S3692</p>
              <div className="mb-4">
                <span className="line-through text-gray-400">Rs 1443.00</span>
              </div>

              {/* Stitching Options */}
              <div className="mb-4">
                <details className="border-b py-2">
                  <summary className="cursor-pointer font-semibold">Stitching</summary>
                  <div className="mt-2 space-y-2">
                    <label className="flex flex-col md:flex-row items-start gap-2 cursor-pointer">
                      <input type="radio" name="stitchingOption" value="Unstitch" defaultChecked className="mt-1" />
                      <span>Unstitch – Rs 0.00</span>
                      <span className="text-red-600 text-sm">(Same day dispatch)</span>
                    </label>
                    <label className="flex flex-col md:flex-row items-start gap-2 cursor-pointer">
                      <input type="radio" name="stitchingOption" value="Standard Stitching" className="mt-1" />
                      <span>Standard Stitching – Rs 400.00</span>
                      <span className="text-red-600 text-sm">(4-5 Days dispatch)</span>
                    </label>
                    <label className="flex flex-col md:flex-row items-start gap-2 cursor-pointer">
                      <input type="radio" name="stitchingOption" value="Custom Stitching" className="mt-1" />
                      <span>Custom Stitching – Rs 800.00</span>
                      <span className="text-red-600 text-sm">(8-9 Days dispatch)</span>
                    </label>
                  </div>
                </details>

                {/* Product Details */}
                <details className="border-b py-2 mt-2">
                  <summary className="cursor-pointer font-semibold">Product Details</summary>
                  <div className="mt-2 text-left">
                    <table className="table-auto w-full text-sm">
                      <tbody>
                        <tr>
                          <td className="font-semibold w-1/3">Fabric</td>
                          <td>Georgette</td>
                        </tr>
                        <tr>
                          <td className="font-semibold w-1/3">Color</td>
                          <td>
                            <span className="inline-block w-5 h-5 rounded-full bg-green-500"></span>
                          </td>
                        </tr>
                        <tr>
                          <td className="font-semibold w-1/3">Occasion</td>
                          <td>Daily Wear</td>
                        </tr>
                        <tr>
                          <td className="font-semibold w-1/3">Work</td>
                          <td>Sequins Work</td>
                        </tr>
                      </tbody>
                    </table>
                    <p className="mt-2">
                      Catalog: <a href="#" className="text-blue-600 underline">View Full Catalog</a>
                    </p>
                  </div>
                </details>
              </div>

              {/* Add to Cart */}
              <div className="flex flex-col md:flex-row gap-2 items-center mt-4">
                <div className="flex items-center gap-2">
                  <button className="px-3 py-1 border rounded disabled:opacity-50">-</button>
                  <input type="text" value="1" readOnly className="w-12 text-center border rounded" />
                  <button className="px-3 py-1 border rounded">+</button>
                </div>
                <button className="bg-red-600 text-white px-4 py-2 rounded shadow hover:bg-red-700 transition">Add to Cart</button>
              </div>
            </div>
          </div>
        </div>

        {/* Similar Products */}
        <div className="mt-10">
          <h2 className="text-xl font-semibold mb-4">Similar Products</h2>
          <div className="flex gap-2 overflow-x-auto">
            <a href="#" className="flex-shrink-0 border rounded">
              <img src="https://cdn.superbazaar.in/uploads/product/Erisha_S3689.webp" alt="Thumb 1" className="w-24 h-24 object-cover rounded" />
            </a>
            <a href="#" className="flex-shrink-0 border rounded">
              <img src="https://cdn.superbazaar.in/uploads/product/Erisha_S3690.webp" alt="Thumb 2" className="w-24 h-24 object-cover rounded" />
            </a>
            <a href="#" className="flex-shrink-0 border rounded">
              <img src="https://cdn.superbazaar.in/uploads/product/Erisha_S3691.webp" alt="Thumb 3" className="w-24 h-24 object-cover rounded" />
            </a>
            <a href="#" className="flex-shrink-0 border rounded">
              <img src="https://cdn.superbazaar.in/uploads/product/Erisha_S3693.webp" alt="Thumb 4" className="w-24 h-24 object-cover rounded" />
            </a>
          </div>
        </div>
      </div>

      {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ProductImageGallery
          images={product.image}
          thumbs={product.thumbImage} />
        <div className="flex flex-col gap-4 md:gap-4">
          <div>
            <h1 className="text-2xl font-bold">{product.name}</h1>
            <p className="text-gray-500 mt-1">{product.sku}</p>
            <p className="text-xl font-semibold mt-2">
              ₹{product.offer_price.toLocaleString()}
            </p>
          </div>
          <p className="flex items-center gap-2 bg-slat-100 text-zinc-800 font-medium px-3 py-1 rounded-lg w-fit">
            <span className="font-bold">⏱</span> Dispatch Time: 7 Working Days
          </p>
          <OfferBanner discount={50} />
          {/* {product.optionType === "Size" && (
            <div className="-mt-1">
              <SizeSelector
                sizes={product.sizes || ["S", "M", "L", "XL"]}
                onChange={setSelectedSize}
                errors={errors}
                setErrors={setErrors}
              />
            </div>)} *


      <StitchingForm />
      <div className="flex items-center gap-4 mt-4">
        <div className="flex items-center border rounded-lg overflow-hidden w-40">
          <button
            onClick={decrement}
            className="w-12 py-2 bg-gray-200 hover:bg-gray-300 transition text-lg font-bold">
            -
          </button>
          <span className="flex-1 text-center py-2 text-lg font-medium">
            {quantity}
          </span>
          <button
            onClick={increment}
            className="w-12 py-2 bg-gray-200 hover:bg-gray-300 transition text-lg font-bold">
            +
          </button>
        </div>
        <button
          onClick={toggleWishlist}
          className={`p-2 rounded-lg border transition ${wishlist
            ? "bg-zinc-900 text-white border-zinc-900"
            : "bg-white text-gray-700 border-zinc-900 hover:bg-zinc-900 hover:text-white"
            }`}>
          <Heart className="w-5 h-5" />
        </button>
        <button
          onClick={toggleCompare}
          className={`p-2 rounded-lg border transition ${compare
            ? "bg-zinc-500 text-white border-zinc-900"
            : "bg-white text-gray-700 border-zinc-900 hover:bg-zinc-900 hover:text-white"
            }`}>
          <Repeat className="w-5 h-5" />
        </button>
        <button
          onClick={() => setShareOpen(true)}
          className="p-2 rounded-lg border bg-white text-gray-700 border-zinc-900 hover:bg-zinc-900 hover:text-white transition">
          <Share2 className="w-5 h-5" />
        </button>
        <button
          className="p-2 rounded-lg border bg-white text-gray-700 border-zinc-900 hover:bg-zinc-900 hover:text-white transition">
          <CircleQuestionMark className="w-5 h-5" />
        </button>
      </div>
      <div className="flex flex-row gap-4 mt-4 w-full">
        <button
          onClick={handleAddtoCart}
          className="w-full bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition">
          Add to Cart
        </button>
        <button className="w-full flex items-center justify-center gap-2 bg-green-700 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition">
          <MessageCircle className="w-5 h-5" />
          Order on WhatsApp
        </button>
      </div>

      <div className="border-t border-gray-500 border-dashed mt-3"></div>
      <div>
        <StaticImage />
      </div>
    </div>
      </div > */}
      <div className="mt-10">
        <ProductDescription />
      </div>


      <div className="w-full mt-10">
        <h1 className="text-2xl font-normal text-center mb-10">You May Also Like this</h1>
        <RealtedProduct />
      </div>
      <SharePopup
        isOpen={shareOpen}
        onClose={() => setShareOpen(false)}
        url={`https://superbazaar.in/`}
      />
    </>

  );
};

export default ProductDetailTheme2;
