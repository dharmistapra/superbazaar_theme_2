"use client";

import { useState } from "react";
import { CircleQuestionMark, Facebook, Heart, MessageCircle, Minus, Plus, Repeat, Share2, Twitter } from "lucide-react";
import OfferBanner from "@/components/OfferBanner";
import ProductImageGallery from "./components/ProductImageGallery";
import SizeSelector from "@/components/SizeSelector";
import SharePopup from "./components/SharePopup";
import StitchingForm from "./components/StitchingForm";
import ProductDescription from "./components/ProductDescription";
import StaticImage from "./components/StaticImage";
import Image from "next/image";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { useSession } from "next-auth/react";
import { useModal } from "@/hooks/useModal";
import ProductAccordion from "./components/ProductAccordion";
import ProductCard from "../../ProductComponent/ProductCard";
import { usePathname } from "next/navigation";
import { ImageUrl } from "@/helper/imageUrl";
import RealtedProduct from "./components/RelatedProduct";

const ProductDetailTheme2 = ({ product, Stitching, attributes, category }) => {
  const dispatch = useDispatch()
  const { open } = useModal();
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(null);
  const [errors, setErrors] = useState(null)
  const [stitchingData, setStitchingData] = useState(null);
  const [wishlist, setWishlist] = useState(false);
  const [compare, setCompare] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const increment = () => setQuantity((prev) => prev + 1);
  const decrement = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  const toggleWishlist = () => setWishlist((prev) => !prev);
  const toggleCompare = () => setCompare((prev) => !prev);
  const handleAddtoCart = () => {
    setErrors(null);

    if (product.optionType === "Size" && !selectedSize) {
      return setErrors("⚠️ Please select size");
    }

    if (product.optionType === "Stitching") {
      if (!stitchingData || stitchingData.stitching.length === 0) {
        return setErrors("⚠️ Please select stitching option");
      }
      if (!stitchingData.isValid) {
        return setErrors("⚠️ Please fill all required measurements");
      }
    }
    if (!session.accessToken) {
      open("login")
      return
    }

    const finalCartData = {
      productId: product.id,
      qty: quantity,
      ...(product.optionType === "Size" && { size: selectedSize }),
      stitching: stitchingData?.stitching || [],
    };
    alert("✅ Added to cart successfully!");
  };

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
                    <Heart className={`w-5 h-5 ${wishlist ? "text-red-600" : "text-gray-600"}`} />
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
                {/* <StitchingForm stitchingData={Stitching} onChange={setStitchingData} /> */}

                <ProductAccordion
                  product={product}
                  Stitching={Stitching}
                  attributes={attributes}
                  setStitchingData={setStitchingData}
                />
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
                        onClick={decrement}
                        disabled={quantity === 1}
                        className="p-2 disabled:opacity-50"
                      >
                        <Minus className="w-5 h-5 text-gray-600" />
                      </button>
                      <input
                        type="text"
                        readOnly
                        value={quantity}
                        className="w-7 text-center py-1 text-gray-700"
                      />
                      <button type="button" onClick={increment} className="p-2">
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


              < div className="mt-10" >
                <h2 className="text-xl font-semibold mb-4">Similar Products</h2>
                <div className="flex gap-2 overflow-x-auto">
                  {
                    attributes?.moreColors?.map((product, i) => {
                      console.log("product", product);

                      return (
                        <Link key={i} href="/retail/sarees/mahotsav-erisha-s3689-to-s3693-designer-saree-erisha-s3690" className="flex-shrink-0 ">
                          <Image src={ImageUrl(product.image[0])} alt="Thumb 1" className="w-20 h-32 object-cover rounded"
                            width={133}
                            height={200}
                          />
                        </Link>
                      )
                    })
                  }
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
