import { configureStore } from "@reduxjs/toolkit";
import ModalReucer from "./slice/ModalSlice"
import MiniCartSlice from "./slice/MiniCartSlice"
export const store=configureStore({
    reducer:{
        modal:ModalReucer,
        minicart:MiniCartSlice
    }
})