import { configureStore } from "@reduxjs/toolkit";
import ModalReucer from "./slice/ModalSlice"
export const store=configureStore({
    reducer:{
        modal:ModalReucer
    }
})