import { getThemeModules } from "@/theme/themeConfig";

const Invoice=async({params})=> {
 const currentTheme = process.env.NEXT_THEME || "theme1";
    const { orderId } = await params;
    const { Invoice } = getThemeModules(currentTheme);

  return (
   <Invoice orderId={orderId}/>
  );
}
export default Invoice
