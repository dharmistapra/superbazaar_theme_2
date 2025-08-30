import { getThemeModules } from "@/theme/themeConfig";

const AccountLayout = ({ children }) => {
 const currentTheme = process.env.NEXT_THEME || "theme1";
  const { AccountsLayout } = getThemeModules(currentTheme);

  return <AccountsLayout>{children}</AccountsLayout>;
}
export default AccountLayout;
