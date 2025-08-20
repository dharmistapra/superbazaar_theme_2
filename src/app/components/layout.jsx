import { useSelector } from "react-redux";
import { RootState } from "@/context/store";

const Layout = ({ children }) => {
  const currentTheme = useSelector((state) => state.theme.currentTheme);

  const ThemeLayout = require(`@/app/theme/${currentTheme}/layout`).default;
  return <ThemeLayout>{children}</ThemeLayout>;
};

export default Layout;
