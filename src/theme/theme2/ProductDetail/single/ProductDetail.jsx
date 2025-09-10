"use client";

import { useState } from "react";
import { Facebook, MessageCircle, Minus, Plus, Twitter } from "lucide-react";
import OfferBanner from "@/components/OfferBanner";
import ProductImageGallery from "./components/ProductImageGallery";
import SharePopup from "./components/SharePopup";
import StitchingForm from "./components/StitchingForm";
import ProductDescription from "./components/ProductDescription";
import Image from "next/image";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { useSession } from "next-auth/react";
import { useModal } from "@/hooks/useModal";
import ProductAccordion from "./components/ProductAccordion";
import ProductCard from "../../ProductComponent/ProductCard";
import { usePathname } from "next/navigation";
import { ImageUrl } from "@/helper/imageUrl";
import Breadcrum from "../../components/BreadCrums/Breadcrum";
import PriceConverter from "@/components/PriceConverter";
import SizeSelector from "@/components/SizeSelector";
import RealtedProduct from "./components/RelatedProduct";
import { addToCartProduct, getCartItems } from "@/services/cartService";
import { setCartItems } from "@/store/slice/cartItemSlice";
import { openCart } from "@/store/slice/MiniCartSlice";

const ProductDetailTheme2 = ({ product, Stitching, attributes, category }) => {
  const dispatch = useDispatch()
  const { open } = useModal();
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(null);
  const [errors, setErrors] = useState(null)
  const [stitchingData, setStitchingData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [wishlist, setWishlist] = useState(false);
  const [compare, setCompare] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(product.image[0]);
  // const increment = () => setQuantity((prev) => prev + 1);
  const increment = () => {
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
    setQuantity((prev) => prev + 1);
  };


  const decrement = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  const toggleWishlist = () => setWishlist((prev) => !prev);
  const toggleCompare = () => setCompare((prev) => !prev);

  const handleAddtoCart = async () => {

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
    if (!session?.accessToken) {
      open("/login")
      return
    }

    setLoading(true);
    try {
      const finalCartData = {
        product_id: product.id,
        quantity: quantity,
        user_id: session?.user?.id,
        ...(product.optionType === "Size" && { size: selectedSize }),
        ...(product.optionType === "Stitching" && { stitching: stitchingData?.stitching || [] }),
      };

      const response = await addToCartProduct(finalCartData)
      if (response?.isSuccess) {
        const fetchCartData = await getCartItems(session?.user?.id)
        dispatch(setCartItems(fetchCartData))
        dispatch(openCart())
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Breadcrum category={category} name={product.name} />
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap -mx-4">
          <div className="w-full md:w-1/2 lg:w-7/12 mb-4 md:pr-4 lg:pr-6 relative">
            <div className="flex gap-4">
              <ProductImageGallery images={product.image} thumbs={product.thumbImage} />
            </div>
          </div>

          <div className="w-full md:w-1/2 lg:w-5/12 mt-4 md:mt-0">
            <div className="sticky top-4">
              {product.ProductBrand?.length === 0 ? "" :
                <h2 className="text-lg font-medium mb-2">
                  Brand: <span className="bg-red-600 text-white px-2 py-1 rounded">Mahotsav Group</span>
                </h2>}
              <h5 className="text-[18px] mb-1">{product.name}</h5>
              <p className="text-gray-600 mb-2">SKU:{product.sku}</p>
              <div className="mb-4">
                <span className="line-through "><PriceConverter price={product.offer_price} /></span>
                <span className=" text-gray-400 mx-3"><PriceConverter price={product.retail_price} /></span>
              </div>

              {
                product.optionType === "Size" && (
                  <div className="-mt-1 mb-3">
                    <SizeSelector
                      sizes={attributes.sizes || ["S", "M", "L", "XL"]}
                      onChange={setSelectedSize}
                      errors={errors}
                      setErrors={setErrors}
                    />
                  </div>)
              }

              <div className="border border-gray-200 rounded-lg divide-y shadow-sm">
                <ProductAccordion
                  product={product}
                  Stitching={Stitching}
                  attributes={attributes}
                  setStitchingData={setStitchingData}
                />
              </div>

              <div className="w-full mt-3 rounded-lg p-4">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-4 w-full  md:w-2/3">
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
                      <button type="button" onClick={increment} className="p-2"
                        disabled={quantity === product.quantity || quantity === selectedSize?.quantity}
                      >
                        <Plus className="w-5 h-5 text-gray-600" />
                      </button>
                    </div>

                    <div>
                      <button
                        disabled={loading}
                        onClick={handleAddtoCart}
                        type="submit"
                        className="bg-white hover:bg-black hover:text-white text-black outline-1 px-6 py-2 rounded-md transition"
                      >
                        Add to cart
                      </button>
                    </div>
                  </div>

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
              {errors && (
                <p className="text-red-500 text-sm mt-2">{errors}</p>
              )}
              {attributes?.moreColors?.length > 0 && <div className="mt-10" >
                <h2 className="text-xl font-semibold mb-4">Similar Products</h2>
                <div className="flex gap-2 overflow-x-auto">
                  {
                    attributes?.moreColors?.map((product, i) => {
                      return (
                        <Link key={i} href={`/retail/${category}/${product.url}`} className="flex-shrink-0 ">
                          <Image src={ImageUrl(product.image[0])} alt="Thumb 1" className="w-20 h-32 object-cover rounded"
                            width={133}
                            height={200}
                          />
                        </Link>
                      )
                    })
                  }
                </div>
              </div>}
            </div>
          </div>
        </div>
      </div>
      <div>
        <RealtedProduct url={product.url} />
      </div>

      {/* <SharePopup
        isOpen={shareOpen}
        onClose={() => setShareOpen(false)}
        url={`https://superbazaar.in/`}
      /> */}
    </>

  );
};

export default ProductDetailTheme2;
