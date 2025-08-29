"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Minus, Plus, X ,ShieldCheck,Lock,BadgeCheck} from "lucide-react";
import { ImageUrl } from "@/helper/imageUrl";
import { useSelector } from "react-redux";
import FreeShippingProgress from "@/theme/theme1/Modals/Cart/FreeShippingProgress";

const CartPage = () => {
  const { CartData } = useSelector((state) => state.cartItem);
  const [cartItems, setCartItemsState] = useState([]);

  useEffect(() => {
    setCartItemsState(CartData?.data || []);
  }, [CartData]);

  const incrementQty = (id) => {
    setCartItemsState((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity + 1, subtotal: (item.quantity + 1) * item.price }
          : item
      )
    );
  };

  const decrementQty = (id) => {
    setCartItemsState((prev) =>
      prev.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1, subtotal: (item.quantity - 1) * item.price }
          : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItemsState((prev) => prev.filter((item) => item.id !== id));
  };

  const totalSubtotal = cartItems.reduce((acc, item) => acc + item.subtotal, 0);
  const totalTax = 0;
  const totalOrder = totalSubtotal + totalTax;

  return (
    <div className="w-full">
      <div className="w-full h-[200px] flex justify-center items-center bg-gradient-to-r from-indigo-100 via-white to-indigo-100">
        <h1 className="text-4xl font-medium">Shopping Cart</h1>
      </div>
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
                    try {
                      sizeObj = JSON.parse(item.size);
                    } catch {
                      sizeObj = {};
                    }

                    return (
                      <div key={item.id} className="flex flex-col md:grid md:grid-cols-12 items-center md:items-start justify-between py-4 gap-4">
                                                <div className="col-span-6 flex items-center gap-4">
                          <Image
                            src={ImageUrl(item.image)}
                            alt={item.name}
                            width={100}
                            height={100}
                            className="rounded-lg object-cover"
                          />
                          <div>
                            <h3 className="font-semibold text-sm md:text-base">{item.name}</h3>
                            {item.stitching.length > 0 && (
                              <p className="text-sm text-gray-500">
                                Stitching: {item.stitching[0].option.name}
                              </p>
                            )}
                            {sizeObj?.value && (
                              <p className="text-sm text-gray-500">Size: {sizeObj.value}</p>
                            )}
                          </div>
                        </div>
                        <div className="col-span-2 text-center font-medium">
                          ₹{item.price}
                        </div>
                        <div className="col-span-2 flex justify-center items-center">
                          <div className="flex items-center border rounded-full px-2">
                            <button onClick={() => decrementQty(item.id)} className="p-1">
                              <Minus size={16} />
                            </button>
                            <span className="px-3">{item.quantity}</span>
                            <button onClick={() => incrementQty(item.id)} className="p-1">
                              <Plus size={16} />
                            </button>
                          </div>
                        </div>

                        <div className="col-span-2 flex justify-between md:justify-end items-center gap-2 font-medium">
                          <p>₹{item.subtotal}</p>
                          <button onClick={() => removeItem(item.id)} className="text-red-500">
                            <X size={20} />
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
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <div className="space-y-2 text-sm">
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
      {/* Checkout Button */}
      <button className="mt-6 w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-medium shadow-lg transition-transform transform hover:scale-105">
        Proceed to Checkout
      </button>

      {/* Safe Payment Info */}
      <div className="mt-6 flex flex-col items-center">
        <Image
          alt="safe payment"
          src={"/safepayment.webp"}
          height={80}
          width={250}
          className="rounded-lg object-contain"
        />
        <p className="mt-2 text-sm text-gray-600">
          100% Safe & Secure Payments
        </p>

        {/* Trust Badges with Icons */}
        <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-md">
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

          <div className="flex items-center justify-center gap-2 p-3 rounded-lg bg-blue-50 shadow-sm">
            <BadgeCheck className="w-5 h-5 text-blue-600" />
            <span className="text-sm font-medium text-gray-700">
              Trusted by 10k+ Customers
            </span>
          </div>
        </div>
      </div>
    </div>


          </div>

        </div>
      </div>
    </div>
  );
};

export default CartPage;
