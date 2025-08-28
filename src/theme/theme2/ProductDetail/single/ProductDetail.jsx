"use client";

import { useState } from "react";
import { CircleQuestionMark, Facebook, Heart, MessageCircle, Minus, Plus, Repeat, Share2, Twitter } from "lucide-react";
import OfferBanner from "@/components/OfferBanner";
import ProductImageGallery from "./components/ProductImageGallery";
import SizeSelector from "@/components/SizeSelector";
import SharePopup from "./components/SharePopup";
import RealtedProduct from "./components/RelatedProduct";
import StitchingForm from "./components/StitchingForm";
import ProductDescription from "./components/ProductDescription";
import StaticImage from "./components/StaticImage";
import Image from "next/image";
import Link from "next/link";

const ProductDetailTheme2 = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(null);
  const [errors, setErrors] = useState(null)
  const [wishlist, setWishlist] = useState(false);
  const [compare, setCompare] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const [open, setOpen] = useState("stitching");
  const [qty, setQty] = useState(1);

  const increase = () => setQty(qty + 1);
  const decrease = () => qty > 1 && setQty(qty - 1);
  const toggle = (section) => {
    setOpen(open === section ? null : section);
  };
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
                <Link href="/retail/sarees/mahotsav-erisha-s3689-to-s3693-designer-saree-erisha-s3692" className="border-2 border-dashed border-gray-800 rounded">
                  <Image
                    src="https://cdn.superbazaar.in/uploads/product/thumb/Erisha_S3692.webp"
                    alt="Thumb 1"
                    className="w-20 h-32 object-cover rounded"
                    width={133}
                    height={200}
                  />
                </Link>
                <Link href="#" className="border-2 border-dashed border-gray-800 rounded">
                  <Image
                    src="https://cdn.superbazaar.in/uploads/product/thumb/Erisha_S3692-A.webp"
                    alt="Thumb 2"
                    className="w-20 h-32 object-cover rounded"
                    width={133}
                    height={200}
                  />
                </Link>
                <Link href="#" className="border-2 border-dashed border-gray-800 rounded">
                  <Image
                    src="https://cdn.superbazaar.in/uploads/product/thumb/Erisha_S3692-B.webp"
                    alt="Thumb 3"
                    className="w-20 h-32 object-cover rounded"
                    width={133}
                    height={200}
                  />
                </Link>
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
              <div className="border border-gray-400 rounded-lg divide-y shadow-sm">
                {/* Stitching */}
                <div>
                  <button
                    onClick={() => toggle("stitching")}
                    className={`w-full flex justify-between items-center px-4 py-3 font-semibold 
            ${open === "stitching" ? "text-blue-600" : "text-gray-800"}`}
                  >
                    Stitching
                    <span className="text-xl">{open === "stitching" ? "−" : "+"}</span>
                  </button>
                  {open === "stitching" && (
                    <div className="px-4 pb-4 text-sm border-">
                      <h4 className="font-semibold mb-2">Blouse Stitching</h4>

                      <label className="flex items-start gap-2 mb-2 cursor-pointer">
                        <input
                          type="radio"
                          name="stitchingOption"
                          value="Unstitch"
                          defaultChecked
                          className="mt-1 accent-blue-600"
                        />
                        <span>
                          <span>Unstitch – Rs 0.00 </span>
                          <span className="text-red-600">(Same day dispatch)</span>
                        </span>
                      </label>

                      <label className="flex items-start gap-2 mb-2 cursor-pointer">
                        <input
                          type="radio"
                          name="stitchingOption"
                          value="Standard Stitching"
                          className="mt-1 accent-blue-600"
                        />
                        <span>
                          <span>Standard Stitching – Rs 400.00 </span>
                          <span className="text-red-600">(4–5 Days dispatch)</span>
                        </span>
                      </label>

                      <label className="flex items-start gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="stitchingOption"
                          value="Custom Stitching"
                          className="mt-1 accent-blue-600"
                        />
                        <span>
                          <span>Custom Stitching – Rs 800.00 </span>
                          <span className="text-red-600">(8–9 Days dispatch)</span>
                        </span>
                      </label>
                    </div>
                  )}
                </div>

                {/* Product Details */}
                <div>
                  <button
                    onClick={() => toggle("details")}
                    className={`w-full flex justify-between items-center px-4 py-3 font-semibold 
            ${open === "details" ? "text-blue-600" : "text-gray-800"}`}
                  >
                    Product Details
                    <span className="text-xl">{open === "details" ? "−" : "+"}</span>
                  </button>
                  <div>


                    {open === "details" && (
                      <div className="px-4 pb-4 text-sm  border-t-0 rounded-b-md">
                        <table className="w-full border border-gray-200">
                          <tbody>
                            <tr className="border-b border-gray-200 bg-gray-100">
                              <td className="font-semibold w-1/3  px-3 py-2">Fabric</td>
                              <td className="px-3 py-2">Georgette</td>
                            </tr>
                            <tr className="border-b border-gray-200 ">
                              <td className="font-semibold px-3 py-2">Color</td>
                              <td className="px-3 py-2">
                                <span className="inline-block w-5 h-5 rounded-full bg-green-500"></span>
                              </td>
                            </tr>
                            <tr className="border-b border-gray-200 bg-gray-100">
                              <td className="font-semibold  px-3 py-2">Occasion</td>
                              <td className="px-3 py-2">Daily Wear</td>
                            </tr>
                            <tr >
                              <td className="font-semibold px-3 py-2">Work</td>
                              <td className="px-3 py-2 ">Sequins Work</td>
                            </tr>
                          </tbody>
                        </table>

                        <p className="mt-3 text-sm">
                          <span className="font-semibold">Catalog: </span>
                          <Link href="#" className="text-blue-600 underline">
                            View Full Catalog
                          </Link>
                        </p>

                        <p className="mt-3 text-gray-700 leading-relaxed">
                          Step out in style with the Reach Color Sequins Work Georgette Casual Saree with Blouse!
                          This saree features stunning sequins work on a premium quality georgette fabric,
                          making it a must–have for your casual wardrobe. The fabric’s lightness ensures
                          all–day comfort while the sequins add a touch of glam to your everyday look...
                        </p>
                      </div>
                    )}
                  </div>

                </div>

                {/* Enquiry */}
                <div>
                  <button
                    onClick={() => toggle("enquiry")}
                    className={`w-full flex justify-between items-center px-4 py-3 font-semibold 
            ${open === "enquiry" ? "text-blue-600" : "text-gray-800"}`}
                  >
                    Enquiry
                    <span className="text-xl">{open === "enquiry" ? "−" : "+"}</span>
                  </button>
                  {open === "enquiry" && (
                    <div className="px-4 pb-4 text-sm">
                      <p>For enquiries, please contact us via email or phone.</p>
                      <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-6">
                        <div className="sm:col-span-3">
                          <div className="mt-2">
                            <input
                              id="email"
                              type="email"
                              name="email"
                              autoComplete="email"
                              placeholder="Enter Your email"
                              className="block w-full rounded-md bg-white/5 px-3 py-2.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm"

                            />
                          </div>
                        </div>

                        <div className="sm:col-span-3">
                          <div className="mt-2">
                            <input
                              id="first-name"
                              type="text"
                              name="first-name"
                              autoComplete="given-name"
                              placeholder="Enter Your mobile number"
                              className="block w-full rounded-md bg-white/5 px-3 py-2.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm"

                            />
                          </div>
                        </div>

                        <div className="col-span-full">
                          <textarea
                            id="message"
                            name="message"
                            rows={4}
                            placeholder="Write your message here..."
                            className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm"
                          ></textarea>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Add to Cart */}
              <div className="w-full mt-3  rounded-lg  p-4">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                  {/* Left Side: Qty + Add to Cart */}
                  <div className="flex items-center gap-4 w-full  md:w-2/3">
                    {/* Quantity Selector */}
                    <div className="flex items-center border rounded-md py-0.5  ">
                      <button
                        type="button"
                        onClick={decrease}
                        disabled={qty === 1}
                        className="p-2 disabled:opacity-50"
                      >
                        <Minus className="w-5 h-5 text-gray-600" />
                      </button>
                      <input
                        type="text"
                        readOnly
                        value={qty}
                        className="w-7 text-center py-1 text-gray-700"
                      />
                      <button type="button" onClick={increase} className="p-2">
                        <Plus className="w-5 h-5 text-gray-600" />
                      </button>
                    </div>

                    {/* Add to Cart Button */}
                    <Link href="/cart">
                      <button
                        type="submit"
                        className="bg-white hover:bg-black hover:text-white text-black outline outline-1 px-6 py-2 rounded-md transition"
                      >
                        Add to cart
                      </button>
                    </Link>
                  </div>

                  {/* Right Side: Share Icons */}
                  <div className="flex items-center justify-center gap-3 w-full md:w-1/3">
                    <button
                      title="Share on Facebook"
                      className="p-2 rounded-md border border-s border-gray-400 hover:bg-blue-100"
                    >
                      <Facebook className="w-6 h-6 text-blue-600" />
                    </button>
                    <button
                      title="Share on WhatsApp"
                      className="p-2 rounded-md border border-s border-gray-400 hover:bg-green-100 "
                    >
                      <MessageCircle className="w-6 h-6 text-green-500" />
                    </button>
                    <button
                      title="Share on Twitter"
                      className="p-2 border rounded-md border-s border-gray-400 hover:bg-sky-100"
                    >
                      <Twitter className="w-6 h-6 text-sky-500" />
                    </button>
                  </div>
                </div>
              </div>

              {/* <div className="flex flex-col md:flex-row gap-2 items-center mt-4">
                <div className="flex items-center gap-2">
                  <button className="px-3 py-1 border rounded disabled:opacity-50">-</button>
                  <input type="text" value="1" readOnly className="w-12 text-center border rounded" />
                  <button className="px-3 py-1 border rounded">+</button>
                </div>
                <button className="bg-red-600 text-white px-4 py-2 rounded shadow hover:bg-red-700 transition">Add to Cart</button>
              </div> */}
              < div className="mt-10" >
                <h2 className="text-xl font-semibold mb-4">Similar Products</h2>
                <div className="flex gap-2 overflow-x-auto">
                  <Link href="/retail/sarees/mahotsav-erisha-s3689-to-s3693-designer-saree-erisha-s3690" className="flex-shrink-0 ">
                    <Image src="https://cdn.superbazaar.in/uploads/product/Erisha_S3689.webp" alt="Thumb 1" className="w-20 h-32 object-cover rounded"
                      width={133}
                      height={200}
                    />
                  </Link>
                  <Link href="/retail/sarees/mahotsav-erisha-s3689-to-s3693-designer-saree-erisha-s3690" className="flex-shrink-0 ">
                    <Image src="https://cdn.superbazaar.in/uploads/product/Erisha_S3690.webp" alt="Thumb 2"
                      className="w-20 h-32 object-cover rounded"
                      width={100}
                      height={200}
                    />
                  </Link>
                  <Link href="/retail/sarees/mahotsav-erisha-s3689-to-s3693-designer-saree-erisha-s3690" className="flex-shrink-0 ">
                    <Image src="https://cdn.superbazaar.in/uploads/product/Erisha_S3691.webp" alt="Thumb 3"
                      className="w-20 h-32 object-cover rounded"
                      width={133}
                      height={200}
                    />
                  </Link>
                  <Link href="/retail/sarees/mahotsav-erisha-s3689-to-s3693-designer-saree-erisha-s3690" className="flex-shrink-0 ">
                    <img src="https://cdn.superbazaar.in/uploads/product/Erisha_S3693.webp" alt="Thumb 4" className="w-20 h-32 object-cover rounded"
                      width={133}
                      height={200}
                    />
                  </Link>
                </div>
              </div >
            </div>
          </div>
        </div >
      </div >
      <div>
        <RealtedProduct />
      </div>
      {/* 
      < div className="mt-10" >
        <ProductDescription />
      </div > */}


      {/* <div className="w-full mt-10">
        <h1 className="text-2xl font-normal text-center mb-10">You May Also Like this</h1>
        <RealtedProduct />
      </div> */}
      {/* <SharePopup
        isOpen={shareOpen}
        onClose={() => setShareOpen(false)}
        url={`https://superbazaar.in/`}
      /> */}
    </>

  );
};

export default ProductDetailTheme2;
