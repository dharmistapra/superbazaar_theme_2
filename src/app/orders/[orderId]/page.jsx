import { getThemeModules } from "@/theme/themeConfig";
const OrderDetailPage = async ({ params }) => {
    const currentTheme = process.env.NEXT_THEME || "theme1";
    const { orderId } = await params;
    const { OrderDetail } = getThemeModules(currentTheme);
    return (
        <OrderDetail orderid={orderId} />
    )
}

export default OrderDetailPage