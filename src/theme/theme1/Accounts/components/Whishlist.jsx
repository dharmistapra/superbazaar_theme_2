"use client"
import { useEffect, useState } from "react"
import ProductCard from "../../components/Cards/ProductCards"
import { useSession } from "next-auth/react";
import { getUserWishlist } from "@/services/accountsService";
const WishlistTheme1 = () => {
  const [wishlist,setWishlist]=useState([])

  const fethData=async()=>{
const response=getUserWishlist()
setWishlist(response.data)
  }

  useEffect(()=>{
    fethData()
  },[])
  console.log(wishlist)
  const CategoryProductData=[]
  return (
    <div className="container mx-auto px-4 py-6">
      <h2 className="text-xl font-semibold mb-6">My Wishlist</h2>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {CategoryProductData?.products?.length > 0 ? (
          CategoryProductData.products.map((item, index) => (
            <ProductCard key={index} data={item} />
          ))
        ) : (
          <p className="text-gray-600">No products in your wishlist.</p>
        )}
      </div>
    </div>
  )
}

export default WishlistTheme1
