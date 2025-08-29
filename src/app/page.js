import { getThemeModules } from "@/theme/themeConfig";

const HomePage = () => {
  const currentTheme = "theme2";
  const { Home } = getThemeModules(currentTheme);
  return (
    <Home />
  );
};

export default HomePage;
