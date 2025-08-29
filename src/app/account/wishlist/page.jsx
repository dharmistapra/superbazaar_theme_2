import { getThemeModules } from "@/theme/themeConfig";
const WishlistPage = () => {
  const currentTheme = "theme2";
  const { Wishlist } = getThemeModules(currentTheme);
  return <Wishlist />
}
export default WishlistPage