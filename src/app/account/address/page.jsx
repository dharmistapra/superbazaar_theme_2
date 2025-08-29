import { getThemeModules } from "@/theme/themeConfig";
const AddressPage = () => {
  const currentTheme = "theme2";
  const { Address } = getThemeModules(currentTheme);
  return <Address />
}
export default AddressPage