"use client";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import CartLoading from "./components/CartLoading";
import EmptyCart from "./components/EmptyCart";
import CartItems from "./CartItems";
import Breadcrum from "../components/BreadCrums/Breadcrum";

const CartPageTheme2 = () => {
  const { CartData } = useSelector((state) => state.cartItem);
  const [cartItems, setCartItemsState] = useState([]);
  useEffect(() => {
    setCartItemsState(CartData?.data || []);
  }, [CartData]);
  return (
    <div className="w-full">
      <Breadcrum name="cart" />
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

export default CartPageTheme2;
