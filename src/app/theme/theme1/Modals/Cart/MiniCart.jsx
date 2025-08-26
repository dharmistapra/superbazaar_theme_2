"use client";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeCart } from "@/app/store/slice/MiniCartSlice";
import { X, Trash2, Plus, Minus } from "lucide-react";
import FreeShippingProgress from "./FreeShippingProgress";
import CartData from "@/app/data/Cartdata";
import Image from "next/image";
import { ImageUrl } from "@/app/helper/imageUrl";
const MiniCart = () => {
  const dispatch = useDispatch();
  const isCartOpen = useSelector((state) => state.minicart.isCartOpen);

  const handleClose = () => dispatch(closeCart());

  const [cartItems, setCartItems] = useState(CartData.data);
  const [openCatalogueIds, setOpenCatalogueIds] = useState([]);

  const toggleCatalogue = (id) => {
    setOpenCatalogueIds((prev) =>
      prev.includes(id) ? prev.filter((cid) => cid !== id) : [...prev, id]
    );
  };

  const incrementQuantity = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decrementQuantity = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/40 z-40 transition-opacity duration-300 ${
          isCartOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
        }`}
        style={{ cursor: "url('/cursor-x.svg') 12 12, auto" }}
        onClick={handleClose}
      />
      <div
        className={`fixed top-0 right-0 h-full w-[90%] sm:w-[20rem] lg:w-[30rem] bg-white shadow-2xl z-50 transform transition-transform duration-500 flex flex-col rounded-l-2xl ${
          isCartOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-semibold">Your Cart</h2>
          <button
            onClick={handleClose}
            className="p-1 rounded hover:bg-zinc-900 hover:text-white"
          >
            <X size={25} />
          </button>
        </div>

        <div className="m-5">
          <FreeShippingProgress
            currentAmount={75}
            shippingThreshold={100}
            isModalOpen={isCartOpen}
          />
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {cartItems.length === 0 && <p>Your cart is empty.</p>}

          {cartItems.map((item) => {
              const size = item?.size ? item.size?.value: null;
 return(
     <div key={item.id} className="p-3 border-b-1 border-gray-300">
              <div className="flex justify-between items-start">
                <div className="flex gap-3">
                  <Image
                    src={ImageUrl(item.image)}
                    alt={item.name}
                    height={300}
                    width={300}
                    className="w-20 h-30  rounded-md"
                  />
                  <div>
                    <h3 className="font-medium text-sm">{item.name}</h3>
                    <p className="text-sm">₹{item.price}</p>

                    {size && (
          <p className="block">
            Size: {size}
          </p>
        )}

         {item.stitching?.map((stitch, index) => (
          <div className="text-sm" key={index}>
            {stitch?.option?.name}:{" "}
            <span>
                {stitch?.option?.price}
            </span>
          </div>
        ))}

  <div className="flex items-center border-1 border-gray-400 rounded-md overflow-hidden w-20 mt-2">
              <button
                onClick={() => decrementQuantity(item.id)}
                className="w-5 p-1  bg-gray-200 hover:bg-gray-300 transition text-md ">
                -
              </button>
              <span className="p-1 flex-1 text-center text-md">
                {item.quantity}
              </span>
              <button
                onClick={() => incrementQuantity(item.id)}
                className="w-6 p-1 bg-gray-200 hover:bg-gray-300 transition text-md ">
                +
              </button>
            </div>

                  </div>
                </div>
                <button
                  onClick={() => removeItem(item.id)}
                  className="p-1 rounded hover:bg-red-100 text-red-500"
                >
                  <Trash2 size={20} />
                </button>
              </div>
              {item.isCatalogue && item.products && (
                <div className="mt-3">
                  <button
                    onClick={() => toggleCatalogue(item.id)}
                    className="text-blue-600 text-sm font-medium underline"
                  >
                    {openCatalogueIds.includes(item.id)
                      ? "Hide Products"
                      : "Show Products"}
                  </button>

                  {openCatalogueIds.includes(item.id) && (
                    <div className="mt-2 space-y-2 pl-4 border-l">
                      {item.products.map((p) => (
                        <div key={p.code} className="flex justify-between text-sm">
                          <span>{p.name}</span>
                          <span>Qty: {p.quantity}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
 )          
})}
        </div>

        <div className="p-4 border-t flex flex-col gap-2 sticky bottom-0 bg-white">
          <button className="w-full py-2 bg-gray-100 rounded hover:bg-gray-200">
            View Cart
          </button>
          <button className="w-full py-2 bg-zinc-900 text-white rounded hover:bg-grey-700">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </>
  );
};

export default MiniCart;