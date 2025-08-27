import themes from "@/themeConfig";
const OrderHistoryPage = () => {
  const currentTheme = "theme1";
  const { OrderHistory } = themes[currentTheme];
  return <OrderHistory />
}
export default OrderHistoryPage