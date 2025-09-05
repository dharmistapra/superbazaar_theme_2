// import CartPageTheme1 from "@/theme/theme1/Cart/CartPage";
// const CartPage = () => {
//   return (
//     <CartPageTheme1/>
//   );
// };

// export default CartPage;


import { getThemeModules } from "@/theme/themeConfig";

export default function CartPage() {
  const currentTheme = process.env.NEXT_THEME || "theme1";
  const Cart = getThemeModules(currentTheme).Cart;
  return <Cart />;
}
