import themes from "@/app/themeConfig";
const HomePage = () => {
  const currentTheme = "theme2";
  const { Home } = themes[currentTheme];
  return (
    <Home />
  );
};

export default HomePage;
