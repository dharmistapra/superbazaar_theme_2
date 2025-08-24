import themes from "@/app/themeConfig";
const HomePage = () => {
  const currentTheme = "theme1";
  const { Home } = themes[currentTheme];
  return (
      <Home />
  );
};

export default HomePage;
