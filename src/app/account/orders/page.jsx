import themes from "@/app/themeConfig";
const OrderHistoryPage = () => {
  const currentTheme = "theme2";
  const { OrderHistory } = themes[currentTheme];
  return <OrderHistory />
}
export default OrderHistoryPage