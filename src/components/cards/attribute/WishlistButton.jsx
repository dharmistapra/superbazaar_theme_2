import { Heart, Loader2 } from "lucide-react"
import { useSession } from "next-auth/react"
import { useRef, useState } from "react"
import { useModal } from "@/hooks/useModal"
import { getUserWishlist, postUserWishlist } from "@/services/accountsService"
import { useDispatch, useSelector } from "react-redux"
import { setWishlistData } from "@/store/slice/WishlistSlice"
const WishlistButton = ({
  productId = null,
  catalogueId = null,
  type = "product",
  delay = 0,
  variant = "card", 
}) => {
  const { data: session } = useSession()
  const { open } = useModal()
  const dispatch = useDispatch()
  const { list } = useSelector((state) => state.wishlist)

  const currentId = type === "product" ? productId : catalogueId
  const isWishlisted =
    type === "catalogue"
      ? list?.catalogue?.some((item) => item?.id === currentId)
      : list?.product?.some((item) => item?.id === currentId)

  const [wishlistLoading, setWishlistLoading] = useState(false)
  const debounceTimeout = useRef(null)

  const handleWishlistClick = async (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (wishlistLoading || debounceTimeout.current) return

    try {
      setWishlistLoading(true)
      if (!session?.accessToken) {
        open("login")
        return
      }

      const data =
        type === "catalogue"
          ? { catalogue_id: currentId }
          : { product_id: currentId }

      const response = await postUserWishlist(data)
      if (response?.isSuccess) {
        const response = await getUserWishlist()
        dispatch(setWishlistData(response.data))
      }
      if (!response?.isSuccess) {
        open("login")
        return
      }
    } catch (error) {
      console.error(error)
    } finally {
      setWishlistLoading(false)
      debounceTimeout.current = setTimeout(() => {
        debounceTimeout.current = null
      }, 500)
    }
  }

  return (
    <div
      className={`relative flex items-center justify-center ${
        variant === "card"
          ? "group/icon transform translate-y-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100"
          : ""
      }`}
      style={variant === "card" ? { transitionDelay: `${delay}ms` } : {}}
    >
    <button
  onClick={handleWishlistClick}
  disabled={wishlistLoading}
  className={`flex items-center justify-center transition-all duration-300 
    ${
      variant === "detail"
        ? `w-10 h-10 rounded-md border ${
            isWishlisted
              ? "bg-black text-white"
              : "bg-white text-gray-700 hover:bg-black hover:text-white"
          }`
        : "p-2 rounded-full bg-white text-gray-700 shadow-md hover:bg-black hover:text-white hover:shadow-lg"
    }`}
  aria-label="Add to Wishlist"
>
  {wishlistLoading ? (
    <Loader2 className="h-5 w-5 animate-spin" />
  ) : (
    <Heart size={20} className={`${isWishlisted ? "fill-current" : ""}`} />
  )}
</button>


      {variant === "card" && (
        <span
          className="absolute right-full mr-2 top-1/2 -translate-y-1/2 
            scale-0 group-hover/icon:scale-100 opacity-0 
            group-hover/icon:opacity-100 transition-all duration-300 
            bg-black text-white text-xs px-2 py-1 rounded-md shadow-lg whitespace-nowrap z-10"
        >
          {isWishlisted ? "Remove Wishlist" : "Add To Wishlist"}
        </span>
      )}
    </div>
  )
}

export default WishlistButton
