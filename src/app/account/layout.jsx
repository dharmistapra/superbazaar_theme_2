import { getThemeModules } from "@/theme/themeConfig";

const AccountLayout = ({ children }) => {
  const currentTheme = "theme2";
  const { AccountsLayout } = getThemeModules(currentTheme);

  return <AccountsLayout>{children}</AccountsLayout>;
}
export default AccountLayout;
