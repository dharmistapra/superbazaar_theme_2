import { GitCompareArrows, Heart, ScanEye } from "lucide-react"
const TooltipButton = ({ icon: Icon, label, onClick }) => {
  return (
    <div className="relative group/icon flex items-center justify-center">
      <button
        onClick={onClick} 
        className="p-2 rounded-full bg-transparent text-white transition-all duration-300 hover:bg-black/70 hover:shadow-lg"
        aria-label={label}
      >
        <Icon size={22} />
      </button>
      <span className="absolute right-full mr-2 top-1/2 -translate-y-1/2 scale-0 group-hover/icon:scale-100 opacity-0 group-hover/icon:opacity-100 transition-all duration-300 bg-black text-white text-xs px-2 py-1 rounded-md shadow-lg whitespace-nowrap z-10">
        {label}
      </span>
    </div>
  )
}

const handleWishlist = () => {
  console.log("Wishlist button clicked ✅")
}

const handleQuickView = () => {
  console.log("Quick View button clicked ✅")
}

const handleCompare = () => {
  console.log("Compare button clicked ✅")
}

const WishlistButton = () => (
  <TooltipButton icon={Heart} label="Add to Wishlist" onClick={handleWishlist} />
)

const QuickViewButton = () => (
  <TooltipButton icon={ScanEye} label="Quick View" onClick={handleQuickView} />
)

const ComapreButton = () => (
  <TooltipButton icon={GitCompareArrows} label="Compare" onClick={handleCompare} />
)

export { QuickViewButton, WishlistButton, ComapreButton }
