"use client"
import { useState } from "react";
import { Check, ShoppingCart, Truck, CreditCard } from "lucide-react";
import Address from "./components/address";

const CheckoutPage=()=> {


  return (
    <div className="w-full">
        <div className="grid grid-cols-2 gap-2">
            <Address/>
        </div>
    </div>
  );
}

export default CheckoutPage