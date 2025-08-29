import { getThemeModules } from "@/theme/themeConfig";
const OrderHistoryPage = () => {
  const currentTheme = "theme2";
  const { OrderHistory } = getThemeModules(currentTheme);
  return <OrderHistory />
}
export default OrderHistoryPage