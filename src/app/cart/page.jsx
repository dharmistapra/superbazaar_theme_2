import { getThemeModules } from "@/theme/themeConfig";

export default function CartPage() {
  const currentTheme = process.env.NEXT_THEME || "theme1";
  const Cart = getThemeModules(currentTheme).Cart;
  return <Cart />;
}
