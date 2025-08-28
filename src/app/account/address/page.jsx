import { getThemeModules } from "@/theme/themeConfig";
const AddressPage = () => {
  const currentTheme = "theme1";
  const { Address } = getThemeModules(currentTheme);
  return <Address />
}
export default AddressPage