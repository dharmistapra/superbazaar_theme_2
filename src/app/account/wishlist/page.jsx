import themes from "@/themeConfig";
const WishlistPage = () => {
  const currentTheme = "theme1";
  const { Wishlist } = themes[currentTheme];
  return <Wishlist />
}
export default WishlistPage