import OrderHistorythem1 from "@/app/theme/theme1/Accounts/Ordertheme1";
import OrderHistorythem2 from "@/app/theme/theme2/Accounts/Ordertheme2";
const currentTheme = "theme1"; 

const OrderPage=()=> {
  switch (currentTheme) {
    case "theme1":
      return <OrderHistorythem1 />;
    case "theme2":
      return <OrderHistorythem2 />;
    default:
      return <OrderTheme1 />;
  }
}
export default OrderPage