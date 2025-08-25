import themes from "@/app/themeConfig";
const AddressPage = () => {
  const currentTheme = "theme2";
  const { Address } = themes[currentTheme];
  return <Address />
}
export default AddressPage