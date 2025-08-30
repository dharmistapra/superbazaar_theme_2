import { getThemeModules } from "@/theme/themeConfig";
const WishlistPage = () => {
   const currentTheme = process.env.NEXT_THEME || "theme1";
  const { Wishlist } = getThemeModules(currentTheme);
  return <Wishlist />
}
export default WishlistPage