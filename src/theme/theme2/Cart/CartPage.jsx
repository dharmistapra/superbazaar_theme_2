"use client";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useCartActions } from "@/hooks/useCartActions";
import CartLoading from "./components/CartLoading";
import EmptyCart from "./components/EmptyCart";
import CartItems from "./CartItems";
import Breadcrum from "../components/BreadCrums/Breadcrum";

const CartPageTheme1 = () => {
  const { CartData } = useSelector((state) => state.cartItem);
  const [cartItems, setCartItemsState] = useState([]);
  useEffect(() => {
    setCartItemsState(CartData?.data || []);
  }, [CartData]);
  return (
    <div className="w-full">
      <Breadcrum name="cart" />
      {/* <div className="w-full h-[200px] flex justify-center items-center bg-gradient-to-r from-indigo-100 via-white to-indigo-100">
        <h1 className="text-4xl font-medium">Shopping Cart152</h1>
      </div> */}
      {/* <div className="container mx-auto px-4 text-left">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="w-full lg:w-9/12">
            <form className="cart">
              <table className="w-full border-collapse">
                <thead className="bg-gray-100 text-base">
                  <tr>
                    <th className="w-12">&nbsp;</th>
                    <th colSpan={2} className="text-left">Product</th>
                    <th className="text-center">QTY</th>
                    <th className="text-center">Item Price</th>
                    <th className="text-center">Total</th>
                  </tr>
                </thead>

                <tbody>
                  <tr className="border-t border-b text-base">
                    <td className="text-center">
                      <button
                        type="button"
                        className="flex items-center justify-center text-red-600 hover:text-red-800"
                        title="Remove item"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>
                      </button>
                    </td>

                    <td className="p-2">
                      <a href="/catalogue/salwar-suits/art-silk-embroidered-designer-salwar-kameez-ravina-24-colour">
                        <img
                          className="w-20 h-24 object-cover rounded"
                          src="https://cdn.superbazaar.in/uploads/catalogue/SB66_Ravina24C_24A-A_11zon (1).jpg"
                          alt="Product Image"
                        />
                      </a>
                    </td>

                    <td className="align-top p-2">
                      <div className="font-medium">
                        <a href="/catalogue/salwar-suits/art-silk-embroidered-designer-salwar-kameez-ravina-24-colour">
                          Art Silk Embroidered Designer Salwar Kameez (Fullset)
                        </a>
                      </div>
                      <div className="flex items-center mt-1">
                        <strong>Pieces :</strong>
                        <span className="ml-2">Rs 1835.00 × 4</span>
                      </div>
                      <div className="flex items-center mt-1">
                        <strong>Size :</strong>
                        <span className="ml-2">M</span>
                      </div>
                    </td>
                    <td className="text-center">
                      <div className="flex justify-center items-center space-x-2">
                        <button className="p-1 border rounded">
                          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14"></path></svg>
                        </button>
                        <input
                          className="w-12 text-center border rounded"
                          type="text"
                          readOnly
                          value="1"
                        />
                        <button className="p-1 border rounded opacity-50 cursor-not-allowed" disabled>
                          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14"></path><path d="M12 5v14"></path></svg>
                        </button>
                      </div>
                      <button className="block lg:hidden mt-2 text-sm underline text-gray-600">
                        Remove
                      </button>
                    </td>

                    <td className="text-center whitespace-nowrap">Rs 7342.00</td>

                    <td className="text-center font-semibold whitespace-nowrap">Rs 1835.00</td>
                  </tr>
                </tbody>

                <tfoot>
                  <tr>
                    <td colSpan={9} className="pt-4">
                      <div className="flex flex-col md:flex-row justify-between items-center w-full">
                        <div className="flex-grow text-right">
                          <a href="/">
                            <button
                              type="button"
                              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded text-base"
                            >
                              Continue Shopping
                            </button>
                          </a>
                        </div>
                      </div>
                    </td>
                  </tr>
                </tfoot>
              </table>
            </form>
          </div>

          <div className="w-full lg:w-3/12">
            <div className="bg-gray-50 p-4 rounded shadow">
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
                <div className="flex justify-between text-sm border-b pb-2 mb-2">
                  <span>Cart Total</span>
                  <span>Rs 1835.00</span>
                </div>
                <button
                  id="cartCheckout"
                  className="w-full py-2 bg-green-600 text-white rounded mb-4"
                >
                  Proceed To Checkout
                </button>
                <div className="text-center">
                  <img
                    src="/static/media/safepayment.4d84645aff6916776a51.webp"
                    alt="Payment"
                    className="mx-auto w-32"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div > */}

      {
        Object.keys(CartData)?.length === 0 ? (
          <CartLoading />
        ) : cartItems?.length === 0 ? (
          <EmptyCart />
        ) : (
          <CartItems
            cartItems={cartItems}
          />
        )
      }
    </div >
  );
};

export default CartPageTheme1;
