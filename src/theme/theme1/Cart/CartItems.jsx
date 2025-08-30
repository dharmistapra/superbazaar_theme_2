"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import {  ShieldCheck, Lock,  Trash2,Loader2 } from "lucide-react";
import { ImageUrl } from "@/helper/imageUrl";
import { useSelector } from "react-redux";
import FreeShippingProgress from "@/theme/theme1/Modals/Cart/FreeShippingProgress";
import StitchingOptions from "@/components/StitchingOption";
import { useCartActions } from "@/hooks/useCartActions";
const CartItems = ({cartItems}) => {
  const [openCatalogueIds, setOpenCatalogueIds] = useState([]);
  const {
    incrementQuantity,
    decrementQuantity,
    removeItem,
    loadingIds,
    deleteLoading } = useCartActions();
 
  const toggleCatalogue = (id) => {
    setOpenCatalogueIds((prev) =>
      prev.includes(id) ? prev.filter((cid) => cid !== id) : [...prev, id]
    );
  };
  const totalSubtotal = cartItems.reduce((acc, item) => acc + item.subtotal, 0);
  const totalTax = 0;
  const totalOrder = totalSubtotal + totalTax;
  return (
      <div className="mx-auto mt-7  
        w-full 
        sm:max-w-[540px] 
        md:max-w-[720px] 
        lg:max-w-[960px] 
        xl:max-w-[1140px] 
        2xl:max-w-[1320px] px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8 bg-white shadow rounded-2xl p-6">
            <FreeShippingProgress
              currentAmount={75}
              shippingThreshold={100}
              isModalOpen={true}
            />
            <h2 className="text-xl font-semibold mb-4">Cart Items</h2>

            {cartItems.length === 0 ? (
              <p>Your cart is empty.</p>
            ) : (
              <>
                <div className="hidden md:grid grid-cols-12 text-gray-600 text-sm font-medium border-b pb-2 mb-4">
                  <div className="col-span-6">Product</div>
                  <div className="col-span-2 text-center">Price</div>
                  <div className="col-span-2 text-center">Quantity</div>
                  <div className="col-span-2 text-right">Subtotal</div>
                </div>

                <div className="divide-y">
                  {cartItems.map((item) => {
                    let sizeObj;
                    const isLoading = loadingIds.includes(item.id);
                    try {
                      sizeObj = JSON.parse(item.size);
                    } catch {
                      sizeObj = {};
                    }

                    return (
                      <div key={item.id} className="flex flex-col md:grid md:grid-cols-12 items-center md:items-start justify-between py-4 gap-4">
                        <div className="col-span-6 flex gap-4">
                          <Image
                            src={ImageUrl(item.image)}
                            alt={item.name}
                            width={100}
                            height={100}
                            className="rounded-lg object-cover max-h-[150px] w-auto "
                          />
                          <div>
                            <h3 className="font-semibold text-sm md:text-base">{item.name}</h3>
                            <StitchingOptions stitching={item.stitching} />
                            {sizeObj?.value && (
                              <p className="text-sm text-gray-500">Size: {sizeObj.value}</p>
                            )}

                            {item.isCatalogue && item.products && (
                              <div className="mt-3">
                                <button
                                  onClick={() => toggleCatalogue(item.id)}
                                  className="text-blue-600 text-sm font-medium underline">
                                  {openCatalogueIds.includes(item.id)
                                    ? "Hide Products"
                                    : "Show Products"}
                                </button>

                                {openCatalogueIds.includes(item.id) && (
                                  <div className="mt-2 space-y-2 pl-4 border-l">
                                    {item.products.map((p) => (
                                      <div
                                        key={p.code}
                                        className="flex items-center justify-between text-sm gap-2">
                                        <div className="flex  items-center gap-2">
                                          <div className="w-25 h-15 relative flex-shrink-0">
                                            <Image
                                              src={ImageUrl(p.image[0])}
                                              alt={p.name}
                                              fill
                                              className="object-contain rounded"
                                              sizes="60px"
                                            />
                                          </div>
                                          <span className="truncate max-w-[150px]">{p.name}</span>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="col-span-2 text-center font-medium">
                          ₹{item.price}
                        </div>


                        <div className="col-span-2 flex items-center border border-gray-400 rounded-md overflow-hidden w-20 mt-2">
                          <button
                            disabled={item.quantity <= 1 || isLoading}
                            onClick={() => decrementQuantity(item)}
                            className="w-5 p-1 bg-gray-200 hover:bg-gray-300 transition text-md disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            {isLoading ? <Loader2 className="animate-spin h-3 w-3 mx-auto" /> : "-"}
                          </button>
                          <span className="p-1 flex-1 text-center text-md">
                            {item.quantity}
                          </span>
                          <button
                            disabled={item.quantity >= item.availableQuantity || isLoading}
                            onClick={() => incrementQuantity(item)}
                            className="w-6 p-1 bg-gray-200 hover:bg-gray-300 transition text-md disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            {isLoading ? <Loader2 className="animate-spin h-3 w-3 mx-auto" /> : "+"}
                          </button>
                        </div>
                        <div className="col-span-2 flex justify-between md:justify-end items-center gap-2 font-medium">
                          <p>₹{item.subtotal}</p>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-red-500"
                            disabled={deleteLoading === item.id}
                          >
                            {deleteLoading === item.id ? (
                              <Loader2 className="animate-spin" size={20} />
                            ) : (
                              <Trash2 size={20} />
                            )}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            )}
          </div>

          <div className="lg:col-span-4 bg-white shadow rounded-2xl p-6">
            <h2 className="text-xl font-semibold mb-4 ">Order Summary</h2>
            <div className="border-b-1 border-gray-300"></div>
            <div className="space-y-2 text-sm mt-5">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{totalSubtotal}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax</span>
                <span>₹{totalTax}</span>
              </div>
              <div className="flex justify-between font-semibold text-lg">
                <span>Total</span>
                <span>₹{totalOrder}</span>
              </div>
            </div>
            <div className="mt-8 text-center">
              <button className="mt-6 w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-medium shadow-lg transition-transform transform hover:scale-105">
                Proceed to Checkout
              </button>
              <div className="mt-6 flex flex-col items-center">
                <Image
                  alt="safe payment"
                  src={"/safepayment.webp"}
                  height={100}
                  width={250}
                  className="rounded-lg object-contain" />
                <p className="mt-2 text-sm text-zinc-900"> 100% Safe & Secure Payments </p>
                <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-md">
                  <div className="flex items-center justify-center gap-2 p-3 rounded-lg bg-green-50 shadow-sm">
                    <Lock className="w-5 h-5 text-green-600" />
                    <span className="text-sm font-medium text-gray-700">
                      SSL Encrypted
                    </span>
                  </div>
                  <div className="flex items-center justify-center gap-2 p-3 rounded-lg bg-yellow-50 shadow-sm">
                    <ShieldCheck className="w-5 h-5 text-yellow-600" />
                    <span className="text-sm font-medium text-gray-700">
                      Money Back Guarantee
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default CartItems;
