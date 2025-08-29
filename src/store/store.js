import { configureStore } from "@reduxjs/toolkit";
import ModalReucer from "./slice/ModalSlice"
import MiniCartSlice from "./slice/MiniCartSlice"
import CurrencySlice from "./slice/CurrencySlice"
import WishlistSlice from "./slice/WishlistSlice"
import CartItemSlice from "./slice/cartItemSlice";
export const store=configureStore({
    reducer:{
        modal:ModalReucer,
        minicart:MiniCartSlice,
        currency:CurrencySlice,
        wishlist:WishlistSlice,
        cartItem:CartItemSlice,
    }
})