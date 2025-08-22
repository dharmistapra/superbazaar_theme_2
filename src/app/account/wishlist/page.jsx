import WishlistTheme1 from "@/app/theme/theme1/Accounts/Whishlist";
import WishlistTheme2 from "@/app/theme/theme2/Accounts/Whishlist";
const currentTheme = "theme1"; 

const WishlistPage=()=> {
  switch (currentTheme) {
    case "theme1":
      return <WishlistTheme1 />;
    case "theme2":
      return <WishlistTheme2 />;
    default:
      return <WishlistTheme1 />;
  }
}
export default WishlistPage