"use client"
import { useState } from "react"
import SizeSelector from "@/components/SizeSelector"
import CatalogueImages from "./components/catalogueimage"
import StitchingForm from "../single/components/StitchingForm"
import { CircleQuestionMark, Heart, MessageCircle, Repeat, Share2, ShoppingCart, Loader2 } from "lucide-react";
import StaticImage from "@/components/StaticImage"
import RalatedCatalogue from "./components/realtedCatalogue"
import { useDispatch } from "react-redux"
import { useModal } from "@/hooks/useModal"
import { useSession } from "next-auth/react"
import { addToCartProduct, getCartItems } from "@/services/cartService"
import { setCartItems } from "@/store/slice/cartItemSlice"
import { openCart } from "@/store/slice/MiniCartSlice"
import SharePopup from "../single/components/SharePopup"
const Catalogue = ({ CatalogueDetailData, stitching, category }) => {
    const dispatch = useDispatch()
    const { open } = useModal();
    const { data: session, status } = useSession();
    const [errors, setErrors] = useState(null)
    const [selectedSize, setSelectedSize] = useState({});
    const [quantity, setQuantity] = useState(1);
    const [shareOpen, setShareOpen] = useState(false);

    const [loading, setLoading] = useState(false);
    const [stitchingData, setStitchingData] = useState(null);
    const [wishlist, setWishlist] = useState(false);
    const [compare, setCompare] = useState(false);
    const increment = () => setQuantity((prev) => prev + 1);
    const decrement = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
    const toggleWishlist = () => setWishlist((prev) => !prev);
    const toggleCompare = () => setCompare((prev) => !prev);

    const handleAddtoCart = async () => {
        setErrors(null);
        if (CatalogueDetailData?.optionType === "Size" && Object.keys(selectedSize)?.length == 0) {
            return setErrors("⚠️ Please select size");
        }

        if (CatalogueDetailData?.optionType === "Stitching") {
            if (!stitchingData || stitchingData.stitching.length === 0) {
                return setErrors("⚠️ Please select stitching option");
            }
            if (!stitchingData.isValid) {
                return setErrors("⚠️ Please fill all required measurements");
            }
        }
        if (!session?.accessToken) {
            open("login")
            return
        }

        setLoading(true);
        try {
            const finalCartData = {
                catalogue_id: CatalogueDetailData.id,
                quantity: quantity,
                user_id: session?.user?.id,
                ...(CatalogueDetailData.optionType === "Size" && { size: selectedSize }),
                ...(CatalogueDetailData.optionType === "Stitching" && { stitching: stitchingData?.stitching || [] }),
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
        <div className="container mx-auto p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div> <CatalogueImages catalogDetails={CatalogueDetailData} category={category} /> </div>
                <div className="md:sticky md:top-[50px] self-start">
                    <div className="flex flex-col gap-4 md:gap-2">
                        <div>
                            {CatalogueDetailData?.CatalogueBrand?.map((item, index) => (
                                <a
                                    key={index}
                                    href={`/brand/catalogue/${item?.brand.url}`}
                                    className="text-blue-600 hover:underline">
                                    {item.brand.name}
                                </a>
                            ))}
                            <h1 className="text-xl font-medium">{CatalogueDetailData?.name}</h1>
                            <p className="text-gray-500 mt-1">{CatalogueDetailData?.cat_code}</p>
                            <p className="text-xl font-semibold mt-2">
                                ₹{CatalogueDetailData?.offer_price}
                            </p>
                        </div>
                        <p className="flex items-center gap-2 bg-slat-100 text-zinc-800 font-medium px-3 py-1 rounded-lg w-fit">
                            <span className="font-bold">⏱</span> Dispatch Time: 7 Working Days
                        </p>
                        <p className="line-clamp-3">{CatalogueDetailData?.description}</p>
                        {CatalogueDetailData.optionType === "Size" ? (
                            <div className="-mt-1">
                                <SizeSelector
                                    sizes={CatalogueDetailData?.Size || ["S", "M", "L", "XL"]}
                                    onChange={setSelectedSize}
                                    errors={errors}
                                    setErrors={setErrors}
                                />
                            </div>) : (
                            <StitchingForm stitchingData={stitching || []} onChange={setStitchingData} />
                        )}

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
                                disabled={loading}
                                onClick={handleAddtoCart}
                                className="w-full flex items-center justify-center bg-zinc-900 text-white px-6 py-3 rounded-lg  transition disabled:opacity-70 gap-2"
                            >
                                <span className="flex gap-2"> <ShoppingCart />Add to Cart</span>
                                {loading && <Loader2 className="w-5 h-5 animate-spin" />}
                            </button>

                            <button className="w-full flex items-center justify-center gap-2 bg-green-700 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition">
                                <MessageCircle className="w-5 h-5" />
                                Order on WhatsApp
                            </button>
                        </div>
                        {errors && (
                            <p className="text-red-500 text-sm mt-2">{errors}</p>
                        )}
                        <div>
                            <StaticImage />
                        </div>

                    </div>
                </div>
            </div>

            <div className="w-full mt-10">
                <h1 className="text-2xl font-normal text-center mb-10">You May Also Like this</h1>
                <RalatedCatalogue url={CatalogueDetailData.url} />
            </div>

            {shareOpen && (
                <SharePopup
                    isOpen={shareOpen}
                    onClose={() => setShareOpen(false)}
                    url={`https://superbazaar.in/`}
                />
            )}
        </div>
    )
}

export default Catalogue