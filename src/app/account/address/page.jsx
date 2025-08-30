import { getThemeModules } from "@/theme/themeConfig";
const AddressPage = () => {
   const currentTheme = process.env.NEXT_THEME || "theme1";
  const { Address } = getThemeModules(currentTheme);
  return <Address />
}
export default AddressPage