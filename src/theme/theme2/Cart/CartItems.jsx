"use client";
import { useState } from "react";
import Image from "next/image";
import { Trash2, Loader2 } from "lucide-react";
import { ImageUrl } from "@/helper/imageUrl";
import StitchingOptions from "@/components/StitchingOption";
import { useCartActions } from "@/hooks/useCartActions";

const CartItems = ({ cartItems }) => {
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
    <div className="container mx-auto text-left 
        w-full 
        sm:max-w-[540px] 
        md:max-w-[720px] 
        lg:max-w-[960px] 
        xl:max-w-[1240px] 
        2xl:max-w-[1320px] px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 bg-white rounded-2xl p-6">
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
        <div className="lg:col-span-4 bg-white rounded-2xl p-6">
          <div className="w-full">
            <div className="bg-gray-50 p-4 rounded ">
              <div className="mb-6">
                <h6 className="font-semibold mb-2">AVAILABLE OFFERS</h6>
                <form className="space-y-2">
                  <input
                    name="note"
                    id="cart-note"
                    className="w-full border rounded px-3 py-2"
                    placeholder="Enter discount code"
                    required
                  />
                  <button
                    type="button"
                    className="w-full py-2 bg-gray-800 text-white rounded"
                  >
                    Apply Coupon
                  </button>
                </form>
              </div>

              <div>
                <h6 className="font-semibold mb-2">PRICE DETAILS</h6>
                <div className="space-y-2 text-sm mt-5">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>₹{totalSubtotal}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax</span>
                    <span>₹{totalTax}</span>
                  </div>
                  <div className="flex justify-between font-semibold text-lg mb-3">
                    <span>Total</span>
                    <span>₹{totalOrder}</span>
                  </div>
                </div>
                <button
                  id="cartCheckout"
                  className="w-full py-2 bg-green-600 text-white rounded mb-4"
                >
                  Proceed To Checkout
                </button>
                <div className="text-center">
                  <Image
                    alt="safe payment"
                    src={"/safepayment.webp"}
                    height={100}
                    width={250}
                    className="rounded-lg object-contain"
                  />
                </div>
              </div>
            </div>
          </div>



          {/* <div className="border-b-1 border-gray-300"></div>
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
          <div className="mt-8  w-full">
            <Link
              href="/checkout"
              className="mt-6 mb-10 block w-full bg-indigo-600 hover:bg-indigo-700 
               text-white p-3 rounded-lg font-medium shadow-lg 
               transition-transform transform hover:scale-105 text-center"
            >
              Proceed to Checkout
            </Link>

            <div className="mt-6 flex flex-col items-center">
              <Image
                alt="safe payment"
                src={"/safepayment.webp"}
                height={100}
                width={250}
                className="rounded-lg object-contain"
              />
              <p className="mt-2 text-sm text-zinc-900">
                100% Safe & Secure Payments
              </p>

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
          </div> */}

        </div>
      </div>
    </div >
  );
};

export default CartItems;
