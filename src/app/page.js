import { getThemeModules } from "@/theme/themeConfig";

const HomePage = () => {
  const currentTheme = process.env.NEXT_THEME || "theme1";
  const { Home } = getThemeModules(currentTheme);
  return (
    <Home />
  );
};

export default HomePage;
