import { getThemeModules } from "@/theme/themeConfig";
const OrderHistoryPage = () => {
   const currentTheme = process.env.NEXT_THEME || "theme1";
  const { OrderHistory } = getThemeModules(currentTheme);
  return <OrderHistory />
}
export default OrderHistoryPage